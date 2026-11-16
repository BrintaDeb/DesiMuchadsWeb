"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  TrendingUp,
  MessageCircle,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { SpotlightCard } from "@/components/common/SpotlightCard";

interface RoasCalculatorProps {
  onOpenKundli?: () => void;
  className?: string;
}

interface VerticalConfig {
  id: string;
  name: string;
  shortName: string;
  baseRoas: number;
  typicalAov: number;
  desc: string;
}

const VERTICALS: VerticalConfig[] = [
  {
    id: "qcommerce",
    name: "Quick Commerce FMCG (Blinkit & Zepto)",
    shortName: "Q-Commerce",
    baseRoas: 6.2,
    typicalAov: 680,
    desc: "Instant dark store inventory pull, rapid impulse checkout",
  },
  {
    id: "ayurveda",
    name: "Health, Wellness & Single-Estate Ayurveda",
    shortName: "Ayurveda & Health",
    baseRoas: 5.4,
    typicalAov: 1850,
    desc: "Problem-solution vernacular hooks, high 90-day repeat LTV",
  },
  {
    id: "fashion",
    name: "D2C Fashion, Apparel & Streetwear",
    shortName: "Fashion & D2C",
    baseRoas: 4.8,
    typicalAov: 2400,
    desc: "Aesthetic lifestyle reels, seasonal collection drops",
  },
  {
    id: "luxury",
    name: "Luxury Lifestyle, Horology & Fine Jewelry",
    shortName: "Luxury & Jewelry",
    baseRoas: 4.4,
    typicalAov: 8500,
    desc: "High basket size, high-trust consideration, sacred packaging",
  },
  {
    id: "b2b",
    name: "High-Intent B2B, SaaS & Enterprise Services",
    shortName: "B2B & High-Ticket",
    baseRoas: 3.9,
    typicalAov: 14000,
    desc: "Pre-qualified 2-step funnels, enterprise decision-makers",
  },
];

const SPEND_PRESETS = [
  { label: "₹50K", value: 50000 },
  { label: "₹1.5L", value: 150000 },
  { label: "₹3L", value: 300000 },
  { label: "₹7.5L", value: 750000 },
  { label: "₹15L", value: 1500000 },
  { label: "₹25L", value: 2500000 },
];

