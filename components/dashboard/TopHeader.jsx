'use client';

import { useState } from 'react';
import { Phone, Bell, Menu } from 'lucide-react';

export default function TopHeader({ onMenuToggle }) {
  const [callActive, setCallActive] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  return (
    <header
      className="h-[38px] bg-white border-b border-[#E2E8F0] flex items-center justify-end px-4 shrink-0 z-30"
      style={{ boxShadow: '0 1px 3px 0 rgba(0,0,0,0.06)' }}
    >
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuToggle}
        className="mr-auto md:hidden p-1 text-[#64748B] hover:text-[#26344D] rounded"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2">
        {/* Phone / Call button */}
        <button
          onClick={() => setCallActive(!callActive)}
          title="Calls"
          className={`
            w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150
            ${callActive
              ? 'bg-[#35A66F] text-white ring-2 ring-[#35A66F]/30'
              : 'bg-[#35A66F] text-white hover:bg-[#2d8f60]'
            }
          `}
        >
          <Phone className="w-3.5 h-3.5" strokeWidth={2} />
        </button>

        {/* Notification / Bell button */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            title="Notifications"
            className="w-7 h-7 rounded-full bg-orange-400 hover:bg-orange-500 text-white flex items-center justify-center transition-colors duration-150"
          >
            <Bell className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
          {notifOpen && (
            <>
              {/* Click-away overlay */}
              <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-[#E2E8F0] z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-[#E2E8F0]">
                  <p className="text-[13px] font-semibold text-[#26344D]">Notifications</p>
                </div>
                <div className="px-4 py-8 text-center">
                  <p className="text-[12px] text-[#64748B]">No new notifications</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Avatar */}
        <div className="relative">
          <button
            onClick={() => setAvatarOpen(!avatarOpen)}
            title="Account"
            className="w-7 h-7 rounded-full bg-[#2563EB] text-white text-[11px] font-bold flex items-center justify-center hover:bg-[#1D4ED8] transition-colors duration-150 ring-2 ring-white"
          >
            RR
          </button>
          {avatarOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setAvatarOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E2E8F0] z-50 py-1 overflow-hidden">
                <a
                  href="/dashboard/settings?tab=profile"
                  className="block px-4 py-2 text-[13px] text-[#26344D] hover:bg-[#F8FAFC] transition-colors"
                >
                  Profile Settings
                </a>
                <a
                  href="/dashboard/settings?tab=business"
                  className="block px-4 py-2 text-[13px] text-[#26344D] hover:bg-[#F8FAFC] transition-colors"
                >
                  Business Settings
                </a>
                <div className="border-t border-[#E2E8F0] my-1" />
                <button className="block w-full text-left px-4 py-2 text-[13px] text-red-500 hover:bg-red-50 transition-colors">
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
