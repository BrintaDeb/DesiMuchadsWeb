"use client";

import React, { useState, useMemo } from "react";
import { SectionDivider } from "../common/SectionDivider";
import { FiligreeCorner, MoustacheSVG } from "../common/Icons";
import {
  Calculator,
  MessageCircle,
  TrendingUp,
  Users,
  Eye,
  IndianRupee,
  Check,
} from "lucide-react";

export function RoiCalculator() {
  // Inputs
  const [budget, setBudget] = useState<number>(250000); // Default ₹2,50,000
  const [industry, setIndustry] = useState<string>("D2C Fashion");
  const [objective, setObjective] = useState<"leads" | "ecommerce">("ecommerce");

  const industries = [
    { name: "D2C Fashion", baseRoas: 4.8, cpc: 9.5, convRate: 0.032 },
    { name: "Real Estate", baseRoas: 6.2, cpc: 28, convRate: 0.045 },
    { name: "Hospitality & Travel", baseRoas: 4.2, cpc: 12, convRate: 0.028 },
    { name: "EdTech & Courses", baseRoas: 3.8, cpc: 18, convRate: 0.038 },
    { name: "Retail & FMCG", baseRoas: 5.1, cpc: 7.5, convRate: 0.035 },
    { name: "Luxury & Lifestyle", baseRoas: 5.6, cpc: 32, convRate: 0.022 },
  ];

  const currentIndustryConfig = useMemo(() => {
    return (
      industries.find((i) => i.name === industry) || {
        baseRoas: 4.5,
        cpc: 10,
        convRate: 0.03,
      }
    );
  }, [industry]);

  // Calibrated Calculations
  const metrics = useMemo(() => {
    const cpm = 180; // Avg CPM ₹180 in Indian digital landscape
    const impressions = Math.floor((budget / cpm) * 1000);
    const clicks = Math.floor(budget / currentIndustryConfig.cpc);

    let roasMultiplier = currentIndustryConfig.baseRoas;
    if (objective === "leads") {
      roasMultiplier = currentIndustryConfig.baseRoas * 1.15; // Higher attributed return in high-ticket leads
    }

    const estimatedRevenue = Math.floor(budget * roasMultiplier);

    const qualifiedConversions = Math.floor(
      clicks * currentIndustryConfig.convRate
    );

    return {
      impressions,
      clicks,
      roasMultiplier: roasMultiplier.toFixed(1),
      estimatedRevenue,
      qualifiedConversions,
    };
  }, [budget, currentIndustryConfig, objective]);

  // Format INR Currency
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

  // WhatsApp Pre-filled payload
  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Pranam Desi Muchads! 🙏\n\nI just ran our numbers on your Hisab-Kitab ROAS Calculator:\n` +
        `✦ Monthly Ad Budget: ${formatINR(budget)}\n` +
        `✦ Industry: ${industry}\n` +
        `✦ Objective: ${objective === "leads" ? "Lead Generation" : "E-Commerce Direct Sales"}\n` +
        `✦ Projected Revenue: ${formatINR(metrics.estimatedRevenue)} (${metrics.roasMultiplier}x ROAS)\n` +
        `✦ Expected ${objective === "leads" ? "Qualified Leads" : "Orders"}: ${formatNumber(metrics.qualifiedConversions)}\n\n` +
        `Let's schedule a Baithak and lock in this growth plan! 〰️`
    );
    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
  };

  return (
    <section id="calculator" className="relative py-24 sm:py-32 bg-[#0A0D18] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#E11D48]/10 blur-[140px] pointer-events-none" />

      <SectionDivider label="HISAB-KITAB SIMULATOR" sublabel="HIGH-ROAS PROJECTIONS" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-xs font-mono text-[#D4AF37] mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>REAL-TIME AD-SPEND & ROAS ESTIMATOR</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-[#F7F1E5]">
            Hisab-Kitab: Calculate Your{" "}
            <span className="brass-gradient-text">Market Domination.</span>
          </h2>
          <p className="mt-4 text-[#F7F1E5]/70 text-sm sm:text-base">
            Dial in your ad budget, choose your sector, and see the exact high-ROAS returns we engineer with our battle-tested algorithms.
          </p>
        </div>

        {/* The Calculator Box */}
        <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-[#0D0C12]/90 border border-[#D4AF37]/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* Filigree Corner Accents */}
          <div className="absolute top-4 left-4 pointer-events-none opacity-40">
            <FiligreeCorner className="w-5 h-5 text-[#D4AF37]" position="top-left" />
          </div>
          <div className="absolute top-4 right-4 pointer-events-none opacity-40">
            <FiligreeCorner className="w-5 h-5 text-[#D4AF37]" position="top-right" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left Inputs Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              {/* Input 1: Monthly Ad Budget Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="budgetSlider" className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                    1. Monthly Marketing Fuel (Ad Budget)
                  </label>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#F5DE88]">
                    {formatINR(budget)}
                  </span>
                </div>

                <input
                  id="budgetSlider"
                  aria-label="Monthly Ad Budget Slider"
                  type="range"
                  min="25000"
                  max="2500000"
                  step="25000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#141829] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />

                <div className="flex justify-between font-mono text-[11px] text-[#F7F1E5]/50 mt-2">
                  <span>₹25,000 (Testing)</span>
                  <span>₹10,00,000 (Growth)</span>
                  <span>₹25,00,000+ (Scale)</span>
                </div>
              </div>

              {/* Input 2: Industry Selector Pills */}
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-3">
                  2. Select Your Industry Darbar
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
                            ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#F5DE88] shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                            : "border-[#D4AF37]/20 bg-[#141829]/60 text-[#F7F1E5]/70 hover:border-[#D4AF37]/50"
                        }`}
                      >
                        <span className="truncate">{ind.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input 3: Primary Objective Toggle */}
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-3">
                  3. Primary Campaign Objective
                </label>
                <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-[#141829] border border-[#D4AF37]/20">
                  <button
                    type="button"
                    onClick={() => setObjective("ecommerce")}
                    className={`py-3 px-4 rounded-xl text-xs font-mono font-bold transition-all ${
                      objective === "ecommerce"
                        ? "bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0D0C12] shadow-md"
                        : "text-[#F7F1E5]/60 hover:text-white"
                    }`}
                  >
                    Direct E-Commerce Sales
                  </button>
                  <button
                    type="button"
                    onClick={() => setObjective("leads")}
                    className={`py-3 px-4 rounded-xl text-xs font-mono font-bold transition-all ${
                      objective === "leads"
                        ? "bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0D0C12] shadow-md"
                        : "text-[#F7F1E5]/60 hover:text-white"
                    }`}
                  >
                    High-Ticket Lead Generation
                  </button>
                </div>
              </div>
            </div>

            {/* Right Live Projected Results Column (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#161B30] to-[#0D0C12] border border-[#D4AF37]/40 flex flex-col justify-between shadow-inner">
              <div>
                {/* Result Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20 mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37]">
                    PROJECTED OUTCOMES
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0D9488]/20 border border-[#0D9488]/40 text-[#14B8A6] font-mono text-[11px] font-bold">
                    <span>{metrics.roasMultiplier}x Target ROAS</span>
                  </div>
                </div>

                {/* Big Projected Revenue Highlight */}
                <div className="mb-6 p-4 rounded-2xl bg-[#0D0C12]/80 border border-[#D4AF37]/30 text-center">
                  <span className="font-mono text-xs text-[#F7F1E5]/60 uppercase tracking-wider block mb-1">
                    Estimated Monthly Revenue Generated
                  </span>
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#F5DE88] tracking-tight">
                    {formatINR(metrics.estimatedRevenue)}
                  </div>
                  <span className="text-[11px] font-mono text-[#0D9488] mt-1 block">
                    ✦ Scaled with Desi Muchads Performance Engine
                  </span>
                </div>

                {/* Detailed Metric Rows */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#141829]/50 border border-[#D4AF37]/10">
                    <div className="flex items-center gap-2.5 text-xs text-[#F7F1E5]/80 font-mono">
                      <Users className="w-4 h-4 text-[#D4AF37]" />
                      <span>{objective === "leads" ? "Projected Qualified Leads" : "Projected Orders"}</span>
                    </div>
                    <span className="font-mono font-bold text-sm text-[#F7F1E5]">
                      {formatNumber(metrics.qualifiedConversions)}+
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#141829]/50 border border-[#D4AF37]/10">
                    <div className="flex items-center gap-2.5 text-xs text-[#F7F1E5]/80 font-mono">
                      <Eye className="w-4 h-4 text-[#D4AF37]" />
                      <span>Estimated Ad Impressions</span>
                    </div>
                    <span className="font-mono font-bold text-sm text-[#F7F1E5]">
                      {formatNumber(metrics.impressions)}+
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#141829]/50 border border-[#D4AF37]/10">
                    <div className="flex items-center gap-2.5 text-xs text-[#F7F1E5]/80 font-mono">
                      <IndianRupee className="w-4 h-4 text-[#D4AF37]" />
                      <span>Estimated Return on Ad Spend</span>
                    </div>
                    <span className="font-mono font-bold text-sm text-[#0D9488]">
                      {metrics.roasMultiplier}x ROAS
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Trigger Button */}
              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#075E54] text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:shadow-[0_0_35px_rgba(37,211,102,0.7)] transition-all flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Lock In This Plan → Send to WhatsApp</span>
                </button>
                <p className="text-[10px] font-mono text-center text-[#F7F1E5]/50 mt-2">
                  Instant confidential chat with our Principal Performance Partner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

