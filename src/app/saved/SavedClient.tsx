'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bookmark, Heart, Scale, Trash2, ArrowRight, MapPin, Phone } from 'lucide-react';
import { useSaved } from '@/context/SavedContext';
import { useCompare } from '@/context/CompareContext';
import { formatPrice, formatIndianNumber } from '@/lib/utils';
import LeadModal from '@/components/common/LeadModal';

export default function SavedClient() {
  const { savedList, removeSavedProperty, clearSaved } = useSaved();
  const { addToCompare, isInCompare } = useCompare();
  const [selectedPropertyForLead, setSelectedPropertyForLead] = useState<any>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const handleInquireAll = () => {
    if (savedList.length > 0) {
      setSelectedPropertyForLead(savedList[0]);
      setIsLeadModalOpen(true);
    }
  };

  if (savedList.length === 0) {
    return (
      <div className="bg-zinc-50 min-h-screen py-24 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-3xl border border-zinc-200 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 text-black flex items-center justify-center mx-auto border border-zinc-200">
            <Heart className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-bold text-zinc-950">
              No Saved Properties Yet
            </h1>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Explore our curated portfolio and bookmark properties to build your private shortlist and request tailored investment structuring.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 min-h-screen py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Private Advisory Portfolio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-950 tracking-tight">
              Your Shortlisted Properties ({savedList.length})
            </h1>
            <p className="text-xs text-zinc-500 font-light">
              Review your saved listings, add them to side-by-side comparison, or discuss with your assigned L2H advisor.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleInquireAll}
              className="px-5 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Request Combined Due Diligence</span>
            </button>

            <button
              type="button"
              onClick={clearSaved}
              className="px-4 py-2.5 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-700 text-xs font-semibold transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Shortlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedList.map((prop) => (
            <div
              key={prop.id}
              className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm hover:border-black transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-56 relative overflow-hidden bg-black">
                  <img
                    src={prop.images[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 right-3">
                    <button
                      type="button"
                      onClick={() => removeSavedProperty(prop.id)}
                      className="p-2 rounded-xl bg-black/80 text-red-400 hover:text-red-300 backdrop-blur-md transition-colors border border-white/10"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[10px] text-zinc-300 uppercase tracking-wider font-bold">{prop.category}</span>
                    <div className="text-lg font-serif font-bold text-white">{prop.priceDisplay || formatPrice(prop.price)}</div>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif font-bold text-lg text-zinc-950 line-clamp-1">
                    {prop.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <MapPin className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                    <span>{prop.location.locality}, {prop.location.city}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 py-2 px-3 rounded-xl bg-zinc-50 text-xs border border-zinc-200">
                    <div>
                      <span className="text-[9px] text-zinc-400 uppercase font-semibold block">Config</span>
                      <span className="font-bold text-zinc-950">{prop.configuration}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-400 uppercase font-semibold block">Super Area</span>
                      <span className="font-bold text-zinc-950">{formatIndianNumber(prop.superArea)} {prop.areaUnit}</span>
                    </div>
                  </div>

                  {prop.l2hPerspective?.bestFor && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {prop.l2hPerspective.bestFor.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/properties/${prop.slug}`}
                    className="flex-1 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-semibold text-xs text-center transition-colors shadow-sm"
                  >
                    View Full Dossier
                  </Link>

                  <button
                    type="button"
                    onClick={() => addToCompare(prop)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors border ${
                      isInCompare(prop.id)
                        ? 'bg-zinc-900 text-white border-zinc-900 font-bold'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-200'
                    }`}
                    title="Add to side-by-side comparison"
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Modal */}
      {selectedPropertyForLead && (
        <LeadModal
          isOpen={isLeadModalOpen}
          onClose={() => setIsLeadModalOpen(false)}
          property={selectedPropertyForLead}
          title="Consult on Your Shortlisted Properties"
          subtitle="Our senior strategists will cross-examine developer track records and prepare comparative cash flow models."
        />
      )}
    </div>
  );
}
