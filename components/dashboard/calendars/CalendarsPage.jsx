'use client';

import { useState } from 'react';
import CalendarsNav from './CalendarsNav';
import CalendarToolbar from './CalendarToolbar';
import CalendarGrid from './CalendarGrid';
import ManageView from './ManageView';

/**
 * CalendarsPage
 *
 * Backend-ready architecture:
 *   - events, users, calendars are all empty arrays until the backend connects.
 *   - currentDate drives the week displayed.
 *   - All data-driven components receive props for easy future wiring.
 */
export default function CalendarsPage() {
  // ── Calendar state ──────────────────────────────────────────────────
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [viewMode, setViewMode] = useState('Week');
  const [manageViewOpen, setManageViewOpen] = useState(true);

  // ── Data (populated by backend later) ───────────────────────────────
  const events = [];     // future: load from /api/calendar/events
  const users = [];      // future: load from /api/users
  const calendars = [];  // future: load from /api/calendars

  // ── Navigation handlers ─────────────────────────────────────────────
  function handleToday() {
    setCurrentDate(new Date());
  }

  function handlePrevious() {
    const d = new Date(currentDate);
    if (viewMode === 'Week') d.setDate(d.getDate() - 7);
    else if (viewMode === 'Day') d.setDate(d.getDate() - 1);
    else if (viewMode === 'Month') d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
  }

  function handleNext() {
    const d = new Date(currentDate);
    if (viewMode === 'Week') d.setDate(d.getDate() + 7);
    else if (viewMode === 'Day') d.setDate(d.getDate() + 1);
    else if (viewMode === 'Month') d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
  }

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#F8FAFC]">
      {/* ── Top navigation tabs ── */}
      <CalendarsNav />

      {/* ── Main content area ── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* ── Calendar column ── */}
        <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden">
          {/* Toolbar */}
          <CalendarToolbar
            currentDate={currentDate}
            viewMode={viewMode}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onToday={handleToday}
            onViewChange={setViewMode}
            onManageView={() => setManageViewOpen(!manageViewOpen)}
            manageViewOpen={manageViewOpen}
          />

          {/* Calendar grid */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <CalendarGrid
              currentDate={currentDate}
              events={events}
              showCurrentTime={true}
            />
          </div>
        </div>

        {/* ── Manage view panel ── */}
        <ManageView
          isOpen={manageViewOpen}
          onClose={() => setManageViewOpen(false)}
          users={users}
          calendars={calendars}
        />
      </div>
    </div>
  );
}
