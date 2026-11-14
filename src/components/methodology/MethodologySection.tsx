"use client";

import React, { useState } from "react";
import { SectionDivider } from "../common/SectionDivider";
import { ChaiCupIcon, FiligreeCorner } from "../common/Icons";
import { SpotlightCard } from "../common/SpotlightCard";
import {
  Rocket,
  TrendingUp,
  Layers,
  Sparkles,
  CheckCircle2,
  Send,
} from "lucide-react";
import { sound } from "@/lib/sound";

export function MethodologySection() {
  const [selectedNiche, setSelectedNiche] = useState<"ayurveda" | "fashion" | "food" | "tech">("ayurveda");
  const [selectedHook, setSelectedHook] = useState<"relatability" | "pas" | "shock" | "founder">("relatability");

  const steps = [
    {
      num: "01",
      title: "Chai & Charcha",
      sub: "Discovery & Brand Kundli",
      icon: ChaiCupIcon,
      hindi: "चाय और चर्चा",
      desc: "We sit down (virtually or over authentic cutting chai) to dissect your unit economics, profit margins, competitor blind spots, and customer psychology.",
      deliverable: "Comprehensive 40-Point Brand Kundli & Unit Economics Audit",
    },
    {
      num: "02",
      title: "Masala & Blueprint",
      sub: "Strategy & Creative Architecture",
      icon: Layers,
      hindi: "मसाला और ब्लूप्रिंट",
      desc: "Our creative directors engineer scroll-stopping Hinglish hooks, custom angle frameworks, and frictionless conversion funnels mapped to every temperature of traffic.",
      deliverable: "High-ROAS Media Blueprint & Creative Matrix",
    },
    {
      num: "03",
      title: "Dhamaka Launch",
      sub: "Full-Throttle Execution",
      icon: Rocket,
      hindi: "धमाका लॉन्च",
      desc: "We deploy aggressive multi-channel ad architectures across Meta, Google, and YouTube, alongside high-speed landing pages that load in under 800 milliseconds.",
      deliverable: "Live Dynamic Campaigns & Pixel Telemetry",
    },
    {
      num: "04",
      title: "Badshah Scaling",
      sub: "CRO & Profit Maximization",
      icon: TrendingUp,
      hindi: "बादशाह स्केलिंग",
      desc: "Daily rapid creative refresh cycles, ruthless budget reallocation into winning ads, and systematic conversion rate optimization to scale your brand like royalty.",
      deliverable: "Predictable, Compounding Monthly Revenue Scaling",
    },
  ];

  const niches = [
    { id: "ayurveda", name: "Ayurveda & D2C Health", hindi: "जड़ी-बूटी" },
    { id: "fashion", name: "Fashion & Streetwear", hindi: "वस्त्र & स्टाइल" },
    { id: "food", name: "Gourmet Snacks & QSR", hindi: "स्वाद & ज़ायका" },
    { id: "tech", name: "D2C Tech & Hardware", hindi: "यंत्र & गैजेट" },
  ];

  const hookArchetypes = [
    {
      id: "relatability",
      name: "Desi Relatability & Humour",
      badge: "VIRAL STOPPER",
      stopRate: "54.8%",
      roasPotential: "5.8x",
    },
    {
      id: "pas",
      name: "Problem-Agitate-Solve",
      badge: "CONVERSION BEAST",
      stopRate: "49.2%",
      roasPotential: "6.2x",
    },
    {
      id: "shock",
      name: "Before vs After Contrast",
      badge: "HIGH AOV",
      stopRate: "58.1%",
      roasPotential: "5.4x",
    },
    {
      id: "founder",
      name: "Founder's Unapologetic Why",
      badge: "TRUST MULTIPLIER",
      stopRate: "46.5%",
      roasPotential: "5.1x",
    },
  ];

  const hookScripts: Record<string, Record<string, { opener: string; visual: string; retention: string }>> = {
    ayurveda: {
      relatability: {
        opener: '"Dadi told you about pure Ashwagandha, but your chemist sold you sugar pills." (Visual opens with comic family debate over morning chai)',
        visual: "Split-screen: Lab HPLC purity test certificate vs cloudy market capsule dissolves in water.",
        retention: "56% viewers watch past 3s mark · 3.8x above generic health benchmarks",
      },
      pas: {
        opener: '"Why your 3:00 PM energy crash isn\'t fixed by another espresso shot." (Macro shot of adrenal exhaustion)',
        visual: "Root cause anatomical breakdown highlighting adaptogenic KSM-66 cortisol mitigation.",
        retention: "51% retention · 4.2% direct checkout conversion rate",
      },
      shock: {
        opener: '"Day 1 vs Day 30: What happens when 100% organic Shilajit meets your gym routine."',
        visual: "High-contrast clinical biometrics timeline with verified unedited user testimonials.",
        retention: "61% retention · High viral share rate on WhatsApp stories",
      },
      founder: {
        opener: '"I rejected 3 VC term sheets because they wanted me to dilute the herb extraction ratio."',
        visual: "Founder walking through the Himalayan harvest cooperative in Ladakh in high-definition 4K.",
        retention: "48% retention · 34% repeat purchase rate",
      },
    },
    fashion: {
      relatability: {
        opener: '"Buying 4 cheap oversized tees every month vs one 280 GSM French Terry statement piece." (Street interview in Hauz Khas / Bandra)',
        visual: "Torture test: 50 washes comparison showing zero collar sag or color bleeding.",
        retention: "58% retention · 4.8x ROAS across Instagram Reels",
      },
      pas: {
        opener: '"Every brand claims heavyweight cotton. Let\'s cut it open under a microscope." (Macro fabric zoom)',
        visual: "Comparison of single-jersey yarn vs compact spun combed cotton weave density.",
        retention: "53% retention · 3.9% checkout rate",
      },
      shock: {
        opener: '"Watch this ₹1,800 hoodie get drenched in black coffee and wipe completely clean in 2 seconds."',
        visual: "Waterproof hydrophobic lotus leaf nanotech demonstration in real time.",
        retention: "64% retention · Massive save rate on saved collections",
      },
      founder: {
        opener: '"We spent 14 months perfecting a collar that never wrinkles even if you sleep in it."',
        visual: "Raw factory floor pattern drafting and laser precision stitch detailing.",
        retention: "47% retention · Premium brand positioning",
      },
    },
    food: {
      relatability: {
        opener: '"Snack guilt hits hardest at 11:30 PM. We fixed that with slow-roasted Himalayan Makhana." (Late night kitchen heist)',
        visual: "Sensory sound design: Crispy acoustic crunch + peri-peri spice dust in 120fps slow-motion.",
        retention: "59% retention · High repeat subscription rate",
      },
      pas: {
        opener: '"Your zero-sugar snack has 18 hidden chemical names. Here are our only 4 natural ingredients."',
        visual: "Ingredient dissection on clean marble cutting board with clear macro callouts.",
        retention: "52% retention · 4.4x blended ROAS",
      },
      shock: {
        opener: '"Oil-fried potato chips vs slow air-popped seeds: The 400-calorie difference on your plate."',
        visual: "Side-by-side scale test and oil absorption paper test in dramatic top-down lighting.",
        retention: "62% retention · High Quick Commerce cart add velocity",
      },
      founder: {
        opener: '"My dadi taught me this recipe in Jodhpur; we just made it deliver in 10 minutes on Blinkit."',
        visual: "Traditional iron kadai roasting paired with dark store dispatch riders.",
        retention: "49% retention · 5.1x ROAS",
      },
    },
    tech: {
      relatability: {
        opener: '"Your phone battery is at 4% and your cab is 3 minutes away. Watch this 65W GaN brick."',
        visual: "Speedometer battery charge animation surging from 4% to 52% in 8 minutes flat.",
        retention: "55% retention · High impulse checkout",
      },
      pas: {
        opener: '"Cheap cables destroy your ₹1.2L iPhone charging port. Here\'s what happens inside the plug."',
        visual: "Thermal imaging FLIR camera showing overheating comparison in real time.",
        retention: "54% retention · 4.6x search ROAS",
      },
      shock: {
        opener: '"Can an EV fleet run 120km on a single ₹14 battery swap? We tested it live in Old Delhi traffic."',
        visual: "Live telemetry dashboard tracking speed, battery reserve, and driver savings in rupees.",
        retention: "63% retention · B2B fleet lead multiplier",
      },
      founder: {
        opener: '"We engineered this hardware in Bengaluru because imported gadgets can\'t survive Indian power surges."',
        visual: "Oscilloscope voltage testing and heavy surge protection circuit demonstration.",
        retention: "50% retention · High engineering authority",
      },
    },
  };

  const activeScript =
    hookScripts[selectedNiche]?.[selectedHook] || hookScripts.ayurveda.relatability;
  const activeHookMeta =
    hookArchetypes.find((h) => h.id === selectedHook) || hookArchetypes[0];

  return (
    <section id="methodology" className="relative py-28 sm:py-36 bg-[#09090b] text-white overflow-hidden border-t border-white/10">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:32px_32px]" />

      <SectionDivider label="THE PARAMPARA" sublabel="CHAI TO CONVERSION METHODOLOGY" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white">
            From First Chai to{" "}
            <span className="text-gradient-silver block mt-1">
              Market Hukumat.
            </span>
          </h2>
          <p className="mt-5 text-zinc-400 text-base sm:text-lg">
            No endless theory decks. Our battle-tested 4-step framework takes your brand from baseline to market dominance with speed, clarity, and ruthless execution.
          </p>
        </div>

        {/* 4-Step Grid with Connecting Silver Thread */}
        <div className="relative">
          {/* Continuous Silver Thread (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] -translate-y-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <SpotlightCard
                  key={step.num}
                  maxTilt={3}
                  className="rounded-3xl p-6 sm:p-8 ios-glass-card shadow-xl flex flex-col justify-between"
                >
                  {/* Top Step Pill with icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-2xl font-extrabold text-white tracking-tight">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl border border-white/15 bg-white/5 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white/10 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Hindi & Title */}
                  <div className="mb-4">
                    <span className="font-royal text-xs text-zinc-400 tracking-widest block mb-1">
                      {step.hindi}
                    </span>
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-zinc-200 transition-colors">
                      {step.title}
                    </h3>
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block mt-1">
                      {step.sub}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-300 leading-relaxed mb-6 font-normal">
                    {step.desc}
                  </p>

                  {/* Deliverable Badge */}
                  <div className="pt-4 border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                      Key Deliverable:
                    </span>
                    <span className="text-xs font-mono font-medium text-white">
                      ✦ {step.deliverable}
                    </span>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>

        {/* INTERACTIVE AD HOOK SANDBOX & CREATIVE LAB */}
        <div className="mt-20 sm:mt-28 p-6 sm:p-10 lg:p-12 rounded-3xl ios-glass-panel border border-white/20 shadow-2xl relative overflow-hidden">
          {/* Filigree Corner Brackets */}
          <div className="absolute top-4 left-4 opacity-30 pointer-events-none">
            <FiligreeCorner className="w-5 h-5 text-white" position="top-left" />
          </div>
          <div className="absolute top-4 right-4 opacity-30 pointer-events-none">
            <FiligreeCorner className="w-5 h-5 text-white" position="top-right" />
          </div>

          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-mono text-white mb-3">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>THE DESI AD HOOK SANDBOX · INTERACTIVE CREATIVE LAB</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              Test Our High-ROAS Hook Frameworks Live
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-sans">
              Select your D2C sector and a performance creative archetype to preview the exact 0–3 second thumb-stop angle, visual architecture, and projected ROAS multiplier.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Niche Selector */}
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold block mb-2.5">
                  1. Choose Your Product Niche
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {niches.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => {
                        sound.playPluck(130);
                        setSelectedNiche(n.id as "ayurveda" | "fashion" | "food" | "tech");
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedNiche === n.id
                          ? "bg-white text-black border-white shadow-md font-bold"
                          : "bg-white/[0.03] text-zinc-400 border-white/10 hover:text-white hover:border-white/25"
                      }`}
                    >
                      <span className="text-[10px] font-mono block opacity-75">{n.hindi}</span>
                      <span className="text-xs font-sans font-semibold truncate block">{n.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hook Archetype Selector */}
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold block mb-2.5">
                  2. Select Creative Hook Archetype
                </label>
                <div className="space-y-2">
                  {hookArchetypes.map((hook) => (
                    <button
                      key={hook.id}
                      type="button"
                      onClick={() => {
                        sound.playPluck(160);
                        setSelectedHook(hook.id as "relatability" | "pas" | "shock" | "founder");
                      }}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        selectedHook === hook.id
                          ? "bg-white text-black border-white shadow-md font-bold"
                          : "bg-white/[0.03] text-zinc-400 border-white/10 hover:text-white hover:border-white/25"
                      }`}
                    >
                      <div>
                        <span className="text-xs font-sans font-semibold block">{hook.name}</span>
                        <span className={`text-[10px] font-mono ${selectedHook === hook.id ? "text-zinc-600" : "text-emerald-400"}`}>
                          ✦ Stop Rate: {hook.stopRate} · ROAS: {hook.roasPotential}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full ${
                          selectedHook === hook.id
                            ? "bg-black text-white"
                            : "bg-white/10 text-white border border-white/20"
                        }`}
                      >
                        {hook.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Live Creative Playfield (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8 bg-[#121215]/95 border border-white/20 shadow-2xl flex flex-col justify-between">
              <div>
                {/* Live Output Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-widest text-white font-bold">
                      SIMULATED REEL HOOK ARCHITECTURE
                    </span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                    {activeHookMeta.roasPotential} Projected ROAS
                  </span>
                </div>

                {/* 0-3s Verbal Hook Box */}
                <div className="mb-5 p-4 rounded-xl bg-white/[0.04] border border-white/15">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5 font-bold">
                    0:00 - 0:03 Thumb-Stop Voiceover &amp; Caption
                  </span>
                  <p className="text-sm sm:text-base font-sans font-bold text-white leading-relaxed italic">
                    {activeScript.opener}
                  </p>
                </div>

                {/* Visual Engineering Blueprint */}
                <div className="mb-5 p-4 rounded-xl bg-black/60 border border-white/10">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5 font-bold">
                    Visual Cinematography &amp; Social Proof
                  </span>
                  <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
                    {activeScript.visual}
                  </p>
                </div>

                {/* Performance Analytics Grid */}
                <div className="grid grid-cols-2 gap-3 font-mono text-xs mb-6">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                    <span className="text-[10px] text-zinc-400 block mb-0.5">3s Thumb-Stop Rate</span>
                    <span className="text-lg font-metric font-black text-white">
                      {activeHookMeta.stopRate}
                    </span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">✦ Top 1% Percentile</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                    <span className="text-[10px] text-zinc-400 block mb-0.5">Retention Lift</span>
                    <span className="text-lg font-metric font-black text-white">
                      +3.4x
                    </span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">Above Meta D2C Avg</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs font-mono text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{activeScript.retention}</span>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 pt-5 border-t border-white/10">
                <a
                  href="#pricing"
                  className="btn-luxury-shine w-full py-3.5 px-6 rounded-xl bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5 text-black" />
                  <span>Deploy This Angle With Desi Muchads Pod →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
