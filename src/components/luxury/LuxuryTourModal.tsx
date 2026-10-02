'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';

interface LuxuryTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
  propertyLocation?: string;
}

export default function LuxuryTourModal({
  isOpen,
  onClose,
  propertyName = 'Private Collection Portfolio',
  propertyLocation = 'Mediterranean & Prime Corridors'
}: LuxuryTourModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Lock scroll & handle Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please provide your name, email, and phone number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: `Private Tour Request for: ${propertyName} (${propertyLocation}). Preferred Date: ${formData.date || 'Flexible'}, Time: ${formData.preferredTime}. Notes: ${formData.notes}`,
          source: 'Luxury Tour Modal'
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Unable to schedule at this moment. Please reach our concierge directly.');
      }
    } catch (err) {
      setError('Network connection error. Please try again or message our concierge.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappLink = createWhatsAppUrl({
    customMessage: `Hi L2H Concierge, I would like to arrange a private tour for "${propertyName}" (${propertyLocation}).`
  });

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md transition-all duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="luxury-tour-modal-title"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-xl bg-[#171513] text-[#F5F1EB] border border-white/15 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-gold"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B8945B] font-medium">
            <span>Private Introduction</span>
          </div>
          <h2 id="luxury-tour-modal-title" className="text-2xl sm:text-3xl font-serif font-normal text-white">
            Arrange a Private Tour
          </h2>
          <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
            Reserved exclusively for <span className="text-white font-medium">{propertyName}</span> in {propertyLocation}.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#B8945B]/20 text-[#B8945B] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-white">Tour Request Confirmed</h3>
            <p className="text-xs sm:text-sm text-white/75 max-w-md mx-auto leading-relaxed">
              Our private advisory desk has received your request. An advisor will contact you within 2 business hours to finalize arrangements.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#B8945B] hover:bg-[#C9A56D] text-black font-medium text-xs uppercase tracking-wider transition-all"
              >
                Instant WhatsApp Desk
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs uppercase tracking-wider transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-xs text-red-200" role="alert">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-white/75 font-medium block">
                Full Name <span className="text-[#B8945B]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alistair Vance"
                className="contact-field-luxury"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/75 font-medium block">
                  Email Address <span className="text-[#B8945B]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="contact-field-luxury"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/75 font-medium block">
                  Phone Number <span className="text-[#B8945B]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 / International"
                  className="contact-field-luxury"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/75 font-medium block">
                  Preferred Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="contact-field-luxury"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/75 font-medium block">
                  Preferred Time Window
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="contact-field-luxury bg-[#26211D]"
                >
                  <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                  <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                  <option value="Golden Hour (4:00 PM - 7:00 PM)">Golden Hour (4:00 PM - 7:00 PM)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-white/75 font-medium block">
                Specific Inquiries or Requirements
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Architectural preferences, confidentiality requirements, or timeline..."
                className="contact-field-luxury resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-full bg-[#B8945B] hover:bg-[#C9A56D] disabled:opacity-50 text-black font-medium text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirming Request...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Tour Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 text-center text-[11px] text-white/50">
              Discretion guaranteed. No mass marketing or broker syndication.
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
