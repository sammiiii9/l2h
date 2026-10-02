import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  HeartHandshake, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Compass, 
  Target, 
  MessageSquare, 
  Home, 
  Factory, 
  Palmtree, 
  CheckCircle2 
} from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About L2H Solution — A Property Company Built Around People',
  description: 'Understand the founding principles, client-first philosophy, and long-term advisory commitment of L2H Solution.',
  keywords: [
    'About L2H Solution',
    'real estate advisory India',
    'property consultant Noida',
    'client first real estate',
    'plotted developments advisor'
  ]
};

export default function AboutPage() {
  const whatsappLink = createWhatsAppUrl({
    customMessage: 'Hi L2H Solution, I would like to speak with a property advisor about my goals and requirements.'
  });

  return (
    <div className="bg-[#F5F1EB] dark:bg-[#0E0D0C] text-[#171513] dark:text-[#F5F1EB] min-h-screen transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <section className="relative py-28 sm:py-36 bg-[#171513] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="A Property Company Built Around People"
            className="w-full h-full object-cover opacity-35 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-[#171513]/70 to-[#171513]/90" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#E8D3B4] text-[11px] font-semibold uppercase tracking-[0.2em]">
            <HeartHandshake className="w-3.5 h-3.5 text-[#B8945B]" />
            <span>Our Founding Philosophy</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-white tracking-tight leading-[1.12]">
            A Property Company <br />
            <span className="italic font-light text-[#E8E0D6]">Built Around People.</span>
          </h1>

          <p className="text-base sm:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            Property decisions are personal. We first understand the person behind the requirement before suggesting any property.
          </p>
        </div>
      </section>

      {/* 2. Core Philosophy Narrative */}
      <section className="py-24 sm:py-32 bg-white dark:bg-[#171513] border-b border-black/5 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          
          <div className="space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8945B] block">
              Core Belief
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#171513] dark:text-white leading-snug">
              &ldquo;We Don&apos;t Sell Properties. We Serve People.&rdquo;
            </h2>
          </div>

          <div className="space-y-6 text-base sm:text-lg text-[#171513]/80 dark:text-white/80 font-light leading-relaxed text-left max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl font-normal text-[#171513] dark:text-white">
              L2H Solution was built around a simple belief: property is not just about square yards, buildings or transactions. It is about people&apos;s plans, aspirations, security and future.
            </p>

            <p>
              Our approach begins with understanding the client.
            </p>

            <p>
              Whether someone is searching for a home in Noida, a plot near a spiritual destination, a holiday property or an opportunity in an emerging growth corridor, we aim to understand the purpose behind the purchase before suggesting a property.
            </p>

            <p className="font-medium text-[#171513] dark:text-white text-lg">
              Our goal is to build relationships that continue beyond the transaction.
            </p>
          </div>

          {/* Punchline Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF7F2] dark:bg-[#26211D] border border-[#B8945B]/30 max-w-2xl mx-auto text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B8945B] block">
              Our Compass
            </span>
            <div className="text-xl sm:text-2xl font-serif font-normal text-[#171513] dark:text-white">
              Understand the person first. Recommend the property second.
            </div>
          </div>

        </div>
      </section>

      {/* 3. The 7 Client Factors We Understand First */}
      <section className="py-24 sm:py-32 bg-[#F5F1EB] dark:bg-[#0E0D0C] border-b border-black/5 dark:border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8945B]">
              The Advisory Framework
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#171513] dark:text-white">
              What We Understand First
            </h2>
            <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light max-w-xl mx-auto">
              Before we ever present an opportunity, we evaluate these seven core factors with our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Requirement', desc: 'Family living needs, plot size preference, or commercial utility requirements.' },
              { num: '02', title: 'Budget', desc: 'Disciplined capital planning without hidden charges or aggressive stretches.' },
              { num: '03', title: 'Purpose', desc: 'Whether for primary home, devotee retreat, second vacation home, or long-term growth.' },
              { num: '04', title: 'Preferred Location', desc: 'Proximity to temple corridors, coastal green belts, or major industrial highways.' },
              { num: '05', title: 'Property Type', desc: '100 sq. yards demarcated freehold plots, ready-to-move apartments, or off-plan.' },
              { num: '06', title: 'Time Horizon', desc: 'Immediate construction readiness vs patient multi-year infrastructure gestation.' },
              { num: '07', title: 'Long-Term Goals', desc: 'Intergenerational wealth security, lifestyle peace of mind, or passive rental returns.' },
              { num: '08', title: 'Long-Term Support', desc: 'Ongoing assistance with documentation, boundary demarcation, and property stewardship.' }
            ].map((f) => (
              <div
                key={f.num}
                className="p-7 rounded-2xl bg-white dark:bg-[#171513] border border-black/5 dark:border-white/10 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="font-mono text-sm font-semibold text-[#B8945B]">
                    {f.num}
                  </span>
                  <h3 className="text-lg font-serif font-normal text-[#171513] dark:text-white">
                    {f.title}
                  </h3>
                  <p className="text-xs text-[#171513]/70 dark:text-white/70 font-light leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Why People Choose L2H (4 Trust Pillars) */}
      <section className="py-24 sm:py-32 bg-white dark:bg-[#171513]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8945B]">
              The Trust Standard
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#171513] dark:text-white">
              Why People Choose L2H Solution
            </h2>
            <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light">
              Clear communication, factual presentations, and zero high-pressure sales tactics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: 'Client-First Approach',
                desc: 'We start by understanding your requirement and parameters before showing any properties.'
              },
              {
                icon: Target,
                title: 'Purpose-Based Recommendations',
                desc: 'We organize opportunities around the reason you’re buying, eliminating irrelevant options.'
              },
              {
                icon: MessageSquare,
                title: 'Clear Communication',
                desc: 'We explain location facts, pricing, and considerations clearly without unsupported return claims.'
              },
              {
                icon: HeartHandshake,
                title: 'Long-Term Relationship',
                desc: 'Our relationship does not end after the transaction. We remain connected throughout your property journey.'
              }
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-8 rounded-3xl bg-[#FAF7F2] dark:bg-[#26211D] border border-black/5 dark:border-white/10 space-y-4 flex flex-col justify-between"
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

          {/* CTA Footer */}
          <div className="text-center pt-8 space-y-4">
            <h3 className="text-2xl font-serif text-[#171513] dark:text-white">
              Ready to discuss your property goals?
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/properties"
                className="px-7 py-3.5 rounded-full bg-[#171513] dark:bg-white text-white dark:text-[#171513] text-xs font-semibold uppercase tracking-wider hover:bg-[#B8945B] transition-colors"
              >
                Explore Properties
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-emerald-600 transition-colors flex items-center gap-2"
              >
                <span>Talk on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
