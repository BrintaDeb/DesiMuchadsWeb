export type QuoteServiceId =
  | "meta-google-ads"
  | "social-media-management"
  | "website-development"
  | "branding";

export type ServiceCategoryId = QuoteServiceId;

export interface QuoteServiceTrack {
  id: QuoteServiceId;
  serviceSlug: string;
  title: string;
  shortTitle: string;
  highlightSummary: string;
  tagline: string;
  deliverables: string[];
}

/**
 * Core Custom-Quote Service Tracks (Zero Public Tier Pricing).
 * Directs visitors to tailored WhatsApp quotes or 1-on-1 Strategy Sessions.
 */
export const QUOTE_SERVICE_TRACKS: QuoteServiceTrack[] = [
  {
    id: "meta-google-ads",
    serviceSlug: "meta-google-ads",
    title: "Meta & Google Ads",
    shortTitle: "Meta & Google Ads",
    highlightSummary: "Paid social, PMax & CAPI",
    tagline:
      "Full-funnel Meta Advantage+, high-intent Google Search & Performance Max campaigns engineered for compounding ROAS.",
    deliverables: [
      "Meta Advantage+ & dynamic creative testing sprints",
      "Google Search, Shopping & Performance Max architectures",
      "Server-side Conversions API (CAPI) & GA4 deduplication",
      "Daily bid pacing & contribution-margin scaling",
    ],
  },
  {
    id: "social-media-management",
    serviceSlug: "social-media",
    title: "Social Media Management",
    shortTitle: "Social Media",
    highlightSummary: "Reels, feeds & community",
    tagline:
      "Consistent feeds, high-retention Reels, 3-second trend hooks & community engagement tailored per platform.",
    deliverables: [
      "Multi-channel social content calendars (IG, YT Shorts, LinkedIn)",
      "Retention-first Reels scripting & motion editing",
      "Creator whitelisting & micro-influencer coordination",
      "Active comment moderation & DM conversion flows",
    ],
  },
  {
    id: "website-development",
    serviceSlug: "web-development",
    title: "Website Development",
    shortTitle: "Website Dev",
    highlightSummary: "Next.js, stores & custom apps",
    tagline:
      "Sub-second websites crafted from sleek launchpads to custom Next.js storefronts & 1-tap UPI checkout.",
    deliverables: [
      "Bespoke Next.js & React mobile-first web architecture",
      "Interactive 3D / WebGL UI & micro-interactions",
      "High-converting D2C stores with Razorpay / UPI checkout",
      "99/100 Core Web Vitals & full GitHub code ownership",
    ],
  },
  {
    id: "branding",
    serviceSlug: "branding",
    title: "Branding",
    shortTitle: "Branding",
    highlightSummary: "Logos, kits & brand books",
    tagline:
      "Memorable brand identities—from distinctive logo marks to complete visual systems, stationery & guidelines.",
    deliverables: [
      "Custom logo systems, monograms & responsive wordmarks",
      "Typography pairing, HEX/CMYK color & pattern systems",
      "Comprehensive Brand Guidelines books & pitch decks",
      "Stationery, social visual kits & packaging alignment",
    ],
  },
];
