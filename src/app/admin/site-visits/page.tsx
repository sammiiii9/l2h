'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Clock, User, Phone, MapPin, CheckCircle2, XCircle, Search } from 'lucide-react';
import { SiteVisit } from '@/types';

export default function AdminSiteVisitsPage() {
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchVisits = async () => {
    try {
      const res = await fetch('/api/site-visits');
      const data = await res.json();
      setVisits(data.visits || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/site-visits/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setVisits(visits.map(v => v.id === id ? { ...v, status: newStatus as any } : v));
    } catch (e) {
      console.error(e);
    }
  };

  const filteredVisits = visits.filter(v => {
    if (statusFilter !== 'All' && v.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            VIP Site Visits Scheduler
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Coordinate chauffeured site inspections, assign lead advisors, and record client feedback.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-charcoal-900 p-4 rounded-2xl border border-charcoal-800 flex items-center justify-between gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-charcoal-950 border border-charcoal-700 text-xs text-slate-300 focus:border-gold focus:outline-none cursor-pointer"
        >
          <option value="All">All Visit Statuses</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Rescheduled">Rescheduled</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <div className="text-xs text-slate-400 font-medium">
          Total Scheduled: <span className="text-gold font-bold">{filteredVisits.length}</span>
        </div>
      </div>

      {/* Visits Table */}
      <div className="bg-charcoal-900 rounded-3xl border border-charcoal-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-charcoal-950 text-slate-400 uppercase tracking-wider border-b border-charcoal-800">
              <tr>
                <th className="py-3.5 px-4">Visit Ref</th>
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Target Property</th>
                <th className="py-3.5 px-4">Date & Slot</th>
                <th className="py-3.5 px-4">Assigned Advisor</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800 text-slate-300">
              {filteredVisits.map((v) => (
                <tr key={v.id} className="hover:bg-charcoal-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-gold">
                    {v.referenceId}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{v.clientName}</div>
                    <div className="text-[11px] text-slate-400">{v.clientPhone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{v.propertyName}</div>
                    <div className="text-[10px] text-slate-500">{v.propertyLocation}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-white font-medium">{v.visitDate}</div>
                    <div className="text-[10px] text-gold">{v.timeSlot}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {v.assignedAdvisor || 'Senior Advisor'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      v.status === 'Scheduled'
                        ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                        : v.status === 'Completed'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : 'bg-charcoal-800 text-slate-400'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <select
                      value={v.status}
                      onChange={(e) => handleUpdateStatus(v.id, e.target.value)}
                      className="px-2 py-1 rounded-md bg-charcoal-950 border border-charcoal-700 text-[11px] text-slate-300 focus:border-gold focus:outline-none cursor-pointer"
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Rescheduled">Rescheduled</option>
                      <option value="Cancelled">Cancelled</option>
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
