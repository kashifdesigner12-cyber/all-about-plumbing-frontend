'use client';

const NAV_TABS = [
  { label: 'Invoices & Estimates', tab: 'invoices' },
  { label: 'Documents & Contracts', tab: 'documents' },
  { label: 'Orders', tab: 'orders' },
  { label: 'Subscriptions', tab: 'subscriptions' },
  { label: 'Payment Links', tab: 'payment-links' },
  { label: 'Transactions', tab: 'transactions' },
  { label: 'Products', tab: 'products' },
  { label: 'Coupons', tab: 'coupons' },
  { label: 'Gift Cards', tab: 'gift-cards' },
  { label: 'Settings', tab: 'settings' },
  { label: 'Integrations', tab: 'integrations' },
];

export default function PaymentsNav({ activeTab = 'invoices', onTabChange }) {
  return (
    <div
      className="flex items-center border-b border-[#E2E8F0] bg-white shrink-0 px-4 overflow-x-auto"
      style={{ minHeight: 40 }}
    >
      {NAV_TABS.map((item) => {
        const isActive = activeTab === item.tab;
        return (
          <button
            key={item.tab}
            id={`payments-nav-${item.tab}`}
            onClick={() => onTabChange && onTabChange(item.tab)}
            className={`
              relative flex items-center px-3 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-150 shrink-0
              ${isActive
                ? 'text-[#2563EB] border-b-2 border-[#2563EB] -mb-px'
                : 'text-[#64748B] hover:text-[#26344D] border-b-2 border-transparent -mb-px'
              }
            `}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
