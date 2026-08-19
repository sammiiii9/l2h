'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Plus, 
  Download, 
  Trash2, 
  Edit3, 
  ArrowLeft, 
  CheckCircle2, 
  X, 
  Save, 
  FileText 
} from 'lucide-react';
import { MarketReport } from '@/types';

export default function AdminMarketReportsPage() {
  const [reports, setReports] = useState<MarketReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReport, setEditingReport] = useState<Partial<MarketReport> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/market-reports');
      const data = await res.json();
      if (data.success) {
        setReports(data.reports);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReport?.title || !editingReport?.slug) return;

    try {
      await fetch('/api/market-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingReport,
          coverImage: editingReport.coverImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
          period: editingReport.period || '2026 Research Edition',
          location: editingReport.location || 'Delhi NCR',
          pdfFileSize: editingReport.pdfFileSize || '4.5 MB',
          publishedAt: new Date().toISOString(),
          keyTakeaways: editingReport.keyTakeaways || [
            'Corridor capital appreciation sustained at 16%+ YoY.',
            'Infrastructure milestones drive institutional GCC expansion.'
          ],
          sections: [
            {
              title: 'Macro Economic Overview',
              content: 'Comprehensive micro-market supply, absorption rates, and yield benchmarks.'
            }
          ]
        })
      });

      setIsModalOpen(false);
      setEditingReport(null);
      fetchReports();
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
              Market Intelligence Research Dossiers CMS
            </h1>
            <p className="text-xs text-slate-400">
              Publish macroeconomic research briefs, track lead downloads, and manage institutional publications.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingReport({
                title: '',
                slug: '',
                subtitle: '',
                period: 'Q2 2026 Advisory Brief',
                location: 'Noida & Gurugram',
                pdfFileSize: '4.8 MB'
              });
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-hover text-charcoal-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Report</span>
          </button>
        </div>

        {/* Reports Table / List */}
        <div className="bg-charcoal-900 rounded-3xl border border-charcoal-800 overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-charcoal-950 text-slate-400 uppercase tracking-wider border-b border-charcoal-800">
              <tr>
                <th className="p-4">Report Title</th>
                <th className="p-4">Period</th>
                <th className="p-4">Coverage</th>
                <th className="p-4">Downloads</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800">
              {reports.map((r) => (
                <tr key={r.id} className="hover:bg-charcoal-850 transition-colors">
                  <td className="p-4 font-semibold text-white">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-gold shrink-0" />
                      <div>
                        <div className="font-serif text-sm">{r.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono">/market-reports</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">{r.period}</td>
                  <td className="p-4 text-slate-300">{r.location}</td>
                  <td className="p-4 font-mono font-bold text-gold">{r.downloadCount} downloads</td>
                  <td className="p-4 text-right">
                    <Link
                      href="/market-reports"
                      target="_blank"
                      className="px-3 py-1 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-gold text-[11px] font-semibold"
                    >
                      View Live
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && editingReport && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="bg-charcoal-900 border border-gold/30 rounded-3xl w-full max-w-xl p-6 sm:p-8 space-y-6 text-white animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
              <h3 className="text-lg font-serif font-bold text-white">Publish New Market Report</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Report Title *</label>
                <input
                  type="text"
                  required
                  value={editingReport.title || ''}
                  onChange={(e) => setEditingReport({ ...editingReport, title: e.target.value })}
                  placeholder="e.g. NCR Expressway Logistics & High-Tech Corridors 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingReport.slug || ''}
                    onChange={(e) => setEditingReport({ ...editingReport, slug: e.target.value })}
                    placeholder="ncr-logistics-2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Edition Period</label>
                  <input
                    type="text"
                    value={editingReport.period || ''}
                    onChange={(e) => setEditingReport({ ...editingReport, period: e.target.value })}
                    placeholder="Q2 2026 Research Edition"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Executive Subtitle</label>
                <textarea
                  rows={2}
                  value={editingReport.subtitle || ''}
                  onChange={(e) => setEditingReport({ ...editingReport, subtitle: e.target.value })}
                  placeholder="Macroeconomic analysis of capital appreciation, yields, and airport connectivity."
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
                  Publish Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
