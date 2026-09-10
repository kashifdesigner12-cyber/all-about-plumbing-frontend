"use client";

import {
  FileSearch,
  Plus,
  Search,
  Workflow,
} from "lucide-react";

export default function WorkflowsEmptyState({
  search,
  activeTab,
  onCreateWorkflow,
  onClearSearch,
}) {
  const hasSearch = Boolean(search?.trim());

  const getTitle = () => {
    if (hasSearch) {
      return "No workflows found";
    }

    if (activeTab === "needs-review") {
      return "No workflows need review";
    }

    if (activeTab === "deleted") {
      return "No deleted workflows";
    }

    return "No workflows yet";
  };

  const getDescription = () => {
    if (hasSearch) {
      return `No workflow matches "${search}". Try a different search term.`;
    }

    if (activeTab === "needs-review") {
      return "Workflows requiring review will appear here.";
    }

    if (activeTab === "deleted") {
      return "Deleted workflows will appear here.";
    }

    return "Create your first workflow to start automating your business processes.";
  };

  return (
    <div className="flex min-h-[390px] items-center justify-center px-6 py-12">
      <div className="flex max-w-[440px] flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
          {hasSearch ? (
            <Search
              size={24}
              strokeWidth={1.6}
              className="text-slate-400"
            />
          ) : activeTab === "deleted" ? (
            <FileSearch
              size={24}
              strokeWidth={1.6}
              className="text-slate-400"
            />
          ) : (
            <Workflow
              size={24}
              strokeWidth={1.6}
              className="text-slate-400"
            />
          )}
        </div>

        {/* Title */}
        <h2 className="text-[17px] font-semibold text-[#171B3A]">
          {getTitle()}
        </h2>

        {/* Description */}
        <p className="mt-2 max-w-[390px] text-[12px] leading-5 text-slate-500">
          {getDescription()}
        </p>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {hasSearch ? (
            <>
              <button
                type="button"
                onClick={onClearSearch}
                className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-[12px] font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 active:scale-[0.98]"
              >
                Clear search
              </button>

              <button
                type="button"
                onClick={onCreateWorkflow}
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#2563EB] px-4 text-[12px] font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] active:scale-[0.98]"
              >
                <Plus
                  size={15}
                  strokeWidth={2}
                />
                Create workflow
              </button>
            </>
          ) : activeTab === "all" ? (
            <button
              type="button"
              onClick={onCreateWorkflow}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#2563EB] px-4 text-[12px] font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] active:scale-[0.98]"
            >
              <Plus
                size={15}
                strokeWidth={2}
              />
              Create workflow
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}