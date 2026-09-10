'use client';

const NAV_TABS = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'voice-ai', label: 'Voice AI' },
  { id: 'conversation-ai', label: 'Conversation AI' },
  { id: 'knowledge-base', label: 'Knowledge Base' },
  { id: 'agent-templates', label: 'Agent Templates' },
  { id: 'content-ai', label: 'Content AI' },
  { id: 'agent-logs', label: 'Agent Logs' },
];

export default function AIAgentsNav({ activeTab, onTabChange }) {
  return (
    <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-20">
      <div className="flex items-center px-6 overflow-x-auto light-scroll">
        {/* Left label */}
        <div className="flex items-center gap-2 mr-6 shrink-0 py-3 border-r border-[#E2E8F0] pr-6">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <span className="text-[13px] font-bold text-[#26344D] whitespace-nowrap">AI Agents</span>
        </div>

        {/* Tabs */}
        <nav className="flex items-center gap-0.5 overflow-x-auto light-scroll">
          {NAV_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  relative px-3.5 py-3 text-[13px] font-medium whitespace-nowrap transition-colors duration-150
                  ${isActive
                    ? 'text-[#2563EB]'
                    : 'text-[#64748B] hover:text-[#26344D]'
                  }
                `}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-t-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
