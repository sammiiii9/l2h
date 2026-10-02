'use client';

import React, { useState } from 'react';
import { Send, Phone, MessageSquare, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';
import { createWhatsAppUrl } from '@/lib/utils';

export default function LeadGenerationSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    lookingFor: 'Home',
    preferredLocation: 'Noida Expressway',
    budget: '₹80 Lakhs – ₹1.5 Cr',
    propertyType: 'Ready-to-Move',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          lookingFor: formData.lookingFor,
          preferredLocation: formData.preferredLocation,
          budgetDisplay: formData.budget,
          propertyType: formData.propertyType,
          message: formData.message || `Inquiry for ${formData.lookingFor} in ${formData.preferredLocation} (Budget: ${formData.budget}).`,
          source: 'Website Lead Form'
        })
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try WhatsApp or call us directly.');
      }
    } catch (err) {
      setError('Network error. Please try WhatsApp or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappDirect = createWhatsAppUrl({
    customMessage: `Hi L2H Solution, I am looking for ${formData.lookingFor} in ${formData.preferredLocation} (Budget: ${formData.budget}). I would like to talk to an advisor.`
  });

  return (
    <section id="contact-advisor" className="py-24 sm:py-32 bg-[#171513] text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B8945B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#B8945B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <ScrollReveal variant="fade-up" delay={100} className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8D3B4]">
            <Sparkles className="w-3.5 h-3.5 text-[#B8945B]" />
            <span>Advisory Consultation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-[1.15]">
            Tell Us What You&apos;re Looking For
          </h2>
          <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-2xl mx-auto">
            Connect directly with an L2H property advisor. We will understand your purpose, budget, and parameters before suggesting verified options.
          </p>
        </ScrollReveal>

        {/* Lead Form & Direct Action Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          
          {/* Main Form Container (8 Cols) */}
          <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-white">Thank you, {formData.name}</h3>
                <p className="text-xs sm:text-sm text-white/80 font-light max-w-md mx-auto leading-relaxed">
                  An L2H Property Advisor will review your requirements for <strong className="text-white">{formData.lookingFor}</strong> and reach out shortly to assist you.
                </p>
                <div className="pt-4">
                  <a
                    href={whatsappDirect}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B8945B] hover:bg-yellow-500 text-black text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <span>Instant WhatsApp Connect</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Personal Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-white/80 block">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#B8945B] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-white/80 block">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#B8945B] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-white/80 block">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#B8945B] transition-colors"
                  />
                </div>

                {/* I'm Looking For */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-white/80 block">
                    I&apos;m Looking For:
                  </label>
                  <select
                    value={formData.lookingFor}
                    onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#26211D] border border-white/15 text-white text-xs focus:outline-none focus:border-[#B8945B] transition-colors"
                  >
                    <option value="Home">Home (Noida Residential for family living)</option>
                    <option value="Investment">Investment (Plotted &amp; growth corridors)</option>
                    <option value="Spiritual Destination">Spiritual Destination (Near famous temples / Shakumbhari Devi)</option>
                    <option value="Holiday Property">Holiday Property (Goa / lifestyle vacation retreats)</option>
                    <option value="Industrial / Growth Opportunity">Industrial / Growth Opportunity (Dholera SIR smart corridor)</option>
                  </select>
                </div>

                {/* Preferred Location, Budget & Property Type */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-white/80 block">
                      Preferred Location
                    </label>
                    <select
                      value={formData.preferredLocation}
                      onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl bg-[#26211D] border border-white/15 text-white text-xs focus:outline-none focus:border-[#B8945B]"
                    >
                      <option value="Noida Expressway">Noida Expressway</option>
                      <option value="Saharanpur / Shakumbhari Devi">Saharanpur (Shakumbhari Devi)</option>
                      <option value="Dholera SIR">Dholera SIR, Gujarat</option>
                      <option value="Goa Coastal Belt">Goa Coastal Belt</option>
                      <option value="Open to Suggestions">Open to Suggestions</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-white/80 block">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl bg-[#26211D] border border-white/15 text-white text-xs focus:outline-none focus:border-[#B8945B]"
                    >
                      <option value="Under ₹15 Lakhs">Under ₹15 Lakhs (Saharanpur / Dholera)</option>
                      <option value="₹15 Lakhs – ₹50 Lakhs">₹15 Lakhs – ₹50 Lakhs (Goa Plots)</option>
                      <option value="₹50 Lakhs – ₹1.5 Cr">₹50 Lakhs – ₹1.5 Cr (Noida Homes)</option>
                      <option value="₹1.5 Cr – ₹3 Cr">₹1.5 Cr – ₹3 Cr (Luxury Residences)</option>
                      <option value="₹3 Cr+">₹3 Cr+ (Estates / Sky Villas)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-white/80 block">
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl bg-[#26211D] border border-white/15 text-white text-xs focus:outline-none focus:border-[#B8945B]"
                    >
                      <option value="Plot">100 Sq. Yards Plot</option>
                      <option value="Ready-to-Move">Ready-to-Move Residential</option>
                      <option value="Under-Construction">Under-Construction</option>
                      <option value="Off-Plan">Off-Plan / New Launch</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-white/80 block">
                    Your Specific Purpose / Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your time horizon, family requirements, or specific questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#B8945B] transition-colors resize-none"
                  />
                </div>

                {/* Form Action */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-2xl bg-[#B8945B] hover:bg-yellow-500 text-black font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Talk to a Property Advisor</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Quick Direct Contacts Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* WhatsApp Direct Card */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-3 backdrop-blur-xl">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-normal text-white">
                WhatsApp Us
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Connect directly for instant queries, project location pins, and verified cost sheets.
              </p>
              <div className="pt-2">
                <a
                  href={whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Direct Phone Card */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-3 backdrop-blur-xl">
              <div className="w-10 h-10 rounded-full bg-[#B8945B]/20 text-[#B8945B] flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-normal text-white">
                Request a Callback
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Speak directly with an L2H property advisor at your convenient time.
              </p>
              <div className="pt-2">
                <a
                  href="tel:+918439654385"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B8945B]" />
                  <span>Call +91 8439654385</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
