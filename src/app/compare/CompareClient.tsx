'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  X, 
  Plus, 
  ArrowRight,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { formatPrice, formatIndianNumber } from '@/lib/utils';
import LeadModal from '@/components/common/LeadModal';

export default function CompareClient() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const [selectedPropertyForLead, setSelectedPropertyForLead] = useState<any>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const handleInquire = (prop: any) => {
    setSelectedPropertyForLead(prop);
    setIsLeadModalOpen(true);
  };

  if (compareList.length === 0) {
    return (
      <div className="bg-zinc-50 min-h-screen py-24 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-3xl border border-zinc-200 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 text-zinc-900 flex items-center justify-center mx-auto border border-zinc-200">
            <Scale className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-bold text-zinc-950">
              No Properties in Comparison
            </h1>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Explore our curated portfolio and click <strong>"+ Compare"</strong> on any 2 to 4 listings to evaluate them side-by-side.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Calculate L2H Comparative Verdicts
  const bestValueProp = [...compareList].sort((a, b) => (a.pricePerSqFt || 0) - (b.pricePerSqFt || 0))[0];
  const bestEndUseProp = [...compareList].sort((a, b) => (b.l2hPerspective?.suitabilityScore?.endUseScore || 0) - (a.l2hPerspective?.suitabilityScore?.endUseScore || 0))[0];
  const bestInvestmentProp = [...compareList].sort((a, b) => (b.l2hPerspective?.suitabilityScore?.investmentScore || 0) - (a.l2hPerspective?.suitabilityScore?.investmentScore || 0))[0];
  const mostPremiumProp = [...compareList].sort((a, b) => b.price - a.price)[0];

  return (
    <div className="bg-zinc-50 min-h-screen py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
              <Scale className="w-3.5 h-3.5 text-zinc-800" />
              <span>Independent Advisory Due Diligence</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-950 tracking-tight">
              Side-by-Side Property Comparison
            </h1>
            <p className="text-xs text-zinc-500 font-light">
              Evaluating {compareList.length} shortlisted opportunities across pricing, density, location, and L2H advisory perspectives.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/properties"
              className="px-4 py-2.5 rounded-xl bg-white border border-zinc-200 hover:border-black text-zinc-950 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 text-black" />
              <span>Add Another Property</span>
            </Link>

            <button
              type="button"
              onClick={clearCompare}
              className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold transition-colors border border-zinc-200"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* L2H Comparison Verdict Summary Banner */}
        <div className="bg-[#09090b] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 text-zinc-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-white" />
            <span>L2H Advisory Verdict Matrix</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400">Best for End-Use Living</span>
              <div className="font-bold text-white text-sm line-clamp-1">{bestEndUseProp?.title}</div>
              <div className="text-[11px] text-zinc-400">{bestEndUseProp?.location.locality} • {bestEndUseProp?.configuration}</div>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-300">Best Value for Money</span>
              <div className="font-bold text-white text-sm line-clamp-1">{bestValueProp?.title}</div>
              <div className="text-[11px] text-zinc-400">≈ ₹{formatIndianNumber(bestValueProp?.pricePerSqFt || 0)} / sq.ft.</div>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-400">Highest Investment Growth</span>
              <div className="font-bold text-white text-sm line-clamp-1">{bestInvestmentProp?.title}</div>
              <div className="text-[11px] text-zinc-400">{bestInvestmentProp?.investmentView?.expectedAnnualAppreciationPercent || 12}% projected YoY</div>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-purple-300">Trophy Luxury Landmark</span>
              <div className="font-bold text-white text-sm line-clamp-1">{mostPremiumProp?.title}</div>
              <div className="text-[11px] text-zinc-400">{mostPremiumProp?.priceDisplay}</div>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Matrix Table */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="p-6 w-56 sm:w-72 bg-zinc-50 text-xs font-bold uppercase tracking-wider text-zinc-500 align-top">
                    Metric / Property
                  </th>
                  {compareList.map((prop) => (
                    <th key={prop.id} className="p-6 min-w-[280px] max-w-[340px] align-top bg-white border-l border-zinc-200 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black text-white">
                          {prop.category}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCompare(prop.id)}
                          className="text-zinc-400 hover:text-red-500 p-1"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="h-36 rounded-2xl overflow-hidden relative group">
                        <img
                          src={prop.images[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80'}
                          alt={prop.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div>
                        <Link
                          href={`/properties/${prop.slug}`}
                          className="font-serif font-bold text-base text-zinc-950 hover:underline transition-colors line-clamp-2"
                        >
                          {prop.title}
                        </Link>
                        <div className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                          <span>{prop.location.locality}, {prop.location.city}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="text-xl font-serif font-bold text-zinc-950">
                          {prop.priceDisplay || formatPrice(prop.price)}
                        </div>
                        {prop.pricePerSqFt && (
                          <div className="text-xs text-zinc-500 font-medium">
                            ≈ ₹{formatIndianNumber(prop.pricePerSqFt)} / sq.ft.
                          </div>
                        )}
                      </div>

                      <div className="pt-2 flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => handleInquire(prop)}
                          className="w-full py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors text-center shadow-sm"
                        >
                          Inquire on This
                        </button>
                        <Link
                          href={`/properties/${prop.slug}`}
                          className="w-full py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors text-center flex items-center justify-center gap-1 border border-zinc-200"
                        >
                          <span>Full Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-200 text-xs">
                {/* 1. Configuration & Area */}
                <tr className="hover:bg-zinc-50/50">
                  <td className="p-5 font-bold text-zinc-950 bg-zinc-50">
                    Configuration &amp; Size
                  </td>
                  {compareList.map((prop) => (
                    <td key={prop.id} className="p-5 border-l border-zinc-200">
                      <div className="font-bold text-zinc-950 text-sm">{prop.configuration}</div>
                      <div className="text-zinc-500">{formatIndianNumber(prop.superArea)} {prop.areaUnit} Super Area</div>
                      {prop.carpetArea && (
                        <div className="text-[11px] text-zinc-400">{formatIndianNumber(prop.carpetArea)} sq.ft. Carpet</div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 2. Developer & RERA */}
                <tr className="hover:bg-zinc-50/50">
                  <td className="p-5 font-bold text-zinc-950 bg-zinc-50">
                    Developer &amp; RERA Status
                  </td>
                  {compareList.map((prop) => (
                    <td key={prop.id} className="p-5 border-l border-zinc-200 space-y-1">
                      <div className="font-bold text-zinc-950">{prop.developer.name}</div>
                      <div className="text-[11px] text-zinc-500">{prop.developer.experienceYears}+ years experience</div>
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-mono text-[10px] font-semibold border border-zinc-200">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{prop.reraNumber}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 3. Possession Timeline */}
                <tr className="hover:bg-zinc-50/50">
                  <td className="p-5 font-bold text-zinc-950 bg-zinc-50">
                    Possession Status
                  </td>
                  {compareList.map((prop) => (
                    <td key={prop.id} className="p-5 border-l border-zinc-200">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        prop.possessionStatus === 'Ready to Move' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {prop.possessionStatus}
                      </span>
                      {prop.possessionDate && (
                        <div className="text-[11px] text-zinc-500 mt-1">{prop.possessionDate}</div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 4. L2H Advisory: Best For */}
                <tr className="hover:bg-zinc-50/50 bg-zinc-50/40">
                  <td className="p-5 font-bold text-zinc-950 bg-zinc-50">
                    L2H Perspective: Best For
                  </td>
                  {compareList.map((prop) => (
                    <td key={prop.id} className="p-5 border-l border-zinc-200">
                      <div className="flex flex-wrap gap-1.5">
                        {prop.l2hPerspective?.bestFor.map((tag, tIdx) => (
                          <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-zinc-200 text-zinc-950 font-bold text-[10px] uppercase tracking-wider">
                            {tag}
                          </span>
                        )) || <span className="text-zinc-400 italic">General Portfolio</span>}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 5. What We Like (Advisory Positives) */}
                <tr className="hover:bg-zinc-50/50">
                  <td className="p-5 font-bold text-zinc-950 bg-zinc-50">
                    What We Like
                  </td>
                  {compareList.map((prop) => (
                    <td key={prop.id} className="p-5 border-l border-zinc-200">
                      <ul className="space-y-2">
                        {prop.l2hPerspective?.whatWeLike.map((pt, ptIdx) => (
                          <li key={ptIdx} className="flex items-start gap-2 text-[11px] text-zinc-700 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        )) || <li className="text-zinc-400">Information pending verification</li>}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* 6. What To Consider (Advisory Caution) */}
                <tr className="hover:bg-zinc-50/50">
                  <td className="p-5 font-bold text-zinc-950 bg-zinc-50">
                    What To Consider
                  </td>
                  {compareList.map((prop) => (
                    <td key={prop.id} className="p-5 border-l border-zinc-200">
                      <ul className="space-y-2">
                        {prop.l2hPerspective?.whatToConsider.map((pt, ptIdx) => (
                          <li key={ptIdx} className="flex items-start gap-2 text-[11px] text-zinc-600 leading-relaxed">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        )) || <li className="text-zinc-400">Information pending verification</li>}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* 7. Investment Growth & Yield */}
                <tr className="hover:bg-zinc-50/50">
                  <td className="p-5 font-bold text-zinc-950 bg-zinc-50">
                    Investment Outlook &amp; Yield
                  </td>
                  {compareList.map((prop) => (
                    <td key={prop.id} className="p-5 border-l border-zinc-200 space-y-2">
                      {prop.investmentView ? (
                        <>
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Projected Growth:</span>
                            <span className="font-bold text-emerald-600">+{prop.investmentView.expectedAnnualAppreciationPercent}% p.a.</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Gross Rental Yield:</span>
                            <span className="font-bold text-zinc-950">{prop.investmentView.estimatedRentalYieldPercent}% p.a.</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Liquidity:</span>
                            <span className="font-semibold text-zinc-700">{prop.investmentView.liquidityRating}</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-zinc-400 italic">Yield calculation available on request</div>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Advisory Callout CTA */}
        <div className="bg-[#09090b] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl font-serif font-bold text-white">
              Need Fiduciary Guidance to Finalize Between These Options?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Schedule a confidential strategy discussion with an L2H property advisor. We will cross-examine developer track records, payment plan flexibility, and tax implications.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleInquire(compareList[0])}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-colors shrink-0 text-center shadow-lg"
          >
            Speak with an L2H Advisor
          </button>
        </div>
      </div>

      {/* Lead Inquire Modal */}
      {selectedPropertyForLead && (
        <LeadModal
          isOpen={isLeadModalOpen}
          onClose={() => setIsLeadModalOpen(false)}
          property={selectedPropertyForLead}
          title={`Inquire: ${selectedPropertyForLead.title}`}
          subtitle="Request comprehensive due diligence report, floor plan PDFs, and schedule private site visits."
        />
      )}
    </div>
  );
}
