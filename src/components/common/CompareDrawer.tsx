'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, X, Scale, Trash2 } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { formatPrice } from '@/lib/utils';

export default function CompareDrawer() {
  const { compareList, removeFromCompare, clearCompare, isDrawerOpen, setIsDrawerOpen } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Pill when closed */}
      {!isDrawerOpen ? (
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="px-4 py-3 rounded-2xl bg-black text-white border border-white/20 shadow-2xl flex items-center gap-3 hover:scale-105 transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-xs">
            <Scale className="w-4 h-4" />
          </div>
          <div className="text-left text-xs">
            <div className="font-bold text-white group-hover:underline transition-colors">Compare Properties</div>
            <div className="text-[10px] text-zinc-400 font-light">{compareList.length} shortlisted</div>
          </div>
          <span className="w-5 h-5 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center ml-1">
            {compareList.length}
          </span>
        </button>
      ) : (
        /* Expanded Drawer */
        <div className="bg-[#09090b]/98 backdrop-blur-xl border border-white/15 rounded-3xl p-5 shadow-2xl w-80 sm:w-96 text-white space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-white" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Compare Shortlist ({compareList.length}/4)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {compareList.map((prop) => (
              <div
                key={prop.id}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-black border border-white/10 text-xs"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <img
                    src={prop.images[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=80&q=80'}
                    alt={prop.title}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                  <div className="truncate">
                    <div className="font-bold text-white truncate">{prop.title}</div>
                    <div className="text-[10px] text-zinc-300 font-serif">{prop.priceDisplay || formatPrice(prop.price)}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCompare(prop.id)}
                  className="text-zinc-500 hover:text-red-400 p-1 shrink-0"
                  title="Remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={clearCompare}
              className="px-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold transition-colors border border-white/10"
              title="Clear all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <Link
              href="/compare"
              className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md text-center"
            >
              <span>Compare Side-by-Side</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
