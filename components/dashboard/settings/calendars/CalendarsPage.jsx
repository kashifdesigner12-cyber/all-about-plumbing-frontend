"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  Clock3,
  Globe2,
  CheckCircle2,
} from "lucide-react";

export default function CalendarsPage() {
  const [calendars, setCalendars] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState("down");

  const [editingCalendar, setEditingCalendar] = useState(null);

  const [calendarName, setCalendarName] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [duration, setDuration] = useState("30");

  const menuRef = useRef(null);

  /* =========================================================
     FILTER CALENDARS
  ========================================================= */

  const filteredCalendars = calendars.filter((calendar) =>
    calendar.name.toLowerCase().includes(search.toLowerCase())
  );

  /* =========================================================
     CLOSE MENU ON OUTSIDE CLICK
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =========================================================
     OPEN CREATE MODAL
  ========================================================= */

  const openCreateModal = () => {
    setEditingCalendar(null);
    setCalendarName("");
    setTimezone("UTC");
    setDuration("30");
    setShowModal(true);
    setOpenMenu(null);
  };

  /* =========================================================
     OPEN EDIT MODAL
  ========================================================= */

  const openEditModal = (calendar) => {
    setEditingCalendar(calendar);
    setCalendarName(calendar.name);
    setTimezone(calendar.timezone);
    setDuration(calendar.duration);
    setShowModal(true);
    setOpenMenu(null);
  };

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  const closeModal = () => {
    setShowModal(false);
    setEditingCalendar(null);
    setCalendarName("");
    setTimezone("UTC");
    setDuration("30");
  };

  /* =========================================================
     CREATE / UPDATE CALENDAR
  ========================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = calendarName.trim();

    if (!name) return;

    if (editingCalendar) {
      setCalendars((current) =>
        current.map((calendar) =>
          calendar.id === editingCalendar.id
            ? {
                ...calendar,
                name,
                timezone,
                duration,
              }
            : calendar
        )
      );
    } else {
      setCalendars((current) => [
        ...current,
        {
          id: Date.now(),
          name,
          timezone,
          duration,
          status: "Active",
        },
      ]);
    }

    closeModal();
  };

  /* =========================================================
     DELETE CALENDAR
  ========================================================= */

  const handleDelete = (id) => {
    setCalendars((current) =>
      current.filter((calendar) => calendar.id !== id)
    );

    setOpenMenu(null);
  };

  /* =========================================================
     THREE DOT MENU
  ========================================================= */

  const toggleMenu = (event, id) => {
    event.stopPropagation();

    if (openMenu === id) {
      setOpenMenu(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < 140 && spaceAbove > 140) {
      setMenuPosition("up");
    } else {
      setMenuPosition("down");
    }

    setOpenMenu(id);
  };

  return (
    <div className="h-full min-h-0 w-full overflow-y-auto overflow-x-hidden bg-slate-50">
      <div className="w-full px-4 pb-12 pt-4 sm:px-5 lg:px-6 xl:px-8">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Settings</span>
            <span>/</span>
            <span className="text-slate-600">
              Calendars
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#171B3A] sm:text-3xl">
                Calendars
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your calendars, availability, and booking settings.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
            >
              <Plus size={17} />
              Add Calendar
            </button>
          </div>
        </div>

        {/* =====================================================
            MAIN CARD
        ===================================================== */}

        <section className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* TOOLBAR */}

          <div className="flex flex-col gap-4 rounded-t-2xl border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#171B3A]">
                Your Calendars
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Create and manage calendars used for appointments.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search calendars..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />
            </div>
          </div>

          {/* ===================================================
              EMPTY STATE
          =================================================== */}

          {filteredCalendars.length === 0 ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center px-5 py-12 text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <CalendarDays size={25} />
              </div>

              <h3 className="mt-4 text-sm font-bold text-[#171B3A]">
                {search
                  ? "No calendars found"
                  : "No calendars yet"}
              </h3>

              <p className="mt-1 max-w-md text-xs leading-5 text-slate-400">
                {search
                  ? "Try a different search term."
                  : "Create your first calendar to start managing appointments and availability."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white transition hover:bg-blue-700"
                >
                  <Plus size={16} />
                  Create Calendar
                </button>
              )}
            </div>
          ) : (
            /* =================================================
               CALENDAR LIST
            ================================================= */

            <div className="divide-y divide-slate-100">

              {filteredCalendars.map((calendar) => (
                <div
                  key={calendar.id}
                  className="relative flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-slate-50"
                >

                  {/* CALENDAR INFO */}

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <CalendarDays size={19} />
                    </div>

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-sm font-semibold text-[#171B3A]">
                          {calendar.name}
                        </h3>

                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                          <CheckCircle2 size={11} />
                          {calendar.status}
                        </span>
                      </div>

                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">

                        <span className="inline-flex items-center gap-1.5">
                          <Globe2 size={13} />
                          {calendar.timezone}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 size={13} />
                          {calendar.duration} min
                        </span>

                      </div>
                    </div>
                  </div>

                  {/* =================================================
                     THREE DOT MENU
                  ================================================= */}

                  <div
                    ref={
                      openMenu === calendar.id
                        ? menuRef
                        : null
                    }
                    className="relative shrink-0"
                  >
                    <button
                      type="button"
                      aria-label="Calendar options"
                      onClick={(event) =>
                        toggleMenu(event, calendar.id)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openMenu === calendar.id && (
                      <div
                        className={`absolute right-0 z-[60] w-40 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ${
                          menuPosition === "up"
                            ? "bottom-10"
                            : "top-10"
                        }`}
                      >

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(calendar)
                          }
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(calendar.id)
                          }
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* =====================================================
            CALENDAR SETTINGS INFORMATION
        ===================================================== */}

        <div className="mt-5 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <CalendarDays size={18} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-[#171B3A]">
              Availability
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Manage available days and appointment scheduling windows.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock3 size={18} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-[#171B3A]">
              Appointment Duration
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Configure default appointment duration for each calendar.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Globe2 size={18} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-[#171B3A]">
              Timezone
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Calendar timezone settings can be connected to backend data later.
            </p>
          </div>

        </div>

        {/* =====================================================
            FRONTEND NOTICE
        ===================================================== */}

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-4">

          <CalendarDays
            size={18}
            className="mt-0.5 shrink-0 text-blue-600"
          />

          <div>
            <p className="text-sm font-bold text-blue-900">
              Calendar settings
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              Calendar availability, appointments, integrations, and
              scheduling data can be connected to the backend later.
              This page currently uses frontend-only interactions.
            </p>
          </div>

        </div>
      </div>

      {/* =======================================================
          ADD / EDIT CALENDAR MODAL
      ======================================================= */}

      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >

          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">

              <div>
                <h2 className="text-base font-bold text-[#171B3A]">
                  {editingCalendar
                    ? "Edit Calendar"
                    : "Add Calendar"}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {editingCalendar
                    ? "Update your calendar settings."
                    : "Create a new calendar."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={17} />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit}>

              <div className="space-y-5 p-5">

                {/* CALENDAR NAME */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Calendar Name
                  </label>

                  <input
                    autoFocus
                    type="text"
                    value={calendarName}
                    onChange={(event) =>
                      setCalendarName(event.target.value)
                    }
                    placeholder="e.g. Sales Calendar"
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* TIMEZONE */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Timezone
                  </label>

                  <select
                    value={timezone}
                    onChange={(event) =>
                      setTimezone(event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="UTC">
                      UTC
                    </option>

                    <option value="Asia/Karachi">
                      Asia/Karachi
                    </option>

                    <option value="America/New_York">
                      America/New_York
                    </option>

                    <option value="America/Los_Angeles">
                      America/Los_Angeles
                    </option>

                    <option value="Europe/London">
                      Europe/London
                    </option>

                    <option value="Europe/Berlin">
                      Europe/Berlin
                    </option>
                  </select>
                </div>

                {/* DURATION */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Default Appointment Duration
                  </label>

                  <select
                    value={duration}
                    onChange={(event) =>
                      setDuration(event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="15">
                      15 minutes
                    </option>

                    <option value="30">
                      30 minutes
                    </option>

                    <option value="45">
                      45 minutes
                    </option>

                    <option value="60">
                      60 minutes
                    </option>

                    <option value="90">
                      90 minutes
                    </option>

                    <option value="120">
                      120 minutes
                    </option>
                  </select>
                </div>

                {/* NOTICE */}

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
                  <div className="flex items-start gap-2.5">

                    <CalendarDays
                      size={17}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <p className="text-xs leading-5 text-blue-700">
                      Calendar availability and scheduling rules can
                      be connected to backend data later.
                    </p>

                  </div>
                </div>

              </div>

              {/* MODAL FOOTER */}

              <div className="flex flex-col-reverse gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeModal}
                  className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!calendarName.trim()}
                  className="h-10 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {editingCalendar
                    ? "Save Changes"
                    : "Create Calendar"}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}