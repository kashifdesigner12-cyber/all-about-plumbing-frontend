"use client";

import { useMemo, useState } from "react";
import {
  FolderPlus,
  LayoutGrid,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Workflow,
  X,
} from "lucide-react";

export default function WorkflowsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");

  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);

  const [folderName, setFolderName] = useState("");
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");

  /*
   * No fake/demo workflows.
   * Backend data can be connected here later.
   */
  const workflows = [];

  const filteredWorkflows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return workflows.filter((workflow) => {
      const name = workflow?.name?.toLowerCase?.() || "";
      const description =
        workflow?.description?.toLowerCase?.() || "";
      const status = workflow?.status?.toLowerCase?.() || "";

      const matchesSearch =
        !query ||
        name.includes(query) ||
        description.includes(query);

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "active" && status === "active") ||
        (activeTab === "draft" && status !== "active");

      return matchesSearch && matchesTab;
    });
  }, [search, activeTab]);

  const handleCreateWorkflow = () => {
    setShowWorkflowModal(true);
  };

  const handleCreateFolder = () => {
    setShowFolderModal(true);
  };

  const closeFolderModal = () => {
    setShowFolderModal(false);
    setFolderName("");
  };

  const closeWorkflowModal = () => {
    setShowWorkflowModal(false);
    setWorkflowName("");
    setWorkflowDescription("");
  };

  const handleFolderSubmit = (event) => {
    event.preventDefault();

    if (!folderName.trim()) {
      return;
    }

    closeFolderModal();
  };

  const handleWorkflowSubmit = (event) => {
    event.preventDefault();

    if (!workflowName.trim()) {
      return;
    }

    closeWorkflowModal();
  };

  return (
    <div className="min-h-full bg-[#F8FAFC]">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Workflows
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create and manage your automation workflows.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCreateFolder}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <FolderPlus size={17} />
                New Folder
              </button>

              <button
                type="button"
                onClick={handleCreateWorkflow}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <Plus size={17} />
                New Workflow
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          TABS
      ===================================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="flex gap-6 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`border-b-2 px-1 py-4 text-sm font-semibold transition ${
              activeTab === "all"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            All Workflows
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("active")}
            className={`border-b-2 px-1 py-4 text-sm font-semibold transition ${
              activeTab === "active"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Active
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("draft")}
            className={`border-b-2 px-1 py-4 text-sm font-semibold transition ${
              activeTab === "draft"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Drafts
          </button>
        </div>
      </div>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search workflows..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                view === "list"
                  ? "border-blue-200 bg-blue-50 text-blue-600"
                  : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
              }`}
              aria-label="List view"
              aria-pressed={view === "list"}
            >
              <List size={17} />

              <span className="hidden sm:inline">
                List
              </span>
            </button>

            <button
              type="button"
              onClick={() => setView("grid")}
              className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                view === "grid"
                  ? "border-blue-200 bg-blue-50 text-blue-600"
                  : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
              }`}
              aria-label="Grid view"
              aria-pressed={view === "grid"}
            >
              <LayoutGrid size={17} />

              <span className="hidden sm:inline">
                Grid
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="px-4 pb-8 sm:px-6 lg:px-8">
        {filteredWorkflows.length === 0 ? (
          <EmptyState
            search={search}
            onCreateWorkflow={handleCreateWorkflow}
            onCreateFolder={handleCreateFolder}
          />
        ) : view === "list" ? (
          <WorkflowList workflows={filteredWorkflows} />
        ) : (
          <WorkflowGrid workflows={filteredWorkflows} />
        )}
      </main>

      {/* =====================================================
          CREATE FOLDER MODAL
      ===================================================== */}

      {showFolderModal && (
        <Modal
          title="Create Folder"
          onClose={closeFolderModal}
        >
          <form
            onSubmit={handleFolderSubmit}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="folder-name"
                className="mb-2 block text-sm font-semibold text-slate-700"
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
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={closeFolderModal}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!folderName.trim()}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create Folder
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* =====================================================
          CREATE WORKFLOW MODAL
      ===================================================== */}

      {showWorkflowModal && (
        <Modal
          title="Create Workflow"
          onClose={closeWorkflowModal}
        >
          <form
            onSubmit={handleWorkflowSubmit}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="workflow-name"
                className="mb-2 block text-sm font-semibold text-slate-700"
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
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="workflow-description"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Description
              </label>

              <textarea
                id="workflow-description"
                rows={4}
                value={workflowDescription}
                onChange={(event) =>
                  setWorkflowDescription(event.target.value)
                }
                placeholder="Enter workflow description"
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={closeWorkflowModal}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!workflowName.trim()}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create Workflow
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  search,
  onCreateWorkflow,
  onCreateFolder,
}) {
  return (
    <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">
      <div className="mx-auto max-w-md px-6 py-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Workflow size={30} />
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900">
          {search
            ? "No workflows found"
            : "No workflows yet"}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {search
            ? "Try changing your search and check again."
            : "Create your first workflow or organize your workflows into folders."}
        </p>

        {!search && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={onCreateWorkflow}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={17} />
              New Workflow
            </button>

            <button
              type="button"
              onClick={onCreateFolder}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <FolderPlus size={17} />
              New Folder
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   WORKFLOW LIST
========================================================= */

function WorkflowList({ workflows }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Workflow
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Updated
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {workflows.map((workflow) => (
              <WorkflowRow
                key={workflow.id || workflow._id}
                workflow={workflow}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================
   WORKFLOW GRID
========================================================= */

function WorkflowGrid({ workflows }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {workflows.map((workflow) => (
        <WorkflowCard
          key={workflow.id || workflow._id}
          workflow={workflow}
        />
      ))}
    </div>
  );
}

/* =========================================================
   WORKFLOW ROW
========================================================= */

function WorkflowRow({ workflow }) {
  const isActive = workflow?.status === "active";

  return (
    <tr className="transition hover:bg-slate-50">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Workflow size={19} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {workflow?.name || "Untitled workflow"}
            </p>

            {workflow?.description && (
              <p className="mt-1 truncate text-xs text-slate-500">
                {workflow.description}
              </p>
            )}
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
            isActive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {isActive ? "Active" : "Draft"}
        </span>
      </td>

      <td className="px-5 py-4 text-sm text-slate-500">
        {workflow?.updatedAt || "—"}
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Workflow actions"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

/* =========================================================
   WORKFLOW CARD
========================================================= */

function WorkflowCard({ workflow }) {
  const isActive = workflow?.status === "active";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Workflow size={19} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-slate-900">
              {workflow?.name || "Untitled workflow"}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {workflow?.updatedAt || "Not updated"}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Workflow actions"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {workflow?.description && (
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
          {workflow.description}
        </p>
      )}

      <div className="mt-5">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
            isActive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {isActive ? "Active" : "Draft"}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   MODAL
========================================================= */

function Modal({
  title,
  onClose,
  children,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
}