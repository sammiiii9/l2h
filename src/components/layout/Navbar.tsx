'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Phone, 
  Sparkles, 
  Trees, 
  Home, 
  Building2, 
  MapPin, 
  Scale,
  Compass,
  Building,
  Info,
  Mail
} from 'lucide-react';
import LeadModal from '@/components/common/LeadModal';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { useCompare } from '@/context/CompareContext';

export default function Navbar() {
  const pathname = usePathname();
  const { compareList } = useCompare();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Properties', href: '/properties', icon: Building },
    { label: 'Sacred Destinations', href: '/sacred-destinations', icon: Sparkles },
    { label: 'Holiday Destinations', href: '/holiday-destinations', icon: Trees },
    { label: 'Industrial & Growth', href: '/industrial-growth', icon: Building2 },
    { label: 'Noida Residential', href: '/noida-residential', icon: Home },
    { label: 'Why L2H', href: '/#why-l2h', icon: Info },
    { label: 'About', href: '/about', icon: Info },
    { label: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md py-2.5 border-b border-neutral-200 dark:border-charcoal-700 shadow-md'
            : 'bg-white/90 dark:bg-black/90 backdrop-blur-md py-3.5 border-b border-neutral-200/80 dark:border-charcoal-800/80'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 min-h-[48px]">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="bg-white px-2.5 py-1.5 rounded-xl shadow-sm border border-neutral-200 flex items-center">
                <Image
                  src="/logo.png"
                  alt="L2H Solution — Luxury Real Estate Advisory"
                  width={120}
                  height={32}
                  className="h-[28px] sm:h-[32px] w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {navLinks.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`h-9 px-3 text-xs xl:text-[13px] font-medium rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? 'text-ink dark:text-white font-bold bg-neutral-100 dark:bg-charcoal-700 border border-neutral-300 dark:border-charcoal-600 shadow-sm'
                        : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-charcoal-800'
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Compare Quick Badge */}
              {mounted && compareList.length > 0 && (
                <Link
                  href="/compare"
                  className="h-9 px-3 text-xs font-semibold rounded-xl bg-neutral-100 dark:bg-charcoal-700 text-ink dark:text-white flex items-center gap-1.5 hover:bg-neutral-200 dark:hover:bg-charcoal-600 transition-colors ml-1 border border-neutral-300 dark:border-charcoal-600"
                  title="Compare Shortlist"
                >
                  <Scale className="w-3.5 h-3.5 text-amber-600 dark:text-accent" />
                  <span>Compare</span>
                  <span className="w-4 h-4 rounded-full bg-accent text-black text-[10px] font-bold flex items-center justify-center">
                    {compareList.length}
                  </span>
                </Link>
              )}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* Theme Toggle */}
              <ThemeToggle variant="icon" />

              <a
                href="tel:+918439654385"
                className="h-9 px-3 rounded-xl bg-neutral-100 dark:bg-charcoal-800 hover:bg-neutral-200 dark:hover:bg-charcoal-700 border border-neutral-300 dark:border-charcoal-700 text-xs font-bold text-ink dark:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-accent shrink-0" />
                <span>+91 8439654385</span>
              </a>

              {/* Gold Luxury Primary CTA */}
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="h-9 px-5 rounded-xl bg-accent hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-gold-glow hover:shadow-gold-glow-lg whitespace-nowrap flex items-center gap-1.5"
              >
                <span>Talk to an Advisor</span>
              </button>
            </div>

            {/* Mobile Header Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle variant="icon" />

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-neutral-100 dark:bg-charcoal-800 border border-neutral-300 dark:border-charcoal-700 text-ink dark:text-white hover:text-black transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 dark:border-charcoal-800 bg-white/98 dark:bg-black/98 backdrop-blur-xl px-4 pt-4 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`));
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-neutral-100 dark:bg-charcoal-800 text-amber-700 dark:text-accent font-bold'
                        : 'text-ink dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-charcoal-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-accent" />
                      <span>{link.label}</span>
                    </div>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                  </Link>
                );
              })}

              {compareList.length > 0 && (
                <Link
                  href="/compare"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between text-ink dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-charcoal-800"
                >
                  <div className="flex items-center gap-2.5">
                    <Scale className="w-4 h-4 text-accent" />
                    <span>Compare Shortlist</span>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-accent text-black text-xs font-bold flex items-center justify-center">
                    {compareList.length}
                  </span>
                </Link>
              )}
            </nav>

            <div className="pt-3 border-t border-neutral-200 dark:border-charcoal-800 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLeadModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider shadow-gold-glow transition-colors"
              >
                <span>Talk to an Advisor</span>
              </button>

              <a
                href="tel:+918439654385"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-100 dark:bg-charcoal-800 text-ink dark:text-white font-bold text-xs border border-neutral-300 dark:border-charcoal-700 hover:bg-neutral-200 dark:hover:bg-charcoal-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-accent" />
                <span>+91 8439654385</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Global Lead Requirement Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />
    </>
  );
}
