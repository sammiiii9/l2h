'use client';

import React, { useState } from 'react';
import { Sparkles, Search, ArrowRight, CheckCircle2, Building2, MapPin, ShieldCheck, Scale, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Property } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCompare } from '@/context/CompareContext';

import { trackEvent } from '@/lib/analytics';

interface L2HConciergeProps {
  properties: Property[];
}

export default function L2HConcierge({ properties }: L2HConciergeProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Property[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [activePrompt, setActivePrompt] = useState('');

  const { addToCompare, isInCompare } = useCompare();

  const samplePrompts = [
    '3 BHK in Noida Sector 150 under ₹2.5 Cr',
    'High-yield commercial offices in Noida Expressway',
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
    <div className="bg-[#121214] text-white rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>L2H Concierge • Natural Language Matcher</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Describe What You Seek in Plain Language
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-light">
            Grounded strictly in verified L2H inventory data — zero hallucinations.
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
          className="flex flex-col sm:flex-row items-center gap-3 bg-black p-2 rounded-2xl border border-white/15 focus-within:border-white shadow-inner"
        >
          <div className="flex items-center gap-2.5 px-3 flex-1 w-full">
            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. I have ₹2.5 Cr and want a 3 BHK in Noida Sector 150..."
              className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setResults(null);
                }}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={searching || !query.trim()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 shadow-md"
          >
            {searching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Matching...</span>
              </>
            ) : (
              <>
                <span>Match Properties</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Sample Prompt Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] text-zinc-400 font-semibold">Try asking:</span>
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(prompt);
                handleSearch(prompt);
              }}
              className="px-3 py-1 rounded-full bg-black hover:bg-zinc-900 border border-white/10 hover:border-white/30 text-[11px] text-zinc-300 hover:text-white transition-all text-left"
            >
              &ldquo;{prompt}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Results Display */}
      {results !== null && (
        <div className="pt-4 border-t border-white/10 space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between text-xs">
            <div className="text-zinc-300">
              Matches for <strong className="text-white font-serif">&ldquo;{activePrompt}&rdquo;</strong>: <span className="text-white font-bold">{results.length} verified listings</span>
            </div>
            <button
              onClick={() => setResults(null)}
              className="text-zinc-400 hover:text-white text-xs underline"
            >
              Reset Results
            </button>
          </div>

          {results.length === 0 ? (
            <div className="p-8 rounded-2xl bg-black text-center border border-white/10 space-y-3">
              <p className="text-xs text-zinc-400 max-w-md mx-auto font-light">
                No direct inventory match found for this exact criteria. Our advisory desk can explore unlisted opportunities and off-market inventory.
              </p>
              <Link
                href="/find-property"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-md"
              >
                <span>Request Custom Sourcing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((prop) => (
                <div
                  key={prop.id}
                  className="p-4 rounded-2xl bg-black border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-white uppercase tracking-wider">{prop.category}</span>
                      <span className="text-zinc-500 font-mono">{prop.reraNumber}</span>
                    </div>

                    <h4 className="font-serif font-bold text-white text-sm group-hover:text-zinc-300 transition-colors line-clamp-1">
                      {prop.title}
                    </h4>

                    <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                      <MapPin className="w-3 h-3 text-zinc-300 shrink-0" />
                      <span>{prop.location.locality}, {prop.location.city}</span>
                    </div>

                    <div className="text-sm font-serif font-bold text-white pt-1">
                      {prop.priceDisplay || formatPrice(prop.price)}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                    <Link
                      href={`/properties/${prop.slug}`}
                      className="text-xs font-semibold text-white hover:underline flex items-center gap-1"
                    >
                      <span>View Dossier</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => addToCompare(prop)}
                      className={`text-[10px] px-2.5 py-1 rounded-lg border font-bold uppercase transition-colors ${
                        isInCompare(prop.id)
                          ? 'bg-white text-black border-white'
                          : 'bg-white/5 text-zinc-300 hover:text-white border-white/10'
                      }`}
                    >
                      {isInCompare(prop.id) ? '✓ Compared' : '+ Compare'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
