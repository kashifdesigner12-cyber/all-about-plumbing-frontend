'use client';

import { useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import MessageBubble from './MessageBubble';

/**
 * Scrollable messages area.
 *
 * Props:
 *   messages         - array from backend (initially [])
 *   loading          - boolean
 *   contactInitials  - string (for inbound avatar)
 */
export default function MessageList({ messages = [], loading = false, contactInitials }) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-7 h-7 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
          <p className="text-[12px] text-[#64748B]">Loading messages…</p>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-5 h-5 text-[#94A3B8]" strokeWidth={1.5} />
          </div>
          <p className="text-[13px] font-medium text-[#64748B]">No messages yet</p>
          <p className="text-[11px] text-[#94A3B8] mt-1">
            Start the conversation below.
          </p>
        </div>
      </div>
    );
  }

  // Group messages by date for date separators
  const grouped = groupMessagesByDate(messages);

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
      {grouped.map(({ date, items }) => (
        <div key={date}>
          {/* Date separator */}
          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-[#F1F5F9]" />
            <span className="text-[10px] font-medium text-[#94A3B8] whitespace-nowrap">
              {date}
            </span>
            <div className="flex-1 h-px bg-[#F1F5F9]" />
          </div>

          {/* Messages in this date group */}
          <div className="space-y-2.5">
            {items.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                contactInitials={contactInitials}
              />
            ))}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

/**
 * Groups messages by their date (e.g., "Today", "Yesterday", "Aug 10").
 */
function groupMessagesByDate(messages) {
  const groups = [];
  const seen = new Map();

  messages.forEach((msg) => {
    const label = getDateLabel(msg.timestamp);
    if (!seen.has(label)) {
      seen.set(label, []);
      groups.push({ date: label, items: seen.get(label) });
    }
    seen.get(label).push(msg);
  });

  return groups;
}

function getDateLabel(isoString) {
  if (!isoString) return 'Unknown date';
  const date = new Date(isoString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msgDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((today - msgDay) / 86400000);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: diffDays > 365 ? 'numeric' : undefined });
}
