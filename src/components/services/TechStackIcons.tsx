import React from "react";

export interface ServiceTechNode {
  id: string;
  name: string;
  shortTag: string;
  category: string;
  serviceTitle: string;
  serviceSlug: string;
  companionTools: string[];
  accent: string;
  ring: 0 | 1 | 2;
  /** Phase offset (0..1) along the elliptical orbital path */
  phase: number;
}

export const SERVICE_TECH_STACK: ServiceTechNode[] = [
  // Orbit 0 — Core Web & Motion Engineering Stack
  {
    id: "nextjs",
    name: "Next.js 16",
    shortTag: "NEXT 16",
    category: "Core Architecture",
    serviceTitle: "Web Development Services",
    serviceSlug: "web-development",
    companionTools: ["Turbopack", "Partial Prerendering", "Vercel Edge"],
    accent: "#FFFFFF",
    ring: 0,
    phase: 0.04,
  },
  {
    id: "react",
    name: "React 19",
    shortTag: "REACT",
    category: "UI Engine",
    serviceTitle: "Web Development Services",
    serviceSlug: "web-development",
    companionTools: ["Server Components", "Zero-Jitter Hydration", "Custom Hooks"],
    accent: "#61DAFB",
    ring: 0,
    phase: 0.21,
  },
  {
    id: "typescript",
    name: "TypeScript 5",
    shortTag: "TS",
    category: "Type-Safe Systems",
    serviceTitle: "Web Development Services",
    serviceSlug: "web-development",
    companionTools: ["Strict Schemas", "API Contracts", "End-to-End Safety"],
    accent: "#60A5FA",
    ring: 0,
    phase: 0.38,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    shortTag: "TW v4",
    category: "Design System",
    serviceTitle: "Web Development Services",
    serviceSlug: "web-development",
    companionTools: ["Fluid Typography", "GPU Transforms", "Dark Tokens"],
    accent: "#38BDF8",
    ring: 0,
    phase: 0.54,
  },
  {
    id: "gsap",
    name: "GSAP & Framer",
    shortTag: "GSAP",
    category: "Kinetic Choreography",
    serviceTitle: "Web Development Services",
    serviceSlug: "web-development",
    companionTools: ["ScrollTrigger", "Framer Motion", "Lenis Physics"],
    accent: "#88CE02",
    ring: 0,
    phase: 0.71,
  },
  {
    id: "threejs",
    name: "Three.js WebGL",
    shortTag: "WEBGL",
    category: "3D Centerpieces",
    serviceTitle: "Web Development Services",
    serviceSlug: "web-development",
    companionTools: ["Custom Shaders", "ACES ToneMap", "60FPS PBR"],
    accent: "#F59E0B",
    ring: 0,
    phase: 0.88,
  },

  // Orbit 1 — Commerce, Payments & Creative Stack
  {
    id: "shopify",
    name: "Shopify Plus",
    shortTag: "SHOPIFY",
    category: "D2C Storefront CRO",
    serviceTitle: "E-Commerce Services",
    serviceSlug: "ecommerce-services",
    companionTools: ["Headless Cart", "Klaviyo Flows", "AOV Bundles"],
    accent: "#95BF47",
    ring: 1,
    phase: 0.08,
  },
  {
    id: "razorpay",
    name: "RazorpayX & UPI",
    shortTag: "UPI 1-TAP",
    category: "Instant Checkout",
    serviceTitle: "Unit Economics & Margin Auditing",
    serviceSlug: "unit-economics",
    companionTools: ["Cashfree", "Stripe", "COD-to-Prepaid Nudges"],
    accent: "#38BDF8",
    ring: 1,
    phase: 0.25,
  },
  {
    id: "figma",
    name: "Figma Systems",
    shortTag: "FIGMA",
    category: "Bespoke UI/UX",
    serviceTitle: "Web Development Services",
    serviceSlug: "web-development",
    companionTools: ["Component Tokens", "Mobile Wireframes", "Design QA"],
    accent: "#A855F7",
    ring: 1,
    phase: 0.42,
  },
  {
    id: "aftereffects",
    name: "After Effects",
    shortTag: "MOTION",
    category: "3s Hook Ads & Reels",
    serviceTitle: "Social Media Services",
    serviceSlug: "social-media",
    companionTools: ["Premiere Pro", "CapCut Pro", "Lumetri Color"],
    accent: "#A78BFA",
    ring: 1,
    phase: 0.58,
  },
  {
    id: "blender",
    name: "Blender 3D & CAD",
    shortTag: "BLENDER",
    category: "Packaging Renders",
    serviceTitle: "Packaging & Label Designing Services",
    serviceSlug: "packaging-label",
    companionTools: ["Adobe Illustrator", "CMYK Foil Specs", "Dielines"],
    accent: "#F97316",
    ring: 1,
    phase: 0.75,
  },
  {
    id: "shiprocket",
    name: "Shiprocket Shield",
    shortTag: "RTO AI",
    category: "Logistics & COD Guard",
    serviceTitle: "Unit Economics & Margin Auditing",
    serviceSlug: "unit-economics",
    companionTools: ["OTP Verification", "NDR Routing", "Zoho Books"],
    accent: "#C084FC",
    ring: 1,
    phase: 0.92,
  },

  // Orbit 2 — Growth, Ads & First-Party Attribution Stack
  {
    id: "meta",
    name: "Meta CAPI",
    shortTag: "CAPI",
    category: "Server-Side Ads",
    serviceTitle: "Performance Marketing Services",
    serviceSlug: "performance-marketing",
    companionTools: ["Stape Server GTM", "Advantage+", "Triple Whale"],
    accent: "#3B82F6",
    ring: 2,
    phase: 0.12,
  },
  {
    id: "google",
    name: "Google PMax & SEM",
    shortTag: "PMAX",
    category: "High-Intent Search",
    serviceTitle: "SEO & SEM Services",
    serviceSlug: "seo-sem",
    companionTools: ["Semrush", "Ahrefs", "Schema JSON-LD"],
    accent: "#FBBC04",
    ring: 2,
    phase: 0.29,
  },
  {
    id: "ga4",
    name: "GA4 Telemetry",
    shortTag: "GA4",
    category: "Full-Funnel Analytics",
    serviceTitle: "SEO & SEM Services",
    serviceSlug: "seo-sem",
    companionTools: ["Search Console", "Core Web Vitals", "Event Deduplication"],
    accent: "#F9AB00",
    ring: 2,
    phase: 0.45,
  },
  {
    id: "bigquery",
    name: "BigQuery CM3",
    shortTag: "CM3 DATA",
    category: "Margin Modeling",
    serviceTitle: "Unit Economics & Margin Auditing",
    serviceSlug: "unit-economics",
    companionTools: ["True Blended CAC", "Cohort LTV", "TallyPrime Sync"],
    accent: "#60A5FA",
    ring: 2,
    phase: 0.62,
  },
  {
    id: "whatsapp",
    name: "WhatsApp / Wati API",
    shortTag: "WATI BOT",
    category: "60s Lead Qualification",
    serviceTitle: "Lead Generation Services",
    serviceSlug: "lead-generation",
    companionTools: ["HubSpot CRM", "Make Webhooks", "Zoho CRM"],
    accent: "#25D366",
    ring: 2,
    phase: 0.78,
  },
  {
    id: "qcom",
    name: "Quick-Com Hub",
    shortTag: "10M QCOM",
    category: "Blinkit / Zepto / Swiggy",
    serviceTitle: "Quick Commerce Services",
    serviceSlug: "quick-commerce",
    companionTools: ["Dark Store Matrix", "Stockout Alerts", "Ad Central"],
    accent: "#FACC15",
    ring: 2,
    phase: 0.95,
  },
];

