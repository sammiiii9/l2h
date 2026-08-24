import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Trees, 
  Home, 
  Building2, 
  MapPin,
  TrendingUp,
  FileCheck,
  Scale,
  Sparkles
} from 'lucide-react';
import { PropertyService, LocationService } from '@/lib/data-store';
import PropertyCard from '@/components/properties/PropertyCard';
import { createWhatsAppUrl } from '@/lib/utils';

export const metadata = {
  title: 'L2H Solution — Independent Real Estate Advisory | Luxury Properties & Land',
  description: 'The right property starts with the right questions. L2H is an independent real-estate advisory for buyers who want every major property decision to stand up to scrutiny.',
};

export default async function HomePage() {
  const { properties: allProperties } = PropertyService.getAll({ status: 'Active' });

  // Curate 6 top verified properties (2 per category)
  const plotProps = allProperties
    .filter((p: any) => p.category === 'plots' || p.category === 'Plots' || p.propertyType === 'Plot')
    .slice(0, 2);

  const resProps = allProperties
    .filter((p: any) => (p.category === 'residential' || p.category === 'Residential' || p.category === 'Apartments' || p.category === 'Homes') && p.propertyType !== 'Plot' && p.propertyType !== 'Office' && p.propertyType !== 'Retail')
    .slice(0, 2);

  const comProps = allProperties
    .filter((p: any) => p.category === 'commercial' || p.category === 'Commercial' || p.propertyType === 'Office' || p.propertyType === 'Retail')
    .slice(0, 2);

  const featuredProperties = [...plotProps, ...resProps, ...comProps];
  const locationHubs = LocationService.getAll().slice(0, 3);

  const whatsappLink = createWhatsAppUrl({
    customMessage: 'Hi L2H Solution, I am reviewing property opportunities and would like to speak with a real estate advisor.'
  });

  return (
    <div className="flex flex-col min-h-screen bg-neutral dark:bg-black text-ink dark:text-neutral-100 transition-colors duration-200">
      
      {/* =========================================================================
          1. HERO — Clean, Minimal, Architectural & High-Impact
         ========================================================================= */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center bg-black text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        {/* Full-Bleed Architectural Image Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Real Estate Architecture and Advisory"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40 filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 w-full text-center space-y-8">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 dark:bg-charcoal-800/80 border border-white/20 dark:border-charcoal-700 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              Independent Real Estate Advisory • Delhi NCR &amp; Pan-India
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.12]">
              The right property starts <br />
              <span className="font-normal italic text-neutral-200">with the right questions.</span>
            </h1>

            <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
              L2H is an independent real-estate advisory for buyers who want every major property decision to stand up to scrutiny.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/properties"
              className="px-8 py-4 rounded-xl bg-accent hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-gold-glow hover:shadow-gold-glow-lg"
            >
              Explore Properties
            </Link>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-charcoal-800/90 hover:bg-charcoal-800 text-white font-semibold text-xs uppercase tracking-wider border border-charcoal-700 transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-accent" />
              <span>Talk to an Advisor</span>
            </a>
          </div>

          {/* Minimal Credibility Micro-Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 text-xs border-t border-charcoal-800/80 font-normal text-white">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
              <span>100% Title Verified</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Scale className="w-4 h-4 text-accent shrink-0" />
              <span>Zero Developer Quotas</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent shrink-0" />
              <span>Registry Price Data</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FileCheck className="w-4 h-4 text-accent shrink-0" />
              <span>End-to-End Care</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. WHAT WE DO — 3 Core Pillars (Clean 3-Column Grid)
         ========================================================================= */}
      <section className="py-20 bg-white dark:bg-charcoal-900 border-b border-neutral-200 dark:border-charcoal-800" id="services">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-accent">
              Our Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink dark:text-white tracking-tight">
              Three Discovery Pillars
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-white font-normal">
              Structured research tailored to your capital horizon, lifestyle goals, and exit liquidity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Plots & Land */}
            <Link
              href="/plots"
              className="group bg-neutral-50 dark:bg-charcoal-800/90 rounded-3xl overflow-hidden border border-neutral-200 dark:border-charcoal-700 shadow-luxury-soft hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-60 relative overflow-hidden bg-black">
                  <Image
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85"
                    alt="Plots and Land Pan-India"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-yellow-950/90 text-yellow-300 border border-yellow-700">
                      <Trees className="w-3.5 h-3.5" />
                      <span>Plots &amp; Land</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-serif font-bold text-ink dark:text-white group-hover:text-amber-700 dark:group-hover:text-accent transition-colors">
                    Plots &amp; Clear-Title Land Parcels
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-white font-normal leading-relaxed">
                    Clear-title land parcels across high-growth corridors like Yamuna Expressway, Dholera SIR, and Goa with 30-year mutation audits.
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-amber-700 dark:text-accent group-hover:underline">
                <span>Explore Land Parcels</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Pillar 2: Residential */}
            <Link
              href="/residential"
              className="group bg-neutral-50 dark:bg-charcoal-800/90 rounded-3xl overflow-hidden border border-neutral-200 dark:border-charcoal-700 shadow-luxury-soft hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-60 relative overflow-hidden bg-black">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85"
                    alt="Luxury Residential Apartments and Estates"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-charcoal-900/90 text-white border border-charcoal-700">
                      <Home className="w-3.5 h-3.5 text-accent" />
                      <span>Residential</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-serif font-bold text-ink dark:text-white group-hover:text-amber-700 dark:group-hover:text-accent transition-colors">
                    Residential Apartments &amp; Estates
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-white font-normal leading-relaxed">
                    Luxury homes evaluated through daily living practicality, builder solvency, usable carpet area, and verified possession windows.
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-amber-700 dark:text-accent group-hover:underline">
                <span>Explore Residences</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Pillar 3: Commercial */}
            <Link
              href="/commercial"
              className="group bg-neutral-50 dark:bg-charcoal-800/90 rounded-3xl overflow-hidden border border-neutral-200 dark:border-charcoal-700 shadow-luxury-soft hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-60 relative overflow-hidden bg-black">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85"
                    alt="Commercial Real Estate and Yield"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-charcoal-900/90 text-accent border border-accent/40">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Commercial</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-serif font-bold text-ink dark:text-white group-hover:text-amber-700 dark:group-hover:text-accent transition-colors">
                    Pre-Leased Offices &amp; Retail Yield
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-white font-normal leading-relaxed">
                    Grade-A commercial assets with verified tenant covenants, long lock-in terms, and 7.5% - 9.2% net rental cash flow profiles.
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-amber-700 dark:text-accent group-hover:underline">
                <span>Explore Commercial</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. FEATURED VERIFIED OPPORTUNITIES — Clean 6-Card Grid
         ========================================================================= */}
      <section className="py-20 bg-neutral dark:bg-black border-b border-neutral-200 dark:border-charcoal-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-accent">
                Curated Dossiers
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink dark:text-white tracking-tight">
                Featured Verified Opportunities
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-white font-normal max-w-xl">
                Rigorous title scrutiny, developer solvency checks, and verified secondary price benchmarks.
              </p>
            </div>

            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-charcoal-900 border border-neutral-200 dark:border-charcoal-700 text-xs font-bold text-ink dark:text-white hover:text-amber-700 dark:hover:text-accent transition-colors shadow-sm self-start md:self-auto"
            >
              <span>View All Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop, idx) => (
              <PropertyCard key={prop.id} property={prop} priorityImage={idx < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. WHY CHOOSE L2H — 4 Trust Pillars (Clean & Breathable)
         ========================================================================= */}
      <section className="py-20 bg-white dark:bg-charcoal-900 border-b border-neutral-200 dark:border-charcoal-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-accent">
              The Advisory Distinction
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink dark:text-white tracking-tight">
              Why Buyers Trust L2H
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-white font-normal">
              We operate exclusively on behalf of the buyer, replacing high-pressure sales with objective evidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent text-black flex items-center justify-center shadow-gold-glow">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-ink dark:text-white">
                30-Year Title Scrutiny
              </h3>
              <p className="text-xs text-neutral-700 dark:text-white font-normal leading-relaxed">
                Complete legal cross-examination of revenue records, RERA filings, and municipal zoning master plans.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent text-black flex items-center justify-center shadow-gold-glow">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-ink dark:text-white">
                Zero Developer Quotas
              </h3>
              <p className="text-xs text-neutral-700 dark:text-white font-normal leading-relaxed">
                Zero sales bias. We never push high-margin inventory that compromises your capital horizon or lifestyle fit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent text-black flex items-center justify-center shadow-gold-glow">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-ink dark:text-white">
                Registry Price Intel
              </h3>
              <p className="text-xs text-neutral-700 dark:text-white font-normal leading-relaxed">
                Commercial negotiation grounded in actual sub-registrar transaction rates, not brochure price sheets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent text-black flex items-center justify-center shadow-gold-glow">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-ink dark:text-white">
                Post-Handover Care
              </h3>
              <p className="text-xs text-neutral-700 dark:text-white font-normal leading-relaxed">
                Full lifecycle stewardship through contract signing, pre-possession snagging audits, and secondary leasing exit.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. PRIME GROWTH CORRIDORS — 3 Micro-Market Hubs
         ========================================================================= */}
      <section className="py-20 bg-neutral dark:bg-black border-b border-neutral-200 dark:border-charcoal-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-accent">
                Corridor Intelligence
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink dark:text-white tracking-tight">
                High-Growth Micro-Markets
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-white font-normal max-w-xl">
                Infrastructure catalysts, master plan connectivity, and price trends across primary corridors.
              </p>
            </div>

            <Link
              href="/locations"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-accent hover:underline uppercase tracking-wider"
            >
              <span>Explore All Corridors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locationHubs.map((loc) => (
              <Link
                key={loc.id}
                href={`/locations/${loc.slug}`}
                className="group bg-white dark:bg-charcoal-900 rounded-3xl overflow-hidden border border-neutral-200 dark:border-charcoal-700 shadow-luxury-soft hover:shadow-luxury-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 relative overflow-hidden bg-black">
                    <Image
                      src={loc.heroImage}
                      alt={loc.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-[10px] uppercase tracking-wider font-bold text-accent">
                        {loc.state}
                      </div>
                      <h3 className="text-xl font-serif font-bold text-white">
                        {loc.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <p className="text-xs text-neutral-700 dark:text-white line-clamp-2 leading-relaxed font-normal">
                      {loc.overview || loc.tagline}
                    </p>

                    <div className="pt-3 border-t border-neutral-100 dark:border-charcoal-700 flex items-center justify-between text-xs">
                      <span className="text-neutral-600 dark:text-neutral-300 font-medium">Benchmark Rate:</span>
                      <span className="font-bold text-ink dark:text-white">{loc.avgPricePerSqFt}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-amber-700 dark:text-accent group-hover:underline">
                  <span>Read Corridor Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CLIENT PERSPECTIVE — Minimal, Elegant Single-Quote Feature
         ========================================================================= */}
      <section className="py-20 bg-white dark:bg-charcoal-900 border-b border-neutral-200 dark:border-charcoal-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-accent">
            Client Experience
          </span>
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif font-normal italic text-ink dark:text-white leading-relaxed">
            &ldquo;Working with L2H was completely different from any previous broker experience in NCR. They pointed out structural floor-plan issues and municipal sanction delays that others omitted. That transparency saved us from a costly mistake.&rdquo;
          </blockquote>
          <div className="space-y-0.5">
            <div className="text-sm font-bold text-ink dark:text-white">Rajiv &amp; Shalini Mehra</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-300 font-normal">4 BHK Sky Villa Acquisition • Sector 150, Noida Expressway</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FINAL ADVISORY CONSULTATION CTA — Direct & Clean
         ========================================================================= */}
      <section className="py-20 bg-neutral-50 dark:bg-black text-ink dark:text-white relative overflow-hidden transition-colors">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white dark:bg-charcoal-900 border border-neutral-200 dark:border-charcoal-700 rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-amber-700 dark:text-accent">
                Start With Scrutiny
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink dark:text-white tracking-tight">
                Ready to Evaluate Your Next Property Decision?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-white font-normal leading-relaxed">
                Connect directly with an L2H strategist for independent title scrutiny, floor plan audits, or custom investment dossiers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider transition-all text-center shadow-gold-glow"
              >
                Talk to an Advisor
              </a>

              <a
                href="tel:+918439654385"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 border border-neutral-300 dark:border-charcoal-700 text-ink dark:text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-600 dark:text-accent" />
                <span>+91 8439654385</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
