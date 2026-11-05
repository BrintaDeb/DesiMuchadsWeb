"use client";

import React, { useState } from "react";
import { useProposal } from "@/context/AgencyProposalContext";
import { MessageCircle, Coffee, X, Calendar, Check, ArrowRight } from "lucide-react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { FiligreeCorner, MoustacheSVG } from "../common/Icons";

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
        colors: ["#D4AF37", "#E11D48", "#F5DE88"],
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
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#0e164c] border-2 border-[#F36700] text-white shadow-2xl hover:scale-105 active:scale-95 transition-all min-h-[48px]"
            aria-label="Open Proposal Bar"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden border border-[#FFC400] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-mono text-xs font-bold text-[#FFC400]">PROPOSAL</span>
            <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
          </button>
        </div>
      ) : (
        <div className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] inset-x-3 sm:inset-x-4 max-w-4xl mx-auto z-40 pointer-events-auto select-none">
          <div className="rounded-2xl sm:rounded-full bg-[#0e164c]/95 backdrop-blur-2xl border border-[#F36700]/50 shadow-[0_10px_40px_rgba(0,0,0,0.8)] px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
            {/* Left Summary Badge with Brand Crest */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#FFC400] shadow-sm bg-[#0e164c] shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand-logo.jpg"
                  alt="Desi Muchads Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[11px] sm:text-xs font-bold text-[#FFC400] truncate">
                  {proposal.industry} • {formatINR(proposal.budget)}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-white/70 truncate">
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
                <Coffee className="w-3.5 h-3.5 text-[#FFC400]" />
                <span className="hidden sm:inline">Chai Call</span>
              </button>

              {/* Direct WhatsApp Proposal Button */}
              <button
                onClick={handleWhatsAppClick}
                className="px-3 sm:px-5 py-2 rounded-full bg-[#25D366] hover:bg-[#1faa53] text-white font-mono text-[11px] sm:text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 min-h-[44px]"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
                <span className="hidden sm:inline">Send to WhatsApp</span>
                <span className="sm:hidden">WhatsApp</span>
              </button>

              {/* Minimize button */}
              <button
                onClick={() => {
                  sound.playPluck(140);
                  setIsMinimized(true);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 active:scale-90 transition-all ml-0.5"
                aria-label="Minimize proposal bar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 15-Minute Chai & Strategy Call Booking Modal */}
      {isChaiModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0C12]/85 backdrop-blur-xl animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md rounded-3xl bg-[#0D0C12] border-2 border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8 text-[#F7F1E5]">
            <div className="absolute top-3 left-3 opacity-30 pointer-events-none">
              <FiligreeCorner className="w-4 h-4 text-[#D4AF37]" position="top-left" />
            </div>
            <div className="absolute top-3 right-3 opacity-30 pointer-events-none">
              <FiligreeCorner className="w-4 h-4 text-[#D4AF37]" position="top-right" />
            </div>

            <button
              onClick={() => {
                setIsChaiModalOpen(false);
                setCallBooked(false);
              }}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white"
              aria-label="Close call modal"
            >
              <X className="w-4 h-4" />
            </button>

            {!callBooked ? (
              <form onSubmit={handleBookChai} className="space-y-4">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37] mb-2">
                    <Coffee className="w-3.5 h-3.5" />
                    <span>CHAI & CHARCHA</span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    Book a 15-Min Strategy Chai Call
                  </h3>
                  <p className="text-xs text-white/70 mt-1">
                    No sales pitch. Pure unit economics and creative teardown with our agency founder.
                  </p>
                </div>

                <div>
                  <label htmlFor="chaiCallerName" className="font-mono text-xs text-[#D4AF37] uppercase block mb-1">
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
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141829] border border-[#D4AF37]/30 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label htmlFor="chaiCallerPhone" className="font-mono text-xs text-[#D4AF37] uppercase block mb-1">
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
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141829] border border-[#D4AF37]/30 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label htmlFor="chaiCallerDate" className="font-mono text-xs text-[#D4AF37] uppercase block mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    id="chaiCallerDate"
                    name="callerDate"
                    value={callData.date}
                    onChange={(e) => setCallData({ ...callData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141829] border border-[#D4AF37]/30 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
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
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E11D48] to-[#C84B31] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Confirm My 15-Min Strategy Chai Call
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#0D9488]/20 border border-[#0D9488] text-[#14B8A6] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-display font-bold text-xl text-white">
                  Chai Call Confirmed!
                </h4>
                <p className="text-xs text-white/70 max-w-xs mx-auto">
                  Pranam, {callData.name}! Our founder has received your booking for <strong>{callData.date}</strong>. We will message you on WhatsApp with the Google Meet link.
                </p>
                <button
                  onClick={() => setIsChaiModalOpen(false)}
                  className="px-6 py-2 rounded-full bg-[#D4AF37] text-[#0D0C12] font-bold text-xs uppercase"
                >
                  Return to Darbar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
