import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type NextFunction, type Request, type Response } from 'express';
import { WebSocket, WebSocketServer } from 'ws';
import { buildOfficialSectionQuestions, JLPT_QUESTIONS } from './src/data/questions.ts';
import type {
  DailyActivity,
  JLPTMajorSection,
  JLPTSubCategory,
  OnlinePlayerState,
  OnlineRoomState,
  QuizSessionRecord,
  UserProfile,
  WordAttemptStat,
} from './src/types/jlpt.ts';

interface InternalPlayer extends OnlinePlayerState {
  answeredQuestionIds: Set<string>;
  totalResponseSec: number;
  ws: WebSocket | null;
}

interface InternalRoom {
  roomId: string;
  status: 'waiting' | 'playing' | 'finished';
  config: {
    sectionFilter: JLPTMajorSection;
    categoryFilter: 'all' | JLPTSubCategory;
  };
  questionIds: string[];
  dailyPlayedDate?: string;
  dailyPlayedIds?: Set<string>;
  players: Map<string, InternalPlayer>;
  startedAt: number | null;
  createdAt: number;
}

interface AuthContext {
  email: string;
  isMaster: boolean;
}

interface AuthenticatedRequest extends Request {
  auth?: AuthContext;
}

const VALID_SECTIONS = new Set<JLPTMajorSection>([
  'moji_goi',
  'bunpou_dokkai',
  'choukai',
]);

const VALID_QUESTION_ID_SET = new Set(JLPT_QUESTIONS.map((q) => q.id));
const MASTER_EMAIL = 'angelsalsadilla@gmail.com';
const SESSION_SECRET =
  process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 16
    ? process.env.SESSION_SECRET
    : crypto.randomBytes(32).toString('hex');

function getServerTodayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function sanitizeExcludeIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const valid: string[] = [];
  for (const item of raw.slice(0, 500)) {
    if (typeof item === 'string' && VALID_QUESTION_ID_SET.has(item)) {
      valid.push(item);
    }
  }
  return valid;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '.data');
const PROFILES_FILE = path.resolve(DATA_DIR, 'profiles.json');

const rooms = new Map<string, InternalRoom>();
const profileStore = new Map<string, UserProfile>();

function normalizeEmail(raw: unknown): string {
  return typeof raw === 'string' ? raw.trim().toLowerCase() : '';
}

function isValidEmail(email: string): boolean {
  return email.length <= 160 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isMasterEmail(email: string): boolean {
  return normalizeEmail(email) === MASTER_EMAIL;
}

function isSafeRecordKey(key: string): boolean {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
}

function sanitizeDailyLog(raw: unknown): Record<string, DailyActivity> {
  const result: Record<string, DailyActivity> = {};
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return result;
  for (const [key, val] of Object.entries(raw as Record<string, unknown>)) {
    if (!isSafeRecordKey(key) || !/^\d{4}-\d{2}-\d{2}$/.test(key)) continue;
    if (!val || typeof val !== 'object') continue;
    const v = val as Partial<DailyActivity>;
    result[key] = {
      date: key,
      questionsAnswered: Math.max(0, Number(v.questionsAnswered || 0)),
      correctCount: Math.max(0, Number(v.correctCount || 0)),
      sessionsCompleted: Math.max(0, Number(v.sessionsCompleted || 0)),
    };
  }
  return result;
}

function sanitizeRecentSessions(raw: unknown): QuizSessionRecord[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 30).map((item, idx) => {
    const s = (item || {}) as Partial<QuizSessionRecord>;
    return {
      id: String(s.id || `sess-${idx}`).slice(0, 64),
      completedAt: String(s.completedAt || new Date().toISOString()).slice(0, 40),
      mode: s.mode === 'arena' ? 'arena' : 'solo',
      categoryScope: String(s.categoryScope || 'JLPT N3').slice(0, 80),
      score: Math.max(0, Number(s.score || 0)),
      totalQuestions: Math.max(0, Number(s.totalQuestions || 0)),
      correctCount: Math.max(0, Number(s.correctCount || 0)),
      accuracyPct: Math.min(100, Math.max(0, Number(s.accuracyPct || 0))),
      avgResponseSec: Math.max(0, Number(s.avgResponseSec || 0)),
      arenaRank: typeof s.arenaRank === 'number' ? s.arenaRank : undefined,
      arenaTotalPlayers:
        typeof s.arenaTotalPlayers === 'number' ? s.arenaTotalPlayers : undefined,
      roomCode: typeof s.roomCode === 'string' ? s.roomCode.slice(0, 12) : undefined,
    };
  });
}

