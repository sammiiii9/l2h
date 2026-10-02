'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsapConfig';

export interface HeroTimelineRefs {
  headline: HTMLElement | null;
  subhead: HTMLElement | null;
  cta: HTMLElement | null;
  bg: HTMLElement | null;
  eyebrow?: HTMLElement | null;
}

export function useHeroTimeline(refs: HeroTimelineRefs, reduceMotion: boolean) {
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!refs.headline || !refs.subhead || !refs.cta || !refs.bg) return;

    const headlineLines = refs.headline.querySelectorAll('.hero-headline-line span');

    // Ensure all elements are in their crisp, initial resting positions at scroll = 0
    gsap.set(headlineLines, { opacity: 1, y: 0, clearProps: 'transform' });
    gsap.set(refs.subhead, { opacity: 1, y: 0, clearProps: 'transform' });
    gsap.set(refs.cta, { opacity: 1, scale: 1, y: 0, clearProps: 'transform' });
    if (refs.eyebrow) {
      gsap.set(refs.eyebrow, { opacity: 1, y: 0, clearProps: 'transform' });
    }
    gsap.set(refs.bg, { willChange: 'transform', scale: 1.0, yPercent: 0 });

    if (reduceMotion) {
      return;
    }

    // Master Scroll-Driven Timeline (Paused; strictly driven by scroll scrub progress 0% -> 100%)
    tl.current = gsap.timeline({ paused: true });

    // Progress 0.0 -> 1.0:
    // 1. Background zooms and pans with architectural depth
    tl.current.to(
      refs.bg,
      {
        yPercent: -10,
        scale: 1.2,
        ease: 'none',
        duration: 1.0
      },
      0
    );

    // 2. Eyebrow gently fades out in early scroll (0.0 -> 0.35)
    if (refs.eyebrow) {
      tl.current.to(
        refs.eyebrow,
        {
          y: -20,
          opacity: 0,
          ease: 'none',
          duration: 0.35
        },
        0.05
      );
    }

    // 3. Staggered headline lines glide upwards with parallax depth (0.15 -> 0.85)
    tl.current.to(
      headlineLines,
      {
        y: -35,
        opacity: 0.1,
        ease: 'none',
        duration: 0.7,
        stagger: 0.08
      },
      0.15
    );

    // 4. Subheadline glides upward (0.25 -> 0.9)
    tl.current.to(
      refs.subhead,
      {
        y: -25,
        opacity: 0.05,
        ease: 'none',
        duration: 0.65
      },
      0.25
    );

    // 5. CTA buttons fade and drift (0.35 -> 0.95)
    tl.current.to(
      refs.cta,
      {
        y: -20,
        opacity: 0,
        ease: 'none',
        duration: 0.6
      },
      0.35
    );

    // Clean up willChange after completion to preserve memory
    tl.current.eventCallback('onComplete', () => {
      if (refs.bg) gsap.set(refs.bg, { willChange: 'auto' });
    });

    return () => {
      tl.current?.kill();
    };
  }, [refs.headline, refs.subhead, refs.cta, refs.bg, refs.eyebrow, reduceMotion]);

  return tl;
}
