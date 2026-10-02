'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, Building2, MapPin, DollarSign } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

const PURPOSES = [
  { id: 'Home', label: 'Looking for a Home', desc: 'Residential living in Noida for family & end use' },
  { id: 'Investment', label: 'Plotted / Capital Growth', desc: 'Long-term land & industrial corridors' },
  { id: 'Spiritual', label: 'Spiritual Destination', desc: 'Pilgrimage temple locations (Shakumbhari Devi / Saharanpur)' },
  { id: 'Holiday', label: 'Holiday & Leisure', desc: 'Vacation retreats & lifestyle plots in Goa' },
  { id: 'Growth', label: 'Future Growth Corridor', desc: 'Master-planned smart corridors like Dholera SIR' }
];

const BUDGETS = [
  { id: 'under-15l', label: 'Under ₹15 Lakhs', desc: 'Ideal for Saharanpur (₹9L) & Dholera (₹10L) plots' },
  { id: '15l-50l', label: '₹15 Lakhs – ₹50 Lakhs', desc: 'Ideal for Goa holiday plots (₹35L)' },
  { id: '50l-1cr', label: '₹50 Lakhs – ₹1 Crore', desc: 'Ideal for Noida Residential entry (₹80L)' },
  { id: '1cr-3cr', label: '₹1 Crore – ₹3 Crores', desc: 'Premium Noida 3/4 BHK apartments & residences' },
  { id: 'above-3cr', label: 'Above ₹3 Crores', desc: 'Ultra luxury estates & sky villas' }
];

const LOCATIONS = [
  { id: 'Saharanpur', label: 'Mata Shakumbhari Devi, Saharanpur', type: 'Sacred Destination' },
  { id: 'Dholera', label: 'Dholera SIR, Gujarat', type: 'Industrial & Growth Corridor' },
  { id: 'Goa', label: 'Goa Coastal Arc', type: 'Holiday & Leisure Destination' },
  { id: 'Noida', label: 'Noida Expressway', type: 'Residential Living' },
  { id: 'Open', label: 'Open to Advisor Recommendations', type: 'Any Prime Corridor' }
];

const PROPERTY_TYPES = [
  { id: 'Plot', label: 'Freehold Land / Plot', desc: '100 sq. yards demarcated land parcels' },
  { id: 'Ready to Move', label: 'Ready-to-Move Home', desc: 'Immediate possession residential apartments' },
  { id: 'Under Construction', label: 'Under-Construction / Near Possession', desc: 'Milestone-based modern developments' },
  { id: 'Off-Plan', label: 'Off-Plan / New Launch', desc: 'Early-stage entry pricing opportunities' }
];

const SAMPLE_MATCHES: Record<string, any[]> = {
  Spiritual: [
    {
      title: 'Mata Shakumbhari Devi Temple Plotted Development',
      location: 'Saharanpur, Uttar Pradesh',
      category: 'Sacred Destination',
      price: 'Starting from ₹9 Lakhs',
      size: '100 sq. yards',
      slug: 'shakumbhari-devi-saharanpur-plots',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
    }
  ],
  Growth: [
    {
      title: 'Dholera Industrial & Growth Corridor Plots',
      location: 'Dholera SIR, Gujarat',
      category: 'Industrial & Growth',
      price: 'Starting from ₹10 Lakhs',
      size: '100 sq. yards',
      slug: 'dholera-sir-smart-city-plots',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
    }
  ],
  Holiday: [
    {
      title: 'Goa Holiday & Leisure Plotted Opportunities',
      location: 'Goa Coastal Green Belt',
      category: 'Holiday & Leisure',
      price: 'Starting from ₹35 Lakhs',
      size: '100 sq. yards',
      slug: 'goa-holiday-leisure-plots',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80'
    }
  ],
  Home: [
    {
      title: 'Noida Expressway Curated Residential Homes',
      location: 'Noida Expressway, Sector 150 / 143',
      category: 'Residential',
      price: 'Starting from ₹80 Lakhs',
      size: 'Ready-to-Move & Off-Plan',
      slug: 'noida-expressway-residential-residences',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80'
    }
  ],
  Investment: [
    {
      title: 'Dholera Industrial & Growth Corridor Plots',
      location: 'Dholera SIR, Gujarat',
      category: 'Industrial & Growth',
      price: 'Starting from ₹10 Lakhs',
      size: '100 sq. yards',
      slug: 'dholera-sir-smart-city-plots',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Mata Shakumbhari Devi Temple Plotted Development',
      location: 'Saharanpur, Uttar Pradesh',
      category: 'Sacred Destination',
      price: 'Starting from ₹9 Lakhs',
      size: '100 sq. yards',
      slug: 'shakumbhari-devi-saharanpur-plots',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
    }
  ]
};

