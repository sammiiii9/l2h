'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Building2, 
  Search, 
  RotateCcw, 
  TrendingUp, 
  Users, 
  Clock, 
  FileSpreadsheet
} from 'lucide-react';
import { Property } from '@/types';
import PropertyCard from '@/components/properties/PropertyCard';
import LeadModal from '@/components/common/LeadModal';
import L2HConcierge from '@/components/common/L2HConcierge';

interface CommercialClientProps {
  initialProperties: Property[];
}

export default function CommercialClient({ initialProperties }: CommercialClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLease, setSelectedLease] = useState('All');
  const [minYield, setMinYield] = useState(6);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  // Filter properties for commercial only
  const commercial = useMemo(() => {
    return initialProperties.filter(p => {
      const catLower = (p.category || '').toLowerCase();
      const typeLower = (p.propertyType || '').toLowerCase();
      return catLower === 'commercial' || catLower === 'investments' || typeLower === 'office' || typeLower === 'retail';
    });
  }, [initialProperties]);

  const filteredProperties = useMemo(() => {
    return commercial.filter(p => {
      if (search) {
        const query = search.toLowerCase();
        const matches = 
          p.title.toLowerCase().includes(query) ||
          p.location.locality.toLowerCase().includes(query) ||
          p.location.city.toLowerCase().includes(query) ||
          (p.tenantName && p.tenantName.toLowerCase().includes(query));
        if (!matches) return false;
      }

      if (selectedCity !== 'All') {
        if (!p.location.city.toLowerCase().includes(selectedCity.toLowerCase())) {
          return false;
        }
      }

      if (selectedType !== 'All') {
        if (p.propertyType.toLowerCase() !== selectedType.toLowerCase()) {
          return false;
        }
      }

      if (selectedLease !== 'All') {
        if ((p.leaseStatus || 'Pre-leased') !== selectedLease) {
          return false;
        }
      }

      const propYield = p.expectedRentalYieldPct || p.investmentView?.estimatedRentalYieldPercent || 7.5;
      if (propYield < minYield) return false;

      return true;
    });
  }, [commercial, search, selectedCity, selectedType, selectedLease, minYield]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCity('All');
    setSelectedType('All');
    setSelectedLease('All');
    setMinYield(6);
  };

  return (
    <div className="bg-neutral dark:bg-black min-h-screen py-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Category Hero Banner — Real Commercial Real Estate Photography */}
        <div className="relative rounded-3xl overflow-hidden bg-black text-white min-h-[380px] sm:min-h-[460px] flex items-center shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85"
            alt="Commercial Real Estate Investment & Yield"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />

          <div className="relative z-10 max-w-3xl p-8 sm:p-14 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-charcoal-900 border border-accent/50 text-accent text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Category Focus • High-Yield &amp; Appreciation</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Commercial Investment &amp; Pre-Leased Yield
            </h1>

            <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
              &ldquo;Commercial opportunities assessed through tenant quality, rental structure, location demand, resale potential, and appreciation logic.&rdquo;
            </p>

            {/* Commercial Proof & Scrutiny Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-charcoal-800 text-xs text-neutral-300 font-light">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent shrink-0" />
                <span>Tenant Covenant Grade</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span>Lock-in &amp; Escalation Terms</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent shrink-0" />
                <span>Micro-Market Vacancy Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-accent shrink-0" />
                <span>True Net Cash Yield</span>
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
                placeholder="Search commercial asset..."
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
                <option value="All">All Commercial Nodes</option>
                <option value="Noida">Noida Expressway (Sector 140A/142)</option>
                <option value="Gurgaon">Gurgaon (Golf Course Ext &amp; SPR)</option>
              </select>
            </div>

            {/* Asset Type */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700 text-xs font-medium text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              >
                <option value="All">All Asset Types</option>
                <option value="Office">Grade-A Corporate Offices</option>
                <option value="Retail">High-Street Retail &amp; F&amp;B</option>
              </select>
            </div>

            {/* Lease Status */}
            <div>
              <select
                value={selectedLease}
                onChange={(e) => setSelectedLease(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700 text-xs font-medium text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              >
                <option value="All">All Lease Structures</option>
                <option value="Pre-leased">Pre-Leased (Immediate Rent)</option>
                <option value="Ready for Lease">Self-Use / Fresh Lease</option>
              </select>
            </div>

            {/* Actions */}
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

        {/* Natural Language Advisory Concierge for Commercial */}
        <L2HConcierge categoryPreset="commercial" />

        {/* Listings Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-ink dark:text-white">
              Showing <span className="text-accent">{filteredProperties.length}</span> Verified Commercial Assets
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
              <Building2 className="w-12 h-12 text-neutral-400 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-ink dark:text-white">
                No Commercial Assets Match Your Selection
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto font-light">
                Contact our commercial advisory desk for institutional pre-leased mandates and off-market office floors.
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
        propertyTitle="Commercial Investment Yield Inquiry"
      />
    </div>
  );
}
