import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eraser,
  Eye,
  EyeOff,
  Flag,
  Flame,
  History,
  Layers,
  Play,
  RotateCcw,
  Send,
  Trophy,
  Users,
  Volume2,
  XCircle,
} from 'lucide-react';
import {
  getSectionMeta,
  getSubCategoryMeta,
  JLPT_SECTIONS,
} from '../data/categories';
import {
  buildOfficialSectionQuestions,
  getDailyVariationStats,
  JLPT_QUESTIONS,
  randomizeQuestionOptions,
} from '../data/questions';
import type {
  AppTab,
  FlashcardItem,
  JLPTMajorSection,
  JLPTQuestion,
  OnlineRoomState,
  QuizConfig,
  QuizSessionRecord,
  TtsRate,
  UserPreferences,
  UserProfile,
  WordAnalysis,
} from '../types/jlpt';
import {
  playVictorySfx,
  speakJapanese,
  stopJapaneseSpeech,
} from '../utils/audio';
import {
  getSevenDayStreakWindow,
  loadTodayCompletedQuestionIds,
  recordTodayCompletedQuestionIds,
} from '../utils/storage';
import { RubyText } from './RubyText';
import { SectionSelector } from './SectionSelector';
import { StarSentenceBuilder } from './StarSentenceBuilder';

interface QuizArenaProps {
  config: QuizConfig;
  soloSessionActive: boolean;
  preferences: UserPreferences;
  profile: UserProfile;
  flashcards: FlashcardItem[];
  onlineRoom: OnlineRoomState | null;
  clientId: string;
  onUpdateConfig: (next: QuizConfig) => void;
  onStartSoloSession: () => void;
  onExitSoloSession: () => void;
  onUpdatePreferences: (next: UserPreferences) => void;
  onRecordWordAttempt: (question: JLPTQuestion, isCorrect: boolean) => void;
  onSessionComplete: (
    record: QuizSessionRecord,
    encounteredAnalyses: WordAnalysis[]
  ) => number;
  onUpdateOnlineProgress: (answeredCount: number) => void;
  onSubmitOnlineExam: (payload: {
    answers: Record<string, string | string[]>;
    totalTimeSec: number;
  }) => void;
  onRematchOnlineRoom: () => void;
  onLeaveOnlineRoom: () => void;
  onNavigateTab: (tab: AppTab) => void;
  onOpenHistory: () => void;
}

interface GradedQuestionResult {
  question: JLPTQuestion;
  index: number;
  status: 'correct' | 'wrong' | 'unanswered';
  userAnswerLabel: string;
  correctAnswerLabel: string;
}

const OPTION_LETTERS = ['1', '2', '3', '4'];

