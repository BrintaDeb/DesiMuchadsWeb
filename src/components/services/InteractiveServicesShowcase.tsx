"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Share2,
  ShoppingBag,
  Zap,
  Code2,
  Package,
  Crown,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  Wrench,
  Shuffle,
  Play,
  Pause,
  MessageCircle,
  Calendar,
  Layers,
  GitBranch,
  X,
} from "lucide-react";
import { ServiceItem } from "@/data/servicesData";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { AGENCY_WHATSAPP_NUMBER } from "@/context/AgencyProposalContext";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

interface InteractiveServicesShowcaseProps {
  services: ServiceItem[];
  onOpenKundli: () => void;
}

const CATEGORY_TABS = [
  { id: "all", label: "All Services" },
  { id: "paid", label: "Ads & Social" },
  { id: "commerce", label: "Web & Commerce" },
  { id: "brand", label: "Branding & Packaging" },
] as const;

/**
 * Bespoke architectural vector emblem rendered subtly inside the active service card.
 */
function ServiceCreativeCanvas({ id }: { id: string }) {
  switch (id) {
    case "meta-google-ads":
      return (
        <svg viewBox="0 0 220 220" className="w-full h-full" fill="none" aria-hidden="true">
          <circle cx="110" cy="110" r="88" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="110" cy="110" r="62" stroke="rgba(212,175,55,0.28)" strokeWidth="1.2" />
          <circle cx="110" cy="110" r="36" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          <line x1="110" y1="12" x2="110" y2="208" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="12" y1="110" x2="208" y2="110" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <path d="M55 150 L95 108 L128 124 L172 64" stroke="#F3E5AB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="172" cy="64" r="5" fill="#F3E5AB" />
        </svg>
      );
    case "social-media":
      return (
        <svg viewBox="0 0 220 220" className="w-full h-full" fill="none" aria-hidden="true">
          <rect x="46" y="24" width="128" height="172" rx="22" stroke="rgba(255,255,255,0.16)" strokeWidth="1.2" />
          <rect x="64" y="42" width="92" height="136" rx="14" stroke="rgba(212,175,55,0.26)" strokeWidth="1" strokeDasharray="5 5" />
          <polygon points="98,88 134,110 98,132" stroke="#FFFFFF" strokeWidth="2" fill="rgba(255,255,255,0.08)" strokeLinejoin="round" />
          <path d="M22 86 Q34 110 22 134 M198 86 Q186 110 198 134" stroke="rgba(212,175,55,0.45)" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "web-development":
      return (
        <svg viewBox="0 0 220 220" className="w-full h-full" fill="none" aria-hidden="true">
          <rect x="24" y="44" width="172" height="132" rx="14" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
          <line x1="24" y1="72" x2="196" y2="72" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <circle cx="44" cy="58" r="3.5" fill="rgba(255,255,255,0.35)" />
          <circle cx="58" cy="58" r="3.5" fill="rgba(212,175,55,0.55)" />
          <circle cx="72" cy="58" r="3.5" fill="rgba(255,255,255,0.25)" />
          <path d="M84 104 L62 124 L84 144 M136 104 L158 124 L136 144 M118 98 L102 150" stroke="#F3E5AB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "branding":
      return (
        <svg viewBox="0 0 220 220" className="w-full h-full" fill="none" aria-hidden="true">
          <circle cx="110" cy="110" r="82" stroke="rgba(212,175,55,0.28)" strokeWidth="1" />
          <rect x="52" y="52" width="116" height="116" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />
          <rect x="68" y="68" width="84" height="84" transform="rotate(45 110 110)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <path d="M68 134 L60 76 L92 100 L110 66 L128 100 L160 76 L152 134 Z" stroke="#F3E5AB" strokeWidth="2" fill="rgba(212,175,55,0.08)" strokeLinejoin="round" />
          <line x1="72" y1="146" x2="148" y2="146" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "ecommerce-services":
      return (
        <svg viewBox="0 0 220 220" className="w-full h-full" fill="none" aria-hidden="true">
          <path d="M52 78 H168 L156 176 H64 L52 78 Z" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" strokeLinejoin="round" />
          <path d="M84 78 V62 C84 47 95 36 110 36 C125 36 136 47 136 62 V78" stroke="#F3E5AB" strokeWidth="2" strokeLinecap="round" />
          <path d="M88 126 L104 142 L136 108" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "quick-commerce":
      return (
        <svg viewBox="0 0 220 220" className="w-full h-full" fill="none" aria-hidden="true">
          <circle cx="110" cy="110" r="84" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="110" cy="110" r="56" stroke="rgba(212,175,55,0.3)" strokeWidth="1.2" />
          <polygon points="122,46 72,118 108,118 96,174 148,100 112,100" stroke="#F3E5AB" strokeWidth="2" fill="rgba(212,175,55,0.1)" strokeLinejoin="round" />
        </svg>
      );
    default: // packaging-label
      return (
        <svg viewBox="0 0 220 220" className="w-full h-full" fill="none" aria-hidden="true">
          <path d="M110 34 L176 70 V148 L110 186 L44 148 V70 L110 34 Z" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M44 70 L110 106 L176 70 M110 106 V186" stroke="#F3E5AB" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M76 52 L142 88" stroke="rgba(255,255,255,0.28)" strokeWidth="1.2" strokeDasharray="4 4" />
        </svg>
      );
  }
}

export function InteractiveServicesShowcase({
  services,
  onOpenKundli,
}: InteractiveServicesShowcaseProps) {
  const [category, setCategory] = useState<(typeof CATEGORY_TABS)[number]["id"]>("all");
  const [selectedSlug, setSelectedSlug] = useState<string>(services[0]?.slug || "");
  const [panelTab, setPanelTab] = useState<"scope" | "workflow">("scope");
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [autoCycle, setAutoCycle] = useState<boolean>(false);
  const [pinnedItems, setPinnedItems] = useState<
    Record<string, { slug: string; serviceTitle: string; label: string }>
  >({});

  const filtered = useMemo(() => {
    if (category === "all") return services;
    if (category === "paid") {
      return services.filter((s) =>
        ["meta-google-ads", "social-media"].includes(s.id)
      );
    }
    if (category === "commerce") {
      return services.filter((s) =>
        ["ecommerce-services", "quick-commerce", "web-development"].includes(s.id)
      );
    }
    return services.filter((s) => ["branding", "packaging-label"].includes(s.id));
  }, [category, services]);

  const activeService = useMemo(() => {
    return filtered.find((s) => s.slug === selectedSlug) || filtered[0] || services[0];
  }, [filtered, selectedSlug, services]);

  useEffect(() => {
    if (!autoCycle || filtered.length <= 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = setInterval(() => {
      setSelectedSlug((curr) => {
        const idx = filtered.findIndex((s) => s.slug === curr);
        const nextIdx = (idx + 1) % filtered.length;
        return filtered[nextIdx]?.slug || curr;
      });
    }, 3600);
    return () => clearInterval(timer);
  }, [autoCycle, filtered]);

  const getIcon = (iconName: string, sizeClass = "w-5 h-5") => {
    const cls = `${sizeClass} shrink-0`;
    switch (iconName) {
      case "Crown":
        return <Crown className={cls} />;
      case "Rocket":
        return <Rocket className={cls} />;
      case "Share2":
        return <Share2 className={cls} />;
      case "ShoppingBag":
        return <ShoppingBag className={cls} />;
      case "Zap":
        return <Zap className={cls} />;
      case "Code2":
        return <Code2 className={cls} />;
      case "Package":
        return <Package className={cls} />;
      default:
        return <Sparkles className={cls} />;
    }
  };

  if (!activeService) return null;

  const activeIdx = Math.max(
    0,
    filtered.findIndex((s) => s.slug === activeService.slug)
  );

  // Pure actionable "What We Do" lines — zero explanatory sentences
  const whatWeDoItems = [
    ...activeService.specs.deliverables,
    ...activeService.framework.slice(0, 2).map((f) => f.title),
  ];

  const toggleActionPin = (key: string, label: string) => {
    sound.playTick();
    haptics.selection();
    setAutoCycle(false);
    setPinnedItems((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = {
          slug: activeService.slug,
          serviceTitle: activeService.title,
          label,
        };
      }
      return next;
    });
  };

  const handleSelectService = (slug: string, idx: number) => {
    sound.playPluck(140 + idx * 12);
    haptics.selection();
    setSelectedSlug(slug);
    setActiveStepIdx(0);
    setHoveredTool(null);
  };

  const handleShuffle = () => {
    if (filtered.length <= 1) return;
    sound.playChime();
    haptics.medium();
    setAutoCycle(false);
    const others = filtered.filter((s) => s.slug !== activeService.slug);
    const pick = others[Math.floor(Math.random() * others.length)];
    if (pick) {
      setSelectedSlug(pick.slug);
      setActiveStepIdx(0);
    }
  };

  const pinnedList = Object.entries(pinnedItems);

  const pinnedCountBySlug = (slug: string) =>
    pinnedList.filter(([, v]) => v.slug === slug).length;

  const pinnedWhatsAppUrl = (() => {
    if (pinnedList.length === 0) return "";
    const grouped: Record<string, string[]> = {};
    for (const [, val] of pinnedList) {
      if (!grouped[val.serviceTitle]) grouped[val.serviceTitle] = [];
      grouped[val.serviceTitle].push(val.label);
    }
    const lines = Object.entries(grouped)
      .map(
        ([srv, items]) =>
          `*${srv}*\n${items.map((i) => `  • ${i}`).join("\n")}`
      )
      .join("\n\n");
    const msg =
      `Hello Desi Muchads!\n\n` +
      `I built a custom scope on your website (${pinnedList.length} selected items):\n\n` +
      `${lines}\n\n` +
      `Let's request a custom quote and schedule our Strategy Session!`;
    return `https://wa.me/${AGENCY_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  })();

  return (
    <div className="w-full space-y-6">
      {/* Top Interactive Controls: Category Filter Pills + Auto-Tour & Shuffle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Filter agency service categories"
          className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none"
        >
          {CATEGORY_TABS.map((tab) => {
            const isTabActive = category === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isTabActive}
                type="button"
                onClick={() => {
                  sound.playPluck(150);
                  haptics.selection();
                  setAutoCycle(false);
                  setCategory(tab.id);
                }}
                className={`px-4 py-2 min-h-[40px] rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 cursor-pointer border ${isTabActive
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "bg-[#111114] text-zinc-300 border-white/15 hover:border-white/40 hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              sound.playPluck(165);
              haptics.selection();
              setAutoCycle((prev) => !prev);
            }}
            aria-pressed={autoCycle}
            className={`px-3.5 py-2 min-h-[38px] rounded-full border font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${autoCycle
              ? "bg-[#D4AF37]/20 border-[#D4AF37]/60 text-[#F3E5AB]"
              : "bg-[#111114] border-white/15 text-zinc-300 hover:border-white/35 hover:text-white"
              }`}
          >
            {autoCycle ? (
              <Pause className="w-3 h-3" />
            ) : (
              <Play className="w-3 h-3" />
            )}
            <span>{autoCycle ? "Cycling" : "Auto-Tour"}</span>
          </button>

          <button
            type="button"
            onClick={handleShuffle}
            className="px-3.5 py-2 min-h-[38px] rounded-full bg-[#111114] hover:bg-white hover:text-black border border-white/15 text-zinc-200 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            title="Discover another capability"
          >
            <Shuffle className="w-3 h-3" />
            <span>Explore Random</span>
          </button>
        </div>
      </div>

      {/* Master-Detail Creative Services Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Interactive Selector Cards */}
        <div
          role="listbox"
          aria-label="Select a service to view what we do"
          className="lg:col-span-5 flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none"
        >
          {filtered.map((srv, idx) => {
            const isSelected = srv.slug === activeService.slug;
            const pinnedHere = pinnedCountBySlug(srv.slug);
            return (
              <button
                key={srv.id}
                role="option"
                aria-selected={isSelected}
                type="button"
                onClick={() => {
                  setAutoCycle(false);
                  handleSelectService(srv.slug, idx);
                }}
                onMouseEnter={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.innerWidth >= 1024 &&
                    srv.slug !== activeService.slug
                  ) {
                    setAutoCycle(false);
                    handleSelectService(srv.slug, idx);
                  }
                }}
                className={`group relative text-left rounded-2xl px-4 py-3.5 min-h-[56px] border transition-all duration-300 flex items-center justify-between gap-3 shrink-0 lg:shrink cursor-pointer overflow-hidden ${isSelected
                  ? "bg-white text-black border-white shadow-[0_10px_32px_rgba(255,255,255,0.18)] lg:translate-x-1"
                  : "bg-[#0d0d10] text-zinc-200 border-white/12 hover:border-white/35 hover:bg-[#141418] hover:text-white"
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0 relative z-10">
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${isSelected
                      ? "bg-black text-[#F3E5AB]"
                      : "bg-white/10 text-zinc-300"
                      }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${isSelected
                      ? "bg-black/10 text-black"
                      : "bg-white/[0.05] text-white"
                      }`}
                  >
                    {getIcon(srv.iconName, "w-4 h-4")}
                  </span>
                  <span className="font-display font-black text-xs sm:text-sm uppercase tracking-tight whitespace-nowrap lg:whitespace-normal truncate">
                    {srv.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0 relative z-10">
                  {pinnedHere > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-black uppercase tabular-nums ${isSelected
                        ? "bg-black text-[#F3E5AB]"
                        : "bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/35"
                        }`}
                    >
                      {pinnedHere} pinned
                    </span>
                  )}
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 hidden lg:block transition-transform duration-200 ${isSelected
                      ? "text-black translate-x-0.5"
                      : "text-zinc-400 group-hover:text-white group-hover:translate-x-0.5"
                      }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Creative Interactive Blueprint Stage */}
        <div className="lg:col-span-7 flex">
          <SpotlightCard
            key={activeService.slug}
            spotlightColor="rgba(212, 175, 55, 0.14)"
            borderColor="rgba(255, 255, 255, 0.25)"
            maxTilt={2}
            className="w-full rounded-3xl p-5 sm:p-8 bg-[#0b0b0e] border border-white/15 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Architectural Vector Graphic Unique to Each Service */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -right-10 w-60 h-60 sm:w-72 sm:h-72 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.09)_0%,transparent_70%)] blur-xl"
            />
            <div className="pointer-events-none absolute -top-6 -right-6 w-52 h-52 sm:w-64 sm:h-64 opacity-50 transition-transform duration-500 ease-out">
              <ServiceCreativeCanvas id={activeService.id} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 relative z-10"
              >
                {/* Top Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/12">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/15 to-white/[0.03] border border-white/25 flex items-center justify-center text-white shrink-0 shadow-inner">
                      {getIcon(activeService.iconName, "w-6 h-6")}
                    </div>
                    <div className="min-w-0 text-left">
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-[#F3E5AB] block">
                        0{activeIdx + 1} / 0{filtered.length} · WHAT WE DO
                      </span>
                      <h3 className="font-display font-black text-xl sm:text-3xl text-white uppercase tracking-tight truncate">
                        {activeService.title}
                      </h3>
                    </div>
                  </div>

                  {/* Interactive Panel Mode Toggle: Pin Scope vs 5-Step Flow */}
                  <div className="inline-flex items-center p-1 rounded-xl bg-black/60 border border-white/15 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPluck(155);
                        setPanelTab("scope");
                      }}
                      className={`px-3 py-1.5 rounded-lg font-mono text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${panelTab === "scope"
                        ? "bg-white text-black shadow"
                        : "text-zinc-300 hover:text-white"
                        }`}
                    >
                      <Layers className="w-3 h-3" />
                      <span>Scope</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPluck(175);
                        setPanelTab("workflow");
                      }}
                      className={`px-3 py-1.5 rounded-lg font-mono text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${panelTab === "workflow"
                        ? "bg-white text-black shadow"
                        : "text-zinc-300 hover:text-white"
                        }`}
                    >
                      <GitBranch className="w-3 h-3" />
                      <span>Sprint Flow</span>
                    </button>
                  </div>
                </div>

                {/* MODE A: Interactive "What We Do" Scope Pinning Matrix */}
                {panelTab === "scope" ? (
                  <div className="space-y-3 text-left">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-zinc-300">
                        CLICK DELIVERABLES TO BUILD YOUR CUSTOM SCOPE
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          sound.playPluck(185);
                          haptics.selection();
                          const allPinnedHere = whatWeDoItems.every(
                            (_, i) => pinnedItems[`${activeService.slug}-${i}`]
                          );
                          setPinnedItems((prev) => {
                            const next = { ...prev };
                            whatWeDoItems.forEach((label, i) => {
                              const k = `${activeService.slug}-${i}`;
                              if (allPinnedHere) {
                                delete next[k];
                              } else {
                                next[k] = {
                                  slug: activeService.slug,
                                  serviceTitle: activeService.title,
                                  label,
                                };
                              }
                            });
                            return next;
                          });
                        }}
                        className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#F3E5AB] hover:text-white underline underline-offset-4 cursor-pointer"
                      >
                        {whatWeDoItems.every(
                          (_, i) => pinnedItems[`${activeService.slug}-${i}`]
                        )
                          ? "Unpin All Here"
                          : "Pin Full Service Scope"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {whatWeDoItems.map((action, aIdx) => {
                        const pinKey = `${activeService.slug}-${aIdx}`;
                        const isPinned = !!pinnedItems[pinKey];
                        return (
                          <button
                            key={pinKey}
                            type="button"
                            onClick={() => toggleActionPin(pinKey, action)}
                            className={`group/pin text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-start gap-2.5 cursor-pointer min-h-[60px] active:scale-[0.98] ${isPinned
                              ? "bg-white text-black border-white shadow-[0_8px_24px_rgba(255,255,255,0.16)]"
                              : "bg-white/[0.03] border-white/12 hover:border-white/35 hover:bg-white/[0.07] text-zinc-200"
                              }`}
                          >
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 mt-0.5 transition-transform group-hover/pin:scale-110 ${isPinned ? "text-black" : "text-[#F3E5AB]"
                                }`}
                            />
                            <span className="font-sans text-xs sm:text-[13px] font-semibold leading-snug">
                              {action}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* MODE B: Interactive 5-Stage Sprint Flow Timeline (Zero Prose) */
                  <div className="space-y-4 text-left">
                    <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-zinc-300 block">
                      INTERACTIVE EXECUTION PIPELINE · TAP STAGE TO INSPECT
                    </span>

                    <div className="grid grid-cols-5 gap-2">
                      {activeService.framework.map((step, sIdx) => {
                        const isActiveStep = sIdx === activeStepIdx;
                        const isPassed = sIdx <= activeStepIdx;
                        return (
                          <button
                            key={step.step}
                            type="button"
                            onClick={() => {
                              sound.playPluck(150 + sIdx * 15);
                              haptics.selection();
                              setActiveStepIdx(sIdx);
                            }}
                            onMouseEnter={() => setActiveStepIdx(sIdx)}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${isActiveStep
                              ? "bg-white text-black border-white shadow-lg scale-[1.03]"
                              : isPassed
                                ? "bg-[#D4AF37]/15 border-[#D4AF37]/40 text-white"
                                : "bg-white/[0.03] border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
                              }`}
                          >
                            <span className="font-mono text-xs font-black block">
                              {step.step}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/15 flex items-center justify-between gap-4">
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#F3E5AB] block mb-1">
                          STAGE {activeService.framework[activeStepIdx]?.step} OF 0
                          {activeService.framework.length}
                        </span>
                        <h4 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tight">
                          {activeService.framework[activeStepIdx]?.title}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const item = activeService.framework[activeStepIdx];
                          if (item) {
                            toggleActionPin(
                              `${activeService.slug}-stage-${item.step}`,
                              item.title
                            );
                          }
                        }}
                        className="px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-mono text-[11px] font-bold uppercase tracking-wider shrink-0 cursor-pointer"
                      >
                        {pinnedItems[
                          `${activeService.slug}-stage-${activeService.framework[activeStepIdx]?.step}`
                        ]
                          ? "Pinned ✓"
                          : "+ Pin Stage"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Interactive Execution Tool Stack */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-left">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-300 mr-1">
                    <Wrench className="w-3 h-3 text-[#F3E5AB]" />
                    <span>STACK:</span>
                  </span>
                  {activeService.specs.tools.map((tool) => {
                    const isToolHot = hoveredTool === tool;
                    return (
                      <button
                        key={tool}
                        type="button"
                        onMouseEnter={() => {
                          sound.playTick();
                          setHoveredTool(tool);
                        }}
                        onMouseLeave={() => setHoveredTool(null)}
                        onClick={() => {
                          sound.playPluck(190);
                          setHoveredTool(isToolHot ? null : tool);
                        }}
                        className={`px-2.5 py-1 rounded-md border font-mono text-[10.5px] transition-all cursor-pointer ${isToolHot
                          ? "bg-white text-black border-white font-bold scale-105"
                          : "bg-white/[0.05] border-white/12 text-zinc-200 hover:border-white/35"
                          }`}
                      >
                        {tool}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Interactive Action Dock */}
            <div className="pt-5 border-t border-white/12 space-y-3 relative z-10">
              {pinnedList.length > 0 && (
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/15 flex flex-wrap items-center justify-between gap-2 text-left">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#F3E5AB] mr-1">
                      CUSTOM BRIEF ({pinnedList.length}):
                    </span>
                    {pinnedList.slice(0, 3).map(([k, val]) => (
                      <span
                        key={k}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-white max-w-[180px]"
                      >
                        <span className="truncate">{val.label}</span>
                        <button
                          type="button"
                          aria-label={`Remove ${val.label}`}
                          onClick={() => toggleActionPin(k, val.label)}
                          className="hover:text-[#F3E5AB] cursor-pointer"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    ))}
                    {pinnedList.length > 3 && (
                      <span className="font-mono text-[10px] text-zinc-400">
                        +{pinnedList.length - 3} more
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playPluck(130);
                      setPinnedItems({});
                    }}
                    className="font-mono text-[10px] text-zinc-400 hover:text-white underline cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-2.5">
                {pinnedList.length > 0 ? (
                  <a
                    href={pinnedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      sound.playChime();
                      haptics.success();
                    }}
                    className="px-5 py-3 min-h-[44px] rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-black text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(255,255,255,0.2)]"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>Request Quote ({pinnedList.length} Pinned) ↗</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playChime();
                      haptics.medium();
                      onOpenKundli();
                    }}
                    className="px-5 py-3 min-h-[44px] rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-black text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Start {activeService.title.split(" ")[0]} Audit</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <Link
                    href="/contact#session"
                    onClick={() => {
                      sound.playPluck(165);
                      haptics.selection();
                    }}
                    className="flex-1 sm:flex-initial px-4 py-3 min-h-[44px] rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#F3E5AB]" />
                    <span>Book Call</span>
                  </Link>

                  <Link
                    href={`/services/${activeService.slug}`}
                    className="flex-1 sm:flex-initial px-4 py-3 min-h-[44px] rounded-xl bg-white/[0.04] hover:bg-white/[0.12] border border-white/15 text-zinc-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Full Sheet</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
