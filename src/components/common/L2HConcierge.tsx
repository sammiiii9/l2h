'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ArrowRight, 
  MapPin, 
  Scale, 
  X, 
  Loader2,
  Compass
} from 'lucide-react';
import { Property } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCompare } from '@/context/CompareContext';
import { trackEvent } from '@/lib/analytics';

interface L2HConciergeProps {
  properties?: Property[];
  categoryPreset?: 'plots' | 'residential' | 'commercial';
}

export default function L2HConcierge({ categoryPreset }: L2HConciergeProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Property[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [activePrompt, setActivePrompt] = useState('');

  const { addToCompare, isInCompare } = useCompare();

  const promptsByCategory = {
    plots: [
      'Freehold residential plots near Jewar Airport',
      'YEIDA expressway plots under ₹1.5 Cr',
      'Clear title land parcels in Dholera SIR',
      'Gated country estate in Sohna Aravalli foothills'
    ],
    residential: [
      '3 BHK in Noida Sector 150 under ₹2.5 Cr',
      'Ultra-luxury penthouses on Golf Course Road',
      'Ready to move 4 BHK on Noida Expressway',
      'Low-density family residences with green open space'
    ],
    commercial: [
      'High-yield pre-leased corporate offices on Noida Expressway',
      'Retail investment with >8% rental yield',
      'Grade-A office floor plate in Sector 142',
      'Pre-leased high-street retail in Gurugram'
    ]
  };

  const samplePrompts = categoryPreset 
    ? promptsByCategory[categoryPreset]
    : [
        '3 BHK in Noida Sector 150 under ₹2.5 Cr',
        'High-yield commercial offices on Noida Expressway',
        'Freehold residential plots near Jewar Airport',
        'Ultra-luxury penthouses on Golf Course Road'
      ];

  const handleSearch = async (customQuery?: string) => {
    const q = (customQuery || query).trim();
    if (!q) return;

    setSearching(true);
    setActivePrompt(q);
    trackEvent('ai_concierge_query', { query: q });

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });
      const data = await res.json();
      if (data.success && data.properties) {
        setResults(data.properties);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error('Concierge query failed:', err);
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="bg-black text-white rounded-3xl p-6 sm:p-10 border border-charcoal-700 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-charcoal-700">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-800 border border-charcoal-700 text-accent text-xs font-semibold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5 text-accent" />
            <span>Advisory Intelligence Matcher</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Describe What You Seek in Plain Language
          </h3>
          <p className="text-xs text-neutral-400 mt-1 font-light">
            Grounded strictly in verified title files, RERA filings, and developer cost sheets.
          </p>
        </div>
      </div>

      {/* Input Bar */}
      <div className="space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row items-center gap-3 bg-charcoal-900 p-2 rounded-2xl border border-charcoal-700 focus-within:border-accent shadow-inner"
        >
          <div className="flex items-center gap-2.5 px-3 flex-1 w-full">
            <Search className="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. I have ₹2.5 Cr and want a 3 BHK in Noida Sector 150..."
              className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setResults(null);
                }}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={searching || !query.trim()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 shadow-gold-glow"
          >
            {searching ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <span>Match Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Sample Prompt Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] text-neutral-400 font-light">Try searching:</span>
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(prompt);
                handleSearch(prompt);
              }}
              className="text-[11px] px-3 py-1 rounded-full bg-charcoal-800 hover:bg-charcoal-700 text-neutral-300 hover:text-white border border-charcoal-700 transition-colors text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Query Results Presentation */}
      {results && (
        <div className="pt-6 border-t border-charcoal-700 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white">
              Matched Opportunities for &ldquo;{activePrompt}&rdquo; ({results.length})
            </h4>
            <button
              type="button"
              onClick={() => setResults(null)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Clear Results
            </button>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((p) => {
                const compared = isInCompare(p.id);
                return (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-700 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-accent font-semibold uppercase text-[10px] tracking-wider">
                          {p.category}
                        </span>
                        <span className="font-serif font-bold text-white text-base">
                          {p.priceDisplay || formatPrice(p.price)}
                        </span>
                      </div>
                      <Link
                        href={`/properties/${p.slug}`}
                        className="text-sm font-serif font-bold text-white hover:text-accent transition-colors block"
                      >
                        {p.title}
                      </Link>
                      <div className="flex items-center gap-1 text-xs text-neutral-400">
                        <MapPin className="w-3 h-3 text-neutral-500" />
                        <span>{p.location.locality}, {p.location.city}</span>
                      </div>
                      <p className="text-xs text-neutral-300 font-light line-clamp-2 italic border-l border-accent/60 pl-2 mt-1">
                        &ldquo;{p.l2hPerspective?.valueAssessment || p.description}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-charcoal-800 text-xs">
                      <Link
                        href={`/properties/${p.slug}`}
                        className="text-accent font-bold hover:underline flex items-center gap-1"
                      >
                        <span>View Dossier</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => compared ? null : addToCompare(p)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1 ${
                          compared
                            ? 'bg-accent text-black font-bold border-accent'
                            : 'bg-charcoal-800 hover:bg-charcoal-700 text-neutral-300 border-charcoal-700'
                        }`}
                      >
                        <Scale className="w-3 h-3" />
                        <span>{compared ? 'In Compare' : 'Compare'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-neutral-400 bg-charcoal-900 rounded-2xl border border-charcoal-700">
              No direct matches found for your exact criteria. Try broadening your budget or speak with an advisor for off-market inventory.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
