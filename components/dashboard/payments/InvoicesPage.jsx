'use client';

import { useState, useCallback } from 'react';
import PaymentsNav from './PaymentsNav';
import InvoicesHeader from './InvoicesHeader';
import InvoiceSummaryCards from './InvoiceSummaryCards';
import InvoiceFilters from './InvoiceFilters';
import InvoiceTable from './InvoiceTable';

/**
 * InvoicesPage
 *
 * Top-level page component for /dashboard/payments/invoices.
 *
 * UI state is managed here.
 * Data props (invoices, counts, amounts) are left at their empty defaults
 * until the backend is connected — they will be passed in from page.jsx.
 *
 * NO fake data. NO API calls. Frontend-only.
 */
export default function InvoicesPage({
  // ── Data props — provided by backend in the future ──────────────────────
  invoices = [],
  totalCount = 0,
  loading = false,
  // Summary counts / amounts — come from the backend summary endpoint
  draftCount = 0,
  draftAmount = '$0.00',
  dueCount = 0,
  dueAmount = '$0.00',
  receivedCount = 0,
  receivedAmount = '$0.00',
  overdueCount = 0,
  overdueAmount = '$0.00',
  // ── Callbacks from page.jsx ──────────────────────────────────────────────
  onNew,
  onSettings,
  onSearchChange: onSearchChangeProp,
  onSortChange,
}) {
  // ── Local UI state ────────────────────────────────────────────────────────
  const [activeTab, setActiveTab]   = useState('invoices');
  const [search, setSearch]         = useState('');
  const [sortField, setSortField]   = useState(null);
  const [sortDir, setSortDir]       = useState('asc');

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSearchChange = useCallback((val) => {
    setSearch(val);
    if (onSearchChangeProp) onSearchChangeProp(val);
  }, [onSearchChangeProp]);

  const handleSort = useCallback((field) => {
    const newDir = sortField === field && sortDir === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDir(newDir);
    if (onSortChange) onSortChange(field, newDir);
  }, [sortField, sortDir, onSortChange]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden">
      {/* ── Top Payments Navigation Tabs ── */}
      <PaymentsNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ── Inner workspace: white card panel ── */}
      <div className="flex flex-col flex-1 min-h-0 bg-white overflow-hidden">
        {/* Page header: title + action buttons */}
        <InvoicesHeader
          onSettings={onSettings}
          onNew={onNew}
        />

        {/* Summary cards */}
        <InvoiceSummaryCards
          draftCount={draftCount}
          draftAmount={draftAmount}
          dueCount={dueCount}
          dueAmount={dueAmount}
          receivedCount={receivedCount}
          receivedAmount={receivedAmount}
          overdueCount={overdueCount}
          overdueAmount={overdueAmount}
        />

        {/* Table container: white card with border */}
        <div className="flex flex-col flex-1 min-h-0 mx-5 my-4 rounded-lg border border-[#E2E8F0] bg-white overflow-hidden shadow-[0_1px_2px_0_rgba(0,0,0,0.04)]">
          {/* Filters: date range + search + filter controls */}
          <InvoiceFilters
            search={search}
            onSearchChange={handleSearchChange}
          />

          {/* Table: grows to fill remaining vertical space */}
          <InvoiceTable
            invoices={invoices}
            loading={loading}
            sortField={sortField}
            sortDir={sortDir}
            onSort={handleSort}
          />
        </div>
      </div>
    </div>
  );
}
