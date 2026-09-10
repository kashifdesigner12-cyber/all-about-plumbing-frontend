'use client';

import {
  ArrowLeft,
  Bell,
  ChevronDown,
  Star,
  Mail,
  Trash2,
  MoreHorizontal,
  Phone,
} from 'lucide-react';
import { useState } from 'react';

/**
 * Top header bar for the active conversation panel.
 *
 * Props:
 *   conversation  - full conversation object from backend
 *   onBack        - () => void  (mobile back)
 *   onStar        - () => void
 *   onDelete      - () => void
 */
export default function ConversationHeader({ conversation, onBack, onStar, onDelete }) {
  const [actionsOpen, setActionsOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const contact = conversation?.contact;
  const starred = conversation?.starred;

  return (
    <div className="h-[50px] px-4 bg-white border-b border-[#E2E8F0] flex items-center justify-between shrink-0 z-10">
      {/* Left: back (mobile) + contact info */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Mobile back button */}
        <button
          onClick={onBack}
          className="md:hidden w-7 h-7 flex items-center justify-center text-[#64748B] hover:text-[#26344D] rounded hover:bg-[#F1F5F9] transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[11px] font-semibold text-[#2563EB] shrink-0 overflow-hidden">
          {contact?.avatarUrl ? (
            <img src={contact.avatarUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <span>{contact?.initials || '?'}</span>
          )}
        </div>

        {/* Name + sub-info */}
        <div className="min-w-0">
          <h3 className="text-[13px] font-semibold text-[#26344D] leading-tight truncate">
            {contact?.name || 'Unknown Contact'}
          </h3>
          {(contact?.phone || contact?.email) && (
            <p className="text-[11px] text-[#64748B] leading-tight truncate">
              {contact?.phone || contact?.email}
            </p>
          )}
        </div>

        {/* Status dropdown */}
        <div className="relative ml-2 shrink-0">
          <button
            onClick={() => setStatusOpen(!statusOpen)}
            className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded border border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
          >
            <span>{conversation?.status || 'Open'}</span>
            <ChevronDown className="w-3 h-3" strokeWidth={2} />
          </button>
          {statusOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setStatusOpen(false)} />
              <div className="absolute left-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-[#E2E8F0] z-50 py-1 overflow-hidden">
                {['Open', 'Pending', 'Closed'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusOpen(false)}
                    className="block w-full text-left px-3 py-1.5 text-[12px] text-[#26344D] hover:bg-[#F8FAFC] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right: action buttons */}
      <div className="flex items-center gap-1 shrink-0 ml-2">
        {/* Notification / bell */}
        <button
          title="Notifications"
          className="w-7 h-7 flex items-center justify-center rounded text-[#64748B] hover:text-[#26344D] hover:bg-[#F1F5F9] transition-colors"
        >
          <Bell className="w-4 h-4" strokeWidth={1.8} />
        </button>

        {/* More dropdown */}
        <div className="relative">
          <button
            onClick={() => setActionsOpen(!actionsOpen)}
            title="More actions"
            className="w-7 h-7 flex items-center justify-center rounded text-[#64748B] hover:text-[#26344D] hover:bg-[#F1F5F9] transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" strokeWidth={1.8} />
          </button>
          {actionsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setActionsOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-lg shadow-lg border border-[#E2E8F0] z-50 py-1 overflow-hidden">
                <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-[12px] text-[#26344D] hover:bg-[#F8FAFC] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#64748B]" />
                  Call contact
                </button>
                <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-[12px] text-[#26344D] hover:bg-[#F8FAFC] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#64748B]" />
                  Send email
                </button>
                <div className="border-t border-[#F1F5F9] my-1" />
                <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-[12px] text-[#26344D] hover:bg-[#F8FAFC] transition-colors">
                  View contact profile
                </button>
                <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-[12px] text-[#26344D] hover:bg-[#F8FAFC] transition-colors">
                  Assign conversation
                </button>
                <div className="border-t border-[#F1F5F9] my-1" />
                <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-[12px] text-red-500 hover:bg-red-50 transition-colors">
                  Archive conversation
                </button>
              </div>
            </>
          )}
        </div>

        {/* Star */}
        <button
          onClick={onStar}
          title={starred ? 'Unstar' : 'Star'}
          className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${
            starred ? 'text-[#F59E0B]' : 'text-[#64748B] hover:text-[#F59E0B] hover:bg-[#F1F5F9]'
          }`}
        >
          <Star
            className="w-4 h-4"
            fill={starred ? '#F59E0B' : 'none'}
            strokeWidth={1.8}
          />
        </button>

        {/* Email icon */}
        <button
          title="Send email"
          className="w-7 h-7 flex items-center justify-center rounded text-[#64748B] hover:text-[#2563EB] hover:bg-[#F1F5F9] transition-colors"
        >
          <Mail className="w-4 h-4" strokeWidth={1.8} />
        </button>

        {/* Delete */}
        <button
          onClick={onDelete}
          title="Delete conversation"
          className="w-7 h-7 flex items-center justify-center rounded text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
