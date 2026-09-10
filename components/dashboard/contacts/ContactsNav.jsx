'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const NAV_TABS = [
  { label: 'Contacts', tab: 'contacts' },
  { label: 'Smart Lists', tab: 'smart-lists' },
  { label: 'Bulk Actions', tab: 'bulk-actions' },
  { label: 'Custom Fields', tab: 'custom-fields' },
  { label: 'Tasks', tab: 'tasks' },
  { label: 'Companies', tab: 'companies' },
];

export default function ContactsNav({ activeTab = 'contacts', onTabChange }) {
  return (
    <div
      className="flex items-center border-b border-[#E2E8F0] bg-white shrink-0 px-4 overflow-x-auto"
      style={{ minHeight: 40 }}
    >
      {NAV_TABS.map((item) => {
        const isActive = activeTab === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => onTabChange && onTabChange(item.tab)}
            className={`
              relative flex items-center px-3 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-150 shrink-0
              ${isActive
                ? 'text-[#2563EB] border-b-2 border-[#2563EB] -mb-px'
                : 'text-[#64748B] hover:text-[#26344D] border-b-2 border-transparent -mb-px'
              }
            `}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
