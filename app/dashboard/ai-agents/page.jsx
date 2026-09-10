'use client';

/**
 * /dashboard/ai-agents/page.jsx
 *
 * Next.js route entry point for the AI Agents page.
 *
 * FRONTEND ONLY — No backend, no API calls, no dummy data.
 *
 * Backend integration points (for future):
 *   - Wire real AI agent config / status APIs
 *   - Connect Voice Agent test-call via Twilio / backend
 *   - Populate Knowledge Base, Agent Logs, Conversation AI tabs
 */

import AIAgentsPage from '@/components/dashboard/ai-agents/AIAgentsPage';

export default function AIAgentsRoute() {
  return <AIAgentsPage />;
}
