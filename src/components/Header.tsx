import React from 'react';
import { Flame, ShieldCheck, User } from 'lucide-react';
import type { AppTab } from '../types/jlpt';

interface HeaderProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  streakCount: number;
  displayName: string;
  isMaster: boolean;
  flashcardCount: number;
  hasActiveOnlineRoom: boolean;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  streakCount,
  displayName,
  isMaster,
  flashcardCount,
  hasActiveOnlineRoom,
  onOpenProfile,
}) => {
  const navItems: { id: AppTab; label: string }[] = [
    { id: 'lobby', label: 'Battle Lobby' },
    { id: 'learn', label: 'Belajar' },
    { id: 'quiz', label: 'Kuis' },
    { id: 'flashcards', label: 'Flashcard Kotoba' },
    ...(isMaster ? [{ id: 'master' as AppTab, label: 'Pantau User' }] : []),
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#F8FAFC]/95 backdrop-blur-sm border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Mark & Wordmark */}
        <button
          type="button"
          onClick={() => onSelectTab('lobby')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-md py-1"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-[#2563EB] text-white font-display font-bold text-sm tracking-tight">
            N3
          </span>
          <span className="font-display font-bold text-lg tracking-tight text-[#0F172A]">
            Kotoba Master
          </span>
        </button>

        {/* Zone 2: Single-line Navigation Links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 h-full"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`relative h-full inline-flex items-center text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] px-1 ${
                  isActive
                    ? 'text-[#2563EB] font-semibold'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {item.id === 'master' && (
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#2563EB]" aria-hidden="true" />
                )}
                <span>{item.label}</span>
                {item.id === 'quiz' && hasActiveOnlineRoom && (
                  <span className="ml-1.5 text-xs font-semibold text-[#2563EB]">
                    (Online)
                  </span>
                )}
                {item.id === 'flashcards' && flashcardCount > 0 && (
                  <span className="ml-1.5 font-mono-num text-xs text-[#64748B]">
                    ({flashcardCount})
                  </span>
                )}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Daily Streak & Profile Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenProfile}
            className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#2563EB]/60 text-sm font-medium text-[#0F172A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            title="Lihat Streak Harian, Riwayat & Profil"
          >
            <Flame
              className={`w-4 h-4 ${
                streakCount > 0 ? 'text-[#2563EB]' : 'text-[#94A3B8]'
              }`}
              aria-hidden="true"
            />
            <span className="font-mono-num font-semibold text-[#0F172A]">
              {streakCount}h
            </span>
            <span className="text-[#CBD5E1]" aria-hidden="true">
              ·
            </span>
            <User className="w-4 h-4 text-[#475569]" aria-hidden="true" />
            <span className="hidden sm:inline max-w-[120px] truncate text-[#0F172A]">
              {displayName}
            </span>
            {isMaster && (
              <span className="text-[11px] font-semibold text-[#2563EB]">
                (Master)
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Compact Mobile Navigation Strip */}
      <nav
        aria-label="Navigasi seluler"
        className="md:hidden border-t border-[#E2E8F0] bg-white px-2 flex items-center justify-around overflow-x-auto"
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`relative py-2.5 px-3 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                isActive ? 'text-[#2563EB] font-semibold' : 'text-[#475569]'
              }`}
            >
              {item.label}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#2563EB]"
                />
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
