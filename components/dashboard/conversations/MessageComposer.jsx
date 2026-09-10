'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  Smile,
  Mic,
  ChevronDown,
  MessageSquare,
  Mail,
} from 'lucide-react';

const CHANNELS = [
  { key: 'sms',   label: 'SMS',   Icon: MessageSquare },
  { key: 'email', label: 'Email', Icon: Mail },
];

/**
 * Message composer at the bottom of the conversation panel.
 *
 * Props:
 *   onSend  - (content: string, channel: string, attachments: any[]) => void
 *             This will later call the backend API.
 *   disabled - boolean (e.g. when loading)
 */
export default function MessageComposer({ onSend, disabled = false }) {
  const [content, setContent]   = useState('');
  const [channel, setChannel]   = useState('sms');
  const [chanOpen, setChanOpen] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }
  }, [content]);

  const handleSend = () => {
    if (!content.trim() || disabled) return;
    // Backend integration will be added later.
    onSend?.(content.trim(), channel, []);
    setContent('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const activeChannel = CHANNELS.find((c) => c.key === channel) || CHANNELS[0];

  return (
    <div className="px-4 py-3 bg-white border-t border-[#E2E8F0] shrink-0">
      {/* Channel selector row */}
      <div className="flex items-center gap-2 mb-2">
        <div className="relative">
          <button
            onClick={() => setChanOpen(!chanOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium rounded-md border border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
          >
            <activeChannel.Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
            {activeChannel.label}
            <ChevronDown className="w-3 h-3" strokeWidth={2} />
          </button>
          {chanOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setChanOpen(false)} />
              <div className="absolute left-0 bottom-full mb-1 w-32 bg-white rounded-lg shadow-lg border border-[#E2E8F0] z-50 py-1 overflow-hidden">
                {CHANNELS.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => { setChannel(c.key); setChanOpen(false); }}
                    className={`flex items-center gap-2 w-full text-left px-3 py-1.5 text-[12px] transition-colors ${
                      channel === c.key
                        ? 'text-[#2563EB] bg-[#EEF4FF]'
                        : 'text-[#26344D] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <c.Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                    {c.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <span className="text-[11px] text-[#94A3B8]">Press Enter to send · Shift+Enter for new line</span>
      </div>

      {/* Composer box */}
      <div className="flex items-end gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/10 transition-all">
        {/* Attachment */}
        <button
          title="Attach file"
          className="w-7 h-7 flex items-center justify-center rounded-lg text-[#64748B] hover:text-[#2563EB] hover:bg-[#EEF4FF] transition-colors shrink-0 mb-0.5"
        >
          <Paperclip className="w-4 h-4" strokeWidth={1.8} />
        </button>

        {/* Emoji */}
        <button
          title="Emoji"
          className="w-7 h-7 flex items-center justify-center rounded-lg text-[#64748B] hover:text-[#2563EB] hover:bg-[#EEF4FF] transition-colors shrink-0 mb-0.5"
        >
          <Smile className="w-4 h-4" strokeWidth={1.8} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message…"
          rows={1}
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none resize-none text-[13px] text-[#26344D] placeholder-[#94A3B8] min-h-[36px] max-h-[120px] py-1.5 leading-relaxed"
        />

        {/* Voice note */}
        <button
          title="Voice note"
          className="w-7 h-7 flex items-center justify-center rounded-lg text-[#64748B] hover:text-[#2563EB] hover:bg-[#EEF4FF] transition-colors shrink-0 mb-0.5"
        >
          <Mic className="w-4 h-4" strokeWidth={1.8} />
        </button>

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!content.trim() || disabled}
          title="Send message"
          className={`
            w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mb-0.5 transition-all duration-150
            ${content.trim() && !disabled
              ? 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-sm'
              : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
            }
          `}
        >
          <Send className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
