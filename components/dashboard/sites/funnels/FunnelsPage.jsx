"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Grid2X2,
  List,
  MoreVertical,
  Plus,
  Search,
  Settings,
  X,
  FolderOpen,
} from "lucide-react";

const SITE_TABS = [
  "Funnels",
  "Websites",
  "Stores",
  "Webinars",
  "Analytics",
  "Blogs",
  "WordPress",
  "Client Portal",
  "Forms",
  "Surveys",
  "Quizzes",
  "Chat Widget",
  "QR Codes",
];

export default function FunnelsPage() {
  const [activeTab, setActiveTab] = useState("Funnels");
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(1);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showClientPortalMenu, setShowClientPortalMenu] =
    useState(false);

  const [menuId, setMenuId] = useState(null);

  const [funnelName, setFunnelName] = useState("");

  /*
   * FRONTEND ONLY
   *
   * Do NOT add fake/demo funnel records.
   * Backend will later provide the real records.
   */
  const funnels = [];

  const filteredFunnels = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return funnels;
    }

    return funnels.filter((item) =>
      String(item.name || "")
        .toLowerCase()
        .includes(value)
    );
  }, [search]);

  const totalPages =
    filteredFunnels.length > 0
      ? Math.ceil(filteredFunnels.length / rowsPerPage)
      : 1;

  const startIndex = (page - 1) * rowsPerPage;

  const visibleFunnels = filteredFunnels.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleRowsChange = (value) => {
    setRowsPerPage(Number(value));
    setPage(1);
  };

  const handleCreateFunnel = (event) => {
    event.preventDefault();

    if (!funnelName.trim()) {
      return;
    }

    /*
     * Backend POST request will be added later.
     * We intentionally do not create fake frontend records.
     */

    setFunnelName("");
    setShowCreateModal(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    /*
     * Keep this frontend-only for now.
     * Other Sites pages can be connected later.
     */
  };

  return (
    <div
      className="min-h-full bg-white text-slate-800"
      onClick={() => {
        setMenuId(null);
        setShowClientPortalMenu(false);
      }}
    >
      {/* =====================================================
          TOP SITES NAVIGATION
      ====================================================== */}

      <header className="h-[58px] border-b border-slate-200 bg-white">
        <div className="flex h-full items-center overflow-x-auto px-4 scrollbar-none">

          {/* Sites label */}
          <button
            type="button"
            onClick={() => handleTabClick("Sites")}
            className={`mr-5 h-full shrink-0 text-[12px] font-medium transition ${
              activeTab === "Sites"
                ? "text-[#2563EB]"
                : "text-slate-700 hover:text-[#2563EB]"
            }`}
          >
            Sites
          </button>

          {SITE_TABS.map((tab) => {
            if (tab === "Client Portal") {
              return (
                <div
                  key={tab}
                  className="relative h-full shrink-0"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >
                  <button
                    type="button"
                    onClick={() =>
                      setShowClientPortalMenu(
                        (current) => !current
                      )
                    }
                    className={`flex h-full items-center gap-1 px-2 text-[11px] font-medium transition ${
                      activeTab === tab
                        ? "text-[#2563EB]"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Client Portal
                    <ChevronDown size={12} />
                  </button>

                  {showClientPortalMenu && (
                    <div className="absolute left-0 top-[52px] z-50 w-[145px] rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("Client Portal");
                          setShowClientPortalMenu(false);
                        }}
                        className="w-full rounded-md px-3 py-2 text-left text-[10px] text-slate-600 hover:bg-slate-50"
                      >
                        Portal settings
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("Client Portal");
                          setShowClientPortalMenu(false);
                        }}
                        className="w-full rounded-md px-3 py-2 text-left text-[10px] text-slate-600 hover:bg-slate-50"
                      >
                        Client portal
                      </button>
                    </div>
                  )}

                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-[#2563EB]" />
                  )}
                </div>
              );
            }

            return (
              <button
                key={tab}
                type="button"
                onClick={() => handleTabClick(tab)}
                className={`relative flex h-full shrink-0 items-center px-2 text-[11px] font-medium transition ${
                  activeTab === tab
                    ? "text-[#2563EB]"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-[#2563EB]" />
                )}
              </button>
            );
          })}

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setShowSettings(true);
            }}
            className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            title="Settings"
          >
            <Settings size={15} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="px-4 pb-8 pt-4">

        {/* PAGE HEADER */}

        <div className="flex items-start justify-between">

          <div>
            <h1 className="text-[15px] font-semibold text-[#171B3A]">
              Funnels
            </h1>

            <p className="mt-[2px] text-[10px] text-slate-500">
              Create and manage funnels to generate leads,
              appointments and receive payments.
            </p>
          </div>

          <div className="flex items-center gap-2">

            {/* Screenshot-style small button */}
            <button
              type="button"
              onClick={() =>
                setShowCreateModal(true)
              }
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 transition hover:bg-slate-50"
              title="Create funnel"
            >
              <FolderOpen
                size={14}
                strokeWidth={1.8}
              />
            </button>

            {/* New Funnel */}
            <button
              type="button"
              onClick={() =>
                setShowCreateModal(true)
              }
              className="flex h-8 items-center gap-1.5 rounded-md bg-[#2563EB] px-3 text-[10px] font-semibold text-white transition hover:bg-[#1D4ED8] active:scale-[0.98]"
            >
              <Plus size={13} />
              New funnel
            </button>
          </div>
        </div>

        {/* ===================================================
            TOOLBAR
        ==================================================== */}

        <div className="mt-5 flex items-center justify-between">

          {/* Left icon */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            title="Recent activity"
          >
            <Clock3 size={14} />
          </button>

          <div className="flex items-center gap-1.5">

            {/* List view */}
            <button
              type="button"
              onClick={() => setView("list")}
              className={`flex h-8 w-8 items-center justify-center rounded-md border ${
                view === "list"
                  ? "border-blue-200 bg-blue-50 text-[#2563EB]"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
              title="List view"
            >
              <List size={14} />
            </button>

            {/* Grid view */}
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`flex h-8 w-8 items-center justify-center rounded-md border ${
                view === "grid"
                  ? "border-blue-200 bg-blue-50 text-[#2563EB]"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
              title="Grid view"
            >
              <Grid2X2 size={14} />
            </button>

            {/* Search */}
            <div className="ml-1 flex h-8 w-[190px] items-center rounded-md border border-slate-200 bg-white px-2.5 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-100">

              <Search
                size={13}
                className="mr-2 shrink-0 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) =>
                  handleSearch(event.target.value)
                }
                type="text"
                placeholder="Search for funnels"
                className="w-full bg-transparent text-[10px] text-slate-700 outline-none placeholder:text-slate-400"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => handleSearch("")}
                  className="ml-1 text-slate-400 hover:text-slate-700"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ===================================================
            TABLE
        ==================================================== */}

        {view === "list" ? (
          <div className="mt-2 overflow-visible rounded-[5px] border border-slate-200">

            {/* Table header */}

            <div className="grid grid-cols-[minmax(300px,1fr)_225px_225px_55px] items-center border-b border-slate-200 bg-slate-50/50 px-2 py-2">

              <div className="px-2 text-[10px] font-medium text-slate-700">
                Name
              </div>

              <div className="px-2 text-[10px] font-medium text-slate-700">
                Last updated
              </div>

              <div className="px-2 text-[10px] font-medium text-slate-700">
                Funnel steps
              </div>

              <div />
            </div>

            {/* No fake records */}

            {visibleFunnels.length === 0 ? (
              <div className="min-h-[245px]">

                <div className="flex h-[245px] items-center justify-center">
                  <div className="text-center">

                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                      <FolderOpen
                        size={19}
                        strokeWidth={1.5}
                      />
                    </div>

                    <h2 className="text-[12px] font-semibold text-[#171B3A]">
                      {search
                        ? "No funnels found"
                        : "No funnels yet"}
                    </h2>

                    <p className="mx-auto mt-1 max-w-[300px] text-[10px] leading-4 text-slate-400">
                      {search
                        ? `No funnels match "${search}".`
                        : "Your funnels will appear here when they are available."}
                    </p>

                    {search ? (
                      <button
                        type="button"
                        onClick={() =>
                          handleSearch("")
                        }
                        className="mt-3 h-7 rounded-md border border-slate-200 bg-white px-3 text-[10px] font-medium text-slate-600 hover:bg-slate-50"
                      >
                        Clear search
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setShowCreateModal(true)
                        }
                        className="mt-3 inline-flex h-7 items-center gap-1 rounded-md bg-[#2563EB] px-3 text-[10px] font-semibold text-white hover:bg-[#1D4ED8]"
                      >
                        <Plus size={12} />
                        New funnel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              visibleFunnels.map((funnel) => (
                <FunnelRow
                  key={funnel.id}
                  funnel={funnel}
                  open={menuId === funnel.id}
                  onMenu={(event) => {
                    event.stopPropagation();
                    setMenuId((current) =>
                      current === funnel.id
                        ? null
                        : funnel.id
                    );
                  }}
                />
              ))
            )}
          </div>
        ) : (
          <div className="mt-2 min-h-[300px] rounded-[5px] border border-slate-200 p-5">
            <div className="flex min-h-[260px] items-center justify-center">
              <div className="text-center">

                <Grid2X2
                  size={25}
                  className="mx-auto mb-3 text-slate-300"
                />

                <h2 className="text-[12px] font-semibold text-[#171B3A]">
                  No funnels yet
                </h2>

                <p className="mt-1 text-[10px] text-slate-400">
                  Real funnel data will appear here.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowCreateModal(true)
                  }
                  className="mt-3 inline-flex h-7 items-center gap-1 rounded-md bg-[#2563EB] px-3 text-[10px] font-semibold text-white hover:bg-[#1D4ED8]"
                >
                  <Plus size={12} />
                  New funnel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================
            PAGINATION
        ==================================================== */}

        <div className="mt-2 flex items-center justify-end gap-2">

          <span className="text-[10px] text-slate-500">
            Rows per page
          </span>

          <div className="relative">
            <select
              value={rowsPerPage}
              onChange={(event) =>
                handleRowsChange(event.target.value)
              }
              className="h-7 appearance-none rounded-md border border-slate-200 bg-white pl-2 pr-6 text-[10px] text-slate-600 outline-none focus:border-[#2563EB]"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>

            <ChevronDown
              size={10}
              className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <span className="text-[10px] text-slate-500">
            {filteredFunnels.length === 0
              ? "0 - 0"
              : `${startIndex + 1} - ${Math.min(
                  startIndex + rowsPerPage,
                  filteredFunnels.length
                )}`}{" "}
            of {filteredFunnels.length}
          </span>

          <button
            type="button"
            disabled={page <= 1}
            onClick={() =>
              setPage((current) =>
                Math.max(1, current - 1)
              )
            }
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={13} />
          </button>

          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-[#2563EB] bg-white text-[10px] text-[#2563EB]"
          >
            {page}
          </button>

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() =>
              setPage((current) =>
                Math.min(totalPages, current + 1)
              )
            }
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </main>

      {/* =====================================================
          CREATE FUNNEL MODAL
      ====================================================== */}

      {showCreateModal && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/35 px-4"
          onClick={() =>
            setShowCreateModal(false)
          }
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            className="w-full max-w-[450px] overflow-hidden rounded-xl bg-white shadow-2xl"
          >

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

              <div>
                <h2 className="text-[14px] font-semibold text-[#171B3A]">
                  Create new funnel
                </h2>

                <p className="mt-1 text-[10px] text-slate-400">
                  Set up a new funnel.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowCreateModal(false)
                }
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleCreateFunnel}>

              <div className="space-y-4 px-5 py-5">

                <div>
                  <label
                    htmlFor="funnel-name"
                    className="mb-1.5 block text-[10px] font-semibold text-slate-600"
                  >
                    Funnel name
                  </label>

                  <input
                    id="funnel-name"
                    value={funnelName}
                    onChange={(event) =>
                      setFunnelName(event.target.value)
                    }
                    placeholder="Enter funnel name"
                    className="h-9 w-full rounded-md border border-slate-200 px-3 text-[11px] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="funnel-template"
                    className="mb-1.5 block text-[10px] font-semibold text-slate-600"
                  >
                    Funnel template
                  </label>

                  <select
                    id="funnel-template"
                    defaultValue="blank"
                    className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-600 outline-none focus:border-[#2563EB]"
                  >
                    <option value="blank">
                      Blank funnel
                    </option>
                  </select>
                </div>

                <div className="rounded-md bg-blue-50 px-3 py-2.5">
                  <p className="text-[10px] leading-4 text-blue-700">
                    The create action is ready for backend
                    integration. No fake funnel will be added
                    to the table.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowCreateModal(false)
                  }
                  className="h-8 rounded-md border border-slate-200 bg-white px-4 text-[10px] font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!funnelName.trim()}
                  className="h-8 rounded-md bg-[#2563EB] px-4 text-[10px] font-semibold text-white hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Create funnel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          SETTINGS MODAL
      ====================================================== */}

      {showSettings && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/35 px-4"
          onClick={() => setShowSettings(false)}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            className="w-full max-w-[400px] overflow-hidden rounded-xl bg-white shadow-2xl"
          >

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

              <h2 className="text-[14px] font-semibold text-[#171B3A]">
                Sites settings
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowSettings(false)
                }
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-4 px-5 py-5">

              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-[11px] font-medium text-slate-700">
                  Funnel settings
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-400">
                  Settings controls are available in the
                  frontend and can be connected to the backend
                  later.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-[11px] font-medium text-slate-700">
                  View
                </p>

                <div className="mt-2 flex gap-2">

                  <button
                    type="button"
                    onClick={() => {
                      setView("list");
                      setShowSettings(false);
                    }}
                    className={`h-8 rounded-md px-3 text-[10px] ${
                      view === "list"
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 text-slate-600"
                    }`}
                  >
                    List
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setView("grid");
                      setShowSettings(false);
                    }}
                    className={`h-8 rounded-md px-3 text-[10px] ${
                      view === "grid"
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 text-slate-600"
                    }`}
                  >
                    Grid
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 px-5 py-3">
              <button
                type="button"
                onClick={() =>
                  setShowSettings(false)
                }
                className="h-8 rounded-md bg-[#2563EB] px-4 text-[10px] font-semibold text-white hover:bg-[#1D4ED8]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   FUNNEL ROW
