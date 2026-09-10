'use client';

import { ChevronUp, ChevronDown } from 'lucide-react';
import InvoiceEmptyState from './InvoiceEmptyState';

const COLUMNS = [
  { key: 'name',     label: 'Invoice Name',   sortable: true  },
  { key: 'number',   label: 'Invoice Number', sortable: true  },
  { key: 'customer', label: 'Customer',       sortable: true  },
  { key: 'issueDate',label: 'Issue Date',     sortable: true  },
  { key: 'amount',   label: 'Amount',         sortable: true  },
  { key: 'status',   label: 'Status',         sortable: false },
];

function SortIcon({ field, sortField, sortDir }) {
  const isActive = sortField === field;
  return (
    <span className="inline-flex flex-col ml-1 opacity-40 group-hover:opacity-70 transition-opacity">
      <ChevronUp
        className={`w-2.5 h-2.5 -mb-0.5 ${isActive && sortDir === 'asc' ? 'opacity-100 text-[#2563EB]' : ''}`}
        strokeWidth={2.5}
      />
      <ChevronDown
        className={`w-2.5 h-2.5 ${isActive && sortDir === 'desc' ? 'opacity-100 text-[#2563EB]' : ''}`}
        strokeWidth={2.5}
      />
    </span>
  );
}

export default function InvoiceTable({
  invoices = [],
  loading = false,
  sortField,
  sortDir,
  onSort,
}) {
  const handleSort = (field) => {
    if (onSort) onSort(field);
  };

  return (
    <div className="flex-1 overflow-auto light-scroll">
      <table className="w-full min-w-[700px] border-collapse">
        {/* ── Table header ── */}
        <thead className="sticky top-0 z-10 bg-[#F8FAFC]">
          <tr className="border-b border-[#E2E8F0]">
            {/* Checkbox column */}
            <th className="w-10 pl-5 pr-2 py-2.5 text-left">
              <input
                type="checkbox"
                disabled
                className="w-3.5 h-3.5 rounded border-[#CBD5E1] accent-[#2563EB] cursor-not-allowed opacity-40"
                id="invoice-select-all"
              />
            </th>

            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={`
                  px-3 py-2.5 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap
                  ${col.sortable ? 'cursor-pointer select-none group hover:text-[#26344D] transition-colors' : ''}
                `}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <span className="inline-flex items-center">
                  {col.label}
                  {col.sortable && (
                    <SortIcon
                      field={col.key}
                      sortField={sortField}
                      sortDir={sortDir}
                    />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        {/* ── Table body ── */}
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7}>
                <div className="flex items-center justify-center py-20">
                  <div className="w-6 h-6 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
                </div>
              </td>
            </tr>
          ) : invoices.length === 0 ? (
            <InvoiceEmptyState />
          ) : (
            invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <td className="pl-5 pr-2 py-3">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 rounded border-[#CBD5E1] accent-[#2563EB]"
                  />
                </td>
                <td className="px-3 py-3 text-[13px] font-medium text-[#26344D]">{invoice.name}</td>
                <td className="px-3 py-3 text-[13px] text-[#64748B]">{invoice.number}</td>
                <td className="px-3 py-3 text-[13px] text-[#64748B]">{invoice.customer}</td>
                <td className="px-3 py-3 text-[13px] text-[#64748B]">{invoice.issueDate}</td>
                <td className="px-3 py-3 text-[13px] font-medium text-[#26344D]">{invoice.amount}</td>
                <td className="px-3 py-3">
                  <span className={`
                    inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium
                    ${invoice.status === 'paid'    ? 'bg-[#DCFCE7] text-[#15803D]' : ''}
                    ${invoice.status === 'draft'   ? 'bg-[#F1F5F9] text-[#64748B]' : ''}
                    ${invoice.status === 'due'     ? 'bg-[#FEF9C3] text-[#A16207]' : ''}
                    ${invoice.status === 'overdue' ? 'bg-[#FEE2E2] text-[#DC2626]' : ''}
                  `}>
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
