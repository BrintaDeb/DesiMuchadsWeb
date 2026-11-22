"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  TrendingUp,
  MessageCircle,
  PhoneCall,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Percent,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { BreydaqsButton } from "@/components/common/BreydaqsButton";

export interface SimulatorVertical {
  id: string;
  name: string;
  shortName: string;
  baseRoas: number;
  typicalAov: number;
  cogsPct: number;
  badge: string;
}

const VERTICALS: SimulatorVertical[] = [
  {
    id: "qcommerce",
    name: "Quick Commerce (Blinkit & Zepto)",
    shortName: "Q-Commerce",
    baseRoas: 6.2,
    typicalAov: 720,
    cogsPct: 35,
    badge: "INSTANT CHECKOUT",
  },
  {
    id: "ayurveda",
    name: "Single-Estate Ayurveda & Wellness",
    shortName: "Ayurveda & Health",
    baseRoas: 5.4,
    typicalAov: 1950,
    cogsPct: 32,
    badge: "HIGH LTV REPEAT",
  },
  {
    id: "fashion",
    name: "D2C Fashion & Apparel",
    shortName: "Fashion & Streetwear",
    baseRoas: 4.8,
    typicalAov: 2450,
    cogsPct: 38,
    badge: "VIRAL REELS",
  },
  {
    id: "luxury",
    name: "Luxury Horology & Fine Jewelry",
    shortName: "Luxury & Watches",
    baseRoas: 4.4,
    typicalAov: 8900,
    cogsPct: 42,
    badge: "SACRED PACKAGING",
  },
  {
    id: "b2b",
    name: "High-Ticket B2B & Enterprise",
    shortName: "B2B & SaaS",
    baseRoas: 3.9,
    typicalAov: 18500,
    cogsPct: 20,
    badge: "DECISION MAKERS",
  },
];

const SPEND_PRESETS = [
  { label: "₹50K", value: 50000 },
  { label: "₹1.5L", value: 150000 },
  { label: "₹3L", value: 300000 },
  { label: "₹7.5L", value: 750000 },
  { label: "₹15L", value: 1500000 },
  { label: "₹30L", value: 3000000 },
];

interface InteractiveRoasSimulatorProps {
  className?: string;
  onOpenKundli?: () => void;
}

