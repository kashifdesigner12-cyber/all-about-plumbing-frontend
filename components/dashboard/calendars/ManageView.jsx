'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, X, Info } from 'lucide-react';

/** ViewTypeFilter – radio group for All / Appointments / Blocked slots */
function ViewTypeFilter({ viewType, onViewTypeChange }) {
  const OPTIONS = ['All', 'Appointments', 'Blocked slots'];

  return (
    <div className="px-4 py-3 border-b border-[#E2E8F0]">
      <p className="text-[11px] font-semibold text-[#26344D] uppercase tracking-wide mb-2">
        View by type
      </p>
      <div className="flex flex-col gap-1.5">
        {OPTIONS.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div
              className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                viewType === opt
                  ? 'border-[#2563EB] bg-[#2563EB]'
                  : 'border-[#CBD5E1] group-hover:border-[#2563EB]/60'
              }`}
              onClick={() => onViewTypeChange(opt)}
            >
              {viewType === opt && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>
            <span
              className="text-[12px] text-[#26344D] select-none"
              onClick={() => onViewTypeChange(opt)}
            >
              {opt}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

/** ToggleSwitch */
function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-8 h-4 rounded-full transition-colors duration-200 flex-shrink-0 ${
        checked ? 'bg-[#2563EB]' : 'bg-[#CBD5E1]'
      }`}
    >
      <span
        className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

/** Collapsible section with count badge */
function CollapsibleSection({ title, count, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#E2E8F0]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#F8FAFC] transition-colors"
      >
        <div className="flex items-center gap-1.5">
          <span className="text-[12px] font-semibold text-[#26344D]">{title}</span>
          {count !== undefined && (
            <span className="text-[10px] text-[#64748B] bg-[#F1F5F9] px-1.5 py-0.5 rounded-full font-medium">
              {count}
            </span>
          )}
        </div>
        {open
          ? <ChevronUp className="w-3.5 h-3.5 text-[#64748B]" strokeWidth={2} />
          : <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" strokeWidth={2} />
        }
      </button>
      {open && (
        <div className="pb-2">
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * ManageView panel
 *
 * Props:
 *   isOpen        - boolean controlling visibility
 *   onClose       - callback to close
 *   users         - array from backend (empty by default)
 *   calendars     - array from backend (empty by default)
 */
export default function ManageView({
  isOpen,
  onClose,
  users = [],
  calendars = [],
}) {
  const [viewType, setViewType] = useState('All');
  const [showBuffer, setShowBuffer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Filter helpers (frontend-only for now)
  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredCalendars = calendars.filter((c) =>
    c.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-[240px] shrink-0 flex flex-col h-full bg-white border-l border-[#E2E8F0] overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0] shrink-0">
        <span className="text-[13px] font-semibold text-[#26344D]">Manage view</span>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded-md text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#26344D] transition-colors"
        >
          <X className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>

      {/* Panel body – scrollable */}
      <div className="flex-1 overflow-y-auto light-scroll">
        {/* View by type */}
        <ViewTypeFilter viewType={viewType} onViewTypeChange={setViewType} />

        {/* Show buffer time */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0]">
          <span className="text-[12px] font-medium text-[#26344D]">Show buffer time</span>
          <div className="flex items-center gap-2">
            <ToggleSwitch checked={showBuffer} onChange={setShowBuffer} />
            <button className="text-[#94A3B8] hover:text-[#64748B] transition-colors">
              <Info className="w-3.5 h-3.5" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Filters header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E2E8F0]">
          <span className="text-[11px] font-semibold text-[#26344D] uppercase tracking-wide">
            Filters
          </span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-[11px] text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors"
          >
            Clear all
          </button>
        </div>

        {/* Search */}
        <div className="px-3 py-2 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-2.5 py-1.5 focus-within:border-[#2563EB]/40 transition-colors">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] flex-shrink-0" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search users, calendars, or groups"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[11px] text-[#26344D] placeholder-[#94A3B8] outline-none min-w-0"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-[#94A3B8] hover:text-[#64748B]">
                <X className="w-3 h-3" strokeWidth={2} />
              </button>
            )}
          </div>
        </div>

        {/* Users section */}
        <CollapsibleSection title="Users" count={filteredUsers.length} defaultOpen={true}>
          {filteredUsers.length === 0 ? (
            <p className="px-4 py-2 text-[11px] text-[#94A3B8] italic">No users found</p>
          ) : (
            filteredUsers.map((user) => (
              <label
                key={user.id}
                className="flex items-center gap-2.5 px-4 py-1.5 hover:bg-[#F8FAFC] cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  defaultChecked={user.selected}
                  className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB]"
                />
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: user.color || '#2563EB' }}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-[11px] text-[#26344D] truncate">{user.name}</span>
              </label>
            ))
          )}
        </CollapsibleSection>

        {/* Calendars section */}
        <CollapsibleSection title="Calendars" count={filteredCalendars.length} defaultOpen={true}>
          {filteredCalendars.length === 0 ? (
            <p className="px-4 py-2 text-[11px] text-[#94A3B8] italic">No calendars found</p>
          ) : (
            filteredCalendars.map((cal) => (
              <label
                key={cal.id}
                className="flex items-center gap-2.5 px-4 py-1.5 hover:bg-[#F8FAFC] cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  defaultChecked={cal.selected}
                  className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB]"
                />
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cal.color || '#2563EB' }}
                />
                <span className="text-[11px] text-[#26344D] truncate">{cal.name}</span>
              </label>
            ))
          )}
        </CollapsibleSection>
      </div>
    </div>
  );
}
