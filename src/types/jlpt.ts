export type AppTab = 'lobby' | 'learn' | 'quiz' | 'flashcards' | 'master';

export type JLPTMajorSection = 'moji_goi' | 'bunpou_dokkai' | 'choukai';

export type JLPTSubCategory =
  // Section 1: 言語知識（文字・語彙） (35 soal)
  | 'kanji_reading' // 8
  | 'orthography' // 6
  | 'context' // 11
  | 'paraphrase' // 5
  | 'usage' // 5
  // Section 2: 言語知識（文法）& 読解 (39 soal)
  | 'grammar_1' // 13
  | 'grammar_2_star' // 5
  | 'text_grammar' // 5
  | 'reading_short' // 4
  | 'reading_mid' // 6 (2 teks x 3 soal)
  | 'reading_long' // 4 (1 teks x 4 soal)
  | 'info_search' // 2 (1 pamflet/tabel x 2 soal)
  // Section 3: 聴解 (28 soal)
  | 'listening_task' // 6 (課題理解)
  | 'listening_point' // 6 (ポイント理解)
  | 'listening_gist' // 3 (概要理解)
  | 'listening_quick' // 4 (即時応答)
  | 'listening_integrated'; // 9 (統合理解)

export type QuizMode = 'arena' | 'solo';

export type TtsRate = 0.75 | 1.0 | 1.2;

export interface RubySegment {
  text: string;
  reading?: string;
  highlight?: boolean;
}

export interface KanjiBreakdown {
  char: string;
  onYomi: string[];
  kunYomi: string[];
  meaningId: string;
  meaningEn: string;
  strokes: number;
}

export interface WordAnalysis {
  id: string;
  headword: string;
  reading: string;
  romaji: string;
  pos: string;
  meaningId: string;
  meaningEn: string;
  grammarNoteId: string;
  kanjiDetails: KanjiBreakdown[];
  exampleSentence: RubySegment[];
  examplePlain: string;
  exampleTranslationId: string;
  exampleTranslationEn: string;
}

export interface QuizOption {
  id: string;
  label: RubySegment[];
  plainText: string;
}

export interface StarQuestionData {
  prefix: RubySegment[];
  suffix: RubySegment[];
  fragments: {
    id: string;
    segments: RubySegment[];
    plainText: string;
  }[];
  correctOrderIds: [string, string, string, string];
  starSlotIndex: number;
}

export interface InfoBrochureData {
  headerBadge: string;
  title: string;
  subtitle: string;
  columns: string[];
  rows: string[][];
  notes: string[];
}

export interface JLPTQuestion {
  id: string;
  section: JLPTMajorSection;
  category: JLPTSubCategory;
  instructionId: string;
  passageGroupId?: string;
  passageTitle?: string;
  passage?: RubySegment[][];
  brochure?: InfoBrochureData;
  promptSegments: RubySegment[];
  promptPlain: string;
  audioScript?: string;
  audioSpeaker?: string;
  options?: QuizOption[];
  correctOptionId?: string;
  starData?: StarQuestionData;
  analysis: WordAnalysis;
}

export type FlashcardMastery = 'new' | 'learning' | 'mastered';

export interface FlashcardItem {
  id: string;
  headword: string;
  reading: string;
  romaji: string;
  pos: string;
  meaningId: string;
  meaningEn: string;
  grammarNoteId: string;
  kanjiDetails: KanjiBreakdown[];
  exampleSentence: RubySegment[];
  examplePlain: string;
  exampleTranslationId: string;
  exampleTranslationEn: string;
  mastery: FlashcardMastery;
  reviewCount: number;
  addedAt: string;
}

export interface WordAttemptStat {
  id: string;
  headword: string;
  reading: string;
  meaningId: string;
  category: JLPTSubCategory;
  totalAttempts: number;
  correctCount: number;
  wrongCount: number;
  lastAttemptAt: string;
}

export interface DailyActivity {
  date: string;
  questionsAnswered: number;
  correctCount: number;
  sessionsCompleted: number;
}

export interface QuizSessionRecord {
  id: string;
  completedAt: string;
  mode: QuizMode;
  categoryScope: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  accuracyPct: number;
  avgResponseSec: number;
  arenaRank?: number;
  arenaTotalPlayers?: number;
  roomCode?: string;
}

export interface UserPreferences {
  furiganaEnabled: boolean;
  ttsRate: TtsRate;
  sfxEnabled: boolean;
}

