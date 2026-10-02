'use client';

import React, { useState } from 'react';
import { BookOpen, Download, Sparkles, FileText, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { MarketReport } from '@/types';

import { trackEvent } from '@/lib/analytics';

interface MarketReportsClientProps {
  reports: MarketReport[];
}

export default function MarketReportsClient({ reports }: MarketReportsClientProps) {
  const [selectedReport, setSelectedReport] = useState<MarketReport | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: 'Investment'
  });

  const handleOpenDownload = (report: MarketReport) => {
    setSelectedReport(report);
    setDownloadSuccess(false);
    setIsDownloadModalOpen(true);
  };

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport) return;

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadForm.name,
          phone: leadForm.phone,
          email: leadForm.email,
          purpose: leadForm.purpose,
          source: 'Market Report',
          message: `Downloaded research report: ${selectedReport.title}`
        })
      });

      trackEvent('report_download', { reportTitle: selectedReport.title, reportSlug: selectedReport.slug });
      setDownloadSuccess(true);
    } catch (e) {
      console.error(e);
      setDownloadSuccess(true);
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>L2H Institutional Research Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-950 tracking-tight">
            Market Intelligence Reports
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
            Data-backed macroeconomic briefs, micro-market pricing velocity, and infrastructure due diligence published by our senior research strategists.
          </p>
        </div>

        {/* Reports Grid */}
        <div className="space-y-12">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Cover Image & Download CTA */}
              <div className="lg:col-span-4 space-y-4">
                <div className="h-64 sm:h-72 rounded-2xl overflow-hidden relative bg-black shadow-md">
                  <img
                    src={report.coverImage}
                    alt={report.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white text-black">
                      {report.period}
                    </span>
                    <div className="text-xs text-zinc-300">{report.location}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenDownload(report)}
                  className="w-full py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full PDF Report ({report.pdfFileSize || '4.8 MB'})</span>
                </button>

                <div className="text-[11px] text-center text-zinc-400 font-light">
                  Institutional Research Brief • Complimentary PDF Access
                </div>
              </div>

              {/* Right Column: Key Takeaways & Executive Summary */}
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <span>{report.location}</span>
                    <span>•</span>
                    <span>{report.period}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 leading-tight">
                    {report.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                    {report.subtitle}
                  </p>
                </div>

                {/* Key Findings Callout */}
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-950 flex items-center gap-1.5">
                    <span>Key Strategic Takeaways</span>
                  </span>
                  <ul className="space-y-2 text-xs text-zinc-700 leading-relaxed font-light">
                    {report.keyTakeaways.map((takeaway, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Report Chapters Summary */}
                <div className="space-y-4 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                    Analytical Highlights in this Edition:
                  </span>
                  <div className="space-y-3 divide-y divide-zinc-100">
                    {report.sections.map((section, sIdx) => (
                      <div key={sIdx} className="pt-3 space-y-1">
                        <h4 className="text-sm font-serif font-bold text-zinc-950">{section.title}</h4>
                        <p className="text-xs text-zinc-600 leading-relaxed font-light line-clamp-2">{section.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download Lead Capture Modal */}
      {isDownloadModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[#09090b] border border-white/15 rounded-3xl w-full max-w-md p-6 sm:p-8 space-y-6 text-white animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-zinc-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Instant Research Download
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsDownloadModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {downloadSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-serif font-bold text-white">
                    Research Report Access Confirmed
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    A copy of <strong>{selectedReport.title}</strong> has been sent to your email. An advisor can also share customized financial model spreadsheets.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDownloadModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleDownloadSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <h3 className="text-base font-serif font-bold text-white">
                    {selectedReport.title}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-light">
                    Enter your details to download the complete {selectedReport.pdfFileSize || '4.8 MB'} PDF research report.
                  </p>
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="e.g. Alok Verma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Phone Number (with WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    placeholder="+91 8439654385"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white focus:border-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Business / Personal Email *</label>
                  <input
                    type="email"
                    required
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    placeholder="alok.verma@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white focus:border-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg mt-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Report Now</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
