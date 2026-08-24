import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | L2H Solution Real Estate Advisory',
  description: 'Our commitment to data protection, client confidentiality, and fiduciary privacy standards.',
};

export default function PrivacyPolicyPage() {
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Fiduciary Data Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">
            Privacy &amp; Data Protection Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light">
            Last Updated: August 2026 • L2H Solution Advisory LLP
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-slate-soft space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-light">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
              1. Fiduciary Commitment to Privacy
            </h2>
            <p>
              At L2H Solution, client confidentiality is fundamental to our advisory practice. We collect and process personal and financial requirement data solely for providing bespoke real estate due diligence, title scrutiny, site visits, and fiduciary advisory representation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
              2. Information We Collect
            </h2>
            <p>We may collect personal details when you engage with our advisory desk:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li>Contact Identifiers: Name, verified phone number, email address, and city of residence.</li>
              <li>Property Parameters: Preferred categories (Plots, Residential, Commercial), budget thresholds, and intended timelines.</li>
              <li>Advisory Records: Site visit scheduling notes, title due diligence requirements, and verified requirement match parameters.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
              3. Zero Data Brokerage Policy
            </h2>
            <p>
              We do not sell, rent, or trade your contact information to third-party telemarketers or unauthorized property listing networks. Your details are shared exclusively with verified project developers or legal counsel only with your explicit prior consent for agreement execution.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
              4. Data Security &amp; Retention
            </h2>
            <p>
              All advisory data and client requirement records are stored securely using encrypted cloud storage protocols. We retain your information only as long as necessary to facilitate your property search and post-handover advisory services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
              5. Contact Our Data Compliance Officer
            </h2>
            <p>
              If you have any questions regarding your data privacy or wish to request data deletion, contact our privacy desk at <a href="mailto:privacy@l2hsolution.com" className="text-teal-600 dark:text-teal-400 underline font-medium">privacy@l2hsolution.com</a> or write to our executive office: Advant Navis Business Park, Sector 142, Noida Expressway, Delhi NCR - 201305.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
