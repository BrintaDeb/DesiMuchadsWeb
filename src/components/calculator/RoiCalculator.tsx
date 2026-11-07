"use client";

import React, { useState, useId } from "react";
import {
  Calculator,
  IndianRupee,
  Users,
  Eye,
  Check,
  Send,
} from "lucide-react";
import { FiligreeCorner } from "@/components/common/Icons";
import { SectionDivider } from "@/components/common/SectionDivider";
import { sound } from "@/lib/sound";

export function RoiCalculator() {
  const budgetId = useId();
  const [budget, setBudget] = useState(150000); // 1.5 Lakh default
  const [industry, setIndustry] = useState("Fashion & D2C Apparel");
  const [objective, setObjective] = useState<"ecommerce" | "leads">("ecommerce");

  const industries = [
    { name: "Fashion & D2C Apparel", roas: 5.6, conversionRate: 0.032 },
    { name: "Jewellery & Luxury", roas: 6.8, conversionRate: 0.024 },
    { name: "Food, QSR & FMCG", roas: 4.8, conversionRate: 0.041 },
    { name: "Beauty & Wellness", roas: 5.2, conversionRate: 0.036 },
    { name: "Electronics & Tech", roas: 4.4, conversionRate: 0.028 },
    { name: "Real Estate & High-Ticket", roas: 7.4, conversionRate: 0.018 },
  ];

  const selectedIndustry =
    industries.find((i) => i.name === industry) || industries[0];

  const calculateMetrics = () => {
    const roasMultiplier =
      objective === "ecommerce"
        ? selectedIndustry.roas
        : selectedIndustry.roas * 1.15;

    const estimatedRevenue = Math.round(budget * roasMultiplier);

    const cpcEstimate = 14;
    const traffic = Math.round(budget / cpcEstimate);
    const qualifiedConversions = Math.round(
      traffic * selectedIndustry.conversionRate
    );

    const cpmEstimate = 180;
    const impressions = Math.round((budget / cpmEstimate) * 1000);

    return {
      estimatedRevenue,
      roasMultiplier: roasMultiplier.toFixed(1),
      traffic,
      qualifiedConversions,
      impressions,
    };
  };

  const metrics = calculateMetrics();

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatNumber = (val: number) => {
    return new Intl.NumberFormat("en-IN").format(val);
  };

  const handleWhatsAppShare = () => {
    sound.playChime();
    const text = encodeURIComponent(
      `Pranam Desi Muchads! I ran the Hisab-Kitab Simulator for ${industry} with ₹${formatNumber(
        budget
      )} ad budget. Projected Revenue: ₹${formatNumber(
        metrics.estimatedRevenue
      )} (${metrics.roasMultiplier}x ROAS). Let's review my media plan!`
    );
    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
  };

  return (
    <section id="calculator" className="relative py-24 sm:py-32 bg-[#09090b] overflow-hidden border-t border-white/10 text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[150px] pointer-events-none" />

      <SectionDivider label="HISAB-KITAB SIMULATOR" sublabel="HIGH-ROAS PROJECTIONS" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-mono text-white mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>REAL-TIME AD-SPEND &amp; ROAS ESTIMATOR</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white uppercase leading-tight">
            Hisab-Kitab: Calculate Your Market Domination
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-sans">
            Dial in your ad budget, choose your sector, and see the exact high-ROAS returns we engineer with our battle-tested algorithms.
          </p>
        </div>

        {/* The Calculator Box */}
        <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-[#121215] border border-white/15 border-t-white/25 backdrop-blur-2xl shadow-2xl">
          {/* Filigree Corner Accents */}
          <div className="absolute top-4 left-4 pointer-events-none opacity-40">
            <FiligreeCorner className="w-5 h-5 text-white/50" position="top-left" />
          </div>
          <div className="absolute top-4 right-4 pointer-events-none opacity-40">
            <FiligreeCorner className="w-5 h-5 text-white/50" position="top-right" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left Inputs Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              {/* Input 1: Monthly Ad Budget Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor={budgetId} className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-semibold">
                    1. Monthly Marketing Fuel (Ad Budget)
                  </label>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-white">
                    {formatINR(budget)}
                  </span>
                </div>

                <input
                  id={budgetId}
                  aria-label="Monthly Ad Budget Slider"
                  type="range"
                  min="25000"
                  max="2500000"
                  step="25000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                />

                <div className="flex justify-between font-mono text-[11px] text-zinc-400 mt-2">
                  <span>₹25,000 (Testing)</span>
                  <span>₹10,00,000 (Growth)</span>
                  <span>₹25,00,000+ (Scale)</span>
                </div>
              </div>

              {/* Input 2: Industry Selector Pills */}
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-semibold block mb-3">
                  2. Select Your Industry Sector
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {industries.map((ind) => {
                    const isSelected = industry === ind.name;
                    return (
                      <button
                        key={ind.name}
                        type="button"
                        onClick={() => setIndustry(ind.name)}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-mono font-medium transition-all text-left flex items-center justify-between ${
                          isSelected
                            ? "border-white bg-white text-black font-bold shadow-md"
                            : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        <span className="truncate">{ind.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-black shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input 3: Primary Objective Toggle */}
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-semibold block mb-3">
                  3. Primary Campaign Objective
                </label>
                <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-zinc-900 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setObjective("ecommerce")}
                    className={`py-3 px-4 rounded-xl text-xs font-mono font-bold transition-all ${
                      objective === "ecommerce"
                        ? "bg-white text-black shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Direct E-Commerce Sales
                  </button>
                  <button
                    type="button"
                    onClick={() => setObjective("leads")}
                    className={`py-3 px-4 rounded-xl text-xs font-mono font-bold transition-all ${
                      objective === "leads"
                        ? "bg-white text-black shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    High-Ticket Lead Generation
                  </button>
                </div>
              </div>
            </div>

            {/* Right Live Projected Results Column (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-[#18181d] border border-white/20 flex flex-col justify-between shadow-xl">
              <div>
                {/* Result Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
                    PROJECTED OUTCOMES
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white font-mono text-[11px] font-bold">
                    <span>{metrics.roasMultiplier}x Target ROAS</span>
                  </div>
                </div>

                {/* Big Projected Revenue Highlight */}
                <div className="mb-6 p-4 rounded-2xl bg-[#121214] border border-white/15 text-center">
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-1">
                    Estimated Monthly Revenue Generated
                  </span>
                  <div className="text-3xl sm:text-4xl font-metric font-black text-white tracking-tight">
                    {formatINR(metrics.estimatedRevenue)}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-300 mt-1 block">
                    ✦ Scaled with Desi Muchads Performance Engine
                  </span>
                </div>

                {/* Detailed Metric Rows */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-mono">
                      <Users className="w-4 h-4 text-white" />
                      <span>{objective === "leads" ? "Projected Qualified Leads" : "Projected Orders"}</span>
                    </div>
                    <span className="font-mono font-bold text-sm text-white">
                      {formatNumber(metrics.qualifiedConversions)}+
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-mono">
                      <Eye className="w-4 h-4 text-white" />
                      <span>Estimated Ad Impressions</span>
                    </div>
                    <span className="font-mono font-bold text-sm text-white">
                      {formatNumber(metrics.impressions)}+
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-mono">
                      <IndianRupee className="w-4 h-4 text-white" />
                      <span>Estimated Return on Ad Spend</span>
                    </div>
                    <span className="font-mono font-bold text-sm text-white">
                      {metrics.roasMultiplier}x ROAS
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Trigger Button */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="w-full py-4 px-6 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2.5 active:scale-95"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>CLAIM THIS GROWTH RUNWAY &gt;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
