import { DemoProjectConfig } from "@/data/demoProductsData";

export interface BrandVisualSystem {
  isLight: boolean;
  pageBg: string;
  headerBg: string;
  panelBg: string;
  subCardBg: string;
  footerBg: string;
  border: string;
  strongBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  primaryBtn: string;
  secondaryBtn: string;
  pillIdle: string;
  pillActive: string;
  inputBg: string;
  headingFontClass: string;
  accentHex: string;
  surfaceTint: string;
  catalogHeading: string;
  catalogSubheading: string;
  moduleNav: string;
  catalogNav: string;
  primaryCta: string;
  specsHeading: string;
  availabilityTag: string;
  logisticsHint: string;
  supportsLogistics: boolean;
}

const SLUG_THEMES: Record<string, Partial<BrandVisualSystem>> = {
  "lionelp-restaurant": {
    isLight: true,
    pageBg: "bg-[#FAF6EF] text-[#1F1610]",
    headerBg: "bg-[#FAF6EF]/92",
    panelBg: "bg-white",
    subCardBg: "bg-[#F4EDE2]",
    footerBg: "bg-[#EFE7DA]",
    border: "border-[#1F1610]/10",
    strongBorder: "border-[#1F1610]/20",
    textPrimary: "text-[#1F1610]",
    textSecondary: "text-[#57493E]",
    textMuted: "text-[#7A6B5D]",
    primaryBtn: "bg-[#1F1610] hover:bg-[#3A281C] text-[#FAF6EF]",
    secondaryBtn: "bg-[#1F1610]/[0.04] hover:bg-[#1F1610]/[0.09] border border-[#1F1610]/15 text-[#1F1610]",
    pillIdle: "bg-[#1F1610]/[0.04] hover:bg-[#1F1610]/[0.08] text-[#57493E] border border-[#1F1610]/10",
    pillActive: "bg-[#1F1610] text-[#FAF6EF] border border-[#1F1610]",
    inputBg: "bg-white border-[#1F1610]/15 text-[#1F1610] placeholder-[#8C7B6B]",
    headingFontClass: "font-editorial font-normal",
    accentHex: "#9A5221",
    surfaceTint: "radial-gradient(ellipse at 72% 18%, rgba(154,82,33,0.08), transparent 62%)",
    specsHeading: "Ingredients & Bake Profile",
    availabilityTag: "Baked Fresh Daily",
  },
  "sobha-heritage-villas": {
    isLight: true,
    pageBg: "bg-[#F7F4ED] text-[#181512]",
    headerBg: "bg-[#F7F4ED]/92",
    panelBg: "bg-white",
    subCardBg: "bg-[#F1ECE2]",
    footerBg: "bg-[#EBE4D7]",
    border: "border-[#181512]/10",
    strongBorder: "border-[#181512]/20",
    textPrimary: "text-[#181512]",
    textSecondary: "text-[#4D453C]",
    textMuted: "text-[#756B60]",
    primaryBtn: "bg-[#181512] hover:bg-[#2E2822] text-[#F7F4ED]",
    secondaryBtn: "bg-[#181512]/[0.04] hover:bg-[#181512]/[0.09] border border-[#181512]/15 text-[#181512]",
    pillIdle: "bg-[#181512]/[0.04] hover:bg-[#181512]/[0.08] text-[#4D453C] border border-[#181512]/10",
    pillActive: "bg-[#181512] text-[#F7F4ED] border border-[#181512]",
    inputBg: "bg-white border-[#181512]/15 text-[#181512] placeholder-[#7C7165]",
    headingFontClass: "font-editorial font-normal",
    accentHex: "#8D6E2E",
    surfaceTint: "radial-gradient(ellipse at 74% 16%, rgba(141,110,46,0.08), transparent 60%)",
    specsHeading: "Estate Architecture & Privileges",
    availabilityTag: "Private Viewing Open",
  },
  "you-and-me-photography": {
    isLight: true,
    pageBg: "bg-[#FAF8F5] text-[#1C1917]",
    headerBg: "bg-[#FAF8F5]/92",
    panelBg: "bg-white",
    subCardBg: "bg-[#F4F0EA]",
    footerBg: "bg-[#EFE9DF]",
    border: "border-[#1C1917]/10",
    strongBorder: "border-[#1C1917]/20",
    textPrimary: "text-[#1C1917]",
    textSecondary: "text-[#57534E]",
    textMuted: "text-[#78716C]",
    primaryBtn: "bg-[#1C1917] hover:bg-[#332E2A] text-[#FAF8F5]",
    secondaryBtn: "bg-[#1C1917]/[0.04] hover:bg-[#1C1917]/[0.09] border border-[#1C1917]/15 text-[#1C1917]",
    pillIdle: "bg-[#1C1917]/[0.04] hover:bg-[#1C1917]/[0.08] text-[#57534E] border border-[#1C1917]/10",
    pillActive: "bg-[#1C1917] text-[#FAF8F5] border border-[#1C1917]",
    inputBg: "bg-white border-[#1C1917]/15 text-[#1C1917] placeholder-[#8C847E]",
    headingFontClass: "font-editorial font-normal",
    accentHex: "#8F6A3A",
    surfaceTint: "radial-gradient(ellipse at 70% 15%, rgba(143,106,58,0.08), transparent 60%)",
    specsHeading: "Commission Coverage & Deliverables",
    availabilityTag: "2026–27 Dates Open",
    logisticsHint: "Worldwide Crew Dispatch",
  },
  "bharat-bio-health": {
    isLight: true,
    pageBg: "bg-[#F4F7FA] text-[#0F172A]",
    headerBg: "bg-[#F4F7FA]/92",
    panelBg: "bg-white",
    subCardBg: "bg-[#EEF3F8]",
    footerBg: "bg-[#E6ECF3]",
    border: "border-[#0F172A]/10",
    strongBorder: "border-[#0F172A]/20",
    textPrimary: "text-[#0F172A]",
    textSecondary: "text-[#475569]",
    textMuted: "text-[#64748B]",
    primaryBtn: "bg-[#0F172A] hover:bg-[#1E293B] text-white",
    secondaryBtn: "bg-[#0F172A]/[0.04] hover:bg-[#0F172A]/[0.08] border border-[#0F172A]/15 text-[#0F172A]",
    pillIdle: "bg-[#0F172A]/[0.04] hover:bg-[#0F172A]/[0.08] text-[#475569] border border-[#0F172A]/10",
    pillActive: "bg-[#0F172A] text-white border border-[#0F172A]",
    inputBg: "bg-white border-[#0F172A]/15 text-[#0F172A] placeholder-[#64748B]",
    headingFontClass: "font-display font-bold",
    accentHex: "#0284C7",
    surfaceTint: "radial-gradient(ellipse at 72% 15%, rgba(2,132,199,0.07), transparent 58%)",
    specsHeading: "Technical & Regulatory Datasheet",
    availabilityTag: "ISO / CE Certified",
  },
  "pet-first-wellness": {
    isLight: true,
    pageBg: "bg-[#F6F8F4] text-[#132118]",
    headerBg: "bg-[#F6F8F4]/92",
    panelBg: "bg-white",
    subCardBg: "bg-[#ECF2E9]",
    footerBg: "bg-[#E4ECE0]",
    border: "border-[#132118]/10",
    strongBorder: "border-[#132118]/20",
    textPrimary: "text-[#132118]",
    textSecondary: "text-[#435649]",
    textMuted: "text-[#617568]",
    primaryBtn: "bg-[#155E34] hover:bg-[#104A28] text-white",
    secondaryBtn: "bg-[#132118]/[0.04] hover:bg-[#132118]/[0.08] border border-[#132118]/15 text-[#132118]",
    pillIdle: "bg-[#132118]/[0.04] hover:bg-[#132118]/[0.08] text-[#435649] border border-[#132118]/10",
    pillActive: "bg-[#155E34] text-white border border-[#155E34]",
    inputBg: "bg-white border-[#132118]/15 text-[#132118] placeholder-[#6B7F71]",
    headingFontClass: "font-display font-bold",
    accentHex: "#15803D",
    surfaceTint: "radial-gradient(ellipse at 72% 15%, rgba(21,128,61,0.08), transparent 60%)",
    specsHeading: "Guaranteed Canine Nutrition Profile",
    availabilityTag: "Fresh Kitchen Batch",
  },
  "darbar-fine-watches": {
    pageBg: "bg-[#06080E] text-white",
    headerBg: "bg-[#06080E]/88",
    panelBg: "bg-[#0C101B]",
    subCardBg: "bg-white/[0.03]",
    footerBg: "bg-[#05060B]",
    headingFontClass: "font-royal font-bold",
    accentHex: "#D4AF37",
    specsHeading: "Calibre & Case Architecture",
    availabilityTag: "Numbered Edition · Certified",
  },
  "streethreads-handloom": {
    pageBg: "bg-[#13080D] text-white",
    headerBg: "bg-[#13080D]/88",
    panelBg: "bg-[#1B0C12]",
    subCardBg: "bg-white/[0.03]",
    footerBg: "bg-[#0E0509]",
    headingFontClass: "font-editorial font-normal",
    accentHex: "#F59E0B",
    moduleNav: "Loom & Zari Craft",
    catalogNav: "Handloom Archive",
    catalogHeading: "Bespoke Varanasi Drapes",
    catalogSubheading: "Single-Loom Collectibles",
    specsHeading: "Warp, Weft & Silk Mark Provenance",
    availabilityTag: "Loom Verified · Single Piece",
    supportsLogistics: false,
    logisticsHint: "Insured Heirloom Cedar Box",
  },
  "royal-rajwada-spices": {
    pageBg: "bg-[#0A0E1B] text-white",
    headerBg: "bg-[#0A0E1B]/88",
    panelBg: "bg-[#101629]",
    subCardBg: "bg-white/[0.03]",
    footerBg: "bg-[#070A14]",
    headingFontClass: "font-royal font-bold",
    accentHex: "#F59E0B",
    moduleNav: "Terroir & Terpenes",
    catalogHeading: "Single-Estate Harvest Tins",
    specsHeading: "Harvest Coordinates & Aroma Oil",
    availabilityTag: "Current Harvest Lot",
  },
  "vedaroots-ayurveda": {
    pageBg: "bg-[#08110B] text-white",
    headerBg: "bg-[#08110B]/88",
    panelBg: "bg-[#0E1B13]",
    subCardBg: "bg-white/[0.03]",
    footerBg: "bg-[#060D08]",
    headingFontClass: "font-editorial font-normal",
    accentHex: "#34D399",
    specsHeading: "Classical Decoction Profile",
    availabilityTag: "Fresh Kottakkal Batch",
  },
  "kamakesh-hair-elixir": {
    pageBg: "bg-[#0E1108] text-white",
    headerBg: "bg-[#0E1108]/88",
    panelBg: "bg-[#151A0D]",
    subCardBg: "bg-white/[0.03]",
    footerBg: "bg-[#0A0C06]",
    headingFontClass: "font-editorial font-normal",
    accentHex: "#D4AF37",
    moduleNav: "Botanical Actives",
    specsHeading: "Kshirapak Infusion Actives",
    availabilityTag: "Fresh Small Batch",
  },
  "chaichaska-ctc": {
    pageBg: "bg-[#140C07] text-white",
    headerBg: "bg-[#140C07]/88",
    panelBg: "bg-[#1E120B]",
    subCardBg: "bg-white/[0.03]",
    footerBg: "bg-[#0E0805]",
    accentHex: "#F59E0B",
    moduleNav: "Build Chai Box",
    specsHeading: "Flush Origin & Tasting Notes",
    availabilityTag: "Nitrogen-Sealed Fresh",
  },
  "pureglow-kombucha": {
    pageBg: "bg-[#120917] text-white",
    headerBg: "bg-[#120917]/88",
    panelBg: "bg-[#1A0E22]",
    subCardBg: "bg-white/[0.03]",
    footerBg: "bg-[#0D0611]",
    accentHex: "#C084FC",
    moduleNav: "Brew Flight",
    specsHeading: "Probiotic Strain & Fermentation",
    availabilityTag: "Chilled Live Culture",
  },
  "snacknation-makhanas": {
    pageBg: "bg-[#140908] text-white",
    headerBg: "bg-[#140908]/88",
    panelBg: "bg-[#1D0F0D]",
    subCardBg: "bg-white/[0.03]",
    footerBg: "bg-[#0E0605]",
    accentHex: "#FB923C",
    specsHeading: "Nutrition & Roast Details",
    availabilityTag: "Fresh Batch Ready",
  },
  "mithaimagic-sweets": {
    pageBg: "bg-[#150C07] text-white",
    headerBg: "bg-[#150C07]/88",
    panelBg: "bg-[#1E120B]",
    subCardBg: "bg-white/[0.03]",
    footerBg: "bg-[#0E0704]",
    accentHex: "#F59E0B",
    specsHeading: "Pure A2 Ghee Craft & Shelf Life",
    availabilityTag: "Same-Day Cold Dispatch",
  },
};

