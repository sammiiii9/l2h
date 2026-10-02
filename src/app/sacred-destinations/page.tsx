import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, MapPin, CheckCircle2, Clock, AlertCircle, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { PropertyService } from '@/lib/data-store';
import { createWhatsAppUrl } from '@/lib/utils';
import PropertyCard from '@/components/properties/PropertyCard';

export const metadata: Metadata = {
  title: 'Sacred & Spiritual Destinations Plotted Developments | L2H Solution',
  description: 'Explore selected plotted development opportunities around important religious, spiritual and pilgrimage destinations, starting with Mata Shakumbhari Devi, Saharanpur.',
  keywords: [
    'plots near temple destinations',
    'Shakumbhari Devi plots',
    'plots in Saharanpur',
    'spiritual destination property',
    'holy location plots',
    'Haridwar plots',
    'Rishikesh plots',
    'Ayodhya plots'
  ]
};

const EXPLORING_DESTINATIONS = [
  {
    name: 'Haridwar',
    state: 'Uttarakhand',
    type: 'Sacred Ganga Corridor',
    description: 'Evaluating clear-title plotted developments along sacred approach roads and pilgrimage hubs.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Rishikesh',
    state: 'Uttarakhand',
    type: 'Spiritual & Himalayan Wellness',
    description: 'Researching foothill retreat plots and devotional living land parcels.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Ayodhya',
    state: 'Uttar Pradesh',
    type: 'Shri Ram Janmabhoomi Corridor',
    description: 'Exploring emerging land options in the master-planned pilgrimage growth belt.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Vrindavan',
    state: 'Uttar Pradesh',
    type: 'Braj Bhoomi Devotional Belt',
    description: 'Evaluating land plots for devotees and family ashram retreat seekers.',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Salasar Balaji',
    state: 'Rajasthan',
    type: 'Revered Balaji Mandir Belt',
    description: 'Assessing plotted development feasibility around the pilgrimage center.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80'
  }
];

export default function SacredDestinationsPage() {
  const { properties } = PropertyService.getAll({ category: 'Sacred & Spiritual Destinations' });
  const activeProject = properties.find(p => p.slug === 'shakumbhari-devi-saharanpur-plots') || properties[0];

  const whatsappLink = createWhatsAppUrl({
    customMessage: 'Hi L2H Solution, I am inquiring about plotted development opportunities in Sacred & Spiritual Destinations (Mata Shakumbhari Devi / Saharanpur).'
  });

  return (
    <div className="bg-[#F5F1EB] dark:bg-[#0E0D0C] text-[#171513] dark:text-[#F5F1EB] min-h-screen pb-24 transition-colors duration-300">
      
      {/* Category Hero */}
      <section className="relative py-24 sm:py-32 bg-[#171513] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85"
            alt="Sacred and Spiritual Destinations"
            className="w-full h-full object-cover opacity-35 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-[#171513]/70 to-transparent" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8D3B4]">
            <Sparkles className="w-3.5 h-3.5 text-[#B8945B]" />
            <span>Category 01 • Sacred Plotted Developments</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-normal text-white tracking-tight leading-[1.12]">
            Property Opportunities Near <br />
            <span className="italic font-light text-[#E8E0D6]">Places That Matter.</span>
          </h1>

          <p className="text-base sm:text-lg text-white/85 font-light leading-relaxed max-w-2xl mx-auto">
            Explore selected plotted-development opportunities around important spiritual and pilgrimage destinations. Grounded in clear-title documentation and tranquil surroundings.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        
        {/* Active Project Inventory Showcase (All Active Shakumbhari Options) */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-4">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#B8945B] font-semibold block">
                Confirmed Inventory • Shakumbhari Devi Corridor
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-normal text-[#171513] dark:text-white">
                Available Plotted Development Options
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{properties.length} Active Options in Hand</span>
            </div>
          </div>

          <div className="space-y-8">
            {properties.map((project, pIdx) => {
              const projectWhatsapp = createWhatsAppUrl({
                propertyName: project.title,
                propertyUrl: `https://l2hsolution.com/properties/${project.slug}`,
                customMessage: `Hi L2H Solution, I am inquiring about ${project.title} (${project.priceDisplay}) in the Shakumbhari Devi, Saharanpur corridor.`
              });

              return (
                <div 
                  key={project.id}
                  className="bg-white dark:bg-[#171513] rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8"
                >
                  <div className="lg:col-span-6 relative aspect-[16/11] rounded-2xl overflow-hidden bg-[#26211D]">
                    <img
                      src={project.images[0]?.url || '/shakumbari-estate/brochure-master-plan.jpg'}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    
                    <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-black/80 text-[#E8D3B4] border border-[#B8945B]/40 backdrop-blur-md">
                        Option 0{pIdx + 1} • {project.location.locality}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-xl sm:text-3xl font-serif font-normal text-white">
                        {project.priceDisplay}
                      </div>
                      <div className="text-xs text-white/80 font-light mt-0.5">
                        {project.configuration}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-5">
                    <div className="space-y-2">
                      <span className="text-[11px] uppercase tracking-widest text-[#B8945B] font-semibold block">
                        Mata Shakumbhari Devi Pilgrimage Belt
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#171513] dark:text-white leading-snug">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#171513]/70 dark:text-white/70">
                        <MapPin className="w-3.5 h-3.5 text-[#B8945B] shrink-0" />
                        <span>{project.location.address || `${project.location.locality}, ${project.location.city}`}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#171513]/75 dark:text-white/75 font-light leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {project.highlights.slice(0, 4).map((h, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#171513]/85 dark:text-white/85">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B8945B] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/properties/${project.slug}`}
                        className="px-6 py-3 rounded-xl bg-[#171513] dark:bg-white text-white dark:text-[#171513] hover:bg-[#B8945B] dark:hover:bg-[#B8945B] dark:hover:text-white transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-md"
                      >
                        <span>View Opportunity Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <a
                        href={projectWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Inquire on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Destinations We're Exploring (Clearly Flagged) */}
        <section className="space-y-8 pt-8">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#B8945B] font-semibold block">
              Pipeline Research
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal text-[#171513] dark:text-white">
              Destinations We&apos;re Exploring
            </h2>
            <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light max-w-2xl">
              We are actively researching clear-title plotted development opportunities across these spiritual locations. They are currently in our evaluation pipeline and will be officially launched once confirmed.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Advisory Transparency Policy:</strong> We do NOT present exploratory locations as active projects until site boundaries, road connectivity, and documentation are independently verified.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPLORING_DESTINATIONS.map((dest, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#171513] rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-sm p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/5 dark:bg-white/10 text-[#B8945B]">
                      <Clock className="w-3 h-3" />
                      <span>Destinations We May Add</span>
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
                    {dest.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/10">
                  <a
                    href={`https://wa.me/918439654385?text=Hi%20L2H%20Solution%2C%20please%20notify%20me%20when%20projects%20in%20${encodeURIComponent(dest.name)}%20are%20officially%20onboarded.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold uppercase tracking-wider text-[#B8945B] hover:underline flex items-center gap-1.5"
                  >
                    <span>Register Early Interest</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
