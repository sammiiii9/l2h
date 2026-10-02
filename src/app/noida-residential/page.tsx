import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, MapPin, CheckCircle2, ArrowRight, MessageSquare, Filter, Building } from 'lucide-react';
import { PropertyService } from '@/lib/data-store';
import { createWhatsAppUrl } from '@/lib/utils';
import PropertyCard from '@/components/properties/PropertyCard';

export const metadata: Metadata = {
  title: 'Residential Properties in Noida | Ready-to-Move & Off-Plan | L2H Solution',
  description: 'Explore residential properties in Noida starting from ₹80 Lakhs, spanning ready-to-move homes, under-construction towers, and off-plan opportunities across prime Expressway sectors.',
  keywords: [
    'residential property in Noida',
    'ready to move property Noida',
    'off plan property Noida',
    'flats in Noida Expressway',
    '3 BHK Noida Sector 150',
    'buy home in Noida',
    'Noida apartment investment'
  ]
};

export default function NoidaResidentialPage() {
  const { properties } = PropertyService.getAll({ category: 'Residential Properties — Noida' });

  const whatsappLink = createWhatsAppUrl({
    customMessage: 'Hi L2H Solution, I am inquiring about residential properties in Noida starting from ₹80 Lakhs (Ready-to-Move and Off-Plan options).'
  });

  return (
    <div className="bg-[#F5F1EB] dark:bg-[#0E0D0C] text-[#171513] dark:text-[#F5F1EB] min-h-screen pb-24 transition-colors duration-300">
      
      {/* Category Hero */}
      <section className="relative py-24 sm:py-32 bg-[#171513] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85"
            alt="Find Your Home in Noida"
            className="w-full h-full object-cover opacity-35 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-[#171513]/70 to-transparent" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8D3B4]">
            <Home className="w-3.5 h-3.5 text-[#B8945B]" />
            <span>Category 04 • Noida Residential</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-normal text-white tracking-tight leading-[1.12]">
            Find Your Home <br />
            <span className="italic font-light text-[#E8E0D6]">in Noida.</span>
          </h1>

          <p className="text-base sm:text-lg text-white/85 font-light leading-relaxed max-w-2xl mx-auto">
            Explore residential properties in Noida, from ready-to-move homes to under-construction and off-plan opportunities. Starting from ₹80 Lakhs onwards.
          </p>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B8945B]/20 text-[#E8D3B4] border border-[#B8945B]/40 text-xs font-semibold uppercase tracking-wider">
            <span>Starting from ₹80 Lakhs onwards</span>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        
        {/* Quick Filter Bar & Intro */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-[#171513] p-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm">
          <div className="space-y-1">
            <h3 className="text-lg font-serif text-[#171513] dark:text-white">
              Residential Portfolio in Noida
            </h3>
            <p className="text-xs text-[#171513]/70 dark:text-white/70">
              Curated for end-user families seeking quality homes and investors seeking resilient rental yields.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/properties?category=residential&possession=Ready+to+Move"
              className="px-4 py-2 rounded-xl bg-[#F5F1EB] dark:bg-[#26211D] text-xs font-medium text-[#171513] dark:text-white hover:bg-[#B8945B] hover:text-black transition-colors"
            >
              Ready-to-Move
            </Link>
            <Link
              href="/properties?category=residential&possession=Under+Construction"
              className="px-4 py-2 rounded-xl bg-[#F5F1EB] dark:bg-[#26211D] text-xs font-medium text-[#171513] dark:text-white hover:bg-[#B8945B] hover:text-black transition-colors"
            >
              Under-Construction
            </Link>
            <Link
              href="/properties?category=residential"
              className="px-4 py-2 rounded-xl bg-[#171513] dark:bg-white text-white dark:text-[#171513] text-xs font-semibold hover:bg-[#B8945B] transition-colors"
            >
              View All Filters
            </Link>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>

        {/* Advisory Consultation Section */}
        <section className="bg-white dark:bg-[#171513] rounded-3xl p-8 sm:p-12 border border-black/5 dark:border-white/10 shadow-lg text-center space-y-6 max-w-4xl mx-auto">
          <div className="space-y-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#B8945B]">
              Personalized Matching
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#171513] dark:text-white">
              Looking for a Specific Sector or Configuration in Noida?
            </h3>
            <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light max-w-xl mx-auto leading-relaxed">
              We evaluate carpet efficiency, builder solvency, daylight exposure, and registry price trends before shortlisting options for your family.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Talk to an Advisor</span>
            </a>

            <Link
              href="/find-property"
              className="px-7 py-3.5 rounded-full bg-[#171513] dark:bg-white text-white dark:text-[#171513] hover:bg-[#B8945B] dark:hover:bg-[#B8945B] dark:hover:text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <span>Launch Match Wizard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