export function getBrandVisualSystem(
  config: DemoProjectConfig
): BrandVisualSystem {
  const t = config.interactiveType;

  const baseByType: Record<
    DemoProjectConfig["interactiveType"],
    Partial<BrandVisualSystem>
  > = {
    watch_customizer: {
      catalogHeading: "Haute Horlogerie Editions",
      catalogSubheading: "Numbered Timepieces",
      moduleNav: "Configurator",
      catalogNav: "Timepieces",
      primaryCta: "Explore Timepieces",
      supportsLogistics: false,
      logisticsHint: "Armored Vault Courier",
      accentHex: "#D4AF37",
      surfaceTint: "radial-gradient(ellipse at 70% 15%, rgba(212,175,55,0.08), transparent 60%)",
    },
    estate_concierge: {
      catalogHeading:
        config.slug === "you-and-me-photography"
          ? "Curated Wedding Collections"
          : "Private Residences Portfolio",
      catalogSubheading:
        config.slug === "you-and-me-photography"
          ? "Bespoke Commissions"
          : "Assagao Valley · Goa",
      moduleNav: "Concierge",
      catalogNav: "Portfolio",
      primaryCta: "Explore Portfolio",
      supportsLogistics: false,
      logisticsHint: "Private Concierge Liaison",
      accentHex: "#EAB308",
      surfaceTint: "radial-gradient(ellipse at 75% 18%, rgba(245,158,11,0.07), transparent 58%)",
    },
    baking_slot: {
      catalogHeading: "Daily Viennoiserie & Bakehouse",
      catalogSubheading: "Stone-Oven Menu",
      moduleNav: "Bake Dispatch",
      catalogNav: "Menu",
      primaryCta: "Order Fresh Bakes",
      supportsLogistics: true,
      logisticsHint: "45-min thermal courier",
      accentHex: "#9A5221",
    },
    art_curator_studio: {
      catalogHeading: "Collector Editions & Licensing",
      catalogSubheading: "Archival Prints",
      moduleNav: "Atelier",
      catalogNav: "Editions",
      primaryCta: "Collect Editions",
      supportsLogistics: false,
      logisticsHint: "Archival Museum Tube",
      accentHex: "#D4AF37",
      surfaceTint: "radial-gradient(ellipse at 72% 15%, rgba(212,175,55,0.08), transparent 58%)",
      specsHeading: "Edition & Print Specification",
      availabilityTag: "Signed Limited Edition",
    },
    calculator_ev: {
      catalogHeading: "Commercial EV Fleet Systems",
      catalogSubheading: "Fleet Hardware",
      moduleNav: "TCO Calculator",
      catalogNav: "Vehicles",
      primaryCta: "Explore Fleet",
      supportsLogistics: false,
      logisticsHint: "Pan-India Fleet Commissioning",
      accentHex: "#38BDF8",
      surfaceTint: "radial-gradient(ellipse at 72% 15%, rgba(56,189,248,0.08), transparent 58%)",
      specsHeading: "Drivetrain & Battery Telemetry",
      availabilityTag: "Pilot Ready · Q4",
    },
    diagnostic_quote: {
      catalogHeading: "Clinical Analyzers & Kits",
      catalogSubheading: "Diagnostic Systems",
      moduleNav: "ROI Engine",
      catalogNav: "Systems",
      primaryCta: "Explore Systems",
      supportsLogistics: false,
      logisticsHint: "Cold-Chain Installation",
      accentHex: "#0284C7",
    },
    seo_serp_cluster: {
      catalogHeading: "Search & GEO Growth Programs",
      catalogSubheading: "Authority Retainers",
      moduleNav: "SERP Matrix",
      catalogNav: "Programs",
      primaryCta: "View Programs",
      supportsLogistics: false,
      logisticsHint: "Dedicated Growth Pods",
      accentHex: "#38BDF8",
      surfaceTint: "radial-gradient(ellipse at 72% 15%, rgba(56,189,248,0.07), transparent 58%)",
      specsHeading: "Deliverable Architecture",
      availabilityTag: "72-Hour Kickoff",
    },
    product_benchmarks: {
      catalogHeading: "Headless Edge Modules",
      catalogSubheading: "Architecture Suite",
      moduleNav: "Benchmarks",
      catalogNav: "Modules",
      primaryCta: "Explore Stack",
      supportsLogistics: false,
      logisticsHint: "Edge Cluster Deployment",
      accentHex: "#A78BFA",
      surfaceTint: "radial-gradient(ellipse at 72% 15%, rgba(139,92,246,0.08), transparent 58%)",
      specsHeading: "Runtime & Latency SLA",
      availabilityTag: "Edge-Ready v16",
    },
    mandi_rates: {
      catalogHeading: "Direct FPO Commodity Lots",
      catalogSubheading: "Harvest Inventory",
      moduleNav: "Live Mandi",
      catalogNav: "Harvest Lots",
      primaryCta: "Browse Harvest Lots",
      supportsLogistics: false,
      logisticsHint: "APMC Escrow Logistics",
      accentHex: "#34D399",
      surfaceTint: "radial-gradient(ellipse at 72% 15%, rgba(16,185,129,0.07), transparent 58%)",
      specsHeading: "Grading & Escrow Terms",
      availabilityTag: "Direct FPO Allocation",
    },
    darkstore_timer: {
      catalogHeading: "Festive Mithai & Ghee Confections",
      catalogSubheading: "Small-Batch Kitchen",
      moduleNav: "Express Radar",
      catalogNav: "Mithai Box",
      primaryCta: "Shop Sweets",
      supportsLogistics: true,
      logisticsHint: "10-min Insulated Courier",
    },
    bundle_snacks: {
      catalogHeading: "Curated Tasting Collection",
      catalogSubheading: "Small-Batch Signature",
      moduleNav: "Build a Box",
      catalogNav: "Collection",
      primaryCta: "Shop Collection",
      supportsLogistics: true,
      logisticsHint: "Pan-India Express Dispatch",
    },
    calorie_pet: {
      catalogHeading: "Fresh Canine Meal Plans",
      catalogSubheading: "Vet-Formulated Recipes",
      moduleNav: "Portion Planner",
      catalogNav: "Meals",
      primaryCta: "Shop Meal Plans",
      supportsLogistics: true,
      logisticsHint: "Chilled Doorstep Delivery",
    },
    herb_explorer: {
      catalogHeading: "Curated Formulations",
      catalogSubheading: "Signature Lineup",
      moduleNav: "Formulation Lab",
      catalogNav: "Collection",
      primaryCta: "Shop Collection",
      supportsLogistics: true,
      logisticsHint: "Pan-India Express Dispatch",
    },
  };

  const mergedSlug = SLUG_THEMES[config.slug] || {};
  const mergedType = baseByType[t] || {};
  const isLight = Boolean(mergedSlug.isLight);

  const darkDefaults: BrandVisualSystem = {
    isLight: false,
    pageBg: `${config.theme.primaryBg || "bg-[#09090b]"} text-white`,
    headerBg: "bg-[#09090b]/85",
    panelBg: "bg-[#0C0C0F]",
    subCardBg: "bg-white/[0.03]",
    footerBg: "bg-[#070709]",
    border: "border-white/[0.08]",
    strongBorder: "border-white/15",
    textPrimary: "text-white",
    textSecondary: "text-zinc-300",
    textMuted: "text-zinc-400",
    primaryBtn: "bg-white hover:bg-zinc-200 text-black",
    secondaryBtn: "bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-zinc-200",
    pillIdle: "bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/[0.08]",
    pillActive: "bg-white text-black border border-white",
    inputBg: "bg-black/45 border-white/15 text-white placeholder-zinc-500",
    headingFontClass: "font-display font-bold",
    accentHex: "#34D399",
    surfaceTint: "radial-gradient(ellipse at 72% 15%, rgba(255,255,255,0.04), transparent 58%)",
    catalogHeading: "Curated Collection",
    catalogSubheading: "Signature Lineup",
    moduleNav: "Interactive Studio",
    catalogNav: "Collection",
    primaryCta: "Explore Collection",
    specsHeading: "Specifications & Details",
    availabilityTag: "Available Now",
    logisticsHint: "Priority Fulfillment",
    supportsLogistics: true,
  };

  const lightDefaults: Partial<BrandVisualSystem> = isLight
    ? {
        border: mergedSlug.border || "border-black/10",
        strongBorder: mergedSlug.strongBorder || "border-black/20",
      }
    : {};

  return {
    ...darkDefaults,
    ...mergedType,
    ...lightDefaults,
    ...mergedSlug,
  };
}

