"use client";

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Grid2X2,
  List,
  RefreshCw,
  Plug,
  Settings2,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Plus,
} from "lucide-react";

const CATEGORIES = [
  "All Apps",
  "CRM",
  "Communication",
  "Marketing",
  "Payments",
  "Productivity",
  "Analytics",
];

const TABS = ["All", "Connected", "Available"];

/*
  =========================================================
  FRONTEND ONLY
  =========================================================

  No backend/API/live data is connected.

  There are NO predefined/fake marketplace apps.

  Apps added through the "Add App" button exist only in
  frontend state for now.

  Backend/API integration can be connected later.
*/

export default function AppMarketplacePage() {
  const [apps, setApps] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Apps");
  const [activeTab, setActiveTab] = useState("All");
  const [view, setView] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("Recommended");

  const [selectedApp, setSelectedApp] = useState(null);
  const [connectedApps, setConnectedApps] = useState([]);

  const [showAddApp, setShowAddApp] = useState(false);

  /*
    =========================================================
    FILTERED APPS
  =========================================================
  */

  const filteredApps = useMemo(() => {
    let result = [...apps];

    // Category
    if (category !== "All Apps") {
      result = result.filter(
        (app) => app.category === category
      );
    }

    // Search
    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter(
        (app) =>
          app.name?.toLowerCase().includes(query) ||
          app.category?.toLowerCase().includes(query) ||
          app.description?.toLowerCase().includes(query)
      );
    }

    // Connected
    if (activeTab === "Connected") {
      result = result.filter((app) =>
        connectedApps.includes(app.id)
      );
    }

    // Available
    if (activeTab === "Available") {
      result = result.filter(
        (app) => !connectedApps.includes(app.id)
      );
    }

    // Sorting
    if (sortBy === "Name") {
      result.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    }

    if (sortBy === "Rating") {
      result.sort(
        (a, b) => (b.rating || 0) - (a.rating || 0)
      );
    }

    return result;
  }, [
    apps,
    search,
    category,
    activeTab,
    connectedApps,
    sortBy,
  ]);

  /*
    =========================================================
    ADD APP
  =========================================================
  */

  const handleAddApp = (newApp) => {
    setApps((current) => [...current, newApp]);
    setShowAddApp(false);
  };

  /*
    =========================================================
    CONNECT / DISCONNECT
  =========================================================
  */

  const toggleConnection = (appId) => {
    setConnectedApps((current) => {
      if (current.includes(appId)) {
        return current.filter((id) => id !== appId);
      }

      return [...current, appId];
    });
  };

  /*
    =========================================================
    CLEAR FILTERS
  =========================================================
  */

  const clearFilters = () => {
    setSearch("");
    setCategory("All Apps");
    setActiveTab("All");
    setSortBy("Recommended");
  };

  /*
    =========================================================
    CONNECTION STATUS
  =========================================================
  */

  const isConnected = (appId) =>
    connectedApps.includes(appId);

  /*
    =========================================================
    TAB COUNT
  =========================================================
  */

  const tabCount = (tab) => {
    if (tab === "All") {
      return apps.length;
    }

    if (tab === "Connected") {
      return connectedApps.filter((id) =>
        apps.some((app) => app.id === id)
      ).length;
    }

    return Math.max(
      apps.length -
        connectedApps.filter((id) =>
          apps.some((app) => app.id === id)
        ).length,
      0
    );
  };

  /*
    =========================================================
    RETURN
  =========================================================
  */

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f8fafc] text-[#26344d]">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="mb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Heading */}
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <span>Settings</span>

                <span>/</span>

                <span className="text-slate-700">
                  App Marketplace
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[#171B3A] sm:text-3xl">
                App Marketplace
              </h1>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]">
                Connect the tools you already use and extend
                your workspace.
              </p>
            </div>

            {/* Header Buttons */}
            <div className="flex flex-wrap items-center gap-2">

              {/* Add App */}
              <button
                type="button"
                onClick={() => setShowAddApp(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                <Plus size={17} />
                Add App
              </button>

              {/* Filters */}
              <button
                type="button"
                onClick={() =>
                  setShowFilters((value) => !value)
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <SlidersHorizontal size={17} />

                {showFilters
                  ? "Hide Filters"
                  : "Filters"}
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            SEARCH TOOLBAR
        ================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

            {/* Search */}
            <div className="relative w-full xl:max-w-[520px]">

              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search apps..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

              {/* Category */}
              <div className="relative">

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="h-11 min-w-[170px] appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {CATEGORIES.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              {/* View switcher */}
              <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 p-1">

                <button
                  type="button"
                  onClick={() => setView("grid")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                    view === "grid"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid2X2 size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => setView("list")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                    view === "list"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>

              </div>
            </div>
          </div>

          {/* =================================================
              FILTER PANEL
          ================================================== */}

          {showFilters && (
            <div className="mt-4 border-t border-slate-100 pt-4">

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Sort apps
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Choose how marketplace results should
                    be displayed.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">

                  {[
                    "Recommended",
                    "Name",
                    "Rating",
                  ].map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setSortBy(item)}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                        sortBy === item
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
                      }`}
                    >
                      {item}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <RefreshCw size={13} />
                    Reset
                  </button>

                </div>
              </div>
            </div>
          )}
        </div>

        {/* =================================================
            TABS
        ================================================== */}

        <div className="mt-5 flex flex-col gap-3 border-b border-slate-200 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex gap-5 overflow-x-auto">

            {TABS.map((tab) => {
              const count = tabCount(tab);

              return (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative whitespace-nowrap pb-3 text-sm font-semibold transition ${
                    activeTab === tab
                      ? "text-blue-600"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}

                  <span
                    className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${
                      activeTab === tab
                        ? "bg-blue-100 text-blue-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>

                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600" />
                  )}
                </button>
              );
            })}

          </div>

          <p className="pb-3 text-xs text-slate-400">
            {filteredApps.length} result
            {filteredApps.length === 1 ? "" : "s"}
          </p>
        </div>

        {/* =================================================
            CONTENT
        ================================================== */}

        <main className="pb-12 pt-5">

          {filteredApps.length > 0 ? (

            view === "grid" ? (

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

                {filteredApps.map((app) => (
                  <AppCard
                    key={app.id}
                    app={app}
                    connected={isConnected(app.id)}
                    onConnect={() =>
                      toggleConnection(app.id)
                    }
                    onDetails={() =>
                      setSelectedApp(app)
                    }
                  />
                ))}

              </div>

            ) : (

              <div className="space-y-3">

                {filteredApps.map((app) => (
                  <AppListItem
                    key={app.id}
                    app={app}
                    connected={isConnected(app.id)}
                    onConnect={() =>
                      toggleConnection(app.id)
                    }
                    onDetails={() =>
                      setSelectedApp(app)
                    }
                  />
                ))}

              </div>
            )

          ) : (

            <EmptyState
              hasFilters={
                Boolean(search.trim()) ||
                category !== "All Apps" ||
                activeTab !== "All"
              }
              onClear={clearFilters}
              onAdd={() => setShowAddApp(true)}
            />

          )}
        </main>
      </div>

      {/* =================================================
          DETAILS MODAL
      ================================================== */}

      {selectedApp && (
        <AppDetailsModal
          app={selectedApp}
          connected={isConnected(selectedApp.id)}
          onConnect={() =>
            toggleConnection(selectedApp.id)
          }
          onClose={() => setSelectedApp(null)}
        />
      )}

      {/* =================================================
          ADD APP MODAL
      ================================================== */}

      {showAddApp && (
        <AddAppModal
          onClose={() => setShowAddApp(false)}
          onAdd={handleAddApp}
        />
      )}
    </div>
  );
}

/* =========================================================
   APP CARD
========================================================= */

function AppCard({
  app,
  connected,
  onConnect,
  onDetails,
}) {
  return (
    <div className="group flex min-h-[285px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">

      {/* Top */}
      <div className="flex items-start justify-between gap-3">

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold ${
            app.iconClass ||
            "bg-blue-50 text-blue-600"
          }`}
        >
          {app.icon || app.name?.charAt(0)}
        </div>

        {connected && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
            <CheckCircle2 size={11} />
            Connected
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-5">

        <div className="flex items-center gap-2">

          <h3 className="text-base font-bold text-[#171B3A]">
            {app.name}
          </h3>

          {connected && (
            <CheckCircle2
              size={16}
              className="text-emerald-500"
            />
          )}
        </div>

        <p className="mt-1 text-xs font-medium text-blue-600">
          {app.category}
        </p>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
          {app.description}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-auto pt-5">

        <div className="mb-4 flex items-center justify-end">

          <button
            type="button"
            onClick={onDetails}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition hover:text-blue-600"
          >
            Details
            <ArrowRight size={13} />
          </button>

        </div>

        <button
          type="button"
          onClick={onConnect}
          className={`flex h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold transition ${
            connected
              ? "border border-slate-200 bg-slate-50 text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              : "bg-blue-600 text-white shadow-sm hover:-translate-y-0.5 hover:bg-blue-700"
          }`}
        >
          {connected ? (
            <>
              <CheckCircle2 size={16} />
              Connected
            </>
          ) : (
            <>
              <Plug size={16} />
              Connect
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   LIST ITEM
========================================================= */

function AppListItem({
  app,
  connected,
  onConnect,
  onDetails,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md lg:flex-row lg:items-center">

      {/* Icon */}
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-bold ${
          app.iconClass ||
          "bg-blue-50 text-blue-600"
        }`}
      >
        {app.icon || app.name?.charAt(0)}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">

        <div className="flex flex-wrap items-center gap-2">

          <h3 className="font-bold text-[#171B3A]">
            {app.name}
          </h3>

          {connected && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
              <CheckCircle2 size={11} />
              Connected
            </span>
          )}
        </div>

        <p className="mt-1 text-xs font-medium text-blue-600">
          {app.category}
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {app.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">

        <button
          type="button"
          onClick={onDetails}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          Details
          <ArrowRight size={14} />
        </button>

        <button
          type="button"
          onClick={onConnect}
          className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition ${
            connected
              ? "border border-slate-200 bg-slate-50 text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {connected ? (
            <>
              <CheckCircle2 size={16} />
              Connected
            </>
          ) : (
            <>
              <Plug size={16} />
              Connect
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  hasFilters,
  onClear,
  onAdd,
}) {
  return (
    <div className="flex min-h-[520px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <Plug size={27} />
      </div>

      <h2 className="mt-5 text-xl font-bold text-[#171B3A]">
        {hasFilters
          ? "No apps match your filters"
          : "No apps available yet"}
      </h2>

      <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
        {hasFilters
          ? "Try changing your search or category filters."
          : "No marketplace apps have been added yet. Add an app to start building your marketplace."}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">

        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <RefreshCw size={15} />
            Clear Filters
          </button>
        )}

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          <Plus size={16} />
          Add App
        </button>

      </div>
    </div>
  );
}

/* =========================================================
   DETAILS MODAL
========================================================= */

function AppDetailsModal({
  app,
  connected,
  onConnect,
  onClose,
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="my-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 p-5 sm:p-6">

          <div className="flex items-center gap-4">

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold ${
                app.iconClass ||
                "bg-blue-50 text-blue-600"
              }`}
            >
              {app.icon || app.name?.charAt(0)}
            </div>

            <div>

              <div className="flex items-center gap-2">

                <h2 className="text-xl font-bold text-[#171B3A]">
                  {app.name}
                </h2>

                {connected && (
                  <CheckCircle2
                    size={17}
                    className="text-emerald-500"
                  />
                )}

              </div>

              <p className="mt-1 text-sm text-blue-600">
                {app.category}
              </p>

            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X size={19} />
          </button>

        </div>

        {/* Body */}
        <div className="max-h-[65vh] overflow-y-auto p-5 sm:p-6">

          <p className="text-sm leading-7 text-slate-600">
            {app.longDescription ||
              app.description ||
              "Integration details are available here."}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

              <ShieldCheck
                size={17}
                className="mb-2 text-emerald-500"
              />

              <p className="text-xs text-slate-400">
                Security
              </p>

              <p className="mt-1 font-bold text-slate-800">
                Configurable
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

              <Zap
                size={17}
                className="mb-2 text-blue-500"
              />

              <p className="text-xs text-slate-400">
                Setup
              </p>

              <p className="mt-1 font-bold text-slate-800">
                Quick
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

              <Settings2
                size={17}
                className="mb-2 text-slate-500"
              />

              <p className="text-xs text-slate-400">
                Status
              </p>

              <p className="mt-1 font-bold text-slate-800">
                {connected
                  ? "Connected"
                  : "Available"}
              </p>
            </div>

          </div>

          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">

            <div className="flex gap-3">

              <Settings2
                size={18}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <div>

                <p className="text-sm font-bold text-blue-900">
                  Integration settings
                </p>

                <p className="mt-1 text-xs leading-5 text-blue-700">
                  Connection and configuration options will be
                  connected to the backend later.
                </p>

              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 p-5 sm:flex-row sm:justify-end sm:p-6">

          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onConnect}
            className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition ${
              connected
                ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {connected ? (
              <>
                <Check size={16} />
                Disconnect
              </>
            ) : (
              <>
                <Plug size={16} />
                Connect App
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ADD APP MODAL
========================================================= */

function AddAppModal({
  onClose,
  onAdd,
}) {
  const [form, setForm] = useState({
    name: "",
    category: "CRM",
    description: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const description = form.description.trim();

    if (!name) {
      setError("App name is required.");
      return;
    }

    if (!description) {
      setError("App description is required.");
      return;
    }

    const id = `${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}-${Date.now()}`;

    const newApp = {
      id,
      name,
      category: form.category,
      description,
      longDescription: description,
      icon: name.charAt(0).toUpperCase(),
      iconClass: "bg-blue-50 text-blue-600",
      popular: false,
    };

    onAdd(newApp);
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">

          <div>

            <h2 className="text-xl font-bold text-[#171B3A]">
              Add App
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add an app to your marketplace workspace.
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X size={19} />
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="space-y-5 p-5 sm:p-6">

            {/* Name */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                App Name
              </label>

              <input
                type="text"
                value={form.name}
                onChange={(event) => {
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }));

                  setError("");
                }}
                placeholder="Enter app name"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

            </div>

            {/* Category */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Category
              </label>

              <div className="relative">

                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {CATEGORIES
                    .filter(
                      (item) => item !== "All Apps"
                    )
                    .map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>
            </div>

            {/* Description */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description
              </label>

              <textarea
                value={form.description}
                onChange={(event) => {
                  setForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }));

                  setError("");
                }}
                placeholder="Describe what this app does..."
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {/* Frontend info */}
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

              <div className="flex gap-3">

                <Settings2
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>

                  <p className="text-sm font-bold text-blue-900">
                    Frontend only
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    This app is currently stored in frontend
                    state only. Backend persistence will be
                    connected later.
                  </p>

                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-2 border-t border-slate-100 p-5 sm:flex-row sm:justify-end sm:p-6">

            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              <Plus size={16} />
              Add App
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}