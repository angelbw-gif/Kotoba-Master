import React, { useEffect, useMemo, useState } from 'react';
import {
  Award,
  BarChart2,
  Check,
  Flame,
  LogOut,
  Mail,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import { getSubCategoryMeta } from '../data/categories';
import type { UserProfile } from '../types/jlpt';
import { computeCurrentStreak, getSevenDayStreakWindow } from '../utils/storage';

interface ProfileModalProps {
  isOpen: boolean;
  profile: UserProfile;
  flashcardCount: number;
  onClose: () => void;
  onUpdateProfile: (displayName: string, dailyGoal: number) => void;
  onResetProgress: () => void;
  onLogout: () => void;
}

type ModalTab = 'riwayat' | 'akun';
type WordFilter = 'all' | 'has_wrong';

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  profile,
  flashcardCount,
  onClose,
  onUpdateProfile,
  onResetProgress,
  onLogout,
}) => {
  const [modalTab, setModalTab] = useState<ModalTab>('riwayat');
  const [wordFilter, setWordFilter] = useState<WordFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [nameInput, setNameInput] = useState(profile.displayName);
  const [goalInput, setGoalInput] = useState(profile.dailyGoal);
  const [savedNotice, setSavedNotice] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setNameInput(profile.displayName);
      setGoalInput(profile.dailyGoal);
    }
  }, [isOpen, profile.email, profile.displayName, profile.dailyGoal]);

  const wordStatsList = useMemo(() => {
    const all = Object.values(profile.wordStats || {});
    const filtered = all.filter((w) => {
      if (wordFilter === 'has_wrong' && w.wrongCount === 0) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        return (
          w.headword.toLowerCase().includes(q) ||
          w.reading.toLowerCase().includes(q) ||
          w.meaningId.toLowerCase().includes(q)
        );
      }
      return true;
    });
    // Sort by wrongCount descending first, then totalAttempts descending
    return filtered.sort((a, b) => {
      if (b.wrongCount !== a.wrongCount) return b.wrongCount - a.wrongCount;
      if (b.totalAttempts !== a.totalAttempts) return b.totalAttempts - a.totalAttempts;
      return b.lastAttemptAt.localeCompare(a.lastAttemptAt);
    });
  }, [profile.wordStats, wordFilter, searchQuery]);

  if (!isOpen) return null;

  const streak = computeCurrentStreak(profile);
  const sevenDays = getSevenDayStreakWindow(profile);
  const accuracy =
    profile.totalAnswered > 0
      ? Math.round((profile.totalCorrect / profile.totalAnswered) * 100)
      : 0;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(nameInput.trim() || profile.displayName, goalInput);
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/45 backdrop-blur-xs"
    >
      <div className="w-full max-w-2xl bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between gap-4 bg-[#F8FAFC]">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#2563EB] shrink-0" aria-hidden="true" />
              <h2
                id="profile-modal-title"
                className="font-display font-bold text-lg text-[#0F172A] truncate"
              >
                {profile.displayName} · Riwayat &amp; Profil
              </h2>
            </div>
            <p className="text-xs text-[#475569] flex items-center gap-1.5 mt-0.5 truncate">
              <Mail className="w-3.5 h-3.5 text-[#64748B] shrink-0" aria-hidden="true" />
              {profile.email}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela profil"
            className="p-1.5 rounded-lg text-[#475569] hover:text-[#0F172A] hover:bg-[#E2E8F0] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inner Modal Tab Switcher */}
        <div className="px-6 pt-4 pb-2 border-b border-[#F1F5F9] flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="inline-flex p-1 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => setModalTab('riwayat')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                modalTab === 'riwayat'
                  ? 'bg-[#2563EB] text-white'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              Riwayat Frekuensi &amp; Sesi
            </button>
            <button
              type="button"
              onClick={() => setModalTab('akun')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                modalTab === 'akun'
                  ? 'bg-[#2563EB] text-white'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              Streak &amp; Pengaturan Akun
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#DC2626] text-xs font-semibold text-[#475569] hover:text-[#DC2626] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
            Keluar / Ganti Email
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {modalTab === 'riwayat' ? (
            <>
              {/* Word / Question Frequency Tracker */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                    <h3 className="text-sm font-bold text-[#0F172A]">
                      Frekuensi Kemunculan Kotoba &amp; Soal
                    </h3>
                  </div>
                  <div className="inline-flex p-0.5 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setWordFilter('all')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                        wordFilter === 'all'
                          ? 'bg-white text-[#0F172A]'
                          : 'text-[#475569]'
                      }`}
                    >
                      Semua ({Object.keys(profile.wordStats || {}).length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setWordFilter('has_wrong')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                        wordFilter === 'has_wrong'
                          ? 'bg-white text-[#DC2626]'
                          : 'text-[#475569]'
                      }`}
                    >
                      Pernah Salah
                    </button>
                  </div>
                </div>

                {/* Search Box */}
                <div className="relative">
                  <Search
                    className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari kanji, bacaan, atau arti kotoba (misal: 競争)..."
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:bg-white focus:border-[#2563EB]"
                  />
                </div>

                {wordStatsList.length === 0 ? (
                  <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center text-xs text-[#475569]">
                    Belum ada catatan frekuensi kotoba untuk filter ini. Jawab soal di Kuis atau Arena Pertandingan untuk mulai melacak frekuensi benar dan salah setiap kata.
                  </div>
                ) : (
                  <div className="divide-y divide-[#F1F5F9] border border-[#E2E8F0] rounded-xl overflow-hidden max-h-[280px] overflow-y-auto">
                    {wordStatsList.map((stat) => {
                      const catMeta = getSubCategoryMeta(stat.category);
                      return (
                        <div
                          key={stat.id}
                          className="px-4 py-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                        >
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-baseline gap-2">
                              <span className="font-jp font-bold text-base text-[#0F172A]">
                                {stat.headword}
                              </span>
                              <span className="font-jp text-[#475569]">
                                【{stat.reading}】
                              </span>
                              <span className="text-[11px] text-[#64748B]">
                                · {catMeta.jpName}
                              </span>
                            </div>
                            <p className="text-[#334155] truncate mt-0.5">
                              {stat.meaningId}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 font-mono-num shrink-0">
                            <span className="px-2 py-1 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] font-semibold">
                              Muncul {stat.totalAttempts} kali
                            </span>
                            <span className="px-2 py-1 rounded-md bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] font-semibold">
                              Benar {stat.correctCount}/{stat.totalAttempts}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-md border font-semibold ${
                                stat.wrongCount > 0
                                  ? 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
                                  : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]'
                              }`}
                            >
                              Salah {stat.wrongCount}/{stat.totalAttempts}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Recent Sessions */}
              <div className="space-y-2.5 pt-2 border-t border-[#F1F5F9]">
                <h3 className="text-sm font-bold text-[#0F172A]">
                  Riwayat Sesi Terakhir
                </h3>
                {profile.recentSessions.length === 0 ? (
                  <p className="text-xs text-[#475569]">
                    Belum ada sesi kuis yang diselesaikan.
                  </p>
                ) : (
                  <div className="divide-y divide-[#F1F5F9] border border-[#E2E8F0] rounded-xl overflow-hidden">
                    {profile.recentSessions.slice(0, 10).map((s) => (
                      <div
                        key={s.id}
                        className="px-4 py-2.5 bg-white flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-[#0F172A] truncate">
                            {s.mode === 'arena'
                              ? `Arena Pertandingan${s.roomCode ? ` (${s.roomCode})` : ''}`
                              : 'Kuis'}{' '}
                            · {s.categoryScope}
                          </p>
                          <p className="text-[#475569] mt-0.5">
                            {s.correctCount}/{s.totalQuestions} benar ·{' '}
                            {s.avgResponseSec.toFixed(1)} dtk/soal
                            {s.mode === 'arena' && s.arenaRank
                              ? ` · Peringkat #${s.arenaRank}/${s.arenaTotalPlayers}`
                              : ''}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono-num font-bold text-[#2563EB]">
                            {s.score} XP
                          </span>
                          <p className="font-mono-num text-[#475569]">{s.accuracyPct}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Summary Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <p className="text-xs text-[#475569]">Streak Aktif</p>
                  <p className="mt-1 font-mono-num text-xl font-bold text-[#2563EB] flex items-center gap-1.5">
                    <Flame className="w-4 h-4" aria-hidden="true" />
                    {streak} Hari
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <p className="text-xs text-[#475569]">Total XP</p>
                  <p className="mt-1 font-mono-num text-xl font-bold text-[#0F172A]">
                    {profile.totalXp}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <p className="text-xs text-[#475569]">Akurasi Total</p>
                  <p className="mt-1 font-mono-num text-xl font-bold text-[#0F172A]">
                    {accuracy}%
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <p className="text-xs text-[#475569]">Kartu Kotoba</p>
                  <p className="mt-1 font-mono-num text-xl font-bold text-[#0F172A]">
                    {flashcardCount}
                  </p>
                </div>
              </div>

              {/* 7-Day Streak Strip */}
              <div className="space-y-2.5">
                <h3 className="text-sm font-semibold text-[#0F172A]">
                  Streak Harian 7 Hari Terakhir
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {sevenDays.map((day) => (
                    <div
                      key={day.dateKey}
                      className={`p-2 rounded-lg border text-center ${
                        day.active
                          ? 'bg-[#EFF6FF] border-[#2563EB] text-[#1D4ED8]'
                          : day.isToday
                          ? 'bg-white border-[#0F172A]/40 text-[#0F172A]'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]'
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

              {/* Edit Profile Form */}
              <form
                onSubmit={handleSave}
                className="space-y-4 pt-2 border-t border-[#F1F5F9]"
              >
                <h3 className="text-sm font-semibold text-[#0F172A]">
                  Pengaturan Akun ({profile.email})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block space-y-1.5">
                    <span className="text-xs font-medium text-[#475569]">
                      Nama Tampilan (tampil di Arena)
                    </span>
                    <input
                      type="text"
                      maxLength={28}
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="text-xs font-medium text-[#475569]">
                      Target Soal Harian
                    </span>
                    <select
                      value={goalInput}
                      onChange={(e) => setGoalInput(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    >
                      <option value={10}>10 soal / hari (Santai)</option>
                      <option value={15}>15 soal / hari (Reguler)</option>
                      <option value={35}>35 soal / hari (1 Bagian N3)</option>
                    </select>
                  </label>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  {!confirmReset ? (
                    <button
                      type="button"
                      onClick={() => setConfirmReset(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#475569] hover:text-[#DC2626] transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      Reset Progres Akun Ini
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#DC2626] font-medium">
                        Yakin hapus riwayat akun?
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onResetProgress();
                          setConfirmReset(false);
                        }}
                        className="px-2.5 py-1 rounded bg-[#DC2626] text-white text-xs font-semibold"
                      >
                        Ya, Reset
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmReset(false)}
                        className="px-2.5 py-1 rounded border border-[#E2E8F0] text-xs text-[#475569]"
                      >
                        Batal
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    {savedNotice ? (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        Tersimpan
                      </>
                    ) : (
                      'Simpan Profil'
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
