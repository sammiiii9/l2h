import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Compass, 
  HelpCircle 
} from 'lucide-react';
import { LocationService, PropertyService } from '@/lib/data-store';
import PropertyCard from '@/components/properties/PropertyCard';

interface LocationDetailPageProps {
  params: Promise<{
    slug: string;
  }> | {
    slug: string;
  };
}

export async function generateMetadata({ params }: LocationDetailPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const location = LocationService.getBySlug(resolvedParams.slug);
  if (!location) return { title: 'Location Not Found — L2H Solution' };

  const canonicalUrl = `https://l2hsolution.com/locations/${location.slug}`;

  return {
    title: `${location.name} Real Estate Intelligence & Price Trends | L2H Solution`,
    description: `${location.overview} Price Range: ${location.priceRange}. Growth: ${location.growthRateYoY}. Verified inventory, connectivity, and investment insights by L2H Solution.`,
    keywords: [
      `${location.name} real estate`,
      `Property prices in ${location.name}`,
      `Buy apartment ${location.city}`,
      `Plots in ${location.name}`,
      `${location.city} property investment`,
      'Delhi NCR growth corridors',
      'L2H Solution real estate advisory'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${location.name} Real Estate Intelligence — L2H Solution`,
      description: location.tagline,
      url: canonicalUrl,
      images: [{ url: location.heroImage }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${location.name} Real Estate Intelligence | L2H`,
      description: location.tagline,
      images: [location.heroImage]
    }
  };
}

