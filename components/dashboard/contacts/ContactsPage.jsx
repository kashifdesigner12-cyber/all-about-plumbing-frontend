'use client';

import { useState, useCallback } from 'react';
import ContactsNav from './ContactsNav';
import ContactsToolbar from './ContactsToolbar';
import ContactFilters from './ContactFilters';
import ContactsTable from './ContactsTable';
import ContactPagination from './ContactPagination';

/**
 * ContactsPage
 *
 * Top-level page component for /dashboard/contacts.
 *
 * State managed here:
 *   - activeTab     — which nav tab is active
 *   - activeList    — 'all' | smart list id
 *   - search        — search query string
 *   - sortField     — column key to sort by
 *   - sortDir       — 'asc' | 'desc'
 *   - currentPage   — pagination
 *   - selectedIds   — Set of selected contact IDs
 *
 * Data:
 *   - contacts, totalCount, totalPages — supplied via props from the page.jsx
 *     (which will call the backend API in the future).
 *   - loading — passed down from page.jsx
 *
 * When backend is ready, page.jsx will pass the real data as props.
 * This component owns only UI state (not data-fetching).
 */
export default function ContactsPage({
  // Data props — filled by backend in the future
  contacts = [],
  totalCount = 0,
  totalPages = 1,
  loading = false,
  // Callbacks from parent (page.jsx) for data operations
  onAddContact,
  onImport,
  onRowClick,
  onSortChange,
  onSearchChange: onSearchChangeProp,
  onPageChange: onPageChangeProp,
}) {
  // ── Local UI state ────────────────────────────────────────────────────────
  const [activeTab, setActiveTab]     = useState('contacts');
  const [activeList, setActiveList]   = useState('all');
  const [search, setSearch]           = useState('');
  const [sortField, setSortField]     = useState(null);
  const [sortDir, setSortDir]         = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState(new Set());

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSearchChange = useCallback((val) => {
    setSearch(val);
    setCurrentPage(1);
    setSelectedIds(new Set());
    if (onSearchChangeProp) onSearchChangeProp(val);
  }, [onSearchChangeProp]);

  const handleSort = useCallback((field) => {
    const newDir = sortField === field && sortDir === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDir(newDir);
    setCurrentPage(1);
    if (onSortChange) onSortChange(field, newDir);
  }, [sortField, sortDir, onSortChange]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    setSelectedIds(new Set());
    if (onPageChangeProp) onPageChangeProp(page);
  }, [onPageChangeProp]);

  const handleSelectAll = useCallback((checked) => {
    if (checked) {
      setSelectedIds(new Set(contacts.map((c) => c.id)));
    } else {
      setSelectedIds(new Set());
    }
  }, [contacts]);

  const handleSelectOne = useCallback((id, checked) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden">
      {/* ── Top Navigation Tabs ── */}
      <ContactsNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ── Inner workspace — white card panel ── */}
      <div className="flex flex-col flex-1 min-h-0 bg-white overflow-hidden m-0">
        {/* Toolbar: title + action buttons */}
        <ContactsToolbar
          contactCount={totalCount}
          onAddContact={onAddContact}
          onImport={onImport}
        />

        {/* Filters: list selector + filter/sort row + search */}
        <ContactFilters
          search={search}
          onSearchChange={handleSearchChange}
          activeList={activeList}
          onListChange={setActiveList}
        />

        {/* Table: grows to fill remaining vertical space */}
        <ContactsTable
          contacts={contacts}
          loading={loading}
          sortField={sortField}
          sortDir={sortDir}
          onSort={handleSort}
          onRowClick={onRowClick}
          onAddContact={onAddContact}
          selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
        />

        {/* Pagination */}
        <ContactPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={25}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
