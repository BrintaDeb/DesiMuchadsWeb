export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  metric: string;
  anchor: string;
  iconName: "Search" | "Rocket" | "Magnet" | "Share2" | "ShoppingBag" | "Zap" | "Code2" | "Package";
  gradient: string;
}

export const AGENCY_SERVICES: ServiceItem[] = [
  {
    id: "seo-sem",
    title: "SEO & SEM Services",
    shortDesc: "Enhance Online Presence With SEO & SEM. Drive Traffic, Boost ROI.",
    fullDesc: "Dominating search algorithms with data-backed keyword intelligence, technical SEO audits, and high-intent Google Ads management for maximum search equity.",
    metric: "Rank #1 Google & High Search ROAS",
    anchor: "#service-seo",
    iconName: "Search",
    gradient: "from-white/15 to-white/[0.03]",
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing Services",
    shortDesc: "Accelerate Your Brand's Growth With Conversion-Focused Performance Marketing.",
    fullDesc: "Developing unique, battle-tested media buying strategies across Meta, Google, and emerging programmatic channels to profitably scale top and bottom-line revenue.",
    metric: "5.8x Blended ROAS",
    anchor: "#service-performance",
    iconName: "Rocket",
    gradient: "from-white/15 to-white/[0.03]",
  },
  {
    id: "lead-generation",
    title: "Lead Generation Services",
    shortDesc: "Attract And Convert High-Quality Leads For Business Growth.",
    fullDesc: "Engineering high-converting lead funnels, WhatsApp conversational flows, and precision audience qualification frameworks that flood your pipeline with ready-to-buy decision makers.",
    metric: "₹180 CPL & High Intent SQLs",
    anchor: "#service-leads",
    iconName: "Magnet",
    gradient: "from-white/15 to-white/[0.03]",
  },
  {
    id: "social-media",
    title: "Social Media Services",
    shortDesc: "Grow Your Brand's Social Media Presence And Engagement.",
    fullDesc: "Crafting viral storytelling, high-retention reel scripts, influencer amplification, and active community engagement that turns passive scrollers into passionate brand evangelists.",
    metric: "+477% Viral Organic Reach",
    anchor: "#service-social",
    iconName: "Share2",
    gradient: "from-white/15 to-white/[0.03]",
  },
  {
    id: "ecommerce-services",
    title: "E-Commerce Services",
    shortDesc: "Elevate Your Online Store With Comprehensive Solutions.",
    fullDesc: "End-to-end Shopify, WooCommerce, and headless commerce optimization, retention automations, zero-ghosting checkout UX, and dynamic average order value (AOV) multipliers.",
    metric: "+340% Store Revenue Lift",
    anchor: "#service-ecommerce",
    iconName: "ShoppingBag",
    gradient: "from-white/15 to-white/[0.03]",
  },
  {
    id: "quick-commerce",
    title: "Quick Commerce Services",
    shortDesc: "Get Live And Scale Fast On Blinkit, Zepto And Instamart.",
    fullDesc: "Rapid onboarding, algorithmic dark-store inventory visibility, sponsored brand placements, and high-velocity catalog rank engineering on India's top 10-minute delivery apps.",
    metric: "10-Min Dark Store Scale",
    anchor: "#service-qcommerce",
    iconName: "Zap",
    gradient: "from-white/15 to-white/[0.03]",
  },
  {
    id: "web-development",
    title: "Web Development Services",
    shortDesc: "Develop Responsive, High-Converting Websites.",
    fullDesc: "Engineered with ultra-fast Next.js architecture, interactive 3D WebGL aesthetics, sub-second TTFB, and mobile-first frictionless checkout paths designed to maximize conversions.",
    metric: "<0.8s Store Speed & Next.js",
    anchor: "#service-webdev",
    iconName: "Code2",
    gradient: "from-white/15 to-white/[0.03]",
  },
  {
    id: "packaging-label",
    title: "Packaging & Label Designing Services",
    shortDesc: "Design Packaging And Labels That Stand Out On The Shelf.",
    fullDesc: "Premium unboxing aesthetics, authentic Indian cultural typography, luxury tactile finishes, and regulatory-compliant FMCG label design that commands premium retail shelf space.",
    metric: "Award-Winning Shelf Impact",
    anchor: "#service-packaging",
    iconName: "Package",
    gradient: "from-white/15 to-white/[0.03]",
  },
];
