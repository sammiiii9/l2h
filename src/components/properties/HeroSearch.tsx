'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Building2, 
  IndianRupee, 
  Target, 
  SlidersHorizontal,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function HeroSearch() {
  const router = useRouter();

  const [lookingFor, setLookingFor] = useState('All');
  const [propertyType, setPropertyType] = useState('All');
  const [location, setLocation] = useState('All');
  const [budget, setBudget] = useState('All');
  const [purpose, setPurpose] = useState('End Use');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (lookingFor && lookingFor !== 'All') params.set('category', lookingFor);
    if (propertyType && propertyType !== 'All') params.set('propertyType', propertyType);
    if (location && location !== 'All') {
      if (location.includes('Gurgaon') || location.includes('Noida')) {
        if (location.includes('Sector')) {
          params.set('locality', location);
        } else {
          params.set('city', location);
        }
      } else {
        params.set('locality', location);
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
    <div className="w-full max-w-5xl mx-auto bg-[#0c0c0e]/90 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl p-5 sm:p-7 text-white">
      {/* Purpose Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10 mb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-zinc-300" />
            <span>Investment Objective:</span>
          </span>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-black/60 border border-white/10">
          {(['End Use', 'Investment', 'Both'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPurpose(p)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                purpose === p
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {p === 'Both' ? 'Hybrid (End Use + ROI)' : p}
            </button>
          ))}
        </div>
      </div>

      {/* 5-Field Discovery Grid */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
        {/* Field 1: Looking For */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Category
          </label>
          <select
            value={lookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:border-white focus:outline-none cursor-pointer"
          >
            <option value="All" className="bg-zinc-950">All Categories</option>
            <option value="Apartments" className="bg-zinc-950">Luxury Apartments</option>
            <option value="Villas" className="bg-zinc-950">Villas &amp; Farmhouses</option>
            <option value="Plots" className="bg-zinc-950">Land &amp; Plots</option>
            <option value="Commercial" className="bg-zinc-950">Commercial &amp; Offices</option>
          </select>
        </div>

        {/* Field 2: Property Type */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Property Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:border-white focus:outline-none cursor-pointer"
          >
            <option value="All" className="bg-zinc-950">Any Type</option>
            <option value="Apartment" className="bg-zinc-950">Apartment</option>
            <option value="Penthouse" className="bg-zinc-950">Penthouse</option>
            <option value="Villa" className="bg-zinc-950">Villa</option>
            <option value="Plot" className="bg-zinc-950">Plot / Land</option>
            <option value="Office" className="bg-zinc-950">Office Suite</option>
            <option value="Retail" className="bg-zinc-950">Retail Shop</option>
          </select>
        </div>

        {/* Field 3: Location */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Prime Corridor
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:border-white focus:outline-none cursor-pointer"
          >
            <option value="All" className="bg-zinc-950">All Corridors &amp; Regions</option>
            <option value="Noida Expressway" className="bg-zinc-950">Noida Expressway</option>
            <option value="Sector 150" className="bg-zinc-950">Sector 150, Noida</option>
            <option value="Sector 128" className="bg-zinc-950">Jaypee Greens, Sec 128</option>
            <option value="Yamuna Expressway" className="bg-zinc-950">Yamuna Expressway / Jewar</option>
            <option value="Golf Course Road" className="bg-zinc-950">Golf Course Road, Gurgaon</option>
            <option value="Goa" className="bg-zinc-950">Goa (Assagao &amp; Coastal)</option>
            <option value="Rishikesh" className="bg-zinc-950">Rishikesh (Ganges Foothills)</option>
            <option value="Tehri Garhwal" className="bg-zinc-950">Tehri Lake &amp; Garhwal</option>
            <option value="Jim Corbett" className="bg-zinc-950">Jim Corbett / Ramnagar</option>
            <option value="Dholera" className="bg-zinc-950">Dholera SIR (Smart City)</option>
          </select>
        </div>

        {/* Field 4: Budget */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Budget Spectrum
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:border-white focus:outline-none cursor-pointer"
          >
            <option value="All" className="bg-zinc-950">Any Investment Budget</option>
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
            <span>Search Portfolio</span>
          </button>
        </div>
      </form>
    </div>
  );
}
