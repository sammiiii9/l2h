'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';

export interface UseScrollLockParams {
  heroEl: HTMLElement | null;
  tl: gsap.core.Timeline | null;
  videoEl: HTMLVideoElement | null;
  reduceMotion: boolean;
}

export function useScrollLock({
  heroEl,
  tl,
  videoEl,
  reduceMotion
}: UseScrollLockParams) {
  useEffect(() => {
    if (!heroEl || reduceMotion || typeof window === 'undefined') return;

    // Direct 1:1 instantaneous scrub (`scrub: true`).
    // `scrub: true` guarantees:
    // - Animation moves only when user scrolls
    // - If user stops scrolling, animation immediately stops at that exact frame
    // - If user scrolls backward, animation reverses strictly with scroll position
    // - NO auto-play, NO momentum continuation, NO timers, NO scroll hijacking.
    let rafId: number | null = null;

    const st = ScrollTrigger.create({
      trigger: heroEl,
      start: 'top top',
      end: '+=1400', // 1400px provides a smooth, luxurious cinematic scroll timeline
      pin: true,
      pinSpacing: true, // Guarantees surrounding page does not jump
      scrub: true, // Instantaneous 1:1 scroll lock
      anticipatePin: 1,
      animation: tl || undefined,
      onUpdate: (self) => {
        // Frame-accurate video timeline scrubbing with rAF batching to eliminate decoder stalls
        if (videoEl && !isNaN(videoEl.duration) && videoEl.duration > 0) {
          if (rafId !== null) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            const targetTime = self.progress * videoEl.duration;
            if (Math.abs(videoEl.currentTime - targetTime) > 0.03 && !videoEl.seeking) {
              videoEl.currentTime = targetTime;
            }
          });
        }
      }
    });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      st.kill();
    };
  }, [heroEl, tl, videoEl, reduceMotion]);
}
