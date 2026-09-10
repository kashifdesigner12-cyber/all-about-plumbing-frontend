'use client';

import { useState, useCallback } from 'react';
import ConversationsNav from './ConversationsNav';
import TeamInbox from './TeamInbox';
import ConversationList from './ConversationList';
import ConversationPanel from './ConversationPanel';

/**
 * ConversationsPage — the complete Conversations workspace.
 *
 * All data props (conversations, messages, etc.) are currently empty
 * and ready to be connected to the backend.
 *
 * Data shape expected from backend:
 * ------------------------------------
 * conversations: Array<{
 *   id: string,
 *   contact: { name, initials, avatarUrl, phone, email },
 *   lastMessage: string,
 *   timestamp: string,       // ISO
 *   unreadCount: number,
 *   starred: boolean,
 *   channel: 'sms' | 'email' | 'call',
 *   status: 'open' | 'closed' | 'pending',
 * }>
 *
 * messages: Array<{
 *   id: string,
 *   direction: 'inbound' | 'outbound',
 *   content: string,
 *   timestamp: string,       // ISO
 *   status: 'sent' | 'delivered' | 'read' | 'failed' | null,
 *   channel: 'sms' | 'email' | 'call',
 *   attachments: Array<{ url, name, type }>,
 * }>
 */
export default function ConversationsPage() {
  // ── Conversations data (populated by backend later) ──
  const [conversations,   setConversations]   = useState([]);
  const [messages,        setMessages]        = useState([]);
  const [selectedId,      setSelectedId]      = useState(null);
  const [loadingConvs,    setLoadingConvs]    = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // ── UI state ──
  const [activeFilter, setActiveFilter] = useState('unread');
  const [searchQuery,  setSearchQuery]  = useState('');

  // Mobile: show panel only when conversation selected
  const [mobileView, setMobileView] = useState('list'); // 'list' | 'panel'

  // ── Derived ──
  const selectedConversation = conversations.find((c) => c.id === selectedId) ?? null;

  // ── Handlers ──
  const handleSelectConversation = useCallback((id) => {
    setSelectedId(id);
    setMobileView('panel');
    setMessages([]);  // Clear until backend loads

    // ── Backend integration point ──
    // setLoadingMessages(true);
    // conversationService.getMessages(id)
    //   .then(data => setMessages(data || []))
    //   .catch(console.error)
    //   .finally(() => setLoadingMessages(false));
  }, []);

  const handleSendMessage = useCallback((content, channel, attachments) => {
    // ── Backend integration point ──
    // conversationService.sendMessage(selectedId, { content, channel, attachments })
    //   .then(...)
    //   .catch(console.error);
    console.debug('[ConversationsPage] handleSendMessage — backend not connected yet', {
      content, channel, attachments,
    });
  }, [selectedId]);

  const handleStar = useCallback(() => {
    // ── Backend integration point ──
    // Toggle starred state on the selected conversation
    setConversations((prev) =>
      prev.map((c) => c.id === selectedId ? { ...c, starred: !c.starred } : c)
    );
  }, [selectedId]);

  const handleDelete = useCallback(() => {
    // ── Backend integration point ──
    // conversationService.deleteConversation(selectedId)
    setSelectedId(null);
    setMobileView('list');
    setMessages([]);
  }, [selectedId]);

  const handleBack = useCallback(() => {
    setMobileView('list');
    setSelectedId(null);
    setMessages([]);
  }, []);

  return (
    /*
     * Full-bleed layout: fills the entire area to the right of the global
     * sidebar, taking up all available height from the DashboardLayout main container.
     */
    <div className="flex flex-col flex-1 h-full bg-[#F8FAFC] overflow-hidden">
      {/* ── Top navigation tabs ── */}
      <ConversationsNav />

      {/* ── Workspace ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Left: Team inbox (hidden on mobile when panel shown) ── */}
        <div className={`
          flex-shrink-0
          ${mobileView === 'panel' ? 'hidden md:flex' : 'flex'}
          flex-col h-full
        `}>
          <TeamInbox
            activeFilter={activeFilter}
            onFilterChange={(f) => { setActiveFilter(f); setSelectedId(null); }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* ── Center: Conversation list (hidden on mobile when panel shown) ── */}
        <div className={`
          flex-shrink-0 h-full overflow-hidden
          ${mobileView === 'panel' ? 'hidden md:flex md:flex-col' : 'flex flex-col'}
        `}>
          <ConversationList
            conversations={conversations}
            loading={loadingConvs}
            selectedId={selectedId}
            searchQuery={searchQuery}
            activeFilter={activeFilter}
            onSelect={handleSelectConversation}
          />
        </div>

        {/* ── Right: Conversation detail panel ── */}
        <div className={`
          flex-1 h-full overflow-hidden min-w-0
          ${mobileView === 'list' ? 'hidden md:flex md:flex-col' : 'flex flex-col'}
        `}>
          <ConversationPanel
            conversation={selectedConversation}
            messages={messages}
            loadingMessages={loadingMessages}
            onBack={handleBack}
            onStar={handleStar}
            onDelete={handleDelete}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
