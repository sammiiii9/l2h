'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  ChevronDown, 
  Menu, 
  X, 
  Phone, 
  Sparkles, 
  Compass, 
  Home, 
  Trees, 
  Building,
  Scale,
  BookOpen,
  MapPin
} from 'lucide-react';
import LeadModal from '@/components/common/LeadModal';
import { useCompare } from '@/context/CompareContext';

export default function Navbar() {
  const pathname = usePathname();
  const { compareList } = useCompare();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertiesDropdownOpen, setPropertiesDropdownOpen] = useState(false);
  const [intelligenceDropdownOpen, setIntelligenceDropdownOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setPropertiesDropdownOpen(false);
    setIntelligenceDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3'
            : 'bg-black/80 backdrop-blur-md py-3.5 border-b border-white/10'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 min-h-[50px] sm:min-h-[54px]">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center shrink-0 group">
              <div className="bg-white px-3.5 py-1.5 rounded-xl shadow-sm border border-white/20 group-hover:bg-zinc-50 transition-all flex items-center">
                <img
                  src="/logo.png"
                  alt="L2H Solution — From Land to Legacy. Chosen Around You."
                  className="h-[34px] sm:h-[40px] w-auto object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links — Symmetrical Single-Line Layout */}
            <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
              {/* Properties Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setPropertiesDropdownOpen(true)}
                onMouseLeave={() => setPropertiesDropdownOpen(false)}
              >
                <Link
                  href="/properties"
                  className={`h-9 px-3 text-[13px] 2xl:text-sm font-medium rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
                    pathname.startsWith('/properties')
                      ? 'text-white font-semibold bg-white/10 border border-white/15'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Properties</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${propertiesDropdownOpen ? 'rotate-180 text-white' : 'text-zinc-400'}`} />
                </Link>

                {propertiesDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 bg-[#0c0c0e]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50 mt-1">
                    <Link
                      href="/properties"
                      className="flex items-center gap-3 p-2.5 rounded-xl text-zinc-200 hover:text-white hover:bg-white/5 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-zinc-900 group-hover:bg-white/10 text-white shrink-0">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">All Opportunities</div>
                        <div className="text-[10px] text-zinc-400">Explore complete NCR portfolio</div>
                      </div>
                    </Link>

                    <Link
                      href="/properties?category=Apartments"
                      className="flex items-center gap-3 p-2.5 rounded-xl text-zinc-200 hover:text-white hover:bg-white/5 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-zinc-900 group-hover:bg-white/10 text-white shrink-0">
                        <Home className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">Luxury Apartments</div>
                        <div className="text-[10px] text-zinc-400">Noida Expressway & Gurgaon</div>
                      </div>
                    </Link>

                    <Link
                      href="/properties?category=Villas"
                      className="flex items-center gap-3 p-2.5 rounded-xl text-zinc-200 hover:text-white hover:bg-white/5 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-zinc-900 group-hover:bg-white/10 text-white shrink-0">
                        <Building className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">Villas & Farmhouses</div>
                        <div className="text-[10px] text-zinc-400">Golf residences & country estates</div>
                      </div>
                    </Link>

                    <Link
                      href="/properties?category=Plots"
                      className="flex items-center gap-3 p-2.5 rounded-xl text-zinc-200 hover:text-white hover:bg-white/5 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-zinc-900 group-hover:bg-white/10 text-white shrink-0">
                        <Trees className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">Land & Plots</div>
                        <div className="text-[10px] text-zinc-400">Jewar Airport & Yamuna corridor</div>
                      </div>
                    </Link>

                    <Link
                      href="/properties?category=Commercial"
                      className="flex items-center gap-3 p-2.5 rounded-xl text-zinc-200 hover:text-white hover:bg-white/5 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-zinc-900 group-hover:bg-white/10 text-white shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">Commercial & Offices</div>
                        <div className="text-[10px] text-zinc-400">High-yield pre-leased assets</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Locations Hub */}
              <Link
                href="/locations"
                className={`h-9 px-3 text-[13px] 2xl:text-sm font-medium rounded-lg transition-colors flex items-center whitespace-nowrap ${
                  pathname.startsWith('/locations')
                    ? 'text-white font-semibold bg-white/10 border border-white/15'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Locations
              </Link>

              {/* Market Intelligence Reports */}
              <Link
                href="/market-reports"
                className={`h-9 px-3 text-[13px] 2xl:text-sm font-medium rounded-lg transition-colors flex items-center whitespace-nowrap ${
                  pathname.startsWith('/market-reports')
                    ? 'text-white font-semibold bg-white/10 border border-white/15'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Market Reports
              </Link>

              {/* Compare Button */}
              <Link
                href="/compare"
                className={`h-9 px-3 text-[13px] 2xl:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  pathname === '/compare'
                    ? 'text-white font-semibold bg-white/10 border border-white/15'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare</span>
                {compareList.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center ml-0.5">
                    {compareList.length}
                  </span>
                )}
              </Link>

              <Link
                href="/about"
                className={`h-9 px-3 text-[13px] 2xl:text-sm font-medium rounded-lg transition-colors flex items-center whitespace-nowrap ${
                  pathname === '/about'
                    ? 'text-white font-semibold bg-white/10 border border-white/15'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                About
              </Link>

              <Link
                href="/blog"
                className={`h-9 px-3 text-[13px] 2xl:text-sm font-medium rounded-lg transition-colors flex items-center whitespace-nowrap ${
                  pathname.startsWith('/blog')
                    ? 'text-white font-semibold bg-white/10 border border-white/15'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Insights
              </Link>

              <Link
                href="/contact"
                className={`h-9 px-3 text-[13px] 2xl:text-sm font-medium rounded-lg transition-colors flex items-center whitespace-nowrap ${
                  pathname === '/contact'
                    ? 'text-white font-semibold bg-white/10 border border-white/15'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Actions — Aligned and Sized Consistently */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <a
                href="tel:+919876543210"
                className="h-10 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-200 hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                <span className="tracking-wide whitespace-nowrap">+91 98765 43210</span>
              </a>

              <Link
                href="/find-property"
                className="h-10 px-4 rounded-xl border border-white/20 hover:border-white bg-white/5 hover:bg-white text-white hover:text-black transition-all duration-200 flex items-center gap-2 shadow-sm whitespace-nowrap group"
              >
                <Sparkles className="w-3.5 h-3.5 text-zinc-300 group-hover:text-black group-hover:rotate-12 transition-transform shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                  Find Match
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="h-10 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm whitespace-nowrap"
              >
                Book Advisory
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex xl:hidden items-center gap-2">
              <Link
                href="/find-property"
                className="h-9 px-3 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Match</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="h-9 w-9 flex items-center justify-center rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white focus:outline-none transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden fixed inset-x-0 top-[65px] bg-[#0c0c0e]/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-1 pb-4 border-b border-white/10">
              <Link
                href="/properties"
                className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-100 hover:text-white hover:bg-white/5"
              >
                Explore All Properties
              </Link>
              <Link
                href="/locations"
                className="block px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-white/5"
              >
                • Location Corridors Hub
              </Link>
              <Link
                href="/market-reports"
                className="block px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-white/5"
              >
                • Market Intelligence Reports
              </Link>
              <Link
                href="/compare"
                className="block px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-white/5 flex items-center justify-between"
              >
                <span>• Property Comparison Matrix</span>
                {compareList.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-white text-black text-[10px] font-bold">
                    {compareList.length}
                  </span>
                )}
              </Link>
            </div>

            <div className="space-y-1 pb-4 border-b border-white/10">
              <Link
                href="/about"
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white hover:bg-white/5"
              >
                About L2H Solution
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white hover:bg-white/5"
              >
                Real Estate Insights
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white hover:bg-white/5"
              >
                Contact &amp; Advisory Desk
              </Link>
              <Link
                href="/admin"
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5"
              >
                Admin CRM Portal
              </Link>
            </div>

            <div className="pt-2 space-y-3">
              <Link
                href="/find-property"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider"
              >
                <Sparkles className="w-4 h-4" />
                <span>Find Your Match</span>
              </Link>

              <a
                href="tel:+919876543210"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 text-zinc-200 font-semibold text-xs border border-white/10 hover:bg-white/10"
              >
                <Phone className="w-4 h-4 text-zinc-400" />
                <span>Call Advisory Desk (+91 98765 43210)</span>
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
