"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  ChevronDown,
  ChevronRight,
  Copy,
  Filter,
  FolderPlus,
  LayoutGrid,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Trash2,
  Workflow,
  X,
} from "lucide-react";

export default function WorkflowsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [workflowName, setWorkflowName] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [selectedIds, setSelectedIds] = useState([]);

  /*
   * FRONTEND ONLY
   *
   * No fake/demo workflow records.
   * Real workflow records will be loaded from the backend later.
   */
  const workflows = [];

  const filteredWorkflows = useMemo(() => {
    if (!search.trim()) {
      return workflows;
    }

    const query = search.trim().toLowerCase();

    return workflows.filter((workflow) =>
      String(workflow.name || "")
        .toLowerCase()
        .includes(query)
    );
  }, [search, workflows]);

  const allSelected =
    filteredWorkflows.length > 0 &&
    filteredWorkflows.every((workflow) =>
      selectedIds.includes(workflow.id)
    );

  function handleSelectAll() {
    if (allSelected) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(
      filteredWorkflows.map((workflow) => workflow.id)
    );
  }

  function handleSelect(id) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  }

  function closeFolderModal() {
    setFolderName("");
    setShowFolderModal(false);
  }

  function closeWorkflowModal() {
    setWorkflowName("");
    setShowWorkflowModal(false);
  }

  function handleFolderSubmit(event) {
    event.preventDefault();

    if (!folderName.trim()) {
      return;
    }

    /*
     * Backend integration will be added later.
     * Do not create a fake folder.
     */

    closeFolderModal();
  }

  function handleWorkflowSubmit(event) {
    event.preventDefault();

    if (!workflowName.trim()) {
      return;
    }

    /*
     * Backend integration will be added later.
     * Do not create a fake workflow.
     */

    closeWorkflowModal();
  }

  return (
    <div
      className="min-h-full bg-white text-slate-800"
      onClick={() => setOpenMenu(null)}
    >
      {/* =====================================================
          AUTOMATION HEADER / NAVIGATION
      ===================================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="flex min-h-[64px] items-center gap-7 overflow-x-auto px-5 lg:px-6">
          <div className="shrink-0 text-[16px] font-semibold text-[#171B3A]">
            Automation
          </div>

          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`relative flex min-h-[64px] shrink-0 items-center text-[13px] font-medium transition ${
              activeTab === "all"
                ? "text-[#2563EB]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Workflows

            {activeTab === "all" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#2563EB]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              // Settings functionality will be connected later.
            }}
            className="flex shrink-0 items-center gap-2 text-[13px] font-medium text-slate-500 transition hover:text-slate-800"
          >
            <Settings2 size={15} strokeWidth={1.8} />
            Global Workflow Settings
          </button>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="px-4 pb-10 pt-6 sm:px-6">
        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#171B3A]">
              Workflows list
            </h1>

            <p className="mt-1 text-[12px] text-slate-500">
              Create and manage your business automation workflows.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Create folder */}
            <button
              type="button"
              onClick={() => setShowFolderModal(true)}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 text-[12px] font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98]"
            >
              <FolderPlus size={15} strokeWidth={1.8} />
              Create folder
            </button>

            {/* Build using AI */}
            <button
              type="button"
              onClick={() => setShowWorkflowModal(true)}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3.5 text-[12px] font-medium text-violet-700 shadow-sm transition hover:bg-violet-100 active:scale-[0.98]"
            >
              <Sparkles size={15} strokeWidth={1.8} />
              Build using AI
            </button>

            {/* Create workflow */}
            <button
              type="button"
              onClick={() => setShowWorkflowModal(true)}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#2563EB] px-4 text-[12px] font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] active:scale-[0.98]"
            >
              <Plus size={16} strokeWidth={2} />
              Create workflow
            </button>
          </div>
        </div>

        {/* ===================================================
            TABS
        =================================================== */}

        <div className="mb-4 border-b border-slate-200">
          <div className="flex items-center gap-6 overflow-x-auto">
            {[
              {
                id: "all",
                label: "All workflows",
              },
              {
                id: "needs-review",
                label: "Needs review",
              },
              {
                id: "deleted",
                label: "Deleted",
              },
            ].map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedIds([]);
                  }}
                  className={`relative flex min-h-[38px] shrink-0 items-center text-[12px] font-medium transition ${
                    isActive
                      ? "text-[#2563EB]"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab.label}

                  {tab.id === "needs-review" && (
                    <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] text-slate-500">
                      0
                    </span>
                  )}

                  {isActive && (
                    <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] rounded-full bg-[#2563EB]" />
                  )}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setShowWorkflowModal(true)}
              className="flex min-h-[38px] shrink-0 items-center gap-1.5 text-[12px] font-medium text-slate-500 transition hover:text-slate-800"
            >
              <Plus size={14} strokeWidth={1.8} />
              New smart list
            </button>
          </div>
        </div>

        {/* ===================================================
            TOOLBAR
        =================================================== */}

        <div className="mb-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setShowFilters((current) => !current)
                }
                className={`inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[11px] font-medium shadow-sm transition ${
                  showFilters
                    ? "border-blue-200 bg-blue-50 text-[#2563EB]"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Filter size={13} strokeWidth={1.8} />
                Advanced filters
              </button>

              {selectedIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedIds([])}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-medium text-slate-500 shadow-sm hover:bg-slate-50"
                >
                  <X size={13} />
                  Clear selection
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* List view */}
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex h-8 w-9 items-center justify-center rounded-lg border shadow-sm transition ${
                  viewMode === "list"
                    ? "border-blue-200 bg-blue-50 text-[#2563EB]"
                    : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                }`}
                title="List view"
              >
                <List size={15} strokeWidth={1.8} />
              </button>

              {/* Grid view */}
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex h-8 w-9 items-center justify-center rounded-lg border shadow-sm transition ${
                  viewMode === "grid"
                    ? "border-blue-200 bg-blue-50 text-[#2563EB]"
                    : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                }`}
                title="Grid view"
              >
                <LayoutGrid size={14} strokeWidth={1.8} />
              </button>

              {/* Search */}
              <div className="flex h-8 w-full items-center rounded-lg border border-slate-200 bg-white px-2.5 shadow-sm transition focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-100 sm:w-[220px]">
                <Search
                  size={14}
                  strokeWidth={1.8}
                  className="mr-2 shrink-0 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search workflows"
                  className="min-w-0 flex-1 bg-transparent text-[11px] text-slate-700 outline-none placeholder:text-slate-400"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="flex h-5 w-5 items-center justify-center rounded text-slate-400 hover:bg-slate-100"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            FILTERS
        =================================================== */}

        {showFilters && (
          <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-[13px] font-semibold text-[#171B3A]">
                  Advanced filters
                </h2>

                <p className="mt-1 text-[11px] text-slate-500">
                  Filters will work with real workflow data after
                  backend integration.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={15} />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <FilterSelect
                label="Status"
                options={[
                  "All statuses",
                  "Published",
                  "Draft",
                  "Paused",
                ]}
              />

              <FilterSelect
                label="Created by"
                options={["Everyone"]}
              />

              <FilterSelect
                label="Date"
                options={[
                  "Any time",
                  "Today",
                  "Last 7 days",
                  "Last 30 days",
                ]}
              />
            </div>
          </div>
        )}

        {/* ===================================================
            SELECTED BAR
        =================================================== */}

        {selectedIds.length > 0 && (
          <div className="mb-3 flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50 px-4 py-2.5">
            <span className="text-[11px] font-medium text-blue-700">
              {selectedIds.length} selected
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-7 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 text-[10px] font-medium text-slate-600 hover:bg-slate-50"
              >
                <Archive size={12} />
                Archive
              </button>

              <button
                type="button"
                className="inline-flex h-7 items-center gap-1.5 rounded-md border border-red-200 bg-white px-2.5 text-[10px] font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 size={12} />
                Delete
              </button>

              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="text-[10px] font-medium text-slate-500 hover:text-slate-700"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* ===================================================
            WORKFLOWS TABLE / EMPTY STATE
        =================================================== */}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          {/* Table header */}
          {viewMode === "list" && (
            <div className="hidden min-w-[1050px] grid-cols-[48px_minmax(240px,1.5fr)_120px_125px_125px_155px_155px_70px] items-center border-b border-slate-200 bg-slate-50/70 px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-slate-500 lg:grid">
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  disabled={filteredWorkflows.length === 0}
                  onChange={handleSelectAll}
                  className="h-3.5 w-3.5 rounded border-slate-300 accent-[#2563EB]"
                />
              </div>

              <div>Name</div>
              <div>Status</div>
              <div>Total enrolled</div>
              <div>Active enrolled</div>
              <div>Last updated</div>
              <div>Created on</div>
              <div>Stats</div>
            </div>
          )}

          {/* =================================================
              NO DATA
          ================================================= */}

          {filteredWorkflows.length === 0 && (
            <EmptyState
              search={search}
              activeTab={activeTab}
              onClearSearch={() => setSearch("")}
              onCreateWorkflow={() =>
                setShowWorkflowModal(true)
              }
            />
          )}

          {/* =================================================
              REAL BACKEND DATA WILL RENDER HERE
          ================================================= */}

          {filteredWorkflows.map((workflow) => (
            <WorkflowRow
              key={workflow.id}
              workflow={workflow}
              selected={selectedIds.includes(workflow.id)}
              openMenu={openMenu === workflow.id}
              onSelect={() => handleSelect(workflow.id)}
              onOpenMenu={(event) => {
                event.stopPropagation();

                setOpenMenu((current) =>
                  current === workflow.id
                    ? null
                    : workflow.id
                );
              }}
              viewMode={viewMode}
            />
          ))}
        </div>
      </main>

      {/* =====================================================
          CREATE FOLDER MODAL
      ===================================================== */}

      {showFolderModal && (
        <ModalOverlay onClose={closeFolderModal}>
          <div className="w-full max-w-[430px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
                  <FolderPlus size={18} />
                </div>

                <div>
                  <h2 className="text-[14px] font-semibold text-[#171B3A]">
                    Create folder
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Organize your workflows into folders.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeFolderModal}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleFolderSubmit}>
              <div className="px-5 py-5">
                <label
                  htmlFor="folder-name"
                  className="mb-2 block text-[11px] font-medium text-slate-600"
                >
                  Folder name
                </label>

                <input
                  id="folder-name"
                  type="text"
                  value={folderName}
                  onChange={(event) =>
                    setFolderName(event.target.value)
                  }
                  placeholder="Enter folder name"
                  autoFocus
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-[12px] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-3">
                <button
                  type="button"
                  onClick={closeFolderModal}
                  className="h-9 rounded-lg border border-slate-200 bg-white px-4 text-[11px] font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!folderName.trim()}
                  className="h-9 rounded-lg bg-[#2563EB] px-4 text-[11px] font-semibold text-white hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Create folder
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* =====================================================
          CREATE WORKFLOW MODAL
      ===================================================== */}

      {showWorkflowModal && (
        <ModalOverlay onClose={closeWorkflowModal}>
          <div className="max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
                  <Workflow size={18} />
                </div>

                <div>
                  <h2 className="text-[14px] font-semibold text-[#171B3A]">
                    Create workflow
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Configure your automation workflow.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeWorkflowModal}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleWorkflowSubmit}>
              <div className="space-y-5 px-5 py-5">
                <div>
                  <label
                    htmlFor="workflow-name"
                    className="mb-2 block text-[11px] font-medium text-slate-600"
                  >
                    Workflow name
                  </label>

                  <input
                    id="workflow-name"
                    type="text"
                    value={workflowName}
                    onChange={(event) =>
                      setWorkflowName(event.target.value)
                    }
                    placeholder="Enter workflow name"
                    autoFocus
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-[12px] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="workflow-trigger"
                    className="mb-2 block text-[11px] font-medium text-slate-600"
                  >
                    Starting trigger
                  </label>

                  <div className="relative">
                    <select
                      id="workflow-trigger"
                      defaultValue=""
                      className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-[12px] text-slate-500 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="" disabled>
                        Select a trigger
                      </option>

                      <option value="contact-created">
                        Contact created
                      </option>

                      <option value="form-submitted">
                        Form submitted
                      </option>

                      <option value="appointment-booked">
                        Appointment booked
                      </option>

                      <option value="tag-added">
                        Tag added
                      </option>
                    </select>

                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-medium text-slate-600">
                    Workflow actions
                  </label>

                  <div className="grid gap-2 sm:grid-cols-2">
                    <ActionCard
                      icon={<Sparkles size={15} />}
                      title="AI action"
                      description="Use an AI-powered step"
                    />

                    <ActionCard
                      icon={<Plus size={15} />}
                      title="Add action"
                      description="Add an automation action"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm">
                      <Sparkles size={16} />
                    </div>

                    <div>
                      <h3 className="text-[12px] font-semibold text-violet-900">
                        Build with AI
                      </h3>

                      <p className="mt-1 text-[10px] leading-4 text-violet-700/80">
                        AI workflow generation will be connected
                        when the backend AI service is available.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-3">
                <button
                  type="button"
                  onClick={closeWorkflowModal}
                  className="h-9 rounded-lg border border-slate-200 bg-white px-4 text-[11px] font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!workflowName.trim()}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 text-[11px] font-semibold text-white hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus size={14} />
                  Create workflow
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}

