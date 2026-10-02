'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CompareDrawer from '@/components/common/CompareDrawer';
import MobileNav from '@/components/layout/MobileNav';
import WhatsAppButton from '@/components/common/WhatsAppButton';

interface LayoutShellProps {
  children: React.ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {/* If not homepage, render the site-wide standard navbar */}
      {!isHomePage && <Navbar />}

      {/* Main content container */}
      <main className="flex-grow">
        {children}
      </main>

      {/* If not homepage, render standard footer (homepage includes LuxuryFooter) */}
      {!isHomePage && <Footer />}

      {/* Site-wide utilities */}
      <CompareDrawer />
      <MobileNav />
      <WhatsAppButton />
    </>
  );
}
