'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import { SlidersHorizontal } from 'lucide-react';
import { AnalyticsCard, CardDropdown } from './AnalyticsCard';

const PIPELINE_OPTIONS = ['All pipelines', 'DB Re-Activation'];

// Demo data — all zero to match screenshot
const chartData = [
  { name: 'Open', value: 0 },
];

// Axis ticks that match the reference
const Y_TICKS = [0, 0.2, 0.4, 0.6, 0.8, 1.0];

const tickFormatter = (v) => `$${v}`;

export default function OpportunityValue() {
  return (
    <AnalyticsCard
      title="Opportunity value"
      headerRight={
        <>
          <CardDropdown label="All pipelines" options={PIPELINE_OPTIONS} />
          <button className="p-1 rounded hover:bg-[#F8FAFC] text-[#64748B]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </>
      }
    >
      <div className="px-4 pt-3 pb-2">
        {/* Chart */}
        <div style={{ height: 110 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: '#94A3B8' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                ticks={Y_TICKS}
                tickFormatter={tickFormatter}
                tick={{ fontSize: 10, fill: '#94A3B8' }}
                axisLine={false}
                tickLine={false}
                domain={[0, 1]}
              />
              <Bar dataKey="value" fill="#2563EB" radius={[2, 2, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom label + value */}
        <div className="flex items-center justify-between mt-1.5 border-t border-[#F1F5F9] pt-2">
          <span className="text-[11px] text-[#64748B]">Total revenue</span>
          <span className="text-[12px] font-bold text-[#26344D]">$0</span>
        </div>
      </div>
    </AnalyticsCard>
  );
}
