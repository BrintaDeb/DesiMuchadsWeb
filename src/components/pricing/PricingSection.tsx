"use client";

import React, { useState } from "react";
import { SectionDivider } from "../common/SectionDivider";
import { FiligreeCorner, MoustacheSVG } from "../common/Icons";
import {
  Check,
  Crown,
  Sparkles,
  Zap,
  ArrowRight,
  Plus,
  Minus,
  MessageCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import { sound } from "@/lib/sound";

interface PricingSectionProps {
  onOpenKundli: () => void;
}

export function PricingSection({ onOpenKundli }: PricingSectionProps) {
  const [mode, setMode] = useState<"retainers" | "thali">("retainers");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly");

  // Mode B: Marketing Thali Custom Stack State
  const thaliDishes = [
    {
      id: "media_buying",
      name: "Performance Media Buying",
      hindi: "ऐड बाइंग (Meta + Google)",
      desc: "Full-funnel automated PPC campaigns, CBO scaling, dynamic retargeting.",
      basePrice: 65000,
      hoursSaved: 45,
      roasBoost: 1.4,
    },
    {
      id: "custom_web",
      name: "Custom Next.js / 3D Web Mahal",
      hindi: "डिजिटल महल आर्किटेक्चर",
      desc: "Ultra-fast Next.js 16 storefront, 3D WebGL interactions, sub-800ms load speed.",
      basePrice: 85000,
      hoursSaved: 55,
      roasBoost: 1.2,
    },
    {
      id: "viral_reels",
      name: "Viral Reels & Hinglish Production",
      hindi: "हल्ला बोल रील्स (12 Reels/mo)",
      desc: "Studio production, witty cultural scripts, high-retention hooks, sound design.",
      basePrice: 50000,
      hoursSaved: 35,
      roasBoost: 0.9,
    },
    {
      id: "brand_granth",
      name: "Brand Identity & Packaging Granth",
      hindi: "शाही पहचान & पैकेजिंग",
      desc: "Royal bespoke visual identity, packaging guidelines, custom typography.",
      basePrice: 45000,
      hoursSaved: 30,
      roasBoost: 0.7,
    },
    {
      id: "seo_dominance",
      name: "Technical SEO & Generative AI Search",
      hindi: "Google व AI पर हुकूमत",
      desc: "Authority backlinks, local Maps GMB domination, GEO prompt-engine optimization.",
      basePrice: 35000,
      hoursSaved: 25,
      roasBoost: 0.6,
    },
    {
      id: "cloud_retention",
      name: "24/7 Cloud & Conversion Optimization",
      hindi: "24/7 वॉर-रूम मेंटेनेंस",
      desc: "Continuous A/B testing, heatmap tracking, weekly strategy calls, zero server downtime.",
      basePrice: 30000,
      hoursSaved: 20,
      roasBoost: 0.5,
    },
  ];

  const [selectedDishes, setSelectedDishes] = useState<string[]>([
    "media_buying",
    "viral_reels",
  ]);

  const toggleDish = (id: string) => {
    sound.playPluck(160);
    setSelectedDishes((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  // Thali computations
  const thaliInvestment = selectedDishes.reduce((acc, id) => {
    const dish = thaliDishes.find((d) => d.id === id);
    return acc + (dish ? dish.basePrice : 0);
  }, 0);

  const thaliHoursSaved = selectedDishes.reduce((acc, id) => {
    const dish = thaliDishes.find((d) => d.id === id);
    return acc + (dish ? dish.hoursSaved : 0);
  }, 0);

  const thaliRoas = (
    3.0 +
    selectedDishes.reduce((acc, id) => {
      const dish = thaliDishes.find((d) => d.id === id);
      return acc + (dish ? dish.roasBoost : 0);
    }, 0)
  ).toFixed(1);

  // Retainers
  const discountMultiplier = billingCycle === "quarterly" ? 0.85 : 1.0;

  const retainers = [
    {
      id: "spark",
      name: "Desi Spark",
      hindi: "ग्रोथ स्टार्टर",
      badge: "Emerging Brands",
      price: Math.floor(75000 * discountMultiplier),
      desc: "Essential high-impact foundation for ambitious brands launching or breaking past ₹10L/mo revenue.",
      features: [
        "Meta Ads Architecture (Meta Advantage+)",
        "Weekly Creative Refreshes (4 Ads/mo)",
        "Brand Identity Polish & Ad Creatives",
        "Bi-weekly Strategy Call & War-Room",
        "Dedicated WhatsApp Account Lead",
      ],
      isPopular: false,
    },
    {
      id: "shahi",
      name: "Shahi Growth",
      hindi: "शाही ग्रोथ (Most Popular)",
      badge: "✦ MOST POPULAR DARBAR ✦",
      price: Math.floor(175000 * discountMultiplier),
      desc: "Our flagship full-funnel offensive. Omnichannel ad scaling, viral content machine, and ruthless CRO.",
      features: [
        "Full-Funnel Meta + Google Search & Shopping",
        "12 Viral Reels/mo (Scripting, Edit, Audio)",
        "Landing Page Conversion Rate Optimization",
        "Technical SEO & Google Maps Domination",
        "Daily Bid Optimization & Creative Testing",
        "Priority 24/7 Strategy War-Room",
      ],
      isPopular: true, // Von Restorff effect
    },
    {
      id: "maharaja",
      name: "Maharaja Dominance",
      hindi: "महाराजा डोमिनेंस (Full-Stack)",
      badge: "Enterprise & Scale",
      price: Math.floor(350000 * discountMultiplier),
      desc: "Full-service digital agency takeover. Custom WebGL/Next.js infrastructure, celebrity PR, and ruthless scale.",
      features: [
        "Omnichannel Ad Domination (Meta, Google, YouTube)",
        "Custom Next.js / 3D Web Architectural Build",
        "Influencer Darbar (Creator Matchmaking)",
        "Complete 'Brand Granth' Book & Packaging",
        "Principal Creative Director Dedicated Lead",
        "Uncapped Ad Spend Scaling Architecture",
      ],
      isPopular: false,
    },
  ];

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleThaliWhatsApp = () => {
    sound.playChime();
    const dishNames = selectedDishes
      .map((id) => thaliDishes.find((d) => d.id === id)?.name)
      .join(", ");

    const text = encodeURIComponent(
      `Pranam Desi Muchads! 🙏\n\nI built a Custom Marketing Thali on your website:\n` +
        `✦ Selected Modules: ${dishNames}\n` +
        `✦ Monthly Investment: ${formatINR(thaliInvestment)}\n` +
        `✦ Projected Team Hours Saved: ${thaliHoursSaved} hrs/mo\n` +
        `✦ Estimated ROAS Multiplier: ${thaliRoas}x\n\n` +
        `Let's schedule a Baithak to lock in this custom stack! 〰️`
    );
    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
  };

  return (
    <section id="pricing" className="relative py-28 sm:py-36 bg-[#0e164c] text-white overflow-hidden border-t border-white/10">
      {/* Background ambient gold vignette */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] rounded-full bg-[#E11D48]/10 blur-[160px] pointer-events-none" />

      <SectionDivider label="PRICING & PACKAGES" sublabel="HISAB-KITAB WITH ZERO GHOSTING" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#F7F1E5]">
            Transparent Retainers.{" "}
            <span className="brass-gradient-text block mt-1">
              Custom Marketing Thali.
            </span>
          </h2>
          <p className="mt-4 text-[#F7F1E5]/75 text-sm sm:text-base">
            Choose our battle-tested all-in-one growth retainers, or build your own custom marketing platter tailored to your exact balance of firepower.
          </p>

          {/* Mode Switcher: Retainers vs Build-A-Thali */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-[#141829] border border-[#D4AF37]/30 shadow-lg">
            <button
              type="button"
              onClick={() => {
                sound.playPluck(150);
                setMode("retainers");
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
                mode === "retainers"
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0D0C12] shadow-md"
                  : "text-[#F7F1E5]/70 hover:text-white"
              }`}
            >
              Ready-Made Retainers (3 Tiers)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playPluck(180);
                setMode("thali");
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                mode === "thali"
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0D0C12] shadow-md"
                  : "text-[#F7F1E5]/70 hover:text-white"
              }`}
            >
              <span>Build Your Marketing Thali</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#E11D48] text-[9px] text-white font-extrabold uppercase">
                Custom
              </span>
            </button>
          </div>
        </div>

        {/* MODE A: 3-TIER RETAINERS */}
        {mode === "retainers" && (
          <div>
            {/* Monthly vs. Quarterly Toggle */}
            <div className="flex items-center justify-center gap-3 mb-12 font-mono text-xs">
              <span className={billingCycle === "monthly" ? "text-[#F5DE88] font-bold" : "text-white/60"}>
                Monthly Billing
              </span>
              <button
                type="button"
                onClick={() => {
                  sound.playPluck(140);
                  setBillingCycle(billingCycle === "monthly" ? "quarterly" : "monthly");
                }}
                className="w-12 h-6 rounded-full bg-[#141829] border border-[#D4AF37]/40 p-0.5 transition-colors relative"
              >
                <div
                  className={`w-4 h-4 rounded-full bg-[#D4AF37] transition-transform ${
                    billingCycle === "quarterly" ? "translate-x-6 bg-[#0D9488]" : "translate-x-0.5"
                  }`}
                />
              </button>
              <div className="flex items-center gap-1.5">
                <span className={billingCycle === "quarterly" ? "text-[#0D9488] font-bold" : "text-white/60"}>
                  Quarterly Commitment
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#0D9488]/20 border border-[#0D9488]/40 text-[#14B8A6] text-[10px] font-bold">
                  SAVE 15%
                </span>
              </div>
            </div>

            {/* 3 Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {retainers.map((tier) => {
                return (
                  <div
                    key={tier.id}
                    onMouseEnter={() => sound.playPluck(110)}
                    className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl ${
                      tier.isPopular
                        ? "bg-[#161B30] border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.25)] lg:-translate-y-3"
                        : "bg-[#141829]/60 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50"
                    }`}
                  >
                    {/* Filigree corner brackets */}
                    <div className="absolute top-3 left-3 opacity-30">
                      <FiligreeCorner className="w-4 h-4 text-[#D4AF37]" position="top-left" />
                    </div>
                    <div className="absolute top-3 right-3 opacity-30">
                      <FiligreeCorner className="w-4 h-4 text-[#D4AF37]" position="top-right" />
                    </div>

                    {/* Popular Highlight Stamp (Von Restorff Effect) */}
                    {tier.isPopular && (
                      <div className="absolute -top-3.5 inset-x-0 mx-auto w-max px-4 py-1 rounded-full bg-gradient-to-r from-[#E11D48] to-[#C84B31] text-white font-mono text-[10px] font-extrabold tracking-widest uppercase shadow-md flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>{tier.badge}</span>
                      </div>
                    )}

                    <div>
                      {/* Tier Name & Subtitle */}
                      <div className="mb-4 pt-2">
                        <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest block mb-1">
                          {tier.hindi}
                        </span>
                        <h3 className="font-display font-extrabold text-2xl text-[#F7F1E5]">
                          {tier.name}
                        </h3>
                      </div>

                      {/* Pricing */}
                      <div className="my-6 pb-6 border-b border-[#D4AF37]/15">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-display font-extrabold text-[#F5DE88]">
                            {formatINR(tier.price)}
                          </span>
                          <span className="text-xs font-mono text-white/60">/ month</span>
                        </div>
                        <p className="text-xs text-[#F7F1E5]/70 mt-3 leading-relaxed">
                          {tier.desc}
                        </p>
                      </div>

                      {/* Features List */}
                      <div className="space-y-3 mb-8">
                        <span className="text-[11px] font-mono tracking-widest text-[#D4AF37]/80 uppercase block font-semibold">
                          What&apos;s Included:
                        </span>
                        {tier.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-[#F7F1E5]/90 font-mono">
                            <Check className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => {
                        sound.playChime();
                        onOpenKundli();
                      }}
                      className={`w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                        tier.isPopular
                          ? "bg-gradient-to-r from-[#E11D48] to-[#C84B31] text-white shadow-[0_0_20px_rgba(225,29,72,0.5)] hover:shadow-[0_0_30px_rgba(225,29,72,0.8)]"
                          : "bg-[#D4AF37] hover:bg-[#F5DE88] text-[#0D0C12]"
                      }`}
                    >
                      <span>Deploy {tier.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE B: "BUILD YOUR OWN MARKETING THALI" PLATTER */}
        {mode === "thali" && (
          <div className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-[#141829]/70 border border-[#D4AF37]/40 backdrop-blur-2xl shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
                DESI MUCHADS MARKETING THALI
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F7F1E5]">
                Pick Your Katoris (Modular Weapons)
              </h3>
              <p className="text-xs text-[#F7F1E5]/70 mt-2">
                Click to add or remove services from your platter. Watch your monthly cost, team hours saved, and estimated ROAS adjust in real time.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Modular Thali Dishes (7 cols) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {thaliDishes.map((dish) => {
                  const isSelected = selectedDishes.includes(dish.id);
                  return (
                    <div
                      key={dish.id}
                      onClick={() => toggleDish(dish.id)}
                      className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? "border-[#D4AF37] bg-[#D4AF37]/15 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                          : "border-[#D4AF37]/20 bg-[#0D0C12]/60 hover:border-[#D4AF37]/40"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-royal text-xs text-[#D4AF37]">
                            {dish.hindi}
                          </span>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                              isSelected
                                ? "bg-[#D4AF37] text-[#0D0C12]"
                                : "border border-[#D4AF37]/30 text-white/40"
                            }`}
                          >
                            {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                          </div>
                        </div>

                        <h4 className="font-display font-bold text-sm text-[#F7F1E5] mb-1">
                          {dish.name}
                        </h4>
                        <p className="text-[11px] text-[#F7F1E5]/70 leading-relaxed mb-4">
                          {dish.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between font-mono text-xs">
                        <span className="text-[#F5DE88] font-bold">
                          {formatINR(dish.basePrice)}/mo
                        </span>
                        <span className="text-[10px] text-[#0D9488]">
                          +{dish.hoursSaved}h saved
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Visual Brass Thali Platter Summary (5 cols) */}
              <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#161B30] to-[#0D0C12] border border-[#D4AF37]/50 shadow-inner flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20 mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                      THALI SUMMARY
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#F5DE88] text-xs font-mono font-bold">
                      {selectedDishes.length} Items Selected
                    </span>
                  </div>

                  {/* Computed Investment Highlight */}
                  <div className="p-5 rounded-2xl bg-[#0D0C12]/90 border border-[#D4AF37]/30 text-center mb-6">
                    <span className="font-mono text-xs text-[#F7F1E5]/60 uppercase tracking-wider block mb-1">
                      Monthly Thali Investment
                    </span>
                    <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#F5DE88]">
                      {formatINR(thaliInvestment)}
                    </div>
                    <span className="text-[11px] font-mono text-[#0D9488] mt-1 block">
                      ✦ Flexible Month-to-Month • No Lock-in
                    </span>
                  </div>

                  {/* Impact Stats */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#141829]/60 border border-[#D4AF37]/15 font-mono text-xs">
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="w-4 h-4 text-[#D4AF37]" />
                        <span>Estimated Team Hours Saved</span>
                      </div>
                      <span className="font-bold text-[#F7F1E5]">
                        ~{thaliHoursSaved} hrs/mo
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#141829]/60 border border-[#D4AF37]/15 font-mono text-xs">
                      <div className="flex items-center gap-2 text-white/80">
                        <TrendingUp className="w-4 h-4 text-[#0D9488]" />
                        <span>Projected Blended ROAS</span>
                      </div>
                      <span className="font-bold text-[#0D9488]">
                        {thaliRoas}x Return
                      </span>
                    </div>
                  </div>
                </div>

                {/* Send Custom Thali via WhatsApp */}
                <button
                  onClick={handleThaliWhatsApp}
                  disabled={selectedDishes.length === 0}
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#075E54] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:shadow-[0_0_35px_rgba(37,211,102,0.7)] transition-all flex items-center justify-center gap-2.5 disabled:opacity-40"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Lock In Custom Thali → WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

