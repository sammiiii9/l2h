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
    category !== 'All' || 
    propertyType !== 'All' || 
    city !== 'All' || 
    locality !== 'All' || 
    possession !== 'All' || 
    bedrooms > 0 || 
    search !== '' ||
    maxPrice < 350000000;

  return (
    <div className="bg-zinc-50 min-h-screen py-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-zinc-200 border border-zinc-300 text-zinc-800 text-[11px] font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Real Estate Discovery</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-950">
              Curated Properties Portfolio
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-light">
              Explore verified luxury apartments, sky penthouses, golf villas, freehold plots, and commercial assets across Delhi NCR.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                updateQuery('search', e.target.value);
              }}
              placeholder="Search project, locality, developer..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-zinc-200 focus:border-black focus:outline-none text-xs font-medium text-zinc-900 shadow-sm"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch('');
                  updateQuery('search', '');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <span className="text-xs uppercase tracking-wider font-bold text-zinc-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-600" />
                <span>Filters & Criteria</span>
              </span>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] text-zinc-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  updateQuery('category', e.target.value);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:border-black focus:outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Apartments">Luxury Apartments</option>
                <option value="Villas">Villas & Farmhouses</option>
                <option value="Plots">Land & Plots</option>
                <option value="Commercial">Commercial & Offices</option>
                <option value="Luxury Properties">Penthouses & Trophy Estates</option>
                <option value="Homes">Resort Homes</option>
              </select>
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider">
                City / Region
              </label>
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  updateQuery('city', e.target.value);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:border-black focus:outline-none"
              >
                <option value="All">All Regions</option>
                <option value="Noida">Noida</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Greater Noida">Greater Noida & YEIDA</option>
                <option value="Goa">Goa</option>
                <option value="Rishikesh">Rishikesh</option>
                <option value="Tehri Garhwal">Tehri Garhwal</option>
                <option value="Jim Corbett">Jim Corbett</option>
                <option value="Dholera">Dholera SIR</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            {/* Locality */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider">
                Micro-Market / Locality
              </label>
              <select
                value={locality}
                onChange={(e) => {
                  setLocality(e.target.value);
                  updateQuery('locality', e.target.value);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:border-black focus:outline-none"
              >
                <option value="All">All Micro-Markets</option>
                <option value="Sector 150">Sector 150 (Sports Corridor)</option>
                <option value="Sector 124">Sector 124-128 (Expressway Gateway)</option>
                <option value="Sector 140A">Sector 140A (Cyberthum SEZ)</option>
                <option value="Golf Course Road">Golf Course Road (DLF 5)</option>
                <option value="Golf Course Extension">Golf Course Ext. (Sector 65)</option>
                <option value="Yamuna Expressway">Yamuna Expressway (Airport)</option>
                <option value="Sohna Road">Sohna Road (Aravallis)</option>
                <option value="Assagao">Assagao Valley (Goa)</option>
                <option value="Tapovan">Tapovan (Rishikesh)</option>
                <option value="Tehri Lake">Tehri Lake Promenade (Tehri)</option>
                <option value="Kosi Riverfront">Kosi Riverfront (Jim Corbett)</option>
                <option value="TP2 Activation Area">TP2 Activation Area (Dholera SIR)</option>
              </select>
            </div>

            {/* Bedrooms (BHK) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider">
                Bedrooms / Configuration
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: 'Any', val: 0 },
                  { label: '3 BHK', val: 3 },
                  { label: '4 BHK', val: 4 },
                  { label: '5+ BHK', val: 5 }
                ].map((b) => (
                  <button
                    key={b.val}
                    type="button"
                    onClick={() => {
                      setBedrooms(b.val);
                      updateQuery('bedrooms', b.val.toString());
                    }}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                      bedrooms === b.val
                        ? 'bg-black text-white border-black'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Budget Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-900 uppercase tracking-wider">Max Budget</span>
                <span className="text-zinc-950 font-serif font-bold">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={10000000}
                max={350000000}
                step={5000000}
                value={maxPrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setMaxPrice(val);
                  updateQuery('maxPrice', val.toString());
                }}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-medium">
                <span>₹1 Cr</span>
                <span>₹35+ Cr</span>
              </div>
            </div>

            {/* Possession Status */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider">
                Possession Status
              </label>
              <select
                value={possession}
                onChange={(e) => {
                  setPossession(e.target.value);
                  updateQuery('possession', e.target.value);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:border-black focus:outline-none"
              >
                <option value="All">Any Status</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="New Launch">New Launch</option>
              </select>
            </div>
          </div>

          {/* Right Main Listings Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Control Bar: Count, Sort, Layout Switcher */}
            <div className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black text-white text-xs font-semibold"
                >
                  <Filter className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Filters</span>
                </button>

                <div className="text-xs font-bold text-zinc-900">
                  Showing <span className="text-black underline font-extrabold">{properties.length}</span> Curated Properties
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort By Dropdown */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-zinc-400 hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      updateQuery('sortBy', e.target.value);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-900 focus:border-black focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest Launches</option>
                    <option value="area">Super Area (Largest)</option>
                  </select>
                </div>

                {/* Grid / List Toggles */}
                <div className="hidden sm:flex items-center bg-zinc-100 rounded-lg p-1 border border-zinc-200">
                  <button
                    type="button"
                    onClick={() => setLayout('grid')}
                    className={`p-1.5 rounded ${layout === 'grid' ? 'bg-black text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
                    aria-label="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayout('list')}
                    className={`p-1.5 rounded ${layout === 'list' ? 'bg-black text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
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
                <span className="text-zinc-400">Active Filters:</span>
                {category !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-900 font-semibold border border-zinc-200">
                    Category: {category}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => { setCategory('All'); updateQuery('category', 'All'); }} />
                  </span>
                )}
                {city !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-900 font-semibold border border-zinc-200">
                    City: {city}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => { setCity('All'); updateQuery('city', 'All'); }} />
                  </span>
                )}
                {locality !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-900 font-semibold border border-zinc-200">
                    Locality: {locality}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => { setLocality('All'); updateQuery('locality', 'All'); }} />
                  </span>
                )}
                {bedrooms > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-900 font-semibold border border-zinc-200">
                    {bedrooms}+ BHK
                    <X className="w-3 h-3 cursor-pointer" onClick={() => { setBedrooms(0); updateQuery('bedrooms', '0'); }} />
                  </span>
                )}
                {maxPrice < 350000000 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-900 font-semibold border border-zinc-200">
                    Max: {formatPrice(maxPrice)}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => { setMaxPrice(350000000); updateQuery('maxPrice', '350000000'); }} />
                  </span>
                )}
                {search && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-900 font-semibold border border-zinc-200">
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
                  <div key={i} className="bg-white rounded-3xl p-4 border border-zinc-200 animate-pulse space-y-4">
                    <div className="h-56 bg-zinc-200 rounded-2xl" />
                    <div className="h-4 bg-zinc-200 rounded w-3/4" />
                    <div className="h-3 bg-zinc-200 rounded w-1/2" />
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
              <div className="text-center py-24 bg-white rounded-3xl border border-zinc-200 p-8 space-y-4">
                <Building2 className="w-12 h-12 text-zinc-300 mx-auto" />
                <h3 className="text-lg font-serif font-bold text-zinc-950">No Matching Properties Found</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto font-light">
                  Try adjusting your budget slider, selecting another corridor, or contact an advisor for off-market inventory.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2 rounded-xl bg-black text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
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
            <div className="relative bg-white rounded-t-3xl max-h-[88vh] overflow-y-auto z-10 p-6 space-y-6 shadow-2xl border-t border-zinc-200 animate-in slide-in-from-bottom duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 sticky top-0 bg-white z-10">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-black" />
                  <h3 className="font-serif font-bold text-lg text-zinc-950">Filters &amp; Refinements</h3>
                </div>
                <div className="flex items-center gap-3">
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-xs text-zinc-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-700 hover:bg-zinc-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    updateQuery('category', e.target.value);
                  }}
                  className="w-full px-3.5 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:border-black focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Apartments">Luxury Apartments</option>
                  <option value="Villas">Villas &amp; Farmhouses</option>
                  <option value="Plots">Land &amp; Plots</option>
                  <option value="Commercial">Commercial &amp; Offices</option>
                  <option value="Luxury Properties">Penthouses &amp; Trophy Estates</option>
                  <option value="Homes">Resort Homes</option>
                </select>
              </div>

              {/* City */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  City / Region
                </label>
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    updateQuery('city', e.target.value);
                  }}
                  className="w-full px-3.5 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:border-black focus:outline-none"
                >
                  <option value="All">All Regions</option>
                  <option value="Noida">Noida</option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Greater Noida">Greater Noida &amp; YEIDA</option>
                  <option value="Goa">Goa</option>
                  <option value="Rishikesh">Rishikesh</option>
                  <option value="Tehri Garhwal">Tehri Garhwal</option>
                  <option value="Jim Corbett">Jim Corbett</option>
                  <option value="Dholera">Dholera SIR</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>

              {/* Locality */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  Micro-Market / Locality
                </label>
                <select
                  value={locality}
                  onChange={(e) => {
                    setLocality(e.target.value);
                    updateQuery('locality', e.target.value);
                  }}
                  className="w-full px-3.5 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:border-black focus:outline-none"
                >
                  <option value="All">All Localities</option>
                  <option value="Sector 150">Sector 150, Noida</option>
                  <option value="Sector 124">Sector 124, Noida</option>
                  <option value="Sector 128">Sector 128 (Wish Town)</option>
                  <option value="Sector 140A">Sector 140A, Noida</option>
                  <option value="Golf Course Road">Golf Course Road, DLF 5</option>
                  <option value="Sector 65">Golf Course Ext. (Sec 65)</option>
                  <option value="Yamuna Expressway">Yamuna Expressway (Sector 22D)</option>
                  <option value="Assagao">Assagao, Goa</option>
                  <option value="Tapovan">Tapovan, Rishikesh</option>
                  <option value="Tehri Lake Overlook">Tehri Lake Overlook</option>
                  <option value="Kosi Riverfront">Kosi Riverfront, Corbett</option>
                  <option value="TP2 Activation Area">TP2 Activation Area, Dholera</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  Bedrooms
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { label: 'All', val: 0 },
                    { label: '2 BHK', val: 2 },
                    { label: '3 BHK', val: 3 },
                    { label: '4 BHK', val: 4 },
                    { label: '5+ BHK', val: 5 },
                  ].map((b) => (
                    <button
                      key={b.label}
                      type="button"
                      onClick={() => {
                        setBedrooms(b.val);
                        updateQuery('bedrooms', b.val.toString());
                      }}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        bedrooms === b.val
                          ? 'bg-black text-white border-black shadow-sm'
                          : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Budget Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-zinc-900 uppercase tracking-wider">Max Budget</span>
                  <span className="text-zinc-950 font-serif font-bold">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={10000000}
                  max={350000000}
                  step={5000000}
                  value={maxPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setMaxPrice(val);
                    updateQuery('maxPrice', val.toString());
                  }}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-medium">
                  <span>₹1 Cr</span>
                  <span>₹35+ Cr</span>
                </div>
              </div>

              {/* Possession Status */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  Possession Status
                </label>
                <select
                  value={possession}
                  onChange={(e) => {
                    setPossession(e.target.value);
                    updateQuery('possession', e.target.value);
                  }}
                  className="w-full px-3.5 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:border-black focus:outline-none"
                >
                  <option value="All">Any Status</option>
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="New Launch">New Launch</option>
                </select>
              </div>

              {/* Apply / Close Button */}
              <div className="pt-2 sticky bottom-0 bg-white pb-2">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-black text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-lg flex items-center justify-center gap-2"
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
