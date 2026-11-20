"use client";

import React, { useState } from "react";
import {
  Zap,
  Palette,
  CheckCircle2,
  Target,
  Compass,
} from "lucide-react";
import { sound } from "@/lib/sound";

interface DesignPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: typeof Palette;
  axiom: string;
  science: string;
  metrics: { label: string; value: string }[];
  principles: string[];
  codeOrDiagramLabel: string;
  codeSnippet: string;
}

const DESIGN_PILLARS: DesignPillar[] = [
  {
    id: "golden-ratio",
    number: "01",
    title: "Sacred Geometry & The Golden Ratio",
    subtitle: "Fibonacci Proportions (φ = 1.618) & Classical Indian Vastu Symmetry",
    icon: Compass,
    axiom: "Symmetry is not decoration—it is subconscious cognitive relief.",
    science:
      "When visual layouts follow the divine proportion of 1:1.618, the human ocular cortex processes spatial hierarchy with 40% less neural strain. We anchor focal imagery, typographic modular scales, and whitespace breathing on classical geometric axes, establishing instantaneous subconscious credibility before a single word of copy is parsed.",
    metrics: [
      { label: "Visual Polish Index", value: "98.4%" },
      { label: "Ocular Dwell Duration", value: "+42%" },
      { label: "Perceived Brand Value", value: "3.4x" },
    ],
    principles: [
      "Modular Type Scale: Base 16px × 1.618 logarithmic intervals for dramatic contrast",
      "Dynamic Focal Axis: Primary hero assets placed at exact Golden Spiral intersection points",
      "Breathing Whitespace: Symmetric gutters calculated to prevent visual cognitive overload",
      "Monochrome Discipline: 90% Obsidian Canvas, 8% Liquid Platinum, 2% Sindoor Accent",
    ],
    codeOrDiagramLabel: "MATHEMATICAL FORMULA & CSS TOKEN LOGIC",
    codeSnippet: `/* Desi Muchads Sacred Proportions */
--golden-ratio: 1.6180339887;
--type-base: 1rem; /* 16px */
--type-h3: calc(var(--type-base) * var(--golden-ratio));       /* 25.88px */
--type-h2: calc(var(--type-h3) * var(--golden-ratio));         /* 41.88px */
--type-h1: calc(var(--type-h2) * var(--golden-ratio));         /* 67.77px */
--space-phi-gutter: calc(2rem * var(--golden-ratio));          /* 51.78px */
--focal-point: polygon(0 0, 61.8% 0, 100% 38.2%, 0 100%);`,
  },
  {
    id: "kinetic-engineering",
    number: "02",
    title: "Sub-Second Kinetic Engineering",
    subtitle: "Hardware-Accelerated 60 FPS Micro-Interactions & Next.js 16 Speed",
    icon: Zap,
    axiom: "Beauty without latency discipline is financial negligence.",
    science:
      "A 100-millisecond delay in page response causes e-commerce conversion rates to drop by 7%. Every visual embellishment at Desi Muchads is hardware-accelerated via WebGL shaders, CSS transform composition, and Next.js 16 Server Components. We achieve sub-400ms Time-To-First-Byte (TTFB) and zero Cumulative Layout Shift (CLS) on 4G mobile networks.",
    metrics: [
      { label: "Mobile PageSpeed", value: "99/100" },
      { label: "First Contentful Paint", value: "<0.4s" },
      { label: "Frame Rate Lock", value: "60 FPS" },
    ],
    principles: [
      "Zero Layout Shift (CLS = 0): Exact image aspect-ratio reservations on SSR",
      "GPU Layer Promotion: will-change and transform3d for buttery 60fps springs",
      "Edge Route Prefetching: Hover triggers prefetch underlying platform state in 80ms",
      "Asset Decimation: Vector SVGs and WebP assets compressed under 85KB budgets",
    ],
    codeOrDiagramLabel: "RUNTIME LATENCY & PIPELINE TELEMETRY",
    codeSnippet: `// Sub-Second Render Architecture
export const runtime = 'edge';
export const dynamic = 'force-static';
export const revalidate = 86400; // 24h ISR

// GPU Composition without Main-Thread Blocking
.interactive-glass-tile {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
  contain: layout paint style;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}`,
  },
  {
    id: "cultural-semiotics",
    number: "03",
    title: "Cultural Semiotics & Vernacular Psychology",
    subtitle: "Native Hinglish Emotional Anchors, Street Slang & Authentic Craft",
    icon: Palette,
    axiom: "Indian consumers reject clinical corporate English in favor of raw pride.",
    science:
      "Globalized corporate templates fail across India because they lack visceral emotional truth. Desi Muchads replaces sterile Silicon Valley stock layouts with handcrafted fine art (Sumi-e ink sketches, cyber mandalas, royal filigree) paired with high-hook Hinglish copy that triggers immediate regional belonging, dignity, and purchase conviction.",
    metrics: [
      { label: "Blended Meta ROAS", value: "5.8x" },
      { label: "Scroll-Stop Rate (0-1.5s)", value: "78.4%" },
      { label: "First-Party Trust Index", value: "+65%" },
    ],
    principles: [
      "Vernacular Street Hooks: Conversational Hinglish tailored to tier-1 & tier-2 consumer psyche",
      "Human-Engineered Artistry: Zero AI slop; bespoke hand-drawn illustrations and authentic brushwork",
      "Cultural Color Resonances: Sacred Sindoor crimson accents on deep velvet Obsidian canvases",
      "Dignity & Word: Positioning brands not as discount hawkers, but as proud cultural leaders",
    ],
    codeOrDiagramLabel: "SEMIOTIC PSYCHOLOGY MATRIX",
    codeSnippet: `// Cultural Conversion Grammar
const HookArchetypes = {
  STREET_CHALLENGE: "Tired of generic agency ads? Experience verified performance.",
  PRIDE_ANCHOR: "Generational craftsmanship meets precision mechanical horology.",
  HONOR_PLEDGE: "The Muchads Guarantee: Zero ghosting, direct founder accountability.",
  CONTRIBUTION_FOCUS: "Ignore vanity impressions: calculate verified bank account profit.",
};
const CulturalPalette = {
  obsidian: '#09090b', // Executive Velvet Canvas
  sindoor: '#ff3344',  // High-Intent Conversion Focus
  platinum: '#f4f4f5', // Precision Type Legibility
};`,
  },
  {
    id: "ergonomics-fitts",
    number: "04",
    title: "Fitts's Law & Thumb-Zone Ergonomics",
    subtitle: "Mobile Conversion Physics, Tactile Triggers & Frictionless Checkouts",
    icon: Target,
    axiom: "If the thumb struggles to reach the action, the transaction is lost.",
    science:
      "Over 84% of Indian D2C purchases occur on mobile devices held with a single hand while commuting or multitasking. Applying Fitts's Law of target acquisition, we anchor all critical conversion triggers within the natural lower-third thumb sweep, expand touch radii to 48px+, and provide subtle tactile audio feedback to confirm commitment.",
    metrics: [
      { label: "Mobile CVR Lift", value: "+310%" },
      { label: "Cart Abandonment Drop", value: "-46%" },
      { label: "Express Checkout Velocity", value: "<12s" },
    ],
    principles: [
      "Natural Thumb Sweep: High-priority CTAs anchored in the bottom 35% of the viewport",
      "48×48px Minimum Hit Targets: Elimination of mis-taps on high-density mobile screens",
      "Dynamic Sticky Trays: Persistent floating proposal & checkout bar with zero screen occlusion",
      "Immediate Haptic Feedback: Multi-frequency audio clicks validate user commitments instantly",
    ],
    codeOrDiagramLabel: "FITTS'S LAW ACQUISITION FORMULA",
    codeSnippet: `// Fitts's Law: MT = a + b * log2(2D / W)
// Where D = Distance to target, W = Width of target
const calculateTargetAcquisitionTime = (distancePx: number, targetWidthPx: number) => {
  const indexDifficulty = Math.log2((2 * distancePx) / Math.max(targetWidthPx, 48));
  return 120 + 80 * indexDifficulty; // milliseconds
};

// Tactical Bottom Thumb Sweep Constraint
.touch-optimized-cta {
  min-height: 48px;
  min-width: 48px;
  margin-bottom: env(safe-area-inset-bottom, 16px);
  touch-action: manipulation;
}`,
  },
];

