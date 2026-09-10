'use client';

import { Users } from 'lucide-react';

export default function ContactEmptyState({ onAddContact }) {
  return (
    <tr>
      <td colSpan={8}>
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-[#EEF4FF] flex items-center justify-center mb-4">
            <Users className="w-7 h-7 text-[#2563EB]" strokeWidth={1.5} />
          </div>

          {/* Text */}
          <h3 className="text-[14px] font-semibold text-[#26344D] mb-1">
            No contacts yet
          </h3>
          <p className="text-[13px] text-[#64748B] max-w-[280px] leading-relaxed">
            Your contact list is empty. Add your first contact or import from a file to get started.
          </p>

          {/* Action */}
          <button
            onClick={onAddContact}
            className="mt-5 flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#2563EB] text-[13px] font-medium text-white hover:bg-[#1D4ED8] transition-colors"
          >
            Add Contact
          </button>
        </div>
      </td>
    </tr>
  );
}
