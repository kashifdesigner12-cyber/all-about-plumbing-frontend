'use client';

import { ArrowRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   Static marketing stats (not backend data)
───────────────────────────────────────────── */
const STATS = [
  { value: '14.7M+', label: 'Calls handled' },
  { value: '860K+',  label: 'Booked' },
  { value: '18.7M+', label: 'Messages' },
];

/* ─────────────────────────────────────────────
   GettingStarted — Hero section
   Combines the copy column and the AI orb
   visualization (formerly AIAgentsHero +
   AIVisualization).
───────────────────────────────────────────── */
export default function GettingStarted({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-12 lg:px-12 lg:py-16">
      {/* Ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* ── LEFT: Marketing copy ── */}
        <div className="flex flex-col gap-6">
          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 self-start">
            <span
              className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(79,70,229,0.12) 100%)',
                color: '#7C3AED',
                border: '1px solid rgba(139,92,246,0.2)',
              }}
            >
              AI-Powered Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[2.1rem] lg:text-[2.6rem] font-bold leading-[1.15] tracking-tight text-[#26344D]">
            Your Business is{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Losing
            </span>
            <br />
            Customers Every Day
          </h1>

          {/* Body copy */}
          <p className="text-[14.5px] leading-relaxed text-[#64748B] max-w-[480px]">
            Right now you're missing 62% of your after-hours calls and ignoring 78% of your
            chat messages. Our AI Agents plug the leaks in your business, responding to every
            lead instantly and recouping up to $200k in 'no-show' revenue, completely on autopilot.
          </p>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              id="hero-get-started-btn"
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 60%, #2563EB 100%)',
                boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
              }}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── RIGHT: AI visualization + stat chips ── */}
        <div className="flex flex-col items-center gap-6">
          <AIOrb />

          {/* Stat chips */}
          <div className="flex items-stretch gap-3 w-full max-w-[420px]">
            {STATS.map((stat) => (
              <div
                key={stat.value}
                className="flex-1 flex flex-col items-center justify-center rounded-xl px-3 py-4 border border-[#E2E8F0] bg-white text-center"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
              >
                <span
                  className="text-[1.25rem] font-bold leading-tight"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </span>
                <span className="text-[11.5px] text-[#64748B] mt-0.5 leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   AIOrb — animated visualization
   (formerly AIVisualization.jsx, inlined here)
───────────────────────────────────────────── */
function AIOrb() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square flex items-center justify-center select-none">
      {/* Outer radial glow */}
      <div
        className="absolute inset-0 rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(99,102,241,0.15) 50%, transparent 75%)',
        }}
      />

      {/* Radar rings */}
      {[85, 68, 52].map((pct, i) => (
        <div
          key={pct}
          className="absolute rounded-full border border-violet-200/40"
          style={{
            width: `${pct}%`,
            height: `${pct}%`,
            animation: `pulse-ring ${2.5 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      {/* Dashed orbit ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: '72%',
          height: '72%',
          border: '1.5px dashed rgba(139,92,246,0.25)',
          animation: 'slow-spin 18s linear infinite',
        }}
      />

      {/* Central glowing orb */}
      <div className="relative z-10 flex items-center justify-center">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #2563EB 100%)',
            boxShadow:
              '0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(79,70,229,0.3), inset 0 0 20px rgba(255,255,255,0.1)',
            animation: 'core-pulse 3s ease-in-out infinite',
          }}
        >
          <svg
            className="w-10 h-10 text-white/90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
          </svg>
        </div>
      </div>

      {/* Floating feature icons */}
      <OrbIcon style={{ top: '14%', right: '16%' }} delay="0s" bg="from-blue-500 to-blue-600">
        {/* Phone */}
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      </OrbIcon>

      <OrbIcon style={{ bottom: '20%', left: '12%' }} delay="0.6s" bg="from-violet-500 to-purple-600">
        {/* Chat */}
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      </OrbIcon>

      <OrbIcon style={{ top: '22%', left: '14%' }} delay="1.2s" bg="from-amber-400 to-orange-500">
        {/* Star */}
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </OrbIcon>

      <OrbIcon style={{ bottom: '16%', right: '14%' }} delay="1.8s" bg="from-emerald-500 to-teal-500">
        {/* Calendar */}
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      </OrbIcon>

      {/* Floating notification badges */}
      <OrbBadge
        style={{ top: '6%', left: '50%' }}
        delay="0s"
        dot="bg-emerald-500"
        text="Review replied"
        sub="Just now · 5★"
      />
      <OrbBadge
        style={{ bottom: '8%', left: '50%' }}
        delay="0.9s"
        dot="bg-blue-500"
        text="Booking confirmed"
        sub="Just now · 2:30 PM"
      />

      {/* Dashed connector lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.18 }}>
        <line x1="50%" y1="50%" x2="78%" y2="22%" stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="50%" y1="50%" x2="22%" y2="72%" stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="50%" y1="50%" x2="24%" y2="28%" stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="50%" y1="50%" x2="78%" y2="76%" stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 3" />
      </svg>
    </div>
  );
}

/* ── Floating icon helper ── */
function OrbIcon({ style, delay, bg, children }) {
  return (
    <div
      className="absolute z-20"
      style={{ ...style, animation: 'float-icon 3.5s ease-in-out infinite', animationDelay: delay }}
    >
      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center shadow-lg`}>
        {children}
      </div>
    </div>
  );
}

/* ── Floating notification badge helper ── */
function OrbBadge({ style, delay, dot, text, sub }) {
  return (
    <div
      className="absolute z-20 flex items-center gap-2.5 bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 shadow-md min-w-[160px] -translate-x-1/2"
      style={{
        ...style,
        animationName: 'float-plain',
        animationDuration: '4s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDelay: delay,
      }}
    >
      <div className={`w-2 h-2 rounded-full ${dot} flex-shrink-0 animate-pulse`} />
      <div>
        <p className="text-[12px] font-semibold text-[#26344D] leading-tight">{text}</p>
        <p className="text-[11px] text-[#64748B] leading-tight">{sub}</p>
      </div>
    </div>
  );
}
