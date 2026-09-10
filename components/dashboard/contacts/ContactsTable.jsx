'use client';

import { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import ContactEmptyState from './ContactEmptyState';

/**
 * ContactsTable
 *
 * Props:
 *   - contacts   (array) — list of contact objects from the API (empty by default)
 *   - loading    (bool)  — show skeleton while fetching
 *   - sortField  (string)
 *   - sortDir    ('asc'|'desc')
 *   - onSort     (fn)    — called with (field)
 *   - onRowClick (fn)    — called with (contact)
 *   - onAddContact (fn)  — passed to empty state CTA
 *   - selectedIds (Set)
 *   - onSelectAll (fn)
 *   - onSelectOne (fn)
 *
 * Column order matches the reference screenshot:
 *   checkbox | Contact name | Phone | Email | Business name | Created (CDT) | Last activity (CDT) | Tags
 */

const COLUMNS = [
  { key: 'name',         label: 'Contact name',         sortable: true  },
  { key: 'phone',        label: 'Phone',                sortable: false },
  { key: 'email',        label: 'Email',                sortable: false },
  { key: 'businessName', label: 'Business name',        sortable: true  },
  { key: 'createdAt',    label: 'Created (CDT)',        sortable: true  },
  { key: 'lastActivity', label: 'Last activity (CDT)',  sortable: true  },
  { key: 'tags',         label: 'Tags',                 sortable: false },
];

function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field) {
    return <ArrowUpDown className="w-3 h-3 ml-1 text-[#CBD5E1] group-hover:text-[#94A3B8] transition-colors" strokeWidth={2} />;
  }
  return sortDir === 'asc'
    ? <ArrowUp   className="w-3 h-3 ml-1 text-[#2563EB]" strokeWidth={2} />
    : <ArrowDown className="w-3 h-3 ml-1 text-[#2563EB]" strokeWidth={2} />;
}

function SkeletonRow() {
  return (
    <tr className="border-b border-[#E2E8F0]">
      <td className="px-4 py-3">
        <div className="w-4 h-4 rounded bg-[#E2E8F0] animate-pulse" />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#E2E8F0] animate-pulse shrink-0" />
          <div className="space-y-1.5">
            <div className="h-3 w-28 rounded bg-[#E2E8F0] animate-pulse" />
            <div className="h-2.5 w-20 rounded bg-[#F1F5F9] animate-pulse" />
          </div>
        </div>
      </td>
      {[...Array(5)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-3 w-24 rounded bg-[#E2E8F0] animate-pulse" />
        </td>
      ))}
      <td className="px-4 py-3">
        <div className="flex gap-1">
          <div className="h-5 w-14 rounded-full bg-[#E2E8F0] animate-pulse" />
        </div>
      </td>
    </tr>
  );
}

