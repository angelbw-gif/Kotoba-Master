import type { TtsRate } from '../types/jlpt';

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedAudioCtx) {
    try {
      sharedAudioCtx = new AudioCtx();
    } catch {
      return null;
    }
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', gainVal = 0.08, delay = 0) {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(gainVal, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  } catch {
    // Ignore audio context restriction errors
  }
}

export function playCorrectSfx(enabled: boolean) {
  if (!enabled) return;
  playTone(587.33, 0.14, 'triangle', 0.09, 0); // D5
  playTone(880.0, 0.22, 'triangle', 0.09, 0.08); // A5
}

export function playComboSfx(enabled: boolean, combo: number) {
  if (!enabled) return;
  const base = Math.min(523.25 + combo * 40, 1046.5);
  playTone(base, 0.12, 'sine', 0.08, 0);
  playTone(base * 1.25, 0.18, 'triangle', 0.08, 0.07);
}

export function playWrongSfx(enabled: boolean) {
  if (!enabled) return;
  playTone(220, 0.16, 'sawtooth', 0.05, 0);
  playTone(174.61, 0.24, 'sawtooth', 0.05, 0.1);
}

export function playVictorySfx(enabled: boolean) {
  if (!enabled) return;
  playTone(523.25, 0.16, 'triangle', 0.08, 0);
  playTone(659.25, 0.16, 'triangle', 0.08, 0.1);
  playTone(783.99, 0.18, 'triangle', 0.09, 0.2);
  playTone(1046.5, 0.34, 'triangle', 0.1, 0.3);
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopJapaneseSpeech(): void {
  if (!isSpeechSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    // Ignore speechSynthesis cancel failure
  }
}

export function speakJapanese(
  text: string,
  rate: TtsRate = 1.0,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: () => void
): boolean {
  if (!isSpeechSupported() || !text.trim()) {
    onError?.();
    return false;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const jaVoice =
      voices.find((v) => v.lang.toLowerCase().startsWith('ja') && v.localService) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('ja'));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    utterance.onstart = () => onStart?.();
    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onError?.();

    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    onError?.();
    return false;
  }
}
