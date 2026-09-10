"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  ChevronDown,
  ChevronRight,
  Clock3,
  Filter,
  FolderPlus,
  Grid2X2,
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
  const [view, setView] = useState("list");
  const [showFilters, setShowFilters] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");

  const workflows = [];

  const filteredWorkflows = useMemo(() => {
    return workflows.filter((workflow) => {
      const matchesSearch =
        !search.trim() ||
        workflow.name.toLowerCase().includes(search.toLowerCase()) ||
        workflow.description?.toLowerCase().includes(search.toLowerCase());

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "active" && workflow.status === "active") ||
        (activeTab === "drafts" && workflow.status === "draft");

      return matchesSearch && matchesTab;
    });
  }, [activeTab, search]);

  const handleCreateFolder = () => {
    if (!folderName.trim()) return;

    setFolderName("");
    setShowFolderModal(false);
  };

  const handleCreateWorkflow = () => {
    if (!workflowName.trim()) return;

    setWorkflowName("");
    setWorkflowDescription("");
    setShowWorkflowModal(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-10 pt-6 sm:px-6">
      <div className="w-full">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Workflow className="h-6 w-6 text-blue-600" />

              <h1 className="text-2xl font-semibold text-slate-900">
                Workflows
              </h1>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Build and manage automated workflows for your business.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFolderModal(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <FolderPlus className="h-4 w-4" />
              New Folder
            </button>

            <button
              type="button"
              onClick={() => setShowWorkflowModal(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              New Workflow
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 border-b border-slate-200">
          <div className="flex items-center gap-6">
            {[
              { id: "all", label: "All Workflows" },
              { id: "active", label: "Active" },
              { id: "drafts", label: "Drafts" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-3 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab.label}

                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search workflows..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                showFilters
                  ? "border-blue-200 bg-blue-50 text-blue-600"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <Settings2 className="h-4 w-4" />
              Settings
            </button>

            <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1">
              <button
                type="button"
                onClick={() => setView("list")}
                className={`rounded-md p-1.5 transition ${
                  view === "list"
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-400 hover:text-slate-700"
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setView("grid")}
                className={`rounded-md p-1.5 transition ${
                  view === "grid"
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-400 hover:text-slate-700"
                }`}
                aria-label="Grid view"
              >
                <Grid2X2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-slate-700">
                Workflow filters
              </span>

              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                Status
                <ChevronDown className="ml-2 inline-block h-4 w-4" />
              </button>

              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                Folder
                <ChevronDown className="ml-2 inline-block h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {filteredWorkflows.length === 0 ? (
          <EmptyState
            search={search}
            activeTab={activeTab}
            onCreateWorkflow={() => setShowWorkflowModal(true)}
            onCreateFolder={() => setShowFolderModal(true)}
          />
        ) : view === "list" ? (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="grid grid-cols-[minmax(0,2fr)_150px_150px_60px] border-b border-slate-100 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>Workflow</span>
              <span>Status</span>
              <span>Updated</span>
              <span />
            </div>

            {filteredWorkflows.map((workflow) => (
              <WorkflowRow key={workflow.id} workflow={workflow} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredWorkflows.map((workflow) => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
          </div>
        )}

        {/* Folder Modal */}
        {showFolderModal && (
          <Modal
            title="Create folder"
            onClose={() => {
              setShowFolderModal(false);
              setFolderName("");
            }}
          >
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Folder name
                </label>

                <input
                  type="text"
                  value={folderName}
                  onChange={(event) => setFolderName(event.target.value)}
                  placeholder="Enter folder name"
                  autoFocus
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowFolderModal(false);
                    setFolderName("");
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleCreateFolder}
                  disabled={!folderName.trim()}
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Create Folder
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Workflow Modal */}
        {showWorkflowModal && (
          <Modal
            title="Create workflow"
            onClose={() => {
              setShowWorkflowModal(false);
              setWorkflowName("");
              setWorkflowDescription("");
            }}
          >
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Workflow name
                </label>

                <input
                  type="text"
                  value={workflowName}
                  onChange={(event) => setWorkflowName(event.target.value)}
                  placeholder="Enter workflow name"
                  autoFocus
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  value={workflowDescription}
                  onChange={(event) =>
                    setWorkflowDescription(event.target.value)
                  }
                  placeholder="Describe what this workflow should do"
                  rows={4}
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowWorkflowModal(false);
                    setWorkflowName("");
                    setWorkflowDescription("");
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleCreateWorkflow}
                  disabled={!workflowName.trim()}
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Create Workflow
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </main>
  );
}

function EmptyState({
  search,
  activeTab,
  onCreateWorkflow,
  onCreateFolder,
}) {
  const isSearching = Boolean(search.trim());

  let title = "No workflows yet";
  let description =
    "Create your first workflow to automate tasks and processes.";

  if (isSearching) {
    title = "No workflows found";
    description = `No workflows match "${search}". Try a different search.`;
  } else if (activeTab === "active") {
    title = "No active workflows";
    description = "Active workflows will appear here.";
  } else if (activeTab === "drafts") {
    title = "No draft workflows";
    description = "Draft workflows will appear here.";
  }

  return (
    <div className="flex min-h-[430px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-12">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
          <Workflow className="h-7 w-7 text-blue-600" />
        </div>

        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
          {description}
        </p>

        {!isSearching && activeTab === "all" && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={onCreateWorkflow}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Sparkles className="h-4 w-4" />
              Create Workflow
            </button>

            <button
              type="button"
              onClick={onCreateFolder}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <FolderPlus className="h-4 w-4" />
              New Folder
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function WorkflowRow({ workflow }) {
  return (
    <div className="grid grid-cols-[minmax(0,2fr)_150px_150px_60px] items-center border-b border-slate-100 px-5 py-4 last:border-b-0 hover:bg-slate-50">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
          <Workflow className="h-5 w-5 text-blue-600" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {workflow.name}
          </p>

          <p className="truncate text-xs text-slate-500">
            {workflow.description || "No description"}
          </p>
        </div>
      </div>

      <div>
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
            workflow.status === "active"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {workflow.status === "active" ? "Active" : "Draft"}
        </span>
      </div>

      <div className="text-xs text-slate-500">
        {workflow.updatedAt || "Not updated"}
      </div>

      <button
        type="button"
        className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        aria-label="Workflow options"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}

function WorkflowCard({ workflow }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
          <Workflow className="h-5 w-5 text-blue-600" />
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Workflow options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <h3 className="mt-4 truncate text-sm font-semibold text-slate-900">
        {workflow.name}
      </h3>

      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
        {workflow.description || "No description"}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            workflow.status === "active"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {workflow.status === "active" ? "Active" : "Draft"}
        </span>

        <span className="text-xs text-slate-400">
          {workflow.updatedAt || "Not updated"}
        </span>
      </div>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}