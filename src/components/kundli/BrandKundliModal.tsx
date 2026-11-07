"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { FiligreeCorner, MoustacheSVG } from "../common/Icons";
import {
  X,
  Sparkles,
  TrendingUp,
  Globe,
  Crown,
  Flame,
  Check,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

interface BrandKundliModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BrandKundliModal({ isOpen, onClose }: BrandKundliModalProps) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    brandUrl: "",
    whatsapp: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const servicesList = [
    { id: "ads", label: "Paid Ads (Meta & Google ROAS)", icon: TrendingUp },
    { id: "branding", label: "Brand Identity & Packaging", icon: Crown },
    { id: "reels", label: "Viral Social Media & Reels", icon: Flame },
    { id: "web", label: "Next.js Web / Shopify Store", icon: Globe },
    { id: "fullstack", label: "Full 360° Darbar Suite", icon: Sparkles },
  ];

  const budgetTiers = [
    { id: "tier1", label: "Under ₹1,00,000 / mo", sub: "Launch Stage" },
    { id: "tier2", label: "₹1,00,000 - ₹5,00,000 / mo", sub: "Growth Stage" },
    { id: "tier3", label: "₹5,00,000 - ₹20,00,000 / mo", sub: "Scale Stage" },
    { id: "tier4", label: "₹20,00,000+ / mo", sub: "Market Domination" },
  ];

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp) return;

    setIsSubmitted(true);

    // Launch celebratory luxury monochrome confetti
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#e4e4e7", "#a1a1aa", "#71717a"],
      });
    } catch {
      // safe fallback
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedServices([]);
    setSelectedBudget("");
    setFormData({ name: "", brandName: "", brandUrl: "", whatsapp: "" });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="kundliModalTitle"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0f0f12] border border-white/20 border-t-white/30 shadow-[0_25px_80px_rgba(0,0,0,0.95)] p-6 sm:p-10 overflow-hidden text-white">
        {/* Filigree corner brackets */}
        <div className="absolute top-4 left-4 opacity-30 pointer-events-none">
          <FiligreeCorner className="w-5 h-5 text-white" position="top-left" />
        </div>
        <div className="absolute top-4 right-4 opacity-30 pointer-events-none">
          <FiligreeCorner className="w-5 h-5 text-white" position="top-right" />
        </div>

        {/* Close Button */}
        <button
          onClick={resetForm}
          className="absolute top-6 right-6 p-2 rounded-full border border-white/20 text-zinc-400 hover:text-white hover:border-white/60 bg-white/5 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header & Progress */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MoustacheSVG className="w-7 h-3.5 text-white" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold">
                  FREE BRAND KUNDLI AUDIT
                </span>
              </div>
              <h3 id="kundliModalTitle" className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                {step === 1 && "What needs the Muchhad touch?"}
                {step === 2 && "Current Monthly Marketing Fuel?"}
                {step === 3 && "Where do we send your Brand Kundli?"}
              </h3>

              {/* Step indicator */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step === s
                        ? "w-8 bg-white"
                        : step > s
                        ? "w-4 bg-zinc-400"
                        : "w-4 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* STEP 1: Service Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-xs font-mono text-center text-zinc-400 mb-4">
                  Select one or more capabilities you want to deploy:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {servicesList.map((srv) => {
                    const isSelected = selectedServices.includes(srv.id);
                    const Icon = srv.icon;
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => toggleService(srv.id)}
                        className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? "border-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                            : "border-white/10 bg-[#151518] hover:border-white/30 hover:bg-[#1a1a20]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-white" />
                          <span className="text-xs font-medium text-white">{srv.label}</span>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    disabled={selectedServices.length === 0}
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all"
                  >
                    <span>Proceed to Budget</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Budget Tiers */}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-xs font-mono text-center text-zinc-400 mb-4">
                  What is your monthly marketing or advertising budget?
                </p>
                <div className="space-y-3">
                  {budgetTiers.map((b) => {
                    const isSelected = selectedBudget === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBudget(b.id)}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? "border-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                            : "border-white/10 bg-[#151518] hover:border-white/30 hover:bg-[#1a1a20]"
                        }`}
                      >
                        <div>
                          <div className="font-mono text-sm font-bold text-white">
                            {b.label}
                          </div>
                          <div className="font-mono text-xs text-zinc-400">
                            {b.sub}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    disabled={!selectedBudget}
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all"
                  >
                    <span>Final Step: Contact Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Contact Form */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs text-zinc-300 uppercase tracking-wider block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Singh"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#151518] border border-white/15 text-sm focus:outline-none focus:border-white text-white placeholder-zinc-500"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-zinc-300 uppercase tracking-wider block mb-1.5">
                      Brand / Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rajputana Crafts"
                      value={formData.brandName}
                      onChange={(e) =>
                        setFormData({ ...formData, brandName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#151518] border border-white/15 text-sm focus:outline-none focus:border-white text-white placeholder-zinc-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs text-zinc-300 uppercase tracking-wider block mb-1.5">
                      Website URL or Instagram Handle
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. www.brand.com or @brand"
                      value={formData.brandUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, brandUrl: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#151518] border border-white/15 text-sm focus:outline-none focus:border-white text-white placeholder-zinc-500"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-zinc-300 uppercase tracking-wider block mb-1.5">
                      WhatsApp Number (for Instant Kundli) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#151518] border border-white/15 text-sm focus:outline-none focus:border-white text-white placeholder-zinc-500"
                    />
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Lock In Free Brand Kundli 〰️
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Celebratory Confirmation State */
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white text-white flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block mb-2 font-bold">
              KUNDLI DISPATCHED WITH SWAGGER!
            </span>
            <h3 className="font-display font-extrabold text-3xl text-white mb-4">
              Pranam, {formData.name || "Friend"}!
            </h3>
            <p className="max-w-md mx-auto text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
              Our Principal Creative Technologists are reviewing your parameters right now. Expect your personalized Brand Kundli on WhatsApp within 4 business hours.
            </p>

            <button
              onClick={resetForm}
              className="px-8 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              Close & Return to Darbar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

