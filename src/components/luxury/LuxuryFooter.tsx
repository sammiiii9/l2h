'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Sparkles, ShieldCheck, Lock } from 'lucide-react';
import ThemeToggle from '@/components/theme/ThemeToggle';

export default function LuxuryFooter() {
  return (
    <footer className="bg-[#F5F1EB] dark:bg-[#0E0D0C] text-[#171513] dark:text-[#F5F1EB] border-t border-black/10 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        
        {/* Main 4-Column Taxonomy Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Brand & Wordmark Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-2xl font-normal tracking-tight text-[#171513] dark:text-white group-hover:text-[#B8945B] transition-colors">
                L2H Solution<span className="text-[#B8945B]">.</span>
              </span>
            </Link>

            <p className="text-sm font-serif italic text-[#171513] dark:text-white font-normal leading-relaxed">
              Property decisions made around your goals.
            </p>

            <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light leading-relaxed max-w-sm">
              We understand your requirement, budget, purpose, and long-term goals before suggesting any property. Understand the person first. Recommend the property second.
            </p>

            <div className="space-y-2 text-xs text-[#171513]/70 dark:text-white/70 font-light pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B8945B] shrink-0 mt-0.5" />
                <span>Advant Navis Business Park, Sector 142, Noida Expressway, UP</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B8945B] shrink-0" />
                <a href="mailto:infol2h@gmail.com" className="hover:text-[#B8945B] transition-colors font-medium">
                  infol2h@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B8945B] shrink-0" />
                <a href="tel:+918439654385" className="hover:text-[#B8945B] transition-colors font-medium">
                  +91 8439654385
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: Property Categories */}
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B8945B] block">
              Property Categories
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#171513]/80 dark:text-white/80 font-light">
              <li>
                <Link href="/sacred-destinations" className="hover:text-[#B8945B] transition-colors">
                  Sacred Destinations (Shakumbhari Devi)
                </Link>
              </li>
              <li>
                <Link href="/holiday-destinations" className="hover:text-[#B8945B] transition-colors">
                  Holiday Destinations (Goa Plots)
                </Link>
              </li>
              <li>
                <Link href="/industrial-growth" className="hover:text-[#B8945B] transition-colors">
                  Industrial &amp; Growth (Dholera SIR)
                </Link>
              </li>
              <li>
                <Link href="/noida-residential" className="hover:text-[#B8945B] transition-colors">
                  Noida Residential Properties
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-[#B8945B] transition-colors font-medium text-[#B8945B]">
                  → Explore All Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Advisory & Company */}
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B8945B] block">
              Company &amp; Approach
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#171513]/80 dark:text-white/80 font-light">
              <li>
                <Link href="/" className="hover:text-[#B8945B] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#B8945B] transition-colors">
                  About L2H Solution
                </Link>
              </li>
              <li>
                <Link href="/find-property" className="hover:text-[#B8945B] transition-colors">
                  Find Your Property Match
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#B8945B] transition-colors">
                  Contact Advisory Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Trust */}
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B8945B] block">
              Transparency
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#171513]/80 dark:text-white/80 font-light">
              <li>
                <Link href="/privacy" className="hover:text-[#B8945B] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#B8945B] transition-colors">
                  Terms of Engagement
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/918439654385"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium hover:underline text-xs"
                >
                  <span>WhatsApp +91 8439654385</span>
                </a>
              </li>
              <li className="pt-1">
                <Link 
                  href="/admin/login" 
                  className="inline-flex items-center gap-1.5 text-[11px] text-neutral-400/40 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                >
                  <Lock className="w-2.5 h-2.5" />
                  <span>Advisor Portal</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory Disclosures & Advisory Notice */}
        <div className="pt-8 border-t border-black/5 dark:border-white/10 text-[11px] text-[#171513]/60 dark:text-white/60 font-light space-y-2">
          <div className="flex items-center gap-2 text-[#171513] dark:text-white font-medium">
            <ShieldCheck className="w-4 h-4 text-[#B8945B]" />
            <span>Buyer-Side Representation &amp; Due Diligence Notice</span>
          </div>
          <p className="leading-relaxed">
            L2H Solution operates as an independent buyer-side property advisory firm. Floor plans, RERA filings, and pricing intelligence are sourced directly from developer submissions and official sub-registrar registry records for comparative analysis. All acquisitions are subjected to independent legal due diligence prior to contract execution.
          </p>
        </div>

        {/* Bottom Copyright & Theme Toggle Row */}
        <div className="pt-8 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#171513]/60 dark:text-white/60 font-light">
          <div>
            © {new Date().getFullYear()} L2H Solution Advisory LLP. All rights reserved. &ldquo;From Land to Legacy. Decide Better.&rdquo;
          </div>

          <div className="flex items-center gap-6">
            <span>Delhi NCR &amp; Prime Growth Corridors</span>
            <div className="pl-4 border-l border-black/10 dark:border-white/15">
              <ThemeToggle variant="pill" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
