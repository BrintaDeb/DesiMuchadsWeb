"use client";

import React, { useState, useEffect, useRef } from "react";
import { useProposal } from "@/context/AgencyProposalContext";
import { MessageCircle, PhoneCall, ChevronUp, ChevronDown } from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

/**
 * Compact Bottom-Middle Floating Dock.
 * Stays minimized into an unobtrusive micro-pill while scrolling upper/middle sections,
 * and activates into its full compact CTA state only when the visitor reaches the last section (`#footer`).
 */
export function ProposalFloatingBar() {
  const { proposal, generateWhatsAppPayload } = useProposal();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOnLastSection, setIsOnLastSection] = useState(false);
  const [manualExpanded, setManualExpanded] = useState(false);
  const expandedScrollYRef = useRef<number>(0);

  useEffect(() => {
    const handleDrawer = (e: Event) => {
      const customEvent = e as CustomEvent<{ open?: boolean }>;
      setIsDrawerOpen(!!customEvent.detail?.open);
    };
    window.addEventListener("dm_mobile_drawer_change", handleDrawer);
    return () =>
      window.removeEventListener("dm_mobile_drawer_change", handleDrawer);
  }, []);

  useEffect(() => {
    const footerEl =
      document.getElementById("footer") || document.querySelector("footer");
    let observer: IntersectionObserver | null = null;
    let footerIntersecting = false;
    let rafId = 0;

    const evaluateLastSection = () => {
      rafId = 0;
      const root = document.documentElement;
      const nearBottom =
        root.scrollHeight > window.innerHeight + 120 &&
        window.scrollY + window.innerHeight >=
          root.scrollHeight - Math.max(window.innerHeight * 0.28, 220);

      let footerVisible = footerIntersecting;
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        footerVisible = rect.top <= window.innerHeight * 0.88 && rect.bottom > 0;
      }

      const active = footerVisible || nearBottom;
      setIsOnLastSection(active);

      if (
        !active &&
        Math.abs(window.scrollY - expandedScrollYRef.current) > 60
      ) {
        setManualExpanded(false);
      }
    };

    const scheduleEval = () => {
      if (!rafId && !document.hidden) {
        rafId = requestAnimationFrame(evaluateLastSection);
      }
    };

    if (footerEl && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          footerIntersecting = entries[0]?.isIntersecting ?? false;
          scheduleEval();
        },
        { threshold: 0.05 }
      );
      observer.observe(footerEl);
    }

    evaluateLastSection();
    window.addEventListener("scroll", scheduleEval, { passive: true });
    window.addEventListener("resize", scheduleEval, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer?.disconnect();
      window.removeEventListener("scroll", scheduleEval);
      window.removeEventListener("resize", scheduleEval);
    };
  }, []);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleDirectCall = () => {
    sound.playChime();
    haptics.heavy();
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "floating_bottom_bar_direct_call",
        name: "Direct Phone Caller",
        budget: formatINR(proposal.budget),
        service: proposal.industry,
        message: `Direct strategy call dialed to +91 9180252831 from bottom dock. Target ROAS: ${proposal.estimatedRoas}`,
      }),
    }).catch(() => {});
  };

  const handleWhatsAppClick = () => {
    sound.playChime();
    haptics.success();
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "floating_bottom_bar_whatsapp",
        name: "WhatsApp Growth Lead",
        brandWebsite: proposal.industry,
        budget: formatINR(proposal.budget),
        service: `Growth Blueprint (${proposal.estimatedRoas} ROAS)`,
        message: `Triggered WhatsApp Proposal from bottom dock. Industry: ${proposal.industry}, Budget: ${formatINR(proposal.budget)}, Estimated ROAS: ${proposal.estimatedRoas}`,
      }),
    }).catch(() => {});
    window.open(generateWhatsAppPayload(), "_blank");
  };

  if (isDrawerOpen) return null;

  const isExpanded = isOnLastSection || manualExpanded;

  return (
    <aside
      aria-label="Direct Strategy Call and WhatsApp Proposal"
      data-dock-state={isExpanded ? "active" : "minimized"}
      className="fixed bottom-[max(0.5rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 select-none max-w-[calc(100vw-1rem)] px-1 pointer-events-auto transition-transform duration-300 ease-out"
    >
      {!isExpanded ? (
        <button
          type="button"
          onClick={() => {
            sound.playPluck(165);
            haptics.selection();
            expandedScrollYRef.current = window.scrollY;
            setManualExpanded(true);
          }}
          aria-label="Expand Quick Connect (Call & WhatsApp)"
          className="group flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a0a09]/85 hover:bg-[#141416] backdrop-blur-md border border-white/15 hover:border-white/35 text-zinc-300 hover:text-white shadow-[0_8px_24px_rgba(0,0,0,0.75)] opacity-80 hover:opacity-100 transition-all duration-200 cursor-pointer"
        >
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
          </span>
          <PhoneCall className="w-3 h-3 text-zinc-300 shrink-0" />
          <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider whitespace-nowrap">
            Connect
          </span>
          <MessageCircle className="w-3 h-3 text-zinc-300 shrink-0" />
          <ChevronUp className="w-3 h-3 text-zinc-400 group-hover:-translate-y-0.5 transition-transform shrink-0" />
        </button>
      ) : (
        <div className="rounded-full bg-[#0a0a09]/95 backdrop-blur-xl border border-white/20 p-1 flex items-center justify-center gap-1 sm:gap-1.5 shadow-[0_14px_38px_rgba(0,0,0,0.9)]">
          {/* 1. Compact Direct Strategy Call */}
          <a
            href="tel:+919180252831"
            onClick={handleDirectCall}
            className="group relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#141416] hover:bg-[#1c1c20] border border-white/20 hover:border-white/45 text-white transition-all duration-200 active:scale-95 shrink-0 min-h-[32px]"
            title="Direct Strategy Call: +91 91802 52831"
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>

            <PhoneCall className="w-3 h-3 text-white shrink-0" />

            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wide whitespace-nowrap">
              <span className="hidden sm:inline text-zinc-400 mr-1">CALL:</span>
              <span className="text-white">+91 91802 52831</span>
            </span>
          </a>

          {/* 2. Compact WhatsApp Proposal */}
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="group relative flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black transition-all duration-200 active:scale-95 shadow-[0_0_16px_rgba(255,255,255,0.2)] shrink-0 min-h-[32px] cursor-pointer"
            title="Send Growth Proposal on WhatsApp"
          >
            <MessageCircle className="w-3 h-3 text-black shrink-0" />
            <span className="font-display font-black text-[10px] sm:text-[11px] tracking-wider uppercase text-black whitespace-nowrap">
              <span className="hidden sm:inline">WHATSAPP PROPOSAL</span>
              <span className="sm:hidden">WHATSAPP</span>
            </span>
          </button>

          {/* Collapse button when manually opened outside the last section */}
          {!isOnLastSection && (
            <button
              type="button"
              onClick={() => {
                sound.playPluck(130);
                setManualExpanded(false);
              }}
              aria-label="Minimize Quick Connect"
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </aside>
  );
}
