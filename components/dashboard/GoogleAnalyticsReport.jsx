'use client';

import { BarChart2 } from 'lucide-react';
import { AnalyticsCard, EmptyState } from './AnalyticsCard';

export default function GoogleAnalyticsReport() {
  return (
    <AnalyticsCard
      title={
        <span>
          Google Analytics report{' '}
          <span className="text-[10.5px] font-normal text-[#94A3B8]">(Last 12 months)</span>
        </span>
      }
      headerRight={null}
    >
      <div className="flex items-center justify-center" style={{ minHeight: 200 }}>
        <EmptyState icon={BarChart2} text="No data found" />
      </div>
    </AnalyticsCard>
  );
}
