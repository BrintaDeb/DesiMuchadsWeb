export type ServiceCategoryId =
  | "graphics-designing"
  | "seo-management"
  | "social-media-management"
  | "website-development"
  | "branding";

export interface PricingTier {
  id: string;
  tierCode: string;
  tierLabel: string;
  name: string;
  priceInr: number;
  billingUnit: "/ mo" | "/ project";
  scopeLevel: 1 | 2 | 3 | 4;
  outputBadge: string;
  turnaround: string;
  summary: string;
  deliverables: string[];
  excludedNote?: string;
  isPopular?: boolean;
}

export interface ServicePricingCategory {
  id: ServiceCategoryId;
  indexLabel: string;
  title: string;
  shortTitle: string;
  billingType: "monthly" | "one-time";
  startingPriceInr: number;
  tagline: string;
  scopePrinciple: string;
  tiers: PricingTier[];
}

export interface CustomBundleModule {
  id: ServiceCategoryId;
  name: string;
  billingNote: string;
  basePriceInr: number;
  deliverableSummary: string;
  impactMetric: string;
}

export const SERVICE_PRICING_CATEGORIES: ServicePricingCategory[] = [
  {
    id: "graphics-designing",
    indexLabel: "01",
    title: "Graphics Designing",
    shortTitle: "Graphics",
    billingType: "monthly",
    startingPriceInr: 8999,
    tagline:
      "Clean social creatives, carousels, ad banners & print layouts scaled by monthly asset volume.",
    scopePrinciple:
      "Lower tiers cover static essentials & standard turnarounds; higher tiers unlock motion graphics, print files & source rights.",
    tiers: [
      {
        id: "gfx-t1",
        tierCode: "TIER 01",
        tierLabel: "LITE",
        name: "Basic Canvas",
        priceInr: 8999,
        billingUnit: "/ mo",
        scopeLevel: 1,
        outputBadge: "6 Assets / mo",
        turnaround: "72h Delivery",
        summary:
          "Lightweight monthly creative starter for small local businesses needing essential visual presence.",
        deliverables: [
          "6 static social posts or flyers / month",
          "Single aspect ratio export (PNG / JPG)",
          "Brand color & clean typography alignment",
          "1 revision round per creative",
          "WhatsApp delivery within 72 hours",
        ],
        excludedNote: "Static only · No source files, carousels or motion",
      },
      {
        id: "gfx-t2",
        tierCode: "TIER 02",
        tierLabel: "CORE",
        name: "Creator Kit",
        priceInr: 12999,
        billingUnit: "/ mo",
        scopeLevel: 2,
        outputBadge: "14 Assets / mo",
        turnaround: "48h Delivery",
        summary:
          "Balanced monthly pack for active brands posting across feeds, stories & e-commerce listings.",
        deliverables: [
          "12 static posts + 2 carousel sets (up to 5 slides)",
          "Dual resizing (Feed + Story / Web banner)",
          "Basic product photo cleanup & cutouts",
          "2 revision rounds per creative",
          "48-hour standard turnaround",
        ],
        excludedNote: "No editable AI/PSD files or animated GIFs",
      },
      {
        id: "gfx-t3",
        tierCode: "TIER 03",
        tierLabel: "POPULAR",
        name: "Studio Growth",
        priceInr: 19999,
        billingUnit: "/ mo",
        scopeLevel: 3,
        outputBadge: "26 Assets / mo",
        turnaround: "24–36h Priority",
        summary:
          "High-conversion ad banners, carousels, thumbnails & motion graphics built for scaling brands.",
        deliverables: [
          "22 custom static/carousel designs + 4 motion/GIFs",
          "Paid ad creatives, festive kits & YT thumbnails",
          "Print-ready CMYK brochures & label layouts",
          "Editable source files (Figma / PSD) included",
          "Unlimited tweaks · 24–36h priority queue",
        ],
        isPopular: true,
      },
      {
        id: "gfx-t4",
        tierCode: "TIER 04",
        tierLabel: "POD",
        name: "Creative Desk",
        priceInr: 29999,
        billingUnit: "/ mo",
        scopeLevel: 4,
        outputBadge: "40+ Assets / mo",
        turnaround: "<12h Express",
        summary:
          "Dedicated visual design bandwidth for high-velocity D2C stores, agencies & multi-SKU catalogs.",
        deliverables: [
          "40+ static, carousel, ad & packaging layouts / mo",
          "Bespoke vector illustrations & custom icon sets",
          "A/B creative test variants for Meta & Google ads",
          "Full Figma / AI / PSD library ownership",
          "Same-day (<12h) express turnaround + Art Director QA",
        ],
      },
    ],
  },
  {
    id: "seo-management",
    indexLabel: "02",
    title: "SEO Management",
    shortTitle: "SEO",
    billingType: "monthly",
    startingPriceInr: 9999,
    tagline:
      "Search visibility, on-page structure, technical speed & authority links built around compounding traffic.",
    scopePrinciple:
      "Entry tier targets local maps & foundational tags; upper tiers add blogs, schema engineering & high-DA backlinks.",
    tiers: [
      {
        id: "seo-t1",
        tierCode: "TIER 01",
        tierLabel: "LITE",
        name: "Local Basics",
        priceInr: 9999,
        billingUnit: "/ mo",
        scopeLevel: 1,
        outputBadge: "5 Keywords",
        turnaround: "Monthly Report",
        summary:
          "Foundational Google visibility for local stores, clinics & startups getting indexed cleanly.",
        deliverables: [
          "5 targeted local & brand keywords tracked",
          "On-page meta titles & H1 fixes (up to 5 pages)",
          "Google Business Profile (GMB) basic optimization",
          "XML Sitemap, robots.txt & Search Console setup",
          "Monthly ranking & index health summary",
        ],
        excludedNote: "Local foundation only · No blog articles or link outreach",
      },
      {
        id: "seo-t2",
        tierCode: "TIER 02",
        tierLabel: "CORE",
        name: "Search Foundation",
        priceInr: 14999,
        billingUnit: "/ mo",
        scopeLevel: 2,
        outputBadge: "15 Keywords • 2 Blogs",
        turnaround: "Bi-Weekly Sync",
        summary:
          "Consistent on-page cleanup plus search-intent blog publishing to capture organic leads.",
        deliverables: [
          "15 commercial keywords + competitor gap audit",
          "On-page optimization across 12 pages + image alt",
          "Broken-link, canonical & crawl-error cleanup",
          "2 SEO-optimized blog articles (800 words) / mo",
          "Bi-weekly GA4 organic traffic & rank snapshot",
        ],
      },
      {
        id: "seo-t3",
        tierCode: "TIER 03",
        tierLabel: "POPULAR",
        name: "Authority Engine",
        priceInr: 23999,
        billingUnit: "/ mo",
        scopeLevel: 3,
        outputBadge: "35 Keywords • 8 Links",
        turnaround: "Weekly Tracking",
        summary:
          "Technical Core Web Vitals optimization, long-form authority content & vetted backlink growth.",
        deliverables: [
          "35 high-intent regional & national keywords",
          "Core Web Vitals speed + JSON-LD Schema markup",
          "4 long-form authority blogs (1,200+ words) / mo",
          "8 contextual backlinks & business citations / mo",
          "Internal link siloing + weekly SERP ROI dashboard",
        ],
        isPopular: true,
      },
      {
        id: "seo-t4",
        tierCode: "TIER 04",
        tierLabel: "SCALE",
        name: "Category Dominator",
        priceInr: 39999,
        billingUnit: "/ mo",
        scopeLevel: 4,
        outputBadge: "75+ Keywords • 15 Links",
        turnaround: "Dedicated Lead",
        summary:
          "Aggressive national & e-commerce SEO architecture engineered to outrank category incumbents.",
        deliverables: [
          "75+ competitive e-commerce SKU & non-brand terms",
          "Programmatic SEO landing pages & hreflang setup",
          "8 research articles + 15+ high-DR editorial links/mo",
          "Crawl-budget, log-level & SSR index engineering",
          "Dedicated Senior SEO Architect + bi-weekly calls",
        ],
      },
    ],
  },
  {
    id: "social-media-management",
    indexLabel: "03",
    title: "Social Media Management",
    shortTitle: "Social Media",
    billingType: "monthly",
    startingPriceInr: 9999,
    tagline:
      "Consistent feeds, high-retention Reels, trend hooks & community engagement tailored per platform.",
    scopePrinciple:
      "Starter covers 1 platform with static posts; advanced tiers expand channels, short-form video reels & active DM moderation.",
    tiers: [
      {
        id: "smm-t1",
        tierCode: "TIER 01",
        tierLabel: "LITE",
        name: "Starter Presence",
        priceInr: 9999,
        billingUnit: "/ mo",
        scopeLevel: 1,
        outputBadge: "1 Platform • 8 Posts",
        turnaround: "Monthly Grid",
        summary:
          "Keep your main social profile clean and active without stretching an early-stage budget.",
        deliverables: [
          "1 platform managed (Instagram or Facebook)",
          "8 static posts + 2 simple story frames / mo",
          "Clean caption copy & researched hashtag groups",
          "Scheduled calendar publishing",
          "Monthly follower & reach summary PDF",
        ],
        excludedNote: "Static grid only · No video editing or inbox handling",
      },
      {
        id: "smm-t2",
        tierCode: "TIER 02",
        tierLabel: "CORE",
        name: "Consistent Growth",
        priceInr: 14999,
        billingUnit: "/ mo",
        scopeLevel: 2,
        outputBadge: "2 Platforms • 4 Reels",
        turnaround: "Bi-Weekly Review",
        summary:
          "Multi-platform consistency adding edited Reels & interactive stories to grow organic discovery.",
        deliverables: [
          "2 platforms (Instagram + Facebook / LinkedIn)",
          "12 posts / mo (8 static/carousels + 4 Reels)",
          "8 branded story sequences / month",
          "Hook writing & peak-window scheduling",
          "Standard comment moderation + bi-weekly metrics",
        ],
      },
      {
        id: "smm-t3",
        tierCode: "TIER 03",
        tierLabel: "POPULAR",
        name: "Viral Momentum",
        priceInr: 24999,
        billingUnit: "/ mo",
        scopeLevel: 3,
        outputBadge: "3 Platforms • 10 Reels",
        turnaround: "Daily Active",
        summary:
          "Retention-first Reels scripting, kinetic edits & daily comment engagement engineered for reach.",
        deliverables: [
          "3 platforms (Instagram, YT Shorts & LinkedIn/FB)",
          "18 deliverables / mo (10 Reels + 8 carousels)",
          "3-second hook scripts, kinetic text & audio sync",
          "Daily active comment banter & DM triage",
          "UGC / creator brief templates + monthly strategy call",
        ],
        isPopular: true,
      },
      {
        id: "smm-t4",
        tierCode: "TIER 04",
        tierLabel: "SCALE",
        name: "Cultural Authority",
        priceInr: 39999,
        billingUnit: "/ mo",
        scopeLevel: 4,
        outputBadge: "4+ Channels • 16 Reels",
        turnaround: "Dedicated Strategist",
        summary:
          "Full-throttle social content machine with shoot direction, moment marketing & whitelisting.",
        deliverables: [
          "4+ channels (IG, YT Shorts, LinkedIn, X / Threads)",
          "28+ deliverables (16 Reels + 12 carousels/memes)",
          "Content shoot direction briefs + Strategist lead",
          "Real-time trend-jacking & creator whitelisting",
          "Bi-weekly review + paid boost funnel alignment",
        ],
      },
    ],
  },
  {
    id: "website-development",
    indexLabel: "04",
    title: "Website Development",
    shortTitle: "Web Dev",
    billingType: "one-time",
    startingPriceInr: 12999,
    tagline:
      "Fast, mobile-first websites engineered from sleek 1-page launchpads to custom Next.js storefronts.",
    scopePrinciple:
      "One-page launches keep costs low for fast validation; upper tiers unlock multi-page UX, e-commerce checkout & custom code.",
    tiers: [
      {
        id: "web-t1",
        tierCode: "TIER 01",
        tierLabel: "LITE",
        name: "Launch One-Pager",
        priceInr: 12999,
        billingUnit: "/ project",
        scopeLevel: 1,
        outputBadge: "1 Page • 5-Day Sprint",
        turnaround: "5 Days",
        summary:
          "Fast, credible single-page website for solo founders, local services & ad landing validation.",
        deliverables: [
          "1 responsive scrolling page (up to 5 sections)",
          "Mobile-first UI + direct WhatsApp & lead form",
          "Basic on-page meta tags & SSL setup help",
          "1 revision round on copy & layout spacing",
          "5-day fast launch (Static React / WordPress)",
        ],
        excludedNote: "Single page only · No e-commerce cart, blog or custom APIs",
      },
      {
        id: "web-t2",
        tierCode: "TIER 02",
        tierLabel: "CORE",
        name: "Business Website",
        priceInr: 19999,
        billingUnit: "/ project",
        scopeLevel: 2,
        outputBadge: "Up to 5 Pages",
        turnaround: "7–10 Days",
        summary:
          "Complete multi-page digital presence showcasing your company, services, proof & enquiry flows.",
        deliverables: [
          "Up to 5 custom pages (Home, About, Work, Contact+)",
          "Subtle micro-interactions & clean typography",
          "Google Sheets / WhatsApp lead capture hooks",
          "90+ mobile speed & image optimization",
          "7–10 day launch + 15 days post-launch support",
        ],
      },
      {
        id: "web-t3",
        tierCode: "TIER 03",
        tierLabel: "POPULAR",
        name: "Growth E-Com / Next.js",
        priceInr: 34999,
        billingUnit: "/ project",
        scopeLevel: 3,
        outputBadge: "10 Pages / 25-SKU Store",
        turnaround: "14 Days",
        summary:
          "Conversion-focused D2C store or bespoke Next.js site with instant UPI/card checkout & tracking.",
        deliverables: [
          "Up to 10 bespoke pages OR Store (up to 25 SKUs)",
          "Custom Figma UI + Razorpay / Cashfree / UPI checkout",
          "Blog / CMS + Schema SEO & Meta/GA4 pixel setup",
          "<1s mobile load speed (95+ Core Web Vitals)",
          "14-day deployment + 30 days priority support",
        ],
        isPopular: true,
      },
      {
        id: "web-t4",
        tierCode: "TIER 04",
        tierLabel: "FLAGSHIP",
        name: "Custom Web App",
        priceInr: 64999,
        billingUnit: "/ project",
        scopeLevel: 4,
        outputBadge: "15+ Routes • Full Stack",
        turnaround: "21–28 Days",
        summary:
          "Enterprise-grade Next.js flagship, interactive WebGL/3D experiences, portals & custom backends.",
        deliverables: [
          "15+ custom routes, portals or Headless D2C stack",
          "Interactive 3D / WebGL UI & custom calculators",
          "Custom backend APIs, auth, webhooks & CRM sync",
          "99/100 CWV tuning + 100% GitHub repo ownership",
          "Dedicated Lead Engineer + 60 days support SLA",
        ],
      },
    ],
  },
  {
    id: "branding",
    indexLabel: "05",
    title: "Branding",
    shortTitle: "Branding",
    billingType: "one-time",
    startingPriceInr: 9999,
    tagline:
      "Memorable brand identities—from clean logo marks to complete visual worlds, stationery & packaging guidelines.",
    scopePrinciple:
      "Tier 01 focuses purely on an essential logo mark; higher tiers build typography rules, guidelines books & packaging systems.",
    tiers: [
      {
        id: "brd-t1",
        tierCode: "TIER 01",
        tierLabel: "LITE",
        name: "Logo Starter",
        priceInr: 9999,
        billingUnit: "/ project",
        scopeLevel: 1,
        outputBadge: "2 Logo Concepts",
        turnaround: "4–5 Days",
        summary:
          "Sharp, clean logo creation & basic palette for early ventures getting off the ground quickly.",
        deliverables: [
          "2 unique logo concepts tailored to your niche",
          "Primary color palette & basic font pairing sheet",
          "2 revision rounds on the selected logo concept",
          "Transparent PNG + scalable SVG vector export",
          "4–5 day turnaround",
        ],
        excludedNote: "Logo mark & colors only · No stationery or guidelines PDF",
      },
      {
        id: "brd-t2",
        tierCode: "TIER 02",
        tierLabel: "CORE",
        name: "Brand Essentials Kit",
        priceInr: 14999,
        billingUnit: "/ project",
        scopeLevel: 2,
        outputBadge: "3 Concepts + Stationery",
        turnaround: "7 Days",
        summary:
          "Cohesive starter identity including logo variations, stationery & social branding kits.",
        deliverables: [
          "3 distinct logo concepts (Wordmark + Icon + Mono)",
          "Full HEX / RGB / CMYK color & typography guide",
          "Visiting card, letterhead & social profile covers",
          "3 revision rounds + full vector files (AI/EPS/SVG)",
          "7-day turnaround",
        ],
      },
      {
        id: "brd-t3",
        tierCode: "TIER 03",
        tierLabel: "POPULAR",
        name: "Complete Identity System",
        priceInr: 24999,
        billingUnit: "/ project",
        scopeLevel: 3,
        outputBadge: "20-Page Brand Book",
        turnaround: "10–12 Days",
        summary:
          "Scalable visual identity system with guidelines book, social templates & packaging previews.",
        deliverables: [
          "4 custom concepts + pattern & iconography suite",
          "20-page Brand Guidelines PDF (spacing & rules)",
          "Stationery kit + 6 editable social templates",
          "1 SKU packaging/label mockup + 3D renders",
          "Full copyright ownership · 10–12 day delivery",
        ],
        isPopular: true,
      },
      {
        id: "brd-t4",
        tierCode: "TIER 04",
        tierLabel: "FLAGSHIP",
        name: "Flagship Brand Bible",
        priceInr: 44999,
        billingUnit: "/ project",
        scopeLevel: 4,
        outputBadge: "30+ Page Bible + 3 SKUs",
        turnaround: "14–18 Days",
        summary:
          "Category-defining brand strategy, bespoke illustration systems, packaging dielines & launch deck.",
        deliverables: [
          "Brand positioning, verbal tone & story manifesto",
          "Bespoke monogram/art + 30+ page Brand Bible",
          "UI style kit + 3 SKU print dielines & Blender 3D",
          "12-slide branded investor & launch pitch deck",
          "Direct Creative Director workshops + unlimited revisions",
        ],
      },
    ],
  },
];

