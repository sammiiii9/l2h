'use client';

import React from 'react';
import Link from 'next/link';
import { Home, TrendingUp, Building2, Trees, Crown, HelpCircle, ArrowRight } from 'lucide-react';

const INTENTS = [
  {
    id: 'home',
    title: 'Buy a Home',
    subtitle: 'Luxury apartments & gated family enclaves',
    href: '/properties?category=Apartments',
    icon: Home,
    badge: 'End Use'
  },
  {
    id: 'invest',
    title: 'Invest for Yield & Growth',
    subtitle: 'Pre-leased commercial & airport land multipliers',
    href: '/properties?category=Investments',
    icon: TrendingUp,
    badge: 'High ROI'
  },
  {
    id: 'commercial',
    title: 'Commercial & Offices',
    subtitle: 'Grade-A corporate towers & high-street retail',
    href: '/properties?category=Commercial',
    icon: Building2,
    badge: 'Pre-Leased'
  },
  {
    id: 'plots',
    title: 'Plots & Land',
    subtitle: 'Freehold clear-title parcels on growth corridors',
    href: '/properties?category=Plots',
    icon: Trees,
    badge: 'Freehold'
  },
  {
    id: 'luxury',
    title: 'Trophy Luxury',
    subtitle: 'Golf residences, sky villas & country estates',
    href: '/properties?category=Luxury%20Properties',
    icon: Crown,
    badge: 'Trophy'
  },
  {
    id: 'not-sure',
    title: 'I\'m Not Sure Yet',
    subtitle: 'Let an advisor understand your lifestyle and wealth goals',
    href: '/find-property',
    icon: HelpCircle,
    badge: 'Advisory'
  }
];

export default function IntentExplorer() {
  return (
    <section className="py-20 bg-white border-b border-zinc-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            Intent-Based Discovery
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-950 tracking-tight">
            What Are You Looking For?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
            Begin your property journey based on your primary objective. We filter the noise and deliver verified opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTENTS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="bg-zinc-50 rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-sm hover:shadow-luxury hover:border-black transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 group-hover:bg-black group-hover:text-white text-zinc-900 flex items-center justify-center transition-colors shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-white text-[10px] font-bold uppercase tracking-wider text-zinc-600 border border-zinc-200">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-serif font-bold text-zinc-950 group-hover:text-zinc-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-500 font-light mt-1 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-zinc-900 group-hover:text-black border-t border-zinc-200/70">
                  <span>Explore Portfolio</span>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
