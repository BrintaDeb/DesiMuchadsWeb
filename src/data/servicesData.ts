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

export interface ServicePackage {
  name: string;
  price: string;
  period: string;
  desc: string;
  highlights: string[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  metric: string;
  anchor: string;
  iconName: "Search" | "Rocket" | "Magnet" | "Share2" | "ShoppingBag" | "Zap" | "Code2" | "Package";
  gradient: string;
  philosophy: string;
  framework: {
    step: string;
    title: string;
    desc: string;
  }[];
  specs: ServiceSpecification;
  packages: ServicePackage[];
  faqs: ServiceFAQ[];
  projectSlugs: string[];
}

export const AGENCY_SERVICES: ServiceItem[] = [
  {
    id: "seo-sem",
    slug: "seo-sem",
    title: "SEO & SEM Services",
    shortDesc: "Enhance Online Presence With SEO & SEM. Drive Traffic, Boost ROI.",
    fullDesc: "Dominating search algorithms with data-backed keyword intelligence, technical SEO audits, and high-intent Google Ads management for maximum search equity.",
    metric: "Rank #1 Google & High Search ROAS",
    anchor: "#service-seo",
    iconName: "Search",
    gradient: "from-white/15 to-white/[0.03]",
    philosophy:
      "Traditional SEO agencies sell vague 12-month retainer promises and generic backlinks. At Desi Muchads, we treat search as high-intent conversion equity. We marry technical architecture with commercial keyword clustering and Google Performance Max campaigns that capture customers at the exact instant of purchase intent.",
    framework: [
      {
        step: "01",
        title: "Technical & Core Web Vitals Audit",
        desc: "Deep algorithmic audit of schema, crawl budget, TTFB, and indexing barriers to eliminate ranking bottlenecks within 72 hours.",
      },
      {
        step: "02",
        title: "Commercial Keyword Clustering",
        desc: "Mapping high-intent purchase searches, competitor search interception, and negative keyword blacklists to ensure zero budget leakage.",
      },
      {
        step: "03",
        title: "PMax & Search Bid Engineering",
        desc: "Structuring high-ROAS Google Ads campaigns with tROAS and tCPA smart bidding fed by first-party conversion data.",
      },
      {
        step: "04",
        title: "Content & Topical Authority Sprints",
        desc: "Publishing authoritative, search-optimized landing pages and long-tail guides designed to outrank legacy competitors.",
      },
      {
        step: "05",
        title: "Daily Automated Bid & Query Pacing",
        desc: "Continuous algorithmic adjustments, negative search term pruning, and real-time rank tracking transparently shown in your portal.",
      },
    ],
    specs: {
      deliverables: [
        "Technical SEO & Core Web Vitals speed optimization",
        "High-intent commercial keyword clustering & gap analysis",
        "Google Search & Performance Max (PMax) bid architectures",
        "Negative keyword blacklists & zero-waste budget pacing",
      ],
      tools: ["Google Ads", "GA4", "Search Console", "Semrush", "Ahrefs"],
      turnaround: "48h Campaign Setup · Daily Automated Pacing",
      targetKpi: "Top 3 Google SERP Rank · 4.8x+ Search ROAS",
      bestFor: "High-intent e-commerce, D2C catalogs, and B2B pipelines",
    },
    packages: [
      {
        name: "Search Dominance Foundation",
        price: "₹45,000",
        period: "per month",
        desc: "For challenger brands seeking disciplined Google Search rankings and profitable initial ad capture.",
        highlights: [
          "Complete Technical SEO & Schema Audit",
          "Google Ads Search & PMax Setup",
          "Up to ₹5L/mo managed ad spend",
          "Weekly negative query pruning",
          "Live 24/7 client performance portal",
        ],
      },
      {
        name: "Omnichannel Search Scaling",
        price: "₹85,000",
        period: "per month",
        desc: "For scaling D2C brands and enterprises ready to dominate page 1 and capture category search volume.",
        highlights: [
          "Advanced Core Web Vitals engineering",
          "Competitor search conquesting campaigns",
          "Uncapped ad spend management with tier bonuses",
          "Custom landing page CRO & speed optimization",
          "Dedicated Senior Search Architect & direct WhatsApp",
        ],
      },
    ],
    faqs: [
      {
        q: "How fast can we see results from SEO vs. SEM?",
        a: "Google Search Ads and Performance Max go live within 48 to 72 hours, generating qualified clicks and orders immediately. Organic SEO typically reflects indexed ranking momentum within 4 to 8 weeks through our accelerated topical clustering sprints.",
      },
      {
        q: "Do you manage both Google Search and Google Shopping/PMax?",
        a: "Yes. We engineer integrated Google architectures covering Search, Shopping, Performance Max, YouTube Pre-roll, and Retargeting feeds.",
      },
      {
        q: "Will we own the Google Ads account?",
        a: "100%. We believe in total transparency. Your ad account, historical pixel data, and conversion assets are owned entirely by your company with zero lock-in.",
      },
    ],
    projectSlugs: ["vedaroots-ayurveda", "urbandrift-ev"],
  },
  {
    id: "performance-marketing",
    slug: "performance-marketing",
    title: "Performance Marketing Services",
    shortDesc: "Accelerate Your Brand's Growth With Conversion-Focused Performance Marketing.",
    fullDesc: "Developing unique, battle-tested media buying strategies across Meta, Google, and emerging programmatic channels to profitably scale top and bottom-line revenue.",
    metric: "5.8x Blended ROAS",
    anchor: "#service-performance",
    iconName: "Rocket",
    gradient: "from-white/15 to-white/[0.03]",
    philosophy:
      "Most agencies blow through ad spend with spray-and-pray creative, blaming the iOS update or algorithm when campaigns stall. At Desi Muchads, performance marketing is an algorithmic science. We combine ruthless dynamic creative testing (DCT), first-party server-side tracking (CAPI), and broad Advantage+ scaling to deliver consistent 5x+ ROAS.",
    framework: [
      {
        step: "01",
        title: "Account Post-Mortem & Leakage Audit",
        desc: "Diagnosing wasted ad spend, overlapping audiences, frequency fatigue, and tracking discrepancies in your Meta and Google accounts.",
      },
      {
        step: "02",
        title: "Full-Funnel Architecture Setup",
        desc: "Building disciplined Top-of-Funnel (Broad/Interest), Middle-of-Funnel (Social Proof/Review), and Bottom-of-Funnel (Offer/Cart) campaign structures.",
      },
      {
        step: "03",
        title: "Dynamic Creative Testing (DCT)",
        desc: "Producing and testing 6+ high-hook video creatives, thumbnails, and copy variations weekly to uncover statistical winners.",
      },
      {
        step: "04",
        title: "Advantage+ & Broad Budget Scaling",
        desc: "Pumping ad spend into verified winning creative angles without skyrocketing Customer Acquisition Cost (CAC).",
      },
      {
        step: "05",
        title: "Server-Side CAPI & Offline Tracking",
        desc: "Eliminating iOS tracking loss with zero-latency Conversions API, deduplicating pixel events for maximum machine learning signal.",
      },
    ],
    specs: {
      deliverables: [
        "Meta & Google multi-touch conversion funnel architecture",
        "Dynamic Creative Testing (DCT) with 6+ weekly refreshed hooks",
        "Broad & Advantage+ algorithmic scaling frameworks",
        "First-party Conversions API (CAPI) & offline lead sync",
      ],
      tools: ["Meta Ads Manager", "Google Ads", "Triple Whale", "Stape CAPI"],
      turnaround: "7-Day Launch Sprint · Real-time Spend Optimization",
      targetKpi: "5.8x Blended ROAS · Sub-₹350 CAC",
      bestFor: "D2C brands scaling from ₹3L to ₹50L+/mo ad spend",
    },
    packages: [
      {
        name: "Growth Catalyst Stack",
        price: "₹75,000",
        period: "per month",
        desc: "Engineered for challenger D2C brands spending ₹3L–₹15L/month seeking disciplined profitability.",
        highlights: [
          "Meta & Google multi-touch campaign setup",
          "Weekly 4 High-Hook creative refreshes",
          "Full CAPI server-side integration",
          "Daily pacing & bid adjustments",
          "Shared Slack/WhatsApp war room",
        ],
      },
      {
        name: "Maharaja Scale Suite",
        price: "₹1,45,000",
        period: "per month",
        desc: "For category leaders ready to deploy ₹15L–₹1Cr+/mo with dedicated growth engineering.",
        highlights: [
          "Weekly 8-10 custom creative assets & motion edits",
          "Advanced multi-channel attribution with Triple Whale",
          "Omnichannel retargeting across Meta, Google & programmatic",
          "Weekly strategy baithak with Principal Growth Architect",
          "Performance-linked incentive tier",
        ],
      },
    ],
    faqs: [
      {
        q: "What is your target blended ROAS benchmark?",
        a: "Our clients average between 4.2x to 6.8x blended ROAS depending on their product margins and average order value (AOV). We prioritize net contribution margin rather than vanity platform metrics.",
      },
      {
        q: "Do you supply the ad creative videos and designs?",
        a: "Yes. Our in-house creative studio produces high-hook cultural reels, motion graphics, and static thumb-stoppers as part of our weekly creative refresh sprints.",
      },
      {
        q: "How frequently do you optimize campaigns?",
        a: "Daily. Our media buyers monitor morning, afternoon, and evening bid pacing, cutting underperforming ads and allocating budget to statistical winners in real time.",
      },
    ],
    projectSlugs: ["you-and-me-photography", "snacknation-makhanas"],
  },
  {
    id: "lead-generation",
    slug: "lead-generation",
    title: "Lead Generation Services",
    shortDesc: "Attract And Convert High-Quality Leads For Business Growth.",
    fullDesc: "Engineering high-converting lead funnels, WhatsApp conversational flows, and precision audience qualification frameworks that flood your pipeline with ready-to-buy decision makers.",
    metric: "₹180 CPL & High Intent SQLs",
    anchor: "#service-leads",
    iconName: "Magnet",
    gradient: "from-white/15 to-white/[0.03]",
    philosophy:
      "Most lead gen agencies flood sales teams with cheap, junk contacts who never pick up the phone. At Desi Muchads, we focus on Sales Qualified Leads (SQLs). We build pre-qualification friction funnels, instant WhatsApp conversational bots, and multi-tier CRM webhook routing to ensure your closers only speak to high-net-worth buyers with verified budget.",
    framework: [
      {
        step: "01",
        title: "Ideal Customer Avatar (ICA) Mapping",
        desc: "Pinpointing the exact decision-maker profiles, high-ticket pain points, and commercial purchase triggers.",
      },
      {
        step: "02",
        title: "Two-Step Pre-Qualification Funnel",
        desc: "Designing high-converting interactive landing pages with multi-step question screening to filter out casual tyre-kickers.",
      },
      {
        step: "03",
        title: "Instant 60-Second WhatsApp Bot",
        desc: "Connecting WhatsApp Business API to trigger automated, conversational outreach within 60 seconds of form submission.",
      },
      {
        step: "04",
        title: "Automated CRM Webhook Routing",
        desc: "Syncing qualified leads directly into HubSpot, Zoho, or Salesforce with instant SMS/email alerts to your sales closers.",
      },
      {
        step: "05",
        title: "Drop-Off Retargeting Sequences",
        desc: "Serving specialized proof, testimonial, and objection-busting ad creative to prospects who dropped out before booking.",
      },
    ],
    specs: {
      deliverables: [
        "Two-step frictionless lead capture funnels & landing pages",
        "Automated WhatsApp conversational qualification bot",
        "Instant multi-tier CRM webhook routing (HubSpot/Zoho)",
        "Automated re-engagement sequences for dropped enquiries",
      ],
      tools: ["Meta Instant Forms", "Wati API", "Make / Zapier", "HubSpot"],
      turnaround: "3-Day Funnel Go-Live · Instant 60s Lead Response",
      targetKpi: "₹180 Average CPL · 68%+ Sales Qualified Rate (SQL)",
      bestFor: "High-ticket consulting, real estate, clinics, ed-tech",
    },
    packages: [
      {
        name: "High-Intent Pipeline Starter",
        price: "₹60,000",
        period: "per month",
        desc: "For boutique professional firms and consultants needing 100-300 qualified sales appointments per month.",
        highlights: [
          "High-converting landing page & form design",
          "Meta & Google lead ad campaigns",
          "Automated WhatsApp response sequence",
          "Lead quality scoring & feedback loops",
          "Weekly conversion optimization baithak",
        ],
      },
      {
        name: "Enterprise Pipeline Dominator",
        price: "₹1,20,000",
        period: "per month",
        desc: "For luxury real estate, healthcare clinics, and enterprise B2B sales teams requiring high volume SQLs.",
        highlights: [
          "Bespoke multi-page qualification funnel",
          "Interactive WhatsApp chatbot with instant calendar booking",
          "Deep CRM integration with custom pipeline automation",
          "Call recording review & sales script optimization",
          "Dedicated Lead Operations Manager",
        ],
      },
    ],
    faqs: [
      {
        q: "How do you prevent junk or invalid phone numbers?",
        a: "We implement OTP phone verification and conditional screening questions that automatically disqualify candidates with low purchase budgets or missing criteria.",
      },
      {
        q: "Can you connect with our existing CRM (HubSpot, Zoho, Salesforce)?",
        a: "Yes. We configure instant real-time webhooks via Make and Zapier so leads populate your CRM within 3 seconds of submission.",
      },
    ],
    projectSlugs: ["bharat-bio-health", "sobha-heritage-villas"],
  },
  {
    id: "social-media",
    slug: "social-media",
    title: "Social Media Services",
    shortDesc: "Grow Your Brand's Social Media Presence And Engagement.",
    fullDesc: "Crafting viral storytelling, high-retention reel scripts, influencer amplification, and active community engagement that turns passive scrollers into passionate brand evangelists.",
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
        desc: "Defining your unique Indian cultural wit, visual signature, and unhinged relatability that cuts through algorithm clutter.",
      },
      {
        step: "02",
        title: "3-Second Hook Video Scripting",
        desc: "Writing high-velocity reel and TikTok scripts with psychological pattern-interrupts that prevent passive scrolling.",
      },
      {
        step: "03",
        title: "Cinematic Motion & Audio Engineering",
        desc: "Editing high-retention video assets with dynamic kinetic typography, trending Indian soundscapes, and color grading.",
      },
      {
        step: "04",
        title: "Micro-Creator Whitelisting",
        desc: "Seeding products with high-affinity niche creators and whitelisting their authentic testimonials directly into paid ad accounts.",
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
      turnaround: "12-16 High-Hook Video Assets/Mo · 48h Turnaround",
      targetKpi: "+477% Organic Reach Lift · 18%+ Video Completion",
      bestFor: "Consumer lifestyle, apparel, beauty, and F&B brands",
    },
    packages: [
      {
        name: "Viral Momentum Stack",
        price: "₹65,000",
        period: "per month",
        desc: "For emerging consumer brands ready to establish category authority and organic reach.",
        highlights: [
          "12 Custom High-Hook Reels & Shorts per month",
          "Scriptwriting, voiceover, and kinetic editing",
          "Trend scouting and algorithm timing schedule",
          "Community engagement & comment banter",
          "Monthly viral reach report",
        ],
      },
      {
        name: "Cultural Movement Suite",
        price: "₹1,25,000",
        period: "per month",
        desc: "Full-scale content machine producing daily viral video and creator amplification.",
        highlights: [
          "24 Custom Produced Reels & Shorts per month",
          "On-site content shoot direction & creative producer",
          "Micro-influencer product gifting & whitelisting",
          "Brand meme architecture & reactive marketing",
          "Integrated paid boost budget management",
        ],
      },
    ],
    faqs: [
      {
        q: "Who shoots the videos?",
        a: "We provide complete creative direction, scripts, and editing. Clients can either send raw product footage to our studio, or we can deploy our production crew for quarterly brand batch shoots.",
      },
      {
        q: "Do you guarantee viral views?",
        a: "While algorithms cannot be 100% predicted, our 3-second hook methodology consistently yields 5x to 15x organic reach increases across our portfolio within 60 days.",
      },
    ],
    projectSlugs: ["chaichaska-ctc", "streethreads-handloom"],
  },
  {
    id: "ecommerce-services",
    slug: "ecommerce-services",
    title: "E-Commerce Services",
    shortDesc: "Elevate Your Online Store With Comprehensive Solutions.",
    fullDesc: "End-to-end Shopify, WooCommerce, and headless commerce optimization, retention automations, zero-ghosting checkout UX, and dynamic average order value (AOV) multipliers.",
    metric: "+340% Store Revenue Lift",
    anchor: "#service-ecommerce",
    iconName: "ShoppingBag",
    gradient: "from-white/15 to-white/[0.03]",
    philosophy:
      "Most e-commerce stores leak 70% of potential revenue at the cart drawer, checkout friction, and post-purchase void. At Desi Muchads, we turn your online store into an automated cash-register. From dynamic volume bundling and 1-click checkout to WhatsApp delivery tracking and automated RTO reduction, we optimize every Rupee.",
    framework: [
      {
        step: "01",
        title: "Checkout Friction & RTO Audit",
        desc: "Analyzing drop-off hotspots, COD abuse, mobile responsiveness, and payment gateway failure points.",
      },
      {
        step: "02",
        title: "Dynamic Cart Drawer & AOV Multipliers",
        desc: "Deploying tier progress bars (Free Shipping at ₹999), in-cart upsells, and bundle discounts to increase basket size by 30%+.",
      },
      {
        step: "03",
        title: "Sub-Second Mobile Storefront Speed",
        desc: "Compressing assets, removing bloated third-party apps, and optimizing Core Web Vitals for lightning-fast mobile shopping.",
      },
      {
        step: "04",
        title: "Post-Purchase WhatsApp Retention",
        desc: "Automating instant order confirmation, shipping updates, review requests, and personalized replenishment reminders on WhatsApp.",
      },
      {
        step: "05",
        title: "COD Verification & RTO Shield",
        desc: "Implementing automated OTP order confirmation to weed out fake Cash-on-Delivery orders before dispatch.",
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
      bestFor: "Established brands looking to break the ₹10L/mo plateau",
    },
    packages: [
      {
        name: "E-Commerce Growth Retainer",
        price: "₹70,000",
        period: "per month",
        desc: "For Shopify and WooCommerce stores seeking immediate conversion rate gains and automated retention.",
        highlights: [
          "Full Shopify CRO redesign sprint",
          "Dynamic cart drawer & bundling engine",
          "Klaviyo 5-part email flow setup",
          "WhatsApp automated order confirmations",
          "COD verification & RTO reduction system",
        ],
      },
      {
        name: "Headless D2C Flagship Engine",
        price: "₹1,35,000",
        period: "per month",
        desc: "For high-volume online retailers aiming for enterprise speed and deep custom personalization.",
        highlights: [
          "Sub-0.8s mobile storefront architecture",
          "Personalized AI product recommendation engine",
          "Full lifecycle retention flows on WhatsApp & Email",
          "Omnichannel inventory synchronization",
          "Dedicated E-Commerce CRO Engineer",
        ],
      },
    ],
    faqs: [
      {
        q: "How do you help reduce Cash-on-Delivery (COD) RTO?",
        a: "We deploy automated WhatsApp OTP confirmations, address validation checks, and intelligent pre-paid discount nudges that consistently drop RTO rates below 15%.",
      },
      {
        q: "Do we have to rebuild our existing Shopify store from scratch?",
        a: "Not necessarily. We audit your current theme and surgically optimize the cart drawer, product pages, and checkout flows without disrupting current operations.",
      },
    ],
    projectSlugs: ["lionelp-restaurant", "pet-first-wellness"],
  },
  {
    id: "quick-commerce",
    slug: "quick-commerce",
    title: "Quick Commerce Services",
    shortDesc: "Get Live And Scale Fast On Blinkit, Zepto And Instamart.",
    fullDesc: "Rapid onboarding, algorithmic dark-store inventory visibility, sponsored brand placements, and high-velocity catalog rank engineering on India's top 10-minute delivery apps.",
    metric: "10-Min Dark Store Scale",
    anchor: "#service-qcommerce",
    iconName: "Zap",
    gradient: "from-white/15 to-white/[0.03]",
    philosophy:
      "India's consumer habits have irreversibly shifted to 10-minute delivery. If your FMCG or consumer brand isn't dominating dark stores on Blinkit, Zepto, and Instamart, you are invisible to urban buyers. We manage catalog ingestion, dark store inventory allocation, sponsored search bidding, and instant flash sales to drive rapid velocity.",
    framework: [
      {
        step: "01",
        title: "Fast-Track Platform Onboarding",
        desc: "Expediting brand agreements, vendor registration, and product catalog ingestion on Blinkit, Zepto, and Swiggy Instamart within 5 business days.",
      },
      {
        step: "02",
        title: "Dark Store Inventory Allocation",
        desc: "Strategically distributing stock across Tier-1 urban mother hubs and micro dark-stores based on hyper-local pin-code demand.",
      },
      {
        step: "03",
        title: "In-App Sponsored Search Bidding",
        desc: "Dominating high-intent keyword searches (e.g., 'healthy snacking', 'hair serum') with targeted cost-per-click bids inside the apps.",
      },
      {
        step: "04",
        title: "Category Banners & Flash Placements",
        desc: "Securing prime visual real estate on morning breakfast strips, weekend party banners, and checkout impulse carousels.",
      },
      {
        step: "05",
        title: "Stockout Mitigation & Velocity Radar",
        desc: "Daily monitoring of dark store stock availability to prevent disastrous 'Out of Stock' algorithm demotions.",
      },
    ],
    specs: {
      deliverables: [
        "Fast-track onboarding on Blinkit, Zepto & Swiggy Instamart",
        "Algorithmic dark-store inventory allocation & stock forecasting",
        "Sponsored search keywords & category banner bidding strategy",
        "Stockout mitigation alerts & hyper-local pin code analytics",
      ],
      tools: ["Zepto Partner Portal", "Blinkit Brand Hub", "Swiggy Ad Central"],
      turnaround: "5-Day Catalog Ingestion · Daily Dark Store Stock Checks",
      targetKpi: "10-Minute Fulfillment Rate · 8.2x Flash ROAS",
      bestFor: "Packaged foods, snacking, personal care, and FMCG brands",
    },
    packages: [
      {
        name: "Q-Commerce Launch Sprint",
        price: "₹55,000",
        period: "per month",
        desc: "For emerging FMCG and packaged food brands entering quick commerce in top 5 metro cities.",
        highlights: [
          "Blinkit & Zepto onboarding and cataloging",
          "Dark store stock mapping in key clusters",
          "Sponsored search campaign management",
          "Weekly dark store inventory velocity report",
          "Direct brand manager liaison",
        ],
      },
      {
        name: "National Dark Store Dominator",
        price: "₹1,10,000",
        period: "per month",
        desc: "Full-scale national coverage across 400+ dark stores in Blinkit, Zepto, and Swiggy Instamart.",
        highlights: [
          "Complete triage across all 3 quick-commerce platforms",
          "Category banner negotiation and flash placement booking",
          "Algorithmic re-order forecasting to prevent stockouts",
          "Hyper-local pin code ad targeting campaigns",
          "Dedicated Quick-Commerce Operations Lead",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does it take to get products live on Zepto and Blinkit?",
        a: "With our direct platform partnerships, catalog onboarding and initial warehouse inspection typically take 5 to 10 business days.",
      },
      {
        q: "How do you handle stockouts in individual dark stores?",
        a: "We run automated daily inventory checks across micro-hubs. If a dark store drops below 3 days of cover, our automated re-order alert triggers instant stock transfer.",
      },
    ],
    projectSlugs: ["mithaimagic-sweets", "pureglow-kombucha"],
  },
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Development Services",
    shortDesc: "Develop Responsive, High-Converting Websites.",
    fullDesc: "Engineered with ultra-fast Next.js architecture, interactive 3D WebGL aesthetics, sub-second TTFB, and mobile-first frictionless checkout paths designed to maximize conversions.",
    metric: "<0.8s Store Speed & Next.js",
    anchor: "#service-webdev",
    iconName: "Code2",
    gradient: "from-white/15 to-white/[0.03]",
    philosophy:
      "Most agency websites look pretty on a desktop mockup but crawl at 7 seconds on an Indian 4G mobile network, hemorrhaging 50% of ad traffic. At Desi Muchads, we build bespoke digital flagships on Next.js 16 and React 19. Sub-800ms page load speeds, tactile micro-interactions, custom 3D WebGL centerpieces, and flawless checkout flows that turn clicks into cash.",
    framework: [
      {
        step: "01",
        title: "Wireframing & Conversion Architecture",
        desc: "Designing mobile-first wireframes optimized for human thumb zones, visual hierarchy, and frictionless conversion paths.",
      },
      {
        step: "02",
        title: "Bespoke UI Design & 3D Interactive Mockups",
        desc: "Crafting luxury dark-mode aesthetics, custom typography, and interactive Three.js 3D brand elements.",
      },
      {
        step: "03",
        title: "Next.js 16 & Server-Component Engineering",
        desc: "Writing clean, type-safe TypeScript code with Partial Prerendering and zero unnecessary bloat.",
      },
      {
        step: "04",
        title: "Instant Payment & Checkout Integration",
        desc: "Implementing 1-click Razorpay, Cashfree, and UPI intent flows that eliminate drop-offs on Indian mobile devices.",
      },
      {
        step: "05",
        title: "Speed Optimization & 99+ Core Web Vitals",
        desc: "Achieving green 95+ Mobile PageSpeed scores, sub-second TTFB, and 100% client code ownership with zero lock-in.",
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
      turnaround: "14-Day Full-Stack Sprint · 100% Client Code Ownership",
      targetKpi: "<0.8s TTFB · 99/100 Core Web Vitals Score",
      bestFor: "Brands needing a luxury, fast, high-converting digital storefront",
    },
    packages: [
      {
        name: "High-Speed Flagship Landing Page",
        price: "₹75,000",
        period: "one-time sprint",
        desc: "Custom bespoke performance landing page engineered for high-converting media buying campaigns.",
        highlights: [
          "Bespoke Next.js + Tailwind CSS build",
          "Sub-0.8s load speed on Indian 4G/5G",
          "Integrated WhatsApp, lead forms & Razorpay",
          "Full mobile responsiveness & animations",
          "7-Day delivery with 100% code ownership",
        ],
      },
      {
        name: "Full-Stack Custom Storefront / Web App",
        price: "₹1,85,000",
        period: "one-time sprint",
        desc: "Complete enterprise digital flagship with custom product configurators, CMS, and headless commerce.",
        highlights: [
          "Up to 10 custom designed responsive pages",
          "Interactive 3D Three.js product showcase",
          "Full headless Shopify or custom DB backend",
          "Automated transactional emails and WhatsApp webhooks",
          "14-Day deployment with 30 days post-launch support",
        ],
      },
    ],
    faqs: [
      {
        q: "Do we get full ownership of the source code?",
        a: "Yes. We hand over the complete GitHub repository and deploy directly to your Vercel/Cloud hosting. No proprietary agency locks.",
      },
      {
        q: "Why do you use Next.js instead of generic templates?",
        a: "Generic templates are packed with bloated CSS and slow plugins that degrade mobile PageSpeed. Next.js gives sub-second load times, resulting in 30% to 50% higher ad conversion rates.",
      },
    ],
    projectSlugs: ["darbar-fine-watches", "kisaandirect-agri"],
  },
  {
    id: "packaging-label",
    slug: "packaging-label",
    title: "Packaging & Label Designing Services",
    shortDesc: "Design Packaging And Labels That Stand Out On The Shelf.",
    fullDesc: "Premium unboxing aesthetics, authentic Indian cultural typography, luxury tactile finishes, and regulatory-compliant FMCG label design that commands premium retail shelf space.",
    metric: "Award-Winning Shelf Impact",
    anchor: "#service-packaging",
    iconName: "Package",
    gradient: "from-white/15 to-white/[0.03]",
    philosophy:
      "Your packaging is your only 100% impression advertising channel. In retail and unboxing, consumers make purchase decisions in 2.6 seconds. At Desi Muchads, we design packaging that commands premium pricing. We combine rich Indian cultural heritage with minimalist typography, tactile gold foils, and strict legal compliance to create iconic shelf impact.",
    framework: [
      {
        step: "01",
        title: "Substrate & Dieline Engineering",
        desc: "Selecting the optimal physical materials (kraft, textured cotton paper, amber glass, tin) and custom structural dielines.",
      },
      {
        step: "02",
        title: "Cultural Heritage & Modern Typography",
        desc: "Crafting bespoke wordmarks, Indian botanical illustrations, and high-contrast typography tailored to your product ethos.",
      },
      {
        step: "03",
        title: "Tactile Finish Specifications",
        desc: "Engineering foil stamping, debossing, spot UV, and matte varnishes with exact Pantone spot-color callouts for printers.",
      },
      {
        step: "04",
        title: "FSSAI & Regulatory Compliance",
        desc: "Ensuring all nutritional tables, barcodes, batch dates, and statutory legal disclosures comply with Indian packaging law.",
      },
      {
        step: "05",
        title: "3D Photorealistic Digital Renders",
        desc: "Generating ultra-high-resolution 3D mockups in Blender ready for Amazon listings, D2C storefronts, and performance ad creative.",
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
      turnaround: "7-Day Design Concept · 3 Rounds Revisions · Print Ready",
      targetKpi: "Award-Winning Shelf Standout · +45% CTR in Ad Creatives",
      bestFor: "D2C packaged goods, luxury gifting, retail FMCG",
    },
    packages: [
      {
        name: "Single Hero SKU Packaging Suite",
        price: "₹45,000",
        period: "per SKU",
        desc: "Complete packaging and label identity for your flagship product with print-ready production files.",
        highlights: [
          "3 Unique creative design directions",
          "Custom dieline layout & label design",
          "FSSAI and regulatory compliance layout",
          "Print-ready CMYK + spot foil vector files",
          "3D photorealistic digital e-com renders",
        ],
      },
      {
        name: "Full Product Line Collection",
        price: "₹1,20,000",
        period: "up to 5 SKUs",
        desc: "Cohesive packaging architecture across a full product range, variant jars, and unboxing shippers.",
        highlights: [
          "Consistent design system across 5 product variants",
          "Outer shipper box and unboxing tissue paper design",
          "Direct technical coordination with your packaging printer",
          "Complete suite of 3D renders for e-commerce and ads",
          "Full commercial vector copyright transfer",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you coordinate with our packaging printers?",
        a: "Yes. We review printer proofs, provide exact Pantone spot color specifications, and ensure print-ready vector dielines with bleed and crop marks to avoid costly printing errors.",
      },
      {
        q: "Do we get 3D renders for our website before physical printing is completed?",
        a: "Yes. We deliver studio-quality 3D digital renders in Blender so you can launch pre-orders and start running ads before your physical packaging arrives from the factory.",
      },
    ],
    projectSlugs: ["royal-rajwada-spices", "kamakesh-hair-elixir"],
  },
];
