import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';

export default function Footer() {
  const whatsappLink = createWhatsAppUrl({
    customMessage: 'Hi L2H Solution, I would like to consult with a property advisor regarding Delhi NCR real estate.'
  });

  return (
    <footer className="bg-[#050507] text-zinc-400 border-t border-white/10 relative z-10">
      {/* Top Advisory Banner */}
      <div className="border-b border-white/10 bg-[#09090b]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The L2H Advisory Standard</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white">
                Looking for the Right Property Decision?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl font-light">
                We understand what you&apos;re looking for, analyze market fundamentals, and shortlist curated options before you commit capital.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <Link
                href="/find-property"
                className="flex-1 sm:flex-none text-center px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Tell Us Your Requirement
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>WhatsApp Advisory</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <div className="bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-white/20 group-hover:bg-zinc-50 transition-all inline-flex items-center">
                <img
                  src="/logo.png"
                  alt="L2H Solution — From Land to Legacy. Chosen Around You."
                  className="h-[38px] sm:h-[46px] w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm font-light">
              From land to luxury homes, L2H Solution helps you discover, evaluate and secure the right real-estate opportunity tailored to your lifestyle and financial goals.
            </p>

            <div className="pt-1 text-xs text-zinc-300 font-mono">
              Understand → Analyse → Shortlist → Deliver → Decide Better
            </div>

            <div className="pt-3 space-y-2 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" />
                <span>Corporate Office: Tower B, Advant Navis Business Park, Sector 142, Noida Expressway, Delhi NCR, India - 201305</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-zinc-300 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210 / +91 98112 34567</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-zinc-300 shrink-0" />
                <a href="mailto:advisory@l2hsolution.com" className="hover:text-white transition-colors">advisory@l2hsolution.com</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Property Categories
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/properties?category=Apartments" className="hover:text-white transition-colors">
                  Luxury Apartments
                </Link>
              </li>
              <li>
                <Link href="/properties?category=Villas" className="hover:text-white transition-colors">
                  Villas &amp; Farmhouses
                </Link>
              </li>
              <li>
                <Link href="/properties?category=Plots" className="hover:text-white transition-colors">
                  Freehold Land &amp; Plots
                </Link>
              </li>
              <li>
                <Link href="/properties?category=Commercial" className="hover:text-white transition-colors">
                  Grade-A Commercial Offices
                </Link>
              </li>
              <li>
                <Link href="/properties?category=Commercial" className="hover:text-white transition-colors">
                  High-Street Retail Spaces
                </Link>
              </li>
              <li>
                <Link href="/properties?possession=Ready+to+Move" className="hover:text-white transition-colors">
                  Ready to Move Homes
                </Link>
              </li>
              <li>
                <Link href="/properties?possession=New+Launch" className="hover:text-white transition-colors">
                  New Flagship Launches
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Corridors */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Location Hubs
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/locations/noida-expressway-sector-150" className="hover:text-white transition-colors">
                  Noida Expressway &amp; Sector 150
                </Link>
              </li>
              <li>
                <Link href="/locations/gurugram-golf-course-road-dlf5" className="hover:text-white transition-colors">
                  Golf Course Road &amp; Ext., Gurgaon
                </Link>
              </li>
              <li>
                <Link href="/locations/yamuna-expressway-jewar-corridor" className="hover:text-white transition-colors">
                  Yamuna Expressway &amp; Jewar Airport
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-white font-semibold hover:underline flex items-center gap-1">
                  <span>View All Corridors</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Advisory &amp; Intelligence
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/market-reports" className="text-white font-semibold hover:underline flex items-center gap-1">
                  <span>Market Intelligence Reports</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white transition-colors">
                  Side-by-Side Comparison
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our 5-Step Methodology
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Real Estate Insights &amp; Briefs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Book a Private Site Visit
                </Link>
              </li>
              <li>
                <Link href="/find-property" className="hover:text-white transition-colors">
                  Requirement Analyzer
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-zinc-500 hover:text-white transition-colors">
                  Advisor / Admin CRM
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & RERA Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/10 text-xs text-zinc-500 space-y-3 font-light">
          <div className="flex items-center gap-2 text-zinc-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>RERA Compliance &amp; Advisory Transparency Pledge</span>
          </div>
          <p className="leading-relaxed">
            Disclaimer: L2H Solution is an authorized real estate consulting and advisory enterprise. All property data, project floor plans, RERA registration identifiers, pricing estimates, and developer representations displayed on this platform are for informational and advisory discovery purposes. While we exercise rigorous due diligence, prospective buyers are strongly encouraged to inspect official RERA certificates and undertake independent title verification prior to executing booking transactions.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-light">
          <div>
            © {new Date().getFullYear()} L2H Solution. All rights reserved. &ldquo;From Land to Home. The Right Decision Starts Here.&rdquo;
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-zinc-300 transition-colors">Code of Ethics</Link>
            <Link href="/contact" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
            <Link href="/admin" className="text-zinc-400 hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
