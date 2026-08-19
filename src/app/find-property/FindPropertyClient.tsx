'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Home, 
  Building2, 
  Trees, 
  Building, 
  TrendingUp, 
  Loader2,
  Compass
} from 'lucide-react';

export default function FindPropertyClient() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Form State
  const [lookingFor, setLookingFor] = useState('Homes');
  const [location, setLocation] = useState('Sector 150 Noida');
  const [budget, setBudget] = useState('₹1.5 Cr – ₹3.0 Cr');
  const [timeline, setTimeline] = useState('1–3 months');
  const [purpose, setPurpose] = useState('End Use');
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredContactMethod: 'WhatsApp',
    preferredContactTime: 'Evening (6 PM - 8 PM)',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [matchedResults, setMatchedResults] = useState<any[]>([]);
  const [referenceId, setReferenceId] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.phone) {
      setError('Please provide your Name and Phone Number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactData.name,
          phone: contactData.phone,
          email: contactData.email,
          lookingFor,
          preferredLocation: location,
          budgetDisplay: budget,
          timeline,
          purpose,
          preferredContactMethod: contactData.preferredContactMethod,
          preferredContactTime: contactData.preferredContactTime,
          message: contactData.message || `Wizard Requirement: ${lookingFor} in ${location} within ${budget} for ${purpose} (${timeline}).`,
          source: 'Website'
        })
      });

      // Also fetch live ranked recommendations
      try {
        let minB = 0;
        let maxB = 50000000;
        if (budget.includes('1.5 Cr – ₹3.0 Cr')) { minB = 15000000; maxB = 30000000; }
        else if (budget.includes('Under ₹1.0 Cr')) { minB = 0; maxB = 10000000; }
        else if (budget.includes('₹3.0 Cr – ₹6.0 Cr')) { minB = 30000000; maxB = 60000000; }
        else if (budget.includes('₹6.0 Cr – ₹15.0 Cr')) { minB = 60000000; maxB = 150000000; }
        else if (budget.includes('₹15.0 Cr+')) { minB = 150000000; maxB = 1000000000; }

        const recoRes = await fetch('/api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: lookingFor === 'Homes' ? 'Apartments' : lookingFor,
            location,
            budgetMin: minB,
            budgetMax: maxB,
            purpose
          })
        });
        const recoData = await recoRes.json();
        if (recoData.success && recoData.recommendations) {
          setMatchedResults(recoData.recommendations);
        }
      } catch (recoErr) {
        console.error('Recommendations error:', recoErr);
      }

      const data = await res.json();
      if (data.success) {
        setReferenceId(data.referenceId || 'L2H-9921');
        setIsSubmitted(true);
      } else {
        setError(data.error || 'Failed to submit requirement.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-zinc-200 shadow-sm p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        {/* Step Progress Header */}
        {!isSubmitted && (
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-[11px] font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Step {currentStep} of {totalSteps}</span>
              </div>

              <span className="text-xs font-bold text-zinc-400">
                {Math.round((currentStep / totalSteps) * 100)}% Completed
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Wizard Success State with Live Algorithmic Recommendations */}
        {isSubmitted ? (
          <div className="space-y-8 animate-in zoom-in-95 duration-300">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-zinc-100 text-black flex items-center justify-center mx-auto ring-8 ring-zinc-50 border border-zinc-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-600 block">
                Requirement Reference ID: {referenceId}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-950">
                Top Matches Grounded in Your Criteria
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 max-w-lg mx-auto leading-relaxed font-light">
                Our recommendation engine cross-referenced current RERA filings and verified developer inventory. An L2H advisor has been assigned to prepare your complete dossier.
              </p>
            </div>

            {/* Matched Properties Cards */}
            {matchedResults.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs border-b border-zinc-200 pb-2">
                  <span className="font-bold uppercase tracking-wider text-zinc-950">
                    Instant Algorithmic Recommendations ({matchedResults.length})
                  </span>
                  <span className="text-zinc-400">Ranked by Fit Score</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchedResults.slice(0, 4).map((res, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-black transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {res.matchPercentage}% Match
                          </span>
                          <span className="text-[10px] text-zinc-400 font-mono">{res.property.reraNumber}</span>
                        </div>

                        <h4 className="font-serif font-bold text-zinc-950 text-base line-clamp-1">
                          {res.property.title}
                        </h4>

                        <div className="text-xs text-zinc-950 font-serif font-bold">
                          {res.property.priceDisplay}
                        </div>

                        <p className="text-[11px] text-zinc-600 leading-relaxed font-light line-clamp-2">
                          💡 <strong>Why this fits:</strong> {res.rationale}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-zinc-200 flex items-center justify-between gap-2">
                        <Link
                          href={`/properties/${res.property.slug}`}
                          className="text-xs font-bold text-zinc-950 hover:underline flex items-center gap-1"
                        >
                          <span>Explore Dossier</span>
                          <ArrowRight className="w-3.5 h-3.5 text-black" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/properties"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors text-center shadow-sm"
              >
                Browse All Properties
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold text-xs uppercase tracking-wider transition-colors text-center border border-zinc-200"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Step 1: Category */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-bold text-zinc-950">
                    What type of property are you looking for?
                  </h3>
                  <p className="text-xs text-zinc-500 font-light">
                    Select your primary category of interest.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    { id: 'Homes', title: 'Luxury Apartments & Sky Villas', desc: 'Noida Expressway & Gurgaon high-rises', icon: Home },
                    { id: 'Villas', title: 'Independent Villas & Farmhouses', desc: 'Golf course villas & countryside retreats', icon: Building },
                    { id: 'Plots', title: 'Freehold Land & Plots', desc: 'Jewar Airport & Yamuna corridor', icon: Trees },
                    { id: 'Commercial', title: 'Commercial Offices & Retail', desc: 'High-yield pre-leased commercial assets', icon: Building2 },
                    { id: 'Investments', title: 'High-Yield Investment Portfolio', desc: '7.5%+ guaranteed annual rental cashflow', icon: TrendingUp },
                    { id: 'Studios', title: 'Serviced Studio Suites', desc: 'IT corridor corporate accommodations', icon: Compass }
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = lookingFor === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setLookingFor(item.id)}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-md'
                            : 'bg-zinc-50 text-zinc-950 border-zinc-200 hover:border-black'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-white text-black' : 'bg-white text-zinc-800 border border-zinc-200'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold font-serif">{item.title}</div>
                          <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>{item.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-bold text-zinc-950">
                    Which micro-market or corridor do you prefer?
                  </h3>
                  <p className="text-xs text-zinc-500 font-light">
                    Select your preferred region in Delhi NCR.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    'Sector 150 Noida (Sports City & Green Corridor)',
                    'Sector 124-128 Noida Expressway (South Delhi Gateway)',
                    'Sector 140A / Central Noida (Cyberthum & Metro SEZ)',
                    'Golf Course Road, DLF 5, Gurgaon',
                    'Golf Course Ext. Road (Sector 65, Gurgaon)',
                    'Yamuna Expressway (Jewar International Airport Corridor)',
                    'Goa (Assagao & North Coastal Luxury Villas)',
                    'Rishikesh (Ganges Foothills & Wellness Retreats)',
                    'Tehri (Tehri Lake & Himalayan Vista Chalets)',
                    'Jim Corbett (Ramnagar Riverfront Country Estates)',
                    'Dholera SIR (Smart City Industrial & High-Tech Corridor)',
                    'Sohna Road (Aravalli Forest Foothills)'
                  ].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setLocation(loc)}
                      className={`p-4 rounded-2xl border text-left text-xs font-semibold transition-all ${
                        location === loc
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-zinc-50 text-zinc-950 border-zinc-200 hover:border-black'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Budget */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-bold text-zinc-950">
                    What is your approximate budget range?
                  </h3>
                  <p className="text-xs text-zinc-500 font-light">
                    We only recommend options strictly within your defined allocation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    'Under ₹1.50 Cr',
                    '₹1.50 Cr – ₹3.00 Cr',
                    '₹3.00 Cr – ₹6.00 Cr',
                    '₹6.00 Cr – ₹12.00 Cr',
                    '₹12.00 Cr – ₹25.00 Cr',
                    '₹25.00 Cr+ (Trophy Estates & Penthouses)'
                  ].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`p-4 rounded-2xl border text-left text-xs font-semibold transition-all ${
                        budget === b
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-zinc-50 text-zinc-950 border-zinc-200 hover:border-black'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Timeline */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-bold text-zinc-950">
                    What is your purchase timeline?
                  </h3>
                  <p className="text-xs text-zinc-500 font-light">
                    Helps us prioritize ready-to-move vs. under-construction payment plans.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    { id: 'Immediately', label: 'Immediately (Ready to Move)', desc: 'Immediate possession & registry required' },
                    { id: '1–3 months', label: '1–3 Months', desc: 'Actively visiting sites and evaluating options' },
                    { id: '3–6 months', label: '3–6 Months', desc: 'Planning capital deployment in near term' },
                    { id: '6+ months', label: '6+ Months', desc: 'Looking for new launches with staggered construction milestones' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTimeline(t.id as any)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        timeline === t.id
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-zinc-50 text-zinc-950 border-zinc-200 hover:border-black'
                      }`}
                    >
                      <div className="text-xs font-bold font-serif">{t.label}</div>
                      <div className={`text-[11px] mt-0.5 ${timeline === t.id ? 'text-zinc-300' : 'text-zinc-500'}`}>{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Purpose */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-bold text-zinc-950">
                    What is the primary objective of this purchase?
                  </h3>
                  <p className="text-xs text-zinc-500 font-light">
                    We tailor our due diligence around your financial goal.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    { id: 'End Use', title: 'Self-Use Family Home', desc: 'Prioritizing lifestyle, schools, safety, and comfort' },
                    { id: 'Investment', title: 'Capital Appreciation', desc: 'Maximizing 3 to 5 year valuation growth multipliers' },
                    { id: 'Rental', title: 'Steady Monthly Rental Cashflow', desc: 'Pre-leased or high-demand corporate tenant corridor' },
                    { id: 'Both', title: 'Hybrid (End Use + Capital Growth)', desc: 'Living in the property while building long-term equity' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPurpose(p.id as any)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        purpose === p.id
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-zinc-50 text-zinc-950 border-zinc-200 hover:border-black'
                      }`}
                    >
                      <div className="text-xs font-bold font-serif">{p.title}</div>
                      <div className={`text-[11px] mt-0.5 ${purpose === p.id ? 'text-zinc-300' : 'text-zinc-500'}`}>{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Contact Information */}
            {currentStep === 6 && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-bold text-zinc-950">
                    Where should we share your curated shortlist?
                  </h3>
                  <p className="text-xs text-zinc-500 font-light">
                    A senior advisor will prepare your tailored report.
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-zinc-950 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      placeholder="e.g. Vikramaditya Singhania"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-950 focus:border-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-950 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-950 focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-zinc-950 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-950 focus:border-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-950 mb-1">
                      Preferred Contact Channel
                    </label>
                    <select
                      value={contactData.preferredContactMethod}
                      onChange={(e) => setContactData({ ...contactData, preferredContactMethod: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-950 focus:border-black focus:outline-none"
                    >
                      <option value="WhatsApp">WhatsApp (Fastest)</option>
                      <option value="Phone">Phone Call</option>
                      <option value="Email">Email Report</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-950 mb-1">
                    Any specific architectural or family requirements?
                  </label>
                  <textarea
                    rows={2}
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="e.g. Park facing unit, high floor, 2 reserved parking slots, near top international school..."
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-950 focus:border-black focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Synthesizing &amp; Submitting Requirement...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Requirement &amp; Get Shortlist</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Stepper Bottom Controls */}
            {currentStep < 6 && (
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-zinc-100">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-zinc-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
