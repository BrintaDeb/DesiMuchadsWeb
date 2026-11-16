"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Target,
  ArrowRight,
  ChevronRight,
  Code2,
  Mail,
  Globe,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { sound } from "@/lib/sound";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  avatar: string;
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
    name: "Rahul Datt",
    role: "CEO",
    tagline: "Agency Vision, Client Scaling Strategy & Executive Leadership",
    bio: "Directs overarching agency strategy, high-growth client partnerships, and market expansion. Leads enterprise acquisitions and scaling roadmaps.",
    avatar: "/team/rahul-datt.jpg",
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
    bio: "Architects high-performance Next.js web applications, sub-second conversion engines, and algorithmic ad tracking systems. Leads fullstack engineering and digital infrastructure.",
    avatar: "/team/brinta-deb.jpg",
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
      linkedin: "http://www.linkedin.com/in/reodomkar",
      email: "mailto:thedesimuchads@gmail.com?subject=CFO%20Financial%20Audit%20-%20Omkar%20Dutta",
    },
  },
];

export default function AboutPage() {
  const [isKundliOpen, setIsKundliOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070709] text-white font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* 1. Header Navigation */}
      <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

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
              Desi Muchads is an elite growth architecture and high-velocity engineering collective. We reject generic templates, outsourced complacency, and synthetic AI fluff in favor of deep commercial strategy, hand-crafted code, and relentless ROAS accountability.
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
              <span className="text-xs text-zinc-400 font-sans mt-1 block">Zero synthetic boilerplate code</span>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg">
              <span className="text-zinc-400 text-[10px] font-mono uppercase block mb-1">Average PageSpeed</span>
              <div className="font-display font-black text-3xl sm:text-4xl text-white">99/100</div>
              <span className="text-xs text-zinc-400 font-sans mt-1 block">Core Web Vitals sub-0.7s LCP</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Anti-AI Manifesto & Agency Design Theory */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-b border-white/10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 block">
              01. PHILOSOPHICAL MANIFESTO
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              Why We Stand Against Synthetic Slop.
            </h2>
            <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
              In 2024–2026, the internet became flooded with automated AI agencies pumping out identical mid-journey slop, ChatGPT ad copy that converts at 0.8%, and cookie-cutter Webflow templates that choke mobile browsers.
            </p>
            <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
              When everyone has access to the same average generation tools, <strong>radical human intentionality becomes the rarest luxury</strong>. We write bespoke code line by line, film authentic video reels with professional anamorphic glass, and engineer psychological ad angles that penetrate consumer skepticism.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-[#0e0e12] border border-white/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white uppercase">01. Bespoke Code &amp; Speed</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                Every millisecond of latency is a lost transaction. We architect custom headless platforms in Next.js 16 with instant client-side transitions and zero third-party bloat.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e0e12] border border-white/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white uppercase">02. Commercial Rigor</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                We do not celebrate vanity likes or impressions. Every creative asset and funnel is judged by a single, unforgiving standard: Contribution Margin and Net Cash Collected.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e0e12] border border-white/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white uppercase">03. Zero-Ghosting Retainers</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                No junior account managers acting as telephone operators. You communicate directly with the growth architects, engineers, and art directors shipping your campaigns.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e0e12] border border-white/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white uppercase">04. Cultural Grounding</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                Indian commerce is nuanced, emotional, and relationship-driven. From tier-1 metropolitans to tier-3 Bharat, our Hinglish vernacular scripts strike chords that Silicon Valley formulas cannot touch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Core Executive Leadership (Rahul Datt CEO, Brinta Deb CTO, Omkar Dutta CFO) */}
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

        {/* 3 Executive Leaders Grid (1-col on mobile, 3-col on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TEAM_ROSTER.map((member) => (
            <SpotlightCard
              key={member.id}
              spotlightColor="rgba(255, 255, 255, 0.12)"
              borderColor="rgba(255, 255, 255, 0.35)"
              className="rounded-2xl p-6 sm:p-7 bg-[#0c0c10] flex flex-col justify-between group shadow-xl hover:shadow-2xl transition-all"
            >
              <div>
                {/* Avatar with obsidian glass bezel */}
                <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden mb-5 border border-white/20 bg-[#09090c] shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]">
                  <img
                    src={member.avatar}
                    alt={`${member.name} Profile`}
                    className="w-full h-full object-cover object-top grayscale contrast-[1.18] brightness-[0.95] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10 pointer-events-none" />

                  {/* Badge */}
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white uppercase shadow-md">
                    {member.badge}
                  </span>

                  {/* Name overlay on bottom */}
                  <div className="absolute bottom-3 inset-x-3 text-left">
                    <h3 className="font-display font-black text-xl text-white uppercase tracking-tight leading-tight">
                      {member.name}
                    </h3>
                    <span className="text-xs font-mono text-emerald-400 font-bold block mt-0.5">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs font-mono text-zinc-400 leading-snug mb-3 font-semibold">
                  {member.tagline}
                </p>

                {/* Bio / Short Working Description */}
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Disciplines Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {member.disciplines.map((d, dIdx) => (
                    <span
                      key={dIdx}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Socials & Contact */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-zinc-400 text-xs font-mono">
                <span className="text-[10px] uppercase text-zinc-500">Verified Member</span>
                <div className="flex items-center gap-2">
                  {member.socials.portfolio && (
                    <a
                      href={member.socials.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono flex items-center gap-1.5 transition-colors font-bold"
                      title="View Engineer Portfolio"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Portfolio ↗</span>
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                      title="LinkedIn Profile"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z"/>
                      </svg>
                    </a>
                  )}
                  {member.socials.email && (
                    <a
                      href={member.socials.email}
                      className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                      title={`Direct Email: ${member.socials.email.replace("mailto:", "").split("?")[0]}`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 5. The Cultural Symbolism of The Moustache (Desi Muchads) */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-b border-white/10 text-left">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#121216] via-[#0d0d10] to-[#070709] border border-white/20 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl relative z-10 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
              03. CULTURAL ICONOGRAPHY
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              The Moustache As A Seal Of Honor.
            </h2>
            <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
              In classical Indian lore, the *Muchh* (Moustache) is not merely facial grooming—it is a sacred emblem of word, dignity, and unyielding pride. When a traditional craftsman gives his word on his moustache, there is no backpedaling, no contractual loophole, and no excuses.
            </p>
            <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
              At Desi Muchads, our name is our pledge: <strong>Personal, serious, and relentlessly honorable execution.</strong> If we take your brand into our Darbar, we treat your capital, your reputation, and your growth as our own.
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
                REQUEST BRAND KUNDLI AUDIT &gt;
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

      {/* 6. Footer */}
      <Footer onOpenKundli={() => setIsKundliOpen(true)} />

      {/* 7. Brand Kundli Audit Modal */}
      <BrandKundliModal isOpen={isKundliOpen} onClose={() => setIsKundliOpen(false)} />
    </div>
  );
}
