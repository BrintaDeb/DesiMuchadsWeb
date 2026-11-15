"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Star,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";
import { SectionDivider } from "@/components/common/SectionDivider";
import { AdPostMortemSection } from "@/components/adpostmortem/AdPostMortemSection";
import { ClientsTrustStrip } from "@/components/clients/ClientsTrustStrip";
import { sound } from "@/lib/sound";

export default function SuccessStoriesPage() {
  const [isKundliOpen, setIsKundliOpen] = useState(false);

  const flagshipStories = [
    {
      id: "vedaroots",
      brand: "VedaRoots Ayurveda",
      tagline: "Classical Single-Estate Ayurveda & Holistic Wellness",
      category: "D2C Wellness & Ayurvedic Medicine",
      duration: "6-Month Growth Retainer",
      metrics: [
        { label: "Organic Search Lift", value: "+420%", icon: TrendingUp },
        { label: "Blended Meta ROAS", value: "4.8x", icon: Sparkles },
        { label: "Monthly Revenue", value: "₹42L/mo", icon: Zap },
        { label: "CAC Reduction", value: "-46%", icon: ShieldCheck },
      ],
      challenge:
        "VedaRoots was trapped in generic influencer gifting campaigns with rising Meta CPMs (₹580+) and near-zero organic search equity against established FMCG giants.",
      solution:
        "We executed a complete programmatic SEO topical cluster targeting 140+ specific ayurvedic dosha queries, paired with vernacular Hinglish problem-solution reels that unlocked a 4.8x Meta ASC+ return.",
      quote: {
        text: "Desi Muchads transformed our acquisition from a cash-burning gamble into a disciplined, compounding revenue machine. Our CAC was cut in half within 60 days.",
        author: "Devendra Singhania",
        title: "Founder & CEO, VedaRoots",
      },
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      demoUrl: "/demos/vedaroots-ayurveda",
    },
    {
      id: "snacknation",
      brand: "SnackNation Makhanas",
      tagline: "D2C Roasted Himalayan Superfoods & Healthy Snacking",
      category: "FMCG & Quick Commerce",
      duration: "90-Day Velocity Sprint",
      metrics: [
        { label: "Net Revenue Growth", value: "8.1x", icon: TrendingUp },
        { label: "Creative Fatigue Shield", value: "100%", icon: Sparkles },
        { label: "First-Party Repeat Rate", value: "38%", icon: Zap },
        { label: "Blended ROAS", value: "5.8x", icon: ShieldCheck },
      ],
      challenge:
        "Facing relentless copycat competitors selling cheap makhanas, SnackNation struggled to scale past ₹4.2 Lakhs/month without ad fatigue crushing their margins.",
      solution:
        "Engineered 16 high-hook vernacular video concepts featuring humorous street-style taste tests, combined with WhatsApp automated re-order flows that lifted repeat purchases to 38%.",
      quote: {
        text: "The speed at which Brinta and the Desi Muchads team iterate creative angles is unmatched. We scaled from ₹4L to ₹34L a month without our ROAS slipping once.",
        author: "Pooja Kulkarni",
        title: "Co-Founder, SnackNation",
      },
      image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=1200&q=80",
      demoUrl: "/demos/snacknation-makhanas",
    },
    {
      id: "darbar",
      brand: "Darbar Fine Watches",
      tagline: "Bespoke Royal Mechanical Horology & Heritage Timepieces",
      category: "Luxury Horology & High-Ticket Retail",
      duration: "Ongoing Sovereign Retainer",
      metrics: [
        { label: "PageSpeed Score", value: "99/100", icon: Zap },
        { label: "Average Order Value", value: "₹48,500", icon: Sparkles },
        { label: "Conversion Rate Lift", value: "+310%", icon: TrendingUp },
        { label: "Zero Jitter WebGL", value: "60 FPS", icon: ShieldCheck },
      ],
      challenge:
        "Darbar's Shopify storefront took 4.6 seconds to load on mobile, causing ultra-high net-worth buyers to bounce before experiencing the timepiece craftsmanship.",
      solution:
        "Engineered a bespoke Next.js 15 App Router platform with micro-optimized Three.js 3D watch previews, reducing load times to 480ms and elevating conversion rates by 310%.",
      quote: {
        text: "Selling ₹50,000 mechanical watches online requires extreme digital elegance. Desi Muchads gave us the fastest, most luxurious storefront in Indian horology.",
        author: "Vikramaditya Rathore",
        title: "Managing Director, Darbar Watches",
      },
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
      demoUrl: "/demos/darbar-fine-watches",
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-white selection:text-black">
      <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

      <main className="pt-24 sm:pt-28 md:pt-32 pb-24">
        {/* 1. Success Stories Hero */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-white font-bold">Success Stories &amp; Audits</span>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wider uppercase text-zinc-300 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Proven Outcomes · Verified Financial Results</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-[1.08] mb-6">
              Stories Of Relentless{" "}
              <span className="text-zinc-400 underline decoration-white/20 underline-offset-8">
                Market Domination
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed max-w-3xl mb-8">
              We judge ourselves by one unforgiving standard: Did our clients grow their net bank balances? Here are verified case audits detailing exactly how we turned stalled ad accounts into multi-crore category champions.
            </p>

            {/* Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="p-3">
                <span className="block font-metric font-black text-2xl sm:text-3xl text-white">₹14.8Cr+</span>
                <span className="text-xs text-zinc-400 font-sans mt-0.5 block">Client Revenue Generated</span>
              </div>
              <div className="p-3">
                <span className="block font-metric font-black text-2xl sm:text-3xl text-white">5.8x</span>
                <span className="text-xs text-zinc-400 font-sans mt-0.5 block">Average Blended ROAS</span>
              </div>
              <div className="p-3">
                <span className="block font-metric font-black text-2xl sm:text-3xl text-white">99.4%</span>
                <span className="text-xs text-zinc-400 font-sans mt-0.5 block">SLA Commitment Rate</span>
              </div>
              <div className="p-3">
                <span className="block font-metric font-black text-2xl sm:text-3xl text-white">420%</span>
                <span className="text-xs text-zinc-400 font-sans mt-0.5 block">Peak Organic Lift</span>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* 2. Flagship Case Studies Breakdown */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-20">
          <div className="mb-12">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 block mb-2">
              Deep-Dive Audits
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              Featured Growth Architecture Audits
            </h2>
          </div>

          <div className="space-y-16">
            {flagshipStories.map((story, idx) => (
              <div
                key={story.id}
                className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#121215] border border-white/10 hover:border-white/20 transition-all shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Visual & Quote */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-lg">
                      <img
                        src={story.image}
                        alt={story.brand}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                        <span className="font-mono text-zinc-300 font-bold uppercase">
                          {story.category}
                        </span>
                        <Link
                          href={story.demoUrl}
                          className="px-3 py-1 rounded-full bg-white text-black font-display font-bold text-[10px] uppercase flex items-center gap-1 hover:scale-105 transition-all"
                        >
                          <span>Explore Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                    {/* Testimonial Quote Card */}
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                        &ldquo;{story.quote.text}&rdquo;
                      </p>
                      <div className="pt-2 border-t border-white/5">
                        <span className="font-display font-bold text-xs text-white uppercase block">
                          {story.quote.author}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 block">
                          {story.quote.title}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Narrative & Metrics */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-[10px] font-bold uppercase">
                          CASE 0{idx + 1}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">
                          {story.duration}
                        </span>
                      </div>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                        {story.brand}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-zinc-400 mt-1">
                        {story.tagline}
                      </p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      {story.metrics.map((m, i) => {
                        const IconComp = m.icon;
                        return (
                          <div key={i} className="space-y-1">
                            <div className="flex items-center gap-1 text-zinc-400">
                              <IconComp className="w-3 h-3 text-emerald-400" />
                              <span className="text-[9px] font-mono uppercase truncate">
                                {m.label}
                              </span>
                            </div>
                            <span className="block font-metric font-black text-lg text-white">
                              {m.value}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Challenge & Solution */}
                    <div className="space-y-4 text-xs font-sans">
                      <div>
                        <span className="font-mono text-red-400 font-bold uppercase tracking-wider block mb-1">
                          The Bottleneck:
                        </span>
                        <p className="text-zinc-300 leading-relaxed">
                          {story.challenge}
                        </p>
                      </div>

                      <div>
                        <span className="font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                          The Architecture Fix:
                        </span>
                        <p className="text-zinc-300 leading-relaxed">
                          {story.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* 3. Interactive Ad Post-Mortem Studio */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-20">
          <div className="mb-12">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 block mb-2">
              Forensic Creative Anatomy
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-3">
              The Ad Post-Mortem Slider Studio
            </h2>
            <p className="text-sm font-sans text-zinc-300 max-w-2xl">
              Drag the golden slider to inspect why generic brand ads fail and see the 4 exact engineering pins we apply to turn ad spend into high-margin conversions.
            </p>
          </div>

          <AdPostMortemSection />
        </section>

        <SectionDivider />

        {/* 4. Trust Wall of Clients & Friends */}
        <ClientsTrustStrip />

        {/* 5. Grand Call to Action */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/20 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono uppercase tracking-wider text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Free 30-Minute Forensic Ad Account Teardown</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight max-w-2xl mx-auto">
              Ready To Engineer Your Brand&apos;s Breakout Quarter?
            </h2>

            <p className="font-sans text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
              We audit your Meta pixel telemetry, conversion funnels, and ad creative spend for free. Let&apos;s identify your biggest cash leak within 30 minutes.
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
                REQUEST BRAND KUNDLI AUDIT &gt;
              </button>

              <Link
                href="/pricing"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all"
              >
                VIEW RETAINER TIERS
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
