'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { SlidersHorizontal } from 'lucide-react';
import { AnalyticsCard, CardDropdown } from './AnalyticsCard';

const DEMO_DATA = [
  { name: 'Open', value: 1, color: '#2563EB' },
];
const EMPTY_RING = [{ name: 'empty', value: 1, color: '#E2E8F0' }];

const PIPELINE_OPTIONS = ['All pipelines', 'DB Re-Activation'];

const CustomLabel = ({ cx, cy }) => (
  <>
    <text x={cx} y={cy - 6} textAnchor="middle" fill="#26344D" fontSize={22} fontWeight={700}>1</text>
    <text x={cx} y={cy + 12} textAnchor="middle" fill="#64748B" fontSize={10}>Total</text>
  </>
);

export default function OpportunityStatus() {
  const data = DEMO_DATA;
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <AnalyticsCard
      title="Opportunity status"
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
        {/* Donut chart */}
        <div style={{ width: 140, height: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={46}
                outerRadius={62}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={<CustomLabel />}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, n) => [v, n]}
                contentStyle={{ fontSize: 11, borderRadius: 4, border: '1px solid #E2E8F0' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-full mt-2 space-y-1">
          {data.map((d) => (
            <div key={d.name} className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: d.color }} />
                <span className="text-[#64748B]">{d.name}</span>
              </div>
              <span className="font-semibold text-[#26344D]">{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </AnalyticsCard>
  );
}
