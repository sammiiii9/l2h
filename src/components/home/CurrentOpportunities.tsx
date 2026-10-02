'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Trees, 
  Home, 
  Factory, 
  Palmtree, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

export interface OpportunityCardData {
  id: string;
  slug: string;
  title: string;
  location: string;
  categoryBadge: string;
  categoryIcon: any;
  badgeStyle: string;
  details: string;
  startingPrice: string;
  status: 'Currently Available' | 'New Opportunity';
  image: string;
  description: string;
  highlights: string[];
  ctaLabel: string;
  href: string;
}

export const CURRENT_OPPORTUNITIES: OpportunityCardData[] = [
  {
    id: 'opp-shakumbhari',
    slug: 'shakumbhari-devi-saharanpur-plots',
    title: 'Mata Shakumbhari Devi, Saharanpur',
    location: 'Saharanpur, Uttar Pradesh',
    categoryBadge: 'Sacred Destination',
    categoryIcon: Sparkles,
    badgeStyle: 'bg-amber-900/60 text-[#E8D3B4] border-amber-600/40',
    details: '100 sq. yards plots (and multiples)',
    startingPrice: 'Starting from ₹9 Lakhs',
    status: 'Currently Available',
    image: '/shakumbari-estate/site-demarcated-plots.jpg',
    description: 'Plotted development opportunity located near the sacred Mata Shakumbhari Devi Shaktipeeth in Saharanpur. Clear demarcation with scenic foothills surroundings.',
    highlights: [
      '100 sq. yards freehold plots',
      'Near sacred pilgrimage corridor',
      'Direct road access from Saharanpur'
    ],
    ctaLabel: 'View Opportunity',
    href: '/properties/shakumbhari-devi-saharanpur-plots'
  },
  {
    id: 'opp-dholera',
    slug: 'dholera-sir-smart-city-plots',
    title: 'Dholera Industrial & Growth Corridor',
    location: 'Dholera SIR, Gujarat',
    categoryBadge: 'Industrial & Growth',
    categoryIcon: Factory,
    badgeStyle: 'bg-slate-900/80 text-slate-200 border-slate-600/40',
    details: '100 sq. yards plots (and multiples)',
    startingPrice: 'Starting from ₹10 Lakhs',
    status: 'Currently Available',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85',
    description: 'Plotted development in India’s emerging planned industrial smart city node. Positioned along major expressway and planned infrastructure networks.',
    highlights: [
      '100 sq. yards planned TP scheme plots',
      'Ahmedabad-Dholera Expressway access',
      'Disciplined entry price for long-term growth'
    ],
    ctaLabel: 'View Opportunity',
    href: '/properties/dholera-sir-smart-city-plots'
  },
  {
    id: 'opp-goa',
    slug: 'goa-holiday-leisure-plots',
    title: 'Goa Holiday & Leisure Plots',
    location: 'North / Central Green Belt, Goa',
    categoryBadge: 'Holiday & Leisure',
    categoryIcon: Palmtree,
    badgeStyle: 'bg-cyan-950/80 text-cyan-200 border-cyan-700/40',
    details: '100 sq. yards plots (and multiples)',
    startingPrice: 'Starting from ₹35 Lakhs',
    status: 'Currently Available',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=85',
    description: 'Selected plotted opportunity in Goa tailored for holiday homes, private vacation retreats, and lifestyle buyers seeking coastal land ownership.',
    highlights: [
      '100 sq. yards vacation plot canvas',
      'Peaceful coastal green belt setting',
      'Convenient MOPA Airport connectivity'
    ],
    ctaLabel: 'View Opportunity',
    href: '/properties/goa-holiday-leisure-plots'
  },
  {
    id: 'opp-noida',
    slug: 'noida-expressway-residential-residences',
    title: 'Noida Residential Properties',
    location: 'Noida Expressway / Sector 150 / 143, Noida',
    categoryBadge: 'Residential',
    categoryIcon: Home,
    badgeStyle: 'bg-emerald-950/80 text-emerald-200 border-emerald-700/40',
    details: 'Ready-to-Move & Off-Plan Options',
    startingPrice: 'Starting from ₹80 Lakhs',
    status: 'Currently Available',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
    description: 'Curated modern apartments and family residences in prime Noida sectors. Clear approvals, green surroundings, and rapid expressway connectivity.',
    highlights: [
      '2, 3 & 4 BHK family configurations',
      'Ready-to-Move & Off-Plan options',
      'Aqua Line metro & school proximity'
    ],
    ctaLabel: 'View Properties',
    href: '/properties/noida-expressway-residential-residences'
  }
];

