'use client';

import { ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { AnalyticsCard, CardDropdown } from './AnalyticsCard';

const TYPE_OPTIONS = ['All', 'Phone', 'SMS'];
const USER_OPTIONS = ['All users', 'felipe perez'];

const STATS = [
  { label: 'Phone',         icon: Phone,        value: 0 },
  { label: 'SMS',           icon: MessageSquare, value: 0 },
  { label: 'Total pending', icon: null,          value: 0 },
];

export default function ManualActions() {
  return (
    <AnalyticsCard
      title="Manual actions"
      headerRight={
        <>
          <CardDropdown label="All" options={TYPE_OPTIONS} />
          <CardDropdown label="All users" options={USER_OPTIONS} />
        </>
      }
    >
      <div className="px-4 py-4">
        {/* Three stats row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {STATS.map(({ label, icon: Icon, value }) => (
            <div key={label} className="flex flex-col items-center gap-1 p-3 bg-[#F8FAFC] rounded-[6px]">
              {Icon && <Icon className="w-4 h-4 text-[#64748B]" strokeWidth={1.6} />}
              <span className="text-[18px] font-bold text-[#26344D] leading-none">{value}</span>
              <span className="text-[10px] text-[#64748B] text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>

        {/* Go to link */}
        <div className="flex justify-end">
          <a
            href="/dashboard/automation"
            className="inline-flex items-center gap-1 text-[11.5px] text-[#2563EB] font-medium hover:text-[#1D4ED8] transition-colors"
          >
            Go to manual actions
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </AnalyticsCard>
  );
}
