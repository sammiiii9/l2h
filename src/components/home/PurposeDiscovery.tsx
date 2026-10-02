'use client';

import React from 'react';
import Link from 'next/link';
import { Home, TrendingUp, Sparkles, Palmtree, Factory, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

const PURPOSE_CARDS = [
  {
    icon: Home,
    title: 'Looking for a Home?',
    description: 'Residential properties in Noida for end users and families seeking modern lifestyle, green surroundings, and metro connectivity.',
    tag: 'Residential Living',
    ctaText: 'Explore Noida Residential',
    href: '/noida-residential',
    gradient: 'from-amber-950/40 to-transparent',
    accentColor: '#B8945B',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: TrendingUp,
    title: 'Looking for an Investment?',
    description: 'Explore plotted developments and growth-oriented locations structured for capital appreciation and tangible land ownership.',
    tag: 'Capital Growth',
    ctaText: 'Explore Investment Opportunities',
    href: '/properties?category=plots',
    gradient: 'from-emerald-950/40 to-transparent',
    accentColor: '#10B981',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: Sparkles,
    title: 'Looking for a Spiritual Destination?',
    description: 'Explore plotted opportunities around selected pilgrimage and temple destinations starting from ₹9 Lakhs for 100 sq. yards.',
    tag: 'Sacred Living',
    ctaText: 'Explore Sacred Destinations',
    href: '/sacred-destinations',
    gradient: 'from-amber-900/40 to-transparent',
    accentColor: '#D97706',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: Palmtree,
    title: 'Looking for a Holiday Property?',
    description: 'Explore opportunities in lifestyle and tourism destinations like Goa for vacation homes, retreats, and leisure living.',
    tag: 'Holiday & Leisure',
    ctaText: 'Explore Holiday Destinations',
    href: '/holiday-destinations',
    gradient: 'from-cyan-950/40 to-transparent',
    accentColor: '#06B6D4',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: Factory,
    title: 'Looking at Future Growth?',
    description: 'Explore emerging industrial and infrastructure-led corridors like Dholera SIR shaped by master-planned development.',
    tag: 'Industrial Corridors',
    ctaText: 'Explore Growth Corridors',
    href: '/industrial-growth',
    gradient: 'from-slate-900/50 to-transparent',
    accentColor: '#94A3B8',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  }
];

export default function PurposeDiscovery() {
  return (
    <section id="purpose-discovery" className="py-20 sm:py-28 bg-[#F5F1EB] dark:bg-[#0E0D0C] text-[#171513] dark:text-[#F5F1EB] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up" delay={100} className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171513]/5 dark:bg-white/10 border border-[#171513]/10 dark:border-white/15 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8945B]">
            <span>Purpose-Based Property Discovery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#171513] dark:text-white tracking-tight leading-[1.15]">
            Find a Property Based on Your Purpose
          </h2>
          <p className="text-sm sm:text-base text-[#171513]/75 dark:text-white/75 font-light leading-relaxed max-w-2xl mx-auto">
            Every buyer has a different reason for buying. Tell us what you&apos;re looking for, and we&apos;ll help you explore the relevant opportunities.
          </p>
        </ScrollReveal>

        {/* 5 Purpose Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PURPOSE_CARDS.map((card, idx) => {
            const Icon = card.icon;
            const isWide = idx === 3 || idx === 4;

            return (
              <ScrollReveal
                key={card.title}
                variant="fade-up"
                delay={100 + idx * 70}
                className={isWide && idx === 3 ? 'lg:col-span-1 md:col-span-1' : isWide && idx === 4 ? 'lg:col-span-2 md:col-span-2' : ''}
              >
                <Link
                  href={card.href}
                  className="group relative bg-white dark:bg-[#171513] rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-full hover:translate-y-[-3px]"
                >
                  {/* Top Visual Image Banner */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#26211D]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    
                    {/* Top Tag Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#E8D3B4] border border-[#B8945B]/30">
                        <Icon className="w-3.5 h-3.5 text-[#B8945B]" />
                        <span>{card.tag}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 space-y-3 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#171513] dark:text-white group-hover:text-[#B8945B] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    {/* CTA Footer */}
                    <div className="pt-4 mt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-[#B8945B]">
                      <span className="uppercase tracking-wider text-[11px]">{card.ctaText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
