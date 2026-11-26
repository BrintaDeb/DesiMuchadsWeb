"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  TrendingUp,
  ChevronRight,
  HelpCircle,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";
import { SectionDivider } from "@/components/common/SectionDivider";
import { PricingSection } from "@/components/pricing/PricingSection";
import { DevStackGuruSection } from "@/components/services/DevStackGuruSection";
import { sound } from "@/lib/sound";

export default function PricingPage() {
  const [isKundliOpen, setIsKundliOpen] = useState(false);

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-white selection:text-black relative overflow-x-hidden">
      <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

      <main className="pt-24 sm:pt-28 md:pt-32 pb-24">
        {/* 1. Pricing Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-white font-bold">5-Service 4-Tier Pricing Matrix</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-[1.08] mb-6">
              Transparent Tiers{" "}
              <span className="text-zinc-400 underline decoration-white/20 underline-offset-8">
                Scaled To Scope
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed max-w-3xl mb-8">
              Dedicated 4-tier plans for Graphics Designing, SEO Management, Social Media Management, Website Development &amp; Branding—start lean with essential deliverables and upgrade cleanly as volume scales.
            </p>

            {/* Metric Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="p-3">
                <span className="block font-metric font-black text-2xl sm:text-3xl text-white">₹11,999</span>
                <span className="text-xs text-zinc-400 font-sans mt-0.5 block">Starting Monthly Plans</span>
              </div>
              <div className="p-3">
                <span className="block font-metric font-black text-2xl sm:text-3xl text-white">5 × 4</span>
                <span className="text-xs text-zinc-400 font-sans mt-0.5 block">Separate Service Tiers</span>
              </div>
              <div className="p-3">
                <span className="block font-metric font-black text-2xl sm:text-3xl text-white">100%</span>
                <span className="text-xs text-zinc-400 font-sans mt-0.5 block">Source &amp; Account Ownership</span>
              </div>
              <div className="p-3">
                <span className="block font-metric font-black text-2xl sm:text-3xl text-white">0 Lock-In</span>
                <span className="text-xs text-zinc-400 font-sans mt-0.5 block">Upgrade or Pause Anytime</span>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* 2. Main 5-Discipline × 4-Tier Pricing Matrix */}
        <section className="my-6">
          <PricingSection variant="full" onOpenKundli={() => setIsKundliOpen(true)} />
        </section>

        <SectionDivider />

        {/* 3. Engineering & Growth Tech Stack In Orbit */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-14">
          <DevStackGuruSection />
        </section>

        <SectionDivider />

        {/* 3. Service Level Guarantees Matrix */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-20">
          <div className="mb-12">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              The Desi Muchads Service Level Agreement (SLA)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-4">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <h3 className="font-display font-black text-lg text-white uppercase">
                1. 100% Asset &amp; Pixel Ownership
              </h3>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                We build campaigns inside YOUR Meta Ads Manager, YOUR Google Ads account, and YOUR Shopify admin. You retain complete historical data, custom audiences, and raw creative files forever.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-4">
              <Zap className="w-8 h-8 text-white" />
              <h3 className="font-display font-black text-lg text-white uppercase">
                2. Zero-Ghosting Slack Channel
              </h3>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                Direct daily communication with the actual growth architects and media buyers doing the work. Guaranteed under-4-hour response during business hours. No account managers acting as bottlenecks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-4">
              <TrendingUp className="w-8 h-8 text-white" />
              <h3 className="font-display font-black text-lg text-white uppercase">
                3. Contribution Margin Protection
              </h3>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                If ad frequency creeps up or blended ROAS dips below agreed targets for 3 consecutive days, we immediately implement creative fatigue rotation and pause bleeders without waiting for your permission.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Retainer FAQ */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto my-20">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              Frequently Asked Retainer Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Why are lower tiers priced less than enterprise agency retainers?",
                a: "Lower tiers (Tier 01 & Tier 02) focus strictly on essentials—fewer posts, fewer keywords, single-page websites, or core logo marks—without source files, reels production, or custom backend overhead. As your requirements grow, you only pay for higher deliverables in Tier 03 or Tier 04.",
              },
              {
                q: "What is the minimum commitment on monthly plans?",
                a: "Monthly services (Graphics Designing, SEO Management, Social Media Management) run month-to-month with zero annual lock-in. Choosing Quarterly billing saves 15% on monthly plans.",
              },
              {
                q: "Are Website Development and Branding one-time fees?",
                a: "Yes. Website Development (from ₹15,999) and Branding (from ₹12,999) are fixed-scope project sprints billed once, with zero ongoing lock-in.",
              },
              {
                q: "Can we mix multiple services like Graphics + Social + SEO?",
                a: "Yes! Switch to the 'Build Custom Bundle' tab above to select any combination across Graphics, SEO, Social Media, Web Dev, and Branding with up to 15% multi-service savings.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-2"
              >
                <h3 className="font-display font-bold text-sm sm:text-base text-white uppercase flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Grand Call to Action */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/20 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight max-w-2xl mx-auto">
              Ready to Lock In Your Growth Architecture?
            </h2>

            <p className="font-sans text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
              Book a 30-minute founder-to-founder strategy session. We review your current unit economics and present an actionable blueprint for the upcoming quarter.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  sound.playChime();
                  setIsKundliOpen(true);
                }}
                type="button"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-zinc-200 text-black font-display font-black text-xs tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95"
              >
                REQUEST BRAND GROWTH AUDIT &gt;
              </button>

              <Link
                href="/work"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all"
              >
                INSPECT OUR 50 WORKS
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenKundli={() => setIsKundliOpen(true)} />

      <BrandKundliModal
        isOpen={isKundliOpen}
        onClose={() => setIsKundliOpen(false)}
      />
    </div>
  );
}
