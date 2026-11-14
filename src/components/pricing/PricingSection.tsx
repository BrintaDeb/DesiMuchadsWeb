"use client";

import React, { useState } from "react";
import {
  Check,
  Sparkles,
  ArrowRight,
  Plus,
  Clock,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import { FiligreeCorner } from "@/components/common/Icons";
import { SectionDivider } from "@/components/common/SectionDivider";
import { sound } from "@/lib/sound";
import { SpotlightCard } from "@/components/common/SpotlightCard";

interface PricingSectionProps {
  onOpenKundli: () => void;
}

export function PricingSection({ onOpenKundli }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">(
    "monthly"
  );
  const [mode, setMode] = useState<"retainers" | "thali">("retainers");

  // Custom Marketing Thali State
  const [selectedDishes, setSelectedDishes] = useState<string[]>([
    "meta-ads",
    "creative-production",
    "whatsapp-crm",
  ]);

  const discountMultiplier = billingCycle === "quarterly" ? 0.85 : 1.0;

  const retainers = [
    {
      id: "shuruwat",
      name: "Foundation Stack",
      hindi: "SHURUWAT",
      badge: "FOUNDATION",
      price: Math.round(75000 * discountMultiplier),
      desc: "For challenger brands seeking disciplined, profitable scaling from ₹3L–₹15L/mo ad spend.",
      features: [
        "Meta & Google Ads Engine Setup",
        "Weekly 4 High-Hook Creative Refresh",
        "Weekly ROAS & Contribution Margin Audit",
        "Dedicated Growth Strategist via Slack",
        "Creative Angle & Offer Testing Framework",
        "Zero-Ghosting 4-Hour Response SLA",
      ],
      isPopular: false,
    },
    {
      id: "hukumat",
      name: "Dominance Stack",
      hindi: "HUKUMAT",
      badge: "MOST DEPLOYED",
      price: Math.round(150000 * discountMultiplier),
      desc: "Our flagship end-to-end engine for scaling brands pushing ₹15L–₹75L/mo ad spend.",
      features: [
        "Full-Funnel Meta, Google & YouTube Ads",
        "12 Cinematic UGC & Graphic Ad Packs / mo",
        "Shopify CRO & Checkout Speed Optimization",
        "Retention CRM (Klaviyo + WhatsApp Flows)",
        "Daily Live Dashboard & Weekly Baithak",
        "Algorithmic Broad Scale Architecture",
      ],
      isPopular: true,
    },
    {
      id: "shehenshah",
      name: "Monopoly Stack",
      hindi: "SHEHENSHAH",
      badge: "ENTERPRISE",
      price: Math.round(300000 * discountMultiplier),
      desc: "Full enterprise brand takeover for market leaders exceeding ₹75L/mo ad volume.",
      features: [
        "Omnichannel Media Buying (Meta + Google + Q-Commerce)",
        "24 Cinematic Creative Deliverables Monthly",
        "Custom Headless Landers & Frictionless Funnels",
        "Dedicated 4-Member Pod (Media + Copy + Design + Dev)",
        "Direct Founder & Principal Architect Access",
        "Contractual ROAS Performance Guarantees",
      ],
      isPopular: false,
    },
  ];

  const thaliDishes = [
    {
      id: "meta-ads",
      name: "Meta Ads Weaponry",
      hindi: "Facebook & Instagram",
      desc: "Full broad targeting, ASC+ setups, and daily bid optimizations.",
      basePrice: 50000,
      hoursSaved: 60,
      roasContribution: 1.6,
    },
    {
      id: "google-ads",
      name: "Google & Search Intent",
      hindi: "PMax, Search & Shopping",
      desc: "Capturing high-intent search traffic with ruthless negative keyword pruning.",
      basePrice: 45000,
      hoursSaved: 40,
      roasContribution: 1.4,
    },
    {
      id: "creative-production",
      name: "Ad Creative Engine",
      hindi: "UGC, Hooks & Motion",
      desc: "8 data-driven video and static ad creative iterations per month.",
      basePrice: 40000,
      hoursSaved: 50,
      roasContribution: 1.2,
    },
    {
      id: "whatsapp-crm",
      name: "WhatsApp & SMS Automation",
      hindi: "Conversational Retention",
      desc: "Automated cart abandonment, dispatch alerts, and VIP broadcast funnels.",
      basePrice: 25000,
      hoursSaved: 30,
      roasContribution: 0.8,
    },
    {
      id: "cro-landing",
      name: "Conversion Funnels (CRO)",
      hindi: "Fast Checkout & Landers",
      desc: "Sub-second load times and high-converting PDP architectures.",
      basePrice: 35000,
      hoursSaved: 35,
      roasContribution: 0.9,
    },
    {
      id: "q-commerce",
      name: "Quick Commerce Engine",
      hindi: "Blinkit, Zepto, Instamart",
      desc: "Dark store catalog indexing, sponsored search ads, and inventory tracking.",
      basePrice: 40000,
      hoursSaved: 45,
      roasContribution: 1.1,
    },
  ];

  const toggleDish = (dishId: string) => {
    sound.playPluck(130);
    setSelectedDishes((prev) =>
      prev.includes(dishId)
        ? prev.filter((id) => id !== dishId)
        : [...prev, dishId]
    );
  };

  const calculateThaliStats = () => {
    const selected = thaliDishes.filter((d) => selectedDishes.includes(d.id));
    const rawCost = selected.reduce((acc, curr) => acc + curr.basePrice, 0);
    const bundleDiscount =
      selected.length >= 4 ? 0.85 : selected.length >= 3 ? 0.9 : 1.0;
    const finalPrice = Math.round(rawCost * bundleDiscount);
    const hoursSaved = selected.reduce((acc, curr) => acc + curr.hoursSaved, 0);
    const roas = (
      selected.reduce((acc, curr) => acc + curr.roasContribution, 0) + 1.2
    ).toFixed(1);

    return {
      investment: finalPrice,
      hoursSaved,
      roas,
      count: selected.length,
    };
  };

  const thaliStats = calculateThaliStats();

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleThaliWhatsApp = () => {
    sound.playChime();
    const selectedNames = thaliDishes
      .filter((d) => selectedDishes.includes(d.id))
      .map((d) => `• ${d.name}`)
      .join("\n");

    const text = encodeURIComponent(
      `Pranam Desi Muchads! Here is my custom Marketing Thali selection:\n\n` +
        `${selectedNames}\n\n` +
        `✦ Monthly Investment: ${formatINR(thaliStats.investment)}\n` +
        `✦ Projected Team Hours Saved: ${thaliStats.hoursSaved} hrs/mo\n` +
        `✦ Estimated ROAS Multiplier: ${thaliStats.roas}x\n\n` +
        `Let's schedule a Baithak to lock in this custom stack! 〰️`
    );
    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
  };

  return (
    <section id="pricing" className="relative py-28 sm:py-36 bg-[#09090b] text-white overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-[160px] pointer-events-none" />

      <SectionDivider label="PRICING & PACKAGES" sublabel="HISAB-KITAB WITH ZERO GHOSTING" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-tight">
            Transparent Retainers.<br />Custom Marketing Thali.
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-sans">
            Choose our battle-tested all-in-one growth retainers, or build your own custom marketing platter tailored to your exact balance of firepower.
          </p>

          {/* Mode Switcher: Retainers vs Build-A-Thali */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-[#121215] border border-white/15 shadow-xl">
            <button
              type="button"
              onClick={() => {
                sound.playPluck(150);
                setMode("retainers");
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
                mode === "retainers"
                  ? "bg-white text-black shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Ready-Made Retainers (3 Tiers)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playPluck(180);
                setMode("thali");
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                mode === "thali"
                  ? "bg-white text-black shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>Build Your Marketing Thali</span>
              <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[9px] text-white font-extrabold uppercase">
                Custom
              </span>
            </button>
          </div>
        </div>

        {/* MODE A: 3-TIER RETAINERS */}
        {mode === "retainers" && (
          <div>
            {/* Monthly vs. Quarterly Toggle */}
            <div className="flex items-center justify-center gap-3 mb-12 font-mono text-xs">
              <span className={billingCycle === "monthly" ? "text-white font-bold" : "text-zinc-400"}>
                Monthly Billing
              </span>
              <button
                type="button"
                onClick={() => {
                  sound.playPluck(140);
                  setBillingCycle(billingCycle === "monthly" ? "quarterly" : "monthly");
                }}
                className="w-12 h-6 rounded-full bg-zinc-800 border border-white/20 p-0.5 transition-colors relative"
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    billingCycle === "quarterly" ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
              <div className="flex items-center gap-1.5">
                <span className={billingCycle === "quarterly" ? "text-white font-bold" : "text-zinc-400"}>
                  Quarterly Commitment
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold">
                  SAVE 15%
                </span>
              </div>
            </div>

            {/* 3 Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {retainers.map((tier) => {
                return (
                  <SpotlightCard
                    key={tier.id}
                    spotlightColor={tier.isPopular ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.08)"}
                    borderColor={tier.isPopular ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.35)"}
                    maxTilt={3}
                    onMouseEnter={() => sound.playPluck(110)}
                    className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                      tier.isPopular
                        ? "ios-glass-panel border-2 border-white shadow-[0_0_45px_rgba(255,255,255,0.18)]"
                        : "ios-glass-card hover:border-white/35"
                    }`}
                  >
                    {/* Filigree corner brackets */}
                    <div className="absolute top-3 left-3 opacity-30 pointer-events-none">
                      <FiligreeCorner className="w-4 h-4 text-white/50" position="top-left" />
                    </div>
                    <div className="absolute top-3 right-3 opacity-30 pointer-events-none">
                      <FiligreeCorner className="w-4 h-4 text-white/50" position="top-right" />
                    </div>

                    <div>
                      {/* Top Category & Status Header Row */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest font-bold">
                          {tier.hindi}
                        </span>
                        {tier.isPopular ? (
                          <div className="px-3 py-1 rounded-full bg-white text-black font-mono text-[10px] font-black tracking-widest uppercase shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center gap-1.5 shrink-0">
                            <Sparkles className="w-3 h-3 text-black" />
                            <span>{tier.badge}</span>
                          </div>
                        ) : (
                          <div className="px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-zinc-400 font-mono text-[9px] uppercase tracking-wider shrink-0 font-semibold">
                            {tier.badge}
                          </div>
                        )}
                      </div>

                      {/* Tier Name */}
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-4">
                        {tier.name}
                      </h3>

                      {/* Pricing */}
                      <div className="mb-6 pb-6 border-b border-white/10">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl sm:text-4xl font-metric font-black text-white tracking-tight">
                            {formatINR(tier.price)}
                          </span>
                          <span className="text-xs font-mono text-zinc-400">/ month</span>
                        </div>
                        <p className="text-xs text-zinc-300 mt-3 leading-relaxed font-sans min-h-[44px] flex items-center">
                          {tier.desc}
                        </p>
                      </div>

                      {/* Features List */}
                      <div className="space-y-3 mb-8">
                        <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase block font-bold">
                          What&apos;s Included:
                        </span>
                        {tier.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-200 font-mono min-h-[22px]">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => {
                        sound.playChime();
                        onOpenKundli();
                      }}
                      className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                        tier.isPopular
                          ? "bg-white hover:bg-zinc-200 text-black shadow-[0_0_20px_rgba(255,255,255,0.25)] font-black"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      }`}
                    >
                      <span>Deploy {tier.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE B: "BUILD YOUR OWN MARKETING THALI" PLATTER */}
        {mode === "thali" && (
          <div className="rounded-3xl p-6 sm:p-10 lg:p-12 ios-glass-panel shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 font-bold block mb-2">
                DESI MUCHADS MARKETING THALI
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                Pick Your Katoris (Modular Weapons)
              </h3>
              <p className="text-xs text-zinc-300 mt-2 font-sans">
                Click to add or remove services from your platter. Watch your monthly cost, team hours saved, and estimated ROAS adjust in real time.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Modular Thali Dishes (7 cols) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {thaliDishes.map((dish) => {
                  const isSelected = selectedDishes.includes(dish.id);
                  return (
                    <div
                      key={dish.id}
                      onClick={() => toggleDish(dish.id)}
                      className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? "border-white bg-white/10 shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                          : "ios-glass-card hover:border-white/30"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-royal text-xs text-zinc-400">
                            {dish.hindi}
                          </span>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                              isSelected
                                ? "bg-white text-black"
                                : "border border-white/20 text-white/40"
                            }`}
                          >
                            {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                          </div>
                        </div>

                        <h4 className="font-display font-bold text-sm text-white mb-1">
                          {dish.name}
                        </h4>
                        <p className="text-[11px] text-zinc-300 leading-relaxed mb-4 font-sans">
                          {dish.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                        <span className="text-white font-bold">
                          {formatINR(dish.basePrice)}/mo
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          +{dish.hoursSaved}h saved
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Visual Thali Platter Summary (5 cols) with iOS Glassmorphism */}
              <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 ios-glass-panel shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
                      THALI SUMMARY
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono font-bold">
                      {selectedDishes.length} Items Selected
                    </span>
                  </div>

                  {/* Computed Investment Highlight */}
                  <div className="p-5 rounded-2xl bg-[#121214] border border-white/15 text-center mb-6">
                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-1">
                      Monthly Thali Investment
                    </span>
                    <div className="text-3xl sm:text-4xl font-metric font-black text-white">
                      {formatINR(thaliStats.investment)}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-300 mt-1 block">
                      ✦ Flexible Month-to-Month • No Lock-in
                    </span>
                  </div>

                  {/* Impact Stats */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Clock className="w-4 h-4 text-white" />
                        <span>Estimated Team Hours Saved</span>
                      </div>
                      <span className="font-bold text-white">
                        ~{thaliStats.hoursSaved} hrs/mo
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <TrendingUp className="w-4 h-4 text-white" />
                        <span>Projected Blended ROAS</span>
                      </div>
                      <span className="font-bold text-white">
                        {thaliStats.roas}x Return
                      </span>
                    </div>
                  </div>
                </div>

                {/* Send Custom Thali via WhatsApp */}
                <button
                  onClick={handleThaliWhatsApp}
                  disabled={selectedDishes.length === 0}
                  className="w-full py-4 px-6 rounded-xl bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2.5 active:scale-95 disabled:opacity-40"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Lock In Custom Thali → WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
