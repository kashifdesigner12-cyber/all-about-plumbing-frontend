'use client';

import { useRef, useEffect } from 'react';
import CalendarEvent from './CalendarEvent';

/** Hours displayed in the grid (0 = 12 AM … 23 = 11 PM) */
const HOURS = Array.from({ length: 24 }, (_, i) => i);

/** Height of one hour row in px */
const HOUR_HEIGHT = 56;

/** Days of the week header config */
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatHour(h) {
  if (h === 0) return '12 AM';
  if (h < 12) return `${h} AM`;
  if (h === 12) return '12 PM';
  return `${h - 12} PM`;
}

function getWeekDates(referenceDate) {
  const d = new Date(referenceDate);
  const dayOfWeek = d.getDay();
  const sunday = new Date(d);
  sunday.setDate(d.getDate() - dayOfWeek);

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(sunday);
    day.setDate(sunday.getDate() + i);
    return day;
  });
}

function isToday(date) {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

/**
 * Compute current-time indicator position as a percentage of a single day height (24 * HOUR_HEIGHT).
 */
function getCurrentTimePercent() {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  return (minutes / (24 * 60)) * 100;
}

/**
 * Get events for a specific day column.
 * events is [] by default; when backend connects, real data flows in.
 */
function getEventsForDay(events, date) {
  return events.filter((ev) => {
    const start = new Date(ev.start);
    return (
      start.getFullYear() === date.getFullYear() &&
      start.getMonth() === date.getMonth() &&
      start.getDate() === date.getDate()
    );
  });
}

/**
 * Convert an event's start/end to top% and height% within the day column.
 */
function eventToPosition(event) {
  const start = new Date(event.start);
  const end = new Date(event.end);
  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const endMinutes = end.getHours() * 60 + end.getMinutes();
  const totalMinutes = 24 * 60;
  return {
    topPercent: (startMinutes / totalMinutes) * 100,
    heightPercent: Math.max(((endMinutes - startMinutes) / totalMinutes) * 100, 2),
  };
}

export default function CalendarGrid({
  currentDate,
  events = [],
  showCurrentTime = true,
}) {
  const scrollRef = useRef(null);
  const weekDates = getWeekDates(currentDate);
  const timePercent = getCurrentTimePercent();

  // Scroll to ~8 AM on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = HOUR_HEIGHT * 7.5;
    }
  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white overflow-hidden">
      {/* ── Day headers + All-day row ── */}
      <div className="flex shrink-0 border-b border-[#E2E8F0] bg-white">
        {/* Time gutter placeholder */}
        <div className="w-14 shrink-0 border-r border-[#E2E8F0]" />

        {/* Day columns header */}
        {weekDates.map((date, idx) => {
          const today = isToday(date);
          const dayName = DAYS[date.getDay()];
          const dayNum = date.getDate();

          return (
            <div
              key={idx}
              className={`flex-1 flex flex-col items-center justify-center py-2 border-r border-[#E2E8F0] last:border-r-0 min-w-0`}
            >
              <span className={`text-[11px] font-medium uppercase tracking-wide ${today ? 'text-[#2563EB]' : 'text-[#64748B]'}`}>
                {dayName}
              </span>
              <div
                className={`mt-0.5 w-7 h-7 flex items-center justify-center rounded-full text-[13px] font-bold ${
                  today
                    ? 'bg-[#2563EB] text-white'
                    : 'text-[#26344D]'
                }`}
              >
                {dayNum}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── All day row ── */}
      <div className="flex shrink-0 border-b border-[#E2E8F0]">
        <div className="w-14 shrink-0 flex items-center justify-end pr-2 border-r border-[#E2E8F0]">
          <span className="text-[10px] text-[#64748B] font-medium">All day</span>
        </div>
        {weekDates.map((date, idx) => (
          <div
            key={idx}
            className="flex-1 min-h-[28px] border-r border-[#E2E8F0] last:border-r-0"
          />
        ))}
      </div>

      {/* ── Scrollable time grid ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden light-scroll relative"
      >
        <div
          className="flex relative"
          style={{ height: HOUR_HEIGHT * 24 }}
        >
          {/* ── Time column ── */}
          <div className="w-14 shrink-0 border-r border-[#E2E8F0] relative">
            {HOURS.map((h) => (
              <div
                key={h}
                className="absolute right-0 flex items-start justify-end pr-2"
                style={{
                  top: h * HOUR_HEIGHT,
                  height: HOUR_HEIGHT,
                }}
              >
                {h > 0 && (
                  <span className="text-[10px] text-[#94A3B8] font-medium leading-none -translate-y-1.5 whitespace-nowrap">
                    {formatHour(h)}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* ── Day columns ── */}
          {weekDates.map((date, colIdx) => {
            const dayEvents = getEventsForDay(events, date);
            const today = isToday(date);

            return (
              <div
                key={colIdx}
                className={`flex-1 relative border-r border-[#E2E8F0] last:border-r-0 ${today ? 'bg-[#EEF4FF]/20' : ''}`}
              >
                {/* Hour row lines */}
                {HOURS.map((h) => (
                  <div
                    key={h}
                    className="absolute left-0 right-0 border-t border-[#F1F5F9]"
                    style={{ top: h * HOUR_HEIGHT }}
                  />
                ))}

                {/* Half-hour subtle lines */}
                {HOURS.map((h) => (
                  <div
                    key={`half-${h}`}
                    className="absolute left-0 right-0 border-t border-dashed border-[#F8FAFC]"
                    style={{ top: h * HOUR_HEIGHT + HOUR_HEIGHT / 2 }}
                  />
                ))}

                {/* Current time indicator – only on today's column */}
                {showCurrentTime && today && (
                  <div
                    className="absolute left-0 right-0 z-20 flex items-center"
                    style={{ top: `${timePercent}%` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-red-500 -ml-1 shrink-0" />
                    <div className="flex-1 h-px bg-red-500" />
                  </div>
                )}

                {/* Events */}
                {dayEvents.map((event) => {
                  const { topPercent, heightPercent } = eventToPosition(event);
                  return (
                    <CalendarEvent
                      key={event.id}
                      event={event}
                      topPercent={topPercent}
                      heightPercent={heightPercent}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