export default function ContactsTable({
  contacts = [],
  loading = false,
  sortField,
  sortDir = 'asc',
  onSort,
  onRowClick,
  onAddContact,
  selectedIds = new Set(),
  onSelectAll,
  onSelectOne,
}) {
  const allSelected = contacts.length > 0 && contacts.every((c) => selectedIds.has(c.id));
  const someSelected = contacts.some((c) => selectedIds.has(c.id));

  return (
    <div className="flex-1 overflow-auto light-scroll">
      <table className="w-full text-left border-collapse" style={{ minWidth: 860 }}>
        {/* ── HEADER ── */}
        <thead className="bg-[#F8FAFC] sticky top-0 z-10">
          <tr className="border-b border-[#E2E8F0]">
            {/* Checkbox */}
            <th className="px-4 py-3 w-10 shrink-0">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected && !allSelected;
                }}
                onChange={(e) => onSelectAll && onSelectAll(e.target.checked)}
                disabled={contacts.length === 0}
                className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB] cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
              />
            </th>

            {/* Data columns */}
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide whitespace-nowrap
                  ${col.sortable ? 'cursor-pointer select-none group' : ''}
                `}
                onClick={() => col.sortable && onSort && onSort(col.key)}
              >
                <span className="flex items-center">
                  {col.label}
                  {col.sortable && (
                    <SortIcon field={col.key} sortField={sortField} sortDir={sortDir} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        {/* ── BODY ── */}
        <tbody className="bg-white divide-y divide-[#E2E8F0]">
          {loading ? (
            // Skeleton rows
            [...Array(6)].map((_, i) => <SkeletonRow key={i} />)
          ) : contacts.length === 0 ? (
            // Empty state
            <ContactEmptyState onAddContact={onAddContact} />
          ) : (
            // Real contact rows — populated from backend
            contacts.map((contact) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                isSelected={selectedIds.has(contact.id)}
                onSelect={(checked) => onSelectOne && onSelectOne(contact.id, checked)}
                onRowClick={() => onRowClick && onRowClick(contact)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ─── Individual row (used when backend data is available) ──────────────────────
function ContactRow({ contact, isSelected, onSelect, onRowClick }) {
  // Format a phone number for display
  const formatPhone = (phone) => phone || '—';

  // Initials from name
  const getInitials = (name = '') => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || '?';
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Avatar color based on name (deterministic)
  const AVATAR_COLORS = [
    '#2563EB', '#7C3AED', '#059669', '#D97706', '#DC2626',
    '#0891B2', '#BE185D', '#4F46E5', '#047857', '#B45309',
  ];
  const avatarColor = AVATAR_COLORS[
    (contact.name || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % AVATAR_COLORS.length
  ];

  // Format date for CDT display
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      });
    } catch { return '—'; }
  };

  return (
    <tr
      className={`
        hover:bg-[#F8FAFC] transition-colors cursor-pointer
        ${isSelected ? 'bg-[#EEF4FF]' : ''}
      `}
      onClick={(e) => {
        if (e.target.closest('input[type="checkbox"]')) return;
        onRowClick();
      }}
    >
      {/* Checkbox */}
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
          className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB] cursor-pointer"
        />
      </td>

      {/* Contact name + avatar */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-2.5">
          {contact.avatarUrl ? (
            <img
              src={contact.avatarUrl}
              alt={contact.name}
              className="w-7 h-7 rounded-full object-cover shrink-0"
            />
          ) : (
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
              style={{ backgroundColor: avatarColor }}
            >
              {getInitials(contact.name)}
            </div>
          )}
          <div>
            <div className="text-[13px] font-medium text-[#26344D] leading-tight">
              {contact.name || '—'}
            </div>
            {contact.dnd && (
              <span className="text-[10px] text-[#EF4444] font-medium">DND</span>
            )}
          </div>
        </div>
      </td>

      {/* Phone */}
      <td className="px-4 py-3 text-[13px] text-[#64748B] whitespace-nowrap">
        {formatPhone(contact.phone)}
      </td>

      {/* Email */}
      <td className="px-4 py-3 text-[13px] text-[#64748B] whitespace-nowrap max-w-[200px]">
        <span className="truncate block">{contact.email || '—'}</span>
      </td>

      {/* Business name */}
      <td className="px-4 py-3 text-[13px] text-[#64748B] whitespace-nowrap">
        {contact.businessName || contact.company || '—'}
      </td>

      {/* Created (CDT) */}
      <td className="px-4 py-3 text-[13px] text-[#64748B] whitespace-nowrap">
        {formatDate(contact.createdAt)}
      </td>

      {/* Last activity (CDT) */}
      <td className="px-4 py-3 text-[13px] text-[#64748B] whitespace-nowrap">
        {formatDate(contact.lastActivity || contact.lastContactAt)}
      </td>

      {/* Tags */}
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {(contact.tags || []).slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-[#EEF4FF] text-[#2563EB] text-[10px] font-medium"
            >
              {tag}
            </span>
          ))}
          {(contact.tags || []).length > 3 && (
            <span className="px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#64748B] text-[10px] font-medium">
              +{contact.tags.length - 3}
            </span>
          )}
        </div>
      </td>
    </tr>
  );
}
