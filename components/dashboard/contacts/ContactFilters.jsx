'use client';

import { useState } from 'react';
import { SlidersHorizontal, ArrowUpDown, Search, Settings2, Plus, ChevronDown } from 'lucide-react';

// ─── List Selector (All / Smart Lists) ────────────────────────────────────────
function ListSelector({ activeList, onListChange }) {
  return (
    <div className="flex items-center gap-1 px-4 py-2 border-b border-[#E2E8F0] bg-white shrink-0 overflow-x-auto">
      <button
        onClick={() => onListChange && onListChange('all')}
        className={`flex items-center px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors shrink-0
          ${activeList === 'all'
            ? 'bg-[#EEF4FF] text-[#2563EB]'
            : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#26344D]'
          }
        `}
      >
        All
      </button>
      <button
        onClick={() => onListChange && onListChange('add-smart-list')}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[12px] font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#26344D] transition-colors shrink-0"
      >
        <Plus className="w-3 h-3" strokeWidth={2.5} />
        Add Smart List
      </button>
    </div>
  );
}

// ─── Filter & Sort Row + Search ───────────────────────────────────────────────
function FilterSortRow({ search, onSearchChange, onFiltersOpen, onSortOpen }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="flex flex-col gap-0 bg-white border-b border-[#E2E8F0] shrink-0">
      {/* Row 1: Filters + Sort */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#E2E8F0]">
        {/* Filters */}
        <div className="relative">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#E2E8F0] bg-white text-[12px] font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#26344D] transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={2} />
            Filters
          </button>
          {filtersOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setFiltersOpen(false)} />
              <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-[#E2E8F0] z-20 p-3">
                <p className="text-[12px] font-semibold text-[#26344D] mb-2">Filter Contacts</p>
                <p className="text-[11px] text-[#64748B]">Filters will be available after backend integration.</p>
                <button
                  className="mt-3 w-full text-center text-[12px] text-[#2563EB] hover:underline"
                  onClick={() => setFiltersOpen(false)}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#E2E8F0] bg-white text-[12px] font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#26344D] transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5" strokeWidth={2} />
            Sort
          </button>
          {sortOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
              <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-[#E2E8F0] z-20 py-1">
                {['Name (A–Z)', 'Name (Z–A)', 'Date Created', 'Last Activity'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSortOpen(false)}
                    className="flex w-full items-center px-3 py-2 text-[13px] text-[#26344D] hover:bg-[#F8FAFC] transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Row 2: Search + Manage Fields */}
      <div className="flex items-center gap-2 px-4 py-2">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" strokeWidth={2} />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search Contacts"
            className="w-full pl-8 pr-3 py-1.5 rounded-md border border-[#E2E8F0] bg-white text-[12px] text-[#26344D] placeholder-[#94A3B8] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-all"
          />
        </div>

        {/* Manage fields */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#E2E8F0] bg-white text-[12px] font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#26344D] transition-colors ml-auto shrink-0">
          <Settings2 className="w-3.5 h-3.5" strokeWidth={2} />
          Manage fields
        </button>
      </div>
    </div>
  );
}

export default function ContactFilters({ search, onSearchChange, activeList, onListChange }) {
  return (
    <>
      <ListSelector activeList={activeList} onListChange={onListChange} />
      <FilterSortRow search={search} onSearchChange={onSearchChange} />
    </>
  );
}
