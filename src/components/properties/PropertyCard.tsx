'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  ShieldCheck, 
  TrendingUp, 
  ArrowUpRight, 
  Sparkles,
  MessageSquare,
  Scale,
  Check,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Property } from '@/types';
import { formatPrice, formatIndianNumber, createWhatsAppUrl } from '@/lib/utils';
import { useCompare } from '@/context/CompareContext';
import { useSaved } from '@/context/SavedContext';
import { trackEvent } from '@/lib/analytics';
import LeadModal from '@/components/common/LeadModal';
import { Heart } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  layout?: 'grid' | 'list';
}

export default function PropertyCard({ property, layout = 'grid' }: PropertyCardProps) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { saveProperty, removeSavedProperty, isSaved } = useSaved();

  const isCompared = isInCompare(property.id);
  const saved = isSaved(property.id);
  const featuredImage = property.images[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';

  const whatsappUrl = createWhatsAppUrl({
    propertyName: property.title,
    propertyUrl: `https://l2hsolution.com/properties/${property.slug}`
  });

  const isList = layout === 'list';

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property);
      trackEvent('property_compare', { propertyId: property.id, title: property.title });
    }
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeSavedProperty(property.id);
    } else {
      saveProperty(property);
    }
  };

  const verification = property.verificationStatus || 'Verified';

  return (
    <>
      <div 
        className={`group bg-white rounded-3xl overflow-hidden border border-zinc-200/90 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col ${
          isList ? 'md:flex-row' : ''
        }`}
      >
        {/* Thumbnail Visual Container — Authentic Natural Photography */}
        <div className={`relative overflow-hidden ${isList ? 'md:w-2/5 min-h-[280px]' : 'h-64'} w-full bg-zinc-950`}>
          <img
            src={featuredImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Architectural Smoked Glass Badges Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 p-3.5 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase bg-black/80 text-white border border-white/20 backdrop-blur-md shadow-sm">
                  {property.category}
                </span>

                {/* Verification Status Badge */}
                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold tracking-wider uppercase backdrop-blur-md flex items-center gap-1 shadow-sm ${
                  verification === 'Verified'
                    ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/40'
                    : verification === 'Developer Provided'
                    ? 'bg-zinc-900/90 text-zinc-300 border border-zinc-700'
                    : 'bg-amber-950/90 text-amber-300 border border-amber-500/40'
                }`}>
                  <ShieldCheck className="w-3 h-3" />
                  <span>{verification}</span>
                </span>
              </div>

              {/* Action Buttons: Compare & Save */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleToggleSave}
                  className={`p-1.5 rounded-lg backdrop-blur-md transition-all shadow-md ${
                    saved
                      ? 'bg-red-500 text-white'
                      : 'bg-black/70 text-white hover:text-red-400 border border-white/20'
                  }`}
                  title={saved ? 'Remove from Saved' : 'Save Property'}
                >
                  <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={handleToggleCompare}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 backdrop-blur-md shadow-md ${
                    isCompared
                      ? 'bg-white text-black font-bold scale-105'
                      : 'bg-black/70 text-white hover:text-white border border-white/20 hover:bg-black/90'
                  }`}
                  title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
                >
                  <Scale className="w-3 h-3" />
                  <span>{isCompared ? 'Compared' : '+ Compare'}</span>
                </button>
              </div>
            </div>

            {/* Quick Price on image in architectural smoked glass pill */}
            <div className="flex items-end justify-between text-white">
              <div>
                <div className="text-[10px] text-zinc-300 uppercase tracking-wider font-medium">
                  {property.developer.name}
                </div>
                <div className="text-lg sm:text-xl font-serif font-bold text-white drop-shadow-sm">
                  {property.priceDisplay || formatPrice(property.price)}
                </div>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md ${
                property.possessionStatus === 'Ready to Move' 
                  ? 'bg-emerald-900/90 text-emerald-200 border border-emerald-500/30'
                  : 'bg-black/80 text-zinc-200 border border-white/20'
              }`}>
                {property.possessionStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            {/* Location & Sector */}
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
              <span className="truncate">
                {property.location.locality}, {property.location.city}
              </span>
            </div>

            {/* Title */}
            <Link href={`/properties/${property.slug}`} className="block group/title">
              <h3 className="text-lg font-serif font-bold text-zinc-950 group-hover/title:text-zinc-600 transition-colors line-clamp-1">
                {property.title}
              </h3>
            </Link>

            {/* L2H Perspective Tag Pills */}
            {property.l2hPerspective?.bestFor && (
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[10px] text-zinc-400 font-semibold uppercase">Best For:</span>
                {property.l2hPerspective.bestFor.slice(0, 3).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-md bg-zinc-100 text-[10px] font-semibold text-zinc-800 border border-zinc-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Tagline / Subtitle */}
            <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed font-light">
              {property.tagline || property.description}
            </p>
          </div>

          {/* Key Specs Bar */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-zinc-50 border border-zinc-200/80 text-zinc-700 text-xs">
            <div className="flex flex-col">
              <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-semibold">Config</span>
              <span className="font-bold text-zinc-900 truncate">
                {property.configuration.split('+')[0] || `${property.bedrooms || 'Custom'} BHK`}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-semibold">Super Area</span>
              <span className="font-bold text-zinc-900">
                {formatIndianNumber(property.superArea)} {property.areaUnit}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-semibold">RERA</span>
              <span className="font-bold text-zinc-900 truncate text-[10px] font-mono" title={property.reraNumber}>
                {property.reraNumber || 'Verified'}
              </span>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <Link
              href={`/properties/${property.slug}`}
              className="flex-1 py-2.5 px-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-semibold text-xs text-center transition-colors flex items-center justify-center gap-1.5 group/btn"
            >
              <span>Perspective &amp; Details</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-zinc-200 hover:border-green-500 hover:bg-green-50 text-zinc-700 hover:text-green-700 transition-colors shrink-0"
              title="Ask on WhatsApp with Property Context"
            >
              <MessageSquare className="w-4 h-4 text-green-600" />
            </a>

            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="py-2.5 px-3 rounded-xl border border-zinc-300 bg-white hover:bg-black hover:text-white text-zinc-900 text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
            >
              Inquire
            </button>
          </div>
        </div>
      </div>

      {/* Quick Inquire Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        property={property}
        title={`Inquire: ${property.title}`}
        subtitle="Connect with an L2H property strategist for verified pricing, site visits, and independent advisory."
      />
    </>
  );
}
