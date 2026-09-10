'use client';

import { FileSearch } from 'lucide-react';

export default function InvoiceEmptyState() {
  return (
    <tr>
      <td colSpan={7}>
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center select-none">
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-[#EEF4FF] flex items-center justify-center mb-4">
            <FileSearch className="w-7 h-7 text-[#2563EB]" strokeWidth={1.5} />
          </div>

          {/* Text */}
          <h3 className="text-[14px] font-semibold text-[#26344D] mb-1">
            No invoices to show yet
          </h3>
          <p className="text-[13px] text-[#64748B] max-w-[280px] leading-relaxed">
            Invoices will appear here once they are created. Use the&nbsp;
            <span className="font-medium text-[#26344D]">+ New</span> button to create your first invoice.
          </p>
        </div>
      </td>
    </tr>
  );
}