export function getHerbExplorerMeta(slug: string) {
  if (slug === "streethreads-handloom") {
    return {
      eyebrow: "BANARASI HANDLOOM WEAVE ARCHIVE",
      badgeText: "Silk Mark GI",
      tabs: [
        { key: "all" as const, label: "All Weaves" },
        { key: "vata" as const, label: "Kadwa & Katan" },
        { key: "pitta" as const, label: "Tissue & Zari" },
        { key: "kapha" as const, label: "Raw Tussar" },
      ],
      filterMatch: (name: string, part: string, key: "vata" | "pitta" | "kapha") => {
        const txt = `${name} ${part}`.toLowerCase();
        if (key === "vata") return txt.includes("kadwa") || txt.includes("katan") || txt.includes("pit");
        if (key === "pitta") return txt.includes("zari") || txt.includes("jangla") || txt.includes("gold");
        return txt.includes("silk") || txt.includes("tussar") || txt.includes("mark");
      },
    };
  }
  if (slug === "royal-rajwada-spices") {
    return {
      eyebrow: "SINGLE-ESTATE SPICE TERROIR & AROMA",
      badgeText: "Origin Tested",
      tabs: [
        { key: "all" as const, label: "All Estates" },
        { key: "vata" as const, label: "Pepper & Chili" },
        { key: "pitta" as const, label: "Saffron & Floral" },
        { key: "kapha" as const, label: "18-Spice Masalas" },
      ],
      filterMatch: (name: string, part: string, key: "vata" | "pitta" | "kapha") => {
        const txt = `${name} ${part}`.toLowerCase();
        if (key === "vata") return txt.includes("pepper") || txt.includes("chil") || txt.includes("berr");
        if (key === "pitta") return txt.includes("saffron") || txt.includes("pampore") || txt.includes("stigma");
        return txt.includes("masala") || txt.includes("blend") || txt.includes("garam");
      },
    };
  }
  if (slug === "kamakesh-hair-elixir") {
    return {
      eyebrow: "KSHIRAPAK BOTANICAL INFUSION MATRIX",
      badgeText: "Bioactive",
      tabs: [
        { key: "all" as const, label: "All Actives" },
        { key: "vata" as const, label: "Root Awakening" },
        { key: "pitta" as const, label: "Scalp Cooling" },
        { key: "kapha" as const, label: "Follicle Shield" },
      ],
      filterMatch: (name: string, part: string, key: "vata" | "pitta" | "kapha") => {
        const txt = `${name} ${part}`.toLowerCase();
        if (key === "vata") return txt.includes("bhringraj") || txt.includes("jatamansi") || txt.includes("root");
        if (key === "pitta") return txt.includes("amla") || txt.includes("gooseberry") || txt.includes("hibiscus");
        return txt.includes("gunja") || txt.includes("seed") || txt.includes("neem");
      },
    };
  }
  return {
    eyebrow: "VEDIC PHARMACOPEIA & EXTRACTION MATRIX",
    badgeText: "AYUSH Assay",
    tabs: [
      { key: "all" as const, label: "All Extracts" },
      { key: "vata" as const, label: "Vata Balance" },
      { key: "pitta" as const, label: "Pitta Cooling" },
      { key: "kapha" as const, label: "Kapha Vitality" },
    ],
    filterMatch: (name: string, part: string, key: "vata" | "pitta" | "kapha") => {
      const txt = `${name} ${part}`.toLowerCase();
      if (key === "vata") return txt.includes("bala") || txt.includes("ashwagandha") || txt.includes("mandukaparni");
      if (key === "pitta") return txt.includes("saffron") || txt.includes("kumkumadi") || txt.includes("shatavari") || txt.includes("brahmi");
      return txt.includes("shilajit") || txt.includes("turmeric") || txt.includes("bala");
    },
  };
}

