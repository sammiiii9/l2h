'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Send, 
  Loader2
} from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: 'Sector 150 Noida',
    propertyType: 'Apartment',
    budget: '₹1.5 - 3 Cr',
    preferredContactMethod: 'WhatsApp',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [error, setError] = useState('');

  const whatsappUrl = createWhatsAppUrl({
    customMessage: 'Hi L2H Solution, I would like to speak directly with an advisor regarding luxury properties in Delhi NCR.'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please provide your name and phone number.');
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
          source: 'Website'
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setReferenceId(data.referenceId || 'L2H-7700');
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
    <div className="bg-zinc-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Advisory Connection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-950 tracking-tight">
            Connect with a Property Advisor
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
            Schedule an in-person meeting at our executive suites or arrange an escorted VIP site inspection in Noida or Gurgaon.
          </p>
        </div>

        {/* 2-Column Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Office Locations & Fast Connect */}
          <div className="lg:col-span-5 space-y-6">
            {/* Corporate Office Card */}
            <div className="bg-[#09090b] text-white rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                  Corporate Headquarters
                </span>
                <h3 className="text-2xl font-serif font-bold text-white">
                  Noida Expressway Executive Office
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-light">
                    Tower B, 14th Floor, Advant Navis Business Park, Sector 142, Noida Expressway, Delhi NCR - 201305
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                  <a href="tel:+919876543210" className="hover:text-white transition-colors font-medium">
                    +91 98765 43210 / +91 98112 34567
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                  <a href="mailto:advisory@l2hsolution.com" className="hover:text-white transition-colors font-medium">
                    advisory@l2hsolution.com
                  </a>
                </div>

                <div className="flex items-center gap-3 text-zinc-400">
                  <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span className="font-light">Monday – Sunday: 9:30 AM – 8:00 PM</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Instant WhatsApp Connect</span>
                </a>
              </div>
            </div>

            {/* Gurgaon Branch Office Card */}
            <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-3">
              <span className="text-[11px] uppercase tracking-wider font-bold text-zinc-500">
                Gurgaon Advisory Desk
              </span>
              <h4 className="text-lg font-serif font-bold text-zinc-950">
                Golf Course Road Executive Suite
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-light">
                Two Horizon Centre, Golf Course Road, DLF Phase 5, Gurgaon, Haryana - 122002
              </p>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-zinc-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-100 text-black flex items-center justify-center mx-auto ring-8 ring-zinc-50 border border-zinc-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-zinc-950">
                  Consultation Request Confirmed
                </h3>
                <p className="text-xs font-mono font-bold text-zinc-600 uppercase tracking-widest">
                  Reference: {referenceId}
                </p>
                <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed font-light">
                  Thank you for reaching out. A dedicated L2H property advisor will connect with you via {formData.preferredContactMethod} to confirm your appointment.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-black text-white font-semibold text-xs transition-colors hover:bg-zinc-800"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-zinc-950">
                    Schedule an Advisory Session
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 font-light">
                    Fill in your preferences below. An advisor will contact you strictly on your preferred schedule.
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-950 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikramaditya Singhania"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-950 focus:border-black focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-950 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-950 focus:border-black focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-950 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-950 focus:border-black focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-950 mb-1">
                        Preferred Location
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-950 focus:border-black focus:outline-none"
                      >
                        <option value="Sector 150 Noida">Sector 150 Noida</option>
                        <option value="Sector 124-128 Noida Expressway">Sector 124-128 Noida Expressway</option>
                        <option value="Golf Course Road Gurgaon">Golf Course Road Gurgaon</option>
                        <option value="Golf Course Ext Gurgaon">Golf Course Ext Gurgaon</option>
                        <option value="Yamuna Expressway">Yamuna Expressway (Jewar Airport)</option>
                        <option value="Other NCR">Other NCR Location</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-950 mb-1">
                        Property Category
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-950 focus:border-black focus:outline-none"
                      >
                        <option value="Apartment">Luxury Apartment</option>
                        <option value="Villa">Villa / Duplex</option>
                        <option value="Plot">Freehold Land / Plot</option>
                        <option value="Farmhouse">Estate Farmhouse</option>
                        <option value="Office">Commercial Office Space</option>
                        <option value="Retail">High-Street Retail</option>
                        <option value="Penthouse">Sky Penthouse</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-950 mb-1">
                        Preferred Channel
                      </label>
                      <select
                        value={formData.preferredContactMethod}
                        onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-950 focus:border-black focus:outline-none"
                      >
                        <option value="WhatsApp">WhatsApp (Instant Details)</option>
                        <option value="Phone">Phone Call</option>
                        <option value="Email">Email Information Pack</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-950 mb-1">
                      Message or Consultation Objective
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Looking to visit 3 BHK options in Sector 150 this weekend..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-950 focus:border-black focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 mt-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry &amp; Connect</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
