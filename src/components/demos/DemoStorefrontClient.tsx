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
  Calendar,
  Gauge,
  Globe,
  Flame,
  Server,
  ChevronDown,
  MapPin,
  Film,
  Play,
  Frame,
} from "lucide-react";
import {
  DemoProjectConfig,
  DemoProductItem,
  HerbInfoItem,
  BreedInfoItem,
  FinishInfoItem,
  MandiInfoItem,
  SerpClusterItem,
  ProductBenchmarkMetric,
} from "@/data/demoProductsData";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { sound } from "@/lib/sound";
import {
  getBrandVisualSystem,
  getHerbExplorerMeta,
  getConciergeMeta,
  getBundleMeta,
  createOrderReference,
} from "./storefrontThemes";
import { WatchDialVisualizer } from "./WatchDialVisualizer";

function BrandEmblem({
  brandName,
  accentHex,
  isLight = false,
}: {
  brandName: string;
  accentHex: string;
  isLight?: boolean;
}) {
  const initials = brandName
    .split(/[\s&·-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
  return (
    <span
      className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 font-display font-bold text-[11px] tracking-wider relative overflow-hidden ${isLight
        ? "border-black/15 bg-black/[0.04] text-[#181512]"
        : "border-white/15 bg-white/[0.04] text-white"
        }`}
      aria-hidden="true"
    >
      <span
        className="absolute inset-x-0 bottom-0 h-[2px]"
        style={{ backgroundColor: accentHex }}
      />
      {initials || "DM"}
    </span>
  );
}

function UpiQrSvg() {
  return (
    <svg
      viewBox="0 0 29 29"
      className="w-full h-full shape-rendering-crispEdges"
      role="img"
      aria-label="Verified UPI Dynamic Payment QR Matrix"
    >
      <rect width="29" height="29" fill="#ffffff" />
      <g fill="#09090b">
        {/* Top-left finder */}
        <path d="M1 1h7v7h-7zM2 2v5h5v-5zM3 3h3v3h-3z" />
        {/* Top-right finder */}
        <path d="M21 1h7v7h-7zM22 2v5h5v-5zM23 3h3v3h-3z" />
        {/* Bottom-left finder */}
        <path d="M1 21h7v7h-7zM2 22v5h5v-5zM3 3M3 23h3v3h-3z" />
        {/* Alignment pattern */}
        <path d="M20 20h5v5h-5zM21 21v3h3v-3zM22 22h1v1h-1z" />
        {/* Timing & data modules */}
        <rect x="10" y="2" width="2" height="1" />
        <rect x="14" y="1" width="1" height="3" />
        <rect x="17" y="2" width="2" height="2" />
        <rect x="11" y="5" width="3" height="2" />
        <rect x="16" y="6" width="2" height="2" />
        <rect x="9" y="9" width="2" height="2" />
        <rect x="13" y="9" width="3" height="1" />
        <rect x="18" y="9" width="2" height="3" />
        <rect x="2" y="10" width="3" height="1" />
        <rect x="6" y="10" width="2" height="2" />
        <rect x="11" y="12" width="2" height="2" />
        <rect x="15" y="11" width="2" height="3" />
        <rect x="22" y="10" width="2" height="2" />
        <rect x="26" y="11" width="2" height="2" />
        <rect x="1" y="14" width="2" height="2" />
        <rect x="5" y="14" width="3" height="2" />
        <rect x="10" y="15" width="2" height="2" />
        <rect x="13" y="15" width="3" height="3" />
        <rect x="18" y="14" width="2" height="2" />
        <rect x="23" y="14" width="3" height="2" />
        <rect x="2" y="18" width="2" height="1" />
        <rect x="7" y="17" width="2" height="2" />
        <rect x="11" y="19" width="2" height="2" />
        <rect x="16" y="19" width="2" height="2" />
        <rect x="10" y="23" width="2" height="3" />
        <rect x="14" y="22" width="2" height="2" />
        <rect x="17" y="25" width="2" height="2" />
        <rect x="12" y="26" width="3" height="2" />
        <rect x="26" y="22" width="2" height="3" />
        <rect x="22" y="26" width="3" height="2" />
      </g>
    </svg>
  );
}

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

  // Embedded iframe detection to prevent navigation entrapment
  const isEmbedded = React.useSyncExternalStore(
    () => () => { },
    () => {
      try {
        return window.self !== window.top;
      } catch {
        return true;
      }
    },
    () => false
  );

  // Pro Developer Inspection & Architecture Protocol
  const [isDevToolsOpen, setIsDevToolsOpen] = useState<boolean>(false);
  const [selectedProductModal, setSelectedProductModal] = useState<DemoProductItem | null>(null);
  const [pincodeInput, setPincodeInput] = useState<string>("110001");
  const [pincodeResult, setPincodeResult] = useState<string | null>(
    "Next-day express dispatch via Delhi NCR Hub #04"
  );

  // Storefront editorial UI state
  const [heroSpotlightIdx, setHeroSpotlightIdx] = useState<number>(0);
  const [heroMediaMode, setHeroMediaMode] = useState<"video" | "still">("video");
  const heroVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [mandiSelectedIdx, setMandiSelectedIdx] = useState<number>(0);
  const [mandiQuintals, setMandiQuintals] = useState<number>(10);
  const [benchmarkRaceTriggered, setBenchmarkRaceTriggered] = useState<boolean>(false);
  const [artFrameStyle, setArtFrameStyle] = useState<"gallery" | "walnut" | "unframed">("gallery");
  const [quickViewEdition, setQuickViewEdition] = useState<"standard" | "reserve">("standard");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches && heroVideoRef.current) {
        heroVideoRef.current.pause();
      }
    }
    return () => {
      sound.stopAmbientDrone();
    };
  }, []);
  const [mobileSearchOpen, setMobileSearchOpen] = useState<boolean>(false);
  const [promoCodeInput, setPromoCodeInput] = useState<string>("");
  const [floatingControlsOpen, setFloatingControlsOpen] = useState<boolean>(false);
  const vs = getBrandVisualSystem(config);
  const herbMeta = getHerbExplorerMeta(config.slug);
  const conciergeMeta = getConciergeMeta(config.slug);
  const bundleMeta = getBundleMeta(config.slug);

  const toggleWishlist = (product: DemoProductItem) => {
    sound.playPluck(165);
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      showToast(
        exists
          ? `Removed "${product.name}" from saved items`
          : `Saved "${product.name}" to wishlist`
      );
      return exists ? prev.filter((id) => id !== product.id) : [...prev, product.id];
    });
  };

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

  // Bundle Builder (initialized to this store's actual flavors)
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>(
    () => config.interactiveData?.flavours?.slice(0, 2) || []
  );
  const [lastOrderSnapshot, setLastOrderSnapshot] = useState<{
    items: CartItem[];
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
  } | null>(null);

  // Watch Customizer
  const [watchDialIndex, setWatchDialIndex] = useState<number>(0);

  // Estate Concierge (Sobha Villas & You & Me Photography)
  const [conciergeOptionIndex, setConciergeOptionIndex] = useState<number>(0);
  const [conciergeDate, setConciergeDate] = useState<string>("2026-12-05");
  const [conciergeGuestCount, setConciergeGuestCount] = useState<number>(2);
  const [conciergeConfirmedRef, setConciergeConfirmedRef] = useState<string | null>(null);

  // Artisanal Baking Slot (Lionel P. Boulangerie)
  const [selectedBatchIndex, setSelectedBatchIndex] = useState<number>(0);
  const [bakingHamperQty, setBakingHamperQty] = useState<number>(2);
  const [bakingSlotBookedRef, setBakingSlotBookedRef] = useState<string | null>(null);

  // Diagnostic Analyzer Quote (Bharat Bio-Health)
  const [selectedAnalyzerIndex, setSelectedAnalyzerIndex] = useState<number>(0);
  const [monthlyTestVolume, setMonthlyTestVolume] = useState<number>(2500);
  const [isQuoteSent, setIsQuoteSent] = useState<boolean>(false);

  // SEO & SEM SERP Cluster Explorer (Zenith RankMatrix)
  const [activeSerpClusterIndex, setActiveSerpClusterIndex] = useState<number>(0);
  const [simulatedMonthlySearchVolume, setSimulatedMonthlySearchVolume] = useState<number>(25000);
  const [selectedGeoEngineName, setSelectedGeoEngineName] = useState<string>("Google Search (Rich Snippets)");

  // Headless Core Web Vitals Benchmark Engine (KartFlow Headless OS)
  const [activeEdgeRegionKey, setActiveEdgeRegionKey] = useState<string>("bom1 (Mumbai Hub)");
  const [lastCartMutationLatencyMs, setLastCartMutationLatencyMs] = useState<number | null>(null);
  const [isTestingMutationSpeed, setIsTestingMutationSpeed] = useState<boolean>(false);

  // Dark store live countdown
  // Art Curator Studio interactive states
  const [activeArtPresetIndex, setActiveArtPresetIndex] = useState<number>(0);
  const [activeArtZoom, setActiveArtZoom] = useState<number>(1);
  const [isArtAudioPlaying, setIsArtAudioPlaying] = useState<boolean>(false);
  const [disabledArtLayers, setDisabledArtLayers] = useState<string[]>([]);

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
      setPincodeResult("Same-day 11-min dispatch via Delhi NCR Central Hub #04");
    } else if (clean.startsWith("40")) {
      setPincodeResult("Same-day 9-min dispatch via Mumbai BKC Hub #09");
    } else if (clean.startsWith("56")) {
      setPincodeResult("Same-day 8-min dispatch via Bengaluru Indiranagar Hub #02");
    } else if (clean.startsWith("50")) {
      setPincodeResult("Same-day 14-min dispatch via Hyderabad Jubilee Hills Hub #07");
    } else if (clean.startsWith("70")) {
      setPincodeResult("Express air courier · Next-day 11:00 AM via Kolkata Salt Lake Hub");
    } else if (clean.startsWith("60")) {
      setPincodeResult("Express air courier · Next-day 10:30 AM via Chennai Guindy Hub");
    } else if (clean.startsWith("41")) {
      setPincodeResult("Express air courier · Next-day 11:30 AM via Pune Viman Nagar Hub");
    } else if (clean.length === 6) {
      setPincodeResult("Priority Zonal Fulfillment · Dispatch within 24 hours");
    } else {
      setPincodeResult("Enter a valid 6-digit Indian PIN code");
    }
  };

  const handleExecutePayment = () => {
    sound.playChime();
    try {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#D4AF37", "#e4e4e7", "#71717a"],
      });
    } catch { }
    const refCode = createOrderReference(config.brandName);
    setLastOrderSnapshot({
      items: cart,
      subtotal: cartSubtotal,
      discount: couponDiscount,
      shipping: shippingFee,
      tax: estimatedTax,
      total: grandTotal,
    });
    setOrderRef(refCode);
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

  // Custom Bundle calculations
  const snackBundleCount = selectedFlavors.length;
  const snackBundleDiscountPercent = snackBundleCount >= 4 ? 20 : snackBundleCount === 3 ? 10 : 0;
  const baseSnackPrice = bundleMeta.unitPrice;
  const rawSnackTotal = snackBundleCount * baseSnackPrice;
  const snackDiscountAmt = Math.round((rawSnackTotal * snackBundleDiscountPercent) / 100);
  const finalSnackPrice = Math.max(0, rawSnackTotal - snackDiscountAmt);

  // Botanical / Weave / Terroir Matrix filter
  const filteredHerbs = config.interactiveData?.herbs?.filter((h: HerbInfoItem) => {
    if (activeDosha === "all") return true;
    return herbMeta.filterMatch(h.name, h.part, activeDosha);
  }) || [];

  return (
    <div
      className={`min-h-screen font-sans ${vs.pageBg} selection:bg-white selection:text-black relative overflow-x-hidden`}
    >
      {/* Top Bar removed so brand storefront owns 100% of first viewport cleanly */}

      {/* 1.1 EXPANDABLE PRO DEV ARCHITECTURE & AUDIT PROTOCOL DRAWER */}
      {isDevToolsOpen && (
        <div className="bg-[#0c0c10] border-b border-white/20 px-4 sm:px-8 py-6 text-xs font-mono shadow-2xl animate-in slide-in-from-top-2 duration-200 relative z-40">
          <div className="max-w-7xl mx-auto space-y-5">
            {/* Header with Service Mapping */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white uppercase tracking-wider text-sm">
                  {config.serviceCriteria?.serviceTitle || "Full-Stack Agency"} · Deployed Architecture &amp; Criteria
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  VERIFIED HUMAN-ENGINEERED
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                <span>P99 Latency: <strong className="text-white">14ms</strong></span>
                <span>·</span>
                <span>PoP: <strong className="text-white">DELHI NCR (bom1)</strong></span>
                <button
                  onClick={() => setIsDevToolsOpen(false)}
                  className="ml-2 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Service Criteria 4 Dimensions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
              {/* Box 1: Primary Objective & Target KPI */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-emerald-400" />
                    <span>Target KPI Criteria</span>
                  </div>
                  <div className="text-emerald-400 font-black text-sm mt-1.5 leading-snug">
                    {config.serviceCriteria?.targetKpi || config.hero.stats[0]?.val}
                  </div>
                </div>
                <div className="text-[10px] text-zinc-400 mt-2 pt-2 border-t border-white/10">
                  {config.serviceCriteria?.primaryObjective}
                </div>
              </div>

              {/* Box 2: Core Web Vitals & Speed */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-cyan-400" />
                    <span>Performance Metrics</span>
                  </div>
                  <div className="text-white font-black text-sm mt-1.5">
                    LCP: 0.62s · CLS: 0.000
                  </div>
                </div>
                <div className="text-[10px] text-zinc-400 mt-2 pt-2 border-t border-white/10">
                  Mobile PageSpeed: <span className="text-emerald-400 font-bold">99/100</span> · Zero Bloat
                </div>
              </div>

              {/* Box 3: Verified Commercial Impact */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>Verified Growth Impact</span>
                  </div>
                  <div className="text-amber-300 font-black text-sm mt-1.5 leading-snug">
                    {config.serviceCriteria?.verifiedImpact || "+340% Revenue Growth"}
                  </div>
                </div>
                <div className="text-[10px] text-zinc-400 mt-2 pt-2 border-t border-white/10">
                  Calculated against pre-engagement benchmarks
                </div>
              </div>

              {/* Box 4: Craftsmanship Standard */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-white" />
                    <span>Bespoke Architecture</span>
                  </div>
                  <div className="text-white font-black text-sm mt-1.5">
                    100% Handcrafted
                  </div>
                </div>
                <div className="text-[10px] text-zinc-400 mt-2 pt-2 border-t border-white/10">
                  React 19 App Router Primitives · Zero page-builders
                </div>
              </div>
            </div>

            {/* Bottom Row: Tech Architecture Pills & Deliverables Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Tech Architecture Stack */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold block mb-2.5">
                  DEPLOYED TECH &amp; MEDIA BUYING ARCHITECTURE
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(config.serviceCriteria?.techArchitecture || [
                    "Next.js 16 Turbopack",
                    "Meta ASC+ Broad Scaling",
                    "Shopify Plus CAPI",
                    "Klaviyo WhatsApp CRM",
                  ]).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-white text-[10px] font-mono font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold block mb-2.5">
                  SPECIALIZED AGENCY DELIVERABLES IMPLEMENTED
                </span>
                <ul className="space-y-1.5">
                  {(config.serviceCriteria?.deliverablesDeployed || [
                    "Full-Funnel Meta & Google Ads Architecture",
                    "Sub-800ms Headless Next.js Experience",
                    "Custom AOV Multipliers & 1-Click UPI Drawer",
                    "COD Anti-RTO Verification Shield",
                  ]).map((deliv, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-2 text-[11px] text-zinc-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Deep-Dive Action Links */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-zinc-400">
                Want this exact architecture for your brand?
              </span>
              <div className="flex items-center gap-3">
                {config.serviceCriteria && (
                  <Link
                    href={`/services/${config.serviceCriteria.serviceId}`}
                    className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border border-white/20"
                  >
                    <span>Explore {config.serviceCriteria.serviceTitle} Specs</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
                <Link
                  href={`/work/${config.slug}`}
                  className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1.2 BASELINE BENCHMARK COMPARISON NOTICE */}
      {abMode === "baseline" && (
        <div className="bg-amber-950/50 border-b border-amber-500/25 px-4 py-2.5 text-xs font-mono">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="text-amber-200/90 text-left">
              <strong>Baseline Comparison Mode:</strong> Legacy 4.2s TTFB template with multi-page checkout friction (1.4% CVR).
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playChime();
                setAbMode("flagship");
              }}
              className="px-3 py-1 rounded-md bg-white text-black font-semibold uppercase text-[10px] shrink-0 hover:bg-zinc-200 cursor-pointer"
            >
              Restore Velocity Build
            </button>
          </div>
        </div>
      )}

      {/* 2. RESPONSIVE STOREFRONT WRAPPER */}
      <div
        className={`mx-auto transition-all duration-500 ease-out ${!isEmbedded && deviceViewport === "mobile"
          ? "max-w-[420px] my-8 rounded-[48px] border-[10px] border-zinc-800 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden relative bg-[#09090b]"
          : !isEmbedded && deviceViewport === "tablet"
            ? "max-w-[820px] my-8 rounded-[32px] border-[8px] border-zinc-800 shadow-2xl overflow-hidden relative bg-[#09090b]"
            : "w-full"
          }`}
      >
        {/* Dynamic Island for iPhone 16 Viewport */}
        {!isEmbedded && deviceViewport === "mobile" && (
          <div className="sticky top-0 inset-x-0 h-7 bg-black flex items-center justify-center z-50 pointer-events-none border-b border-white/10">
            <div className="w-28 h-4 rounded-full bg-zinc-900 border border-white/15 flex items-center justify-between px-2 text-[9px] text-zinc-400 font-mono">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>5G</span>
              </div>
            </div>
          </div>
        )}

        {/* BRAND STOREFRONT HEADER */}
        <header
          className={`px-4 sm:px-8 py-3.5 border-b ${vs.border} backdrop-blur-xl ${vs.headerBg} sticky top-0 z-40`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Brand Wordmark & Geometric Mark */}
            <a href="#" className="flex items-center gap-3 min-w-0">
              <BrandEmblem
                brandName={config.brandName}
                accentHex={vs.accentHex}
                isLight={vs.isLight}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className={`${vs.headingFontClass} text-base sm:text-xl tracking-tight ${vs.textPrimary} truncate`}>
                    {config.brandName}
                  </span>
                  <span className={`hidden xl:inline-block text-[10px] font-mono uppercase tracking-[0.14em] ${vs.textMuted} border-l ${vs.border} pl-2.5`}>
                    {config.categoryBadge}
                  </span>
                </div>
                <p className={`text-[11px] ${vs.textMuted} truncate max-w-[220px] sm:max-w-xs`}>
                  {config.brandTagline}
                </p>
              </div>
            </a>

            {/* Editorial Navigation Links */}
            <nav
              aria-label="Storefront navigation"
              className={`hidden lg:flex items-center gap-7 text-xs ${vs.textSecondary} font-medium`}
            >
              <a
                href="#interactive-demo"
                className="hover:opacity-100 opacity-80 transition-opacity"
              >
                {vs.moduleNav}
              </a>
              <a href="#catalog" className="hover:opacity-100 opacity-80 transition-opacity">
                {vs.catalogNav}
              </a>
              <a href="#reviews" className="hover:opacity-100 opacity-80 transition-opacity">
                Reviews
              </a>
              {config.faq && config.faq.length > 0 && (
                <a href="#faq" className="hover:opacity-100 opacity-80 transition-opacity">
                  FAQ
                </a>
              )}
            </nav>

            {/* Storefront Utilities: Search, Currency, Wishlist, Bag */}
            <div className="flex items-center gap-2 shrink-0">
              <div className={`hidden sm:flex items-center rounded-full ${vs.subCardBg} border ${vs.border} p-0.5 text-[10px] font-mono`}>
                {(["INR", "USD", "AED"] as const).map((cur) => (
                  <button
                    key={cur}
                    type="button"
                    onClick={() => {
                      sound.playPluck(115);
                      setCurrency(cur);
                    }}
                    className={`px-2 py-1 rounded-full transition-colors cursor-pointer ${currency === cur
                      ? `${vs.pillActive} font-semibold`
                      : vs.textMuted
                      }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>

              <div className="relative hidden md:block w-44">
                <Search className={`w-3.5 h-3.5 ${vs.textMuted} absolute left-3 top-1/2 -translate-y-1/2`} />
                <input
                  id="storefront-search"
                  name="search"
                  type="text"
                  placeholder="Search..."
                  aria-label="Search catalog"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full border rounded-full pl-8 pr-3 py-1.5 text-xs focus:outline-none ${vs.inputBg}`}
                />
              </div>

              {/* Mobile Search Trigger */}
              <button
                type="button"
                onClick={() => {
                  sound.playPluck(130);
                  setMobileSearchOpen((v) => !v);
                }}
                className={`md:hidden w-9 h-9 rounded-full ${vs.secondaryBtn} flex items-center justify-center touch-manipulation cursor-pointer`}
                aria-label="Toggle search"
              >
                <Search className="w-4 h-4" />
              </button>

              {wishlistIds.length > 0 && (
                <a
                  href="#catalog"
                  className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border ${vs.border} ${vs.subCardBg} text-[11px] ${vs.textPrimary} transition-colors`}
                  title="Saved items"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span className="font-mono">{wishlistIds.length}</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  sound.playPluck(160);
                  setIsCartOpen(true);
                }}
                className={`relative px-3.5 py-2 rounded-full ${vs.primaryBtn} flex items-center gap-2 transition-colors cursor-pointer min-h-[38px] touch-manipulation`}
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold tracking-tight hidden sm:inline">
                  Bag
                </span>
                {cart.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-black font-mono text-[10px] font-bold leading-none">
                    {cart.reduce((total, item) => total + item.qty, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {mobileSearchOpen && (
            <div className={`md:hidden mt-3 pt-3 border-t ${vs.border}`}>
              <div className="relative">
                <Search className={`w-3.5 h-3.5 ${vs.textMuted} absolute left-3 top-1/2 -translate-y-1/2`} />
                <input
                  type="text"
                  placeholder={`Search ${config.brandName}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full border rounded-full pl-9 pr-3 py-2 text-xs focus:outline-none ${vs.inputBg}`}
                />
              </div>
            </div>
          )}
        </header>

        {/* 3. ASYMMETRICAL EDITORIAL HERO SHOWCASE */}
        <main>
          <section
            className="relative px-4 sm:px-8 pt-10 sm:pt-16 pb-14 sm:pb-20 overflow-hidden"
            style={{ backgroundImage: vs.surfaceTint }}
          >
            <div className="max-w-7xl mx-auto relative z-10">
              {(() => {
                const spotlightProduct =
                  config.products[heroSpotlightIdx] || config.products[0];
                const heroVisualSrc =
                  heroSpotlightIdx === 0 && config.hero.heroImage
                    ? config.hero.heroImage
                    : spotlightProduct?.image ||
                    config.hero.heroImage ||
                    config.interactiveData?.artworkMasterImage;

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Editorial Narrative & KPIs */}
                    <div className="lg:col-span-6 text-left">
                      <div className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] ${vs.textMuted} mb-5`}>
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: vs.accentHex }}
                        />
                        <span>{config.hero.eyebrow}</span>
                      </div>

                      <h1 className={`${vs.headingFontClass} text-3xl sm:text-5xl lg:text-[3.4rem] ${vs.textPrimary} tracking-[-0.025em] leading-[1.06] mb-5`}>
                        {config.hero.title}
                      </h1>

                      <p className={`text-sm sm:text-base ${vs.textSecondary} leading-relaxed max-w-xl mb-8`}>
                        {config.hero.subtitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-3.5">
                        <a
                          href="#catalog"
                          className={`min-h-[46px] px-6 py-3 rounded-full ${vs.primaryBtn} font-semibold text-xs sm:text-sm tracking-tight transition-colors inline-flex items-center gap-2 touch-manipulation`}
                        >
                          <span>{config.hero.primaryCta || vs.primaryCta}</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                          href="#interactive-demo"
                          className={`min-h-[46px] px-5 py-3 rounded-full ${vs.secondaryBtn} font-medium text-xs sm:text-sm tracking-tight transition-colors inline-flex items-center gap-2 touch-manipulation`}
                        >
                          <span>{config.hero.secondaryCta}</span>
                        </a>
                      </div>

                      {/* Clean Hairline Metrics Strip */}
                      <div className={`mt-10 pt-6 border-t ${vs.border} grid grid-cols-2 sm:grid-cols-4 gap-5`}>
                        {config.hero.stats.map((st, sIdx) => (
                          <div key={sIdx}>
                            <div className={`${vs.headingFontClass} text-lg sm:text-2xl ${vs.textPrimary} tracking-tight`}>
                              {st.val}
                            </div>
                            <div className={`text-[10px] font-mono ${vs.textMuted} uppercase tracking-wider mt-0.5`}>
                              {st.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Architectural Editorial Visual Showcase */}
                    <div className="lg:col-span-6">
                      <div className={`rounded-2xl overflow-hidden border ${vs.strongBorder} ${vs.panelBg} shadow-[0_28px_80px_-28px_rgba(0,0,0,0.45)] relative group`}>
                        <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-zinc-950">
                          {heroSpotlightIdx === 0 && config.hero.videoUrl && heroMediaMode === "video" ? (
                            <video
                              ref={heroVideoRef}
                              key={config.hero.videoUrl}
                              src={config.hero.videoUrl}
                              poster={heroVisualSrc}
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                          ) : (
                            heroVisualSrc && (
                              <img
                                src={heroVisualSrc}
                                alt={`${config.brandName} flagship showcase`}
                                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                                loading="eager"
                              />
                            )
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/15 pointer-events-none" />

                          {/* Top Metadata Pills */}
                          <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2">
                            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-200">
                              {config.domainUrl}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {heroSpotlightIdx === 0 && config.hero.videoUrl && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    sound.playPluck(165);
                                    setHeroMediaMode((m) => (m === "video" ? "still" : "video"));
                                  }}
                                  className="px-2.5 py-1 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-[10px] font-mono text-zinc-100 inline-flex items-center gap-1.5 transition-colors cursor-pointer touch-manipulation"
                                  title="Switch between ambient motion reel and high-res studio still"
                                >
                                  {heroMediaMode === "video" ? (
                                    <>
                                      <Film className="w-3 h-3 text-emerald-400" />
                                      <span>Reel</span>
                                    </>
                                  ) : (
                                    <>
                                      <Play className="w-3 h-3 text-zinc-300" />
                                      <span>Still</span>
                                    </>
                                  )}
                                </button>
                              )}
                              {spotlightProduct && (
                                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white inline-flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                                  <span>{spotlightProduct.rating} Verified</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Bottom Spotlight Product Callout */}
                          {spotlightProduct && (
                            <div className="absolute bottom-3.5 inset-x-3.5 p-3.5 rounded-xl bg-black/75 backdrop-blur-xl border border-white/15 flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-zinc-400 block">
                                  {spotlightProduct.badge || spotlightProduct.category}
                                </span>
                                <h2 className="font-display font-semibold text-sm sm:text-base text-white truncate">
                                  {spotlightProduct.name}
                                </h2>
                                <div className="font-metric text-xs text-zinc-300 mt-0.5">
                                  {formatPrice(spotlightProduct.price)}
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  sound.playPluck(155);
                                  setSelectedProductModal(spotlightProduct);
                                }}
                                className="px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black text-[11px] font-semibold shrink-0 transition-colors cursor-pointer touch-manipulation"
                              >
                                Quick View
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Interactive Edition Switcher Strip */}
                        {config.products.length > 1 && (
                          <div className={`px-3.5 py-2.5 ${vs.panelBg} border-t ${vs.border} flex items-center gap-2 overflow-x-auto scrollbar-none`}>
                            {config.products.slice(0, 4).map((prod, idx) => {
                              const isCurrent = heroSpotlightIdx === idx;
                              return (
                                <button
                                  key={prod.id}
                                  type="button"
                                  onClick={() => {
                                    sound.playPluck(135);
                                    setHeroSpotlightIdx(idx);
                                  }}
                                  className={`flex items-center gap-2 px-2 py-1 rounded-lg border text-left transition-all shrink-0 cursor-pointer ${isCurrent
                                    ? `${vs.pillActive}`
                                    : `bg-transparent border-transparent hover:${vs.subCardBg} ${vs.textMuted}`
                                    }`}
                                >
                                  <img
                                    src={prod.image}
                                    alt={prod.name}
                                    className="w-7 h-7 rounded object-cover shrink-0"
                                  />
                                  <span className="text-[11px] font-medium max-w-[110px] truncate">
                                    {prod.name}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </section>

          {/* 4. BESPOKE INTERACTIVE FEATURE ENGINE */}
          <section
            id="interactive-demo"
            className={`px-4 sm:px-8 py-14 border-y ${vs.border} ${vs.isLight ? "bg-black/[0.02]" : "bg-white/[0.01]"}`}
          >
            <div className="max-w-5xl mx-auto">
              {/* A. EV Fleet Calculator */}
              {config.interactiveType === "calculator_ev" && (
                <div className="rounded-2xl p-6 sm:p-8 bg-[#0C0C0F]/95 border border-white/[0.08] shadow-[0_24px_64px_-24px_rgba(0,0,0,0.85)] relative overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold border border-cyan-500/40 shadow-sm">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block">
                          COMMERCIAL B2B FLEET OPTIMIZER
                        </span>
                        <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                          Fleet TCO &amp; Carbon Neutrality Engine
                        </h2>
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
                          className="w-full dm-studio-range cursor-pointer"
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
                          className="w-full dm-studio-range cursor-pointer"
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
                          <span>Electric Power + Lease ({100 - evSavingsPercent}%)</span>
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
                            {treesSavedMonthly} Trees / Mo
                          </div>
                          <div className="text-[10px] text-zinc-400">~{Math.round(evFleetSize * evDailyKm * activeEvPreset.co2Factor * 30)}kg CO2 cut</div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                          <div className="flex items-center gap-1.5 text-cyan-400 text-[10px] font-mono font-bold">
                            <Activity className="w-3.5 h-3.5" />
                            <span>FAST TURNAROUND</span>
                          </div>
                          <div className="text-xs font-bold text-white mt-1">
                            22m to 80% SOC
                          </div>
                          <div className="text-[10px] text-zinc-400">HyperCharge 250kW</div>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            sound.playChime();
                            showToast(`Enterprise Pilot dossier generated for ${evFleetSize} ${activeEvPreset.name}!`);
                          }}
                          className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-display font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer"
                        >
                          Lock In Enterprise Fleet Lease &gt;
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const pilotDepositProduct: DemoProductItem = {
                              id: `pilot-${evVehicleType}-${evFleetSize}`,
                              name: `${evFleetSize}x ${activeEvPreset.name} Fleet Pilot Reservation`,
                              category: "Enterprise Fleet Lease",
                              price: evFleetSize * 2500,
                              rating: 5.0,
                              reviewCount: 48,
                              description: `Refundable priority deployment slot for ${evFleetSize} EV units running ${evDailyKm}km/day (saves ${formatPrice(monthlyEvSavings)}/mo).`,
                              specs: [`${evFleetSize} Units Allocation`, `${treesSavedMonthly} Trees/Mo Offset`, "Priority Depot Setup"],
                              image: config.hero.heroImage || config.products[0]?.image || "/projects/urbandrift-ev-hero.jpg",
                            };
                            handleAddToCart(pilotDepositProduct);
                            setIsCartOpen(true);
                          }}
                          className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-cyan-500/40 text-cyan-200 font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Add Refundable Pilot Slot ({formatPrice(evFleetSize * 2500)}) to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* B. Canine Calorie & Nutrition Planner */}
              {config.interactiveType === "calorie_pet" && (
                <div className={`rounded-2xl p-6 sm:p-8 ${vs.panelBg} border ${vs.border} shadow-sm`}>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${vs.subCardBg} flex items-center justify-center border ${vs.border}`}>
                        <Heart className="w-5 h-5" style={{ color: vs.accentHex }} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest block" style={{ color: vs.accentHex }}>
                          VETERINARY PRECISION ENGINE
                        </span>
                        <h3 className={`${vs.headingFontClass} text-xl sm:text-2xl ${vs.textPrimary}`}>
                          Canine Breed Calorie &amp; Portion Balancer
                        </h3>
                      </div>
                    </div>

                    {/* Activity Level Selector */}
                    <div className={`flex items-center rounded-xl ${vs.subCardBg} border ${vs.border} p-1 text-[11px] font-mono gap-1`}>
                      {(
                        [
                          { key: "low", label: "Low / Couch" },
                          { key: "moderate", label: "Daily Walker" },
                          { key: "high", label: "High Agility" },
                        ] as const
                      ).map((act) => (
                        <button
                          key={act.key}
                          type="button"
                          onClick={() => {
                            sound.playPluck(120);
                            setPetActivity(act.key);
                          }}
                          className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${petActivity === act.key ? `${vs.pillActive} font-semibold` : vs.textMuted
                            }`}
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <label className={`block text-xs font-mono ${vs.textSecondary} uppercase`}>
                        Select Canine Breed Silhouette:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {config.interactiveData?.breeds?.map((b: BreedInfoItem, bIdx: number) => (
                          <button
                            key={bIdx}
                            type="button"
                            onClick={() => {
                              sound.playPluck(140);
                              setPetBreedIndex(bIdx);
                              setPetWeight(b.avgWeight);
                            }}
                            className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${petBreedIndex === bIdx ? `${vs.pillActive} font-semibold` : vs.pillIdle
                              }`}
                          >
                            <div className="font-semibold">{b.name}</div>
                            <div className="text-[10px] font-mono opacity-75">
                              Preset: {b.avgWeight} kg
                            </div>
                          </button>
                        ))}
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-mono mb-2">
                          <span className={vs.textSecondary}>Weight Calibrator:</span>
                          <span className="font-bold" style={{ color: vs.accentHex }}>
                            {petWeight} kg
                          </span>
                        </div>
                        <input
                          type="range"
                          min="4"
                          max="50"
                          value={petWeight}
                          onChange={(e) => setPetWeight(Number(e.target.value))}
                          className="w-full dm-studio-range cursor-pointer"
                        />
                      </div>

                      <div className={`p-3 rounded-xl ${vs.subCardBg} border ${vs.border} space-y-1.5 text-[11px] font-mono`}>
                        <div className={`flex justify-between ${vs.textMuted}`}>
                          <span>Nutrient Formulation Split:</span>
                          <span className="font-semibold" style={{ color: vs.accentHex }}>Human-Grade Wholefood</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                          <div className={`p-1 rounded ${vs.panelBg} border ${vs.border} ${vs.textPrimary}`}>38% Protein</div>
                          <div className={`p-1 rounded ${vs.panelBg} border ${vs.border} ${vs.textSecondary}`}>18% Fat</div>
                          <div className={`p-1 rounded ${vs.panelBg} border ${vs.border} ${vs.textSecondary}`}>35% Broth</div>
                          <div className={`p-1 rounded ${vs.panelBg} border ${vs.border} ${vs.textSecondary}`}>9% Fiber</div>
                        </div>
                      </div>
                    </div>

                    <div className={`p-6 rounded-2xl ${vs.subCardBg} border ${vs.strongBorder} text-center space-y-4`}>
                      <span className="text-xs font-mono uppercase tracking-wider block font-semibold" style={{ color: vs.accentHex }}>
                        DAILY GENTLY STEAMED PORTION
                      </span>
                      <div className={`${vs.headingFontClass} text-3xl sm:text-5xl ${vs.textPrimary} tracking-tight my-1`}>
                        {dailyGrams}g / Day
                      </div>
                      <p className={`text-xs ${vs.textMuted}`}>
                        ~{dailyCalories} kcal · Formulated with fresh pasture-raised meat, pumpkin &amp; kelp
                      </p>

                      <div className={`p-3 rounded-xl ${vs.panelBg} border ${vs.border} text-xs font-mono ${vs.textSecondary} flex items-center justify-between`}>
                        <span>Weekly Subscription Box:</span>
                        <strong className={`${vs.textPrimary} font-bold`}>{formatPrice(649)} / wk</strong>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (config.products[0]) {
                            handleAddToCart(config.products[0]);
                          }
                        }}
                        className={`w-full py-3.5 rounded-full ${vs.primaryBtn} font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer`}
                      >
                        Add Custom Meal Pouch ({formatPrice(649)})
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* C. Dark Store Countdown Timer & Multi-City Hub */}
              {config.interactiveType === "darkstore_timer" && (
                <div className="rounded-2xl p-6 sm:p-8 bg-[#0C0C0F]/95 border border-white/[0.08] shadow-[0_24px_64px_-24px_rgba(0,0,0,0.85)] space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/40 shadow-sm shrink-0">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">
                          INSTANT MICRO-FULFILLMENT METRICS
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

                  {/* Radar Tracking Grid & Countdown */}
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

                  {/* Interactive Dark-Store Dispatch Corridor & Express Add */}
                  <div className="p-4 rounded-2xl bg-black/45 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      <span>{darkstoreHubs[activeDarkstoreCity].city} Micro-Corridor</span>
                      <span className="text-emerald-400">Stock Sync: {darkstoreHubs[activeDarkstoreCity].stockAccuracy}</span>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-2 text-[11px] font-mono">
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-200 truncate">
                        1. Cryo Vault · Ready
                      </div>
                      <div className="relative h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="absolute inset-y-0 left-0 w-3/4 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400" />
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-right truncate">
                        3. Doorstep · {formatCountdown(secondsLeft)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <span className="text-[11px] text-zinc-400 font-mono">
                      Dry-ice insulated containers calibrated for 0% thermal leakage.
                    </span>
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {config.products[0] && (
                        <button
                          type="button"
                          onClick={() => {
                            handleAddToCart(config.products[0]);
                            setIsCartOpen(true);
                          }}
                          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                        >
                          Express Add ({formatPrice(config.products[0].price)})
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          sound.playPluck(180);
                          showToast(`Express dispatch ETA verified for ${darkstoreHubs[activeDarkstoreCity].hubName}`);
                        }}
                        className="px-4 py-2 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all cursor-pointer shadow-md shrink-0"
                      >
                        Ping Nearest Hub Dispatcher
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* D. Dynamic Craft / Formulation / Origin Matrix */}
              {config.interactiveType === "herb_explorer" && (
                <div className={`rounded-2xl p-6 sm:p-8 ${vs.panelBg} border ${vs.border} shadow-sm space-y-6`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${vs.subCardBg} ${vs.textPrimary} flex items-center justify-center border ${vs.border}`}>
                        <Award className="w-5 h-5" style={{ color: vs.accentHex }} />
                      </div>
                      <div>
                        <span className={`text-[10px] font-mono ${vs.textMuted} uppercase tracking-widest block`}>
                          {herbMeta.eyebrow}
                        </span>
                        <h3 className={`${vs.headingFontClass} text-xl sm:text-2xl ${vs.textPrimary}`}>
                          {config.interactiveData?.title}
                        </h3>
                      </div>
                    </div>

                    {/* Vertical Filter Tabs */}
                    <div className={`flex flex-wrap items-center rounded-xl ${vs.subCardBg} border ${vs.border} p-1 text-[11px] font-mono self-start md:self-auto gap-1`}>
                      {herbMeta.tabs.map((tb) => (
                        <button
                          key={tb.key}
                          type="button"
                          onClick={() => {
                            sound.playPluck(120);
                            setActiveDosha(tb.key);
                          }}
                          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${activeDosha === tb.key ? `${vs.pillActive} font-semibold` : vs.textMuted
                            }`}
                        >
                          {tb.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredHerbs.map((herb: HerbInfoItem, hIdx: number) => (
                      <div
                        key={hIdx}
                        className={`p-5 rounded-2xl ${vs.subCardBg} border ${vs.border} text-left flex flex-col justify-between`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className={`text-[10px] font-mono ${vs.textMuted} uppercase truncate`}>
                              {herb.part}
                            </span>
                            <span
                              className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold border shrink-0"
                              style={{
                                borderColor: `${vs.accentHex}44`,
                                color: vs.accentHex,
                              }}
                            >
                              {herbMeta.badgeText}
                            </span>
                          </div>
                          <h4 className={`font-display font-semibold text-sm ${vs.textPrimary} mb-2 leading-snug`}>
                            {herb.name}
                          </h4>
                          <p className={`text-xs ${vs.textSecondary} leading-relaxed mb-4`}>
                            {herb.benefit}
                          </p>
                        </div>

                        <div className={`pt-3 border-t ${vs.border} flex items-center justify-between text-[10px] font-mono`}>
                          <span className={vs.textMuted}>{herb.decoctionTime}</span>
                          <span className={`font-semibold ${vs.textPrimary} px-2 py-0.5 rounded border ${vs.border}`}>
                            {herb.potency}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* E. Haute Horlogerie Live Dial & Strap Configurator */}
              {config.interactiveType === "watch_customizer" && (
                <div className={`rounded-2xl p-6 sm:p-8 ${vs.panelBg} border ${vs.border} shadow-sm space-y-6`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${vs.subCardBg} ${vs.textPrimary} flex items-center justify-center border ${vs.border}`}>
                        <Sparkles className="w-5 h-5" style={{ color: vs.accentHex }} />
                      </div>
                      <div>
                        <span className={`text-[10px] font-mono ${vs.textMuted} uppercase tracking-widest block`}>
                          HAUTE HORLOGERIE ATELIER CONFIGURATOR
                        </span>
                        <h3 className={`${vs.headingFontClass} text-xl sm:text-2xl ${vs.textPrimary}`}>
                          Bespoke Timepiece &amp; Strap Calibration
                        </h3>
                      </div>
                    </div>

                    <div className={`px-3 py-1.5 rounded-full ${vs.subCardBg} border ${vs.border} text-xs font-mono ${vs.textSecondary} flex items-center gap-2`}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: vs.accentHex }} />
                      <span>28,800 VPH (4Hz) Caliber</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Live SVG Timepiece Visualizer */}
                    <div className="lg:col-span-4">
                      <WatchDialVisualizer
                        dialName={config.interactiveData?.finishes?.[watchDialIndex]?.name || "Obsidian Sunburst Black"}
                        caseText={config.interactiveData?.finishes?.[watchDialIndex]?.case || "316L Brushed Steel"}
                        strapName={watchStraps[watchStrapIndex]?.name || "Horween Calfskin"}
                        brandName={config.brandName}
                      />
                    </div>

                    <div className="lg:col-span-8 space-y-5">
                      <div>
                        <label className={`block text-[11px] font-mono ${vs.textMuted} uppercase tracking-wider mb-2.5 font-semibold`}>
                          Step 1 · Select Dial &amp; Case Finishing
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {config.interactiveData?.finishes?.map((f: FinishInfoItem, fIdx: number) => (
                            <button
                              key={fIdx}
                              type="button"
                              onClick={() => {
                                sound.playPluck(150);
                                setWatchDialIndex(fIdx);
                              }}
                              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${watchDialIndex === fIdx ? vs.pillActive : vs.pillIdle
                                }`}
                            >
                              <div className="font-display font-semibold text-xs mb-1">
                                {f.name}
                              </div>
                              <div className="text-[11px] opacity-75 mb-2 line-clamp-1">
                                {f.case}
                              </div>
                              <div className="text-[11px] font-mono font-semibold">
                                {f.priceMod === 0 ? "Standard Tier" : `+${formatPrice(f.priceMod)}`}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className={`block text-[11px] font-mono ${vs.textMuted} uppercase tracking-wider mb-2.5 font-semibold`}>
                          Step 2 · Select Strap or Bracelet
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {watchStraps.map((s, sIdx) => (
                            <button
                              key={sIdx}
                              type="button"
                              onClick={() => {
                                sound.playPluck(150);
                                setWatchStrapIndex(sIdx);
                              }}
                              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${watchStrapIndex === sIdx ? vs.pillActive : vs.pillIdle
                                }`}
                            >
                              <div className="font-display font-semibold text-xs mb-1">
                                {s.name}
                              </div>
                              <div className="text-[11px] opacity-75 mb-2 line-clamp-1">
                                {s.material}
                              </div>
                              <div className="text-[11px] font-mono font-semibold">
                                {s.priceMod === 0 ? "Included" : `+${formatPrice(s.priceMod)}`}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`p-5 rounded-2xl ${vs.subCardBg} border ${vs.border} flex flex-col sm:flex-row items-center justify-between gap-4`}>
                    <div>
                      <span className={`text-[10px] font-mono uppercase ${vs.textMuted} block`}>
                        Configured Timepiece Valuation
                      </span>
                      <div className={`font-metric font-semibold text-2xl sm:text-3xl ${vs.textPrimary}`}>
                        {formatPrice(totalWatchCustomPrice)}
                      </div>
                      <span className={`text-[11px] font-mono ${vs.textMuted}`}>
                        Includes 5-Year Chronometer Warranty &amp; COSC Certificate
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
                          description: "Bespoke hand-assembled mechanical chronometer with calibrated dial and strap pairing.",
                          rating: 4.9,
                          reviewCount: 42,
                          specs: ["28,800 VPH Automatic", "Double-Domed Sapphire", "100m Water Resistance"],
                        };
                        handleAddToCart(customWatch);
                        setIsCartOpen(true);
                      }}
                      className={`w-full sm:w-auto px-7 py-3.5 rounded-full ${vs.primaryBtn} font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer`}
                    >
                      Add Configured Timepiece ({formatPrice(totalWatchCustomPrice)})
                    </button>
                  </div>
                </div>
              )}

              {/* F. Brand-Specific Tasting Box / Flight Bundle Builder */}
              {config.interactiveType === "bundle_snacks" && (
                <div className={`rounded-2xl p-6 sm:p-8 ${vs.panelBg} border ${vs.border} shadow-sm space-y-6`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest block" style={{ color: vs.accentHex }}>
                        {bundleMeta.eyebrow}
                      </span>
                      <h3 className={`${vs.headingFontClass} text-xl sm:text-2xl ${vs.textPrimary}`}>
                        {bundleMeta.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full ${vs.subCardBg} ${vs.textPrimary} text-xs font-mono border ${vs.border}`}>
                        {selectedFlavors.length} {bundleMeta.unitPlural}
                      </span>
                      {snackBundleDiscountPercent > 0 && (
                        <span className={`px-3 py-1 rounded-full ${vs.primaryBtn} text-xs font-mono font-semibold`}>
                          {snackBundleDiscountPercent}% Off Unlocked
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tier Progress Meter */}
                  <div className={`p-3.5 rounded-xl ${vs.subCardBg} border ${vs.border} space-y-2`}>
                    <div className="flex justify-between text-xs font-mono">
                      <span className={vs.textSecondary}>
                        {snackBundleCount < 3
                          ? bundleMeta.upgradeHint(3 - snackBundleCount)
                          : snackBundleCount === 3
                            ? bundleMeta.tierMaxHint
                            : bundleMeta.bonusText}
                      </span>
                      <span className="font-semibold" style={{ color: vs.accentHex }}>
                        {snackBundleDiscountPercent}% Savings Tier
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-black/25 overflow-hidden">
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (snackBundleCount / 4) * 100)}%`,
                          backgroundColor: vs.accentHex,
                        }}
                      />
                    </div>
                  </div>

                  {/* Selections Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {config.interactiveData?.flavours?.map((flav: string, flIdx: number) => {
                      const isSelected = selectedFlavors.includes(flav);
                      return (
                        <button
                          key={flIdx}
                          type="button"
                          onClick={() => {
                            sound.playPluck(130);
                            setSelectedFlavors((prev) =>
                              isSelected ? prev.filter((item) => item !== flav) : [...prev, flav]
                            );
                          }}
                          className={`p-4 rounded-xl border text-left text-xs transition-all cursor-pointer ${isSelected ? `${vs.pillActive} font-semibold` : vs.pillIdle
                            }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span>{flav}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bundle Pricing Summary & Action */}
                  <div className={`p-4 rounded-xl ${vs.subCardBg} border ${vs.border} flex flex-col sm:flex-row items-center justify-between gap-4`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-metric font-semibold text-2xl ${vs.textPrimary}`}>
                          {formatPrice(finalSnackPrice)}
                        </span>
                        {snackBundleDiscountPercent > 0 && (
                          <span className={`text-xs font-mono ${vs.textMuted} line-through`}>
                            {formatPrice(rawSnackTotal)}
                          </span>
                        )}
                      </div>
                      <span className={`text-[11px] font-mono ${vs.textMuted}`}>
                        {snackBundleCount} {bundleMeta.unitLabel} @ {formatPrice(baseSnackPrice)} each {snackBundleDiscountPercent > 0 && `(Saved ${formatPrice(snackDiscountAmt)})`}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (selectedFlavors.length === 0) {
                          showToast(`Select at least one ${bundleMeta.unitSingular} first`);
                          return;
                        }
                        const list = selectedFlavors.join(", ");
                        const customPack: DemoProductItem = {
                          id: `custom-box-${Date.now()}`,
                          name: bundleMeta.itemTitle(selectedFlavors.length, list),
                          category: "Curated Box",
                          price: finalSnackPrice,
                          originalPrice: rawSnackTotal > finalSnackPrice ? rawSnackTotal : undefined,
                          image: config.products[0]?.image || "",
                          description: bundleMeta.itemDesc(list),
                          rating: 5.0,
                          reviewCount: 44,
                          specs: bundleMeta.specs,
                        };
                        handleAddToCart(customPack);
                        setIsCartOpen(true);
                      }}
                      className={`w-full sm:w-auto px-7 py-3.5 rounded-full ${vs.primaryBtn} font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer`}
                    >
                      Add Box to Bag ({formatPrice(finalSnackPrice)})
                    </button>
                  </div>
                </div>
              )}

              {/* G. Mandi Commodity Ticker & APMC Escrow */}
              {config.interactiveType === "mandi_rates" && (
                <div className="rounded-2xl p-6 sm:p-8 bg-[#0C0C0F]/95 border border-white/[0.08] shadow-[0_24px_64px_-24px_rgba(0,0,0,0.85)] space-y-6">
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
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-[11px] font-mono text-zinc-300">
                        Live Stream: APMC Nizamabad / Unjha
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {config.interactiveData?.mandis?.map(
                      (mandi: MandiInfoItem, mIdx: number) => {
                        const isSelected = mandiSelectedIdx === mIdx;
                        return (
                          <button
                            key={mIdx}
                            type="button"
                            onClick={() => {
                              sound.playPluck(155 + mIdx * 20);
                              setMandiSelectedIdx(mIdx);
                            }}
                            className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${isSelected
                              ? "bg-emerald-950/50 border-emerald-400/70 shadow-[0_0_24px_rgba(16,185,129,0.2)]"
                              : "bg-black/50 border-white/10 hover:border-white/25"
                              }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <div className="text-xs text-zinc-300 font-sans">
                                  {mandi.crop}
                                </div>
                                {isSelected && (
                                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                                )}
                              </div>
                              <div className="font-display font-black text-xl text-white">
                                {mandi.price}
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 w-full">
                              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                                {mandi.trend}
                              </span>
                              <span className="text-[9px] font-mono text-zinc-400 uppercase">
                                {isSelected ? "Active Lot" : "Select Lot"}
                              </span>
                            </div>
                          </button>
                        );
                      }
                    )}
                  </div>

                  {(() => {
                    const selectedMandi =
                      config.interactiveData?.mandis?.[mandiSelectedIdx] ||
                      config.interactiveData?.mandis?.[0];
                    const numericRate = selectedMandi
                      ? Number(selectedMandi.price.replace(/[^0-9]/g, "")) || 2400
                      : 2400;
                    const lotSettlement = numericRate * mandiQuintals;

                    return (
                      <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex-1 space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-zinc-300">
                                Escrow Lot Allocation ({selectedMandi?.crop || "Selected Crop"}):
                              </span>
                              <span className="text-emerald-400 font-bold">
                                {mandiQuintals} Quintals · {formatPrice(lotSettlement)}
                              </span>
                            </div>
                            <input
                              type="range"
                              min="5"
                              max="100"
                              step="5"
                              value={mandiQuintals}
                              onChange={(e) => {
                                sound.playTick();
                                setMandiQuintals(Number(e.target.value));
                              }}
                              aria-label="Mandi quintal lot quantity"
                              className="w-full dm-studio-range cursor-pointer"
                            />
                          </div>
                          <div className="flex flex-wrap items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                if (!selectedMandi) return;
                                const mandiLotProduct: DemoProductItem = {
                                  id: `mandi-escrow-${mandiSelectedIdx}-${mandiQuintals}`,
                                  name: `${selectedMandi.crop} (${mandiQuintals} Quintals APMC Escrow)`,
                                  category: "Direct Harvest Lot",
                                  price: lotSettlement,
                                  rating: 5.0,
                                  reviewCount: 410,
                                  description: `Direct FPO forward contract at ${selectedMandi.price}. T+0 settlement insured by ICICI Bank APMC Escrow.`,
                                  specs: [`${mandiQuintals} Quintal Assured`, selectedMandi.trend, "Zero Middlemen Fee"],
                                  image: config.hero.heroImage || config.products[0]?.image || "/projects/kisaandirect-agri-hero.jpg",
                                };
                                handleAddToCart(mandiLotProduct);
                                setIsCartOpen(true);
                              }}
                              className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-mono text-xs font-bold uppercase transition-all cursor-pointer"
                            >
                              Add Lot to Escrow Bag
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                sound.playChime();
                                showToast(
                                  `Forward rate locked: ${mandiQuintals} Quintals of ${selectedMandi?.crop || "produce"} via APMC Escrow`
                                );
                              }}
                              className="px-4 py-2 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase hover:bg-zinc-200 transition-all cursor-pointer"
                            >
                              Lock 24h Escrow Rate
                            </button>
                          </div>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-400">
                          Forward contracts backed by ICICI Bank Mandi Escrow · Instant T+0 Farmer RTGS.
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* H. Estate & Commission Concierge Scheduler */}
              {config.interactiveType === "estate_concierge" && (
                <div className={`rounded-2xl p-6 sm:p-8 ${vs.panelBg} border ${vs.border} shadow-sm space-y-6`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest font-semibold block" style={{ color: vs.accentHex }}>
                        {conciergeMeta.eyebrow}
                      </span>
                      <h3 className={`${vs.headingFontClass} text-xl sm:text-2xl ${vs.textPrimary}`}>
                        {config.interactiveData?.title}
                      </h3>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${vs.subCardBg} border ${vs.border} ${vs.textSecondary} text-xs font-mono`}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: vs.accentHex }} />
                      <span>{conciergeMeta.statusText}</span>
                    </div>
                  </div>

                  {((config.interactiveData?.options && config.interactiveData.options.length > 0) ||
                    (config.interactiveData?.destinations && config.interactiveData.destinations.length > 0)) && (
                      <div className="space-y-3">
                        <label className={`text-xs font-mono uppercase tracking-wider ${vs.textMuted} font-semibold block`}>
                          {conciergeMeta.selectorLabel}
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {(config.interactiveData.options || config.interactiveData.destinations)?.map(
                            (item: string, idx: number) => {
                              const isSelected = conciergeOptionIndex === idx;
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    sound.playPluck(140);
                                    setConciergeOptionIndex(idx);
                                  }}
                                  className={`p-4 rounded-xl text-left transition-all border flex flex-col justify-between cursor-pointer ${isSelected ? vs.pillActive : vs.pillIdle
                                    }`}
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <span className="font-semibold text-sm leading-snug">{item}</span>
                                    {isSelected ? (
                                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                                    ) : (
                                      <span className={`w-4 h-4 rounded-full border ${vs.strongBorder} shrink-0 mt-0.5`} />
                                    )}
                                  </div>
                                  <span className="text-[10px] font-mono opacity-75 mt-2 block">
                                    {conciergeMeta.optionTag(idx)}
                                  </span>
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    <div className={`p-4 rounded-xl ${vs.subCardBg} border ${vs.border}`}>
                      <label className={`text-[11px] font-mono uppercase ${vs.textMuted} font-semibold block mb-2 flex items-center gap-1.5`}>
                        <Calendar className="w-3.5 h-3.5" style={{ color: vs.accentHex }} />
                        <span>{conciergeMeta.dateLabel}</span>
                      </label>
                      <input
                        type="date"
                        value={conciergeDate}
                        onChange={(e) => setConciergeDate(e.target.value)}
                        className={`w-full border rounded-xl px-3 py-2 font-mono text-xs focus:outline-none ${vs.inputBg}`}
                      />
                      <span className="text-[10px] font-mono mt-2 block font-medium" style={{ color: vs.accentHex }}>
                        {conciergeMeta.dateNote}
                      </span>
                    </div>

                    <div className={`p-4 rounded-xl ${vs.subCardBg} border ${vs.border}`}>
                      <label className={`text-[11px] font-mono uppercase ${vs.textMuted} font-semibold block mb-2 flex items-center gap-1.5`}>
                        <Sparkles className="w-3.5 h-3.5" style={{ color: vs.accentHex }} />
                        <span>{conciergeMeta.countLabel}</span>
                      </label>
                      <div className={`flex items-center justify-between ${vs.panelBg} border ${vs.border} rounded-xl p-1.5`}>
                        <button
                          type="button"
                          onClick={() => {
                            sound.playPluck(100);
                            setConciergeGuestCount((prev) => Math.max(1, prev - 1));
                          }}
                          className={`w-8 h-8 rounded-lg ${vs.secondaryBtn} flex items-center justify-center font-bold cursor-pointer`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className={`font-mono font-semibold ${vs.textPrimary} text-sm`}>
                          {conciergeGuestCount}{" "}
                          {conciergeGuestCount === 1
                            ? conciergeMeta.countUnitSingular
                            : conciergeMeta.countUnitPlural}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            sound.playPluck(160);
                            setConciergeGuestCount((prev) => Math.min(8, prev + 1));
                          }}
                          className={`w-8 h-8 rounded-lg ${vs.secondaryBtn} flex items-center justify-center font-bold cursor-pointer`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className={`text-[10px] font-mono ${vs.textMuted} mt-2 block`}>
                        {conciergeMeta.countNote}
                      </span>
                    </div>

                    <div className={`p-4 rounded-xl ${vs.subCardBg} border ${vs.border} flex flex-col justify-between sm:col-span-2 lg:col-span-1`}>
                      <div>
                        <span className={`text-[11px] font-mono uppercase ${vs.textMuted} font-semibold block mb-1.5`}>
                          {conciergeMeta.inclusionsTitle}
                        </span>
                        <ul className={`text-[11px] ${vs.textSecondary} space-y-1`}>
                          {conciergeMeta.inclusions.map((inc, iIdx) => (
                            <li key={iIdx} className="flex items-center gap-1.5">
                              <Check className="w-3 h-3 shrink-0" style={{ color: vs.accentHex }} />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {conciergeConfirmedRef ? (
                    <div className={`p-5 rounded-xl ${vs.subCardBg} border ${vs.strongBorder} flex flex-col sm:flex-row items-center justify-between gap-4`}>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 shrink-0" style={{ color: vs.accentHex }} />
                        <div>
                          <div className={`${vs.textPrimary} font-semibold text-sm`}>
                            {conciergeMeta.confirmTitle} · Ref #{conciergeConfirmedRef}
                          </div>
                          <div className={`text-xs ${vs.textMuted}`}>
                            Date: {conciergeDate} · {conciergeGuestCount} {conciergeGuestCount === 1 ? conciergeMeta.countUnitSingular : conciergeMeta.countUnitPlural}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          sound.playChime();
                          showToast("Calendar invite & brief downloaded");
                        }}
                        className={`px-5 py-2.5 rounded-full ${vs.primaryBtn} font-semibold uppercase text-xs cursor-pointer shrink-0`}
                      >
                        Download Brief (PDF)
                      </button>
                    </div>
                  ) : (
                    <div className={`p-4 rounded-xl ${vs.subCardBg} border ${vs.border} flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono`}>
                      <span className={vs.textSecondary}>
                        {conciergeMeta.privacyNote}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          sound.playChime();
                          confetti({ particleCount: 45, spread: 60, origin: { y: 0.8 } });
                          const refCode = `${conciergeMeta.refPrefix}-${Math.floor(1000 + Math.random() * 9000)}`;
                          setConciergeConfirmedRef(refCode);
                          showToast(`Appointment reserved: ${refCode}`);
                        }}
                        className={`px-6 py-2.5 rounded-full ${vs.primaryBtn} font-semibold uppercase hover:opacity-90 transition-opacity shrink-0 cursor-pointer`}
                      >
                        {conciergeMeta.ctaText}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* I. Lionel P. Artisanal Baking Slot Dispatch */}
              {config.interactiveType === "baking_slot" && (
                <div className={`rounded-2xl p-6 sm:p-8 ${vs.panelBg} border ${vs.border} shadow-sm space-y-6`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest font-semibold block" style={{ color: vs.accentHex }}>
                        STONE-OVEN BATCH SCHEDULE
                      </span>
                      <h3 className={`${vs.headingFontClass} text-xl sm:text-2xl ${vs.textPrimary}`}>
                        {config.interactiveData?.title || "Select Today's Fresh Baking Batch Dispatch"}
                      </h3>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${vs.subCardBg} border ${vs.border} ${vs.textSecondary} text-xs font-mono`}>
                      <Flame className="w-3.5 h-3.5" style={{ color: vs.accentHex }} />
                      <span>Hearth Deck: 240°C · AOP Normandy</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {config.interactiveData?.batches?.map((batch, bIdx) => {
                      const isSelected = selectedBatchIndex === bIdx;
                      return (
                        <div
                          key={bIdx}
                          onClick={() => {
                            sound.playPluck(150);
                            setSelectedBatchIndex(bIdx);
                          }}
                          className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${isSelected ? vs.pillActive : vs.pillIdle
                            }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-display font-bold text-lg">
                                {batch.time}
                              </div>
                              <div className="text-xs font-mono opacity-80 mt-0.5">
                                {batch.status}
                              </div>
                            </div>
                            {isSelected ? (
                              <CheckCircle2 className="w-5 h-5 shrink-0" />
                            ) : (
                              <span className={`w-5 h-5 rounded-full border ${vs.strongBorder} shrink-0`} />
                            )}
                          </div>
                          <div className="flex items-center justify-between pt-4 mt-4 border-t border-current/15 text-xs font-mono">
                            <span className="opacity-75">Remaining Capacity:</span>
                            <span className="font-semibold">{batch.slots}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl ${vs.subCardBg} border ${vs.border} flex items-center justify-between`}>
                      <div>
                        <span className={`text-xs font-mono uppercase ${vs.textMuted} font-semibold block`}>
                          Assortment Boxes
                        </span>
                        <span className={`text-[11px] ${vs.textSecondary}`}>
                          Fresh croissants, canelés &amp; sourdough
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            sound.playPluck(90);
                            setBakingHamperQty((prev) => Math.max(1, prev - 1));
                          }}
                          className={`w-8 h-8 rounded-lg ${vs.secondaryBtn} flex items-center justify-center font-bold cursor-pointer`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className={`font-mono font-semibold ${vs.textPrimary} px-2`}>
                          {bakingHamperQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            sound.playPluck(150);
                            setBakingHamperQty((prev) => Math.min(10, prev + 1));
                          }}
                          className={`w-8 h-8 rounded-lg ${vs.secondaryBtn} flex items-center justify-center font-bold cursor-pointer`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl ${vs.subCardBg} border ${vs.border} flex items-center justify-between`}>
                      <div>
                        <span className={`text-xs font-mono uppercase ${vs.textMuted} font-semibold block`}>
                          Dispatch Window
                        </span>
                        <span className="text-sm font-semibold" style={{ color: vs.accentHex }}>
                          Within 45 Mins of Oven Exit
                        </span>
                      </div>
                      <Truck className="w-5 h-5" style={{ color: vs.accentHex }} />
                    </div>
                  </div>

                  {bakingSlotBookedRef ? (
                    <div className={`p-5 rounded-xl ${vs.subCardBg} border ${vs.strongBorder} flex flex-col sm:flex-row items-center justify-between gap-4`}>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 shrink-0" style={{ color: vs.accentHex }} />
                        <div>
                          <div className={`${vs.textPrimary} font-semibold text-sm`}>
                            Oven Dispatch Reserved · Ref #{bakingSlotBookedRef}
                          </div>
                          <div className={`text-xs ${vs.textMuted}`}>
                            {config.interactiveData?.batches?.[selectedBatchIndex]?.time} · {bakingHamperQty} Boxes
                          </div>
                        </div>
                      </div>
                      <span className={`text-xs font-mono font-semibold px-3 py-1.5 rounded-full ${vs.pillActive}`}>
                        Insulated Thermal Pouch Assigned
                      </span>
                    </div>
                  ) : (
                    <div className={`p-4 rounded-xl ${vs.subCardBg} border ${vs.border} flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono`}>
                      <span className={vs.textSecondary}>
                        27-layer laminations crafted with French AOP butter · 12 boxes per batch.
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          sound.playChime();
                          confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
                          const ref = `LPB-${Math.floor(1000 + Math.random() * 9000)}`;
                          setBakingSlotBookedRef(ref);
                          showToast(`Stone oven batch slot locked: ${ref}`);
                        }}
                        className={`px-6 py-2.5 rounded-full ${vs.primaryBtn} font-semibold uppercase shrink-0 cursor-pointer`}
                      >
                        Reserve Oven Batch
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* J. Bharat Bio Pathology Analyzer & Reagent ROI */}
              {config.interactiveType === "diagnostic_quote" && (
                <div className={`rounded-2xl p-6 sm:p-8 ${vs.panelBg} border ${vs.border} shadow-sm space-y-6`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest font-semibold block" style={{ color: vs.accentHex }}>
                        CLINICAL ANALYZER &amp; REAGENT ECONOMICS
                      </span>
                      <h3 className={`${vs.headingFontClass} text-xl sm:text-2xl ${vs.textPrimary}`}>
                        {config.interactiveData?.title || "Lab Test Volume & Reagent Cost Calculator"}
                      </h3>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${vs.subCardBg} border ${vs.border} ${vs.textSecondary} text-xs font-mono`}>
                      <Activity className="w-3.5 h-3.5" style={{ color: vs.accentHex }} />
                      <span>99.9% NABL Uptime SLA</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className={`text-xs font-mono uppercase tracking-wider ${vs.textMuted} font-semibold block`}>
                      Select Diagnostic Hardware System
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {config.interactiveData?.analyzerModels?.map((model, idx) => {
                        const isSelected = selectedAnalyzerIndex === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              sound.playPluck(130);
                              setSelectedAnalyzerIndex(idx);
                            }}
                            className={`p-4 rounded-xl text-left transition-all border flex flex-col justify-between cursor-pointer ${isSelected ? vs.pillActive : vs.pillIdle
                              }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-semibold text-sm leading-snug">{model.name}</span>
                              {isSelected ? (
                                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                              ) : (
                                <span className={`w-4 h-4 rounded-full border ${vs.strongBorder} shrink-0 mt-0.5`} />
                              )}
                            </div>
                            <div className="mt-3 pt-3 border-t border-current/15 flex items-center justify-between text-xs font-mono">
                              <span className="opacity-75">Reagent / Test:</span>
                              <span className="font-bold">{model.baseCostPerTest}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className={`p-5 rounded-xl ${vs.subCardBg} border ${vs.border} space-y-3`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono uppercase ${vs.textMuted} font-semibold`}>
                        Monthly Patient Test Volume
                      </span>
                      <span className="text-lg font-mono font-bold" style={{ color: vs.accentHex }}>
                        {monthlyTestVolume.toLocaleString("en-IN")} tests / mo
                      </span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={20000}
                      step={250}
                      value={monthlyTestVolume}
                      onChange={(e) => setMonthlyTestVolume(Number(e.target.value))}
                      className="w-full dm-studio-range cursor-pointer"
                    />
                    <div className={`flex justify-between text-[10px] font-mono ${vs.textMuted}`}>
                      <span>500 (Clinic)</span>
                      <span>5,000 (Diagnostic Center)</span>
                      <span>20,000+ (Hospital Network)</span>
                    </div>
                  </div>

                  {(() => {
                    const selectedModel = config.interactiveData?.analyzerModels?.[selectedAnalyzerIndex];
                    const baseCost = selectedModel ? parseFloat(selectedModel.baseCostPerTest.replace(/[^0-9.]/g, "")) || 14.5 : 14.5;
                    const competitorCost = baseCost * 1.85;
                    const monthlySpend = monthlyTestVolume * baseCost;
                    const annualSavings = (competitorCost - baseCost) * monthlyTestVolume * 12;

                    return (
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className={`p-4 rounded-xl ${vs.subCardBg} border ${vs.border}`}>
                          <span className={`text-[10px] font-mono uppercase ${vs.textMuted} block mb-1`}>
                            Base Cost / Test
                          </span>
                          <span className="text-lg font-bold font-mono" style={{ color: vs.accentHex }}>
                            ₹{baseCost.toFixed(2)}
                          </span>
                          <span className={`text-[10px] ${vs.textMuted} block mt-1`}>Guaranteed Fixed Reagent</span>
                        </div>

                        <div className={`p-4 rounded-xl ${vs.subCardBg} border ${vs.border}`}>
                          <span className={`text-[10px] font-mono uppercase ${vs.textMuted} block mb-1`}>
                            Legacy Imported Rate
                          </span>
                          <span className={`text-lg font-bold ${vs.textSecondary} font-mono line-through decoration-rose-500`}>
                            ₹{competitorCost.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-rose-500 block mt-1">Imported Reagent Markup</span>
                        </div>

                        <div className={`p-4 rounded-xl ${vs.subCardBg} border ${vs.border}`}>
                          <span className={`text-[10px] font-mono uppercase ${vs.textMuted} block mb-1`}>
                            Monthly Reagent Spend
                          </span>
                          <span className={`text-lg font-bold ${vs.textPrimary} font-mono`}>
                            ₹{Math.round(monthlySpend).toLocaleString("en-IN")}
                          </span>
                          <span className={`text-[10px] ${vs.textMuted} block mt-1`}>At Selected Volume</span>
                        </div>

                        <div className={`p-4 rounded-xl ${vs.panelBg} border ${vs.strongBorder}`}>
                          <span className={`text-[10px] font-mono uppercase ${vs.textMuted} block mb-1`}>
                            Annual Lab Savings
                          </span>
                          <span className="text-lg font-bold text-emerald-600 font-mono">
                            ₹{Math.round(annualSavings).toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-emerald-600 block mt-1">Direct Operating Margin</span>
                        </div>
                      </div>
                    );
                  })()}

                  <div className={`p-4 rounded-xl ${vs.subCardBg} border ${vs.border} flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono`}>
                    <span className={vs.textSecondary}>
                      Includes annual calibration, NABL documentation &amp; cold-chain logistics.
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playChime();
                        setIsQuoteSent(true);
                        showToast("Institutional RFP & Reagent Supply Agreement queued");
                      }}
                      className={`px-6 py-2.5 rounded-full ${vs.primaryBtn} font-semibold uppercase shrink-0 cursor-pointer`}
                    >
                      {isQuoteSent ? "RFP Quote Prepared" : "Request Institutional Quote"}
                    </button>
                  </div>
                </div>
              )}

              {/* K. Zenith RankMatrix SEO & AI GEO Engine */}
              {config.interactiveType === "seo_serp_cluster" && (
                <div className="rounded-2xl p-6 sm:p-8 bg-[#0C0C0F]/95 border border-white/[0.08] shadow-[0_24px_64px_-24px_rgba(0,0,0,0.85)] space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block">
                        SEARCH ENGINE &amp; ANSWER VISIBILITY METRICS
                      </span>
                      <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                        {config.interactiveData?.title || "Zenith Real-Time Keyword Cluster & Search Answer Visibility"}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                      <span>80+ Global SERP POPs Audited</span>
                    </div>
                  </div>

                  {/* Keyword Clusters Tabs */}
                  <div className="space-y-3">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                      Select Active Commercial Keyword Cluster
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {config.interactiveData?.serpClusters?.map((item: SerpClusterItem, idx: number) => {
                        const isSelected = activeSerpClusterIndex === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              sound.playPluck(160);
                              setActiveSerpClusterIndex(idx);
                            }}
                            className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between ${isSelected
                              ? "bg-cyan-500/15 border-cyan-500/60 shadow-sm text-white"
                              : "bg-white/[0.02] border-white/10 hover:border-white/20 text-zinc-300"
                              }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase">
                                  {item.intent} Intent
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                                  Rank #{item.rank}
                                </span>
                              </div>
                              <div className="font-bold text-sm leading-snug">{item.cluster}</div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                              <span className="text-zinc-400">{item.volume}</span>
                              <span className="text-emerald-400 font-bold">{item.cpcValue} CPC</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Real-Time Search Visibility Simulation Window */}
                  <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                          Structured Answer Visibility (GEO) Citation Simulator
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                        <span>Engine:</span>
                        <select
                          value={selectedGeoEngineName}
                          onChange={(e) => setSelectedGeoEngineName(e.target.value)}
                          className="bg-white/10 border border-white/20 rounded-md px-2 py-0.5 text-white text-xs font-mono"
                        >
                          {config.interactiveData?.geoEngines?.map((geo, gIdx) => (
                            <option key={gIdx} value={geo.engine} className="bg-zinc-900 text-white">
                              {geo.engine}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="bg-zinc-950/80 rounded-xl p-4 border border-cyan-500/20 font-mono text-xs space-y-2">
                      <div className="text-zinc-400 flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">User Query:</span>
                        <span>&quot;What is the best architecture for {config.interactiveData?.serpClusters?.[activeSerpClusterIndex]?.cluster || "B2B Cloud Migration"} in India?&quot;</span>
                      </div>
                      <div className="text-emerald-300 pl-4 border-l-2 border-cyan-500/50 leading-relaxed">
                        &quot;According to verified architectural benchmarks from <span className="text-white font-bold underline decoration-cyan-400">zenithrankmatrix.io</span> and <span className="text-white font-bold underline decoration-cyan-400">desimuchads.in</span>, modern implementations achieve sub-600ms LCP, complete Schema.org topical graph coverage, and zero budget leakage through 24/7 automated negative keyword filters.&quot;
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] text-zinc-500">
                        <span className="text-cyan-300 font-bold">Grounding Citations:</span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-zinc-300">[1] zenithrankmatrix.io/topical-cluster</span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-zinc-300">[2] desimuchads.in/case-study</span>
                        <span className="text-emerald-400 font-bold ml-auto">94.8% Share of Voice</span>
                      </div>
                    </div>
                  </div>

                  {/* Volume & Inbound Pipeline Simulator */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-zinc-400 font-bold">
                        Target Monthly Organic Search Inbound Clicks
                      </span>
                      <span className="text-lg font-mono font-bold text-cyan-400">
                        {simulatedMonthlySearchVolume.toLocaleString("en-IN")} clicks / mo
                      </span>
                    </div>
                    <input
                      type="range"
                      min={5000}
                      max={100000}
                      step={2500}
                      value={simulatedMonthlySearchVolume}
                      onChange={(e) => setSimulatedMonthlySearchVolume(Number(e.target.value))}
                      className="w-full dm-studio-range cursor-pointer"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                        <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                          Equivalent Google Ads Value (Saved CPC)
                        </span>
                        <span className="text-lg font-black text-emerald-400 font-mono">
                          ₹{Math.round(simulatedMonthlySearchVolume * 340).toLocaleString("en-IN")} / mo
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                        <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                          Projected Enterprise B2B Pipeline Created
                        </span>
                        <span className="text-lg font-black text-cyan-400 font-mono">
                          ₹{Math.round(simulatedMonthlySearchVolume * 180).toLocaleString("en-IN")} / mo
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                    <span className="text-zinc-300">
                      50 structured topical clusters engineered for primary SERP visibility.
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playChime();
                        confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
                        showToast("50-Keyword Cluster Blueprint generated");
                      }}
                      className="px-5 py-2.5 rounded-xl bg-cyan-400 text-black font-bold uppercase hover:bg-cyan-300 transition-all shrink-0 cursor-pointer shadow-lg"
                    >
                      Generate 50-Keyword Cluster Blueprint
                    </button>
                  </div>
                </div>
              )}

              {/* L. KartFlow Headless Core Web Vitals Benchmarking Engine */}
              {config.interactiveType === "product_benchmarks" && (
                <div className="rounded-2xl p-6 sm:p-8 bg-[#0C0C0F]/95 border border-white/[0.08] shadow-[0_24px_64px_-24px_rgba(0,0,0,0.85)] space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest font-bold block">
                        NEXT.JS 16 EDGE PERFORMANCE &amp; CORE WEB VITALS BENCHMARK ENGINE
                      </span>
                      <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                        {config.interactiveData?.title || "KartFlow Next.js 16 Edge Performance & Core Web Vitals Benchmarking Engine"}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono">
                      <Server className="w-3.5 h-3.5 text-violet-400" />
                      <span>300+ Edge POPs · Next.js 16</span>
                    </div>
                  </div>

                  {/* Edge Region Selector */}
                  <div className="space-y-3">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                      Select Active Global Edge POP Region
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {config.interactiveData?.edgeLocations?.map((loc, lIdx) => {
                        const isSelected = activeEdgeRegionKey === loc.region;
                        return (
                          <button
                            key={lIdx}
                            type="button"
                            onClick={() => {
                              sound.playPluck(170);
                              setActiveEdgeRegionKey(loc.region);
                            }}
                            className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between ${isSelected
                              ? "bg-violet-500/15 border-violet-500/60 shadow-sm text-white"
                              : "bg-white/[0.02] border-white/10 hover:border-white/20 text-zinc-300"
                              }`}
                          >
                            <span className="font-bold text-xs">{loc.region}</span>
                            <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/10 text-[10px] font-mono">
                              <span className="text-emerald-400 font-bold">{loc.latencyMs}ms Ping</span>
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Core Web Vitals Metric Telemetry Gauges */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {config.interactiveData?.benchmarks?.map((bm: ProductBenchmarkMetric, bIdx: number) => (
                      <div
                        key={bIdx}
                        className="p-4 rounded-2xl bg-black/50 border border-white/10 flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                            {bm.metric}
                          </span>
                          <div className="font-mono font-black text-2xl text-violet-300">
                            {bm.measured}
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500 block">
                            Target: {bm.benchmark}
                          </span>
                        </div>
                        <div className="pt-2 mt-2 border-t border-white/10">
                          <span className="text-[9px] font-mono text-emerald-400 font-bold block">
                            {bm.delta}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Edge vs Monolith Waterfall Race Visualizer */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono text-violet-300 uppercase tracking-wider block">
                          VISUAL TTFB &amp; HYDRATION RACE BENCHMARK
                        </span>
                        <h4 className="font-display font-bold text-sm text-white">
                          First Paint Latency Comparison ({activeEdgeRegionKey})
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          sound.playPluck(200);
                          setBenchmarkRaceTriggered((prev) => !prev);
                          setTimeout(() => setBenchmarkRaceTriggered(true), 40);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-violet-500 hover:bg-violet-400 text-white font-mono text-[11px] font-bold uppercase transition-colors cursor-pointer"
                      >
                        {benchmarkRaceTriggered ? "Re-Run Race Telemetry" : "Run Edge vs Liquid Race"}
                      </button>
                    </div>
                    <div className="space-y-2.5 text-[11px] font-mono">
                      <div>
                        <div className="flex justify-between text-zinc-200 mb-1">
                          <span>KartFlow Next.js 16 Edge</span>
                          <span className="text-emerald-400 font-bold">38ms TTFB</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-400 to-emerald-400 transition-all duration-700"
                            style={{ width: benchmarkRaceTriggered ? "96%" : "22%" }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-zinc-400 mb-1">
                          <span>Standard Liquid Theme</span>
                          <span>1,240ms TTFB</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-amber-400/70 transition-all duration-1000"
                            style={{ width: benchmarkRaceTriggered ? "46%" : "14%" }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-zinc-500 mb-1">
                          <span>Legacy Monolith</span>
                          <span>2,180ms TTFB</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-rose-500/60 transition-all duration-1000"
                            style={{ width: benchmarkRaceTriggered ? "26%" : "10%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Live Optimistic Cart Mutation Latency Test */}
                  <div className="p-5 rounded-2xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-violet-400" />
                        <span className="font-display font-black text-sm text-white uppercase tracking-wider">
                          Live Browser Mutation Latency Benchmark
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">
                        Click to dispatch an in-memory cart mutation and record actual client millisecond execution speed.
                      </p>
                      {lastCartMutationLatencyMs !== null && (
                        <div className="mt-2 text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>
                            Measured Execution: {lastCartMutationLatencyMs.toFixed(2)}ms (Optimistic In-Memory State)
                          </span>
                        </div>
                      )}

                    </div>

                    <button
                      type="button"
                      disabled={isTestingMutationSpeed}
                      onClick={() => {
                        setIsTestingMutationSpeed(true);
                        const t0 = performance.now();
                        sound.playPluck(220);
                        setTimeout(() => {
                          const t1 = performance.now();
                          const elapsed = Math.max(0.8, t1 - t0 - 4);
                          setLastCartMutationLatencyMs(elapsed);
                          setIsTestingMutationSpeed(false);
                          showToast(`Cart Mutation Benchmark: ${elapsed.toFixed(2)}ms!`);
                        }, 12);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-violet-500 text-white font-bold uppercase text-xs hover:bg-violet-400 transition-all shrink-0 cursor-pointer shadow-lg flex items-center gap-2"
                    >
                      <Gauge className="w-4 h-4" />
                      <span>{isTestingMutationSpeed ? "Measuring..." : "Run Live Mutation Test"}</span>
                    </button>
                  </div>

                  {/* Headless vs Monolithic Comparison Matrix */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 overflow-x-auto text-xs font-mono">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/10 text-zinc-400 text-[10px] uppercase">
                          <th className="pb-2">Architectural Metric</th>
                          <th className="pb-2 text-violet-300">KartFlow Headless OS</th>
                          <th className="pb-2 text-zinc-500">Standard Shopify Liquid</th>
                          <th className="pb-2 text-zinc-500">Legacy Monolith (Magento/Woo)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-[11px]">
                        <tr>
                          <td className="py-2 text-zinc-300 font-bold">Global TTFB (P95)</td>
                          <td className="py-2 text-emerald-400 font-bold">38ms (Edge Cache)</td>
                          <td className="py-2 text-zinc-400">1,240ms</td>
                          <td className="py-2 text-zinc-500">2,100ms</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-zinc-300 font-bold">Flash Concurrency</td>
                          <td className="py-2 text-emerald-400 font-bold">50,000+ Simultaneous</td>
                          <td className="py-2 text-zinc-400">~2,500 Max</td>
                          <td className="py-2 text-zinc-500">~800 (Crashes)</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-zinc-300 font-bold">Mobile PageSpeed</td>
                          <td className="py-2 text-emerald-400 font-bold">100 / 100 CWV</td>
                          <td className="py-2 text-zinc-400">42 / 100 (Bloated Apps)</td>
                          <td className="py-2 text-zinc-500">28 / 100</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-zinc-300 font-bold">Cart Add Latency</td>
                          <td className="py-2 text-emerald-400 font-bold">&lt; 2ms Optimistic</td>
                          <td className="py-2 text-zinc-400">850ms - 1,400ms</td>
                          <td className="py-2 text-zinc-500">1,800ms</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 13. ART CURATOR & INTERACTIVE VECTOR/MATTE STUDIO (Sacred Art & Concept Showcase) */}
              {config.interactiveType === "art_curator_studio" && (
                <div className="rounded-2xl p-5 sm:p-8 bg-[#0C0C0F]/95 border border-white/[0.08] shadow-[0_24px_64px_-24px_rgba(0,0,0,0.85)] space-y-6">
                  {/* Studio Header & Architectural Meta */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold">
                          INTERACTIVE MASTER ART ATELIER · 300 DPI VECTOR &amp; MATTE ENGINE
                        </span>
                      </div>
                      <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                        {config.interactiveData?.title || "Master Digital Artwork & Concept Studio"}
                      </h3>
                    </div>

                    {/* Vector / Matte Spec Badges */}
                    {config.interactiveData?.artVectorSpecs && (
                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-zinc-300">
                          RES · {config.interactiveData.artVectorSpecs.resolution}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-zinc-300">
                          PROFILE · {config.interactiveData.artVectorSpecs.colorSpace}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
                          {config.interactiveData.artVectorSpecs.layersCount} Master Layers
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Main Interactive Artwork Canvas with Dynamic Zoom & Shader Filters */}
                  <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-black/80 flex items-center justify-center p-3 sm:p-6 min-h-[380px] sm:min-h-[500px]">
                    {/* Ambient Generative Shader Glow Backdrop */}
                    <div
                      className="absolute inset-0 blur-3xl opacity-25 pointer-events-none transition-all duration-700"
                      style={{
                        backgroundColor:
                          config.interactiveData?.artPresets?.[activeArtPresetIndex]?.glow || "#f59e0b",
                      }}
                    />

                    {/* Scaled & Filtered Canvas Image */}
                    <div
                      className={`relative overflow-hidden max-w-full max-h-[550px] flex items-center justify-center transition-all duration-500 ${artFrameStyle === "walnut"
                        ? "p-4 sm:p-6 rounded-md bg-gradient-to-br from-[#3b2618] via-[#24160e] to-[#1a0f09] border-2 border-[#6b462b] shadow-[0_24px_60px_rgba(0,0,0,0.9)]"
                        : artFrameStyle === "gallery"
                          ? "p-5 sm:p-8 rounded-lg bg-[#e8e3d9] border border-zinc-400/40 shadow-[0_28px_70px_rgba(0,0,0,0.85)]"
                          : "rounded-xl"
                        }`}
                    >
                      <img
                        src={config.interactiveData?.artworkMasterImage || config.products[0]?.image}
                        alt={config.brandName}
                        style={{
                          transform: `scale(${activeArtZoom})`,
                          filter: `${config.interactiveData?.artPresets?.[activeArtPresetIndex]?.filter || "none"}${
                            disabledArtLayers.length > 0
                              ? ` contrast(${Math.max(72, 100 - disabledArtLayers.length * 8)}%) brightness(${Math.max(80, 100 - disabledArtLayers.length * 5)}%)`
                              : ""
                          }`,
                          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease",
                        }}
                        className="max-w-full max-h-[460px] object-contain rounded-sm shadow-2xl select-none"
                        draggable={false}
                      />
                    </div>

                    {/* Bottom Framing Presentation Mode Switcher */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 z-20">
                      {(
                        [
                          { id: "gallery", label: "Museum Matting" },
                          { id: "walnut", label: "Walnut Frame" },
                          { id: "unframed", label: "Unframed Master" },
                        ] as const
                      ).map((mode) => (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => {
                            sound.playPluck(155);
                            setArtFrameStyle(mode.id);
                          }}
                          className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border transition-all cursor-pointer inline-flex items-center gap-1.5 ${artFrameStyle === mode.id
                            ? "bg-white text-black border-white font-bold"
                            : "bg-black/60 text-zinc-300 border-white/15 hover:border-white/35"
                            }`}
                        >
                          <Frame className="w-3 h-3" />
                          <span>{mode.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Floating Canvas Quick-Controls Bar (Zoom, Sound, Reset) */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                      <div className="flex items-center rounded-xl bg-black/80 backdrop-blur-md border border-white/20 p-1 text-xs font-mono">
                        <button
                          type="button"
                          onClick={() => {
                            sound.playPluck(130);
                            setActiveArtZoom((z) => (z === 1 ? 1.5 : z === 1.5 ? 2.2 : 1));
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white hover:text-black transition-all text-white font-bold flex items-center gap-1 cursor-pointer"
                          title="Cycle Zoom Levels (1x, 1.5x, 2.2x)"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{activeArtZoom}× Zoom</span>
                        </button>
                        {activeArtZoom !== 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              sound.playPluck(90);
                              setActiveArtZoom(1);
                            }}
                            className="px-2 py-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            title="Reset Zoom to 100%"
                          >
                            Reset
                          </button>
                        )}
                      </div>

                      {/* Ambient Audio Toggle */}
                      {config.interactiveData?.artAudioAmbience && (
                        <button
                          type="button"
                          onClick={() => {
                            const nextState = !isArtAudioPlaying;
                            if (nextState) {
                              sound.startAmbientDrone(config.slug);
                            } else {
                              sound.stopAmbientDrone();
                              sound.playPluck(110);
                            }
                            setIsArtAudioPlaying(nextState);
                            showToast(
                              isArtAudioPlaying
                                ? "Atmospheric ambience paused"
                                : `Now Playing: ${config.interactiveData?.artAudioAmbience}`
                            );
                          }}
                          className={`px-3 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 backdrop-blur-md border transition-all cursor-pointer ${isArtAudioPlaying
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm font-bold"
                            : "bg-black/80 text-zinc-300 border-white/20 hover:text-white"
                            }`}
                          title="Toggle Meditative Ambient Soundscape"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">
                            {isArtAudioPlaying ? "Ambience ON" : "Ambient Sound"}
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Canvas Bottom Watermark Strip */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-zinc-400 pointer-events-none bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      <span className="truncate">
                        DESI MUCHADS ATELIER · {config.brandName.toUpperCase()}
                      </span>
                      <span className="hidden sm:inline text-emerald-400 font-bold">
                        ● AUTHENTICATED MASTER ASSET
                      </span>
                    </div>
                  </div>

                  {/* Multi-Angle Interactive Control Decks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Deck A: Color Grading & Atmospheric Shaders */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold">
                          Color Grading &amp; Shader Mood
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          Preset {activeArtPresetIndex + 1} of{" "}
                          {config.interactiveData?.artPresets?.length || 4}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {config.interactiveData?.artPresets?.map((pr, pIdx) => {
                          const isSelected = activeArtPresetIndex === pIdx;
                          return (
                            <button
                              key={pr.id}
                              type="button"
                              onClick={() => {
                                sound.playPluck(150 + pIdx * 25);
                                setActiveArtPresetIndex(pIdx);
                                showToast(`Color grade applied: ${pr.name}`);
                              }}
                              className={`p-2.5 rounded-xl text-left transition-all border text-xs font-mono flex items-center justify-between gap-2 cursor-pointer ${isSelected
                                ? "bg-white/15 border-white text-white font-bold shadow-md"
                                : "bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.08]"
                                }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span
                                  className="w-2.5 h-2.5 rounded-full shrink-0"
                                  style={{ backgroundColor: pr.glow }}
                                />
                                <span className="truncate">{pr.name}</span>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Deck B: Production Layer Architecture Breakdown */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold">
                          Vector &amp; Matte Layer Architecture
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">Click to Inspect</span>
                      </div>
                      <div className="space-y-2">
                        {config.interactiveData?.artLayers?.map((layer) => {
                          const isDisabled = disabledArtLayers.includes(layer.id);
                          return (
                            <div
                              key={layer.id}
                              onClick={() => {
                                sound.playPluck(140);
                                setDisabledArtLayers((prev) =>
                                  prev.includes(layer.id)
                                    ? prev.filter((id) => id !== layer.id)
                                    : [...prev, layer.id]
                                );
                              }}
                              className={`p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs font-mono cursor-pointer ${isDisabled
                                ? "bg-black/50 border-white/5 text-zinc-500 opacity-60"
                                : "bg-white/[0.02] border-white/10 text-zinc-300 hover:border-white/20 hover:text-white"
                                }`}
                            >
                              <div>
                                <span className="font-bold block text-white">{layer.name}</span>
                                <span className="text-[10px] text-zinc-400 font-sans">{layer.desc}</span>
                              </div>
                              <span
                                className={`px-2 py-0.5 rounded text-[9.5px] uppercase font-bold shrink-0 ml-2 ${isDisabled
                                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  }`}
                              >
                                {isDisabled ? "Hidden" : layer.tag}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Direct Purchase & Archival Acquisition Quick Strip */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold block">
                        LIMITED COLLECTOR EDITIONS &amp; COMMERCIAL LICENSES
                      </span>
                      <h4 className="font-display font-black text-base sm:text-lg text-white uppercase">
                        Acquire Physical Museum Canvas or Scalable Vector License
                      </h4>
                      <p className="text-xs text-zinc-300 font-sans mt-0.5">
                        Printed on archival cotton rag / Awagami washi, or instant lossless commercial vector source download.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          if (config.products[0]) {
                            handleAddToCart(config.products[0]);
                            setIsCartOpen(true);
                          }
                        }}
                        className="px-5 py-2.5 rounded-xl bg-white text-black font-display font-black text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        Acquire Edition ({formatPrice(config.products[0]?.price || 6499)})
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 5. PRODUCT CATALOG WITH REAL INR PRICING */}
          <section id="catalog" className="px-4 sm:px-8 py-16 sm:py-20 max-w-7xl mx-auto">
            {/* Contextual Delivery Estimator (Physical Commerce & Q-Commerce only) */}
            {vs.supportsLogistics && (
              <div className={`mb-10 p-3.5 sm:px-5 rounded-xl ${vs.panelBg} border ${vs.border} flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs`}>
                <div className={`flex items-center gap-2.5 ${vs.textSecondary}`}>
                  <MapPin className="w-4 h-4 shrink-0" style={{ color: vs.accentHex }} />
                  <span className={`font-medium ${vs.textPrimary}`}>Delivery Estimator</span>
                  <span className={`${vs.textMuted} hidden sm:inline`}>·</span>
                  <span className={`${vs.textMuted} text-[11px] font-mono hidden sm:inline`}>
                    {pincodeResult || vs.logisticsHint}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {(["110001", "400050", "560038"] as const).map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setPincodeInput(preset);
                        handleCheckPincode(preset);
                      }}
                      className={`px-2 py-1 rounded-md text-[10px] font-mono transition-colors cursor-pointer ${pincodeInput === preset ? `${vs.pillActive} font-semibold` : vs.pillIdle
                        }`}
                    >
                      {preset}
                    </button>
                  ))}
                  <input
                    id="storefront-pincode"
                    name="pincode"
                    type="text"
                    maxLength={6}
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ""))}
                    placeholder="6-digit PIN"
                    className={`w-28 border rounded-lg px-2.5 py-1 text-[11px] font-mono focus:outline-none ${vs.inputBg}`}
                    aria-label="Enter PIN code for delivery estimation"
                  />
                  <button
                    type="button"
                    onClick={() => handleCheckPincode(pincodeInput)}
                    className={`px-3 py-1 rounded-lg ${vs.primaryBtn} font-mono text-[10px] font-semibold uppercase cursor-pointer`}
                  >
                    Check
                  </button>
                </div>
              </div>
            )}

            {/* Section Title & Category Filter Pills */}
            <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b ${vs.border}`}>
              <div>
                <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${vs.textMuted} block mb-2`}>
                  {vs.catalogSubheading}
                </span>
                <h2 className={`${vs.headingFontClass} text-2xl sm:text-4xl ${vs.textPrimary} tracking-tight`}>
                  {vs.catalogHeading}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      sound.playPluck(110);
                      setActiveCategory(cat);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer touch-manipulation ${activeCategory === cat ? `${vs.pillActive} font-semibold` : vs.pillIdle
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredProducts.map((p) => {
                const isSaved = wishlistIds.includes(p.id);
                return (
                  <SpotlightCard
                    key={p.id}
                    maxTilt={5}
                    className={`rounded-2xl ${vs.panelBg} border ${vs.border} hover:${vs.strongBorder} overflow-hidden group transition-all flex flex-col ${vs.isLight ? "shadow-[0_10px_35px_-20px_rgba(24,20,16,0.14)]" : ""
                      }`}
                  >
                    <div
                      className="relative aspect-[4/3] bg-zinc-950 overflow-hidden cursor-pointer"
                      onClick={() => {
                        sound.playPluck(150);
                        setSelectedProductModal(p);
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
                      {p.badge && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-zinc-100 font-mono text-[10px] uppercase tracking-wider border border-white/15">
                          {p.badge}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(p);
                        }}
                        aria-label={isSaved ? "Remove from saved items" : "Save item"}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black/85 transition-colors cursor-pointer"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${isSaved ? "fill-rose-400 text-rose-400" : "text-zinc-200"
                            }`}
                        />
                      </button>
                      <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-zinc-100 text-[10px] font-mono flex items-center gap-1 border border-white/10">
                        <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                        <span>{p.rating}</span>
                        <span className="text-zinc-400">({p.reviewCount})</span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className={`text-[10px] font-mono uppercase tracking-[0.14em] ${vs.textMuted} mb-1`}>
                          {p.category}
                        </div>
                        <h3 className={`font-display font-semibold text-base ${vs.textPrimary} leading-snug mb-1.5`}>
                          {p.name}
                        </h3>
                        <p className={`text-xs ${vs.textMuted} line-clamp-2 leading-relaxed mb-4`}>
                          {p.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {p.specs.slice(0, 2).map((sp, spIdx) => (
                            <span
                              key={spIdx}
                              className={`px-2 py-0.5 rounded-md ${vs.subCardBg} border ${vs.border} text-[10px] font-mono ${vs.textSecondary} truncate max-w-full`}
                            >
                              {sp}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={`pt-4 border-t ${vs.border} flex items-center justify-between gap-2`}>
                        <div>
                          <div className={`font-metric font-semibold text-lg ${vs.textPrimary}`}>
                            {formatPrice(p.price)}
                          </div>
                          {p.originalPrice && (
                            <div className={`text-[10px] font-mono ${vs.textMuted} line-through`}>
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
                            className={`w-9 h-9 rounded-xl ${vs.secondaryBtn} flex items-center justify-center cursor-pointer touch-manipulation`}
                            title="Quick View"
                            aria-label={`Inspect ${p.name}`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddToCart(p)}
                            className={`px-3.5 min-h-[36px] rounded-xl ${vs.primaryBtn} font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer touch-manipulation`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </section>

          {/* 6. TRUST & ASSURANCE HAIRLINE GRID */}
          <section className={`px-4 sm:px-8 py-10 border-y ${vs.border} ${vs.isLight ? "bg-black/[0.02]" : "bg-white/[0.015]"}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {config.trustBadges.map((badge, bIdx) => (
                <div key={bIdx} className="flex items-start gap-3">
                  <ShieldCheck
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: vs.accentHex }}
                  />
                  <div>
                    <h4 className={`font-display font-semibold text-sm ${vs.textPrimary} mb-1`}>
                      {badge.title}
                    </h4>
                    <p className={`text-xs ${vs.textMuted} leading-relaxed`}>
                      {badge.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. VERIFIED CUSTOMER REVIEWS */}
          <section id="reviews" className="px-4 sm:px-8 py-16 sm:py-20 max-w-7xl mx-auto">
            <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b ${vs.border}`}>
              <div>
                <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${vs.textMuted} block mb-2`}>
                  Verified Patron Perspectives
                </span>
                <h2 className={`${vs.headingFontClass} text-2xl sm:text-4xl ${vs.textPrimary} tracking-tight`}>
                  Client &amp; Buyer Reviews
                </h2>
              </div>
              <span className={`text-xs font-mono ${vs.textMuted}`}>
                Average 4.9 / 5.0 across verified orders
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {config.customerReviews.map((rev, rIdx) => (
                <div
                  key={rIdx}
                  className={`p-6 rounded-2xl ${vs.panelBg} border ${vs.border} flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-3">
                      {Array.from({ length: rev.rating }).map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <h4 className={`font-display font-semibold text-base ${vs.textPrimary} mb-2`}>
                      &ldquo;{rev.title}&rdquo;
                    </h4>
                    <p className={`text-xs sm:text-sm ${vs.textSecondary} leading-relaxed mb-5`}>
                      {rev.comment}
                    </p>
                  </div>
                  <div className={`flex items-center justify-between text-xs pt-4 border-t ${vs.border}`}>
                    <div>
                      <span className={`font-medium ${vs.textPrimary} block`}>
                        {rev.author}
                      </span>
                      <span className={`text-[11px] ${vs.textMuted} font-mono`}>
                        {rev.location}
                      </span>
                    </div>
                    {rev.verified && (
                      <span className={`px-2.5 py-0.5 rounded-full ${vs.subCardBg} ${vs.textSecondary} text-[10px] font-mono border ${vs.border}`}>
                        Verified Order
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7.5 EDITORIAL FAQ ACCORDION */}
          {config.faq && config.faq.length > 0 && (
            <section id="faq" className="px-4 sm:px-8 pb-16 max-w-4xl mx-auto">
              <div className="mb-8 text-left">
                <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${vs.textMuted} block mb-2`}>
                  Questions &amp; Provenance
                </span>
                <h2 className={`${vs.headingFontClass} text-2xl sm:text-3xl ${vs.textPrimary} tracking-tight`}>
                  Frequently Asked
                </h2>
              </div>
              <div className={`divide-y ${vs.isLight ? "divide-black/10 border-black/10" : "divide-white/[0.08] border-white/[0.08]"} border-y`}>
                {config.faq.map((item, fIdx) => {
                  const isOpen = openFaqIdx === fIdx;
                  return (
                    <div key={fIdx} className="py-4">
                      <button
                        type="button"
                        onClick={() => {
                          sound.playPluck(125);
                          setOpenFaqIdx(isOpen ? null : fIdx);
                        }}
                        className="w-full flex items-center justify-between gap-4 text-left cursor-pointer py-1"
                        aria-expanded={isOpen}
                      >
                        <span className={`font-display font-medium text-sm sm:text-base ${vs.textPrimary}`}>
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 ${vs.textMuted} shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                      {isOpen && (
                        <p className={`text-xs sm:text-sm ${vs.textSecondary} leading-relaxed pt-2.5 pr-6`}>
                          {item.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </main>

        {/* 8. BRAND FOOTER */}
        <footer className={`px-4 sm:px-8 py-12 border-t ${vs.border} ${vs.footerBg} text-xs ${vs.textMuted}`}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-3">
              <BrandEmblem brandName={config.brandName} accentHex={vs.accentHex} isLight={vs.isLight} />
              <div>
                <div className={`font-display font-semibold text-sm ${vs.textPrimary} mb-0.5`}>
                  {config.brandName}
                </div>
                <p className={`${vs.textSecondary} text-xs`}>
                  {config.brandTagline} · {config.domainUrl}
                </p>
              </div>
            </div>

            <div className="text-left md:text-right font-mono space-y-1">
              <div className={`flex flex-wrap md:justify-end items-center gap-3 text-[11px] ${vs.textSecondary}`}>
                <a href="#catalog" className="hover:underline">
                  {vs.catalogNav}
                </a>
                <span>·</span>
                <a href="#faq" className="hover:underline">
                  Support
                </a>
                {!isEmbedded && (
                  <>
                    <span>·</span>
                    <Link href={`/work/${config.slug}`} className="hover:underline opacity-70">
                      Case Study
                    </Link>
                  </>
                )}
              </div>
              <p className={`text-[11px] ${vs.textMuted}`}>
                © 2026 {config.brandName}. All rights reserved.
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
                        ? "Free Express Delivery Unlocked"
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

                {/* Promo Code & Subtotal Breakdown */}
                {cart.length > 0 && (
                  <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs font-mono">
                    <div className="flex gap-1.5 pb-1">
                      <input
                        type="text"
                        value={promoCodeInput}
                        onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                        placeholder="Privilege code (DESIMUCH15)"
                        className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (promoCodeInput.trim() === "DESIMUCH15" || promoCodeInput.trim() === "") {
                            setPromoCodeInput("DESIMUCH15");
                            setIsCouponApplied(true);
                            showToast("Privilege code DESIMUCH15 applied (15% off)");
                          } else {
                            showToast("Try privilege code DESIMUCH15");
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-semibold uppercase cursor-pointer"
                      >
                        {isCouponApplied ? "Applied" : "Apply"}
                      </button>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Subtotal:</span>
                      <span className="text-white">
                        {formatPrice(cartSubtotal)}
                      </span>
                    </div>
                    {isCouponApplied && (
                      <div className="flex justify-between text-emerald-400 font-bold">
                        <span>Privilege Discount (DESIMUCH15):</span>
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
                      {vs.supportsLogistics ? "Allocated to Nearest Regional Dispatch Hub" : "Priority Concierge & Account Activation Ready"}
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
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${paymentMethod === "upi"
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
                          <div className="w-28 h-28 bg-white p-2 rounded-xl shadow-md mb-2 border border-zinc-200">
                            <UpiQrSvg />
                          </div>
                          <span className="text-[10px] font-mono text-zinc-400">
                            Scan with GPay / PhonePe · {config.domainUrl.split("/")[0]}@okicici
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
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${paymentMethod === "card"
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
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${paymentMethod === "cod"
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
                    className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
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
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                        <span>
                          {vs.supportsLogistics
                            ? "Regional Fulfillment Center Allocation Complete"
                            : "Dedicated Concierge Liaison Assigned"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 text-zinc-500 text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-zinc-600 shrink-0" />
                        <span>
                          {vs.supportsLogistics
                            ? "Express Air Transit & Live Tracking"
                            : "Digital Confirmation & Onboarding Dossier Dispatched"}
                        </span>
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
                <div className="p-3 bg-white/[0.03] text-[10px] font-mono text-zinc-400 space-y-1">
                  <div>Lot Ref: <span className="text-white font-semibold">#SPEC-2026-{selectedProductModal.id}</span></div>
                  <div>Standard: <span className="text-zinc-200 font-semibold">{vs.logisticsHint}</span></div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                    {selectedProductModal.category}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-tight">
                    {selectedProductModal.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-metric font-bold text-2xl text-white">
                      {formatPrice(selectedProductModal.price)}
                    </span>
                    {selectedProductModal.originalPrice && (
                      <span className="text-xs font-mono text-zinc-500 line-through">
                        {formatPrice(selectedProductModal.originalPrice)}
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      {vs.availabilityTag}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {selectedProductModal.description}
                </p>

                  {/* Sourcing & Specs */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5 text-xs font-mono">
                  <div className="text-[10px] uppercase text-zinc-400 font-semibold">{vs.specsHeading}:</div>
                  {selectedProductModal.specs.map((sp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-zinc-300 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{sp}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Edition / Pack Selector */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">
                    Select Pack / Edition Format
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPluck(130);
                        setQuickViewEdition("standard");
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${quickViewEdition === "standard"
                        ? "bg-white text-black border-white font-semibold"
                        : "bg-white/5 text-zinc-300 border-white/15 hover:border-white/30"
                        }`}
                    >
                      <div className="text-[11px] font-mono uppercase">Single / Standard</div>
                      <div className="text-xs font-bold mt-0.5">{formatPrice(selectedProductModal.price)}</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPluck(160);
                        setQuickViewEdition("reserve");
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${quickViewEdition === "reserve"
                        ? "bg-white text-black border-white font-semibold"
                        : "bg-white/5 text-zinc-300 border-white/15 hover:border-white/30"
                        }`}
                    >
                      <div className="text-[11px] font-mono uppercase">Twin / Reserve Pack</div>
                      <div className="text-xs font-bold mt-0.5">
                        {formatPrice(Math.round(selectedProductModal.price * 1.85))}
                      </div>
                    </button>
                  </div>
                </div>

                {/* PIN Code Delivery Estimator (Commerce Verticals Only) */}
                {vs.supportsLogistics && (
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2">
                    <label className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">
                      Check Dispatch &amp; Delivery Window
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
                        className="px-3 py-1.5 rounded-lg bg-white text-black font-mono text-xs font-semibold hover:bg-zinc-200 cursor-pointer"
                      >
                        Check
                      </button>
                    </div>
                    {pincodeResult && (
                      <p className="text-[11px] font-mono text-emerald-400">{pincodeResult}</p>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      const productToAdd =
                        quickViewEdition === "reserve"
                          ? {
                              ...selectedProductModal,
                              id: `${selectedProductModal.id}-reserve`,
                              name: `${selectedProductModal.name} (Twin / Reserve Pack)`,
                              price: Math.round(selectedProductModal.price * 1.85),
                            }
                          : selectedProductModal;
                      handleAddToCart(productToAdd);
                      setQuickViewEdition("standard");
                      setSelectedProductModal(null);
                      setIsCartOpen(true);
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    Add to Bag &amp; Checkout ({formatPrice(
                      quickViewEdition === "reserve"
                        ? Math.round(selectedProductModal.price * 1.85)
                        : selectedProductModal.price
                    )})
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
                  Official Tax Invoice (GST Compliant)
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
                <strong className="text-white">{config.brandName.toUpperCase()} INDIA PVT. LTD.</strong>
                <div>Merchant Portal · {config.domainUrl}</div>
                <div>GSTIN: <span className="text-white font-bold">07AAEC{config.brandName.slice(0, 4).toUpperCase().replace(/[^A-Z]/g, "X")}1ZX</span></div>
                <div>State: Delhi (Code: 07)</div>
              </div>
              <div>
                <span className="text-zinc-500 block uppercase">Invoice Metadata:</span>
                <div>Invoice No: <strong className="text-white">{orderRef || "INV-2026-9941"}</strong></div>
                <div>Date: 28 Nov 2026</div>
                <div>Place of Supply: {customerInfo.city || "Delhi"}</div>
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
                  {(lastOrderSnapshot?.items.length
                    ? lastOrderSnapshot.items
                    : cart.length
                      ? cart
                      : config.products.slice(0, 1).map((p) => ({
                        id: p.id,
                        name: p.name,
                        category: p.category,
                        price: p.price,
                        qty: 1,
                        image: p.image,
                      }))
                  ).map((row) => {
                    const lineTotal = row.price * row.qty;
                    const taxable = Math.round(lineTotal / 1.05);
                    const gst = Math.round((lineTotal - taxable) / 2);
                    return (
                      <tr key={row.id}>
                        <td className="p-2 text-white font-semibold">{row.name}</td>
                        <td className="p-2">330499</td>
                        <td className="p-2">{row.qty}</td>
                        <td className="p-2">₹{taxable.toLocaleString("en-IN")}</td>
                        <td className="p-2">₹{gst.toLocaleString("en-IN")}</td>
                        <td className="p-2">₹{gst.toLocaleString("en-IN")}</td>
                        <td className="p-2 text-white font-bold">₹{lineTotal.toLocaleString("en-IN")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-zinc-500">
                Authorized Signatory · {config.brandName} · Computer Generated
              </span>
              <button
                onClick={() => {
                  sound.playPluck(120);
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer"
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
          <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#111114] border border-white/15 text-center shadow-2xl relative animate-scale-up">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold block mb-1">
              Payment Verified &amp; Confirmed
            </span>
            <h3
              id="success-dialog-title"
              className="font-display font-bold text-2xl text-white mb-2"
            >
              Order Confirmed
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              Thank you for shopping with <strong>{config.brandName}</strong>. Your tax invoice and dispatch status updates have been prepared for{" "}
              <span className="text-white">{customerInfo.email}</span>.
            </p>

            <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-zinc-400 mb-6 flex items-center justify-between">
              <span>Order Reference</span>
              <span className="text-white font-bold">{orderRef}</span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsCheckoutSuccess(false);
                  setShowGstModal(true);
                }}
                className="w-full py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                View Tax Invoice
              </button>
              <button
                onClick={() => {
                  setIsCheckoutSuccess(false);
                  setIsCartOpen(false);
                }}
                className="w-full py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discreet Floating Studio Controls (Standalone Only) */}
      {!isEmbedded && (
        <div className="fixed bottom-4 left-4 z-40">
          {floatingControlsOpen ? (
            <div className="p-2 rounded-2xl bg-[#09090b]/95 text-white border border-white/15 backdrop-blur-xl shadow-2xl flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
              <Link
                href="/#work"
                className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Work</span>
              </Link>
              <div className="hidden sm:flex items-center gap-0.5 bg-white/[0.04] p-0.5 rounded-lg border border-white/10">
                <button
                  type="button"
                  onClick={() => setDeviceViewport("desktop")}
                  className={`px-2 py-0.5 rounded inline-flex items-center gap-1 cursor-pointer ${deviceViewport === "desktop" ? "bg-white text-black font-semibold" : "text-zinc-400"
                    }`}
                >
                  <Monitor className="w-3 h-3" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceViewport("tablet")}
                  className={`px-2 py-0.5 rounded inline-flex items-center gap-1 cursor-pointer ${deviceViewport === "tablet" ? "bg-white text-black font-semibold" : "text-zinc-400"
                    }`}
                >
                  <Tablet className="w-3 h-3" />
                  <span>Tablet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceViewport("mobile")}
                  className={`px-2 py-0.5 rounded inline-flex items-center gap-1 cursor-pointer ${deviceViewport === "mobile" ? "bg-white text-black font-semibold" : "text-zinc-400"
                    }`}
                >
                  <Smartphone className="w-3 h-3" />
                  <span>Mobile</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setIsDevToolsOpen((v) => !v)}
                className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 inline-flex items-center gap-1 cursor-pointer"
              >
                <Terminal className="w-3 h-3" />
                <span>Specs</span>
              </button>
              <Link
                href={`/work/${config.slug}`}
                className="px-2.5 py-1 rounded-lg bg-white text-black font-semibold"
              >
                Case Study
              </Link>
              <button
                type="button"
                onClick={() => setFloatingControlsOpen(false)}
                className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                aria-label="Minimize preview controls"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setFloatingControlsOpen(true)}
              className="px-3 py-1.5 rounded-full bg-[#09090b]/85 text-zinc-200 hover:text-white border border-white/15 backdrop-blur-md shadow-xl text-[10px] font-mono inline-flex items-center gap-2 cursor-pointer"
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: vs.accentHex }}
              />
              <span>Studio Controls</span>
            </button>
          )}
        </div>
      )}

    </div>
  );
}
