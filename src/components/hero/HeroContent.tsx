'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './hero.module.css';

interface HeroContentProps {
  eyebrowRef?: React.RefObject<HTMLDivElement>;
  headlineRef: React.RefObject<HTMLHeadingElement>;
  subheadRef: React.RefObject<HTMLParagraphElement>;
  ctaRef: React.RefObject<HTMLDivElement>;
  onExploreClick?: () => void;
  onOpenTourModal?: () => void;
}

export default function HeroContent({
  eyebrowRef,
  headlineRef,
  subheadRef,
  ctaRef
}: HeroContentProps) {
  return (
    <div className={styles.heroContent}>
      <div className="max-w-3xl space-y-6 sm:space-y-8">
        
        {/* Semantic Headline with Split Lines for Staggered GSAP Animation */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-white tracking-tight leading-[1.12]"
        >
          <span className="hero-headline-line block overflow-hidden">
            <span className="inline-block">Property Decisions</span>
          </span>
          <span className="hero-headline-line block overflow-hidden">
            <span className="inline-block italic text-[#E8E0D6] font-light">Made Around Your Goals.</span>
          </span>
        </h1>

        {/* Subheadline & Supporting message */}
        <div ref={subheadRef} className="space-y-3 max-w-2xl">
          <p className="text-base sm:text-xl text-white font-normal leading-relaxed">
            We don’t just sell properties. We understand why you want to buy — and help you explore the right property for your purpose, budget, and long-term goals.
          </p>
          <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
            From residential homes in Noida to plotted opportunities in spiritual, holiday and emerging growth destinations, L2H Solution helps you discover property opportunities with clarity and confidence.
          </p>
        </div>

        {/* CTA Button Group */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/properties"
            className="hero-cta-btn px-8 py-4 rounded-full bg-white hover:bg-[#F5F1EB] text-[#171513] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-2xl hover:translate-y-[-2px] flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-[#B8945B] focus-visible:outline-offset-2"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#B8945B]" />
          </Link>

          <a
            href="https://wa.me/918439654385?text=Hi%20L2H%20Solution%2C%20I%20would%20like%20to%20talk%20to%20a%20property%20advisor%20to%20understand%20relevant%20property%20opportunities."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-[#171513]/85 hover:bg-[#171513] text-white font-semibold text-xs uppercase tracking-widest border border-white/25 hover:border-[#B8945B] backdrop-blur-md transition-all duration-300 flex items-center gap-2 hover:translate-y-[-2px] focus-visible:outline-2 focus-visible:outline-[#B8945B] focus-visible:outline-offset-2"
          >
            <span>Talk to a Property Advisor</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B8945B]" />
          </a>
        </div>

      </div>
    </div>
  );
}