export function RoasCalculator({ onOpenKundli, className = "" }: RoasCalculatorProps) {
  const [spend, setSpend] = useState<number>(300000);
  const [selectedVerticalId, setSelectedVerticalId] = useState<string>("qcommerce");
  const [aov, setAov] = useState<number>(1850);
  const [grossMarginPct, setGrossMarginPct] = useState<number>(65);
  const [copied, setCopied] = useState<boolean>(false);

  const selectedVertical = useMemo(() => {
    return VERTICALS.find((v) => v.id === selectedVerticalId) || VERTICALS[0];
  }, [selectedVerticalId]);

  // Handle vertical selection with sensible default AOV
  const handleSelectVertical = (v: VerticalConfig) => {
    sound.playPluck(150);
    setSelectedVerticalId(v.id);
    setAov(v.typicalAov);
  };

  // Calculations
  const calculation = useMemo(() => {
    // Media scale efficiency curve
    let scaleMultiplier = 1.0;
    if (spend <= 100000) scaleMultiplier = 1.05;
    else if (spend <= 500000) scaleMultiplier = 1.0;
    else if (spend <= 1500000) scaleMultiplier = 0.96;
    else scaleMultiplier = 0.92;

    const projectedRoas = Number((selectedVertical.baseRoas * scaleMultiplier).toFixed(2));
    const projectedGrossRevenue = Math.round(spend * projectedRoas);
    const estimatedOrders = Math.max(1, Math.round(projectedGrossRevenue / Math.max(1, aov)));
    const grossProfit = Math.round(projectedGrossRevenue * (grossMarginPct / 100));

    // Recommend Retainer Tier
    let tierName = "AARAMBH";
    let tierCost = 35000;
    let tierTagline = "Starting Foundation & Basic Branding";
    if (spend < 100000) {
      tierName = "AARAMBH";
      tierCost = 35000;
      tierTagline = "Starting Foundation & Basic Branding";
    } else if (spend < 400000) {
      tierName = "VISTARA";
      tierCost = 75000;
      tierTagline = "Full-Funnel Scaling & 8 Video Reels";
    } else if (spend < 1200000) {
      tierName = "PRABHUTA";
      tierCost = 145000;
      tierTagline = "Omnichannel Scale & Sub-Second Web Dev";
    } else {
      tierName = "RAJWADA";
      tierCost = 250000;
      tierTagline = "Enterprise Market Takeover & Custom Engineering";
    }

    // Estimated logistics, returns, payment gateway take-rates (approx 9% of GMV)
    const estimatedPlatformFeesAndLogistics = Math.round(projectedGrossRevenue * 0.09);
    const estimatedNetContribution = Math.max(
      0,
      grossProfit - spend - tierCost - estimatedPlatformFeesAndLogistics
    );
    const netMarginPct = Number(
      ((estimatedNetContribution / Math.max(1, projectedGrossRevenue)) * 100).toFixed(1)
    );

    return {
      projectedRoas,
      projectedGrossRevenue,
      estimatedOrders,
      grossProfit,
      tierName,
      tierCost,
      tierTagline,
      estimatedNetContribution,
      netMarginPct,
    };
  }, [spend, selectedVertical, aov, grossMarginPct]);

  // Format INR currency
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // WhatsApp Dispatch Text
  const whatsappText = encodeURIComponent(
    `Pranam Desi Muchads Team! I simulated my brand's revenue metrics on your website calculator:\n\n` +
      `✦ Category: ${selectedVertical.name}\n` +
      `✦ Monthly Ad Media: ${formatINR(spend)}\n` +
      `✦ Average Order Value: ${formatINR(aov)}\n` +
      `✦ Product Gross Margin: ${grossMarginPct}%\n\n` +
      `✦ Projected Blended ROAS: ${calculation.projectedRoas}X\n` +
      `✦ Projected Monthly Revenue: ${formatINR(calculation.projectedGrossRevenue)}\n` +
      `✦ Projected Orders: ~${calculation.estimatedOrders.toLocaleString("en-IN")} orders\n` +
      `✦ Estimated Net Contribution (CM3): ${formatINR(calculation.estimatedNetContribution)} (${calculation.netMarginPct}% net)\n` +
      `✦ Recommended Tier: ${calculation.tierName}\n\n` +
      `I would like to schedule an Executive Strategy Baithak to verify these numbers for my brand.`
  );

  const copyHisab = () => {
    sound.playPluck(180);
    const textToCopy =
      `Desi Muchads Revenue & ROAS Simulation\n` +
      `Category: ${selectedVertical.name}\n` +
      `Monthly Spend: ${formatINR(spend)}\n` +
      `Projected ROAS: ${calculation.projectedRoas}X\n` +
      `Projected Revenue: ${formatINR(calculation.projectedGrossRevenue)}\n` +
      `Estimated Net Profit (CM3): ${formatINR(calculation.estimatedNetContribution)}\n` +
      `Recommended Retainer: ${calculation.tierName} (${formatINR(calculation.tierCost)}/mo)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className={`relative scroll-mt-28 ${className}`}>
      <SpotlightCard className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#0c0c10] border border-white/20 shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-white/[0.08] to-transparent blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 relative z-10 border-b border-white/10 pb-6">
          <div className="max-w-2xl">
            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight">
              Interactive ROAS &amp; Margin Simulator
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
              Model your real blended ROAS, order volume, and net contribution margin before deploying a single rupee. No inflated agency spreadsheets—pure operational mathematics.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              type="button"
              onClick={copyHisab}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 active:scale-95"
              title="Copy this Hisab calculation"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Copy Hisab</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Inputs (Left) & Live Telemetry Output (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
          {/* LEFT: Controls & Sliders */}
          <div className="lg:col-span-7 space-y-7">
            {/* 1. Category / Business Vertical Selector */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3">
                1. Select Brand Industry Vertical
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {VERTICALS.map((v) => {
                  const isSelected = v.id === selectedVerticalId;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => handleSelectVertical(v)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? "bg-white text-black border-white shadow-lg"
                          : "bg-white/[0.03] text-zinc-300 border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
                      }`}
                    >
                      <span className="block text-xs font-display font-black leading-tight">
                        {v.shortName}
                      </span>
                      <span
                        className={`text-[10px] font-mono mt-1 block ${
                          isSelected ? "text-zinc-700 font-bold" : "text-emerald-400"
                        }`}
                      >
                        ~{v.baseRoas}X Avg
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[11px] font-mono text-zinc-400">
                {selectedVertical.name} &bull; {selectedVertical.desc}
              </p>
            </div>

            {/* 2. Monthly Ad Spend Slider with Quick Presets */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                    2. Planned Monthly Ad Spend
                  </span>
                  <span className="text-[11px] text-zinc-500 font-sans">
                    Meta ASC+, Google Search/PMax &amp; Quick Commerce
                  </span>
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl text-white">
                  {formatINR(spend)}
                </div>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min={25000}
                max={2500000}
                step={25000}
                value={spend}
                onChange={(e) => {
                  sound.playPluck(120);
                  setSpend(Number(e.target.value));
                }}
                className="w-full accent-white h-2 bg-zinc-800 rounded-lg cursor-pointer"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase mr-1">Presets:</span>
                {SPEND_PRESETS.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => {
                      sound.playPluck(140);
                      setSpend(p.value);
                    }}
                    className={`px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-mono transition-all flex items-center justify-center active:scale-95 ${
                      spend === p.value
                        ? "bg-white text-black font-bold shadow-sm"
                        : "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. AOV & Gross Margin Dual Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Average Order Value (AOV) */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-zinc-400">
                    Average Order Value (AOV)
                  </span>
                  <span className="font-mono font-black text-sm text-white">
                    {formatINR(aov)}
                  </span>
                </div>
                <input
                  type="range"
                  min={300}
                  max={15000}
                  step={100}
                  value={aov}
                  onChange={(e) => setAov(Number(e.target.value))}
                  className="w-full accent-white h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-zinc-500 font-mono block">
                  Expected cart size per order
                </span>
              </div>

              {/* Product Gross Margin % */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-zinc-400">
                    Product Gross Margin
                  </span>
                  <span className="font-mono font-black text-sm text-emerald-400">
                    {grossMarginPct}%
                  </span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={85}
                  step={1}
                  value={grossMarginPct}
                  onChange={(e) => setGrossMarginPct(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-zinc-500 font-mono block">
                  Excluding ad spend &amp; shipping
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Telemetry Output Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#14141a] to-[#0c0c10] border-2 border-white/20 shadow-xl space-y-6">
            <div>
              {/* Top Badge: ROAS Guarantee */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Projected Blended ROAS
                  </span>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-sm font-black animate-pulse">
                  {calculation.projectedRoas}X
                </div>
              </div>

              {/* Monumental Gross Revenue */}
              <div className="pt-5 pb-6 border-b border-white/10 text-left">
                <span className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider block mb-1">
                  Projected Monthly Gross Revenue
                </span>
                <div className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none">
                  {formatINR(calculation.projectedGrossRevenue)}
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span>~{calculation.estimatedOrders.toLocaleString("en-IN")} orders / mo</span>
                  <span>&bull;</span>
                  <span className="text-emerald-400 font-bold">
                    +{(calculation.projectedRoas - 1.8).toFixed(1)}x over industry avg
                  </span>
                </div>
              </div>

              {/* 3 Micro-Metrics Row */}
              <div className="grid grid-cols-2 gap-3 py-5 border-b border-white/10">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-0.5">
                    Est. Net Profit (CM3)
                  </span>
                  <span className="font-display font-black text-lg text-emerald-400">
                    {formatINR(calculation.estimatedNetContribution)}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono block">
                    {calculation.netMarginPct}% net margin
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-0.5">
                    Gross Margin Pool
                  </span>
                  <span className="font-display font-black text-lg text-white">
                    {formatINR(calculation.grossProfit)}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono block">
                    {grossMarginPct}% on products
                  </span>
                </div>
              </div>

              {/* Recommended Retainer Tier Match */}
              <div className="pt-4 space-y-1.5 text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Recommended Retainer Match:
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/15">
                  <div>
                    <div className="font-display font-black text-base text-white uppercase">
                      {calculation.tierName}
                    </div>
                    <span className="text-[11px] text-zinc-400 font-sans block">
                      {calculation.tierTagline}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-black text-base text-emerald-400">
                      {formatINR(calculation.tierCost)}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 block">/ month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs Row */}
            <div className="space-y-2.5 pt-2">
              <a
                href={`https://wa.me/919180252831?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-display text-xs font-black tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Dispatch Hisab to WhatsApp ↗</span>
              </a>

              {onOpenKundli ? (
                <button
                  type="button"
                  onClick={() => {
                    sound.playChime();
                    onOpenKundli();
                  }}
                  className="w-full py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center justify-center gap-1.5"
                >
                  <span>Request Full Brand Kundli Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <Link
                  href="/contact#baithak"
                  className="w-full py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center justify-center gap-1.5"
                >
                  <span>Book Strategy Baithak with this Estimate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
