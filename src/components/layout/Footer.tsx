'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles,
  Trees,
  Home,
  Lock
} from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';
import ThemeToggle from '@/components/theme/ThemeToggle';

export default function Footer() {
  const whatsappLink = createWhatsAppUrl({
    customMessage: 'Hi L2H Solution, I would like to speak with a property advisor regarding real estate opportunities.'
  });

  return (
    <footer className="bg-white dark:bg-black text-neutral-700 dark:text-neutral-300 border-t border-neutral-200 dark:border-charcoal-700 relative z-10 transition-colors duration-200">
      {/* Top Advisory Banner */}
      <div className="border-b border-neutral-200 dark:border-charcoal-700 bg-neutral-50 dark:bg-charcoal-900/90">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-charcoal-800 border border-amber-200 dark:border-charcoal-700 text-amber-800 dark:text-accent text-xs font-semibold uppercase tracking-wider mb-1">
                <span>The L2H Advisory Standard</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink dark:text-white tracking-tight">
                From Land to Legacy. <span className="font-normal italic text-neutral-600 dark:text-white">Decide Better.</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-white font-normal max-w-xl">
                Independent fiduciary representation for buyers who want every property decision to stand up to scrutiny.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-accent hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-gold-glow"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Advisory</span>
              </a>

              <a
                href="tel:+918439654385"
                className="px-5 py-3 rounded-xl bg-white dark:bg-charcoal-800 hover:bg-neutral-100 dark:hover:bg-charcoal-700 border border-neutral-300 dark:border-charcoal-700 text-ink dark:text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-600 dark:text-accent" />
                <span>Call Advisory Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="bg-white px-2.5 py-1.5 rounded-xl shadow-sm border border-neutral-200 inline-flex items-center">
                <Image
                  src="/logo.png"
                  alt="L2H Solution"
                  width={120}
                  height={32}
                  className="h-[30px] w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-xs text-neutral-700 dark:text-white font-normal leading-relaxed max-w-sm">
              L2H Solution is an independent real estate advisory operating across Delhi NCR and high-growth corridors pan-India. We deliver verified research dossiers, title scrutiny, and zero-inventory-bias buyer representation.
            </p>

            <div className="space-y-2 text-xs text-neutral-700 dark:text-white pt-2 font-normal">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 dark:text-accent shrink-0 mt-0.5" />
                <span>Advant Navis Business Park, Sector 142, Noida Expressway, Delhi NCR - 201305</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-600 dark:text-accent shrink-0" />
                <a href="mailto:infol2h@gmail.com" className="text-neutral-800 dark:text-white font-medium hover:text-amber-700 dark:hover:text-accent transition-colors">
                  infol2h@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-600 dark:text-accent shrink-0" />
                <a href="tel:+918439654385" className="text-neutral-800 dark:text-white font-bold hover:text-amber-700 dark:hover:text-accent transition-colors">
                  +91 8439654385
                </a>
              </div>
            </div>
          </div>

          {/* Core Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink dark:text-white flex items-center gap-1.5">
              <span>Product Categories</span>
            </h4>
            <ul className="space-y-2 text-xs text-neutral-700 dark:text-white font-normal">
              <li>
                <Link href="/plots" className="hover:text-amber-700 dark:hover:text-accent hover:underline transition-colors flex items-center gap-1.5">
                  <Trees className="w-3.5 h-3.5 text-amber-600 dark:text-accent" />
                  <span>Plots &amp; Land (Pan-India)</span>
                </Link>
              </li>
              <li>
                <Link href="/residential" className="hover:text-amber-700 dark:hover:text-accent hover:underline transition-colors flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-300" />
                  <span>Residential Apartments</span>
                </Link>
              </li>
              <li>
                <Link href="/commercial" className="hover:text-amber-700 dark:hover:text-accent hover:underline transition-colors flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-600 dark:text-accent" />
                  <span>Commercial Investment</span>
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/properties" className="hover:text-amber-700 dark:hover:text-accent transition-colors text-[11px] text-amber-700 dark:text-accent font-bold">
                  → All Properties Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Corridors */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink dark:text-white">
              Corridor Focus
            </h4>
            <ul className="space-y-2 text-xs text-neutral-700 dark:text-white font-normal">
              <li>
                <Link href="/locations/yamuna-expressway" className="hover:text-amber-700 dark:hover:text-accent transition-colors">
                  Yamuna Expressway &amp; Jewar
                </Link>
              </li>
              <li>
                <Link href="/locations/sector-150-noida" className="hover:text-amber-700 dark:hover:text-accent transition-colors">
                  Sector 150 Green Sports City
                </Link>
              </li>
              <li>
                <Link href="/locations/golf-course-road-gurgaon" className="hover:text-amber-700 dark:hover:text-accent transition-colors">
                  Golf Course Road Gurugram
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-amber-700 dark:hover:text-accent transition-colors">
                  All Growth Corridors
                </Link>
              </li>
            </ul>
          </div>

          {/* Advisory & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink dark:text-white">
              Advisory &amp; Company
            </h4>
            <ul className="space-y-2 text-xs text-neutral-700 dark:text-white font-normal">
              <li>
                <Link href="/about" className="hover:text-amber-700 dark:hover:text-accent transition-colors">
                  About L2H &amp; 5-Step Method
                </Link>
              </li>
              <li>
                <Link href="/market-reports" className="hover:text-amber-700 dark:hover:text-accent transition-colors">
                  Market Intelligence Reports
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-amber-700 dark:hover:text-accent transition-colors">
                  Side-by-Side Comparison
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-700 dark:hover:text-accent transition-colors">
                  Contact Advisory Desk
                </Link>
              </li>
              <li className="pt-2">
                <Link 
                  href="/admin/login" 
                  className="inline-flex items-center gap-1.5 text-[11px] text-neutral-400/30 dark:text-neutral-600/30 hover:text-neutral-700 dark:hover:text-neutral-300 transition-all duration-300 select-none group py-0.5"
                  title="Advisor Console"
                >
                  <Lock className="w-2.5 h-2.5 opacity-30 group-hover:opacity-100 text-neutral-400 dark:text-neutral-500 group-hover:text-amber-700 dark:group-hover:text-accent transition-colors" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] tracking-wider uppercase font-semibold">
                    Portal Access
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Notice */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-charcoal-700 text-[11px] text-neutral-600 dark:text-white space-y-2 font-normal">
          <div className="flex items-center gap-2 text-ink dark:text-white font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-accent" />
            <span>RERA Compliance &amp; Independent Advisory Notice</span>
          </div>
          <p className="leading-relaxed">
            L2H Solution operates as an independent real estate advisory firm. Information, floor plans, RERA registration numbers, and pricing benchmarks are compiled directly from developer filings and public records. Buyers are encouraged to inspect official RERA certificates and conduct independent legal reviews before signing agreements.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-charcoal-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600 dark:text-white font-normal">
          <div>
            © {new Date().getFullYear()} L2H Solution. All rights reserved. &ldquo;From Land to Legacy.&rdquo;
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <Link href="/about" className="hover:text-black dark:hover:text-accent transition-colors">Code of Ethics</Link>
            <Link href="/privacy" className="hover:text-black dark:hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black dark:hover:text-accent transition-colors">Terms of Service</Link>
            
            <div className="pl-2 border-l border-neutral-200 dark:border-charcoal-600">
              <ThemeToggle variant="pill" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