export default function SmartPropertyMatching() {
  const [step, setStep] = useState(1);
  const [purpose, setPurpose] = useState('Home');
  const [budget, setBudget] = useState('50l-1cr');
  const [location, setLocation] = useState('Noida');
  const [propertyType, setPropertyType] = useState('Ready to Move');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsCompleted(false);
  };

  const matchedList = SAMPLE_MATCHES[purpose] || SAMPLE_MATCHES.Home;

  return (
    <section id="property-matcher" className="py-24 sm:py-32 bg-[#FAF7F2] dark:bg-[#12100E] border-t border-black/5 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <ScrollReveal variant="fade-up" delay={100} className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171513]/5 dark:bg-white/10 border border-[#171513]/10 dark:border-white/15 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8945B]">
            <Sparkles className="w-3.5 h-3.5 text-[#B8945B]" />
            <span>Smart Advisory Flow</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#171513] dark:text-white tracking-tight leading-[1.15]">
            Find Your Property Match
          </h2>
          <p className="text-sm sm:text-base text-[#171513]/75 dark:text-white/75 font-light leading-relaxed max-w-2xl mx-auto">
            Tell us your purpose, budget, and preferences. We align relevant opportunities around your criteria.
          </p>
        </ScrollReveal>

        {/* Wizard Box */}
        <ScrollReveal variant="fade-up" delay={200}>
          <div className="bg-white dark:bg-[#171513] rounded-3xl p-6 sm:p-10 border border-black/5 dark:border-white/10 shadow-xl space-y-8">
            
            {/* Step Progress Bar */}
            {!isCompleted && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#171513]/70 dark:text-white/70 uppercase tracking-wider">
                  <span>Step 0{step} of 04</span>
                  <span>{step === 1 ? 'Your Purpose' : step === 2 ? 'Your Budget' : step === 3 ? 'Preferred Location' : 'Property Type'}</span>
                </div>
                <div className="h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#B8945B] transition-all duration-500 rounded-full"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Step 1: Purpose */}
            {!isCompleted && step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#171513] dark:text-white">
                    Step 1: What is the main purpose of your property decision?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light">
                    Select the primary objective that drives your acquisition.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PURPOSES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPurpose(p.id)}
                      className={`p-5 rounded-2xl text-left border transition-all ${
                        purpose === p.id
                          ? 'border-[#B8945B] bg-[#FAF7F2] dark:bg-[#26211D] shadow-md ring-1 ring-[#B8945B]'
                          : 'border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20'
                      }`}
                    >
                      <div className="font-semibold text-sm sm:text-base text-[#171513] dark:text-white mb-1">
                        {p.label}
                      </div>
                      <div className="text-xs text-[#171513]/70 dark:text-white/70 font-light">
                        {p.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Budget */}
            {!isCompleted && step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#171513] dark:text-white">
                    Step 2: What is your planned investment or purchase budget?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light">
                    Flexible ticket sizes help us match realistic and verified inventory.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {BUDGETS.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudget(b.id)}
                      className={`p-5 rounded-2xl text-left border transition-all ${
                        budget === b.id
                          ? 'border-[#B8945B] bg-[#FAF7F2] dark:bg-[#26211D] shadow-md ring-1 ring-[#B8945B]'
                          : 'border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20'
                      }`}
                    >
                      <div className="font-semibold text-sm sm:text-base text-[#171513] dark:text-white mb-1">
                        {b.label}
                      </div>
                      <div className="text-xs text-[#171513]/70 dark:text-white/70 font-light">
                        {b.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {!isCompleted && step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#171513] dark:text-white">
                    Step 3: Which location or destination do you prefer?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light">
                    Choose from our current active destinations or opt for advisory guidance.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setLocation(loc.id)}
                      className={`p-5 rounded-2xl text-left border transition-all ${
                        location === loc.id
                          ? 'border-[#B8945B] bg-[#FAF7F2] dark:bg-[#26211D] shadow-md ring-1 ring-[#B8945B]'
                          : 'border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20'
                      }`}
                    >
                      <div className="font-semibold text-sm sm:text-base text-[#171513] dark:text-white mb-1">
                        {loc.label}
                      </div>
                      <div className="text-xs text-[#B8945B] font-medium">
                        {loc.type}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Property Type */}
            {!isCompleted && step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#171513] dark:text-white">
                    Step 4: What type of property structure do you prefer?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#171513]/70 dark:text-white/70 font-light">
                    Plots, ready-to-move homes, or off-plan milestones.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PROPERTY_TYPES.map((pt) => (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => setPropertyType(pt.id)}
                      className={`p-5 rounded-2xl text-left border transition-all ${
                        propertyType === pt.id
                          ? 'border-[#B8945B] bg-[#FAF7F2] dark:bg-[#26211D] shadow-md ring-1 ring-[#B8945B]'
                          : 'border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20'
                      }`}
                    >
                      <div className="font-semibold text-sm sm:text-base text-[#171513] dark:text-white mb-1">
                        {pt.label}
                      </div>
                      <div className="text-xs text-[#171513]/70 dark:text-white/70 font-light">
                        {pt.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step Controls */}
            {!isCompleted && (
              <div className="flex items-center justify-between pt-6 border-t border-black/5 dark:border-white/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 dark:border-white/20 text-xs font-semibold text-[#171513] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                ) : <div />}

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#171513] dark:bg-white text-white dark:text-[#171513] hover:bg-[#B8945B] dark:hover:bg-[#B8945B] dark:hover:text-white transition-all text-xs font-semibold uppercase tracking-wider shadow-md"
                >
                  <span>{step === 4 ? 'View Relevant Opportunities' : 'Continue'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Results Screen */}
            {isCompleted && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Advisory Disclaimer Notice */}
                <div className="p-5 rounded-2xl bg-[#FAF7F2] dark:bg-[#26211D] border border-[#B8945B]/30 space-y-1">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-[#B8945B]">
                    Advisory Recommendation Note
                  </div>
                  <p className="text-sm font-serif text-[#171513] dark:text-white leading-relaxed">
                    Based on the information you provided, these opportunities may be relevant to explore.
                  </p>
                </div>

                {/* Matches Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {matchedList.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-5 rounded-2xl bg-[#FAF7F2] dark:bg-[#171513] border border-black/5 dark:border-white/10 flex flex-col sm:flex-row gap-5 items-center justify-between"
                    >
                      <div className="w-full sm:w-32 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-black/20 shrink-0">
                        <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
                      </div>

                      <div className="space-y-1.5 flex-grow">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B8945B]">
                          {m.category}
                        </span>
                        <h4 className="text-base font-serif font-normal text-[#171513] dark:text-white">
                          {m.title}
                        </h4>
                        <div className="text-xs text-[#171513]/60 dark:text-white/60">
                          {m.location} • {m.size}
                        </div>
                        <div className="text-sm font-semibold text-[#171513] dark:text-white">
                          {m.price}
                        </div>
                      </div>

                      <div className="shrink-0 w-full sm:w-auto">
                        <Link
                          href={`/properties/${m.slug}`}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#171513] dark:bg-white text-white dark:text-[#171513] hover:bg-[#B8945B] text-xs font-semibold transition-all"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Final Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-black/5 dark:border-white/10">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#171513]/70 dark:text-white/70 hover:text-[#B8945B]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Adjust Criteria</span>
                  </button>

                  <a
                    href="https://wa.me/918439654385?text=Hi%20L2H%20Solution%2C%20I%20completed%20the%20property%20matching%20flow%20and%20would%20like%20to%20review%20detailed%20options%20with%20an%20advisor."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#B8945B] hover:bg-yellow-500 text-black font-semibold text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    <span>Discuss With a Property Advisor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            )}

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
