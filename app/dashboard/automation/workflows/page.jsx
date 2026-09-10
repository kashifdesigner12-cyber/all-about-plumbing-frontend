"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  ChevronDown,
  ChevronRight,
  Clock3,
  Filter,
  FolderPlus,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

import WorkflowsHeader from "./WorkflowsHeader";
import WorkflowsTabs from "./WorkflowsTabs";
import WorkflowsToolbar from "./WorkflowsToolbar";
import WorkflowsEmptyState from "./WorkflowsEmptyState";
import CreateFolderModal from "./CreateFolderModal";
import CreateWorkflowModal from "./CreateWorkflowModal";

export default function WorkflowsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [workflowName, setWorkflowName] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  /*
   * FRONTEND ONLY
   *
   * No workflow records are hardcoded here.
   * Real records will come from the backend/API later.
   */
  const workflows = [];

  const filteredWorkflows = useMemo(() => {
    if (!search.trim()) {
      return workflows;
    }

    const query = search.toLowerCase();

    return workflows.filter((workflow) =>
      workflow.name?.toLowerCase().includes(query)
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

    setSelectedIds(filteredWorkflows.map((workflow) => workflow.id));
  }

  function handleSelectWorkflow(id) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  }

  function handleCreateFolder() {
    if (!folderName.trim()) {
      return;
    }

    /*
     * Backend integration will be added later.
     * Do not fake-save the folder.
     */

    setFolderName("");
    setShowFolderModal(false);
  }

  function handleCreateWorkflow() {
    if (!workflowName.trim()) {
      return;
    }

    /*
     * Backend integration will be added later.
     * Do not fake-create the workflow.
     */

    setWorkflowName("");
    setShowWorkflowModal(false);
  }

  return (
    <div
      className="min-h-full bg-white text-slate-800"
      onClick={() => setOpenMenu(null)}
    >
      {/* =========================================================
          AUTOMATION TOP NAVIGATION
      ========================================================= */}

      <div className="border-b border-slate-200 bg-white">
        <div className="flex min-h-[64px] items-center gap-7 overflow-x-auto px-5 lg:px-6">
          <button
            type="button"
            className="shrink-0 text-[16px] font-semibold text-[#171B3A]"
          >
            Automation
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className="relative flex min-h-[64px] shrink-0 items-center text-[13px] font-medium text-[#2563EB]"
          >
            Workflows

            <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#2563EB]" />
          </button>

          <button
            type="button"
            className="flex shrink-0 items-center gap-2 text-[13px] font-medium text-slate-500 transition hover:text-slate-800"
          >
            <Settings2 size={15} strokeWidth={1.8} />
            Global Workflow Settings
          </button>
        </div>
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <main className="px-4 pb-10 pt-6 sm:px-6">
        {/* Header */}
        <WorkflowsHeader
          onCreateFolder={() => setShowFolderModal(true)}
          onBuildWithAI={() => setShowWorkflowModal(true)}
          onCreateWorkflow={() => setShowWorkflowModal(true)}
        />

        {/* Tabs */}
        <WorkflowsTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Toolbar */}
        <WorkflowsToolbar
          search={search}
          onSearchChange={setSearch}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters((value) => !value)}
          selectedCount={selectedIds.length}
          onClearSelection={() => setSelectedIds([])}
        />

        {/* =========================================================
            ADVANCED FILTERS
        ========================================================= */}

        {showFilters && (
          <div
            className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-[13px] font-semibold text-[#171B3A]">
                  Advanced filters
                </h2>

                <p className="mt-1 text-[11px] text-slate-500">
                  Filters will be applied to workflows returned by the
                  backend.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={15} />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <FilterField
                label="Status"
                options={[
                  "All statuses",
                  "Published",
                  "Draft",
                  "Paused",
                ]}
              />

              <FilterField
                label="Created by"
                options={["Everyone"]}
              />

              <FilterField
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

        {/* =========================================================
            SELECTION BAR
        ========================================================= */}

        {selectedIds.length > 0 && (
          <div className="mb-3 flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50 px-4 py-2.5">
            <div className="text-[12px] font-medium text-blue-700">
              {selectedIds.length} workflow
              {selectedIds.length > 1 ? "s" : ""} selected
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex h-7 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 text-[11px] font-medium text-slate-600 hover:bg-slate-50"
              >
                <Archive size={13} />
                Archive
              </button>

              <button
                type="button"
                className="flex h-7 items-center gap-1.5 rounded-md border border-red-200 bg-white px-2.5 text-[11px] font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 size={13} />
                Delete
              </button>

              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="flex h-7 items-center justify-center rounded-md px-2 text-[11px] font-medium text-slate-500 hover:bg-white"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            TABLE
        ========================================================= */}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          {/* Table header */}
          <div className="hidden min-w-[1050px] grid-cols-[48px_minmax(240px,1.5fr)_120px_125px_125px_155px_155px_70px] items-center border-b border-slate-200 bg-slate-50/70 px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-slate-500 lg:grid">
            <div className="flex justify-center">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                disabled={filteredWorkflows.length === 0}
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

          {/* =======================================================
              EMPTY STATE
          ======================================================= */}

          {filteredWorkflows.length === 0 && (
            <WorkflowsEmptyState
              search={search}
              activeTab={activeTab}
              onCreateWorkflow={() => setShowWorkflowModal(true)}
              onClearSearch={() => setSearch("")}
            />
          )}

          {/* =======================================================
              REAL BACKEND DATA WILL RENDER HERE LATER
          ======================================================= */}

          {filteredWorkflows.map((workflow) => (
            <WorkflowRow
              key={workflow.id}
              workflow={workflow}
              selected={selectedIds.includes(workflow.id)}
              openMenu={openMenu}
              onSelect={() => handleSelectWorkflow(workflow.id)}
              onMenu={(event) => {
                event.stopPropagation();

                setOpenMenu((current) =>
                  current === workflow.id ? null : workflow.id
                );
              }}
            />
          ))}
        </div>
      </main>

      {/* =========================================================
          CREATE FOLDER MODAL
      ========================================================= */}

      {showFolderModal && (
        <CreateFolderModal
          value={folderName}
          onChange={setFolderName}
          onClose={() => {
            setFolderName("");
            setShowFolderModal(false);
          }}
          onSubmit={handleCreateFolder}
        />
      )}

      {/* =========================================================
          CREATE WORKFLOW MODAL
      ========================================================= */}

      {showWorkflowModal && (
        <CreateWorkflowModal
          value={workflowName}
          onChange={setWorkflowName}
          onClose={() => {
            setWorkflowName("");
            setShowWorkflowModal(false);
          }}
          onSubmit={handleCreateWorkflow}
        />
      )}
    </div>
  );
}

/* ===============================================================
   FILTER FIELD
=============================================================== */

function FilterField({ label, options }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium text-slate-600">
        {label}
      </span>

      <div className="relative">
        <select className="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-[12px] text-slate-600 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100">
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </label>
  );
}

/* ===============================================================
   WORKFLOW ROW
=============================================================== */

function WorkflowRow({
  workflow,
  selected,
  openMenu,
  onSelect,
  onMenu,
}) {
  return (
    <div className="border-b border-slate-100 last:border-b-0">
      {/* Desktop */}
      <div className="hidden min-w-[1050px] grid-cols-[48px_minmax(240px,1.5fr)_120px_125px_125px_155px_155px_70px] items-center px-3 py-3 lg:grid">
        <div className="flex justify-center">
          <input
            type="checkbox"
            checked={selected}
            onChange={onSelect}
            className="h-3.5 w-3.5 rounded border-slate-300 accent-[#2563EB]"
          />
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <div className="h-4 w-4 shrink-0 rounded border border-slate-300" />

          <span className="truncate text-[12px] font-medium text-slate-700">
            {workflow.name}
          </span>

          <ChevronRight
            size={13}
            className="shrink-0 text-slate-400"
          />
        </div>

        <div>
          {workflow.status && (
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-600">
              {workflow.status}
            </span>
          )}
        </div>

        <div className="text-[11px] text-slate-500">
          {workflow.totalEnrolled ?? "—"}
        </div>

        <div className="text-[11px] text-slate-500">
          {workflow.activeEnrolled ?? "—"}
        </div>

        <div className="text-[11px] text-slate-500">
          {workflow.updatedAt ?? "—"}
        </div>

        <div className="text-[11px] text-slate-500">
          {workflow.createdAt ?? "—"}
        </div>

        <div className="relative flex justify-end">
          <button
            type="button"
            onClick={onMenu}
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <MoreHorizontal size={16} />
          </button>

          {openMenu === workflow.id && (
            <WorkflowActionMenu />
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-start gap-3 p-4 lg:hidden">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="mt-1 h-3.5 w-3.5 rounded border-slate-300 accent-[#2563EB]"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 shrink-0 rounded border border-slate-300" />

            <span className="truncate text-[12px] font-medium text-slate-700">
              {workflow.name}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 text-[11px]">
            <div>
              <span className="block text-slate-400">Status</span>
              <span className="text-slate-600">
                {workflow.status ?? "—"}
              </span>
            </div>

            <div>
              <span className="block text-slate-400">
                Total enrolled
              </span>
              <span className="text-slate-600">
                {workflow.totalEnrolled ?? "—"}
              </span>
            </div>

            <div>
              <span className="block text-slate-400">
                Last updated
              </span>
              <span className="text-slate-600">
                {workflow.updatedAt ?? "—"}
              </span>
            </div>

            <div>
              <span className="block text-slate-400">
                Created on
              </span>
              <span className="text-slate-600">
                {workflow.createdAt ?? "—"}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onMenu}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}

/* ===============================================================
   WORKFLOW ACTION MENU
=============================================================== */

function WorkflowActionMenu() {
  return (
    <div
      className="absolute right-0 top-9 z-30 w-40 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[11px] text-slate-600 hover:bg-slate-50"
      >
        Open workflow
      </button>

      <button
        type="button"
        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[11px] text-slate-600 hover:bg-slate-50"
      >
        Duplicate
      </button>

      <button
        type="button"
        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[11px] text-slate-600 hover:bg-slate-50"
      >
        Archive
      </button>

      <button
        type="button"
        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[11px] text-red-600 hover:bg-red-50"
      >
        Delete
      </button>
    </div>
  );
}