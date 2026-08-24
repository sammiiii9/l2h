'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Plus, 
  Phone, 
  Mail, 
  Star, 
  Briefcase, 
  ArrowLeft, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  TrendingUp 
} from 'lucide-react';
import { Advisor } from '@/types';

export default function AdminAdvisorsPage() {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAdvisor, setEditingAdvisor] = useState<Partial<Advisor> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAdvisors = async () => {
    try {
      const res = await fetch('/api/advisors');
      const data = await res.json();
      if (data.success) {
        setAdvisors(data.advisors);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvisors();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAdvisor?.name || !editingAdvisor?.email) return;

    try {
      await fetch('/api/advisors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingAdvisor,
          role: editingAdvisor.role || 'Senior Real Estate Strategist',
          phone: editingAdvisor.phone || '+91 8439654385',
          avatar: editingAdvisor.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          bio: editingAdvisor.bio || 'Advisory specialist for prime Delhi NCR real estate.',
          specialization: editingAdvisor.specialization || ['Luxury Homes', 'Commercial Assets'],
          activeLeadsCount: 0,
          rating: 4.9,
          totalDealsClosed: 0,
          status: 'Active'
        })
      });

      setIsModalOpen(false);
      setEditingAdvisor(null);
      fetchAdvisors();
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
              Advisors &amp; Lead Allocation Desk
            </h1>
            <p className="text-xs text-slate-400">
              Manage senior property strategists, performance ratings, active pipeline allocations, and deal attribution.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingAdvisor({
                name: '',
                role: 'Senior Real Estate Strategist',
                email: '',
                phone: '+91 ',
                specialization: ['Luxury Apartments', 'Commercial Yield']
              });
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-hover text-charcoal-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Advisor</span>
          </button>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advisors.map((adv) => (
            <div
              key={adv.id}
              className="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 space-y-5 hover:border-gold/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={adv.avatar}
                    alt={adv.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-gold/40"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-serif font-bold text-white text-base">{adv.name}</h3>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" title="Active" />
                    </div>
                    <div className="text-xs text-gold">{adv.role}</div>
                    <div className="flex items-center gap-1 text-[11px] text-amber-400 mt-0.5">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{adv.rating} Client Rating</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {adv.bio}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-charcoal-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span className="truncate">{adv.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>{adv.phone}</span>
                  </div>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">Specialization:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {adv.specialization.map((spec, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded-md bg-charcoal-950 text-slate-300 text-[10px] font-semibold border border-charcoal-800">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-charcoal-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Active Pipeline</span>
                  <span className="font-bold text-white text-sm">{adv.activeLeadsCount} Leads</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Deals Closed</span>
                  <span className="font-bold text-gold text-sm">{adv.totalDealsClosed} Completed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && editingAdvisor && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="bg-charcoal-900 border border-gold/30 rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-6 text-white animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
              <h3 className="text-lg font-serif font-bold text-white">Add New Advisory Strategist</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Advisor Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingAdvisor.name || ''}
                  onChange={(e) => setEditingAdvisor({ ...editingAdvisor, name: e.target.value })}
                  placeholder="e.g. Siddharth Kapoor"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Role Title</label>
                  <input
                    type="text"
                    value={editingAdvisor.role || ''}
                    onChange={(e) => setEditingAdvisor({ ...editingAdvisor, role: e.target.value })}
                    placeholder="Senior Luxury Strategist"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editingAdvisor.phone || ''}
                    onChange={(e) => setEditingAdvisor({ ...editingAdvisor, phone: e.target.value })}
                    placeholder="+91 98112 34567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Official Email *</label>
                <input
                  type="email"
                  required
                  value={editingAdvisor.email || ''}
                  onChange={(e) => setEditingAdvisor({ ...editingAdvisor, email: e.target.value })}
                  placeholder="siddharth.k@l2hsolution.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Professional Advisory Bio</label>
                <textarea
                  rows={2}
                  value={editingAdvisor.bio || ''}
                  onChange={(e) => setEditingAdvisor({ ...editingAdvisor, bio: e.target.value })}
                  placeholder="10+ years specializing in high-growth NCR corridors and institutional investor portfolios."
                  className="w-full px-3.5 py-2 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none resize-none"
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
                  Save Advisor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