export const CUSTOM_BUNDLE_MODULES: CustomBundleModule[] = [
  {
    id: "graphics-designing",
    name: "Graphics Designing (Starter)",
    billingNote: "Monthly Recurring",
    basePriceInr: 8999,
    deliverableSummary: "6–14 custom static/carousel designs tailored to your feed & ads.",
    impactMetric: "+18h saved/mo",
  },
  {
    id: "seo-management",
    name: "SEO Management (Foundation)",
    billingNote: "Monthly Recurring",
    basePriceInr: 9999,
    deliverableSummary: "Keyword tracking, technical cleanup, GMB & on-page optimization.",
    impactMetric: "+Top SERP Lift",
  },
  {
    id: "social-media-management",
    name: "Social Media Management",
    billingNote: "Monthly Recurring",
    basePriceInr: 9999,
    deliverableSummary: "Consistent feed planning, captions, Reels/carousels & growth metrics.",
    impactMetric: "+3x Reach",
  },
  {
    id: "website-development",
    name: "Website Development Sprint",
    billingNote: "One-Time Project Add-on",
    basePriceInr: 12999,
    deliverableSummary: "High-speed responsive website with WhatsApp & lead capture flows.",
    impactMetric: "<1.2s Load Speed",
  },
  {
    id: "branding",
    name: "Brand Identity & Logo Kit",
    billingNote: "One-Time Project Add-on",
    basePriceInr: 9999,
    deliverableSummary: "Custom logo directions, color system & scalable vector exports.",
    impactMetric: "100% Ownership",
  },
];
