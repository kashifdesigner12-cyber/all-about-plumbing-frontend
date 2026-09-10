"use client";

import {
  FolderPlus,
  Plus,
  Sparkles,
} from "lucide-react";

export default function WorkflowsHeader({
  onCreateFolder,
  onBuildWithAI,
  onCreateWorkflow,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      {/* Title */}
      <div>
        <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#171B3A]">
          Workflows list
        </h1>

        <p className="mt-1 text-[12px] text-slate-500">
          Create and manage your business automation workflows.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Create Folder */}
        <button
          type="button"
          onClick={onCreateFolder}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 text-[12px] font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98]"
        >
          <FolderPlus
            size={15}
            strokeWidth={1.8}
          />

          Create folder
        </button>

        {/* Build using AI */}
        <button
          type="button"
          onClick={onBuildWithAI}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3.5 text-[12px] font-medium text-violet-700 shadow-sm transition hover:border-violet-300 hover:bg-violet-100 active:scale-[0.98]"
        >
          <Sparkles
            size={15}
            strokeWidth={1.8}
          />

          Build using AI
        </button>

        {/* Create Workflow */}
        <button
          type="button"
          onClick={onCreateWorkflow}
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#2563EB] px-4 text-[12px] font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] active:scale-[0.98]"
        >
          <Plus
            size={16}
            strokeWidth={2}
          />

          Create workflow
        </button>
      </div>
    </div>
  );
}