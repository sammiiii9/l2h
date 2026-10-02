'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, HeartHandshake, Users, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

export default function AboutL2HPreview() {
  return (
    <section id="about-l2h" className="py-24 sm:py-32 bg-[#FAF7F2] dark:bg-[#12100E] border-t border-black/5 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Media Image */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="scale-up" delay={150}>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 bg-[#26211D]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85"
                  alt="A Property Company Built Around People — L2H Solution"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[#B8945B] font-mono text-[10px] uppercase tracking-widest block font-semibold">
                    Client Relationship First
                  </span>
                  <p className="text-xs text-white/90 font-light leading-relaxed">
                    &ldquo;Our relationship does not end after the transaction. We stay connected throughout your property journey.&rdquo;
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal variant="fade-up" delay={100} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171513]/5 dark:bg-white/10 border border-[#171513]/10 dark:border-white/15 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8945B]">
                <Users className="w-3.5 h-3.5 text-[#B8945B]" />
                <span>About L2H Solution</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#171513] dark:text-white tracking-tight leading-[1.12]">
                A Property Company <br />
                <span className="italic font-light text-[#9A8570] dark:text-[#CBBBA8]">Built Around People.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={200} className="space-y-5 text-sm sm:text-base text-[#171513]/85 dark:text-white/85 font-light leading-relaxed max-w-2xl">
              <p className="text-base sm:text-lg font-normal text-[#171513] dark:text-white">
                L2H Solution was built around a simple belief: property is not just about square yards, buildings or transactions. It is about people&apos;s plans, aspirations, security and future.
              </p>
              <p>
                Our approach begins with understanding the client.
              </p>
              <p>
                Whether someone is searching for a home in Noida, a plot near a spiritual destination, a holiday property or an opportunity in an emerging growth corridor, we aim to understand the purpose behind the purchase before suggesting a property.
              </p>
              <p className="font-medium text-[#171513] dark:text-white pt-1">
                Our goal is to build relationships that continue beyond the transaction.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={300} className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/about"
                className="px-7 py-3.5 rounded-full bg-[#171513] dark:bg-white text-white dark:text-[#171513] hover:bg-[#B8945B] dark:hover:bg-[#B8945B] dark:hover:text-white transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-md"
              >
                <span>Read Full About Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-[#171513] dark:text-white border border-black/15 dark:border-white/20 transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
              >
                <span>Get in Touch</span>
              </Link>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
}
