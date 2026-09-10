'use client';

import { Check, CheckCheck, Paperclip } from 'lucide-react';

/**
 * Individual message bubble.
 *
 * Expected message shape (from backend):
 * {
 *   id: string,
 *   direction: 'inbound' | 'outbound',
 *   content: string,
 *   timestamp: string,   // ISO
 *   status: 'sent' | 'delivered' | 'read' | 'failed' | null,
 *   channel: 'sms' | 'email' | 'call',
 *   attachments: Array<{ url: string, name: string, type: string }>,
 * }
 */
export default function MessageBubble({ message, contactInitials }) {
  const isOutbound = message.direction === 'outbound';

  const displayTime = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    : '';

  return (
    <div className={`flex items-end gap-2 ${isOutbound ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar (inbound only) */}
      {!isOutbound && (
        <div className="w-7 h-7 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[10px] font-semibold text-[#2563EB] shrink-0 mb-1">
          {contactInitials || '?'}
        </div>
      )}

      <div className={`flex flex-col max-w-[65%] ${isOutbound ? 'items-end' : 'items-start'}`}>
        {/* Bubble */}
        <div
          className={`
            px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed break-words
            ${isOutbound
              ? 'bg-[#2563EB] text-white rounded-br-sm'
              : 'bg-[#F1F5F9] text-[#26344D] rounded-bl-sm'
            }
          `}
        >
          {message.content}

          {/* Attachments */}
          {message.attachments?.length > 0 && (
            <div className="mt-2 space-y-1">
              {message.attachments.map((att, i) => (
                <a
                  key={i}
                  href={att.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 text-[12px] underline ${
                    isOutbound ? 'text-blue-200' : 'text-[#2563EB]'
                  }`}
                >
                  <Paperclip className="w-3 h-3 shrink-0" />
                  {att.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Timestamp + status */}
        <div className={`flex items-center gap-1 mt-1 ${isOutbound ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-[10px] text-[#94A3B8]">{displayTime}</span>
          {isOutbound && message.status && (
            <span className="text-[#94A3B8]">
              {message.status === 'read' ? (
                <CheckCheck className="w-3 h-3 text-[#2563EB]" />
              ) : message.status === 'delivered' ? (
                <CheckCheck className="w-3 h-3" />
              ) : message.status === 'failed' ? (
                <span className="text-[10px] text-red-500">Failed</span>
              ) : (
                <Check className="w-3 h-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
