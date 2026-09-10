import ConversationsPage from '@/components/dashboard/conversations/ConversationsPage';

export const metadata = {
  title: 'Conversations | Stone Systems CRM',
  description: 'Manage all your SMS, email, and call conversations in one inbox.',
};

export default function ConversationsRoute() {
  return <ConversationsPage />;
}
