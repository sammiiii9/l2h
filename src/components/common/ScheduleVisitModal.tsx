'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, Car, CheckCircle2, User, Phone, Mail, Sparkles, Loader2, MapPin } from 'lucide-react';
import { Property } from '@/types';
import { trackEvent } from '@/lib/analytics';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export default function ScheduleVisitModal({
  isOpen,
  onClose,
  property
}: ScheduleVisitModalProps) {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (10:00 AM - 1:00 PM)');
  const [pickupRequired, setPickupRequired] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !visitDate) {
      setError('Please provide your Name, Phone Number, and Preferred Visit Date.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/site-visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property.id,
          propertyName: property.title,
          propertySlug: property.slug,
          clientName,
          clientPhone,
          clientEmail,
          visitDate,
          timeSlot,
          pickupRequired,
          pickupLocation: pickupRequired ? pickupLocation : undefined,
          notes,
          status: 'Scheduled'
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setReferenceId(data.referenceId || 'VISIT-7721');
        trackEvent('schedule_visit', { propertyId: property.id, propertyTitle: property.title, visitDate });
      } else {
        setError(data.error || 'Failed to schedule visit.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get tomorrow's date formatted as YYYY-MM-DD for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
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
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto border border-white/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
                Booking Reference: {referenceId}
              </span>
              <h3 className="text-2xl font-serif font-bold text-white">
                Private Site Visit Scheduled
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed font-light">
                Your private walkthrough for <strong>{property.title}</strong> has been logged. Our concierge team will coordinate passes and vehicle arrangements.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-white/10 text-left text-xs space-y-2 max-w-sm mx-auto font-light">
              <div className="flex justify-between text-zinc-400">
                <span>Scheduled Date:</span>
                <span className="font-semibold text-white">{visitDate}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Time Window:</span>
                <span className="font-semibold text-white">{timeSlot}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Chauffeur Pickup:</span>
                <span className="font-semibold text-white">{pickupRequired ? 'Requested' : 'Self Drive'}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-zinc-300 text-[10px] font-semibold uppercase tracking-wider mb-2">
                <Calendar className="w-3 h-3 text-zinc-400" />
                <span>Site Inspection</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Schedule Private Site Visit
              </h3>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-1 font-light">
                {property.title} • {property.location.locality}, {property.location.city}
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Vikramaditya Singhania"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white placeholder-zinc-500 text-xs focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    Phone (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+91 8439654385"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white placeholder-zinc-500 text-xs focus:border-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    Preferred Visit Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
                    <input
                      type="date"
                      required
                      min={minDate}
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white text-xs focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    Time Window
                  </label>
                  <div className="relative">
                    <Clock className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white text-xs focus:border-white focus:outline-none"
                    >
                      <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                      <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                      <option value="Evening (4:00 PM - 6:30 PM)">Evening (4:00 PM - 6:30 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Chauffeur Option */}
              <div className="p-3.5 rounded-xl bg-black border border-white/10 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-300 font-semibold">
                  <input
                    type="checkbox"
                    checked={pickupRequired}
                    onChange={(e) => setPickupRequired(e.target.checked)}
                    className="rounded border-zinc-700 text-white focus:ring-white"
                  />
                  <div className="flex items-center gap-1.5 text-xs">
                    <Car className="w-3.5 h-3.5 text-zinc-300" />
                    <span>Complimentary Chauffeur Pickup Required</span>
                  </div>
                </label>

                {pickupRequired && (
                  <div className="pt-1.5">
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="Enter pickup address (e.g. Golf Links, New Delhi)"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/15 text-white placeholder-zinc-500 text-xs focus:border-white focus:outline-none"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 mt-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirming Appointment...</span>
                  </>
                ) : (
                  <span>Confirm Private Site Visit</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
