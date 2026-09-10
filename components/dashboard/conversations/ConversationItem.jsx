'use client';

import { Star, MessageSquare, Phone, Mail } from 'lucide-react';

/**
 * Renders a single conversation row in the list.
 *
 * Expected conversation shape (from backend later):
 * {
 *   id: string,
 *   contact: { name: string, avatarUrl: string | null, initials: string },
 *   lastMessage: string,
 *   timestamp: string,           // ISO string
 *   unreadCount: number,
 *   starred: boolean,
 *   channel: 'sms' | 'email' | 'call',
 *   status: 'open' | 'closed' | 'pending' | null,
 * }
 */
export default function ConversationItem({
  conversation,
  isSelected,
  isChecked,
  onToggleCheck,
  onClick,
}) {
  const {
    contact,
    lastMessage,
    timestamp,
    unreadCount,
    starred,
    channel,
  } = conversation;

  const hasUnread = unreadCount > 0;

  // Channel icon mapping
  const ChannelIcon =
    channel === 'sms' ? MessageSquare :
    channel === 'call' ? Phone :
    Mail;

  const channelColor =
    channel === 'sms'   ? 'text-[#35A66F]' :
    channel === 'call'  ? 'text-[#2563EB]' :
    'text-[#F59E0B]';

  // Format relative timestamp — backend will send real values
  const displayTime = timestamp ? formatTime(timestamp) : '';

  return (
    <div
      onClick={onClick}
      className={`
        relative flex items-start gap-2.5 px-3 py-3 cursor-pointer border-b border-[#F1F5F9]
        transition-colors duration-100 group select-none
        ${isSelected
          ? 'bg-[#EEF4FF] border-l-2 border-l-[#2563EB]'
          : 'bg-white hover:bg-[#F8FAFC] border-l-2 border-l-transparent'
        }
      `}
    >
      {/* Checkbox */}
      <div
        className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => { e.stopPropagation(); onToggleCheck?.(); }}
      >
        <input
          type="checkbox"
          checked={!!isChecked}
          onChange={() => onToggleCheck?.()}
          className="w-3.5 h-3.5 rounded border-[#CBD5E1] accent-[#2563EB] cursor-pointer"
        />
      </div>

      {/* Avatar */}
      <div className="relative shrink-0 mt-0.5">
        <div className="w-8 h-8 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[11px] font-semibold text-[#2563EB] overflow-hidden">
          {contact?.avatarUrl ? (
            <img src={contact.avatarUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <span>{contact?.initials || '?'}</span>
          )}
        </div>
        {/* Channel badge */}
        <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center ${channelColor}`}>
          <ChannelIcon className="w-2 h-2" strokeWidth={2} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className={`text-[13px] truncate pr-1 ${hasUnread ? 'font-semibold text-[#26344D]' : 'font-medium text-[#26344D]'}`}>
            {contact?.name || 'Unknown Contact'}
          </span>
          <span className={`text-[10px] shrink-0 ${hasUnread ? 'text-[#2563EB] font-semibold' : 'text-[#94A3B8]'}`}>
            {displayTime}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className={`text-[12px] truncate pr-2 ${hasUnread ? 'text-[#26344D] font-medium' : 'text-[#64748B]'}`}>
            {lastMessage || ''}
          </p>
          {hasUnread && (
            <span className="shrink-0 min-w-[18px] h-[18px] rounded-full bg-[#2563EB] text-white text-[10px] font-bold flex items-center justify-center px-1">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* Star */}
      <button
        onClick={(e) => e.stopPropagation()}
        className={`
          shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center transition-colors
          ${starred
            ? 'text-[#F59E0B]'
            : 'text-transparent group-hover:text-[#CBD5E1] hover:!text-[#F59E0B]'
          }
        `}
        title="Star conversation"
      >
        <Star className="w-3.5 h-3.5" fill={starred ? '#F59E0B' : 'none'} strokeWidth={1.8} />
      </button>
    </div>
  );
}

/**
 * Format ISO timestamp to a short relative string.
 * The backend will provide real timestamps; this helper formats them.
 */
function formatTime(isoString) {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}
