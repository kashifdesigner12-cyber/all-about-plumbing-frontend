'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings } from 'lucide-react';

const TABS = [
  { label: 'Calendar view', href: '/dashboard/calendars' },
  { label: 'Appointment list view', href: '/dashboard/calendars/appointments' },
  { label: 'Calendar settings', href: '/dashboard/calendars/settings', icon: Settings },
];

export default function CalendarsNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between px-4 border-b border-[#E2E8F0] bg-white shrink-0">
      <div className="flex items-center">
        {/* Page title */}
        <span className="text-[14px] font-semibold text-[#26344D] mr-6 py-3">Calendars</span>

        {/* Nav tabs */}
        <nav className="flex items-center">
          {TABS.map((tab) => {
            const isActive =
              tab.href === '/dashboard/calendars'
                ? pathname === '/dashboard/calendars'
                : pathname.startsWith(tab.href);
            const IconComponent = tab.icon;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`
                  flex items-center gap-1.5 px-3 py-3 text-[13px] font-medium border-b-2 transition-colors duration-150
                  ${isActive
                    ? 'text-[#2563EB] border-[#2563EB]'
                    : 'text-[#64748B] border-transparent hover:text-[#26344D] hover:border-[#E2E8F0]'
                  }
                `}
              >
                {IconComponent && <IconComponent className="w-3.5 h-3.5" strokeWidth={1.8} />}
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
