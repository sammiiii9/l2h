import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | L2H Solution Real Estate Advisory',
  description: 'Advisory engagement terms, RERA compliance guidelines, and fiduciary representation conditions.',
};

export default function TermsPage() {
  return (
    <div className="bg-neutral dark:bg-slate-950 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="space-y-3 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Advisory Agreement Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">
            Terms of Service &amp; Engagement
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light">
            Last Updated: August 2026 • L2H Solution Advisory LLP
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-slate-soft space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-light">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
              1. Nature of Advisory Services
            </h2>
            <p>
              L2H Solution operates as an independent real estate consultancy and buyer-side advisory practice. We provide curated opportunity dossiers, RERA document reviews, floor-plan efficiency audits, and escorted site inspections. We do not act as the developer or property builder.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
              2. Accuracy of Developer Information &amp; RERA Disclosures
            </h2>
            <p>
              While our advisory team cross-checks project specifications against registered RERA filings and developer sanction orders, final architectural configurations, unit sizes, and possession timelines are subject to builder-buyer agreements. Clients are advised to review official title deeds and sanctioned layout plans prior to financial commitment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
              3. Fiduciary Representation
            </h2>
            <p>
              Our strategists advise buyers with fiduciary responsibility. Any commercial projections, rental yields, or capital appreciation analyses presented are research models based on historical micro-market registry benchmarks and do not constitute guaranteed financial returns.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
              4. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These engagement terms and all advisory interactions are governed by the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the competent courts in Gautam Buddha Nagar (Noida), Uttar Pradesh.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
