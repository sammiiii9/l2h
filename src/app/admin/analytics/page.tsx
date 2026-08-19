'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Compass, Eye, Sparkles, Globe, Target } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return <div className="p-8 text-center text-slate-500">Loading Analytics...</div>;
  }

  const { kpis, leadFunnel, sourceBreakdown, topViewed, topLeads } = data;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
          Advisory Intelligence & Acquisition Analytics
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor traffic channels, UTM campaigns, property interest heatmaps, and funnel velocity.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-charcoal-900 rounded-2xl p-5 border border-charcoal-800 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Inquiries</span>
          <div className="text-2xl font-serif font-bold text-white">{kpis.totalLeads}</div>
          <div className="text-[11px] text-gold">100% Verified Phone/WhatsApp</div>
        </div>

        <div className="bg-charcoal-900 rounded-2xl p-5 border border-charcoal-800 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Site Visit Conversion</span>
          <div className="text-2xl font-serif font-bold text-emerald-400">
            {kpis.totalLeads > 0 ? (((kpis.scheduledVisits || 1) / kpis.totalLeads) * 100).toFixed(1) : 0}%
          </div>
          <div className="text-[11px] text-slate-400">Inquiry to Escorted Tour</div>
        </div>

        <div className="bg-charcoal-900 rounded-2xl p-5 border border-charcoal-800 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Top Micro-Market</span>
          <div className="text-xl font-serif font-bold text-white">Sector 150 & Expressway</div>
          <div className="text-[11px] text-slate-400">Noida Luxury Corridor</div>
        </div>

        <div className="bg-charcoal-900 rounded-2xl p-5 border border-charcoal-800 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Top Acquisition</span>
          <div className="text-xl font-serif font-bold text-white">Direct & Search</div>
          <div className="text-[11px] text-slate-400">Organic High Intent</div>
        </div>
      </div>

      {/* 2-Column: Most Inquired Properties vs Channel Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Most Inquired Listings */}
        <div className="lg:col-span-6 bg-charcoal-900 rounded-3xl p-6 sm:p-8 border border-charcoal-800 space-y-4">
          <span className="text-xs font-bold text-gold uppercase tracking-wider block">
            Most Inquired Projects
          </span>
          <div className="divide-y divide-charcoal-800">
            {topLeads.map((prop: any, idx: number) => (
              <div key={prop.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-gold">#{idx + 1}</span>
                  <div>
                    <div className="text-xs font-bold text-white">{prop.title}</div>
                    <div className="text-[10px] text-slate-400">{prop.location.locality}, {prop.location.city}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gold">{prop.leadsCount || 0} Inquiries</span>
                  <div className="text-[10px] text-slate-500">{prop.viewsCount || 0} views</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources & UTM Tracking */}
        <div className="lg:col-span-6 bg-charcoal-900 rounded-3xl p-6 sm:p-8 border border-charcoal-800 space-y-4">
          <span className="text-xs font-bold text-gold uppercase tracking-wider block">
            UTM & Channel Attribution
          </span>
          <div className="space-y-3 pt-2">
            {Object.entries(sourceBreakdown).map(([source, count]) => {
              const pct = kpis.totalLeads > 0 ? Math.round(((count as number) / kpis.totalLeads) * 100) : 0;
              return (
                <div key={source} className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-white">{source}</span>
                    <span className="font-bold text-gold">{count as number} Leads ({pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-charcoal-800 rounded-full overflow-hidden">
                    <div style={{ width: `${pct}%` }} className="h-full bg-gold rounded-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
