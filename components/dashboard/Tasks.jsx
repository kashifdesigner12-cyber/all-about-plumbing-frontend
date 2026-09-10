'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { AnalyticsCard, CardDropdown, EmptyState } from './AnalyticsCard';

const STATUS_OPTIONS = ['Pending', 'Completed', 'Cancelled'];
const DUE_OPTIONS = ['Due date', 'Due today', 'Overdue', 'No due date'];
const USER_OPTIONS = ['All users', 'felipe perez'];

export default function Tasks() {
  return (
    <AnalyticsCard
      title="Tasks"
      headerRight={
        <>
          <CardDropdown label="Pending" options={STATUS_OPTIONS} />
          <CardDropdown label="Due dat..." options={DUE_OPTIONS} />
          <CardDropdown label="All users" options={USER_OPTIONS} />
        </>
      }
    >
      <div className="flex items-center justify-center" style={{ minHeight: 200 }}>
        <EmptyState icon={Search} text="No data found" />
      </div>
    </AnalyticsCard>
  );
}
