import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  HeartHandshake, 
  Target, 
  MessageSquare, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Ear, 
  CheckSquare2, 
  FileSearch, 
  Check, 
  X 
} from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Why L2H Solution — Client-First Real Estate Advisory vs Brokerage',
  description: 'Discover why discerning buyers choose L2H Solution. Understand the person first, recommend the property second. Zero broker pressure, verified clear-title documentation.',
  keywords: [
    'Why L2H Solution',
    'real estate advisory India',
    'property broker vs advisory',
    'transparent property consultant',
    'Noida real estate advisor'
  ]
};

export default function WhyL2HPage() {
  const whatsappLink = createWhatsAppUrl({
    customMessage: 'Hi L2H Solution, I would like to understand your advisory approach and discuss my property requirements.'
  });

  return (
    <div className="bg-[#F5F1EB] dark:bg-[#0E0D0C] text-[#171513] dark:text-[#F5F1EB] min-h-screen pb-24 transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <section className="relative py-28 sm:py-36 bg-[#171513] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Why Choose L2H Solution"
            className="w-full h-full object-cover opacity-35 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-[#171513]/70 to-[#171513]/90" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#E8D3B4] text-[11px] font-semibold uppercase tracking-[0.2em]">
            <HeartHandshake className="w-3.5 h-3.5 text-[#B8945B]" />
            <span>The Advisory Standard</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-white tracking-tight leading-[1.12]">
            We Don&apos;t Sell Properties. <br />
            <span className="italic font-light text-[#E8E0D6]">We Serve People.</span>
          </h1>

          <p className="text-base sm:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            Property decisions are personal. We first understand why you want to buy — and help you explore the right property for your purpose, budget, and long-term goals.
          </p>
        </div>
      </section>

      {/* 2. Side-by-Side Comparison: Broker vs L2H Advisory */}
      <section className="py-24 sm:py-32 bg-white dark:bg-[#171513] border-b border-black/5 dark:border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8945B]">
              The Difference
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#171513] dark:text-white">
              Conventional Broker vs L2H Advisory
            </h2>
            <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light max-w-xl mx-auto">
              How our client-first model fundamentally changes your property buying experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Left: Conventional Broker */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF7F2] dark:bg-[#26211D] border border-black/5 dark:border-white/10 space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-rose-500 block">
                  Conventional Approach
                </span>
                <h3 className="text-2xl font-serif text-[#171513] dark:text-white">
                  Typical Property Broker
                </h3>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-[#171513]/80 dark:text-white/80">
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Shows every client whatever inventory happens to be on their sales sheet.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Uses artificial urgency (&ldquo;book today&rdquo;, &ldquo;only 2 plots left&rdquo;).</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Makes unsupported return and appreciation promises.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Transaction-focused: Relationship ends the moment registry is signed.</span>
                </li>
              </ul>
            </div>

            {/* Right: L2H Solution Advisory */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#171513] text-white border border-[#B8945B]/40 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8945B]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#B8945B] block">
                  The L2H Standard
                </span>
                <h3 className="text-2xl font-serif text-white">
                  L2H Property Advisory
                </h3>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-white/90">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#B8945B] shrink-0 mt-0.5" />
                  <span><strong>Understands you first:</strong> Requirement, budget, purpose, and timeline before suggesting options.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#B8945B] shrink-0 mt-0.5" />
                  <span><strong>Transparent facts:</strong> Factual pricing, clear title verification, and zero artificial pressure.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#B8945B] shrink-0 mt-0.5" />
                  <span><strong>Purpose-based curation:</strong> Sacred, Holiday, Growth, or Residential categories tailored to your goals.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#B8945B] shrink-0 mt-0.5" />
                  <span><strong>Long-term partnership:</strong> Ongoing support throughout your entire property journey.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 3. The 4 Pillars of L2H */}
      <section className="py-24 sm:py-32 bg-[#F5F1EB] dark:bg-[#0E0D0C]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8945B]">
              Core Pillars
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#171513] dark:text-white">
              Why People Choose L2H Solution
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: 'Client-First Approach',
                desc: 'We start by understanding your requirement, budget, family preferences, and timeline before presenting any property.'
              },
              {
                icon: Target,
                title: 'Purpose-Based Recommendations',
                desc: 'We organize opportunities around the reason you’re buying — whether for home living, sacred retreats, or capital growth.'
              },
              {
                icon: MessageSquare,
                title: 'Clear Communication',
                desc: 'We aim to explain property opportunities clearly and transparently, highlighting what fits and what to consider.'
              },
              {
                icon: HeartHandshake,
                title: 'Long-Term Relationship',
                desc: 'Our support doesn’t stop at the transaction. We remain connected and available throughout your property journey.'
              }
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-8 rounded-3xl bg-white dark:bg-[#171513] border border-black/5 dark:border-white/10 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#B8945B]/10 text-[#B8945B] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-serif font-normal text-[#171513] dark:text-white">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* How It Works Section */}
          <div className="pt-12 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8945B]">
                The Process
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif font-normal text-[#171513] dark:text-white">
                A Simpler Way to Find the Right Property
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Understand', lead: 'We listen first.', desc: 'We understand your requirements, budget, purpose and expectations.' },
                { step: '02', title: 'Shortlist', lead: 'We identify relevant opportunities.', desc: 'We focus on properties that match your needs rather than overwhelming you.' },
                { step: '03', title: 'Evaluate', lead: 'We help you understand the opportunity.', desc: 'Location, property type, pricing and details explained clearly.' },
                { step: '04', title: 'Stay Connected', lead: 'Our relationship continues.', desc: 'We remain available to support you throughout your property journey.' }
              ].map((s) => (
                <div
                  key={s.step}
                  className="p-6 rounded-2xl bg-white dark:bg-[#171513] border border-black/5 dark:border-white/10 space-y-3"
                >
                  <span className="font-mono text-xl font-light text-[#B8945B]">{s.step}</span>
                  <h4 className="text-lg font-serif text-[#171513] dark:text-white">{s.title}</h4>
                  <div className="text-xs font-semibold text-[#171513] dark:text-white">{s.lead}</div>
                  <p className="text-xs text-[#171513]/70 dark:text-white/70 font-light leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Footer */}
          <div className="text-center pt-8 space-y-4">
            <h3 className="text-2xl font-serif text-[#171513] dark:text-white">
              Experience the L2H Advisory Standard
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/properties"
                className="px-7 py-3.5 rounded-full bg-[#171513] dark:bg-white text-white dark:text-[#171513] text-xs font-semibold uppercase tracking-wider hover:bg-[#B8945B] transition-colors"
              >
                Explore Current Opportunities
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-emerald-600 transition-colors flex items-center gap-2"
              >
                <span>Talk to a Property Advisor</span>
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
