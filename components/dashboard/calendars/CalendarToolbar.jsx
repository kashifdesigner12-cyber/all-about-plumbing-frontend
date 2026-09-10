'use client';

import { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  LayoutGrid,
  SlidersHorizontal,
  Plus,
  CalendarPlus,
  Clock,
  Ban,
} from 'lucide-react';

const VIEW_OPTIONS = ['Day', 'Week', 'Month', 'Agenda'];

/**
 * Format a date range string: "Aug 9 – 15, 2026"
 */
function formatWeekRange(date) {
  const d = new Date(date);
  // Get Sunday of this week
  const dayOfWeek = d.getDay();
  const sunday = new Date(d);
  sunday.setDate(d.getDate() - dayOfWeek);
  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() + 6);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const startMonth = monthNames[sunday.getMonth()];
  const endMonth = monthNames[saturday.getMonth()];
  const startDay = sunday.getDate();
  const endDay = saturday.getDate();
  const year = saturday.getFullYear();

  if (sunday.getMonth() === saturday.getMonth()) {
    return `${startMonth} ${startDay} – ${endDay}, ${year}`;
  }
  return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${year}`;
}

export default function CalendarToolbar({
  currentDate,
  onPrevious,
  onNext,
  onToday,
  viewMode = 'Week',
  onViewChange,
  onManageView,
  manageViewOpen,
}) {
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);
  const [newMenuOpen, setNewMenuOpen] = useState(false);
  const viewRef = useRef(null);
  const newRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (viewRef.current && !viewRef.current.contains(e.target)) {
        setViewDropdownOpen(false);
      }
      if (newRef.current && !newRef.current.contains(e.target)) {
        setNewMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-[#E2E8F0] bg-white shrink-0">
      {/* Left side */}
      <div className="flex items-center gap-2">
        {/* Today button */}
        <button
          onClick={onToday}
          className="px-3 py-1.5 text-[12px] font-medium text-[#26344D] bg-white border border-[#E2E8F0] rounded-md hover:bg-[#F8FAFC] transition-colors"
        >
          Today
        </button>

        {/* Previous / Next */}
        <div className="flex items-center border border-[#E2E8F0] rounded-md overflow-hidden">
          <button
            onClick={onPrevious}
            className="px-2 py-1.5 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#26344D] transition-colors border-r border-[#E2E8F0]"
          >
            <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
          <button
            onClick={onNext}
            className="px-2 py-1.5 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#26344D] transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
        </div>

        {/* Date range label */}
        <span className="text-[13px] font-semibold text-[#26344D] select-none min-w-[120px]">
          {formatWeekRange(currentDate)}
        </span>

        {/* View mode selector */}
        <div className="relative" ref={viewRef}>
          <button
            onClick={() => setViewDropdownOpen(!viewDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#26344D] bg-white border border-[#E2E8F0] rounded-md hover:bg-[#F8FAFC] transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-[#64748B]" strokeWidth={1.8} />
            {viewMode} view
            <ChevronDown className="w-3 h-3 text-[#64748B]" strokeWidth={2} />
          </button>
          {viewDropdownOpen && (
            <div className="absolute left-0 top-full mt-1 w-36 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-50 py-1 overflow-hidden">
              {VIEW_OPTIONS.map((v) => (
                <button
                  key={v}
                  onClick={() => {
                    onViewChange?.(v);
                    setViewDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-[12px] transition-colors ${
                    v === viewMode
                      ? 'text-[#2563EB] bg-[#EEF4FF] font-medium'
                      : 'text-[#26344D] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {v} view
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Appearance settings icon */}
        <button className="w-7 h-7 flex items-center justify-center rounded-md text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#26344D] border border-[#E2E8F0] transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.8} />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Manage view button */}
        <button
          onClick={onManageView}
          className={`px-3 py-1.5 text-[12px] font-medium border rounded-md transition-colors ${
            manageViewOpen
              ? 'text-[#2563EB] bg-[#EEF4FF] border-[#2563EB]/30'
              : 'text-[#26344D] bg-white border-[#E2E8F0] hover:bg-[#F8FAFC]'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <LayoutGrid className="w-3.5 h-3.5" strokeWidth={1.8} />
            Manage view
          </span>
        </button>

        {/* + New button */}
        <div className="relative" ref={newRef}>
          <button
            onClick={() => setNewMenuOpen(!newMenuOpen)}
            className="flex items-center gap-1 px-3 py-1.5 text-[12px] font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-md transition-colors"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            New
            <ChevronDown className="w-3 h-3 ml-0.5" strokeWidth={2} />
          </button>
          {newMenuOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-50 py-1 overflow-hidden">
              <button
                onClick={() => setNewMenuOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] text-[#26344D] hover:bg-[#F8FAFC] transition-colors"
              >
                <CalendarPlus className="w-3.5 h-3.5 text-[#64748B]" strokeWidth={1.8} />
                New appointment
              </button>
              <button
                onClick={() => setNewMenuOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] text-[#26344D] hover:bg-[#F8FAFC] transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-[#64748B]" strokeWidth={1.8} />
                New event
              </button>
              <button
                onClick={() => setNewMenuOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] text-[#26344D] hover:bg-[#F8FAFC] transition-colors"
              >
                <Ban className="w-3.5 h-3.5 text-[#64748B]" strokeWidth={1.8} />
                New blocked time
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
