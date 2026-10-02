'use client';

import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import styles from './hero.module.css';

export interface HeroBackgroundHandle {
  container: HTMLDivElement | null;
  video: HTMLVideoElement | null;
}

export interface HeroBackgroundProps {
  isMoving?: boolean;
}

const HeroBackground = forwardRef<HeroBackgroundHandle, HeroBackgroundProps>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useImperativeHandle(ref, () => ({
    container: containerRef.current,
    video: videoRef.current
  }));

  // Ensure video is paused on mount so it does NOT autoplay or loop autonomously.
  // Video playback is scrubbed purely by the user's scroll position.
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      const onLoaded = () => {
        video.pause();
        video.currentTime = 0;
      };
      video.addEventListener('loadedmetadata', onLoaded);
      return () => video.removeEventListener('loadedmetadata', onLoaded);
    }
  }, []);

  return (
    <div ref={containerRef} className={styles.heroBackground}>
      {/* Layer 1: Background Video / Image (Scroll-Scrubbed Parallax layer) */}
      <div className="absolute inset-[-10%] w-[120%] h-[120%]">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          className="w-full h-full object-cover filter brightness-[0.78] contrast-[1.05]"
        >
          <source src="https://storage.googleapis.com/webild/default/templates/marbella/hero/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Layer 2: Architectural Warm Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-[#171513]/55 to-black/40 pointer-events-none" />
      
      {/* Layer 3: Left Lateral Gradient for Typography Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#171513]/85 via-[#171513]/40 to-transparent pointer-events-none" />
    </div>
  );
});

HeroBackground.displayName = 'HeroBackground';

export default HeroBackground;
