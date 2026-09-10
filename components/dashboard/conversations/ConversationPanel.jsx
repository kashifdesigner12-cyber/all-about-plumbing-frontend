'use client';

import ConversationHeader from './ConversationHeader';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';
import EmptyConversation from './EmptyConversation';

/**
 * Main right panel of the Conversations workspace.
 *
 * Props:
 *   conversation    - object | null  (selected conversation from backend)
 *   messages        - array          (messages from backend, initially [])
 *   loadingMessages - boolean
 *   onBack          - () => void (mobile back button)
 *   onStar          - () => void
 *   onDelete        - () => void
 *   onSendMessage   - (content, channel, attachments) => void
 */
export default function ConversationPanel({
  conversation = null,
  messages = [],
  loadingMessages = false,
  onBack,
  onStar,
  onDelete,
  onSendMessage,
}) {
  if (!conversation) {
    return (
      <div className="flex-1 bg-[#F8FAFC] flex items-center justify-center">
        <EmptyConversation />
      </div>
    );
  }

  const contactInitials = conversation.contact?.initials || '?';

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] min-w-0 overflow-hidden">
      {/* Header */}
      <ConversationHeader
        conversation={conversation}
        onBack={onBack}
        onStar={onStar}
        onDelete={onDelete}
      />

      {/* Messages */}
      <MessageList
        messages={messages}
        loading={loadingMessages}
        contactInitials={contactInitials}
      />

      {/* Composer */}
      <MessageComposer
        onSend={onSendMessage}
        disabled={loadingMessages}
      />
    </div>
  );
}