export function getConciergeMeta(slug: string) {
  if (slug === "you-and-me-photography") {
    return {
      eyebrow: "DESTINATION COMMISSION AVAILABILITY",
      statusText: "2026–27 Calendar Open",
      selectorLabel: "Select Destination Region",
      optionTag: (idx: number) => `Region #0${idx + 1} · Full Cinema Crew`,
      dateLabel: "Primary Ceremony Date",
      dateNote: "Lead Directors Available",
      countLabel: "Celebration Duration (Days)",
      countUnitSingular: "Day",
      countUnitPlural: "Days",
      countNote: "Includes pre-event scouting & editorial portrait session",
      inclusionsTitle: "Commission Inclusions",
      inclusions: [
        "Privacy & Image embargo option",
        "Twin Leica & RED Cinema camera unit",
        "Same-week preview stills gallery",
      ],
      refPrefix: "YM",
      confirmTitle: "Date Hold Registered",
      privacyNote: "Full creative brief & location logistics finalized upon consultation.",
      ctaText: "Request Date Hold",
    };
  }
  return {
    eyebrow: "PRIVATE VIEWING & RESIDENCE CONCIERGE",
    statusText: "Private Liaison Active",
    selectorLabel: "Select Viewing Arrangement",
    optionTag: (idx: number) => `Option #0${idx + 1} · Private Allocation`,
    dateLabel: "Preferred Viewing Date",
    dateNote: "Confirmed Gate & Escort Clearance",
    countLabel: "Guest Party Size",
    countUnitSingular: "Guest",
    countUnitPlural: "Guests",
    countNote: "Chauffeur transfer from MOPA / Dabolim available",
    inclusionsTitle: "Appointment Protocol",
    inclusions: [
      "Non-Disclosure Privacy Agreement",
      "Senior Architect Walkthrough",
      "Site Plan & Yield Dossier",
    ],
    refPrefix: "SH",
    confirmTitle: "Private Viewing Confirmed",
    privacyNote: "Private liaison details dispatched encrypted to your contact.",
    ctaText: "Confirm Private Viewing",
  };
}

