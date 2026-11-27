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
} from "lucide-react";
import { SectionDivider } from "@/components/common/SectionDivider";
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
      className={`relative bg-transparent text-white overflow-hidden scroll-mt-24 ${isHome ? "py-14 sm:py-24 lg:py-28 border-t border-white/10" : "py-12 sm:py-16"
        }`}
    >
      {/* Subtle Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 -right-32 w-[460px] h-[460px] rounded-full bg-[#D4AF37]/[0.05] blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-32 w-[460px] h-[460px] rounded-full bg-white/[0.03] blur-[140px]" />

      {isHome && <SectionDivider />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white uppercase tracking-tight leading-[1.06]">
            Custom Scope.{" "}
            <span className="text-zinc-500">Tailored Execution.</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-xs sm:text-sm font-sans font-light">
            Select your tracks below for a direct custom proposal.
          </p>
        </div>

        {/* Selectable Minimal Discipline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
          {QUOTE_SERVICE_TRACKS.map((track) => {
            const Icon = TRACK_ICONS[track.id];
            const isSelected = selectedTracks.includes(track.id);
            return (
              <div
                key={track.id}
                className={`rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 text-left border ${isSelected
                  ? "bg-white/[0.04] border-white/30"
                  : "bg-white/[0.015] border-white/[0.07] hover:border-white/15"
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#F3E5AB]/85" />
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleTrack(track.id)}
                      aria-pressed={isSelected}
                      className={`px-3 py-1.5 min-h-[34px] rounded-full font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer touch-manipulation ${isSelected
                        ? "bg-white text-black font-semibold"
                        : "bg-transparent text-zinc-400 border border-white/10 hover:border-white/25 hover:text-white"
                        }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3 h-3 stroke-[2.5]" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleTrack(track.id)}
                    className="w-full text-left cursor-pointer focus:outline-none"
                  >
                    <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight leading-snug">
                      {track.title}
                    </h3>
                  </button>

                  <p className="mt-1 font-mono text-[10.5px] text-zinc-500">
                    {track.highlightSummary}
                  </p>

                  <ul className="mt-4 space-y-1.5 mb-5">
                    {track.deliverables.slice(0, 2).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-zinc-300/90 font-sans font-light leading-snug"
                      >
                        <Check className="w-3 h-3 text-[#F3E5AB]/70 shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <Link
                    href={`/services/${track.serviceSlug}`}
                    className="font-mono text-[10.5px] text-zinc-400 hover:text-white uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Action Bar */}
        <div className="rounded-2xl p-5 sm:p-6 bg-white/[0.015] border border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            <div className="lg:col-span-6 space-y-2.5 text-left">
              <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 tabular-nums">
                <span className="text-[#F3E5AB]">
                  {selectedTrackObjs.length} selected
                </span>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => {
                    haptics.light();
                    sound.playChime();
                    onOpenKundli();
                  }}
                  className="text-zinc-400 hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
                >
                  Free Audit
                </button>
              </div>

              <input
                type="text"
                aria-label="Your website URL or brief goal (optional)"
                value={brandNote}
                onChange={(e) => setBrandNote(e.target.value)}
                placeholder="Website URL or target goal (optional)..."
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/35 text-xs sm:text-sm font-mono text-white placeholder-zinc-500 outline-none transition-colors"
              />
            </div>

            <div className="lg:col-span-6 flex flex-col sm:flex-row lg:flex-wrap items-stretch sm:items-center lg:justify-end gap-2.5">
              <a
                href={quoteWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleQuoteDispatch}
                className="px-5 py-3 min-h-[44px] rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-bold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp Quote ↗</span>
              </a>

              <Link
                href="/contact#session"
                onClick={() => {
                  haptics.selection();
                  sound.playPluck(165);
                }}
                className="px-5 py-3 min-h-[44px] rounded-xl bg-transparent hover:bg-white/[0.06] border border-white/15 text-zinc-200 hover:text-white font-mono text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0 text-[#F3E5AB]" />
                <span>Book Session</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