export default async function LocationDetailPage({ params }: LocationDetailPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const location = LocationService.getBySlug(resolvedParams.slug);
  if (!location) notFound();

  // Match properties in this city/corridor
  let { properties } = PropertyService.getAll({
    city: location.city
  });
  if (properties.length === 0) {
    const all = PropertyService.getAll({ limit: 50 }).properties;
    properties = all.filter(p => 
      p.location.city.toLowerCase().includes(location.city.toLowerCase()) ||
      location.city.toLowerCase().includes(p.location.city.toLowerCase()) ||
      p.location.state.toLowerCase() === location.state.toLowerCase() ||
      location.popularMicroMarkets.some(m => p.location.locality.toLowerCase().includes(m.toLowerCase()) || p.title.toLowerCase().includes(m.toLowerCase()))
    );
  }
  if (properties.length === 0) {
    properties = PropertyService.getAll({ limit: 4 }).properties;
  }

  const canonicalUrl = `https://l2hsolution.com/locations/${location.slug}`;

  // Structured Data Schema for Local Search, Place & FAQPage
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
            name: 'Corridors',
            item: 'https://l2hsolution.com/locations'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: location.name,
            item: canonicalUrl
          }
        ]
      },
      {
        '@type': 'Place',
        '@id': canonicalUrl,
        name: location.name,
        description: location.overview,
        url: canonicalUrl,
        image: location.heroImage,
        address: {
          '@type': 'PostalAddress',
          addressLocality: location.city,
          addressRegion: location.state,
          addressCountry: 'IN'
        }
      },
      ...(location.faqs && location.faqs.length > 0 ? [{
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: location.faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      }] : [])
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <div className="bg-neutral dark:bg-black min-h-screen py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Back Link & Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-light">
            <Link href="/" className="hover:text-ink dark:hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-ink dark:hover:text-white transition-colors">Corridors</Link>
            <span>/</span>
            <span className="text-ink dark:text-white font-medium">{location.name}</span>
          </nav>

          {/* Hero Section — Real Photography */}
          <div className="bg-black text-white rounded-3xl p-8 sm:p-14 border border-charcoal-700 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src={location.heroImage}
                alt={location.name}
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-30 filter brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
            </div>

            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-charcoal-800 border border-charcoal-700 text-accent text-xs font-semibold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-accent" />
                <span>Corridor Market Briefing</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                {location.name}
              </h1>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                {location.tagline}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-charcoal-800">
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Valuation Benchmark</span>
                  <div className="text-lg sm:text-xl font-serif font-bold text-white">{location.avgPricePerSqFt}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">YoY Price Velocity</span>
                  <div className="text-lg sm:text-xl font-serif font-bold text-accent">{location.growthRateYoY}</div>
                </div>

                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Typical Ticket Range</span>
                  <div className="text-lg sm:text-xl font-serif font-bold text-neutral-200">{location.priceRange}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative-First Executive Briefing Box */}
          <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-charcoal-800 shadow-luxury-soft space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral dark:bg-charcoal-800 text-ink dark:text-neutral-200 text-[11px] font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-accent" />
              <span>Corridor Character &amp; Trajectory Brief</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs sm:text-sm text-neutral-800 dark:text-neutral-100 font-normal">
              <div className="space-y-1.5 p-4 rounded-2xl bg-neutral-50 dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700">
                <strong className="text-ink dark:text-white font-serif font-semibold block text-sm">Target Buyer Profile</strong>
                <span>Best suited for long-term luxury home seekers, IT GCC executives, and high-appreciation land investors.</span>
              </div>
              <div className="space-y-1.5 p-4 rounded-2xl bg-neutral-50 dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700">
                <strong className="text-ink dark:text-white font-serif font-semibold block text-sm">Primary Growth Catalyst</strong>
                <span>Expressway transit access, upcoming aviation hubs, and planned masterplanned green zoning.</span>
              </div>
              <div className="space-y-1.5 p-4 rounded-2xl bg-neutral-50 dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700">
                <strong className="text-ink dark:text-white font-serif font-semibold block text-sm">L2H Advisory Verdict</strong>
                <span>High liquidity for ready &amp; nearing-completion RERA projects; verify developer balance sheet before booking.</span>
              </div>
            </div>
          </div>

          {/* 2-Column: Macro Analysis vs Transit & Social Infrastructure */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white dark:bg-charcoal-900 rounded-3xl p-8 border border-neutral-200 dark:border-charcoal-800 shadow-luxury-soft space-y-6">
              <h2 className="text-2xl font-serif font-bold text-ink dark:text-white">
                Corridor Macro Analysis &amp; Urban Masterplan
              </h2>
              <p className="text-neutral-800 dark:text-neutral-100 text-sm sm:text-base leading-relaxed font-normal">
                {location.overview}
              </p>

              <div className="pt-4 space-y-3">
                <h3 className="text-lg font-serif font-bold text-ink dark:text-white">
                  Key Micro-Market Clusters
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {location.popularMicroMarkets.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-neutral dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700">
                      <MapPin className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-xs font-semibold text-ink dark:text-white">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 space-y-3 border-t border-neutral-100 dark:border-charcoal-800">
                <h3 className="text-lg font-serif font-bold text-ink dark:text-white">
                  Strategic Investment Outlook &amp; Risk Considerations
                </h3>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm leading-relaxed font-light bg-neutral dark:bg-charcoal-800 p-5 rounded-2xl border border-neutral-200 dark:border-charcoal-700">
                  {location.investmentOutlook}
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-charcoal-800 shadow-luxury-soft space-y-4">
                <span className="text-xs uppercase tracking-wider font-bold text-ink dark:text-white">
                  Transit &amp; Expressways
                </span>
                <ul className="space-y-3 text-xs text-neutral-700 dark:text-neutral-300">
                  {location.connectivityHighlights.map((conn, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-light">{conn}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-charcoal-800 shadow-luxury-soft space-y-4">
                <span className="text-xs uppercase tracking-wider font-bold text-ink dark:text-white">
                  Social &amp; Lifestyle Infrastructure
                </span>
                <ul className="space-y-3 text-xs text-neutral-700 dark:text-neutral-300">
                  {location.lifestyleAndSocialInfra.map((soc, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-light">{soc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Corridor Available Verified Inventory */}
          {properties.length > 0 && (
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold">
                    Verified Inventory
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ink dark:text-white">
                    Featured Properties in {location.name}
                  </h3>
                </div>

                <Link
                  href={`/properties?search=${encodeURIComponent(location.city)}`}
                  className="text-xs font-bold text-accent hover:underline flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>Explore All in {location.city}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {properties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}

          {/* FAQs with Structured Markup */}
          {location.faqs && location.faqs.length > 0 && (
            <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-8 border border-neutral-200 dark:border-charcoal-800 shadow-luxury-soft space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink dark:text-white">
                <HelpCircle className="w-4 h-4 text-accent" />
                <span>Frequently Asked Questions • {location.name}</span>
              </div>

              <div className="divide-y divide-neutral-100 dark:divide-charcoal-800">
                {location.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="py-4 space-y-1.5">
                    <h4 className="font-serif font-bold text-ink dark:text-white text-base">{faq.question}</h4>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
