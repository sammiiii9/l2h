'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ArrowUpRight, MapPin, Phone, Mail, Building, Trees, Home, Building2, FileText, Scale } from 'lucide-react';

interface LuxuryMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTourModal: () => void;
}

export default function LuxuryMenuOverlay({
  isOpen,
  onClose,
  onOpenTourModal
}: LuxuryMenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Lock background scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    // Focus first element
    setTimeout(() => {
      firstFocusableRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation Menu"
      className="fixed inset-0 z-[90] bg-[#171513] text-[#F5F1EB] flex flex-col justify-between overflow-y-auto animate-fadeIn transition-opacity duration-300"
    >
      {/* Top Header Row inside Overlay */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link href="/" onClick={onClose} className="flex items-center gap-2 group">
          <span className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-white group-hover:text-[#B8945B] transition-colors">
            L2H Solution<span className="text-[#B8945B]">.</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] tracking-[0.25em] uppercase text-white/50 border-l border-white/20 pl-2">
            Private Advisory
          </span>
        </Link>

        {/* Action Group */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenTourModal();
            }}
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full border border-white/20 hover:border-[#B8945B] text-xs uppercase tracking-widest text-white hover:text-[#B8945B] transition-colors"
          >
            <span>Book a Tour</span>
          </button>

          {/* Close Button - min 44x44px target */}
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            aria-label="Close navigation menu"
            className="w-11 h-11 rounded-full border border-white/20 hover:border-[#B8945B] bg-white/5 hover:bg-white/10 flex items-center justify-center text-white hover:text-[#B8945B] transition-all duration-200 focus-visible:outline-gold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Editorial Menu Body */}
      <div className="flex-1 flex flex-col justify-center max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left / Primary Oversized Links (3 core destinations + all properties) */}
          <nav className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="text-[11px] uppercase tracking-[0.25em] text-[#B8945B] font-medium pb-2">
              Navigation Index
            </div>

            <ul className="space-y-3 sm:space-y-4 font-serif">
              <li>
                <Link
                  href="/"
                  onClick={onClose}
                  className="group inline-flex items-center gap-4 text-2xl sm:text-4xl md:text-5xl font-normal text-white hover:text-[#B8945B] transition-all duration-300"
                >
                  <span className="text-white/30 text-lg sm:text-xl font-sans group-hover:text-[#B8945B]/60 transition-colors">01</span>
                  <span>Home</span>
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#B8945B]" />
                </Link>
              </li>

              <li>
                <Link
                  href="/properties"
                  onClick={onClose}
                  className="group inline-flex items-center gap-4 text-2xl sm:text-4xl md:text-5xl font-normal text-white hover:text-[#B8945B] transition-all duration-300"
                >
                  <span className="text-white/30 text-lg sm:text-xl font-sans group-hover:text-[#B8945B]/60 transition-colors">02</span>
                  <span>All Properties</span>
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#B8945B]" />
                </Link>
              </li>

              <li>
                <Link
                  href="/#why-l2h"
                  onClick={onClose}
                  className="group inline-flex items-center gap-4 text-2xl sm:text-4xl md:text-5xl font-normal text-white hover:text-[#B8945B] transition-all duration-300"
                >
                  <span className="text-white/30 text-lg sm:text-xl font-sans group-hover:text-[#B8945B]/60 transition-colors">03</span>
                  <span>Why L2H (Philosophy)</span>
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#B8945B]" />
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  onClick={onClose}
                  className="group inline-flex items-center gap-4 text-2xl sm:text-4xl md:text-5xl font-normal text-white hover:text-[#B8945B] transition-all duration-300"
                >
                  <span className="text-white/30 text-lg sm:text-xl font-sans group-hover:text-[#B8945B]/60 transition-colors">04</span>
                  <span>About Us</span>
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#B8945B]" />
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="group inline-flex items-center gap-4 text-2xl sm:text-4xl md:text-5xl font-normal text-white hover:text-[#B8945B] transition-all duration-300"
                >
                  <span className="text-white/30 text-lg sm:text-xl font-sans group-hover:text-[#B8945B]/60 transition-colors">05</span>
                  <span>Contact Advisor</span>
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#B8945B]" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right: Structured Secondary Navigation Taxonomy */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-12">
            
            {/* Category Pillars */}
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#B8945B] font-semibold block">
                Primary Categories
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/80 font-normal">
                <li>
                  <Link href="/sacred-destinations" onClick={onClose} className="hover:text-[#B8945B] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8945B] group-hover:scale-125 transition-transform" />
                    <span>Sacred Destinations (Shakumbhari Devi)</span>
                  </Link>
                </li>
                <li>
                  <Link href="/holiday-destinations" onClick={onClose} className="hover:text-[#B8945B] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8945B] group-hover:scale-125 transition-transform" />
                    <span>Holiday Destinations (Goa Plots)</span>
                  </Link>
                </li>
                <li>
                  <Link href="/industrial-growth" onClick={onClose} className="hover:text-[#B8945B] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8945B] group-hover:scale-125 transition-transform" />
                    <span>Industrial &amp; Growth (Dholera SIR)</span>
                  </Link>
                </li>
                <li>
                  <Link href="/noida-residential" onClick={onClose} className="hover:text-[#B8945B] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8945B] group-hover:scale-125 transition-transform" />
                    <span>Noida Residential Properties</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Advisory Tools */}
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#B8945B] font-semibold block">
                Advisory Tools
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/80 font-normal">
                <li>
                  <Link href="/find-property" onClick={onClose} className="hover:text-[#B8945B] transition-colors flex items-center gap-2 font-medium text-[#B8945B]">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Find Your Property Match</span>
                  </Link>
                </li>
                <li>
                  <Link href="/compare" onClick={onClose} className="hover:text-[#B8945B] transition-colors flex items-center gap-2">
                    <Scale className="w-3.5 h-3.5 text-[#B8945B]" />
                    <span>Compare Shortlist</span>
                  </Link>
                </li>
                <li>
                  <Link href="/market-reports" onClick={onClose} className="hover:text-[#B8945B] transition-colors flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#B8945B]" />
                    <span>Market Intelligence</span>
                  </Link>
                </li>
                <li>
                  <a href="https://wa.me/918439654385" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8945B] transition-colors flex items-center gap-2 text-emerald-400 font-medium">
                    <span>WhatsApp: +91 8439654385</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer inside Overlay */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 font-light">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#B8945B]" />
            <span>Advant Navis, Sector 142 Noida Expressway</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#B8945B]" />
            <a href="tel:+918439654385" className="hover:text-white transition-colors">+91 8439654385</a>
          </div>
        </div>

        <div className="flex items-center gap-4 text-white/50 text-[11px]">
          <span>© {new Date().getFullYear()} L2H Solution Advisory</span>
          <span>•</span>
          <span>From Land to Legacy</span>
        </div>
      </div>
    </div>
  );
}
