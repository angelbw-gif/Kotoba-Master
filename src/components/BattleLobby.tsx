import React, { useState } from 'react';
import {
  Check,
  Clock,
  Copy,
  Flame,
  Headphones,
  Layers,
  LogOut,
  Play,
  SlidersHorizontal,
  Users,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { JLPT_SECTIONS } from '../data/categories';
import type {
  AppTab,
  JLPTMajorSection,
  JLPTSubCategory,
  OnlineRoomState,
  QuizConfig,
  TtsRate,
  UserPreferences,
  UserProfile,
} from '../types/jlpt';
import {
  computeCurrentStreak,
  getLocalDateKey,
  getSevenDayStreakWindow,
} from '../utils/storage';
import { buildLocalInviteUrl } from '../utils/localArena';
import { SectionSelector } from './SectionSelector';

interface BattleLobbyProps {
  config: QuizConfig;
  preferences: UserPreferences;
  profile: UserProfile;
  flashcardCount: number;
  onlineRoom: OnlineRoomState | null;
  clientId: string;
  roomError: string | null;
  wsConnecting: boolean;
  onUpdateConfig: (next: QuizConfig) => void;
  onUpdatePreferences: (next: UserPreferences) => void;
  onCreateOnlineRoom: () => void;
  onJoinOnlineRoom: (roomCode: string) => void;
  onStartOnlineMatch: () => void;
  onLeaveOnlineRoom: () => void;
  onNavigateTab: (tab: AppTab) => void;
}

const TTS_RATES: TtsRate[] = [0.75, 1.0, 1.2];

export const BattleLobby: React.FC<BattleLobbyProps> = ({
  config,
  preferences,
  profile,
  flashcardCount,
  onlineRoom,
  clientId,
  roomError,
  wsConnecting,
  onUpdateConfig,
  onUpdatePreferences,
  onCreateOnlineRoom,
  onJoinOnlineRoom,
  onStartOnlineMatch,
  onLeaveOnlineRoom,
  onNavigateTab,
}) => {
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [copiedNotice, setCopiedNotice] = useState(false);

  const streak = computeCurrentStreak(profile);
  const sevenDays = getSevenDayStreakWindow(profile);
  const todayKey = getLocalDateKey();
  const todayCount = profile.dailyLog[todayKey]?.questionsAnswered ?? 0;
  const goalPct = Math.min(100, Math.round((todayCount / profile.dailyGoal) * 100));

  const effectiveConfig =
    onlineRoom && onlineRoom.status === 'waiting' ? onlineRoom.config : config;

  const isRoomHost = Boolean(
    onlineRoom?.players.find((p) => p.clientId === clientId)?.isHost
  );
  const canEditCategories =
    !onlineRoom || (onlineRoom.status === 'waiting' && isRoomHost);

  const handleSectionChange = (
    sectionFilter: JLPTMajorSection,
    categoryFilter: 'all' | JLPTSubCategory
  ) => {
    if (!canEditCategories) return;
    onUpdateConfig({
      ...config,
      sectionFilter,
      categoryFilter,
    });
  };

  const handleCopyInvite = async () => {
    if (!onlineRoom || typeof window === 'undefined') return;
    const url = buildLocalInviteUrl(onlineRoom);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedNotice(true);
      window.setTimeout(() => setCopiedNotice(false), 2000);
    } catch {
      setCopiedNotice(false);
    }
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = roomCodeInput.trim().toUpperCase();
    if (!cleaned) return;
    onJoinOnlineRoom(cleaned);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Main Column */}
        <section className="lg:col-span-8 space-y-6">
          {/* Online Arena Pertandingan Room Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-[#2563EB]">
                  Kotoba Master · Ujian Resmi JLPT N3 · Timer Per-Bagian
                </p>
                <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
                  Arena Pertandingan Online
                </h1>
              </div>

              <button
                type="button"
                onClick={() => onNavigateTab('quiz')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#2563EB] text-xs font-semibold text-[#0F172A] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
              >
                <Play className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                Mau Kerjakan Sendiri? Buka Kuis
              </button>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Buat room pertandingan dan bagikan kodenya ke temanmu untuk duel soal JLPT N3 secara serentak. Setelah selesai, hasil langsung masuk ke Riwayat Frekuensi &amp; Flashcard Kotoba.
            </p>

            {/* Arena Pertandingan Multiplayer Room Controls */}
            <div className="pt-2 border-t border-[#F1F5F9] space-y-4">
              {!onlineRoom ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                      <div>
                        <h2 className="font-display font-bold text-sm text-[#0F172A]">
                          Buat Room Baru
                        </h2>
                        <p className="text-xs text-[#475569] mt-0.5">
                          Jadi host dan pilih bagian atau jenis soal N3 untuk temanmu.
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={wsConnecting}
                        onClick={onCreateOnlineRoom}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 text-white text-xs font-semibold transition-colors"
                      >
                        <Users className="w-4 h-4" aria-hidden="true" />
                        {wsConnecting ? 'Menghubungkan...' : 'Buat Room Pertandingan'}
                      </button>
                    </div>

                    <form
                      onSubmit={handleJoinSubmit}
                      className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3"
                    >
                      <div>
                        <h2 className="font-display font-bold text-sm text-[#0F172A]">
                          Gabung Room Teman
                        </h2>
                        <p className="text-xs text-[#475569] mt-0.5">
                          Masukkan kode 6 karakter dari temanmu.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={roomCodeInput}
                          onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                          placeholder="Contoh: K7M2P9"
                          maxLength={10}
                          className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white border border-[#E2E8F0] font-mono-num text-sm uppercase text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                        />
                        <button
                          type="submit"
                          disabled={wsConnecting || !roomCodeInput.trim()}
                          className="px-4 py-2 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] disabled:opacity-50 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                        >
                          Gabung
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="p-5 rounded-xl bg-[#EFF6FF]/60 border border-[#BFDBFE] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DBEAFE]">
                      <div>
                        <p className="text-xs font-semibold text-[#2563EB]">
                          Kode Room Arena Pertandingan
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="font-mono-num text-2xl font-bold tracking-wider text-[#0F172A]">
                            {onlineRoom.roomId}
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyInvite}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:border-[#2563EB] text-xs font-semibold text-[#0F172A] transition-colors"
                          >
                            {copiedNotice ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-[#059669]" aria-hidden="true" />
                                Tautan Tersalin
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                                Salin Tautan Undangan
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={onLeaveOnlineRoom}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#DC2626] text-xs font-semibold text-[#475569] hover:text-[#DC2626] transition-colors self-start sm:self-auto"
                      >
                        <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                        Keluar Room
                      </button>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-[#334155]">
                        Peserta di Room ({onlineRoom.players.length}/8)
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {onlineRoom.players.map((p) => (
                          <div
                            key={p.clientId}
                            className="px-3.5 py-2.5 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="w-7 h-7 rounded-md bg-[#2563EB] text-white font-display font-bold text-xs flex items-center justify-center shrink-0">
                                {p.name.slice(0, 2).toUpperCase()}
                              </span>
                              <span className="text-sm font-semibold text-[#0F172A] truncate">
                                {p.name}
                                {p.clientId === clientId ? ' (Kamu)' : ''}
                              </span>
                            </div>
                            <span className="text-[11px] font-medium text-[#2563EB] shrink-0">
                              {p.isHost ? 'Host' : p.connected ? 'Siap' : 'Terputus'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <p className="text-xs text-[#475569]">
                        {isRoomHost
                          ? onlineRoom.players.length < 2
                            ? 'Bagikan kode room ke temanmu, atau mulai kapan saja saat siap.'
                            : 'Semua peserta siap! Tekan Mulai Pertandingan untuk memulai serentak.'
                          : 'Menunggu Host mengatur bagian soal dan menekan Mulai Pertandingan...'}
                      </p>
                      {isRoomHost && (
                        <button
                          type="button"
                          onClick={onStartOnlineMatch}
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                        >
                          <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                          Mulai Pertandingan
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {roomError && (
                  <p className="text-xs font-medium text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-3.5 py-2">
                    {roomError}
                  </p>
                )}
            </div>
          </div>

          {/* Official 3-Section JLPT N3 Selector (Auto Official Counts) */}
          <SectionSelector
            sectionFilter={effectiveConfig.sectionFilter}
            categoryFilter={effectiveConfig.categoryFilter}
            disabled={!canEditCategories}
            onChange={handleSectionChange}
            footerSlot={
              <span className="text-xs text-[#475569]">
                {onlineRoom
                  ? isRoomHost
                    ? 'Gunakan tombol "Mulai Pertandingan" di panel Room di atas.'
                    : 'Pengaturan bagian disinkronkan oleh Host room.'
                  : 'Buat atau gabung room di atas untuk memulai Arena Pertandingan.'}
              </span>
            }
          />
        </section>

        {/* Right Column: Official Section Timers, Preferences, Daily Streak, Flashcards */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Official Section Timers Info */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 space-y-3.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
              <h2 className="font-display font-bold text-base text-[#0F172A]">
                Timer &amp; Jumlah Soal JLPT N3
              </h2>
            </div>
            <div className="divide-y divide-[#F1F5F9] text-xs">
              {JLPT_SECTIONS.map((sec) => (
                <div
                  key={sec.id}
                  className="py-2.5 flex items-center justify-between gap-2"
                >
                  <div>
                    <p className="font-jp font-semibold text-[#0F172A]">
                      {sec.jpName}
                    </p>
                    <p className="text-[#475569]">{sec.labelId}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono-num font-bold text-[#2563EB]">
                      {sec.totalQuestions} soal
                    </p>
                    <p className="font-mono-num text-[#64748B]">
                      {sec.officialMinutes} menit
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Furigana & Audio TTS Preferences */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
              <h2 className="font-display font-bold text-base text-[#0F172A]">
                Preferensi Baca &amp; Audio
              </h2>
            </div>

            <div className="flex items-center justify-between gap-3 py-2 border-b border-[#F1F5F9]">
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Furigana (Ruby)</p>
                <p className="text-xs text-[#475569]">
                  Tampilkan cara baca di atas kanji
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={preferences.furiganaEnabled}
                onClick={() =>
                  onUpdatePreferences({
                    ...preferences,
                    furiganaEnabled: !preferences.furiganaEnabled,
                  })
                }
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  preferences.furiganaEnabled
                    ? 'bg-[#2563EB] border-[#2563EB] text-white'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569]'
                }`}
              >
                {preferences.furiganaEnabled ? 'Aktif' : 'Nonaktif'}
              </button>
            </div>

            <div className="space-y-2 py-1 border-b border-[#F1F5F9] pb-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#0F172A] flex items-center gap-1.5">
                  <Headphones className="w-4 h-4 text-[#475569]" aria-hidden="true" />
                  Kecepatan Suara (ja-JP)
                </span>
                <span className="font-mono-num text-xs font-semibold text-[#2563EB]">
                  {preferences.ttsRate}x
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {TTS_RATES.map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() =>
                      onUpdatePreferences({ ...preferences, ttsRate: rate })
                    }
                    className={`py-1.5 rounded-lg border font-mono-num text-xs font-semibold transition-colors ${
                      preferences.ttsRate === rate
                        ? 'bg-[#EFF6FF] border-[#2563EB] text-[#1D4ED8]'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:text-[#0F172A]'
                    }`}
                  >
                    {rate === 0.75
                      ? '0.75x Pelan'
                      : rate === 1.0
                      ? '1.0x Normal'
                      : '1.2x Cepat'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                {preferences.sfxEnabled ? (
                  <Volume2 className="w-4 h-4 text-[#475569]" aria-hidden="true" />
                ) : (
                  <VolumeX className="w-4 h-4 text-[#94A3B8]" aria-hidden="true" />
                )}
                <span className="text-sm font-semibold text-[#0F172A]">
                  Efek Suara Game
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={preferences.sfxEnabled}
                onClick={() =>
                  onUpdatePreferences({
                    ...preferences,
                    sfxEnabled: !preferences.sfxEnabled,
                  })
                }
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                  preferences.sfxEnabled
                    ? 'bg-[#0F172A] border-[#0F172A] text-white'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569]'
                }`}
              >
                {preferences.sfxEnabled ? 'Nyala' : 'Bisu'}
              </button>
            </div>
          </div>

          {/* 7-Day Daily Streak & Flashcard Link */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                <h2 className="font-display font-bold text-base text-[#0F172A]">
                  Target &amp; Streak 7 Hari
                </h2>
              </div>
              <span className="font-mono-num text-sm font-bold text-[#2563EB]">
                {streak} Hari
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#475569]">Progres Hari Ini</span>
                <span className="font-mono-num font-semibold text-[#0F172A]">
                  {todayCount} / {profile.dailyGoal} soal ({goalPct}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
                <div
                  className="h-full bg-[#2563EB] transition-all duration-300"
                  style={{ width: `${goalPct}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5 pt-1">
              {sevenDays.map((day) => (
                <div
                  key={day.dateKey}
                  className={`py-2 rounded-lg border text-center ${
                    day.active
                      ? 'bg-[#EFF6FF] border-[#2563EB] text-[#1D4ED8]'
                      : day.isToday
                      ? 'bg-white border-[#0F172A]/40 text-[#0F172A]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]'
                  }`}
                >
                  <p className="text-[10px] font-medium">{day.dayShort}</p>
                  <p className="font-mono-num text-xs font-bold mt-0.5">
                    {day.dayNum}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('flashcards')}
              className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#2563EB] text-left flex items-center justify-between gap-3 transition-colors"
            >
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">
                  Flashcard Kotoba ({flashcardCount})
                </p>
                <p className="text-xs text-[#475569]">
                  Otomatis terisi tiap selesai kuis atau latihan
                </p>
              </div>
              <Layers className="w-4 h-4 text-[#2563EB] shrink-0" aria-hidden="true" />
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
};
