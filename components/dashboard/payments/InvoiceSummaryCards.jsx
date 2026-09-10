'use client';

const SUMMARY_CARDS = [
  {
    id: 'draft',
    label: 'Invoice(s) in Draft',
    count: 0,
    amount: '$0.00',
    countColor: 'text-[#64748B]',
    amountColor: 'text-[#26344D]',
    borderColor: 'border-l-[#94A3B8]',
  },
  {
    id: 'due',
    label: 'Invoice(s) in Due',
    count: 0,
    amount: '$0.00',
    countColor: 'text-[#64748B]',
    amountColor: 'text-[#26344D]',
    borderColor: 'border-l-[#F59E0B]',
  },
  {
    id: 'received',
    label: 'Invoice(s) received',
    count: 0,
    amount: '$0.00',
    countColor: 'text-[#64748B]',
    amountColor: 'text-[#26344D]',
    borderColor: 'border-l-[#35A66F]',
  },
  {
    id: 'overdue',
    label: 'Invoice(s) Overdue',
    count: 0,
    amount: '$0.00',
    countColor: 'text-[#64748B]',
    amountColor: 'text-[#26344D]',
    borderColor: 'border-l-[#EF4444]',
  },
];

export default function InvoiceSummaryCards({
  draftCount = 0,
  draftAmount = '$0.00',
  dueCount = 0,
  dueAmount = '$0.00',
  receivedCount = 0,
  receivedAmount = '$0.00',
  overdueCount = 0,
  overdueAmount = '$0.00',
}) {
  const cardData = [
    { ...SUMMARY_CARDS[0], count: draftCount, amount: draftAmount },
    { ...SUMMARY_CARDS[1], count: dueCount, amount: dueAmount },
    { ...SUMMARY_CARDS[2], count: receivedCount, amount: receivedAmount },
    { ...SUMMARY_CARDS[3], count: overdueCount, amount: overdueAmount },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 px-5 py-4 bg-[#F8FAFC] border-b border-[#E2E8F0] shrink-0">
      {cardData.map((card) => (
        <div
          key={card.id}
          id={`summary-card-${card.id}`}
          className={`
            bg-white rounded-lg border border-[#E2E8F0] px-4 py-3
            border-l-[3px] ${card.borderColor}
            shadow-[0_1px_2px_0_rgba(0,0,0,0.04)]
            hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.07)] transition-shadow duration-150
          `}
        >
          {/* Count row */}
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-[20px] font-bold text-[#26344D] leading-none">
              {card.count}
            </span>
            <span className="text-[12px] text-[#64748B] leading-none">
              {card.label}
            </span>
          </div>

          {/* Amount */}
          <p className="text-[13px] font-semibold text-[#26344D]">
            {card.amount}
          </p>
        </div>
      ))}
    </div>
  );
}
