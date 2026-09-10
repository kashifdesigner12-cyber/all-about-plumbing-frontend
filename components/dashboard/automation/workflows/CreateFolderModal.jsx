"use client";

import {
  FolderPlus,
  X,
} from "lucide-react";

export default function CreateFolderModal({
  value,
  onChange,
  onClose,
  onSubmit,
}) {
  const canSubmit = value.trim().length > 0;

  function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    onSubmit();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-[430px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-folder-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
              <FolderPlus
                size={18}
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h2
                id="create-folder-title"
                className="text-[14px] font-semibold text-[#171B3A]"
              >
                Create folder
              </h2>

              <p className="mt-0.5 text-[10px] text-slate-400">
                Organize your workflows into folders.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="px-5 py-5">
            <label
              htmlFor="workflow-folder-name"
              className="mb-2 block text-[11px] font-medium text-slate-600"
            >
              Folder name
            </label>

            <input
              id="workflow-folder-name"
              type="text"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="Enter folder name"
              autoFocus
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[12px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-2 text-[10px] leading-4 text-slate-400">
              The folder will be available for organizing workflows after
              backend storage is connected.
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-3">
            <button
              type="button"
              onClick={onClose}
              className="h-9 rounded-lg border border-slate-200 bg-white px-4 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50 active:scale-[0.98]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!canSubmit}
              className="h-9 rounded-lg bg-[#2563EB] px-4 text-[11px] font-semibold text-white transition hover:bg-[#1D4ED8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}