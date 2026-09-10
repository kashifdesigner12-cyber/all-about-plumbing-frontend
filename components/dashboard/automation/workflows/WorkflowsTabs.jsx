"use client";

import { Plus } from "lucide-react";

const TABS = [
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
];

export default function WorkflowsTabs({
  activeTab,
  onChange,
}) {
  return (
    <div className="mb-4 border-b border-slate-200">
      <div className="flex items-center gap-6 overflow-x-auto">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`relative flex min-h-[38px] shrink-0 items-center text-[12px] font-medium transition ${
                isActive
                  ? "text-[#2563EB]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}

              {tab.id === "needs-review" && (
                <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-medium text-slate-500">
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
          onClick={() => {
            // Smart-list creation UI will be connected here.
          }}
          className="flex min-h-[38px] shrink-0 items-center gap-1.5 text-[12px] font-medium text-slate-500 transition hover:text-slate-800"
        >
          <Plus size={14} strokeWidth={1.8} />
          New smart list
        </button>
      </div>
    </div>
  );
}