function sanitizeWordStats(raw: unknown): Record<string, WordAttemptStat> {
  const result: Record<string, WordAttemptStat> = {};
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return result;
  for (const [key, val] of Object.entries(raw as Record<string, unknown>)) {
    if (!isSafeRecordKey(key) || key.length > 80) continue;
    if (!val || typeof val !== 'object') continue;
    const w = val as Partial<WordAttemptStat>;
    result[key] = {
      id: String(w.id || key).slice(0, 80),
      headword: String(w.headword || '').slice(0, 80),
      reading: String(w.reading || '').slice(0, 80),
      meaningId: String(w.meaningId || '').slice(0, 160),
      category: (w.category || 'kanji_reading') as JLPTSubCategory,
      totalAttempts: Math.max(0, Number(w.totalAttempts || 0)),
      correctCount: Math.max(0, Number(w.correctCount || 0)),
      wrongCount: Math.max(0, Number(w.wrongCount || 0)),
      lastAttemptAt: String(w.lastAttemptAt || new Date().toISOString()).slice(0, 40),
    };
  }
  return result;
}

function sanitizeProfile(email: string, raw: Partial<UserProfile>): UserProfile {
  const norm = normalizeEmail(email);
  const master = isMasterEmail(norm);
  const defaultName = master ? 'Angel Salsadilla' : 'Pemain N3';
  const cleanName =
    typeof raw.displayName === 'string' && raw.displayName.trim().length > 0
      ? raw.displayName.trim().slice(0, 28)
      : defaultName;

  return {
    email: norm,
    displayName: cleanName,
    isMaster: master,
    dailyGoal:
      typeof raw.dailyGoal === 'number' && raw.dailyGoal >= 5 && raw.dailyGoal <= 200
        ? Math.round(raw.dailyGoal)
        : 15,
    totalXp: Math.max(0, Number(raw.totalXp || 0)),
    totalAnswered: Math.max(0, Number(raw.totalAnswered || 0)),
    totalCorrect: Math.max(0, Number(raw.totalCorrect || 0)),
    flashcardCount: Math.max(0, Number(raw.flashcardCount || 1)),
    lastActiveAt: new Date().toISOString(),
    dailyLog: sanitizeDailyLog(raw.dailyLog),
    recentSessions: sanitizeRecentSessions(raw.recentSessions),
    wordStats: sanitizeWordStats(raw.wordStats),
  };
}

function loadProfilesFromDisk(): void {
  try {
    if (!PROFILES_FILE.startsWith(DATA_DIR + path.sep)) return;
    if (!fs.existsSync(PROFILES_FILE)) return;
    const raw = fs.readFileSync(PROFILES_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as Record<string, UserProfile>;
    if (!parsed || typeof parsed !== 'object') return;
    for (const [email, prof] of Object.entries(parsed)) {
      if (!isSafeRecordKey(email) || !isValidEmail(email)) continue;
      profileStore.set(normalizeEmail(email), sanitizeProfile(email, prof));
    }
  } catch (err) {
    console.warn('Could not load saved profiles from disk:', err);
  }
}

function saveProfilesToDisk(): void {
  try {
    if (!PROFILES_FILE.startsWith(DATA_DIR + path.sep)) return;
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const obj: Record<string, UserProfile> = {};
    for (const [email, prof] of profileStore.entries()) {
      obj[email] = prof;
    }
    const tmpFile = path.resolve(DATA_DIR, 'profiles.tmp.json');
    if (!tmpFile.startsWith(DATA_DIR + path.sep)) return;
    fs.writeFileSync(tmpFile, JSON.stringify(obj, null, 2), 'utf-8');
    fs.renameSync(tmpFile, PROFILES_FILE);
  } catch (err) {
    console.warn('Failed to persist profiles to disk:', err);
  }
}

function signSessionToken(email: string): string {
  const payload = {
    email: normalizeEmail(email),
    isMaster: isMasterEmail(email),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64url');
  const sig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encoded)
    .digest('base64url');
  return `${encoded}.${sig}`;
}

function verifySessionToken(token: string): AuthContext | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [encoded, sig] = parts;
  const expectedSig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encoded)
    .digest('base64url');

  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(encoded, 'base64url').toString('utf-8')
    ) as { email?: string; isMaster?: boolean; exp?: number };
    if (!parsed.email || !isValidEmail(parsed.email)) return null;
    if (typeof parsed.exp !== 'number' || parsed.exp < Date.now()) return null;
    const norm = normalizeEmail(parsed.email);
    return {
      email: norm,
      isMaster: isMasterEmail(norm),
    };
  } catch {
    return null;
  }
}

