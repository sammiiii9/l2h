'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  ArrowUpRight, 
  Trees, 
  Home, 
  Building2, 
  Scale, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Property } from '@/types';
import { formatPrice, formatIndianNumber, createWhatsAppUrl } from '@/lib/utils';
import { useCompare } from '@/context/CompareContext';
import LeadModal from '@/components/common/LeadModal';

interface PropertyCardProps {
  property: Property;
  priorityImage?: boolean;
  layout?: 'grid' | 'list';
}

export default function PropertyCard({ 
  property, 
  priorityImage = false,
  layout = 'grid'
}: PropertyCardProps) {
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const isCompared = isInCompare(property.id);

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property);
    }
  };

  const whatsappUrl = createWhatsAppUrl({
    customMessage: `Hi L2H Solution, I am inquiring regarding "${property.title}" in ${property.location.locality}, ${property.location.city}. Please share complete floor plans and due diligence dossier.`
  });

  // Category classification & subtle accent tag
  const catLower = (property.category || '').toLowerCase();
  const isPlot = catLower === 'plots' || catLower === 'plot' || property.propertyType.toLowerCase() === 'plot';
  const isCommercial = catLower === 'commercial' || property.propertyType.toLowerCase() === 'office' || property.propertyType.toLowerCase() === 'retail';
  const isResidential = !isPlot && !isCommercial;

  let categoryLabel = 'Residential';
  let categoryTagClass = 'bg-charcoal-800/90 text-white border-charcoal-700';
  let CategoryIcon = Home;

  if (isPlot) {
    categoryLabel = 'Plots & Land';
    categoryTagClass = 'bg-yellow-950/90 text-yellow-300 border-yellow-700/80';
    CategoryIcon = Trees;
  } else if (isCommercial) {
    categoryLabel = 'Commercial';
    categoryTagClass = 'bg-charcoal-900/90 text-accent border-accent/40';
    CategoryIcon = Building2;
  }

  const imageUrl = property.images?.[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

  return (
    <>
      <article 
        className={`group bg-white dark:bg-charcoal-900 border border-neutral-200/80 dark:border-charcoal-700 rounded-2xl overflow-hidden shadow-luxury-soft hover:shadow-luxury-hover transition-all duration-300 flex flex-col ${
          layout === 'list' ? 'md:flex-row' : ''
        }`}
      >
        {/* Image Container — Dominant (65-70% height/width) */}
        <div className={`relative overflow-hidden bg-black ${
          layout === 'list' ? 'md:w-3/5 min-h-[300px]' : 'h-72 sm:h-80'
        }`}>
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priorityImage}
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* Top Category Tag & Compare Action */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold tracking-wider uppercase border backdrop-blur-md ${categoryTagClass}`}>
              <CategoryIcon className="w-3.5 h-3.5 text-accent" />
              <span>{categoryLabel}</span>
            </span>

            <button
              onClick={handleCompareToggle}
              className={`p-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all shadow-sm ${
                isCompared
                  ? 'bg-accent text-black shadow-gold-glow font-bold'
                  : 'bg-black/80 hover:bg-black text-white border border-white/20'
              }`}
              title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
              aria-label="Toggle property comparison"
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom Overlay Info on Image */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 z-10">
            <div>
              <div className="text-[11px] text-white font-medium tracking-wide uppercase drop-shadow-md">
                {property.developer?.name || 'Verified Development'}
              </div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight drop-shadow-md">
                {property.priceDisplay || formatPrice(property.price)}
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-black/90 text-white border border-charcoal-700 backdrop-blur-md">
              {property.possessionStatus}
            </span>
          </div>
        </div>

        {/* Editorial Body Below Image */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Locality */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-700 dark:text-white font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-accent shrink-0" />
              <span className="truncate">
                {property.location.locality}, {property.location.city}
              </span>
            </div>

            {/* Title */}
            <Link href={`/properties/${property.slug}`} className="block group/title">
              <h3 className="text-lg font-serif font-bold text-ink dark:text-white group-hover/title:text-amber-700 dark:group-hover/title:text-accent transition-colors line-clamp-1">
                {property.title}
              </h3>
            </Link>

            {/* Editorial Thesis / Rationale — Pure White in Dark Mode */}
            <p className="text-xs text-neutral-800 dark:text-white font-normal leading-relaxed line-clamp-2 italic border-l-2 border-accent pl-3">
              &ldquo;{property.l2hPerspective?.valueAssessment || property.tagline || property.description}&rdquo;
            </p>

            {/* Category-Specific Specifications Line — Pure White in Dark Mode */}
            {isPlot && (
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-charcoal-700 text-xs font-medium">
                <span className="text-neutral-800 dark:text-white">
                  {property.plotSizeSqYd || Math.round(property.superArea / 9)} sq.yd. ({property.titleType || 'Freehold'})
                </span>
                <span className="font-bold text-ink dark:text-accent">
                  {property.ratePerSqYd ? `₹${formatIndianNumber(property.ratePerSqYd)}/sq.yd` : 'Clear Title'}
                </span>
              </div>
            )}

            {isResidential && (
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-charcoal-700 text-xs font-medium">
                <span className="text-neutral-800 dark:text-white">
                  {property.configuration.split('+')[0] || `${property.bedrooms || '3'} BHK`} • {property.carpetArea ? `${formatIndianNumber(property.carpetArea)} sq.ft. carpet` : `${formatIndianNumber(property.superArea)} sq.ft.`}
                </span>
                <span className="font-mono text-[10px] text-amber-700 dark:text-accent font-bold uppercase tracking-wider" title={property.reraNumber}>
                  RERA Verified
                </span>
              </div>
            )}

            {isCommercial && (
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-charcoal-700 text-xs font-medium">
                <span className="text-neutral-800 dark:text-white">
                  {property.leaseStatus || 'Pre-leased'} • {property.superArea} sq.ft.
                </span>
                <span className="font-bold text-amber-700 dark:text-accent">
                  {property.expectedRentalYieldPct || 8.2}% Net Yield
                </span>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-neutral-100 dark:border-charcoal-700">
            <Link
              href={`/properties/${property.slug}`}
              className="flex-1 py-2.5 px-4 rounded-xl bg-black hover:bg-charcoal-800 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 text-white font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5 group/btn border border-neutral-300 dark:border-charcoal-700"
            >
              <span>Explore Dossier</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform text-accent" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-neutral-300 dark:border-charcoal-700 hover:border-accent hover:bg-yellow-950/20 text-neutral-800 dark:text-white transition-colors shrink-0"
              title="Inquire on WhatsApp"
              aria-label="Direct WhatsApp Advisory Consultation"
            >
              <MessageSquare className="w-4 h-4 text-accent" />
            </a>

            <button
              type="button"
              onClick={() => setIsLeadModalOpen(true)}
              className="py-2.5 px-3 rounded-xl border border-neutral-300 dark:border-charcoal-700 hover:border-accent text-ink dark:text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
            >
              Inquire
            </button>
          </div>
        </div>
      </article>

      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        propertyTitle={property.title}
      />
    </>
  );
}
