'use client';

/* ─────────────────────────────────────────────
   Static presentation data — NOT backend data.
   These values come directly from the reference
   design screenshots and are marketing copy only.
───────────────────────────────────────────── */
const TABLE_ROWS = [
  {
    metric:      'Missed Calls Every Month',
    human:       '62%',
    ai:          '<3%',
    impact:      'Very High',
    impactColor: 'text-rose-600',
    estimate:    '+$12k–$28k/mo',
  },
  {
    metric:      'Missed Chat Conversations',
    human:       '78%',
    ai:          '0%',
    impact:      'High',
    impactColor: 'text-orange-500',
    estimate:    '+$8k–$18k/mo',
  },
  {
    metric:      'Employee Availability',
    human:       '8 hrs/day',
    ai:          '24x7',
    impact:      'High',
    impactColor: 'text-orange-500',
    estimate:    '+$6k–$14k/mo',
  },
  {
    metric:      'Response Time',
    human:       '~34 min',
    ai:          '<1 sec',
    impact:      'Medium-High',
    impactColor: 'text-amber-500',
    estimate:    '+$4k–$10k/mo',
  },
  {
    metric:      'Review Response Rate',
    human:       '11%',
    ai:          '98%',
    impact:      'Medium',
    impactColor: 'text-yellow-600',
    estimate:    '+$2k–$6k/mo',
  },
  {
    metric:      'Lead Conversion Rate',
    human:       '23%',
    ai:          '48%',
    impact:      'Very High',
    impactColor: 'text-rose-600',
    estimate:    '+$15k–$40k/mo',
  },
];

/* ─────────────────────────────────────────────
   StatsComparison — "Numbers don't lie" section
   Combines the section header + the full
   Human Agent vs AI Agent comparison table
   (formerly NumbersDontLie + ComparisonTable).
───────────────────────────────────────────── */
export default function StatsComparison() {
  return (
    <section className="bg-[#F8FAFC] px-6 py-14 lg:px-12 lg:py-16 border-t border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-[1.85rem] lg:text-[2.2rem] font-bold text-[#26344D] tracking-tight leading-tight">
            Numbers don't lie
          </h2>
          <p className="mt-2.5 text-[14.5px] text-[#64748B] max-w-lg mx-auto leading-relaxed">
            80% of leads are lost in the first 5 minutes. Respond to leads instantly, beat your competition.
          </p>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto light-scroll rounded-2xl border border-[#E2E8F0] shadow-sm">
          <table className="w-full min-w-[640px] text-[13px]">

            {/* ── Header ── */}
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="text-left px-5 py-3.5 text-[12px] font-semibold text-[#64748B] uppercase tracking-wide w-[26%]">
                  Metric
                </th>
                <th className="text-center px-4 py-3.5 text-[12px] font-semibold text-[#64748B] uppercase tracking-wide w-[16%]">
                  Human Agent
                </th>
                <th
                  className="text-center px-4 py-3.5 text-[12px] font-semibold uppercase tracking-wide w-[16%]"
                  style={{ color: '#7C3AED', background: 'rgba(139,92,246,0.04)' }}
                >
                  AI Agent
                </th>
                <th
                  className="text-center px-4 py-3.5 text-[12px] font-semibold text-[#64748B] uppercase tracking-wide w-[18%]"
                  style={{ background: 'rgba(139,92,246,0.03)' }}
                >
                  Revenue Impact
                </th>
                <th className="text-left px-5 py-3.5 text-[12px] font-semibold text-[#64748B] uppercase tracking-wide w-[24%]">
                  Estimate
                </th>
              </tr>
            </thead>

            {/* ── Body ── */}
            <tbody>
              {TABLE_ROWS.map((row, i) => (
                <tr
                  key={row.metric}
                  className={`border-b border-[#F1F5F9] transition-colors hover:bg-white ${
                    i === TABLE_ROWS.length - 1 ? 'border-0' : ''
                  }`}
                >
                  {/* Metric */}
                  <td className="px-5 py-4 font-medium text-[#26344D]">{row.metric}</td>

                  {/* Human Agent */}
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-[12.5px] font-semibold bg-[#F1F5F9] text-[#64748B]">
                      {row.human}
                    </span>
                  </td>

                  {/* AI Agent */}
                  <td className="px-4 py-4 text-center" style={{ background: 'rgba(139,92,246,0.04)' }}>
                    <span
                      className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-[12.5px] font-bold"
                      style={{
                        background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(79,70,229,0.1) 100%)',
                        color: '#6D28D9',
                        border: '1px solid rgba(139,92,246,0.2)',
                      }}
                    >
                      {row.ai}
                    </span>
                  </td>

                  {/* Revenue Impact */}
                  <td className="px-4 py-4 text-center" style={{ background: 'rgba(139,92,246,0.03)' }}>
                    <span className={`text-[12.5px] font-semibold ${row.impactColor}`}>
                      {row.impact}
                    </span>
                  </td>

                  {/* Estimate */}
                  <td className="px-5 py-4">
                    <span className="text-[12.5px] font-semibold text-[#26344D]">{row.estimate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