function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Sesi login diperlukan.' });
    return;
  }
  const token = authHeader.slice(7).trim();
  const ctx = verifySessionToken(token);
  if (!ctx) {
    res.status(401).json({ error: 'Token sesi tidak valid atau kedaluwarsa.' });
    return;
  }
  req.auth = ctx;
  next();
}

function requireMaster(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.auth || !req.auth.isMaster || !isMasterEmail(req.auth.email)) {
    res.status(403).json({ error: 'Akses khusus akun Master.' });
    return;
  }
  next();
}

function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return rooms.has(code) ? generateRoomCode() : code;
}

function normalizeSection(val: unknown): JLPTMajorSection {
  if (typeof val === 'string' && VALID_SECTIONS.has(val as JLPTMajorSection)) {
    return val as JLPTMajorSection;
  }
  return 'moji_goi';
}

function selectRoomQuestions(
  config: InternalRoom['config'],
  excludeIds?: Set<string>
): string[] {
  return buildOfficialSectionQuestions(
    config.sectionFilter,
    config.categoryFilter,
    excludeIds
  ).map((q) => q.id);
}

function serializeRoom(room: InternalRoom): OnlineRoomState {
  const players: OnlinePlayerState[] = Array.from(room.players.values()).map((p) => ({
    clientId: p.clientId,
    name: p.name,
    score: p.score,
    correctCount: p.correctCount,
    answeredCount: p.answeredCount,
    finished: p.finished,
    avgResponseSec: p.avgResponseSec,
    connected: p.connected,
    isHost: p.isHost,
  }));

  return {
    roomId: room.roomId,
    status: room.status,
    config: room.config,
    questionIds: room.questionIds,
    players,
    startedAt: room.startedAt,
  };
}

function sendJson(ws: WebSocket | null, payload: unknown): void {
  if (!ws || ws.readyState !== WebSocket.OPEN) return;
  ws.send(JSON.stringify(payload));
}

function broadcastRoom(room: InternalRoom): void {
  const payload = { type: 'room:state', room: serializeRoom(room) };
  for (const player of room.players.values()) {
    sendJson(player.ws, payload);
  }
}

function checkAllPlayersFinished(room: InternalRoom): void {
  const activePlayers = Array.from(room.players.values()).filter((p) => p.connected);
  if (activePlayers.length > 0 && activePlayers.every((p) => p.finished)) {
    room.status = 'finished';
  }
}

setInterval(() => {
  const cutoff = Date.now() - 3 * 60 * 60 * 1000;
  for (const [id, room] of rooms.entries()) {
    if (room.createdAt < cutoff) {
      rooms.delete(id);
    }
  }
}, 15 * 60 * 1000);

