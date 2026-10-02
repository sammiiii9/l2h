'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Send, CheckCircle2, Loader2, Mail, Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';
import ScrollReveal from '@/components/common/ScrollReveal';

export default function LuxuryContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const whatsappLink = createWhatsAppUrl({
    customMessage: 'Hi L2H Solution, I am inquiring regarding buyer-side advisory and private acquisition dossiers.'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Please provide your name and email address.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: '+91-Inquiry-Online',
          message: formData.message || 'General luxury portfolio inquiry and private buyer consultation request.',
          source: 'Luxury Landing Contact Section'
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to send message. Please reach our advisory desk directly.');
      }
    } catch (err) {
      setError('Network connection error. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-[90svh] flex items-center justify-center py-24 sm:py-32 bg-[#171513] text-white overflow-hidden px-4 sm:px-6 lg:px-8">
      
      {/* 1. Full-Bleed Hospitality Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Real Estate Advisory Reception and Private Lounge"
          fill
          sizes="100vw"
          className="object-cover opacity-25 filter brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-[#171513]/70 to-[#171513]/90" />
      </div>

      {/* 2. Form & Conversion Container */}
      <div className="relative z-10 max-w-xl mx-auto w-full space-y-10">
        
        {/* Header Block */}
        <ScrollReveal variant="fade-up" delay={100} className="text-center space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8945B] font-semibold">
            Private Advisory Desk
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
            Begin a Private Conversation
          </h2>
          <p className="text-xs sm:text-sm text-white/70 font-light max-w-md mx-auto leading-relaxed">
            Consult with an independent buyer-side strategist regarding luxury residences, clear-title land parcels, or bespoke off-market acquisition mandates.
          </p>
        </ScrollReveal>

        {/* Form or Success State */}
        <ScrollReveal variant="scale-up" delay={250}>
          {submitted ? (
            <div className="p-8 sm:p-10 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-xl text-center space-y-5 shadow-2xl">
              <div className="w-14 h-14 rounded-full bg-[#B8945B]/20 text-[#B8945B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif text-white">Advisory Brief Received</h3>
                <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed max-w-sm mx-auto">
                  Thank you. An L2H private strategist will review your parameters and respond with complete confidentiality.
                </p>
              </div>

              <div className="pt-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B8945B] hover:bg-[#C9A56D] text-black font-medium text-xs uppercase tracking-wider transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp Advisory Desk</span>
                </a>
              </div>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit} 
              className="p-6 sm:p-10 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-xl space-y-5 shadow-2xl"
            >
              {error && (
                <div className="p-3 rounded-lg bg-red-950/70 border border-red-800/80 text-xs text-red-200" role="alert">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-[11px] uppercase tracking-wider text-white/80 font-medium block">
                  Your Name <span className="text-[#B8945B]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rajiv Mehra"
                  className="contact-field-luxury"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-[11px] uppercase tracking-wider text-white/80 font-medium block">
                  Email Address <span className="text-[#B8945B]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rajiv@company.com"
                  className="contact-field-luxury"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-[11px] uppercase tracking-wider text-white/80 font-medium block">
                  Asset Class &amp; Acquisition Mandate
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. 4 BHK Sky Villa in Noida Exp, 500 sq.m Yamuna Plot, or Pre-leased Commercial yield requirement..."
                  className="contact-field-luxury resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-full bg-white hover:bg-[#F5F1EB] disabled:opacity-50 text-[#171513] font-medium text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:translate-y-[-1px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Brief...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Advisory Brief</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </ScrollReveal>

        {/* 3. Divider & Human Advisory Desk Pill */}
        <ScrollReveal variant="fade-up" delay={350} className="pt-4 space-y-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/15" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-widest text-white/60">
              <span className="bg-[#171513] px-4 font-light">Prefer to speak directly?</span>
            </div>
          </div>

          {/* Compact Concierge Avatar & Email Link Pill */}
          <div className="inline-flex items-center gap-3 p-1.5 pr-5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all duration-300 group hover:translate-y-[-1px]">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#B8945B]/60 shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                alt="L2H Buyer Advisory Desk"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left text-xs">
              <span className="text-white/60 text-[10px] uppercase tracking-wider block">Buyer Advisory Desk</span>
              <a 
                href="mailto:infol2h@gmail.com" 
                className="text-white font-medium group-hover:text-[#B8945B] transition-colors flex items-center gap-1"
              >
                <span>infol2h@gmail.com</span>
                <span className="text-white/50">• +91 8439654385</span>
              </a>
            </div>
          </div>

          <div className="text-[11px] font-mono text-white/40 tracking-wider">
            From Land to Legacy. Decide Better.
          </div>
        </ScrollReveal>

      </div>

    </section>
  );
}
