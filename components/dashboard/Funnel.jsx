'use client';

import { SlidersHorizontal } from 'lucide-react';
import { AnalyticsCard, CardDropdown } from './AnalyticsCard';

const PIPELINE_OPTIONS = ['All pipelines', 'DB Re-Activation'];

const STAGES = [
  { name: 'Lead In',                         value: '$0', cum: '0.00%', next: '0.00%', width: 100 },
  { name: 'Lead Responded',                  value: '$0', cum: '0.00%', next: '0.00%', width: 80  },
  { name: 'No answer',                       value: '$0', cum: '0.00%', next: '0.00%', width: 65  },
  { name: 'Apt Completed / Quote Given',     value: '$0', cum: '0.00%', next: '0.00%', width: 52  },
  { name: 'Followup Not ready',              value: '$0', cum: '0.00%', next: '0.00%', width: 42  },
  { name: 'Not Qualified',                   value: '$0', cum: '0.00%', next: '0.00%', width: 34  },
  { name: 'No Show',                         value: '$0', cum: '0.00%', next: '0.00%', width: 26  },
  { name: 'Won',                             value: '$0', cum: '0.00%', next: '100.00%', width: 18 },
];

export default function Funnel() {
  return (
    <AnalyticsCard
      title="Funnel"
      headerRight={
        <>
          <CardDropdown label="DB Re-Activation" options={PIPELINE_OPTIONS} />
          <button className="p-1 rounded hover:bg-[#F8FAFC] text-[#64748B]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </>
      }
    >
      {/* Column headers */}
      <div className="flex items-center text-[10px] text-[#94A3B8] font-medium border-b border-[#F1F5F9] px-4 py-1.5">
        <div className="flex-1" />
        <div className="w-28 text-right pr-2">Cumulative</div>
        <div className="w-36 text-right">Next step conversion</div>
      </div>

      {/* Stage rows */}
      <div className="divide-y divide-[#F8FAFC]">
        {STAGES.map((stage, i) => (
          <div key={i} className="px-4 py-2 flex items-center gap-3 hover:bg-[#FAFBFC] transition-colors">
            {/* Stage bar + name */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11.5px] text-[#26344D] truncate">{stage.name}</span>
                <span className="text-[11px] text-[#64748B] shrink-0">{stage.value}</span>
              </div>
              {/* Horizontal bar */}
              <div className="h-4 bg-[#F1F5F9] rounded-sm overflow-hidden" style={{ width: '100%' }}>
                <div
                  className="h-full bg-[#BFDBFE] rounded-sm transition-all"
                  style={{ width: `${stage.width}%` }}
                />
              </div>
            </div>

            {/* Cumulative */}
            <div className="w-28 text-right text-[11px] text-[#64748B] shrink-0">
              {stage.cum}
            </div>

            {/* Next step conversion */}
            <div className="w-36 text-right text-[11px] text-[#64748B] shrink-0">
              {stage.next}
            </div>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
}