function formatMMSS(totalSec: number): string {
  const safe = Math.max(0, Math.floor(totalSec));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function createInitialSectionTimers(): Record<JLPTMajorSection, number> {
  return {
    moji_goi: JLPT_SECTIONS[0].sectionTimerSec,
    bunpou_dokkai: JLPT_SECTIONS[1].sectionTimerSec,
    choukai: JLPT_SECTIONS[2].sectionTimerSec,
  };
}

export const QuizArena: React.FC<QuizArenaProps> = ({
  config,
  soloSessionActive,
  preferences,
  profile,
  flashcards,
  onlineRoom,
  clientId,
  onUpdateConfig,
  onStartSoloSession,
  onExitSoloSession,
  onUpdatePreferences,
  onRecordWordAttempt,
  onSessionComplete,
  onUpdateOnlineProgress,
  onSubmitOnlineExam,
  onRematchOnlineRoom,
  onLeaveOnlineRoom,
  onNavigateTab,
  onOpenHistory,
}) => {
  const isArenaActive = Boolean(
    onlineRoom && (onlineRoom.status === 'playing' || onlineRoom.status === 'finished')
  );
  const isRoomHost = Boolean(
    onlineRoom?.players.find((p) => p.clientId === clientId)?.isHost
  );
  const isQuizRunning = isArenaActive || soloSessionActive;

  const [soloSessionKey, setSoloSessionKey] = useState(0);
  const [todayCompletedIds, setTodayCompletedIds] = useState<string[]>(() =>
    loadTodayCompletedQuestionIds(profile.email)
  );
  const [sessionExcludeIds, setSessionExcludeIds] = useState<string[]>(() =>
    loadTodayCompletedQuestionIds(profile.email)
  );

  // Sync daily completed list when switching account or resetting progress
  useEffect(() => {
    const latest = loadTodayCompletedQuestionIds(profile.email);
    setTodayCompletedIds(latest);
    if (!soloSessionActive) {
      setSessionExcludeIds(latest);
    }
  }, [profile.email, profile.totalAnswered, soloSessionActive]);

  const questions = useMemo(() => {
    if (onlineRoom && onlineRoom.questionIds.length > 0) {
      const mapped = onlineRoom.questionIds
        .map((id) => JLPT_QUESTIONS.find((q) => q.id === id))
        .filter((q): q is JLPTQuestion => Boolean(q));
      if (mapped.length > 0) return randomizeQuestionOptions(mapped);
    }
    return buildOfficialSectionQuestions(
      config.sectionFilter,
      config.categoryFilter,
      sessionExcludeIds.length > 0 ? new Set(sessionExcludeIds) : undefined
    );
  }, [
    onlineRoom?.questionIds.join(','),
    config.sectionFilter,
    config.categoryFilter,
    soloSessionKey,
    sessionExcludeIds,
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, string>>({});
  const [starAnswers, setStarAnswers] = useState<Record<string, (string | null)[]>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(() => new Set());
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);

  const [isFinished, setIsFinished] = useState(false);
  const [gradedResults, setGradedResults] = useState<GradedQuestionResult[]>([]);
  const [finalScore, setFinalScore] = useState(0);
  const [finalCorrectCount, setFinalCorrectCount] = useState(0);
  const [totalDurationSec, setTotalDurationSec] = useState(0);
  const [autoSavedCount, setAutoSavedCount] = useState(0);

  const examStartRef = useRef<number>(Date.now());
  const sessionRecordedRef = useRef(false);

  const [sectionTimers, setSectionTimers] = useState<Record<JLPTMajorSection, number>>(
    () => createInitialSectionTimers()
  );

  const currentQuestion = questions[currentIndex];
  const activeSection: JLPTMajorSection =
    currentQuestion?.section ?? config.sectionFilter;

  const [showTranscript, setShowTranscript] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingOptId, setSpeakingOptId] = useState<string | null>(null);

  const resetExamState = useCallback(() => {
    setCurrentIndex(0);
    setMcqAnswers({});
    setStarAnswers({});
    setFlaggedIds(new Set());
    setConfirmSubmitOpen(false);
    setIsFinished(false);
    setGradedResults([]);
    setFinalScore(0);
    setFinalCorrectCount(0);
    setTotalDurationSec(0);
    setAutoSavedCount(0);
    setShowTranscript(false);
    setSectionTimers(createInitialSectionTimers());
    sessionRecordedRef.current = false;
    examStartRef.current = Date.now();
    stopJapaneseSpeech();
  }, []);

  // Reset when online match starts/restarts
  const onlineStartedAt = onlineRoom?.startedAt ?? null;
  useEffect(() => {
    if (!onlineStartedAt) return;
    resetExamState();
  }, [onlineStartedAt, resetExamState]);

  // Reset when solo exam starts/restarts
  useEffect(() => {
    if (!soloSessionActive || isArenaActive) return;
    resetExamState();
  }, [soloSessionActive, soloSessionKey, isArenaActive, resetExamState]);

  // Stop audio when switching question number
  useEffect(() => {
    setShowTranscript(false);
    stopJapaneseSpeech();
  }, [currentIndex, currentQuestion?.id]);

  const isQuestionAnswered = useCallback(
    (q: JLPTQuestion): boolean => {
      if (q.category === 'grammar_2_star') {
        const slots = starAnswers[q.id];
        return Boolean(slots && slots.length === 4 && slots.every((s) => s !== null));
      }
      return Boolean(mcqAnswers[q.id]);
    },
    [mcqAnswers, starAnswers]
  );

  const answeredCount = useMemo(
    () => questions.filter((q) => isQuestionAnswered(q)).length,
    [questions, isQuestionAnswered]
  );

  // Notify online room of answeredCount changes while exam is in progress
  const prevBroadcastCountRef = useRef(0);
  useEffect(() => {
    if (!isArenaActive || isFinished) return;
    if (answeredCount !== prevBroadcastCountRef.current) {
      prevBroadcastCountRef.current = answeredCount;
      onUpdateOnlineProgress(answeredCount);
    }
  }, [answeredCount, isArenaActive, isFinished, onUpdateOnlineProgress]);

  const submitExam = useCallback(() => {
    if (sessionRecordedRef.current) return;
    sessionRecordedRef.current = true;
    stopJapaneseSpeech();
    setConfirmSubmitOpen(false);

    const elapsedSec = Math.max(
      1,
      Math.round((Date.now() - examStartRef.current) / 1000)
    );

    const results: GradedQuestionResult[] = [];
    const serializedAnswers: Record<string, string | string[]> = {};
    const allAnalyses: WordAnalysis[] = [];
    const seenAnalysisIds = new Set<string>();
    let correctTotal = 0;

    questions.forEach((q, idx) => {
      if (!seenAnalysisIds.has(q.analysis.id)) {
        seenAnalysisIds.add(q.analysis.id);
        allAnalyses.push(q.analysis);
      }

      if (q.category === 'grammar_2_star' && q.starData) {
        const slots = starAnswers[q.id];
        const filled = Boolean(slots && slots.length === 4 && slots.every((s) => s !== null));
        const correctLabels = q.starData.correctOrderIds
          .map((cid) => q.starData?.fragments.find((f) => f.id === cid)?.plainText || '')
          .join(' ');

        if (!filled || !slots) {
          results.push({
            question: q,
            index: idx,
            status: 'unanswered',
            userAnswerLabel: 'Belum dijawab',
            correctAnswerLabel: correctLabels,
          });
        } else {
          const cleanIds = slots as string[];
          serializedAnswers[q.id] = cleanIds;
          const isExact = q.starData.correctOrderIds.every(
            (cid, sIdx) => cleanIds[sIdx] === cid
          );
          if (isExact) correctTotal += 1;
          onRecordWordAttempt(q, isExact);

          const userLabels = cleanIds
            .map((cid) => q.starData?.fragments.find((f) => f.id === cid)?.plainText || '')
            .join(' ');

          results.push({
            question: q,
            index: idx,
            status: isExact ? 'correct' : 'wrong',
            userAnswerLabel: userLabels,
            correctAnswerLabel: correctLabels,
          });
        }
      } else {
        const selectedId = mcqAnswers[q.id];
        const correctOpt = q.options?.find((o) => o.id === q.correctOptionId);
        const correctLabel = correctOpt?.plainText || '—';

        if (!selectedId) {
          results.push({
            question: q,
            index: idx,
            status: 'unanswered',
            userAnswerLabel: 'Belum dijawab',
            correctAnswerLabel: correctLabel,
          });
        } else {
          serializedAnswers[q.id] = selectedId;
          const isExact = selectedId === q.correctOptionId;
          if (isExact) correctTotal += 1;
          onRecordWordAttempt(q, isExact);

          const userOpt = q.options?.find((o) => o.id === selectedId);
          results.push({
            question: q,
            index: idx,
            status: isExact ? 'correct' : 'wrong',
            userAnswerLabel: userOpt?.plainText || '—',
            correctAnswerLabel: correctLabel,
          });
        }
      }
    });

    const total = questions.length;
    const score = correctTotal * 100;
    const accuracyPct = total > 0 ? Math.round((correctTotal / total) * 100) : 0;
    const avgResponseSec = Number(
      (elapsedSec / Math.max(1, total)).toFixed(1)
    );

    const activeCfg = onlineRoom ? onlineRoom.config : config;
    const scopeLabel =
      activeCfg.categoryFilter !== 'all'
        ? getSubCategoryMeta(activeCfg.categoryFilter).labelId
        : getSectionMeta(activeCfg.sectionFilter).labelId;

    let arenaRank: number | undefined;
    let arenaTotalPlayers: number | undefined;
    if (isArenaActive && onlineRoom) {
      const simulated = onlineRoom.players.map((p) =>
        p.clientId === clientId ? { ...p, score } : p
      );
      const sorted = [...simulated].sort((a, b) => b.score - a.score);
      const rankIdx = sorted.findIndex((p) => p.clientId === clientId);
      arenaRank = rankIdx >= 0 ? rankIdx + 1 : 1;
      arenaTotalPlayers = onlineRoom.players.length;
    }

    const added = onSessionComplete(
      {
        id: `sess-${Date.now()}`,
        completedAt: new Date().toISOString(),
        mode: isArenaActive ? 'arena' : 'solo',
        categoryScope: scopeLabel,
        score,
        totalQuestions: total,
        correctCount: correctTotal,
        accuracyPct,
        avgResponseSec,
        arenaRank,
        arenaTotalPlayers,
        roomCode: onlineRoom?.roomId,
      },
      allAnalyses
    );

    if (isArenaActive) {
      onSubmitOnlineExam({
        answers: serializedAnswers,
        totalTimeSec: elapsedSec,
      });
    }

    const updatedToday = recordTodayCompletedQuestionIds(
      profile.email,
      questions.map((q) => q.id)
    );
    setTodayCompletedIds(updatedToday);

    setGradedResults(results);
    setFinalScore(score);
    setFinalCorrectCount(correctTotal);
    setTotalDurationSec(elapsedSec);
    setAutoSavedCount(added);
    playVictorySfx(preferences.sfxEnabled);
    setIsFinished(true);
  }, [
    questions,
    mcqAnswers,
    starAnswers,
    onlineRoom,
    config,
    isArenaActive,
    clientId,
    profile.email,
    onRecordWordAttempt,
    onSessionComplete,
    onSubmitOnlineExam,
    preferences.sfxEnabled,
  ]);

  // Per-section countdown timer tick (runs only while exam is active)
  useEffect(() => {
    if (!isQuizRunning || isFinished || !currentQuestion) return;
    const id = window.setInterval(() => {
      setSectionTimers((prev) => {
        const currentLeft = prev[activeSection];
        if (currentLeft <= 1) {
          return { ...prev, [activeSection]: 0 };
        }
        return { ...prev, [activeSection]: currentLeft - 1 };
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [isQuizRunning, isFinished, currentQuestion, activeSection]);

  // Auto-submit exam when active section timer hits 00:00
  useEffect(() => {
    if (isQuizRunning && !isFinished && sectionTimers[activeSection] === 0) {
      submitExam();
    }
  }, [isQuizRunning, isFinished, sectionTimers, activeSection, submitExam]);

  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion || isFinished) return;
    setMcqAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleClearCurrentAnswer = () => {
    if (!currentQuestion || isFinished) return;
    if (currentQuestion.category === 'grammar_2_star') {
      setStarAnswers((prev) => {
        const next = { ...prev };
        delete next[currentQuestion.id];
        return next;
      });
    } else {
      setMcqAnswers((prev) => {
        const next = { ...prev };
        delete next[currentQuestion.id];
        return next;
      });
    }
  };

  const handlePlaceStarFragment = (fragmentId: string) => {
    if (!currentQuestion || isFinished) return;
    setStarAnswers((prev) => {
      const slots = [...(prev[currentQuestion.id] ?? [null, null, null, null])];
      const idx = slots.findIndex((x) => x === null);
      if (idx === -1) return prev;
      slots[idx] = fragmentId;
      return { ...prev, [currentQuestion.id]: slots };
    });
  };

  const handleRemoveStarSlot = (slotIdx: number) => {
    if (!currentQuestion || isFinished) return;
    setStarAnswers((prev) => {
      const slots = [...(prev[currentQuestion.id] ?? [null, null, null, null])];
      slots[slotIdx] = null;
      return { ...prev, [currentQuestion.id]: slots };
    });
  };

  const handleClearStarSlots = () => {
    if (!currentQuestion || isFinished) return;
    setStarAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: [null, null, null, null],
    }));
  };

  const handleToggleFlag = () => {
    if (!currentQuestion) return;
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) {
        next.delete(currentQuestion.id);
      } else {
        next.add(currentQuestion.id);
      }
      return next;
    });
  };

  const handleStartSoloClick = () => {
    const latestToday = loadTodayCompletedQuestionIds(profile.email);
    setTodayCompletedIds(latestToday);
    setSessionExcludeIds(latestToday);
    setSoloSessionKey((k) => k + 1);
    onStartSoloSession();
  };

  const handleRestartSolo = () => {
    stopJapaneseSpeech();
    const latestToday = loadTodayCompletedQuestionIds(profile.email);
    setTodayCompletedIds(latestToday);
    setSessionExcludeIds(latestToday);
    setSoloSessionKey((k) => k + 1);
  };

  const handleExitAndRemember = () => {
    stopJapaneseSpeech();
    if (!isArenaActive) {
      const workedIds = isFinished
        ? questions.map((q) => q.id)
        : questions.filter((q) => isQuestionAnswered(q)).map((q) => q.id);
      if (workedIds.length > 0) {
        const updatedToday = recordTodayCompletedQuestionIds(
          profile.email,
          workedIds
        );
        setTodayCompletedIds(updatedToday);
        setSessionExcludeIds(updatedToday);
      } else {
        const latestToday = loadTodayCompletedQuestionIds(profile.email);
        setTodayCompletedIds(latestToday);
        setSessionExcludeIds(latestToday);
      }
    }
    onExitSoloSession();
  };

  // Close confirmation pop-up on Escape key
  useEffect(() => {
    if (!confirmSubmitOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setConfirmSubmitOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [confirmSubmitOpen]);

  // =========================================================
  // KUIS LOBBY SETUP SCREEN (Never auto-starts on tab click)
  // =========================================================
  if (!isQuizRunning) {
    const dailyStats = getDailyVariationStats(
      config.sectionFilter,
      config.categoryFilter,
      todayCompletedIds
    );

    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-2">
          <p className="text-xs font-semibold text-[#2563EB]">
            Kuis · Simulasi Ujian JLPT N3
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Pilih Bagian &amp; Jenis Soal
          </h1>
          <p className="text-sm text-[#475569] leading-relaxed">
            Selama waktu berjalan, Anda bebas berpindah antar nomor soal, menandai soal ragu-ragu, dan mengubah jawaban kapan saja sebelum mengumpulkan. Soal yang sudah dikerjakan hari ini tidak akan muncul lagi sampai besok.
          </p>
          <p className="text-xs font-medium text-[#2563EB] pt-1">
            {dailyStats.unseenCount > 0
              ? `Variasi soal baru hari ini: ${dailyStats.unseenCount} / ${dailyStats.poolTotal} soal belum dikerjakan (otomatis direset besok)`
              : `Seluruh ${dailyStats.poolTotal} variasi soal di bagian ini sudah dikerjakan hari ini — sesi tambahan mengacak ulang, dan variasi harian otomatis direset besok.`}
          </p>
        </div>

        <SectionSelector
          sectionFilter={config.sectionFilter}
          categoryFilter={config.categoryFilter}
          onChange={(sectionFilter, categoryFilter) =>
            onUpdateConfig({ ...config, sectionFilter, categoryFilter })
          }
          footerSlot={
            <button
              type="button"
              onClick={handleStartSoloClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <Play className="w-4 h-4 fill-current" aria-hidden="true" />
              Mulai Kuis
            </button>
          }
        />
      </main>
    );
  }

  // =========================================================
  // POST-EXAM RESULTS, QUESTION SUMMARY, ARENA & FLASHCARD LINK
  // =========================================================
  if (isFinished) {
    const total = questions.length;
    const accuracyPct = total > 0 ? Math.round((finalCorrectCount / total) * 100) : 0;
    const sevenDays = getSevenDayStreakWindow(profile);

    const rankedPlayers = onlineRoom
      ? [...onlineRoom.players].sort((a, b) => b.score - a.score)
      : [];

    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
          <div className="p-6 sm:p-8 bg-[#F8FAFC] border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#2563EB]">
                {isArenaActive && onlineRoom
                  ? `Arena Pertandingan · Room ${onlineRoom.roomId}`
                  : 'Hasil Kuis'}
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
                {isArenaActive
                  ? 'Pertandingan Selesai!'
                  : 'Jawaban Berhasil Dikumpulkan!'}
              </h1>
              <p className="text-sm text-[#475569] flex items-center gap-1.5 pt-0.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" aria-hidden="true" />
                <span>
                  Tersimpan ke Riwayat Frekuensi &amp;{' '}
                  {autoSavedCount > 0
                    ? `${autoSavedCount} kotoba baru ditambahkan ke Flashcard Kotoba untuk direview.`
                    : 'seluruh kotoba sesi tersedia di Flashcard Kotoba untuk direview.'}
                </span>
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center shrink-0">
              <Trophy className="w-7 h-7 text-[#2563EB]" aria-hidden="true" />
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* 4 Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <p className="text-xs text-[#475569]">Skor Total</p>
                <p className="mt-1 font-mono-num text-2xl font-bold text-[#2563EB]">
                  {finalScore}
                </p>
                <p className="text-xs text-[#64748B] mt-0.5">XP masuk riwayat</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <p className="text-xs text-[#475569]">Akurasi</p>
                <p className="mt-1 font-mono-num text-2xl font-bold text-[#0F172A]">
                  {accuracyPct}%
                </p>
                <p className="font-mono-num text-xs text-[#64748B] mt-0.5">
                  {finalCorrectCount} / {total} benar
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <p className="text-xs text-[#475569]">Waktu Pengerjaan</p>
                <p className="mt-1 font-mono-num text-2xl font-bold text-[#0F172A]">
                  {formatMMSS(totalDurationSec)}
                </p>
                <p className="text-xs text-[#64748B] mt-0.5">total durasi</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <p className="text-xs text-[#475569]">Flashcard Kotoba</p>
                <p className="mt-1 font-mono-num text-2xl font-bold text-[#0F172A]">
                  {flashcards.length}
                </p>
                <p className="text-xs text-[#64748B] mt-0.5">kartu siap direview</p>
              </div>
            </div>

            {/* Online Arena Standings */}
            {isArenaActive && rankedPlayers.length > 0 && (
              <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                    <h2 className="font-display font-bold text-sm text-[#0F172A]">
                      Klasemen Arena Pertandingan
                    </h2>
                  </div>
                  <span className="text-xs text-[#475569]">
                    {onlineRoom?.status === 'finished'
                      ? 'Semua peserta sudah mengumpulkan'
                      : 'Menunggu teman mengumpulkan jawaban...'}
                  </span>
                </div>

                <div className="divide-y divide-[#E2E8F0] bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                  {rankedPlayers.map((p, idx) => (
                    <div
                      key={p.clientId}
                      className={`px-4 py-3 flex items-center justify-between gap-3 text-sm ${
                        p.clientId === clientId ? 'bg-[#EFF6FF]/60' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-mono-num font-bold text-xs w-6 text-[#2563EB]">
                          #{idx + 1}
                        </span>
                        <span className="font-semibold text-[#0F172A] truncate">
                          {p.name}
                          {p.clientId === clientId ? ' (Kamu)' : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs shrink-0">
                        <span className="text-[#475569] font-mono-num">
                          {p.answeredCount}/{questions.length} terjawab ·{' '}
                          {p.finished ? 'Selesai' : 'Mengerjakan'}
                        </span>
                        <span className="font-mono-num font-bold text-[#2563EB]">
                          {p.score} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compact Exam Answer Sheet Summary (Review Kotoba via Flashcard) */}
            <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display font-bold text-sm text-[#0F172A]">
                  Ringkasan Lembar Jawaban ({finalCorrectCount}/{total} Benar)
                </h2>
                <span className="text-xs text-[#475569]">
                  Buka Flashcard Kotoba untuk review lengkap arti, kanji &amp; contoh kalimat
                </span>
              </div>

              <div className="divide-y divide-[#E2E8F0] bg-white border border-[#E2E8F0] rounded-xl overflow-hidden max-h-[300px] overflow-y-auto">
                {gradedResults.map((item) => (
                  <div
                    key={item.question.id}
                    className="px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {item.status === 'correct' ? (
                        <CheckCircle2
                          className="w-4 h-4 text-[#059669] shrink-0"
                          aria-hidden="true"
                        />
                      ) : (
                        <XCircle
                          className={`w-4 h-4 shrink-0 ${
                            item.status === 'wrong'
                              ? 'text-[#DC2626]'
                              : 'text-[#94A3B8]'
                          }`}
                          aria-hidden="true"
                        />
                      )}
                      <span className="font-mono-num font-bold text-[#475569] shrink-0">
                        No.{item.index + 1}
                      </span>
                      <span className="font-jp font-bold text-sm text-[#0F172A] shrink-0">
                        {item.question.analysis.headword}
                      </span>
                      <span className="text-[#475569] truncate">
                        {item.question.analysis.meaningId}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 font-jp shrink-0">
                      {item.status === 'correct' ? (
                        <span className="text-[#059669] font-semibold">
                          Benar: {item.correctAnswerLabel}
                        </span>
                      ) : (
                        <span className="text-[#334155]">
                          <span className="text-[#DC2626]">
                            Jawabanmu: {item.userAnswerLabel}
                          </span>{' '}
                          ·{' '}
                          <span className="text-[#059669] font-semibold">
                            Kunci: {item.correctAnswerLabel}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7-Day Streak Tracker */}
            <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                  <h2 className="font-display font-bold text-sm text-[#0F172A]">
                    Streak Harian 7 Hari
                  </h2>
                </div>
                <span className="text-xs text-[#475569]">Hari ini tercatat aktif</span>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {sevenDays.map((day) => (
                  <div
                    key={day.dateKey}
                    className={`p-2.5 rounded-lg border text-center ${
                      day.active
                        ? 'bg-[#EFF6FF] border-[#2563EB] text-[#1D4ED8]'
                        : day.isToday
                        ? 'bg-white border-[#0F172A]/40 text-[#0F172A]'
                        : 'bg-white border-[#E2E8F0] text-[#64748B]'
                    }`}
                  >
                    <p className="text-[11px] font-medium">{day.dayShort}</p>
                    <p className="font-mono-num text-sm font-bold mt-0.5">
                      {day.dayNum}
                    </p>
                    <p className="font-mono-num text-[10px] mt-1">
                      {day.active ? `${day.questionsAnswered} soal` : '—'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Post-Exam Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              {isArenaActive ? (
                <button
                  type="button"
                  onClick={() => {
                    onLeaveOnlineRoom();
                    onNavigateTab('lobby');
                  }}
                  className="px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#DC2626] text-xs font-semibold text-[#475569] hover:text-[#DC2626] transition-colors whitespace-nowrap"
                >
                  Keluar Room
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleExitAndRemember}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] text-xs font-semibold text-[#0F172A] transition-colors whitespace-nowrap"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Pilih Bagian Lain
                </button>
              )}

              <button
                type="button"
                onClick={onOpenHistory}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] text-sm font-semibold text-[#0F172A] transition-colors whitespace-nowrap"
              >
                <History className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                Lihat Riwayat
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('flashcards')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <Layers className="w-4 h-4" aria-hidden="true" />
                Buka Flashcard Kotoba
              </button>

              {isArenaActive ? (
                isRoomHost ? (
                  <button
                    type="button"
                    onClick={() => {
                      onRematchOnlineRoom();
                      onNavigateTab('lobby');
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors whitespace-nowrap"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    Main Lagi di Room
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNavigateTab('lobby')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors whitespace-nowrap"
                  >
                    Kembali ke Battle Lobby
                  </button>
                )
              ) : (
                <button
                  type="button"
                  onClick={handleRestartSolo}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  Kuis Lagi
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  const subCatMeta = getSubCategoryMeta(currentQuestion.category);
  const secMeta = getSectionMeta(currentQuestion.section);
  const hasPassage = Boolean(
    currentQuestion.passage && currentQuestion.passage.length > 0
  );
  const hasBrochure = Boolean(currentQuestion.brochure);
  const hasReferencePanel = hasPassage || hasBrochure;

  const isListeningSection = currentQuestion.section === 'choukai';
  const isQuickResponse = currentQuestion.category === 'listening_quick';
  const isStarQuestion = currentQuestion.category === 'grammar_2_star';
  const sectionSecondsLeft = sectionTimers[activeSection];
  const isLowTime = sectionSecondsLeft <= 120;

  const currentSelectedMcq = mcqAnswers[currentQuestion.id] ?? null;
  const currentStarSlots = starAnswers[currentQuestion.id] ?? [
    null,
    null,
    null,
    null,
  ];
  const currentHasAnswer = isQuestionAnswered(currentQuestion);
  const currentIsFlagged = flaggedIds.has(currentQuestion.id);
  const unansweredCount = questions.length - answeredCount;

  const handlePlayListeningPrompt = () => {
    if (!currentQuestion.audioScript) return;
    speakJapanese(
      currentQuestion.audioScript,
      preferences.ttsRate,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">
      {/* Top Exam HUD: Timer + Quick Controls + Submit Button */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {!isArenaActive && (
            <button
              type="button"
              onClick={handleExitAndRemember}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#475569] hover:text-[#0F172A] pr-2 border-r border-[#E2E8F0]"
              title="Kembali pilih bagian"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Ganti Bagian
            </button>
          )}
          <span className="font-mono-num font-bold text-[#2563EB]">
            Soal {String(currentIndex + 1).padStart(2, '0')} /{' '}
            {String(questions.length).padStart(2, '0')}
          </span>
          <span className="text-[#CBD5E1]" aria-hidden="true">
            ·
          </span>
          <span className="font-jp font-semibold text-[#0F172A]">
            {secMeta.jpName}
          </span>
          <span className="text-[#CBD5E1]" aria-hidden="true">
            ·
          </span>
          <span className="text-[#475569]">
            {subCatMeta.jpName} ({subCatMeta.labelId})
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
              isLowTime
                ? 'bg-[#FEF2F2] border-[#FECACA] text-[#DC2626]'
                : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#1D4ED8]'
            }`}
            title={`Waktu resmi bagian ${secMeta.jpName}: ${secMeta.officialMinutes} menit`}
          >
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Sisa Waktu:</span>
            <span className="font-mono-num font-bold">
              {formatMMSS(sectionSecondsLeft)}
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              onUpdatePreferences({
                ...preferences,
                furiganaEnabled: !preferences.furiganaEnabled,
              })
            }
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              preferences.furiganaEnabled
                ? 'bg-[#EFF6FF] border-[#2563EB] text-[#1D4ED8]'
                : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569]'
            }`}
          >
            Furigana: {preferences.furiganaEnabled ? 'On' : 'Off'}
          </button>

          <div className="inline-flex items-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-0.5">
            {([0.75, 1.0, 1.2] as TtsRate[]).map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() =>
                  onUpdatePreferences({ ...preferences, ttsRate: rate })
                }
                className={`px-2 py-1 rounded-md font-mono-num text-[11px] font-semibold transition-colors ${
                  preferences.ttsRate === rate
                    ? 'bg-white text-[#2563EB] border border-[#E2E8F0]'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setConfirmSubmitOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            <Send className="w-3.5 h-3.5" aria-hidden="true" />
            Kumpulkan ({answeredCount}/{questions.length})
          </button>
        </div>
      </div>

      {/* Submit Confirmation Modal Pop-Up (Zero window.confirm) */}
      {confirmSubmitOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-submit-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/50 backdrop-blur-xs"
          onClick={() => setConfirmSubmitOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-[#2563EB]">
                Konfirmasi Pengumpulan Jawaban
              </p>
              <h2
                id="confirm-submit-title"
                className="font-display font-bold text-xl text-[#0F172A]"
              >
                Yakin ingin mengumpulkan jawaban?
              </h2>
              <p className="text-xs text-[#475569] leading-relaxed">
                Jika memilih <strong>Iya</strong>, jawaban langsung dikumpulkan dan dinilai. Jika memilih <strong>Tidak</strong>, Anda kembali ke soal selama waktu masih tersisa.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <p className="text-[#475569]">Terjawab</p>
                <p className="mt-0.5 font-mono-num text-base font-bold text-[#0F172A]">
                  {answeredCount} / {questions.length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <p className="text-[#475569]">Sisa Waktu</p>
                <p
                  className={`mt-0.5 font-mono-num text-base font-bold ${
                    isLowTime ? 'text-[#DC2626]' : 'text-[#2563EB]'
                  }`}
                >
                  {formatMMSS(sectionSecondsLeft)}
                </p>
              </div>
              {unansweredCount > 0 && (
                <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA]">
                  <p className="text-[#991B1B]">Belum Dijawab</p>
                  <p className="mt-0.5 font-mono-num text-base font-bold text-[#DC2626]">
                    {unansweredCount} soal
                  </p>
                </div>
              )}
              {flaggedIds.size > 0 && (
                <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]">
                  <p className="text-[#92400E]">Ditandai Ragu</p>
                  <p className="mt-0.5 font-mono-num text-base font-bold text-[#D97706]">
                    {flaggedIds.size} soal
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setConfirmSubmitOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0F172A] text-xs font-semibold text-[#0F172A] transition-colors"
              >
                Tidak, Kembali ke Soal
              </button>
              <button
                type="button"
                onClick={submitExam}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors"
              >
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
                Iya, Kumpulkan Jawaban
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Arena Live Progress Strip (Only shows answered progress, keeps answers private) */}
      {isArenaActive && onlineRoom && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:px-6 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#2563EB] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" aria-hidden="true" />
              Arena Pertandingan · Room {onlineRoom.roomId}
            </span>
            <span className="text-[#475569]">
              Skor dihitung serentak saat peserta mengumpulkan jawaban
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {onlineRoom.players.map((p) => (
              <div
                key={p.clientId}
                className={`px-3 py-2 rounded-xl border flex items-center justify-between gap-2 text-xs ${
                  p.clientId === clientId
                    ? 'bg-[#EFF6FF] border-[#2563EB]'
                    : 'bg-[#F8FAFC] border-[#E2E8F0]'
                }`}
              >
                <span className="font-semibold text-[#0F172A] truncate">
                  {p.name}
                  {p.clientId === clientId ? ' (Kamu)' : ''}
                </span>
                <span className="font-mono-num text-[11px] font-semibold text-[#2563EB] shrink-0">
                  {p.finished
                    ? 'Sudah Kumpul'
                    : `${p.clientId === clientId ? answeredCount : p.answeredCount}/${questions.length} isi`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Free Question Number Navigator Grid (Jump to any question 1..N) */}
      <section
        aria-label="Navigasi nomor soal"
        className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:px-6 space-y-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-[#0F172A]">
            Navigasi Nomor Soal (Klik nomor untuk pindah bebas)
          </span>
          <div className="flex flex-wrap items-center gap-3 text-[#475569]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#2563EB]" />
              Aktif
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#EFF6FF] border border-[#93C5FD]" />
              Terjawab ({answeredCount})
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-white border border-[#E2E8F0]" />
              Kosong ({unansweredCount})
            </span>
            {flaggedIds.size > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#FEF3C7] border border-[#F59E0B]" />
                Ragu ({flaggedIds.size})
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {questions.map((q, idx) => {
            const isActive = idx === currentIndex;
            const answered = isQuestionAnswered(q);
            const isFlagged = flaggedIds.has(q.id);

            let btnStyle =
              'bg-white border-[#E2E8F0] text-[#475569] hover:border-[#2563EB] hover:text-[#0F172A]';
            if (isActive) {
              btnStyle = 'bg-[#2563EB] border-[#2563EB] text-white font-bold';
            } else if (answered) {
              btnStyle =
                'bg-[#EFF6FF] border-[#93C5FD] text-[#1D4ED8] font-semibold';
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-9 h-9 rounded-lg border font-mono-num text-xs transition-colors flex items-center justify-center ${btnStyle} ${
                  isFlagged && !isActive ? 'ring-2 ring-[#F59E0B]/70' : ''
                }`}
                title={`Soal ${idx + 1}${answered ? ' (Terjawab)' : ' (Belum dijawab)'}${
                  isFlagged ? ' · Ditandai ragu' : ''
                }`}
              >
                {idx + 1}
                {isFlagged && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#F59E0B] border border-white"
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Question Stage */}
      <div
        className={
          hasReferencePanel
            ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'
            : 'max-w-4xl mx-auto'
        }
      >
        {/* Left Reference Panel: Reading Passage OR Brochure/Table (情報検索) */}
        {hasPassage && currentQuestion.passage && (
          <article className="lg:col-span-6 bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-4">
            <div className="pb-3 border-b border-[#F1F5F9]">
              <p className="text-xs font-semibold text-[#2563EB]">
                Wacana Bacaan N3
              </p>
              {currentQuestion.passageTitle && (
                <h2 className="font-display font-bold text-lg text-[#0F172A] mt-0.5">
                  {currentQuestion.passageTitle}
                </h2>
              )}
            </div>
            <div className="space-y-4 text-base sm:text-lg leading-loose text-[#0F172A]">
              {currentQuestion.passage.map((para, pIdx) => (
                <p key={pIdx}>
                  <RubyText
                    segments={para}
                    furiganaEnabled={preferences.furiganaEnabled}
                  />
                </p>
              ))}
            </div>
          </article>
        )}

        {!hasPassage && hasBrochure && currentQuestion.brochure && (
          <article className="lg:col-span-6 bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-4">
            <div className="pb-3 border-b border-[#F1F5F9] space-y-1">
              <p className="text-xs font-semibold text-[#2563EB]">
                {currentQuestion.brochure.headerBadge}
              </p>
              <h2 className="font-jp font-bold text-lg text-[#0F172A]">
                {currentQuestion.brochure.title}
              </h2>
              <p className="text-xs text-[#475569]">
                {currentQuestion.brochure.subtitle}
              </p>
            </div>

            <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    {currentQuestion.brochure.columns.map((col, idx) => (
                      <th
                        key={idx}
                        className="px-3 py-2.5 font-jp font-bold text-[#0F172A] whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {currentQuestion.brochure.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="bg-white">
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`px-3 py-2.5 font-jp text-[#334155] ${
                            cIdx === 0 ? 'font-semibold text-[#0F172A]' : ''
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {currentQuestion.brochure.notes.length > 0 && (
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <p className="text-xs font-semibold text-[#0F172A]">
                  Catatan Penting:
                </p>
                <ul className="space-y-1 text-xs font-jp text-[#334155]">
                  {currentQuestion.brochure.notes.map((note, nIdx) => (
                    <li key={nIdx}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        )}

        <section
          className={hasReferencePanel ? 'lg:col-span-6 space-y-4' : 'space-y-4'}
        >
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <p className="text-xs sm:text-sm font-medium text-[#475569] flex-1">
                {currentQuestion.instructionId}
              </p>
              <button
                type="button"
                onClick={handleToggleFlag}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  currentIsFlagged
                    ? 'bg-[#FEF3C7] border-[#F59E0B] text-[#B45309]'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:border-[#F59E0B]'
                }`}
              >
                <Flag className="w-3.5 h-3.5" aria-hidden="true" />
                {currentIsFlagged ? 'Ditandai Ragu' : 'Tandai Ragu'}
              </button>
            </div>

            {isListeningSection ? (
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-[#2563EB]">
                        聴解 · {subCatMeta.jpName} (Web Speech API ja-JP)
                      </p>
                      <p className="text-xs text-[#475569] mt-0.5">
                        Pembicara: {currentQuestion.audioSpeaker || 'Penutur Jepang'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePlayListeningPrompt}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                          isSpeaking
                            ? 'bg-[#1D4ED8] text-white'
                            : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" aria-hidden="true" />
                        {isSpeaking
                          ? 'Sedang Memutar...'
                          : `Putar Audio (${preferences.ttsRate}x)`}
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowTranscript((prev) => !prev)}
                        className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] text-xs font-semibold text-[#0F172A] transition-colors whitespace-nowrap shrink-0"
                      >
                        {showTranscript ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                            Sembunyikan Teks
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                            Teks Fallback
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {showTranscript && currentQuestion.audioScript && (
                    <div className="pt-3 border-t border-[#E2E8F0]">
                      <p className="text-xs font-semibold text-[#475569] mb-1">
                        Transkrip Audio:
                      </p>
                      <p className="font-jp text-base sm:text-lg leading-relaxed text-[#0F172A]">
                        {currentQuestion.audioScript}
                      </p>
                    </div>
                  )}
                </div>

                {!isQuickResponse && (
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <p className="text-lg sm:text-xl text-[#0F172A] leading-relaxed font-jp">
                      <RubyText
                        segments={currentQuestion.promptSegments}
                        furiganaEnabled={preferences.furiganaEnabled}
                      />
                    </p>
                  </div>
                )}
              </div>
            ) : !isStarQuestion ? (
              <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <p className="text-xl sm:text-2xl text-[#0F172A] leading-loose">
                  <RubyText
                    segments={currentQuestion.promptSegments}
                    furiganaEnabled={preferences.furiganaEnabled}
                  />
                </p>
              </div>
            ) : null}

            {isStarQuestion && currentQuestion.starData ? (
              <StarSentenceBuilder
                starData={currentQuestion.starData}
                placedIds={currentStarSlots}
                furiganaEnabled={preferences.furiganaEnabled}
                onPlaceFragment={handlePlaceStarFragment}
                onRemoveSlot={handleRemoveStarSlot}
                onClearAll={handleClearStarSlots}
              />
            ) : (
              currentQuestion.options && (
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((opt, idx) => {
                    const isSelected = currentSelectedMcq === opt.id;

                    return (
                      <div key={opt.id} className="flex items-stretch gap-2">
                        <button
                          type="button"
                          onClick={() => handleSelectOption(opt.id)}
                          className={`flex-1 text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-3.5 min-h-[52px] ${
                            isSelected
                              ? 'bg-[#EFF6FF] border-[#2563EB] text-[#0F172A] ring-1 ring-[#2563EB]'
                              : 'bg-white border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#EFF6FF]/40 text-[#0F172A]'
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-lg font-mono-num text-xs font-bold flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? 'bg-[#2563EB] border-[#2563EB] text-white'
                                : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569]'
                            }`}
                          >
                            {OPTION_LETTERS[idx] ?? idx + 1}
                          </span>
                          <span className="text-base sm:text-lg font-jp">
                            <RubyText
                              segments={opt.label}
                              furiganaEnabled={preferences.furiganaEnabled}
                            />
                          </span>
                        </button>

                        {isQuickResponse && (
                          <button
                            type="button"
                            onClick={() =>
                              speakJapanese(
                                opt.plainText,
                                preferences.ttsRate,
                                () => setSpeakingOptId(opt.id),
                                () => setSpeakingOptId(null),
                                () => setSpeakingOptId(null)
                              )
                            }
                            title="Putar suara pilihan ini"
                            className={`px-3 rounded-xl border transition-colors shrink-0 flex items-center justify-center ${
                              speakingOptId === opt.id
                                ? 'border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8]'
                                : 'border-[#E2E8F0] bg-white text-[#475569] hover:text-[#2563EB]'
                            }`}
                          >
                            <Volume2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )
            )}

            {/* Bottom Prev / Clear / Next / Submit Controls */}
            <div className="pt-4 border-t border-[#F1F5F9] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] disabled:opacity-45 text-xs font-semibold text-[#0F172A] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  Sebelumnya
                </button>

                {currentHasAnswer && (
                  <button
                    type="button"
                    onClick={handleClearCurrentAnswer}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#DC2626] text-xs font-medium text-[#475569] hover:text-[#DC2626] transition-colors"
                    title="Kosongkan jawaban pada soal ini"
                  >
                    <Eraser className="w-3.5 h-3.5" aria-hidden="true" />
                    Hapus Pilihan
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {currentIndex + 1 < questions.length ? (
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentIndex((prev) =>
                        Math.min(questions.length - 1, prev + 1)
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold transition-colors"
                  >
                    Berikutnya
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmSubmitOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                    Kumpulkan Jawaban
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
