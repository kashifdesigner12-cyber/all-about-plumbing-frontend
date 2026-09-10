'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { label: 'Conversations',   href: '/dashboard/conversations' },
  { label: 'Manual Actions',  href: '/dashboard/conversations/manual-actions' },
  { label: 'Snippets',        href: '/dashboard/conversations/snippets' },
  { label: 'Trigger Links',   href: '/dashboard/conversations/trigger-links' },
  { label: 'Analytics',       href: '/dashboard/conversations/analytics' },
  { label: 'Settings',        href: '/dashboard/conversations/settings' },
];

export default function ConversationsNav() {
  const pathname = usePathname();
  
  const isActive = (href) => {
    if (href === '/dashboard/conversations') {
      return pathname === '/dashboard/conversations';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex items-center gap-0 border-b border-[#E2E8F0] bg-white shrink-0 px-4">
      {/* Title */}
      <span className="text-[14px] font-bold text-[#26344D] mr-5 shrink-0">
        Conversations
      </span>

      {/* Tab list */}
      <nav className="flex items-end overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`
                relative px-3 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-150 select-none
                ${active
                  ? 'text-[#2563EB]'
                  : 'text-[#64748B] hover:text-[#26344D]'
                }
              `}
            >
              {tab.label}
              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2563EB] rounded-t-sm" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
