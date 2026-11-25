import type {
  FlashcardItem,
  FlashcardMastery,
  JLPTQuestion,
  LearnProgressState,
  QuizSessionRecord,
  UserPreferences,
  UserProfile,
  WordAnalysis,
  WordAttemptStat,
} from '../types/jlpt';

const CURRENT_EMAIL_KEY = 'kotoba_master_current_email_v1';
const PROFILE_PREFIX = 'kotoba_master_profile_v3_';
const PREFS_KEY = 'kotoba_master_prefs_v3';
const CLIENT_ID_KEY = 'kotoba_master_client_id_v1';

export const MASTER_EMAIL = 'angelsalsadilla@gmail.com';

export function isMasterEmail(email: string): boolean {
  return normalizeEmail(email) === MASTER_EMAIL;
}

function profileKeyForEmail(email: string): string {
  return `${PROFILE_PREFIX}${normalizeEmail(email)}`;
}

function flashcardsKeyForEmail(email: string): string {
  return `kotoba_master_flashcards_v3_${normalizeEmail(email)}`;
}

function dailyQuestionsKeyForEmail(email: string): string {
  return `kotoba_master_daily_q_v1_${normalizeEmail(email)}`;
}

function learnProgressKeyForEmail(email: string): string {
  return `kotoba_master_learn_v1_${normalizeEmail(email)}`;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmailFormat(email: string): boolean {
  const trimmed = normalizeEmail(email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export function getOrCreateClientId(): string {
  if (typeof window === 'undefined') return `srv-${Date.now()}`;
  try {
    const existing = window.localStorage.getItem(CLIENT_ID_KEY);
    if (existing) return existing;
    const generated = `km-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
    window.localStorage.setItem(CLIENT_ID_KEY, generated);
    return generated;
  } catch {
    return `km-${Math.random().toString(36).slice(2, 10)}`;
  }
}

export function getCurrentEmail(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CURRENT_EMAIL_KEY);
    return raw ? normalizeEmail(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentEmail(email: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CURRENT_EMAIL_KEY, normalizeEmail(email));
  } catch {
    // Ignore storage quota errors
  }
}

export function logoutCurrentEmail(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(CURRENT_EMAIL_KEY);
  } catch {
    // Ignore
  }
}

export function getLocalDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getDefaultPreferences(): UserPreferences {
  return {
    furiganaEnabled: true,
    ttsRate: 1.0,
    sfxEnabled: true,
  };
}

export function loadPreferences(): UserPreferences {
  if (typeof window === 'undefined') return getDefaultPreferences();
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    if (!raw) return getDefaultPreferences();
    const parsed = JSON.parse(raw) as Partial<UserPreferences>;
    return {
      furiganaEnabled:
        typeof parsed.furiganaEnabled === 'boolean' ? parsed.furiganaEnabled : true,
      ttsRate:
        parsed.ttsRate === 0.75 || parsed.ttsRate === 1.0 || parsed.ttsRate === 1.2
          ? parsed.ttsRate
          : 1.0,
      sfxEnabled: typeof parsed.sfxEnabled === 'boolean' ? parsed.sfxEnabled : true,
    };
  } catch {
    return getDefaultPreferences();
  }
}

export function savePreferences(prefs: UserPreferences): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // Ignore storage quota errors
  }
}

function createStarterProfile(email: string, displayName: string): UserProfile {
  const norm = normalizeEmail(email);
  return {
    email: norm,
    displayName:
      displayName.trim() ||
      (isMasterEmail(norm) ? 'Angel Salsadilla' : 'Pemain N3'),
    isMaster: isMasterEmail(norm),
    dailyGoal: 15,
    totalXp: 0,
    totalAnswered: 0,
    totalCorrect: 0,
    flashcardCount: 1,
    lastActiveAt: new Date().toISOString(),
    dailyLog: {},
    recentSessions: [],
    wordStats: {},
  };
}

export function hasProfileForEmail(email: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return Boolean(window.localStorage.getItem(profileKeyForEmail(email)));
  } catch {
    return false;
  }
}

export function loadProfileForEmail(email: string): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const normalized = normalizeEmail(email);
  try {
    const raw = window.localStorage.getItem(profileKeyForEmail(normalized));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<UserProfile>;
    return {
      email: normalized,
      displayName:
        parsed.displayName?.trim() ||
        (isMasterEmail(normalized) ? 'Angel Salsadilla' : 'Pemain N3'),
      isMaster: isMasterEmail(normalized),
      dailyGoal:
        typeof parsed.dailyGoal === 'number' && parsed.dailyGoal >= 5
          ? parsed.dailyGoal
          : 15,
      totalXp: typeof parsed.totalXp === 'number' ? parsed.totalXp : 0,
      totalAnswered:
        typeof parsed.totalAnswered === 'number' ? parsed.totalAnswered : 0,
      totalCorrect:
        typeof parsed.totalCorrect === 'number' ? parsed.totalCorrect : 0,
      flashcardCount:
        typeof parsed.flashcardCount === 'number' ? parsed.flashcardCount : undefined,
      lastActiveAt: parsed.lastActiveAt,
      dailyLog:
        parsed.dailyLog && typeof parsed.dailyLog === 'object' ? parsed.dailyLog : {},
      recentSessions: Array.isArray(parsed.recentSessions)
        ? parsed.recentSessions
        : [],
      wordStats:
        parsed.wordStats && typeof parsed.wordStats === 'object'
          ? parsed.wordStats
          : {},
    };
  } catch {
    return null;
  }
}

export function createProfileForEmail(
  email: string,
  displayName: string
): UserProfile {
  const fresh = createStarterProfile(email, displayName);
  saveProfileForEmail(fresh);
  return fresh;
}

export function saveProfileForEmail(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      profileKeyForEmail(profile.email),
      JSON.stringify(profile)
    );
  } catch {
    // Ignore storage errors
  }
}

export interface LocalLoginResult {
  needsName: boolean;
  profile?: UserProfile;
}

export function loginWithEmailLocal(
  email: string,
  displayName?: string
): LocalLoginResult {
  const norm = normalizeEmail(email);
  if (!isValidEmailFormat(norm)) {
    throw new Error('Masukkan alamat email yang valid (contoh: nama@email.com).');
  }

  const existing = loadProfileForEmail(norm);
  if (existing) {
    const refreshed: UserProfile = {
      ...existing,
      isMaster: isMasterEmail(norm),
      flashcardCount: loadFlashcardsForEmail(norm).length,
      lastActiveAt: new Date().toISOString(),
    };
    saveProfileForEmail(refreshed);
    setCurrentEmail(norm);
    return { needsName: false, profile: refreshed };
  }

  if (isMasterEmail(norm)) {
    const masterProfile = createStarterProfile(norm, 'Angel Salsadilla');
    masterProfile.flashcardCount = loadFlashcardsForEmail(norm).length;
    saveProfileForEmail(masterProfile);
    setCurrentEmail(norm);
    return { needsName: false, profile: masterProfile };
  }

  const cleanName = typeof displayName === 'string' ? displayName.trim() : '';
  if (!cleanName) {
    return { needsName: true };
  }
  if (cleanName.length < 2) {
    throw new Error('Nama minimal 2 karakter agar tampil jelas di Arena Pertandingan.');
  }

  const created = createProfileForEmail(norm, cleanName.slice(0, 28));
  created.flashcardCount = loadFlashcardsForEmail(norm).length;
  saveProfileForEmail(created);
  setCurrentEmail(norm);
  return { needsName: false, profile: created };
}

export function loadAllLocalProfiles(): UserProfile[] {
  if (typeof window === 'undefined') return [];
  const users: UserProfile[] = [];
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (!key || !key.startsWith(PROFILE_PREFIX)) continue;
      const email = key.slice(PROFILE_PREFIX.length);
      if (!isValidEmailFormat(email)) continue;
      const loaded = loadProfileForEmail(email);
      if (!loaded) continue;
      users.push({
        ...loaded,
        flashcardCount:
          loaded.flashcardCount ?? loadFlashcardsForEmail(loaded.email).length,
      });
    }
  } catch {
    return [];
  }
  return users.sort((a, b) =>
    (b.lastActiveAt || '').localeCompare(a.lastActiveAt || '')
  );
}

export function computeCurrentStreak(profile: UserProfile): number {
  const today = new Date();
  let streak = 0;
  const todayKey = getLocalDateKey(today);
  const hasToday = (profile.dailyLog[todayKey]?.questionsAnswered ?? 0) > 0;

  for (let offset = hasToday ? 0 : 1; offset < 365; offset++) {
    const d = new Date(today);
    d.setDate(today.getDate() - offset);
    const key = getLocalDateKey(d);
    if ((profile.dailyLog[key]?.questionsAnswered ?? 0) > 0) {
      streak += 1;
    } else {
      break;
    }
  }
  return streak;
}

export interface SevenDayEntry {
  dateKey: string;
  dayShort: string;
  dayNum: string;
  isToday: boolean;
  active: boolean;
  questionsAnswered: number;
}

const DAY_NAMES_ID = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export function getSevenDayStreakWindow(profile: UserProfile): SevenDayEntry[] {
  const today = new Date();
  const entries: SevenDayEntry[] = [];
  for (let offset = 6; offset >= 0; offset--) {
    const d = new Date(today);
    d.setDate(today.getDate() - offset);
    const key = getLocalDateKey(d);
    const log = profile.dailyLog[key];
    entries.push({
      dateKey: key,
      dayShort: DAY_NAMES_ID[d.getDay()],
      dayNum: String(d.getDate()),
      isToday: offset === 0,
      active: (log?.questionsAnswered ?? 0) > 0,
      questionsAnswered: log?.questionsAnswered ?? 0,
    });
  }
  return entries;
}

export function recordWordAttempt(
  profile: UserProfile,
  question: JLPTQuestion,
  isCorrect: boolean
): UserProfile {
  const statId = question.analysis.id;
  const prev: WordAttemptStat | undefined = profile.wordStats[statId];
  const nextStat: WordAttemptStat = {
    id: statId,
    headword: question.analysis.headword,
    reading: question.analysis.reading,
    meaningId: question.analysis.meaningId,
    category: question.category,
    totalAttempts: (prev?.totalAttempts ?? 0) + 1,
    correctCount: (prev?.correctCount ?? 0) + (isCorrect ? 1 : 0),
    wrongCount: (prev?.wrongCount ?? 0) + (isCorrect ? 0 : 1),
    lastAttemptAt: new Date().toISOString(),
  };

  const updatedProfile: UserProfile = {
    ...profile,
    lastActiveAt: new Date().toISOString(),
    wordStats: {
      ...profile.wordStats,
      [statId]: nextStat,
    },
  };

  saveProfileForEmail(updatedProfile);
  return updatedProfile;
}

export function recordQuizSessionForEmail(
  profile: UserProfile,
  session: QuizSessionRecord,
  nextFlashcardCount?: number
): UserProfile {
  const todayKey = getLocalDateKey();
  const existing = profile.dailyLog[todayKey] ?? {
    date: todayKey,
    questionsAnswered: 0,
    correctCount: 0,
    sessionsCompleted: 0,
  };

  const updatedProfile: UserProfile = {
    ...profile,
    totalXp: profile.totalXp + session.score,
    totalAnswered: profile.totalAnswered + session.totalQuestions,
    totalCorrect: profile.totalCorrect + session.correctCount,
    flashcardCount:
      typeof nextFlashcardCount === 'number'
        ? nextFlashcardCount
        : profile.flashcardCount,
    lastActiveAt: new Date().toISOString(),
    dailyLog: {
      ...profile.dailyLog,
      [todayKey]: {
        date: todayKey,
        questionsAnswered: existing.questionsAnswered + session.totalQuestions,
        correctCount: existing.correctCount + session.correctCount,
        sessionsCompleted: existing.sessionsCompleted + 1,
      },
    },
    recentSessions: [session, ...profile.recentSessions].slice(0, 30),
  };

  saveProfileForEmail(updatedProfile);
  return updatedProfile;
}

const STARTER_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'mg-kr-3',
    headword: '競争',
    reading: 'きょうそう',
    romaji: 'kyousou',
    pos: 'Kata Benda · Suru-verb',
    meaningId: 'Persaingan; kompetisi',
    meaningEn: 'Competition; rivalry',
    grammarNoteId: 'Bacaan on-yomi gabungan: 競 (きょう) + 争 (そう).',
    kanjiDetails: [
      {
        char: '競',
        onYomi: ['キョウ', 'ケイ'],
        kunYomi: ['きそ.う'],
        meaningId: 'bersaing',
        meaningEn: 'compete',
        strokes: 20,
      },
      {
        char: '争',
        onYomi: ['ソウ'],
        kunYomi: ['あらそ.う'],
        meaningId: 'berebut, bersaing',
        meaningEn: 'contend, dispute',
        strokes: 6,
      },
    ],
    exampleSentence: [
      { text: '新製品の' },
      { text: '競争', reading: 'きょうそう', highlight: true },
      { text: 'が激しい。' },
    ],
    examplePlain: '新製品の競争が激しい。',
    exampleTranslationId: 'Persaingan produk baru sangat ketat.',
    exampleTranslationEn: 'Competition for new products is intense.',
    mastery: 'new',
    reviewCount: 0,
    addedAt: '2026-11-20T00:00:00.000Z',
  },
];

export function loadFlashcardsForEmail(email: string): FlashcardItem[] {
  if (typeof window === 'undefined') return STARTER_FLASHCARDS;
  const key = flashcardsKeyForEmail(email);
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      window.localStorage.setItem(key, JSON.stringify(STARTER_FLASHCARDS));
      return STARTER_FLASHCARDS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? (parsed as FlashcardItem[])
      : STARTER_FLASHCARDS;
  } catch {
    return STARTER_FLASHCARDS;
  }
}

export function saveFlashcardsForEmail(
  email: string,
  items: FlashcardItem[]
): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      flashcardsKeyForEmail(email),
      JSON.stringify(items)
    );
  } catch {
    // Ignore quota errors
  }
}

export function analysisToFlashcard(analysis: WordAnalysis): FlashcardItem {
  return {
    id: analysis.id,
    headword: analysis.headword,
    reading: analysis.reading,
    romaji: analysis.romaji,
    pos: analysis.pos,
    meaningId: analysis.meaningId,
    meaningEn: analysis.meaningEn,
    grammarNoteId: analysis.grammarNoteId,
    kanjiDetails: analysis.kanjiDetails,
    exampleSentence: analysis.exampleSentence,
    examplePlain: analysis.examplePlain,
    exampleTranslationId: analysis.exampleTranslationId,
    exampleTranslationEn: analysis.exampleTranslationEn,
    mastery: 'new',
    reviewCount: 0,
    addedAt: new Date().toISOString(),
  };
}

export function mergeAnalysesIntoFlashcardsForEmail(
  email: string,
  existingCards: FlashcardItem[],
  analyses: WordAnalysis[]
): { nextCards: FlashcardItem[]; addedCount: number } {
  const existingIds = new Set(existingCards.map((c) => c.id));
  const newCards: FlashcardItem[] = [];

  for (const analysis of analyses) {
    if (!existingIds.has(analysis.id)) {
      existingIds.add(analysis.id);
      newCards.push(analysisToFlashcard(analysis));
    }
  }

  if (newCards.length === 0) {
    return { nextCards: existingCards, addedCount: 0 };
  }

  const nextCards = [...newCards, ...existingCards];
  saveFlashcardsForEmail(email, nextCards);
  return { nextCards, addedCount: newCards.length };
}

export function updateFlashcardMasteryForEmail(
  email: string,
  cards: FlashcardItem[],
  cardId: string,
  mastery: FlashcardMastery
): FlashcardItem[] {
  const next = cards.map((c) =>
    c.id === cardId ? { ...c, mastery, reviewCount: c.reviewCount + 1 } : c
  );
  saveFlashcardsForEmail(email, next);
  return next;
}

interface DailyQuestionLog {
  date: string;
  questionIds: string[];
}

export function loadTodayCompletedQuestionIds(email: string): string[] {
  if (typeof window === 'undefined' || !email) return [];
  const todayKey = getLocalDateKey();
  try {
    const raw = window.localStorage.getItem(dailyQuestionsKeyForEmail(email));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Partial<DailyQuestionLog>;
    if (parsed.date !== todayKey || !Array.isArray(parsed.questionIds)) {
      return [];
    }
    return Array.from(
      new Set(parsed.questionIds.filter((id): id is string => typeof id === 'string' && id.length > 0))
    );
  } catch {
    return [];
  }
}

export function recordTodayCompletedQuestionIds(
  email: string,
  questionIds: string[]
): string[] {
  if (typeof window === 'undefined' || !email) return [];
  const todayKey = getLocalDateKey();
  const existing = loadTodayCompletedQuestionIds(email);
  const merged = Array.from(
    new Set([
      ...existing,
      ...questionIds.filter((id): id is string => typeof id === 'string' && id.length > 0),
    ])
  );
  try {
    const payload: DailyQuestionLog = {
      date: todayKey,
      questionIds: merged,
    };
    window.localStorage.setItem(
      dailyQuestionsKeyForEmail(email),
      JSON.stringify(payload)
    );
  } catch {
    // Ignore storage quota errors
  }
  return merged;
}

export function getDefaultLearnProgress(): LearnProgressState {
  return {
    studiedDayIds: [],
    renshuuCompleted: {},
    jissenResults: {},
  };
}

export function loadLearnProgressForEmail(email: string): LearnProgressState {
  if (typeof window === 'undefined' || !email) return getDefaultLearnProgress();
  try {
    const raw = window.localStorage.getItem(learnProgressKeyForEmail(email));
    if (!raw) return getDefaultLearnProgress();
    const parsed = JSON.parse(raw) as Partial<LearnProgressState>;
    return {
      studiedDayIds: Array.isArray(parsed.studiedDayIds)
        ? parsed.studiedDayIds.filter((s): s is string => typeof s === 'string')
        : [],
      renshuuCompleted:
        parsed.renshuuCompleted && typeof parsed.renshuuCompleted === 'object'
          ? parsed.renshuuCompleted
          : {},
      jissenResults:
        parsed.jissenResults && typeof parsed.jissenResults === 'object'
          ? parsed.jissenResults
          : {},
    };
  } catch {
    return getDefaultLearnProgress();
  }
}

export function saveLearnProgressForEmail(
  email: string,
  progress: LearnProgressState
): void {
  if (typeof window === 'undefined' || !email) return;
  try {
    window.localStorage.setItem(
      learnProgressKeyForEmail(email),
      JSON.stringify(progress)
    );
  } catch {
    // Ignore storage quota errors
  }
}

export function resetAllProgressForEmail(
  email: string,
  currentName: string
): { profile: UserProfile; flashcards: FlashcardItem[] } {
  const freshProfile = createStarterProfile(email, currentName);
  saveProfileForEmail(freshProfile);
  saveFlashcardsForEmail(email, STARTER_FLASHCARDS);
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(dailyQuestionsKeyForEmail(email));
      window.localStorage.removeItem(learnProgressKeyForEmail(email));
    } catch {
      // Ignore
    }
  }
  return { profile: freshProfile, flashcards: STARTER_FLASHCARDS };
}
