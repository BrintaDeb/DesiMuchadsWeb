"use client";

import React, { useState } from "react";
import { useProposal } from "@/context/AgencyProposalContext";
import { MessageCircle, Coffee, X, Check } from "lucide-react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { FiligreeCorner } from "../common/Icons";

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
    window.open(generateWhatsAppPayload(), "_blank");
  };

  const handleBookChai = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callData.name || !callData.phone) return;

    sound.playChime();
    setCallBooked(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#a1a1aa", "#27272a"],
      });
    } catch {}
  };

  return (
    <>
      {/* Persistent Floating Bottom Bar with iOS Safe Area & Minimize state */}
      {isMinimized ? (
        <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-4 z-40 select-none">
          <button
            onClick={() => {
              sound.playPluck(180);
              setIsMinimized(false);
            }}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-black border border-white/30 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all min-h-[48px]"
            aria-label="Open Proposal Bar"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden border border-white/50 shrink-0">
              { }
              <img src="/brand-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-mono text-xs font-bold text-white">PROPOSAL</span>
            <MessageCircle className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <div className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] inset-x-3 sm:inset-x-4 max-w-4xl mx-auto z-40 pointer-events-auto select-none">
          <div className="rounded-2xl sm:rounded-full ios-glass-panel px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3 shadow-[0_20px_60px_rgba(0,0,0,0.95)]">
            {/* Left Summary Badge with Brand Crest */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/40 shadow-sm bg-black shrink-0">
                { }
                <img
                  src="/brand-logo.jpg"
                  alt="Desi Muchads Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[11px] sm:text-xs font-bold text-white truncate">
                  {proposal.industry} • {formatINR(proposal.budget)}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-zinc-400 truncate">
                  ROAS: {proposal.estimatedRoas} ✦ Ready to deploy
                </span>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Chai & Strategy Call Trigger */}
              <button
                onClick={() => {
                  sound.playPluck(160);
                  setIsChaiModalOpen(true);
                }}
                className="px-3 sm:px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 min-h-[44px]"
              >
                <Coffee className="w-3.5 h-3.5 text-white" />
                <span className="hidden sm:inline">Strategy Call</span>
              </button>

              {/* Direct WhatsApp Proposal Button */}
              <button
                onClick={handleWhatsAppClick}
                className="px-3 sm:px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black font-mono text-[11px] sm:text-xs font-black shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 min-h-[44px]"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">WhatsApp Proposal</span>
                <span className="sm:hidden">WhatsApp</span>
              </button>

              {/* Minimize button */}
              <button
                onClick={() => {
                  sound.playPluck(140);
                  setIsMinimized(true);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all ml-0.5"
                aria-label="Minimize proposal bar"
              >
                <X className="w-4 h-4" />
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md rounded-3xl bg-[#121215] border border-white/20 shadow-2xl p-6 sm:p-8 text-white">
            <div className="absolute top-3 left-3 opacity-30 pointer-events-none">
              <FiligreeCorner className="w-4 h-4 text-white/50" position="top-left" />
            </div>
            <div className="absolute top-3 right-3 opacity-30 pointer-events-none">
              <FiligreeCorner className="w-4 h-4 text-white/50" position="top-right" />
            </div>

            <button
              onClick={() => {
                setIsChaiModalOpen(false);
                setCallBooked(false);
              }}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white"
              aria-label="Close call modal"
            >
              <X className="w-4 h-4" />
            </button>

            {!callBooked ? (
              <form onSubmit={handleBookChai} className="space-y-4">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/20 text-xs font-mono text-white mb-2">
                    <Coffee className="w-3.5 h-3.5" />
                    <span>DIRECT STRATEGY BAITHAK</span>
                  </div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                    Book a 15-Min Strategy Call
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1 font-sans">
                    No sales pitch. Pure unit economics and creative teardown with our agency founder.
                  </p>
                </div>

                <div>
                  <label htmlFor="chaiCallerName" className="font-mono text-xs text-zinc-300 uppercase block mb-1">
                    Your Name *
                  </label>
                  <input
                    id="chaiCallerName"
                    name="callerName"
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya"
                    value={callData.name}
                    onChange={(e) => setCallData({ ...callData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label htmlFor="chaiCallerPhone" className="font-mono text-xs text-zinc-300 uppercase block mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    id="chaiCallerPhone"
                    name="callerPhone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={callData.phone}
                    onChange={(e) => setCallData({ ...callData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label htmlFor="chaiCallerDate" className="font-mono text-xs text-zinc-300 uppercase block mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    id="chaiCallerDate"
                    name="callerDate"
                    value={callData.date}
                    onChange={(e) => setCallData({ ...callData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-xs text-white focus:outline-none focus:border-white"
                  >
                    <option value="Tomorrow, 2:00 PM IST">Tomorrow, 2:00 PM IST</option>
                    <option value="Tomorrow, 4:00 PM IST">Tomorrow, 4:00 PM IST</option>
                    <option value="Tomorrow, 6:00 PM IST">Tomorrow, 6:00 PM IST</option>
                    <option value="Day After, 3:00 PM IST">Day After, 3:00 PM IST</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Confirm My 15-Min Strategy Call
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-display font-black text-xl text-white uppercase">
                  Call Confirmed!
                </h4>
                <p className="text-xs text-zinc-300 max-w-xs mx-auto font-sans">
                  Pranam, {callData.name}! Our founder has received your booking for <strong>{callData.date}</strong>. We will message you on WhatsApp with the Google Meet link.
                </p>
                <button
                  onClick={() => setIsChaiModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase"
                >
                  Return to Site
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
