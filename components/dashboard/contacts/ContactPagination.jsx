'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * ContactPagination
 * Props:
 *   - currentPage (number)
 *   - totalPages  (number)
 *   - totalCount  (number)
 *   - pageSize    (number)
 *   - onPageChange (fn)
 *
 * When totalCount === 0, renders a disabled/empty pagination bar.
 */
export default function ContactPagination({
  currentPage = 1,
  totalPages = 1,
  totalCount = 0,
  pageSize = 25,
  onPageChange,
}) {
  const isEmpty = totalCount === 0;

  const startEntry = isEmpty ? 0 : (currentPage - 1) * pageSize + 1;
  const endEntry   = isEmpty ? 0 : Math.min(currentPage * pageSize, totalCount);

  const canPrev = !isEmpty && currentPage > 1;
  const canNext = !isEmpty && currentPage < totalPages;

  return (
    <div className="flex items-center justify-between px-4 py-2 border-t border-[#E2E8F0] bg-white shrink-0">
      {/* Left: entry count */}
      <span className="text-[12px] text-[#64748B]">
        {isEmpty
          ? 'No contacts'
          : `Showing ${startEntry}–${endEntry} of ${totalCount}`}
      </span>

      {/* Right: page controls */}
      <div className="flex items-center gap-1">
        <button
          disabled={!canPrev}
          onClick={() => canPrev && onPageChange && onPageChange(currentPage - 1)}
          className="flex items-center justify-center w-7 h-7 rounded-md border border-[#E2E8F0] bg-white text-[#64748B] disabled:opacity-40 hover:bg-[#F8FAFC] disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />
        </button>

        {!isEmpty && (
          <span className="px-2 text-[12px] text-[#26344D] font-medium">
            {currentPage} / {totalPages}
          </span>
        )}

        <button
          disabled={!canNext}
          onClick={() => canNext && onPageChange && onPageChange(currentPage + 1)}
          className="flex items-center justify-center w-7 h-7 rounded-md border border-[#E2E8F0] bg-white text-[#64748B] disabled:opacity-40 hover:bg-[#F8FAFC] disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
