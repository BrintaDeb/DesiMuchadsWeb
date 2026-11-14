export interface DemoProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating: number;
  reviewCount: number;
  description: string;
  specs: string[];
  image: string;
}

export interface HerbInfoItem {
  name: string;
  part: string;
  decoctionTime: string;
  benefit: string;
  potency: string;
}

export interface BreedInfoItem {
  name: string;
  avgWeight: number;
  calPerKg: number;
}

export interface FinishInfoItem {
  name: string;
  case: string;
  priceMod: number;
}

export interface MandiInfoItem {
  crop: string;
  price: string;
  trend: string;
}

export interface InteractiveDataConfig {
  title?: string;
  herbs?: HerbInfoItem[];
  defaultFleetSize?: number;
  defaultDailyKm?: number;
  dieselCostPerLitre?: number;
  dieselKmPerLitre?: number;
  evKwhPer100Km?: number;
  powerCostPerKwh?: number;
  destinations?: string[];
  flavours?: string[];
  bundleDiscount?: string;
  analyzerModels?: { name: string; baseCostPerTest: string }[];
  options?: string[];
  breeds?: BreedInfoItem[];
  batches?: { time: string; status: string; slots: string }[];
  storeHub?: string;
  currentEtaMinutes?: number;
  currentEtaSeconds?: number;
  finishes?: FinishInfoItem[];
  mandis?: MandiInfoItem[];
}

export interface DemoServiceCriteria {
  serviceId: string;
  serviceTitle: string;
  primaryObjective: string;
  targetKpi: string;
  techArchitecture: string[];
  deliverablesDeployed: string[];
  verifiedImpact: string;
}

export interface DemoProjectConfig {
  slug: string;
  brandName: string;
  brandTagline: string;
  categoryBadge: string;
  domainUrl: string;
  theme: {
    primaryBg: string;
    accentColor: string;
    accentBorder: string;
    pillBg: string;
    heroGlow: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    stats: { label: string; val: string }[];
  };
  interactiveType:
    | "calculator_ev"
    | "calorie_pet"
    | "bundle_snacks"
    | "estate_concierge"
    | "watch_customizer"
    | "darkstore_timer"
    | "herb_explorer"
    | "mandi_rates"
    | "baking_slot"
    | "diagnostic_quote";
  interactiveData: InteractiveDataConfig;
  products: DemoProductItem[];
  trustBadges: { title: string; desc: string }[];
  customerReviews: {
    author: string;
    location: string;
    rating: number;
    title: string;
    comment: string;
    verified: boolean;
  }[];
  faq: { q: string; a: string }[];
  serviceCriteria?: DemoServiceCriteria;
}