export default function CurrentOpportunities() {
  return (
    <section id="opportunities" className="py-20 sm:py-28 bg-[#FAF7F2] dark:bg-[#12100E] border-y border-black/5 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up" delay={100} className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171513]/5 dark:bg-white/10 border border-[#171513]/10 dark:border-white/15 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8945B]">
            <span>Verified Inventory in Hand</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#171513] dark:text-white tracking-tight leading-[1.15]">
            Active Property Portfolio
          </h2>
          <p className="text-sm sm:text-base text-[#171513]/75 dark:text-white/75 font-light leading-relaxed max-w-2xl mx-auto">
            Explore the property opportunities currently active and available with L2H Solution. Grounded in verified documentation with transparent pricing.
          </p>
        </ScrollReveal>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CURRENT_OPPORTUNITIES.map((opp, idx) => {
            const CategoryIcon = opp.categoryIcon;

            return (
              <ScrollReveal
                key={opp.id}
                variant="fade-up"
                delay={100 + idx * 80}
                className="h-full"
              >
                <div className="group bg-white dark:bg-[#171513] rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-full hover:translate-y-[-4px]">
                  
                  {/* Top Media Container */}
                  <div>
                    <div className="relative aspect-[16/11] overflow-hidden bg-[#26211D]">
                      <img
                        src={opp.image}
                        alt={opp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        {/* Category Badge */}
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md border ${opp.badgeStyle}`}>
                          <CategoryIcon className="w-3 h-3 text-[#B8945B]" />
                          <span>{opp.categoryBadge}</span>
                        </span>

                        {/* Status Badge */}
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider bg-black/70 text-white/90 border border-white/20 backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{opp.status}</span>
                        </span>
                      </div>

                      {/* Bottom Image Overlay Details */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="flex items-center gap-1 text-[11px] text-white/80">
                          <MapPin className="w-3 h-3 text-[#B8945B] shrink-0" />
                          <span className="truncate">{opp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 space-y-3.5">
                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-serif font-normal text-[#171513] dark:text-white group-hover:text-[#B8945B] transition-colors leading-snug">
                        {opp.title}
                      </h3>

                      {/* Details specs */}
                      <div className="inline-block px-2.5 py-1 rounded-md bg-[#F5F1EB] dark:bg-[#26211D] text-[11px] font-medium text-[#171513] dark:text-[#E8D3B4]">
                        {opp.details}
                      </div>

                      {/* Price Section */}
                      <div className="pt-1">
                        <div className="text-[10px] uppercase tracking-wider text-[#171513]/60 dark:text-white/60 font-medium">
                          Starting Price
                        </div>
                        <div className="text-xl font-serif font-normal text-[#171513] dark:text-white">
                          {opp.startingPrice}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#171513]/70 dark:text-white/70 font-light leading-relaxed line-clamp-3">
                        {opp.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-1.5 pt-1">
                        {opp.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-1.5 text-[11px] text-[#171513]/80 dark:text-white/80">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B8945B] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-black/5 dark:border-white/10 mt-4">
                    <Link
                      href={opp.href}
                      className="w-full mt-3 py-2.5 px-4 rounded-xl bg-[#171513] dark:bg-white text-white dark:text-[#171513] hover:bg-[#B8945B] dark:hover:bg-[#B8945B] dark:hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <span>{opp.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