export function TechLogoGlyph({ id, className = "w-6 h-6" }: { id: string; className?: string }) {
  switch (id) {
    case "nextjs":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="13.5" fill="#09090B" stroke="#FFFFFF" strokeWidth="1.4" />
          <path
            d="M23.2 24.4L12.8 10.6H10.4v10.8h2v-7.5l9.1 12a13.5 13.5 0 0 0 1.7-1.5z"
            fill="#FFFFFF"
          />
          <rect x="20" y="10.6" width="2" height="8.5" fill="#FFFFFF" />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="2.6" fill="#61DAFB" />
          <ellipse cx="16" cy="16" rx="12" ry="4.7" stroke="#61DAFB" strokeWidth="1.65" />
          <ellipse
            cx="16"
            cy="16"
            rx="12"
            ry="4.7"
            stroke="#61DAFB"
            strokeWidth="1.65"
            transform="rotate(60 16 16)"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="12"
            ry="4.7"
            stroke="#61DAFB"
            strokeWidth="1.65"
            transform="rotate(120 16 16)"
          />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
          <rect x="3" y="3" width="26" height="26" rx="5" fill="#3178C6" />
          <path
            d="M17.5 15.8h-3.1v9.2h-2.4v-9.2H8.9v-2h8.6v2zm1.2 8.7v-2.3c.8.5 1.7.8 2.6.8 1.1 0 1.6-.4 1.6-1 0-.7-.5-.9-1.7-1.4-1.8-.7-2.7-1.5-2.7-3.1 0-1.8 1.4-2.9 3.6-2.9.9 0 1.7.2 2.3.4v2.1c-.6-.4-1.3-.6-2.1-.6-.9 0-1.4.4-1.4.9s.5.8 1.6 1.2c1.8.7 2.8 1.6 2.8 3.2 0 1.9-1.4 3-3.7 3-1 0-1.9-.2-2.7-.4z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
          <path
            d="M16 7.8c-3.7 0-6 1.8-6.9 5.5 1.4-1.8 3-2.5 4.8-2 1.1.3 1.8 1.1 2.6 1.9 1.3 1.4 2.9 2.9 6.3 2.9 3.7 0 6-1.8 6.9-5.5-1.4 1.8-3 2.5-4.8 2-1.1-.3-1.8-1.1-2.6-1.9-1.3-1.4-2.9-2.9-6.3-2.9zm-6.9 8.4c-3.7 0-6 1.8-6.9 5.5 1.4-1.8 3-2.5 4.8-2 1.1.3 1.8 1.1 2.6 1.9 1.3 1.4 2.9 2.9 6.3 2.9 3.7 0 6-1.8 6.9-5.5-1.4 1.8-3 2.5-4.8 2-1.1-.3-1.8-1.1-2.6-1.9-1.3-1.4-2.9-2.9-6.3-2.9z"
            fill="#38BDF8"
          />
        </svg>
      );
    case "gsap":
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="12" stroke="#88CE02" strokeWidth="2.2" />
          <path
            d="M10.5 19.5c2.2-6 5.5-9.5 11-10.5-1.5 5.5-4.2 9.2-8.2 11l3.7 1.2"
            stroke="#88CE02"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="21" cy="10" r="2" fill="#FFFFFF" />
        </svg>
      );
    case "threejs":
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <polygon
            points="7.5,4.5 27.5,11.5 13,27.5"
            stroke="#F59E0B"
            strokeWidth="2"
            fill="#F59E0B"
            fillOpacity="0.16"
          />
          <polygon points="10.8,10.8 21.8,14.5 13.5,23" stroke="#FDE68A" strokeWidth="1.5" />
          <line x1="15.5" y1="7.8" x2="17.5" y2="19" stroke="#FFFFFF" strokeWidth="1.3" />
        </svg>
      );
    case "shopify":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
          <path
            d="M24 8.8l-2.6.3c-.1-.8-.7-2.5-2.4-2.9-.3-.1-.7-.1-1 0-1.1.2-2.2 1-2.7 2.5L12 9.6l-.4 1.7-3.9 1L5.5 26 18.7 28.2 26.7 26 24 8.8z"
            fill="#95BF47"
          />
          <path d="M18.7 28.2L26.7 26 24 8.8l-2.6.3v-.5L18.7 28.2z" fill="#5E8E3E" />
          <path
            d="M16.4 14.3c-.6-.3-1.4-.5-2.1-.3-1.3.3-1.9 1.3-1.7 2.3.2 1.1 1 1.6 1.9 2 .8.3 1.2.6 1.1 1.1-.1.5-.6.8-1.3.7-.7-.1-1.3-.4-1.8-.8l-.6 1.6c.5.4 1.3.7 2.1.8 1.5.1 2.7-.6 2.9-1.9.2-1.1-.4-1.8-1.6-2.3-.9-.4-1.3-.7-1.2-1.1.1-.4.5-.6 1.1-.5.6.1 1 .3 1.3.5l.4-1.9z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case "razorpay":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
          <rect x="3" y="3" width="26" height="26" rx="5" fill="#0C2451" stroke="#38BDF8" strokeWidth="1.2" />
          <polygon points="18,6.5 23.5,6.5 16.5,24 11.5,24" fill="#38BDF8" />
          <polygon points="10.5,14 15.5,14 11.5,24 7.5,24" fill="#FFFFFF" />
        </svg>
      );
    case "figma":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
          <path d="M12 16a3.4 3.4 0 0 1 3.4-3.4H16v6.8h-.6A3.4 3.4 0 0 1 12 16z" fill="#A259FF" />
          <path d="M12 22.8a3.4 3.4 0 0 1 3.4-3.4H16v3.4a3.4 3.4 0 1 1-4 0z" fill="#0ACF83" />
          <path d="M16 5.8h3.4a3.4 3.4 0 1 1 0 6.8H16V5.8z" fill="#FF7262" />
          <path d="M12 9.2a3.4 3.4 0 0 1 3.4-3.4H16v6.8h-.6A3.4 3.4 0 0 1 12 9.2z" fill="#F24E1E" />
          <circle cx="19.4" cy="16" r="3.4" fill="#1ABCFE" />
        </svg>
      );
    case "aftereffects":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
          <rect x="3" y="3" width="26" height="26" rx="5.5" fill="#00005B" stroke="#9999FF" strokeWidth="1.5" />
          <text
            x="16"
            y="20.5"
            textAnchor="middle"
            fill="#9999FF"
            fontFamily="system-ui, sans-serif"
            fontWeight="900"
            fontSize="13.5"
          >
            Ae
          </text>
        </svg>
      );
    case "blender":
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <path
            d="M6.5 17h10M10 11.8l6.8 5.2M14.8 7.8l6 4.8"
            stroke="#FB923C"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="19.5" cy="18.5" r="6.8" fill="#18181B" stroke="#FB923C" strokeWidth="3" />
          <circle cx="19.5" cy="18.5" r="2.8" fill="#60A5FA" />
        </svg>
      );
    case "shiprocket":
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <rect x="3" y="3" width="26" height="26" rx="5.5" fill="#6D28D9" />
          <path d="M21 8.5c-4.4 1-8.2 4-9.8 8.2l4.5 4.5c4.2-1.6 7.2-5.4 8.2-9.8L21 8.5z" fill="#FFFFFF" />
          <circle cx="17.5" cy="14.5" r="1.7" fill="#6D28D9" />
          <path d="M8.5 23.8l3-3M11 24.8l2-2" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "meta":
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <path
            d="M9.6 22c-2.9 0-4.4-2.3-4.4-5.1 0-3.6 2.4-6.9 5.3-6.9 2.5 0 4.2 2 5.5 4.2 1.3-2.2 3-4.2 5.5-4.2 2.9 0 5.3 3.3 5.3 6.9 0 2.8-1.5 5.1-4.4 5.1-2.2 0-3.8-1.7-6.4-5.4C13.4 20.3 11.8 22 9.6 22z"
            stroke="#3B82F6"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "google":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
          <path d="M8 25.2a2.9 2.9 0 0 1-2.5-4.4L13 7.8a2.9 2.9 0 0 1 5 2.9l-7.5 13A2.9 2.9 0 0 1 8 25.2z" fill="#FBBC04" />
          <path d="M24 25.2a2.9 2.9 0 0 1-2.5-1.5L14 10.7a2.9 2.9 0 0 1 5-2.9l7.5 13a2.9 2.9 0 0 1-2.5 4.4z" fill="#4285F4" />
          <circle cx="8" cy="22.3" r="2.9" fill="#34A853" />
        </svg>
      );
    case "ga4":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
          <rect x="20" y="5.5" width="5.2" height="21" rx="2.6" fill="#F9AB00" />
          <rect x="12.6" y="12.8" width="5.2" height="13.7" rx="2.6" fill="#FB923C" />
          <circle cx="8.2" cy="23.9" r="2.6" fill="#FB923C" />
        </svg>
      );
    case "bigquery":
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <circle cx="14.5" cy="14.5" r="9.2" fill="#3B82F6" fillOpacity="0.22" stroke="#60A5FA" strokeWidth="2.4" />
          <rect x="10.5" y="14" width="2" height="4.4" rx="0.8" fill="#FFFFFF" />
          <rect x="13.5" y="11" width="2" height="7.4" rx="0.8" fill="#FFFFFF" />
          <rect x="16.5" y="12.8" width="2" height="5.6" rx="0.8" fill="#FFFFFF" />
          <line x1="21.4" y1="21.4" x2="26.8" y2="26.8" stroke="#60A5FA" strokeWidth="3.2" strokeLinecap="round" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="13" fill="#25D366" />
          <path
            d="M11.8 10.6c-.4-.8-.8-.8-1.2-.8h-1c-.4 0-1 .2-1.5.7-.5.5-1.9 1.9-1.9 4.5s2 5.2 2.2 5.6c.3.4 3.8 6 9.3 8.2 4.6 1.8 5.5 1.5 6.5 1.4 1-.1 3.2-1.3 3.6-2.5.5-1.2.5-2.3.3-2.5-.2-.2-.5-.4-1.1-.7l-3.3-1.6c-.4-.2-.8-.3-1.1.2-.3.5-1.3 1.6-1.6 1.9-.3.3-.6.4-1.1.1-2.1-.9-3.9-2.4-5.2-4.6-.4-.7.4-.7 1.1-2 .1-.3.1-.6-.1-.9l-1.5-3.6z"
            transform="scale(0.66) translate(8 7)"
            fill="#FFFFFF"
          />
        </svg>
      );
    case "qcom":
    default:
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
          <rect x="3" y="3" width="26" height="26" rx="5.5" fill="#FACC15" />
          <polygon points="18,6.5 9.5,17.5 15.5,17.5 14,25.5 22.5,14.5 16.5,14.5" fill="#09090B" />
        </svg>
      );
  }
}
