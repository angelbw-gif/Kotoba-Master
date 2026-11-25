/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { BattleLobby } from './components/BattleLobby';
import { BelajarBunpou } from './components/BelajarBunpou';
import { FlashcardKotoba } from './components/FlashcardKotoba';
import { Header } from './components/Header';
import { LoginGate } from './components/LoginGate';
import { MasterDashboard } from './components/MasterDashboard';
import { ProfileModal } from './components/ProfileModal';
import { QuizArena } from './components/QuizArena';
import type {
  AppTab,
  FlashcardItem,
  FlashcardMastery,
  JLPTQuestion,
  LearnProgressState,
  OnlineRoomState,
  QuizConfig,
  QuizSessionRecord,
  UserPreferences,
  UserProfile,
  WordAnalysis,
} from './types/jlpt';
import { stopJapaneseSpeech } from './utils/audio';
import {
  createLocalRoom,
  joinLocalRoom,
  leaveLocalRoom,
  rematchLocalRoom,
  startLocalRoomMatch,
  submitLocalPlayerExam,
  subscribeLocalRoom,
  updateLocalPlayerProgress,
  updateLocalRoomConfig,
} from './utils/localArena';
import {
  computeCurrentStreak,
  getCurrentEmail,
  getDefaultLearnProgress,
  getOrCreateClientId,
  isMasterEmail,
  loadFlashcardsForEmail,
  loadLearnProgressForEmail,
  loadPreferences,
  loadProfileForEmail,
  loadTodayCompletedQuestionIds,
  loginWithEmailLocal,
  logoutCurrentEmail,
  mergeAnalysesIntoFlashcardsForEmail,
  recordQuizSessionForEmail,
  recordWordAttempt,
  resetAllProgressForEmail,
  saveFlashcardsForEmail,
  saveLearnProgressForEmail,
  savePreferences,
  saveProfileForEmail,
  updateFlashcardMasteryForEmail,
} from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('lobby');
  const [soloSessionActive, setSoloSessionActive] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [clientId] = useState<string>(() => getOrCreateClientId());
  const [preferences, setPreferences] = useState<UserPreferences>(() =>
    loadPreferences()
  );

  // Email-authenticated profile & per-email flashcards (pure localStorage)
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const email = getCurrentEmail();
    return email ? loadProfileForEmail(email) : null;
  });

  const [flashcards, setFlashcards] = useState<FlashcardItem[]>(() => {
    const email = getCurrentEmail();
    return email ? loadFlashcardsForEmail(email) : [];
  });

  const [learnProgress, setLearnProgress] = useState<LearnProgressState>(() => {
    const email = getCurrentEmail();
    return email ? loadLearnProgressForEmail(email) : getDefaultLearnProgress();
  });

  const [quizConfig, setQuizConfig] = useState<QuizConfig>({
    mode: 'arena',
    sectionFilter: 'moji_goi',
    categoryFilter: 'all',
  });

  // Client-side Arena Pertandingan room state (localStorage + BroadcastChannel)
  const [onlineRoom, setOnlineRoom] = useState<OnlineRoomState | null>(null);
  const [roomError, setRoomError] = useState<string | null>(null);
  const prevRoomStatusRef = useRef<string | null>(null);

  // Refresh local profile session cleanly on mount if email is already saved
  useEffect(() => {
    const savedEmail = getCurrentEmail();
    if (!savedEmail) return;
    try {
      const resp = loginWithEmailLocal(savedEmail);
      if (!resp.needsName && resp.profile) {
        setProfile(resp.profile);
        setFlashcards(loadFlashcardsForEmail(resp.profile.email));
        setLearnProgress(loadLearnProgressForEmail(resp.profile.email));
      }
    } catch {
      // Keep existing cached session if email is invalid
    }
  }, []);

  const applyRoomState = useCallback((nextRoom: OnlineRoomState | null) => {
    if (!nextRoom) {
      setOnlineRoom(null);
      prevRoomStatusRef.current = null;
      return;
    }
    setRoomError(null);
    setOnlineRoom(nextRoom);
    if (
      nextRoom.status === 'playing' &&
      prevRoomStatusRef.current !== 'playing'
    ) {
      stopJapaneseSpeech();
      setActiveTab('quiz');
    }
    prevRoomStatusRef.current = nextRoom.status;
  }, []);

  // Subscribe to multi-tab updates for the active local Arena room
  const activeRoomId = onlineRoom?.roomId ?? null;
  useEffect(() => {
    if (!activeRoomId) return;
    return subscribeLocalRoom(activeRoomId, (updated) => {
      if (updated) {
        applyRoomState(updated);
      }
    });
  }, [activeRoomId, applyRoomState]);

  // Auto-join room from invite URL (?room=XXXXXX...) once logged in
  useEffect(() => {
    if (typeof window === 'undefined' || !profile) return;
    const params = new URLSearchParams(window.location.search);
    const inviteCode = params.get('room')?.trim().toUpperCase();
    if (inviteCode && !onlineRoom) {
      const rawQ = params.get('q');
      const res = joinLocalRoom(inviteCode, clientId, profile.displayName, {
        sectionFilter: params.get('sec'),
        categoryFilter: params.get('cat'),
        questionIds: rawQ
          ? rawQ
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined,
      });
      if (res.room) {
        applyRoomState(res.room);
      } else if (res.error) {
        setRoomError(res.error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.email]);

  const flashcardsRef = useRef(flashcards);
  flashcardsRef.current = flashcards;

  const profileRef = useRef(profile);
  profileRef.current = profile;

  const handleLoginSuccess = (loggedProfile: UserProfile) => {
    const cards = loadFlashcardsForEmail(loggedProfile.email);
    const syncedProfile: UserProfile = {
      ...loggedProfile,
      flashcardCount: cards.length,
    };
    saveProfileForEmail(syncedProfile);
    setProfile(syncedProfile);
    setFlashcards(cards);
    setLearnProgress(loadLearnProgressForEmail(loggedProfile.email));
    setActiveTab('lobby');
    setSoloSessionActive(false);
  };

  const handleLogout = () => {
    stopJapaneseSpeech();
    if (onlineRoom) {
      leaveLocalRoom(onlineRoom.roomId, clientId);
    }
    prevRoomStatusRef.current = null;
    setOnlineRoom(null);
    setRoomError(null);
    logoutCurrentEmail();
    setProfile(null);
    setFlashcards([]);
    setLearnProgress(getDefaultLearnProgress());
    setSoloSessionActive(false);
    setActiveTab('lobby');
  };

  const handleSelectTab = (tab: AppTab) => {
    stopJapaneseSpeech();
    if (tab === 'quiz' && !onlineRoom) {
      setSoloSessionActive(false);
    }
    setActiveTab(tab);
  };

  const handleUpdatePreferences = (next: UserPreferences) => {
    setPreferences(next);
    savePreferences(next);
  };

  const handleUpdateConfig = (next: QuizConfig) => {
    setQuizConfig(next);
    if (onlineRoom && onlineRoom.status === 'waiting') {
      const updated = updateLocalRoomConfig(onlineRoom.roomId, clientId, {
        sectionFilter: next.sectionFilter,
        categoryFilter: next.categoryFilter,
      });
      if (updated) applyRoomState(updated);
    }
  };

  const handleCreateOnlineRoom = () => {
    if (!profile) return;
    setRoomError(null);
    const created = createLocalRoom(clientId, profile.displayName, {
      sectionFilter: quizConfig.sectionFilter,
      categoryFilter: quizConfig.categoryFilter,
    });
    applyRoomState(created);
  };

  const handleJoinOnlineRoom = (roomCode: string) => {
    if (!profile) return;
    const res = joinLocalRoom(roomCode, clientId, profile.displayName);
    if (res.room) {
      applyRoomState(res.room);
    } else if (res.error) {
      setRoomError(res.error);
    }
  };

  const handleStartOnlineMatch = () => {
    if (!onlineRoom) return;
    const excludeIds = profile
      ? loadTodayCompletedQuestionIds(profile.email)
      : [];
    const updated = startLocalRoomMatch(onlineRoom.roomId, clientId, excludeIds);
    if (updated) applyRoomState(updated);
  };

  const handleLeaveOnlineRoom = () => {
    if (onlineRoom) {
      leaveLocalRoom(onlineRoom.roomId, clientId);
    }
    prevRoomStatusRef.current = null;
    setOnlineRoom(null);
    setRoomError(null);
    if (typeof window !== 'undefined' && window.location.search.includes('room=')) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  };

  const handleUpdateOnlineProgress = useCallback(
    (answeredCount: number) => {
      if (!onlineRoom) return;
      const updated = updateLocalPlayerProgress(
        onlineRoom.roomId,
        clientId,
        answeredCount
      );
      if (updated) setOnlineRoom(updated);
    },
    [onlineRoom, clientId]
  );

  const handleSubmitOnlineExam = useCallback(
    (payload: {
      answers: Record<string, string | string[]>;
      totalTimeSec: number;
    }) => {
      if (!onlineRoom) return;
      const updated = submitLocalPlayerExam(
        onlineRoom.roomId,
        clientId,
        payload
      );
      if (updated) applyRoomState(updated);
    },
    [onlineRoom, clientId, applyRoomState]
  );

  const handleRematchOnlineRoom = useCallback(() => {
    if (!onlineRoom) return;
    const updated = rematchLocalRoom(onlineRoom.roomId, clientId);
    if (updated) applyRoomState(updated);
  }, [onlineRoom, clientId, applyRoomState]);

  const handleUpdateCardMastery = (
    cardId: string,
    mastery: FlashcardMastery
  ) => {
    const email = profileRef.current?.email;
    if (!email) return;
    setFlashcards((prev) =>
      updateFlashcardMasteryForEmail(email, prev, cardId, mastery)
    );
  };

  const handleRemoveFlashcard = (cardId: string) => {
    const currentProf = profileRef.current;
    if (!currentProf) return;
    setFlashcards((prev) => {
      const next = prev.filter((c) => c.id !== cardId);
      saveFlashcardsForEmail(currentProf.email, next);
      const nextProf = { ...currentProf, flashcardCount: next.length };
      saveProfileForEmail(nextProf);
      setProfile(nextProf);
      return next;
    });
  };

  const handleRecordWordAttempt = useCallback(
    (question: JLPTQuestion, isCorrect: boolean) => {
      setProfile((prev) => (prev ? recordWordAttempt(prev, question, isCorrect) : prev));
    },
    []
  );

  const handleSessionComplete = useCallback(
    (
      record: QuizSessionRecord,
      encounteredAnalyses: WordAnalysis[]
    ): number => {
      const currentProf = profileRef.current;
      if (!currentProf) return 0;

      const merged = mergeAnalysesIntoFlashcardsForEmail(
        currentProf.email,
        flashcardsRef.current,
        encounteredAnalyses
      );
      if (merged.addedCount > 0) {
        setFlashcards(merged.nextCards);
      }

      setProfile((prev) =>
        prev
          ? recordQuizSessionForEmail(prev, record, merged.nextCards.length)
          : prev
      );
      return merged.addedCount;
    },
    []
  );

  const handleUpdateProfile = (displayName: string, dailyGoal: number) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const next = { ...prev, displayName, dailyGoal };
      saveProfileForEmail(next);
      return next;
    });
  };

  const handleSaveLearnProgress = (next: LearnProgressState) => {
    setLearnProgress(next);
    if (profile) {
      saveLearnProgressForEmail(profile.email, next);
    }
  };

  const handleResetProgress = () => {
    if (!profile) return;
    const fresh = resetAllProgressForEmail(profile.email, profile.displayName);
    setProfile(fresh.profile);
    setFlashcards(fresh.flashcards);
    setLearnProgress(getDefaultLearnProgress());
  };

  if (!profile) {
    return <LoginGate onLoginSuccess={handleLoginSuccess} />;
  }

  const isMaster = Boolean(profile.isMaster || isMasterEmail(profile.email));
  const streakCount = computeCurrentStreak(profile);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        streakCount={streakCount}
        displayName={profile.displayName}
        isMaster={isMaster}
        flashcardCount={flashcards.length}
        hasActiveOnlineRoom={Boolean(onlineRoom)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      <div className="flex-1">
        {activeTab === 'lobby' && (
          <BattleLobby
            config={quizConfig}
            preferences={preferences}
            profile={profile}
            flashcardCount={flashcards.length}
            onlineRoom={onlineRoom}
            clientId={clientId}
            roomError={roomError}
            wsConnecting={false}
            onUpdateConfig={handleUpdateConfig}
            onUpdatePreferences={handleUpdatePreferences}
            onCreateOnlineRoom={handleCreateOnlineRoom}
            onJoinOnlineRoom={handleJoinOnlineRoom}
            onStartOnlineMatch={handleStartOnlineMatch}
            onLeaveOnlineRoom={handleLeaveOnlineRoom}
            onNavigateTab={handleSelectTab}
          />
        )}

        {activeTab === 'learn' && (
          <BelajarBunpou
            preferences={preferences}
            learnProgress={learnProgress}
            onUpdatePreferences={handleUpdatePreferences}
            onSaveLearnProgress={handleSaveLearnProgress}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizArena
            config={quizConfig}
            soloSessionActive={soloSessionActive}
            preferences={preferences}
            profile={profile}
            flashcards={flashcards}
            onlineRoom={onlineRoom}
            clientId={clientId}
            onUpdateConfig={handleUpdateConfig}
            onStartSoloSession={() => setSoloSessionActive(true)}
            onExitSoloSession={() => setSoloSessionActive(false)}
            onUpdatePreferences={handleUpdatePreferences}
            onRecordWordAttempt={handleRecordWordAttempt}
            onSessionComplete={handleSessionComplete}
            onUpdateOnlineProgress={handleUpdateOnlineProgress}
            onSubmitOnlineExam={handleSubmitOnlineExam}
            onRematchOnlineRoom={handleRematchOnlineRoom}
            onLeaveOnlineRoom={handleLeaveOnlineRoom}
            onNavigateTab={handleSelectTab}
            onOpenHistory={() => setIsProfileOpen(true)}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardKotoba
            flashcards={flashcards}
            wordStats={profile.wordStats || {}}
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
            onUpdateMastery={handleUpdateCardMastery}
            onRemoveCard={handleRemoveFlashcard}
            onNavigateTab={handleSelectTab}
          />
        )}

        {activeTab === 'master' && isMaster && (
          <MasterDashboard currentMasterEmail={profile.email} />
        )}
      </div>

      <footer className="border-t border-[#E2E8F0] bg-[#F8FAFC] py-5 px-4 sm:px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#475569]">
          <span>
            Kotoba Master · Arena Belajar JLPT N3 (文字・語彙 · 文法 &amp; 読解 · 聴解)
          </span>
          <span>
            Riwayat frekuensi kotoba, sesi kuis &amp; Flashcard Kotoba tersimpan per akun email
          </span>
        </div>
      </footer>

      <ProfileModal
        isOpen={isProfileOpen}
        profile={profile}
        flashcardCount={flashcards.length}
        onClose={() => setIsProfileOpen(false)}
        onUpdateProfile={handleUpdateProfile}
        onResetProgress={handleResetProgress}
        onLogout={handleLogout}
      />
    </div>
  );
}
