import { buildOfficialSectionQuestions, JLPT_QUESTIONS } from '../data/questions';
import type {
  JLPTMajorSection,
  JLPTSubCategory,
  OnlinePlayerState,
  OnlineRoomState,
} from '../types/jlpt';

const ARENA_ROOMS_KEY = 'kotoba_master_arena_rooms_v1';
const ARENA_CHANNEL_NAME = 'kotoba_master_arena_channel_v1';
const VALID_SECTIONS = new Set<JLPTMajorSection>([
  'moji_goi',
  'bunpou_dokkai',
  'choukai',
]);
const VALID_QUESTION_IDS = new Set(JLPT_QUESTIONS.map((q) => q.id));

interface StoredLocalRoom extends OnlineRoomState {
  updatedAt: number;
  dailyPlayedDate?: string;
  dailyPlayedIds?: string[];
  playerAnswers?: Record<string, Record<string, string | string[]>>;
}

function normalizeSection(val: unknown): JLPTMajorSection {
  if (typeof val === 'string' && VALID_SECTIONS.has(val as JLPTMajorSection)) {
    return val as JLPTMajorSection;
  }
  return 'moji_goi';
}

function getLocalTodayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function readAllRooms(): Record<string, StoredLocalRoom> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(ARENA_ROOMS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, StoredLocalRoom>;
    if (!parsed || typeof parsed !== 'object') return {};
    const cutoff = Date.now() - 6 * 60 * 60 * 1000;
    const active: Record<string, StoredLocalRoom> = {};
    for (const [id, room] of Object.entries(parsed)) {
      if (room && typeof room.updatedAt === 'number' && room.updatedAt >= cutoff) {
        active[id] = room;
      }
    }
    return active;
  } catch {
    return {};
  }
}

function broadcastRoomUpdate(roomId: string): void {
  if (typeof window === 'undefined' || typeof BroadcastChannel === 'undefined') {
    return;
  }
  try {
    const ch = new BroadcastChannel(ARENA_CHANNEL_NAME);
    ch.postMessage({ type: 'room:updated', roomId });
    ch.close();
  } catch {
    // Ignore BroadcastChannel unavailability
  }
}

function writeAllRooms(rooms: Record<string, StoredLocalRoom>, changedRoomId: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ARENA_ROOMS_KEY, JSON.stringify(rooms));
  } catch {
    // Ignore storage quota errors
  }
  broadcastRoomUpdate(changedRoomId);
}

function toPublicRoom(room: StoredLocalRoom): OnlineRoomState {
  return {
    roomId: room.roomId,
    status: room.status,
    config: room.config,
    questionIds: room.questionIds,
    players: room.players,
    startedAt: room.startedAt,
  };
}

function generateRoomCode(existing: Record<string, StoredLocalRoom>): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return existing[code] ? generateRoomCode(existing) : code;
}

export function getLocalRoom(roomId: string): OnlineRoomState | null {
  const rooms = readAllRooms();
  const found = rooms[roomId.trim().toUpperCase()];
  return found ? toPublicRoom(found) : null;
}

export function createLocalRoom(
  clientId: string,
  name: string,
  config: { sectionFilter: JLPTMajorSection; categoryFilter: 'all' | JLPTSubCategory }
): OnlineRoomState {
  const rooms = readAllRooms();
  const roomId = generateRoomCode(rooms);
  const hostPlayer: OnlinePlayerState = {
    clientId,
    name: name.slice(0, 28) || 'Pemain N3',
    score: 0,
    correctCount: 0,
    answeredCount: 0,
    finished: false,
    avgResponseSec: 0,
    connected: true,
    isHost: true,
  };

  const room: StoredLocalRoom = {
    roomId,
    status: 'waiting',
    config: {
      sectionFilter: normalizeSection(config.sectionFilter),
      categoryFilter: config.categoryFilter ?? 'all',
    },
    questionIds: [],
    players: [hostPlayer],
    startedAt: null,
    updatedAt: Date.now(),
    dailyPlayedDate: getLocalTodayKey(),
    dailyPlayedIds: [],
  };

  rooms[roomId] = room;
  writeAllRooms(rooms, roomId);
  return toPublicRoom(room);
}

