/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { BattleLobby } from './components/BattleLobby';
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
  OnlineRoomState,
  QuizConfig,
  QuizSessionRecord,
  UserPreferences,
  UserProfile,
  WordAnalysis,
} from './types/jlpt';
import { stopJapaneseSpeech } from './utils/audio';
import {
  computeCurrentStreak,
  getCurrentEmail,
  getOrCreateClientId,
  isMasterEmail,
  loadFlashcardsForEmail,
  loadPreferences,
  loadProfileForEmail,
  loadTodayCompletedQuestionIds,
  loginWithEmailApi,
  logoutCurrentEmail,
  mergeAnalysesIntoFlashcardsForEmail,
  recordQuizSessionForEmail,
  recordWordAttempt,
  resetAllProgressForEmail,
  saveFlashcardsForEmail,
  savePreferences,
  saveProfileForEmail,
  syncProfileToServer,
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

  // Email-authenticated profile & per-email flashcards
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const email = getCurrentEmail();
    return email ? loadProfileForEmail(email) : null;
  });

  const [flashcards, setFlashcards] = useState<FlashcardItem[]>(() => {
    const email = getCurrentEmail();
    return email ? loadFlashcardsForEmail(email) : [];
  });

  const [quizConfig, setQuizConfig] = useState<QuizConfig>({
    mode: 'arena',
    sectionFilter: 'moji_goi',
    categoryFilter: 'all',
  });

  // Real-time WebSocket state for Arena Pertandingan
  const [onlineRoom, setOnlineRoom] = useState<OnlineRoomState | null>(null);
  const [roomError, setRoomError] = useState<string | null>(null);
  const [wsConnecting, setWsConnecting] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const pendingActionRef = useRef<(() => void) | null>(null);
  const prevRoomStatusRef = useRef<string | null>(null);

  // Refresh in-memory Bearer token & sync profile on mount if email already saved
  useEffect(() => {
    const savedEmail = getCurrentEmail();
    if (!savedEmail) return;
    void loginWithEmailApi(savedEmail)
      .then((resp) => {
        if (!resp.needsName && resp.profile) {
          setProfile(resp.profile);
          setFlashcards(loadFlashcardsForEmail(resp.profile.email));
        }
      })
      .catch(() => {
        // Offline / transient network fallback keeps local cached session usable
      });
  }, []);

  const sendWsMessage = useCallback((payload: unknown) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload));
      return true;
    }
    return false;
  }, []);

  const ensureSocketConnected = useCallback((onOpenAction?: () => void) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      onOpenAction?.();
      return;
    }

    if (onOpenAction) {
      pendingActionRef.current = onOpenAction;
    }

    if (wsRef.current && wsRef.current.readyState === WebSocket.CONNECTING) {
      return;
    }

    setWsConnecting(true);
    setRoomError(null);
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}/ws`);
    wsRef.current = ws;

    ws.onopen = () => {
      setWsConnecting(false);
      const queued = pendingActionRef.current;
      pendingActionRef.current = null;
      queued?.();
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(String(event.data)) as {
          type: string;
          room?: OnlineRoomState;
          message?: string;
        };

        if (data.type === 'room:state' && data.room) {
          const nextRoom = data.room;
          setRoomError(null);
          setOnlineRoom(nextRoom);

          // Auto-transition both Host & Friends into Kuis when match starts
          if (
            nextRoom.status === 'playing' &&
            prevRoomStatusRef.current !== 'playing'
          ) {
            stopJapaneseSpeech();
            setActiveTab('quiz');
          }
          prevRoomStatusRef.current = nextRoom.status;
        } else if (data.type === 'room:error' && data.message) {
          setRoomError(data.message);
        }
      } catch {
        // Ignore malformed ws message
      }
    };

    ws.onerror = () => {
      setWsConnecting(false);
      setRoomError('Gagal terhubung ke server Arena Pertandingan.');
    };

    ws.onclose = () => {
      setWsConnecting(false);
      wsRef.current = null;
    };
  }, []);

  // Auto-join room from invite URL (?room=XXXXXX) once logged in
  useEffect(() => {
    if (typeof window === 'undefined' || !profile) return;
    const params = new URLSearchParams(window.location.search);
    const inviteCode = params.get('room')?.trim().toUpperCase();
    if (inviteCode && !onlineRoom) {
      setQuizConfig((prev) => ({ ...prev, mode: 'arena' }));
      ensureSocketConnected(() => {
        sendWsMessage({
          type: 'room:join',
          roomId: inviteCode,
          clientId,
          name: profile.displayName,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.email]);

  useEffect(() => {
    return () => {
      wsRef.current?.close();
    };
  }, []);

  const flashcardsRef = useRef(flashcards);
  flashcardsRef.current = flashcards;

  const profileRef = useRef(profile);
  profileRef.current = profile;

  const handleLoginSuccess = (loggedProfile: UserProfile) => {
    const cards = loadFlashcardsForEmail(loggedProfile.email);
    setProfile(loggedProfile);
    setFlashcards(cards);
    setActiveTab('lobby');
    setSoloSessionActive(false);
    void syncProfileToServer(loggedProfile, cards.length);
  };

  const handleLogout = () => {
    stopJapaneseSpeech();
    if (onlineRoom) {
      sendWsMessage({
        type: 'room:leave',
        roomId: onlineRoom.roomId,
        clientId,
      });
    }
    prevRoomStatusRef.current = null;
    setOnlineRoom(null);
    setRoomError(null);
    logoutCurrentEmail();
    setProfile(null);
    setFlashcards([]);
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
      sendWsMessage({
        type: 'room:update_config',
        roomId: onlineRoom.roomId,
        clientId,
        config: {
          sectionFilter: next.sectionFilter,
          categoryFilter: next.categoryFilter,
        },
      });
    }
  };

  const handleCreateOnlineRoom = () => {
    if (!profile) return;
    ensureSocketConnected(() => {
      sendWsMessage({
        type: 'room:create',
        clientId,
        name: profile.displayName,
        config: {
          sectionFilter: quizConfig.sectionFilter,
          categoryFilter: quizConfig.categoryFilter,
        },
      });
    });
  };

  const handleJoinOnlineRoom = (roomCode: string) => {
    if (!profile) return;
    ensureSocketConnected(() => {
      sendWsMessage({
        type: 'room:join',
        roomId: roomCode,
        clientId,
        name: profile.displayName,
      });
    });
  };

  const handleStartOnlineMatch = () => {
    if (!onlineRoom) return;
    const excludeIds = profile
      ? loadTodayCompletedQuestionIds(profile.email)
      : [];
    sendWsMessage({
      type: 'room:start',
      roomId: onlineRoom.roomId,
      clientId,
      excludeIds,
    });
  };

  const handleLeaveOnlineRoom = () => {
    if (onlineRoom) {
      sendWsMessage({
        type: 'room:leave',
        roomId: onlineRoom.roomId,
        clientId,
      });
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
      sendWsMessage({
        type: 'room:progress',
        roomId: onlineRoom.roomId,
        clientId,
        answeredCount,
      });
    },
    [onlineRoom, sendWsMessage, clientId]
  );

  const handleSubmitOnlineExam = useCallback(
    (payload: {
      answers: Record<string, string | string[]>;
      totalTimeSec: number;
    }) => {
      if (!onlineRoom) return;
      sendWsMessage({
        type: 'room:submit_exam',
        roomId: onlineRoom.roomId,
        clientId,
        ...payload,
      });
    },
    [onlineRoom, sendWsMessage, clientId]
  );

  const handleRematchOnlineRoom = useCallback(() => {
    if (!onlineRoom) return;
    sendWsMessage({
      type: 'room:rematch',
      roomId: onlineRoom.roomId,
      clientId,
    });
  }, [onlineRoom, sendWsMessage, clientId]);

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
      void syncProfileToServer(currentProf, next.length);
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
      void syncProfileToServer(next, flashcardsRef.current.length);
      return next;
    });
  };

  const handleResetProgress = () => {
    if (!profile) return;
    const fresh = resetAllProgressForEmail(profile.email, profile.displayName);
    setProfile(fresh.profile);
    setFlashcards(fresh.flashcards);
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
            wsConnecting={wsConnecting}
            onUpdateConfig={handleUpdateConfig}
            onUpdatePreferences={handleUpdatePreferences}
            onCreateOnlineRoom={handleCreateOnlineRoom}
            onJoinOnlineRoom={handleJoinOnlineRoom}
            onStartOnlineMatch={handleStartOnlineMatch}
            onLeaveOnlineRoom={handleLeaveOnlineRoom}
            onNavigateTab={handleSelectTab}
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
