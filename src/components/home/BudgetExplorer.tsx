'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const BUDGET_RANGES = [
  { label: 'Under ₹1 Cr', min: 0, max: 10000000, description: 'Plots & Compact Suites', count: '10+ Listings' },
  { label: '₹1 Cr – ₹2.5 Cr', min: 10000000, max: 25000000, description: 'Sector 150 Luxury 3 BHKs', count: '18+ Listings' },
  { label: '₹2.5 Cr – ₹5 Cr', min: 25000000, max: 50000000, description: 'Golf Suites & Commercial Grade-A', count: '14+ Listings' },
  { label: '₹5 Cr – ₹10 Cr', min: 50000000, max: 100000000, description: 'Sky Villas & Gated Estates', count: '9+ Listings' },
  { label: '₹10 Cr+', min: 100000000, max: 500000000, description: 'Trophy Penthouses & DLF 5', count: '6+ Listings' }
];

export default function BudgetExplorer() {
  return (
    <section className="py-20 bg-white border-b border-zinc-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Financial Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-950 tracking-tight">
              Explore by Allocation Budget
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-light max-w-xl">
              Targeted real estate discovery aligned with your capital deployment requirements across Delhi NCR.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-black transition-colors"
          >
            <span>Custom Price Filter</span>
            <ArrowRight className="w-4 h-4 text-zinc-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {BUDGET_RANGES.map((b, idx) => (
            <Link
              key={idx}
              href={`/properties?minPrice=${b.min}&maxPrice=${b.max}`}
              className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-black hover:bg-white shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{b.count}</span>
                <h3 className="text-xl font-serif font-bold text-zinc-950 group-hover:text-zinc-700 transition-colors">
                  {b.label}
                </h3>
                <p className="text-xs text-zinc-500 font-light leading-relaxed">
                  {b.description}
                </p>
              </div>

              <div className="text-xs font-semibold text-zinc-900 flex items-center gap-1 group-hover:text-black">
                <span>View Matches</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-zinc-400 group-hover:text-black" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
