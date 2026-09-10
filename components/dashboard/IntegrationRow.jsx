'use client';

import { useState } from 'react';

/**
 * A single integration row inside the Launchpad card.
 *
 * Props:
 *  - icon: ReactNode
 *  - title: string | ReactNode
 *  - description: string | ReactNode
 *  - subtext: string | ReactNode (optional italic note)
 *  - buttonLabel: string
 *  - buttonVariant: 'green' | 'blue' (default 'blue')
 *  - onAction: function (optional)
 */
export default function IntegrationRow({
  icon,
  title,
  description,
  subtext,
  buttonLabel = 'Connect',
  buttonVariant = 'blue',
  onAction,
}) {
  const [state, setState] = useState('idle'); // idle | loading | done

  const handleClick = async () => {
    setState('loading');
    await new Promise((r) => setTimeout(r, 1200));
    setState('done');
    onAction?.();
    // reset after 3s
    setTimeout(() => setState('idle'), 3000);
  };

  const isGreen = buttonVariant === 'green';

  const btnBase =
    'inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded transition-all duration-150 shrink-0 min-w-[72px]';

  const btnStyle = isGreen
    ? 'bg-[#35A66F] hover:bg-[#2d8f60] text-white'
    : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white';

  const btnDone = 'bg-green-100 text-green-700 cursor-default';

  return (
    <div className="flex items-start gap-3 py-3 px-4 border-b border-[#E2E8F0] last:border-0">
      {/* Icon area */}
      <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 mt-0.5">
        {icon}
      </div>

      {/* Text area */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-[12.5px] font-semibold text-[#26344D] leading-tight mb-0.5">
            {title}
          </p>
        )}
        <p className="text-[12px] text-[#64748B] leading-snug">{description}</p>
        {subtext && (
          <p className="text-[11px] text-[#94A3B8] italic leading-snug mt-0.5">{subtext}</p>
        )}
      </div>

      {/* Action button */}
      <button
        onClick={state === 'idle' ? handleClick : undefined}
        disabled={state === 'loading'}
        className={`${btnBase} ${state === 'done' ? btnDone : btnStyle} ${state === 'loading' ? 'opacity-70 cursor-wait' : ''}`}
      >
        {state === 'loading' && (
          <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {state === 'done' ? '✓ Done' : state === 'loading' ? 'Connecting...' : buttonLabel}
      </button>
    </div>
  );
}
