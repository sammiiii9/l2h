import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Building2, 
  Trees, 
  Home, 
  Compass, 
  FileCheck, 
  Users, 
  Award 
} from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';

export const metadata = {
  title: 'About L2H Solution — Independent Real Estate Advisory & Fiduciary Representation',
  description: 'Understand the founding principles, research methodology, and leadership behind L2H Solution.',
};

const LEADERSHIP_TEAM = [
  {
    name: 'Sanjeev Sharma',
    role: 'Managing Principal & Founder',
    experience: '18+ Years in Real Estate Advisory & Capital Markets',
    bio: 'Former senior investment banker and real estate director with deep transaction expertise across Delhi NCR, Yamuna Expressway, and prime coastal markets.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=85'
  },
  {
    name: 'Ananya Verma',
    role: 'Head of Legal & Title Due Diligence',
    experience: '14+ Years in Property Law, Land Mutation & RERA Compliance',
    bio: 'Directs all municipal zoning audits, 30-year encumbrance checks, and contract reviews. Ensures zero legal ambiguity for L2H client acquisitions.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85'
  },
  {
    name: 'Kunal Singhania',
    role: 'Director — Commercial Assets & High-Yield',
    experience: '12+ Years in Corporate Leasing & Institutional Mandates',
    bio: 'Specializes in Grade-A pre-leased office portfolios, high-street retail underwriting, and commercial debt yield structuring across North India.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85'
  }
];

export default function AboutPage() {
  const whatsappLink = createWhatsAppUrl({
    customMessage: 'Hi L2H Solution, I would like to schedule a private advisory consultation.'
  });

  return (
    <div className="bg-neutral dark:bg-black text-ink dark:text-neutral-100 min-h-screen">
      
      {/* 1. Institutional Hero */}
      <section className="relative py-28 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
            alt="About L2H Solution"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30 filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/90" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-charcoal-800 border border-charcoal-700 text-accent text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span>Institutional Charter</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
            More Than a Property Search. <br />
            <span className="italic font-normal text-neutral-300">A Defensible Decision.</span>
          </h1>

          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
            L2H Solution was founded on a singular conviction: major real estate decisions should stand up to rigorous legal, financial, and architectural scrutiny. We represent the buyer with zero developer quotas.
          </p>
        </div>
      </section>

      {/* 2. Brand Pull-Quote Section */}
      <section className="py-20 bg-white dark:bg-charcoal-900 border-b border-neutral-200 dark:border-charcoal-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Our Mission
          </span>
          <blockquote className="text-2xl sm:text-4xl font-serif font-normal italic text-ink dark:text-white leading-relaxed">
            &ldquo;From Land to Legacy. We provide clarity when the market pushes urgency, and evidence when sellers offer promises.&rdquo;
          </blockquote>
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-white font-normal max-w-2xl mx-auto leading-relaxed">
            We do not accept broker kickbacks or volume bonuses that compromise our advice. If a development carries litigation risk, delayed possession records, or inflated loading ratios, we advise our clients to walk away.
          </p>
        </div>
      </section>

      {/* 3. The 5-Step Methodology in Prose */}
      <section className="py-24 bg-neutral dark:bg-black border-b border-neutral-200 dark:border-charcoal-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Structured Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink dark:text-white tracking-tight">
              How We Work With Buyers
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-white font-normal">
              Understand → Analyse → Shortlist → Deliver → Decide Better.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Understand',
                subtitle: 'Objectives Alignment',
                text: 'We align deeply on your capital horizon, tax structuring, family move requirements, or commercial cash flow thresholds before reviewing any project.'
              },
              {
                step: '02',
                title: 'Analyse',
                subtitle: 'Deep Due Diligence',
                text: 'We verify 30-year title histories, municipal zoning permissions, developer balance sheets, and real secondary registry transaction benchmarks.'
              },
              {
                step: '03',
                title: 'Shortlist',
                subtitle: 'Zero Noise Curation',
                text: 'We eliminate compromised inventory, presenting exactly 2 to 3 thoroughly vetted opportunities that genuinely fit your mandate.'
              },
              {
                step: '04',
                title: 'Deliver',
                subtitle: 'Commercial Advocacy',
                text: 'We negotiate commercial payment schedules, audit builder-buyer agreements, conduct pre-possession snagging, and manage bank disbursements.'
              },
              {
                step: '05',
                title: 'Decide Better',
                subtitle: 'Lifetime Stewardship',
                text: 'You execute with complete peace of mind, backed by post-handover tenant acquisition, registry assistance, and secondary exit management.'
              }
            ].map((s, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-neutral-200 dark:border-charcoal-800 shadow-luxury-soft space-y-3"
              >
                <div className="text-xs font-mono font-bold text-accent">
                  Stage {s.step}
                </div>
                <h3 className="text-lg font-serif font-bold text-ink dark:text-white">
                  {s.title}
                </h3>
                <div className="text-[11px] font-semibold text-neutral-500 dark:text-accent uppercase tracking-wider">
                  {s.subtitle}
                </div>
                <p className="text-xs text-neutral-700 dark:text-white font-normal leading-relaxed">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership & Advisor Partners */}
      <section className="py-24 bg-white dark:bg-charcoal-900 border-b border-neutral-200 dark:border-charcoal-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              The Advisory Partners
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink dark:text-white tracking-tight">
              Senior Leadership Team
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-white font-normal">
              Experienced real estate strategists dedicated to fiduciary representation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LEADERSHIP_TEAM.map((partner, idx) => (
              <div
                key={idx}
                className="bg-neutral-50 dark:bg-charcoal-800/80 rounded-3xl overflow-hidden border border-neutral-200 dark:border-charcoal-700 shadow-luxury-soft flex flex-col justify-between"
              >
                <div>
                  <div className="h-72 relative overflow-hidden bg-black">
                    <Image
                      src={partner.photo}
                      alt={partner.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-serif font-bold text-white">
                        {partner.name}
                      </h3>
                      <div className="text-xs text-accent font-light">
                        {partner.role}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-accent">
                      {partner.experience}
                    </div>
                    <p className="text-xs text-neutral-700 dark:text-white font-normal leading-relaxed">
                      {partner.bio}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-neutral-200 dark:border-charcoal-700/60 flex items-center justify-between text-xs pt-4">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-amber-700 dark:text-accent hover:underline flex items-center gap-1 uppercase tracking-wider"
                  >
                    <span>Consult with {partner.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Direct Action CTA */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Schedule an Executive Consultation
          </h2>
          <p className="text-xs sm:text-base text-neutral-300 font-light leading-relaxed max-w-xl mx-auto">
            Discuss your property parameters with an L2H partner at our Advant Navis office or over a private call.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-accent hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-gold-glow"
            >
              Talk to an Advisor
            </a>

            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white font-semibold text-xs uppercase tracking-wider border border-charcoal-700 transition-colors"
            >
              Contact Advisory Desk
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
