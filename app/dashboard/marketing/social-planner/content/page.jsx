"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit3,
  X,
  Check,
  ChevronDown,
  MoreVertical,
  CalendarDays,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function ContentPage() {
  /*
   * ============================================================
   * FRONTEND ONLY
   * ============================================================
   *
   * No fake/demo records are loaded here.
   *
   * Backend integration later:
   *
   * GET    /api/marketing/social-planner/content
   * POST   /api/marketing/social-planner/content
   * PUT    /api/marketing/social-planner/content/:id
   * DELETE /api/marketing/social-planner/content/:id
   *
   * For now the page starts empty and all UI interactions work
   * locally so the frontend can be tested without fake data.
   */

  const [items, setItems] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [openMenu, setOpenMenu] = useState(null);

  const [toast, setToast] = useState("");

  const [form, setForm] = useState({
    title: "",
    content: "",
    status: "Draft",
  });

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const title = String(item.title || "").toLowerCase();
      const content = String(item.content || "").toLowerCase();

      const matchesSearch =
        !query ||
        title.includes(query) ||
        content.includes(query);

      const matchesFilter =
        filter === "All" || item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [items, search, filter]);

  function showToast(message) {
    setToast(message);

    window.clearTimeout(window.__contentToastTimer);

    window.__contentToastTimer = window.setTimeout(() => {
      setToast("");
    }, 2200);
  }

  function openCreateModal() {
    setEditingId(null);

    setForm({
      title: "",
      content: "",
      status: "Draft",
    });

    setShowModal(true);
    setOpenMenu(null);
  }

  function openEditModal(item) {
    setEditingId(item.id);

    setForm({
      title: item.title || "",
      content: item.content || "",
      status: item.status || "Draft",
    });

    setShowModal(true);
    setOpenMenu(null);
  }

  function closeModal() {
    setShowModal(false);
    setEditingId(null);

    setForm({
      title: "",
      content: "",
      status: "Draft",
    });
  }

  function saveContent(event) {
    event.preventDefault();

    const title = form.title.trim();
    const content = form.content.trim();

    if (!title || !content) {
      showToast("Title and content are required");
      return;
    }

    if (editingId !== null) {
      setItems((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title,
                content,
                status: form.status,
              }
            : item
        )
      );

      showToast("Content updated");
    } else {
      /*
       * This creates only the record entered by the user.
       * Nothing is pre-seeded or fabricated.
       *
       * Replace this local update with POST API when backend
       * integration is added.
       */

      const newItem = {
        id: `local-${Date.now()}`,
        title,
        content,
        status: form.status,
      };

      setItems((current) => [newItem, ...current]);

      showToast("Content created");
    }

    closeModal();
  }

  function deleteContent(id) {
    const confirmed = window.confirm(
      "Remove this content from the current workspace?"
    );

    if (!confirmed) return;

    /*
     * Backend later:
     * DELETE /api/marketing/social-planner/content/:id
     */

    setItems((current) =>
      current.filter((item) => item.id !== id)
    );

    setOpenMenu(null);
    showToast("Content removed");
  }

  function duplicateContent(item) {
    /*
     * Frontend-only action.
     * It duplicates only a user-created item.
     * No fake content is introduced.
     */

    const duplicate = {
      ...item,
      id: `local-${Date.now()}`,
      title: `${item.title} Copy`,
      status: "Draft",
    };

    setItems((current) => [duplicate, ...current]);

    setOpenMenu(null);
    showToast("Content duplicated");
  }

  function clearFilters() {
    setSearch("");
    setFilter("All");
  }

  return (
    <div
      className="min-h-screen bg-[#f5f6f8] text-[#26344d]"
      onClick={() => setOpenMenu(null)}
    >
      <Header />

      <main className="p-4">
        <div className="mx-auto max-w-[1180px]">

          {/* ====================================================
              PAGE HEADER
          ==================================================== */}

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-[17px] font-semibold text-slate-800">
                Content
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                Create and organize your marketing content.
              </p>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openCreateModal();
              }}
              className="flex h-8 items-center gap-1.5 rounded-md bg-blue-600 px-3 text-[10px] font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              <Plus className="h-3.5 w-3.5" />
              Create Content
            </button>
          </div>

          {/* ====================================================
              CONTENT CARD
          ==================================================== */}

          <div className="rounded-lg border border-slate-200 bg-white">

            {/* TOOLBAR */}

            <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-3">

              {/* SEARCH */}

              <div className="flex h-8 min-w-[220px] flex-1 items-center rounded-md border border-slate-200 px-2.5 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-50">
                <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search content..."
                  className="ml-2 w-full bg-transparent text-[9px] outline-none placeholder:text-slate-400"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="flex h-5 w-5 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>

              {/* FILTER */}

              <div
                className="flex h-8 items-center gap-1.5 rounded-md border border-slate-200 px-2.5"
                onClick={(event) => event.stopPropagation()}
              >
                <Filter className="h-3 w-3 text-slate-400" />

                <select
                  value={filter}
                  onChange={(event) =>
                    setFilter(event.target.value)
                  }
                  className="bg-transparent text-[9px] text-slate-600 outline-none"
                >
                  <option value="All">All</option>
                  <option value="Draft">Draft</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Published">Published</option>
                </select>

                <ChevronDown className="pointer-events-none h-3 w-3 text-slate-400" />
              </div>

              {/* CLEAR */}

              {(search || filter !== "All") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="h-8 rounded-md border border-slate-200 px-3 text-[9px] font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                >
                  Clear
                </button>
              )}

              {/* COUNT */}

              <div className="ml-auto text-[9px] text-slate-400">
                {filteredItems.length}{" "}
                {filteredItems.length === 1
                  ? "item"
                  : "items"}
              </div>
            </div>

            {/* ==================================================
                CONTENT LIST / EMPTY STATE
            ================================================== */}

            {filteredItems.length === 0 ? (
              <EmptyState
                search={search}
                filter={filter}
                onCreate={openCreateModal}
                onClear={clearFilters}
              />
            ) : (
              <div className="divide-y divide-slate-100">

                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex items-center gap-3 p-4 transition hover:bg-slate-50"
                  >

                    {/* ICON */}

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <FileText className="h-4 w-4" />
                    </div>

                    {/* CONTENT INFO */}

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-[10px] font-semibold text-slate-700">
                        {item.title}
                      </h3>

                      <p className="mt-1 truncate text-[9px] text-slate-400">
                        {item.content}
                      </p>
                    </div>

                    {/* STATUS */}

                    <Status status={item.status} />

                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        openEditModal(item);
                      }}
                      title="Edit content"
                      className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteContent(item.id);
                      }}
                      title="Delete content"
                      className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>

                    {/* MORE */}

                    <div className="relative">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();

                          setOpenMenu(
                            openMenu === item.id
                              ? null
                              : item.id
                          );
                        }}
                        title="More actions"
                        className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      >
                        <MoreVertical className="h-3.5 w-3.5" />
                      </button>

                      {openMenu === item.id && (
                        <div
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                          className="absolute right-0 top-8 z-20 w-[150px] rounded-lg border border-slate-200 bg-white p-1 shadow-lg"
                        >
                          <button
                            type="button"
                            onClick={() => openEditModal(item)}
                            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[9px] text-slate-600 hover:bg-slate-50"
                          >
                            <Edit3 className="h-3 w-3" />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              duplicateContent(item)
                            }
                            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[9px] text-slate-600 hover:bg-slate-50"
                          >
                            <FileText className="h-3 w-3" />
                            Duplicate
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteContent(item.id)
                            }
                            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[9px] text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ========================================================
          CREATE / EDIT MODAL
      ======================================================== */}

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-[500px] rounded-xl border border-slate-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h3 className="text-[13px] font-semibold text-slate-800">
                  {editingId !== null
                    ? "Edit Content"
                    : "Create Content"}
                </h3>

                <p className="mt-1 text-[9px] text-slate-400">
                  Manage your content from this workspace.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={saveContent}
              className="space-y-4 p-5"
            >
              <Field label="Title" required>
                <input
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  autoFocus
                  maxLength={150}
                  className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[10px] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                  placeholder="Enter content title"
                />
              </Field>

              <Field label="Content" required>
                <textarea
                  value={form.content}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      content: event.target.value,
                    }))
                  }
                  rows={5}
                  maxLength={5000}
                  className="w-full resize-none rounded-md border border-slate-200 bg-white p-3 text-[10px] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                  placeholder="Write your content..."
                />

                <div className="mt-1 text-right text-[8px] text-slate-400">
                  {form.content.length}/5000
                </div>
              </Field>

              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      status: event.target.value,
                    }))
                  }
                  className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[10px] outline-none transition focus:border-blue-500"
                >
                  <option value="Draft">Draft</option>
                  <option value="Scheduled">
                    Scheduled
                  </option>
                  <option value="Published">
                    Published
                  </option>
                </select>
              </Field>

              {/* ACTIONS */}

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-9 rounded-md border border-slate-200 px-4 text-[10px] font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    !form.title.trim() ||
                    !form.content.trim()
                  }
                  className="flex h-9 items-center gap-1.5 rounded-md bg-blue-600 px-4 text-[10px] font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Check className="h-3.5 w-3.5" />

                  {editingId !== null
                    ? "Update Content"
                    : "Save Content"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          TOAST
      ======================================================== */}

      {toast && (
        <div className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-lg bg-[#171b3a] px-4 py-3 text-[10px] font-medium text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

/* ==============================================================
   HEADER
============================================================== */

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">

      {/* TOP HEADER */}

      <div className="flex h-[56px] items-center justify-between px-5">
        <Link
          href="/dashboard/marketing/social-planner"
          className="flex items-center gap-3"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <FileText className="h-4 w-4" />
          </div>

          <div>
            <h1 className="text-[14px] font-semibold text-slate-800">
              Social Planner
            </h1>

            <p className="text-[9px] text-slate-400">
              Content
            </p>
          </div>
        </Link>

        <Link
          href="/dashboard/marketing/social-planner"
          className="flex h-8 items-center gap-1.5 rounded-md border border-slate-200 px-3 text-[9px] font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <CalendarDays className="h-3.5 w-3.5" />
          Planner
        </Link>
      </div>

      {/* NAVIGATION */}

      <nav className="flex h-[40px] items-center gap-6 overflow-x-auto border-t border-slate-100 px-5">

        <Nav href="/dashboard/marketing/social-planner">
          Planner
        </Nav>

        <Nav
          href="/dashboard/marketing/social-planner/content"
          active
        >
          Content
        </Nav>

        <Nav href="/dashboard/marketing/social-planner/comments">
          Comments
        </Nav>

        <Nav href="/dashboard/marketing/social-planner/statistics">
          Statistics
        </Nav>

        <Nav href="/dashboard/marketing/social-planner/social-listening">
          Social Listening
        </Nav>

        <Nav href="/dashboard/marketing/social-planner/settings">
          Settings
        </Nav>
      </nav>
    </header>
  );
}

/* ==============================================================
   NAV
============================================================== */

function Nav({ href, children, active }) {
  return (
    <Link
      href={href}
      className={`relative flex h-full shrink-0 items-center text-[10px] transition ${
        active
          ? "font-semibold text-blue-600"
          : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {children}

      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600" />
      )}
    </Link>
  );
}

/* ==============================================================
   EMPTY STATE
============================================================== */

function EmptyState({
  search,
  filter,
  onCreate,
  onClear,
}) {
  const filtered = Boolean(
    search || filter !== "All"
  );

  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center px-5 text-center">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
        {filtered ? (
          <Search className="h-5 w-5" />
        ) : (
          <FileText className="h-5 w-5" />
        )}
      </div>

      <h3 className="mt-3 text-[11px] font-semibold text-slate-700">
        {filtered
          ? "No content found"
          : "No content created"}
      </h3>

      <p className="mt-1 max-w-[340px] text-[9px] leading-4 text-slate-400">
        {filtered
          ? "No content matches your current search or filter. Try changing the filters."
          : "There is no content available yet. Create content to start building your marketing workspace."}
      </p>

      {filtered ? (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 h-8 rounded-md border border-slate-200 px-3 text-[9px] font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Clear Filters
        </button>
      ) : (
        <button
          type="button"
          onClick={onCreate}
          className="mt-4 flex h-8 items-center gap-1.5 rounded-md bg-blue-600 px-3 text-[9px] font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          <Plus className="h-3 w-3" />
          Create Content
        </button>
      )}
    </div>
  );
}

/* ==============================================================
   STATUS
============================================================== */

function Status({ status }) {
  const config = {
    Draft: {
      className: "bg-slate-100 text-slate-500",
      icon: FileText,
    },

    Scheduled: {
      className: "bg-blue-50 text-blue-600",
      icon: Clock3,
    },

    Published: {
      className: "bg-emerald-50 text-emerald-600",
      icon: CheckCircle2,
    },
  };

  const current = config[status] || {
    className: "bg-slate-100 text-slate-500",
    icon: AlertCircle,
  };

  const Icon = current.icon;

  return (
    <span
      className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[8px] font-medium ${current.className}`}
    >
      <Icon className="h-2.5 w-2.5" />
      {status}
    </span>
  );
}

/* ==============================================================
   FIELD
============================================================== */

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[9px] font-medium text-slate-600">
        {label}

        {required && (
          <span className="ml-0.5 text-red-500">*</span>
        )}
      </span>

      {children}
    </label>
  );
}