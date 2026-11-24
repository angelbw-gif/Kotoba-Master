import React, { useState } from 'react';
import { ArrowRight, BookOpen, Mail, User } from 'lucide-react';
import type { UserProfile } from '../types/jlpt';
import {
  isMasterEmail,
  isValidEmailFormat,
  loginWithEmailApi,
  normalizeEmail,
} from '../utils/storage';

interface LoginGateProps {
  onLoginSuccess: (profile: UserProfile) => void;
}

export const LoginGate: React.FC<LoginGateProps> = ({ onLoginSuccess }) => {
  const [step, setStep] = useState<'email' | 'name'>('email');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = normalizeEmail(emailInput);
    if (!isValidEmailFormat(cleaned)) {
      setErrorMsg('Masukkan alamat email yang valid (contoh: nama@email.com).');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      const resp = await loginWithEmailApi(cleaned);
      if (resp.needsName && !isMasterEmail(cleaned)) {
        setStep('name');
        return;
      }
      if (resp.profile) {
        onLoginSuccess(resp.profile);
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Gagal masuk. Silakan coba lagi.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = nameInput.trim();
    if (trimmedName.length < 2) {
      setErrorMsg('Nama minimal 2 karakter agar tampil jelas di Arena Pertandingan.');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      const cleanedEmail = normalizeEmail(emailInput);
      const resp = await loginWithEmailApi(cleanedEmail, trimmedName);
      if (resp.profile) {
        onLoginSuccess(resp.profile);
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Gagal menyimpan nama. Coba lagi.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-center px-4 py-10">
      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center justify-center gap-2.5">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#2563EB] text-white font-display font-bold text-base tracking-tight">
              N3
            </span>
            <span className="font-display font-bold text-2xl tracking-tight text-[#0F172A]">
              Kotoba Master
            </span>
          </div>
          <p className="text-sm text-[#475569]">
            Arena Pertandingan &amp; Kuis JLPT N3
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 space-y-5">
          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-1">
                <h1 className="font-display text-xl font-bold text-[#0F172A]">
                  Masuk dengan Email
                </h1>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Tidak perlu kata sandi. Progres riwayat soal, frekuensi benar/salah, streak harian, dan Flashcard Kotoba tersimpan per akun email.
                </p>
              </div>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-[#334155]">
                  Alamat Email
                </span>
                <div className="relative">
                  <Mail
                    className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    type="email"
                    autoFocus
                    required
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder="nama@contoh.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:bg-white focus:border-[#2563EB]"
                  />
                </div>
              </label>

              {errorMsg && (
                <p className="text-xs font-medium text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-3 py-2">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 text-white text-sm font-semibold transition-colors"
              >
                {isSubmitting ? 'Memeriksa Email...' : 'Lanjutkan'}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-[#2563EB]">
                    Pendaftaran Pertama Kali
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('email');
                      setErrorMsg(null);
                    }}
                    className="text-xs font-medium text-[#475569] hover:text-[#0F172A] underline"
                  >
                    Ganti Email
                  </button>
                </div>
                <h1 className="font-display text-xl font-bold text-[#0F172A]">
                  Lengkapi Nama Anda
                </h1>
                <p className="text-xs text-[#475569]">
                  Email <strong className="text-[#0F172A]">{normalizeEmail(emailInput)}</strong> belum terdaftar. Masukkan nama yang akan tampil di Battle Lobby dan Arena Pertandingan.
                </p>
              </div>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-[#334155]">
                  Nama Lengkap / Panggilan
                </span>
                <div className="relative">
                  <User
                    className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    autoFocus
                    required
                    maxLength={28}
                    value={nameInput}
                    onChange={(e) => {
                      setNameInput(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder="Contoh: Raka Pratama"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:bg-white focus:border-[#2563EB]"
                  />
                </div>
              </label>

              {errorMsg && (
                <p className="text-xs font-medium text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-3 py-2">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 text-white text-sm font-semibold transition-colors"
              >
                {isSubmitting ? 'Menyimpan...' : 'Masuk ke Battle Lobby'}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          )}
        </div>

        {/* Official N3 Sections Overview */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex items-start gap-3 text-xs text-[#475569]">
          <BookOpen className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <p className="font-semibold text-[#0F172A]">
              Struktur Resmi JLPT N3 (102 Soal)
            </p>
            <p>
              1. <span className="font-jp">文字・語彙</span> (35 soal · 30m) · 2.{' '}
              <span className="font-jp">文法 &amp; 読解</span> (39 soal · 70m) · 3.{' '}
              <span className="font-jp">聴解</span> (28 soal · 40m)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
