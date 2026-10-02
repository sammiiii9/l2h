'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Scale, FileText } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

export default function LuxuryStatement() {
  return (
    <section id="about" className="py-24 sm:py-32 md:py-40 bg-[#F5F1EB] dark:bg-[#0E0D0C] text-[#171513] dark:text-[#F5F1EB] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Statement Heading & Narrative */}
          <div className="lg:col-span-6 space-y-8">
            
            <ScrollReveal variant="fade-up" delay={100} className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8945B] font-semibold">
                The Advisory Distinction
              </span>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#171513] dark:text-white tracking-tight leading-[1.15]">
                Decisions made through <br />
                <span className="italic font-light text-[#9A8570] dark:text-[#CBBBA8]">scrutiny, evidence, and fit.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={250} className="space-y-5 text-sm sm:text-base text-[#171513]/80 dark:text-white/80 font-light leading-relaxed max-w-xl">
              <p>
                We operate exclusively on behalf of the buyer. In a marketplace traditionally driven by developer inventory pressure and brochure persuasion, L2H sells a <strong className="font-medium text-[#171513] dark:text-white">decision-making process</strong> before we ever recommend a property.
              </p>
              <p>
                Every asset in our curated portfolio is cross-examined against 30-year revenue records, builder solvency, usable carpet efficiency, and actual sub-registrar transaction pricing. We protect your capital horizon, your lifestyle fit, and your long-term legacy.
              </p>
            </ScrollReveal>

            {/* Quick Fiduciary Badges */}
            <ScrollReveal variant="fade-up" delay={300} className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/70 dark:bg-[#171513]/70 border border-black/5 dark:border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#B8945B]/15 text-[#B8945B] flex items-center justify-center shrink-0">
                  <Scale className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-medium text-[#171513] dark:text-white block">Zero Sales Quotas</span>
                  <span className="text-[#171513]/60 dark:text-white/60 text-[11px]">100% Buyer-Side Fit</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/70 dark:bg-[#171513]/70 border border-black/5 dark:border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#B8945B]/15 text-[#B8945B] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-medium text-[#171513] dark:text-white block">Documentary Scrutiny</span>
                  <span className="text-[#171513]/60 dark:text-white/60 text-[11px]">30-Yr Mutation Audits</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={350} className="pt-2 flex items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#171513] dark:text-white hover:text-[#B8945B] dark:hover:text-[#B8945B] transition-colors group"
              >
                <span>Read Our Advisory Charter</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#B8945B]" />
              </Link>
            </ScrollReveal>

          </div>

          {/* Right Column: Architectural Statement Image */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal variant="scale-up" delay={200}>
              <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 bg-[#26211D]">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                  alt="Curated Prime Estate and Architectural Provenance"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
                
                {/* Editorial Caption */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[#B8945B] font-mono text-[10px] block uppercase tracking-widest">Advisory Provenance</span>
                  <p className="text-xs text-white/90 font-light leading-relaxed">
                    &ldquo;The right property starts with the right questions. We replace developer sales pressure with objective scrutiny.&rdquo;
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