============================================================ */

function FunnelRow({
  funnel,
  open,
  onMenu,
}) {
  return (
    <div className="relative grid min-h-[38px] grid-cols-[minmax(300px,1fr)_225px_225px_55px] items-center border-b border-slate-100 px-2">

      <div className="truncate px-2 text-[10px] text-slate-700">
        {funnel.name}
      </div>

      <div className="px-2 text-[10px] text-slate-600">
        {funnel.updatedAt || "—"}
      </div>

      <div className="px-2 text-[10px] text-slate-600">
        {funnel.steps || "—"} Steps
      </div>

      <div className="relative flex justify-center">

        <button
          type="button"
          onClick={onMenu}
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100"
        >
          <MoreVertical size={14} />
        </button>

        {open && (
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            className="absolute right-1 top-8 z-50 w-[145px] rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl"
          >
            <button className="w-full rounded-md px-3 py-2 text-left text-[10px] text-slate-600 hover:bg-slate-50">
              Open funnel
            </button>

            <button className="w-full rounded-md px-3 py-2 text-left text-[10px] text-slate-600 hover:bg-slate-50">
              Edit funnel
            </button>

            <button className="w-full rounded-md px-3 py-2 text-left text-[10px] text-slate-600 hover:bg-slate-50">
              Duplicate
            </button>

            <button className="w-full rounded-md px-3 py-2 text-left text-[10px] text-slate-600 hover:bg-slate-50">
              Settings
            </button>

            <div className="my-1 border-t border-slate-100" />

            <button className="w-full rounded-md px-3 py-2 text-left text-[10px] text-red-600 hover:bg-red-50">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}