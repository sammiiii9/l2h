import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { MapPin, ArrowRight, TrendingUp, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { LocationService } from '@/lib/data-store';

export const metadata: Metadata = {
  title: 'Strategic Real Estate Corridors & Growth Hubs | L2H Solution',
  description: 'Deep-dive analytical intelligence across premier growth corridors and second-home destinations: Noida Expressway, Gurugram, Yamuna Expressway, Goa, Rishikesh, Tehri, Jim Corbett, and Dholera SIR.',
  keywords: [
    'Delhi NCR real estate corridors',
    'Goa luxury villas real estate',
    'Rishikesh Ganga view property',
    'Tehri lake view chalets',
    'Jim Corbett riverfront farmhouses',
    'Dholera SIR smart city investment',
    'Noida Expressway property prices',
    'Golf Course Road Gurgaon real estate',
    'Yamuna Expressway Jewar Airport plots',
    'L2H Solution growth corridors'
  ],
  alternates: {
    canonical: 'https://l2hsolution.com/locations',
  },
  openGraph: {
    title: 'Strategic Real Estate Corridors & Growth Hubs — L2H Solution',
    description: 'Explore price appreciation rates, connectivity matrices, and verified property inventories across premier NCR, Goa, Uttarakhand, and Gujarat hubs.',
    url: 'https://l2hsolution.com/locations',
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80']
  }
};

export default function LocationsPage() {
  const locations = LocationService.getAll();

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://l2hsolution.com'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Corridors & Locations',
            item: 'https://l2hsolution.com/locations'
          }
        ]
      },
      {
        '@type': 'ItemList',
        '@id': 'https://l2hsolution.com/locations#list',
        name: 'Strategic Real Estate Corridors & Investment Destinations',
        description: 'Micro-market intelligence on Delhi NCR, Goa, Uttarakhand, and Gujarat smart city corridors.',
        numberOfItems: locations.length,
        itemListElement: locations.map((loc, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `https://l2hsolution.com/locations/${loc.slug}`,
          name: loc.name
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <div className="bg-neutral dark:bg-black text-ink dark:text-neutral-100 min-h-screen py-16 transition-colors duration-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-charcoal-800 border border-amber-200 dark:border-charcoal-700 text-amber-800 dark:text-accent text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 fill-current" />
              <span>Micro-Market Intelligence</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink dark:text-white tracking-tight">
              Strategic Corridors &amp; Investment Hubs
            </h1>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-white font-normal leading-relaxed">
              Unbiased research, price velocity indexes, connectivity matrices, and verified inventory across high-growth corridors in Delhi NCR, Goa, Uttarakhand, and Gujarat.
            </p>
          </div>

          {/* Location Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="bg-white dark:bg-charcoal-900 rounded-3xl overflow-hidden border border-neutral-200 dark:border-charcoal-800 shadow-luxury-soft hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="h-60 relative overflow-hidden bg-black">
                    <Image
                      src={loc.heroImage}
                      alt={loc.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent">{loc.city}, {loc.state}</span>
                      <h3 className="text-xl font-serif font-bold text-white drop-shadow-sm">{loc.name}</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs py-2 border-b border-neutral-100 dark:border-charcoal-800">
                      <span className="text-neutral-700 dark:text-white font-medium">Price Range:</span>
                      <span className="font-serif font-bold text-ink dark:text-white">{loc.priceRange}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs py-2 border-b border-neutral-100 dark:border-charcoal-800">
                      <span className="text-neutral-700 dark:text-white font-medium">YoY Appreciation:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">+{loc.growthRateYoY}</span>
                    </div>

                    <p className="text-xs text-neutral-700 dark:text-white leading-relaxed font-normal line-clamp-3">
                      {loc.overview}
                    </p>

                    <div className="pt-2">
                      <span className="text-[10px] text-amber-700 dark:text-accent font-bold uppercase tracking-wider block mb-1">Key Micro-Markets:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {loc.popularMicroMarkets.slice(0, 3).map((m, mIdx) => (
                          <span key={mIdx} className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-charcoal-800 text-[10px] font-medium text-ink dark:text-white border border-neutral-200 dark:border-charcoal-700">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="w-full py-3 rounded-xl bg-accent hover:bg-yellow-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-gold-glow uppercase tracking-wider"
                  >
                    <span>Explore Corridor Intelligence</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
