'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  Plus, 
  MapPin, 
  Trash2, 
  Edit3, 
  TrendingUp, 
  ArrowLeft, 
  CheckCircle2, 
  X, 
  Save, 
  Building2 
} from 'lucide-react';
import { LocationHub } from '@/types';

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<LocationHub[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLoc, setEditingLoc] = useState<Partial<LocationHub> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLocations = async () => {
    try {
      const res = await fetch('/api/locations');
      const data = await res.json();
      if (data.success) {
        setLocations(data.locations);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLoc?.name || !editingLoc?.slug) return;

    try {
      await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingLoc,
          city: editingLoc.city || 'Noida',
          state: editingLoc.state || 'Uttar Pradesh',
          heroImage: editingLoc.heroImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
          popularMicroMarkets: editingLoc.popularMicroMarkets || ['Sector 150', 'Sector 128'],
          connectivityHighlights: editingLoc.connectivityHighlights || ['Direct expressway access', 'Aqua Line Metro'],
          lifestyleAndSocialInfra: editingLoc.lifestyleAndSocialInfra || ['Top international schools', 'Multi-specialty hospitals']
        })
      });

      setIsModalOpen(false);
      setEditingLoc(null);
      fetchLocations();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-charcoal-950 min-h-screen text-slate-200 py-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link href="/admin" className="text-xs text-slate-400 hover:text-gold flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Admin Dashboard</span>
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Location Hubs &amp; Corridor Intelligence CMS
            </h1>
            <p className="text-xs text-slate-400">
              Manage growth corridors, price valuation benchmarks, transit matrices, and local FAQs.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingLoc({
                name: '',
                slug: '',
                city: 'Noida',
                state: 'Uttar Pradesh',
                priceRange: '₹1.5 Cr – ₹8 Cr',
                avgPricePerSqFt: '₹10,500 / sq.ft.',
                growthRateYoY: '+15.2% YoY',
                overview: '',
                investmentOutlook: ''
              });
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-hover text-charcoal-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Corridor</span>
          </button>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 space-y-4 hover:border-gold/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-40 rounded-2xl overflow-hidden relative bg-charcoal-950">
                  <img
                    src={loc.heroImage}
                    alt={loc.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[10px] text-gold uppercase font-bold">{loc.city}</span>
                    <h3 className="text-base font-serif font-bold">{loc.name}</h3>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Slug:</span>
                    <span className="font-mono text-slate-300">/locations/{loc.slug}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Valuation:</span>
                    <span className="font-bold text-gold">{loc.avgPricePerSqFt}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>YoY Velocity:</span>
                    <span className="font-bold text-emerald-400">{loc.growthRateYoY}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {loc.overview}
                </p>
              </div>

              <div className="pt-3 border-t border-charcoal-800 flex items-center justify-between">
                <Link
                  href={`/locations/${loc.slug}`}
                  target="_blank"
                  className="text-xs text-gold hover:underline font-semibold"
                >
                  View Public Page →
                </Link>
                <span className="text-[11px] text-slate-500">{loc.popularMicroMarkets?.length || 0} micro-markets</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && editingLoc && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="bg-charcoal-900 border border-gold/30 rounded-3xl w-full max-w-2xl p-6 sm:p-8 space-y-6 text-white animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
              <h3 className="text-lg font-serif font-bold text-white">
                {editingLoc.id ? 'Edit Corridor Hub' : 'Add New Corridor Hub'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Corridor Name *</label>
                  <input
                    type="text"
                    required
                    value={editingLoc.name || ''}
                    onChange={(e) => setEditingLoc({ ...editingLoc, name: e.target.value })}
                    placeholder="e.g. Golf Course Extension Road"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingLoc.slug || ''}
                    onChange={(e) => setEditingLoc({ ...editingLoc, slug: e.target.value })}
                    placeholder="e.g. golf-course-extension-road"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={editingLoc.city || ''}
                    onChange={(e) => setEditingLoc({ ...editingLoc, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Avg Price / sq.ft.</label>
                  <input
                    type="text"
                    value={editingLoc.avgPricePerSqFt || ''}
                    onChange={(e) => setEditingLoc({ ...editingLoc, avgPricePerSqFt: e.target.value })}
                    placeholder="₹12,500 / sq.ft."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">YoY Growth %</label>
                  <input
                    type="text"
                    value={editingLoc.growthRateYoY || ''}
                    onChange={(e) => setEditingLoc({ ...editingLoc, growthRateYoY: e.target.value })}
                    placeholder="+16.4% YoY"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Corridor Overview & Masterplan Analysis</label>
                <textarea
                  rows={3}
                  value={editingLoc.overview || ''}
                  onChange={(e) => setEditingLoc({ ...editingLoc, overview: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-charcoal-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-hover text-charcoal-950 font-bold uppercase tracking-wider shadow-md"
                >
                  Save Corridor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
