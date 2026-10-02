'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LuxuryMenuOverlay from './LuxuryMenuOverlay';
import LuxuryTourModal from './LuxuryTourModal';

interface LuxuryHeaderProps {
  onOpenTourModal?: () => void;
}

export default function LuxuryHeader({ onOpenTourModal }: LuxuryHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenTour = () => {
    if (onOpenTourModal) {
      onOpenTourModal();
    } else {
      setIsTourModalOpen(true);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#171513]/90 backdrop-blur-md border-b border-white/10 py-3 sm:py-4 shadow-xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark with Gold Detail */}
          <Link href="/" className="flex items-center gap-2.5 group focus-visible:outline-gold">
            <span className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-white group-hover:text-[#B8945B] transition-colors">
              L2H Solution<span className="text-[#B8945B]">.</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.2em] text-white/60 font-light border-l border-white/20 pl-2.5">
              Private Advisory
            </span>
          </Link>

          {/* Center Navigation Links (02 All Properties, 03 Why L2H, 04 About Us) */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium text-white/90 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#B8945B]/60 backdrop-blur-md transition-all duration-300 group shadow-sm"
            >
              <span className="text-[10px] font-mono text-[#B8945B] font-semibold">02</span>
              <span className="group-hover:text-white transition-colors">All Properties</span>
            </Link>

            <Link
              href="/#why-l2h"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium text-white/90 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#B8945B]/60 backdrop-blur-md transition-all duration-300 group shadow-sm"
            >
              <span className="text-[10px] font-mono text-[#B8945B] font-semibold">03</span>
              <span className="group-hover:text-white transition-colors">Why L2H (Philosophy)</span>
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium text-white/90 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#B8945B]/60 backdrop-blur-md transition-all duration-300 group shadow-sm"
            >
              <span className="text-[10px] font-mono text-[#B8945B] font-semibold">04</span>
              <span className="group-hover:text-white transition-colors">About Us</span>
            </Link>
          </nav>

          {/* Action Group */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Book a Tour Button - Clean typography */}
            <button
              onClick={handleOpenTour}
              className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-[#B8945B] backdrop-blur-md text-xs font-medium uppercase tracking-widest transition-all duration-300 shadow-sm hover:text-[#B8945B] focus-visible:outline-gold"
            >
              <span>Book a Tour</span>
            </button>

            {/* Accessible 44x44px Minimal 2-Line Menu Trigger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#B8945B] backdrop-blur-md flex flex-col items-center justify-center gap-1.5 transition-all duration-300 group focus-visible:outline-gold"
            >
              <span className="w-5 h-[1.5px] bg-white group-hover:bg-[#B8945B] transition-all transform group-hover:translate-y-[-1px]" />
              <span className="w-3.5 h-[1.5px] bg-white group-hover:bg-[#B8945B] transition-all transform group-hover:translate-y-[1px] self-end mr-3" />
            </button>
          </div>
        </div>
      </header>

      {/* Expanded Full-Viewport Overlay Menu */}
      <LuxuryMenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenTourModal={handleOpenTour}
      />

      {/* Luxury Private Tour Modal */}
      <LuxuryTourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
      />
    </>
  );
}
