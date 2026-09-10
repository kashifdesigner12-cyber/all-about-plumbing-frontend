'use client';

import { MessageSquare } from 'lucide-react';

/**
 * Shown in the main panel when no conversation is selected.
 */
export default function EmptyConversation() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="w-14 h-14 rounded-full bg-[#EEF4FF] flex items-center justify-center mb-4">
        <MessageSquare className="w-7 h-7 text-[#2563EB]" strokeWidth={1.5} />
      </div>
      <h3 className="text-[14px] font-semibold text-[#26344D] mb-1">
        No conversation selected
      </h3>
      <p className="text-[12px] text-[#64748B] max-w-[220px] leading-relaxed">
        Select a conversation from the inbox to view messages and reply.
      </p>
    </div>
  );
}
