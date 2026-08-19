import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  TrendingUp, 
  CheckCircle2, 
  Building2, 
  Users, 
  Award,
  ArrowRight,
  Target
} from 'lucide-react';
import AdvisoryComparison from '@/components/home/AdvisoryComparison';
import ApproachTimeline from '@/components/home/ApproachTimeline';

export const metadata: Metadata = {
  title: 'About L2H Solution — Independent Luxury Real Estate Advisory & Consultancy',
  description: 'Learn about L2H Solution: our 5-step advisory methodology, code of ethics, leadership team, and transparent real-estate guidance across Delhi NCR, Noida, and Gurugram.',
  alternates: {
    canonical: 'https://l2hsolution.com/about',
  },
  openGraph: {
    title: 'About L2H Solution — Real Estate, Chosen Around You',
    description: 'Understand → Analyse → Shortlist → Deliver → Help You Decide Better. Discover the L2H advisory philosophy and leadership team.',
    url: 'https://l2hsolution.com/about',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80']
  }
};

export default function AboutPage() {
  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* 1. Hero Header */}
      <section className="bg-[#09090b] text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
            alt="L2H Solution Advisory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-zinc-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Advisory Excellence</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            More Than a Property Search. <br />
            <span className="italic font-normal text-zinc-300">A Better Decision.</span>
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
            L2H Solution was founded on a simple principle: real estate should be chosen through disciplined analysis, not aggressive sales pitches. We partner with families and investors to navigate India&apos;s most dynamic property corridors with clarity and peace of mind.
          </p>
        </div>
      </section>

      {/* 2. Core Pillars */}
      <section className="py-20 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-sm">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-zinc-950">
                Requirement First
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                We begin by understanding your lifestyle priorities, capital allocation, commute requirements, and long-term family growth before recommending a single property.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-zinc-950">
                Data &amp; Due Diligence
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                Every listed project undergoes strict RERA verification, legal encumbrance checks, developer delivery track record reviews, and rental yield stress-testing.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-zinc-950">
                End-to-End Handholding
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                From curated private site tours to builder-buyer agreement audits, home loans, registry documentation, and future resale/leasing, we stand beside you at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Methodology Interactive Stepper */}
      <ApproachTimeline />

      {/* 4. Advisory vs Brokerage Table */}
      <AdvisoryComparison />

      {/* 5. Code of Ethics & Transparency Pledge */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#09090b] text-white rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl space-y-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-zinc-300 text-xs font-semibold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>Our Charter</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                The L2H Code of Ethics
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed font-light">
                We believe trust in real estate is earned through radical transparency and unwavering client fidelity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-black border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-1">Zero Hidden Markups or Inflated Pricing</span>
                  <span className="text-zinc-400 font-light">All prices presented are direct developer base rates with official payment plans. No hidden middleman fees.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-black border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-1">100% RERA Verified Inventory</span>
                  <span className="text-zinc-400 font-light">We do not market or accept brokerage for unapproved, litigated, or non-RERA registered projects.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-black border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-1">Unbiased Comparative Audits</span>
                  <span className="text-zinc-400 font-light">We transparently point out floor plan drawbacks, sunlight angles, and construction progress realities.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-black border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-1">Strict Confidentiality &amp; Zero Spam</span>
                  <span className="text-zinc-400 font-light">Your contact information is never shared or sold to third-party telemarketers or external brokers.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 text-center sm:text-left">
              <Link
                href="/find-property"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Consult an L2H Advisor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
