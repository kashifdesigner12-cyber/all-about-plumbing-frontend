'use client';

import { useState } from 'react';
import { SlidersHorizontal, ChevronLeft, ChevronRight, TrendingDown } from 'lucide-react';
import { AnalyticsCard, CardDropdown } from './AnalyticsCard';

const PIPELINE_OPTIONS = ['All pipelines', 'DB Re-Activation'];

const COLUMNS = [
  { key: 'source',      label: 'Source',        align: 'left' },
  { key: 'totalLeads',  label: 'Total leads',   align: 'right' },
  { key: 'totalValue',  label: 'Total values',  align: 'right' },
  { key: 'open',        label: 'Open',          align: 'right' },
  { key: 'won',         label: 'Won',           align: 'right' },
  { key: 'lost',        label: 'Lost',          align: 'right' },
  { key: 'abandoned',   label: 'Abandoned',     align: 'right' },
  { key: 'winPct',      label: 'Win%',          align: 'right' },
];

const DEMO_ROWS = [
  {
    source:     'website form',
    totalLeads: 1,
    totalValue: '$0',
    open:       1,
    won:        0,
    lost:       0,
    abandoned:  0,
    winPct:     '0.00%',
  },
];

export default function LeadSourceReport() {
  const [page, setPage] = useState(1);
  const totalPages = 1;

  return (
    <AnalyticsCard
      title="Lead source report"
      headerRight={
        <>
          <CardDropdown label="All pipelines" options={PIPELINE_OPTIONS} />
          <button className="p-1 rounded hover:bg-[#F8FAFC] text-[#64748B]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </>
      }
    >
      {/* Big number + comparison */}
      <div className="px-4 pt-3 pb-2 border-b border-[#F1F5F9]">
        <div className="flex items-baseline gap-3">
          <span className="text-[28px] font-bold text-[#26344D]">1</span>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="flex items-center gap-0.5 text-rose-500 font-medium">
              <TrendingDown className="w-3 h-3" />
              50%
            </span>
            <span className="text-[#94A3B8]">vs No comparison</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-[11.5px]" style={{ minWidth: 600 }}>
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-2 font-semibold text-[#64748B] text-[10.5px] tracking-wide whitespace-nowrap ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEMO_ROWS.map((row, i) => (
              <tr key={i} className="border-b border-[#F8FAFC] hover:bg-[#FAFBFC] transition-colors">
                {COLUMNS.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-2.5 text-[#26344D] whitespace-nowrap ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                  >
                    {col.key === 'source' ? (
                      <span className="font-medium">{row[col.key]}</span>
                    ) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-1 px-4 py-2.5 border-t border-[#F1F5F9]">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-2.5 py-1 text-[11px] text-[#64748B] border border-[#E2E8F0] rounded hover:bg-[#F8FAFC] disabled:opacity-40 transition-colors"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-7 h-7 text-[11px] rounded border transition-colors ${
              p === page
                ? 'bg-[#2563EB] text-white border-[#2563EB] font-semibold'
                : 'text-[#64748B] border-[#E2E8F0] hover:bg-[#F8FAFC]'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-2.5 py-1 text-[11px] text-[#64748B] border border-[#E2E8F0] rounded hover:bg-[#F8FAFC] disabled:opacity-40 transition-colors"
        >
          Next
        </button>
      </div>
    </AnalyticsCard>
  );
}
