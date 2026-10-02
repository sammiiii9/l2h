'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react';

export interface CuratedLuxuryProperty {
  id: string;
  name: string;
  location: string;
  region: string;
  description: string;
  specs: string;
  priceGuide?: string;
  imageUrl: string;
  category: string;
}

interface LuxuryPropertyCardProps {
  property: CuratedLuxuryProperty;
  onBookTour: (property: CuratedLuxuryProperty) => void;
  priority?: boolean;
}

export default function LuxuryPropertyCard({
  property,
  onBookTour,
  priority = false
}: LuxuryPropertyCardProps) {
  return (
    <article className="group flex flex-col space-y-4 text-[#171513] dark:text-[#F5F1EB]">
      {/* 1. 4:3 Image Container with Smooth Scale */}
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#26211D] shadow-lg border border-black/5 dark:border-white/10">
        <Image
          src={property.imageUrl}
          alt={`${property.name} — ${property.location}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-widest text-white/90 border border-white/15">
            {property.category}
          </span>
          
          {property.priceGuide && (
            <span className="px-3 py-1 rounded-full bg-[#171513]/80 backdrop-blur-md text-[11px] font-medium text-[#B8945B] border border-[#B8945B]/30">
              {property.priceGuide}
            </span>
          )}
        </div>

        {/* Floating Quick Action */}
        <button
          onClick={() => onBookTour(property)}
          aria-label={`Book private tour for ${property.name}`}
          className="absolute bottom-4 right-4 p-2.5 px-3 rounded-full bg-white/90 hover:bg-white text-[#171513] shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 text-xs font-medium focus-visible:opacity-100 focus-visible:translate-y-0"
        >
          <span className="text-[11px] uppercase tracking-wider font-medium">Private Tour</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#B8945B]" />
        </button>
      </div>

      {/* 2. Content & Atmospheric Description */}
      <div className="space-y-2 pt-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#171513] dark:text-white group-hover:text-[#B8945B] dark:group-hover:text-[#B8945B] transition-colors">
            {property.name}
          </h3>
          <span className="text-xs text-[#9A8570] dark:text-[#CBBBA8] font-mono whitespace-nowrap">
            {property.specs}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#171513]/60 dark:text-white/60 font-light">
          <MapPin className="w-3.5 h-3.5 text-[#B8945B] shrink-0" />
          <span>{property.location}, {property.region}</span>
        </div>

        <p className="text-xs sm:text-sm text-[#171513]/75 dark:text-white/75 font-light leading-relaxed line-clamp-2">
          {property.description}
        </p>

        {/* Footer Interaction Affordance */}
        <div className="pt-2 flex items-center justify-between text-xs font-medium text-[#B8945B]">
          <button
            onClick={() => onBookTour(property)}
            className="hover:underline flex items-center gap-1 text-[11px] uppercase tracking-wider"
          >
            <span>Request Introduction</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
}
