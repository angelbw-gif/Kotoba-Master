import React, { useMemo, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Trash2,
  Volume2,
} from 'lucide-react';
import type {
  AppTab,
  FlashcardItem,
  FlashcardMastery,
  UserPreferences,
  WordAttemptStat,
} from '../types/jlpt';
import { speakJapanese } from '../utils/audio';
import { RubyText } from './RubyText';

interface FlashcardKotobaProps {
  flashcards: FlashcardItem[];
  wordStats: Record<string, WordAttemptStat>;
  preferences: UserPreferences;
  onUpdatePreferences: (next: UserPreferences) => void;
  onUpdateMastery: (cardId: string, mastery: FlashcardMastery) => void;
  onRemoveCard: (cardId: string) => void;
  onNavigateTab: (tab: AppTab) => void;
}

type MasteryFilter = 'all' | FlashcardMastery;

const MASTERY_LABELS: Record<FlashcardMastery, string> = {
  new: 'Baru',
  learning: 'Perlu Ulang',
  mastered: 'Hafal',
};

export const FlashcardKotoba: React.FC<FlashcardKotobaProps> = ({
  flashcards,
  wordStats,
  preferences,
  onUpdatePreferences,
  onUpdateMastery,
  onRemoveCard,
  onNavigateTab,
}) => {
  const [filter, setFilter] = useState<MasteryFilter>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const filteredCards = useMemo(() => {
    if (filter === 'all') return flashcards;
    return flashcards.filter((c) => c.mastery === filter);
  }, [flashcards, filter]);

  const safeIndex =
    filteredCards.length > 0 ? Math.min(currentIndex, filteredCards.length - 1) : 0;
  const activeCard = filteredCards[safeIndex] ?? null;
  const activeStat = activeCard ? wordStats[activeCard.id] : undefined;

  const counts = useMemo(
    () => ({
      all: flashcards.length,
      new: flashcards.filter((c) => c.mastery === 'new').length,
      learning: flashcards.filter((c) => c.mastery === 'learning').length,
      mastered: flashcards.filter((c) => c.mastery === 'mastered').length,
    }),
    [flashcards]
  );

  const handleSelectFilter = (next: MasteryFilter) => {
    setFilter(next);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleGrade = (mastery: FlashcardMastery) => {
    if (!activeCard) return;
    onUpdateMastery(activeCard.id, mastery);
    setIsFlipped(false);
    if (filteredCards.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    }
  };

  const handlePlay = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    speakJapanese(
      text,
      preferences.ttsRate,
      () => setSpeaking(true),
      () => setSpeaking(false),
      () => setSpeaking(false)
    );
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header & Filter Controls */}
      <section className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#0F172A]">
            Flashcard Kotoba
          </h1>
          <p className="text-sm text-[#475569]">
            Otomatis terisi setiap selesai Kuis &amp; Arena Pertandingan ·{' '}
            <span className="font-mono-num font-semibold text-[#0F172A]">
              {counts.mastered}/{counts.all} hafal
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: 'all', label: `Semua (${counts.all})` },
              { id: 'new', label: `Baru (${counts.new})` },
              { id: 'learning', label: `Perlu Ulang (${counts.learning})` },
              { id: 'mastered', label: `Hafal (${counts.mastered})` },
            ] as const
          ).map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => handleSelectFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                filter === f.id
                  ? 'bg-[#2563EB] border-[#2563EB] text-white'
                  : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              {f.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() =>
              onUpdatePreferences({
                ...preferences,
                furiganaEnabled: !preferences.furiganaEnabled,
              })
            }
            className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] hover:border-[#2563EB] whitespace-nowrap shrink-0"
          >
            Furigana: {preferences.furiganaEnabled ? 'On' : 'Off'}
          </button>
        </div>
      </section>

      {filteredCards.length === 0 || !activeCard ? (
        <section className="bg-white border border-[#E2E8F0] rounded-2xl p-10 text-center space-y-4">
          <p className="font-display text-lg font-bold text-[#0F172A]">
            Belum ada kartu pada filter ini
          </p>
          <p className="text-sm text-[#475569] max-w-md mx-auto">
            Selesaikan satu sesi di Kuis atau Arena Pertandingan, dan semua kosakata dari soal otomatis masuk ke dek Flashcard Kotoba ini.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigateTab('quiz')}
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1D4ED8]"
            >
              Pilih Kuis
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('lobby')}
              className="px-5 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-sm font-semibold text-[#0F172A] hover:border-[#2563EB]"
            >
              Ke Battle Lobby
            </button>
          </div>
        </section>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Active Flip Card Stage */}
          <section className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#475569] px-1">
              <span className="font-mono-num font-semibold text-[#0F172A]">
                Kartu {safeIndex + 1} / {filteredCards.length} ·{' '}
                <span className="text-[#2563EB]">
                  {MASTERY_LABELS[activeCard.mastery]}
                </span>
                {activeStat && activeStat.totalAttempts > 0 && (
                  <span className="text-[#475569] font-normal ml-2">
                    · Muncul {activeStat.totalAttempts}x (Benar{' '}
                    {activeStat.correctCount}/{activeStat.totalAttempts}, Salah{' '}
                    {activeStat.wrongCount}/{activeStat.totalAttempts})
                  </span>
                )}
              </span>
              <span>Klik kartu untuk membalik</span>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsFlipped((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsFlipped((prev) => !prev);
                }
              }}
              className="w-full min-h-[340px] bg-white border border-[#E2E8F0] hover:border-[#2563EB]/70 rounded-2xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-[#475569]">
                  {isFlipped
                    ? 'Sisi Belakang · Makna & Rincian'
                    : `Sisi Depan · ${activeCard.pos}`}
                </span>
                <button
                  type="button"
                  onClick={(e) =>
                    handlePlay(
                      e,
                      isFlipped
                        ? activeCard.examplePlain
                        : activeCard.reading || activeCard.headword
                    )
                  }
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                    speaking
                      ? 'bg-[#EFF6FF] border-[#2563EB] text-[#1D4ED8]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#2563EB]'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Audio ({preferences.ttsRate}x)
                </button>
              </div>

              {!isFlipped ? (
                <div className="py-10 text-center space-y-3">
                  <p className="font-jp text-4xl sm:text-5xl font-bold text-[#0F172A]">
                    {activeCard.headword}
                  </p>
                  {preferences.furiganaEnabled && (
                    <p className="font-jp text-lg text-[#475569]">
                      {activeCard.reading} ·{' '}
                      <span className="font-mono-num text-sm text-[#64748B]">
                        {activeCard.romaji}
                      </span>
                    </p>
                  )}
                </div>
              ) : (
                <div className="py-4 space-y-5 text-left">
                  <div className="pb-4 border-b border-[#F1F5F9]">
                    <div className="flex flex-wrap items-baseline gap-2.5">
                      <span className="font-jp text-2xl font-bold text-[#0F172A]">
                        {activeCard.headword}
                      </span>
                      <span className="font-jp text-base text-[#475569]">
                        【{activeCard.reading}】
                      </span>
                    </div>
                    <p className="text-lg font-bold text-[#2563EB] mt-1.5">
                      {activeCard.meaningId}
                    </p>
                    <p className="text-xs text-[#475569]">
                      EN: {activeCard.meaningEn}
                    </p>
                  </div>

                  {activeCard.kanjiDetails.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {activeCard.kanjiDetails.map((k) => (
                        <div
                          key={k.char}
                          className="px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs"
                        >
                          <span className="font-jp text-base font-bold text-[#0F172A] mr-2">
                            {k.char}
                          </span>
                          <span className="text-[#334155]">
                            On: {k.onYomi.join('・') || '—'} / Kun:{' '}
                            {k.kunYomi.join('・') || '—'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                    <p className="text-base text-[#0F172A]">
                      <RubyText
                        segments={activeCard.exampleSentence}
                        furiganaEnabled={preferences.furiganaEnabled}
                      />
                    </p>
                    <p className="text-xs text-[#334155]">
                      {activeCard.exampleTranslationId}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#64748B]">
                <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
                {isFlipped
                  ? 'Klik untuk kembali ke depan'
                  : 'Klik untuk lihat arti & contoh'}
              </div>
            </div>

            {/* Grading & Card Navigation Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentIndex(
                      (safeIndex - 1 + filteredCards.length) % filteredCards.length
                    );
                  }}
                  aria-label="Kartu sebelumnya"
                  className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] text-[#0F172A]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentIndex((safeIndex + 1) % filteredCards.length);
                  }}
                  aria-label="Kartu berikutnya"
                  className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] text-[#0F172A]"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleGrade('new')}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#DC2626] text-xs font-semibold text-[#0F172A]"
                >
                  Ulangi Lagi
                </button>
                <button
                  type="button"
                  onClick={() => handleGrade('learning')}
                  className="px-3.5 py-2 rounded-xl bg-[#EFF6FF] border border-[#2563EB]/50 hover:border-[#2563EB] text-xs font-semibold text-[#1D4ED8]"
                >
                  Masih Ragu
                </button>
                <button
                  type="button"
                  onClick={() => handleGrade('mastered')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold"
                >
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  Sudah Hafal
                </button>
              </div>
            </div>
          </section>

          {/* Deck List Browser */}
          <aside className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F1F5F9] bg-[#F8FAFC] flex items-center justify-between text-xs text-[#475569]">
              <span className="font-semibold text-[#0F172A]">Daftar Kartu di Dek</span>
              <span className="font-mono-num">{filteredCards.length} item</span>
            </div>
            <div className="divide-y divide-[#F1F5F9] max-h-[440px] overflow-y-auto">
              {filteredCards.map((card, idx) => {
                const isActive = idx === safeIndex;
                const stat = wordStats[card.id];
                return (
                  <div
                    key={card.id}
                    className={`px-4 py-3 flex items-center justify-between gap-3 ${
                      isActive ? 'bg-[#EFF6FF]' : 'bg-white hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsFlipped(false);
                      }}
                      className="flex-1 min-w-0 text-left"
                    >
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="font-jp font-bold text-base text-[#0F172A]">
                          {card.headword}
                        </span>
                        <span className="font-jp text-xs text-[#475569]">
                          {card.reading}
                        </span>
                        <span className="text-[11px] text-[#2563EB] font-medium">
                          · {MASTERY_LABELS[card.mastery]}
                        </span>
                      </div>
                      <p className="text-xs text-[#334155] truncate mt-0.5">
                        {card.meaningId}
                      </p>
                      {stat && stat.totalAttempts > 0 && (
                        <p className="font-mono-num text-[11px] text-[#64748B] mt-0.5">
                          Muncul {stat.totalAttempts} kali · Benar {stat.correctCount}/
                          {stat.totalAttempts} · Salah {stat.wrongCount}/
                          {stat.totalAttempts}
                        </p>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemoveCard(card.id)}
                      aria-label={`Hapus kartu ${card.headword}`}
                      title="Hapus dari Flashcard"
                      className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      )}
    </main>
  );
};
