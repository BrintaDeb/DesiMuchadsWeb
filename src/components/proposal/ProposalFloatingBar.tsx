"use client";

import React, { useState } from "react";
import { useProposal } from "@/context/AgencyProposalContext";
import { MessageCircle, Coffee, X, Check } from "lucide-react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { BreydaqsButton } from "../common/BreydaqsButton";

export function ProposalFloatingBar() {
  const { proposal, generateWhatsAppPayload } = useProposal();
  const [isChaiModalOpen, setIsChaiModalOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [callBooked, setCallBooked] = useState(false);
  const [callData, setCallData] = useState({
    name: "",
    phone: "",
    date: "Tomorrow, 4:00 PM IST",
    topic: "Scaling to 5x ROAS",
  });

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleWhatsAppClick = () => {
    sound.playChime();
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "proposal_floating_bar_whatsapp",
        name: "Founder / Growth Lead",
        brandWebsite: proposal.industry,
        budget: formatINR(proposal.budget),
        service: `Scale Engine (${proposal.estimatedRoas} ROAS)`,
        message: `Triggered WhatsApp Proposal from Floating Bar. Industry: ${proposal.industry}, Budget: ${formatINR(proposal.budget)}, Estimated ROAS: ${proposal.estimatedRoas}`,
      }),
    }).catch(() => { });
    window.open(generateWhatsAppPayload(), "_blank");
  };

  const handleBookCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callData.name || !callData.phone) return;

    sound.playChime();
    setCallBooked(true);

    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "strategy_call_modal",
        name: callData.name,
        phone: callData.phone,
        budget: formatINR(proposal.budget),
        service: proposal.industry,
        message: `Topic: ${callData.topic} | Preferred Time: ${callData.date} | Projected ROAS: ${proposal.estimatedRoas}`,
      }),
    }).catch(() => { });

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#e8e8e3", "#10b981"],
      });
    } catch { }

    const text = `*New 15-Minute Strategy Session Booking*\n\n` +
      `• *Name:* ${callData.name}\n` +
      `• *WhatsApp:* ${callData.phone}\n` +
      `• *Preferred Time:* ${callData.date}\n` +
      `• *Topic:* ${callData.topic}\n` +
      `• *Industry / Growth Category:* ${proposal.industry} (${formatINR(proposal.budget)})\n` +
      `• *Projected ROAS:* ${proposal.estimatedRoas}\n\n` +
      `Sent via Desi Muchads Strategy Engine`;

    const whatsappUrl = `https://wa.me/919180252831?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Persistent Floating Bottom Bar */}
      {isMinimized ? (
        <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-4 z-40 select-none">
          <button
            onClick={() => {
              sound.playPluck(180);
              setIsMinimized(false);
            }}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-[0.2rem] bg-[#080807] border border-[rgba(232,232,227,0.22)] text-white shadow-2xl hover:border-white transition-all min-h-[44px]"
            aria-label="Open Proposal Bar"
          >
            <div className="w-5 h-5 rounded-[0.2rem] overflow-hidden border border-white/30 shrink-0">
              <img src="/brand-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-mono text-xs font-bold text-white">PROPOSAL</span>
            <MessageCircle className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      ) : (
        <div className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] inset-x-3 sm:inset-x-4 max-w-4xl mx-auto z-40 pointer-events-auto select-none">
          <div className="rounded-[0.25rem] bg-[#0c0c0b]/95 backdrop-blur-md border border-[rgba(232,232,227,0.2)] px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-[0_20px_60px_rgba(0,0,0,0.95)]">
            {/* Left Summary Badge */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-[0.2rem] overflow-hidden border border-white/20 bg-black shrink-0">
                <img
                  src="/brand-logo.jpg"
                  alt="Desi Muchads Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0 font-mono">
                <span className="text-[11px] sm:text-xs font-bold text-white truncate">
                  {proposal.industry} • {formatINR(proposal.budget)}
                </span>
                <span className="text-[9px] sm:text-[10px] text-zinc-400 truncate">
                  Target ROAS: <strong className="text-emerald-400">{proposal.estimatedRoas}</strong> ✦ Engineered Architecture
                </span>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 shrink-0 font-mono">
              <button
                onClick={() => {
                  sound.playPluck(160);
                  setIsChaiModalOpen(true);
                }}
                className="px-3 sm:px-4 py-2 rounded-[0.2rem] border border-white/20 bg-white/5 hover:bg-white/10 text-white text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Coffee className="w-3.5 h-3.5 text-white shrink-0" />
                <span className="sm:hidden">Call</span>
                <span className="hidden sm:inline">Strategy Call</span>
              </button>

              <button
                onClick={handleWhatsAppClick}
                className="px-3.5 sm:px-5 py-2 rounded-[0.2rem] bg-white hover:bg-zinc-200 text-black text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">WhatsApp Proposal</span>
                <span className="sm:hidden">Proposal</span>
              </button>

              <button
                onClick={() => {
                  sound.playPluck(140);
                  setIsMinimized(true);
                }}
                className="p-1 rounded-[0.2rem] text-zinc-400 hover:text-white transition-all ml-1"
                aria-label="Minimize proposal bar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 15-Minute Strategy Call Booking Modal */}
      {isChaiModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md max-h-[92dvh] overflow-y-auto overscroll-contain rounded-[0.25rem] bg-[#0c0c0b] border border-[rgba(232,232,227,0.2)] shadow-2xl p-6 sm:p-8 text-[#e8e8e3]">
            <button
              onClick={() => {
                setIsChaiModalOpen(false);
                setCallBooked(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-[0.2rem] text-zinc-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {!callBooked ? (
              <form onSubmit={handleBookCall} className="space-y-4">
                <div className="text-left mb-6 border-b border-white/10 pb-4">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold block mb-1">
                    EXECUTIVE STRATEGY SESSION
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                    Book a 15-Min Strategy Call
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 font-sans">
                    Zero sales pitch. Rigorous unit economics and creative teardown with agency principals.
                  </p>
                </div>

                <div>
                  <label htmlFor="callerName" className="font-mono text-xs text-zinc-400 uppercase block mb-1">
                    Your Name *
                  </label>
                  <input
                    id="callerName"
                    name="callerName"
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={callData.name}
                    onChange={(e) => setCallData({ ...callData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-[0.2rem] bg-[#141412] border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label htmlFor="callerPhone" className="font-mono text-xs text-zinc-400 uppercase block mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    id="callerPhone"
                    name="callerPhone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={callData.phone}
                    onChange={(e) => setCallData({ ...callData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-[0.2rem] bg-[#141412] border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label htmlFor="callerDate" className="font-mono text-xs text-zinc-400 uppercase block mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    id="callerDate"
                    name="callerDate"
                    value={callData.date}
                    onChange={(e) => setCallData({ ...callData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-[0.2rem] bg-[#141412] border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-white"
                  >
                    <option value="Tomorrow, 2:00 PM IST">Tomorrow, 2:00 PM IST</option>
                    <option value="Tomorrow, 4:00 PM IST">Tomorrow, 4:00 PM IST</option>
                    <option value="Tomorrow, 6:00 PM IST">Tomorrow, 6:00 PM IST</option>
                    <option value="Day After, 3:00 PM IST">Day After, 3:00 PM IST</option>
                  </select>
                </div>

                <div className="pt-2">
                  <BreydaqsButton
                    type="submit"
                    variant="white"
                    className="w-full py-3 text-xs"
                  >
                    CONFIRM 15-MIN STRATEGY CALL
                  </BreydaqsButton>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-[0.2rem] bg-emerald-500/10 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-display font-black text-xl text-white uppercase tracking-tight">
                  Session Confirmed!
                </h4>
                <p className="text-xs text-zinc-300 max-w-xs mx-auto font-sans">
                  Welcome, {callData.name}! Our founder has received your booking for <strong>{callData.date}</strong>. We will message you on WhatsApp with the Google Meet link.
                </p>
                <div className="pt-2 flex flex-col gap-2 font-mono">
                  <a
                    href={`https://wa.me/919180252831?text=${encodeURIComponent(
                      `Hello Desi Muchads! I have confirmed my 15-Min Strategy Call for ${callData.date}. Looking forward to connecting!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-[0.2rem] bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase flex items-center justify-center gap-1.5 shadow-lg"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Open WhatsApp Dispatch</span>
                  </a>
                  <button
                    onClick={() => setIsChaiModalOpen(false)}
                    className="w-full py-2 rounded-[0.2rem] bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white font-mono text-xs uppercase transition-colors"
                  >
                    Return to Site
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
