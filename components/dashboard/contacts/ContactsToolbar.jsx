'use client';

import { useState } from 'react';
import { Upload, Plus, MoreHorizontal, ChevronDown } from 'lucide-react';

export default function ContactsToolbar({ contactCount = 0, onAddContact, onImport }) {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#E2E8F0] shrink-0">
      {/* Left: Title + Count */}
      <div className="flex items-center gap-2">
        <h1 className="text-[15px] font-semibold text-[#26344D]">Contacts</h1>
        <span className="text-[13px] text-[#64748B] font-normal">
          {contactCount} contact{contactCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Right: Action buttons */}
      <div className="flex items-center gap-2">
        {/* Import */}
        <button
          onClick={onImport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#E2E8F0] bg-white text-[13px] font-medium text-[#26344D] hover:bg-[#F8FAFC] transition-colors"
        >
          <Upload className="w-3.5 h-3.5 text-[#64748B]" strokeWidth={2} />
          Import
        </button>

        {/* Add Contact */}
        <button
          onClick={onAddContact}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#2563EB] text-[13px] font-medium text-white hover:bg-[#1D4ED8] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          Add Contact
        </button>

        {/* More menu */}
        <div className="relative">
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="flex items-center justify-center w-8 h-8 rounded-md border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
          </button>
          {moreOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMoreOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-lg shadow-lg border border-[#E2E8F0] z-20 py-1 overflow-hidden">
                {[
                  'Export Contacts',
                  'Merge Contacts',
                  'Delete Selected',
                ].map((item) => (
                  <button
                    key={item}
                    className="flex w-full items-center px-3 py-2 text-[13px] text-[#26344D] hover:bg-[#F8FAFC] transition-colors"
                    onClick={() => setMoreOpen(false)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
