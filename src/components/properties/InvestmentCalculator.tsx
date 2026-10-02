'use client';

import React, { useState } from 'react';
import { TrendingUp, Calculator, Sparkles, DollarSign, Calendar, ShieldAlert, ArrowRight } from 'lucide-react';
import { formatPrice, formatIndianNumber, calculateEmi } from '@/lib/utils';

interface InvestmentCalculatorProps {
  initialPrice?: number;
  initialRentalYield?: number;
  initialAppreciation?: number;
  onConsultClick?: () => void;
}

export default function InvestmentCalculator({
  initialPrice = 25000000,
  initialRentalYield = 4.5,
  initialAppreciation = 12.0,
  onConsultClick
}: InvestmentCalculatorProps) {
  const [purchasePrice, setPurchasePrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.75);
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [holdingPeriodYears, setHoldingPeriodYears] = useState(5);
  const [expectedAppreciation, setExpectedAppreciation] = useState(initialAppreciation);
  const [expectedRentalYield, setExpectedRentalYield] = useState(initialRentalYield);

  const safePrice = Math.max(100000, purchasePrice || 0);
  const safeHoldingYears = Math.max(1, holdingPeriodYears || 1);
  const safeDownPayment = Math.min(100, Math.max(0, downPaymentPercent || 0));

  // Calculations
  const downPaymentAmount = (safePrice * safeDownPayment) / 100;
  const loanAmount = Math.max(0, safePrice - downPaymentAmount);
  const emiObj = loanAmount > 0 ? calculateEmi(loanAmount, interestRate, loanTenureYears) : { emi: 0, totalInterest: 0, totalPayment: 0 };
  const monthlyEmi = emiObj.emi;
  const annualEmi = monthlyEmi * 12;

  // Future Value with compound annual appreciation
  const futureValue = safePrice * Math.pow(1 + (expectedAppreciation || 0) / 100, safeHoldingYears);
  const capitalGain = futureValue - safePrice;

  // Rental Income over holding period with estimated 5% annual escalation
  let totalRentalIncome = 0;
  let currentYearRental = (safePrice * (expectedRentalYield || 0)) / 100;
  for (let i = 0; i < safeHoldingYears; i++) {
    totalRentalIncome += currentYearRental;
    currentYearRental *= 1.05; // 5% escalation every year
  }

  // Total Outflow over holding period
  const totalLoanPaidOverHolding = annualEmi * Math.min(safeHoldingYears, loanTenureYears);
  const totalEquityInvested = downPaymentAmount + totalLoanPaidOverHolding;

  // Net Profit
  const netGain = capitalGain + totalRentalIncome;
  const totalRoiPercent = totalEquityInvested > 0 ? ((netGain / totalEquityInvested) * 100).toFixed(1) : '0';

  return (
    <div className="bg-[#09090b] text-white rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Interactive Financial Model</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Investment &amp; Capital Appreciation Calculator
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-light">
            Simulate holding-period cash flows, projected capital gains, and net ROI.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Holding Horizon</span>
          <div className="text-2xl font-serif font-bold text-white">{holdingPeriodYears} Years</div>
        </div>
      </div>

      {/* Inputs & Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-7 space-y-5 text-xs">
          {/* Purchase Price */}
          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-zinc-300">Property Acquisition Price:</span>
              <span className="text-white font-serif text-sm font-bold">{formatPrice(purchasePrice)}</span>
            </div>
            <input
              type="range"
              min={5000000}
              max={200000000}
              step={1000000}
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>

          {/* Down Payment & Holding Period */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 p-3.5 rounded-2xl bg-[#121214] border border-white/10">
              <div className="flex justify-between">
                <span className="text-zinc-400">Down Payment ({downPaymentPercent}%):</span>
                <span className="text-white font-bold">{formatPrice(downPaymentAmount)}</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>

            <div className="space-y-2 p-3.5 rounded-2xl bg-[#121214] border border-white/10">
              <div className="flex justify-between">
                <span className="text-zinc-400">Holding Period:</span>
                <span className="text-white font-bold">{holdingPeriodYears} Years</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                step={1}
                value={holdingPeriodYears}
                onChange={(e) => setHoldingPeriodYears(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>

          {/* Expected Growth & Rental Yield */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 p-3.5 rounded-2xl bg-[#121214] border border-white/10">
              <div className="flex justify-between">
                <span className="text-zinc-400">Expected Appreciation:</span>
                <span className="text-emerald-400 font-bold">{expectedAppreciation}% / yr</span>
              </div>
              <input
                type="range"
                min={5}
                max={25}
                step={0.5}
                value={expectedAppreciation}
                onChange={(e) => setExpectedAppreciation(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            <div className="space-y-2 p-3.5 rounded-2xl bg-[#121214] border border-white/10">
              <div className="flex justify-between">
                <span className="text-zinc-400">Gross Rental Yield:</span>
                <span className="text-white font-bold">{expectedRentalYield}% / yr</span>
              </div>
              <input
                type="range"
                min={2}
                max={10}
                step={0.2}
                value={expectedRentalYield}
                onChange={(e) => setExpectedRentalYield(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Output Summary Card */}
        <div className="lg:col-span-5 bg-[#121214] rounded-3xl p-6 border border-white/10 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider font-bold text-zinc-400 flex items-center gap-1.5">
              <span>Projected {holdingPeriodYears}-Year Financial Outcome</span>
            </div>

            <div className="space-y-3 divide-y divide-white/5 text-xs">
              <div className="flex justify-between pt-1">
                <span className="text-zinc-400">Estimated Future Value:</span>
                <span className="font-serif font-bold text-white text-sm">{formatPrice(futureValue)}</span>
              </div>

              <div className="flex justify-between pt-3">
                <span className="text-zinc-400">Estimated Capital Gain:</span>
                <span className="font-serif font-bold text-emerald-400 text-sm">+{formatPrice(capitalGain)}</span>
              </div>

              <div className="flex justify-between pt-3">
                <span className="text-zinc-400">Cumulative Rental Income:</span>
                <span className="font-serif font-bold text-white text-sm">+{formatPrice(totalRentalIncome)}</span>
              </div>

              {loanAmount > 0 && (
                <div className="flex justify-between pt-3">
                  <span className="text-zinc-400">Estimated Monthly EMI:</span>
                  <span className="font-mono text-zinc-300">₹{formatIndianNumber(monthlyEmi)} / mo</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-3">
                <span className="text-zinc-200 font-bold uppercase tracking-wider text-[11px]">Illustrative Net ROI:</span>
                <span className="font-serif text-2xl font-bold text-white">{totalRoiPercent}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={onConsultClick}
              className="w-full py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>Discuss Custom Investment Structuring</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-1.5 text-[10px] text-zinc-400 leading-tight font-light">
              <ShieldAlert className="w-3 h-3 text-zinc-400 shrink-0 mt-0.5" />
              <span>
                Estimates are illustrative simulations and are not guaranteed returns or financial advice. Past corridor performance does not guarantee future yields.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