export function joinLocalRoom(
  roomIdInput: string,
  clientId: string,
  name: string,
  inviteFallback?: {
    sectionFilter?: string | null;
    categoryFilter?: string | null;
    questionIds?: string[];
  }
): { room?: OnlineRoomState; error?: string } {
  const roomId = roomIdInput.trim().toUpperCase();
  if (!roomId) {
    return { error: 'Kode room tidak valid.' };
  }

  const rooms = readAllRooms();
  let room = rooms[roomId];

  // Cross-device invite link support on static hosting: reconstruct room locally if invite URL carries config
  if (!room && inviteFallback?.sectionFilter) {
    const cleanIds = (inviteFallback.questionIds || []).filter((id) =>
      VALID_QUESTION_IDS.has(id)
    );
    const hasQuestions = cleanIds.length > 0;
    room = {
      roomId,
      status: hasQuestions ? 'playing' : 'waiting',
      config: {
        sectionFilter: normalizeSection(inviteFallback.sectionFilter),
        categoryFilter:
          (inviteFallback.categoryFilter as 'all' | JLPTSubCategory) || 'all',
      },
      questionIds: cleanIds,
      players: [
        {
          clientId,
          name: name.slice(0, 28) || 'Pemain N3',
          score: 0,
          correctCount: 0,
          answeredCount: 0,
          finished: false,
          avgResponseSec: 0,
          connected: true,
          isHost: true,
        },
      ],
      startedAt: hasQuestions ? Date.now() : null,
      updatedAt: Date.now(),
      dailyPlayedDate: getLocalTodayKey(),
      dailyPlayedIds: cleanIds,
    };
    rooms[roomId] = room;
    writeAllRooms(rooms, roomId);
    return { room: toPublicRoom(room) };
  }

  if (!room) {
    return {
      error: `Room "${roomId}" tidak ditemukan di browser ini. Gunakan Tautan Undangan dari temanmu untuk bermain lintas perangkat.`,
    };
  }

  const existingIdx = room.players.findIndex((p) => p.clientId === clientId);
  if (existingIdx >= 0) {
    room.players[existingIdx] = {
      ...room.players[existingIdx],
      name: name.slice(0, 28) || room.players[existingIdx].name,
      connected: true,
    };
  } else {
    if (room.status === 'playing') {
      return { error: 'Pertandingan di room ini sudah dimulai.' };
    }
    if (room.players.length >= 8) {
      return { error: 'Room sudah penuh (maksimal 8 pemain).' };
    }
    room.players.push({
      clientId,
      name: name.slice(0, 28) || 'Pemain N3',
      score: 0,
      correctCount: 0,
      answeredCount: 0,
      finished: false,
      avgResponseSec: 0,
      connected: true,
      isHost: false,
    });
  }

  room.updatedAt = Date.now();
  rooms[roomId] = room;
  writeAllRooms(rooms, roomId);
  return { room: toPublicRoom(room) };
}

export function updateLocalRoomConfig(
  roomId: string,
  clientId: string,
  config: { sectionFilter: JLPTMajorSection; categoryFilter: 'all' | JLPTSubCategory }
): OnlineRoomState | null {
  const rooms = readAllRooms();
  const room = rooms[roomId];
  if (!room || room.status !== 'waiting') return room ? toPublicRoom(room) : null;
  const player = room.players.find((p) => p.clientId === clientId);
  if (!player?.isHost) return toPublicRoom(room);

  room.config = {
    sectionFilter: normalizeSection(config.sectionFilter),
    categoryFilter: config.categoryFilter ?? 'all',
  };
  room.updatedAt = Date.now();
  rooms[roomId] = room;
  writeAllRooms(rooms, roomId);
  return toPublicRoom(room);
}

export function startLocalRoomMatch(
  roomId: string,
  clientId: string,
  hostExcludeIds: string[]
): OnlineRoomState | null {
  const rooms = readAllRooms();
  const room = rooms[roomId];
  if (!room || room.status === 'playing') return room ? toPublicRoom(room) : null;
  const player = room.players.find((p) => p.clientId === clientId);
  if (!player?.isHost) return toPublicRoom(room);

  const todayKey = getLocalTodayKey();
  if (room.dailyPlayedDate !== todayKey || !Array.isArray(room.dailyPlayedIds)) {
    room.dailyPlayedDate = todayKey;
    room.dailyPlayedIds = [];
  }

  const combinedExclude = new Set([
    ...room.dailyPlayedIds,
    ...hostExcludeIds.filter((id) => VALID_QUESTION_IDS.has(id)),
  ]);

  const selected = buildOfficialSectionQuestions(
    room.config.sectionFilter,
    room.config.categoryFilter,
    combinedExclude
  ).map((q) => q.id);

  room.questionIds = selected;
  room.dailyPlayedIds = Array.from(new Set([...room.dailyPlayedIds, ...selected]));
  room.status = 'playing';
  room.startedAt = Date.now();
  room.updatedAt = Date.now();
  room.players = room.players.map((p) => ({
    ...p,
    score: 0,
    correctCount: 0,
    answeredCount: 0,
    finished: false,
    avgResponseSec: 0,
  }));

  rooms[roomId] = room;
  writeAllRooms(rooms, roomId);
  return toPublicRoom(room);
}

export function updateLocalPlayerProgress(
  roomId: string,
  clientId: string,
  answeredCount: number
): OnlineRoomState | null {
  const rooms = readAllRooms();
  const room = rooms[roomId];
  if (!room || room.status !== 'playing') return room ? toPublicRoom(room) : null;
  const idx = room.players.findIndex((p) => p.clientId === clientId);
  if (idx === -1 || room.players[idx].finished) return toPublicRoom(room);

  room.players[idx] = {
    ...room.players[idx],
    answeredCount: Math.min(room.questionIds.length, Math.max(0, answeredCount)),
  };
  room.updatedAt = Date.now();
  rooms[roomId] = room;
  writeAllRooms(rooms, roomId);
  return toPublicRoom(room);
}

