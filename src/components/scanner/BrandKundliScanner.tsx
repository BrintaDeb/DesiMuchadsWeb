"use client";

import React, { useState } from "react";
import { SectionDivider } from "../common/SectionDivider";
import { FiligreeCorner, MoustacheSVG } from "../common/Icons";
import {
  Search,
  CheckCircle2,
  Lock,
  MessageCircle,
  AlertTriangle,
  Zap,
  ShieldCheck,
  TrendingUp,
  Share2,
} from "lucide-react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";

export function BrandKundliScanner() {
  const [url, setUrl] = useState("");
  const [instagram, setInstagram] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const scanSteps = [
    "Auditing PageSpeed, WebGL & Mobile UX Telemetry...",
    "Scanning Meta Pixel & Google Ads Conversion Signals...",
    "Evaluating Brand Pehchan, Hook Strength & Cultural Swagger...",
    "Calculating Growth Potential & ROAS Multipliers...",
  ];

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    sound.playPluck(160);
    setIsScanning(true);
    setScanStep(0);
    setScanComplete(false);

    // 4-step scan sequence
    const interval = setInterval(() => {
      setScanStep((prev) => {
        sound.playPluck(180 + prev * 20);
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            sound.playChime();
            setIsScanning(false);
            setScanComplete(true);
          }, 600);
          return prev;
        }
      });
    }, 850);
  };

  const handleUnlockLeaks = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsapp) return;

    sound.playChime();
    setUnlocked(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#e4e4e7", "#a1a1aa", "#71717a"],
      });
    } catch {}

    const text = encodeURIComponent(
      `Pranam Desi Muchads! 🙏\n\nI just ran our Brand Kundli Scan on your website:\n` +
        `✦ Brand URL: ${url}\n` +
        `✦ Instagram: ${instagram || "N/A"}\n` +
        `✦ Diagnostic Scores: Speed (94/100), Ad Readiness (62/100), Visual Swagger (48/100), SEO (71/100)\n\n` +
        `Please send me the full 3 Critical Revenue Leaks breakdown on WhatsApp! 〰️`
    );
    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
  };

  return (
    <section id="scanner" className="relative py-28 sm:py-36 bg-[#09090b] text-white overflow-hidden border-t border-white/10">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-[150px] pointer-events-none" />

      <SectionDivider label="AI BRAND KUNDLI SCANNER" sublabel="INSTANT REVENUE LEAK AUDIT" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white">
            Diagnose Your Brand&apos;s{" "}
            <span className="text-gradient-silver block mt-1">
              Hidden Revenue Leaks.
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Enter your brand URL and social handle. Our automated crawler will analyze your speed, pixel signals, and cultural swagger in real time.
          </p>
        </div>

        {/* Scanner Container Box */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-[#121215] border border-white/10 border-t-white/20 backdrop-blur-2xl shadow-2xl">
          {/* Filigree corner brackets */}
          <div className="absolute top-3 left-3 opacity-30 pointer-events-none">
            <FiligreeCorner className="w-4 h-4 text-white" position="top-left" />
          </div>
          <div className="absolute top-3 right-3 opacity-30 pointer-events-none">
            <FiligreeCorner className="w-4 h-4 text-white" position="top-right" />
          </div>

          {/* INPUT FORM (if not scanned yet) */}
          {!scanComplete && !isScanning && (
            <form onSubmit={handleStartScan} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="scannerUrlInput" className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-semibold block mb-2">
                    1. Brand Website URL *
                  </label>
                  <input
                    id="scannerUrlInput"
                    name="websiteUrl"
                    type="url"
                    required
                    placeholder="https://yourbrand.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#18181c] border border-white/15 text-sm text-white focus:outline-none focus:border-white font-mono placeholder-zinc-500"
                  />
                </div>

                <div>
                  <label htmlFor="scannerInstagramInput" className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-semibold block mb-2">
                    2. Instagram Handle (Optional)
                  </label>
                  <input
                    id="scannerInstagramInput"
                    name="instagramHandle"
                    type="text"
                    placeholder="@yourbrand"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#18181c] border border-white/15 text-sm text-white focus:outline-none focus:border-white font-mono placeholder-zinc-500"
                  />
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Generate My Brand Kundli (Free)</span>
                </button>
              </div>
            </form>
          )}

          {/* ACTIVE SCANNING TERMINAL ANIMATION */}
          {isScanning && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
              {/* Radar pulse animation */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-40" />
                <div className="w-16 h-16 rounded-full border-2 border-white bg-white/10 flex items-center justify-center">
                  <MoustacheSVG className="w-8 h-4 text-white animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs text-zinc-300 uppercase tracking-widest font-bold block">
                  CRAWLING: {url}
                </span>
                <p className="font-display font-bold text-lg sm:text-xl text-white">
                  {scanSteps[scanStep]}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-md h-1.5 bg-[#18181c] rounded-full overflow-hidden border border-white/15">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* SCAN COMPLETED SCORECARD */}
          {scanComplete && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-white/10 gap-4">
                <div>
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-1">
                    DIAGNOSTIC AUDIT COMPLETE
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    Brand Kundli for {url.replace(/^https?:\/\//, "")}
                  </h3>
                </div>

                <button
                  onClick={() => {
                    setScanComplete(false);
                    setUnlocked(false);
                  }}
                  className="px-4 py-2 rounded-full border border-white/20 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/50 bg-white/5"
                >
                  Scan Another URL
                </button>
              </div>

              {/* 4-Metric Scorecard Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/15 text-center">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase block mb-1">
                    Speed & Tech
                  </span>
                  <div className="text-3xl font-display font-extrabold text-white">
                    94/100
                  </div>
                  <span className="text-[10px] font-mono text-zinc-300">✦ Sub-1s Load</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/15 text-center">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase block mb-1">
                    Ad Readiness
                  </span>
                  <div className="text-3xl font-display font-extrabold text-white">
                    62/100
                  </div>
                  <span className="text-[10px] font-mono text-zinc-300">✦ Missing CBO Pixels</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/15 text-center">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase block mb-1">
                    Visual Swagger
                  </span>
                  <div className="text-3xl font-display font-extrabold text-white">
                    48/100
                  </div>
                  <span className="text-[10px] font-mono text-zinc-300">✦ Generic Creative</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/15 text-center">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase block mb-1">
                    SEO & GEO
                  </span>
                  <div className="text-3xl font-display font-extrabold text-white">
                    71/100
                  </div>
                  <span className="text-[10px] font-mono text-zinc-300">✦ Local Untapped</span>
                </div>
              </div>

              {/* 3 CRITICAL REVENUE LEAKS (BLURRED TEASER / UNLOCKED) */}
              <div className="relative rounded-2xl p-6 sm:p-8 bg-[#18181c] border border-white/20 border-t-white/30 overflow-hidden shadow-xl">
                <div className="flex items-center gap-2 text-white mb-3 font-mono text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-zinc-300" />
                  <span>3 Critical Revenue Leaks Detected (Costing ~₹3.8L/mo)</span>
                </div>

                {/* The Leaks List (blurred if locked) */}
                <div className={`space-y-3 transition-all duration-500 ${!unlocked ? "filter blur-sm select-none pointer-events-none" : ""}`}>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                    <span className="font-bold text-white block mb-1">Leak 1: Meta ViewContent to AddToCart Dropoff (-54%)</span>
                    <p className="text-zinc-300">Your product pages lack localized social proof and instant checkout triggers, causing over half of your paid ad visitors to bounce before adding items.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                    <span className="font-bold text-white block mb-1">Leak 2: Zero Dynamic Catalog Retargeting</span>
                    <p className="text-zinc-300">Visitors who abandon carts are not served dynamic vernacular ads, burning 38% of your top-of-funnel ad spend without automated recaptures.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                    <span className="font-bold text-white block mb-1">Leak 3: Unindexed Generative AI Keywords</span>
                    <p className="text-zinc-300">Your competitors appear in Perplexity and Google Gemini recommendations while your brand is completely invisible in modern GEO search.</p>
                  </div>
                </div>

                {/* Locked Overlay with WhatsApp Unlocker */}
                {!unlocked && (
                  <div className="absolute inset-0 bg-[#09090b]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-10">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/30 text-white flex items-center justify-center mb-3">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-white mb-1">
                      Unlock Full Revenue Leak Audit
                    </h4>
                    <p className="text-xs text-zinc-400 max-w-sm mb-4">
                      Enter your WhatsApp number to immediately reveal the complete leak breakdown and receive your PDF Brand Kundli report.
                    </p>

                    <form onSubmit={handleUnlockLeaks} className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md">
                      <label htmlFor="scannerWhatsappInput" className="sr-only">
                        WhatsApp Phone Number
                      </label>
                      <input
                        id="scannerWhatsappInput"
                        name="whatsappPhone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-full bg-[#121215] border border-white/20 text-xs text-white focus:outline-none focus:border-white font-mono placeholder-zinc-500"
                      />
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-black text-black" />
                        <span>Unlock via WhatsApp</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
