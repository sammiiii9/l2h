'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Sparkles, Palmtree, Factory, Home, ArrowRight, Clock, AlertCircle } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

const ACTIVE_DESTINATIONS = [
  {
    name: 'Mata Shakumbhari Devi, Saharanpur',
    state: 'Uttar Pradesh',
    category: 'Sacred Destination',
    price: 'Starting from ₹9 Lakhs',
    size: '100 sq. yards plots',
    status: 'Active Project',
    icon: Sparkles,
    href: '/properties/shakumbhari-devi-saharanpur-plots',
    image: '/shakumbari-estate/site-demarcated-plots.jpg'
  },
  {
    name: 'Dholera Special Investment Region',
    state: 'Gujarat',
    category: 'Industrial & Growth',
    price: 'Starting from ₹10 Lakhs',
    size: '100 sq. yards plots',
    status: 'Active Project',
    icon: Factory,
    href: '/properties/dholera-sir-smart-city-plots',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Goa Coastal & Green Belt',
    state: 'Goa',
    category: 'Holiday & Leisure',
    price: 'Starting from ₹35 Lakhs',
    size: '100 sq. yards plots',
    status: 'Active Project',
    icon: Palmtree,
    href: '/properties/goa-holiday-leisure-plots',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Noida Expressway Corridors',
    state: 'Uttar Pradesh',
    category: 'Residential',
    price: 'Starting from ₹80 Lakhs',
    size: 'Ready-to-Move & Off-Plan',
    status: 'Active Project',
    icon: Home,
    href: '/properties/noida-expressway-residential-residences',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
  }
];

const EXPLORING_DESTINATIONS = [
  {
    name: 'Haridwar',
    state: 'Uttarakhand',
    type: 'Sacred / Spiritual Corridor',
    note: 'Evaluating plotted opportunities near sacred Ganga ghats and pilgrimage routes.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Rishikesh',
    state: 'Uttarakhand',
    type: 'Spiritual & Holiday Wellness',
    note: 'Evaluating retreat and wellness plotted developments in Himalayan foothills.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Ayodhya',
    state: 'Uttar Pradesh',
    type: 'Sacred / Spiritual Capital',
    note: 'Researching emerging plotted corridors around Shri Ram Janmabhoomi zone.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Vrindavan',
    state: 'Uttar Pradesh',
    type: 'Sacred / Spiritual Destination',
    note: 'Exploring clear-title land parcels for devotee ashram and second-home living.',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Salasar Balaji',
    state: 'Rajasthan',
    type: 'Sacred Pilgrimage Destination',
    note: 'Evaluating plotted development potential in the revered Balaji temple corridor.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80'
  }
];

export default function DestinationsExplorer() {
  const [tab, setTab] = useState<'active' | 'exploring'>('active');

  return (
    <section id="destinations" className="py-24 sm:py-32 bg-[#F5F1EB] dark:bg-[#0E0D0C] text-[#171513] dark:text-[#F5F1EB] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header with Switcher Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <ScrollReveal variant="fade-up" delay={100} className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171513]/5 dark:bg-white/10 border border-[#171513]/10 dark:border-white/15 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8945B]">
              <MapPin className="w-3.5 h-3.5 text-[#B8945B]" />
              <span>Location Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#171513] dark:text-white tracking-tight leading-[1.15]">
              Featured Locations &amp; Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light leading-relaxed">
              Clear distinction between currently available projects and destinations we are actively researching.
            </p>
          </ScrollReveal>

          {/* Tab Switcher */}
          <ScrollReveal variant="fade-up" delay={200} className="flex items-center p-1.5 rounded-full bg-white dark:bg-[#171513] border border-black/5 dark:border-white/10 shadow-sm shrink-0">
            <button
              onClick={() => setTab('active')}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                tab === 'active'
                  ? 'bg-[#171513] dark:bg-white text-white dark:text-[#171513] shadow-md'
                  : 'text-[#171513]/70 dark:text-white/70 hover:text-[#171513] dark:hover:text-white'
              }`}
            >
              Active Projects (4)
            </button>
            <button
              onClick={() => setTab('exploring')}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                tab === 'exploring'
                  ? 'bg-[#171513] dark:bg-white text-white dark:text-[#171513] shadow-md'
                  : 'text-[#171513]/70 dark:text-white/70 hover:text-[#171513] dark:hover:text-white'
              }`}
            >
              Destinations We&apos;re Exploring (5)
            </button>
          </ScrollReveal>
        </div>

        {/* Active Projects Grid */}
        {tab === 'active' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 animate-in fade-in duration-300">
            {ACTIVE_DESTINATIONS.map((dest, idx) => {
              const Icon = dest.icon;

              return (
                <ScrollReveal
                  key={dest.name}
                  variant="fade-up"
                  delay={100 + idx * 70}
                >
                  <Link
                    href={dest.href}
                    className="group bg-white dark:bg-[#171513] rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full hover:translate-y-[-3px]"
                  >
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#26211D]">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#E8D3B4] border border-[#B8945B]/30">
                            <Icon className="w-3 h-3 text-[#B8945B]" />
                            <span>{dest.category}</span>
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest block font-medium">
                            ● {dest.status}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2.5">
                        <h3 className="text-base sm:text-lg font-serif font-normal text-[#171513] dark:text-white group-hover:text-[#B8945B] transition-colors leading-snug">
                          {dest.name}
                        </h3>
                        <div className="text-xs text-[#171513]/60 dark:text-white/60">
                          {dest.state} • {dest.size}
                        </div>
                        <div className="text-sm font-semibold text-[#171513] dark:text-white pt-1">
                          {dest.price}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center justify-between text-xs font-semibold text-[#B8945B] border-t border-black/5 dark:border-white/10 mt-2">
                      <span className="uppercase tracking-wider text-[11px] pt-3">Explore Opportunity</span>
                      <ArrowRight className="w-3.5 h-3.5 pt-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* Exploring / Pipeline Destinations Grid */}
        {tab === 'exploring' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Disclaimer Alert */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block text-amber-950 dark:text-amber-100 mb-0.5">Important Transparency Note:</strong>
                These locations represent destinations L2H Solution is actively researching and evaluating. They are NOT currently available inventory. We only onboard projects when titles, boundaries, and approvals meet our strict advisory standards.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EXPLORING_DESTINATIONS.map((dest, idx) => (
                <ScrollReveal
                  key={dest.name}
                  variant="fade-up"
                  delay={100 + idx * 70}
                >
                  <div className="bg-white dark:bg-[#171513] rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-sm p-6 space-y-4 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/5 dark:bg-white/10 text-[#B8945B]">
                          <Clock className="w-3 h-3" />
                          <span>Future Opportunity</span>
                        </span>
                        <span className="text-[11px] text-[#171513]/50 dark:text-white/50 font-mono">
                          {dest.state}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif font-normal text-[#171513] dark:text-white">
                        {dest.name}
                      </h3>

                      <div className="text-xs font-semibold text-[#171513]/80 dark:text-white/80">
                        {dest.type}
                      </div>

                      <p className="text-xs text-[#171513]/70 dark:text-white/70 font-light leading-relaxed">
                        {dest.note}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/5 dark:border-white/10">
                      <a
                        href={`https://wa.me/918439654385?text=Hi%20L2H%20Solution%2C%20please%20notify%20me%20when%20projects%20in%20${encodeURIComponent(dest.name)}%20are%20onboarded.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold uppercase tracking-wider text-[#B8945B] hover:underline flex items-center gap-1.5"
                      >
                        <span>Notify Me on Launch</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
