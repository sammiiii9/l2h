'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  BedDouble, 
  Maximize2, 
  ShieldCheck, 
  TrendingUp, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  Calendar, 
  Building, 
  CheckCircle2, 
  AlertCircle,
  FileText, 
  Share2, 
  Download,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Scale,
  DollarSign,
  Compass,
  Lock,
  Layers,
  Clock
} from 'lucide-react';
import { Property } from '@/types';
import { formatPrice, formatIndianNumber, createWhatsAppUrl } from '@/lib/utils';
import AmenityGrid from '@/components/properties/AmenityGrid';
import FloorPlanViewer from '@/components/properties/FloorPlanViewer';
import LocationMatrix from '@/components/properties/LocationMatrix';
import InvestmentCalculator from '@/components/properties/InvestmentCalculator';
import PropertyCard from '@/components/properties/PropertyCard';
import LeadModal from '@/components/common/LeadModal';
import ScheduleVisitModal from '@/components/common/ScheduleVisitModal';
import { useCompare } from '@/context/CompareContext';

interface PropertyDetailClientProps {
  property: Property;
  similarProperties: Property[];
}

export default function PropertyDetailClient({ property, similarProperties }: PropertyDetailClientProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isScheduleVisitModalOpen, setIsScheduleVisitModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalSubtitle, setModalSubtitle] = useState('');

  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const isCompared = isInCompare(property.id);

  const whatsappUrl = createWhatsAppUrl({
    propertyName: property.title,
    propertyUrl: typeof window !== 'undefined' ? window.location.href : `https://l2hsolution.com/properties/${property.slug}`,
    customMessage: `Hi L2H Solution, I am reviewing the perspective for ${property.title} (Price: ${property.priceDisplay}). I would like to schedule a private advisory consultation and verify current availability.`
  });

  const handleOpenLeadModal = (title?: string, subtitle?: string) => {
    setModalTitle(title || `Inquire: ${property.title}`);
    setModalSubtitle(subtitle || 'An L2H advisor will provide verified cost sheets, floor plan PDFs, and arrange private site inspections.');
    setIsLeadModalOpen(true);
  };

  const handleToggleCompare = () => {
    if (isCompared) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property);
    }
  };

  const currentImage = property.images[activeImageIdx] || property.images[0];
  const verification = property.verificationStatus || 'Verified';

  return (
    <div className="bg-zinc-50 min-h-screen pb-28">
      {/* Breadcrumb Navigation */}
      <div className="bg-[#09090b] border-b border-white/10 text-zinc-400 text-xs py-3.5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <Link href="/properties" className="hover:text-white transition-colors">Properties</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-300 truncate">{property.location.city}</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600 hidden sm:inline" />
            <span className="text-white font-medium truncate hidden sm:inline">{property.title}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Compare Toggle */}
            <button
              type="button"
              onClick={handleToggleCompare}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                isCompared
                  ? 'bg-white text-black font-bold'
                  : 'bg-white/5 text-zinc-300 hover:text-white border border-white/10'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCompared ? 'In Compare List' : '+ Add to Compare'}</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: property.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="flex items-center gap-1.5 text-zinc-300 hover:text-white text-xs transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header / Top Banner */}
      <div className="bg-white border-b border-zinc-200 py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-black text-white border border-black">
                  {property.category}
                </span>

                {/* Verification Status */}
                <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  verification === 'Verified'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : verification === 'Developer Provided'
                    ? 'bg-blue-50 text-blue-800 border border-blue-300'
                    : 'bg-amber-50 text-amber-800 border border-amber-300'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{verification}</span>
                </span>

                <span className="px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider bg-zinc-100 text-zinc-800 border border-zinc-200">
                  {property.possessionStatus}
                </span>

                <span className="px-3 py-1 rounded-lg text-xs font-mono font-semibold text-zinc-600 bg-zinc-100 flex items-center gap-1 border border-zinc-200">
                  <span>RERA: {property.reraNumber}</span>
                </span>

                {property.lastUpdated && (
                  <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Updated {property.lastUpdated}</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-zinc-950 tracking-tight leading-tight">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-600 font-medium">
                <MapPin className="w-4 h-4 text-zinc-900 shrink-0" />
                <span>{property.location.address || `${property.location.locality}, ${property.location.city}`}</span>
              </div>
            </div>

            {/* Price & Primary Action Card */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between bg-zinc-50 p-5 sm:p-6 rounded-3xl border border-zinc-200 lg:min-w-[280px] shadow-sm">
              <div>
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
                  Advisory Pricing Range
                </span>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950">
                  {property.priceDisplay || formatPrice(property.price)}
                </div>
                {property.pricePerSqFt && (
                  <span className="text-xs text-zinc-500 font-medium">
                    ≈ ₹{formatIndianNumber(property.pricePerSqFt)} / sq.ft.
                  </span>
                )}
              </div>

              <div className="mt-2 text-right">
                <button
                  type="button"
                  onClick={() => handleOpenLeadModal('Get Official Cost Sheet & Payment Plan')}
                  className="text-xs font-bold text-zinc-950 hover:underline"
                >
                  Request Official Cost Sheet →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* Photo Gallery Visual Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Selected Image */}
          <div className="lg:col-span-9 h-[380px] sm:h-[500px] rounded-3xl overflow-hidden relative bg-slate-950 shadow-slate-soft group">
            {currentImage?.url && (
              <Image
                src={currentImage.url}
                alt={currentImage?.caption || property.title}
                fill
                sizes="(max-width: 1024px) 100vw, 75vw"
                className="object-cover group-hover:scale-103 transition-transform duration-500"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white z-10">
              <div className="space-y-1">
                <div className="text-sm font-serif font-semibold drop-shadow-md">
                  {currentImage?.caption || property.title}
                </div>
                <div className="text-xs text-slate-300 font-light">
                  Photo {activeImageIdx + 1} of {property.images.length}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenLeadModal('Schedule Escorted Site Visit')}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Schedule Site Visit
              </button>
            </div>
          </div>

          {/* Thumbnail Selector Column */}
          <div className="lg:col-span-3 grid grid-cols-4 lg:grid-cols-1 gap-3 max-h-[500px] overflow-y-auto pr-1">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIdx(idx)}
                className={`h-24 sm:h-28 rounded-2xl overflow-hidden border-2 transition-all relative bg-slate-950 ${
                  activeImageIdx === idx
                    ? 'border-teal-500 shadow-sm scale-[1.02]'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.caption || `Thumbnail ${idx + 1}`}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* 1. SIGNATURE L2H PROPERTY PERSPECTIVE (Fiduciary Advisory Block) */}
        {property.l2hPerspective && (
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-8 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              {/* Header Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-300 text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>L2H Signature Property Perspective</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                    Independent Advisory Evaluation
                  </h2>
                </div>

                {/* Best For Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Recommended For:</span>
                  {property.l2hPerspective.bestFor.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-lg bg-teal-950 text-teal-300 border border-teal-700 font-bold text-xs uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2-Column: What We Would Investigate vs Questions to Resolve */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. What We Would Investigate */}
                <div className="bg-slate-950/80 rounded-2xl p-6 border border-teal-500/30 space-y-4">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-sm uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>What We Would Investigate</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {property.l2hPerspective.whatWeLike.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-teal-400 font-bold mt-0.5">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Questions to Resolve */}
                <div className="bg-slate-950/80 rounded-2xl p-6 border border-amber-500/30 space-y-4">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4" />
                    <span>Questions to Resolve Before Commitment</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {property.l2hPerspective.whatToConsider.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-amber-400 font-bold mt-0.5">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 4-Pillar Qualitative Pillar Assessment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#121214] border border-white/10 space-y-1.5">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Location &amp; Micro-Market</span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">{property.l2hPerspective.locationAssessment}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#121214] border border-white/10 space-y-1.5">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Pricing &amp; Value Moat</span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">{property.l2hPerspective.valueAssessment}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#121214] border border-white/10 space-y-1.5">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Transit &amp; Highway Velocity</span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">{property.l2hPerspective.connectivityAssessment}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#121214] border border-white/10 space-y-1.5">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Investment Suitability</span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">{property.l2hPerspective.investmentSuitability}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. VERIFIED PROPERTY FACTS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div className="text-xs uppercase tracking-wider font-bold text-zinc-950 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Property Fundamentals (Official Developer Filings)</span>
            </div>
            <span className="text-[11px] text-zinc-500 font-mono">RERA: {property.reraNumber}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-zinc-950 text-xs">
            <div className="space-y-1 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">Configuration</span>
              <div className="font-bold text-sm truncate">{property.configuration}</div>
            </div>

            <div className="space-y-1 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">Super Area</span>
              <div className="font-bold text-sm">{formatIndianNumber(property.superArea)} {property.areaUnit}</div>
            </div>

            <div className="space-y-1 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">Carpet Area</span>
              <div className="font-bold text-sm">{property.carpetArea ? `${formatIndianNumber(property.carpetArea)} sq.ft.` : 'Available on Request'}</div>
            </div>

            <div className="space-y-1 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">Developer</span>
              <div className="font-bold text-sm truncate">{property.developer.name}</div>
            </div>

            <div className="space-y-1 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">Possession</span>
              <div className="font-bold text-sm">{property.possessionStatus}</div>
            </div>

            <div className="space-y-1 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">RERA Number</span>
              <div className="font-bold text-sm truncate text-zinc-900 font-mono">{property.reraNumber}</div>
            </div>
          </div>
        </div>

        {/* 3. Main Details & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Main Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-4">
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Project Architectural Overview
              </span>
              <h3 className="text-2xl font-serif font-bold text-zinc-950">
                About {property.title}
              </h3>
              <p className="text-zinc-700 text-xs sm:text-base leading-relaxed font-light">
                {property.description}
              </p>

              {/* Developer Credentials */}
              <div className="mt-6 pt-6 border-t border-zinc-100 flex items-center gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg font-serif shrink-0">
                  {property.developer.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-950">
                    Developed by {property.developer.name}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    {property.developer.experienceYears}+ years in luxury infrastructure • {property.developer.totalProjects}+ landmark developments delivered
                  </div>
                </div>
              </div>
            </div>

            {/* Key Project Highlights */}
            {property.highlights && property.highlights.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-4">
                <span className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                  Distinguishing Characteristics
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-950">
                  Key Specifications &amp; Features
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {property.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-900 font-medium leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-4">
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Lifestyle &amp; Community
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-950">
                Amenities &amp; Leisure Infrastructure
              </h3>
              <AmenityGrid amenities={property.amenities} />
            </div>

            {/* Floor Plans Viewer */}
            <FloorPlanViewer
              floorPlans={property.floorPlans}
              propertyName={property.title}
              onConsultClick={() => handleOpenLeadModal('Request Floor Plans & Cost Breakdown')}
            />

            {/* Location & Connectivity Matrix */}
            <LocationMatrix
              location={property.location}
              connectivity={property.connectivity}
            />

            {/* 4. INVESTMENT VIEW SECTION */}
            {property.investmentView && (
              <div className="bg-[#09090b] text-white rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-2">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Investment Strategy View</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      Capital Appreciation &amp; Cash Flow Matrix
                    </h3>
                  </div>

                  <div className="flex gap-4">
                    {property.investmentView.expectedAnnualAppreciationPercent && (
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Projected Growth</span>
                        <div className="text-xl font-serif font-bold text-emerald-400">
                          {property.investmentView.expectedAnnualAppreciationPercent}% / yr
                        </div>
                      </div>
                    )}
                    {property.investmentView.estimatedRentalYieldPercent && (
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Gross Yield</span>
                        <div className="text-xl font-serif font-bold text-white">
                          {property.investmentView.estimatedRentalYieldPercent}% p.a.
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#121214] border border-white/10 space-y-2">
                    <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">Demand &amp; Absorption Catalysts</span>
                    <ul className="space-y-1.5 text-zinc-300 font-light">
                      {property.investmentView.demandDrivers.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="text-white">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#121214] border border-white/10 space-y-2">
                    <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">Exit Strategy &amp; Liquidity</span>
                    <ul className="space-y-1.5 text-zinc-300 font-light">
                      {property.investmentView.exitStrategies.map((e, eIdx) => (
                        <li key={eIdx} className="flex items-start gap-2">
                          <span className="text-white">•</span>
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Interactive Investment & ROI Calculator */}
            <InvestmentCalculator
              initialPrice={property.price}
              initialRentalYield={property.investmentView?.estimatedRentalYieldPercent || 4.5}
              initialAppreciation={property.investmentView?.expectedAnnualAppreciationPercent || 12.0}
              onConsultClick={() => handleOpenLeadModal('Discuss Tailored Investment Structuring')}
            />
          </div>

          {/* Right Sidebar: Sticky Advisory Box */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-charcoal-800 shadow-luxury-soft space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-amber-700 dark:text-accent font-bold">
                  Dedicated Advisory Desk
                </span>
                <h3 className="text-xl font-serif font-bold text-ink dark:text-white">
                  Speak with an L2H Strategist
                </h3>
                <p className="text-xs text-neutral-700 dark:text-white leading-relaxed font-normal">
                  We look beyond the marketing brochure. Get unbiased developer due diligence, floor plan efficiency metrics, and private escorted site visits.
                </p>
              </div>

              {/* Named Advisor / Agent Card */}
              {property.advisorContact && (
                <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-neutral dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative ring-2 ring-accent shrink-0 bg-black">
                    <Image
                      src={property.advisorContact.photo}
                      alt={property.advisorContact.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 truncate">
                    <div className="text-xs font-bold text-ink dark:text-white truncate">
                      {property.advisorContact.name}
                    </div>
                    <div className="text-[10px] text-neutral-700 dark:text-white truncate font-medium">
                      {property.advisorContact.role}
                    </div>
                    <div className="text-[10px] text-accent font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse" />
                      <span>Available for Fiduciary Consultation</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setIsScheduleVisitModalOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-accent hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-gold-glow"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Private Site Visit</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-charcoal-700"
                >
                  <MessageSquare className="w-4 h-4 text-accent" />
                  <span>Ask on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleToggleCompare}
                  className={`w-full py-3 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 border ${
                    isCompared
                      ? 'bg-accent text-black font-bold border-accent shadow-gold-glow'
                      : 'bg-neutral hover:bg-neutral-200 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 text-ink dark:text-neutral-200 border-neutral-200 dark:border-charcoal-700'
                  }`}
                >
                  <Scale className="w-4 h-4 text-accent" />
                  <span>{isCompared ? '✓ Added to Compare' : '+ Compare with Similar'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenLeadModal('Request Price & Floor Plan PDF')}
                  className="w-full py-3 rounded-xl bg-white dark:bg-charcoal-900 hover:bg-neutral-50 dark:hover:bg-charcoal-800 text-ink dark:text-neutral-200 border border-neutral-300 dark:border-charcoal-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-accent" />
                  <span>Request Full PDF Dossier</span>
                </button>
              </div>

              <div className="pt-2 text-[11px] text-center text-neutral-400 font-light">
                🔒 Strict fiduciary confidentiality. Zero spam.
              </div>
            </div>
          </div>
        </div>

        {/* Similar Curated Properties */}
        {similarProperties.length > 0 && (
          <div className="pt-12 border-t border-zinc-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                  Alternative Opportunities
                </span>
                <h3 className="text-2xl font-serif font-bold text-zinc-950">
                  Similar Curated Properties in {property.category}
                </h3>
              </div>

              <Link
                href={`/properties?category=${property.category}`}
                className="text-xs font-bold text-zinc-950 hover:text-black flex items-center gap-1"
              >
                <span>View More in {property.category}</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Action Bar for Mobile */}
      <div className="fixed bottom-0 inset-x-0 bg-[#09090b]/98 backdrop-blur-xl border-t border-white/10 p-3 sm:p-4 z-40 lg:hidden shadow-2xl">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3">
          <div>
            <div className="text-[9px] text-zinc-400 uppercase tracking-wider font-semibold">Advisory Pricing</div>
            <div className="text-base font-serif font-bold text-white">
              {property.priceDisplay || formatPrice(property.price)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#25D366] text-white"
              aria-label="WhatsApp Advisor"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
            </a>

            <button
              type="button"
              onClick={() => setIsScheduleVisitModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider shadow-md"
            >
              Schedule Visit
            </button>
          </div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        property={property}
        title={modalTitle}
        subtitle={modalSubtitle}
      />

      {/* VIP Site Visit Schedule Modal */}
      <ScheduleVisitModal
        isOpen={isScheduleVisitModalOpen}
        onClose={() => setIsScheduleVisitModalOpen(false)}
        property={property}
      />
    </div>
  );
}
