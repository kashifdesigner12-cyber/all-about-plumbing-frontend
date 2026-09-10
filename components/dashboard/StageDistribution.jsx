'use client';

import { BarChart2, SlidersHorizontal } from 'lucide-react';
import { AnalyticsCard, CardDropdown, EmptyState } from './AnalyticsCard';

const PIPELINE_OPTIONS = ['All pipelines', 'DB Re-Activation'];

export default function StageDistribution() {
  return (
    <AnalyticsCard
      title="Stage distribution"
      headerRight={
        <>
          <CardDropdown label="DB Re-Activation" options={PIPELINE_OPTIONS} />
          <button className="p-1 rounded hover:bg-[#F8FAFC] text-[#64748B]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </>
      }
      className="h-full"
    >
      <div className="flex items-center justify-center" style={{ minHeight: 280 }}>
        <EmptyState icon={BarChart2} text="No data found" />
      </div>
    </AnalyticsCard>
  );
}
