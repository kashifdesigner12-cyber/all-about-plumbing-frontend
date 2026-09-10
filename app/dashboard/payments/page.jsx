import { redirect } from 'next/navigation';

/**
 * /dashboard/payments — redirects to the default Payments section (Invoices).
 * When more sub-sections are built, this redirect can be updated accordingly.
 */
export default function PaymentsRoot() {
  redirect('/dashboard/payments/invoices');
}
