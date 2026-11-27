"use client";

import React, { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import {
  X,
  Sparkles,
  TrendingUp,
  Globe,
  Crown,
  Flame,
  Check,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Video,
  MessageCircle,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { BreydaqsButton } from "../common/BreydaqsButton";

interface BrandKundliModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

function resolveDefaultServices(defaultService?: string): string[] {
  if (!defaultService) return [];
  const lower = defaultService.toLowerCase();
  const ids: string[] = [];
  if (/paid|media|meta|google|ads|lead|ecom|commerce|unit/.test(lower)) ids.push("ads");
  if (/brand|packag|label|identity/.test(lower)) ids.push("branding");
  if (/social|reel|content/.test(lower)) ids.push("reels");
  if (/web|dev|shopify|store|next/.test(lower)) ids.push("web");
  if (/360|full/.test(lower)) ids.push("fullstack");
  return ids.length > 0 ? ids : ["ads"];
}

export function BrandKundliModal({ isOpen, onClose, defaultService }: BrandKundliModalProps) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>(() =>
    resolveDefaultServices(defaultService)
  );
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("Tomorrow");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("3:00 PM IST");
  const [isBookedOnCalendar, setIsBookedOnCalendar] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    brandUrl: "",
    whatsapp: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetForm = useCallback(() => {
    setStep(1);
    setSelectedServices(resolveDefaultServices(defaultService));
    setSelectedBudget("");
    setValidationError(null);
    setFormData({ name: "", brandName: "", brandUrl: "", whatsapp: "" });
    setIsSubmitted(false);
    onClose();
  }, [defaultService, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        resetForm();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, resetForm]);

  if (!isOpen) return null;

  const servicesList = [
    { id: "ads", label: "Meta & Google Ads (Paid Growth)", icon: TrendingUp },
    { id: "branding", label: "Branding & Visual Identity", icon: Crown },
    { id: "reels", label: "Social Media Management & Reels", icon: Flame },
    { id: "web", label: "Website Development & Shopify Store", icon: Globe },
    { id: "fullstack", label: "Full 360° Custom Execution Scope", icon: Sparkles },
  ];

  const budgetTiers = [
    { id: "tier1", label: "₹5,000 - ₹25,000 / month", sub: "Starter / Essential Stack" },
    { id: "tier2", label: "₹25,000 - ₹75,000 / month", sub: "Growth Stage" },
    { id: "tier3", label: "₹75,000 - ₹2,50,000 / month", sub: "Scale Stage" },
    { id: "tier4", label: "₹2,50,000+ / month", sub: "Full-Stack Domination" },
  ];

  const toggleService = (id: string) => {
    sound.playPluck(160);
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.whatsapp.trim();
    if (!trimmedName) {
      sound.playPluck(120);
      setValidationError("Please enter your name so our strategy lead knows how to address you.");
      return;
    }
    if (!trimmedPhone || trimmedPhone.replace(/\D/g, "").length < 8) {
      sound.playPluck(120);
      setValidationError("Please enter a valid 10-digit phone or WhatsApp number for report delivery.");
      return;
    }

    setValidationError(null);
    sound.playChime();
    setIsSubmitted(true);

    const resolvedBudgetLabel =
      budgetTiers.find((b) => b.id === selectedBudget)?.label || selectedBudget;
    const resolvedServiceLabels =
      selectedServices
        .map((id) => servicesList.find((s) => s.id === id)?.label || id)
        .join(", ") || defaultService || "Growth Audit";

    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "growth_audit",
          name: trimmedName,
          phone: trimmedPhone,
          brandWebsite: formData.brandUrl.trim(),
          message: `Brand: ${formData.brandName.trim() || "Unspecified"}`,
          budget: resolvedBudgetLabel,
          service: resolvedServiceLabels,
        }),
      }).catch(() => { });
    } catch { }

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#ffffff", "#e8e8e3", "#D4AF37"],
      });
    } catch { }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auditModalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetForm();
      }}
      className="fixed inset-0 z-[180] flex items-center justify-center p-3 sm:p-6 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] bg-black/90 sm:bg-black/85 sm:backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92dvh] overflow-y-auto overscroll-contain rounded-[0.25rem] bg-[#0c0c0b] border border-[rgba(232,232,227,0.2)] shadow-[0_35px_100px_rgba(0,0,0,0.98)] p-6 sm:p-10 text-[#e8e8e3]"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={resetForm}
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[0.2rem] border border-white/15 text-zinc-400 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header & Progress */}
            <div className="text-left mb-8 border-b border-white/10 pb-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold block mb-2">
                BRAND DIAGNOSTIC [ STEP 0{step} / 03 ]
              </span>
              <h3 id="auditModalTitle" className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                {step === 1 && "Select Growth Disciplines"}
                {step === 2 && "Monthly Marketing Allocation"}
                {step === 3 && "Dispatch Contact Coordinates"}
              </h3>

              {/* Step indicator */}
              <div className="flex items-center gap-2 mt-4">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1 rounded-[0.1rem] transition-all duration-300 ${step === s
                      ? "w-10 bg-white"
                      : step > s
                        ? "w-5 bg-zinc-500"
                        : "w-5 bg-white/10"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* STEP 1: Service Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-xs font-mono text-zinc-400 mb-4">
                  Select one or more capabilities you want to deploy for your brand:
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
                        className={`p-4 rounded-[0.2rem] border text-left flex items-center justify-between transition-all ${isSelected
                          ? "border-white bg-white/10 shadow-md"
                          : "bg-[#121211] border-white/10 hover:border-white/30"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-white" />
                          <span className="text-xs font-mono font-medium text-white">{srv.label}</span>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-[0.2rem] bg-white text-black flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-end">
                  <BreydaqsButton
                    disabled={selectedServices.length === 0}
                    onClick={() => setStep(2)}
                    variant="white"
                    className="py-3 px-6 text-xs"
                  >
                    PROCEED TO BUDGET
                  </BreydaqsButton>
                </div>
              </div>
            )}

            {/* STEP 2: Budget Tiers */}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-xs font-mono text-zinc-400 mb-4">
                  What is your monthly performance marketing or media budget?
                </p>
                <div className="space-y-2.5">
                  {budgetTiers.map((b) => {
                    const isSelected = selectedBudget === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          sound.playPluck(160);
                          setSelectedBudget(b.id);
                        }}
                        className={`w-full p-4 rounded-[0.2rem] border text-left flex items-center justify-between transition-all ${isSelected
                          ? "border-white bg-white/10 shadow-md"
                          : "bg-[#121211] border-white/10 hover:border-white/30"
                          }`}
                      >
                        <div>
                          <div className="font-mono text-xs font-bold text-white uppercase">
                            {b.label}
                          </div>
                          <div className="font-mono text-[11px] text-zinc-500">
                            {b.sub}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-[0.2rem] bg-white text-black flex items-center justify-center">
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
                    className="px-3 py-2 text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 uppercase"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <BreydaqsButton
                    disabled={!selectedBudget}
                    onClick={() => setStep(3)}
                    variant="white"
                    className="py-3 px-6 text-xs"
                  >
                    PROCEED TO CONTACT
                  </BreydaqsButton>
                </div>
              </div>
            )}

            {/* STEP 3: Contact Form */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="kundli-name"
                      className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="kundli-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-[0.2rem] bg-[#141412] border border-white/15 text-xs font-mono focus:outline-none focus:border-white text-white placeholder-zinc-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="kundli-brand"
                      className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-1.5"
                    >
                      Brand / Company Name
                    </label>
                    <input
                      id="kundli-brand"
                      type="text"
                      autoComplete="organization"
                      placeholder="e.g. Acme Brands"
                      value={formData.brandName}
                      onChange={(e) =>
                        setFormData({ ...formData, brandName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-[0.2rem] bg-[#141412] border border-white/15 text-xs font-mono focus:outline-none focus:border-white text-white placeholder-zinc-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="kundli-url"
                      className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-1.5"
                    >
                      Website URL or Store Link
                    </label>
                    <input
                      id="kundli-url"
                      type="text"
                      inputMode="url"
                      autoComplete="url"
                      placeholder="e.g. www.brand.com"
                      value={formData.brandUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, brandUrl: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-[0.2rem] bg-[#141412] border border-white/15 text-xs font-mono focus:outline-none focus:border-white text-white placeholder-zinc-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="kundli-whatsapp"
                      className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-1.5"
                    >
                      WhatsApp Number (for Instant Report) *
                    </label>
                    <input
                      id="kundli-whatsapp"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-[0.2rem] bg-[#141412] border border-white/15 text-xs font-mono focus:outline-none focus:border-white text-white placeholder-zinc-500"
                    />
                  </div>
                </div>

                {validationError && (
                  <div
                    role="alert"
                    className="p-3 rounded-[0.2rem] bg-red-500/10 border border-red-500/35 text-xs font-mono text-red-300"
                  >
                    {validationError}
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setValidationError(null);
                      setStep(2);
                    }}
                    className="px-3 py-2 min-h-[44px] text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 uppercase cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <BreydaqsButton
                    type="submit"
                    variant="white"
                    className="py-3 px-6 text-xs"
                  >
                    DISPATCH AUDIT REQUEST
                  </BreydaqsButton>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Confirmation State with Strategy Session Booking */
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-[0.2rem] bg-[#D4AF37]/12 border border-[#D4AF37]/45 text-[#F3E5AB] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6 text-[#F3E5AB]" />
            </div>

            <span className="font-mono text-[10.5px] uppercase tracking-widest text-zinc-400 block mb-1 font-bold">
              GROWTH AUDIT DISPATCHED
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
              Welcome, {formData.name || "Partner"}!
            </h3>
            <p className="max-w-md mx-auto text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 font-sans">
              Our Principal Growth Architects are reviewing your parameters right now. Expect your personalized Brand Growth Diagnostic on WhatsApp within 4 business hours.
            </p>

            {/* Instant Strategy Session Booking Card */}
            <div className="mb-6 p-5 rounded-[0.25rem] bg-[#121211] border border-white/15 text-left max-w-lg mx-auto shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 font-mono">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#F3E5AB]" />
                  <span className="text-xs uppercase tracking-wider text-white font-bold">
                    Schedule 20-Min Strategy Session
                  </span>
                </div>
                <span className="text-[10.5px] text-[#F3E5AB] bg-[#D4AF37]/15 border border-[#D4AF37]/35 px-2 py-0.5 rounded-[0.2rem]">
                  1-on-1 Founder Call
                </span>
              </div>

              {/* Day Selector */}
              <div className="mb-3">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                  Select Day:
                </span>
                <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                  {["Today (Urgent)", "Tomorrow", "Day After"].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        sound.playPluck(140);
                        setSelectedDay(day);
                      }}
                      className={`py-1.5 px-2 text-center rounded-[0.2rem] transition-all border ${selectedDay === day
                        ? "bg-white text-black border-white font-bold"
                        : "bg-white/5 text-zinc-400 border-white/10 hover:text-white"
                        }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selector */}
              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                  Select IST Slot:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                  {["11:30 AM", "3:00 PM", "5:30 PM", "8:00 PM"].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        sound.playPluck(160);
                        setSelectedTimeSlot(`${slot} IST`);
                      }}
                      className={`py-1.5 px-2 text-center rounded-[0.2rem] transition-all border ${selectedTimeSlot.startsWith(slot)
                        ? "bg-white text-black border-white font-bold"
                        : "bg-white/5 text-zinc-400 border-white/10 hover:text-white"
                        }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => {
                    sound.playChime();
                    setIsBookedOnCalendar(true);
                    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Desi+Muchads+Strategy+Session+·+${encodeURIComponent(formData.brandName || "Brand")}&details=Strategic+Unit+Economics+%26+Ad+Scaling+Session+with+Desi+Muchads+Principals.&location=Google+Meet`;
                    window.open(googleCalUrl, "_blank", "noopener,noreferrer");
                  }}
                  className="flex-1 py-2.5 px-4 min-h-[44px] rounded-[0.2rem] bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-black" />
                  <span>{isBookedOnCalendar ? "✓ Calendar Linked" : "Add to Calendar"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playChime();
                    const text = encodeURIComponent(
                      `Hello Desi Muchads! I just submitted our brand details for the Growth Audit and would like to schedule a Strategy Session:\n` +
                      `✦ Name: ${formData.name}\n` +
                      `✦ Brand: ${formData.brandName} (${formData.brandUrl})\n` +
                      `✦ Preferred Time: ${selectedDay} at ${selectedTimeSlot}\n\n` +
                      `Looking forward to meeting the creative pod!`
                    );
                    window.open(`https://wa.me/919180252831?text=${text}`, "_blank", "noopener,noreferrer");
                  }}
                  className="py-2.5 px-4 min-h-[44px] rounded-[0.2rem] bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp VIP</span>
                </button>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="px-6 py-2 rounded-[0.2rem] border border-white/20 text-zinc-400 hover:text-white hover:border-white/40 text-xs font-mono transition-colors uppercase tracking-wider"
            >
              Close &amp; Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
