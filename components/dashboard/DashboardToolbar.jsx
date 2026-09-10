'use client';

import { useState, useRef, useEffect } from 'react';
import {
  ChevronDown, Plus, Calendar, MoreVertical,
} from 'lucide-react';

const DATE_OPTIONS = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year'];
const DASH_OPTIONS = ['Dashboard', 'Overview', 'Reports'];

function ToolbarDropdown({ label, icon: Icon, options, variant = 'default' }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(label);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const base =
    'flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1.5 rounded border transition-colors';
  const styles = {
    default: 'bg-white border-[#E2E8F0] text-[#26344D] hover:bg-[#F8FAFC]',
    blue:    'bg-[#EEF4FF] border-[#BFDBFE] text-[#2563EB] hover:bg-[#DBEAFE]',
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className={`${base} ${styles[variant]}`}>
        {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
        <span>{selected}</span>
        <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />
      </button>
      {open && options.length > 0 && (
        <div className="absolute left-0 top-full mt-1 bg-white border border-[#E2E8F0] rounded-[6px] shadow-lg z-50 min-w-[150px] py-1">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { setSelected(opt); setOpen(false); }}
              className={`block w-full text-left px-3 py-1.5 text-[11.5px] hover:bg-[#F8FAFC] transition-colors ${
                opt === selected ? 'text-[#2563EB] font-semibold' : 'text-[#26344D]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function NewButton() {
  const [open, setOpen] = useState(false);
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
        className="flex items-center gap-1 text-[12px] font-medium px-2.5 py-1.5 rounded border border-[#E2E8F0] bg-white text-[#2563EB] hover:bg-[#EEF4FF] transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>New</span>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 bg-white border border-[#E2E8F0] rounded-[6px] shadow-lg z-50 min-w-[150px] py-1">
          {['Opportunity', 'Contact', 'Task'].map((opt) => (
            <button
              key={opt}
              onClick={() => setOpen(false)}
              className="block w-full text-left px-3 py-1.5 text-[11.5px] text-[#26344D] hover:bg-[#F8FAFC] transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DashboardToolbar() {
  return (
    <div className="flex flex-wrap items-center gap-2 px-5 py-2.5 bg-white border-b border-[#E2E8F0]">
      {/* Left side */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <ToolbarDropdown label="Dashboard" options={DASH_OPTIONS} />
        <NewButton />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <ToolbarDropdown
          label="Last 30 days"
          icon={Calendar}
          options={DATE_OPTIONS}
        />
        <button className="p-1.5 rounded border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
          <MoreVertical className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