export function InteractiveRoasSimulator({
  className = "",
  onOpenKundli,
}: InteractiveRoasSimulatorProps) {
  const [spend, setSpend] = useState<number>(300000);
  const [selectedVerticalId, setSelectedVerticalId] = useState<string>("ayurveda");
  const [grossMarginPct, setGrossMarginPct] = useState<number>(65);

  const selectedVertical = useMemo(() => {
    return VERTICALS.find((v) => v.id === selectedVerticalId) || VERTICALS[1];
  }, [selectedVerticalId]);

  const formatINR = useCallback((val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  }, []);

  // Real-time Unit Economics Calculations
  const metrics = useMemo(() => {
    const roas = selectedVertical.baseRoas;
    const grossRevenue = spend * roas;
    const orderCount = Math.round(grossRevenue / selectedVertical.typicalAov);
    const cogsTotal = grossRevenue * (1 - grossMarginPct / 100);
    const estimatedBlendedCpa = Math.round(spend / Math.max(1, orderCount));

    // Estimated Net Contribution Profit after Ad Spend & COGS
    const netProfit = Math.max(0, grossRevenue - spend - cogsTotal);
    const netMarginPct = Math.round((netProfit / grossRevenue) * 100);

    return {
      roas,
      grossRevenue,
      orderCount,
      cogsTotal,
      estimatedBlendedCpa,
      netProfit,
      netMarginPct,
    };
  }, [spend, selectedVertical, grossMarginPct]);

  // Handle Preset Clicks with sound and haptics
  const handlePresetSelect = (val: number) => {
    sound.playPluck(160);
    haptics.selection();
    setSpend(val);
  };

  const handleVerticalSelect = (id: string) => {
    sound.playChime();
    haptics.selection();
    setSelectedVerticalId(id);
  };

  const handleWhatsAppClaim = () => {
    sound.playChime();
    haptics.success();

    const text =
      `Hello Desi Muchads! 👋\n\n` +
      `I just simulated my brand's P&L on your Interactive ROAS Simulator:\n` +
      `• Industry Vertical: ${selectedVertical.name}\n` +
      `• Monthly Ad Capital: ${formatINR(spend)}\n` +
      `• Target ROAS: ${metrics.roas}x\n` +
      `• Projected Gross Revenue: ${formatINR(metrics.grossRevenue)}\n` +
      `• Projected Order Volume: ${metrics.orderCount.toLocaleString("en-IN")} orders\n` +
      `• Projected Net Contribution: ${formatINR(metrics.netProfit)} (${metrics.netMarginPct}%)\n\n` +
      `I want to deploy this performance architecture for my brand. Let's schedule our 15-Minute Strategy Session!`;

    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "interactive_pnl_simulator",
        name: "Founder / Growth Lead",
        budget: formatINR(spend),
        service: selectedVertical.name,
        message: `Projected Revenue: ${formatINR(metrics.grossRevenue)}, ROAS: ${metrics.roas}x, Net Profit: ${formatINR(metrics.netProfit)}`,
      }),
    }).catch(() => {});

    const url = `https://wa.me/919180252831?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  // SVG Gauge Calculations
  const gaugePercent = Math.min(100, Math.max(20, (metrics.roas / 7) * 100));
  const strokeDashoffset = 251.2 - (251.2 * gaugePercent) / 100;

  return (
    <div id="roas-simulator" className={`relative w-full max-w-7xl mx-auto ${className}`}>
      {/* Header Eyebrow & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-bold block mb-2">
            04 / UNIT ECONOMICS &amp; P&amp;L ARCHITECTURE
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white leading-tight">
            Interactive 3D ROAS &amp; P&amp;L Simulator
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-sans">
          Simulate monthly ad capital deployment against verified cross-category conversion benchmarks. See exact contribution margins before spending ₹1.
        </p>
      </div>

      {/* Main Grid: Controls (Left) vs 3D Outputs (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Interactive Input Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Vertical Selector Chips */}
          <div className="space-y-2.5">
            <label className="font-mono text-xs text-zinc-400 uppercase font-bold flex items-center justify-between">
              <span>Select Category Architecture:</span>
              <span className="text-emerald-400 font-bold">{selectedVertical.badge}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {VERTICALS.map((v) => {
                const isSelected = v.id === selectedVerticalId;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleVerticalSelect(v.id)}
                    className={`p-3 rounded-[0.25rem] border text-left transition-all relative overflow-hidden select-none active:scale-95 ${
                      isSelected
                        ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                        : "bg-[#0c0c0b] border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[9px] uppercase tracking-wider font-bold">
                        {v.shortName}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-black ${
                          isSelected ? "text-emerald-600" : "text-emerald-400"
                        }`}
                      >
                        {v.baseRoas}x
                      </span>
                    </div>
                    <span className="text-[10px] block opacity-80 truncate font-sans">
                      AOV {formatINR(v.typicalAov)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ad Spend Dynamic Slider Card */}
          <SpotlightCard className="p-5 sm:p-6 rounded-[0.25rem] bg-[#0c0c0b] border border-white/15 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">
                  PLANNED MONTHLY AD CAPITAL:
                </span>
                <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                  {formatINR(spend)}
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block font-bold">
                  SCALE VELOCITY
                </span>
                <span className="font-mono text-xs text-zinc-400">
                  {spend >= 1500000 ? "ENTERPRISE SOVEREIGN" : spend >= 750000 ? "DOMINANCE SPRINT" : "FOUNDATION ENGINE"}
                </span>
              </div>
            </div>

            {/* Slider Track */}
            <div className="space-y-2">
              <input
                type="range"
                min={50000}
                max={3000000}
                step={25000}
                value={spend}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSpend(val);
                  sound.playTick();
                }}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white focus:outline-none"
              />
              <div className="flex justify-between font-mono text-[10px] text-zinc-500">
                <span>₹50K (Seed)</span>
                <span>₹15L (Scale)</span>
                <span>₹30L+ (Enterprise)</span>
              </div>
            </div>

            {/* Preset Buttons */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5 sm:gap-2">
              {SPEND_PRESETS.map((p) => {
                const isActive = spend === p.value;
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => handlePresetSelect(p.value)}
                    className={`px-3 py-1.5 rounded-[0.2rem] font-mono text-[11px] font-bold uppercase transition-all ${
                      isActive
                        ? "bg-white text-black shadow-md scale-105"
                        : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </SpotlightCard>

          {/* Gross Margin Fine-Tuning Slider */}
          <div className="p-4 rounded-[0.25rem] bg-[#0c0c0b] border border-white/10 flex items-center justify-between gap-4 font-mono">
            <div className="space-y-1">
              <span className="text-xs text-zinc-300 font-bold block">
                Product Gross Margin %
              </span>
              <span className="text-[10px] text-zinc-500 block font-sans">
                Accounts for manufacturing, packaging &amp; dark store logistics
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <input
                type="range"
                min={40}
                max={85}
                step={5}
                value={grossMarginPct}
                onChange={(e) => {
                  setGrossMarginPct(Number(e.target.value));
                  sound.playTick();
                }}
                className="w-24 sm:w-32 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <span className="font-black text-sm text-emerald-400 min-w-[3ch] text-right">
                {grossMarginPct}%
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Holographic Dial & P&L Output Waterfall */}
        <div className="lg:col-span-5 space-y-6">
          <SpotlightCard className="p-6 sm:p-7 rounded-[0.25rem] bg-[#0e0e0d] border-2 border-white/30 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Aura */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none" />

            {/* Top Dial Indicator & Projected ROAS */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-400 font-bold block">
                  SYSTEM ESTIMATE
                </span>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                  {metrics.roas}x <span className="font-editorial font-normal text-[#e8e8e3] lowercase">roas</span>
                </h3>
              </div>

              {/* Holographic Radial Gauge */}
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-center">
                  <span className="text-[11px] font-black text-white">{metrics.roas}X</span>
                  <span className="text-[8px] text-zinc-400 uppercase">MODEL</span>
                </div>
              </div>
            </div>

            {/* Core Projected Metrics */}
            <div className="py-5 grid grid-cols-2 gap-4 font-mono border-b border-white/10">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase block font-medium">
                  Gross Revenue:
                </span>
                <span className="font-display font-black text-xl sm:text-2xl text-white tracking-tight block">
                  {formatINR(metrics.grossRevenue)}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase block font-medium">
                  Order Volume:
                </span>
                <span className="font-display font-black text-xl sm:text-2xl text-white tracking-tight block">
                  {metrics.orderCount.toLocaleString("en-IN")}{" "}
                  <span className="text-xs font-mono text-zinc-400 font-normal">units</span>
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase block font-medium">
                  Blended CPA:
                </span>
                <span className="font-mono font-bold text-sm text-zinc-300 block">
                  {formatINR(metrics.estimatedBlendedCpa)}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase block font-medium">
                  Net Contribution:
                </span>
                <span className="font-display font-black text-base text-emerald-400 block">
                  {formatINR(metrics.netProfit)} ({metrics.netMarginPct}%)
                </span>
              </div>
            </div>

            {/* P&L Waterfall Stacked Visual Bar */}
            <div className="pt-5 space-y-2 font-mono">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase font-bold">
                <span>P&amp;L Allocation Stack:</span>
                <span className="text-emerald-400">{metrics.netMarginPct}% Net Profit</span>
              </div>
              <div className="h-3 w-full rounded-full bg-black/60 border border-white/10 flex overflow-hidden">
                {/* Ad Spend % */}
                <div
                  style={{ width: `${(1 / metrics.roas) * 100}%` }}
                  className="bg-amber-500/80 hover:opacity-100 transition-all"
                  title={`Ad Spend: ${formatINR(spend)}`}
                />
                {/* COGS % */}
                <div
                  style={{ width: `${100 - grossMarginPct}%` }}
                  className="bg-zinc-600/80 hover:opacity-100 transition-all"
                  title={`COGS: ${formatINR(metrics.cogsTotal)}`}
                />
                {/* Net Profit % */}
                <div
                  style={{ width: `${metrics.netMarginPct}%` }}
                  className="bg-emerald-500 hover:opacity-100 transition-all"
                  title={`Net Profit: ${formatINR(metrics.netProfit)}`}
                />
              </div>
              <div className="flex justify-between text-[9px] text-zinc-500 pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" /> Ad Spend
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 inline-block" /> COGS
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Net Margin
                </span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
              <BreydaqsButton
                onClick={handleWhatsAppClaim}
                variant="white"
                className="w-full py-3.5 text-xs sm:text-sm font-bold min-h-[48px]"
              >
                CLAIM THIS MODEL ON WHATSAPP
              </BreydaqsButton>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+919180252831"
                  onClick={() => {
                    sound.playChime();
                    haptics.heavy();
                  }}
                  className="py-2.5 px-3 rounded-[0.2rem] bg-[#141815] border border-emerald-500/30 hover:border-emerald-400 text-white font-mono text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 text-center truncate"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Call +91 91802 52831</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    sound.playPluck(180);
                    onOpenKundli?.();
                  }}
                  className="py-2.5 px-3 rounded-[0.2rem] bg-white/5 border border-white/15 hover:border-white/40 text-zinc-300 hover:text-white font-mono text-[11px] font-bold flex items-center justify-center gap-1 transition-all active:scale-95 text-center truncate"
                >
                  <span>Free Brand Audit &gt;</span>
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Calculated with 90-day blended attribution &amp; zero vanity clicks.</span>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
