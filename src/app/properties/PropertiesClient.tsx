'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  X, 
  Sparkles, 
  RotateCcw,
  Building2
} from 'lucide-react';
import { Property } from '@/types';
import PropertyCard from '@/components/properties/PropertyCard';
import { formatPrice } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

export default function PropertiesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters State
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || 'All');
  const [city, setCity] = useState(searchParams.get('city') || 'All');
  const [locality, setLocality] = useState(searchParams.get('locality') || 'All');
  const [possession, setPossession] = useState(searchParams.get('possession') || 'All');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0);
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 350000000);
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : 0);
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'featured');

  // Fetch properties on filter change
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (category && category !== 'All') query.set('category', category);
        if (propertyType && propertyType !== 'All') query.set('propertyType', propertyType);
        if (city && city !== 'All') query.set('city', city);
        if (locality && locality !== 'All') query.set('locality', locality);
        if (possession && possession !== 'All') query.set('possession', possession);
        if (minPrice > 0) query.set('minPrice', minPrice.toString());
        if (maxPrice < 350000000) query.set('maxPrice', maxPrice.toString());
        if (bedrooms > 0) query.set('bedrooms', bedrooms.toString());
        if (search) query.set('search', search);
        if (sortBy) query.set('sortBy', sortBy);

        const res = await fetch(`/api/properties?${query.toString()}`);
        const data = await res.json();
        setProperties(data.properties || []);

        if (search) {
          trackEvent('search', { query: search, totalMatches: data.total || 0 });
        } else if (category !== 'All' || city !== 'All') {
          trackEvent('filter_apply', { category, city, minPrice, maxPrice });
        }
      } catch (err) {
        console.error('Failed to fetch properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [category, propertyType, city, locality, possession, minPrice, maxPrice, bedrooms, search, sortBy]);

  // Synchronize URL query params
  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'All' && value !== '0') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/properties?${params.toString()}`, { scroll: false });
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('All');
    setPropertyType('All');
    setCity('All');
    setLocality('All');
    setPossession('All');
    setMinPrice(0);
    setMaxPrice(350000000);
    setBedrooms(0);
    setSortBy('featured');
    router.push('/properties');
  };

  const hasActiveFilters = 
    (category && category !== 'All') ||
    (propertyType && propertyType !== 'All') ||
    (city && city !== 'All') ||
    (locality && locality !== 'All') ||
    (possession && possession !== 'All') ||
    minPrice > 0 ||
    maxPrice < 350000000 ||
    bedrooms > 0 ||
    Boolean(search);

  // Dynamic context header
  const isPlot = category.toLowerCase() === 'plots';
  const isResidential = category.toLowerCase() === 'residential';
  const isCommercial = category.toLowerCase() === 'commercial';

  let pageTitle = 'Explore Properties Your Way';
  let pageSubtitle = 'Different goals require different properties. Explore opportunities by destination, purpose and property type.';
  let firstQuestion = 'Which opportunity aligns with your purpose, budget, and long-term horizon?';
  let evidenceFocus = 'Title verification, exact boundary demarcation, registry records, and verified infrastructure access.';

  if (category.toLowerCase().includes('sacred') || category.toLowerCase().includes('spiritual')) {
    pageTitle = 'Sacred & Spiritual Destinations';
    pageSubtitle = 'Plotted developments near revered pilgrimage shrines starting from ₹9 Lakhs for 100 sq. yards.';
    firstQuestion = 'Is the location peaceful, accessible, and grounded in clear freehold title?';
    evidenceFocus = 'Boundary demarcation, temple corridor road access, and clear mutation deeds.';
  } else if (category.toLowerCase().includes('holiday') || category.toLowerCase().includes('leisure')) {
    pageTitle = 'Holiday & Leisure Destinations';
    pageSubtitle = 'Lifestyle and vacation plotted opportunities in Goa starting from ₹35 Lakhs for 100 sq. yards.';
    firstQuestion = 'Does the property offer lifestyle appeal, tourism demand, and second-home tranquility?';
    evidenceFocus = 'Settlement zoning, airport connectivity, and green belt surroundings.';
  } else if (category.toLowerCase().includes('industrial') || category.toLowerCase().includes('growth')) {
    pageTitle = 'Industrial & Growth Corridors';
    pageSubtitle = 'Plotted developments in planned smart hubs like Dholera SIR starting from ₹10 Lakhs for 100 sq. yards.';
    firstQuestion = 'Are you prepared for a 5-8+ year infrastructure gestation timeline for maximum capital appreciation?';
    evidenceFocus = 'TP scheme compliance, expressway connectivity, and government master plan progress.';
  } else if (category.toLowerCase().includes('residential') || category.toLowerCase().includes('noida')) {
    pageTitle = 'Find Your Home in Noida';
    pageSubtitle = 'Residential properties in Noida starting from ₹80 Lakhs, spanning ready-to-move, under-construction, and off-plan.';
    firstQuestion = 'Does the layout, possession timeline, and sector infrastructure match your family lifestyle?';
    evidenceFocus = 'Carpet area efficiency, builder delivery solvency, and metro proximity.';
  }

  return (
    <div className="bg-[#F5F1EB] dark:bg-[#0E0D0C] text-[#171513] dark:text-[#F5F1EB] min-h-screen py-10 transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/10 dark:border-white/10">
          <div className="space-y-1 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-[#B8945B] text-[11px] font-semibold uppercase tracking-wider mb-1">
              <span>L2H Solution • Property Discovery</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-normal text-[#171513] dark:text-white">
              {pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-[#171513]/75 dark:text-white/75 font-light leading-relaxed">
              {pageSubtitle}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                updateQuery('search', e.target.value);
              }}
              placeholder="Search destination, category, city..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#171513] border border-black/10 dark:border-white/15 focus:outline-none focus:border-[#B8945B] text-xs font-medium text-[#171513] dark:text-white shadow-sm"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch('');
                  updateQuery('search', '');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Category Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'All', label: 'All Opportunities' },
            { id: 'Sacred & Spiritual Destinations', label: 'Sacred Destinations (from ₹9L)' },
            { id: 'Industrial & Growth Corridors', label: 'Industrial & Growth (from ₹10L)' },
            { id: 'Holiday & Leisure Destinations', label: 'Holiday & Leisure (from ₹35L)' },
            { id: 'Residential Properties — Noida', label: 'Noida Residential (from ₹80L)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setCategory(tab.id);
                updateQuery('category', tab.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                category === tab.id
                  ? 'bg-[#171513] dark:bg-white text-white dark:text-[#171513] shadow-md'
                  : 'bg-white dark:bg-[#171513] text-[#171513]/70 dark:text-white/70 border border-black/5 dark:border-white/10 hover:border-[#B8945B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Advisory Evidence Rail */}
        <div className="bg-white dark:bg-[#171513] rounded-2xl p-4 sm:p-5 border border-black/5 dark:border-white/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B8945B] block">
              Advisory Evaluation Focus:
            </span>
            <p className="text-xs sm:text-sm font-serif italic text-[#171513] dark:text-white font-normal">
              &ldquo;{firstQuestion}&rdquo;
            </p>
          </div>

          <div className="text-left md:text-right space-y-0.5 shrink-0">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B8945B] block">
              Verification Standards:
            </span>
            <p className="text-xs text-[#171513]/70 dark:text-white/70 font-light">
              {evidenceFocus}
            </p>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block bg-white dark:bg-[#171513] rounded-3xl p-6 border border-black/5 dark:border-white/10 shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/10">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#171513] dark:text-white flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#B8945B]" />
                <span>Filters &amp; Criteria</span>
              </span>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#B8945B] font-semibold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#171513] dark:text-white uppercase tracking-wider">
                Purpose &amp; Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  updateQuery('category', e.target.value);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1EB] dark:bg-[#26211D] border border-black/10 dark:border-white/10 text-xs font-medium text-[#171513] dark:text-white focus:border-[#B8945B] focus:outline-none cursor-pointer"
              >
                <option value="All">All Portfolios</option>
                <option value="Sacred & Spiritual Destinations">Sacred &amp; Spiritual Destinations</option>
                <option value="Industrial & Growth Corridors">Industrial &amp; Growth Corridors</option>
                <option value="Holiday & Leisure Destinations">Holiday &amp; Leisure Destinations</option>
                <option value="Residential Properties — Noida">Residential Properties — Noida</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#171513] dark:text-white uppercase tracking-wider">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => {
                  setPropertyType(e.target.value);
                  updateQuery('propertyType', e.target.value);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1EB] dark:bg-[#26211D] border border-black/10 dark:border-white/10 text-xs font-medium text-[#171513] dark:text-white focus:border-[#B8945B] focus:outline-none cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Plot">100 Sq. Yards Plot</option>
                <option value="Apartment">Residential Apartment / Home</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#171513] dark:text-white uppercase tracking-wider">
                Location
              </label>
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  updateQuery('city', e.target.value);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1EB] dark:bg-[#26211D] border border-black/10 dark:border-white/10 text-xs font-medium text-[#171513] dark:text-white focus:border-[#B8945B] focus:outline-none cursor-pointer"
              >
                <option value="All">All Locations</option>
                <option value="Saharanpur">Mata Shakumbhari Devi, Saharanpur</option>
                <option value="Dholera">Dholera SIR, Gujarat</option>
                <option value="Goa">Goa Coastal &amp; Green Belt</option>
                <option value="Noida">Noida Expressway</option>
              </select>
            </div>

            {/* Possession Status */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#171513] dark:text-white uppercase tracking-wider">
                Possession / Readiness
              </label>
              <select
                value={possession}
                onChange={(e) => {
                  setPossession(e.target.value);
                  updateQuery('possession', e.target.value);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1EB] dark:bg-[#26211D] border border-black/10 dark:border-white/10 text-xs font-medium text-[#171513] dark:text-white focus:border-[#B8945B] focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Ready to Move">Ready to Move / Immediate</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Off-Plan">Off-Plan / New Launch</option>
              </select>
            </div>

            {/* Max Budget Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#171513] dark:text-white uppercase tracking-wider">Max Budget</span>
                <span className="text-[#B8945B] font-mono">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={900000}
                max={150000000}
                step={500000}
                value={maxPrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setMaxPrice(val);
                  updateQuery('maxPrice', val.toString());
                }}
                className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#B8945B]"
              />
              <div className="flex justify-between text-[10px] text-[#171513]/60 dark:text-white/60 font-medium">
                <span>₹9 Lakhs</span>
                <span>₹15 Cr+</span>
              </div>
            </div>

          </div>

          {/* Right Main Listings Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Control Bar: Count, Sort, Layout Switcher */}
            <div className="bg-white dark:bg-charcoal-900 rounded-2xl p-4 border border-neutral-200 dark:border-charcoal-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black dark:bg-charcoal-800 text-white text-xs font-semibold"
                >
                  <Filter className="w-3.5 h-3.5 text-accent" />
                  <span>Filters</span>
                </button>

                <div className="text-xs font-bold text-ink dark:text-white">
                  Showing <span className="text-amber-700 dark:text-accent underline font-extrabold">{properties.length}</span> Curated Properties
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort By Dropdown */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-neutral-700 dark:text-white font-medium hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      updateQuery('sortBy', e.target.value);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-neutral-50 dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700 text-xs font-semibold text-ink dark:text-white focus:border-accent focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest Launches</option>
                    <option value="area">Super Area (Largest)</option>
                  </select>
                </div>

                {/* Grid / List Toggles */}
                <div className="hidden sm:flex items-center bg-neutral-100 dark:bg-charcoal-800 rounded-lg p-1 border border-neutral-200 dark:border-charcoal-700">
                  <button
                    type="button"
                    onClick={() => setLayout('grid')}
                    className={`p-1.5 rounded ${layout === 'grid' ? 'bg-black dark:bg-charcoal-700 text-white shadow-sm' : 'text-neutral-600 dark:text-white hover:text-black dark:hover:text-accent'}`}
                    aria-label="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayout('list')}
                    className={`p-1.5 rounded ${layout === 'list' ? 'bg-black dark:bg-charcoal-700 text-white shadow-sm' : 'text-neutral-600 dark:text-white hover:text-black dark:hover:text-accent'}`}
                    aria-label="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Badges */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-neutral-700 dark:text-white font-medium">Active Filters:</span>
                {category !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-charcoal-800 text-ink dark:text-neutral-200 font-semibold border border-neutral-200 dark:border-charcoal-700">
                    Category: {category}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => { setCategory('All'); updateQuery('category', 'All'); }} />
                  </span>
                )}
                {city !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-charcoal-800 text-ink dark:text-neutral-200 font-semibold border border-neutral-200 dark:border-charcoal-700">
                    City: {city}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => { setCity('All'); updateQuery('city', 'All'); }} />
                  </span>
                )}
                {locality !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-charcoal-800 text-ink dark:text-neutral-200 font-semibold border border-neutral-200 dark:border-charcoal-700">
                    Locality: {locality}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => { setLocality('All'); updateQuery('locality', 'All'); }} />
                  </span>
                )}
                {bedrooms > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-charcoal-800 text-ink dark:text-neutral-200 font-semibold border border-neutral-200 dark:border-charcoal-700">
                    {bedrooms}+ BHK
                    <X className="w-3 h-3 cursor-pointer" onClick={() => { setBedrooms(0); updateQuery('bedrooms', '0'); }} />
                  </span>
                )}
                {maxPrice < 350000000 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-charcoal-800 text-ink dark:text-neutral-200 font-semibold border border-neutral-200 dark:border-charcoal-700">
                    Max: {formatPrice(maxPrice)}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => { setMaxPrice(350000000); updateQuery('maxPrice', '350000000'); }} />
                  </span>
                )}
                {search && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-charcoal-800 text-ink dark:text-neutral-200 font-semibold border border-neutral-200 dark:border-charcoal-700">
                    Search: &ldquo;{search}&rdquo;
                    <X className="w-3 h-3 cursor-pointer" onClick={() => { setSearch(''); updateQuery('search', ''); }} />
                  </span>
                )}
              </div>
            )}

            {/* Properties Listings */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-charcoal-900 rounded-3xl p-4 border border-neutral-200 dark:border-charcoal-800 animate-pulse space-y-4">
                    <div className="h-56 bg-neutral-200 dark:bg-charcoal-800 rounded-2xl" />
                    <div className="h-4 bg-neutral-200 dark:bg-charcoal-800 rounded w-3/4" />
                    <div className="h-3 bg-neutral-200 dark:bg-charcoal-800 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : properties.length > 0 ? (
              <div className={layout === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} layout={layout} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white dark:bg-charcoal-900 rounded-3xl border border-neutral-200 dark:border-charcoal-800 p-8 space-y-4">
                <Building2 className="w-12 h-12 text-neutral-400 dark:text-neutral-600 mx-auto" />
                <h3 className="text-lg font-serif font-bold text-ink dark:text-white">No Matching Properties Found</h3>
                <p className="text-xs text-neutral-700 dark:text-white max-w-sm mx-auto font-normal">
                  Try adjusting your budget slider, selecting another corridor, or contact an advisor for off-market inventory.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2 rounded-xl bg-accent hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-gold-glow"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Slide-Over Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileFilterOpen(false)}
            />

            {/* Slide-Up Panel */}
            <div className="relative bg-white dark:bg-charcoal-900 text-ink dark:text-white rounded-t-3xl max-h-[88vh] overflow-y-auto z-10 p-6 space-y-6 shadow-2xl border-t border-neutral-200 dark:border-charcoal-700 animate-in slide-in-from-bottom duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-charcoal-800 sticky top-0 bg-white dark:bg-charcoal-900 z-10">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-amber-700 dark:text-accent" />
                  <h3 className="font-serif font-bold text-lg text-ink dark:text-white">Filters &amp; Refinements</h3>
                </div>
                <div className="flex items-center gap-3">
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-xs text-amber-700 dark:text-accent font-semibold hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-charcoal-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-charcoal-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#171513] dark:text-neutral-200 uppercase tracking-wider">
                  Purpose &amp; Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    updateQuery('category', e.target.value);
                  }}
                  className="w-full px-3.5 py-3 rounded-xl bg-[#F5F1EB] dark:bg-[#26211D] border border-black/10 dark:border-white/10 text-xs font-medium text-[#171513] dark:text-white focus:border-[#B8945B] focus:outline-none"
                >
                  <option value="All">All Portfolios</option>
                  <option value="Sacred & Spiritual Destinations">Sacred &amp; Spiritual Destinations</option>
                  <option value="Industrial & Growth Corridors">Industrial &amp; Growth Corridors</option>
                  <option value="Holiday & Leisure Destinations">Holiday &amp; Leisure Destinations</option>
                  <option value="Residential Properties — Noida">Residential Properties — Noida</option>
                </select>
              </div>

              {/* City */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#171513] dark:text-white uppercase tracking-wider">
                  Location
                </label>
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    updateQuery('city', e.target.value);
                  }}
                  className="w-full px-3.5 py-3 rounded-xl bg-[#F5F1EB] dark:bg-[#26211D] border border-black/10 dark:border-white/10 text-xs font-medium text-[#171513] dark:text-white focus:border-[#B8945B] focus:outline-none cursor-pointer"
                >
                  <option value="All">All Locations</option>
                  <option value="Saharanpur">Mata Shakumbhari Devi, Saharanpur</option>
                  <option value="Dholera">Dholera SIR, Gujarat</option>
                  <option value="Goa">Goa Coastal &amp; Green Belt</option>
                  <option value="Noida">Noida Expressway</option>
                </select>
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#171513] dark:text-white uppercase tracking-wider">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => {
                    setPropertyType(e.target.value);
                    updateQuery('propertyType', e.target.value);
                  }}
                  className="w-full px-3.5 py-3 rounded-xl bg-[#F5F1EB] dark:bg-[#26211D] border border-black/10 dark:border-white/10 text-xs font-medium text-[#171513] dark:text-white focus:border-[#B8945B] focus:outline-none cursor-pointer"
                >
                  <option value="All">All Types</option>
                  <option value="Plot">100 Sq. Yards Plot</option>
                  <option value="Apartment">Residential Apartment / Home</option>
                </select>
              </div>

              {/* Max Budget Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#171513] dark:text-white uppercase tracking-wider">Max Budget</span>
                  <span className="text-[#B8945B] font-mono">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={900000}
                  max={150000000}
                  step={500000}
                  value={maxPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setMaxPrice(val);
                    updateQuery('maxPrice', val.toString());
                  }}
                  className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#B8945B]"
                />
                <div className="flex justify-between text-[10px] text-[#171513]/60 dark:text-white/60 font-medium">
                  <span>₹9 Lakhs</span>
                  <span>₹15 Cr+</span>
                </div>
              </div>

              {/* Possession Status */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#171513] dark:text-white uppercase tracking-wider">
                  Possession Status
                </label>
                <select
                  value={possession}
                  onChange={(e) => {
                    setPossession(e.target.value);
                    updateQuery('possession', e.target.value);
                  }}
                  className="w-full px-3.5 py-3 rounded-xl bg-neutral-50 dark:bg-charcoal-800 border border-neutral-200 dark:border-charcoal-700 text-xs font-medium text-ink dark:text-white focus:border-accent focus:outline-none cursor-pointer"
                >
                  <option value="All">Any Status</option>
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="New Launch">New Launch</option>
                </select>
              </div>

              {/* Apply / Close Button */}
              <div className="pt-2 sticky bottom-0 bg-white dark:bg-charcoal-900 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-accent hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <span>Show {properties.length} Properties</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
