export interface ServiceSpecification {
  deliverables: string[];
  tools: string[];
  turnaround: string;
  targetKpi: string;
  bestFor: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  metric: string;
  anchor: string;
  iconName:
    | "Crown"
    | "Rocket"
    | "Share2"
    | "ShoppingBag"
    | "Zap"
    | "Code2"
    | "Package";
  gradient: string;
  philosophy: string;
  framework: {
    step: string;
    title: string;
    desc: string;
  }[];
  specs: ServiceSpecification;
  faqs: ServiceFAQ[];
  projectSlugs: string[];
}

export const AGENCY_SERVICES: ServiceItem[] = [
  {
    id: "meta-google-ads",
    slug: "meta-google-ads",
    title: "Meta & Google Ads",
    shortDesc:
      "Scale Profitable Revenue With Conversion-Engineered Meta & Google Ad Architectures.",
    fullDesc:
      "Battle-tested media buying strategies across Meta Advantage+, Google Search, Shopping, and Performance Max paired with first-party server-side tracking to scale top and bottom-line revenue.",
    metric: "5.8x Blended ROAS",
    anchor: "#service-meta-google-ads",
    iconName: "Rocket",
    gradient: "from-white/15 to-white/[0.03]",
    philosophy:
      "Most agencies burn through ad spend with spray-and-pray creative, blaming algorithm shifts when campaigns stall. At Desi Muchads, paid acquisition across Meta and Google is an engineering discipline. We combine dynamic creative testing (DCT), negative query shields, first-party server-side tracking (CAPI), and broad Advantage+ & PMax scaling to deliver compounding ROAS.",
    framework: [
      {
        step: "01",
        title: "Account Post-Mortem & Leakage Audit",
        desc: "Diagnosing wasted ad spend, overlapping audiences, query bleed, frequency fatigue, and tracking discrepancies across Meta and Google.",
      },
      {
        step: "02",
        title: "Full-Funnel Meta & Google Architecture",
        desc: "Building disciplined Meta Advantage+ acquisition, Google Search exact-match intent capture, Shopping feeds, and PMax structures.",
      },
      {
        step: "03",
        title: "Dynamic Creative Testing (DCT)",
        desc: "Producing and testing high-hook video creatives, static angles, thumbnails, and ad copy variations weekly to unlock statistical winners.",
      },
      {
        step: "04",
        title: "Precision Budget & Bid Scaling",
        desc: "Scaling spend into verified winning creative angles and tROAS targets without inflating Customer Acquisition Cost (CAC).",
      },
      {
        step: "05",
        title: "Server-Side CAPI & Offline Attribution",
        desc: "Eliminating signal loss with zero-latency Conversions API, Enhanced Conversions, and deduplicated pixel events.",
      },
    ],
    specs: {
      deliverables: [
        "Meta Advantage+ & multi-touch conversion funnel architecture",
        "Google Search, Shopping & Performance Max (PMax) bidding",
        "Dynamic Creative Testing (DCT) with weekly fresh video hooks",
        "First-party Conversions API (CAPI) & negative query shields",
      ],
      tools: ["Meta Ads Manager", "Google Ads", "Triple Whale", "Stape CAPI", "GA4"],
      turnaround: "48h Audit & Setup · Daily Real-Time Optimization",
      targetKpi: "5.8x Blended ROAS · Sub-₹350 CAC",
      bestFor: "D2C & high-ticket brands scaling across Meta and Google",
    },
    faqs: [
      {
        q: "What is your target blended ROAS benchmark?",
        a: "Our partners average 4.2x to 6.8x blended ROAS depending on unit margins and average order value (AOV). We prioritize net contribution margin over vanity platform metrics.",
      },
      {
        q: "Do you manage Meta Ads, Google Search, and Performance Max together?",
        a: "Yes. We architect unified Meta + Google paid media ecosystems covering Meta Reels/Advantage+, Google Search, Shopping feeds, Performance Max, and YouTube retargeting.",
      },
      {
        q: "Will we own our Meta and Google Ads accounts?",
        a: "100%. All campaigns run inside your own ad accounts with complete historical pixel data and creative assets owned by your company.",
      },
    ],
    projectSlugs: ["snacknation-makhanas", "vedaroots-ayurveda", "urbandrift-ev"],
  },
  {
    id: "social-media",
    slug: "social-media",
    title: "Social Media Services",
    shortDesc: "Grow Your Brand's Social Media Presence And Engagement.",
    fullDesc:
      "Crafting viral storytelling, high-retention reel scripts, influencer amplification, and active community engagement that turns passive scrollers into passionate brand evangelists.",
    metric: "+477% Viral Organic Reach",
    anchor: "#service-social",
    iconName: "Share2",
    gradient: "from-white/15 to-white/[0.03]",
    philosophy:
      "Cookie-cutter aesthetic grids and boring corporate quotes are dead. Modern social growth demands cultural pattern-interrupts, relentless 3-second hook retention, and authentic community banter. We transform static brands into cultural movements that dominate Indian social algorithms organically and amplify paid ad equity.",
    framework: [
      {
        step: "01",
        title: "Brand Voice & Cultural Angle Discovery",
        desc: "Defining your unique cultural wit, visual signature, and scroll-stopping narrative that cuts through feed clutter.",
      },
      {
        step: "02",
        title: "3-Second Hook Video Scripting",
        desc: "Writing high-velocity Reels and Shorts scripts with psychological pattern-interrupts that hold watch time.",
      },
      {
        step: "03",
        title: "Cinematic Motion & Audio Engineering",
        desc: "Editing high-retention video assets with dynamic kinetic typography, trending soundscapes, and color grading.",
      },
      {
        step: "04",
        title: "Micro-Creator Whitelisting",
        desc: "Seeding products with high-affinity niche creators and whitelisting authentic testimonials directly into paid ad accounts.",
      },
      {
        step: "05",
        title: "Comment-to-Customer Seeding",
        desc: "Managing active comment banter, meme marketing replies, and direct-message conversion flows that drive sales.",
      },
    ],
    specs: {
      deliverables: [
        "Viral reel scripts with 3-second cultural pattern-interrupts",
        "High-retention motion graphics, sound design & kinetic captions",
        "Creator whitelisting & micro-influencer product seedings",
        "Proactive community moderation & comment-to-conversion seeding",
      ],
      tools: ["Instagram Reels", "YouTube Shorts", "CapCut Pro", "Premiere Pro"],
      turnaround: "High-Hook Video & Carousel Sprints · 48h Turnaround",
      targetKpi: "+477% Organic Reach Lift · 18%+ Video Completion",
      bestFor: "Consumer lifestyle, apparel, beauty, and F&B brands",
    },
    faqs: [
      {
        q: "Who shoots the videos?",
        a: "We provide complete creative direction, scripts, and editing. Clients can send raw footage to our studio, or we deploy our production crew for quarterly brand shoots.",
      },
      {
        q: "Do you handle multi-platform publishing and community DMs?",
        a: "Yes. We manage calendar scheduling, copywriting, comment engagement, and DM triage across Instagram, YouTube Shorts, LinkedIn, and Facebook.",
      },
    ],
    projectSlugs: ["chaichaska-ctc", "streethreads-handloom"],
  },
  {
    id: "web-development",
    slug: "web-development",
    title: "Website Development",
    shortDesc: "Develop Responsive, High-Converting Websites.",
    fullDesc:
      "Engineered with ultra-fast Next.js architecture, interactive 3D WebGL aesthetics, sub-second TTFB, and mobile-first frictionless checkout paths designed to maximize conversions.",
    metric: "<0.8s Store Speed & Next.js",
    anchor: "#service-webdev",
    iconName: "Code2",
    gradient: "from-white/15 to-white/[0.03]",
    philosophy:
      "Most agency websites look fine on desktop mockups but crawl on mobile networks, hemorrhaging paid traffic. At Desi Muchads, we build bespoke digital flagships on Next.js 16 and React 19: sub-800ms load speeds, tactile micro-interactions, custom 3D WebGL centerpieces, and effortless checkout flows that turn clicks into revenue.",
    framework: [
      {
        step: "01",
        title: "Wireframing & Conversion Architecture",
        desc: "Designing mobile-first wireframes optimized for human thumb zones, visual hierarchy, and frictionless conversion paths.",
      },
      {
        step: "02",
        title: "Bespoke UI Design & 3D Interactive Mockups",
        desc: "Crafting distinctive digital aesthetics, custom typography, and interactive Three.js 3D brand elements.",
      },
      {
        step: "03",
        title: "Next.js 16 & Server-Component Engineering",
        desc: "Writing clean, type-safe TypeScript code with Partial Prerendering and zero unnecessary bloat.",
      },
      {
        step: "04",
        title: "Instant Payment & Checkout Integration",
        desc: "Implementing 1-click Razorpay, Cashfree, and UPI intent flows that eliminate mobile checkout drop-offs.",
      },
      {
        step: "05",
        title: "Speed Optimization & 99+ Core Web Vitals",
        desc: "Delivering 95+ Mobile PageSpeed scores, sub-second TTFB, and 100% client GitHub code ownership with zero lock-in.",
      },
    ],
    specs: {
      deliverables: [
        "Bespoke Next.js 16 + React 19 high-velocity web architecture",
        "Sub-800ms Time-To-First-Byte (TTFB) & 99+ Mobile PageSpeed",
        "Interactive 3D WebGL / Three.js custom brand centerpieces",
        "1-Click seamless payment gateway integration (Razorpay / Cashfree)",
      ],
      tools: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Vercel"],
      turnaround: "Rapid Custom Sprints · 100% Client Code Ownership",
      targetKpi: "<0.8s TTFB · 99/100 Core Web Vitals Score",
      bestFor: "Brands needing a luxury, fast, high-converting digital storefront",
    },
    faqs: [
      {
        q: "Do we get full ownership of the source code?",
        a: "Yes. We hand over the complete GitHub repository and deploy directly to your cloud hosting with zero agency lock-in.",
      },
      {
        q: "Why do you use Next.js instead of generic templates?",
        a: "Generic templates are packed with bloated scripts that degrade mobile speed. Next.js delivers sub-second load times and significantly higher paid-traffic conversion rates.",
      },
    ],
    projectSlugs: ["kartflow-headless", "darbar-fine-watches", "kisaandirect-agri"],
  },
  {
    id: "branding",
    slug: "branding",
    title: "Branding & Visual Identity",
    shortDesc:
      "Distinctive Logo Marks, Visual Identity Worlds & Brand Guidelines Systems.",
    fullDesc:
      "End-to-end brand positioning, custom wordmarks, typography & color rules, stationery systems, and tactile guidelines built to command instant category authority.",
    metric: "100% Custom IP & Brand Bible",
    anchor: "#service-branding",
    iconName: "Crown",
    gradient: "from-white/15 to-white/[0.03]",
    philosophy:
      "Generic logo templates make ambitious companies look forgettable before a prospect reads a single headline. At Desi Muchads, Branding builds cohesive, ownable visual and verbal worlds—blending cultural resonance, sharp typography, and scalable design tokens that command premium trust across digital and physical touchpoints.",
    framework: [
      {
        step: "01",
        title: "Category Positioning & Brand Story",
        desc: "Clarifying audience positioning, verbal tone, and differentiated brand territories before touching vector paths.",
      },
      {
        step: "02",
        title: "Custom Logo Marks & Monogram Lockups",
        desc: "Designing primary wordmarks, compact icons, monogram emblems, and responsive variants across dark and light surfaces.",
      },
      {
        step: "03",
        title: "Color, Typography & Visual Language",
        desc: "Establishing curated display/body type pairings, HEX/RGB/CMYK palettes, iconography, and bespoke pattern motifs.",
      },
      {
        step: "04",
        title: "Brand Guidelines Book & Digital Kit",
        desc: "Compiling clear spacing rules, misuse guardrails, social launch templates, stationery, and pitch-deck layouts.",
      },
      {
        step: "05",
        title: "Print, Packaging & Web Handoff",
        desc: "Delivering production vector files (AI, EPS, SVG, Figma) ready for packaging printers and frontend teams.",
      },
    ],
    specs: {
      deliverables: [
        "Custom logo concepts, monograms & responsive wordmark lockups",
        "Curated typography systems & HEX/RGB/CMYK color palettes",
        "Comprehensive Brand Guidelines book & social launch kit",
        "Full commercial copyright & layered source vector handover",
      ],
      tools: ["Adobe Illustrator", "Figma", "InDesign", "Photoshop", "Blender 3D"],
      turnaround: "Custom Sprint Cadence · Complete Vector Handover",
      targetKpi: "Distinctive Market Recall · Consistent Multi-Channel Identity",
      bestFor: "New consumer launches, rebrands & scaling D2C flagships",
    },
    faqs: [
      {
        q: "Do we receive editable source files and full copyright?",
        a: "Yes. Upon completion, we transfer complete commercial ownership along with SVG, EPS, AI, Figma, and print-ready assets.",
      },
      {
        q: "Can Branding be combined with Website Development or Packaging?",
        a: "Yes. Most founders combine Branding, Website Development, and Packaging into one cohesive launch sprint so identity and UX align seamlessly.",
      },
    ],
    projectSlugs: ["royal-rajwada-spices", "kamakesh-hair-elixir", "darbar-fine-watches"],
  },
  {
    id: "ecommerce-services",
    slug: "ecommerce-services",
    title: "E-Commerce Services",
    shortDesc: "Elevate Your Online Store With Comprehensive Solutions.",
    fullDesc:
      "End-to-end Shopify, WooCommerce, and headless commerce optimization, retention automations, zero-ghosting checkout UX, and dynamic average order value (AOV) multipliers.",
    metric: "+340% Store Revenue Lift",
    anchor: "#service-ecommerce",
    iconName: "ShoppingBag",
    gradient: "from-white/15 to-white/[0.03]",
    philosophy:
      "Most e-commerce stores leak 70% of potential revenue at the cart drawer, checkout friction, and post-purchase void. At Desi Muchads, we turn your online store into an automated conversion engine. From dynamic volume bundling and 1-click checkout to WhatsApp delivery tracking and automated RTO reduction, we optimize every Rupee.",
    framework: [
      {
        step: "01",
        title: "Checkout Friction & RTO Audit",
        desc: "Analyzing drop-off hotspots, COD abuse, mobile responsiveness, and payment gateway failure points.",
      },
      {
        step: "02",
        title: "Dynamic Cart Drawer & AOV Multipliers",
        desc: "Deploying tier progress bars, in-cart upsells, and bundle incentives to expand average basket value.",
      },
      {
        step: "03",
        title: "Sub-Second Mobile Storefront Speed",
        desc: "Compressing assets, removing bloated third-party scripts, and tuning Core Web Vitals for mobile buyers.",
      },
      {
        step: "04",
        title: "Post-Purchase WhatsApp Retention",
        desc: "Automating instant order confirmation, shipping updates, review requests, and personalized replenishment reminders.",
      },
      {
        step: "05",
        title: "COD Verification & RTO Shield",
        desc: "Implementing automated OTP order confirmation to weed out unverified Cash-on-Delivery orders before dispatch.",
      },
    ],
    specs: {
      deliverables: [
        "Conversion rate optimization (CRO) & checkout friction audit",
        "Dynamic cart drawer upsells & tiered volume bundling (AOV)",
        "Post-purchase WhatsApp & Klaviyo retention email flows",
        "Automated Return-to-Origin (RTO) reduction verification",
      ],
      tools: ["Shopify Plus", "Klaviyo", "Wati WhatsApp", "Shiprocket"],
      turnaround: "5-Day Store Audit & CRO Deploy · 24/7 Monitoring",
      targetKpi: "+340% Revenue Lift · Sub-15% RTO Rate",
      bestFor: "Established brands looking to break past revenue plateaus",
    },
    faqs: [
      {
        q: "How do you help reduce Cash-on-Delivery (COD) RTO?",
        a: "We deploy automated WhatsApp OTP confirmations, address validation checks, and smart prepaid incentives that consistently lower RTO rates below 15%.",
      },
      {
        q: "Do we have to rebuild our existing Shopify store from scratch?",
        a: "Not necessarily. We audit your current theme and surgically optimize the cart drawer, product pages, and checkout flows without disrupting live sales.",
      },
    ],
    projectSlugs: ["lionelp-restaurant", "pet-first-wellness"],
  },
  {
    id: "quick-commerce",
    slug: "quick-commerce",
    title: "Quick Commerce Services",
    shortDesc: "Get Live And Scale Fast On Blinkit, Zepto And Instamart.",
    fullDesc:
      "Rapid onboarding, dark-store inventory visibility, sponsored brand placements, and high-velocity catalog rank engineering on India's top 10-minute delivery apps.",
    metric: "10-Min Dark Store Scale",
    anchor: "#service-qcommerce",
    iconName: "Zap",
    gradient: "from-white/15 to-white/[0.03]",
    philosophy:
      "Consumer habits in urban India have shifted to 10-minute delivery. If your FMCG or consumer brand isn't dominating dark stores on Blinkit, Zepto, and Instamart, you miss high-frequency urban demand. We manage catalog ingestion, dark store inventory allocation, sponsored search bidding, and flash campaigns to drive rapid velocity.",
    framework: [
      {
        step: "01",
        title: "Fast-Track Platform Onboarding",
        desc: "Expediting brand agreements, vendor registration, and product catalog ingestion on Blinkit, Zepto, and Swiggy Instamart.",
      },
      {
        step: "02",
        title: "Dark Store Inventory Allocation",
        desc: "Strategically distributing stock across Tier-1 urban mother hubs and micro dark-stores based on hyper-local demand.",
      },
      {
        step: "03",
        title: "In-App Sponsored Search Bidding",
        desc: "Winning high-intent keyword searches with targeted cost-per-click bids inside quick-commerce apps.",
      },
      {
        step: "04",
        title: "Category Banners & Flash Placements",
        desc: "Securing prime visual real estate on meal strips, weekend shelves, and checkout impulse carousels.",
      },
      {
        step: "05",
        title: "Stockout Mitigation & Velocity Radar",
        desc: "Daily monitoring of dark store stock availability to prevent disastrous Out-of-Stock algorithm demotions.",
      },
    ],
    specs: {
      deliverables: [
        "Fast-track onboarding on Blinkit, Zepto & Swiggy Instamart",
        "Data-driven dark-store inventory allocation & stock forecasting",
        "Sponsored search keywords & category banner bidding strategy",
        "Stockout mitigation alerts & hyper-local pin code analytics",
      ],
      tools: ["Zepto Partner Portal", "Blinkit Brand Hub", "Swiggy Ad Central"],
      turnaround: "5-Day Catalog Ingestion · Daily Dark Store Stock Checks",
      targetKpi: "10-Minute Fulfillment Rate · 8.2x Flash ROAS",
      bestFor: "Packaged foods, snacking, personal care, and FMCG brands",
    },
    faqs: [
      {
        q: "How long does it take to get products live on Zepto and Blinkit?",
        a: "With our structured onboarding workflow, catalog ingestion and initial warehouse inspection typically complete within 5 to 10 business days.",
      },
      {
        q: "How do you handle stockouts in individual dark stores?",
        a: "We monitor micro-hub inventory velocity daily so low-stock dark stores trigger automated replenishment transfers before ranking drops.",
      },
    ],
    projectSlugs: ["mithaimagic-sweets", "pureglow-kombucha"],
  },
  {
    id: "packaging-label",
    slug: "packaging-label",
    title: "Packaging & Label Production",
    shortDesc: "Retail Packaging Dielines, Tactile Finishes & 3D Mockups.",
    fullDesc:
      "Premium unboxing aesthetics, authentic cultural typography, luxury tactile finishes, and regulatory-compliant FMCG label design that commands retail shelf space.",
    metric: "Award-Winning Shelf Impact",
    anchor: "#service-packaging",
    iconName: "Package",
    gradient: "from-white/15 to-white/[0.03]",
    philosophy:
      "Your packaging is your only 100% impression advertising channel. In retail and unboxing, consumers judge quality in 2.6 seconds. At Desi Muchads, we design packaging that blends cultural craftsmanship with modern clarity, tactile foil specs, and statutory compliance.",
    framework: [
      {
        step: "01",
        title: "Substrate & Dieline Engineering",
        desc: "Selecting physical materials (kraft, textured cotton paper, glass, tin) and custom structural dielines.",
      },
      {
        step: "02",
        title: "Cultural Heritage & Modern Typography",
        desc: "Crafting bespoke wordmarks, botanical illustrations, and high-contrast typography tailored to your product.",
      },
      {
        step: "03",
        title: "Tactile Finish Specifications",
        desc: "Engineering foil stamping, debossing, spot UV, and matte varnishes with exact Pantone spot-color callouts.",
      },
      {
        step: "04",
        title: "FSSAI & Regulatory Compliance",
        desc: "Ensuring nutritional tables, barcodes, batch panels, and statutory disclosures meet Indian packaging laws.",
      },
      {
        step: "05",
        title: "3D Photorealistic Digital Renders",
        desc: "Generating ultra-high-resolution 3D mockups in Blender ready for marketplaces, D2C stores, and Meta/Google ad creatives.",
      },
    ],
    specs: {
      deliverables: [
        "Authentic Indian heritage & modern minimalist packaging concepts",
        "Specialty finish specs (Gold Foil, Emboss, UV Spot, Matte Soft-Touch)",
        "FSSAI / Legal regulatory compliant print-ready dieline files",
        "3D photorealistic digital mockups for ad creative & store listings",
      ],
      tools: ["Adobe Illustrator", "Photoshop", "Blender 3D", "CAD Dielines"],
      turnaround: "Custom Concept Sprints · Print-Ready Vector Dielines",
      targetKpi: "Award-Winning Shelf Standout · +45% CTR in Ad Creatives",
      bestFor: "D2C packaged goods, luxury gifting, retail FMCG",
    },
    faqs: [
      {
        q: "Do you coordinate with our packaging printers?",
        a: "Yes. We review printer proofs, provide Pantone spot-color specifications, and deliver print-ready dielines with bleed and crop marks.",
      },
      {
        q: "Do we get 3D renders for our website before physical printing is completed?",
        a: "Yes. We render studio-grade 3D product views in Blender so you can launch campaigns and storefronts ahead of factory delivery.",
      },
    ],
    projectSlugs: ["royal-rajwada-spices", "kamakesh-hair-elixir"],
  },
];