export interface UserProfile {
  email: string;
  displayName: string;
  isMaster?: boolean;
  dailyGoal: number;
  totalXp: number;
  totalAnswered: number;
  totalCorrect: number;
  flashcardCount?: number;
  lastActiveAt?: string;
  dailyLog: Record<string, DailyActivity>;
  recentSessions: QuizSessionRecord[];
  wordStats: Record<string, WordAttemptStat>;
}

export interface QuizConfig {
  mode: QuizMode;
  sectionFilter: JLPTMajorSection;
  categoryFilter: 'all' | JLPTSubCategory;
}

export interface OnlinePlayerState {
  clientId: string;
  name: string;
  score: number;
  correctCount: number;
  answeredCount: number;
  finished: boolean;
  avgResponseSec: number;
  connected: boolean;
  isHost: boolean;
}

export interface OnlineRoomState {
  roomId: string;
  status: 'waiting' | 'playing' | 'finished';
  config: {
    sectionFilter: JLPTMajorSection;
    categoryFilter: 'all' | JLPTSubCategory;
  };
  questionIds: string[];
  players: OnlinePlayerState[];
  startedAt: number | null;
}

// ============================================================
// Belajar: Nihongo Sou Matome N3 Bunpou
// ============================================================

export interface SouMatomeExample {
  jp: string;
  id: string;
  note?: string;
}

export interface SouMatomeGrammarPoint {
  id: string;
  titleJp: string;
  connectionFormula: string;
  registerTag?: 'Lisan' | 'Formal' | 'Tulisan' | 'Negatif' | 'Perhatian';
  shortMeaningId: string;
  easyExplanationId: string;
  tipOrPitfallId?: string;
  examples: SouMatomeExample[];
}

export interface RenshuuChoiceItem {
  id: string;
  numberLabel: string;
  promptBefore: string;
  promptAfter: string;
  /** Some book prompts have extra text or second blank; optional suffix */
  options: { id: string; label: string }[];
  /** Usually 1 answer; some Sou Matome items accept 2 answers (e.g. a & b) */
  correctOptionIds: string[];
  explanationId: string;
}

export interface RenshuuOrderItem {
  id: string;
  numberLabel: string;
  prefix: string;
  suffix: string;
  tokens: { id: number; label: string }[]; // 1..4
  correctOrder: number[];
  explanationId: string;
}

export interface SouMatomeLessonDay {
  id: string; // e.g. 'w1-d1'
  weekNumber: number;
  dayNumber: 1 | 2 | 3 | 4 | 5 | 6;
  titleJp: string;
  titleId: string;
  grammarPoints: SouMatomeGrammarPoint[];
  renshuuPart1: RenshuuChoiceItem[];
  renshuuPart2: RenshuuOrderItem[];
}

export type JissenQuestionType = 'mondai1_mcq' | 'mondai2_star' | 'mondai3_cloze';

export interface JissenQuestion {
  id: string;
  number: number; // 1..25
  type: JissenQuestionType;
  /** For mondai1_mcq */
  promptJp?: string;
  /** For mondai2_star */
  starPrefix?: string;
  starSuffix?: string;
  starSlotIndex?: number; // 0..3 (which of the 4 slots has ★)
  /** Options 1..4 for mondai1 & mondai3, or 4 fragments 1..4 for mondai2_star */
  options: { id: string; label: string }[];
  /** Correct option id ('1'..'4') for mondai1 & mondai3, or full order ['2','1','4','3'] for mondai2_star */
  correctOptionId: string;
  correctOrderIds?: string[];
  explanationId: string;
}

export interface SouMatomeKeigoTip {
  titleJp: string;
  summaryId: string;
  pairs: { plain: string; honorificOrHumble: string; meaningId: string; exampleJp: string }[];
}

export interface SouMatomeJissenDay {
  id: string; // e.g. 'w1-d7'
  weekNumber: number;
  dayNumber: 7;
  titleJp: string;
  titleId: string;
  timeLimitMin: number;
  mondai3PassageTitleJp: string;
  mondai3PassageLines: string[];
  questions: JissenQuestion[]; // 25 questions
  keigoTip: SouMatomeKeigoTip;
}

export interface SouMatomeWeek {
  weekNumber: number; // 1..6
  titleJp: string;
  themeId: string;
  days: SouMatomeLessonDay[]; // 6 days
  jissen: SouMatomeJissenDay; // Day 7
}

export interface RenshuuProgressRecord {
  score: number;
  total: number;
  completedAt: string;
}

export interface JissenProgressRecord {
  score: number;
  total: number;
  timeSec: number;
  completedAt: string;
}

export interface LearnProgressState {
  studiedDayIds: string[];
  renshuuCompleted: Record<string, RenshuuProgressRecord>;
  jissenResults: Record<number, JissenProgressRecord>;
}

