"use client";

import {
  Filter,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

export default function WorkflowsToolbar({
  search,
  onSearchChange,
  showFilters,
  onToggleFilters,
  selectedCount,
  onClearSelection,
}) {
  return (
    <div className="mb-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Left controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onToggleFilters}
            className={`inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[11px] font-medium shadow-sm transition ${
              showFilters
                ? "border-blue-200 bg-blue-50 text-[#2563EB]"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Filter size={13} strokeWidth={1.8} />
            Advanced filters
          </button>

          {selectedCount > 0 && (
            <button
              type="button"
              onClick={onClearSelection}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-medium text-slate-500 shadow-sm transition hover:bg-slate-50"
            >
              <X size={13} />
              Clear selection
            </button>
          )}
        </div>

        {/* Right controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Recent activity / sort */}
          <button
            type="button"
            title="Sort workflows"
            className="flex h-8 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-800"
          >
            <SlidersHorizontal
              size={14}
              strokeWidth={1.8}
            />
          </button>

          {/* List view */}
          <button
            type="button"
            title="List view"
            className="flex h-8 w-9 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-[#2563EB] shadow-sm"
          >
            <List
              size={15}
              strokeWidth={1.8}
            />
          </button>

          {/* Grid view */}
          <button
            type="button"
            title="Grid view"
            className="flex h-8 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-800"
          >
            <LayoutGrid
              size={14}
              strokeWidth={1.8}
            />
          </button>

          {/* Search */}
          <div className="flex h-8 w-full min-w-0 items-center rounded-lg border border-slate-200 bg-white px-2.5 shadow-sm transition focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-100 sm:w-[220px]">
            <Search
              size={14}
              strokeWidth={1.8}
              className="mr-2 shrink-0 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="Search workflows"
              aria-label="Search workflows"
              className="min-w-0 flex-1 bg-transparent text-[11px] text-slate-700 outline-none placeholder:text-slate-400"
            />

            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search status */}
      {search.trim() && (
        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-400">
          <Search size={11} />
          Searching for:
          <span className="font-medium text-slate-600">
            "{search}"
          </span>
        </div>
      )}
    </div>
  );
}