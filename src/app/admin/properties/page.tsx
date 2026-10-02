'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Copy, 
  Sparkles, 
  ExternalLink, 
  X, 
  Check, 
  Loader2,
  Filter,
  Eye,
  Mail
} from 'lucide-react';
import Link from 'next/link';
import { Property, PropertyStatus, PropertyCategory, PropertyType, PossessionStatus } from '@/types';
import { formatPrice, formatIndianNumber } from '@/lib/utils';
import PropertyImageUploader from '@/components/admin/PropertyImageUploader';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal State for Add / Edit Property
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProp, setEditingProp] = useState<Property | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [form, setForm] = useState<any>({
    title: '',
    tagline: '',
    price: 25000000,
    priceDisplay: '₹2.50 Cr onwards',
    pricePerSqFt: 10000,
    propertyType: 'Apartment',
    category: 'Apartments',
    configuration: '3 BHK Luxury Suite',
    bedrooms: 3,
    bathrooms: 3,
    superArea: 2400,
    carpetArea: 1950,
    areaUnit: 'sq.ft.',
    possessionStatus: 'Ready to Move',
    reraNumber: 'UPRERAPRJ' + Math.floor(1000 + Math.random() * 9000),
    developer: {
      name: 'Tier-1 Luxury Developer',
      experienceYears: 25,
      totalProjects: 30
    },
    location: {
      address: 'Noida Expressway',
      locality: 'Sector 150',
      sector: 'Sector 150',
      city: 'Noida',
      state: 'Uttar Pradesh'
    },
    highlights: ['Zero vehicle surface movement', 'Over 80% open green landscapes', 'Dedicated concierge desk'],
    amenities: [
      { name: 'Clubhouse', category: 'Lifestyle' },
      { name: 'Swimming Pool', category: 'Wellness' },
      { name: '3-Tier Security', category: 'Security' }
    ],
    connectivity: [
      { destination: 'Nearest Metro Station', distance: '1.5 km', time: '3 mins', type: 'Metro' },
      { destination: 'Expressway Interchange', distance: '0.8 km', time: '2 mins', type: 'Highway' }
    ],
    floorPlans: [
      { title: 'Standard 3 BHK Suite', bhk: '3 BHK', superArea: '2,400 sq.ft.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80', caption: 'Front facade' }
    ],
    isFeatured: true,
    status: 'Active'
  });

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/properties?allStatus=true');
      const data = await res.json();
      setProperties(data.properties || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const openAddModal = () => {
    setEditingProp(null);
    setForm({
      title: '',
      tagline: '',
      price: 25000000,
      priceDisplay: '₹2.50 Cr onwards',
      pricePerSqFt: 10000,
      propertyType: 'Apartment',
      category: 'Apartments',
      configuration: '3 BHK Luxury Suite',
      bedrooms: 3,
      bathrooms: 3,
      superArea: 2400,
      carpetArea: 1950,
      areaUnit: 'sq.ft.',
      possessionStatus: 'Ready to Move',
      reraNumber: 'UPRERAPRJ' + Math.floor(1000 + Math.random() * 9000),
      developer: { name: 'Tier-1 Luxury Developer', experienceYears: 25, totalProjects: 30 },
      location: { address: 'Noida Expressway', locality: 'Sector 150', sector: 'Sector 150', city: 'Noida', state: 'Uttar Pradesh' },
      highlights: ['Zero vehicle surface movement', 'Over 80% open green landscapes', 'Dedicated concierge desk'],
      amenities: [
        { name: 'Clubhouse', category: 'Lifestyle' },
        { name: 'Swimming Pool', category: 'Wellness' },
        { name: '3-Tier Security', category: 'Security' }
      ],
      connectivity: [
        { destination: 'Nearest Metro Station', distance: '1.5 km', time: '3 mins', type: 'Metro' },
        { destination: 'Expressway Interchange', distance: '0.8 km', time: '2 mins', type: 'Highway' }
      ],
      floorPlans: [
        { title: 'Standard 3 BHK Suite', bhk: '3 BHK', superArea: '2,400 sq.ft.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' }
      ],
      images: [
        { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80', caption: 'Front facade' }
      ],
      isFeatured: true,
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prop: Property) => {
    setEditingProp(prop);
    setForm({ ...prop });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingProp) {
        // Update
        await fetch(`/api/properties/${editingProp.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
      } else {
        // Create
        await fetch('/api/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
      }
      setIsModalOpen(false);
      fetchProperties();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      await fetch(`/api/properties/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'duplicate' })
      });
      fetchProperties();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    try {
      await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      fetchProperties();
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleFeatured = async (prop: Property) => {
    try {
      await fetch(`/api/properties/${prop.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !prop.isFeatured })
      });
      fetchProperties();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredProperties = properties.filter((p) => {
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.location.locality.toLowerCase().includes(q) || p.developer.name.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Property Inventory Management (CMS)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, update, feature, duplicate, and manage all luxury listings across Delhi NCR.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-5 py-3 rounded-xl bg-gold hover:bg-gold-hover text-charcoal-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-charcoal-900 p-4 rounded-2xl border border-charcoal-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, locality, developer..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-charcoal-950 border border-charcoal-700 text-xs text-white placeholder-slate-500 focus:border-gold focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-charcoal-950 border border-charcoal-700 text-xs text-slate-300 focus:border-gold focus:outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Sold Out">Sold Out</option>
            <option value="Coming Soon">Coming Soon</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-charcoal-950 border border-charcoal-700 text-xs text-slate-300 focus:border-gold focus:outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Apartments">Luxury Apartments</option>
            <option value="Villas">Villas</option>
            <option value="Plots">Land & Plots</option>
            <option value="Commercial">Commercial</option>
            <option value="Luxury Properties">Trophy Properties</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing <span className="text-gold font-bold">{filteredProperties.length}</span> listings
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-charcoal-900 rounded-3xl border border-charcoal-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-charcoal-950 text-slate-400 uppercase tracking-wider border-b border-charcoal-800">
              <tr>
                <th className="py-3.5 px-4">Property Details</th>
                <th className="py-3.5 px-4">Category & Type</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Views / Leads</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">Loading listings...</td>
                </tr>
              ) : filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">No properties found.</td>
                </tr>
              ) : (
                filteredProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-charcoal-800/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.images[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=100&q=80'}
                          alt={prop.title}
                          className="w-12 h-12 rounded-xl object-cover ring-1 ring-charcoal-700 shrink-0"
                        />
                        <div className="space-y-0.5">
                          <div className="font-serif font-bold text-white line-clamp-1">{prop.title}</div>
                          <div className="text-[11px] text-slate-400">{prop.developer.name} • {prop.configuration}</div>
                          <div className="text-[10px] text-gold font-mono">{prop.reraNumber}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-200">{prop.category}</div>
                      <div className="text-[10px] text-slate-400">{prop.propertyType}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-white font-medium">{prop.location.locality}</div>
                      <div className="text-[10px] text-slate-400">{prop.location.city}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-serif font-bold text-white">{prop.priceDisplay || formatPrice(prop.price)}</div>
                      <div className="text-[10px] text-slate-400">{formatIndianNumber(prop.superArea)} sq.ft.</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        prop.status === 'Active'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : prop.status === 'Draft'
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                      }`}>
                        {prop.status}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-slate-300 flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-slate-400" /> {prop.viewsCount || 0}</span>
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-400" /> {prop.leadsCount || 0}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(prop)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            prop.isFeatured ? 'bg-gold/20 text-gold border-gold/40' : 'bg-charcoal-800 text-slate-500 border-charcoal-700'
                          }`}
                          title="Toggle Featured"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>

                        <Link
                          href={`/properties/${prop.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-charcoal-800 text-slate-300 hover:text-white border border-charcoal-700 transition-colors"
                          title="View Live Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => openEditModal(prop)}
                          className="p-1.5 rounded-lg bg-charcoal-800 text-slate-300 hover:text-gold border border-charcoal-700 transition-colors"
                          title="Edit Property"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDuplicate(prop.id)}
                          className="p-1.5 rounded-lg bg-charcoal-800 text-slate-300 hover:text-white border border-charcoal-700 transition-colors"
                          title="Duplicate Listing"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(prop.id)}
                          className="p-1.5 rounded-lg bg-charcoal-800 text-slate-300 hover:text-red-400 border border-charcoal-700 transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Property Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="bg-charcoal-900 border border-gold/30 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-white">
            <div className="flex items-center justify-between pb-4 border-b border-charcoal-800">
              <h2 className="text-xl font-serif font-bold text-white">
                {editingProp ? 'Edit Property Listing' : 'Add New Luxury Property Listing'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Property Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. ATS Knightsbridge Ultra Luxury Residences"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Tagline / Subtitle</label>
                  <input
                    type="text"
                    value={form.tagline}
                    onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                    placeholder="e.g. Iconic 47-Storey Sky Villas on Noida Expressway"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Price (in INR Number) *</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Price Display String</label>
                  <input
                    type="text"
                    value={form.priceDisplay}
                    onChange={(e) => setForm({ ...form, priceDisplay: e.target.value })}
                    placeholder="e.g. ₹9.20 Cr onwards"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">RERA Number *</label>
                  <input
                    type="text"
                    required
                    value={form.reraNumber}
                    onChange={(e) => setForm({ ...form, reraNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  >
                    <option value="Apartments">Apartments</option>
                    <option value="Villas">Villas</option>
                    <option value="Plots">Plots</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Farmhouses">Farmhouses</option>
                    <option value="Luxury Properties">Luxury Properties</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Property Type</label>
                  <select
                    value={form.propertyType}
                    onChange={(e) => setForm({ ...form, propertyType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Plot">Plot</option>
                    <option value="Office">Office</option>
                    <option value="Farmhouse">Farmhouse</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Possession Status</label>
                  <select
                    value={form.possessionStatus}
                    onChange={(e) => setForm({ ...form, possessionStatus: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  >
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="New Launch">New Launch</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Configuration</label>
                  <input
                    type="text"
                    value={form.configuration}
                    onChange={(e) => setForm({ ...form, configuration: e.target.value })}
                    placeholder="e.g. 4 BHK + Servant"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Super Area (sq.ft.)</label>
                  <input
                    type="number"
                    value={form.superArea}
                    onChange={(e) => setForm({ ...form, superArea: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Sold Out">Sold Out</option>
                    <option value="Coming Soon">Coming Soon</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={form.location?.city || 'Noida'}
                    onChange={(e) => setForm({ ...form, location: { ...form.location, city: e.target.value } })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Locality / Sector</label>
                  <input
                    type="text"
                    value={form.location?.locality || 'Sector 150'}
                    onChange={(e) => setForm({ ...form, location: { ...form.location, locality: e.target.value } })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Developer Name</label>
                  <input
                    type="text"
                    value={form.developer?.name || 'Developer Name'}
                    onChange={(e) => setForm({ ...form, developer: { ...form.developer, name: e.target.value } })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Verification & L2H Perspective Admin Controls */}
              <div className="p-4 rounded-2xl bg-charcoal-950 border border-charcoal-800 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-charcoal-800">
                  <span className="text-gold font-bold uppercase tracking-wider text-[11px]">
                    L2H Advisory Perspective &amp; Verification
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Verification Status</label>
                    <select
                      value={form.verificationStatus || 'Verified'}
                      onChange={(e) => setForm({ ...form, verificationStatus: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                    >
                      <option value="Verified">Verified (Official RERA &amp; Title Checked)</option>
                      <option value="Developer Provided">Developer Provided</option>
                      <option value="Partially Verified">Partially Verified</option>
                      <option value="Information Pending Verification">Information Pending Verification</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Recommended Best For (Comma-separated)</label>
                    <input
                      type="text"
                      value={form.l2hPerspective?.bestFor?.join(', ') || 'End Use, Luxury'}
                      onChange={(e) => setForm({ 
                        ...form, 
                        l2hPerspective: { 
                          ...(form.l2hPerspective || {}), 
                          bestFor: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                        } 
                      })}
                      placeholder="e.g. End Use, High Yield, Luxury, Freehold"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">What We Like (Advisory Strengths)</label>
                  <textarea
                    rows={2}
                    value={form.l2hPerspective?.whatWeLike?.join('\n') || ''}
                    onChange={(e) => setForm({
                      ...form,
                      l2hPerspective: {
                        ...(form.l2hPerspective || {}),
                        whatWeLike: e.target.value.split('\n').filter(Boolean)
                      }
                    })}
                    placeholder="Enter key advisory points (one per line)"
                    className="w-full px-3.5 py-2 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none resize-none font-sans"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">What To Consider (Advisory Cautions)</label>
                  <textarea
                    rows={2}
                    value={form.l2hPerspective?.whatToConsider?.join('\n') || ''}
                    onChange={(e) => setForm({
                      ...form,
                      l2hPerspective: {
                        ...(form.l2hPerspective || {}),
                        whatToConsider: e.target.value.split('\n').filter(Boolean)
                      }
                    })}
                    placeholder="Enter potential risks or holding considerations (one per line)"
                    className="w-full px-3.5 py-2 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none resize-none font-sans"
                  />
                </div>
              </div>

              {/* Direct Multi-Image Photo Upload Section */}
              <div className="p-4 rounded-2xl bg-charcoal-950 border border-charcoal-800 space-y-3">
                <PropertyImageUploader
                  images={form.images || []}
                  onChange={(newImages) => setForm({ ...form, images: newImages })}
                  maxImages={8}
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-charcoal-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-charcoal-800 text-slate-300 font-semibold hover:bg-charcoal-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-hover text-charcoal-950 font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>{editingProp ? 'Update Listing' : 'Publish Property'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
