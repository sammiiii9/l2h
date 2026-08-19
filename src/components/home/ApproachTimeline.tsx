'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  BarChart3, 
  Filter, 
  CheckCircle2, 
  Compass, 
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  FileText,
  Clock,
  Check,
  Building2,
  ChevronRight,
  Layers,
  Table as TableIcon,
  HelpCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import Link from 'next/link';

interface MethodologyStep {
  number: string;
  title: string;
  shortLabel: string;
  tagline: string;
  duration: string;
  coreQuestion: string;
  description: string;
  icon: React.ElementType;
  deliverable: {
    name: string;
    code: string;
    description: string;
  };
  pillars: {
    title: string;
    description: string;
  }[];
  traditionalVsL2H: {
    traditional: string;
    l2h: string;
  };
  riskMitigated: string;
}

const STEPS: MethodologyStep[] = [
  {
    number: '01',
    title: 'Understand',
    shortLabel: 'Discovery',
    tagline: 'Deep Lifestyle Diagnostic & Capital Mandate Discovery',
    duration: '24 – 48 Hours',
    coreQuestion: '“What does your ideal living standard, daily commute radius, and 5–10 year wealth creation plan actually look like?”',
    description: 'We begin with your life, not developer inventory. Before browsing a single property, our senior partners conduct an in-depth diagnostic into your lifestyle priorities, family horizon, tax structuring, risk appetite, and liquidity parameters.',
    icon: Compass,
    deliverable: {
      name: 'Personalized Acquisition Charter',
      code: 'PAC-Dossier',
      description: 'A comprehensive private blueprint defining exact square-footage needs, target corridors, budget allocations, and non-negotiable criteria.'
    },
    pillars: [
      {
        title: 'Lifestyle & Commute Mapping',
        description: 'Analysis of daily workplace transit, top school access, healthcare corridors, and community ambiance preferences.'
      },
      {
        title: 'Capital Allocation & Tax Planning',
        description: 'Structuring liquidity, evaluating loan eligibility, capital gains rollover timelines, and rental yield requirements.'
      },
      {
        title: 'End-Use vs. Investment Calibration',
        description: 'Clear segregation between emotional lifestyle aspirations and strict financial capital appreciation targets.'
      },
      {
        title: 'Timeline & Horizon Definition',
        description: 'Establishing clear possession urgency, staged payment horizons, and planned 5–10 year asset holding periods.'
      }
    ],
    traditionalVsL2H: {
      traditional: 'Pushes whichever developer project offers the highest sales commission without asking about your family needs.',
      l2h: 'Acts as an independent fiduciary—defining your custom acquisition charter before reviewing a single property.'
    },
    riskMitigated: 'Prevents misaligned purchases, rushed commitments, and buying the wrong configuration or corridor.'
  },
  {
    number: '02',
    title: 'Analyse',
    shortLabel: 'Intelligence',
    tagline: 'Micro-Market Intelligence, Sovereign Infra & Due Diligence',
    duration: '2 – 3 Days',
    coreQuestion: '“Which specific corridor, sector, and developer offers asymmetric upside, verified RERA compliance, and zero delivery risk?”',
    description: 'We deploy institutional-grade research models to audit micro-market supply-demand velocity, 10-year historical price curves, developer liquidity ratios, and sovereign infrastructure milestones (Metro links, Expressways, Airports).',
    icon: BarChart3,
    deliverable: {
      name: 'Micro-Market & Legal Intelligence Report',
      code: 'MMIR-Audit',
      description: 'Independent data dossier with comparative price indices, master-plan zoning maps, builder solvency checks, and RERA verification.'
    },
    pillars: [
      {
        title: 'Pricing Index & Real-Value Audits',
        description: 'Calculating true carpet area rates versus inflated super-built-up pricing to identify genuine fair-market value.'
      },
      {
        title: 'Infrastructure Catalyst Mapping',
        description: 'Direct evaluation of operational timelines for Jewar Airport, new Metro lines, and express highway interchanges.'
      },
      {
        title: 'Developer Solvency & Track Record',
        description: 'Rigorous vetting of past delivery timelines, escrow compliance, balance sheet health, and RERA litigation checks.'
      },
      {
        title: 'Rental Yield & Resale Velocity Models',
        description: 'Historical secondary transaction liquidity and tenant demand forecasts for corporate executive catchment areas.'
      }
    ],
    traditionalVsL2H: {
      traditional: 'Recycles marketing brochures and makes unverified promises regarding upcoming infrastructure and future prices.',
      l2h: 'Grounds every recommendation in audited registry data, government master plans, and developer solvency checks.'
    },
    riskMitigated: 'Eliminates stalled projects, fraudulent titles, delayed possession, and inflated developer valuations.'
  },
  {
    number: '03',
    title: 'Shortlist',
    shortLabel: 'Curation',
    tagline: 'Radical Elimination to Top 3–4 Unbiased Opportunities',
    duration: '48 Hours',
    coreQuestion: '“Out of 200+ available projects, which 3 rigorously satisfy your acquisition charter with proven quality?”',
    description: 'We eliminate 95%+ of market inventory that fails our quality, legal, or builder delivery thresholds. We present only the top 3–4 curated options with exhaustive unit-level architectural analysis and transparent pros & cons.',
    icon: Filter,
    deliverable: {
      name: 'Curated 3-Property Shortlist Matrix',
      code: 'CSM-Matrix',
      description: 'A side-by-side comparison matrix with layout efficiencies, sunlight orientations, acoustic privacy, and compromise notes.'
    },
    pillars: [
      {
        title: 'Strict Elimination Protocol',
        description: 'Filtering out high-density congested developments, delayed builders, and substandard construction specifications.'
      },
      {
        title: 'Unit-Level Micro Audits',
        description: 'Evaluating exact floor plate efficiency, sunlight angles, cross-ventilation, elevator-to-unit ratios, and privacy.'
      },
      {
        title: 'Transparent Compromise Reports',
        description: 'Every property has trade-offs. We explicitly document what you give up (e.g., density vs proximity) for full transparency.'
      },
      {
        title: 'Direct Senior Inventory Access',
        description: 'Securing preferred corner units, optimal floor heights, and non-public inventory via institutional relationships.'
      }
    ],
    traditionalVsL2H: {
      traditional: 'Spams your WhatsApp with 25+ unvetted brochures and bombards you with persistent sales calls.',
      l2h: 'Filters out the noise to deliver a curated 3-asset matrix with objective trade-off analyses and zero spam.'
    },
    riskMitigated: 'Saves 40+ hours of wasted site visits and shields you from deceptive floor plans and dark corner units.'
  },
  {
    number: '04',
    title: 'Deliver',
    shortLabel: 'Execution',
    tagline: 'Escorted VIP Discovery, Price Negotiation & Agreement Vetting',
    duration: '3 – 5 Days',
    coreQuestion: '“How do we secure the finest unit with optimal commercial terms, payment milestones, and watertight legal contracts?”',
    description: 'We manage end-to-end execution: private chauffeured site inspections with a senior advisory partner, institutional negotiation directly with developer senior leadership, and meticulous clause-by-clause review of the Builder-Buyer Agreement (BBA).',
    icon: CheckCircle2,
    deliverable: {
      name: 'VIP Transaction & Contract Audit Pack',
      code: 'CAP-Execution',
      description: 'Vetted BBA agreements, customized payment schedule schedules, verified price concessions, and loan pre-clearance.'
    },
    pillars: [
      {
        title: 'Private Escorted Site Tours',
        description: 'Chauffeured site visits with a senior advisory consultant inspecting construction quality, view planes, and ambient noise.'
      },
      {
        title: 'Executive Price Negotiation',
        description: 'Leveraging institutional advisory volume to secure preferential pricing, waiver of hidden charges, and flexible payment plans.'
      },
      {
        title: 'Builder-Buyer Agreement (BBA) Audit',
        description: 'Independent scrutiny of penalty clauses, possession escalation terms, and hidden parking/clubhouse fees.'
      },
      {
        title: 'Banking & Home Loan Coordination',
        description: 'Streamlined loan syndication with top nationalized and private banks at prime institutional interest rates.'
      }
    ],
    traditionalVsL2H: {
      traditional: 'Leaves you to negotiate alone with developer sales teams and ignores fine-print contract clauses.',
      l2h: 'Negotiates directly at the developer executive level and conducts legal due diligence on all signing documents.'
    },
    riskMitigated: 'Prevents one-sided contract traps, unexpected additional costs, and sub-optimal unit allocations.'
  },
  {
    number: '05',
    title: 'Decide Better',
    shortLabel: 'Stewardship',
    tagline: 'Long-Term Decision Confidence & Lifetime Asset Stewardship',
    duration: 'Lifelong Partnership',
    coreQuestion: '“How do we ensure this real-estate asset continues to protect your capital, optimize yields, and compound wealth over decades?”',
    description: 'Our advisory does not end at registry. We provide a zero-pressure environment where you can walk away if an asset does not meet 100% of your criteria. Post-acquisition, we manage possession inspections, leasing, and timed portfolio exits.',
    icon: ShieldCheck,
    deliverable: {
      name: 'Lifetime Asset Stewardship & Exit Roadmap',
      code: 'LSR-Roadmap',
      description: 'Key handover snagging audit, tenant leasing onboarding, annual valuation reviews, and timed secondary market exit strategies.'
    },
    pillars: [
      {
        title: 'Zero Sales Pressure Guarantee',
        description: 'We empower you to say no. If negotiations or due diligence reveal red flags, we gladly walk away together.'
      },
      {
        title: 'Handover Snagging & Registry Support',
        description: 'Thorough engineering checklist inspection before taking final physical possession and complete registry assistance.'
      },
      {
        title: 'High-Yield Leasing Desk',
        description: 'Turnkey tenant discovery, corporate expat leases, and rent collection management for investor clients.'
      },
      {
        title: 'Annual Portfolio Valuation & Timed Exit',
        description: 'Ongoing asset tracking with scheduled reviews to maximize capital gains during peak infrastructure cycles.'
      }
    ],
    traditionalVsL2H: {
      traditional: 'Disappears permanently the moment the broker commission check clears, offering zero post-sales support.',
      l2h: 'Remains your lifelong real estate partner—providing leasing management, annual valuations, and exit advisory.'
    },
    riskMitigated: 'Protects against substandard builder handovers, vacant rental assets, and missed capital exit windows.'
  }
];