async function startServer() {
  loadProfilesFromDisk();

  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server, path: '/ws' });

  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, rooms: rooms.size, users: profileStore.size });
  });

  // Passwordless Email Auth (Master email logs straight in without name prompt)
  app.post('/api/auth/login', (req, res) => {
    const body = (req.body || {}) as {
      email?: unknown;
      displayName?: unknown;
      localProfile?: Partial<UserProfile>;
    };
    const email = normalizeEmail(body.email);
    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'Format email tidak valid.' });
      return;
    }

    const master = isMasterEmail(email);
    let existing = profileStore.get(email);

    if (existing) {
      // If server profile is empty and client has local progress, adopt local progress
      if (
        existing.totalAnswered === 0 &&
        body.localProfile &&
        typeof body.localProfile.totalAnswered === 'number' &&
        body.localProfile.totalAnswered > 0
      ) {
        existing = sanitizeProfile(email, {
          ...body.localProfile,
          displayName: existing.displayName,
        });
      } else {
        existing = {
          ...existing,
          isMaster: master,
          lastActiveAt: new Date().toISOString(),
        };
      }
      profileStore.set(email, existing);
      saveProfilesToDisk();

      const token = signSessionToken(email);
      res.json({ needsName: false, token, profile: existing });
      return;
    }

    // Master skips name onboarding on first login
    const requestedName =
      typeof body.displayName === 'string' ? body.displayName.trim() : '';
    const localName =
      typeof body.localProfile?.displayName === 'string'
        ? body.localProfile.displayName.trim()
        : '';

    if (!master && requestedName.length < 2 && localName.length < 2) {
      res.json({ needsName: true, isMaster: false });
      return;
    }

    const newProfile = sanitizeProfile(email, {
      ...(body.localProfile || {}),
      displayName: master
        ? requestedName || localName || 'Angel Salsadilla'
        : requestedName || localName,
    });
    profileStore.set(email, newProfile);
    saveProfilesToDisk();

    const token = signSessionToken(email);
    res.json({ needsName: false, token, profile: newProfile });
  });

  // Authenticated profile sync (user can only update their own email profile)
  app.post('/api/profile/sync', requireAuth, (req: AuthenticatedRequest, res) => {
    const auth = req.auth!;
    const body = (req.body || {}) as { profile?: Partial<UserProfile> };
    if (!body.profile || typeof body.profile !== 'object') {
      res.status(400).json({ error: 'Data profil tidak valid.' });
      return;
    }

    const payloadEmail = normalizeEmail(body.profile.email || auth.email);
    if (payloadEmail !== auth.email) {
      res.status(403).json({ error: 'Tidak dapat mengubah profil akun lain.' });
      return;
    }

    const clean = sanitizeProfile(auth.email, body.profile);
    profileStore.set(auth.email, clean);
    saveProfilesToDisk();

    res.json({ ok: true, profile: clean });
  });

  // Master-only endpoint: view progress of all registered users
  app.get(
    '/api/master/users',
    requireAuth,
    requireMaster,
    (_req: AuthenticatedRequest, res) => {
      const users = Array.from(profileStore.values()).sort((a, b) =>
        (b.lastActiveAt || '').localeCompare(a.lastActiveAt || '')
      );
      res.json({ users });
    }
  );

  wss.on('connection', (ws: WebSocket) => {
    let boundRoomId: string | null = null;
    let boundClientId: string | null = null;

    ws.on('message', (raw) => {
      let msg: Record<string, unknown>;
      try {
        msg = JSON.parse(String(raw)) as Record<string, unknown>;
      } catch {
        return;
      }

      const type = String(msg.type || '');

      if (type === 'room:create') {
        const clientId = String(msg.clientId || '');
        const name = String(msg.name || 'Pemain N3').slice(0, 28);
        const cfg = (msg.config || {}) as Partial<InternalRoom['config']>;
        if (!clientId) return;

        const roomId = generateRoomCode();
        const room: InternalRoom = {
          roomId,
          status: 'waiting',
          config: {
            sectionFilter: normalizeSection(cfg.sectionFilter),
            categoryFilter: cfg.categoryFilter ?? 'all',
          },
          questionIds: [],
          players: new Map(),
          startedAt: null,
          createdAt: Date.now(),
        };

        room.players.set(clientId, {
          clientId,
          name,
          score: 0,
          correctCount: 0,
          answeredCount: 0,
          finished: false,
          avgResponseSec: 0,
          connected: true,
          isHost: true,
          answeredQuestionIds: new Set(),
          totalResponseSec: 0,
          ws,
        });

        rooms.set(roomId, room);
        boundRoomId = roomId;
        boundClientId = clientId;
        broadcastRoom(room);
        return;
      }

      if (type === 'room:join') {
        const roomId = String(msg.roomId || '').trim().toUpperCase();
        const clientId = String(msg.clientId || '');
        const name = String(msg.name || 'Pemain N3').slice(0, 28);
        if (!roomId || !clientId) {
          sendJson(ws, { type: 'room:error', message: 'Kode room tidak valid.' });
          return;
        }

        const room = rooms.get(roomId);
        if (!room) {
          sendJson(ws, {
            type: 'room:error',
            message: `Room "${roomId}" tidak ditemukan. Pastikan kode sudah benar.`,
          });
          return;
        }

        const existing = room.players.get(clientId);
        if (existing) {
          existing.ws = ws;
          existing.connected = true;
          existing.name = name;
        } else {
          if (room.status === 'playing') {
            sendJson(ws, {
              type: 'room:error',
              message: 'Pertandingan di room ini sudah dimulai.',
            });
            return;
          }
          if (room.players.size >= 8) {
            sendJson(ws, {
              type: 'room:error',
              message: 'Room sudah penuh (maksimal 8 pemain).',
            });
            return;
          }
          room.players.set(clientId, {
            clientId,
            name,
            score: 0,
            correctCount: 0,
            answeredCount: 0,
            finished: false,
            avgResponseSec: 0,
            connected: true,
            isHost: false,
            answeredQuestionIds: new Set(),
            totalResponseSec: 0,
            ws,
          });
        }

        boundRoomId = roomId;
        boundClientId = clientId;
        broadcastRoom(room);
        return;
      }

      if (type === 'room:update_config') {
        const roomId = String(msg.roomId || boundRoomId || '');
        const clientId = String(msg.clientId || boundClientId || '');
        const room = rooms.get(roomId);
        if (!room || room.status !== 'waiting') return;
        const player = room.players.get(clientId);
        if (!player?.isHost) return;

        const cfg = (msg.config || {}) as Partial<InternalRoom['config']>;
        room.config = {
          sectionFilter:
            cfg.sectionFilter !== undefined
              ? normalizeSection(cfg.sectionFilter)
              : room.config.sectionFilter,
          categoryFilter: cfg.categoryFilter ?? room.config.categoryFilter,
        };
        broadcastRoom(room);
        return;
      }

      if (type === 'room:start') {
        const roomId = String(msg.roomId || boundRoomId || '');
        const clientId = String(msg.clientId || boundClientId || '');
        const room = rooms.get(roomId);
        if (!room || room.status === 'playing') return;
        const player = room.players.get(clientId);
        if (!player?.isHost) return;

        const todayKey = getServerTodayKey();
        if (room.dailyPlayedDate !== todayKey || !room.dailyPlayedIds) {
          room.dailyPlayedDate = todayKey;
          room.dailyPlayedIds = new Set();
        }
        const hostExcludes = sanitizeExcludeIds(msg.excludeIds);
        const combinedExclude = new Set([
          ...room.dailyPlayedIds,
          ...hostExcludes,
        ]);

        room.questionIds = selectRoomQuestions(room.config, combinedExclude);
        for (const qId of room.questionIds) {
          room.dailyPlayedIds.add(qId);
        }
        room.status = 'playing';
        room.startedAt = Date.now();
        for (const p of room.players.values()) {
          p.score = 0;
          p.correctCount = 0;
          p.answeredCount = 0;
          p.finished = false;
          p.avgResponseSec = 0;
          p.totalResponseSec = 0;
          p.answeredQuestionIds.clear();
        }
        broadcastRoom(room);
        return;
      }

      if (type === 'room:progress') {
        const roomId = String(msg.roomId || boundRoomId || '');
        const clientId = String(msg.clientId || boundClientId || '');
        const answeredCount = Math.max(0, Number(msg.answeredCount || 0));

        const room = rooms.get(roomId);
        if (!room || room.status !== 'playing') return;
        const player = room.players.get(clientId);
        if (!player || player.finished) return;

        player.answeredCount = Math.min(room.questionIds.length, answeredCount);
        broadcastRoom(room);
        return;
      }

      if (type === 'room:submit_exam') {
        const roomId = String(msg.roomId || boundRoomId || '');
        const clientId = String(msg.clientId || boundClientId || '');
        const totalTimeSec = Math.max(1, Number(msg.totalTimeSec || 1));
        const rawAnswers = (msg.answers || {}) as Record<string, unknown>;

        const room = rooms.get(roomId);
        if (!room || room.status !== 'playing') return;
        const player = room.players.get(clientId);
        if (!player || player.finished) return;

        let correctCount = 0;
        let answeredCount = 0;
        for (const qId of room.questionIds) {
          const question = JLPT_QUESTIONS.find((q) => q.id === qId);
          if (!question) continue;
          const submitted = rawAnswers[qId];
          if (question.category === 'grammar_2_star' && question.starData) {
            if (Array.isArray(submitted) && submitted.length === 4) {
              answeredCount += 1;
              const isExact = question.starData.correctOrderIds.every(
                (cid, idx) => submitted[idx] === cid
              );
              if (isExact) correctCount += 1;
            }
          } else if (typeof submitted === 'string' && submitted.length > 0) {
            answeredCount += 1;
            if (submitted === question.correctOptionId) {
              correctCount += 1;
            }
          }
        }

        player.answeredCount = answeredCount;
        player.correctCount = correctCount;
        player.score = correctCount * 100;
        player.avgResponseSec = Number(
          (totalTimeSec / Math.max(1, answeredCount || room.questionIds.length)).toFixed(1)
        );
        player.finished = true;

        checkAllPlayersFinished(room);
        broadcastRoom(room);
        return;
      }

      if (type === 'room:finish') {
        const roomId = String(msg.roomId || boundRoomId || '');
        const clientId = String(msg.clientId || boundClientId || '');
        const room = rooms.get(roomId);
        if (!room) return;
        const player = room.players.get(clientId);
        if (!player) return;
        player.finished = true;
        checkAllPlayersFinished(room);
        broadcastRoom(room);
        return;
      }

      if (type === 'room:rematch') {
        const roomId = String(msg.roomId || boundRoomId || '');
        const clientId = String(msg.clientId || boundClientId || '');
        const room = rooms.get(roomId);
        if (!room) return;
        const player = room.players.get(clientId);
        if (!player?.isHost) return;

        const todayKey = getServerTodayKey();
        if (room.dailyPlayedDate !== todayKey || !room.dailyPlayedIds) {
          room.dailyPlayedDate = todayKey;
          room.dailyPlayedIds = new Set();
        }
        for (const qId of room.questionIds) {
          room.dailyPlayedIds.add(qId);
        }
        room.status = 'waiting';
        room.questionIds = [];
        room.startedAt = null;
        for (const p of room.players.values()) {
          p.score = 0;
          p.correctCount = 0;
          p.answeredCount = 0;
          p.finished = false;
          p.avgResponseSec = 0;
          p.totalResponseSec = 0;
          p.answeredQuestionIds.clear();
        }
        broadcastRoom(room);
        return;
      }

      if (type === 'room:leave') {
        const roomId = String(msg.roomId || boundRoomId || '');
        const clientId = String(msg.clientId || boundClientId || '');
        const room = rooms.get(roomId);
        if (!room) return;
        room.players.delete(clientId);
        boundRoomId = null;

        if (room.players.size === 0) {
          rooms.delete(roomId);
          return;
        }

        const hasHost = Array.from(room.players.values()).some((p) => p.isHost);
        if (!hasHost) {
          const first = room.players.values().next().value;
          if (first) first.isHost = true;
        }
        checkAllPlayersFinished(room);
        broadcastRoom(room);
      }
    });

    ws.on('close', () => {
      if (!boundRoomId || !boundClientId) return;
      const room = rooms.get(boundRoomId);
      if (!room) return;
      const player = room.players.get(boundClientId);
      if (!player) return;
      player.connected = false;
      player.ws = null;
      checkAllPlayersFinished(room);
      broadcastRoom(room);
    });
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  const port = Number(process.env.PORT || 3000);
  server.listen(port, '0.0.0.0', () => {
    console.log(`Kotoba Master server running on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
