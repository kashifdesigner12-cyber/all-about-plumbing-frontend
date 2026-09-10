'use client';

import CalendarsNav from '@/components/dashboard/calendars/CalendarsNav';
import { Settings } from 'lucide-react';

export default function CalendarSettingsPage() {
  return (
    <div className="flex flex-col h-full min-h-0 bg-[#F8FAFC]">
      <CalendarsNav />
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Settings className="w-6 h-6 text-[#2563EB]" strokeWidth={1.8} />
          </div>
          <p className="text-[13px] font-semibold text-[#26344D] mb-1">Calendar Settings</p>
          <p className="text-[12px] text-[#64748B]">Coming soon – backend integration required.</p>
        </div>
      </div>
    </div>
  );
}
