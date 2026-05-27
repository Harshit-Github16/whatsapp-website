'use client';

import React, { useState, useEffect } from 'react';
import { Phone, ShieldCheck, ArrowRight, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpHint, setOtpHint] = useState<string | null>(null);

  // Auto-login or pre-fill parameters from onboarding simulator
  useEffect(() => {
    const phoneParam = searchParams.get('phone');
    const otpParam = searchParams.get('otp');

    if (phoneParam) {
      setPhoneNumber(phoneParam);
      if (otpParam) {
        setOtp(otpParam);
        setStep('otp');
        // Automatically verify if both are provided for frictionless onboarding!
        autoVerify(phoneParam, otpParam);
      }
    }
  }, [searchParams]);

  const autoVerify = async (phone: string, code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone, otp: code, action: 'verify' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed');
      
      router.refresh();
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setIsLoading(true);
    setError(null);
    setOtpHint(null);

    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, action: 'request' }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to request code');
      }

      setStep('otp');
      if (data.mockOtpHint) {
        setOtpHint(data.mockOtpHint);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp, action: 'verify' }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid code');
      }

      // Successful login - refresh page state to load Dashboard Layout
      router.refresh();
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl relative backdrop-blur-md flex flex-col gap-6">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-indigo-600/20">
            W
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-white mt-2">Dashboard Control Panel</h1>
          <p className="text-xs text-slate-400 max-w-xs">
            Enter the phone number linked to your WhatsApp onboarding to manage your website.
          </p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs px-4 py-3 rounded-xl leading-relaxed">
            {error}
          </div>
        )}

        {otpHint && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs px-4 py-3 rounded-xl leading-relaxed flex flex-col gap-1">
            <span className="font-semibold flex items-center gap-1">
              <Sparkles size={12} className="text-amber-400 animate-pulse" />
              Local Sandbox Verification Helper:
            </span>
            <span>Your generated OTP is: <strong className="font-mono text-white tracking-wider bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/30">{otpHint}</strong>. Enter this below.</span>
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleRequestOtp} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-semibold">WhatsApp Number</label>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="+15550199 or WhatsApp number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none text-white placeholder-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !phoneNumber}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  Get OTP Code
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-semibold">6-Digit Verification Code</label>
              <div className="relative">
                <ShieldCheck size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="Enter code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none text-white tracking-widest text-center font-mono placeholder-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length < 6}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  Verify & Log In
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="text-xs text-slate-400 hover:text-slate-200 text-center font-semibold mt-2"
            >
              Change Phone Number
            </button>
          </form>
        )}

        <hr className="border-slate-800" />

        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <MessageSquare size={13} />
          <span>Need a website?</span>
          <Link href="/onboarding" className="text-indigo-400 hover:underline font-semibold">
            Onboard via WhatsApp Simulator
          </Link>
        </div>
      </div>
    </div>
  );
}
