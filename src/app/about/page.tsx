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
    avatar: "/team/rahul-datta.png",
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
    avatar: "/team/brinta-deb.webp",
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
    avatar: "/team/omkar-dutta.webp",
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

          <div className="max-w-3xl text-left">
            <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-[0.96]">
              Personal Scale.{" "}
              <span className="text-zinc-500">Serious Craft.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-zinc-400 font-light leading-relaxed font-sans max-w-xl">
              An independent growth and engineering collective built on senior execution, bespoke code, and measurable ROI.
            </p>
          </div>

          {/* 4 Clean Impact Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-14">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-zinc-500 text-[10.5px] font-mono uppercase block mb-1">Blended ROAS</span>
              <div className="font-display font-bold text-3xl sm:text-4xl text-[#F3E5AB] tabular-nums">5.8X</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-zinc-500 text-[10.5px] font-mono uppercase block mb-1">Works</span>
              <div className="font-display font-bold text-3xl sm:text-4xl text-white tabular-nums">50+</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-zinc-500 text-[10.5px] font-mono uppercase block mb-1">Craft</span>
              <div className="font-display font-bold text-3xl sm:text-4xl text-white tabular-nums">100%</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-zinc-500 text-[10.5px] font-mono uppercase block mb-1">PageSpeed</span>
              <div className="font-display font-bold text-3xl sm:text-4xl text-white tabular-nums">99</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Executive Leadership */}
      <section id="team" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 border-b border-white/[0.08] text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div className="max-w-xl">
            <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              Leadership
            </h2>
            <p className="mt-2 text-sm text-zinc-400 font-light font-sans">
              Direct founder accountability on every partner account.
            </p>
          </div>
        </div>

        <FounderSlideCarousel founders={TEAM_ROSTER} />
      </section>

      {/* 5. Philosophy */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 border-b border-white/[0.08] text-left">
        <div className="p-7 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.09] relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <h2 className="font-display font-bold text-2xl sm:text-4xl uppercase tracking-tight text-white leading-tight">
              The Moustache As A Seal Of Honor.
            </h2>
            <p className="text-zinc-400 font-sans font-light text-sm sm:text-base leading-relaxed">
              In Indian tradition, the <em className="not-italic text-zinc-200">Muchh</em> represents kept word and pride in one&apos;s craft. We operate with that same personal accountability across every campaign and line of code.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  sound.playChime();
                  setIsKundliOpen(true);
                }}
                className="px-5 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-display text-xs font-bold tracking-wider uppercase transition-all active:scale-95"
              >
                Request Audit
              </button>
              <Link
                href="/work"
                className="px-5 py-3 rounded-xl bg-transparent hover:bg-white/[0.06] text-zinc-200 hover:text-white font-mono text-xs uppercase tracking-wider transition-all border border-white/15 flex items-center gap-1.5"
              >
                <span>View Work</span>
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
