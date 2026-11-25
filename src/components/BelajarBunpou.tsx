import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eraser,
  Lightbulb,
  Play,
  RotateCcw,
  Send,
  Sparkles,
  Volume2,
  XCircle,
} from 'lucide-react';
import {
  SOU_MATOME_BUNPOU_WEEKS,
  SOU_MATOME_TOTAL_JISSEN,
  SOU_MATOME_TOTAL_LESSON_DAYS,
} from '../data/souMatomeBunpou';
import type {
  JissenQuestion,
  LearnProgressState,
  TtsRate,
  UserPreferences,
} from '../types/jlpt';
import { playCorrectSfx, playWrongSfx, speakJapanese, stopJapaneseSpeech } from '../utils/audio';

interface BelajarBunpouProps {
  preferences: UserPreferences;
  learnProgress: LearnProgressState;
  onUpdatePreferences: (next: UserPreferences) => void;
  onSaveLearnProgress: (next: LearnProgressState) => void;
}

type DaySubTab = 'materi' | 'renshuu';
type JissenPhase = 'intro' | 'playing' | 'review';

const TTS_RATES: TtsRate[] = [0.75, 1.0, 1.2];

function formatMMSS(totalSec: number): string {
  const safe = Math.max(0, Math.floor(totalSec));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const BelajarBunpou: React.FC<BelajarBunpouProps> = ({
  preferences,
  learnProgress,
  onUpdatePreferences,
  onSaveLearnProgress,
}) => {
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);
  const [daySubTab, setDaySubTab] = useState<DaySubTab>('materi');
  const [playingExampleKey, setPlayingExampleKey] = useState<string | null>(null);

  // Renshuu interactive state (keyed per day)
  const [part1Answers, setPart1Answers] = useState<Record<string, string>>({});
  const [part2Answers, setPart2Answers] = useState<Record<string, number[]>>({});
  const [renshuuSubmitted, setRenshuuSubmitted] = useState(false);

  // Jissen Mondai state (Day 7)
  const [jissenPhase, setJissenPhase] = useState<JissenPhase>('intro');
  const [jissenUseTimer, setJissenUseTimer] = useState<boolean>(true);
  const [jissenRemainingSec, setJissenRemainingSec] = useState<number>(15 * 60);
  const [jissenElapsedSec, setJissenElapsedSec] = useState<number>(0);
  const [jissenCurrentIdx, setJissenCurrentIdx] = useState<number>(0);
  const [jissenMcqAnswers, setJissenMcqAnswers] = useState<Record<string, string>>({});
  const [jissenStarAnswers, setJissenStarAnswers] = useState<Record<string, string[]>>({});
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  const activeWeek = useMemo(
    () =>
      SOU_MATOME_BUNPOU_WEEKS.find((w) => w.weekNumber === selectedWeekNum) ??
      SOU_MATOME_BUNPOU_WEEKS[0],
    [selectedWeekNum]
  );

  const activeLessonDay = useMemo(
    () =>
      selectedDayNum >= 1 && selectedDayNum <= 6
        ? activeWeek.days.find((d) => d.dayNumber === selectedDayNum) ?? null
        : null,
    [activeWeek, selectedDayNum]
  );

  const activeJissen = selectedDayNum === 7 ? activeWeek.jissen : null;

  // Reset exercise state when switching day/week
  useEffect(() => {
    stopJapaneseSpeech();
    setPlayingExampleKey(null);
    setPart1Answers({});
    setPart2Answers({});
    setRenshuuSubmitted(false);
    setDaySubTab('materi');
    setJissenPhase('intro');
    setShowSubmitModal(false);
    setJissenMcqAnswers({});
    setJissenStarAnswers({});
    setJissenCurrentIdx(0);
    setJissenElapsedSec(0);
    setJissenRemainingSec((activeWeek.jissen.timeLimitMin || 15) * 60);
  }, [selectedWeekNum, selectedDayNum, activeWeek.jissen.timeLimitMin]);

  // Jissen countdown timer
  useEffect(() => {
    if (selectedDayNum !== 7 || jissenPhase !== 'playing') return;
    const id = window.setInterval(() => {
      setJissenElapsedSec((prev) => prev + 1);
      if (jissenUseTimer) {
        setJissenRemainingSec((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [selectedDayNum, jissenPhase, jissenUseTimer]);

  // Auto-submit when timer hits 0
  useEffect(() => {
    if (
      selectedDayNum === 7 &&
      jissenPhase === 'playing' &&
      jissenUseTimer &&
      jissenRemainingSec === 0
    ) {
      finalizeJissen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jissenRemainingSec, jissenPhase, jissenUseTimer, selectedDayNum]);

  const studiedSet = useMemo(
    () => new Set(learnProgress.studiedDayIds),
    [learnProgress.studiedDayIds]
  );

  const totalStudiedLessons = useMemo(
    () =>
      learnProgress.studiedDayIds.filter((id) => !id.endsWith('-d7')).length,
    [learnProgress.studiedDayIds]
  );

  const totalCompletedJissen = Object.keys(learnProgress.jissenResults).length;

  const toggleDayStudied = (dayId: string) => {
    const nextIds = studiedSet.has(dayId)
      ? learnProgress.studiedDayIds.filter((id) => id !== dayId)
      : [...learnProgress.studiedDayIds, dayId];
    onSaveLearnProgress({
      ...learnProgress,
      studiedDayIds: nextIds,
    });
  };

  const handlePlayExample = (key: string, jpText: string) => {
    if (playingExampleKey === key) {
      stopJapaneseSpeech();
      setPlayingExampleKey(null);
      return;
    }
    setPlayingExampleKey(key);
    speakJapanese(
      jpText,
      preferences.ttsRate,
      () => setPlayingExampleKey(key),
      () => setPlayingExampleKey(null),
      () => setPlayingExampleKey(null)
    );
  };

  const handleToggleTokenPart2 = (qId: string, tokenId: number) => {
    if (renshuuSubmitted) return;
    setPart2Answers((prev) => {
      const current = prev[qId] ?? [];
      if (current.includes(tokenId)) {
        return { ...prev, [qId]: current.filter((id) => id !== tokenId) };
      }
      if (current.length >= 4) return prev;
      return { ...prev, [qId]: [...current, tokenId] };
    });
  };

  const handleClearPart2 = (qId: string) => {
    if (renshuuSubmitted) return;
    setPart2Answers((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
  };

  const renshuuGrade = useMemo(() => {
    if (!activeLessonDay) return { correct: 0, total: 0 };
    let correct = 0;
    const total =
      activeLessonDay.renshuuPart1.length + activeLessonDay.renshuuPart2.length;

    for (const q of activeLessonDay.renshuuPart1) {
      const picked = part1Answers[q.id];
      if (picked && q.correctOptionIds.includes(picked)) {
        correct += 1;
      }
    }
    for (const q of activeLessonDay.renshuuPart2) {
      const pickedOrder = part2Answers[q.id] ?? [];
      if (
        pickedOrder.length === 4 &&
        pickedOrder.every((val, idx) => val === q.correctOrder[idx])
      ) {
        correct += 1;
      }
    }
    return { correct, total };
  }, [activeLessonDay, part1Answers, part2Answers]);

  const handleSubmitRenshuu = () => {
    if (!activeLessonDay) return;
    setRenshuuSubmitted(true);
    const { correct, total } = renshuuGrade;
    if (correct >= Math.ceil(total * 0.6)) {
      playCorrectSfx(preferences.sfxEnabled);
    } else {
      playWrongSfx(preferences.sfxEnabled);
    }

    const nextStudied = studiedSet.has(activeLessonDay.id)
      ? learnProgress.studiedDayIds
      : [...learnProgress.studiedDayIds, activeLessonDay.id];

    onSaveLearnProgress({
      ...learnProgress,
      studiedDayIds: nextStudied,
      renshuuCompleted: {
        ...learnProgress.renshuuCompleted,
        [activeLessonDay.id]: {
          score: correct,
          total,
          completedAt: new Date().toISOString(),
        },
      },
    });
  };

  const handleResetRenshuu = () => {
    setPart1Answers({});
    setPart2Answers({});
    setRenshuuSubmitted(false);
  };

  // Jissen helpers
  const startJissen = () => {
    if (!activeJissen) return;
    setJissenMcqAnswers({});
    setJissenStarAnswers({});
    setJissenCurrentIdx(0);
    setJissenElapsedSec(0);
    setJissenRemainingSec(activeJissen.timeLimitMin * 60);
    setShowSubmitModal(false);
    setJissenPhase('playing');
  };

  const isJissenQuestionAnswered = (q: JissenQuestion): boolean => {
    if (q.type === 'mondai2_star') {
      return (jissenStarAnswers[q.id]?.length ?? 0) === 4;
    }
    return Boolean(jissenMcqAnswers[q.id]);
  };

  const isJissenQuestionCorrect = (q: JissenQuestion): boolean => {
    if (q.type === 'mondai2_star') {
      const order = jissenStarAnswers[q.id];
      const slot = q.starSlotIndex ?? 0;
      return Boolean(order && order.length === 4 && order[slot] === q.correctOptionId);
    }
    return jissenMcqAnswers[q.id] === q.correctOptionId;
  };

  const jissenAnsweredCount = useMemo(() => {
    if (!activeJissen) return 0;
    return activeJissen.questions.filter(isJissenQuestionAnswered).length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeJissen, jissenMcqAnswers, jissenStarAnswers]);

  const jissenCorrectCount = useMemo(() => {
    if (!activeJissen) return 0;
    return activeJissen.questions.filter(isJissenQuestionCorrect).length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeJissen, jissenMcqAnswers, jissenStarAnswers]);

  const finalizeJissen = () => {
    if (!activeJissen) return;
    setShowSubmitModal(false);
    setJissenPhase('review');
    const total = activeJissen.questions.length;
    const correct = activeJissen.questions.filter(isJissenQuestionCorrect).length;
    const score100 = Math.round((correct / total) * 100);

    if (score100 >= 60) {
      playCorrectSfx(preferences.sfxEnabled);
    } else {
      playWrongSfx(preferences.sfxEnabled);
    }

    const nextStudied = studiedSet.has(activeJissen.id)
      ? learnProgress.studiedDayIds
      : [...learnProgress.studiedDayIds, activeJissen.id];

    const prevBest = learnProgress.jissenResults[activeJissen.weekNumber];
    const shouldReplaceScore = !prevBest || score100 >= prevBest.score;

    onSaveLearnProgress({
      ...learnProgress,
      studiedDayIds: nextStudied,
      jissenResults: {
        ...learnProgress.jissenResults,
        [activeJissen.weekNumber]: shouldReplaceScore
          ? {
              score: score100,
              total,
              timeSec: jissenElapsedSec,
              completedAt: new Date().toISOString(),
            }
          : prevBest,
      },
    });
  };

  const handleToggleJissenStarToken = (qId: string, tokenId: string) => {
    setJissenStarAnswers((prev) => {
      const current = prev[qId] ?? [];
      if (current.includes(tokenId)) {
        return { ...prev, [qId]: current.filter((id) => id !== tokenId) };
      }
      if (current.length >= 4) return prev;
      return { ...prev, [qId]: [...current, tokenId] };
    });
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-7 space-y-6">
      {/* Top Overview & Category Header */}
      <section className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#475569] mb-1">
              <span className="font-semibold text-[#2563EB]">Belajar</span>
              <span aria-hidden="true">·</span>
              <span>日本語総まとめ N3 文法</span>
              <span aria-hidden="true">·</span>
              <span>Khusus Bunpou (6 Minggu)</span>
            </div>
            <h1 className="font-display text-2xl sm:text-[28px] font-bold tracking-tight text-[#0F172A]">
              Materi Bunpou Sou Matome N3
            </h1>
            <p className="text-sm text-[#475569] mt-1 max-w-2xl">
              Ringkasan pola tata bahasa singkat yang mudah dipahami, dilengkapi latihan harian{' '}
              <span className="font-jp font-medium text-[#0F172A]">れんしゅう</span> (Hari 1–6) dan uji kemampuan{' '}
              <span className="font-jp font-medium text-[#0F172A]">実践問題</span> (Hari 7).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <div className="text-[11px] text-[#475569]">Progres Materi</div>
              <div className="font-mono-num text-lg font-bold text-[#0F172A]">
                {totalStudiedLessons}/{SOU_MATOME_TOTAL_LESSON_DAYS}{' '}
                <span className="text-xs font-sans font-normal text-[#64748B]">hari</span>
              </div>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <div className="text-[11px] text-[#475569]">実践問題</div>
              <div className="font-mono-num text-lg font-bold text-[#2563EB]">
                {totalCompletedJissen}/{SOU_MATOME_TOTAL_JISSEN}{' '}
                <span className="text-xs font-sans font-normal text-[#64748B]">minggu</span>
              </div>
            </div>
            <div className="flex items-center gap-1 p-1 bg-[#F1F5F9] rounded-lg">
              {TTS_RATES.map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => onUpdatePreferences({ ...preferences, ttsRate: rate })}
                  className={`px-2.5 py-1.5 text-xs font-mono-num font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    preferences.ttsRate === rate
                      ? 'bg-white text-[#2563EB] shadow-sm font-semibold'
                      : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                  title="Kecepatan suara contoh kalimat Jepang"
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Week Selector Grid */}
        <div className="mt-5 pt-5 border-t border-[#E2E8F0]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {SOU_MATOME_BUNPOU_WEEKS.map((week) => {
              const isSelected = week.weekNumber === selectedWeekNum;
              const completedInWeek =
                week.days.filter((d) => studiedSet.has(d.id)).length +
                (studiedSet.has(week.jissen.id) ? 1 : 0);

              return (
                <button
                  key={week.weekNumber}
                  type="button"
                  onClick={() => setSelectedWeekNum(week.weekNumber)}
                  className={`text-left p-3 rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    isSelected
                      ? 'bg-[#EFF6FF] border-[#2563EB] text-[#0F172A]'
                      : 'bg-white border-[#E2E8F0] hover:border-[#94A3B8] text-[#475569]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-xs font-semibold whitespace-nowrap shrink-0 ${
                        isSelected ? 'text-[#2563EB]' : 'text-[#0F172A]'
                      }`}
                    >
                      Minggu {week.weekNumber}
                    </span>
                    <span className="font-mono-num text-[11px] text-[#64748B]">
                      {completedInWeek}/7
                    </span>
                  </div>
                  <div className="font-jp text-xs font-medium text-[#0F172A] mt-1 truncate">
                    {week.titleJp.replace(/^第\d週\s*/, '')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Day Selector Strip inside active week */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {activeWeek.days.map((day) => {
            const isActive = selectedDayNum === day.dayNumber;
            const isDone = studiedSet.has(day.id);
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => setSelectedDayNum(day.dayNumber)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  isActive
                    ? 'bg-[#2563EB] border-[#2563EB] text-white'
                    : 'bg-white border-[#E2E8F0] text-[#0F172A] hover:border-[#2563EB]/60'
                }`}
              >
                <span>Hari {day.dayNumber}</span>
                {isDone && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#059669]'}`}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setSelectedDayNum(7)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
              selectedDayNum === 7
                ? 'bg-[#0F172A] border-[#0F172A] text-white'
                : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] hover:border-[#2563EB]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="font-jp">Hari 7 · 実践問題</span>
            {learnProgress.jissenResults[activeWeek.weekNumber] && (
              <span
                className={`font-mono-num text-[11px] ${
                  selectedDayNum === 7 ? 'text-[#93C5FD]' : 'text-[#2563EB]'
                }`}
              >
                ({learnProgress.jissenResults[activeWeek.weekNumber].score})
              </span>
            )}
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DAYS 1-6: MATERI + RENSHUU                                   */}
      {/* ============================================================ */}
      {activeLessonDay && (
        <section className="space-y-5">
          {/* Day Title & Sub-tab Switcher */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#475569] mb-1">
                <span>{activeWeek.titleJp}</span>
                <span aria-hidden="true">·</span>
                <span>{activeLessonDay.dayNumber}日目</span>
                <span aria-hidden="true">·</span>
                <span>{activeLessonDay.grammarPoints.length} pola tata bahasa</span>
              </div>
              <h2 className="font-jp font-bold text-xl sm:text-2xl text-[#0F172A]">
                {activeLessonDay.titleJp}
              </h2>
              <p className="text-sm text-[#475569] mt-0.5">{activeLessonDay.titleId}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="flex items-center gap-1 p-1 bg-[#F1F5F9] rounded-lg">
                <button
                  type="button"
                  onClick={() => setDaySubTab('materi')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    daySubTab === 'materi'
                      ? 'bg-white text-[#2563EB] shadow-sm'
                      : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  Ringkasan Materi
                </button>
                <button
                  type="button"
                  onClick={() => setDaySubTab('renshuu')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 font-jp ${
                    daySubTab === 'renshuu'
                      ? 'bg-white text-[#2563EB] shadow-sm'
                      : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  れんしゅう ({activeLessonDay.renshuuPart1.length + activeLessonDay.renshuuPart2.length})
                </button>
              </div>

              <button
                type="button"
                onClick={() => toggleDayStudied(activeLessonDay.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                  studiedSet.has(activeLessonDay.id)
                    ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]'
                    : 'bg-white border-[#E2E8F0] text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                <span>
                  {studiedSet.has(activeLessonDay.id) ? 'Sudah Dipelajari' : 'Tandai Selesai'}
                </span>
              </button>
            </div>
          </div>

          {/* Sub-Tab 1: Ringkasan Materi */}
          {daySubTab === 'materi' && (
            <div className="space-y-4">
              {activeLessonDay.grammarPoints.map((gp, idx) => (
                <article
                  key={gp.id}
                  className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B] mb-1">
                        <span className="font-mono-num font-semibold text-[#2563EB]">
                          Pola {idx + 1}
                        </span>
                        {gp.registerTag && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="font-medium text-[#0F172A]">
                              Gaya {gp.registerTag}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="font-jp font-bold text-lg sm:text-xl text-[#0F172A]">
                        {gp.titleJp}
                      </h3>
                    </div>
                    <p className="text-sm font-semibold text-[#1D4ED8] sm:text-right">
                      {gp.shortMeaningId}
                    </p>
                  </div>

                  {/* Connection Formula */}
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                    <span className="text-xs font-semibold text-[#475569] whitespace-nowrap shrink-0">
                      Rumus Sambungan:
                    </span>
                    <span className="font-jp text-xs sm:text-sm font-medium text-[#0F172A]">
                      {gp.connectionFormula}
                    </span>
                  </div>

                  {/* Easy Explanation */}
                  <p className="text-sm sm:text-[15px] leading-relaxed text-[#1E293B]">
                    {gp.easyExplanationId}
                  </p>

                  {/* Tip / Pitfall */}
                  {gp.tipOrPitfallId && (
                    <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg px-4 py-3 flex items-start gap-2.5 text-xs sm:text-sm text-[#1E3A8A]">
                      <Lightbulb
                        className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <span className="font-semibold">Tips Penting: </span>
                        <span>{gp.tipOrPitfallId}</span>
                      </div>
                    </div>
                  )}

                  {/* Examples */}
                  <div className="pt-2 border-t border-[#F1F5F9]">
                    <div className="text-xs font-semibold text-[#475569] mb-2">
                      Contoh Kalimat
                    </div>
                    <div className="divide-y divide-[#F1F5F9]">
                      {gp.examples.map((ex, exIdx) => {
                        const exKey = `${gp.id}-${exIdx}`;
                        const isPlaying = playingExampleKey === exKey;
                        return (
                          <div
                            key={exKey}
                            className="py-2.5 first:pt-1 last:pb-0 flex items-start justify-between gap-3"
                          >
                            <div>
                              <p className="font-jp text-sm sm:text-base font-medium text-[#0F172A]">
                                {ex.jp}
                              </p>
                              <p className="text-xs sm:text-sm text-[#475569] mt-0.5">
                                {ex.id}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handlePlayExample(exKey, ex.jp)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                                isPlaying
                                  ? 'bg-[#2563EB] border-[#2563EB] text-white'
                                  : 'bg-white border-[#E2E8F0] text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB]'
                              }`}
                              title="Putar pengucapan kalimat Jepang"
                            >
                              <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>{isPlaying ? 'Berhenti' : 'Dengar'}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </article>
              ))}

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#64748B]">
                  Sudah paham polanya? Uji pemahamanmu dengan latihan harian buku ini.
                </span>
                <button
                  type="button"
                  onClick={() => setDaySubTab('renshuu')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  <span className="font-jp">Kerjakan れんしゅう</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* Sub-Tab 2: れんしゅう (Latihan Harian) */}
          {daySubTab === 'renshuu' && (
            <div className="space-y-5">
              {/* Summary Banner when submitted */}
              {renshuuSubmitted && (
                <div className="bg-white border border-[#BFDBFE] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#2563EB] shrink-0" aria-hidden="true" />
                    <div>
                      <div className="font-display font-bold text-lg text-[#0F172A]">
                        Hasil れんしゅう: {renshuuGrade.correct} / {renshuuGrade.total} Benar
                      </div>
                      <p className="text-xs sm:text-sm text-[#475569]">
                        Hari {activeLessonDay.dayNumber} otomatis ditandai selesai dan tersimpan di akunmu.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetRenshuu}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:border-[#2563EB] text-xs font-semibold text-[#0F172A] whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Latih Ulang</span>
                  </button>
                </div>
              )}

              {/* Bagian I: Pilihan Kalimat */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 space-y-4">
                <div>
                  <h3 className="font-display font-bold text-base text-[#0F172A]">
                    Bagian I · Pilih bentuk yang paling tepat
                  </h3>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Pilih salah satu opsi yang sesuai dengan konteks kalimat.
                  </p>
                </div>

                <div className="divide-y divide-[#F1F5F9]">
                  {activeLessonDay.renshuuPart1.map((item) => {
                    const userChoice = part1Answers[item.id];
                    const isCorrect = Boolean(
                      userChoice && item.correctOptionIds.includes(userChoice)
                    );

                    return (
                      <div key={item.id} className="py-4 first:pt-1 last:pb-0 space-y-2.5">
                        <div className="flex flex-wrap items-center gap-2 font-jp text-sm sm:text-base text-[#0F172A] leading-relaxed">
                          <span className="font-mono-num text-xs font-semibold text-[#64748B] mr-1">
                            {item.numberLabel}.
                          </span>
                          <span>{item.promptBefore}</span>
                          <span className="inline-flex flex-wrap items-center gap-1.5 mx-1">
                            {item.options.map((opt) => {
                              const selected = userChoice === opt.id;
                              const isAnswerKey = item.correctOptionIds.includes(opt.id);
                              let cls =
                                'border-[#CBD5E1] bg-white text-[#0F172A] hover:border-[#2563EB]';
                              if (renshuuSubmitted) {
                                if (isAnswerKey) {
                                  cls = 'border-[#059669] bg-[#ECFDF5] text-[#065F46] font-semibold';
                                } else if (selected && !isAnswerKey) {
                                  cls = 'border-[#DC2626] bg-[#FEF2F2] text-[#991B1B]';
                                } else {
                                  cls = 'border-[#E2E8F0] bg-[#F8FAFC] text-[#94A3B8]';
                                }
                              } else if (selected) {
                                cls = 'border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8] font-semibold';
                              }

                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  disabled={renshuuSubmitted}
                                  onClick={() =>
                                    setPart1Answers((prev) => ({
                                      ...prev,
                                      [item.id]: opt.id,
                                    }))
                                  }
                                  className={`px-3 py-1 rounded-md border text-sm font-jp transition-colors whitespace-nowrap shrink-0 ${cls}`}
                                >
                                  {opt.id}. {opt.label}
                                </button>
                              );
                            })}
                          </span>
                          <span>{item.promptAfter}</span>
                        </div>

                        {renshuuSubmitted && (
                          <div className="flex items-start gap-2 text-xs sm:text-sm pt-1">
                            {isCorrect ? (
                              <CheckCircle2
                                className="w-4 h-4 text-[#059669] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                            ) : (
                              <XCircle
                                className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                            )}
                            <p className="text-[#475569]">
                              <span
                                className={`font-semibold mr-1.5 ${
                                  isCorrect ? 'text-[#059669]' : 'text-[#DC2626]'
                                }`}
                              >
                                {isCorrect
                                  ? 'Benar'
                                  : `Kunci: ${item.correctOptionIds.join(' / ')}`}
                              </span>
                              <span>· {item.explanationId}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bagian II: Susun Kalimat */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 space-y-4">
                <div>
                  <h3 className="font-display font-bold text-base text-[#0F172A]">
                    Bagian II · Susun potongan kata menjadi kalimat yang tepat
                  </h3>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Klik potongan 1–4 secara berurutan untuk mengisi bagian rumpang.
                  </p>
                </div>

                <div className="divide-y divide-[#F1F5F9]">
                  {activeLessonDay.renshuuPart2.map((item) => {
                    const order = part2Answers[item.id] ?? [];
                    const isCorrect =
                      order.length === 4 &&
                      order.every((val, idx) => val === item.correctOrder[idx]);

                    return (
                      <div key={item.id} className="py-4 first:pt-1 last:pb-0 space-y-3">
                        <div className="font-jp text-sm sm:text-base text-[#0F172A] leading-loose flex flex-wrap items-center gap-1.5">
                          <span className="font-mono-num text-xs font-semibold text-[#64748B] mr-1">
                            {item.numberLabel}.
                          </span>
                          <span>{item.prefix}</span>
                          {[0, 1, 2, 3].map((slotIdx) => {
                            const tokenId = order[slotIdx];
                            const tokenObj = item.tokens.find((t) => t.id === tokenId);
                            return (
                              <span
                                key={slotIdx}
                                className={`inline-flex items-center justify-center min-w-[68px] px-2.5 py-1 rounded-md border text-xs sm:text-sm font-jp ${
                                  tokenObj
                                    ? 'bg-[#EFF6FF] border-[#2563EB] text-[#1D4ED8] font-medium'
                                    : 'bg-[#F8FAFC] border-dashed border-[#CBD5E1] text-[#94A3B8]'
                                }`}
                              >
                                {tokenObj ? tokenObj.label : `___`}
                              </span>
                            );
                          })}
                          <span>{item.suffix}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {item.tokens.map((tok) => {
                            const used = order.includes(tok.id);
                            return (
                              <button
                                key={tok.id}
                                type="button"
                                disabled={renshuuSubmitted}
                                onClick={() => handleToggleTokenPart2(item.id, tok.id)}
                                className={`px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-jp transition-colors whitespace-nowrap shrink-0 ${
                                  used
                                    ? 'bg-[#2563EB] border-[#2563EB] text-white font-medium'
                                    : 'bg-white border-[#CBD5E1] text-[#0F172A] hover:border-[#2563EB]'
                                }`}
                              >
                                <span className="font-mono-num mr-1 opacity-75">
                                  {tok.id}.
                                </span>
                                {tok.label}
                              </button>
                            );
                          })}

                          {!renshuuSubmitted && order.length > 0 && (
                            <button
                              type="button"
                              onClick={() => handleClearPart2(item.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-[#475569] hover:text-[#DC2626]"
                            >
                              <Eraser className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Reset</span>
                            </button>
                          )}
                        </div>

                        {renshuuSubmitted && (
                          <div className="flex items-start gap-2 text-xs sm:text-sm pt-1">
                            {isCorrect ? (
                              <CheckCircle2
                                className="w-4 h-4 text-[#059669] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                            ) : (
                              <XCircle
                                className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                            )}
                            <p className="text-[#475569]">
                              <span
                                className={`font-semibold mr-1.5 ${
                                  isCorrect ? 'text-[#059669]' : 'text-[#DC2626]'
                                }`}
                              >
                                {isCorrect
                                  ? 'Benar'
                                  : `Urutan benar: ${item.correctOrder.join('-')}`}
                              </span>
                              <span>· {item.explanationId}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setDaySubTab('materi')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#E2E8F0] bg-white hover:border-[#2563EB] text-sm font-medium text-[#0F172A] whitespace-nowrap shrink-0"
                >
                  <BookOpen className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                  <span>Kembali ke Materi</span>
                </button>

                {!renshuuSubmitted ? (
                  <button
                    type="button"
                    onClick={handleSubmitRenshuu}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    <span>Periksa Jawaban</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedDayNum < 6) {
                        setSelectedDayNum(selectedDayNum + 1);
                      } else {
                        setSelectedDayNum(7);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>
                      {selectedDayNum < 6
                        ? `Lanjut ke Hari ${selectedDayNum + 1}`
                        : 'Lanjut ke 実践問題'}
                    </span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ============================================================ */}
      {/* DAY 7: 実践問題 (JISSEN MONDAI) + KEIGO CORNER               */}
      {/* ============================================================ */}
      {activeJissen && (
        <section className="space-y-5">
          {/* INTRO PHASE */}
          {jissenPhase === 'intro' && (
            <div className="space-y-5">
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#475569] mb-1">
                      <span className="font-semibold text-[#2563EB]">Hari 7</span>
                      <span aria-hidden="true">·</span>
                      <span>25 Soal Evaluasi Mingguan</span>
                      <span aria-hidden="true">·</span>
                      <span>Waktu saran {activeJissen.timeLimitMin} menit</span>
                    </div>
                    <h2 className="font-jp font-bold text-2xl text-[#0F172A]">
                      {activeJissen.titleJp}
                    </h2>
                    <p className="text-sm text-[#475569] mt-1">{activeJissen.titleId}</p>
                  </div>

                  {learnProgress.jissenResults[activeJissen.weekNumber] && (
                    <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg px-4 py-3 shrink-0">
                      <div className="text-xs text-[#1E3A8A]">Skor Terbaik Minggu {activeJissen.weekNumber}</div>
                      <div className="font-mono-num text-xl font-bold text-[#2563EB]">
                        {learnProgress.jissenResults[activeJissen.weekNumber].score}/100
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4">
                    <div className="font-jp font-bold text-[#0F172A]">問題 1 (Soal 1–15)</div>
                    <p className="text-xs text-[#475569] mt-1">
                      Pilih pola tata bahasa yang paling tepat untuk melengkapi kalimat.
                    </p>
                  </div>
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4">
                    <div className="font-jp font-bold text-[#0F172A]">問題 2 ★ (Soal 16–20)</div>
                    <p className="text-xs text-[#475569] mt-1">
                      Susun 4 potongan kata menjadi kalimat padu untuk menentukan posisi ★.
                    </p>
                  </div>
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4">
                    <div className="font-jp font-bold text-[#0F172A]">問題 3 (Soal 21–25)</div>
                    <p className="text-xs text-[#475569] mt-1">
                      Lengkapi wacana utuh bertema “{activeJissen.mondai3PassageTitleJp}”.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[#475569]">Mode Timer:</span>
                    <div className="flex items-center gap-1 p-1 bg-[#F1F5F9] rounded-lg">
                      <button
                        type="button"
                        onClick={() => setJissenUseTimer(true)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                          jissenUseTimer
                            ? 'bg-white text-[#2563EB] shadow-sm font-semibold'
                            : 'text-[#475569]'
                        }`}
                      >
                        Timer 15 Menit
                      </button>
                      <button
                        type="button"
                        onClick={() => setJissenUseTimer(false)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                          !jissenUseTimer
                            ? 'bg-white text-[#2563EB] shadow-sm font-semibold'
                            : 'text-[#475569]'
                        }`}
                      >
                        Tanpa Timer (Santai)
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={startJissen}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <Play className="w-4 h-4" aria-hidden="true" />
                    <span>Mulai 実践問題</span>
                  </button>
                </div>
              </div>

              {/* Weekly Keigo Tip Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4">
                <div>
                  <div className="text-xs font-semibold text-[#2563EB]">
                    Catatan Tambahan Buku · Minggu {activeWeek.weekNumber}
                  </div>
                  <h3 className="font-jp font-bold text-lg text-[#0F172A] mt-0.5">
                    {activeJissen.keigoTip.titleJp}
                  </h3>
                  <p className="text-sm text-[#475569] mt-1">
                    {activeJissen.keigoTip.summaryId}
                  </p>
                </div>

                <div className="divide-y divide-[#F1F5F9]">
                  {activeJissen.keigoTip.pairs.map((pair, idx) => (
                    <div
                      key={idx}
                      className="py-3 first:pt-1 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="font-jp text-[#64748B]">{pair.plain}</span>
                          <span aria-hidden="true" className="text-[#94A3B8]">
                            →
                          </span>
                          <span className="font-jp font-bold text-[#1D4ED8]">
                            {pair.honorificOrHumble}
                          </span>
                        </div>
                        <div className="text-xs text-[#475569] mt-0.5">
                          {pair.meaningId} ·{' '}
                          <span className="font-jp text-[#0F172A]">{pair.exampleJp}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handlePlayExample(`keigo-${activeWeek.weekNumber}-${idx}`, pair.exampleJp)
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-[#E2E8F0] hover:border-[#2563EB] text-xs text-[#475569] hover:text-[#2563EB] self-start sm:self-center whitespace-nowrap shrink-0"
                      >
                        <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Dengar</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PLAYING PHASE */}
          {jissenPhase === 'playing' && (
            <div className="space-y-4">
              {/* Top Exam Status Bar */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-jp font-bold text-[#0F172A]">
                    第{activeJissen.weekNumber}週 実践問題
                  </span>
                  <span className="text-[#CBD5E1]" aria-hidden="true">
                    |
                  </span>
                  <span className="font-mono-num text-xs text-[#475569]">
                    Terjawab {jissenAnsweredCount}/25
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {jissenUseTimer && (
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono-num text-sm font-semibold ${
                        jissenRemainingSec <= 120
                          ? 'bg-[#FEF2F2] border-[#FECACA] text-[#DC2626]'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A]'
                      }`}
                    >
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <span>{formatMMSS(jissenRemainingSec)}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Kumpulkan Jawaban</span>
                  </button>
                </div>
              </div>

              {/* Question Number Jump Strip */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5">
                <div className="flex flex-wrap gap-1.5">
                  {activeJissen.questions.map((q, idx) => {
                    const isCurrent = idx === jissenCurrentIdx;
                    const answered = isJissenQuestionAnswered(q);
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setJissenCurrentIdx(idx)}
                        className={`w-8 h-8 rounded-md font-mono-num text-xs font-semibold border transition-colors ${
                          isCurrent
                            ? 'bg-[#2563EB] border-[#2563EB] text-white'
                            : answered
                            ? 'bg-[#EFF6FF] border-[#93C5FD] text-[#1D4ED8]'
                            : 'bg-white border-[#E2E8F0] text-[#475569] hover:border-[#2563EB]'
                        }`}
                      >
                        {q.number}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Question Stage */}
              {(() => {
                const q = activeJissen.questions[jissenCurrentIdx];
                if (!q) return null;

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    {/* Reading Passage for 問題3 */}
                    {q.type === 'mondai3_cloze' && (
                      <div className="lg:col-span-6 bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 space-y-3">
                        <div className="text-xs font-semibold text-[#2563EB]">
                          問題 3 · Wacana ({activeJissen.mondai3PassageTitleJp})
                        </div>
                        <div className="space-y-3 font-jp text-sm sm:text-base leading-relaxed text-[#0F172A]">
                          {activeJissen.mondai3PassageLines.map((line, lIdx) => (
                            <p key={lIdx}>{line}</p>
                          ))}
                        </div>
                      </div>
                    )}

                    <div
                      className={`${
                        q.type === 'mondai3_cloze' ? 'lg:col-span-6' : 'lg:col-span-12'
                      } bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 space-y-5`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs text-[#475569]">
                        <span className="font-semibold text-[#2563EB]">
                          Soal {q.number} dari 25
                        </span>
                        <span className="font-jp">
                          {q.type === 'mondai1_mcq'
                            ? '問題 1 · Tata Bahasa Kalimat'
                            : q.type === 'mondai2_star'
                            ? '問題 2 · Susun Kalimat (★)'
                            : `問題 3 · Lengkapi Bagian [ ${q.number} ]`}
                        </span>
                      </div>

                      {q.type === 'mondai1_mcq' && (
                        <p className="font-jp text-lg sm:text-xl font-medium text-[#0F172A] leading-relaxed">
                          {q.promptJp}
                        </p>
                      )}

                      {q.type === 'mondai3_cloze' && (
                        <p className="text-sm font-medium text-[#0F172A]">
                          Pilih kata atau ungkapan yang paling tepat untuk mengisi bagian{' '}
                          <span className="font-mono-num font-bold text-[#2563EB]">
                            [ {q.number} ]
                          </span>{' '}
                          pada bacaan.
                        </p>
                      )}

                      {q.type === 'mondai2_star' && (
                        <div className="space-y-4">
                          <div className="font-jp text-base sm:text-lg text-[#0F172A] leading-loose flex flex-wrap items-center gap-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4">
                            <span>{q.starPrefix}</span>
                            {[0, 1, 2, 3].map((slotIdx) => {
                              const pickedId = jissenStarAnswers[q.id]?.[slotIdx];
                              const opt = q.options.find((o) => o.id === pickedId);
                              const isStar = slotIdx === (q.starSlotIndex ?? 0);
                              return (
                                <span
                                  key={slotIdx}
                                  className={`inline-flex items-center justify-center min-w-[74px] px-2.5 py-1 rounded-md border text-sm font-jp ${
                                    isStar
                                      ? 'border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8] font-semibold'
                                      : opt
                                      ? 'border-[#94A3B8] bg-white text-[#0F172A]'
                                      : 'border-dashed border-[#CBD5E1] bg-white text-[#94A3B8]'
                                  }`}
                                >
                                  {opt ? opt.label : isStar ? '★' : '___'}
                                </span>
                              );
                            })}
                            <span>{q.starSuffix}</span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            {q.options.map((opt) => {
                              const selected = (jissenStarAnswers[q.id] ?? []).includes(opt.id);
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => handleToggleJissenStarToken(q.id, opt.id)}
                                  className={`px-4 py-2.5 rounded-lg border text-sm font-jp transition-colors whitespace-nowrap shrink-0 ${
                                    selected
                                      ? 'bg-[#2563EB] border-[#2563EB] text-white font-semibold'
                                      : 'bg-white border-[#CBD5E1] text-[#0F172A] hover:border-[#2563EB]'
                                  }`}
                                >
                                  <span className="font-mono-num mr-1.5 opacity-75">
                                    {opt.id}.
                                  </span>
                                  {opt.label}
                                </button>
                              );
                            })}
                            {(jissenStarAnswers[q.id]?.length ?? 0) > 0 && (
                              <button
                                type="button"
                                onClick={() =>
                                  setJissenStarAnswers((prev) => {
                                    const next = { ...prev };
                                    delete next[q.id];
                                    return next;
                                  })
                                }
                                className="inline-flex items-center gap-1 px-3 py-2 text-xs text-[#475569] hover:text-[#DC2626]"
                              >
                                <Eraser className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Hapus Urutan</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {(q.type === 'mondai1_mcq' || q.type === 'mondai3_cloze') && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {q.options.map((opt) => {
                            const selected = jissenMcqAnswers[q.id] === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() =>
                                  setJissenMcqAnswers((prev) => ({
                                    ...prev,
                                    [q.id]: opt.id,
                                  }))
                                }
                                className={`text-left px-4 py-3 rounded-lg border font-jp text-sm sm:text-base transition-colors flex items-center gap-3 ${
                                  selected
                                    ? 'bg-[#EFF6FF] border-[#2563EB] text-[#1D4ED8] font-semibold'
                                    : 'bg-white border-[#E2E8F0] text-[#0F172A] hover:border-[#2563EB]/60'
                                }`}
                              >
                                <span
                                  className={`w-6 h-6 rounded-md flex items-center justify-center font-mono-num text-xs shrink-0 ${
                                    selected
                                      ? 'bg-[#2563EB] text-white'
                                      : 'bg-[#F1F5F9] text-[#475569]'
                                  }`}
                                >
                                  {opt.id}
                                </span>
                                <span>{opt.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Prev/Next Navigation */}
                      <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                        <button
                          type="button"
                          disabled={jissenCurrentIdx === 0}
                          onClick={() => setJissenCurrentIdx((i) => Math.max(0, i - 1))}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#E2E8F0] text-sm font-medium text-[#0F172A] disabled:opacity-40 hover:border-[#2563EB] whitespace-nowrap shrink-0"
                        >
                          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                          <span>Sebelumnya</span>
                        </button>

                        {jissenCurrentIdx < activeJissen.questions.length - 1 ? (
                          <button
                            type="button"
                            onClick={() =>
                              setJissenCurrentIdx((i) =>
                                Math.min(activeJissen.questions.length - 1, i + 1)
                              )
                            }
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold whitespace-nowrap shrink-0"
                          >
                            <span>Berikutnya</span>
                            <ChevronRight className="w-4 h-4" aria-hidden="true" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setShowSubmitModal(true)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold whitespace-nowrap shrink-0"
                          >
                            <Send className="w-4 h-4" aria-hidden="true" />
                            <span>Kumpulkan</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* REVIEW PHASE */}
          {jissenPhase === 'review' && (
            <div className="space-y-5">
              <div className="bg-white border border-[#BFDBFE] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-[#2563EB]">
                    Hasil 実践問題 · Minggu {activeJissen.weekNumber}
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] mt-1 font-mono-num">
                    {Math.round((jissenCorrectCount / activeJissen.questions.length) * 100)} / 100
                  </div>
                  <p className="text-sm text-[#475569] mt-0.5">
                    Benar {jissenCorrectCount} dari 25 soal · Waktu pengerjaan{' '}
                    <span className="font-mono-num">{formatMMSS(jissenElapsedSec)}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={startJissen}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#E2E8F0] bg-white hover:border-[#2563EB] text-sm font-semibold text-[#0F172A] whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    <span>Kerjakan Ulang</span>
                  </button>
                  {selectedWeekNum < 6 && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedWeekNum(selectedWeekNum + 1);
                        setSelectedDayNum(1);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold whitespace-nowrap shrink-0"
                    >
                      <span>Lanjut Minggu {selectedWeekNum + 1}</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>

              {/* All 25 questions review */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 space-y-4">
                <h3 className="font-display font-bold text-base text-[#0F172A]">
                  Pembahasan Lengkap (25 Soal)
                </h3>
                <div className="divide-y divide-[#F1F5F9]">
                  {activeJissen.questions.map((q) => {
                    const correct = isJissenQuestionCorrect(q);
                    const keyOpt = q.options.find((o) => o.id === q.correctOptionId);
                    let userLabel = 'Tidak dijawab';
                    if (q.type === 'mondai2_star') {
                      const ord = jissenStarAnswers[q.id];
                      if (ord && ord.length === 4) {
                        const slotVal = ord[q.starSlotIndex ?? 0];
                        userLabel =
                          q.options.find((o) => o.id === slotVal)?.label ?? 'Belum lengkap';
                      }
                    } else if (jissenMcqAnswers[q.id]) {
                      userLabel =
                        q.options.find((o) => o.id === jissenMcqAnswers[q.id])?.label ??
                        jissenMcqAnswers[q.id];
                    }

                    return (
                      <div key={q.id} className="py-4 first:pt-1 last:pb-0 space-y-1.5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="text-sm font-jp text-[#0F172A]">
                            <span className="font-mono-num text-xs font-bold text-[#64748B] mr-2">
                              #{q.number}
                            </span>
                            {q.type === 'mondai1_mcq' && q.promptJp}
                            {q.type === 'mondai2_star' &&
                              `${q.starPrefix} [ ${q.correctOrderIds
                                ?.map((id, idx) => {
                                  const txt = q.options.find((o) => o.id === id)?.label ?? '';
                                  return idx === (q.starSlotIndex ?? 0) ? `★${txt}` : txt;
                                })
                                .join(' ')} ] ${q.starSuffix}`}
                            {q.type === 'mondai3_cloze' &&
                              `[ ${q.number} ] pada wacana “${activeJissen.mondai3PassageTitleJp}”`}
                          </div>
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold whitespace-nowrap shrink-0 ${
                              correct ? 'text-[#059669]' : 'text-[#DC2626]'
                            }`}
                          >
                            {correct ? (
                              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                            ) : (
                              <XCircle className="w-4 h-4" aria-hidden="true" />
                            )}
                            <span>{correct ? 'Benar' : 'Salah'}</span>
                          </span>
                        </div>
                        <div className="text-xs text-[#475569] flex flex-wrap gap-x-4 gap-y-1">
                          <span>
                            Jawabanmu:{' '}
                            <strong className="font-jp text-[#0F172A]">{userLabel}</strong>
                          </span>
                          <span>
                            Kunci:{' '}
                            <strong className="font-jp text-[#059669]">
                              ({q.correctOptionId}) {keyOpt?.label}
                            </strong>
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#475569]">
                          {q.explanationId}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Submit Confirmation Modal */}
          {showSubmitModal && (
            <div
              className="fixed inset-0 z-50 bg-[#0F172A]/40 backdrop-blur-[1px] flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="jissen-submit-title"
            >
              <div className="bg-white border border-[#E2E8F0] rounded-xl max-w-md w-full p-6 space-y-4">
                <h3
                  id="jissen-submit-title"
                  className="font-display text-lg font-bold text-[#0F172A]"
                >
                  Kumpulkan Jawaban 実践問題?
                </h3>
                <p className="text-sm text-[#475569]">
                  Kamu sudah menjawab{' '}
                  <strong className="font-mono-num text-[#0F172A]">
                    {jissenAnsweredCount} dari 25
                  </strong>{' '}
                  soal.
                  {jissenAnsweredCount < 25 &&
                    ' Masih ada soal yang belum diisi—yakin ingin langsung melihat nilai dan pembahasan?'}
                </p>
                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-sm font-medium text-[#0F172A] hover:border-[#94A3B8] whitespace-nowrap shrink-0"
                  >
                    Tidak, Kembali ke Soal
                  </button>
                  <button
                    type="button"
                    onClick={finalizeJissen}
                    className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold whitespace-nowrap shrink-0"
                  >
                    Ya, Kumpulkan
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
};
