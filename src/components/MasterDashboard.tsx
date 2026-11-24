import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BarChart2,
  Flame,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { getSubCategoryMeta } from '../data/categories';
import type { UserProfile } from '../types/jlpt';
import {
  computeCurrentStreak,
  getSevenDayStreakWindow,
  loadAllLocalProfiles,
} from '../utils/storage';

interface MasterDashboardProps {
  currentMasterEmail: string;
}

type SortKey = 'recent' | 'xp' | 'accuracy' | 'answered';
type WordFilter = 'all' | 'has_wrong';

function formatRelativeOrDate(iso?: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const MasterDashboard: React.FC<MasterDashboardProps> = ({
  currentMasterEmail,
}) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('recent');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [wordFilter, setWordFilter] = useState<WordFilter>('all');

  const loadUsers = useCallback(() => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const list = loadAllLocalProfiles();
      setUsers(list);
      setSelectedEmail((prev) => {
        if (prev && list.some((u) => u.email === prev)) return prev;
        return list[0]?.email ?? null;
      });
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Gagal memuat daftar progres user.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const matched = users.filter((u) => {
      if (!q) return true;
      return (
        u.displayName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    });

    return [...matched].sort((a, b) => {
      if (sortBy === 'xp') return b.totalXp - a.totalXp;
      if (sortBy === 'answered') return b.totalAnswered - a.totalAnswered;
      if (sortBy === 'accuracy') {
        const accA = a.totalAnswered > 0 ? a.totalCorrect / a.totalAnswered : 0;
        const accB = b.totalAnswered > 0 ? b.totalCorrect / b.totalAnswered : 0;
        return accB - accA;
      }
      return (b.lastActiveAt || '').localeCompare(a.lastActiveAt || '');
    });
  }, [users, searchQuery, sortBy]);

  const selectedUser = useMemo(
    () =>
      users.find((u) => u.email === selectedEmail) ?? filteredUsers[0] ?? null,
    [users, selectedEmail, filteredUsers]
  );

  const aggregate = useMemo(() => {
    const totalUsers = users.length;
    const totalAnswered = users.reduce((sum, u) => sum + u.totalAnswered, 0);
    const totalCorrect = users.reduce((sum, u) => sum + u.totalCorrect, 0);
    const totalSessions = users.reduce(
      (sum, u) => sum + (u.recentSessions?.length ?? 0),
      0
    );
    const globalAcc =
      totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    return { totalUsers, totalAnswered, globalAcc, totalSessions };
  }, [users]);

  const selectedWordStats = useMemo(() => {
    if (!selectedUser) return [];
    const list = Object.values(selectedUser.wordStats || {});
    const filtered =
      wordFilter === 'has_wrong' ? list.filter((w) => w.wrongCount > 0) : list;
    return filtered.sort((a, b) => {
      if (b.wrongCount !== a.wrongCount) return b.wrongCount - a.wrongCount;
      return b.totalAttempts - a.totalAttempts;
    });
  }, [selectedUser, wordFilter]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Master Banner */}
      <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB]">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            Panel Master · {currentMasterEmail}
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Pantau Progres Semua User
          </h1>
          <p className="text-sm text-[#475569]">
            Lihat aktivitas belajar, akurasi sesi, streak harian, serta frekuensi benar/salah tiap kotoba dari seluruh akun yang tersimpan di browser ini.
          </p>
        </div>

        <button
          type="button"
          onClick={loadUsers}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          <RefreshCw
            className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
            aria-hidden="true"
          />
          {loading ? 'Memuat...' : 'Segarkan Data'}
        </button>
      </section>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-xs font-medium text-[#DC2626]">
          {errorMsg}
        </div>
      )}

      {/* Global Summary KPIs */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
          <p className="text-xs text-[#475569]">Total Akun Terdaftar</p>
          <p className="mt-1 font-mono-num text-2xl font-bold text-[#2563EB]">
            {aggregate.totalUsers}
          </p>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
          <p className="text-xs text-[#475569]">Total Soal Dijawab</p>
          <p className="mt-1 font-mono-num text-2xl font-bold text-[#0F172A]">
            {aggregate.totalAnswered}
          </p>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
          <p className="text-xs text-[#475569]">Rata-rata Akurasi Global</p>
          <p className="mt-1 font-mono-num text-2xl font-bold text-[#0F172A]">
            {aggregate.globalAcc}%
          </p>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
          <p className="text-xs text-[#475569]">Total Sesi Tersimpan</p>
          <p className="mt-1 font-mono-num text-2xl font-bold text-[#0F172A]">
            {aggregate.totalSessions}
          </p>
        </div>
      </section>

      {/* Main Split: User List (Left) & User Detail Progress (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: User Directory */}
        <section className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-[#E2E8F0] bg-[#F8FAFC] space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                <h2 className="font-display font-bold text-sm text-[#0F172A]">
                  Daftar User ({filteredUsers.length})
                </h2>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                aria-label="Urutkan daftar user"
                className="px-2.5 py-1 rounded-lg bg-white border border-[#E2E8F0] text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
              >
                <option value="recent">Terakhir Aktif</option>
                <option value="xp">Total XP Tertinggi</option>
                <option value="answered">Soal Terbanyak</option>
                <option value="accuracy">Akurasi Tertinggi</option>
              </select>
            </div>

            <div className="relative">
              <Search
                className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau email user..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white border border-[#E2E8F0] text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#475569]">
              Belum ada data user yang cocok.
            </div>
          ) : (
            <div className="divide-y divide-[#F1F5F9] max-h-[560px] overflow-y-auto">
              {filteredUsers.map((u) => {
                const isSelected = selectedUser?.email === u.email;
                const acc =
                  u.totalAnswered > 0
                    ? Math.round((u.totalCorrect / u.totalAnswered) * 100)
                    : 0;
                const streak = computeCurrentStreak(u);

                return (
                  <button
                    key={u.email}
                    type="button"
                    onClick={() => setSelectedEmail(u.email)}
                    className={`w-full px-4 py-3.5 text-left transition-colors flex items-start justify-between gap-3 ${
                      isSelected ? 'bg-[#EFF6FF]' : 'bg-white hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#0F172A] truncate">
                          {u.displayName}
                        </span>
                        {u.isMaster && (
                          <span className="text-[11px] font-semibold text-[#2563EB] shrink-0">
                            Master
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#475569] truncate">{u.email}</p>
                      <p className="font-mono-num text-[11px] text-[#64748B] pt-0.5">
                        {u.totalAnswered} soal · Akurasi {acc}% · Streak {streak}h
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-mono-num text-sm font-bold text-[#2563EB]">
                        {u.totalXp} XP
                      </p>
                      <p className="text-[11px] text-[#64748B] mt-0.5">
                        {formatRelativeOrDate(u.lastActiveAt)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Right: Selected User Detailed Progress */}
        <section className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-6">
          {!selectedUser ? (
            <div className="py-12 text-center text-sm text-[#475569]">
              Pilih salah satu user di sebelah kiri untuk melihat rincian progresnya.
            </div>
          ) : (
            <>
              <div className="pb-4 border-b border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-xl font-bold text-[#0F172A]">
                      {selectedUser.displayName}
                    </h2>
                    {selectedUser.isMaster && (
                      <span className="text-xs font-semibold text-[#2563EB]">
                        (Master)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#475569]">{selectedUser.email}</p>
                </div>
                <span className="text-xs text-[#64748B]">
                  Aktif terakhir: {formatRelativeOrDate(selectedUser.lastActiveAt)}
                </span>
              </div>

              {/* Selected User Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <p className="text-xs text-[#475569]">Total XP</p>
                  <p className="mt-1 font-mono-num text-lg font-bold text-[#2563EB]">
                    {selectedUser.totalXp}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <p className="text-xs text-[#475569]">Soal Dijawab</p>
                  <p className="mt-1 font-mono-num text-lg font-bold text-[#0F172A]">
                    {selectedUser.totalAnswered}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <p className="text-xs text-[#475569]">Akurasi</p>
                  <p className="mt-1 font-mono-num text-lg font-bold text-[#0F172A]">
                    {selectedUser.totalAnswered > 0
                      ? Math.round(
                          (selectedUser.totalCorrect / selectedUser.totalAnswered) *
                            100
                        )
                      : 0}
                    %
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <p className="text-xs text-[#475569]">Flashcard</p>
                  <p className="mt-1 font-mono-num text-lg font-bold text-[#0F172A]">
                    {selectedUser.flashcardCount ?? 1}
                  </p>
                </div>
              </div>

              {/* 7-Day Streak */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0F172A] flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                    Aktivitas 7 Hari Terakhir
                  </span>
                  <span className="font-mono-num font-bold text-[#2563EB]">
                    Streak {computeCurrentStreak(selectedUser)} Hari
                  </span>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {getSevenDayStreakWindow(selectedUser).map((day) => (
                    <div
                      key={day.dateKey}
                      className={`p-2 rounded-lg border text-center ${
                        day.active
                          ? 'bg-[#EFF6FF] border-[#2563EB] text-[#1D4ED8]'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]'
                      }`}
                    >
                      <p className="text-[10px] font-medium">{day.dayShort}</p>
                      <p className="font-mono-num text-xs font-bold">{day.dayNum}</p>
                      <p className="font-mono-num text-[10px]">
                        {day.active ? `${day.questionsAnswered}` : '—'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Word Frequency Breakdown for Selected User */}
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                    <BarChart2 className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                    Frekuensi Kotoba &amp; Soal ({selectedWordStats.length})
                  </span>
                  <div className="inline-flex p-0.5 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0]">
                    <button
                      type="button"
                      onClick={() => setWordFilter('all')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                        wordFilter === 'all'
                          ? 'bg-white text-[#0F172A]'
                          : 'text-[#475569]'
                      }`}
                    >
                      Semua
                    </button>
                    <button
                      type="button"
                      onClick={() => setWordFilter('has_wrong')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                        wordFilter === 'has_wrong'
                          ? 'bg-white text-[#DC2626]'
                          : 'text-[#475569]'
                      }`}
                    >
                      Pernah Salah
                    </button>
                  </div>
                </div>

                {selectedWordStats.length === 0 ? (
                  <p className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569]">
                    Belum ada catatan soal untuk filter ini.
                  </p>
                ) : (
                  <div className="divide-y divide-[#F1F5F9] border border-[#E2E8F0] rounded-xl overflow-hidden max-h-[240px] overflow-y-auto">
                    {selectedWordStats.map((stat) => {
                      const catMeta = getSubCategoryMeta(stat.category);
                      return (
                        <div
                          key={stat.id}
                          className="px-3.5 py-2.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                        >
                          <div className="min-w-0">
                            <span className="font-jp font-bold text-sm text-[#0F172A]">
                              {stat.headword}
                            </span>
                            <span className="font-jp text-[#475569] ml-1.5">
                              【{stat.reading}】
                            </span>
                            <span className="text-[11px] text-[#64748B] ml-1.5">
                              · {catMeta.jpName}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 font-mono-num shrink-0">
                            <span className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A]">
                              Muncul {stat.totalAttempts}x
                            </span>
                            <span className="px-2 py-0.5 rounded bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46]">
                              Benar {stat.correctCount}/{stat.totalAttempts}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded border ${
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

              {/* Recent Sessions for Selected User */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[#0F172A]">
                  Riwayat Sesi Terakhir ({selectedUser.recentSessions.length})
                </h3>
                {selectedUser.recentSessions.length === 0 ? (
                  <p className="text-xs text-[#475569]">
                    User ini belum menyelesaikan sesi kuis.
                  </p>
                ) : (
                  <div className="divide-y divide-[#F1F5F9] border border-[#E2E8F0] rounded-xl overflow-hidden max-h-[200px] overflow-y-auto">
                    {selectedUser.recentSessions.slice(0, 10).map((s) => (
                      <div
                        key={s.id}
                        className="px-3.5 py-2.5 bg-white flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-[#0F172A] truncate">
                            {s.mode === 'arena'
                              ? `Arena${s.roomCode ? ` (${s.roomCode})` : ''}`
                              : 'Kuis'}{' '}
                            · {s.categoryScope}
                          </p>
                          <p className="text-[#475569]">
                            {s.correctCount}/{s.totalQuestions} benar ·{' '}
                            {s.avgResponseSec.toFixed(1)} dtk/soal
                          </p>
                        </div>
                        <div className="text-right font-mono-num shrink-0">
                          <span className="font-bold text-[#2563EB]">{s.score} XP</span>
                          <p className="text-[#475569]">{s.accuracyPct}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
};
