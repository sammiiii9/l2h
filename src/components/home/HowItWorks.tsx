'use client';

import React from 'react';
import { Ear, CheckSquare2, FileSearch, HeartHandshake } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

const STEPS = [
  {
    step: '01',
    title: 'Understand',
    lead: 'We listen first.',
    description: 'We understand your requirements, budget, purpose and expectations before looking at any properties.',
    icon: Ear,
    badge: 'Step 01'
  },
  {
    step: '02',
    title: 'Shortlist',
    lead: 'We identify relevant opportunities.',
    description: 'We focus on properties that match your needs rather than overwhelming you with endless options.',
    icon: CheckSquare2,
    badge: 'Step 02'
  },
  {
    step: '03',
    title: 'Evaluate',
    lead: 'We help you understand the opportunity.',
    description: 'Location, property type, pricing and available project information are explained clearly without sales pressure.',
    icon: FileSearch,
    badge: 'Step 03'
  },
  {
    step: '04',
    title: 'Stay Connected',
    lead: 'Our relationship continues after the transaction.',
    description: 'We remain available to support you throughout your property journey with long-term guidance.',
    icon: HeartHandshake,
    badge: 'Step 04'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#FAF7F2] dark:bg-[#12100E] border-t border-black/5 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <ScrollReveal variant="fade-up" delay={100} className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171513]/5 dark:bg-white/10 border border-[#171513]/10 dark:border-white/15 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8945B]">
            <span>The Advisory Process</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#171513] dark:text-white tracking-tight leading-[1.15]">
            A Simpler Way to Find the Right Property
          </h2>
          <p className="text-sm sm:text-base text-[#171513]/75 dark:text-white/75 font-light leading-relaxed max-w-2xl mx-auto">
            Experience property discovery with clarity, zero broker pressure, and dedicated guidance from start to finish.
          </p>
        </ScrollReveal>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;

            return (
              <ScrollReveal
                key={s.step}
                variant="fade-up"
                delay={100 + idx * 80}
                className="h-full"
              >
                <div className="p-7 rounded-2xl bg-white dark:bg-[#171513] border border-black/5 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group hover:border-[#B8945B]/40">
                  <div className="space-y-4">
                    {/* Number Badge & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-light text-[#B8945B]">
                        {s.step}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#B8945B]/10 text-[#B8945B] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#171513] dark:text-white group-hover:text-[#B8945B] transition-colors">
                      {s.title}
                    </h3>

                    {/* Lead */}
                    <div className="text-xs font-semibold text-[#171513] dark:text-white">
                      {s.lead}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-black/5 dark:border-white/10 text-[10px] font-mono uppercase tracking-widest text-[#B8945B]">
                    Phase {s.step} • Advisory
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
