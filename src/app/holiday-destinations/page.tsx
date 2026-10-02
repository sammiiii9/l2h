import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Palmtree, MapPin, CheckCircle2, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { PropertyService } from '@/lib/data-store';
import { createWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Holiday & Leisure Destinations Plotted Opportunities | Goa Plots | L2H Solution',
  description: 'Explore property opportunities in destinations known for travel, leisure and lifestyle appeal. Current opportunity: 100 sq. yards freehold plots in Goa starting from ₹35 Lakhs.',
  keywords: [
    'Goa plots',
    'holiday destination property',
    'second home in Goa',
    'vacation home plots Goa',
    'lifestyle plots Goa',
    'coastal land Goa'
  ]
};

export default function HolidayDestinationsPage() {
  const { properties } = PropertyService.getAll({ category: 'Holiday & Leisure Destinations' });
  const activeProject = properties.find(p => p.slug === 'goa-holiday-leisure-plots') || properties[0];

  const whatsappLink = createWhatsAppUrl({
    customMessage: 'Hi L2H Solution, I am inquiring about plotted development opportunities in Holiday & Leisure Destinations (Goa Plots starting from ₹35 Lakhs).'
  });

  return (
    <div className="bg-[#F5F1EB] dark:bg-[#0E0D0C] text-[#171513] dark:text-[#F5F1EB] min-h-screen pb-24 transition-colors duration-300">
      
      {/* Category Hero */}
      <section className="relative py-24 sm:py-32 bg-[#171513] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2000&q=85"
            alt="Holiday and Leisure Destinations"
            className="w-full h-full object-cover opacity-35 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-[#171513]/70 to-transparent" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8D3B4]">
            <Palmtree className="w-3.5 h-3.5 text-[#B8945B]" />
            <span>Category 02 • Holiday &amp; Leisure</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-normal text-white tracking-tight leading-[1.12]">
            Holiday &amp; Leisure <br />
            <span className="italic font-light text-[#E8E0D6]">Destinations.</span>
          </h1>

          <p className="text-base sm:text-lg text-white/85 font-light leading-relaxed max-w-2xl mx-auto">
            Explore property opportunities in destinations known for travel, leisure and lifestyle appeal.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        
        {/* Active Project: Goa Spotlight */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-4">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#B8945B] font-semibold block">
                Confirmed Inventory
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-normal text-[#171513] dark:text-white">
                Current Opportunity: Goa
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Project in Hand</span>
            </div>
          </div>

          {activeProject ? (
            <div className="bg-white dark:bg-[#171513] rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8">
              
              <div className="lg:col-span-6 relative aspect-[16/11] rounded-2xl overflow-hidden bg-[#26211D]">
                <img
                  src={activeProject.images[0]?.url || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=85'}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/80 text-[#E8D3B4] border border-[#B8945B]/40">
                    Goa Coastal &amp; Green Belt
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xl sm:text-2xl font-serif font-normal">
                    {activeProject.priceDisplay}
                  </div>
                  <div className="text-xs text-white/80">
                    100 sq. yards plots (and multiples)
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-widest text-[#B8945B] font-semibold">
                    Holiday &amp; Leisure Destination
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#171513] dark:text-white">
                    {activeProject.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#171513]/70 dark:text-white/70">
                    <MapPin className="w-3.5 h-3.5 text-[#B8945B]" />
                    <span>{activeProject.location.locality}, {activeProject.location.city}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#171513]/75 dark:text-white/75 font-light leading-relaxed">
                  {activeProject.description}
                </p>

                <div className="space-y-2 pt-1">
                  {activeProject.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#171513]/85 dark:text-white/85">
                      <CheckCircle2 className="w-4 h-4 text-[#B8945B] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/properties/${activeProject.slug}`}
                    className="px-6 py-3 rounded-xl bg-[#171513] dark:bg-white text-white dark:text-[#171513] hover:bg-[#B8945B] dark:hover:bg-[#B8945B] dark:hover:text-white transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-md"
                  >
                    <span>View Opportunity Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          ) : null}
        </section>

        {/* Advisory Architecture Note */}
        <section className="p-8 rounded-3xl bg-white dark:bg-[#171513] border border-black/5 dark:border-white/10 space-y-3">
          <h3 className="text-xl font-serif text-[#171513] dark:text-white">
            Future Holiday Locations Pipeline
          </h3>
          <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light leading-relaxed">
            We only showcase confirmed holiday destinations where clear settlement land permissions, verified access roads, and transparent mutation records are in place. Additional holiday corridors will be onboarded as due diligence completes.
          </p>
        </section>

      </div>
    </div>
  );
}
