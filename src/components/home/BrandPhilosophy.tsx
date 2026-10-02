'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, HeartHandshake, Compass, Users, Clock, ShieldCheck, Scale } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

export default function BrandPhilosophy() {
  return (
    <section id="why-l2h" className="py-24 sm:py-32 bg-[#F5F1EB] dark:bg-[#0E0D0C] text-[#171513] dark:text-[#F5F1EB] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Editorial Statement Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal variant="fade-up" delay={100} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171513]/5 dark:bg-white/10 border border-[#171513]/10 dark:border-white/15 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8945B]">
                <HeartHandshake className="w-3.5 h-3.5 text-[#B8945B]" />
                <span>Our Core Brand Philosophy</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#171513] dark:text-white tracking-tight leading-[1.12]">
                We Don’t Sell Properties. <br />
                <span className="italic font-light text-[#9A8570] dark:text-[#CBBBA8]">We Serve People.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={200} className="space-y-6 text-sm sm:text-base text-[#171513]/85 dark:text-white/85 font-light leading-relaxed max-w-2xl">
              <p className="text-base sm:text-lg font-normal text-[#171513] dark:text-white">
                Property decisions are personal.
              </p>
              <p>
                That&apos;s why we don&apos;t believe in showing every client the same property. We first understand your requirement, budget, purpose, preferred location, property type, time horizon, and long-term goals. Then we help you explore opportunities that align with what you&apos;re actually looking for.
              </p>
              <p>
                And our relationship doesn&apos;t end after the deal. We stay connected and support our clients throughout their property journey.
              </p>
            </ScrollReveal>

            {/* Core Philosophy Punchline Highlight Box */}
            <ScrollReveal variant="fade-up" delay={300}>
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#171513] border border-[#B8945B]/30 shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#B8945B]" />
                <div className="space-y-1.5 pl-2">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B8945B]">
                    Guiding Principle
                  </div>
                  <div className="text-xl sm:text-2xl font-serif font-normal text-[#171513] dark:text-white">
                    Understand the person first. Recommend the property second.
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal variant="fade-up" delay={350} className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/about"
                className="px-6 py-3.5 rounded-full bg-[#171513] dark:bg-white text-white dark:text-[#171513] hover:bg-[#B8945B] dark:hover:bg-[#B8945B] dark:hover:text-white transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
              >
                <span>About Our Approach</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="https://wa.me/918439654385?text=Hi%20L2H%20Solution%2C%20I%20would%20like%20to%20discuss%20my%20property%20requirements%20with%20an%20advisor."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-[#171513] dark:text-white border border-black/15 dark:border-white/20 transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
              >
                <span>Talk to an Advisor</span>
              </a>
            </ScrollReveal>

          </div>

          {/* Right Visual Image & Factor Cards */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal variant="scale-up" delay={250}>
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 bg-[#26211D]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85"
                  alt="L2H Solution Brand Philosophy"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                {/* Floating Factors Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
                  <div className="text-[10px] uppercase tracking-widest text-[#B8945B] font-semibold">
                    What We Understand First
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-white/90">
                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8945B]" />
                      <span>Requirement &amp; Purpose</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8945B]" />
                      <span>Budget &amp; Ticket Size</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8945B]" />
                      <span>Location &amp; Type</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8945B]" />
                      <span>Long-Term Goals</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
