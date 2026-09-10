'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { SlidersHorizontal } from 'lucide-react';
import { AnalyticsCard, CardDropdown } from './AnalyticsCard';

const PIPELINE_OPTIONS = ['All pipelines', 'DB Re-Activation'];

// 0% conversion — full empty ring with tiny blue indicator
const DATA = [
  { name: 'Won', value: 0.001, color: '#2563EB' },
  { name: 'Rest', value: 99.999, color: '#E2E8F0' },
];

const CenterLabel = ({ cx, cy }) => (
  <>
    <text x={cx} y={cy - 6} textAnchor="middle" fill="#26344D" fontSize={20} fontWeight={700}>
      0%
    </text>
  </>
);

export default function ConversionRate() {
  return (
    <AnalyticsCard
      title="Conversion rate"
      headerRight={
        <>
          <CardDropdown label="All pipelines" options={PIPELINE_OPTIONS} />
          <button className="p-1 rounded hover:bg-[#F8FAFC] text-[#64748B]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </>
      }
    >
      <div className="px-4 py-3 flex flex-col items-center">
        {/* Ring chart */}
        <div style={{ width: 130, height: 130 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DATA}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={56}
                startAngle={90}
                endAngle={-270}
                paddingAngle={0}
                dataKey="value"
                labelLine={false}
                label={<CenterLabel />}
              >
                {DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Won revenue info */}
        <div className="text-center mt-1">
          <p className="text-[11px] text-[#64748B]">Won revenue</p>
          <p className="text-[15px] font-bold text-[#26344D] mt-0.5">$0</p>
        </div>
      </div>
    </AnalyticsCard>
  );
}
