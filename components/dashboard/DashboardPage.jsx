'use client';

import DashboardToolbar   from './DashboardToolbar';
import OpportunityStatus  from './OpportunityStatus';
import OpportunityValue   from './OpportunityValue';
import ConversionRate     from './ConversionRate';
import Funnel             from './Funnel';
import StageDistribution  from './StageDistribution';
import Tasks              from './Tasks';
import ManualActions      from './ManualActions';
import LeadSourceReport   from './LeadSourceReport';
import GoogleAnalyticsReport from './GoogleAnalyticsReport';

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto light-scroll bg-[#F8FAFC]">
      {/* ── Toolbar (sticky below TopHeader) ── */}
      <DashboardToolbar />

      {/* ── Scrollable content ── */}
      <div className="flex-1 px-5 py-4 space-y-3">

        {/* ── ROW 1: Opportunity Status | Value | Conversion ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Opportunity Status — ~38% */}
          <div className="md:col-span-5">
            <OpportunityStatus />
          </div>

          {/* Opportunity Value — ~31% */}
          <div className="md:col-span-4">
            <OpportunityValue />
          </div>

          {/* Conversion Rate — ~25% */}
          <div className="md:col-span-3">
            <ConversionRate />
          </div>
        </div>

        {/* ── ROW 2: Funnel | Stage Distribution ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Funnel — ~60% */}
          <div className="md:col-span-7">
            <Funnel />
          </div>

          {/* Stage Distribution — ~40% */}
          <div className="md:col-span-5">
            <StageDistribution />
          </div>
        </div>

        {/* ── ROW 3: Tasks | Manual Actions ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Tasks — ~60% */}
          <div className="md:col-span-7">
            <Tasks />
          </div>

          {/* Manual Actions — ~40% */}
          <div className="md:col-span-5">
            <ManualActions />
          </div>
        </div>

        {/* ── ROW 4: Lead Source Report — full width ── */}
        <LeadSourceReport />

        {/* ── ROW 5: Google Analytics Report — full width ── */}
        <GoogleAnalyticsReport />

        {/* Bottom spacer */}
        <div className="h-4" />
      </div>
    </div>
  );
}
