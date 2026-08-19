'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  LayoutGrid, 
  List, 
  Clock, 
  X, 
  CheckCircle2, 
  Send,
  Trash2,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Lead, LeadStatus } from '@/types';
import { createWhatsAppUrl } from '@/lib/utils';

const STAGES: LeadStatus[] = [
  'New',
  'Contacted',
  'Qualified',
  'Site Visit',
  'Negotiation',
  'Converted',
  'Lost'
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNote, setNewNote] = useState('');

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: LeadStatus) => {
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchLeads();
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNote.trim()) return;

    try {
      const res = await fetch(`/api/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          note: {
            author: 'Advisor Vikram',
            text: newNote.trim()
          }
        })
      });
      const data = await res.json();
      if (data.lead) {
        setSelectedLead(data.lead);
        setNewNote('');
        fetchLeads();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      setSelectedLead(null);
      fetchLeads();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredLeads = leads.filter((l) => {
    if (sourceFilter !== 'All' && l.source.toLowerCase() !== sourceFilter.toLowerCase()) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.referenceId.toLowerCase().includes(q) ||
        (l.propertyName && l.propertyName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Lead CRM Pipeline
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage high-intent client inquiries across lifecycle stages from discovery to conversion.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggles */}
          <div className="flex items-center bg-charcoal-900 rounded-xl p-1 border border-charcoal-800">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'kanban' ? 'bg-gold text-charcoal-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kanban Board</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'table' ? 'bg-gold text-charcoal-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Data Table</span>
            </button>
          </div>

          <a
            href="/api/leads?format=csv"
            className="px-4 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white font-semibold text-xs flex items-center gap-1.5 border border-charcoal-700 transition-colors"
          >
            <Download className="w-4 h-4 text-gold" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-charcoal-900 p-4 rounded-2xl border border-charcoal-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client name, phone, ref ID..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-charcoal-950 border border-charcoal-700 text-xs text-white placeholder-slate-500 focus:border-gold focus:outline-none"
            />
          </div>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-charcoal-950 border border-charcoal-700 text-xs text-slate-300 focus:border-gold focus:outline-none cursor-pointer"
          >
            <option value="All">All Lead Sources</option>
            <option value="Website">Website Form</option>
            <option value="Property Page">Property Detail Page</option>
            <option value="Campaign">Marketing Campaign</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Total Leads: <span className="text-gold font-bold">{filteredLeads.length}</span>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 overflow-x-auto pb-6">
          {STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.status === stage);
            return (
              <div
                key={stage}
                className="bg-charcoal-900 rounded-2xl p-4 border border-charcoal-800 flex flex-col min-w-[240px] space-y-3"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-charcoal-800">
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    {stage}
                  </span>
                  <span className="w-5 h-5 rounded-full bg-charcoal-950 text-gold text-[10px] font-bold flex items-center justify-center border border-charcoal-800">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Lead Cards in Stage */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                  {stageLeads.length === 0 ? (
                    <div className="py-6 text-center text-slate-600 text-[11px] italic">
                      No leads
                    </div>
                  ) : (
                    stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="bg-charcoal-950 rounded-xl p-3.5 border border-charcoal-800 hover:border-gold/50 shadow-sm hover:shadow-md cursor-pointer transition-all space-y-2 group"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-mono font-bold text-gold">{lead.referenceId}</span>
                          <span className="text-slate-500">{lead.source}</span>
                        </div>

                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-gold transition-colors truncate">
                            {lead.name}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">{lead.phone}</div>
                        </div>

                        <div className="pt-1 text-[11px] text-slate-300">
                          <div className="truncate font-medium">{lead.propertyName || lead.lookingFor || 'General Inquiry'}</div>
                          <div className="text-gold font-serif font-bold text-xs mt-0.5">{lead.budgetDisplay || 'Price on request'}</div>
                        </div>

                        <div className="pt-2 border-t border-charcoal-900 flex items-center justify-between text-[10px] text-slate-500">
                          <span>{lead.timeline || '1-3 mo'}</span>
                          <span>{new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DATA TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-charcoal-900 rounded-3xl border border-charcoal-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-charcoal-950 text-slate-400 uppercase tracking-wider border-b border-charcoal-800">
                <tr>
                  <th className="py-3.5 px-4">Ref ID</th>
                  <th className="py-3.5 px-4">Client Name</th>
                  <th className="py-3.5 px-4">Contact Details</th>
                  <th className="py-3.5 px-4">Requirements</th>
                  <th className="py-3.5 px-4">Budget</th>
                  <th className="py-3.5 px-4">Source</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800 text-slate-300">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-charcoal-800/50 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-gold">
                      {lead.referenceId}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">
                      {lead.name}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      <div>{lead.phone}</div>
                      <div className="text-[10px]">{lead.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-white font-medium truncate max-w-[200px]">{lead.propertyName || lead.lookingFor}</div>
                      <div className="text-[10px] text-slate-500">{lead.preferredLocation}</div>
                    </td>
                    <td className="py-3 px-4 font-serif font-bold text-slate-200">
                      {lead.budgetDisplay || 'On Request'}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {lead.source}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        lead.status === 'New'
                          ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                          : lead.status === 'Converted'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : 'bg-charcoal-800 text-slate-300'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                        className="px-2 py-1 rounded-md bg-charcoal-950 border border-charcoal-700 text-[11px] text-slate-300 focus:border-gold focus:outline-none cursor-pointer"
                      >
                        {STAGES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detailed Lead Drawer / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="bg-charcoal-900 border border-gold/30 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-white">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-charcoal-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-gold">{selectedLead.referenceId}</span>
                  <span className="text-xs text-slate-400">• Source: {selectedLead.source}</span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-white">
                  {selectedLead.name}
                </h2>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Contact Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <a
                href={`tel:${selectedLead.phone}`}
                className="py-2.5 px-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-charcoal-700"
              >
                <Phone className="w-3.5 h-3.5 text-gold" />
                <span>Call Client</span>
              </a>

              <a
                href={createWhatsAppUrl({
                  phone: selectedLead.phone,
                  customMessage: `Hi ${selectedLead.name}, this is Vikram from L2H Solution regarding your inquiry ${selectedLead.referenceId}.`
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`mailto:${selectedLead.email}`}
                className="py-2.5 px-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-charcoal-700 col-span-2 sm:col-span-1"
              >
                <Mail className="w-3.5 h-3.5 text-gold" />
                <span>Email Dossier</span>
              </a>
            </div>

            {/* Lifecycle Stage Switcher */}
            <div className="p-4 rounded-2xl bg-charcoal-950 border border-charcoal-800 space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Update Pipeline Status:
              </span>
              <div className="flex flex-wrap gap-2">
                {STAGES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleUpdateStatus(selectedLead.id, s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedLead.status === s
                        ? 'bg-gold text-charcoal-950 font-bold'
                        : 'bg-charcoal-800 text-slate-300 hover:bg-charcoal-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Requirement Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-800 space-y-1">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Property of Interest</span>
                <div className="font-bold text-white">{selectedLead.propertyName || selectedLead.lookingFor || 'General Portfolio'}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-800 space-y-1">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Budget Range</span>
                <div className="font-bold text-gold font-serif">{selectedLead.budgetDisplay || 'On Request'}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-800 space-y-1">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Preferred Location</span>
                <div className="font-bold text-white">{selectedLead.preferredLocation || 'Delhi NCR'}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-800 space-y-1">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Timeline & Purpose</span>
                <div className="font-bold text-white">{selectedLead.timeline} • {selectedLead.purpose}</div>
              </div>
            </div>

            {selectedLead.message && (
              <div className="p-4 rounded-xl bg-charcoal-950 border border-charcoal-800 space-y-1 text-xs">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Client's Message:</span>
                <p className="text-slate-300 italic">{selectedLead.message}</p>
              </div>
            )}

            {/* Internal Notes History */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Internal Advisory Notes & Log
              </span>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a client note (e.g. Visited Sector 150 on Saturday, likes 3 BHK tower B)..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-charcoal-950 border border-charcoal-700 text-xs text-white placeholder-slate-500 focus:border-gold focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gold text-charcoal-950 font-bold text-xs uppercase tracking-wider"
                >
                  Post Note
                </button>
              </form>

              {/* Notes List */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedLead.notes && selectedLead.notes.length > 0 ? (
                  selectedLead.notes.map((n) => (
                    <div key={n.id} className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 text-xs space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span className="text-gold font-semibold">{n.author}</span>
                        <span>{new Date(n.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-300">{n.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500 text-xs italic py-2">No notes logged yet.</div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-charcoal-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleDeleteLead(selectedLead.id)}
                className="text-red-400 hover:text-red-300 text-xs font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2 rounded-xl bg-charcoal-800 text-white text-xs font-semibold hover:bg-charcoal-700"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
