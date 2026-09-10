"use client";

import {
  Bot,
  ChevronDown,
  FileText,
  MessageSquare,
  Phone,
  Plus,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";

export default function CreateWorkflowModal({
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
        className="max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-workflow-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
              <Workflow size={18} strokeWidth={1.8} />
            </div>

            <div>
              <h2
                id="create-workflow-title"
                className="text-[14px] font-semibold text-[#171B3A]"
              >
                Create workflow
              </h2>

              <p className="mt-0.5 text-[10px] text-slate-400">
                Configure your workflow before connecting automation actions.
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
          <div className="space-y-5 px-5 py-5">
            {/* Workflow name */}
            <div>
              <label
                htmlFor="workflow-name"
                className="mb-2 block text-[11px] font-medium text-slate-600"
              >
                Workflow name
              </label>

              <input
                id="workflow-name"
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Enter workflow name"
                autoFocus
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[12px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Trigger */}
            <div>
              <label
                htmlFor="workflow-trigger"
                className="mb-2 block text-[11px] font-medium text-slate-600"
              >
                Starting trigger
              </label>

              <div className="relative">
                <select
                  id="workflow-trigger"
                  defaultValue=""
                  className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-[12px] text-slate-500 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                >
                  <option value="" disabled>
                    Select a trigger
                  </option>
                  <option value="contact-created">
                    Contact created
                  </option>
                  <option value="form-submitted">
                    Form submitted
                  </option>
                  <option value="appointment-booked">
                    Appointment booked
                  </option>
                  <option value="tag-added">
                    Tag added
                  </option>
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            {/* Quick actions */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-[11px] font-medium text-slate-600">
                  Workflow actions
                </label>

                <span className="text-[10px] text-slate-400">
                  Optional
                </span>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <ActionOption
                  icon={MessageSquare}
                  title="Send message"
                  description="Send an automated message"
                />

                <ActionOption
                  icon={Phone}
                  title="Make a call"
                  description="Start a calling action"
                />

                <ActionOption
                  icon={FileText}
                  title="Update contact"
                  description="Update contact information"
                />

                <ActionOption
                  icon={Bot}
                  title="AI action"
                  description="Use an AI-powered step"
                />
              </div>
            </div>

            {/* AI builder */}
            <div className="rounded-xl border border-violet-200 bg-violet-50/70 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm">
                  <Sparkles size={16} />
                </div>

                <div>
                  <h3 className="text-[12px] font-semibold text-violet-900">
                    Build with AI
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-violet-700/80">
                    AI workflow generation can be connected when the backend
                    AI service is available.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="mt-3 inline-flex h-8 items-center gap-1.5 rounded-lg border border-violet-200 bg-white px-3 text-[10px] font-medium text-violet-700 transition hover:bg-violet-100"
              >
                <Sparkles size={13} />
                Open AI builder
              </button>
            </div>
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
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 text-[11px] font-semibold text-white transition hover:bg-[#1D4ED8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={14} />
              Create workflow
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ActionOption({
  icon: Icon,
  title,
  description,
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-blue-200 hover:bg-blue-50/40"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
        <Icon size={15} strokeWidth={1.8} />
      </span>

      <span className="min-w-0">
        <span className="block text-[11px] font-medium text-slate-700">
          {title}
        </span>

        <span className="mt-0.5 block text-[9px] leading-4 text-slate-400">
          {description}
        </span>
      </span>
    </button>
  );
}