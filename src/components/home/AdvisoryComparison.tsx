import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';
import Link from 'next/link';

const COMPARISONS = [
  {
    parameter: 'Starting Point',
    traditional: 'Pushes whatever inventory has the highest broker commission',
    l2h: 'Starts with your exact lifestyle, capital parameters, and family goals'
  },
  {
    parameter: 'Project Shortlisting',
    traditional: 'Spams you with 40+ random links and unsolicited developer phone calls',
    l2h: 'Presents only 3–4 rigorously audited, high-conviction opportunities'
  },
  {
    parameter: 'Market Intelligence',
    traditional: 'Relies on developer sales pitch and unverifiable price appreciation claims',
    l2h: 'Independent data-backed analysis on rental yields, supply pipelines & RERA filings'
  },
  {
    parameter: 'Transaction Due Diligence',
    traditional: 'No legal review; pressures you to sign builder buyer agreement immediately',
    l2h: 'Thorough verification of RERA compliance, title deeds, and hidden payment clauses'
  },
  {
    parameter: 'Post-Transaction Relationship',
    traditional: 'Disappears the moment the broker commission is collected',
    l2h: 'End-to-end support through registry, snagging, leasing, and future exit strategy'
  }
];

export default function AdvisoryComparison() {
  return (
    <section className="py-24 bg-[#09090b] text-white border-y border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-zinc-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Advisory Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Why Discerning Clients Choose L2H
          </h2>
          <p className="text-zinc-400 text-xs sm:text-base leading-relaxed font-light">
            Real estate is likely your largest financial commitment. Here is why partnering with an independent advisory firm transforms your decision.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto bg-[#121214] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-black/60 border-b border-white/10 text-white p-6 sm:p-7">
            <div className="md:col-span-4 text-xs uppercase tracking-wider font-semibold text-zinc-400 self-center">
              Advisory Evaluation Factor
            </div>
            <div className="md:col-span-4 text-xs uppercase tracking-wider font-semibold text-zinc-400 self-center hidden md:block">
              Traditional Property Broker
            </div>
            <div className="md:col-span-4 text-xs uppercase tracking-wider font-bold text-white self-center hidden md:block">
              L2H Solution Advisory Standard
            </div>
          </div>

          {/* Body Rows */}
          <div className="divide-y divide-white/5">
            {COMPARISONS.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-6 sm:p-7 gap-4 md:gap-6 items-center hover:bg-white/[0.02] transition-colors">
                {/* Parameter */}
                <div className="md:col-span-4">
                  <div className="text-sm font-bold text-white font-serif">
                    {row.parameter}
                  </div>
                </div>

                {/* Traditional */}
                <div className="md:col-span-4 flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400 bg-red-950/20 md:bg-transparent p-3 md:p-0 rounded-xl">
                  <div className="w-5 h-5 rounded-full bg-red-950/80 text-red-400 flex items-center justify-center shrink-0 mt-0.5 border border-red-500/30">
                    <X className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="md:hidden font-bold text-zinc-300 block mb-0.5">Traditional Broker:</span>
                    <span>{row.traditional}</span>
                  </div>
                </div>

                {/* L2H */}
                <div className="md:col-span-4 flex items-start gap-2.5 text-xs sm:text-sm text-white font-medium bg-white/5 md:bg-transparent p-3 md:p-0 rounded-xl">
                  <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <span className="md:hidden font-bold text-white block mb-0.5">L2H Solution:</span>
                    <span>{row.l2h}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Footer */}
          <div className="p-6 bg-black/50 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <span className="text-xs text-zinc-400 font-light">
              Ready to experience fiduciary, non-transactional property advisory?
            </span>
            <Link
              href="/find-property"
              className="px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-md shrink-0"
            >
              Start Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