export function submitLocalPlayerExam(
  roomId: string,
  clientId: string,
  payload: { answers: Record<string, string | string[]>; totalTimeSec: number }
): OnlineRoomState | null {
  const rooms = readAllRooms();
  const room = rooms[roomId];
  if (!room || room.status !== 'playing') return room ? toPublicRoom(room) : null;
  const idx = room.players.findIndex((p) => p.clientId === clientId);
  if (idx === -1 || room.players[idx].finished) return toPublicRoom(room);

  let correctCount = 0;
  let answeredCount = 0;

  for (const qId of room.questionIds) {
    const question = JLPT_QUESTIONS.find((q) => q.id === qId);
    if (!question) continue;
    const submitted = payload.answers[qId];
    if (question.category === 'grammar_2_star' && question.starData) {
      if (Array.isArray(submitted) && submitted.length === 4) {
        answeredCount += 1;
        const isExact = question.starData.correctOrderIds.every(
          (cid, sIdx) => submitted[sIdx] === cid
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

  const totalTimeSec = Math.max(1, payload.totalTimeSec);
  room.players[idx] = {
    ...room.players[idx],
    answeredCount,
    correctCount,
    score: correctCount * 100,
    avgResponseSec: Number(
      (totalTimeSec / Math.max(1, answeredCount || room.questionIds.length)).toFixed(1)
    ),
    finished: true,
  };

  const activePlayers = room.players.filter((p) => p.connected);
  if (activePlayers.length > 0 && activePlayers.every((p) => p.finished)) {
    room.status = 'finished';
  }

  room.updatedAt = Date.now();
  rooms[roomId] = room;
  writeAllRooms(rooms, roomId);
  return toPublicRoom(room);
}

export function rematchLocalRoom(
  roomId: string,
  clientId: string
): OnlineRoomState | null {
  const rooms = readAllRooms();
  const room = rooms[roomId];
  if (!room) return null;
  const player = room.players.find((p) => p.clientId === clientId);
  if (!player?.isHost) return toPublicRoom(room);

  const todayKey = getLocalTodayKey();
  if (room.dailyPlayedDate !== todayKey || !Array.isArray(room.dailyPlayedIds)) {
    room.dailyPlayedDate = todayKey;
    room.dailyPlayedIds = [];
  }
  room.dailyPlayedIds = Array.from(
    new Set([...room.dailyPlayedIds, ...room.questionIds])
  );
  room.status = 'waiting';
  room.questionIds = [];
  room.startedAt = null;
  room.updatedAt = Date.now();
  room.players = room.players.map((p) => ({
    ...p,
    score: 0,
    correctCount: 0,
    answeredCount: 0,
    finished: false,
    avgResponseSec: 0,
  }));

  rooms[roomId] = room;
  writeAllRooms(rooms, roomId);
  return toPublicRoom(room);
}

export function leaveLocalRoom(roomId: string, clientId: string): void {
  const rooms = readAllRooms();
  const room = rooms[roomId];
  if (!room) return;

  room.players = room.players.filter((p) => p.clientId !== clientId);
  if (room.players.length === 0) {
    delete rooms[roomId];
    writeAllRooms(rooms, roomId);
    return;
  }

  if (!room.players.some((p) => p.isHost)) {
    room.players[0] = { ...room.players[0], isHost: true };
  }

  const activePlayers = room.players.filter((p) => p.connected);
  if (
    room.status === 'playing' &&
    activePlayers.length > 0 &&
    activePlayers.every((p) => p.finished)
  ) {
    room.status = 'finished';
  }

  room.updatedAt = Date.now();
  rooms[roomId] = room;
  writeAllRooms(rooms, roomId);
}

export function subscribeLocalRoom(
  roomId: string,
  onRoomChange: (room: OnlineRoomState | null) => void
): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleStorage = (e: StorageEvent) => {
    if (e.key === ARENA_ROOMS_KEY) {
      onRoomChange(getLocalRoom(roomId));
    }
  };
  window.addEventListener('storage', handleStorage);

  let channel: BroadcastChannel | null = null;
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      channel = new BroadcastChannel(ARENA_CHANNEL_NAME);
      channel.onmessage = (ev: MessageEvent<{ type?: string; roomId?: string }>) => {
        if (ev.data?.roomId === roomId) {
          onRoomChange(getLocalRoom(roomId));
        }
      };
    } catch {
      channel = null;
    }
  }

  return () => {
    window.removeEventListener('storage', handleStorage);
    channel?.close();
  };
}

export function buildLocalInviteUrl(room: OnlineRoomState): string {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams();
  params.set('room', room.roomId);
  params.set('sec', room.config.sectionFilter);
  params.set('cat', room.config.categoryFilter);
  if (room.questionIds.length > 0) {
    params.set('q', room.questionIds.join(','));
  }
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}
