"use client";

import { ChevronRight, Folder, MoreVertical } from "lucide-react";

const workflowRows = [
  {
    name: "A2P Compliance",
    type: "folder",
    updated: "Feb 06 2026, 6:10 PM",
    created: "Feb 06 2026, 6:10 PM",
  },
  {
    name: "Incoming Lead Workflows",
    type: "folder",
    updated: "Feb 06 2026, 6:10 PM",
    created: "Feb 06 2026, 6:10 PM",
  },
  {
    name: "Promotions Campaign",
    type: "folder",
    updated: "May 12 2026, 11:32 AM",
    created: "May 12 2026, 11:32 AM",
  },
  {
    name: "Reactivation Campaigns",
    type: "folder",
    updated: "Feb 06 2026, 6:10 PM",
    created: "Feb 06 2026, 6:10 PM",
  },
  {
    name: "Results Tracking",
    type: "folder",
    updated: "Feb 06 2026, 6:10 PM",
    created: "Feb 06 2026, 6:10 PM",
  },
  {
    name: "Review / Referral Workflows",
    type: "folder",
    updated: "Feb 06 2026, 6:10 PM",
    created: "Feb 06 2026, 6:10 PM",
  },
  {
    name: "Checkin call booking prompt",
    type: "workflow",
    status: "Published",
    total: "0",
    active: "0",
    updated: "Feb 27 2026, 4:06 PM",
    created: "Feb 06 2026, 6:10 PM",
  },
];

export default function WorkflowsTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="grid grid-cols-[52px_minmax(230px,1.5fr)_120px_130px_130px_160px_160px_90px] items-center border-b border-slate-200 bg-slate-50/70 px-3 py-3 text-[10px] font-medium uppercase tracking-wide text-slate-500">
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded border-slate-300"
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

      {workflowRows.map((row) => (
        <div
          key={row.name}
          className="grid min-h-[51px] grid-cols-[52px_minmax(230px,1.5fr)_120px_130px_130px_160px_160px_90px] items-center border-b border-slate-100 px-3 last:border-b-0 hover:bg-slate-50/50"
        >
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 rounded border-slate-300"
            />
          </div>

          <div className="flex min-w-0 items-center gap-2">
            {row.type === "folder" ? (
              <Folder
                size={16}
                strokeWidth={1.8}
                className="shrink-0 text-slate-700"
              />
            ) : (
              <div className="h-4 w-4 shrink-0 rounded border border-slate-300" />
            )}

            <span className="truncate text-[12px] font-medium text-slate-700">
              {row.name}
            </span>

            {row.type === "workflow" && (
              <ChevronRight
                size={13}
                className="shrink-0 text-slate-400"
              />
            )}
          </div>

          <div>
            {row.status && (
              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-600">
                {row.status}
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-500">
            {row.total}
          </div>

          <div className="text-[11px] text-slate-500">
            {row.active}
          </div>

          <div className="text-[11px] text-slate-500">
            {row.updated}
          </div>

          <div className="text-[11px] text-slate-500">
            {row.created}
          </div>

          <div className="flex items-center justify-between">
            <div />

            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}