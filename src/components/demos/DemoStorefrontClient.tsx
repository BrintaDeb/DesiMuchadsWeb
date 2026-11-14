"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  ShoppingBag,
  CheckCircle2,
  Star,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Plus,
  Minus,
  Trash2,
  Clock,
  Search,
  Award,
  Zap,
  Heart,
  Terminal,
  Cpu,
  QrCode,
  CreditCard,
  Banknote,
  Check,
  Eye,
  FileText,
  Printer,
  Activity,
  Leaf,
  Truck,
  Monitor,
  Tablet,
  Smartphone,
} from "lucide-react";
import {
  DemoProjectConfig,
  DemoProductItem,
  HerbInfoItem,
  BreedInfoItem,
  FinishInfoItem,
  MandiInfoItem,
} from "@/data/demoProductsData";
import { SpotlightCard } from "@/components/common/SpotlightCard";
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

  // Pro Developer Inspection & Architecture Protocol
  const [isDevToolsOpen, setIsDevToolsOpen] = useState<boolean>(false);
  const [selectedProductModal, setSelectedProductModal] = useState<DemoProductItem | null>(null);
  const [pincodeInput, setPincodeInput] = useState<string>("110001");
  const [pincodeResult, setPincodeResult] = useState<string | null>(
    "⚡ Guaranteed Next-Day 11:30 AM via Delhi NCR Hub #04"
  );

  // Multi-Step Real D2C Checkout States
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping" | "payment" | "confirmed">("cart");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [customerInfo, setCustomerInfo] = useState({
    name: "Aditya Verma",
    phone: "+91 98112 34567",
    email: "aditya.v@gmail.com",
    address: "B-4/122, Safdarjung Enclave",
    city: "New Delhi",
    pincode: "110029",
  });
  const [showGstModal, setShowGstModal] = useState<boolean>(false);

  // UI/UX Pro Max Dynamic States
  const [currency, setCurrency] = useState<"INR" | "USD" | "AED">("INR");
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false);
  const [abMode, setAbMode] = useState<"flagship" | "baseline">("flagship");
  const [deviceViewport, setDeviceViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeDosha, setActiveDosha] = useState<"all" | "vata" | "pitta" | "kapha">("all");
  const [activeDarkstoreCity, setActiveDarkstoreCity] = useState<"delhi" | "mumbai" | "bengaluru">("delhi");
  const [watchStrapIndex, setWatchStrapIndex] = useState<number>(0);
  const [socialProofIndex, setSocialProofIndex] = useState<number>(0);
  const [showSocialProof, setShowSocialProof] = useState<boolean>(true);
  const [evVehicleType, setEvVehicleType] = useState<"cargo3w" | "fleet2w" | "van4w">("cargo3w");
  const [petActivity, setPetActivity] = useState<"low" | "moderate" | "high">("moderate");

  // Watch Bespoke Strap Options
  const watchStraps = [
    { name: "Horween Calfskin (Jet Black)", material: "Hand-Stitched Full-Grain Italian Leather", priceMod: 0 },
    { name: "316L Solid Steel Oyster", material: "Hand-Brushed Surgical Grade Steel Links", priceMod: 4500 },
    { name: "Milanese Mesh (Polished 316L)", material: "Laser-Welded Woven Steel", priceMod: 3200 },
  ];

  // Dark Store Fulfillment Hubs
  const darkstoreHubs = {
    delhi: {
      city: "Delhi NCR",
      hubName: "Hub #04 · Connaught Place / Barakhamba",
      riders: 4,
      temp: "-18°C Cryo-Lock",
      avgPickTime: "84s",
      etaMins: 11,
      stockAccuracy: "99.8%",
    },
    mumbai: {
      city: "Mumbai",
      hubName: "Hub #09 · Bandra Kurla Complex (BKC)",
      riders: 6,
      temp: "-18°C Cryo-Lock",
      avgPickTime: "72s",
      etaMins: 9,
      stockAccuracy: "100%",
    },
    bengaluru: {
      city: "Bengaluru",
      hubName: "Hub #02 · Indiranagar 100ft Corridor",
      riders: 5,
      temp: "-18°C Cryo-Lock",
      avgPickTime: "68s",
      etaMins: 8,
      stockAccuracy: "99.4%",
    },
  };

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

  const socialProofStream = [
    { name: "Vikram R.", city: "Vasant Vihar, New Delhi", item: config.products[0]?.name || "Flagship Item", time: "2m ago" },
    { name: "Ananya M.", city: "Bandra West, Mumbai", item: config.products[1]?.name || "Signature Pack", time: "5m ago" },
    { name: "Siddharth K.", city: "Indiranagar, Bengaluru", item: config.products[0]?.name || "Direct SKU", time: "8m ago" },
    { name: "Pooja S.", city: "Jubilee Hills, Hyderabad", item: "VIP First-Order Allocation", time: "12m ago" },
  ];

  // Rotate social proof every 6 seconds
  useEffect(() => {
    const spInterval = setInterval(() => {
      setSocialProofIndex((prev) => (prev + 1) % socialProofStream.length);
    }, 6000);
    return () => clearInterval(spInterval);
  }, [socialProofStream.length]);

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

  // Format price dynamically based on currency
  const formatPrice = (inr: number) => {
    if (currency === "USD") {
      return `$${(inr * 0.012).toFixed(2)}`;
    }
    if (currency === "AED") {
      return `AED ${(inr * 0.044).toFixed(1)}`;
    }
    return `₹${inr.toLocaleString("en-IN")}`;
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

  // Cart calculations with 15% VIP Coupon
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const couponDiscount = isCouponApplied ? Math.round(cartSubtotal * 0.15) : 0;
  const discountedSubtotal = Math.max(0, cartSubtotal - couponDiscount);
  const freeShippingThreshold = 999;
  const isFreeShipping = discountedSubtotal >= freeShippingThreshold;
  const shippingFee = discountedSubtotal > 0 && !isFreeShipping ? 99 : 0;
  const estimatedTax = Math.round(discountedSubtotal * 0.05); // 5% GST
  const grandTotal = discountedSubtotal + shippingFee + estimatedTax;

  const handleCheckPincode = (pin: string) => {
    sound.playPluck(150);
    const clean = pin.trim();
    if (clean.startsWith("11") || clean.startsWith("12") || clean.startsWith("20")) {
      setPincodeResult("⚡ Guaranteed Same-Day 4:00 PM via Delhi NCR Hub #04");
    } else if (clean.startsWith("40") || clean.startsWith("56")) {
      setPincodeResult("✈️ Express Air Cargo: Next-Day Delivery by 1:30 PM");
    } else if (clean.length === 6) {
      setPincodeResult("📦 Bluedart Surface Express: Delivery in 48-72 Hours");
    } else {
      setPincodeResult("Please enter a valid 6-digit Indian PIN code");
    }
  };

  const handleExecutePayment = () => {
    sound.playChime();
    try {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#10b981", "#e4e4e7", "#71717a"],
      });
    } catch {}
    const fakeRef = `DM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(fakeRef);
    setCheckoutStep("confirmed");
    setIsCheckoutSuccess(true);
    setCart([]);
  };

  // Handle Checkout simulation trigger from Cart
  const handleSimulateCheckout = () => {
    sound.playPluck(160);
    setCheckoutStep("shipping");
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

  // Calculate EV fleet stats with selectable commercial vehicle types
  const evConfigs = {
    cargo3w: { name: "3W Cargo L5N (550kg Payload)", lease: 12499, kmL: 12, fuelCostPerL: 94, powerRatePerKm: 0.035 * 8.5, co2Factor: 0.12 },
    fleet2w: { name: "2W Fleet Delivery (Hyper-Local)", lease: 4299, kmL: 38, fuelCostPerL: 98, powerRatePerKm: 0.02 * 8.5, co2Factor: 0.05 },
    van4w: { name: "4W Electric Van (1.2 Ton Mega)", lease: 24999, kmL: 9, fuelCostPerL: 94, powerRatePerKm: 0.06 * 8.5, co2Factor: 0.22 },
  };
  const activeEvPreset = evConfigs[evVehicleType];
  const monthlyDiesel = Math.round((evFleetSize * evDailyKm * 30 * activeEvPreset.fuelCostPerL) / activeEvPreset.kmL);
  const monthlyEvCost = Math.round(evFleetSize * activeEvPreset.lease + evFleetSize * evDailyKm * 30 * activeEvPreset.powerRatePerKm);
  const monthlyEvSavings = Math.max(0, monthlyDiesel - monthlyEvCost);
  const evSavingsPercent = Math.min(88, Math.max(15, Math.round((monthlyEvSavings / (monthlyDiesel || 1)) * 100)));
  const treesSavedMonthly = Math.round((evFleetSize * evDailyKm * activeEvPreset.co2Factor * 30) / 22);

  // Pet Nutrition & Portion calculations
  const petActivityMultiplier = petActivity === "low" ? 0.9 : petActivity === "high" ? 1.25 : 1.0;
  const dailyGrams = Math.round(petWeight * 32 * petActivityMultiplier);
  const dailyCalories = Math.round(petWeight * 48 * petActivityMultiplier);

  // Watch Customizer calculations
  const currentDialMod = config.interactiveData?.finishes?.[watchDialIndex]?.priceMod || 0;
  const currentStrapMod = watchStraps[watchStrapIndex]?.priceMod || 0;
  const baseWatchPrice = config.products[0]?.price || 48500;
  const totalWatchCustomPrice = baseWatchPrice + currentDialMod + currentStrapMod;

  // Snack Bundle calculations
  const snackBundleCount = selectedFlavors.length;
  const snackBundleDiscountPercent = snackBundleCount >= 4 ? 20 : snackBundleCount === 3 ? 10 : 0;
  const baseSnackPrice = 299;
  const rawSnackTotal = snackBundleCount * baseSnackPrice;
  const snackDiscountAmt = Math.round((rawSnackTotal * snackBundleDiscountPercent) / 100);
  const finalSnackPrice = Math.max(0, rawSnackTotal - snackDiscountAmt);

  // Dosha Herb mapping
  const doshaMapping: Record<string, string[]> = {
    "Ashwagandha Root Extract (KSM-66)": ["vata", "kapha"],
    "Shatavari Bioactive Rhizome": ["pitta", "vata"],
    "Brahmi Whole Plant Standardized": ["pitta", "vata"],
    "Turmeric Curcumin 95%": ["vata", "pitta", "kapha"],
    "Amla Super-Fruit Vitamin C": ["pitta", "kapha"],
    "Shankhpushpi Memory Tonic": ["pitta", "vata"],
    "Purified Guggulu Resin": ["kapha", "vata"],
    "Neem Leaf Detox Extract": ["pitta", "kapha"],
  };
  const filteredHerbs = config.interactiveData?.herbs?.filter((h: HerbInfoItem) => {
    if (activeDosha === "all") return true;
    const matchedDoshas = doshaMapping[h.name] || ["vata", "pitta", "kapha"];
    return matchedDoshas.includes(activeDosha);
  }) || [];

  return (
    <div
      className={`min-h-screen text-white font-sans ${config.theme.primaryBg} selection:bg-white selection:text-black relative overflow-x-hidden`}
    >
      {/* 1. TOP AGENCY PREVIEW BAR (DESI MUCHADS CHROMIUM & PRO DEV PROTOCOL) */}
      <div className="sticky top-0 z-50 bg-[#070709]/95 backdrop-blur-xl border-b border-white/15 px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between text-xs font-mono shadow-2xl gap-2">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-extrabold tracking-widest uppercase text-white truncate text-[11px] sm:text-xs">
            LIVE CLIENT PRODUCT DEMO · {config.brandName}
          </span>
          <span className="hidden md:inline px-2 py-0.5 rounded bg-white/10 text-[10px] text-zinc-300">
            {config.domainUrl}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* A/B Benchmark Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              sound.playPluck(140);
              setAbMode(abMode === "flagship" ? "baseline" : "flagship");
            }}
            className={`px-2 py-1 rounded-md text-[10px] font-mono font-bold uppercase transition-all border cursor-pointer ${
              abMode === "baseline"
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
            }`}
            title="Toggle A/B Benchmark (Generic Baseline vs Desi Muchads Velocity)"
          >
            {abMode === "flagship" ? "⚡ Flagship (4.8% Conv)" : "⚠️ Baseline (1.4% Conv)"}
          </button>

          {/* Dev Protocol & Audit Drawer Toggle */}
          <button
            type="button"
            onClick={() => {
              sound.playPluck(160);
              setIsDevToolsOpen(!isDevToolsOpen);
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase transition-all flex items-center gap-1.5 border cursor-pointer ${
              isDevToolsOpen
                ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                : "bg-white/10 hover:bg-white/20 text-zinc-300 border-white/20"
            }`}
            title="Inspect Live Architecture & Telemetry"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">DEV PROTOCOL</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          {/* Viewport Frame Switcher (Desktop / Tablet / iPhone 16 Pro) */}
          <div className="hidden lg:flex items-center p-0.5 rounded-lg bg-zinc-900 border border-white/15">
            <button
              type="button"
              onClick={() => {
                sound.playPluck(130);
                setDeviceViewport("desktop");
              }}
              className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
                deviceViewport === "desktop"
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Desktop Viewport"
            >
              <Monitor className="w-3 h-3" />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playPluck(140);
                setDeviceViewport("tablet");
              }}
              className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
                deviceViewport === "tablet"
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="iPad Air / Tablet Viewport"
            >
              <Tablet className="w-3 h-3" />
              <span>Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playPluck(150);
                setDeviceViewport("mobile");
              }}
              className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
                deviceViewport === "mobile"
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="iPhone 16 Pro Viewport"
            >
              <Smartphone className="w-3 h-3" />
              <span>iPhone 16</span>
            </button>
          </div>

          <Link
            href={`/work/${config.slug}`}
            className="px-3 py-1 rounded-md bg-white hover:bg-zinc-200 text-black font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-sm text-[11px]"
          >
            <span>DOSSIER</span>
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

      {/* 1.1 EXPANDABLE PRO DEV TELEMETRY & AUDIT PROTOCOL DRAWER */}
      {isDevToolsOpen && (
        <div className="bg-[#0c0c10] border-b border-white/20 px-4 sm:px-8 py-5 text-xs font-mono shadow-2xl animate-in slide-in-from-top-2 duration-200 relative z-40">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white uppercase tracking-wider">
                  Senior Engineering &amp; Telemetry Protocol
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  VERIFIED HUMAN-ENGINEERED ARCHITECTURE
                </span>
              </div>
              <div className="text-[11px] text-zinc-400">
                P99 Latency: <span className="text-white font-bold">14ms</span> · PoP: <span className="text-white font-bold">DELHI NCR (bom1)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Core Web Vitals</div>
                <div className="text-emerald-400 font-bold text-sm mt-1">LCP: 0.62s · CLS: 0.000</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Mobile PageSpeed: 99/100</div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Serverless Pipeline</div>
                <div className="text-white font-bold text-sm mt-1">Next.js 16 Turbopack</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Edge ISR 60s Revalidation</div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Target Unit Economics</div>
                <div className="text-emerald-400 font-bold text-sm mt-1">{config.hero.stats[0]?.val || "4.8x ROAS"}</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Blended Contribution Margin: 42%</div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Anti-AI Verification</div>
                <div className="text-white font-bold text-sm mt-1">100% Handcrafted Code</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Zero Generic AI Page Builders</div>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans pt-1">
              <strong>The Anti-AI Standard:</strong> Unlike automated AI web generators that produce generic unoptimized templates with 42 PageSpeed scores and broken checkout dropoffs, this platform is engineered with bespoke React 19 App Router primitives, zero third-party bloat, sub-second hydration, and real Indian payment integrations.
            </p>
          </div>
        </div>
      )}

      {/* 1.2 BASELINE BENCHMARK COMPARISON NOTICE */}
      {abMode === "baseline" && (
        <div className="bg-amber-950/60 border-b border-amber-500/30 px-4 py-3 text-xs font-mono text-center">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-amber-200 text-left">
              ⚠️ <strong>Viewing Baseline Store Simulator:</strong> Standard unoptimized template with 4.2s TTFB, 3-page checkout friction, and 28% dropoff rate.
            </div>
            <button
              onClick={() => {
                sound.playChime();
                setAbMode("flagship");
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white text-black font-bold uppercase text-[10px] shrink-0 hover:bg-zinc-200 cursor-pointer shadow-md"
            >
              Switch to Desi Muchads Velocity &gt;
            </button>
          </div>
        </div>
      )}

      {/* 1.3 VIP DISCOUNT BANNER */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-black to-emerald-950/60 border-b border-white/10 py-1.5 px-4 text-center text-xs font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="text-emerald-400 font-bold">VIP CODE:</span>
          <span className="text-zinc-300">Use <code className="bg-white/10 px-1.5 py-0.5 rounded text-white font-bold">DESIMUCH15</code> for 15% instant checkout discount</span>
          <button
            onClick={() => {
              sound.playPluck(180);
              setIsCouponApplied(true);
              showToast("Coupon 'DESIMUCH15' applied! 15% discount unlocked.");
            }}
            className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 cursor-pointer font-bold uppercase"
          >
            {isCouponApplied ? "✓ Applied" : "Apply 1-Click"}
          </button>
        </div>
      </div>

      {/* 2. RESPONSIVE STOREFRONT WRAPPER (DESKTOP / IPAD / IPHONE 16 FRAME) */}
      <div
        className={`mx-auto transition-all duration-500 ease-out ${
          deviceViewport === "mobile"
            ? "max-w-[420px] my-8 rounded-[48px] border-[10px] border-zinc-800 shadow-[0_0_80px_rgba(0,0,0,0.98),0_0_30px_rgba(255,255,255,0.12)] overflow-hidden relative bg-[#09090b]"
            : deviceViewport === "tablet"
            ? "max-w-[820px] my-8 rounded-[32px] border-[8px] border-zinc-800 shadow-2xl overflow-hidden relative bg-[#09090b]"
            : "w-full"
        }`}
      >
        {/* Dynamic Island for iPhone 16 Viewport */}
        {deviceViewport === "mobile" && (
          <div className="sticky top-0 inset-x-0 h-7 bg-black flex items-center justify-center z-50 pointer-events-none border-b border-white/10">
            <div className="w-28 h-4 rounded-full bg-zinc-900 border border-white/20 flex items-center justify-between px-2 text-[9px] text-zinc-400 font-mono">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>5G</span>
              </div>
            </div>
          </div>
        )}

        {/* BRAND STOREFRONT HEADER */}
        <header className="px-4 sm:px-8 py-3.5 sm:py-5 border-b border-white/10 backdrop-blur-md bg-black/50 sticky top-10 z-40">
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

          {/* Quick Header Actions: Search, Currency Switcher, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Selector */}
            <div className="hidden sm:flex items-center rounded-xl bg-white/5 border border-white/15 p-1 text-[10px] font-mono">
              <button
                onClick={() => { sound.playPluck(110); setCurrency("INR"); }}
                className={`px-2 py-0.5 rounded-lg transition-colors ${currency === "INR" ? "bg-white text-black font-bold shadow" : "text-zinc-400 hover:text-white"}`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => { sound.playPluck(110); setCurrency("USD"); }}
                className={`px-2 py-0.5 rounded-lg transition-colors ${currency === "USD" ? "bg-white text-black font-bold shadow" : "text-zinc-400 hover:text-white"}`}
              >
                $ USD
              </button>
              <button
                onClick={() => { sound.playPluck(110); setCurrency("AED"); }}
                className={`px-2 py-0.5 rounded-lg transition-colors ${currency === "AED" ? "bg-white text-black font-bold shadow" : "text-zinc-400 hover:text-white"}`}
              >
                د.إ AED
              </button>
            </div>

            {/* Search Input (Desktop) */}
            <div className="relative hidden md:block w-40 lg:w-56">
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
              className="relative px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
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
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/90 border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.15)] relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold border border-cyan-500/40 shadow-sm">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block">
                      COMMERCIAL B2B FLEET OPTIMIZER
                    </span>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                      Fleet TCO &amp; Carbon Neutrality Engine
                    </h3>
                  </div>
                </div>

                {/* Vehicle Type Switcher */}
                <div className="flex items-center rounded-xl bg-black/60 border border-cyan-500/30 p-1 text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => { sound.playPluck(130); setEvVehicleType("cargo3w"); }}
                    className={`px-3 py-1 rounded-lg transition-all ${evVehicleType === "cargo3w" ? "bg-cyan-400 text-black font-bold shadow" : "text-zinc-400 hover:text-white"}`}
                  >
                    3W Cargo L5N
                  </button>
                  <button
                    type="button"
                    onClick={() => { sound.playPluck(130); setEvVehicleType("fleet2w"); }}
                    className={`px-3 py-1 rounded-lg transition-all ${evVehicleType === "fleet2w" ? "bg-cyan-400 text-black font-bold shadow" : "text-zinc-400 hover:text-white"}`}
                  >
                    2W Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => { sound.playPluck(130); setEvVehicleType("van4w"); }}
                    className={`px-3 py-1 rounded-lg transition-all ${evVehicleType === "van4w" ? "bg-cyan-400 text-black font-bold shadow" : "text-zinc-400 hover:text-white"}`}
                  >
                    4W Mega Van
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-zinc-300">Fleet Size (Vehicles):</span>
                      <span className="text-cyan-400 font-bold font-metric text-sm">
                        {evFleetSize} {activeEvPreset.name.split(" ")[0]} EVs
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
                      <span className="text-zinc-300">Daily Average Run per Vehicle:</span>
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

                  {/* Split Visual Comparison Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-red-400 font-bold">Diesel Burn: {formatPrice(monthlyDiesel)}/mo</span>
                      <span className="text-emerald-400 font-bold">UrbanDrift EV: {formatPrice(monthlyEvCost)}/mo</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-red-950/60 border border-white/10 overflow-hidden flex">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.max(10, Math.round((monthlyEvCost / (monthlyDiesel || 1)) * 100)))}%` }}
                        title="UrbanDrift EV Cost Fraction"
                      />
                      <div
                        className="h-full bg-red-500/60 flex-1"
                        title="Net Fuel & Maintenance Waste Avoided"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                      <span>⚡ Electric Power + Lease ({100 - evSavingsPercent}%)</span>
                      <span className="text-emerald-400 font-bold">Net Margin Reclaimed ({evSavingsPercent}%)</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/70 via-black to-zinc-950 border border-cyan-500/50 text-center shadow-xl space-y-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 block mb-1">
                      NET MONTHLY FLEET PROFIT RECLAIMED
                    </span>
                    <div className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight my-1">
                      {formatPrice(monthlyEvSavings)}
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400 font-bold">
                      +{evSavingsPercent}% Blended OPEX Margin Improvement
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-left pt-2 border-t border-white/10">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono font-bold">
                        <Leaf className="w-3.5 h-3.5" />
                        <span>CARBON OFFSET</span>
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        🌱 {treesSavedMonthly} Trees / Mo
                      </div>
                      <div className="text-[10px] text-zinc-400">~{Math.round(evFleetSize * evDailyKm * activeEvPreset.co2Factor * 30)}kg CO2 cut</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-center gap-1.5 text-cyan-400 text-[10px] font-mono font-bold">
                        <Activity className="w-3.5 h-3.5" />
                        <span>FAST TURNAROUND</span>
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        ⚡ 22m to 80% SOC
                      </div>
                      <div className="text-[10px] text-zinc-400">HyperCharge 250kW</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sound.playChime();
                      showToast(`Enterprise Pilot dossier generated for ${evFleetSize} ${activeEvPreset.name}!`);
                    }}
                    className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-display font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Lock In Enterprise Fleet Lease &gt;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* B. Canine Calorie & Nutrition Planner */}
          {config.interactiveType === "calorie_pet" && (
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/90 border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/40">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">
                      VETERINARY PRECISION ENGINE
                    </span>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                      Canine Breed Calorie &amp; Portion Balancer
                    </h3>
                  </div>
                </div>

                {/* Activity Level Selector */}
                <div className="flex items-center rounded-xl bg-black/60 border border-emerald-500/30 p-1 text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => { sound.playPluck(120); setPetActivity("low"); }}
                    className={`px-3 py-1 rounded-lg transition-all ${petActivity === "low" ? "bg-emerald-400 text-black font-bold" : "text-zinc-400 hover:text-white"}`}
                  >
                    Low / Couch
                  </button>
                  <button
                    type="button"
                    onClick={() => { sound.playPluck(120); setPetActivity("moderate"); }}
                    className={`px-3 py-1 rounded-lg transition-all ${petActivity === "moderate" ? "bg-emerald-400 text-black font-bold" : "text-zinc-400 hover:text-white"}`}
                  >
                    Daily Walker
                  </button>
                  <button
                    type="button"
                    onClick={() => { sound.playPluck(120); setPetActivity("high"); }}
                    className={`px-3 py-1 rounded-lg transition-all ${petActivity === "high" ? "bg-emerald-400 text-black font-bold" : "text-zinc-400 hover:text-white"}`}
                  >
                    High Agility
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <label className="block text-xs font-mono text-zinc-300 uppercase">
                    Select Canine Breed Silhouette:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {config.interactiveData?.breeds?.map(
                      (b: BreedInfoItem, bIdx: number) => (
                        <button
                          key={bIdx}
                          onClick={() => {
                            sound.playPluck(140);
                            setPetBreedIndex(bIdx);
                            setPetWeight(b.avgWeight);
                          }}
                          className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                            petBreedIndex === bIdx
                              ? "bg-emerald-500/20 border-emerald-400 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                              : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                          }`}
                        >
                          <div className="font-semibold">{b.name}</div>
                          <div className="text-[10px] font-mono text-zinc-500">
                            Preset: {b.avgWeight} kg
                          </div>
                        </button>
                      )
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-zinc-300">Weight Calibrator:</span>
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

                  {/* Macro Split Bar */}
                  <div className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-1.5 text-[11px] font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>Nutrient Formulation Split:</span>
                      <span className="text-emerald-400 font-bold">Human-Grade Wholefood</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                      <div className="p-1 rounded bg-emerald-950/60 border border-emerald-500/20 text-emerald-300">38% Protein</div>
                      <div className="p-1 rounded bg-white/5 border border-white/10 text-zinc-300">18% Omega Fat</div>
                      <div className="p-1 rounded bg-white/5 border border-white/10 text-zinc-300">35% Broth</div>
                      <div className="p-1 rounded bg-white/5 border border-white/10 text-zinc-300">9% Fiber</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/70 via-black to-zinc-950 border border-emerald-500/50 text-center shadow-xl space-y-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 block mb-1">
                    DAILY GENTLY STEAMED PORTION
                  </span>
                  <div className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight my-1">
                    {dailyGrams}g / Day
                  </div>
                  <p className="text-xs text-zinc-400">
                    ~{dailyCalories} kcal · Formulated with fresh pasture-raised meat, pumpkin &amp; kelp
                  </p>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-300 flex items-center justify-between">
                    <span>Weekly Subscription Box:</span>
                    <strong className="text-white font-bold">{formatPrice(649)} / wk</strong>
                  </div>

                  <button
                    onClick={() => {
                      if (config.products[0]) {
                        handleAddToCart(config.products[0]);
                      }
                    }}
                    className="w-full py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-display font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Add Custom Meal Pouch to Bag ({formatPrice(649)}) &gt;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* C. Dark Store Countdown Timer & Multi-City Hub */}
          {config.interactiveType === "darkstore_timer" && (
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/90 border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.15)] space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/40 shadow-sm shrink-0">
                    <Clock className="w-7 h-7 animate-spin" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">
                      INSTANT MICRO-FULFILLMENT TELEMETRY
                    </span>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                      Hyper-Local Dark Store Routing Active
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {darkstoreHubs[activeDarkstoreCity].hubName}
                    </p>
                  </div>
                </div>

                {/* City Switcher */}
                <div className="flex items-center rounded-xl bg-black/60 border border-emerald-500/30 p-1 text-[11px] font-mono self-start md:self-auto">
                  <button
                    type="button"
                    onClick={() => { sound.playPluck(130); setActiveDarkstoreCity("delhi"); }}
                    className={`px-3 py-1.5 rounded-lg transition-all ${activeDarkstoreCity === "delhi" ? "bg-white text-black font-bold shadow" : "text-zinc-400 hover:text-white"}`}
                  >
                    Delhi NCR
                  </button>
                  <button
                    type="button"
                    onClick={() => { sound.playPluck(130); setActiveDarkstoreCity("mumbai"); }}
                    className={`px-3 py-1.5 rounded-lg transition-all ${activeDarkstoreCity === "mumbai" ? "bg-white text-black font-bold shadow" : "text-zinc-400 hover:text-white"}`}
                  >
                    Mumbai BKC
                  </button>
                  <button
                    type="button"
                    onClick={() => { sound.playPluck(130); setActiveDarkstoreCity("bengaluru"); }}
                    className={`px-3 py-1.5 rounded-lg transition-all ${activeDarkstoreCity === "bengaluru" ? "bg-white text-black font-bold shadow" : "text-zinc-400 hover:text-white"}`}
                  >
                    Bengaluru
                  </button>
                </div>
              </div>

              {/* Radar Telemetry Grid & Countdown */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10">
                  <div className="text-[10px] text-zinc-400 uppercase">Available Riders</div>
                  <div className="text-emerald-400 font-bold text-lg mt-0.5 flex items-center gap-1.5">
                    <Truck className="w-4 h-4" />
                    <span>{darkstoreHubs[activeDarkstoreCity].riders} On Standby</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10">
                  <div className="text-[10px] text-zinc-400 uppercase">Mean Pick &amp; Pack</div>
                  <div className="text-white font-bold text-lg mt-0.5">
                    {darkstoreHubs[activeDarkstoreCity].avgPickTime}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10">
                  <div className="text-[10px] text-zinc-400 uppercase">Thermal Integrity</div>
                  <div className="text-cyan-400 font-bold text-lg mt-0.5">
                    {darkstoreHubs[activeDarkstoreCity].temp}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center">
                  <div className="text-[10px] text-emerald-300 uppercase">Estimated Doorstep In</div>
                  <div className="font-metric font-black text-2xl text-white tracking-wider mt-0.5">
                    {formatCountdown(secondsLeft)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-zinc-400 font-mono">
                  ⚡ All confectionery packaged in dry-ice insulated containers at 0% thermal leakage.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    sound.playPluck(180);
                    showToast(`Simulated dark store rider ping sent to ${darkstoreHubs[activeDarkstoreCity].hubName}!`);
                  }}
                  className="px-4 py-2 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all cursor-pointer shadow-md shrink-0"
                >
                  Ping Nearest Hub Dispatcher
                </button>
              </div>
            </div>
          )}

          {/* D. Herb Formulation & Dosha Balancer Matrix */}
          {config.interactiveType === "herb_explorer" && (
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/90 border border-white/20 shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold border border-white/20">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold block">
                      VEDIC PHARMACOPEIA PURITY
                    </span>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                      {config.interactiveData?.title || "Herbal Bioactives & Extraction Matrix"}
                    </h3>
                  </div>
                </div>

                {/* Dosha Filter Tabs */}
                <div className="flex items-center rounded-xl bg-black/60 border border-white/15 p-1 text-[11px] font-mono self-start md:self-auto">
                  <button
                    type="button"
                    onClick={() => { sound.playPluck(120); setActiveDosha("all"); }}
                    className={`px-3 py-1.5 rounded-lg transition-all ${activeDosha === "all" ? "bg-white text-black font-bold shadow" : "text-zinc-400 hover:text-white"}`}
                  >
                    All Herbs
                  </button>
                  <button
                    type="button"
                    onClick={() => { sound.playPluck(120); setActiveDosha("vata"); }}
                    className={`px-3 py-1.5 rounded-lg transition-all ${activeDosha === "vata" ? "bg-white text-black font-bold shadow" : "text-zinc-400 hover:text-white"}`}
                  >
                    Vata (Air)
                  </button>
                  <button
                    type="button"
                    onClick={() => { sound.playPluck(120); setActiveDosha("pitta"); }}
                    className={`px-3 py-1.5 rounded-lg transition-all ${activeDosha === "pitta" ? "bg-white text-black font-bold shadow" : "text-zinc-400 hover:text-white"}`}
                  >
                    Pitta (Fire)
                  </button>
                  <button
                    type="button"
                    onClick={() => { sound.playPluck(120); setActiveDosha("kapha"); }}
                    className={`px-3 py-1.5 rounded-lg transition-all ${activeDosha === "kapha" ? "bg-white text-black font-bold shadow" : "text-zinc-400 hover:text-white"}`}
                  >
                    Kapha (Earth)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredHerbs.map(
                  (herb: HerbInfoItem, hIdx: number) => (
                    <div
                      key={hIdx}
                      className="p-5 rounded-2xl bg-black/50 border border-white/10 hover:border-white/30 transition-all text-left flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">
                            {herb.part}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-mono font-bold border border-emerald-500/20">
                            NABL Certified
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-sm text-white mb-2 leading-snug">
                          {herb.name}
                        </h4>
                        <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                          {herb.benefit}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-zinc-400">{herb.decoctionTime}</span>
                        <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                          {herb.potency}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* E. Haute Horlogerie Liquid Platinum Watch Customizer */}
          {config.interactiveType === "watch_customizer" && (
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/90 border border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.1)] space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold border border-white/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest font-bold block">
                      HAUTE HORLOGERIE BESPOKE CONFIGURATOR
                    </span>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                      Darbar Bespoke Finishing &amp; Mechanical Calibration
                    </h3>
                  </div>
                </div>

                {/* Mechanical Beat Indicator */}
                <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/20 text-xs font-mono text-zinc-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>28,800 VPH (4Hz) Hi-Beat Escapement</span>
                </div>
              </div>

              {/* 1. Dial Finishing Selection */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2.5 font-bold">
                  Step 1: Select Case &amp; Dial Finishing
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {config.interactiveData?.finishes?.map(
                    (f: FinishInfoItem, fIdx: number) => (
                      <button
                        key={fIdx}
                        type="button"
                        onClick={() => {
                          sound.playPluck(150);
                          setWatchDialIndex(fIdx);
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          watchDialIndex === fIdx
                            ? "bg-white text-black border-white shadow-xl scale-[1.02]"
                            : "bg-black/40 border-white/10 hover:border-white/25 text-zinc-400"
                        }`}
                      >
                        <div className={`font-display font-bold text-sm mb-1 ${watchDialIndex === fIdx ? "text-black" : "text-white"}`}>
                          {f.name}
                        </div>
                        <div className={`text-xs mb-2 ${watchDialIndex === fIdx ? "text-zinc-800" : "text-zinc-400"}`}>{f.case}</div>
                        <div className={`text-xs font-mono font-bold ${watchDialIndex === fIdx ? "text-black" : "text-zinc-200"}`}>
                          {f.priceMod === 0 ? "Standard Tier" : `+${formatPrice(f.priceMod)}`}
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* 2. Bespoke Strap Selection */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2.5 font-bold">
                  Step 2: Select Hand-Assembled Strap
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {watchStraps.map((s, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => {
                        sound.playPluck(150);
                        setWatchStrapIndex(sIdx);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        watchStrapIndex === sIdx
                          ? "bg-white text-black border-white shadow-xl scale-[1.02]"
                          : "bg-black/40 border-white/10 hover:border-white/25 text-zinc-400"
                      }`}
                    >
                      <div className={`font-display font-bold text-sm mb-1 ${watchStrapIndex === sIdx ? "text-black" : "text-white"}`}>
                        {s.name}
                      </div>
                      <div className={`text-xs mb-2 ${watchStrapIndex === sIdx ? "text-zinc-800" : "text-zinc-400"}`}>{s.material}</div>
                      <div className={`text-xs font-mono font-bold ${watchStrapIndex === sIdx ? "text-black" : "text-zinc-200"}`}>
                        {s.priceMod === 0 ? "Included in Base" : `+${formatPrice(s.priceMod)}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Configured Watch Price & Add to Bag CTA */}
              <div className="p-5 rounded-2xl bg-black/60 border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                    TOTAL BESPOKE HOROLOGY VALUATION
                  </span>
                  <div className="font-metric font-black text-2xl sm:text-3xl text-white">
                    {formatPrice(totalWatchCustomPrice)}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">
                    Includes 5-Year Global Chronometer Warranty &amp; NABL Escapement Certificate
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const customWatch: DemoProductItem = {
                      id: `custom-darbar-${Date.now()}`,
                      name: `Darbar Bespoke (${config.interactiveData?.finishes?.[watchDialIndex]?.name || "Rhodium"} · ${watchStraps[watchStrapIndex].name})`,
                      category: "Horology Timepiece",
                      price: totalWatchCustomPrice,
                      image: config.products[0]?.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
                      description: "Custom hand-assembled mechanical chronometer with customized dial finishing and premium strap.",
                      rating: 4.9,
                      reviewCount: 42,
                      specs: ["28,800 VPH Automatic", "Double-Domed Sapphire", "100m Water Resistance"],
                    };
                    handleAddToCart(customWatch);
                    setIsCartOpen(true);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-black text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Add Configured Timepiece to Bag &gt;
                </button>
              </div>
            </div>
          )}

          {/* F. Snack Nation Custom Flavor Box & Tiered Savings */}
          {config.interactiveType === "bundle_snacks" && (
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/90 border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.15)] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">
                    INTERACTIVE BUNDLE BUILDER
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                    Build Your Custom Artisanal Snack Nation Pack
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
                    {selectedFlavors.length} Tubs Picked
                  </span>
                  {snackBundleDiscountPercent > 0 && (
                    <span className="px-3 py-1 rounded-full bg-white text-black text-xs font-mono font-bold">
                      {snackBundleDiscountPercent}% OFF UNLOCKED
                    </span>
                  )}
                </div>
              </div>

              {/* Tier Progress Meter */}
              <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">
                    {snackBundleCount < 3
                      ? `Add ${3 - snackBundleCount} more tub for 10% Bundle Discount`
                      : snackBundleCount === 3
                      ? "Add 1 more tub for 20% Discount + Free Truffle Dip!"
                      : "🎉 Maximum 20% Bundle Tier + Free Dip Unlocked!"}
                  </span>
                  <span className="text-emerald-400 font-bold">{snackBundleDiscountPercent}% Savings Tier</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 transition-all duration-300"
                    style={{ width: `${Math.min(100, (snackBundleCount / 4) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Flavors Grid */}
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
                        className={`p-4 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-500/20 border-emerald-400 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{flav}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  }
                )}
              </div>

              {/* Bundle Pricing Summary & Action */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-metric font-black text-2xl text-white">
                      {formatPrice(finalSnackPrice)}
                    </span>
                    {snackBundleDiscountPercent > 0 && (
                      <span className="text-xs font-mono text-zinc-500 line-through">
                        {formatPrice(rawSnackTotal)}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {snackBundleCount} Tubs @ {formatPrice(baseSnackPrice)} each {snackBundleDiscountPercent > 0 && `(Saved ${formatPrice(snackDiscountAmt)})`}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (selectedFlavors.length === 0) {
                      showToast("Please pick at least one flavor for your snack box!");
                      return;
                    }
                    const customPack: DemoProductItem = {
                      id: `snack-box-${Date.now()}`,
                      name: `Artisanal Snack Box (${selectedFlavors.length} Tubs: ${selectedFlavors.join(", ")})`,
                      category: "Custom Bundle",
                      price: finalSnackPrice,
                      originalPrice: rawSnackTotal > finalSnackPrice ? rawSnackTotal : undefined,
                      image: config.products[0]?.image || "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&auto=format&fit=crop&q=80",
                      description: `Custom curated snack bundle featuring ${selectedFlavors.join(", ")}. Roasted with cold-pressed olive oil.`,
                      rating: 5.0,
                      reviewCount: 38,
                      specs: ["100% Roasted", "Zero Palm Oil", "Gluten Free"],
                    };
                    handleAddToCart(customPack);
                    setIsCartOpen(true);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-black text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Add Custom Box to Bag ({formatPrice(finalSnackPrice)}) &gt;
                </button>
              </div>
            </div>
          )}

          {/* G. Mandi Commodity Ticker & APMC Escrow */}
          {config.interactiveType === "mandi_rates" && (
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/90 border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.15)] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">
                    REAL-TIME AGRI ESCROW COMMODITY FEED
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                    Live APMC Mandi Rates &amp; Direct Farmer Settlement
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-mono text-zinc-300">
                    Live Stream: APMC Nizamabad / Unjha
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {config.interactiveData?.mandis?.map(
                  (mandi: MandiInfoItem, mIdx: number) => (
                    <div
                      key={mIdx}
                      className="p-5 rounded-2xl bg-black/50 border border-white/10 flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xs text-zinc-400 font-sans mb-1">
                          {mandi.crop}
                        </div>
                        <div className="font-display font-black text-xl text-white">
                          {mandi.price}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          {mandi.trend}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">
                          Escrow Valid 24h
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <span className="text-zinc-300">
                  🔒 All forward contracts backed by ICICI Bank Mandi Escrow · Instant T+0 Farmer RTGS.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    sound.playChime();
                    showToast("Simulated forward contract rate locked for 50 Quintals via APMC Escrow!");
                  }}
                  className="px-4 py-2 rounded-xl bg-white text-black font-bold uppercase hover:bg-zinc-200 transition-all shrink-0 cursor-pointer"
                >
                  Lock Escrow Forward Contract Rate
                </button>
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
            <SpotlightCard
              key={p.id}
              maxTilt={8}
              className="rounded-3xl ios-glass-card overflow-hidden group shadow-xl flex flex-col"
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
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-emerald-400 text-[11px] font-mono font-bold flex items-center gap-1 border border-white/10">
                  <Star className="w-3 h-3 fill-emerald-400" />
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
                  <h3 className="font-display font-bold text-base sm:text-lg text-white leading-snug mb-2 group-hover:text-zinc-200 transition-colors">
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

                {/* Price & Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <div>
                    <div className="font-metric font-black text-xl text-white">
                      {formatPrice(p.price)}
                    </div>
                    {p.originalPrice && (
                      <div className="text-[10px] font-mono text-zinc-500 line-through">
                        {formatPrice(p.originalPrice)}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPluck(150);
                        setSelectedProductModal(p);
                      }}
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all border border-white/15"
                      title="Quick View & Lab Specs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(p)}
                      className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </SpotlightCard>
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
      </div>

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

            {/* Drawer Body based on Checkout Step */}
            {checkoutStep === "cart" && (
              <>
                {/* Free Shipping Progress Meter */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 mb-5 text-xs">
                  <div className="flex justify-between font-mono mb-1.5">
                    <span className="text-zinc-400">
                      {isFreeShipping
                        ? "✓ FREE Express Delivery Unlocked!"
                        : `Add ${formatPrice(freeShippingThreshold - cartSubtotal)} more for Free Delivery`}
                    </span>
                    <span className="font-bold text-white">
                      {formatPrice(cartSubtotal)} / {formatPrice(freeShippingThreshold)}
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
                <div className="flex-1 space-y-3.5 overflow-y-auto pr-1 mb-5">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 text-zinc-500 text-xs font-mono">
                      Your bag is empty. Explore the catalog above!
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3"
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
                            {formatPrice(item.price)}
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
                        {formatPrice(cartSubtotal)}
                      </span>
                    </div>
                    {isCouponApplied && (
                      <div className="flex justify-between text-emerald-400 font-bold">
                        <span>VIP 15% Discount (DESIMUCH15):</span>
                        <span>-{formatPrice(couponDiscount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-zinc-400">
                      <span>Express Shipping:</span>
                      <span className="text-white">
                        {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Estimated GST (5%):</span>
                      <span className="text-white">
                        {formatPrice(estimatedTax)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10 font-sans">
                      <span>Total Due:</span>
                      <span className="font-metric font-black text-lg">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>

                    <button
                      onClick={handleSimulateCheckout}
                      className="w-full mt-3 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-black text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      Proceed to Secure Checkout &gt;
                    </button>
                  </div>
                )}
              </>
            )}

            {/* STEP 2: SHIPPING ADDRESS */}
            {checkoutStep === "shipping" && (
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-2 border-b border-white/10">
                    <button
                      onClick={() => setCheckoutStep("cart")}
                      className="text-white hover:underline flex items-center gap-1"
                    >
                      &larr; Back to Bag
                    </button>
                    <span>Step 2 of 3: Shipping</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono focus:border-white/40 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono focus:border-white/40 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          value={customerInfo.pincode}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, pincode: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono focus:border-white/40 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono focus:border-white/40 focus:outline-none"
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
                      ✓ Allocated to Nearest Darkstore Hub (Delhi NCR #04) · Guaranteed Same-Day Ingestion
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex justify-between text-sm font-bold text-white">
                    <span>Payable:</span>
                    <span className="font-metric font-black text-lg">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      sound.playPluck(180);
                      setCheckoutStep("payment");
                    }}
                    className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-black text-xs uppercase tracking-wider transition-all shadow-xl"
                  >
                    Continue to Payment &gt;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT GATEWAY SIMULATION */}
            {checkoutStep === "payment" && (
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-2 border-b border-white/10">
                    <button
                      onClick={() => setCheckoutStep("shipping")}
                      className="text-white hover:underline flex items-center gap-1"
                    >
                      &larr; Back to Address
                    </button>
                    <span>Step 3 of 3: Payment</span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Method 1: UPI */}
                    <div
                      onClick={() => {
                        sound.playPluck(120);
                        setPaymentMethod("upi");
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        paymentMethod === "upi"
                          ? "bg-white/10 border-white text-white shadow-lg"
                          : "bg-black/30 border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <QrCode className="w-4 h-4 text-emerald-400" />
                          <span className="font-bold text-xs font-mono">Instant UPI (GPay / PhonePe / Paytm)</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                          0% Fee
                        </span>
                      </div>

                      {paymentMethod === "upi" && (
                        <div className="mt-3 pt-3 border-t border-white/10 flex flex-col items-center text-center">
                          <div className="w-24 h-24 bg-white p-2 rounded-xl shadow-md mb-2">
                            <div className="w-full h-full border border-black flex items-center justify-center font-mono text-[9px] text-black font-bold">
                              [DYNAMIC QR]
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-400">
                            Auto-expiring in 04:58 · Scan with any UPI app
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Method 2: Cards & Netbanking */}
                    <div
                      onClick={() => {
                        sound.playPluck(120);
                        setPaymentMethod("card");
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        paymentMethod === "card"
                          ? "bg-white/10 border-white text-white shadow-lg"
                          : "bg-black/30 border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <CreditCard className="w-4 h-4 text-cyan-400" />
                          <span className="font-bold text-xs font-mono">Credit / Debit Card (0% EMI)</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400">HDFC, ICICI, SBI</span>
                      </div>
                    </div>

                    {/* Method 3: COD */}
                    <div
                      onClick={() => {
                        sound.playPluck(120);
                        setPaymentMethod("cod");
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        paymentMethod === "cod"
                          ? "bg-white/10 border-white text-white shadow-lg"
                          : "bg-black/30 border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Banknote className="w-4 h-4 text-amber-400" />
                          <span className="font-bold text-xs font-mono">Cash on Delivery (Verified)</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400">Anti-RTO OTP</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <button
                    onClick={handleExecutePayment}
                    className="w-full py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-display font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95"
                  >
                    Authorize &amp; Complete Payment ({formatPrice(grandTotal)})
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: ORDER CONFIRMED & DISPATCH TRACKER */}
            {checkoutStep === "confirmed" && (
              <div className="flex-1 flex flex-col justify-between space-y-4 py-2">
                <div className="space-y-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <Check className="w-7 h-7" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block mb-1">
                      ORDER SECURED &amp; DISPATCH ALLOCATED
                    </span>
                    <h3 className="font-display font-black text-xl text-white uppercase">
                      Payment Received!
                    </h3>
                    <div className="text-xs font-mono text-zinc-400 mt-1">
                      Ref ID: <span className="text-white font-bold">{orderRef}</span>
                    </div>
                  </div>

                  {/* Live Shiprocket Dispatch Timeline */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-left space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-[10px] uppercase text-zinc-400">Logistics Partner</span>
                      <span className="text-white font-bold">Shiprocket Express Air</span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5 text-emerald-400 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Order Received &amp; GST Tax Invoice Generated</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-white text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5 shrink-0" />
                        <span>Darkstore Allocation: Northern Regional Hub #04</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-zinc-500 text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-zinc-600 ml-0.5 shrink-0" />
                        <span>In Transit via Bluedart Dedicated Air Cargo</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-zinc-500 text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-zinc-600 ml-0.5 shrink-0" />
                        <span>Expected Handover: Tomorrow by 1:30 PM</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => setShowGstModal(true)}
                      className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all border border-white/15 flex items-center justify-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-white" />
                      <span>Inspect Official GST Tax Invoice</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setCheckoutStep("cart");
                      }}
                      className="w-full py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      Continue Browsing Store
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 11. QUICK VIEW & LAB SPECS MODAL */}
      {selectedProductModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProductModal(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#121215] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-left overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProductModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-5 rounded-2xl overflow-hidden bg-black border border-white/10">
                <img
                  src={selectedProductModal.image}
                  alt={selectedProductModal.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-3 bg-white/[0.04] text-[10px] font-mono text-zinc-400 space-y-1">
                  <div>Batch: <span className="text-white font-bold">#NABL-2025-IND-{selectedProductModal.id}</span></div>
                  <div>Quality Grade: <span className="text-emerald-400 font-bold">NABL &amp; ISO 9001 Certified</span></div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                    {selectedProductModal.category}
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase leading-tight">
                    {selectedProductModal.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-metric font-black text-2xl text-white">
                      {formatPrice(selectedProductModal.price)}
                    </span>
                    {selectedProductModal.originalPrice && (
                      <span className="text-xs font-mono text-zinc-500 line-through">
                        {formatPrice(selectedProductModal.originalPrice)}
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                      In Stock: Hub #04
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {selectedProductModal.description}
                </p>

                {/* Sourcing & Specs */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5 text-xs font-mono">
                  <div className="text-[10px] uppercase text-zinc-400 font-bold">Verified Lab Specifications:</div>
                  {selectedProductModal.specs.map((sp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-zinc-300 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{sp}</span>
                    </div>
                  ))}
                </div>

                {/* PIN Code Delivery Estimator */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <label className="text-[10px] font-mono uppercase text-zinc-400 block font-bold">
                    Check Dispatch &amp; Delivery Speed
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={pincodeInput}
                      onChange={(e) => setPincodeInput(e.target.value)}
                      placeholder="Enter 6-digit PIN"
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/20 text-xs font-mono text-white flex-1 focus:outline-none focus:border-white/40"
                    />
                    <button
                      type="button"
                      onClick={() => handleCheckPincode(pincodeInput)}
                      className="px-3 py-1.5 rounded-lg bg-white text-black font-mono text-xs font-bold hover:bg-zinc-200"
                    >
                      Check
                    </button>
                  </div>
                  {pincodeResult && (
                    <p className="text-[11px] font-mono text-emerald-400">{pincodeResult}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      handleAddToCart(selectedProductModal);
                      setSelectedProductModal(null);
                      setIsCartOpen(true);
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    Add to Bag &amp; Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 12. OFFICIAL GST TAX INVOICE MODAL */}
      {showGstModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setShowGstModal(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#0e0e11] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-left font-mono text-xs overflow-y-auto max-h-[92vh] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/15">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white uppercase text-sm">
                  Official GST Tax Invoice (Simulated)
                </span>
              </div>
              <button
                onClick={() => setShowGstModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[11px] text-zinc-300 pb-3 border-b border-white/10">
              <div>
                <span className="text-zinc-500 block uppercase">Supplier Identity:</span>
                <strong className="text-white">DESI MUCHADS COMMERCE LABS PVT LTD</strong>
                <div>Regd Office: Connaught Place, New Delhi 110001</div>
                <div>GSTIN: <span className="text-white font-bold">07AAECD5582M1ZX</span></div>
                <div>State: Delhi (Code: 07)</div>
              </div>
              <div>
                <span className="text-zinc-500 block uppercase">Invoice Metadata:</span>
                <div>Invoice No: <strong className="text-white">DM-INV-2025-9941</strong></div>
                <div>Date: {new Date().toLocaleDateString("en-IN")}</div>
                <div>Place of Supply: Delhi (07)</div>
                <div>Reverse Charge: No</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-[11px] text-zinc-300">
              <span className="text-zinc-500 block uppercase mb-1">Billed &amp; Shipped To:</span>
              <div className="font-bold text-white">{customerInfo.name}</div>
              <div>{customerInfo.address}, {customerInfo.city} - {customerInfo.pincode}</div>
              <div>Phone: {customerInfo.phone}</div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] border border-white/10">
                <thead className="bg-white/5 border-b border-white/10 text-zinc-400 font-bold uppercase">
                  <tr>
                    <th className="p-2">Description</th>
                    <th className="p-2">HSN</th>
                    <th className="p-2">Qty</th>
                    <th className="p-2">Taxable</th>
                    <th className="p-2">CGST (2.5%)</th>
                    <th className="p-2">SGST (2.5%)</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-zinc-300">
                  <tr>
                    <td className="p-2 text-white font-bold">{config.brandName} Direct SKU Pack</td>
                    <td className="p-2">330499</td>
                    <td className="p-2">1</td>
                    <td className="p-2">₹{cartSubtotal > 0 ? (cartSubtotal * 0.95).toFixed(0) : "1,850"}</td>
                    <td className="p-2">₹{cartSubtotal > 0 ? (cartSubtotal * 0.025).toFixed(0) : "46"}</td>
                    <td className="p-2">₹{cartSubtotal > 0 ? (cartSubtotal * 0.025).toFixed(0) : "46"}</td>
                    <td className="p-2 text-white font-bold">₹{grandTotal > 0 ? grandTotal.toLocaleString("en-IN") : "1,942"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-zinc-500">
                Authorized Signatory for Desi Muchads Commerce Labs • Computer Generated
              </span>
              <button
                onClick={() => {
                  sound.playPluck(120);
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs uppercase flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 13. CHECKOUT SUCCESS DIALOG */}
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

      {/* 14. REAL-TIME CUSTOMER SOCIAL PROOF STREAM */}
      {showSocialProof && (
        <aside
          aria-label="Real-time purchase stream"
          className="fixed bottom-6 left-6 z-40 max-w-sm p-3.5 rounded-2xl bg-[#0d0d12]/95 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-3 animate-fade-in transition-all pointer-events-auto"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Order · {socialProofStream[socialProofIndex].time}</span>
            </div>
            <p className="text-xs text-white font-medium truncate mt-0.5">
              <strong>{socialProofStream[socialProofIndex].name}</strong> ({socialProofStream[socialProofIndex].city})
            </p>
            <p className="text-[11px] text-zinc-400 truncate">
              Placed order for {socialProofStream[socialProofIndex].item}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playPluck(100);
              setShowSocialProof(false);
            }}
            className="p-1 rounded-full text-zinc-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}
    </div>
  );
}
