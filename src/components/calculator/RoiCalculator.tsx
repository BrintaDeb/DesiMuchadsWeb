"use client";

import React, { useState, useId } from "react";
import {
  Calculator,
  Users,
  Eye,
  Check,
  Send,
  Percent,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FiligreeCorner } from "@/components/common/Icons";
import { SectionDivider } from "@/components/common/SectionDivider";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { sound } from "@/lib/sound";

export function RoiCalculator() {
  const budgetId = useId();
  const aovId = useId();
  const [budget, setBudget] = useState(150000); // 1.5 Lakh default
  const [aov, setAov] = useState(1800); // Average Order Value in INR
  const [marginPercent, setMarginPercent] = useState(65); // Gross product margin
  const [industry, setIndustry] = useState("Fashion & D2C Apparel");
  const [objective, setObjective] = useState<"ecommerce" | "leads">("ecommerce");

  const industries = [
    {
      name: "Fashion & D2C Apparel",
      hindi: "Vastra & Style",
      roas: 5.6,
      defaultAov: 1800,
      conversionRate: 0.032,
    },
    {
      name: "Ayurveda & D2C Wellness",
      hindi: "Jadi-Booti & Health",
      roas: 5.8,
      defaultAov: 1600,
      conversionRate: 0.038,
    },
    {
      name: "Jewellery & Luxury",
      hindi: "Zewar & Heritage",
      roas: 6.8,
      defaultAov: 4800,
      conversionRate: 0.024,
    },
    {
      name: "Beauty & Skincare",
      hindi: "Roop & Shringar",
      roas: 5.2,
      defaultAov: 1350,
      conversionRate: 0.036,
    },
    {
      name: "Gourmet Food & Q-Commerce",
      hindi: "Zayka & Dark Store",
      roas: 4.8,
      defaultAov: 850,
      conversionRate: 0.042,
    },
    {
      name: "Electronics & Tech",
      hindi: "Yantra & Lifestyle",
      roas: 4.4,
      defaultAov: 2900,
      conversionRate: 0.028,
    },
  ];

  const selectedIndustry =
    industries.find((i) => i.name === industry) || industries[0];

  const budgetPresets = [
    { label: "₹50K", value: 50000 },
    { label: "₹1.5L", value: 150000 },
    { label: "₹3L", value: 300000 },
    { label: "₹5L", value: 500000 },
    { label: "₹10L", value: 1000000 },
    { label: "₹25L+", value: 2500000 },
  ];

  const aovPresets = [
    { label: "₹850", value: 850 },
    { label: "₹1,499", value: 1499 },
    { label: "₹2,499", value: 2499 },
    { label: "₹4,999", value: 4999 },
  ];

  const marginPresets = [
    { label: "45%", value: 45, desc: "Lean" },
    { label: "55%", value: 55, desc: "Standard" },
    { label: "65%", value: 65, desc: "D2C Avg" },
    { label: "75%", value: 75, desc: "High" },
    { label: "85%", value: 85, desc: "Luxury" },
  ];

  const calculateMetrics = () => {
    const roasMultiplier =
      objective === "ecommerce"
        ? selectedIndustry.roas
        : Number((selectedIndustry.roas * 1.15).toFixed(1));

    const estimatedRevenue = Math.round(budget * roasMultiplier);
    const estimatedCogs = Math.round(estimatedRevenue * ((100 - marginPercent) / 100));
    const estimatedGrossProfit = estimatedRevenue - estimatedCogs;
    const netProfit = estimatedGrossProfit - budget;

    const cpcEstimate = 14;
    const traffic = Math.round(budget / cpcEstimate);
    const estimatedOrders =
      objective === "ecommerce"
        ? Math.max(1, Math.round(estimatedRevenue / aov))
        : Math.round(traffic * selectedIndustry.conversionRate);

    const cac = estimatedOrders > 0 ? Math.round(budget / estimatedOrders) : 0;
    const breakEvenRoas = Number((100 / marginPercent).toFixed(2));
    const safetyBuffer = Number((roasMultiplier - breakEvenRoas).toFixed(2));

    const cpmEstimate = 180;
    const impressions = Math.round((budget / cpmEstimate) * 1000);

    // Percentage splits for visual allocation bar
    const cogsPct = estimatedRevenue > 0 ? Math.round((estimatedCogs / estimatedRevenue) * 100) : 0;
    const adSpendPct = estimatedRevenue > 0 ? Math.round((budget / estimatedRevenue) * 100) : 0;
    const profitPct = Math.max(0, 100 - cogsPct - adSpendPct);

    return {
      estimatedRevenue,
      estimatedCogs,
      netProfit,
      breakEvenRoas,
      safetyBuffer,
      roasMultiplier: roasMultiplier.toFixed(1),
      traffic,
      estimatedOrders,
      cac,
      impressions,
      cogsPct,
      adSpendPct,
      profitPct,
      isProfitable: netProfit > 0,
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
      `Pranam Desi Muchads! I ran the Precision Unit Economics Simulator for ${industry} (${selectedIndustry.hindi}):\n\n` +
      `✦ Monthly Ad Fuel: ${formatINR(budget)}\n` +
      `✦ Projected Revenue: ${formatINR(metrics.estimatedRevenue)} (${metrics.roasMultiplier}x Target ROAS)\n` +
      `✦ Net Cashflow Contribution: ${formatINR(metrics.netProfit)} (${metrics.isProfitable ? "Profitable CM3" : "Re-balancing"})\n` +
      `✦ Break-Even Benchmark: ${metrics.breakEvenRoas}x (Safety Buffer: +${metrics.safetyBuffer}x)\n` +
      `✦ Projected Orders: ${formatNumber(metrics.estimatedOrders)} @ ${formatINR(metrics.cac)} Target CAC\n\n` +
      `Let's schedule a Baithak to lock in our media plan! 〰️`
    );
    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
  };

  const budgetPct = Math.min(100, Math.max(0, ((budget - 25000) / (2500000 - 25000)) * 100));
  const aovPct = Math.min(100, Math.max(0, ((aov - 500) / (8000 - 500)) * 100));

  return (
    <section id="calculator" className="relative py-24 sm:py-32 bg-[#09090b] overflow-hidden border-t border-white/10 text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[150px] pointer-events-none" />

      <SectionDivider label="HISAB-KITAB SIMULATOR" sublabel="HIGH-ROAS PROJECTIONS" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-mono text-white mb-4 shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>REAL-TIME AD-SPEND &amp; UNIT ECONOMICS ENGINE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-tight">
            No Speculation.{" "}
            <span className="text-gradient-silver block mt-1">
              Precision Unit Economics.
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            Calibrated algorithms for high-scale D2C brands. Simulate your ad fuel, product COGS, and blended ROAS to predict exact contribution margin (CM3) before spending a single rupee.
          </p>
        </div>

        {/* Stable Master Panel */}
        <div className="ios-glass-panel rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative border border-white/15 bg-gradient-to-br from-white/[0.04] via-[#121215]/90 to-[#09090b]/95 backdrop-blur-2xl">
          {/* Filigree Corner Accents */}
          <div className="absolute top-4 left-4 pointer-events-none opacity-40">
            <FiligreeCorner className="w-5 h-5 text-white/50" position="top-left" />
          </div>
          <div className="absolute top-4 right-4 pointer-events-none opacity-40">
            <FiligreeCorner className="w-5 h-5 text-white/50" position="top-right" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Inputs Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-7">
              {/* Input 1: Monthly Ad Budget Slider */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <label htmlFor={budgetId} className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold block">
                      1. Monthly Ad Fuel
                    </label>
                    <span className="text-[11px] font-mono text-zinc-400">
                      Paid Media Investment (Meta, Google, Q-Commerce)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-metric text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {formatINR(budget)}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 block">/ month</span>
                  </div>
                </div>

                {/* Range Slider with Glowing Silver Fill */}
                <input
                  id={budgetId}
                  aria-label="Monthly Ad Budget Slider"
                  type="range"
                  min="25000"
                  max="2500000"
                  step="25000"
                  value={budget}
                  onChange={(e) => {
                    sound.playPluck(120);
                    setBudget(Number(e.target.value));
                  }}
                  style={{
                    background: `linear-gradient(to right, #ffffff 0%, #ffffff ${budgetPct}%, #27272a ${budgetPct}%, #27272a 100%)`,
                  }}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-white transition-all"
                />

                {/* Quick Preset Buttons */}
                <div className="mt-3 flex items-center justify-between gap-1.5 flex-wrap">
                  {budgetPresets.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => {
                        sound.playPluck(125);
                        setBudget(preset.value);
                      }}
                      className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition-all border ${
                        budget === preset.value
                          ? "bg-white text-black border-white shadow-sm font-bold"
                          : "bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:border-white/30"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input 2: Target AOV & Gross Product Margin Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* AOV Box */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor={aovId} className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
                        Target AOV
                      </label>
                      <span className="font-metric text-lg font-black text-white">{formatINR(aov)}</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 block mb-3">
                      Average Order Value per Checkout
                    </span>

                    <input
                      id={aovId}
                      aria-label="Target Average Order Value"
                      type="range"
                      min="500"
                      max="8000"
                      step="50"
                      value={aov}
                      onChange={(e) => {
                        sound.playPluck(130);
                        setAov(Number(e.target.value));
                      }}
                      style={{
                        background: `linear-gradient(to right, #ffffff 0%, #ffffff ${aovPct}%, #27272a ${aovPct}%, #27272a 100%)`,
                      }}
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-1 mt-3">
                    {aovPresets.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => {
                          sound.playPluck(135);
                          setAov(preset.value);
                        }}
                        className={`py-1 text-center rounded text-[10px] font-mono transition-all border ${
                          aov === preset.value
                            ? "bg-white text-black border-white font-bold"
                            : "bg-white/5 text-zinc-400 border-white/10 hover:text-white"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gross Margin Box */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
                        Gross Product Margin
                      </span>
                      <span className="font-metric text-lg font-black text-white">{marginPercent}%</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-3">
                      <span>Break-Even ROAS:</span>
                      <span className="font-bold text-white bg-white/10 px-1.5 py-0.5 rounded">
                        {metrics.breakEvenRoas}x
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-1">
                      {marginPresets.map((preset) => (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={() => {
                            sound.playPluck(140);
                            setMarginPercent(preset.value);
                          }}
                          className={`py-1.5 text-center rounded-lg border text-[11px] font-mono font-bold transition-all ${
                            marginPercent === preset.value
                              ? "border-white bg-white text-black shadow-sm"
                              : "border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/30"
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-zinc-500 block mt-2 text-right">
                    COGS Deduction: {100 - marginPercent}%
                  </span>
                </div>
              </div>

              {/* Input 3: Industry Sector Selector */}
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold block mb-2.5">
                  2. Select Industry Sector &amp; Benchmarks
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {industries.map((ind) => {
                    const isSelected = industry === ind.name;
                    return (
                      <button
                        key={ind.name}
                        type="button"
                        onClick={() => {
                          sound.playPluck(150);
                          setIndustry(ind.name);
                          if (ind.defaultAov) setAov(ind.defaultAov);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? "border-white bg-white text-black shadow-lg ring-1 ring-white"
                            : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/30 hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className={`text-[10px] font-mono uppercase tracking-wider ${isSelected ? "text-zinc-600" : "text-zinc-400"}`}>
                            {ind.hindi}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-black shrink-0" />}
                        </div>
                        <span className={`font-sans font-bold text-xs truncate block ${isSelected ? "text-black" : "text-white"}`}>
                          {ind.name}
                        </span>
                        <span className={`text-[10px] font-mono mt-1 ${isSelected ? "text-zinc-700 font-semibold" : "text-emerald-400"}`}>
                          ✦ {ind.roas}x Calibrated ROAS
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input 4: Primary Campaign Objective */}
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold block mb-2.5">
                  3. Primary Campaign Engine
                </label>
                <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-zinc-900/90 border border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPluck(160);
                      setObjective("ecommerce");
                    }}
                    className={`py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all text-center flex items-center justify-center gap-2 ${
                      objective === "ecommerce"
                        ? "bg-white text-black shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span>Direct E-Commerce Sales</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPluck(160);
                      setObjective("leads");
                    }}
                    className={`py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all text-center flex items-center justify-center gap-2 ${
                      objective === "leads"
                        ? "bg-white text-black shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span>High-Ticket Lead Generation</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Live Projected Results Column (5 cols) with 3D Spotlight Card */}
            <SpotlightCard
              maxTilt={3}
              spotlightColor="rgba(255, 255, 255, 0.12)"
              borderColor="rgba(255, 255, 255, 0.45)"
              className="lg:col-span-5 rounded-2xl p-6 sm:p-7 ios-glass-card border border-white/20 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Result Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
                      PROJECTED OUTCOMES
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-black font-mono text-[11px] font-black tracking-wider uppercase shadow-sm">
                    <span>{metrics.roasMultiplier}x ROAS</span>
                  </div>
                </div>

                {/* Big Projected Revenue Highlight */}
                <div className="mb-5 p-5 rounded-2xl bg-[#121214] border border-white/15 text-center shadow-inner">
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-1">
                    Estimated Monthly Topline Revenue
                  </span>
                  <div className="text-3xl sm:text-4xl font-metric font-black text-white tracking-tight">
                    {formatINR(metrics.estimatedRevenue)}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-300 mt-1.5 block">
                    ✦ Scaled via Desi Muchads Broad-Scale Architecture
                  </span>
                </div>

                {/* Net Profit Cashflow Callout */}
                <div className="mb-5 p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 block mb-0.5">
                      Est. Net Cashflow (CM3 after Ads + COGS)
                    </span>
                    <span className="text-2xl font-metric font-black text-white">
                      {formatINR(metrics.netProfit)}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                      metrics.isProfitable
                        ? "text-emerald-400 bg-emerald-950/70 border-emerald-500/40"
                        : "text-rose-400 bg-rose-950/70 border-rose-500/40"
                    }`}
                  >
                    {metrics.isProfitable ? "+Profitable CM3" : "Re-balancing"}
                  </span>
                </div>

                {/* Visual Unit Economics Allocation Bar */}
                <div className="mb-5 p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400">
                    <span className="font-semibold text-zinc-300">Revenue Allocation Split</span>
                    <span>100% Topline</span>
                  </div>
                  <div className="w-full h-3 rounded-full overflow-hidden flex bg-zinc-800 p-0.5 border border-white/10">
                    <div
                      className="bg-zinc-600 h-full rounded-l-full transition-all duration-300"
                      style={{ width: `${metrics.cogsPct}%` }}
                      title={`Product COGS: ${metrics.cogsPct}%`}
                    />
                    <div
                      className="bg-zinc-400 h-full transition-all duration-300"
                      style={{ width: `${metrics.adSpendPct}%` }}
                      title={`Ad Fuel: ${metrics.adSpendPct}%`}
                    />
                    <div
                      className="bg-white h-full rounded-r-full transition-all duration-300 shadow-[0_0_8px_white]"
                      style={{ width: `${metrics.profitPct}%` }}
                      title={`Net Retained Cashflow: ${metrics.profitPct}%`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-zinc-600" />
                      <span>COGS ({metrics.cogsPct}%)</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-zinc-400" />
                      <span>Ads ({metrics.adSpendPct}%)</span>
                    </span>
                    <span className="flex items-center gap-1 text-white font-bold">
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_white]" />
                      <span>Profit ({metrics.profitPct}%)</span>
                    </span>
                  </div>
                </div>

                {/* Granular KPI Grid (2x2) */}
                <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] mb-1">
                      <Users className="w-3.5 h-3.5 text-white" />
                      <span>{objective === "leads" ? "Projected Leads" : "Projected Orders"}</span>
                    </div>
                    <span className="text-base font-bold text-white block">
                      {formatNumber(metrics.estimatedOrders)}+
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] mb-1">
                      <Percent className="w-3.5 h-3.5 text-white" />
                      <span>Target CAC</span>
                    </div>
                    <span className="text-base font-bold text-white block">
                      {formatINR(metrics.cac)}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Safety Buffer</span>
                    </div>
                    <span className="text-base font-bold text-emerald-400 block">
                      +{metrics.safetyBuffer}x ROAS
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] mb-1">
                      <Eye className="w-3.5 h-3.5 text-white" />
                      <span>Ad Impressions</span>
                    </div>
                    <span className="text-base font-bold text-white block">
                      {formatNumber(metrics.impressions)}+
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Trigger Button */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="btn-luxury-shine w-full py-4 px-6 rounded-xl bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all flex items-center justify-center gap-2.5 active:scale-95"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>LOCK IN THIS GROWTH RUNWAY →</span>
                </button>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
