"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Calendar,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

export default function InvoiceFilters({
  search = "",
  onSearchChange,
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleRefresh = () => {
    setStartDate("");
    setEndDate("");

    if (onSearchChange) {
      onSearchChange("");
    }
  };

  const handleSearchChange = (e) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] bg-white px-5 py-2.5">
      {/* =========================================================
          LEFT — DATE RANGE
      ========================================================= */}

      <div className="flex items-center gap-1.5">
        {/* Start Date */}
        <div className="relative flex items-center">
          <input
            id="invoice-start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
            className="w-[130px] rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-[12px] text-[#26344D] placeholder-[#94A3B8] transition-colors focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]/20"
          />
        </div>

        {/* Arrow */}
        <ArrowRight
          className="h-3.5 w-3.5 shrink-0 text-[#94A3B8]"
          strokeWidth={2}
        />

        {/* End Date */}
        <div className="relative flex items-center">
          <input
            id="invoice-end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date"
            className="w-[130px] rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-[12px] text-[#26344D] placeholder-[#94A3B8] transition-colors focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]/20"
          />
        </div>

        {/* Calendar Button */}
        <button
          id="invoice-calendar-btn"
          type="button"
          title="Pick date range"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E2E8F0] bg-white text-[#64748B] transition-colors hover:bg-[#F8FAFC] hover:text-[#2563EB]"
        >
          <Calendar
            className="h-3.5 w-3.5"
            strokeWidth={2}
          />
        </button>
      </div>

      {/* =========================================================
          RIGHT — SEARCH / FILTERS / REFRESH
      ========================================================= */}

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative flex items-center">
          <Search
            className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-[#94A3B8]"
            strokeWidth={2}
          />

          <input
            id="invoice-search"
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search invoices…"
            className="w-[200px] rounded-md border border-[#E2E8F0] bg-white py-1.5 pl-8 pr-3 text-[12px] text-[#26344D] placeholder-[#94A3B8] transition-colors focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]/20"
          />
        </div>

        {/* Filters */}
        <button
          id="invoice-filters-btn"
          type="button"
          onClick={() => setFiltersOpen((prev) => !prev)}
          className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12px] font-medium transition-colors ${
            filtersOpen
              ? "border-[#2563EB] bg-[#EEF4FF] text-[#2563EB]"
              : "border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#26344D]"
          }`}
        >
          <SlidersHorizontal
            className="h-3.5 w-3.5"
            strokeWidth={2}
          />

          <span>Filters</span>
        </button>

        {/* Refresh */}
        <button
          id="invoice-refresh-btn"
          type="button"
          onClick={handleRefresh}
          title="Refresh"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E2E8F0] bg-white text-[#64748B] transition-colors hover:bg-[#F8FAFC] hover:text-[#2563EB]"
        >
          <RefreshCw
            className="h-3.5 w-3.5"
            strokeWidth={2}
          />
        </button>
      </div>
    </div>
  );
}