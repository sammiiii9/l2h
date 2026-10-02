'use client';

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Phone, Mail, User, MapPin, Building, ArrowRight, Loader2 } from 'lucide-react';
import { Property } from '@/types';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
  propertyTitle?: string;
  initialPurpose?: string;
  title?: string;
  subtitle?: string;
}

export default function LeadModal({
  isOpen,
  onClose,
  property,
  propertyTitle,
  initialPurpose = 'End Use',
  title,
  subtitle
}: LeadModalProps) {
  const effectiveTitle = title || propertyTitle || property?.title;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredLocation: property?.location?.locality || 'Noida / Delhi NCR',
    propertyType: property?.propertyType || 'Apartment',
    budgetDisplay: property?.priceDisplay || '₹1 - 3 Cr',
    purpose: initialPurpose,
    preferredContactMethod: 'WhatsApp',
    message: property 
      ? `Interested in ${property.title}. Please share floor plans, pricing sheets, and site visit availability.` 
      : effectiveTitle 
      ? `Inquiring regarding: ${effectiveTitle}. Please share full advisory dossier and availability.`
      : ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please provide your name and phone number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          propertyId: property?.id,
          propertyName: property?.title,
          propertySlug: property?.slug,
          source: property ? 'Property Page' : 'Website'
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setReferenceId(data.referenceId || 'L2H-8800');
      } else {
        setError(data.error || 'Failed to submit inquiry.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#09090b] border border-white/15 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-zinc-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto border border-white/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-serif font-bold text-white">
                We&apos;ve Received Your Requirement
              </h3>
              <p className="text-xs text-zinc-300 font-medium tracking-wide uppercase font-mono">
                Reference ID: {referenceId}
              </p>
            </div>
            <p className="text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed font-light">
              A dedicated L2H property advisor is analyzing matching inventory and will contact you via {formData.preferredContactMethod} within 1 business hour.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Close &amp; Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-zinc-300 text-[11px] font-semibold uppercase tracking-wider mb-2">
                <span>Personalized Real Estate Advisory</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {title || (property ? `Inquire: ${property.title}` : 'Consult a Property Advisor')}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-light">
                {subtitle || 'Get verified market pricing, floor plans, ROI forecast, and schedule an exclusive VIP site visit.'}
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Singhania"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black border border-white/15 focus:border-white focus:outline-none text-white text-xs placeholder-zinc-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 8439654385"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black border border-white/15 focus:border-white focus:outline-none text-white text-xs placeholder-zinc-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black border border-white/15 focus:border-white focus:outline-none text-white text-xs placeholder-zinc-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Purpose
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-black border border-white/15 focus:border-white focus:outline-none text-white text-xs transition-colors"
                  >
                    <option value="End Use">Self / End Use</option>
                    <option value="Investment">Investment (Appreciation)</option>
                    <option value="Rental">Rental Cashflow</option>
                    <option value="Both">Both (Hybrid)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Preferred Contact
                  </label>
                  <select
                    value={formData.preferredContactMethod}
                    onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-black border border-white/15 focus:border-white focus:outline-none text-white text-xs transition-colors"
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Phone">Phone Call</option>
                    <option value="Email">Email Details</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Specific Requirements or Message
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Need high floor 4 BHK with 2 car parks, ready to move within 3 months..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black border border-white/15 focus:border-white focus:outline-none text-white text-xs placeholder-zinc-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-accent hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-gold-glow"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing &amp; Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Request Advisor Callback</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-center text-zinc-400 pt-1 font-light">
                We respect your privacy. No spam. Direct advisory consultation only.
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
