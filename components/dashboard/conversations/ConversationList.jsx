'use client';

import { useState } from 'react';
import { Inbox } from 'lucide-react';
import ConversationItem from './ConversationItem';

/**
 * Scrollable conversation list.
 *
 * Props:
 *   conversations   - array from backend (initially [])
 *   loading         - boolean
 *   selectedId      - string | null
 *   searchQuery     - string
 *   activeFilter    - 'unread' | 'all' | 'recent' | 'starred'
 *   onSelect        - (id: string) => void
 */
export default function ConversationList({
  conversations = [],
  loading = false,
  selectedId = null,
  searchQuery = '',
  activeFilter = 'unread',
  onSelect,
}) {
  const [checkedIds, setCheckedIds] = useState(new Set());

  const toggleCheck = (id) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Client-side filter by search query & active tab
  const filtered = conversations.filter((c) => {
    const nameMatch = searchQuery
      ? c.contact?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const filterMatch =
      activeFilter === 'all'     ? true :
      activeFilter === 'unread'  ? c.unreadCount > 0 :
      activeFilter === 'starred' ? c.starred :
      activeFilter === 'recent'  ? true :   // backend sort handles recency
      true;

    return nameMatch && filterMatch;
  });

  return (
    <div className="w-[280px] shrink-0 border-r border-[#E2E8F0] flex flex-col h-full bg-white">
      {/* List header */}
      <div className="px-3 py-2 border-b border-[#F1F5F9] shrink-0 flex items-center justify-between">
        <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wide">
          {loading ? 'Loading…' : `${filtered.length === 0 ? 'No' : filtered.length} conversation${filtered.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
        {loading ? (
          <LoadingSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyInbox searchQuery={searchQuery} activeFilter={activeFilter} />
        ) : (
          filtered.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isSelected={selectedId === conv.id}
              isChecked={checkedIds.has(conv.id)}
              onToggleCheck={() => toggleCheck(conv.id)}
              onClick={() => onSelect?.(conv.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ── Skeleton loader ──────────────────────────────────────────── */
function LoadingSkeleton() {
  return (
    <div className="p-3 space-y-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex items-start gap-2.5 animate-pulse">
          <div className="w-8 h-8 rounded-full bg-[#F1F5F9] shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 bg-[#F1F5F9] rounded w-1/2" />
            <div className="h-2.5 bg-[#F1F5F9] rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Empty state ─────────────────────────────────────────────── */
function EmptyInbox({ searchQuery, activeFilter }) {
  const message =
    searchQuery
      ? `No results for "${searchQuery}"`
      : activeFilter === 'unread'
        ? 'No unread conversations'
        : activeFilter === 'starred'
          ? 'No starred conversations'
          : 'No conversations found';

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center mb-3">
        <Inbox className="w-5 h-5 text-[#94A3B8]" strokeWidth={1.5} />
      </div>
      <p className="text-[13px] font-medium text-[#64748B]">{message}</p>
      <p className="text-[11px] text-[#94A3B8] mt-1">
        Conversations will appear here once connected.
      </p>
    </div>
  );
}
