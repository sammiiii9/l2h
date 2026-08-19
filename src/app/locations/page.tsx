import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MapPin, ArrowRight, TrendingUp, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { LocationService, PropertyService } from '@/lib/data-store';

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
    <div className="bg-zinc-50 min-h-screen py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Micro-Market Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-950 tracking-tight">
            Strategic Corridors &amp; Investment Hubs
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
            Unbiased research, price velocity indexes, connectivity matrices, and verified inventory across high-growth corridors in Delhi NCR, Goa, Uttarakhand, and Gujarat.
          </p>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm hover:border-black transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-60 relative overflow-hidden bg-black">
                  <img
                    src={loc.heroImage}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">{loc.city}, {loc.state}</span>
                    <h3 className="text-xl font-serif font-bold text-white drop-shadow-sm">{loc.name}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs py-2 border-b border-zinc-100">
                    <span className="text-zinc-500 font-medium">Price Range:</span>
                    <span className="font-serif font-bold text-zinc-950">{loc.priceRange}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-2 border-b border-zinc-100">
                    <span className="text-zinc-500 font-medium">YoY Appreciation:</span>
                    <span className="font-bold text-emerald-600">+{loc.growthRateYoY}</span>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed font-light line-clamp-3">
                    {loc.overview}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-1">Key Micro-Markets:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.popularMicroMarkets.slice(0, 3).map((m, mIdx) => (
                        <span key={mIdx} className="px-2 py-0.5 rounded-md bg-zinc-100 text-[10px] font-medium text-zinc-800 border border-zinc-200">
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
                  className="w-full py-3 rounded-xl bg-black hover:bg-zinc-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
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
