'use client';

import { useState, useCallback, useEffect } from 'react';
import { Info, X } from 'lucide-react';

import AIAgentsNav    from './AIAgentsNav';
import GettingStarted from './GettingStarted';
import StatsComparison from './StatsComparison';
import VoiceAgent     from './VoiceAgent';

/* ─────────────────────────────────────────────
   TOAST — lightweight inline component so we
   don't need a separate AgentToast.jsx file.
───────────────────────────────────────────── */
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up pointer-events-auto">
      <div className="flex items-center gap-3 bg-[#171B3A] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-white/10 min-w-[320px] max-w-[480px]">
        <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
          <Info className="w-4 h-4 text-blue-400" />
        </div>
        <p className="text-[13px] leading-snug flex-1">{message}</p>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center flex-shrink-0 transition-colors"
        >
          <X className="w-3.5 h-3.5 text-white/60" />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TAB PLACEHOLDER — shown for tabs that don't
   have content yet (all except Getting Started).
───────────────────────────────────────────── */
const TAB_LABELS = {
  'voice-ai':        'Voice AI',
  'conversation-ai': 'Conversation AI',
  'knowledge-base':  'Knowledge Base',
  'agent-templates': 'Agent Templates',
  'content-ai':      'Content AI',
  'agent-logs':      'Agent Logs',
};

function TabPlaceholder({ tabId }) {
  const label = TAB_LABELS[tabId] || tabId;
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6 py-20">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(79,70,229,0.1) 100%)',
          border: '1px solid rgba(139,92,246,0.2)',
        }}
      >
        <svg
          className="w-7 h-7"
          style={{ color: '#7C3AED' }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.6}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      </div>
      <div className="text-center">
        <h3 className="text-[18px] font-bold text-[#26344D]">{label}</h3>
        <p className="mt-1.5 text-[13.5px] text-[#64748B] max-w-[340px] leading-relaxed">
          This section is under construction and will be available after backend integration.
        </p>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-[12px] font-medium text-amber-700">Coming soon</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOAST MESSAGES
   These are UI-only strings. Not backend data.
───────────────────────────────────────────── */
const TOAST_MSG = {
  'get-started':   'Get Started flow will be available after backend integration is connected.',
  'call-attempt':  'Voice Agent test calling will be available after backend integration.',
};

/* ─────────────────────────────────────────────
   AIAgentsPage — root page component.

   Composes:
     AIAgentsNav      ← top tab navigation
     GettingStarted   ← hero + AI orb + stats
     StatsComparison  ← "Numbers don't lie" table
     VoiceAgent       ← voice agent section + phone
───────────────────────────────────────────── */
export default function AIAgentsPage() {
  const [activeTab, setActiveTab] = useState('getting-started');
  const [toast, setToast]         = useState(null); // null | { id, message }

  const showToast = useCallback((key) => {
    setToast({ id: Date.now(), message: TOAST_MSG[key] });
  }, []);

  const hideToast = useCallback(() => setToast(null), []);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F8FAFC]">

      {/* ── Top navigation ── */}
      <AIAgentsNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ── Scrollable page content ── */}
      <div className="flex-1 overflow-y-auto light-scroll">
        {activeTab === 'getting-started' ? (
          <>
            {/* Section 1 — Hero + AI visualization */}
            <GettingStarted onGetStarted={() => showToast('get-started')} />

            {/* Section 2 — Numbers don't lie comparison table */}
            <StatsComparison />

            {/* Section 3 — Voice Agent section + phone mockup */}
            <VoiceAgent
              onGetStarted={() => showToast('get-started')}
              onCallAttempt={() => showToast('call-attempt')}
            />

            {/* Bottom breathing room */}
            <div className="h-16" />
          </>
        ) : (
          <TabPlaceholder tabId={activeTab} />
        )}
      </div>

      {/* ── Toast notification (frontend-only) ── */}
      {toast && (
        <Toast key={toast.id} message={toast.message} onClose={hideToast} />
      )}
    </div>
  );
}
