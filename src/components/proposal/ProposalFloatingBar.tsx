"use client";

import React from "react";
import { useProposal } from "@/context/AgencyProposalContext";
import { MessageCircle, PhoneCall } from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

/**
 * Creative Persistent Floating Bottom Dock
 * Features ONLY:
 * 1. Direct Strategy Call: 1-tap phone dialing to +91 91802 52831
 * 2. WhatsApp Proposal: instant pre-filled growth proposal dispatch
 * Symmetrically centered, ultra-sleek, and mobile-optimized.
 */
export function ProposalFloatingBar() {
  const { proposal, generateWhatsAppPayload } = useProposal();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    const handleDrawer = (e: any) => {
      setIsDrawerOpen(!!e.detail?.open);
    };
    window.addEventListener("dm_mobile_drawer_change", handleDrawer);
    return () => window.removeEventListener("dm_mobile_drawer_change", handleDrawer);
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
        service: `Scale Engine (${proposal.estimatedRoas} ROAS)`,
        message: `Triggered WhatsApp Proposal from bottom dock. Industry: ${proposal.industry}, Budget: ${formatINR(proposal.budget)}, Estimated ROAS: ${proposal.estimatedRoas}`,
      }),
    }).catch(() => {});
    window.open(generateWhatsAppPayload(), "_blank");
  };

  if (isDrawerOpen) return null;

  return (
    <aside
      aria-label="Direct Strategy Call and WhatsApp Proposal"
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 select-none max-w-[calc(100vw-0.75rem)] px-1 pointer-events-auto"
    >
      <div className="rounded-full bg-[#0a0a09]/95 backdrop-blur-xl border border-[rgba(232,232,227,0.22)] p-1.5 sm:p-2 flex items-center justify-center gap-1.5 sm:gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(16,185,129,0.18)] ring-1 ring-white/10">
        {/* 1. DIRECT STRATEGY CALL (1-tap dial to +91 91802 52831) */}
        <a
          href="tel:+919180252831"
          onClick={handleDirectCall}
          className="group relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#111713] hover:bg-[#18231c] border border-emerald-500/40 hover:border-emerald-400 text-white transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.2)] shrink-0 min-h-[44px]"
          title="Direct Strategy Call: +91 91802 52831"
        >
          {/* Live Call Beacon */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>

          <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 group-hover:rotate-12 transition-transform shrink-0" />

          <div className="flex items-center gap-1 font-mono text-[11px] sm:text-sm">
            <span className="font-bold tracking-wider uppercase text-white whitespace-nowrap">
              <span className="hidden sm:inline">STRATEGY CALL: </span>
              <span className="sm:hidden">CALL: </span>
            </span>
            <span className="font-black text-emerald-300 tracking-wider whitespace-nowrap">
              +91 91802 52831
            </span>
          </div>
        </a>

        {/* 2. WHATSAPP PROPOSAL */}
        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="group relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black transition-all duration-300 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.3)] shrink-0 min-h-[44px]"
          title="Send Growth Proposal on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black group-hover:scale-110 transition-transform shrink-0" />
          <span className="font-display font-black text-[11px] sm:text-sm tracking-wider uppercase text-black whitespace-nowrap">
            <span className="hidden sm:inline">WHATSAPP PROPOSAL</span>
            <span className="sm:hidden">WHATSAPP</span>
          </span>
        </button>
      </div>
    </aside>
  );
}