export default function ApproachTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const [viewMode, setViewMode] = useState<'interactive' | 'matrix'>('interactive');

  const currentStep = STEPS[activeStep];
  const IconComponent = currentStep.icon;

  const handlePrev = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : STEPS.length - 1));
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-24 bg-white text-zinc-950 relative overflow-hidden border-y border-zinc-200" id="methodology">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-zinc-700" />
            <span>The L2H Advisory Framework</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-zinc-950 tracking-tight leading-tight">
            The L2H Methodology
          </h2>

          {/* 5-Step Subtitle Arrow Sequence */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1 text-sm sm:text-lg font-medium text-zinc-800">
            {STEPS.map((s, idx) => (
              <React.Fragment key={s.number}>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('interactive');
                    setActiveStep(idx);
                  }}
                  className={`transition-all hover:text-black font-serif ${
                    activeStep === idx && viewMode === 'interactive'
                      ? 'text-black font-bold border-b-2 border-black pb-0.5'
                      : 'text-zinc-500 font-normal'
                  }`}
                >
                  {s.title}
                </button>
                {idx < STEPS.length - 1 && (
                  <span className="text-zinc-400 text-xs">→</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-zinc-600 text-xs sm:text-base font-light max-w-3xl mx-auto leading-relaxed pt-2">
            Real estate decisions should never be impulsive sales transactions. We created a disciplined 5-stage institutional advisory framework designed to eliminate bias, uncover hidden legal & engineering risks, optimize capital allocation, and ensure lifelong decision confidence.
          </p>

          {/* View Mode Toggle: Interactive Stepper vs At-a-Glance Matrix */}
          <div className="inline-flex flex-col sm:flex-row p-1 bg-zinc-100 rounded-2xl border border-zinc-200 shadow-inner mt-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setViewMode('interactive')}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                viewMode === 'interactive'
                  ? 'bg-black text-white shadow-md'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Step-by-Step Deep Dive</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('matrix')}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                viewMode === 'matrix'
                  ? 'bg-black text-white shadow-md'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>At-a-Glance Workflow Matrix</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* VIEW 1: INTERACTIVE ARCHITECTURAL STEPPER */}
        {/* ========================================================= */}
        {viewMode === 'interactive' && (
          <div className="space-y-8">
            {/* 5-Step Horizontal Navigation Bar with Progress Line */}
            <div className="relative">
              {/* Progress Connector Background */}
              <div className="hidden lg:block absolute top-1/2 left-6 right-6 -translate-y-1/2 h-[2px] bg-zinc-200 z-0" />
              
              {/* Active Connector Highlight */}
              <div 
                className="hidden lg:block absolute top-1/2 left-6 -translate-y-1/2 h-[2px] bg-black transition-all duration-300 z-0"
                style={{ width: `${(activeStep / (STEPS.length - 1)) * 92}%` }}
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
                {STEPS.map((step, idx) => {
                  const StepIcon = step.icon;
                  const isActive = activeStep === idx;
                  const isPast = activeStep > idx;

                  return (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 relative group ${
                        idx === 4 ? 'col-span-2 sm:col-span-1' : 'col-span-1'
                      } ${
                        isActive
                          ? 'bg-black text-white border-black shadow-xl scale-[1.02] sm:scale-[1.03]'
                          : isPast
                          ? 'bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-900 shadow-sm'
                          : 'bg-zinc-50/90 hover:bg-zinc-100 border-zinc-200 text-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`font-mono text-xs font-bold tracking-wider px-2 py-0.5 rounded ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : isPast 
                            ? 'bg-zinc-100 text-zinc-900' 
                            : 'bg-zinc-200/80 text-zinc-600'
                        }`}>
                          STAGE {step.number}
                        </span>
                        
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                          isActive 
                            ? 'bg-white text-black' 
                            : isPast 
                            ? 'bg-black text-white' 
                            : 'bg-zinc-200 text-zinc-600'
                        }`}>
                          {isPast ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : (
                            <StepIcon className="w-3.5 h-3.5" />
                          )}
                        </div>
                      </div>

                      <div>
                        <div className={`font-serif font-bold text-base sm:text-lg ${isActive ? 'text-white' : 'text-zinc-950'}`}>
                          {step.title}
                        </div>
                        <div className={`text-[11px] truncate font-medium ${isActive ? 'text-zinc-300' : 'text-zinc-500'}`}>
                          {step.shortLabel} · {step.duration}
                        </div>
                      </div>

                      {/* Active Indicator Arrow */}
                      {isActive && (
                        <div className="hidden lg:block absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-black" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Stage Detailed Master Card */}
            <div className="bg-zinc-50 rounded-3xl p-6 sm:p-10 lg:p-12 border border-zinc-200/90 shadow-luxury space-y-10">
              {/* Top Banner: Stage Meta & Question */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-zinc-200">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-black text-white font-mono text-xs font-bold uppercase tracking-wider">
                      Stage {currentStep.number} of 05
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 font-mono">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      {currentStep.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-zinc-950">
                    {currentStep.title} — <span className="font-normal italic text-zinc-600">{currentStep.tagline}</span>
                  </h3>
                </div>

                {/* Deliverable Badge */}
                <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm flex items-start gap-3.5 max-w-sm">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0 text-black">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700">
                        {currentStep.deliverable.code}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Guaranteed Deliverable
                      </span>
                    </div>
                    <div className="text-xs font-bold text-zinc-950 mt-1">
                      {currentStep.deliverable.name}
                    </div>
                    <div className="text-[11px] text-zinc-500 font-light mt-0.5 line-clamp-2">
                      {currentStep.deliverable.description}
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Question Answered in This Stage */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border-l-4 border-l-black border border-zinc-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-black" />
                  <span>The Strategic Question We Answer In This Stage:</span>
                </div>
                <p className="text-base sm:text-lg font-serif italic text-zinc-800 leading-relaxed font-normal">
                  {currentStep.coreQuestion}
                </p>
                <p className="text-xs sm:text-sm text-zinc-600 font-light pt-1 leading-relaxed">
                  {currentStep.description}
                </p>
              </div>

              {/* 4 Core Action Pillars Grid */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                  <Building2 className="w-4 h-4 text-black" />
                  <span>Stage {currentStep.number} Execution Pillars &amp; Advisory Scope</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {currentStep.pillars.map((pillar, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-black/40 transition-colors shadow-sm space-y-2"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                        <h4 className="text-xs sm:text-sm font-bold text-zinc-950">
                          {pillar.title}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-600 font-light leading-relaxed pl-6.5">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traditional Brokerage vs L2H Advisory Callout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 pt-2">
                {/* Traditional Brokerage Flaw */}
                <div className="md:col-span-6 p-5 rounded-2xl bg-rose-50/50 border border-rose-200/70 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800">
                    <span className="w-2 h-2 rounded-full bg-rose-600" />
                    <span>Traditional Broker Approach:</span>
                  </div>
                  <p className="text-xs text-rose-950 font-light leading-relaxed">
                    {currentStep.traditionalVsL2H.traditional}
                  </p>
                </div>

                {/* The L2H Advisory Standard */}
                <div className="md:col-span-6 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                    <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                    <span>The L2H Advisory Standard:</span>
                  </div>
                  <p className="text-xs text-emerald-950 font-light leading-relaxed">
                    {currentStep.traditionalVsL2H.l2h}
                  </p>
                </div>
              </div>

              {/* Bottom Footer: Stepper Navigation & CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-200">
                {/* Previous & Next Buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-semibold transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-semibold transition-colors"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Direct Action CTAs */}
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                  <Link
                    href="/find-property"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold text-xs uppercase tracking-wider transition-colors border border-zinc-200"
                  >
                    <span>Try Property Matcher</span>
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                  >
                    <span>Schedule Stage 1 Discovery</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: AT-A-GLANCE WORKFLOW MATRIX */}
        {/* ========================================================= */}
        {viewMode === 'matrix' && (
          <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-luxury">
            <div className="p-6 sm:p-8 bg-zinc-50 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-950">
                  The L2H 5-Stage Advisory Matrix
                </h3>
                <p className="text-xs text-zinc-600 font-light mt-1">
                  How our rigorous methodology translates into tangible safety, verified valuations, and lifelong decision confidence.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('interactive')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shrink-0"
              >
                <span>Switch to Step-by-Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-100/80 border-b border-zinc-200 font-mono text-zinc-700 uppercase tracking-wider text-[11px]">
                    <th className="py-4 px-6 font-bold w-16">Stage</th>
                    <th className="py-4 px-6 font-bold w-48">Core Focus</th>
                    <th className="py-4 px-6 font-bold">What We Investigate</th>
                    <th className="py-4 px-6 font-bold w-56">Tangible Deliverable</th>
                    <th className="py-4 px-6 font-bold w-56">Risk Eliminated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {STEPS.map((s, idx) => {
                    const StepIcon = s.icon;
                    return (
                      <tr 
                        key={s.number} 
                        className={`hover:bg-zinc-50/80 transition-colors ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-zinc-50/40'
                        }`}
                      >
                        {/* Stage Number & Icon */}
                        <td className="py-5 px-6 font-mono font-bold text-zinc-950 align-top">
                          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs mb-1">
                            {s.number}
                          </div>
                          <span className="text-[10px] text-zinc-500 font-normal">{s.duration}</span>
                        </td>

                        {/* Title & Tagline */}
                        <td className="py-5 px-6 align-top">
                          <div className="font-serif font-bold text-base text-zinc-950">
                            {s.title}
                          </div>
                          <div className="text-[11px] text-zinc-500 font-light mt-0.5 leading-snug">
                            {s.tagline}
                          </div>
                        </td>

                        {/* Pillars */}
                        <td className="py-5 px-6 align-top space-y-1.5">
                          {s.pillars.slice(0, 3).map((p, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-1.5 text-zinc-700">
                              <span className="text-black font-bold">·</span>
                              <span className="font-medium text-[11px]">{p.title}</span>
                            </div>
                          ))}
                        </td>

                        {/* Deliverable */}
                        <td className="py-5 px-6 align-top">
                          <div className="p-3 rounded-xl bg-zinc-100 border border-zinc-200">
                            <span className="text-[10px] font-mono font-bold text-zinc-500 block mb-0.5">
                              {s.deliverable.code}
                            </span>
                            <span className="font-bold text-zinc-950 block text-xs">
                              {s.deliverable.name}
                            </span>
                          </div>
                        </td>

                        {/* Risk Mitigated */}
                        <td className="py-5 px-6 align-top">
                          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-light text-[11px] leading-relaxed">
                            {s.riskMitigated}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Matrix CTA Footer */}
            <div className="p-6 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-zinc-600">
                <ShieldCheck className="w-5 h-5 text-black shrink-0" />
                <span>All 5 stages are executed without any upfront retainer or commitment until you choose to proceed.</span>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Initiate Your Advisory Mandate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* 3 Value Pillars Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-lg text-zinc-950">Fiduciary Commitment</h4>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              We represent you, not developers. Our mandate is uncovering structural, legal, and financial truths to protect your family capital.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-lg text-zinc-950">Data-Backed Valuations</h4>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              Every unit recommendation is audited against sovereign infrastructure timelines, historical registry prices, and true carpet efficiencies.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-lg text-zinc-950">Zero Sales Pressure</h4>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              We empower you to walk away from any deal. If an asset fails due diligence or contract audits, we advise against proceeding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
