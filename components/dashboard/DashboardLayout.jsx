'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const SIDEBAR_W = 178; // px — matches CRM spec

function MobileDrawer({ isOpen, onClose }) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed inset-y-0 left-0 z-50 md:hidden shadow-2xl"
            style={{ width: SIDEBAR_W }}
          >
            <button
              onClick={onClose}
              className="absolute -right-10 top-3 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </button>
            <Sidebar />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      {/* ── Desktop Sidebar ── */}
      <div
        className="hidden md:flex flex-col flex-shrink-0"
        style={{ width: SIDEBAR_W }}
      >
        <Sidebar />
      </div>

      {/* ── Main column ── */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <TopHeader onMenuToggle={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-hidden flex flex-col min-h-0">
          {children}
        </main>
      </div>

      {/* ── Mobile Drawer ── */}
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}
