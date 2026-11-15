"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Target,
  ArrowRight,
  ChevronRight,
  Users,
  Code2,
  Mail,
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
  };
}

const TEAM_ROSTER: TeamMember[] = [
  {
    id: 1,
    name: "Brinta Deb",
    role: "Founder & Chief Growth Architect",
    tagline: "Fullstack Engineering, Conversion Optimization & Enterprise Systems",
    bio: "Pioneered high-velocity human-engineered web architectures and conversion funnels. Specializes in building sub-second React/Next.js platforms, algorithmic ad systems, and scalable e-commerce infrastructure.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    badge: "FOUNDERSHIP",
    disciplines: ["Next.js App Router", "Conversion Architecture", "Paid Traffic Science", "Brand Strategy"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:brinta@desimuchads.agency",
    },
  },
  {
    id: 2,
    name: "Aarav Singhania",
    role: "Head of Creative Strategy & Media Buying",
    tagline: "Meta ASC+ Architecture, Vernacular Video Hooks & ROAS Science",
    bio: "Manages 8-figure monthly ad spend across D2C, Quick Commerce, and B2B SaaS. Specializes in vernacular Hinglish hooks, creative fatigue shields, and omnichannel cohort analytics.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    badge: "PERFORMANCE LEAD",
    disciplines: ["Meta ASC+", "Google PMax", "Vernacular Creatives", "Attribution Modeling"],
    socials: {
      linkedin: "https://linkedin.com",
      email: "mailto:aarav@desimuchads.agency",
    },
  },
  {
    id: 3,
    name: "Meera Krishnan",
    role: "Principal Art Director & Brand Architect",
    tagline: "Haute Couture Identity, Luxury Packaging & Visual Typography",
    bio: "Fine Arts gold medalist with extensive experience directing luxury packaging dielines, editorial visual systems, and bespoke brand books for heritage and direct-to-consumer brands.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    badge: "CREATIVE DIRECTION",
    disciplines: ["Luxury Brand Identity", "Packaging Dielines", "Editorial Design", "Typography"],
    socials: {
      linkedin: "https://linkedin.com",
      email: "mailto:meera@desimuchads.agency",
    },
  },
  {
    id: 4,
    name: "Kabir Malhotra",
    role: "Lead Fullstack & WebGL Motion Engineer",
    tagline: "Next.js 16, GSAP Kinetic Physics, Headless OS & 99 PageSpeed",
    bio: "Obsessed with latency reduction, Core Web Vitals, and kinetic web physics. Crafts buttery sub-second e-commerce frontends, custom 3D shaders, and high-frequency booking engines.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    badge: "ENGINEERING",
    disciplines: ["TypeScript", "WebGL / Three.js", "Tailwind CSS", "Shopify Storefront API"],
    socials: {
      linkedin: "https://linkedin.com",
      email: "mailto:kabir@desimuchads.agency",
    },
  },
  {
    id: 5,
    name: "Ananya Deshmukh",
    role: "Senior Digital Illustrator & Concept Artist",
    tagline: "Procreate 5X, Cyber-Mandalas, Manga Ink Sketches & Matte Painting",
    bio: "Brings visceral Indian cultural heritage and futuristic cyberpunk aesthetics together. Creates original vector mandalas, digital anime illustrations, and keyframe concept paintings.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    badge: "ILLUSTRATION & ART",
    disciplines: ["Digital Concept Art", "Procreate 5X", "Sumi-e Ink Wash", "Vector Filigree"],
    socials: {
      linkedin: "https://linkedin.com",
      email: "mailto:ananya@desimuchads.agency",
    },
  },
  {
    id: 6,
    name: "Devendra Verma",
    role: "Director of Technical SEO & Search Arbitrage",
    tagline: "Topical Authority Clustering, Schema.org & Zero-Click Dominance",
    bio: "Has engineered #1 SERP rankings for over 1,400+ high-commercial keywords. Expert in algorithmic search intent, programmatic SEO generation, and Google Search Console optimization.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    badge: "SEARCH ARCHITECT",
    disciplines: ["Technical SEO", "SERP Clustering", "Entity Graph Schema", "Speed Optimization"],
    socials: {
      linkedin: "https://linkedin.com",
      email: "mailto:devendra@desimuchads.agency",
    },
  },
  {
    id: 7,
    name: "Rhea Sen",
    role: "Commercial Video Director & Motion Lead",
    tagline: "4K 60FPS Macro Cinematography, Color Timing & Sound Mastering",
    bio: "Directs cinematic commercial reels, food macro shoots, and festival event trailers. Specializes in DaVinci Resolve color timing, sound design, and viral social 9:16 storytelling.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    badge: "MOTION DIRECTION",
    disciplines: ["Cinematography", "DaVinci Resolve", "Sound Design", "Viral Hooks"],
    socials: {
      linkedin: "https://linkedin.com",
      email: "mailto:rhea@desimuchads.agency",
    },
  },
  {
    id: 8,
    name: "Vikramaditya Roy",
    role: "Client Success & Revenue Retention Strategist",
    tagline: "Customer LTV Multipliers, WhatsApp Automation & CRM Retention",
    bio: "Bridges the gap between raw traffic and lifelong customer loyalty. Builds automated WhatsApp conversational funnels, post-purchase delight flows, and transparent client reporting.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    badge: "GROWTH SUCCESS",
    disciplines: ["WhatsApp CRM", "Retention Funnels", "Cohort LTV", "Transparent Reporting"],
    socials: {
      linkedin: "https://linkedin.com",
      email: "mailto:vikram@desimuchads.agency",
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/20 text-white font-mono text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>THE ANTI-AI PERFORMANCE ARCHITECTURE</span>
            </div>

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

      {/* 4. The 8 Team Members & Leadership Roster (User-Specific Request) */}
      <section id="team" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-b border-white/10 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>THE DARBAR ROSTER • 8 SPECIALIZED ARCHITECTS</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-tight">
              Meet The Minds Behind The Growth.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-300 font-sans">
              No interns, no outsourced white-label farms. Every specialist on this roster is a proven craftsman in their respective discipline.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ACTIVE LEADERSHIP ROSTER</span>
          </div>
        </div>

        {/* 8 Team Member Cards Grid (2-col on mobile, 3-col on tablet, 4-col on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_ROSTER.map((member) => (
            <SpotlightCard
              key={member.id}
              spotlightColor="rgba(255, 255, 255, 0.12)"
              borderColor="rgba(255, 255, 255, 0.35)"
              className="rounded-2xl p-6 bg-[#0c0c10] flex flex-col justify-between group shadow-xl hover:shadow-2xl transition-all"
            >
              <div>
                {/* Avatar with obsidian glass bezel */}
                <div className="relative w-full h-56 rounded-xl overflow-hidden mb-5 border border-white/15 bg-black">
                  <img
                    src={member.avatar}
                    alt={`${member.name} Profile`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

                  {/* Badge */}
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white uppercase">
                    {member.badge}
                  </span>

                  {/* Name overlay on bottom */}
                  <div className="absolute bottom-2.5 inset-x-3 text-left">
                    <h3 className="font-display font-black text-lg text-white uppercase tracking-tight leading-tight">
                      {member.name}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold block mt-0.5">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs font-mono text-zinc-400 leading-snug mb-3">
                  {member.tagline}
                </p>

                {/* Bio */}
                <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-4">
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
                      title="Direct Email"
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
