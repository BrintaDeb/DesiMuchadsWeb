"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  Plus,
  Calendar,
  MessageCircle,
  ArrowRight,
  Rocket,
  Share2,
  Code2,
  Crown,
  Sparkles,
} from "lucide-react";
import { SectionDivider } from "@/components/common/SectionDivider";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { AGENCY_WHATSAPP_NUMBER } from "@/context/AgencyProposalContext";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import {
  QUOTE_SERVICE_TRACKS,
  QuoteServiceId,
} from "@/data/pricingData";

interface PricingSectionProps {
  onOpenKundli: () => void;
  variant?: "home" | "full";
}

const TRACK_ICONS: Record<
  QuoteServiceId,
  React.ComponentType<{ className?: string }>
> = {
  "meta-google-ads": Rocket,
  "social-media-management": Share2,
  "website-development": Code2,
  branding: Crown,
};

/**
 * Custom Quote & Strategy Session Section (Zero Tier Pricing).
 * Allows visitors to pick their desired service tracks (Meta & Google Ads,
 * Social Media Management, Website Development, Branding) and jump directly
 * to a custom WhatsApp quotation or Book Strategy Session calendar.
 */
export function PricingSection({
  onOpenKundli,
  variant = "home",
}: PricingSectionProps) {
  const isHome = variant === "home";
  const [selectedTracks, setSelectedTracks] = useState<QuoteServiceId[]>([
    "meta-google-ads",
    "website-development",
  ]);
  const [brandNote, setBrandNote] = useState("");

  const toggleTrack = (id: QuoteServiceId) => {
    haptics.selection();
    sound.playPluck(155);
    setSelectedTracks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedTrackObjs = QUOTE_SERVICE_TRACKS.filter((t) =>
    selectedTracks.includes(t.id)
  );

  const quoteWhatsAppUrl = (() => {
    const scopeLines =
      selectedTrackObjs.length > 0
        ? selectedTrackObjs.map((t, i) => `${i + 1}. ${t.title}`).join("\n")
        : "Custom Full-Stack Brand Growth Scope";
    const msg =
      `Hello Desi Muchads!\n\n` +
      `I would like to request a custom quote for:\n` +
      `${scopeLines}\n` +
      (brandNote.trim() ? `\nBrand / URL / Notes: ${brandNote.trim()}\n` : "") +
      `\nLet's discuss scope and timelines on a Strategy Session!`;
    return `https://wa.me/${AGENCY_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  })();

  const handleQuoteDispatch = () => {
    haptics.success();
    sound.playChime();
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "request_quote_section",
        name: "Custom Quote Visitor",
        service:
          selectedTrackObjs.map((t) => t.title).join(", ") || "Custom Scope",
        message: brandNote.trim() || "Requested custom quote via homepage",
      }),
    }).catch(() => { });
  };

  return (
    <section
      id="request-quote"
      aria-label="Request Custom Quote and Book Strategy Session"
      className={`relative bg-transparent text-white overflow-hidden scroll-mt-24 ${isHome ? "py-20 sm:py-28 border-t border-white/10" : "py-12 sm:py-16"
        }`}
    >
      {/* Subtle Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 -right-32 w-[460px] h-[460px] rounded-full bg-[#D4AF37]/[0.05] blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-32 w-[460px] h-[460px] rounded-full bg-white/[0.03] blur-[140px]" />

      {isHome && <SectionDivider />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-[1.06]">
            Request Quote.{" "}
            <span className="text-zinc-400">Book A Strategy Session.</span>
          </h2>
          <p className="mt-4 text-zinc-300 text-sm sm:text-base font-sans leading-relaxed">
            Every brand operates at a different velocity. Select the disciplines you want to deploy—Meta &amp; Google Ads, Social Media Management, Website Development, or Branding—and get a bespoke proposal directly from our founding principals.
          </p>
        </div>

        {/* Selectable Discipline Scope Cards (Zero Prices / Zero Tiers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-8">
          {QUOTE_SERVICE_TRACKS.map((track) => {
            const Icon = TRACK_ICONS[track.id];
            const isSelected = selectedTracks.includes(track.id);
            return (
              <SpotlightCard
                key={track.id}
                spotlightColor={
                  isSelected
                    ? "rgba(16, 185, 129, 0.14)"
                    : "rgba(255, 255, 255, 0.06)"
                }
                borderColor={
                  isSelected
                    ? "rgba(255, 255, 255, 0.55)"
                    : "rgba(255, 255, 255, 0.14)"
                }
                maxTilt={2}
                className={`rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 text-left ${isSelected
                  ? "bg-[#131418] border-2 border-white/70 shadow-[0_12px_36px_rgba(0,0,0,0.65)]"
                  : "bg-[#0d0d11] border border-white/12 hover:border-white/30"
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#F3E5AB]" />
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleTrack(track.id)}
                      aria-pressed={isSelected}
                      className={`px-3 py-1.5 min-h-[34px] rounded-full font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer ${isSelected
                        ? "bg-white text-black font-black"
                        : "bg-white/[0.06] text-zinc-200 border border-white/15 hover:bg-white/15"
                        }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Included</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>Add Scope</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleTrack(track.id)}
                    className="w-full text-left cursor-pointer focus:outline-none"
                  >
                    <h3 className="font-display font-black text-xl text-white uppercase tracking-tight leading-snug">
                      {track.title}
                    </h3>
                  </button>

                  <ul className="mt-4 space-y-2 mb-5">
                    {track.deliverables.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-zinc-200 font-sans leading-snug"
                      >
                        <Check className="w-3.5 h-3.5 text-[#F3E5AB] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/services/${track.serviceSlug}`}
                    className="font-mono text-[11px] font-bold text-zinc-300 hover:text-white uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
                  >
                    <span>What We Do</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                    Custom Quote
                  </span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Unified Action Console: Direct Quote & Book Strategy Session */}
        <div className="rounded-3xl p-5 sm:p-8 bg-[#0b0b0e] border border-white/15 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-3 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/12 border border-[#D4AF37]/35 font-mono text-[11px] font-bold uppercase tracking-wider text-[#F3E5AB] tabular-nums">
                  {selectedTrackObjs.length}{" "}
                  {selectedTrackObjs.length === 1 ? "Service" : "Services"} Selected
                </span>
                <span className="font-mono text-[11px] text-zinc-300 uppercase">
                  Direct Founder Consultation · Zero Lock-In
                </span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Get Your Custom Execution Quote
              </h3>

              <input
                type="text"
                aria-label="Your website URL or brief goal (optional)"
                value={brandNote}
                onChange={(e) => setBrandNote(e.target.value)}
                placeholder="Optional: Paste your website / store URL or target goal..."
                className="w-full px-4 py-3 rounded-xl bg-[#141418] border border-white/15 focus:border-white/50 text-xs sm:text-sm font-mono text-white placeholder-zinc-400 outline-none transition-colors"
              />
            </div>

            <div className="lg:col-span-6 flex flex-col sm:flex-row lg:flex-wrap items-stretch sm:items-center lg:justify-end gap-3">
              <a
                href={quoteWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleQuoteDispatch}
                className="px-6 py-3.5 min-h-[48px] rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(255,255,255,0.22)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Request Quote on WhatsApp ↗</span>
              </a>

              <Link
                href="/contact#session"
                onClick={() => {
                  haptics.selection();
                  sound.playPluck(165);
                }}
                className="px-6 py-3.5 min-h-[48px] rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 shrink-0 text-[#F3E5AB]" />
                <span>Book Strategy Session</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  haptics.light();
                  sound.playChime();
                  onOpenKundli();
                }}
                className="px-5 py-3.5 min-h-[48px] rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/15 text-zinc-200 hover:text-white font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F3E5AB] shrink-0" />
                <span>Growth Audit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
