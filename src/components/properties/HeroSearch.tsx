'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Target, 
  Sparkles
} from 'lucide-react';

export default function HeroSearch() {
  const router = useRouter();

  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('All');
  const [budget, setBudget] = useState('All');
  const [purpose, setPurpose] = useState('End Use');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (category && category !== 'All') params.set('category', category);
    if (location && location !== 'All') {
      if (location.includes('Sector')) {
        params.set('locality', location);
      } else {
        params.set('city', location);
      }
    }

    if (budget && budget !== 'All') {
      if (budget === 'under-1.5cr') {
        params.set('maxPrice', '15000000');
      } else if (budget === '1.5cr-3cr') {
        params.set('minPrice', '15000000');
        params.set('maxPrice', '30000000');
      } else if (budget === '3cr-6cr') {
        params.set('minPrice', '30000000');
        params.set('maxPrice', '60000000');
      } else if (budget === '6cr-12cr') {
        params.set('minPrice', '60000000');
        params.set('maxPrice', '120000000');
      } else if (budget === 'above-12cr') {
        params.set('minPrice', '120000000');
      }
    }

    if (purpose) params.set('purpose', purpose);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#121214]/90 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl p-4 sm:p-6 text-white">
      {/* Purpose Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-zinc-300" />
            <span>Investment Focus:</span>
          </span>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-black/60 border border-white/10">
          {(['End Use', 'Investment', 'Both'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPurpose(p)}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                purpose === p
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {p === 'Both' ? 'Hybrid (Living + ROI)' : p}
            </button>
          ))}
        </div>
      </div>

      {/* 4-Field Fast Discovery Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
        {/* Field 1: Category */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-white focus:outline-none cursor-pointer"
          >
            <option value="All" className="bg-zinc-950">All Categories</option>
            <option value="Apartments" className="bg-zinc-950">Luxury Apartments</option>
            <option value="Villas" className="bg-zinc-950">Villas &amp; Farmhouses</option>
            <option value="Plots" className="bg-zinc-950">Land &amp; Plots</option>
            <option value="Commercial" className="bg-zinc-950">Commercial &amp; Offices</option>
          </select>
        </div>

        {/* Field 2: Location */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Corridor
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-white focus:outline-none cursor-pointer"
          >
            <option value="All" className="bg-zinc-950">All NCR &amp; Beyond</option>
            <option value="Noida Expressway" className="bg-zinc-950">Noida Expressway</option>
            <option value="Sector 150" className="bg-zinc-950">Sector 150, Noida</option>
            <option value="Golf Course Road" className="bg-zinc-950">Golf Course Road, Gurgaon</option>
            <option value="Yamuna Expressway" className="bg-zinc-950">Yamuna Expressway / Jewar</option>
            <option value="Goa" className="bg-zinc-950">Goa (Assagao &amp; Coastal)</option>
            <option value="Rishikesh" className="bg-zinc-950">Rishikesh &amp; Tehri</option>
          </select>
        </div>

        {/* Field 3: Budget */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Budget
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-white focus:outline-none cursor-pointer"
          >
            <option value="All" className="bg-zinc-950">Any Budget</option>
            <option value="under-1.5cr" className="bg-zinc-950">Under ₹1.5 Cr</option>
            <option value="1.5cr-3cr" className="bg-zinc-950">₹1.5 Cr – ₹3 Cr</option>
            <option value="3cr-6cr" className="bg-zinc-950">₹3 Cr – ₹6 Cr</option>
            <option value="6cr-12cr" className="bg-zinc-950">₹6 Cr – ₹12 Cr</option>
            <option value="above-12cr" className="bg-zinc-950">₹12 Cr+ Ultra Luxury</option>
          </select>
        </div>

        {/* Action Button */}
        <div>
          <button
            type="submit"
            className="w-full h-11 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 group"
          >
            <Search className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
            <span>Search Verified</span>
          </button>
        </div>
      </form>
    </div>
  );
}
