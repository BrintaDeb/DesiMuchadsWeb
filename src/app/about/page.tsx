"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";
import { FounderSlideCarousel } from "@/components/about/FounderSlideCarousel";
import { sound } from "@/lib/sound";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  avatar: string;
  tileBgClass?: string;
  badge: string;
  disciplines: string[];
  socials: {
    linkedin?: string;
    twitter?: string;
    email?: string;
    portfolio?: string;
  };
}

const TEAM_ROSTER: TeamMember[] = [
  {
    id: 1,
    name: "Rahul Datta",
    role: "CEO",
    tagline: "Agency Vision, Client Scaling Strategy & Executive Leadership",
    bio: "Directs overarching agency strategy, high-growth client partnerships, and market expansion. Leads enterprise acquisitions and scaling roadmaps.",
    avatar: "/team/rahul-datt.jpg",
    tileBgClass: "bg-black",
    badge: "CHIEF EXECUTIVE OFFICER",
    disciplines: ["Executive Leadership", "Growth Strategy", "Client Partnerships", "Brand Scaling"],
    socials: {
      linkedin: "https://www.linkedin.com/company/desi-muchads",
      email: "mailto:rahuldesimuchads@gmail.com",
    },
  },
  {
    id: 2,
    name: "Brinta Deb",
    role: "CTO",
    tagline: "Fullstack Engineering, Conversion Architecture & Systems",
    bio: "Architects high-performance Next.js web applications, sub-second conversion engines, and server-side ad tracking systems. Leads fullstack engineering and digital infrastructure.",
    avatar: "/team/brinta-deb.png",
    tileBgClass: "bg-black",
    badge: "CHIEF TECHNOLOGY OFFICER",
    disciplines: ["Next.js App Router", "Fullstack Engineering", "Conversion Architecture", "Performance Systems"],
    socials: {
      linkedin: "https://www.linkedin.com/company/desi-muchads",
      email: "mailto:brintadesimuchads@gmail.com",
      portfolio: "https://brinta-deb-portfolio.onrender.com",
    },
  },
  {
    id: 3,
    name: "Omkar Dutta",
    role: "CFO",
    tagline: "Capital Allocation, Unit Economics & Financial Governance",
    bio: "Oversees financial strategy, client ROI auditing, and unit economics. Ensures every marketing rupee spent yields measurable contribution margins and compounding returns.",
    avatar: "/team/omkar-dutta.png",
    badge: "CHIEF FINANCIAL OFFICER",
    disciplines: ["Financial Strategy", "Unit Economics", "Profitability Audits", "Capital Allocation"],
    socials: {
      linkedin: "https://www.linkedin.com/in/reodomkar",
      email: "mailto:thedesimuchads@gmail.com?subject=CFO%20Financial%20Audit%20-%20Omkar%20Dutta",
    },
  },
];

export default function AboutPage() {
  const [isKundliOpen, setIsKundliOpen] = useState(false);

  return (
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* 1. Header Navigation */}
      <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

      <main>
      {/* 2. Monumental Hero Section */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 border-b border-white/10 overflow-hidden">
        {/* Ambient Dark Velvet Backdrop Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-white/[0.04] via-zinc-800/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-8 uppercase tracking-wider">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-white font-bold">About Us &amp; Leadership</span>
          </div>

          <div className="max-w-4xl text-left">
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.95]">
              We Scale Businesses <br />
              <span className="text-zinc-400">Personally</span> &amp; Seriously.
            </h1>

            <p className="mt-6 sm:mt-8 text-lg sm:text-2xl text-zinc-300 font-normal leading-relaxed font-sans max-w-3xl">
              Desi Muchads is an elite growth architecture and high-velocity engineering collective. We reject generic templates and outsourced complacency in favor of deep commercial strategy, hand-crafted code, and relentless ROAS accountability.
            </p>
          </div>

          {/* 4 Hero Quantitative Impact Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16">
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg">
              <span className="text-zinc-400 text-[10px] font-mono uppercase block mb-1">Blended ROAS Guarantee</span>
              <div className="font-display font-black text-3xl sm:text-4xl text-emerald-400">5.8X</div>
              <span className="text-xs text-zinc-400 font-sans mt-1 block">Contractually committed in retainers</span>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg">
              <span className="text-zinc-400 text-[10px] font-mono uppercase block mb-1">Verified Works</span>
              <div className="font-display font-black text-3xl sm:text-4xl text-white">50+</div>
              <span className="text-xs text-zinc-400 font-sans mt-1 block">Live platforms, reels &amp; master art</span>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg">
              <span className="text-zinc-400 text-[10px] font-mono uppercase block mb-1">Human Craftsmanship</span>
              <div className="font-display font-black text-3xl sm:text-4xl text-white">100%</div>
              <span className="text-xs text-zinc-400 font-sans mt-1 block">Hand-crafted bespoke architecture</span>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg">
              <span className="text-zinc-400 text-[10px] font-mono uppercase block mb-1">Average PageSpeed</span>
              <div className="font-display font-black text-3xl sm:text-4xl text-white">99/100</div>
              <span className="text-xs text-zinc-400 font-sans mt-1 block">Core Web Vitals sub-0.7s LCP</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Core Executive Leadership (Rahul Datta CEO, Brinta Deb CTO, Omkar Dutta CFO) */}
      <section id="team" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-b border-white/10 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-tight">
              Meet The Minds Behind The Growth.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-300 font-sans">
              No interns, no outsourced white-label farms. Direct founder-led accountability and technical mastery across every client engagement.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ACTIVE EXECUTIVE ROSTER</span>
          </div>
        </div>

        {/* 3 Executive Leaders 3D Aller Studio Picture Slide Carousel */}
        <FounderSlideCarousel founders={TEAM_ROSTER} />
      </section>

      {/* 5. The Cultural Symbolism of The Moustache (Desi Muchads) */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-b border-white/10 text-left">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#121216] via-[#0d0d10] to-[#070709] border border-white/20 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl relative z-10 space-y-4">
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              The Moustache As A Seal Of Honor.
            </h2>
            <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
              In classical Indian lore, the *Muchh* (Moustache) is not merely facial grooming—it is a sacred emblem of word, dignity, and unyielding pride. When a traditional craftsman gives his word on his moustache, there is no backpedaling, no contractual loophole, and no excuses.
            </p>
            <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
              At Desi Muchads, our name is our pledge: <strong>Personal, serious, and relentlessly honorable execution.</strong> If we take your brand into our agency cohort, we treat your capital, your reputation, and your growth as our own.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  sound.playChime();
                  setIsKundliOpen(true);
                }}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display text-xs font-black tracking-wider uppercase transition-all shadow-xl active:scale-95"
              >
                REQUEST BRAND GROWTH AUDIT &gt;
              </button>
              <Link
                href="/work"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center gap-1.5"
              >
                <span>EXPLORE 50 VERIFIED WORKS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* 6. Footer */}
      <Footer onOpenKundli={() => setIsKundliOpen(true)} />

      {/* 7. Brand Kundli Audit Modal */}
      <BrandKundliModal isOpen={isKundliOpen} onClose={() => setIsKundliOpen(false)} />
    </div>
  );
}
