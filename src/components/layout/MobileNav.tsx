'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Scale, Sparkles, Phone, MapPin } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';

export default function MobileNav() {
  const pathname = usePathname();
  const { compareList } = useCompare();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) return null;

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-[#09090b]/95 backdrop-blur-2xl border-t border-white/10 z-40 lg:hidden py-2 px-3 shadow-2xl safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 py-1.5 px-2.5 rounded-xl transition-all ${
            pathname === '/' ? 'text-white font-bold bg-white/10' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">Home</span>
        </Link>

        <Link
          href="/properties"
          className={`flex flex-col items-center gap-1 py-1.5 px-2.5 rounded-xl transition-all ${
            pathname.startsWith('/properties') ? 'text-white font-bold bg-white/10' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">Properties</span>
        </Link>

        <Link
          href="/locations"
          className={`flex flex-col items-center gap-1 py-1.5 px-2.5 rounded-xl transition-all ${
            pathname.startsWith('/locations') ? 'text-white font-bold bg-white/10' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">Locations</span>
        </Link>

        <Link
          href="/compare"
          className={`flex flex-col items-center gap-1 py-1.5 px-2.5 rounded-xl transition-all relative ${
            pathname === '/compare' ? 'text-white font-bold bg-white/10' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">Compare</span>
          {compareList.length > 0 && (
            <span className="absolute -top-0.5 right-1 w-4 h-4 rounded-full bg-white text-black text-[9px] font-bold flex items-center justify-center shadow-sm">
              {compareList.length}
            </span>
          )}
        </Link>

        <Link
          href="/find-property"
          className={`flex flex-col items-center gap-1 py-1.5 px-2.5 rounded-xl transition-all ${
            pathname === '/find-property' ? 'text-white font-bold bg-white/10' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-zinc-300" />
          <span className="text-[10px] tracking-tight">Match</span>
        </Link>
      </div>
    </nav>
  );
}