/* =============================================================
   FILTER SELECT
============================================================= */

function FilterSelect({ label, options }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium text-slate-600">
        {label}
      </span>

      <select className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-[12px] text-slate-600 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

/* =============================================================
   EMPTY STATE
============================================================= */

function EmptyState({
  search,
  activeTab,
  onClearSearch,
  onCreateWorkflow,
}) {
  const hasSearch = Boolean(search.trim());

  let title = "No workflows yet";
  let description =
    "Create your first workflow to start automating your business processes.";

  if (hasSearch) {
    title = "No workflows found";
    description = `No workflow matches "${search}". Try a different search term.`;
  } else if (activeTab === "needs-review") {
    title = "No workflows need review";
    description =
      "Workflows requiring review will appear here.";
  } else if (activeTab === "deleted") {
    title = "No deleted workflows";
    description = "Deleted workflows will appear here.";
  }

  return (
    <div className="flex min-h-[390px] items-center justify-center px-6 py-12">
      <div className="flex max-w-[440px] flex-col items-center text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
          {hasSearch ? (
            <Search size={24} className="text-slate-400" />
          ) : (
            <Workflow size={24} className="text-slate-400" />
          )}
        </div>

        <h2 className="text-[17px] font-semibold text-[#171B3A]">
          {title}
        </h2>

        <p className="mt-2 max-w-[390px] text-[12px] leading-5 text-slate-500">
          {description}
        </p>

        <div className="mt-5 flex items-center gap-2">
          {hasSearch && (
            <button
              type="button"
              onClick={onClearSearch}
              className="h-9 rounded-lg border border-slate-300 bg-white px-4 text-[12px] font-medium text-slate-600 hover:bg-slate-50"
            >
              Clear search
            </button>
          )}

          {activeTab === "all" && (
            <button
              type="button"
              onClick={onCreateWorkflow}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#2563EB] px-4 text-[12px] font-semibold text-white hover:bg-[#1D4ED8]"
            >
              <Plus size={15} />
              Create workflow
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   WORKFLOW ROW
============================================================= */

function WorkflowRow({
  workflow,
  selected,
  openMenu,
  onSelect,
  onOpenMenu,
  viewMode,
}) {
  if (viewMode === "grid") {
    return (
      <div className="border-b border-slate-100 p-4">
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected}
                onChange={onSelect}
                className="h-3.5 w-3.5 accent-[#2563EB]"
              />

              <span className="text-[12px] font-medium text-slate-700">
                {workflow.name}
              </span>
            </div>

            <button
              type="button"
              onClick={onOpenMenu}
              className="text-slate-400"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-slate-100">
      <div className="hidden min-w-[1050px] grid-cols-[48px_minmax(240px,1.5fr)_120px_125px_125px_155px_155px_70px] items-center px-3 py-3 lg:grid">
        <div className="flex justify-center">
          <input
            type="checkbox"
            checked={selected}
            onChange={onSelect}
            className="h-3.5 w-3.5 accent-[#2563EB]"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border border-slate-300" />

          <span className="truncate text-[12px] font-medium text-slate-700">
            {workflow.name}
          </span>

          <ChevronRight size={13} className="text-slate-400" />
        </div>

        <div className="text-[11px] text-slate-500">
          {workflow.status || "—"}
        </div>

        <div className="text-[11px] text-slate-500">
          {workflow.totalEnrolled ?? "—"}
        </div>

        <div className="text-[11px] text-slate-500">
          {workflow.activeEnrolled ?? "—"}
        </div>

        <div className="text-[11px] text-slate-500">
          {workflow.updatedAt || "—"}
        </div>

        <div className="text-[11px] text-slate-500">
          {workflow.createdAt || "—"}
        </div>

        <div className="relative flex justify-end">
          <button
            type="button"
            onClick={onOpenMenu}
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100"
          >
            <MoreHorizontal size={16} />
          </button>

          {openMenu && (
            <div
              className="absolute right-0 top-9 z-30 w-40 rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <MenuButton
                icon={<ExternalIcon />}
                label="Open workflow"
              />

              <MenuButton
                icon={<Copy size={13} />}
                label="Duplicate"
              />

              <MenuButton
                icon={<Archive size={13} />}
                label="Archive"
              />

              <div className="my-1 border-t border-slate-100" />

              <MenuButton
                danger
                icon={<Trash2 size={13} />}
                label="Delete"
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-start gap-3 p-4 lg:hidden">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="mt-1 h-3.5 w-3.5 accent-[#2563EB]"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border border-slate-300" />

            <span className="truncate text-[12px] font-medium text-slate-700">
              {workflow.name}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 text-[10px]">
            <div>
              <span className="block text-slate-400">
                Status
              </span>
              <span className="text-slate-600">
                {workflow.status || "—"}
              </span>
            </div>

            <div>
              <span className="block text-slate-400">
                Updated
              </span>
              <span className="text-slate-600">
                {workflow.updatedAt || "—"}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenMenu}
          className="text-slate-400"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}

/* =============================================================
   MENU BUTTON
============================================================= */

function MenuButton({
  icon,
  label,
  danger = false,
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[11px] font-medium transition ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

/* =============================================================
   ACTION CARD
============================================================= */

function ActionCard({
  icon,
  title,
  description,
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-blue-200 hover:bg-blue-50/40"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
        {icon}
      </span>

      <span>
        <span className="block text-[11px] font-medium text-slate-700">
          {title}
        </span>

        <span className="mt-0.5 block text-[9px] text-slate-400">
          {description}
        </span>
      </span>
    </button>
  );
}

/* =============================================================
   MODAL OVERLAY
============================================================= */

function ModalOverlay({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {children}
    </div>
  );
}

/* =============================================================
   SIMPLE EXTERNAL ICON
============================================================= */

function ExternalIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3h7v7" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  );
}