"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, MessageCircle, PhoneCall } from "lucide-react";
import { sound } from "@/lib/sound";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";

interface DetailHeaderStrategyCtaProps {
  label?: string;
  defaultService?: string;
}

/**
 * Header CTA trigger for Service and Case Study detail pages.
 * Launches the interactive Growth Audit Wizard directly on-page instead of redirecting off-site.
 */
export function DetailHeaderStrategyCta({
  label = "Free Audit",
  defaultService,
}: DetailHeaderStrategyCtaProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          sound.playChime();
          setIsOpen(true);
        }}
        className="px-4 py-2 min-h-[40px] rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
      >
        <PhoneCall className="w-3 h-3 shrink-0" />
        <span>{label}</span>
      </button>

      <BrandKundliModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultService={defaultService}
      />
    </>
  );
}

interface ServiceHeroAuditActionsProps {
  serviceTitle: string;
}

/**
 * Interactive Audit + Booking + Portfolio action bar for /services/[slug] hero banner.
 */
export function ServiceHeroAuditActions({
  serviceTitle,
}: ServiceHeroAuditActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => {
            sound.playChime();
            setIsOpen(true);
          }}
          className="btn-luxury-shine px-7 sm:px-8 py-4 min-h-[48px] rounded-xl bg-white hover:bg-zinc-200 text-black font-display text-xs sm:text-sm font-black tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-95 inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>CLAIM FREE STRATEGY AUDIT</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <Link
          href="/contact#session"
          onClick={() => sound.playPluck(155)}
          className="px-6 py-4 min-h-[48px] rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all border border-white/15 inline-flex items-center justify-center gap-2"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Strategy Call</span>
        </Link>

        <Link
          href="/work"
          className="px-6 py-4 min-h-[48px] rounded-xl bg-white/[0.04] hover:bg-white/10 text-zinc-300 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all border border-white/10 inline-flex items-center justify-center"
        >
          Explore Portfolio
        </Link>
      </div>

      <BrandKundliModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultService={serviceTitle}
      />
    </>
  );
}

interface ServiceBottomAuditActionsProps {
  serviceTitle: string;
}

/**
 * Interactive Bottom Callout CTAs for /services/[slug] with direct Audit Modal, /contact scheduler, and WhatsApp.
 */
export function ServiceBottomAuditActions({
  serviceTitle,
}: ServiceBottomAuditActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/919180252831?text=${encodeURIComponent(
    `Hello Desi Muchads! We want to scale our brand with ${serviceTitle}. Let's schedule a Strategy Session.`
  )}`;

  return (
    <>
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2">
        <button
          type="button"
          onClick={() => {
            sound.playChime();
            setIsOpen(true);
          }}
          className="px-8 py-4 min-h-[48px] rounded-xl bg-black hover:bg-zinc-800 text-white font-display text-xs font-black tracking-widest uppercase transition-all cursor-pointer active:scale-95 inline-flex items-center justify-center gap-2"
        >
          <span>LAUNCH FREE GROWTH AUDIT</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <Link
          href="/contact#session"
          onClick={() => sound.playPluck(155)}
          className="px-7 py-4 min-h-[48px] rounded-xl bg-zinc-900/10 hover:bg-zinc-900/20 text-black border border-black/20 font-mono text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book IST Strategy Slot</span>
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-4 min-h-[48px] rounded-xl bg-zinc-200 hover:bg-zinc-300 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp Direct</span>
        </a>
      </div>

      <BrandKundliModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultService={serviceTitle}
      />
    </>
  );
}
