"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  ExternalLink,
  CheckCircle2,
  Star,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Plus,
  Minus,
  Trash2,
  Clock,
  PhoneCall,
  Search,
  Sliders,
  Award,
  Zap,
  Heart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  DemoProjectConfig,
  DemoProductItem,
  HerbInfoItem,
  BreedInfoItem,
  FinishInfoItem,
  MandiInfoItem,
} from "@/data/demoProductsData";
import { sound } from "@/lib/sound";

interface DemoStorefrontClientProps {
  config: DemoProjectConfig;
}

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  qty: number;
  image: string;
}

export function DemoStorefrontClient({ config }: DemoStorefrontClientProps) {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState<string>("");

  // Search & Category filter
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Interactive Widget States
  // EV Calculator
  const [evFleetSize, setEvFleetSize] = useState<number>(
    config.interactiveData?.defaultFleetSize || 15
  );
  const [evDailyKm, setEvDailyKm] = useState<number>(
    config.interactiveData?.defaultDailyKm || 90
  );

  // Pet Calorie Planner
  const [petBreedIndex, setPetBreedIndex] = useState<number>(0);
  const [petWeight, setPetWeight] = useState<number>(18);

  // Snack Bundle Builder
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([
    "Smoked Peri-Peri Foxnuts",
    "Himalayan Truffle & Sea Salt",
  ]);

  // Watch Customizer
  const [watchDialIndex, setWatchDialIndex] = useState<number>(0);

  // Dark store live countdown
  const [secondsLeft, setSecondsLeft] = useState<number>(712); // ~11m 52s

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 60 ? prev - 1 : 720));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format countdown
  const formatCountdown = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  // Toast trigger
  const showToast = (msg: string) => {
    setToastMessage(msg);
    sound.playPluck(180);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add to cart
  const handleAddToCart = (product: DemoProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          qty: 1,
          image: product.image,
        },
      ];
    });
    showToast(`Added "${product.name}" to bag!`);
  };

  const handleUpdateQty = (id: string, delta: number) => {
    sound.playPluck(120);
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    sound.playPluck(80);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Cart calculations
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const freeShippingThreshold = 999;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingFee = cartSubtotal > 0 && !isFreeShipping ? 99 : 0;
  const estimatedTax = Math.round(cartSubtotal * 0.05); // 5% GST
  const grandTotal = cartSubtotal + shippingFee + estimatedTax;

  // Handle Checkout simulation
  const handleSimulateCheckout = () => {
    sound.playChime();
    const fakeRef = `DM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(fakeRef);
    setIsCheckoutSuccess(true);
    setCart([]);
  };

  // Filter products
  const categories = [
    "All",
    ...Array.from(new Set(config.products.map((p) => p.category))),
  ];

  const filteredProducts = config.products.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate EV fleet stats (based on commercial cargo 12 km/L diesel baseline)
  const monthlyDiesel = Math.round(
    (evFleetSize * evDailyKm * 30 * 94) / 12
  );
  const monthlyEvCost = Math.round(
    evFleetSize * 12499 + evFleetSize * evDailyKm * 30 * 0.035 * 8.5
  );
  const monthlyEvSavings = Math.max(0, monthlyDiesel - monthlyEvCost);

  return (
    <div
      className={`min-h-screen text-white font-sans ${config.theme.primaryBg} selection:bg-white selection:text-black relative overflow-x-hidden`}
    >
      {/* 1. TOP AGENCY PREVIEW BAR (DESI MUCHADS CHROMIUM) */}
      <div className="sticky top-0 z-50 bg-[#070709]/95 backdrop-blur-xl border-b border-white/15 px-4 py-2.5 flex items-center justify-between text-xs font-mono shadow-2xl">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-extrabold tracking-widest uppercase text-white truncate">
            LIVE CLIENT PRODUCT DEMO · {config.brandName}
          </span>
          <span className="hidden md:inline px-2 py-0.5 rounded bg-white/10 text-[10px] text-zinc-300">
            {config.domainUrl}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={`/work/${config.slug}`}
            className="px-3 py-1 rounded-md bg-white hover:bg-zinc-200 text-black font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-sm text-[11px]"
          >
            <span>CASE STUDY DOSSIER</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            href="/#karname"
            className="hidden sm:inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-[11px]"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>All Work</span>
          </Link>
        </div>
      </div>

      {/* 2. BRAND STOREFRONT HEADER */}
      <header className="px-4 sm:px-8 py-4 sm:py-6 border-b border-white/10 backdrop-blur-md bg-black/40 sticky top-10 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-display font-black text-xl sm:text-2xl tracking-tight uppercase text-white">
                {config.brandName}
              </span>
              <span
                className={`hidden md:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${config.theme.pillBg}`}
              >
                {config.categoryBadge}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-400 font-normal mt-0.5">
              {config.brandTagline}
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            {/* Search Input (Desktop) */}
            <div className="relative hidden md:block w-48 lg:w-64">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
              />
            </div>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => {
                sound.playPluck(160);
                setIsCartOpen(true);
              }}
              className="relative px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider hidden sm:inline">
                Bag
              </span>
              {cart.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-black font-mono text-[10px] font-black flex items-center justify-center animate-bounce">
                  {cart.reduce((total, item) => total + item.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SHOWCASE SECTION */}
      <section className="relative px-4 sm:px-8 pt-12 sm:pt-20 pb-16 overflow-hidden">
        {/* Glow ambient background */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b ${config.theme.heroGlow} blur-3xl pointer-events-none opacity-50`}
        />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border mb-4 ${config.theme.pillBg}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{config.hero.eyebrow}</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none mb-6">
            {config.hero.title}
          </h1>

          <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-8">
            {config.hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <a
              href="#catalog"
              className="px-8 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              <span>{config.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#interactive-demo"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all"
            >
              {config.hero.secondaryCta}
            </a>
          </div>

          {/* Real Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {config.hero.stats.map((st, sIdx) => (
              <div
                key={sIdx}
                className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-center"
              >
                <div className="font-display font-black text-xl sm:text-3xl text-white">
                  {st.val}
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider mt-1">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BESPOKE INTERACTIVE FEATURE ENGINE */}
      <section
        id="interactive-demo"
        className="px-4 sm:px-8 py-12 border-y border-white/10 bg-black/30"
      >
        <div className="max-w-5xl mx-auto">
          {/* A. EV Fleet Calculator */}
          {config.interactiveType === "calculator_ev" && (
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/80 border border-cyan-500/30 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                    INTERACTIVE B2B TOOL
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                    Commercial Fleet TCO & Fuel Savings Calculator
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-zinc-300">Fleet Size (Vehicles):</span>
                      <span className="text-cyan-400 font-bold font-metric text-sm">
                        {evFleetSize} EVs
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={evFleetSize}
                      onChange={(e) => setEvFleetSize(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-zinc-300">Daily Average Run per EV:</span>
                      <span className="text-cyan-400 font-bold font-metric text-sm">
                        {evDailyKm} km / day
                      </span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="180"
                      step="10"
                      value={evDailyKm}
                      onChange={(e) => setEvDailyKm(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono space-y-2">
                    <div className="flex justify-between text-zinc-400">
                      <span>Baseline Monthly Diesel Cost:</span>
                      <span className="text-red-400 font-bold">
                        ₹{monthlyDiesel.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>UrbanDrift Monthly Lease & Power:</span>
                      <span className="text-emerald-400 font-bold">
                        ₹{monthlyEvCost.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-black border border-cyan-500/40 text-center">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 block mb-1">
                    NET MONTHLY OPERATING SAVINGS
                  </span>
                  <div className="font-display font-black text-3xl sm:text-5xl text-white my-2">
                    ₹{monthlyEvSavings.toLocaleString("en-IN")}
                  </div>
                  <p className="text-xs text-zinc-400 mb-6">
                    Reduces carbon emissions by ~
                    {Math.round(evFleetSize * evDailyKm * 0.12)} kg CO2 daily
                  </p>
                  <button
                    onClick={() =>
                      showToast(
                        "Fleet proposal sent to enterprise sales team for instant review!"
                      )
                    }
                    className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-display font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Lock In Enterprise Fleet Lease
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* B. Canine Calorie & Nutrition Planner */}
          {config.interactiveType === "calorie_pet" && (
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/80 border border-emerald-500/30 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                    VETERINARY PRECISION TOOL
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                    Canine Breed Calorie & Fresh Meal Planner
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <label className="block text-xs font-mono text-zinc-300 uppercase">
                    Select Canine Breed Type:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {config.interactiveData?.breeds?.map(
                      (b: BreedInfoItem, bIdx: number) => (
                        <button
                          key={bIdx}
                          onClick={() => {
                            setPetBreedIndex(bIdx);
                            setPetWeight(b.avgWeight);
                          }}
                          className={`p-3 rounded-xl border text-left text-xs transition-all ${
                            petBreedIndex === bIdx
                              ? "bg-emerald-500/20 border-emerald-400 text-white font-bold"
                              : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                          }`}
                        >
                          <div className="font-semibold">{b.name}</div>
                          <div className="text-[10px] font-mono text-zinc-500">
                            Avg {b.avgWeight} kg
                          </div>
                        </button>
                      )
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-zinc-300">Exact Weight:</span>
                      <span className="text-emerald-400 font-bold">
                        {petWeight} kg
                      </span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="50"
                      value={petWeight}
                      onChange={(e) => setPetWeight(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-black border border-emerald-500/40 text-center">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 block mb-1">
                    RECOMMENDED DAILY MEAL PORTION
                  </span>
                  <div className="font-display font-black text-3xl sm:text-5xl text-white my-2">
                    {petWeight * 32}g / Day
                  </div>
                  <p className="text-xs text-zinc-400 mb-6">
                    ~{petWeight * 48} kcal · 100% gently steamed human-grade meat & veggies
                  </p>
                  <button
                    onClick={() => {
                      if (config.products[0]) {
                        handleAddToCart(config.products[0]);
                      }
                    }}
                    className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-display font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Add Custom Meal Pouch to Bag (₹649)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* C. Dark Store Countdown Timer */}
          {config.interactiveType === "darkstore_timer" && (
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/80 border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Clock className="w-7 h-7 animate-spin" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold block">
                    INSTANT DARK STORE ROUTING
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                    Doorstep Delivery Dispatch Active
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Micro-fulfillment dark store #14 connected · 2 riders on standby
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 rounded-2xl bg-black border border-amber-500/40 text-center shrink-0">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                  ESTIMATED ARRIVAL IN
                </span>
                <span className="font-metric font-black text-3xl text-amber-300 tracking-wider">
                  {formatCountdown(secondsLeft)}
                </span>
              </div>
            </div>
          )}

          {/* D. Herb Formulation & Decoction Matrix */}
          {config.interactiveType === "herb_explorer" && (
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/80 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                    PHARMACOPEIA PURITY
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                    {config.interactiveData?.title || "Ingredient & Decoction Matrix"}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {config.interactiveData?.herbs?.map(
                  (herb: HerbInfoItem, hIdx: number) => (
                    <div
                      key={hIdx}
                      className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-white/30 transition-all text-left"
                    >
                      <div className="font-display font-bold text-sm text-white mb-1">
                        {herb.name}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase mb-2">
                        {herb.part} · {herb.decoctionTime}
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                        {herb.benefit}
                      </p>
                      <span className="inline-block px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-zinc-300">
                        {herb.potency}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* E. Bespoke Horology Watch Customizer */}
          {config.interactiveType === "watch_customizer" && (
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/80 border border-amber-500/30 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold">
                    HAUTE HORLOGERIE BESPOKE CONFIGURATOR
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                    Select Your Hand-Assembled Finishing
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {config.interactiveData?.finishes?.map(
                  (f: FinishInfoItem, fIdx: number) => (
                    <button
                      key={fIdx}
                      onClick={() => {
                        sound.playPluck(150);
                        setWatchDialIndex(fIdx);
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all ${
                        watchDialIndex === fIdx
                          ? "bg-amber-500/10 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                          : "bg-black/40 border-white/10 hover:border-white/20 text-zinc-400"
                      }`}
                    >
                      <div className="font-display font-bold text-base text-white mb-1">
                        {f.name}
                      </div>
                      <div className="text-xs text-zinc-300 mb-3">{f.case}</div>
                      <div className="text-xs font-mono text-amber-300 font-bold">
                        {f.priceMod === 0
                          ? "Standard Tier"
                          : `+₹${f.priceMod.toLocaleString("en-IN")}`}
                      </div>
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* F. Snack Bundle Builder */}
          {config.interactiveType === "bundle_snacks" && (
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/80 border border-amber-500/30 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                    CUSTOM FLAVOR BOX
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                    {config.interactiveData?.title || "Choose Your Flavors"}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">
                  {selectedFlavors.length}/6 Flavors Picked
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {config.interactiveData?.flavours?.map(
                  (flav: string, flIdx: number) => {
                    const isSelected = selectedFlavors.includes(flav);
                    return (
                      <button
                        key={flIdx}
                        onClick={() => {
                          sound.playPluck(130);
                          setSelectedFlavors((prev) =>
                            isSelected
                              ? prev.filter((item) => item !== flav)
                              : [...prev, flav]
                          );
                        }}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                          isSelected
                            ? "bg-amber-500/20 border-amber-400 text-white font-bold"
                            : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{flav}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {/* G. Mandi Rate Ticker */}
          {config.interactiveType === "mandi_rates" && (
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/80 border border-emerald-500/30 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                    REAL-TIME AGRI COMMODITY FEED
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                    Live APMC Mandi Rates & Escrow Prices
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-mono text-zinc-400">
                    Updated 4 mins ago
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {config.interactiveData?.mandis?.map(
                  (mandi: MandiInfoItem, mIdx: number) => (
                    <div
                      key={mIdx}
                      className="p-4 rounded-2xl bg-black/50 border border-white/10"
                    >
                      <div className="text-xs text-zinc-400 font-sans mb-1">
                        {mandi.crop}
                      </div>
                      <div className="font-display font-black text-lg text-white">
                        {mandi.price}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 mt-1 inline-block">
                        {mandi.trend}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. PRODUCT CATALOG WITH REAL INR PRICING */}
      <section id="catalog" className="px-4 sm:px-8 py-16 max-w-7xl mx-auto">
        {/* Category Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold block mb-1">
              OFFICIAL PRODUCT CATALOG
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase">
              Current Available Inventory
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playPluck(110);
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                  activeCategory === cat
                    ? "bg-white text-black shadow-md"
                    : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col overflow-hidden group shadow-xl"
            >
              {/* Product Image Container */}
              <div className="relative h-56 bg-zinc-950 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {p.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white font-mono text-[10px] font-bold uppercase tracking-wider border border-white/20">
                    {p.badge}
                  </span>
                )}
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-amber-300 text-[11px] font-mono font-bold flex items-center gap-1 border border-white/10">
                  <Star className="w-3 h-3 fill-amber-300" />
                  <span>{p.rating}</span>
                  <span className="text-zinc-500">({p.reviewCount})</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    {p.category}
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white leading-snug mb-2 group-hover:text-amber-200 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {p.description}
                  </p>

                  {/* Bullet Specs */}
                  <div className="space-y-1 mb-5">
                    {p.specs.slice(0, 2).map((sp, spIdx) => (
                      <div
                        key={spIdx}
                        className="flex items-center gap-1.5 text-[11px] text-zinc-300"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{sp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Add to Bag Button */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-metric font-black text-xl text-white">
                      ₹{p.price.toLocaleString("en-IN")}
                    </div>
                    {p.originalPrice && (
                      <div className="text-[10px] font-mono text-zinc-500 line-through">
                        ₹{p.originalPrice.toLocaleString("en-IN")}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 shrink-0 shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRUST & BRAND ASSURANCE PILLARS */}
      <section className="px-4 sm:px-8 py-12 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.trustBadges.map((badge, bIdx) => (
            <div
              key={bIdx}
              className="p-5 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white mb-1">
                  {badge.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VERIFIED CUSTOMER REVIEWS */}
      <section className="px-4 sm:px-8 py-16 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold block mb-1">
            GENUINE SOCIAL PROOF
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase">
            Customer Experiences & Reviews
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {config.customerReviews.map((rev, rIdx) => (
            <div
              key={rIdx}
              className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 relative"
            >
              <div className="flex items-center gap-1 text-amber-300 mb-3">
                {Array.from({ length: rev.rating }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-300" />
                ))}
              </div>
              <h4 className="font-display font-bold text-base text-white mb-2">
                &ldquo;{rev.title}&rdquo;
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                {rev.comment}
              </p>
              <div className="flex items-center justify-between text-xs pt-4 border-t border-white/10">
                <div>
                  <span className="font-bold text-white block">
                    {rev.author}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {rev.location}
                  </span>
                </div>
                {rev.verified && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] font-mono border border-emerald-500/20">
                    Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. BRAND FOOTER */}
      <footer className="px-4 sm:px-8 py-12 border-t border-white/10 bg-black/60 text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display font-bold text-sm text-white mb-1">
              {config.brandName}
            </div>
            <p className="text-zinc-400">
              {config.brandTagline} · Official Showcase
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-zinc-300 font-bold mb-1">
              ENGINEERED & SCALED BY DESI MUCHADS
            </p>
            <p className="text-[11px] text-zinc-500">
              © 2025 {config.brandName}. All digital rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* 9. FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-white text-black font-display font-bold text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2.5 animate-slide-up border border-zinc-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 10. INTERACTIVE CART DRAWER (MODAL COMPLIANT WITH ACCESSIBILITY) */}
      {isCartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
          className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#121215] border-l border-white/15 h-full flex flex-col p-6 shadow-2xl overflow-y-auto overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-white" />
                <h3
                  id="cart-drawer-title"
                  className="font-display font-black text-lg text-white uppercase"
                >
                  Shopping Bag ({cart.length})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                aria-label="Close Shopping Bag"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Shipping Progress Meter */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 mb-6 text-xs">
              <div className="flex justify-between font-mono mb-1.5">
                <span className="text-zinc-400">
                  {isFreeShipping
                    ? "✓ FREE Express Delivery Unlocked!"
                    : `Add ₹${(freeShippingThreshold - cartSubtotal).toLocaleString("en-IN")} more for Free Delivery`}
                </span>
                <span className="font-bold text-white">
                  ₹{cartSubtotal.toLocaleString("en-IN")} / ₹
                  {freeShippingThreshold}
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 space-y-4 overflow-y-auto pr-1 mb-6">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-zinc-500 text-xs font-mono">
                  Your bag is empty. Explore the catalog above!
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-xs text-white truncate">
                        {item.name}
                      </h4>
                      <div className="text-xs font-metric font-bold text-zinc-300 mt-0.5">
                        ₹{item.price.toLocaleString("en-IN")}
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleUpdateQty(item.id, -1)}
                          className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-white text-xs hover:bg-white/20"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-white px-1">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => handleUpdateQty(item.id, 1)}
                          className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-white text-xs hover:bg-white/20"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-zinc-500 hover:text-red-400 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Subtotal Breakdown */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal:</span>
                  <span className="text-white">
                    ₹{cartSubtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Express Shipping:</span>
                  <span className="text-white">
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Estimated GST (5%):</span>
                  <span className="text-white">
                    ₹{estimatedTax.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10 font-sans">
                  <span>Total Due:</span>
                  <span className="font-metric font-black text-lg">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  onClick={handleSimulateCheckout}
                  className="w-full mt-4 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-black text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  Simulate 1-Click Instant Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 11. CHECKOUT SUCCESS DIALOG */}
      {isCheckoutSuccess && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#121215] border border-emerald-500/40 text-center shadow-2xl relative animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block mb-1">
              TRANSACTION SIMULATED SUCCESSFULLY
            </span>
            <h3
              id="success-dialog-title"
              className="font-display font-black text-2xl text-white uppercase mb-2"
            >
              Order Placed!
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              Thank you for exploring this live client experience engineered by{" "}
              <strong>DESI MUCHADS</strong>. In a live environment, an automated
              WhatsApp invoice and SMS dispatch tracking link are instantly generated.
            </p>

            <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-zinc-400 mb-6">
              Order Reference: <span className="text-white font-bold">{orderRef}</span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsCheckoutSuccess(false);
                  setIsCartOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-bold text-xs uppercase tracking-wider transition-all"
              >
                Continue Browsing Store
              </button>
              <Link
                href={`/work/${config.slug}`}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all"
              >
                Inspect Case Study Dossier ➔
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
