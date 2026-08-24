'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Scale, Sparkles, MapPin } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';

export default function MobileNav() {
  const pathname = usePathname();
  const { compareList } = useCompare();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide on admin routes
  if (pathname.startsWith('/admin')) return null;

  const navItems = [
    { href: '/', label: 'Home', icon: Home, match: (p: string) => p === '/' },
    { href: '/properties', label: 'Properties', icon: Compass, match: (p: string) => p.startsWith('/properties') },
    { href: '/locations', label: 'Locations', icon: MapPin, match: (p: string) => p.startsWith('/locations') },
    { href: '/compare', label: 'Compare', icon: Scale, match: (p: string) => p === '/compare', count: mounted ? compareList.length : 0 },
    { href: '/find-property', label: 'Match', icon: Sparkles, match: (p: string) => p === '/find-property' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white/95 dark:bg-black/95 backdrop-blur-2xl border-t border-neutral-200 dark:border-charcoal-700 z-40 lg:hidden py-1.5 px-2 shadow-2xl safe-area-pb transition-colors duration-200">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.match(pathname);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl transition-all relative min-w-[56px] ${
                isActive 
                  ? 'text-ink dark:text-white font-bold bg-neutral-100 dark:bg-charcoal-800' 
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-700 dark:text-accent' : ''}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
              {item.count && item.count > 0 ? (
                <span className="absolute top-0.5 right-2 w-3.5 h-3.5 rounded-full bg-accent text-black text-[9px] font-bold flex items-center justify-center shadow-sm">
                  {item.count}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
