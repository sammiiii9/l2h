'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Sparkles, 
  ArrowUpRight, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Download,
  Filter
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    try {
      const res = await fetch('/api/analytics');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleUpdateLeadStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchSummary();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading || !data) {
    return (
      <div className="p-8 text-center text-slate-400">
        Loading Executive Dashboard...
      </div>
    );
  }

  const { kpis, leadFunnel, sourceBreakdown, topViewed, topLeads, recentLeads } = data;

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Executive Advisory Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time portfolio metrics, active lead CRM pipeline, and scheduled property site visits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/properties"
            className="px-4 py-2.5 rounded-xl bg-gold hover:bg-gold-hover text-charcoal-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </Link>

          <Link
            href="/admin/leads"
            className="px-4 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white font-semibold text-xs transition-colors border border-charcoal-700"
          >
            View Lead Pipeline
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-charcoal-900 rounded-2xl p-5 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Listings</span>
            <Building2 className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {kpis.activeProperties} <span className="text-xs text-slate-400 font-sans font-normal">/ {kpis.totalProperties} Total</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-medium">
            ● All RERA Compliant
          </div>
        </div>

        <div className="bg-charcoal-900 rounded-2xl p-5 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total CRM Leads</span>
            <Users className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {kpis.totalLeads}
          </div>
          <div className="text-[11px] text-gold font-medium">
            Active buyer inquiries
          </div>
        </div>

        <div className="bg-charcoal-900 rounded-2xl p-5 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">VIP Site Visits</span>
            <Calendar className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {kpis.scheduledVisits}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            Escorted tours scheduled
          </div>
        </div>

        <div className="bg-charcoal-900 rounded-2xl p-5 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Lead Conversion</span>
            <TrendingUp className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {kpis.conversionRate}%
          </div>
          <div className="text-[11px] text-emerald-400 font-medium">
            High-intent advisory closure
          </div>
        </div>
      </div>

      {/* 2-Column: Lead Pipeline Funnel & Source Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Pipeline Funnel Stages */}
        <div className="lg:col-span-8 bg-charcoal-900 rounded-3xl p-6 sm:p-8 border border-charcoal-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-gold">
                Active Client Journey
              </span>
              <h3 className="text-lg font-serif font-bold text-white">
                CRM Pipeline Stage Distribution
              </h3>
            </div>
            <Link href="/admin/leads" className="text-xs text-gold hover:underline">
              Open Kanban Board →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            {Object.entries(leadFunnel).map(([status, count]) => (
              <div key={status} className="p-3.5 rounded-2xl bg-charcoal-950 border border-charcoal-800/80 space-y-1">
                <div className="text-[11px] text-slate-400 font-medium truncate">{status}</div>
                <div className="text-xl font-serif font-bold text-white">{count as number}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources Breakdown */}
        <div className="lg:col-span-4 bg-charcoal-900 rounded-3xl p-6 sm:p-8 border border-charcoal-800 space-y-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-gold">
              Attribution
            </span>
            <h3 className="text-lg font-serif font-bold text-white">
              Lead Acquisition Channels
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            {Object.entries(sourceBreakdown).map(([source, count]) => {
              const pct = kpis.totalLeads > 0 ? Math.round(((count as number) / kpis.totalLeads) * 100) : 0;
              return (
                <div key={source} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">{source}</span>
                    <span className="text-gold font-bold">{count as number} ({pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-charcoal-950 rounded-full overflow-hidden">
                    <div style={{ width: `${pct}%` }} className="h-full bg-gold rounded-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-charcoal-900 rounded-3xl p-6 sm:p-8 border border-charcoal-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-gold">
              Live Inquiries
            </span>
            <h3 className="text-lg font-serif font-bold text-white">
              Recent Client Enquiries
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/api/leads?format=csv"
              className="px-3.5 py-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 border border-charcoal-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-gold" />
              <span>Export CSV</span>
            </a>
            <Link
              href="/admin/leads"
              className="text-xs text-gold font-semibold hover:underline"
            >
              View All in CRM →
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-charcoal-950 text-slate-400 uppercase tracking-wider border-b border-charcoal-800">
              <tr>
                <th className="py-3 px-4">Ref ID</th>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Category / Property</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800 text-slate-300">
              {recentLeads.map((lead: any) => (
                <tr key={lead.id} className="hover:bg-charcoal-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-gold">
                    {lead.referenceId}
                  </td>
                  <td className="py-3 px-4 font-medium text-white">
                    {lead.name}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    <div>{lead.phone}</div>
                    <div className="text-[10px] text-slate-500">{lead.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{lead.propertyName || lead.lookingFor || 'General'}</div>
                    <div className="text-[10px] text-slate-500">{lead.preferredLocation || 'NCR'}</div>
                  </td>
                  <td className="py-3 px-4 font-serif font-bold text-slate-200">
                    {lead.budgetDisplay || 'On Request'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      lead.status === 'New'
                        ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                        : lead.status === 'Site Visit'
                        ? 'bg-purple-950 text-purple-300 border border-purple-500/30'
                        : lead.status === 'Converted'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : 'bg-charcoal-800 text-slate-300'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <select
                      value={lead.status}
                      onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                      className="px-2 py-1 rounded-md bg-charcoal-950 border border-charcoal-700 text-[11px] text-slate-300 focus:border-gold focus:outline-none cursor-pointer"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Site Visit">Site Visit</option>
                      <option value="Negotiation">Negotiation</option>
                      <option value="Converted">Converted</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
