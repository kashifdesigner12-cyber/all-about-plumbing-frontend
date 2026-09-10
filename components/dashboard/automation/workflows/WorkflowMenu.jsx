"use client";

import {
  Archive,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

export default function WorkflowMenu({
  workflow,
  onOpen,
  onDuplicate,
  onArchive,
  onDelete,
}) {
  return (
    <div
      className="absolute right-0 top-9 z-40 w-44 rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[11px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
      >
        <ExternalLink size={13} strokeWidth={1.8} />
        Open workflow
      </button>

      <button
        type="button"
        onClick={onDuplicate}
        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[11px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
      >
        <Copy size={13} strokeWidth={1.8} />
        Duplicate
      </button>

      <button
        type="button"
        onClick={onArchive}
        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[11px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
      >
        <Archive size={13} strokeWidth={1.8} />
        Archive
      </button>

      <div className="my-1 border-t border-slate-100" />

      <button
        type="button"
        onClick={onDelete}
        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[11px] font-medium text-red-600 transition hover:bg-red-50"
      >
        <Trash2 size={13} strokeWidth={1.8} />
        Delete
      </button>
    </div>
  );
}