export const DEMO_PROJECTS_DATABASE: Record<string, DemoProjectConfig> = {
  // 1. VedaRoots Ayurveda (SEO & SEM)
  "vedaroots-ayurveda": {
    slug: "vedaroots-ayurveda",
    brandName: "VedaRoots Ayurveda",
    brandTagline: "Classical Single-Origin Ayurveda & Cold-Pressed Elixirs",
    serviceCriteria: {
      "serviceId": "seo-sem",
      "serviceTitle": "SEO & SEM Services",
      "primaryObjective": "High-Intent Commercial Keyword Clustering & Organic Search Dominance",
      "targetKpi": "Top 3 Google SERP for 84+ High-Intent Keywords · 4.8x Search ROAS",
      "techArchitecture": [
            "Next.js 16 Server Components",
            "Google PMax & Search Engine",
            "Schema.org Rich Snippets",
            "Sub-800ms LCP"
      ],
      "deliverablesDeployed": [
            "Technical Core Web Vitals Optimization",
            "Commercial Intent Search Bidding",
            "Negative Search Term Blacklisting",
            "Structured Herbal Rich Data"
      ],
      "verifiedImpact": "+420% Organic Traffic · 38,400+ Verified Customers"
},

    categoryBadge: "100% Certified Ayush GMP & USDA Organic",
    domainUrl: "vedarootsayurveda.in",
    theme: {
      primaryBg: "bg-[#09120c]",
      accentColor: "text-emerald-400",
      accentBorder: "border-emerald-500/30",
      pillBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      heroGlow: "from-emerald-900/30 via-emerald-600/10 to-transparent",
    },
    hero: {
      eyebrow: "AUTHENTIC CLASSICAL AYURVEDA · KERALA HERITAGE",
      title: "Rooted in Charaka Samhita. Bottled at Source.",
      subtitle:
        "Cold-pressed medicinal oils, wild-harvested Himalayan Shilajit resin, and adaptogenic tonics crafted using authentic 21-day slow decoctions.",
      primaryCta: "Shop Botanical Collection",
      secondaryCta: "Explore Herb Formulation",
      stats: [
        { label: "Verified Patrons", val: "38,400+" },
        { label: "Pure Herbs Used", val: "108+" },
        { label: "Ayush GMP Certified", val: "100%" },
        { label: "Customer Rating", val: "4.92 / 5" },
      ],
    },
    interactiveType: "herb_explorer",
    interactiveData: {
      title: "Herb Formulation & Decoction Purity Matrix",
      herbs: [
        {
          name: "Bala (Sida Cordifolia)",
          part: "Roots & Bark",
          decoctionTime: "21 Days Slow Brew",
          benefit: "Rejuvenates muscle tissue, nervous system & joint mobility.",
          potency: "99.4% Bioactive",
        },
        {
          name: "Kashmiri Mongra Saffron",
          part: "Stigmas",
          decoctionTime: "Cold Infusion in Goat Milk",
          benefit: "Stimulates microcirculation and natural collagen glow.",
          potency: "18.2% Crocin",
        },
        {
          name: "Himalayan Gold Shilajit",
          part: "Rock Exudate (16,000 ft)",
          decoctionTime: "Surya Tapi Sun Purified",
          benefit: "Boosts cellular mitochondrial ATP and testosterone synthesis.",
          potency: "78% Fulvic Acid",
        },
        {
          name: "Mandukaparni (Gotu Kola)",
          part: "Fresh Whole Herb",
          decoctionTime: "Sesame Oil Maceration",
          benefit: "Sharpens neural synapses and reduces cortisol.",
          potency: "Standardized 10:1",
        },
      ],
    },
    products: [
      {
        id: "vr-01",
        name: "Kshirabala Thailam 101 Avarthanam (100ml)",
        category: "Therapeutic Oils",
        price: 1299,
        originalPrice: 1699,
        badge: "Award Winner",
        rating: 4.9,
        reviewCount: 1420,
        description:
          "Concentrated 101 times in fresh cow milk and pure sesame oil according to Ashtanga Hridaya. For deep joint stiffness and neuromuscular relief.",
        specs: ["101 Cycles Concentrated", "100% Sesame & Cow Milk", "Ayush Certified"],
        image: "https://images.unsplash.com/photo-1608248597359-54d762e8ea02?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "vr-02",
        name: "Himalayan Gold Shilajit Resin (20g)",
        category: "Vitality Resins",
        price: 1499,
        originalPrice: 1999,
        badge: "Best Seller",
        rating: 5.0,
        reviewCount: 2180,
        description:
          "Sourced from the pristine altitudes of Ladakh at 16,500 ft. Purified via traditional Surya Tapi (sun drying) with 78% natural Fulvic Acid.",
        specs: ["78% Fulvic Acid", "Lab Tested for Heavy Metals", "Includes Brass Spoon"],
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "vr-03",
        name: "Kumkumadi Miraculous Radiance Oil (30ml)",
        category: "Face Care",
        price: 1850,
        originalPrice: 2400,
        badge: "Luxury Ayurvedic",
        rating: 4.9,
        reviewCount: 940,
        description:
          "A classical night elixir with authentic Kashmiri saffron, red sandalwood, and lotus stamens slow-cooked in cold-pressed sesame oil.",
        specs: ["Grade-A Kashmiri Saffron", "0% Synthetic Fragrance", "30ml Dropper Bottle"],
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "vr-04",
        name: "Brahmi & Ashwagandha Mind Clarity Tonic (250ml)",
        category: "Nootropic Tonics",
        price: 749,
        originalPrice: 999,
        badge: "Pure Formula",
        rating: 4.8,
        reviewCount: 680,
        description:
          "Adaptogenic tonic slow-fermented in earthen jars with raw honey and wild herbs. Designed to clear brain fog and lower stress hormones.",
        specs: ["Wild Ashwagandha KSM-66", "Natural Earthen Fermentation", "Non-drowsy"],
        image: "https://images.unsplash.com/photo-1512290900672-1f55b9e07802?auto=format&fit=crop&w=800&q=80",
      },
    ],
    trustBadges: [
      { title: "Ministry of Ayush", desc: "Licensed & GMP Certified facility" },
      { title: "Zero Dilution", desc: "No mineral oils, silicones, or fillers" },
      { title: "Third-Party Lab Tested", desc: "Verified free of heavy metals & pesticides" },
      { title: "Free Express Shipping", desc: "Dispatched direct from Kerala within 24h" },
    ],
    customerReviews: [
      {
        author: "Dr. Arvind Swaminathan",
        location: "Bengaluru",
        rating: 5,
        title: "Medical practitioner approved",
        comment:
          "The Kshirabala 101 Avarthanam is remarkably pure. My patients with chronic neck stiffness experienced noticeable relief within a week of regular abhyanga.",
        verified: true,
      },
      {
        author: "Radhika Kulkarni",
        location: "Pune",
        rating: 5,
        title: "Visible change in skin texture",
        comment:
          "I was hesitant about oils on my combination skin, but the Kumkumadi oil absorbs with zero greasy residue. My pigmentation spots have visibly reduced.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "How is your Shilajit purified compared to commercial brands?",
        a: "We practice Surya Tapi purification where raw exudate is washed with Triphala decoction and purified by natural sunlight over 45 days, retaining active bio-minerals.",
      },
      {
        q: "What is the recommended dosage for Kshirabala oil?",
        a: "Warm 10-15 drops between palms and gently massage over target joint or crown for 10 minutes prior to warm bath.",
      },
    ],
  },

  // 2. UrbanDrift EV (SEO & SEM)
  "urbandrift-ev": {
    slug: "urbandrift-ev",
    brandName: "UrbanDrift Fleet Systems",
    brandTagline: "Commercial EV Fleet Leasing & Smart Telematics for Last-Mile Logistics",
    serviceCriteria: {
      "serviceId": "lead-generation",
      "serviceTitle": "Lead Generation Services",
      "primaryObjective": "High-Ticket B2B Fleet Leasing Pre-Qualification Funnel",
      "targetKpi": "₹420 Cost Per Qualified Fleet Lead · 18% Pipeline Close Rate",
      "techArchitecture": [
            "Interactive TCO Calculator",
            "Instant WhatsApp Concierge Bot",
            "HubSpot CRM Webhooks",
            "LinkedIn Paid Ads"
      ],
      "deliverablesDeployed": [
            "2-Step Fleet Size Pre-Qualification Quiz",
            "Automated TCO Cost Savings PDF Generator",
            "60-Second WhatsApp Dispatch",
            "B2B Decision-Maker Retargeting"
      ],
      "verifiedImpact": "1,420+ Commercial Fleet Leases Signed · ₹18.4Cr Annual Pipeline"
},

    categoryBadge: "Pan-India Fleet Deployment · 99.8% Fleet Uptime",
    domainUrl: "urbandriftev.com",
    theme: {
      primaryBg: "bg-[#080d1a]",
      accentColor: "text-cyan-400",
      accentBorder: "border-cyan-500/30",
      pillBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
      heroGlow: "from-cyan-900/30 via-cyan-600/10 to-transparent",
    },
    hero: {
      eyebrow: "B2B COMMERCIAL FLEET ELECTRIFICATION",
      title: "Cut Last-Mile Fleet Running Costs by 72%. Zero Capex.",
      subtitle:
        "Engineered for high-duty delivery operations. Heavy-payload electric 2W and 3W vehicles with 90-second swappable batteries and IoT fleet telemetry.",
      primaryCta: "Calculate Fleet Savings",
      secondaryCta: "Book Fleet Pilot (10 EVs)",
      stats: [
        { label: "Active Fleet Vehicles", val: "4,850+" },
        { label: "Metric Tons CO2 Cut", val: "12,400 T" },
        { label: "Avg Monthly TCO Savings", val: "₹14,200/EV" },
        { label: "Swap Network Stations", val: "320 Hubs" },
      ],
    },
    interactiveType: "calculator_ev",
    interactiveData: {
      title: "B2B Fleet TCO & Fuel Savings Calculator",
      defaultFleetSize: 15,
      defaultDailyKm: 90,
      dieselCostPerLitre: 94,
      dieselKmPerLitre: 22,
      evKwhPer100Km: 3.5,
      powerCostPerKwh: 8.5,
    },
    products: [
      {
        id: "ud-01",
        name: "UrbanDrift CargoPro 3-Wheeler (L5N Cargo)",
        category: "Commercial 3-Wheelers",
        price: 12499,
        badge: "Most Popular Lease",
        rating: 4.9,
        reviewCount: 380,
        description:
          "550kg certified payload capacity, 140km real-world range with dual swappable LFP battery modules, and integrated 4G telematics with geo-fencing.",
        specs: ["550kg Certified Payload", "140km Real-World Range", "90-Sec Swappable LFP"],
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "ud-02",
        name: "UrbanDrift Sprint Delivery 2-Wheeler",
        category: "Delivery 2-Wheelers",
        price: 3299,
        badge: "Quick Commerce Choice",
        rating: 4.8,
        reviewCount: 890,
        description:
          "Heavy-duty reinforced chassis, 110km true range, heavy-load rear delivery rack compatible with all major dark store crates.",
        specs: ["110km True Range", "Heavy Rear Delivery Frame", "Remote Immobilizer via App"],
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "ud-03",
        name: "UrbanDrift HeavyHaul 1-Ton Electric Van",
        category: "Intra-City Logistics",
        price: 24999,
        badge: "Enterprise Van",
        rating: 4.9,
        reviewCount: 120,
        description:
          "1,050kg payload volume with 210 cu.ft cargo space. Rapid 45-minute DC fast charging with regenerative electronic braking.",
        specs: ["1,050kg Payload", "210 cu.ft Cargo Space", "45-Min Fast DC Charging"],
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "ud-04",
        name: "SmartSwapp Hub Battery Station (8-Bay)",
        category: "Fleet Charging Infra",
        price: 45000,
        badge: "Depot Infrastructure",
        rating: 5.0,
        reviewCount: 75,
        description:
          "Automated indoor/outdoor 8-bay smart charging cabinet with thermal runaway fire prevention and automated battery health diagnostics.",
        specs: ["8 Parallel Fast Bays", "Smart Cloud Balancing", "IP67 Weatherproof"],
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
      },
    ],
    trustBadges: [
      { title: "Zero Capex Leasing", desc: "Flexible 12 to 36 month operational lease" },
      { title: "2-Hour Breakdown SLA", desc: "Pan-India mobile technician support" },
      { title: "Integrated Cloud Telematics", desc: "Real-time battery SoC, speed & route tracking" },
      { title: "AIS 156 Phase 2 Certified", desc: "Thermal run-away tested fireproof batteries" },
    ],
    customerReviews: [
      {
        author: "Manish Agarwal",
        location: "VP Operations, ExpressLogistics",
        rating: 5,
        title: "Reduced our monthly fuel spend by 68%",
        comment:
          "We transitioned 120 delivery executives from petrol two-wheelers to UrbanDrift Sprint. The swappable battery ecosystem eliminated charging downtime completely.",
        verified: true,
      },
      {
        author: "Vikramjit Singh",
        location: "Co-Founder, QuickDeliver Delhi",
        rating: 5,
        title: "Telematics and uptime are second to none",
        comment:
          "The cargo 3-wheelers handle heavy FMCG crates easily. The fleet management dashboard gives our dispatchers accurate battery states in real-time.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "What is included in the monthly lease price?",
        a: "Lease covers vehicle access, comprehensive battery health replacement guarantee, cloud telematics license, scheduled preventive maintenance, and roadside assistance.",
      },
      {
        q: "Can we start with a small pilot fleet?",
        a: "Yes, our B2B Pilot Program allows logistics partners to trial 5 to 10 vehicles for 30 days before full rollout.",
      },
    ],
  },

  // 3. You & Me Photography (Performance Marketing)
  "you-and-me-photography": {
    slug: "you-and-me-photography",
    brandName: "You & Me Weddings",
    brandTagline: "Editorial & Bespoke Destination Wedding Cinematography",
    serviceCriteria: {
      "serviceId": "social-media",
      "serviceTitle": "Social Media Services",
      "primaryObjective": "Luxury Royal Wedding Viral Reels & High-Ticket Booking",
      "targetKpi": "3.4M+ Organic Reel Views · ₹3.5L Average Booking Size",
      "techArchitecture": [
            "Cinematic 4K Video Delivery",
            "Instagram Whitelisted Ads",
            "Interactive Date Availability Engine",
            "Luxury Micro-Moments"
      ],
      "deliverablesDeployed": [
            "3-Second Hook Hinglish Video Scripts",
            "Emotional Royal Narrative Audio Design",
            "Luxury Wedding Date Concierge",
            "High-Net-Worth Retargeting"
      ],
      "verifiedImpact": "100% Calendar Fully Booked for 2026 Season · 4.98/5 Rating"
},

    categoryBadge: "Featured in Vogue Weddings & Harper's Bazaar Bride",
    domainUrl: "youandmeweddings.art",
    theme: {
      primaryBg: "bg-[#14100c]",
      accentColor: "text-amber-300",
      accentBorder: "border-amber-500/30",
      pillBg: "bg-amber-500/10 text-amber-200 border-amber-500/20",
      heroGlow: "from-amber-900/30 via-amber-600/10 to-transparent",
    },
    hero: {
      eyebrow: "HAUTE WEDDING CINEMATOGRAPHY · GLOBAL PORTFOLIO",
      title: "Timeless Royal Wedding Stories Written in Light & Shadow.",
      subtitle:
        "Documenting discerning couples across Udaipur palaces, Lake Como villas, and Amalfi cliffs with medium-format analog & 4K cinematic film.",
      primaryCta: "Check Wedding Date Availability",
      secondaryCta: "Explore Private Portfolio",
      stats: [
        { label: "Palace Weddings Covered", val: "240+" },
        { label: "Global Destinations", val: "14 Countries" },
        { label: "Client Satisfaction", val: "100%" },
        { label: "Vogue Feature Count", val: "18 Issues" },
      ],
    },
    interactiveType: "estate_concierge",
    interactiveData: {
      title: "Wedding Date Availability & Private Concierge",
      destinations: [
        "Udaipur / Jaipur / Jodhpur Royal Palaces",
        "Lake Como / Amalfi Coast / Tuscany, Italy",
        "South Goa / Alibaug Coastal Estates",
        "Santorini / French Riviera",
      ],
    },
    products: [
      {
        id: "ym-01",
        name: "The Royal Heritage Palace Odyssey (3-Day)",
        category: "Palace Wedding Package",
        price: 550000,
        badge: "Flagship Collection",
        rating: 5.0,
        reviewCount: 96,
        description:
          "Comprehensive 3-day royal palace coverage. 4 Senior Cinematographers + 3 Medium-Format Photographers, Drone Pilot, 45-Min Feature Film + 3-Min Instagram Teaser.",
        specs: ["Medium Format Hasselblad & Leica", "Dual 4K RED Cinema Cameras", "Licensed Soundtrack Score"],
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "ym-02",
        name: "The Intimate Coastal Ceremony (2-Day)",
        category: "Destination Package",
        price: 320000,
        badge: "Bespoke Beach Wedding",
        rating: 4.9,
        reviewCount: 82,
        description:
          "Candid, organic, unscripted photography for sunset vows and beachside sangeet in Goa or Alibaug. Includes drone cinematography and color-graded gallery.",
        specs: ["3 Lead Artists", "Same-Day Teaser Video for Socials", "Online 4K Cloud Gallery"],
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "ym-03",
        name: "The European Destination Odyssey",
        category: "International Grandeur",
        price: 850000,
        badge: "Global Collection",
        rating: 5.0,
        reviewCount: 44,
        description:
          "High-fashion editorial wedding documentation across Italy, France, or Greece. Full travel crew, vintage 35mm film rolls + digital cinema archive.",
        specs: ["Full International Travel Crew", "Real 35mm & 120mm Film Rolls", "Director's Cut Wedding Film"],
        image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "ym-04",
        name: "Handcrafted Italian Leather Heirloom Photobook",
        category: "Artisanal Keepsake",
        price: 65000,
        badge: "Archival Print",
        rating: 5.0,
        reviewCount: 110,
        description:
          "Hand-bound in Florence with archival Hahnemühle cotton rag paper, flush-mount layflat binding, and custom gold-embossed monogram.",
        specs: ["Hahnemühle 308gsm Rag Paper", "Full-Grain Italian Leather", "100-Year Archival Life"],
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      },
    ],
    trustBadges: [
      { title: "No Hidden Costs", desc: "All equipment, crew & editing fees transparently outlined" },
      { title: "Same-Day Edits", desc: "48-hour preview teaser delivered during wedding festivities" },
      { title: "Vogue Featured Team", desc: "Over 18 features in premier international bridal publications" },
      { title: "Unobtrusive Cinematography", desc: "Candid emotional storytelling without stage directing" },
    ],
    customerReviews: [
      {
        author: "Ananya & Devraj Singhania",
        location: "Umaid Bhawan Palace, Jodhpur",
        rating: 5,
        title: "They captured the exact soul of our palace wedding",
        comment:
          "Watching our wedding film felt like watching a Cannes-winning cinema. You & Me didn't just take pictures; they preserved the laughter, tears, and royal grandeur effortlessly.",
        verified: true,
      },
      {
        author: "Meera & Rohan Mehta",
        location: "Villa Balbiano, Lake Como",
        rating: 5,
        title: "Absolute perfection in Europe",
        comment:
          "Their mastery of light on Lake Como was breathtaking. The 35mm analog film prints are framed all over our home. Worth every single rupee.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "How early should we book our wedding dates?",
        a: "Due to limited availability (we accept maximum 24 weddings per calendar year), most couples secure dates 6 to 12 months in advance.",
      },
      {
        q: "What is the turnaround time for the wedding film?",
        a: "You receive a 60-second social reel within 48 hours, a 3-minute cinematic teaser within 3 weeks, and the full feature film within 8 weeks.",
      },
    ],
  },

  // 4. SnackNation Superfoods (Performance Marketing)
  "snacknation-makhanas": {
    slug: "snacknation-makhanas",
    brandName: "SnackNation Superfoods",
    brandTagline: "Slow-Roasted Himalayan Water Lily Pops & Protein Snacks",
    serviceCriteria: {
      "serviceId": "performance-marketing",
      "serviceTitle": "Performance Marketing Services",
      "primaryObjective": "Broad Target Scaling & Dynamic Creative Testing (DCT)",
      "targetKpi": "4.6x Blended ROAS · Sub-₹320 First-Order CAC",
      "techArchitecture": [
            "Meta Advantage+ Shopping Campaigns (ASC+)",
            "Shopify Plus Headless",
            "Klaviyo Cart Recovery",
            "1-Click UPI Drawer"
      ],
      "deliverablesDeployed": [
            "16 Monthly Cinematic UGC Video Packs",
            "Broad Scale Creative Fatigue Rotation",
            "Custom 6-Flavor Box AOV Multiplier",
            "Post-Purchase Retention Engine"
      ],
      "verifiedImpact": "₹84L Monthly Ad Spend Scaled at 4.6x ROAS · 38% Repeat Rate"
},

    categoryBadge: "0% Palm Oil · 100% Olive Oil Roasted · High Fiber",
    domainUrl: "snacknation.in",
    theme: {
      primaryBg: "bg-[#180a08]",
      accentColor: "text-amber-400",
      accentBorder: "border-amber-500/30",
      pillBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      heroGlow: "from-amber-900/30 via-orange-600/10 to-transparent",
    },
    hero: {
      eyebrow: "CLEAN-LABEL GUILT-FREE CRUNCH",
      title: "Slow-Roasted Himalayan Foxnuts. 0% Palm Oil.",
      subtitle:
        "Hand-harvested from Mithila lotus ponds, slow-roasted in pure cold-pressed olive oil, and tossed in natural Himalayan herb seasonings.",
      primaryCta: "Build Your 6-Pack Box",
      secondaryCta: "Explore Flavours",
      stats: [
        { label: "Bags Delivered", val: "1,240,000+" },
        { label: "Palm Oil Content", val: "0.0%" },
        { label: "Plant Protein per Bag", val: "12 Grams" },
        { label: "Repeat Order Rate", val: "44.6%" },
      ],
    },
    interactiveType: "bundle_snacks",
    interactiveData: {
      title: "Build Your Custom 6-Flavour Snack Box (Save 25%)",
      flavours: [
        "Smoked Peri-Peri Foxnuts",
        "Himalayan Truffle & Sea Salt",
        "Tangy Achari Pudina",
        "Desi Barbeque Crunch",
        "Creamy Cheese & Jalapeno",
        "Roasted Jowar Pops",
      ],
      bundleDiscount: "25% OFF + Free Gourmet Tin",
    },
    products: [
      {
        id: "sn-01",
        name: "Smoked Peri-Peri Roasted Foxnuts (80g)",
        category: "Spicy Pops",
        price: 249,
        originalPrice: 299,
        badge: "Top Seller",
        rating: 4.9,
        reviewCount: 3420,
        description:
          "Slow roasted in Spanish olive oil and seasoned with African bird's eye chili, crushed garlic, and smoked paprika. 0% artificial flavors.",
        specs: ["12g Plant Protein", "0g Trans Fat", "Pure Cold-Pressed Olive Oil"],
        image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281084?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "sn-02",
        name: "Himalayan Truffle & Sea Salt Foxnuts (80g)",
        category: "Gourmet Pops",
        price: 299,
        originalPrice: 350,
        badge: "Chef's Choice",
        rating: 4.9,
        reviewCount: 1890,
        description:
          "Earthy black summer truffle aroma combined with hand-harvested pink rock salt crystals from the Himalayan foothills.",
        specs: ["Black Summer Truffle Essence", "Rich in Calcium & Potassium", "Gluten Free"],
        image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "sn-03",
        name: "Tangy Achari Pudina Crunchy Pops (80g)",
        category: "Desi Flavours",
        price: 229,
        originalPrice: 280,
        badge: "New Hit",
        rating: 4.8,
        reviewCount: 1450,
        description:
          "Authentic North Indian mango pickle spices balanced with freeze-dried cooling peppermint leaves and roasted cumin.",
        specs: ["Real Sun-Dried Mint", "Digestive Spices", "No Added Preservatives"],
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "sn-04",
        name: "4-Flavor Master Sampler Box (4 x 80g)",
        category: "Bundle Packs",
        price: 899,
        originalPrice: 1199,
        badge: "Best Value",
        rating: 5.0,
        reviewCount: 4200,
        description:
          "Includes 1 each of Peri-Peri, Himalayan Truffle, Achari Pudina, and Tangy Barbeque in a collector gift box.",
        specs: ["4 Full-Size Pouches", "Airtight Resealable Zips", "Free Shipping"],
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
      },
    ],
    trustBadges: [
      { title: "Never Deep Fried", desc: "Dry roasted with pure cold-pressed extra virgin olive oil" },
      { title: "Non-GMO Water Lily Seeds", desc: "Procured directly from Mithila agricultural cooperatives" },
      { title: "Gluten & Corn Free", desc: "Safe snacking for celiac & keto lifestyles" },
      { title: "Pan-India 48h Delivery", desc: "Ships fresh daily from temperature-controlled facility" },
    ],
    customerReviews: [
      {
        author: "Kavita Rao",
        location: "Mumbai",
        rating: 5,
        title: "Replaced my 4 PM potato chip cravings",
        comment:
          "The Peri-Peri crunch is incredible! Most packaged makhanas have an oily aftertaste, but SnackNation feels crisp, light, and authentically spicy.",
        verified: true,
      },
      {
        author: "Siddharth Sen",
        location: "Gurugram",
        rating: 5,
        title: "Truffle flavor is addictive",
        comment:
          "Ordered the 4-pack sampler box. The Himalayan Truffle is on another level. Reordered 12 bags for our office pantry.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "What is the shelf life of unopened packs?",
        a: "Our nitrogen-flushed foil pouches keep the foxnuts crunch-fresh for 9 months from the date of manufacture.",
      },
      {
        q: "Are these snacks suitable for diabetic and keto diets?",
        a: "Yes! Makhanas have a low glycemic index, zero added refined sugars, and provide essential plant-based protein and magnesium.",
      },
    ],
  },

  // 5. BharatBio Healthcare (Lead Generation)
  "bharat-bio-health": {
    slug: "bharat-bio-health",
    brandName: "BharatBio Health Systems",
    brandTagline: "Automated Clinical Diagnostic Analyzers & Hospital Equipment",
    serviceCriteria: {
      "serviceId": "lead-generation",
      "serviceTitle": "Lead Generation & High-Ticket SEM",
      "primaryObjective": "Hospital & Pathology Lab Equipment Lead Generation",
      "targetKpi": "₹650 Cost Per Verified Pathology Lead · 24% Demo Conversion",
      "techArchitecture": [
            "Google Search Commercial High-Intent Bidding",
            "HL7 LIS Integration Funnel",
            "Reagent Cost Estimator",
            "Direct Sales Engineer Routing"
      ],
      "deliverablesDeployed": [
            "NABL-Ready Reagent Cost Calculator",
            "Hospital Procurement Pre-Qualification",
            "Zero-Ghosting 15-Minute Callback SLA",
            "Technical Spec Sheet Gate"
      ],
      "verifiedImpact": "320+ Hospital Installations Pan-India · ₹42Cr Total Equipment Value"
},

    categoryBadge: "NABL & CE-IVD Approved · ISO 13485 Certified",
    domainUrl: "bharatbiohealth.com",
    theme: {
      primaryBg: "bg-[#09101d]",
      accentColor: "text-blue-400",
      accentBorder: "border-blue-500/30",
      pillBg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      heroGlow: "from-blue-900/30 via-blue-600/10 to-transparent",
    },
    hero: {
      eyebrow: "B2B CLINICAL LABORATORY SOLUTIONS",
      title: "Hospital-Grade Diagnostic Accuracy. 48h Pan-India Deployment.",
      subtitle:
        "Engineered for high-volume pathology chains and hospital ICUs. Fully automated 5-part hematology and CLIA immunoassay analyzers with lowest reagent cost per test.",
      primaryCta: "Request Institutional Quote",
      secondaryCta: "Calculate Reagent Cost",
      stats: [
        { label: "Installations Nationwide", val: "1,850+" },
        { label: "Daily Diagnostic Tests", val: "420,000+" },
        { label: "NABL Compliant Uptime", val: "99.9%" },
        { label: "Reagent Cost Savings", val: "Up to 42%" },
      ],
    },
    interactiveType: "diagnostic_quote",
    interactiveData: {
      title: "Lab Test Volume & Reagent Cost Calculator",
      analyzerModels: [
        { name: "BioScan 5000 5-Part Hematology", baseCostPerTest: "₹14.50" },
        { name: "ImmunoRapid 200 CLIA System", baseCostPerTest: "₹48.00" },
        { name: "Electrolyte 900 Blood Gas POC", baseCostPerTest: "₹32.00" },
      ],
    },
    products: [
      {
        id: "bb-01",
        name: "BioScan 5000 5-Part Hematology Analyzer",
        category: "Hematology Systems",
        price: 680000,
        badge: "Hospital Flagship",
        rating: 4.9,
        reviewCount: 310,
        description:
          "60 samples/hour throughput. Laser flow cytometry + chemical dye method for precise WBC differential, 28 reportable parameters with automated barcode reader.",
        specs: ["60 Samples/Hour", "28 Reportable Parameters", "LIS/HIS Dual-Directional Sync"],
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "bb-02",
        name: "ImmunoRapid 200 Chemiluminescence (CLIA)",
        category: "Immunoassay Systems",
        price: 1150000,
        badge: "High Precision",
        rating: 5.0,
        reviewCount: 180,
        description:
          "Magnetic microparticle CLIA platform with 180 tests/hour throughput. Thyroid, cardiac, oncology, and infectious disease panels with zero cross-contamination.",
        specs: ["180 Tests/Hour", "Magnetic Particle Separation", "TFT Touchscreen Interface"],
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "bb-03",
        name: "Electrolyte Plus Critical Care POC Analyzer",
        category: "Critical Care",
        price: 240000,
        badge: "ICU Standard",
        rating: 4.8,
        reviewCount: 240,
        description:
          "Point-of-care ion selective electrode system for K+, Na+, Cl-, Ca2+, and pH. Results within 35 seconds using only 65µl whole blood sample.",
        specs: ["35-Second Cycle Time", "65µl Micro-Sample", "Automatic Liquid Calibration"],
        image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "bb-04",
        name: "Annual Reagent Bulk Subscription (10,000 Tests)",
        category: "Consumables",
        price: 145000,
        badge: "Institutional Pack",
        rating: 5.0,
        reviewCount: 520,
        description:
          "Pre-calibrated enzymatic reagents, diluents, and lysing agents with temperature-controlled cold-chain pan-India delivery.",
        specs: ["10,000 Complete Tests", "Cold-Chain Monitored", "Long 18-Month Expiry"],
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
      },
    ],
    trustBadges: [
      { title: "NABL Ready Protocols", desc: "Automated QC charts with Levey-Jennings & Westgard rules" },
      { title: "4-Hour Pan-India Service", desc: "Dedicated certified biomedical field engineers" },
      { title: "Direct LIS Integration", desc: "Seamless HL7 protocol connection to hospital ERPs" },
      { title: "Zero Interest EMI", desc: "Flexible medical equipment leasing plans for pathology clinics" },
    ],
    customerReviews: [
      {
        author: "Dr. Sunita Deshmukh",
        location: "Medical Director, Apex Diagnostics Mumbai",
        rating: 5,
        title: "Flawless correlation with reference standards",
        comment:
          "We installed the BioScan 5000 six months ago. Its correlation with our reference controls is >0.99. Downtime has been essentially zero.",
        verified: true,
      },
      {
        author: "Dr. K. Narayanan",
        location: "Chief Pathologist, LifeCare Hospitals Chennai",
        rating: 5,
        title: "Substantial reagent cost reduction",
        comment:
          "Reagent costs on the CLIA analyzer are nearly 40% lower than multinational competitors, without sacrificing analytical specificity.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "What warranty and service support are provided?",
        a: "Every analyzer comes with a 2-year comprehensive on-site warranty, quarterly calibration visits, and 24/7 hotline support.",
      },
      {
        q: "Can the equipment interface with our existing hospital software?",
        a: "Yes. All BharatBio analyzers feature bi-directional RS232 and Ethernet interfaces supporting standard HL7 and ASTM protocols.",
      },
    ],
  },

  // 6. Sobha Heritage Villas (Lead Generation)
  "sobha-heritage-villas": {
    slug: "sobha-heritage-villas",
    brandName: "Sobha Heritage Villas · Goa",
    brandTagline: "Private Indo-Portuguese Luxury Estates in North Goa",
    serviceCriteria: {
      "serviceId": "lead-generation",
      "serviceTitle": "Lead Generation Services",
      "primaryObjective": "Ultra-Luxury Goa Heritage Villa High-Net-Worth Sales",
      "targetKpi": "₹1,850 Cost Per Ultra-HNW Lead · ₹4.5Cr Average Transaction Value",
      "techArchitecture": [
            "Meta HNW Broad Targeting",
            "3D Architectural Virtual Tour",
            "Private Chauffeur Scheduling Engine",
            "WhatsApp VIP Concierge"
      ],
      "deliverablesDeployed": [
            "Exclusive Private Villa Brochure Gate",
            "Sanad & RERA Title Verification Dossier",
            "Chauffeur Concierge Scheduler",
            "Retargeting for NRI Investors"
      ],
      "verifiedImpact": "14 Heritage Villas Sold Out in Phase 1 · ₹63Cr Total Gross Value"
},

    categoryBadge: "Only 12 Signature Residences · Assagao Valley",
    domainUrl: "sobhaheritagegoa.com",
    theme: {
      primaryBg: "bg-[#140e0b]",
      accentColor: "text-amber-200",
      accentBorder: "border-amber-500/30",
      pillBg: "bg-amber-500/10 text-amber-200 border-amber-500/20",
      heroGlow: "from-amber-900/30 via-red-900/10 to-transparent",
    },
    hero: {
      eyebrow: "PRIVATE RESIDENCES · ASSAGAO VALLEY, GOA",
      title: "Where 18th-Century Portuguese Heritage Meets Contemporary Opulence.",
      subtitle:
        "Only 12 bespoke signature residences nestled in pristine Assagao orchards with private basalt plunge pools, double-height verandahs, and 24/7 butler service.",
      primaryCta: "Book Private Helicopter Site Visit",
      secondaryCta: "Download Master Architectural Dossier",
      stats: [
        { label: "Private Residences", val: "Only 12 Estates" },
        { label: "Plot Sizes", val: "Up to 9,500 sq.ft" },
        { label: "Private Plunge Pools", val: "100% Villas" },
        { label: "Assagao Forest Cover", val: "84% Greenery" },
      ],
    },
    interactiveType: "estate_concierge",
    interactiveData: {
      title: "Private Villa Viewing & Chauffeur Concierge",
      options: [
        "Private Chauffeur Pickup (Goa MOPA or Dabolim Airport)",
        "Executive Helicopter Transfer to Assagao Helipad",
        "Curated High-Tea with Master Architect",
      ],
    },
    products: [
      {
        id: "sh-01",
        name: "Villa Casa do Ouro (4BHK Estate · 5,850 sq.ft)",
        category: "Heritage Residences",
        price: 145000000,
        badge: "Ready for Handover",
        rating: 5.0,
        reviewCount: 18,
        description:
          "Four en-suite bedrooms, hand-carved Portuguese balcão, private Italian basalt plunge pool, double-height wooden rafters, and private landscaped courtyard.",
        specs: ["5,850 sq.ft Built-Up", "Private Basalt Pool", "Private 24/7 Butler Suite"],
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "sh-02",
        name: "Villa Quinta do Mar (5BHK Grand Estate · 7,200 sq.ft)",
        category: "Signature Enclave",
        price: 210000000,
        badge: "Most Exclusive",
        rating: 5.0,
        reviewCount: 12,
        description:
          "Expansive hilltop estate overlooking the lush Assagao canopy. Temperature-controlled glass-edge infinity pool, private wine cellar, and outdoor gazebo.",
        specs: ["7,200 sq.ft Built-Up", "Glass-Edge Infinity Pool", "Private Temperature Wine Cellar"],
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "sh-03",
        name: "Villa Miramar Haven (3BHK Garden Retreat · 4,200 sq.ft)",
        category: "Garden Residences",
        price: 112000000,
        badge: "2 Units Remaining",
        rating: 4.9,
        reviewCount: 22,
        description:
          "Designed for intimate luxury and quiet artistic retreats. Hand-painted Azulejo Portuguese ceramic tiles, private sun deck, and lush organic spice garden.",
        specs: ["4,200 sq.ft Built-Up", "Hand-Painted Azulejo Tiles", "Private Organic Spice Garden"],
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "sh-04",
        name: "Annual Estate Concierge & Butler Retainer",
        category: "Concierge Services",
        price: 1200000,
        badge: "White-Glove Retainer",
        rating: 5.0,
        reviewCount: 30,
        description:
          "Complete year-round estate maintenance, private chef on demand, airport transfers in Mercedes S-Class, and 24/7 round-the-clock security surveillance.",
        specs: ["Dedicated Estate Butler", "Private Chef Services", "Airport Luxury Fleet"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      },
    ],
    trustBadges: [
      { title: "RERA Approved & Clear Title", desc: "100% freehold land with independent Sanad certification" },
      { title: "Turnkey Interior Handover", desc: "Fully furnished with hand-restored antique teakwood furniture" },
      { title: "Uninterrupted Power & Water", desc: "Dedicated 100% solar power backup and underground water reservoir" },
      { title: "High Rental Yield Potential", desc: "Managed luxury holiday rental program generating 12-14% ROI" },
    ],
    customerReviews: [
      {
        author: "Karan Johar & Partners",
        location: "Mumbai",
        rating: 5,
        title: "A sanctuary of peace in Assagao",
        comment:
          "The attention to heritage Portuguese craftsmanship is astonishing. From the reclaimed Burma teak beams to the brass ironmongery, every inch reflects royal heritage.",
        verified: true,
      },
      {
        author: "Pooja & Sameer Wadhwa",
        location: "London / Goa",
        rating: 5,
        title: "Flawless concierge and handover",
        comment:
          "We spend winters in Goa, and Sobha's concierge team ensures the plunge pool, garden, and butler service are ready the minute we land at MOPA.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "What is the construction status of the villas?",
        a: "Eight of the twelve villas are fully completed and ready for immediate possession; four are in final finishing stages for Q3 handover.",
      },
      {
        q: "Can the villa be enrolled in a managed luxury rental pool?",
        a: "Yes, our five-star hospitality division manages guest bookings, private chefs, and security when owners are not in residence.",
      },
    ],
  },

  // 7. Chai Chaska Co. (Social Media Marketing)
  "chaichaska-ctc": {
    slug: "chaichaska-ctc",
    brandName: "Chai Chaska Co.",
    brandTagline: "High-Elevation Assam Royal CTC & Kadak Tapri Blends",
    serviceCriteria: {
      "serviceId": "ecommerce",
      "serviceTitle": "E-Commerce Services",
      "primaryObjective": "Frictionless Direct D2C Storefront & High-AOV Subscription",
      "targetKpi": "5.2% Storefront Conversion Rate · ₹890 AOV (2.4x Industry Baseline)",
      "techArchitecture": [
            "Next.js 16 Sub-Second Storefront",
            "1-Click UPI Quick Checkout",
            "Dynamic Kadak Strength Selector",
            "WhatsApp Re-Order Flow"
      ],
      "deliverablesDeployed": [
            "Free Terracotta Kulhad AOV Upsell Engine",
            "Frictionless Pincode Delivery Routing",
            "Automated COD Verification Shield",
            "WhatsApp 30-Day Refill Sprints"
      ],
      "verifiedImpact": "120,000+ Kilos of Pure Assam CTC Shipped · 64% 60-Day Repeat Rate"
},

    categoryBadge: "Pure Assam Single-Estate Garden Fresh · No Tea Dust",
    domainUrl: "chaichaska.in",
    theme: {
      primaryBg: "bg-[#180e07]",
      accentColor: "text-amber-400",
      accentBorder: "border-amber-500/30",
      pillBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      heroGlow: "from-amber-900/30 via-orange-800/10 to-transparent",
    },
    hero: {
      eyebrow: "AUTHENTIC TAPRI TEA CULTURE · ASSAM FRESH",
      title: "Asli Desi Kadak Chai. Pure Single-Estate Assam CTC.",
      subtitle:
        "Handpicked golden tea fannings infused with green cardamom from Idukki and sun-dried ginger from Wayanad. No dust, no artificial aromas.",
      primaryCta: "Order Fresh Chai Blends",
      secondaryCta: "Choose Your Kadak Strength",
      stats: [
        { label: "Cups Brewed Daily", val: "850,000+" },
        { label: "Direct Partner Gardens", val: "8 Assam Estates" },
        { label: "Spice Purity", val: "100% Real Whole Spices" },
        { label: "Instagram Community", val: "380K+ Chai Lovers" },
      ],
    },
    interactiveType: "bundle_snacks",
    interactiveData: {
      title: "How Kadak Do You Like Your Chai?",
      flavours: [
        "Desi Kadak Tapri Blend (High Caffeine)",
        "Elaichi Kesar Royal Blend (Fragrant)",
        "Adrak Tulsi Immunity Booster (Healing)",
        "11-Spices Royal Kulhad Masala (Rich & Spicy)",
      ],
    },
    products: [
      {
        id: "cc-01",
        name: "Desi Kadak Tapri CTC Blend (500g Jar)",
        category: "Daily Chai",
        price: 349,
        originalPrice: 420,
        badge: "Bestseller",
        rating: 4.9,
        reviewCount: 4890,
        description:
          "High-elevation BP grade Assam CTC that produces a deep golden red liqueur with bold malty body. Cuts through milk effortlessly.",
        specs: ["Assam Upper Estate CTC", "Rich Malty Flavor", "Airtight UV Foil Pouch"],
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "cc-02",
        name: "Elaichi Kesar Royal CTC (250g Tin)",
        category: "Royal Blends",
        price: 499,
        originalPrice: 599,
        badge: "Festive Favorite",
        rating: 5.0,
        reviewCount: 2120,
        description:
          "Crushed green cardamoms from Kerala hills and real Kashmiri saffron strands blended into fine CTC granules for an aromatic royal brew.",
        specs: ["Kashmiri Saffron Infused", "Hand-Crushed Idukki Elaichi", "Reusable Metal Tin"],
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "cc-03",
        name: "11-Spices Royal Kadha Masala Potli (150g)",
        category: "Masala Blends",
        price: 299,
        originalPrice: 380,
        badge: "Authentic Blend",
        rating: 4.8,
        reviewCount: 1680,
        description:
          "Dry-roasted cinnamon, star anise, clove, ginger, black pepper, and nutmeg ground coarsely. Just add 1 pinch per cup.",
        specs: ["11 Raw Whole Spices", "Zero Sugar or Additives", "Makes 150 Cups"],
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "cc-04",
        name: "Handcrafted Clay Kulhad Set of 6",
        category: "Drinkware",
        price: 499,
        originalPrice: 650,
        badge: "Artisanal Pottery",
        rating: 4.9,
        reviewCount: 940,
        description:
          "Double-fired terracotta kulhads that lend the legendary earthy 'sondhi mitti' aroma to every sip of boiling hot tea.",
        specs: ["100% Natural Red Clay", "Lead-Free & Food Safe", "Microwave Safe"],
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      },
    ],
    trustBadges: [
      { title: "100% Single-Origin Assam", desc: "No second-grade dust tea or artificial colorings" },
      { title: "Direct Farm Gate Price", desc: "Tea plucker welfare supported through fair trade partnerships" },
      { title: "Freshly Vacuum Packed", desc: "Packed within 72 hours of primary auction" },
      { title: "Free Kulhad on Orders ₹799+", desc: "Includes authentic terracotta tea cup" },
    ],
    customerReviews: [
      {
        author: "Aman Tandon",
        location: "Delhi",
        rating: 5,
        title: "Exact taste of highway dhaba chai at home",
        comment:
          "The malty punch of this CTC is unreal. One teaspoon brews a rich, dark chai with that authentic kadak tapri feeling.",
        verified: true,
      },
      {
        author: "Priyanka Roy",
        location: "Kolkata",
        rating: 5,
        title: "Kesar Elaichi blend is heaven",
        comment:
          "The aroma of fresh cardamom hits you the second you boil the water. We serve this to all our guests, and everyone asks where we bought it.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "What makes CTC tea different from leaf tea?",
        a: "CTC (Crush, Tear, Curl) processing produces dense tea pellets that infuse rapidly with boiling water and milk, delivering the rich strength needed for Indian chai.",
      },
      {
        q: "How many cups can one 500g pouch make?",
        a: "Approximately 180 to 200 cups depending on your desired strength.",
      },
    ],
  },

  // 8. StreeThreads Handloom (Social Media Marketing)
  "streethreads-handloom": {
    slug: "streethreads-handloom",
    brandName: "StreeThreads Varanasi",
    brandTagline: "Master Weaver Silk Mark Certified Handloom Sarees",
    serviceCriteria: {
      "serviceId": "ecommerce",
      "serviceTitle": "E-Commerce & Packaging Design",
      "primaryObjective": "Preserving Indian Heritage Craft with Luxury D2C Architecture",
      "targetKpi": "4.4% Conversion Rate · ₹4,800 AOV on Pure Handloom Silk",
      "techArchitecture": [
            "Silk Mark Government Verification API",
            "Zoom-to-Weave High-Resolution Inspection",
            "Shopify Plus Headless",
            "Klaviyo VIP Flows"
      ],
      "deliverablesDeployed": [
            "Authentic Zari & Loom Traceability Card",
            "Pre-Order Custom Blouse Stitching Upsell",
            "COD Abuse & RTO Protection Engine",
            "Artisan Storytelling Video Funnel"
      ],
      "verifiedImpact": "850+ Generational Weavers Supported · ₹2.8Cr Quarterly D2C Sales"
},

    categoryBadge: "Silk Mark of India Certified · Handwoven on Pit Looms",
    domainUrl: "streethreads.in",
    theme: {
      primaryBg: "bg-[#18090f]",
      accentColor: "text-rose-400",
      accentBorder: "border-rose-500/30",
      pillBg: "bg-rose-500/10 text-rose-300 border-rose-500/20",
      heroGlow: "from-rose-900/30 via-red-800/10 to-transparent",
    },
    hero: {
      eyebrow: "HERITAGE HANDLOOM · WEFT OF VARANASI",
      title: "Woven by Hand Over 90 Days. Certified by Silk Mark of India.",
      subtitle:
        "Preserving the sacred art of Banarasi Kadwa weaving, authentic Chanderi zari, and raw Tussar silk directly from the pit looms of generational master weavers.",
      primaryCta: "Explore Bridal Saree Gallery",
      secondaryCta: "Verify Weaver Silk Mark",
      stats: [
        { label: "Master Pit Looms", val: "140 Looms" },
        { label: "Weaving Hours per Saree", val: "320+ Hours" },
        { label: "Silk Mark Authenticity", val: "100% Certified" },
        { label: "Global Patrons", val: "42 Countries" },
      ],
    },
    interactiveType: "herb_explorer",
    interactiveData: {
      title: "Handloom Weave Architecture & Zari Verification",
      herbs: [
        {
          name: "Kadwa Pure Zari Weaving",
          part: "Pit Loom Weft",
          decoctionTime: "90 Days of Hand Weaving",
          benefit: "Each motif is individually engraved by hand with zero floating threads behind.",
          potency: "Pure Silver Gilded Zari",
        },
        {
          name: "Katan Silk Warp",
          part: "Mulberry Silk Cocoon",
          decoctionTime: "Degummed & Hand Spun",
          benefit: "Twisted pure filament silk delivering heirloom tensile strength and natural luster.",
          potency: "100% Pure Mulberry Silk",
        },
        {
          name: "Jangla Floral Jaal",
          part: "Mughal Meenakari",
          decoctionTime: "Fine Silk Needlework",
          benefit: "Multi-colored resham meenakari depicting blooming vines and royal birds.",
          potency: "Hand-Crafted Naksha",
        },
        {
          name: "Silk Mark India QR",
          part: "Central Silk Board",
          decoctionTime: "Spectroscopic Tested",
          benefit: "Official Government of India verification ensuring zero synthetic blending.",
          potency: "Govt Certified",
        },
      ],
    },
    products: [
      {
        id: "st-01",
        name: "Varanasi Katan Pure Silk Kadwa Brocade (Crimson)",
        category: "Bridal Banarasi",
        price: 22500,
        originalPrice: 28000,
        badge: "Masterpiece",
        rating: 5.0,
        reviewCount: 380,
        description:
          "Handcrafted on a traditional pit loom over 75 days. Pure Katan silk warp with intricate gold and silver zari Kadwa boota and rich meenakari border.",
        specs: ["Pure Mulberry Katan Silk", "Pure Zari Weft", "Includes Matching Blouse Piece"],
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "st-02",
        name: "Chanderi Tissue Zari Handwoven Saree (Gold-Olive)",
        category: "Chanderi Heritage",
        price: 14800,
        originalPrice: 18500,
        badge: "Royal Occasion",
        rating: 4.9,
        reviewCount: 290,
        description:
          "Featherweight silk-cotton tissue weave with pure silver-gilt zari border and hand-spun ashrafi motifs. Translucent, regal, and ethereal drape.",
        specs: ["Silk Cotton Blend Tissue", "Real Zari Border", "Featherlight 450 Grams"],
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "st-03",
        name: "Tussar Ghicha Handblock Printed Saree (Raw Indigo)",
        category: "Organic Wild Silk",
        price: 9500,
        originalPrice: 12000,
        badge: "Hand Block Printed",
        rating: 4.8,
        reviewCount: 410,
        description:
          "Wild forest Tussar silk with rich natural texture, handblock printed with organic fermented indigo dyes by artisan families of Bagru.",
        specs: ["Wild Forest Tussar Silk", "Natural Plant Indigo Dyes", "Textured Ghicha Pallu"],
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "st-04",
        name: "Royal Shikargah Pure Zari Dupatta (Emerald)",
        category: "Heritage Dupattas",
        price: 7200,
        originalPrice: 9000,
        badge: "Artisan Collector",
        rating: 5.0,
        reviewCount: 160,
        description:
          "Traditional hunting scene (Shikargah) woven with fine golden threads depicting forest foliage, royal elephants, and deer.",
        specs: ["2.5 Meters Length", "Pure Zari Shikargah Jaal", "Silk Mark Label"],
        image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
      },
    ],
    trustBadges: [
      { title: "Silk Mark of India", desc: "Government authorized 100% natural pure silk certification" },
      { title: "Direct Pit Loom to Wardrobe", desc: "85% of retail price paid directly to weaver families" },
      { title: "Heirloom Longevity", desc: "Woven to last over three generations of family celebrations" },
      { title: "Insured Global Shipping", desc: "Delivered in handcrafted wooden keepsake box with velvet lining" },
    ],
    customerReviews: [
      {
        author: "Meenakshi Sundaram",
        location: "Chennai",
        rating: 5,
        title: "The Kadwa weaving quality is breathtaking",
        comment:
          "The back of the saree has zero exposed threads. That is the hallmark of genuine Kadwa pit loom work. My daughter wore it for her wedding reception to endless compliments.",
        verified: true,
      },
      {
        author: "Tanvi Saxena",
        location: "Bengaluru",
        rating: 5,
        title: "Authentic Silk Mark certificate included",
        comment:
          "I verified the QR code on the Silk Mark tag and it linked straight to the weaver cooperative database. Ethical luxury done right.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "How can I care for my pure Banarasi silk saree?",
        a: "Dry clean only. Store wrapped in a clean unbleached muslin cloth and change the folds every 6 months to preserve the zari threads.",
      },
      {
        q: "Does the saree come with blouse fabric?",
        a: "Yes, all our sarees include an unstitched 80cm matching pure silk blouse piece with coordinating zari borders.",
      },
    ],
  },

  // 9. Lionel P. Boulangerie (E-Commerce Solutions)
  "lionelp-restaurant": {
    slug: "lionelp-restaurant",
    brandName: "Lionel P. Boulangerie & Bistro",
    brandTagline: "Artisanal French Patisserie, Wild Sourdough & Gourmet Hampers",
    categoryBadge: "Normandy Butter Viennoiserie · Baked Fresh at 5:00 AM",
    domainUrl: "lionelp-boulangerie.com",
    theme: {
      primaryBg: "bg-[#181109]",
      accentColor: "text-amber-300",
      accentBorder: "border-amber-500/30",
      pillBg: "bg-amber-500/10 text-amber-200 border-amber-500/20",
      heroGlow: "from-amber-900/30 via-yellow-700/10 to-transparent",
    },
    hero: {
      eyebrow: "ARTISANAL FRENCH BAKERY & BISTRO",
      title: "Born in Paris. Baked Fresh in Delhi Every Morning.",
      subtitle:
        "French Normandy butter croissants with 27 flaky layers, 36-hour slow-fermented wild sourdough, Valrhona chocolate entremets, and bespoke luxury gifting hampers.",
      primaryCta: "Order Fresh Bakery Hamper",
      secondaryCta: "Reserve Bistro Table",
      stats: [
        { label: "Croissants Baked Daily", val: "2,400+" },
        { label: "Normandy Butter Used", val: "100% French AOP" },
        { label: "Sourdough Fermentation", val: "36 Hours" },
        { label: "Boulangerie Rating", val: "4.96 / 5" },
      ],
    },
    interactiveType: "baking_slot",
    interactiveData: {
      title: "Select Today's Fresh Baking Batch Dispatch",
      batches: [
        { time: "08:00 AM Morning Batch", status: "Freshly Out of Stone Oven", slots: "12 boxes left" },
        { time: "04:30 PM Sunset Batch", status: "Currently Proofing", slots: "Open for Booking" },
      ],
    },
    products: [
      {
        id: "lp-01",
        name: "Normandy Butter Viennoiserie Box (6 Pieces)",
        category: "Fresh Pastries",
        price: 950,
        originalPrice: 1200,
        badge: "Morning Signature",
        rating: 5.0,
        reviewCount: 1980,
        description:
          "Includes 2 Classic Butter Croissants, 2 Pain au Chocolat with Valrhona batons, and 2 Cinnamon Kouign-Amanns. 100% French AOP butter.",
        specs: ["French AOP Normandy Butter", "27 Hand-Laminated Layers", "Delivered Warm in Foil"],
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "lp-02",
        name: "Valrhona Dark Chocolate Ganache Gateau (1kg)",
        category: "Celebration Cakes",
        price: 1850,
        originalPrice: 2200,
        badge: "Chef's Signature",
        rating: 4.9,
        reviewCount: 840,
        description:
          "70% Valrhona Guanaja dark chocolate mousse, hazelnut praline crunch layer, and mirror chocolate glaze finished with edible gold leaf.",
        specs: ["70% Valrhona French Chocolate", "Feuilletine Praline Crunch", "Custom Inscription Included"],
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "lp-03",
        name: "San Francisco Style 36-Hour Wild Sourdough",
        category: "Artisanal Bread",
        price: 420,
        badge: "Naturally Leavened",
        rating: 4.9,
        reviewCount: 1320,
        description:
          "Crafted using our 14-year-old mother starter 'Jacques'. Stone-baked with blistered crust, open airy crumb, and delicate pleasant tang.",
        specs: ["36-Hour Cold Retardation", "Only 3 Ingredients: Flour, Water, Salt", "Zero Baker's Yeast"],
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "lp-04",
        name: "The Grand Palais Luxury High-Tea Hamper",
        category: "Gourmet Gifting",
        price: 3400,
        originalPrice: 4200,
        badge: "Luxury Gifting",
        rating: 5.0,
        reviewCount: 460,
        description:
          "Presented in a velvet-lined hat box: French Madeleines, artisanal raspberry macarons, Earl Grey loose leaf tea, and raw wildflower honey.",
        specs: ["Velvet Lined Keepsake Box", "Includes French Macarons & Tea", "Custom Calligraphy Card"],
        image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80",
      },
    ],
    trustBadges: [
      { title: "100% French AOP Butter", desc: "Imported Normandy butter for maximum honeycomb flakiness" },
      { title: "Stone-Baked Daily", desc: "No frozen dough; proofed and baked in deck ovens each morning" },
      { title: "Same-Day Delivery in 90 Mins", desc: "Temperature-monitored insulated bakery hampers" },
      { title: "Zero Artificial Additives", desc: "Pure unbleached grain flour, clean butter and Valrhona cacao" },
    ],
    customerReviews: [
      {
        author: "Chef Ritu Dalmia",
        location: "New Delhi",
        rating: 5,
        title: "The most authentic croissant in India",
        comment:
          "The honeycomb structure inside their butter croissant is world-class. It shatters with each bite just like in the 6th arrondissement of Paris.",
        verified: true,
      },
      {
        author: "Aditya Roy Kapur",
        location: "Gurugram",
        rating: 5,
        title: "Sourdough is a staple in our home",
        comment:
          "We subscribe to their morning sourdough loaf delivery twice a week. Crisp crust, chewy center, toasted with salted butter is unbeatable.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "What time do bakery deliveries start?",
        a: "Our first morning delivery fleet leaves the ovens at 7:30 AM to ensure fresh croissants arrive warm for breakfast.",
      },
      {
        q: "How can I reheat the viennoiserie at home?",
        a: "Pop them into a preheated oven at 180°C for 3 to 4 minutes to restore maximum crispness. Never microwave croissants.",
      },
    ],
  },

  // 10. PetFirst Canine Nutrition (E-Commerce Solutions)
  "pet-first-wellness": {
    slug: "pet-first-wellness",
    brandName: "PetFirst Canine Nutrition",
    brandTagline: "Veterinarian-Engineered Fresh Cooked Meals & Calorie Engine",
    serviceCriteria: {
      "serviceId": "performance-marketing",
      "serviceTitle": "Performance Marketing & Retention",
      "primaryObjective": "Fresh Dog Food Meal Subscription Scaling & Retention",
      "targetKpi": "4.4x Blended ROAS · 72% 3-Month Subscription Retention",
      "techArchitecture": [
            "Meta Advantage+ Catalog Ads",
            "Custom Dog Calorie Portioning Logic",
            "ReCharge Subscription API",
            "Cold-Chain Thermal Tracking"
      ],
      "deliverablesDeployed": [
            "Interactive Breed & Calorie Portioned Meal Quiz",
            "First-Box 40% Trial Funnel Architecture",
            "Automated Delivery Cadence Manager",
            "Veterinarian Whitelisted Ad Campaigns"
      ],
      "verifiedImpact": "18,000+ Active Monthly Canine Subscribers · ₹1.4Cr Monthly MRR"
},

    categoryBadge: "100% Human-Grade Whole Meat · Formulated by Vet Nutritionists",
    domainUrl: "petfirstwellness.in",
    theme: {
      primaryBg: "bg-[#0b1411]",
      accentColor: "text-emerald-400",
      accentBorder: "border-emerald-500/30",
      pillBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      heroGlow: "from-emerald-900/30 via-teal-800/10 to-transparent",
    },
    hero: {
      eyebrow: "VETERINARY PRECISION DOG MEALS",
      title: "Real Meat. Gently Cooked. Custom Calorie Portions.",
      subtitle:
        "Say goodbye to dry, burnt kibble filled with fillers. Fresh farm chicken, Atlantic salmon oil, and steamed pumpkin customized to your dog's age and weight.",
      primaryCta: "Calculate Dog Calories",
      secondaryCta: "Shop Fresh Food Pouches",
      stats: [
        { label: "Healthy Dogs Fed", val: "46,000+" },
        { label: "Fresh Meals Cooked", val: "1,200,000+" },
        { label: "Human-Grade Ingredients", val: "100%" },
        { label: "Vet Recommendation Rate", val: "98.4%" },
      ],
    },
    interactiveType: "calorie_pet",
    interactiveData: {
      title: "Dog Breed & Calorie Portion Planner",
      breeds: [
        { name: "Golden Retriever / Lab (Adult)", avgWeight: 30, calPerKg: 45 },
        { name: "Indie / Desi Dog (Adult)", avgWeight: 18, calPerKg: 50 },
        { name: "German Shepherd (Active)", avgWeight: 34, calPerKg: 55 },
        { name: "Shih Tzu / Pug (Toy Breed)", avgWeight: 8, calPerKg: 60 },
      ],
    },
    products: [
      {
        id: "pf-01",
        name: "Farm-Fresh Chicken & Pumpkin Gently Cooked (1kg Pouch)",
        category: "Fresh Daily Meals",
        price: 649,
        originalPrice: 799,
        badge: "Top Recommended",
        rating: 4.9,
        reviewCount: 3890,
        description:
          "65% fresh deboned chicken, steamed pumpkin, carrots, spinach, eggshell calcium, and organic flaxseed oil. Gently steam-cooked at 72°C.",
        specs: ["65% Real Deboned Meat", "Zero Grain & Gluten", "Ready to Serve Pouch"],
        image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "pf-02",
        name: "Atlantic Wild Salmon Omega-3 Vitality Topper (250ml)",
        category: "Coat & Skin Care",
        price: 899,
        originalPrice: 1100,
        badge: "Coat Shininess",
        rating: 5.0,
        reviewCount: 1420,
        description:
          "Pure cold-pressed wild Norwegian salmon oil rich in EPA & DHA. Reduces shedding and cures itchy skin within 14 days of daily spoonfuls.",
        specs: ["High Potency EPA & DHA", "Cold-Pressed Norwegian Salmon", "Mess-Free Pump Bottle"],
        image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "pf-03",
        name: "Glucosamine & Collagen Joint Mobility Chews (60 ct)",
        category: "Joint Care",
        price: 1199,
        originalPrice: 1499,
        badge: "Senior Dog Essential",
        rating: 4.9,
        reviewCount: 920,
        description:
          "Veterinary strength Glucosamine HCl, Chondroitin, MSM, and marine collagen soft chews for hip dysplasia and stiffness relief.",
        specs: ["500mg Glucosamine per Chew", "Real Chicken Liver Flavor", "Improves Mobility in 21 Days"],
        image: "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "pf-04",
        name: "Daily Probiotic & Digestive Prebiotic Powder (150g)",
        category: "Gut Health",
        price: 749,
        badge: "Firm Stool Formula",
        rating: 4.8,
        reviewCount: 650,
        description:
          "5 billion active CFUs across 6 canine-specific probiotic strains + pumpkin fiber. Stops chronic diarrhea and gas.",
        specs: ["5 Billion Active CFUs", "Organic Pumpkin Prebiotic", "Tasteless Food Topper"],
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
      },
    ],
    trustBadges: [
      { title: "Formulated by Canine Nutritionists", desc: "Meets or exceeds all AAFCO dog nutrition standards" },
      { title: "Real Whole Foods Only", desc: "No meat meals, corn, wheat, or synthetic preservatives" },
      { title: "Frozen Fresh Delivery", desc: "Dispatched in thermal insulated boxes across 28 cities" },
      { title: "Subscription Flexibility", desc: "Pause, cancel, or adjust delivery cadence anytime" },
    ],
    customerReviews: [
      {
        author: "Dr. Rohini Mehta (BVSc & AH)",
        location: "Mumbai",
        rating: 5,
        title: "I prescribe this to all my canine patients",
        comment:
          "The transformation in dogs switching from processed kibble to PetFirst is dramatic. Better coats, firmer stools, and increased energy levels within 10 days.",
        verified: true,
      },
      {
        author: "Varun & Bruno (Golden Retriever)",
        location: "Bengaluru",
        rating: 5,
        title: "Bruno licks his bowl sparkling clean",
        comment:
          "He used to walk away from his dry kibble. Now he starts spinning with excitement the moment I pull out the PetFirst chicken pouch.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "How should I store and serve PetFirst fresh meals?",
        a: "Keep unopened pouches in the freezer. Thaw one pouch in the refrigerator overnight and serve at room temperature or gently warm for 30 seconds.",
      },
      {
        q: "How do I transition my dog from kibble to fresh food?",
        a: "Transition over 7 days: Start with 25% PetFirst and 75% old food for 2 days, then 50/50 for 2 days, 75% for 2 days, and 100% on day 7.",
      },
    ],
  },

  // 11. Mithai Magic Sweets (Quick Commerce Growth)
  "mithaimagic-sweets": {
    slug: "mithaimagic-sweets",
    brandName: "Mithai Magic Sweets",
    brandTagline: "Pure Desi Ghee Indian Sweets Delivered in 10 Minutes",
    serviceCriteria: {
      "serviceId": "quick-commerce",
      "serviceTitle": "Quick Commerce Services",
      "primaryObjective": "Sub-15 Minute Desi Ghee Sweets Dark Store Domination",
      "targetKpi": "11-Min Average Dispatch Time · 99.8% Inventory In-Stock Accuracy",
      "techArchitecture": [
            "Dark Store Real-time Inventory API",
            "Blinkit & Zepto Sponsored Search Bids",
            "Instant Delivery Radar Simulation",
            "Cold Storage Cryo-Lock"
      ],
      "deliverablesDeployed": [
            "Live 10-Minute Dark Store Dispatch Counter",
            "Festive Flash Placement Bidding Strategy",
            "Geo-Fenced BKC & Connaught Place Hub Routing",
            "Zero Vanaspati Lab Verification Badges"
      ],
      "verifiedImpact": "45,000+ Boxes Delivered in Diwali Week · 4.94 Star Rating Across 3 Hubs"
},

    categoryBadge: "10-Minute Dark Store Delivery · 100% Pure Desi Ghee",
    domainUrl: "mithaimagicsweets.com",
    theme: {
      primaryBg: "bg-[#180d07]",
      accentColor: "text-amber-400",
      accentBorder: "border-amber-500/30",
      pillBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      heroGlow: "from-amber-900/30 via-orange-700/10 to-transparent",
    },
    hero: {
      eyebrow: "10-MINUTE QUICK COMMERCE DARK STORE SWEETS",
      title: "Pure Desi Ghee. Melt-In-Mouth Taste. At Your Door in 11 Mins.",
      subtitle:
        "Crafted with 100% Gir cow A2 ghee, Iranian pistachios, and slow-simmered khoya. Stored in climate-controlled dark stores for ultra-fast instant delivery.",
      primaryCta: "Order 10-Min Delivery",
      secondaryCta: "Explore Festive Hampers",
      stats: [
        { label: "Average Delivery Time", val: "11 Mins 40 Sec" },
        { label: "Pure Desi Ghee Used", val: "100% A2 Gir Cow" },
        { label: "Festival Hampers Delivered", val: "340,000+" },
        { label: "Dark Stores Pan-India", val: "42 Hubs" },
      ],
    },
    interactiveType: "darkstore_timer",
    interactiveData: {
      title: "Live 10-Minute Dark Store Dispatch Counter",
      storeHub: "Blinkit / Zepto / Instamart Integrated Dark Store #24",
      currentEtaMinutes: 11,
      currentEtaSeconds: 24,
    },
    products: [
      {
        id: "mm-01",
        name: "Shahi Motichoor A2 Desi Ghee Ladoos (500g Box)",
        category: "Traditional Ladoos",
        price: 450,
        originalPrice: 520,
        badge: "Blinkit #1 Bestseller",
        rating: 5.0,
        reviewCount: 6420,
        description:
          "Micro-fine besan pearls fried in pure A2 Gir cow ghee, dipped in saffron-cardamom syrup and topped with crushed pistachio flakes.",
        specs: ["100% Pure A2 Desi Ghee", "Melt in Mouth Micro Beads", "Delivered in Tamperproof Box"],
        image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "mm-02",
        name: "Kaju Katli Diamond Cut Silver Vark (500g Box)",
        category: "Cashew Sweets",
        price: 680,
        originalPrice: 790,
        badge: "Pure Cashew",
        rating: 4.9,
        reviewCount: 4890,
        description:
          "Made with 100% Goa cashews with zero added flour or starch. Finished with genuine vegetarian silver foil vark.",
        specs: ["Zero Flour or Fillers", "Certified Vegetarian Silver Leaf", "Silky Smooth Texture"],
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "mm-03",
        name: "Royal Rose Malai Ghewar with Rabdi (400g)",
        category: "Seasonal Delicacies",
        price: 550,
        badge: "Fresh Today",
        rating: 5.0,
        reviewCount: 2100,
        description:
          "Traditional Rajasthani honeycomb lattice ghewar soaked in fragrant rose syrup and topped with slow-reduced thick malai rabdi.",
        specs: ["Crisp Honeycomb Lattice", "Fresh Malai Rabdi Topping", "Served with Pistachios"],
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "mm-04",
        name: "Pista Badam Karachi Halwa Soft Cubes (400g)",
        category: "Chewy Delights",
        price: 480,
        badge: "Classic Ghee",
        rating: 4.8,
        reviewCount: 1450,
        description:
          "Translucent, chewy desi ghee halwa studded with toasted almond slivers and pistachios with gentle orange blossom undertones.",
        specs: ["Loaded with Nuts", "Pure Desi Ghee", "Long Shelf Life"],
        image: "https://images.unsplash.com/photo-1505253758473-96b3015f21c9?auto=format&fit=crop&w=800&q=80",
      },
    ],
    trustBadges: [
      { title: "10-Minute Dark Store Dispatch", desc: "Geo-fenced order routing for lightning speed arrival" },
      { title: "100% Pure Cow Ghee", desc: "Lab-tested zero vanaspati, palm oil, or adulteration" },
      { title: "Sealed Cold Storage", desc: "Maintained at strict 18°C to ensure peak freshness" },
      { title: "Instant Replacement Guarantee", desc: "Zero-questions-asked refund if delivery exceeds 25 mins" },
    ],
    customerReviews: [
      {
        author: "Deepak Chawla",
        location: "South Delhi",
        rating: 5,
        title: "Arrived in 9 minutes before our puja started",
        comment:
          "We forgot to buy sweets for the evening aarti. Ordered the Shahi Motichoor Ladoos, and the delivery rider was at my door in under 10 minutes. Warm, fresh, and divine taste.",
        verified: true,
      },
      {
        author: "Shalini Kapoor",
        location: "Bandra, Mumbai",
        rating: 5,
        title: "Kaju Katli is exceptionally thin and fresh",
        comment:
          "You can taste the real cashews without that chalky sugary feeling. The best instant-delivery sweets in Mumbai.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "How do you guarantee 10-minute delivery?",
        a: "We operate dedicated micro-fulfillment dark stores across every 3km radius in top metro cities, pre-packing fresh batches every morning.",
      },
      {
        q: "What is the shelf life of the sweets?",
        a: "Desi ghee ladoos and kaju katli stay fresh for 14 days at room temperature; malai ghewar should be consumed within 48 hours.",
      },
    ],
  },

  // 12. PureGlow Kombucha (Quick Commerce Growth)
  "pureglow-kombucha": {
    slug: "pureglow-kombucha",
    brandName: "PureGlow Sparkling Kombucha",
    brandTagline: "Living Probiotics, Darjeeling Tea & Cold-Chain Speed",
    serviceCriteria: {
      "serviceId": "quick-commerce",
      "serviceTitle": "Quick Commerce & Performance Marketing",
      "primaryObjective": "Cold-Chain Raw Probiotic Delivery & Health Influencer Funnel",
      "targetKpi": "14-Min Dark Store Delivery · 4.8x Meta ASC+ Blended ROAS",
      "techArchitecture": [
            "Zepto / Instamart Micro-Hub Routing",
            "Meta Dynamic Creative Testing",
            "Living Probiotics Live Counter",
            "6-Bottle Mix & Match Builder"
      ],
      "deliverablesDeployed": [
            "Sub-4°C Cold-Chain Freshness Tracking",
            "Custom 6-Bottle Raw Probiotic Pack Builder",
            "Gut Health Microbiome Educational Funnel",
            "Zero Sugar Comparative Clinical Breakdown"
      ],
      "verifiedImpact": "62,000+ Bottles Shipped Monthly · 48% Dark Store Re-Order Rate"
},

    categoryBadge: "10 Billion Live CFUs · Unpasteurized Raw Probiotics",
    domainUrl: "pureglowkombucha.com",
    theme: {
      primaryBg: "bg-[#140b1a]",
      accentColor: "text-purple-400",
      accentBorder: "border-purple-500/30",
      pillBg: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      heroGlow: "from-purple-900/30 via-fuchsia-800/10 to-transparent",
    },
    hero: {
      eyebrow: "LIVING PROBIOTIC EFFERVESCENCE",
      title: "10 Billion Living Probiotics. Fermented for 21 Days.",
      subtitle:
        "Naturally sparkling raw tonic fermented with first-flush Darjeeling green tea, raw wild fruits, and adaptogens. Chilled to 4°C and delivered in under 15 minutes.",
      primaryCta: "Order Cold-Chain Six-Pack",
      secondaryCta: "Explore Probiotic Strains",
      stats: [
        { label: "Living Probiotic CFUs", val: "10 Billion/Bottle" },
        { label: "Slow Fermentation Time", val: "21 Days" },
        { label: "Cold-Chain Arrival Temp", val: "4°C Guaranteed" },
        { label: "Natural Organic Acids", val: "Acetic & Gluconic" },
      ],
    },
    interactiveType: "bundle_snacks",
    interactiveData: {
      title: "Build Your 6-Bottle Raw Probiotic Pack",
      flavours: [
        "Wild Himalayan Jamun & Holy Basil",
        "Cold-Pressed Ginger Lemonade Fizz",
        "Kashmiri Hibiscus & Damascus Rose",
        "Alphonso Mango & Passionfruit",
        "Crisp Green Apple & Spirulina",
        "Classic Original Raw Darjeeling",
      ],
    },
    products: [
      {
        id: "pg-01",
        name: "Wild Himalayan Jamun & Holy Basil Kombucha (330ml)",
        category: "Berry Blends",
        price: 160,
        badge: "Best Seller",
        rating: 4.9,
        reviewCount: 2840,
        description:
          "Tart wild mountain jamun berries infused with fresh holy basil leaves. Rich in anthocyanins and blood-sugar balancing polyphenols.",
        specs: ["10 Billion Live CFUs", "Zero Added Sugar", "Naturally Carbonated"],
        image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "pg-02",
        name: "Ginger Lemonade Cold-Pressed Raw Fizz (330ml)",
        category: "Citrus Cleansers",
        price: 160,
        badge: "Immunity Boost",
        rating: 4.9,
        reviewCount: 3120,
        description:
          "Spicy cold-pressed Kerala ginger root paired with sunny Meyer lemons. The ultimate gut reset drink after heavy meals.",
        specs: ["Real Cold-Pressed Ginger", "Raw Unpasteurized Tonic", "Cures Bloating"],
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "pg-03",
        name: "Kashmiri Hibiscus & Damascus Rose Sparkle (330ml)",
        category: "Floral Tonics",
        price: 160,
        badge: "Refreshing Floral",
        rating: 4.8,
        reviewCount: 1980,
        description:
          "Sun-dried crimson hibiscus calyces and fragrant Kashmiri rose water brewed into a sparkling ruby digestive elixir.",
        specs: ["Rich in Vitamin C", "Floral Effervescence", "Aids Digestion"],
        image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "pg-04",
        name: "Probiotic Mixed Flight Pack (6 x 330ml Bottles)",
        category: "Six-Packs",
        price: 890,
        originalPrice: 960,
        badge: "Best Value",
        rating: 5.0,
        reviewCount: 4100,
        description:
          "Includes 2 Jamun Basil, 2 Ginger Lemonade, and 2 Hibiscus Rose bottles delivered chilled in an insulated cold-chain carrier.",
        specs: ["6 Glass Bottles", "Delivered Chilled at 4°C", "Includes Free Glass Straw"],
        image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      },
    ],
    trustBadges: [
      { title: "Always Raw & Unpasteurized", desc: "Never heat treated; probiotics arrive 100% active and living" },
      { title: "Cold-Chain Dark Store Hubs", desc: "Maintained continuously below 4°C to preserve microflora" },
      { title: "Real Organic Fruit Purees", desc: "Zero artificial flavoring extracts or artificial sweeteners" },
      { title: "Sub-15 Min Express Delivery", desc: "Delivered icy cold ready to pop and drink" },
    ],
    customerReviews: [
      {
        author: "Kritika Chawla",
        location: "Indiranagar, Bengaluru",
        rating: 5,
        title: "Completely cured my afternoon bloating",
        comment:
          "I have one bottle of Ginger Lemonade every day with lunch. It tastes like high-end sparkling cider and has done wonders for my digestion.",
        verified: true,
      },
      {
        author: "Arjun Nambiar",
        location: "Koramangala, Bengaluru",
        rating: 5,
        title: "Arrived chilled in 12 minutes",
        comment:
          "Ordered via the instant delivery button while hosting friends. Bottles arrived with condensation on the glass, perfectly fizzy.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "Why does kombucha need to stay refrigerated?",
        a: "Because it contains living probiotic cultures! Keeping it chilled below 4°C pauses fermentation, preventing over-carbonation or souring.",
      },
      {
        q: "Does it contain alcohol or caffeine?",
        a: "Trace natural alcohol from fermentation is under 0.5% (strictly non-alcoholic). Caffeine content is minimal (about 1/3 of green tea).",
      },
    ],
  },

  // 13. Darbar Fine Watches (Full-Stack Web Development)
  "darbar-fine-watches": {
    slug: "darbar-fine-watches",
    brandName: "Darbar Mechanical Horology",
    brandTagline: "Bespoke Royal Rajput Mechanical Timepieces & Swiss Calibres",
    serviceCriteria: {
      "serviceId": "web-development",
      "serviceTitle": "Web Development & Packaging Design",
      "primaryObjective": "Bespoke 3D Swiss Automatic Royal Timepiece Customizer",
      "targetKpi": "Sub-600ms Headless Next.js Load Speed · ₹48,000 Average Order Value",
      "techArchitecture": [
            "Next.js 16 Turbopack",
            "Three.js / Canvas 3D Dial Renderer",
            "COSC Certification Registry API",
            "White-Glove Insured Delivery Gateway"
      ],
      "deliverablesDeployed": [
            "Interactive Bespoke Watch Customizer (Dials, Straps, Engravings)",
            "316L Surgical Steel & Ceramic Bezel Selector",
            "Handcrafted Wooden Box Packaging Specs",
            "5-Year Global Warranty Tracking Portal"
      ],
      "verifiedImpact": "2,800+ Limited Edition Timepieces Sold Out · 0% Checkout Dropoff"
},

    categoryBadge: "Hand-Assembled in Switzerland · Rajput Royal Heritage",
    domainUrl: "darbarwatches.com",
    theme: {
      primaryBg: "bg-[#090b10]",
      accentColor: "text-amber-200",
      accentBorder: "border-amber-500/30",
      pillBg: "bg-amber-500/10 text-amber-200 border-amber-500/20",
      heroGlow: "from-amber-900/30 via-slate-800/10 to-transparent",
    },
    hero: {
      eyebrow: "HAUTE HORLOGERIE · LIMITED TO 100 PIECES",
      title: "Rajput Royal Heritage Encased in Swiss Automatic Calibres.",
      subtitle:
        "Hand-engraved casebacks with Jodhpur fort motifs, sunburst enamel dials, double-domed sapphire crystals, and 48-hour mechanical power reserve.",
      primaryCta: "Configure Your Timepiece",
      secondaryCta: "Request Private Concierge Viewing",
      stats: [
        { label: "Annual Production", val: "Only 100 Pieces" },
        { label: "Mechanical Power Reserve", val: "48 Hours" },
        { label: "Water Resistance", val: "100 Meters / 10 ATM" },
        { label: "Swiss Calibre Accuracy", val: "COSC Certified" },
      ],
    },
    interactiveType: "watch_customizer",
    interactiveData: {
      title: "Interactive Bespoke Timepiece Customizer",
      finishes: [
        { name: "Obsidian Sunburst Black", case: "Brushed Grade 5 Titanium", priceMod: 0 },
        { name: "Royal Jodhpur Enamel Blue", case: "18K Hand-Finished Rose Gold", priceMod: 45000 },
        { name: "Ivory Rajput Dial", case: "Matte Black DLC Hardened", priceMod: 20000 },
      ],
    },
    products: [
      {
        id: "dw-01",
        name: "The Mewar Chronometer 41mm (Automatic)",
        category: "Flagship Automatic",
        price: 185000,
        badge: "Flagship Collection",
        rating: 5.0,
        reviewCount: 42,
        description:
          "Swiss automatic movement Calibre DB-01, 28,800 vph beat rate, custom rotor engraved with Mewar sun emblem, double-domed anti-reflective sapphire crystal.",
        specs: ["Swiss DB-01 Automatic Calibre", "Grade 5 Brushed Titanium", "Hand-Stitched Horween Leather"],
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "dw-02",
        name: "The Jaipur Tourbillon Limited Edition",
        category: "Grand Complications",
        price: 420000,
        badge: "Only 25 Pieces",
        rating: 5.0,
        reviewCount: 16,
        description:
          "Flying tourbillon escapement rotating once every 60 seconds. Hand-beveled bridge plates, blued titanium screws, and exhibition sapphire caseback.",
        specs: ["Manual Wind Flying Tourbillon", "72-Hour Power Reserve Indicator", "18K Rose Gold Bezel"],
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "dw-03",
        name: "The Amber Field Mechanical 38mm",
        category: "Heritage Field Watch",
        price: 95000,
        badge: "Everyday Classic",
        rating: 4.9,
        reviewCount: 68,
        description:
          "Ultra-rugged matte blasted 316L surgical steel case, Swiss Super-LumiNova vintage radium lume numerals, and screw-down crown.",
        specs: ["Hand-Winding Mechanical", "100m Water Resistant", "Includes Olive NATO & Leather Straps"],
        image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "dw-04",
        name: "Hand-Stitched Shell Cordovan Leather Strap Set",
        category: "Accessories",
        price: 12500,
        badge: "Horology Accessory",
        rating: 5.0,
        reviewCount: 94,
        description:
          "Crafted from genuine Japanese Shinki Hikaku shell cordovan leather with quick-release spring bars and engraved Darbar deployant buckle.",
        specs: ["Shinki Shell Cordovan", "Deployant Butterfly Clasp", "20mm & 22mm Lug Widths"],
        image: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80",
      },
    ],
    trustBadges: [
      { title: "5-Year Global Warranty", desc: "Comprehensive movement servicing & accuracy calibration" },
      { title: "COSC Accuracy Certified", desc: "Tested across 5 positions and 3 temperatures (-4 to +6s/day)" },
      { title: "White-Glove Courier Delivery", desc: "Fully insured door-to-door hand delivery with verification pin" },
      { title: "Handcrafted Wooden Box", desc: "Presented in hand-carved Sheesham wood presentation case" },
    ],
    customerReviews: [
      {
        author: "Maharaja Vikramaditya Singh",
        location: "Jaipur",
        rating: 5,
        title: "A horological triumph of Indian heritage",
        comment:
          "The Mewar Chronometer sits on the wrist with the prestige of Patek or Vacheron, yet speaks of our own Rajput chivalric roots. The finishing on the movement bridge is immaculate.",
        verified: true,
      },
      {
        author: "Siddhartha Lal",
        location: "London / Delhi",
        rating: 5,
        title: "Sub-second dial accuracy",
        comment:
          "Been timing it against the atomic clock for 30 days. Gaining less than +2 seconds a day. Extraordinary value for genuine mechanical haute horlogerie.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "Where are Darbar timepieces manufactured and assembled?",
        a: "Movement engineering, assembly, and chronometer testing take place in Le Locle, Switzerland, with case finishing and bespoke engravings crafted in Rajasthan.",
      },
      {
        q: "What is the service interval for the automatic movement?",
        a: "We recommend an overhaul service every 5 years. Our private concierge collects the timepiece directly from your residence.",
      },
    ],
  },

  // 14. KisaanDirect Agri Platform (Full-Stack Web Development)
  "kisaandirect-agri": {
    slug: "kisaandirect-agri",
    brandName: "KisaanDirect Agri Platform",
    brandTagline: "Vernacular Direct-From-Farm Wholesale Mandi Procurement",
    serviceCriteria: {
      "serviceId": "lead-generation",
      "serviceTitle": "Lead Generation & Platform Engineering",
      "primaryObjective": "Farm-to-Retail Agri Produce Escrow Trading Network",
      "targetKpi": "₹180 CAC Per Registered Farmer · 100% Escrow Dispute-Free Clearance",
      "techArchitecture": [
            "Live APMC Mandi Price Ticker API",
            "NABL Moisture & Quality Assaying System",
            "Escrow Smart Settlement Gateway",
            "GPS Freight Fleet Tracking"
      ],
      "deliverablesDeployed": [
            "Real-Time 4-State APMC Mandi Rate Board",
            "Bulk Escrow Payment Protection Calculator",
            "Direct Farmer eNAM Legal Invoicing Pipeline",
            "Truck-Load Weight & Moisture Verification"
      ],
      "verifiedImpact": "₹34Cr Agri Commodities Cleared Without Middlemen Cut · 14,000+ Farmers"
},

    categoryBadge: "12,000+ Verified Farmer Collectives · 0% Middleman Cut",
    domainUrl: "kisaandirect.org",
    theme: {
      primaryBg: "bg-[#09140c]",
      accentColor: "text-emerald-400",
      accentBorder: "border-emerald-500/30",
      pillBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      heroGlow: "from-emerald-900/30 via-green-800/10 to-transparent",
    },
    hero: {
      eyebrow: "B2B AGRI-COMMODITIES DIRECT TRADE",
      title: "Direct from Farmers to Retailers. 0% Middlemen Cut.",
      subtitle:
        "Connecting 12,000+ verified farmer producer organizations (FPOs) across Maharashtra, Punjab, and MP with direct wholesale buyers via transparent digital mandi auctions.",
      primaryCta: "View Live Mandi Prices",
      secondaryCta: "Place Wholesale Escrow Order",
      stats: [
        { label: "Registered Farmer FPOs", val: "12,400+" },
        { label: "Commodity Tons Traded", val: "480,000 T" },
        { label: "Farmer Income Lift", val: "+34.5%" },
        { label: "Mandi Price Accuracy", val: "Real-Time 15-Min" },
      ],
    },
    interactiveType: "mandi_rates",
    interactiveData: {
      title: "Live APMC Mandi Rate Ticker & Bulk Escrow Calculator",
      mandis: [
        { crop: "Nashik Red Onion (Grade-A)", price: "₹2,100 / Quintal", trend: "+3.2% Today" },
        { crop: "Ratnagiri Alphonso Mango", price: "₹3,800 / Crate (4 Dozen)", trend: "Peak Harvest" },
        { crop: "Punjab Sharbati Wheat", price: "₹2,450 / Quintal", trend: "Stable" },
        { crop: "Yellow Mustard Seed", price: "₹5,600 / Quintal", trend: "+1.8%" },
      ],
    },
    products: [
      {
        id: "kd-01",
        name: "Grade-A Nashik Red Onions (10 Quintal Bulk Lot)",
        category: "Fresh Vegetables",
        price: 21000,
        badge: "Direct from FPO",
        rating: 4.9,
        reviewCount: 1840,
        description:
          "50mm+ uniform size, cured under shade for maximum storage life. Dispatched directly from Lasalgaon farmer cooperatives in 50kg ventilated mesh bags.",
        specs: ["10 Quintals (1,000kg)", "Moisture Controlled 12%", "Assayed for Size & Purity"],
        image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "kd-02",
        name: "Organic Ratnagiri Alphonso Mangoes (10 Wooden Crates)",
        category: "Seasonal Fruit",
        price: 38000,
        badge: "GI Tag Certified",
        rating: 5.0,
        reviewCount: 920,
        description:
          "GI-tagged Alphonso mangoes from Devgad and Ratnagiri coastal orchards. Naturally grass-ripened without calcium carbide chemical treatments.",
        specs: ["40 Dozen Total (480 Mangoes)", "Zero Calcium Carbide", "GI-Tagged Certificate Included"],
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "kd-03",
        name: "Cold-Pressed Mustard Oil Raw Kachi Ghani (200L Drum)",
        category: "Cold-Pressed Oils",
        price: 28500,
        badge: "Pure Cold Expeller",
        rating: 4.9,
        reviewCount: 450,
        description:
          "Extracted from high-pungency black Rajasthan mustard seeds in traditional wooden kolhu expellers below 40°C. 0% mineral oil blending.",
        specs: ["200 Liter Food-Grade Barrel", "Pungency Index > 0.32", "Agmark Grade-1 Certified"],
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "kd-04",
        name: "Punjab Sharbati Wheat Premium Grain (50 Bags x 50kg)",
        category: "Grains & Cereals",
        price: 62500,
        badge: "Golden Amber Grain",
        rating: 4.8,
        reviewCount: 780,
        description:
          "Heavy, golden, lustrous grain with 14% natural protein content. Perfect for rotis that stay soft for over 18 hours.",
        specs: ["2,500kg Total Lot", "Double Sortex Cleaned", "Moisture Below 10%"],
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      },
    ],
    trustBadges: [
      { title: "Escrow Payment Protection", desc: "Farmer paid only after buyer verifies quality at destination dock" },
      { title: "NABL Certified Assay Labs", desc: "Every lot tested for moisture, foreign matter, and pesticide residues" },
      { title: "Pan-India Dedicated Logistics", desc: "GPS-tracked fleet of 10-ton and 20-ton freight trucks" },
      { title: "Zero Mandi Tax Leakage", desc: "Direct legal e-invoicing complying with national eNAM frameworks" },
    ],
    customerReviews: [
      {
        author: "Rameshwar Patel",
        location: "President, Lasalgaon Onion FPO",
        rating: 5,
        title: "Our farmers received payments in 48 hours",
        comment:
          "Previously, traditional commission agents withheld payments for 60 to 90 days. With KisaanDirect, the money hits our bank accounts within 48 hours of shipment arrival.",
        verified: true,
      },
      {
        author: "Gaurav Bansal",
        location: "Director, Bansal Supermarkets Delhi",
        rating: 5,
        title: "Quality assaying is 100% accurate",
        comment:
          "We buy 40 tons of onions and wheat every month. The Sortex cleaning and assay certificates ensure zero wastage at our retail distribution hubs.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "How does the escrow payment system work?",
        a: "The buyer deposits the order value into a dedicated digital escrow account. Once goods are inspected and accepted at the unloading dock, funds are released to the farmer.",
      },
      {
        q: "What happens if a lot fails quality assay at delivery?",
        a: "Our logistics hubs provide immediate replacement or instant escrow refund based on the NABL digital inspection report.",
      },
    ],
  },

  // 15. Royal Rajwada Spices (Packaging & Label Design)
  "royal-rajwada-spices": {
    slug: "royal-rajwada-spices",
    brandName: "Royal Rajwada Spices",
    brandTagline: "Single-Origin Heirloom Spices in Collectible Embossed Tin Architecture",
    serviceCriteria: {
      "serviceId": "packaging-design",
      "serviceTitle": "Packaging & Label Designing Services",
      "primaryObjective": "Royal Octagonal UV-Proof Luxury Spice Tins & Export Identity",
      "targetKpi": "Zero Essential Terpene Evaporation · 3.8x Export Price Realization",
      "techArchitecture": [
            "3D Photorealistic Canister Renders",
            "FSSAI & US FDA Export Compliance Verification",
            "Terpene Chromatography Sensor Data",
            "Heritage Single-Estate Traceability"
      ],
      "deliverablesDeployed": [
            "Octagonal Brass-Accented Tin Dielines & Structural Design",
            "100% UV-Blocking Food-Grade Hermetic Seals",
            "Tellicherry Harvest Block GPS Origin Coordinates",
            "Luxury Reusable Kitchen Keepsake Architecture"
      ],
      "verifiedImpact": "Featured in 12 Michelin Star Kitchens · 98,000+ Collector Tins Sold"
},

    categoryBadge: "Hand-Harvested from Century-Old Plantations · 24K Gold Foil Tins",
    domainUrl: "royalrajwadaspices.com",
    theme: {
      primaryBg: "bg-[#0b101e]",
      accentColor: "text-amber-300",
      accentBorder: "border-amber-500/30",
      pillBg: "bg-amber-500/10 text-amber-200 border-amber-500/20",
      heroGlow: "from-blue-900/30 via-indigo-900/10 to-transparent",
    },
    hero: {
      eyebrow: "HERITAGE SPICE CANISTERS · WAYANAD & PAMPORE",
      title: "Hand-Harvested from Century Plantations. Sealed in Royal Tins.",
      subtitle:
        "Single-origin heirloom tellicherry peppercorns, Grade-A saffron, and royal garam masala packed in collectible octagonal tins with gold hot-stamped foil to protect volatile terpenes.",
      primaryCta: "Shop Collectible Tin Range",
      secondaryCta: "Explore Plantation Origins",
      stats: [
        { label: "Volatile Terpenes Preserved", val: "99.4%" },
        { label: "Piperine Concentration", val: "7.2% Extra Bold" },
        { label: "Saffron Crocin Grade", val: "Grade-1 (18.5%)" },
        { label: "Airtight Seal Guarantee", val: "24 Months" },
      ],
    },
    interactiveType: "herb_explorer",
    interactiveData: {
      title: "Essential Terpene Analysis & Origin Coordinates",
      herbs: [
        {
          name: "Tellicherry Extra Bold Black Peppercorns",
          part: "Whole Sun-Ripened Berries",
          decoctionTime: "Wayanad Hills (3,500 ft)",
          benefit: "Bold 4.25mm berries with maximum volatile piperine and citrus aroma.",
          potency: "7.2% Piperine",
        },
        {
          name: "Pampore Mongra Kashmiri Saffron",
          part: "Pure Red Stigmas",
          decoctionTime: "Pampore Valley, Kashmir",
          benefit: "Deep crimson threads with unmatched natural crocin aroma and coloring power.",
          potency: "Grade-1 (18.5% Crocin)",
        },
        {
          name: "Shahi 18-Spice Garam Masala",
          part: "Dry-Roasted Whole Pods",
          decoctionTime: "Royal Rajput Palace Recipe",
          benefit: "Stone-ground with star anise, green cardamom, mace, and wild clove.",
          potency: "Zero Starches or Added Salt",
        },
        {
          name: "Guntur Sannam Whole Sun-Dried Chilies",
          part: "Natural Sun Dried",
          decoctionTime: "Andhra River Basin",
          benefit: "High heat units (35,000 SHU) with natural crimson color value.",
          potency: "35,000 Scoville SHU",
        },
      ],
    },
    products: [
      {
        id: "rr-01",
        name: "Tellicherry Extra Bold Peppercorns Heritage Tin (200g)",
        category: "Whole Peppercorns",
        price: 550,
        badge: "Collector's Tin",
        rating: 5.0,
        reviewCount: 1680,
        description:
          "Sifted to ensure only berries >4.25mm diameter. Sealed in an octagonal cobalt blue tin with airtight brass-plated double lid.",
        specs: ["4.25mm+ Extra Bold Size", "Double-Lid Airtight Tin", "Harvest Elevation 3,500 ft"],
        image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "rr-02",
        name: "Pampore Grade-A Mongra Kashmiri Saffron (5g Sealed Tin)",
        category: "Pure Saffron",
        price: 2400,
        badge: "Pure Saffron",
        rating: 5.0,
        reviewCount: 940,
        description:
          "100% pure thick red stigmas without yellow style tail threads. Yields rich saffron yellow hue and intoxicating honey-floral aroma.",
        specs: ["Zero Tail Threads", "Lab Certified Grade-A", "Gold Embossed Keepsake Tin"],
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "rr-03",
        name: "Shahi Maharaja Garam Masala 18-Spice Blend Tin (250g)",
        category: "Heritage Blends",
        price: 480,
        badge: "Royal Recipe",
        rating: 4.9,
        reviewCount: 2410,
        description:
          "Roasted over low flame and pounded in stone mortars. Formulated according to the royal kitchens of Mewar with green cardamom, mace, and nutmeg.",
        specs: ["18 Hand-Picked Spices", "Stone Ground Cold", "No Cheap Coriander Fillers"],
        image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "rr-04",
        name: "Guntur Sannam Whole Sun-Dried Chilies Tin (200g)",
        category: "Single-Origin Chili",
        price: 340,
        badge: "Fiery Aroma",
        rating: 4.8,
        reviewCount: 1120,
        description:
          "Naturally sundried on woven palm mats in Andhra Pradesh. Bright red skin, intoxicating smoke aroma, and fiery 35,000 Scoville heat.",
        specs: ["35,000 Scoville Units", "Stemless Whole Pods", "UV-Shielded Canister"],
        image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80",
      },
    ],
    trustBadges: [
      { title: "Octagonal Tin Architecture", desc: "Blocks 100% of UV rays to prevent essential oil evaporation" },
      { title: "Single-Estate Sourced", desc: "Complete traceability to generational plantation harvest blocks" },
      { title: "Zero Radiation Sterilization", desc: "Steam purified without altering organic terpenes or flavor" },
      { title: "Reusable Brass-Accented Tins", desc: "Designed to be refilled and displayed on luxury kitchen shelves" },
    ],
    customerReviews: [
      {
        author: "Chef Sanjeev Kapoor",
        location: "Mumbai",
        rating: 5,
        title: "The tellicherry peppercorns are phenomenal",
        comment:
          "Cracking these peppercorns over a steak or soup releases a complex citrus-wood aroma that standard supermarket pepper lacks completely. The packaging is art.",
        verified: true,
      },
      {
        author: "Nalini Krishnan",
        location: "Chennai",
        rating: 5,
        title: "The tins look gorgeous in our kitchen",
        comment:
          "The double lid creates a tight suction seal that keeps the spices smelling like they were harvested yesterday. A spectacular gifting product.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "What makes these tins superior to glass jars?",
        a: "Light is the number one enemy of spices, breaking down essential oils within weeks. Our opaque tinplate canisters block 100% of light and air.",
      },
      {
        q: "Can I purchase refill packs for the tins?",
        a: "Yes! We offer 100% biodegradable compostable refill pouches at 20% savings so you can cherish your collector tins forever.",
      },
    ],
  },

  // 16. Kamakesh Ayurvedic Scalp Oil (Packaging & Label Design)
  "kamakesh-hair-elixir": {
    slug: "kamakesh-hair-elixir",
    brandName: "Kamakesh Ayurvedic Scalp Oil",
    brandTagline: "21-Herb Classical Scalp Elixir in Pharmaceutical Amber Glass Architecture",
    serviceCriteria: {
      "serviceId": "packaging-design",
      "serviceTitle": "Packaging Design & Performance Marketing",
      "primaryObjective": "72-Hour Kshirapak Botanical Formula & Luxury Glass Architecture",
      "targetKpi": "4.9x Meta Ad ROAS · 68% Telogen Hair Shedding Reduction",
      "techArchitecture": [
            "Custom Frosted Amber Glass Dielines",
            "Ayush Classical Kshirapak Vidhi Certification",
            "Follicle Density Clinical Trial Viewer",
            "Klaviyo 60-Day Re-Order Sequence"
      ],
      "deliverablesDeployed": [
            "Heavyweight Embossed Amber Dropper Bottle Design",
            "21-Herb Botanical Extraction Breakdown Matrix",
            "Clinical Dermatologist Clinical Trial Display",
            "60-Day Empty Bottle Money-Back Funnel"
      ],
      "verifiedImpact": "74,000+ Bottles Scaled at 4.9x ROAS · 88% Reported Visible Follicle Density"
},

    categoryBadge: "Classical Kshirapak Vidhi · 72-Hour Slow Decoction",
    domainUrl: "kamakesh.com",
    theme: {
      primaryBg: "bg-[#111409]",
      accentColor: "text-amber-300",
      accentBorder: "border-amber-500/30",
      pillBg: "bg-amber-500/10 text-amber-200 border-amber-500/20",
      heroGlow: "from-yellow-900/30 via-emerald-950/10 to-transparent",
    },
    hero: {
      eyebrow: "ANCIENT KSHIRAPAK SCALP RITUAL",
      title: "Cooked for 72 Hours in Pure Goat Milk. Revitalize Dormant Follicles.",
      subtitle:
        "Classical Ayush-approved Kshirapak vidhi using wild Bhringraj, Indian gooseberry, and Gunja berries slow-cooked in pure sesame oil. Encased in UV400 amber glass with debossed brass dropper.",
      primaryCta: "Shop Scalp Elixir Ritual",
      secondaryCta: "View 90-Day Clinical Trial",
      stats: [
        { label: "Active Classical Herbs", val: "21 Rare Botanicals" },
        { label: "Slow Decoction Time", val: "72 Hours on Low Flame" },
        { label: "Reduction in Hair Fall", val: "Up to 82% in 45 Days" },
        { label: "UV400 Pharmaceutical Glass", val: "100% Light Shielded" },
      ],
    },
    interactiveType: "herb_explorer",
    interactiveData: {
      title: "21-Herb Botanical Extraction Breakdown & Follicle Density Study",
      herbs: [
        {
          name: "Fresh Bhringraj (Eclipta Alba)",
          part: "Leaves & Stems",
          decoctionTime: "Hand-Crushed Fresh Juice",
          benefit: "Lengthens anagen (growth) hair cycle and reactivates dormant hair roots.",
          potency: "98% Bioactive Wedelolactone",
        },
        {
          name: "Wild Indian Gooseberry (Amla)",
          part: "Fresh Wild Fruit",
          decoctionTime: "72h Goat Milk Simmer",
          benefit: "Concentrated ascorbic acid and tannins prevent premature graying.",
          potency: "Natural Vitamin C & Polyphenols",
        },
        {
          name: "Gunja Seeds (Abrus Precatorius)",
          part: "Purified Shodhit Seeds",
          decoctionTime: "Classical Ayush Detoxification",
          benefit: "Stimulates deep microcirculation around weakened hair roots.",
          potency: "Follicle Activator",
        },
        {
          name: "Jatamansi Root",
          part: "Himalayan Rhizome",
          decoctionTime: "Sesame Oil Extraction",
          benefit: "Soothes scalp inflammation, relieves mental stress, and promotes deep sleep.",
          potency: "Natural Relaxant",
        },
      ],
    },
    products: [
      {
        id: "km-01",
        name: "Kamakesh Intensive Root Revival Scalp Elixir (100ml)",
        category: "Scalp Elixirs",
        price: 1650,
        originalPrice: 2100,
        badge: "Flagship Elixir",
        rating: 5.0,
        reviewCount: 3820,
        description:
          "The authentic 72-hour cooked Kshirapak hair oil. Scented naturally with vetiver roots and damask rose. Packaged in a heavy-weight amber glass dropper bottle with debossed brass collar.",
        specs: ["21 Fresh Herbs & Goat Milk", "Debossed Brass Precision Dropper", "UV400 Light-Blocking Glass"],
        image: "https://images.unsplash.com/photo-1608248597359-54d762e8ea02?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "km-02",
        name: "Keshvardhak Micro-Exfoliating Scalp Scrub (150g)",
        category: "Scalp Prep",
        price: 890,
        originalPrice: 1100,
        badge: "Dandruff Cleanser",
        rating: 4.9,
        reviewCount: 1640,
        description:
          "Formulated with Himalayan pink salt crystals, crushed neem leaves, and tea tree oil to gently clear sebum build-up and clarify hair follicles.",
        specs: ["Neem & Tea Tree Infused", "Fine Mineral Salt Crystals", "Clears Scalp Buildup"],
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "km-03",
        name: "Hand-Carved Neem Wood Wide-Tooth Scalp Comb",
        category: "Tools & Accessories",
        price: 450,
        badge: "Artisanal Wood",
        rating: 5.0,
        reviewCount: 2900,
        description:
          "Single-piece seasoned neem wood comb that prevents static electricity, gently stimulates scalp blood flow, and detangles wet hair without breakage.",
        specs: ["100% Solid Herbal Neem Wood", "Rounded Anti-Scratch Teeth", "Zero Plastic Static"],
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "km-04",
        name: "The Complete 90-Day Hair Density Revival Ceremony",
        category: "Complete Kits",
        price: 2750,
        originalPrice: 3400,
        badge: "Revival Ceremony",
        rating: 5.0,
        reviewCount: 4680,
        description:
          "Includes 2 bottles of Scalp Elixir (100ml each), 1 Scalp Scrub (150g), and 1 Hand-Carved Neem Comb in an unboxing gift chest.",
        specs: ["2 x 100ml Elixirs", "1 x Scalp Scrub + Neem Comb", "Includes Scalp Tracking Chart"],
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      },
    ],
    trustBadges: [
      { title: "Ministry of Ayush Approved", desc: "Authentic classical Kshirapak vidhi licensed formulation" },
      { title: "Zero Mineral Oil or Liquid Paraffin", desc: "100% pure cold-pressed black sesame oil & goat milk base" },
      { title: "Clinical Dermatologist Tested", desc: "Proven to reduce telogen shedding and increase follicle density" },
      { title: "60-Day Empty Bottle Guarantee", desc: "Full refund if not completely satisfied with hair thickness results" },
    ],
    customerReviews: [
      {
        author: "Aishwarya Rai Raman",
        location: "Kochi, Kerala",
        rating: 5,
        title: "Hair fall stopped within 3 weeks of use",
        comment:
          "After postpartum shedding, my hair density was terrifyingly thin. Using Kamakesh 3 nights a week with the neem comb has filled in my temple hairline with healthy baby hairs.",
        verified: true,
      },
      {
        author: "Dr. Mihir Kothari",
        location: "Ahmedabad",
        rating: 5,
        title: "The bottle packaging is pure luxury",
        comment:
          "The amber dropper bottle feels like a piece of bespoke perfumery on my bathroom counter. The earthy vetiver scent is calming before bedtime.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "What is the Kshirapak method and why is it superior?",
        a: "Kshirapak is an ancient Ayurvedic cooking method where medicinal herbs are slow-boiled in cow or goat milk and sesame oil until all water evaporates, binding lipid-soluble alkaloids into the oil for deeper transdermal absorption.",
      },
      {
        q: "How often should I apply the scalp elixir?",
        a: "Apply 2 to 3 full droppers directly to scalp roots 3 nights per week. Massage gently for 5 minutes and leave overnight for maximum nourishment.",
      },
    ],
  },
};

