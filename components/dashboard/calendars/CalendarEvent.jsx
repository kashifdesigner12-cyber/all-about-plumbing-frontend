'use client';

/**
 * CalendarEvent - renders a single calendar event block.
 * Currently unused (events = []) but ready for backend integration.
 *
 * Expected event shape:
 * {
 *   id, title, start, end,
 *   calendarId, userId, contactId,
 *   status, color
 * }
 */
export default function CalendarEvent({ event, topPercent, heightPercent }) {
  const bgColor = event.color || '#2563EB';

  return (
    <div
      className="absolute left-1 right-1 rounded-md px-1.5 py-1 overflow-hidden cursor-pointer select-none group transition-opacity hover:opacity-90"
      style={{
        top: `${topPercent}%`,
        height: `${heightPercent}%`,
        backgroundColor: bgColor,
        minHeight: '20px',
      }}
      title={event.title}
    >
      <p className="text-[11px] font-semibold text-white truncate leading-tight">
        {event.title}
      </p>
      {heightPercent > 8 && (
        <p className="text-[10px] text-white/80 truncate leading-tight">
          {event.startLabel} – {event.endLabel}
        </p>
      )}
    </div>
  );
}
