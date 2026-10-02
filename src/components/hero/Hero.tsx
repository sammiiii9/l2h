'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useHeroTimeline } from './useHeroTimeline';
import { useScrollLock } from './useScrollLock';
import HeroBackground, { HeroBackgroundHandle } from './HeroBackground';
import HeroContent from './HeroContent';
import ReplayControl from './ReplayControl';
import styles from './hero.module.css';

export interface HeroProps {
  onOpenTourModal: () => void;
  nextSectionSelector?: string;
}

export default function Hero({
  onOpenTourModal,
  nextSectionSelector = '#about'
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgHandleRef = useRef<HeroBackgroundHandle>(null);

  const [reduceMotion, setReduceMotion] = useState(false);

  // Detect prefers-reduced-motion media query
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Initialize master GSAP timeline (paused, scrubbed purely by scroll)
  const tl = useHeroTimeline(
    {
      eyebrow: eyebrowRef.current,
      headline: headlineRef.current,
      subhead: subheadRef.current,
      cta: ctaRef.current,
      bg: bgHandleRef.current?.container || null
    },
    reduceMotion
  );

  // Initialize ScrollTrigger pin & instantaneous 1:1 scroll scrubbing
  useScrollLock({
    heroEl: heroRef.current,
    tl: tl.current,
    videoEl: bgHandleRef.current?.video || null,
    reduceMotion
  });

  // Click on "Explore Curated Dossiers": scrolls smoothly to next section
  const handleExploreClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      const target = document.querySelector(nextSectionSelector);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [nextSectionSelector]);

  // Replay control: smoothly scrolls window back to top (progress 0)
  const handleReplay = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      role="region"
      aria-label="Luxury Real Estate Architectural Introduction"
    >
      {/* Scroll-Scrubbed Parallax & Video Background */}
      <HeroBackground ref={bgHandleRef} />

      {/* Central Headline, Subhead & Action CTAs (Vertically Centered with optimal navbar clearance) */}
      <HeroContent
        eyebrowRef={eyebrowRef}
        headlineRef={headlineRef}
        subheadRef={subheadRef}
        ctaRef={ctaRef}
        onExploreClick={handleExploreClick}
        onOpenTourModal={onOpenTourModal}
      />

      {/* Replay to top control */}
      <ReplayControl onReplay={handleReplay} />
    </section>
  );
}
