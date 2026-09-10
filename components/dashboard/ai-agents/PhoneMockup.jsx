'use client';

import { useState } from 'react';
import { Mic, Phone, X, Signal } from 'lucide-react';

/* ─────────────────────────────────────────────
   PhoneMockup — dark smartphone UI with an
   animated voice orb and a frontend-only
   test-call interaction.
   (Renamed from VoiceAgentPhone.jsx)
───────────────────────────────────────────── */
export default function PhoneMockup({ onCallAttempt }) {
  const [callState, setCallState] = useState('idle'); // 'idle' | 'loading' | 'blocked'

  const handleStartCall = () => {
    setCallState('loading');
    setTimeout(() => {
      setCallState('blocked');
      if (onCallAttempt) onCallAttempt();
    }, 1200);
  };

  const handleReset = () => setCallState('idle');

  return (
    <div className="relative flex items-center justify-center">

      {/* ── Phone frame ── */}
      <div
        className="relative w-[280px] rounded-[2.8rem] overflow-hidden flex flex-col"
        style={{
          background: 'linear-gradient(170deg, #18192b 0%, #0f1022 100%)',
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.10), 0 30px 80px rgba(0,0,0,0.50), 0 0 60px rgba(124,58,237,0.15)',
          height: '580px',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2 shrink-0">
          <span className="text-[11px] text-white/50 font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <Signal className="w-3 h-3 text-white/50" />
            <div className="flex items-end gap-0.5">
              {[3, 4, 5, 6].map((h, i) => (
                <div key={i} className="w-1 rounded-sm bg-white/50" style={{ height: h }} />
              ))}
            </div>
            <div className="w-4 h-2 border border-white/40 rounded-sm ml-1 relative overflow-hidden">
              <div className="absolute left-0.5 inset-y-0.5 w-[70%] bg-white/40 rounded-sm" />
            </div>
          </div>
        </div>

        {/* Agent contact area */}
        <div className="flex flex-col items-center pt-3 pb-4 px-5 shrink-0">
          {/* Avatar */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
              boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
            }}
          >
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>

          <h3 className="text-[16px] font-bold text-white tracking-tight">Lumen Studio</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[12px] text-white/50">Ready to test</span>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 border-t border-white/10" />

        {/* Voice orb area */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-5">
          <div className="relative flex items-center justify-center">

            {/* Loading ping rings */}
            {callState === 'loading' && (
              <>
                <div
                  className="absolute w-28 h-28 rounded-full border border-violet-500/30 animate-ping"
                  style={{ animationDuration: '1.5s' }}
                />
                <div
                  className="absolute w-20 h-20 rounded-full border border-violet-400/20 animate-ping"
                  style={{ animationDuration: '1.5s', animationDelay: '0.3s' }}
                />
              </>
            )}

            {/* Idle pulse rings */}
            {callState === 'idle' && (
              <>
                <div
                  className="absolute w-28 h-28 rounded-full border border-violet-500/15"
                  style={{ animation: 'pulse-ring 2.5s ease-in-out infinite' }}
                />
                <div
                  className="absolute w-20 h-20 rounded-full border border-violet-400/20"
                  style={{ animation: 'pulse-ring 2.5s ease-in-out infinite', animationDelay: '0.5s' }}
                />
              </>
            )}

            {/* Core orb */}
            <div
              className="w-[68px] h-[68px] rounded-full flex items-center justify-center relative z-10 transition-all duration-500"
              style={{
                background:
                  callState === 'blocked'
                    ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                    : callState === 'loading'
                    ? 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)'
                    : 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 60%, #2563EB 100%)',
                boxShadow:
                  callState === 'blocked'
                    ? '0 0 30px rgba(239,68,68,0.4)'
                    : '0 0 30px rgba(124,58,237,0.5)',
              }}
            >
              {callState === 'blocked' ? (
                <X className="w-7 h-7 text-white" />
              ) : (
                <Mic className="w-7 h-7 text-white" />
              )}
            </div>
          </div>

          {/* State messages */}
          {callState === 'idle' && (
            <p className="text-[12px] text-white/40 text-center leading-relaxed max-w-[200px]">
              Tap the orb or the button below to place a live test call to your Voice Agent.
            </p>
          )}
          {callState === 'loading' && (
            <p className="text-[12px] text-violet-300 text-center animate-pulse">
              Connecting to Voice Agent…
            </p>
          )}
          {callState === 'blocked' && (
            <div className="text-center">
              <p className="text-[12px] text-white/70 leading-relaxed max-w-[200px]">
                Voice Agent test calling will be available after backend integration.
              </p>
              <button
                onClick={handleReset}
                className="mt-2 text-[11px] text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>

        {/* Call button */}
        <div className="px-5 pb-8 shrink-0">
          <button
            id="voice-start-call-btn"
            onClick={callState === 'blocked' ? handleReset : handleStartCall}
            disabled={callState === 'loading'}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[14px] font-semibold transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              background:
                callState === 'blocked'
                  ? 'linear-gradient(135deg, #374151 0%, #1F2937 100%)'
                  : 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
              color: 'white',
              boxShadow: callState === 'blocked' ? 'none' : '0 4px 15px rgba(37,99,235,0.35)',
            }}
          >
            <Phone className="w-4 h-4" />
            {callState === 'idle'    && 'Start test call'}
            {callState === 'loading' && 'Connecting…'}
            {callState === 'blocked' && 'Try again'}
          </button>
        </div>
      </div>

      {/* Glow under phone */}
      <div
        className="absolute -bottom-4 w-48 h-6 rounded-full pointer-events-none"
        style={{ background: 'rgba(124,58,237,0.2)', filter: 'blur(16px)' }}
      />
    </div>
  );
}
