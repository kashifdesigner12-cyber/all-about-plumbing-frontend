'use client';

import { Settings, Plus } from 'lucide-react';

export default function InvoicesHeader({ onSettings, onNew }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-[#E2E8F0] shrink-0">
      {/* Left: Title + Description */}
      <div>
        <h1 className="text-[15px] font-semibold text-[#26344D] leading-snug">
          Invoices
        </h1>
        <p className="text-[12px] text-[#64748B] leading-snug mt-0.5">
          Create and manage all invoices generated for your business
        </p>
      </div>

      {/* Right: Action buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Settings button */}
        <button
          id="invoices-settings-btn"
          onClick={onSettings}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#E2E8F0] bg-white text-[13px] font-medium text-[#26344D] hover:bg-[#F8FAFC] transition-colors"
        >
          <Settings className="w-3.5 h-3.5 text-[#64748B]" strokeWidth={2} />
          Settings
        </button>

        {/* New button */}
        <button
          id="invoices-new-btn"
          onClick={onNew}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#2563EB] text-[13px] font-medium text-white hover:bg-[#1D4ED8] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          New
        </button>
      </div>
    </div>
  );
}
