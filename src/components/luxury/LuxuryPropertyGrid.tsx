'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import LuxuryPropertyCard, { CuratedLuxuryProperty } from './LuxuryPropertyCard';
import LuxuryTourModal from './LuxuryTourModal';
import ScrollReveal from '@/components/common/ScrollReveal';

export const CURATED_LUXURY_PROPERTIES: CuratedLuxuryProperty[] = [
  {
    id: 'the-grand-belvedere',
    name: 'The Grand Belvedere Sky Villa',
    location: 'Sector 150, Expressway',
    region: 'Noida Luxury Corridor',
    specs: '4 & 5 BHK • 4,850 sq.ft',
    priceGuide: 'Guide: ₹6.45 Cr – ₹9.80 Cr',
    category: 'Ultra-Luxury Residence',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    description: 'Low-density 80% green master plan with 3.4m ceiling heights, wrap-around sunset decks, zero-compromise liveable carpet efficiency, and verified occupancy schedules.'
  },
  {
    id: 'yamuna-aerocity-parcels',
    name: 'Yamuna Aerocity Freehold Parcels',
    location: 'Sector 18/20, YEIDA',
    region: 'Jewar Airport Corridor',
    specs: '300 – 1,000 sq.m • Clear Title',
    priceGuide: 'Guide: ₹1.85 Cr – ₹6.20 Cr',
    category: 'Clear-Title Land Estate',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85',
    description: '30-year mutation audited freehold plots adjacent to upcoming Jewar International Airport and Yamuna Film City with verified master zoning and road-widening sanctions.'
  },
  {
    id: 'cyber-horizon-tower',
    name: 'Cyber Horizon Corporate Floors',
    location: 'Golf Course Extension',
    region: 'Gurugram Prime Commercial',
    specs: '12,500 – 28,000 sq.ft • Pre-Leased',
    priceGuide: 'Guide: ₹18.5 Cr (8.4% Net Yield)',
    category: 'Pre-Leased Commercial Asset',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    description: 'Grade-A corporate office floor pre-leased to Fortune 500 tech tenant on 9-year triple-net lease with 15% escalation every 3 years and immediate rental cash flow.'
  },
  {
    id: 'finca-coastal-sanctuary',
    name: 'The Mandrem Coastal Estate',
    location: 'North Goa Coastal Arc',
    region: 'Goa Luxury Villa Corridor',
    specs: '5 Beds • 680 sq.m Plot',
    priceGuide: 'Guide: ₹12.8 Cr',
    category: 'Architectural Holiday Estate',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85',
    description: 'Bespoke Indo-Portuguese modern villa surrounded by coconut groves, private lap pool, clear agricultural-to-settlement land conversion records, and secondary holiday rental yields.'
  },
  {
    id: 'dholera-industrial-corridor',
    name: 'Dholera SIR Strategic Industrial Land',
    location: 'Town Planning 2 (TP2)',
    region: 'Semiconductor Hub Corridor',
    specs: '1 – 5 Acres • High Industrial FSI',
    priceGuide: 'Guide: ₹95 Lakh – ₹4.8 Cr',
    category: 'Strategic Growth Parcel',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    description: 'Early-entry institutional land parcels within operational plug-and-play expressway grid, verified title mutation, and high infrastructure appreciation horizon.'
  },
  {
    id: 'the-monolith-penthouse',
    name: 'The Monolith Triplex Penthouse',
    location: 'Central Noida',
    region: 'NCR Core Metro Corridor',
    specs: '6 BHK • 7,600 sq.ft • Private Plunge Pool',
    priceGuide: 'Guide: ₹14.5 Cr',
    category: 'Signature Penthouse',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    description: 'Triple-height glass facades, private elevator core, Italian marble finishes, acoustic double-glazing, and sub-registrar transaction price leverage analysis.'
  }
];

export default function LuxuryPropertyGrid() {
  const [selectedProperty, setSelectedProperty] = useState<CuratedLuxuryProperty | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookTour = (prop: CuratedLuxuryProperty) => {
    setSelectedProperty(prop);
    setIsModalOpen(true);
  };

  return (
    <section id="properties" className="py-24 sm:py-32 bg-[#F5F1EB] dark:bg-[#0E0D0C] border-t border-black/5 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up" delay={100} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8945B] font-semibold">
              Curated Dossiers
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#171513] dark:text-white tracking-tight">
              Research &amp; Acquisition Dossiers
            </h2>
            <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light leading-relaxed">
              Every opportunity is vetted through 30-year title checks, builder solvency audits, and registry transaction benchmarks before presentation.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#171513]/20 dark:border-white/20 hover:border-[#B8945B] dark:hover:border-[#B8945B] text-xs font-medium uppercase tracking-widest text-[#171513] dark:text-white hover:text-[#B8945B] dark:hover:text-[#B8945B] transition-all self-start md:self-auto group"
          >
            <span>View All Verified Listings</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>

        {/* 2-Column Responsive Grid with Staggered ScrollReveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 sm:gap-y-16">
          {CURATED_LUXURY_PROPERTIES.map((property, idx) => (
            <ScrollReveal
              key={property.id}
              variant="fade-up"
              delay={(idx % 2) * 150}
            >
              <LuxuryPropertyCard
                property={property}
                onBookTour={handleBookTour}
                priority={idx < 2}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Bespoke Mandate & Off-Market Advisory Banner */}
        <ScrollReveal variant="scale-up" delay={200}>
          <div className="p-8 sm:p-12 rounded-2xl bg-[#171513] text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8945B] font-medium">
                Discreet Family Office Brief
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-white">
                Seeking off-market land or institutional assets?
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Our private advisory desk represents discreet high-net-worth buyers with customized off-market acquisition mandates across prime Delhi NCR, Goa, and pan-India corridors.
              </p>
            </div>

            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-[#B8945B] hover:bg-[#C9A56D] text-black font-medium text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-lg shrink-0 hover:translate-y-[-2px]"
            >
              Commission Private Mandate
            </Link>
          </div>
        </ScrollReveal>

      </div>

      {/* Booking Tour Modal */}
      {selectedProperty && (
        <LuxuryTourModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          propertyName={selectedProperty.name}
          propertyLocation={`${selectedProperty.location}, ${selectedProperty.region}`}
        />
      )}
    </section>
  );
}
