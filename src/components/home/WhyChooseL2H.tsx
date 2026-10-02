'use client';

import React from 'react';
import { UserCheck, Target, MessageSquare, HeartHandshake } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

const TRUST_POINTS = [
  {
    icon: UserCheck,
    title: 'Client-First Approach',
    description: 'We start by understanding your requirement, budget, family parameters, and time horizon before suggesting any property.'
  },
  {
    icon: Target,
    title: 'Purpose-Based Recommendations',
    description: 'We organize opportunities strictly around the reason you’re buying — whether for home living, sacred retreats, or capital growth.'
  },
  {
    icon: MessageSquare,
    title: 'Clear Communication',
    description: 'We aim to explain property opportunities clearly and transparently, highlighting what fits and what to consider.'
  },
  {
    icon: HeartHandshake,
    title: 'Long-Term Relationship',
    description: 'Our support doesn’t stop at the transaction. We remain connected and available throughout your property journey.'
  }
];

export default function WhyChooseL2H() {
  return (
    <section id="why-choose-l2h" className="py-24 sm:py-32 bg-[#F5F1EB] dark:bg-[#0E0D0C] text-[#171513] dark:text-[#F5F1EB] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up" delay={100} className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171513]/5 dark:bg-white/10 border border-[#171513]/10 dark:border-white/15 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8945B]">
            <span>The Trust Standard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#171513] dark:text-white tracking-tight leading-[1.15]">
            Why People Choose L2H Solution
          </h2>
          <p className="text-sm sm:text-base text-[#171513]/75 dark:text-white/75 font-light leading-relaxed max-w-2xl mx-auto">
            A property advisory built on integrity, purpose-driven alignment, and long-term client stewardship.
          </p>
        </ScrollReveal>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_POINTS.map((item, idx) => {
            const Icon = item.icon;

            return (
              <ScrollReveal
                key={item.title}
                variant="fade-up"
                delay={100 + idx * 80}
                className="h-full"
              >
                <div className="p-8 rounded-2xl bg-white dark:bg-[#171513] border border-black/5 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 h-full flex flex-col justify-between group hover:border-[#B8945B]/40">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#B8945B]/10 text-[#B8945B] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-serif font-normal text-[#171513] dark:text-white group-hover:text-[#B8945B] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 dark:border-white/10 text-[10px] font-mono text-[#B8945B] uppercase tracking-widest">
                    L2H Standard
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
