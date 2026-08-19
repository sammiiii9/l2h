import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Compass, 
  CheckCircle2, 
  Building2, 
  ChevronRight,
  BookOpen,
  MapPin,
  Scale,
  Phone
} from 'lucide-react';
import { PropertyService, BlogService, MarketReportService, LocationService } from '@/lib/data-store';
import HeroSearch from '@/components/properties/HeroSearch';
import ApproachTimeline from '@/components/home/ApproachTimeline';
import PropertyCard from '@/components/properties/PropertyCard';
import IntentExplorer from '@/components/home/IntentExplorer';
import BudgetExplorer from '@/components/home/BudgetExplorer';
import L2HConcierge from '@/components/common/L2HConcierge';
import AdvisoryComparison from '@/components/home/AdvisoryComparison';
import TestimonialSection from '@/components/home/TestimonialSection';

export default async function HomePage() {
  // Fetch featured curated properties
  const { properties: allProps } = PropertyService.getAll({
    limit: 6
  });

  // Fetch market reports & locations
  const marketReports = MarketReportService.getAll().slice(0, 2);
  const locationHubs = LocationService.getAll();
  const blogPosts = BlogService.getAll().slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* 01 — HERO SECTION (BLACK) */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#09090b] text-white overflow-hidden pt-12 pb-24">
        {/* Full-width Architectural Visual Backdrop — Authentic Natural Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
            alt="L2H Solution Real Estate Advisory"
            className="w-full h-full object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-8">
          {/* Brand Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-zinc-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>From Land to Legacy • Independent Real Estate Advisory</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1]">
              From Land to Legacy. <br />
              <span className="font-normal italic text-zinc-300">Chosen Around You.</span>
            </h1>

            <p className="text-zinc-400 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
              Discover, evaluate and choose real estate with a team that looks beyond the property itself. We don't just find properties — we help you make better real-estate decisions.
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/properties"
              className="px-8 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-lg hover:scale-105 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-black" />
              <span>Explore Properties</span>
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-widest border border-white/15 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-zinc-300" />
              <span>Talk to an Advisor</span>
            </Link>

            <Link
              href="/find-property"
              className="px-6 py-4 rounded-xl bg-black/60 hover:bg-black text-white font-semibold text-xs uppercase tracking-widest border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-zinc-300" />
              <span>Find Your Match</span>
            </Link>
          </div>

          {/* 5-Field Property Search Widget */}
          <div className="pt-6">
            <HeroSearch />
          </div>

          {/* Trust Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 text-zinc-400 text-xs">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-white shrink-0" />
              <span>100% RERA Verified</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Compass className="w-4 h-4 text-white shrink-0" />
              <span>Fiduciary Buyer Representation</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4 text-white shrink-0" />
              <span>Data-Backed Valuation Moats</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Building2 className="w-4 h-4 text-white shrink-0" />
              <span>Tier-1 NCR Developers</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — WHAT ARE YOU LOOKING FOR? (WHITE) */}
      <IntentExplorer />

      {/* 03 — CURATED OPPORTUNITIES (BLACK / GRAPHITE) */}
      <section className="py-24 bg-[#0a0a0c] text-white border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-zinc-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Selection</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
                Curated Opportunities • Worth Exploring
              </h2>
              <p className="text-zinc-400 text-xs sm:text-base max-w-2xl font-light leading-relaxed">
                We don't dump inventory. Every property below has passed independent legal title review, density evaluation, and micro-market appreciation modeling.
              </p>
            </div>

            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors shrink-0"
            >
              <span>Explore Complete Portfolio</span>
              <ArrowRight className="w-4 h-4 text-zinc-300" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProps.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-widest transition-colors shadow-lg"
            >
              <span>View All Verified Properties</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>
          </div>
        </div>
      </section>

      {/* 04 — OUR ADVISORY APPROACH (WHITE) */}
      <ApproachTimeline />

      {/* 05 — AI CONCIERGE & ADVISORY COMPARISON (BLACK / GRAPHITE) */}
      <section className="py-20 bg-[#09090b] border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <L2HConcierge properties={allProps} />
        </div>
      </section>

      <AdvisoryComparison />

      {/* 06 — LOCATION CORRIDORS & RESEARCH SPOTLIGHT (WHITE) */}
      <section className="py-24 bg-white text-zinc-950 border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-semibold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Corridor Intelligence</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-zinc-950 tracking-tight">
                High-Growth NCR Micro-Markets
              </h2>
              <p className="text-zinc-600 text-xs sm:text-base max-w-2xl font-light">
                Analyze price trajectories, transit corridors, and development catalysts before committing capital.
              </p>
            </div>

            <Link
              href="/locations"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-black transition-colors shrink-0"
            >
              <span>All Location Guides</span>
              <ArrowRight className="w-4 h-4 text-zinc-600" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locationHubs.map((loc) => (
              <Link
                key={loc.id}
                href={`/locations/${loc.slug}`}
                className="bg-zinc-50 rounded-3xl overflow-hidden border border-zinc-200 hover:border-black hover:shadow-luxury transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="h-48 relative overflow-hidden bg-zinc-950">
                    <img
                      src={loc.heroImage}
                      alt={loc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 text-white">
                      <span className="text-[10px] text-zinc-300 uppercase tracking-wider font-bold">{loc.city}</span>
                      <h4 className="font-serif font-bold text-lg text-white">{loc.name}</h4>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex justify-between text-xs py-1 border-b border-zinc-200">
                      <span className="text-zinc-500">Benchmark:</span>
                      <span className="font-bold text-zinc-950">{loc.avgPricePerSqFt}</span>
                    </div>
                    <div className="flex justify-between text-xs py-1 border-b border-zinc-200">
                      <span className="text-zinc-500">Appreciation:</span>
                      <span className="font-bold text-emerald-600">{loc.growthRateYoY}</span>
                    </div>
                    <p className="text-xs text-zinc-600 font-light line-clamp-2 leading-relaxed">
                      {loc.overview}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 text-xs font-semibold text-zinc-950 flex items-center justify-between group-hover:text-black">
                  <span>Explore Corridor Intelligence</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — MARKET RESEARCH REPORTS (WHITE) */}
      <section className="py-24 bg-zinc-50 text-zinc-950 border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200 text-zinc-800 text-xs font-semibold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>L2H Intelligence Desk</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-zinc-950 tracking-tight">
                Institutional Research Reports
              </h2>
              <p className="text-zinc-600 text-xs sm:text-base max-w-2xl font-light">
                Download verified macroeconomic research briefs and corridor impact matrixes.
              </p>
            </div>

            <Link
              href="/market-reports"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-black transition-colors shrink-0"
            >
              <span>View All Market Reports</span>
              <ArrowRight className="w-4 h-4 text-zinc-600" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm flex flex-col sm:flex-row gap-6 items-center group hover:border-black transition-colors"
              >
                <div className="w-full sm:w-44 h-48 rounded-2xl overflow-hidden relative bg-zinc-950 shrink-0">
                  <img
                    src={report.coverImage}
                    alt={report.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-white text-black">
                    {report.period}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">{report.location}</span>
                  <h3 className="text-xl font-serif font-bold text-zinc-950 line-clamp-2 group-hover:text-zinc-700 transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-xs text-zinc-600 font-light line-clamp-2 leading-relaxed">
                    {report.subtitle}
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/market-reports"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:underline"
                    >
                      <span>Read Executive Summary &amp; Download</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — VERIFIED CLIENT TESTIMONIALS (WHITE) */}
      <TestimonialSection />

      {/* 09 — ADVISOR CTA: TELL US WHAT YOU'RE LOOKING FOR (BLACK / GRAPHITE) */}
      <section className="py-24 bg-[#09090b] text-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#121214] border border-white/15 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-zinc-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tell Us What You're Looking For</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Share Your Requirement. We'll Help You Narrow Down the Market.
              </h2>

              <p className="text-zinc-400 text-xs sm:text-base leading-relaxed font-light">
                Answer simple questions about your preferred category, location, budget, and timeline. Our advisory team will analyze the market and prepare a customized shortlist matching your criteria.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/find-property"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:scale-105"
                >
                  <span>Start My Property Search (60 Seconds)</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </Link>

                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider border border-white/15 transition-colors"
                >
                  <Phone className="w-4 h-4 text-zinc-300" />
                  <span>Call Advisory Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
