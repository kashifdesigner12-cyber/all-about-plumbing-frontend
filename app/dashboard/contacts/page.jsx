'use client';

/**
 * /dashboard/contacts/page.jsx
 *
 * This is the Next.js page entry point for the Contacts route.
 *
 * FRONTEND ONLY — No backend, no API calls, no dummy data.
 * contacts = [] until backend integration is implemented.
 *
 * When backend is ready:
 *   1. Import your contactService (or use React Query / SWR)
 *   2. Fetch contacts here and pass them to ContactsPage as props
 *   3. Wire up callbacks: onAddContact, onImport, onRowClick, etc.
 *
 * Example future integration:
 *
 *   const [contacts, setContacts] = useState([]);
 *   const [loading, setLoading] = useState(false);
 *   const [totalCount, setTotalCount] = useState(0);
 *
 *   useEffect(() => {
 *     setLoading(true);
 *     contactService.getContacts({ page, search, sort }).then(res => {
 *       setContacts(res.data);
 *       setTotalCount(res.total);
 *       setLoading(false);
 *     });
 *   }, [page, search, sort]);
 */

import { useRouter } from 'next/navigation';
import ContactsPage from '@/components/dashboard/contacts/ContactsPage';

export default function ContactsRoute() {
  const router = useRouter();

  // ── Future: wire these to real service calls ──────────────────────────────
  const handleAddContact = () => {
    // TODO: open Add Contact modal or navigate to creation form
    console.log('[Contacts] Add Contact clicked — backend integration pending');
  };

  const handleImport = () => {
    // TODO: open Import wizard
    console.log('[Contacts] Import clicked — backend integration pending');
  };

  const handleRowClick = (contact) => {
    // Navigate to contact detail page
    router.push(`/dashboard/contacts/${contact.id}`);
  };

  const handleSortChange = (field, dir) => {
    // TODO: pass sort params to backend query
    console.log('[Contacts] Sort changed:', field, dir);
  };

  const handleSearchChange = (query) => {
    // TODO: debounce & pass to backend query
    console.log('[Contacts] Search:', query);
  };

  const handlePageChange = (page) => {
    // TODO: pass page param to backend query
    console.log('[Contacts] Page:', page);
  };

  return (
    <ContactsPage
      // ── Data — empty until backend connected ──
      contacts={[]}
      totalCount={0}
      totalPages={1}
      loading={false}
      // ── Callbacks ──
      onAddContact={handleAddContact}
      onImport={handleImport}
      onRowClick={handleRowClick}
      onSortChange={handleSortChange}
      onSearchChange={handleSearchChange}
      onPageChange={handlePageChange}
    />
  );
}
