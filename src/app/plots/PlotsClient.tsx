'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Trees, 
  Search, 
  RotateCcw, 
  ShieldCheck, 
  MapPin, 
  FileCheck, 
  Compass, 
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { Property } from '@/types';
import PropertyCard from '@/components/properties/PropertyCard';
import LeadModal from '@/components/common/LeadModal';
import L2HConcierge from '@/components/common/L2HConcierge';

interface PlotsClientProps {
  initialProperties: Property[];
}

export default function PlotsClient({ initialProperties }: PlotsClientProps) {
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedTitleType, setSelectedTitleType] = useState('All');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  // Filter properties for plots only
  const plots = useMemo(() => {
    return initialProperties.filter(p => {
      const catLower = (p.category || '').toLowerCase();
      const typeLower = (p.propertyType || '').toLowerCase();
      return catLower === 'plots' || catLower === 'plot' || catLower === 'land' || typeLower === 'plot' || typeLower === 'land' || typeLower === 'farmhouse';
    });
  }, [initialProperties]);

  const filteredProperties = useMemo(() => {
    return plots.filter(p => {
      if (search) {
        const query = search.toLowerCase();
        const matches = 
          p.title.toLowerCase().includes(query) ||
          p.location.locality.toLowerCase().includes(query) ||
          p.location.city.toLowerCase().includes(query) ||
          (p.developer?.name && p.developer.name.toLowerCase().includes(query));
        if (!matches) return false;
      }

      if (selectedState !== 'All') {
        if (!p.location.state?.toLowerCase().includes(selectedState.toLowerCase()) && !p.location.city.toLowerCase().includes(selectedState.toLowerCase())) {
          return false;
        }
      }

      if (selectedTitleType !== 'All') {
        if (p.titleType !== selectedTitleType) {
          return false;
        }
      }

      return true;
    });
  }, [plots, search, selectedState, selectedTitleType]);

  const resetFilters = () => {
    setSearch('');
    setSelectedState('All');
    setSelectedTitleType('All');
  };

  return (
    <div className="bg-neutral dark:bg-black min-h-screen py-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Category Hero Banner — Real Land/Plot Architecture Photography */}
        <div className="relative rounded-3xl overflow-hidden bg-black text-white min-h-[380px] sm:min-h-[460px] flex items-center shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=85"
            alt="Plots & Land Pan-India Development"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />

          <div className="relative z-10 max-w-3xl p-8 sm:p-14 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-yellow-950/90 border border-yellow-700 text-yellow-300 text-xs font-bold uppercase tracking-wider">
              <Trees className="w-3.5 h-3.5" />
              <span>Category Focus • Pan-India</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Plots &amp; Clear-Title Land Parcels
            </h1>

            <p className="text-white text-sm sm:text-base font-normal leading-relaxed">
              &ldquo;Research-led plot opportunities across India, with location, title, approval, and exit considerations made visible.&rdquo;
            </p>

            {/* Diligence Matrix Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-charcoal-800 text-xs text-white font-normal">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>30-Year Title Scrutiny</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Master Plan Zoning</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span>Road Width &amp; Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-accent shrink-0" />
                <span>Exit Horizon Scrutiny</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 border border-neutral-200 dark:border-charcoal-800 shadow-luxury-soft space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-charcoal-800">
            <span className="text-xs uppercase tracking-wider font-bold text-ink dark:text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-700 dark:text-accent" />
              <span>Filters &amp; Criteria</span>
            </span>

            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-600 dark:text-neutral-300 font-medium hidden sm:inline">
                Showing <span className="font-bold text-amber-700 dark:text-accent">{filteredProperties.length}</span> Land Parcels
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-amber-700 dark:text-accent font-bold hover:underline flex items-center gap-1 uppercase tracking-wider"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink dark:text-white uppercase tracking-wider">
                Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search corridor, city, airport..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700 text-xs font-medium text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            {/* State / Corridor */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink dark:text-white uppercase tracking-wider">
                Corridor / State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700 text-xs font-medium text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              >
                <option value="All">All Corridors &amp; States</option>
                <option value="Uttar Pradesh">Yamuna Expressway &amp; YEIDA (UP)</option>
                <option value="Haryana">Aravalli &amp; Sohna Belt (Haryana)</option>
                <option value="Gujarat">Dholera SIR (Gujarat)</option>
                <option value="Uttarakhand">Corbett &amp; Himalayan Foothills</option>
              </select>
            </div>

            {/* Title Type */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink dark:text-white uppercase tracking-wider">
                Title &amp; Mutation Structure
              </label>
              <select
                value={selectedTitleType}
                onChange={(e) => setSelectedTitleType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700 text-xs font-medium text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              >
                <option value="All">All Title Types</option>
                <option value="Freehold">Freehold Registry</option>
                <option value="Leasehold">Authority Leasehold</option>
              </select>
            </div>

            {/* Reset / Actions */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink dark:text-white uppercase tracking-wider">
                Connect
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-100 dark:bg-charcoal-800 hover:bg-neutral-200 dark:hover:bg-charcoal-700 text-neutral-700 dark:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(true)}
                  className="py-2.5 px-4 rounded-xl bg-accent hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-gold-glow"
                >
                  Advisor
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Natural Language Advisory Concierge for Plots */}
        <L2HConcierge categoryPreset="plots" />

        {/* Listings Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-ink dark:text-white">
              Showing <span className="text-accent">{filteredProperties.length}</span> Verified Land Opportunities
            </h2>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((prop, idx) => (
                <PropertyCard key={prop.id} property={prop} priorityImage={idx < 3} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-charcoal-900 rounded-3xl border border-neutral-200 dark:border-charcoal-800 p-8 space-y-4">
              <Trees className="w-12 h-12 text-neutral-400 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-ink dark:text-white">
                No Land Parcels Match Your Selection
              </h3>
              <p className="text-xs text-neutral-700 dark:text-white max-w-sm mx-auto font-normal">
                Try resetting your filters or speak directly with our land advisory desk for off-market registry parcels.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-accent text-black text-xs font-bold uppercase tracking-wider hover:bg-yellow-400 transition-colors shadow-gold-glow"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        propertyTitle="Plots & Land Pan-India Inquiry"
      />
    </div>
  );
}