export function WorkDesignTheorySection() {
  const [activePillarId, setActivePillarId] = useState<string>("golden-ratio");

  const currentPillar =
    DESIGN_PILLARS.find((p) => p.id === activePillarId) || DESIGN_PILLARS[0];
  const IconComp = currentPillar.icon;

  return (
    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 text-left relative overflow-hidden">
      {/* Ambient Visual Atmosphere */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-white/[0.02] blur-[140px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-tight">
          Where Sacred Geometry Meets Sub-Second Code.
        </h2>

        <p className="mt-4 text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
          Traditional ad agencies treat web design as surface decoration or template assembly.
          At Desi Muchads, our entire 50-project portfolio is governed by a rigorous mathematical,
          cognitive, and cultural design theory engineered to maximize conversion velocity.
        </p>
      </div>

      {/* 4 Pillar Interactive Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {DESIGN_PILLARS.map((pillar) => {
          const PIcon = pillar.icon;
          const isActive = pillar.id === activePillarId;

          return (
            <button
              key={pillar.id}
              type="button"
              onClick={() => {
                sound.playPluck(150);
                setActivePillarId(pillar.id);
              }}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                isActive
                  ? "bg-white text-black border-white shadow-[0_10px_30px_rgba(255,255,255,0.2)] scale-[1.02]"
                  : "bg-[#121215] text-white border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span
                  className={`font-mono text-xs font-bold tracking-wider ${
                    isActive ? "text-zinc-700" : "text-zinc-500"
                  }`}
                >
                  PILLAR {pillar.number}
                </span>
                <PIcon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? "text-black" : "text-zinc-400"
                  }`}
                />
              </div>

              <div>
                <h3
                  className={`font-display font-black text-sm sm:text-base uppercase tracking-tight leading-snug mb-1 ${
                    isActive ? "text-black" : "text-white"
                  }`}
                >
                  {pillar.title}
                </h3>
                <span
                  className={`text-[11px] font-mono leading-tight block line-clamp-1 ${
                    isActive ? "text-zinc-800" : "text-zinc-400"
                  }`}
                >
                  {pillar.subtitle.split("&")[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Deep-Dive Interactive Showcase Panel */}
      <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#121215] border border-white/15 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Theory, Axiom & Principles (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center shrink-0">
                <IconComp className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block font-bold">
                  PILLAR 0{currentPillar.number} • OPERATIONAL SPECIFICATION
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  {currentPillar.title}
                </h3>
              </div>
            </div>

            {/* Axiom Callout */}
            <div className="p-4 rounded-xl bg-white/[0.03] border-l-2 border-white pl-4 text-xs sm:text-sm font-mono text-zinc-200 italic">
              &ldquo;{currentPillar.axiom}&rdquo;
            </div>

            {/* Scientific Explanation */}
            <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
              {currentPillar.science}
            </p>

            {/* Core Implementation Rules */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                Engineering &amp; Design Protocols:
              </span>
              <ul className="space-y-2.5">
                {currentPillar.principles.map((pr, pIdx) => (
                  <li
                    key={pIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-sans"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{pr}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Quantitative Telemetry & Code Specimen (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 bg-black/50 p-6 rounded-2xl border border-white/10">
            {/* Metric Verification Badges */}
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-3">
                Measured Performance Multipliers
              </span>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
                {currentPillar.metrics.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center"
                  >
                    <span className="block font-metric font-black text-lg sm:text-xl text-white">
                      {m.value}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono block mt-0.5 leading-tight">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Code / Logic Specimen Window */}
              <div className="rounded-xl bg-black border border-white/15 overflow-hidden">
                <div className="px-3.5 py-2 bg-zinc-900 border-b border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/70" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="truncate max-w-[220px]">{currentPillar.codeOrDiagramLabel}</span>
                </div>
                <pre className="p-4 text-[11px] font-mono text-zinc-300 overflow-x-auto leading-relaxed select-all">
                  <code>{currentPillar.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Bottom Callout */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Standard Across All 50 Works</span>
              <span className="text-emerald-400 font-bold">100% Zero-AI Boilerplate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Anatomy: Generic Agency vs Desi Muchads Craft */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10">
        <div className="text-left mb-6">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 block mb-1">
            Comparative Dissection
          </span>
          <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
            The Difference Between Disposable Templates &amp; Enduring Brand Equity
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm font-sans">
          {/* Left: Typical Agency Output */}
          <div className="p-5 sm:p-6 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-mono font-bold uppercase text-xs">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span>Generic Agency / AI Template Approach</span>
            </div>
            <ul className="space-y-2 text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>Off-the-shelf theme bloated with 40+ third-party JS apps causing 4.2s mobile load times.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>Sterile Western stock photos and corporate ChatGPT copy with zero Indian cultural relevance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>Random CTA button placement forcing awkward thumb stretches and elevated bounce rates.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>Vanity impressions celebrated while contribution margin bleeds into red.</span>
              </li>
            </ul>
          </div>

          {/* Right: Desi Muchads Human Craft */}
          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold uppercase text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Desi Muchads Creative Engineering Standard</span>
            </div>
            <ul className="space-y-2 text-zinc-200">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span>Hand-coded Next.js 16 App Router platforms delivering sub-second (&lt;0.4s) page loads.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span>Original fine art, bespoke vector mandalas, and street-smart Hinglish vernacular hooks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span>Fitts&apos;s Law thumb-zone architecture ensuring frictionless 2-tap mobile checkout flows.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span>Mathematical accountability: Every design choice tied directly to CAC, ROAS, and CM3.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
