'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Small inline dropdown used throughout the dashboard cards.
 * Props: label, options (array of strings), onChange (optional)
 */
export function CardDropdown({ label, options = [], onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(label);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-[11px] text-[#64748B] border border-[#E2E8F0] rounded px-2 py-1 bg-white hover:bg-[#F8FAFC] transition-colors"
      >
        <span>{selected}</span>
        <ChevronDown className="w-3 h-3 flex-shrink-0" />
      </button>
      {open && options.length > 0 && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-[#E2E8F0] rounded shadow-lg z-50 min-w-[140px] py-1">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { setSelected(opt); setOpen(false); onChange?.(opt); }}
              className={`block w-full text-left px-3 py-1.5 text-[11px] hover:bg-[#F8FAFC] transition-colors ${opt === selected ? 'text-[#2563EB] font-semibold' : 'text-[#26344D]'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Standard analytics card wrapper.
 */
export function AnalyticsCard({ title, headerRight, children, className = '' }) {
  return (
    <div className={`bg-white border border-[#E2E8F0] rounded-[6px] overflow-hidden ${className}`}>
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E2E8F0]">
        <span className="text-[12.5px] font-semibold text-[#26344D]">{title}</span>
        <div className="flex items-center gap-1.5">{headerRight}</div>
      </div>
      {/* Card body */}
      <div>{children}</div>
    </div>
  );
}

/**
 * Empty-state block used in multiple cards.
 */
export function EmptyState({ icon: Icon, text = 'No data found' }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-2 text-[#CBD5E1]">
      {Icon && <Icon className="w-8 h-8" strokeWidth={1.2} />}
      <p className="text-[11px] text-[#94A3B8]">{text}</p>
    </div>
  );
}
