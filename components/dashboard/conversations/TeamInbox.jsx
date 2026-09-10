'use client';

import { useState } from 'react';
import {
  Inbox,
  MailOpen,
  Clock,
  Star,
  Filter,
  ArrowUpDown,
  Search,
  CheckSquare,
} from 'lucide-react';

const FILTERS = [
  { key: 'unread',  label: 'Unread',  Icon: MailOpen },
  { key: 'all',     label: 'All',     Icon: Inbox },
  { key: 'recent',  label: 'Recent',  Icon: Clock },
  { key: 'starred', label: 'Starred', Icon: Star },
];

export default function TeamInbox({ activeFilter, onFilterChange, searchQuery, onSearchChange }) {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="w-[190px] shrink-0 border-r border-[#E2E8F0] bg-white flex flex-col h-full">
      {/* Header */}
      <div className="px-3 pt-3 pb-2 border-b border-[#E2E8F0] shrink-0">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[12px] font-semibold text-[#26344D] uppercase tracking-wide">
            Team Inbox
          </span>
          <div className="flex items-center gap-1">
            <button
              title="Filter"
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#26344D] transition-colors"
            >
              <Filter className="w-3.5 h-3.5" strokeWidth={1.8} />
            </button>
            <button
              title="Sort"
              onClick={() => setSortOpen(!sortOpen)}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#26344D] transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-[#94A3B8]" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-7 pr-2 py-1.5 text-[12px] rounded-md border border-[#E2E8F0] bg-[#F8FAFC] text-[#26344D] placeholder-[#94A3B8] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-all"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-col px-1.5 pt-2 shrink-0">
        {FILTERS.map(({ key, label, Icon }) => {
          const active = activeFilter === key;
          return (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`
                flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[12.5px] font-medium transition-colors w-full text-left mb-0.5
                ${active
                  ? 'bg-[#EEF4FF] text-[#2563EB]'
                  : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#26344D]'
                }
              `}
            >
              <Icon
                className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#2563EB]' : 'text-[#94A3B8]'}`}
                strokeWidth={1.8}
              />
              {label}
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="mx-3 my-2 border-t border-[#F1F5F9]" />

      {/* Select All row */}
      <div className="px-3 pb-2 shrink-0">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB] cursor-pointer"
          />
          <span className="text-[12px] text-[#64748B] group-hover:text-[#26344D] transition-colors select-none">
            Select all
          </span>
        </label>
      </div>

      {/* Spacer */}
      <div className="flex-1" />
    </div>
  );
}
