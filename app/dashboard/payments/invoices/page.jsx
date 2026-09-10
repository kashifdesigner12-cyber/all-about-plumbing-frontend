import InvoicesPage from '@/components/dashboard/payments/InvoicesPage';

/**
 * /dashboard/payments/invoices
 *
 * This page renders the Payments → Invoices UI.
 *
 * Data / callbacks are intentionally left at empty defaults here.
 * When the backend is ready, this file is where you will:
 *   - Fetch invoice data (e.g. via SWR, React Query, or a server component)
 *   - Pass real invoices, totals, and summary counts as props to InvoicesPage
 *
 * Example future integration point:
 *
 *   const { data, isLoading } = useSWR('/api/invoices', fetcher);
 *   return (
 *     <InvoicesPage
 *       invoices={data?.invoices}
 *       draftCount={data?.summary.draft.count}
 *       ...
 *     />
 *   );
 */
export default function InvoicesRoute() {
  return <InvoicesPage />;
}
