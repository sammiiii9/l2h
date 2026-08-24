'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Home, 
  Search, 
  RotateCcw, 
  ShieldCheck, 
  Building2, 
  Clock, 
  CheckCircle2
} from 'lucide-react';
import { Property } from '@/types';
import PropertyCard from '@/components/properties/PropertyCard';
import LeadModal from '@/components/common/LeadModal';
import L2HConcierge from '@/components/common/L2HConcierge';

interface ResidentialClientProps {
  initialProperties: Property[];
}

export default function ResidentialClient({ initialProperties }: ResidentialClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedBhk, setSelectedBhk] = useState('All');
  const [selectedPossession, setSelectedPossession] = useState('All');
  const [maxPrice, setMaxPrice] = useState(200000000);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  // Filter properties for residential only
  const residential = useMemo(() => {
    return initialProperties.filter(p => {
      const catLower = (p.category || '').toLowerCase();
      const typeLower = (p.propertyType || '').toLowerCase();
      const isPlot = catLower === 'plots' || catLower === 'plot' || catLower === 'land' || typeLower === 'plot' || typeLower === 'land' || typeLower === 'farmhouse';
      const isCommercial = catLower === 'commercial' || typeLower === 'office' || typeLower === 'retail';
      return !isPlot && !isCommercial;
    });
  }, [initialProperties]);

  const filteredProperties = useMemo(() => {
    return residential.filter(p => {
      if (search) {
        const query = search.toLowerCase();
        const matches = 
          p.title.toLowerCase().includes(query) ||
          p.location.locality.toLowerCase().includes(query) ||
          p.location.city.toLowerCase().includes(query) ||
          (p.developer?.name && p.developer.name.toLowerCase().includes(query));
        if (!matches) return false;
      }

      if (selectedCity !== 'All') {
        if (!p.location.city.toLowerCase().includes(selectedCity.toLowerCase())) {
          return false;
        }
      }

      if (selectedBhk !== 'All') {
        if (selectedBhk === '4+ BHK') {
          if ((p.bedrooms || 0) < 4 && !p.configuration.includes('4') && !p.configuration.includes('5')) return false;
        } else {
          if (!p.configuration.toLowerCase().includes(selectedBhk.toLowerCase())) {
            return false;
          }
        }
      }

      if (selectedPossession !== 'All') {
        if (p.possessionStatus !== selectedPossession) {
          return false;
        }
      }

      if (p.price > maxPrice) return false;

      return true;
    });
  }, [residential, search, selectedCity, selectedBhk, selectedPossession, maxPrice]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCity('All');
    setSelectedBhk('All');
    setSelectedPossession('All');
    setMaxPrice(200000000);
  };

  return (
    <div className="bg-neutral dark:bg-black min-h-screen py-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Category Hero Banner — Real Luxury Residential Photography */}
        <div className="relative rounded-3xl overflow-hidden bg-black text-white min-h-[380px] sm:min-h-[460px] flex items-center shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85"
            alt="Luxury Residential Apartments and Estates"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />

          <div className="relative z-10 max-w-3xl p-8 sm:p-14 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-charcoal-800 border border-charcoal-700 text-neutral-200 text-xs font-bold uppercase tracking-wider">
              <Home className="w-3.5 h-3.5 text-accent" />
              <span>Category Focus • Noida, NCR, Gurgaon &amp; Metros</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Residential Apartments &amp; Family Estates
            </h1>

            <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
              &ldquo;Apartments framed around daily life, connectivity, builder context, ownership fit, and current availability.&rdquo;
            </p>

            {/* Proof & Diligence Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-charcoal-800 text-xs text-neutral-300 font-light">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Verified Builder Cost Sheets</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-accent shrink-0" />
                <span>Floor Plan Usable Area</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span>Actual Possession Milestones</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>Zero Inventory Bias</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-charcoal-900 rounded-2xl p-5 border border-neutral-200 dark:border-charcoal-800 shadow-luxury-soft space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5">
            {/* Search */}
            <div className="relative md:col-span-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search project or builder..."
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-neutral dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700 text-xs font-medium text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* City */}
            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700 text-xs font-medium text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              >
                <option value="All">All Cities</option>
                <option value="Noida">Noida Expressway</option>
                <option value="Gurgaon">Gurgaon (Golf Course Rd &amp; Ext)</option>
                <option value="Greater Noida">Greater Noida</option>
                <option value="Goa">North Goa</option>
                <option value="Rishikesh">Rishikesh &amp; Hills</option>
              </select>
            </div>

            {/* BHK Configuration */}
            <div>
              <select
                value={selectedBhk}
                onChange={(e) => setSelectedBhk(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700 text-xs font-medium text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              >
                <option value="All">All Configurations</option>
                <option value="2 BHK">2 BHK Residences</option>
                <option value="3 BHK">3 BHK Luxury Family Homes</option>
                <option value="4+ BHK">4+ BHK Penthouse / Sky Villas</option>
              </select>
            </div>

            {/* Possession Status */}
            <div>
              <select
                value={selectedPossession}
                onChange={(e) => setSelectedPossession(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700 text-xs font-medium text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              >
                <option value="All">All Possession Stages</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="New Launch">New Launch (Pre-Registration)</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-100 dark:bg-charcoal-800 hover:bg-neutral-200 dark:hover:bg-charcoal-700 text-neutral-700 dark:text-neutral-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="py-2.5 px-3.5 rounded-xl bg-accent hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-gold-glow"
              >
                Advisor
              </button>
            </div>
          </div>
        </div>

        {/* Natural Language Advisory Concierge for Residential */}
        <L2HConcierge categoryPreset="residential" />

        {/* Listings Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-ink dark:text-white">
              Showing <span className="text-accent">{filteredProperties.length}</span> Verified Residential Portfolios
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
              <Home className="w-12 h-12 text-neutral-400 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-ink dark:text-white">
                No Apartments Match Your Criteria
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto font-light">
                Try resetting your filters or request a bespoke residential search from an L2H property strategist.
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
        propertyTitle="Residential Apartments Advisory Inquiry"
      />
    </div>
  );
}
