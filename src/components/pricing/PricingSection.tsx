"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  Sparkles,
  ArrowRight,
  Plus,
  Clock,
  Layers,
  MessageCircle,
  Palette,
  Search,
  Share2,
  Code2,
  Crown,
  MinusCircle,
  ShoppingBag,
  Table2,
  ChevronDown,
} from "lucide-react";
import { SectionDivider } from "@/components/common/SectionDivider";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { useProposal, formatCartInr } from "@/context/AgencyProposalContext";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import {
  SERVICE_PRICING_CATEGORIES,
  CUSTOM_BUNDLE_MODULES,
  ServiceCategoryId,
  ServicePricingCategory,
} from "@/data/pricingData";

interface PricingSectionProps {
  onOpenKundli: () => void;
  variant?: "home" | "full";
}

const CATEGORY_ICONS: Record<
  ServiceCategoryId,
  React.ComponentType<{ className?: string }>
> = {
  "graphics-designing": Palette,
  "seo-management": Search,
  "social-media-management": Share2,
  "website-development": Code2,
  branding: Crown,
};

export function PricingSection({
  onOpenKundli,
  variant = "full",
}: PricingSectionProps) {
  const { cartItems, cartCount, openCart, addToCart, addManyToCart } =
    useProposal();
  const isHome = variant === "home";
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | ServiceCategoryId
  >(isHome ? "graphics-designing" : "all");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">(
    "monthly"
  );
  const [mode, setMode] = useState<"tiers" | "bundle">("tiers");
  const [currency, setCurrency] = useState<"INR" | "USD" | "AED">("INR");
  const [expandedTables, setExpandedTables] = useState<
    Record<string, boolean>
  >({
    "graphics-designing": true,
  });
  const [recentAddedToast, setRecentAddedToast] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [selectedModules, setSelectedModules] = useState<ServiceCategoryId[]>([
    "graphics-designing",
    "social-media-management",
  ]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const showQuickAddToast = (label: string) => {
    setRecentAddedToast(label);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setRecentAddedToast(null);
    }, 2800);
  };

  const formatPrice = (inrVal: number) => {
    if (currency === "USD") {
      const usdVal = Math.max(15, Math.round(inrVal * 0.0125));
      return `$${usdVal.toLocaleString("en-US")}`;
    }
    if (currency === "AED") {
      const aedVal = Math.max(55, Math.round(inrVal * 0.046));
      return `AED ${aedVal.toLocaleString("en-US")}`;
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(inrVal);
  };

  const getAdjustedPrice = (rawInr: number, isMonthly: boolean) => {
    if (!isMonthly || billingCycle === "monthly") return rawInr;
    return Math.round(rawInr * 0.85);
  };

  const toggleBundleModule = (id: ServiceCategoryId) => {
    haptics.selection();
    sound.playPluck(145);
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleCompareTable = (catId: string) => {
    haptics.selection();
    sound.playPluck(155);
    setExpandedTables((prev) => ({
      ...prev,
      [catId]: !(prev[catId] ?? selectedCategory !== "all"),
    }));
  };

  const visibleCategories: ServicePricingCategory[] =
    selectedCategory === "all"
      ? SERVICE_PRICING_CATEGORIES
      : SERVICE_PRICING_CATEGORIES.filter((cat) => cat.id === selectedCategory);

  const selectedModuleObjs = CUSTOM_BUNDLE_MODULES.filter((m) =>
    selectedModules.includes(m.id)
  );
  const rawBundleTotal = selectedModuleObjs.reduce(
    (sum, item) => sum + item.basePriceInr,
    0
  );
  const bundleDiscountRate =
    selectedModuleObjs.length >= 4
      ? 0.15
      : selectedModuleObjs.length >= 2
      ? 0.1
      : 0;
  const finalBundleTotal = Math.round(
    rawBundleTotal * (1 - bundleDiscountRate)
  );

  const cartEstimateInr = cartItems.reduce(
    (sum, item) => sum + item.priceInr * item.quantity,
    0
  );

  const handleAddBundleToCart = () => {
    if (selectedModuleObjs.length === 0) return;
    haptics.success();
    sound.playChime();
    addManyToCart(
      selectedModuleObjs.map((mod) => {
        const discountedPrice = Math.round(
          mod.basePriceInr * (1 - bundleDiscountRate)
        );
        const isRecurring = mod.billingNote.toLowerCase().includes("monthly");
        return {
          id: `bundle-${mod.id}`,
          categoryTitle: mod.name,
          tierCode: "BUNDLE",
          tierName:
            bundleDiscountRate > 0
              ? `Custom Combo (-${Math.round(bundleDiscountRate * 100)}%)`
              : "Custom Starter Module",
          priceInr: discountedPrice,
          basePriceInr: mod.basePriceInr,
          billingUnit: isRecurring ? "/ mo" : "/ project",
          billingCycleLabel: isRecurring ? "Monthly Bundle" : "One-Time Bundle",
          outputBadge: mod.impactMetric,
        };
      }),
      { openDrawer: true }
    );
  };

  return (
    <section
      id="pricing"
      className={`relative bg-transparent text-white overflow-hidden scroll-mt-24 ${
        isHome ? "py-20 sm:py-28 border-t border-white/10" : "py-10 sm:py-16"
      }`}
    >
      {/* Subtle Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 -right-32 w-[460px] h-[460px] rounded-full bg-emerald-500/[0.04] blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-32 w-[460px] h-[460px] rounded-full bg-white/[0.03] blur-[140px]" />

      {isHome && <SectionDivider />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4">
        {/* Top Heading & Control Bar */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-[1.08]">
            {isHome ? (
              <>
                Clear Service Pricing.{" "}
                <span className="text-zinc-400">Four Tiers Per Service.</span>
              </>
            ) : (
              <>
                5 Core Services.{" "}
                <span className="text-zinc-400">20 Flexible Plans.</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
            Choose a dedicated tier for Graphics Designing, SEO Management, Social Media Management, Website Development, or Branding—lower tiers include focused essentials and scale seamlessly as your goals expand.
          </p>

          {/* Mode Toggle */}
          <div className="mt-7 inline-flex flex-col sm:flex-row items-center p-1 rounded-2xl sm:rounded-full bg-[#111114] border border-white/15 shadow-xl max-w-full gap-1 sm:gap-0">
            <button
              type="button"
              onClick={() => {
                haptics.selection();
                sound.playPluck(150);
                setMode("tiers");
              }}
              className={`w-full sm:w-auto px-5 py-2.5 min-h-[42px] rounded-xl sm:rounded-full text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                mode === "tiers"
                  ? "bg-white text-black shadow-md font-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Service Plans (4 Tiers Each)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                haptics.selection();
                sound.playPluck(180);
                setMode("bundle");
              }}
              className={`w-full sm:w-auto px-5 py-2.5 min-h-[42px] rounded-xl sm:rounded-full text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                mode === "bundle"
                  ? "bg-white text-black shadow-md font-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>Build Custom Bundle</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-extrabold uppercase">
                Save 15%
              </span>
            </button>
          </div>
        </div>

        {/* MODE 1: SEPARATE 5-DISCIPLINE 4-TIER PRICING LISTS */}
        {mode === "tiers" && (
          <div>
            {/* Billing & Currency Utility Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10 font-mono text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={
                    billingCycle === "monthly"
                      ? "text-white font-bold"
                      : "text-zinc-500"
                  }
                >
                  Monthly
                </span>
                <button
                  type="button"
                  onClick={() => {
                    haptics.light();
                    sound.playPluck(140);
                    setBillingCycle((prev) =>
                      prev === "monthly" ? "quarterly" : "monthly"
                    );
                  }}
                  className="w-12 h-6 rounded-full bg-zinc-800 border border-white/20 p-0.5 transition-colors relative flex items-center touch-hit-expand cursor-pointer"
                  aria-label="Toggle Monthly or Quarterly Billing"
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      billingCycle === "quarterly"
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    }`}
                  />
                </button>
                <div className="flex items-center gap-1.5">
                  <span
                    className={
                      billingCycle === "quarterly"
                        ? "text-white font-bold"
                        : "text-zinc-500"
                    }
                  >
                    Quarterly (Monthly Plans)
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                    -15% OFF
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center p-0.5 rounded-lg bg-[#111114] border border-white/15">
                {(["INR", "USD", "AED"] as const).map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => {
                      haptics.selection();
                      sound.playPluck(165);
                      setCurrency(curr);
                    }}
                    className={`px-3 py-1.5 min-h-[36px] rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      currency === curr
                        ? "bg-white text-black font-black"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {curr === "INR" ? "INR ₹" : curr === "USD" ? "USD $" : "AED"}
                  </button>
                ))}
              </div>
            </div>

            {/* Upgraded Category Switcher Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-9">
              <button
                type="button"
                onClick={() => {
                  haptics.selection();
                  sound.playPluck(135);
                  setSelectedCategory("all");
                }}
                className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between min-h-[96px] cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                    : "bg-[#0e0e12] text-white border-white/12 hover:border-white/35"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <Layers
                    className={`w-4 h-4 ${
                      selectedCategory === "all" ? "text-black" : "text-zinc-400"
                    }`}
                  />
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      selectedCategory === "all"
                        ? "bg-black/10 text-black"
                        : "bg-white/10 text-zinc-400"
                    }`}
                  >
                    20 Tiers
                  </span>
                </div>
                <div className="mt-2">
                  <div className="font-display font-black text-xs sm:text-sm uppercase tracking-tight">
                    All 5 Services
                  </div>
                  <div
                    className={`text-[11px] font-sans mt-0.5 line-clamp-1 ${
                      selectedCategory === "all"
                        ? "text-zinc-700"
                        : "text-zinc-400"
                    }`}
                  >
                    Full service overview
                  </div>
                </div>
              </button>

              {SERVICE_PRICING_CATEGORIES.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.id];
                const isActive = selectedCategory === cat.id;
                const startRate = formatPrice(
                  getAdjustedPrice(
                    cat.startingPriceInr,
                    cat.billingType === "monthly"
                  )
                );
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      haptics.selection();
                      sound.playPluck(155);
                      setSelectedCategory(cat.id);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between min-h-[96px] cursor-pointer ${
                      isActive
                        ? "bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                        : "bg-[#0e0e12] text-white border-white/12 hover:border-white/35"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? "text-black" : "text-emerald-400"
                        }`}
                      />
                      <span
                        className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded truncate ${
                          isActive
                            ? "bg-black/10 text-black"
                            : "bg-emerald-500/10 text-emerald-400"
                        }`}
                      >
                        From {startRate}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="font-display font-black text-xs sm:text-sm uppercase tracking-tight leading-tight">
                        {cat.title}
                      </div>
                      <div
                        className={`text-[11px] font-sans mt-0.5 line-clamp-1 ${
                          isActive ? "text-zinc-700" : "text-zinc-400"
                        }`}
                      >
                        {cat.highlightSummary}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Inline Quick-Add Toast Notification */}
            {recentAddedToast && (
              <div className="mb-6 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-200 font-mono text-xs flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Added <strong className="text-white">{recentAddedToast}</strong> to Service Cart.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={openCart}
                  className="px-3 py-1.5 rounded-lg bg-white text-black font-black uppercase text-[10px] tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Open Cart &amp; Send WhatsApp →
                </button>
              </div>
            )}

            {/* Category Pricing Sections (Separate 4-Tier Grids + Comparison Matrix) */}
            <div className="space-y-12 sm:space-y-14">
              {visibleCategories.map((category) => {
                const CategoryIcon = CATEGORY_ICONS[category.id];
                const isMonthly = category.billingType === "monthly";
                const categoryStartPrice = getAdjustedPrice(
                  category.startingPriceInr,
                  isMonthly
                );
                const isCompareExpanded =
                  expandedTables[category.id] ?? selectedCategory !== "all";

                return (
                  <div
                    key={category.id}
                    id={`pricing-${category.id}`}
                    className="rounded-3xl p-4 sm:p-6 lg:p-8 bg-[#0b0b0e] border border-white/12 shadow-2xl scroll-mt-28"
                  >
                    {/* Clean Category Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 mb-7 border-b border-white/10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center shrink-0">
                          <CategoryIcon className="w-4 h-4 text-emerald-400" />
                        </div>
                        <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                          {category.title}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                        <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 font-mono text-xs font-bold text-emerald-400">
                          From {formatPrice(categoryStartPrice)}
                          {isMonthly ? " / mo" : " fixed project"}
                        </span>

                        <button
                          type="button"
                          onClick={() => toggleCompareTable(category.id)}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 font-mono text-xs text-zinc-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Table2 className="w-3.5 h-3.5 text-zinc-300" />
                          <span>Compare Tiers</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform ${
                              isCompareExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* 4 Progressive Tier Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 items-stretch">
                      {category.tiers.map((tier) => {
                        const discountedInr = getAdjustedPrice(
                          tier.priceInr,
                          isMonthly
                        );
                        const hasDiscount =
                          isMonthly && billingCycle === "quarterly";
                        const formattedCurrent = formatPrice(discountedInr);
                        const formattedBase = formatPrice(tier.priceInr);
                        const cartEntry = cartItems.find((c) => c.id === tier.id);
                        const isInCart = !!cartEntry;
                        const billingCycleLabel = isMonthly
                          ? billingCycle === "quarterly"
                            ? "Quarterly (-15%)"
                            : "Monthly"
                          : "One-Time Project";

                        const handleSelectAndOpenCart = () => {
                          haptics.success();
                          sound.playChime();
                          if (isInCart) {
                            openCart();
                            return;
                          }
                          addToCart(
                            {
                              id: tier.id,
                              categoryTitle: category.title,
                              tierCode: tier.tierCode,
                              tierName: tier.name,
                              priceInr: discountedInr,
                              basePriceInr: tier.priceInr,
                              billingUnit: tier.billingUnit,
                              billingCycleLabel,
                              outputBadge: tier.outputBadge,
                            },
                            { openDrawer: true }
                          );
                        };

                        const handleQuickAddInPlace = () => {
                          haptics.selection();
                          sound.playPluck(170);
                          addToCart(
                            {
                              id: tier.id,
                              categoryTitle: category.title,
                              tierCode: tier.tierCode,
                              tierName: tier.name,
                              priceInr: discountedInr,
                              basePriceInr: tier.priceInr,
                              billingUnit: tier.billingUnit,
                              billingCycleLabel,
                              outputBadge: tier.outputBadge,
                            },
                            { openDrawer: false, incrementIfExists: true }
                          );
                          showQuickAddToast(`${category.title} — ${tier.name}`);
                        };

                        return (
                          <SpotlightCard
                            key={tier.id}
                            spotlightColor={
                              tier.isPopular
                                ? "rgba(16, 185, 129, 0.14)"
                                : "rgba(255, 255, 255, 0.06)"
                            }
                            borderColor={
                              tier.isPopular
                                ? "rgba(255, 255, 255, 0.55)"
                                : "rgba(255, 255, 255, 0.16)"
                            }
                            maxTilt={2.5}
                            onMouseEnter={() =>
                              sound.playPluck(115 + tier.scopeLevel * 12)
                            }
                            className={`relative rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 ${
                              tier.isPopular
                                ? "bg-[#131418] border-2 border-white/70 shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
                                : "bg-[#101014] border border-white/12 hover:border-white/30"
                            }`}
                          >
                            <div>
                              {/* Top Tier Code + Scope Intensity Meter */}
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                                  {tier.tierCode} · {tier.tierLabel}
                                </span>

                                <div
                                  className="flex items-center gap-1"
                                  title={`Scope level ${tier.scopeLevel} of 4`}
                                >
                                  {[1, 2, 3, 4].map((lvl) => (
                                    <span
                                      key={lvl}
                                      className={`h-1.5 w-3.5 rounded-full transition-colors ${
                                        lvl <= tier.scopeLevel
                                          ? tier.isPopular
                                            ? "bg-emerald-400"
                                            : "bg-white"
                                          : "bg-white/15"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* Aligned Tier Name Row */}
                              <div className="flex items-start justify-between gap-2 mb-3 min-h-[44px]">
                                <h4 className="font-display font-black text-lg text-white uppercase tracking-tight leading-snug">
                                  {tier.name}
                                </h4>
                                {tier.isPopular && (
                                  <span className="px-2 py-0.5 rounded-full bg-white text-black font-mono text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0 mt-0.5">
                                    <Sparkles className="w-2.5 h-2.5 fill-black" />
                                    <span>POPULAR</span>
                                  </span>
                                )}
                              </div>

                              {/* Output Cap & Turnaround Chips */}
                              <div className="flex flex-wrap items-center gap-1.5 mb-4">
                                <span className="px-2 py-0.5 rounded bg-white/[0.07] border border-white/10 font-mono text-[10px] font-bold text-zinc-200">
                                  {tier.outputBadge}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 font-mono text-[10px] text-zinc-400">
                                  {tier.turnaround}
                                </span>
                              </div>

                              {/* Price Row */}
                              <div className="mb-4 pb-4 border-b border-white/10">
                                <div className="flex items-baseline gap-1.5 flex-wrap">
                                  <span className="text-2xl sm:text-3xl font-metric font-black text-white tracking-tight">
                                    {formattedCurrent}
                                  </span>
                                  <span className="text-[11px] font-mono text-zinc-400">
                                    {tier.billingUnit}
                                  </span>
                                  {hasDiscount && (
                                    <span className="text-xs font-mono text-zinc-500 line-through ml-1">
                                      {formattedBase}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Included Deliverables */}
                              <ul className="space-y-2 mb-5">
                                {tier.deliverables.map((item, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2 text-xs text-zinc-200 font-sans leading-snug"
                                  >
                                    <Check
                                      className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                        tier.isPopular
                                          ? "text-emerald-400"
                                          : "text-white/75"
                                      }`}
                                    />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-2.5 pt-2">
                              {/* Scope Limitation Callout for Entry / Lower Tiers */}
                              {tier.excludedNote && (
                                <div className="px-2.5 py-2 rounded-lg bg-white/[0.02] border border-dashed border-white/15 flex items-start gap-1.5 text-[10px] font-mono text-zinc-500 leading-snug">
                                  <MinusCircle className="w-3 h-3 shrink-0 mt-0.5 text-zinc-500" />
                                  <span>{tier.excludedNote}</span>
                                </div>
                              )}

                              {/* Primary Add-to-Cart CTA + Quick Stack Add Button */}
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={handleSelectAndOpenCart}
                                  className={`flex-1 py-2.5 px-3 rounded-xl font-mono font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95 min-h-[40px] cursor-pointer ${
                                    isInCart
                                      ? "bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/50 text-emerald-300 font-black"
                                      : tier.isPopular
                                      ? "bg-white hover:bg-zinc-200 text-black font-black shadow-[0_0_20px_rgba(255,255,255,0.22)]"
                                      : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                                  }`}
                                >
                                  {isInCart ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 shrink-0" />
                                      <span>In Cart ({cartEntry.quantity}) · View</span>
                                    </>
                                  ) : (
                                    <>
                                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                                      <span>Select &amp; Add to Cart</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={handleQuickAddInPlace}
                                  title={`Quick-add ${category.title} — ${tier.name} to Cart`}
                                  aria-label={`Quick-add ${category.title} ${tier.name} to cart`}
                                  className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/15 border border-white/15 text-white transition-all active:scale-95 min-h-[40px] min-w-[40px] flex items-center justify-center shrink-0 cursor-pointer"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </SpotlightCard>
                        );
                      })}
                    </div>

                    {/* Side-by-Side 4-Tier Comparison Table */}
                    {isCompareExpanded && (
                      <div className="mt-7 pt-6 border-t border-white/10 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                            {category.title} — Side-by-Side Tier Comparison
                          </span>
                          <span className="font-mono text-[10px] text-zinc-500 hidden sm:inline">
                            Scroll horizontally on smaller screens if needed
                          </span>
                        </div>

                        <div className="rounded-2xl border border-white/12 overflow-x-auto bg-[#08080a]">
                          <table className="w-full min-w-[640px] text-left border-collapse">
                            <thead>
                              <tr className="border-b border-white/10 bg-white/[0.03] font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                                <th className="py-3 px-4 font-bold">Deliverable / Feature</th>
                                {category.tiers.map((tier) => (
                                  <th
                                    key={tier.id}
                                    className={`py-3 px-4 font-bold ${
                                      tier.isPopular
                                        ? "bg-white/[0.06] text-white"
                                        : "text-zinc-200"
                                    }`}
                                  >
                                    <div className="flex items-center gap-1.5">
                                      <span>{tier.name}</span>
                                      {tier.isPopular && (
                                        <span className="px-1.5 py-0.5 rounded bg-white text-black text-[9px] font-black">
                                          POPULAR
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[10px] text-emerald-400 font-bold mt-0.5">
                                      {formatPrice(
                                        getAdjustedPrice(tier.priceInr, isMonthly)
                                      )}{" "}
                                      {tier.billingUnit}
                                    </div>
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.07] text-xs font-sans">
                              {category.comparisonRows.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-white/[0.02]">
                                  <td className="py-3 px-4 font-mono text-[11px] font-semibold text-zinc-400">
                                    {row.feature}
                                  </td>
                                  {row.values.map((val, vIdx) => (
                                    <td
                                      key={vIdx}
                                      className={`py-3 px-4 ${
                                        category.tiers[vIdx]?.isPopular
                                          ? "bg-white/[0.04] text-white font-medium"
                                          : "text-zinc-300"
                                      }`}
                                    >
                                      {val}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                              <tr className="bg-white/[0.02]">
                                <td className="py-3 px-4 font-mono text-[11px] text-zinc-500">
                                  Quick Select
                                </td>
                                {category.tiers.map((tier) => {
                                  const tPrice = getAdjustedPrice(
                                    tier.priceInr,
                                    isMonthly
                                  );
                                  const inCart = cartItems.some(
                                    (c) => c.id === tier.id
                                  );
                                  return (
                                    <td
                                      key={tier.id}
                                      className={`py-3 px-4 ${
                                        tier.isPopular ? "bg-white/[0.04]" : ""
                                      }`}
                                    >
                                      <button
                                        type="button"
                                        onClick={() => {
                                          haptics.selection();
                                          sound.playChime();
                                          if (inCart) {
                                            openCart();
                                            return;
                                          }
                                          addToCart(
                                            {
                                              id: tier.id,
                                              categoryTitle: category.title,
                                              tierCode: tier.tierCode,
                                              tierName: tier.name,
                                              priceInr: tPrice,
                                              basePriceInr: tier.priceInr,
                                              billingUnit: tier.billingUnit,
                                              billingCycleLabel: isMonthly
                                                ? billingCycle === "quarterly"
                                                  ? "Quarterly (-15%)"
                                                  : "Monthly"
                                                : "One-Time Project",
                                              outputBadge: tier.outputBadge,
                                            },
                                            { openDrawer: true }
                                          );
                                        }}
                                        className={`px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                          inCart
                                            ? "bg-emerald-500/20 border border-emerald-400/50 text-emerald-300"
                                            : "bg-white text-black hover:bg-zinc-200"
                                        }`}
                                      >
                                        {inCart ? "In Cart · Open" : "+ Add to Cart"}
                                      </button>
                                    </td>
                                  );
                                })}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Active Service Cart Checkout Bar */}
            {cartCount > 0 && (
              <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white text-black flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_35px_rgba(255,255,255,0.18)]">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-black uppercase tracking-widest text-zinc-600 block">
                      SERVICE CART READY FOR WHATSAPP
                    </span>
                    <p className="font-display font-black text-base sm:text-lg uppercase tracking-tight text-black">
                      {cartCount} Service{cartCount === 1 ? "" : "s"} Selected ·{" "}
                      {formatCartInr(cartEstimateInr)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    haptics.selection();
                    sound.playChime();
                    openCart();
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-black hover:bg-zinc-800 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 min-h-[44px] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Open Cart &amp; Send WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Bottom Callout Bar */}
            {isHome ? (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#111114] border border-white/15">
                <div className="text-center sm:text-left">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-bold block">
                    COMPARE ALL 5 DISCIPLINES &amp; SLA GUARANTEES
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-1">
                    Inspect all 20 tiers side-by-side or build a discounted multi-service starter bundle.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {selectedCategory !== "all" && (
                    <button
                      type="button"
                      onClick={() => {
                        haptics.selection();
                        sound.playPluck(155);
                        setSelectedCategory("all");
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all min-h-[42px] cursor-pointer"
                    >
                      Expand All 5 Here
                    </button>
                  )}
                  <Link
                    href="/pricing"
                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 min-h-[42px]"
                  >
                    <span>Full Pricing Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-3 text-left">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase tracking-wider shrink-0">
                    Flexible Scope
                  </span>
                  <span className="text-zinc-300 font-sans text-xs">
                    Start small with Tier 01 and upgrade anytime as volume grows—zero annual lock-ins or hidden agency fees.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    haptics.light();
                    sound.playChime();
                    onOpenKundli();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider shrink-0 transition-all active:scale-95 min-h-[40px] cursor-pointer"
                >
                  Request Custom Quote &gt;
                </button>
              </div>
            )}
          </div>
        )}

        {/* MODE 2: CUSTOM ACCESSIBLE BUNDLE BUILDER */}
        {mode === "bundle" && (
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 bg-[#0d0d11] border border-white/15 shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                Assemble Your Lean Service Combo
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-sans">
                Pick 2+ services to unlock 10% off, or 4+ services for 15% bundle savings.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CUSTOM_BUNDLE_MODULES.map((mod) => {
                  const isSelected = selectedModules.includes(mod.id);
                  const Icon = CATEGORY_ICONS[mod.id];
                  return (
                    <button
                      type="button"
                      key={mod.id}
                      onClick={() => toggleBundleModule(mod.id)}
                      className={`text-left cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? "border-white bg-white/10 shadow-[0_0_25px_rgba(255,255,255,0.12)]"
                          : "bg-[#121216] border-white/12 hover:border-white/30"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                            <Icon className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{mod.billingNote}</span>
                          </span>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                              isSelected
                                ? "bg-white text-black"
                                : "border border-white/20 text-white/40"
                            }`}
                          >
                            {isSelected ? (
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            ) : (
                              <Plus className="w-3.5 h-3.5" />
                            )}
                          </div>
                        </div>

                        <h4 className="font-display font-bold text-base text-white mb-1">
                          {mod.name}
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-4 font-sans">
                          {mod.deliverableSummary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs w-full">
                        <span className="text-white font-bold">
                          From {formatPrice(mod.basePriceInr)}
                        </span>
                        <span className="text-[10px] text-emerald-400">
                          {mod.impactMetric}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-5 rounded-2xl p-6 sm:p-7 bg-[#121216] border border-white/15 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
                      COMBO ESTIMATE
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono font-bold">
                      {selectedModuleObjs.length} Selected
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0a0a0c] border border-white/15 text-center mb-5">
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                      Estimated Starting Combo Total
                    </span>
                    <div className="text-3xl sm:text-4xl font-metric font-black text-white">
                      {formatPrice(finalBundleTotal)}
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 mt-1 block">
                      {bundleDiscountRate > 0
                        ? `✦ ${Math.round(bundleDiscountRate * 100)}% Multi-Service Bundle Savings Applied`
                        : "Select 2+ items to unlock up to 15% bundle discount"}
                    </span>
                  </div>

                  <div className="space-y-2.5 mb-6 font-mono text-xs">
                    {selectedModuleObjs.length > 0 ? (
                      selectedModuleObjs.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10"
                        >
                          <span className="text-zinc-200 truncate pr-2">
                            {item.name}
                          </span>
                          <span className="font-bold text-white shrink-0">
                            {formatPrice(item.basePriceInr)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-dashed border-white/15 text-center text-zinc-500 flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Select at least one service on the left</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddBundleToCart}
                  disabled={selectedModuleObjs.length === 0}
                  className="w-full py-3.5 px-5 rounded-xl bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-40 min-h-[46px] cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add Bundle ({selectedModuleObjs.length}) to Cart &amp; Send WhatsApp
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
