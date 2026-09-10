'use client';

import { ArrowRight } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

/* ─────────────────────────────────────────────
   VoiceAgent — Voice Agent marketing section
   with dot-grid background, copy column and
   the PhoneMockup on the right.
   (Renamed from VoiceAgentSection.jsx; uses
   PhoneMockup instead of VoiceAgentPhone.)
───────────────────────────────────────────── */
export default function VoiceAgent({ onGetStarted, onCallAttempt }) {
  return (
    <section
      className="relative overflow-hidden px-6 py-16 lg:px-12 lg:py-20 border-t border-[#E2E8F0]"
      style={{ background: '#FFFFFF' }}
    >
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(148,163,184,0.22) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Soft violet wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── LEFT: Copy ── */}
        <div className="flex flex-col gap-6 order-2 lg:order-1">

          {/* Section label */}
          <span
            className="self-start px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(37,99,235,0.08)',
              color: '#2563EB',
              border: '1px solid rgba(37,99,235,0.15)',
            }}
          >
            Voice Agent
          </span>

          {/* Headline */}
          <h2 className="text-[2rem] lg:text-[2.4rem] font-bold text-[#26344D] leading-[1.15] tracking-tight">
            Never miss a call,
            <br />
            <span className="text-[#94A3B8] italic font-semibold">ever again</span>
          </h2>

          {/* Body */}
          <p className="text-[14.5px] leading-relaxed text-[#64748B] max-w-[480px]">
            Never lose a reservation again. Your Voice Agent picks up every call to your
            restaurant 24x7—handling bookings, answering menu questions, confirming dietary
            accommodations, and managing waitlists in natural conversation, even during the
            dinner rush when your staff is slammed.
          </p>

          {/* Feature bullets */}
          <ul className="flex flex-col gap-2.5">
            {[
              '24/7 call answering — never goes to voicemail',
              'Natural conversation, not robotic IVR trees',
              'Handles bookings, FAQs & waitlist management',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(37,99,235,0.1)' }}
                >
                  <svg
                    className="w-3 h-3 text-[#2563EB]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-[13.5px] text-[#64748B]">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div>
            <button
              id="voice-get-started-btn"
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 60%, #2563EB 100%)',
                boxShadow: '0 4px 20px rgba(124,58,237,0.30)',
              }}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── RIGHT: Phone mockup ── */}
        <div className="flex items-center justify-center order-1 lg:order-2">
          <PhoneMockup onCallAttempt={onCallAttempt} />
        </div>
      </div>
    </section>
  );
}