export function getBundleMeta(slug: string) {
  if (slug === "chaichaska-ctc") {
    return {
      eyebrow: "CUSTOM CHAI TASTING CURATION",
      title: "Build Your Signature Assam Tea & Kulhad Box",
      unitSingular: "blend",
      unitPlural: "Blends Picked",
      unitLabel: "Blends",
      bonusText: "Complimentary Handcrafted Clay Kulhad Set unlocked",
      upgradeHint: (left: number) =>
        `Add ${left} more blend to unlock 10% box savings`,
      tierMaxHint: "Add 1 more blend for 20% off + Free Clay Kulhad Pair",
      itemTitle: (n: number, list: string) =>
        `Chai Chaska Tasting Box (${n} Blends: ${list})`,
      itemDesc: (list: string) =>
        `Single-origin Assam CTC & Kadha assortment featuring ${list}. Vacuum nitrogen-sealed at harvest.`,
      specs: ["Assam Second-Flush", "Vacuum Sealed", "100% Natural Spices"],
      unitPrice: 349,
    };
  }
  if (slug === "pureglow-kombucha") {
    return {
      eyebrow: "CUSTOM PROBIOTIC FLIGHT BUILDER",
      title: "Curate Your Cold-Chain Kombucha 6-Pack",
      unitSingular: "bottle",
      unitPlural: "Bottles Picked",
      unitLabel: "Bottles",
      bonusText: "20% Flight Savings + Chilled Thermal Bottle Sleeve unlocked",
      upgradeHint: (left: number) =>
        `Add ${left} more bottle for 10% Flight Discount`,
      tierMaxHint: "Add 1 more bottle for 20% off + Chilled Bottle Sleeve",
      itemTitle: (n: number, list: string) =>
        `PureGlow Probiotic Flight (${n} Bottles: ${list})`,
      itemDesc: (list: string) =>
        `Small-batch raw fermented probiotic brews: ${list}. Shipped in cold-pack insulation.`,
      specs: ["10B+ Living Probiotics", "Raw Unpasteurized", "Glass Bottles"],
      unitPrice: 185,
    };
  }
  return {
    eyebrow: "CUSTOM CLEAN-SNACK CURATION",
    title: "Build Your Artisanal Foxnut & Superfood Box",
    unitSingular: "tub",
    unitPlural: "Tubs Picked",
    unitLabel: "Tubs",
    bonusText: "20% Bundle Savings & Complimentary Herb Dip unlocked",
    upgradeHint: (left: number) =>
      `Add ${left} more tub for 10% Bundle Discount`,
    tierMaxHint: "Add 1 more tub for 20% off + Free Herb Dip",
    itemTitle: (n: number, list: string) =>
      `Artisanal Snack Box (${n} Tubs: ${list})`,
    itemDesc: (list: string) =>
      `Slow-roasted foxnut & grain box featuring ${list}. Cold-pressed olive oil, zero palm oil.`,
    specs: ["Zero Palm Oil", "Slow Roasted", "Gluten Free"],
    unitPrice: 299,
  };
}

export function createOrderReference(brandName: string): string {
  const prefix =
    brandName
      .replace(/[^A-Za-z]/g, "")
      .slice(0, 2)
      .toUpperCase() || "DM";
  const suffix = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${suffix}`;
}
