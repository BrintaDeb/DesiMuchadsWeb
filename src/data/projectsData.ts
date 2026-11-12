export interface ProjectItem {
  id: number;
  slug: string;
  client: string;
  tagline: string;
  category: string;
  serviceId: string;
  heroStat: string;
  liveUrl: string;
  thumbnail: string;
  desc: string;
  mushkil: string;
  jugaad: string;
  nateeja: string;
  stats: { label: string; val: string }[];
  deliverables: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  accentColor: string;
  techStack: string[];
  year: string;
}

export const AGENCY_PROJECTS: ProjectItem[] = [
  // 1. SEO & SEM - Project 1: VedaRoots Ayurveda
  {
    id: 1,
    slug: "vedaroots-ayurveda",
    client: "VedaRoots Ayurveda",
    tagline: "High-Intent Google Search & Organic Topical Authority Dominance",
    category: "SEO & SEM Services",
    serviceId: "seo-sem",
    heroStat: "+420% ORGANIC TRAFFIC LIFT",
    liveUrl: "/demos/vedaroots-ayurveda",
    thumbnail: "https://images.unsplash.com/photo-1608248597359-54d762e8ea02?auto=format&fit=crop&w=800&q=80",
    desc: "VedaRoots is an authentic Ayurvedic wellness brand specializing in single-origin cold-pressed oils, adaptogenic tonics, and classical herb formulations.",
    mushkil:
      "VedaRoots was trapped paying ₹1,200+ per acquisition on generic Meta ads while competitors dominated Google Page 1 for high-intent search queries like 'authentic pure kshirabala oil' and 'cold-pressed sesame oil bulk'. Their technical site had 4.8s TTFB and 0 structured schema markup.",
    jugaad:
      "We executed an intense 60-day Technical SEO sprint: compressed Core Web Vitals to <0.7s, implemented complete Schema.org Medical & Product rich snippets, and published 42 clustered topical authority articles. Concurrently, we launched Google Performance Max and Exact-Match Search campaigns with negative keyword shields.",
    nateeja:
      "Ranked #1 for 1,420+ high-commercial search keywords. Organic traffic skyrocketed by +420%, while Google Ads generated ₹48L in profitable first-touch revenue at a 5.2x Search ROAS with CAC reduced by 64%.",
    stats: [
      { label: "Organic Traffic Lift", val: "+420%" },
      { label: "Search Ad ROAS", val: "5.2x" },
      { label: "Rank #1 SERP Keywords", val: "1,420+" },
      { label: "CAC Reduction", val: "-64%" },
    ],
    deliverables: [
      "Full Technical SEO & Core Web Vitals Optimization",
      "Commercial Keyword Clustering & Gap Analysis",
      "Google Search, PMax & Shopping Campaign Architecture",
      "42 High-Conversion Topical Authority Landing Pages",
      "Real-time Automated Negative Query Bidding Shield",
    ],
    testimonial: {
      quote:
        "Desi Muchads transformed Google from a money pit into our most profitable customer acquisition channel. We now own Page 1 for our most profitable Ayurvedic lines.",
      author: "Vaidya Rakesh Sharma",
      role: "Co-Founder, VedaRoots Ayurveda",
    },
    accentColor: "#10b981",
    techStack: ["Google Ads", "GA4", "Search Console", "Semrush", "Shopify"],
    year: "2023 - 2025",
  },

  // 2. SEO & SEM - Project 2: UrbanDrift EV Mobility
  {
    id: 2,
    slug: "urbandrift-ev",
    client: "UrbanDrift EV Mobility",
    tagline: "High-Ticket Commercial B2B Fleet Search Acquisition",
    category: "SEO & SEM Services",
    serviceId: "seo-sem",
    heroStat: "₹2.4CR PIPELINE · -48% CPA",
    liveUrl: "/demos/urbandrift-ev",
    thumbnail: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    desc: "UrbanDrift manufactures lightweight commercial electric cargo scooters for delivery fleets and urban gig operators.",
    mushkil:
      "UrbanDrift struggled with ultra-high lead costs on generic B2B portals and LinkedIn ads. Competitors bid aggressively on broad EV keywords, causing 80% of budget to leak into consumer tire-kicking inquiries rather than commercial fleet buyers.",
    jugaad:
      "We engineered an exact-match Google Search conquesting strategy targeting fleet managers, logistics directors, and franchise operators searching 'last-mile commercial EV lease' and 'delivery fleet electrification Delhi Mumbai'. We paired this with ultra-fast sub-second custom landing pages and dedicated commercial ROI calculators.",
    nateeja:
      "Generated ₹2.4Cr in verified fleet commercial pipeline within 90 days. Decreased Cost Per Acquisition by -48%, driving 110+ bulk vehicle test-ride bookings.",
    stats: [
      { label: "Commercial Pipeline", val: "₹2.4Cr" },
      { label: "Cost Per Acquisition", val: "-48%" },
      { label: "Fleet Test Bookings", val: "110+" },
      { label: "Qualified Intent Rate", val: "74%" },
    ],
    deliverables: [
      "Exact-Match B2B Commercial Google Search Funnels",
      "High-Converting EV Fleet ROI Landing Pages",
      "Negative Keyword Defense Matrix",
      "Google Call-Tracking & Offline Conversion Tracking",
    ],
    testimonial: {
      quote:
        "Their search conquesting strategy put us right in front of enterprise fleet directors when they were ready to sign purchase orders.",
      author: "Karan Singhal",
      role: "VP of Growth, UrbanDrift EV",
    },
    accentColor: "#38bdf8",
    techStack: ["Google Search Ads", "HubSpot CRM", "Next.js", "GA4"],
    year: "2024 - 2025",
  },

  // 3. Performance Marketing - Project 3: You & Me Photography
  {
    id: 3,
    slug: "you-and-me-photography",
    client: "You & Me Photography",
    tagline: "Luxury Documentary Wedding & Destination Visual Stories",
    category: "Performance Marketing Services",
    serviceId: "performance-marketing",
    heroStat: "6.4X BLENDED ROAS · ₹85L/MO GMV",
    liveUrl: "/demos/you-and-me-photography",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    desc: "Premier boutique wedding visual house documenting multi-crore destination ceremonies across Udaipur, Goa, and Europe.",
    mushkil:
      "Relying solely on word-of-mouth and static Instagram carousels that failed to attract premium multi-lakh destination couples during wedding planning off-seasons. Ad fatigue was rampant.",
    jugaad:
      "Re-engineered their media buying using Meta Advantage+ broad targeting, paired with high-hook cinematic documentary reels showing raw emotional vows and royal heritage aesthetics. Built an automated luxury calendar funnel with bespoke WhatsApp qualification.",
    nateeja:
      "Achieved a 6.4x inbound lead ROAS, scaling to ₹85L/mo in booked wedding contracts. Secured 24 multi-lakh palace wedding bookings within two quarters.",
    stats: [
      { label: "Inbound Lead ROAS", val: "6.4x" },
      { label: "Average Deal Size", val: "₹4.5L" },
      { label: "Destination Bookings", val: "24+" },
      { label: "Cost Per Qualified Lead", val: "₹410" },
    ],
    deliverables: [
      "Meta Advantage+ High-Ticket Wedding Funnel",
      "Cinematic 3-Second Hook Video Creative Refresh",
      "Automated WhatsApp Calendar VIP Concierge",
      "First-Party Conversions API Tracking",
    ],
    testimonial: {
      quote:
        "Desi Muchads completely changed our business. We went from stressing about wedding season bookings to having a waitlist of palace weddings.",
      author: "Amrit & Devika",
      role: "Lead Photographers & Founders",
    },
    accentColor: "#f59e0b",
    techStack: ["Meta Ads Manager", "WhatsApp API", "Stape CAPI", "Vercel"],
    year: "2023 - 2025",
  },

  // 4. Performance Marketing - Project 4: SnackNation Makhanas
  {
    id: 4,
    slug: "snacknation-makhanas",
    client: "SnackNation Makhanas",
    tagline: "High-Velocity D2C Superfood Scaling & Volume Bundling",
    category: "Performance Marketing Services",
    serviceId: "performance-marketing",
    heroStat: "5.8X BLENDED ROAS · ₹1.2CR 90-DAY",
    liveUrl: "/demos/snacknation-makhanas",
    thumbnail: "https://images.unsplash.com/photo-1621996346565-e3d5d6281084?auto=format&fit=crop&w=800&q=80",
    desc: "Roasted organic artisanal fox nuts (makhanas) in peri-peri, truffle, and Himalayan pink salt variants.",
    mushkil:
      "Single-pack purchase economics were unsustainable: average order value (AOV) was only ₹299 with a ₹220 customer acquisition cost, leaving zero margin after shipping.",
    jugaad:
      "We restructured their product catalog around 'Muchhad Party Bundles' (6-packs & 12-packs) with dynamic cart tiered pricing. Deployed ruthless Dynamic Creative Testing (DCT) with comedic unboxing reels and Desi chai-snacking hooks across Meta and YouTube Shorts.",
    nateeja:
      "AOV skyrocketed from ₹299 to ₹840 (+180%). Blended ROAS scaled to 5.8x across ₹1.2Cr in 90-day gross revenue with repeat customer replenishment rate reaching 38%.",
    stats: [
      { label: "Blended ROAS", val: "5.8x" },
      { label: "AOV Growth", val: "+180%" },
      { label: "90-Day GMV", val: "₹1.2Cr" },
      { label: "Repeat Order Rate", val: "38%" },
    ],
    deliverables: [
      "Dynamic Creative Testing Engine (12 creatives/mo)",
      "Tiered Volume Bundling Cart Architecture",
      "Shopify Plus Speed & Conversion Optimization",
      "Post-Purchase WhatsApp Re-Order Automation",
    ],
    testimonial: {
      quote:
        "The team at Desi Muchads didn't just run ads; they restructured our product offering so our unit economics actually worked at scale.",
      author: "Vikram Singhania",
      role: "Founder, SnackNation D2C",
    },
    accentColor: "#e11d48",
    techStack: ["Meta Ads Manager", "Triple Whale", "Shopify Plus", "Klaviyo"],
    year: "2024 - 2025",
  },

  // 5. Lead Generation - Project 5: Bharat Bio-Health
  {
    id: 5,
    slug: "bharat-bio-health",
    client: "Bharat Bio-Health",
    tagline: "B2B Medical Diagnostics & Clinic Franchise Qualification",
    category: "Lead Generation Services",
    serviceId: "lead-generation",
    heroStat: "₹3.2CR+ PIPELINE · ₹180 CPL",
    liveUrl: "/demos/bharat-bio-health",
    thumbnail: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    desc: "National biotechnology provider of automated clinical laboratory equipment and preventive molecular diagnostics.",
    mushkil:
      "High-ticket diagnostic systems costing ₹15L–₹40L each were suffering from prolonged 9-month sales cycles, high lead drop-offs, and cold outbound calling fatigue.",
    jugaad:
      "Constructed a high-intent B2B multi-tier qualification quiz offering free Diagnostic ROI Whitepapers. Synced with an automated WhatsApp conversational qualification bot that verified clinic bed count, monthly patient volume, and capital budget before scheduling executive consultations.",
    nateeja:
      "Generated ₹3.2Cr+ in verified high-ticket healthcare procurement pipeline within 4 months. Reduced Cost Per Lead to ₹180 with a 68% Sales Qualified Lead (SQL) pass rate.",
    stats: [
      { label: "Verified Pipeline", val: "₹3.2Cr+" },
      { label: "Cost Per Lead", val: "₹180" },
      { label: "Sales Qualified Rate", val: "68%" },
      { label: "Sales Cycle Speed", val: "-45%" },
    ],
    deliverables: [
      "Interactive B2B Diagnostic Procurement Quiz",
      "Instant WhatsApp Conversational Bot",
      "HubSpot CRM Two-Way Sync with Call Recording",
      "High-Authority Case Study Whitepaper Funnel",
    ],
    testimonial: {
      quote:
        "The leads coming through their WhatsApp system were pre-vetted laboratory directors with capital expenditure budgets ready to deploy.",
      author: "Dr. Ananya Sen",
      role: "Managing Director, Bharat Bio-Health",
    },
    accentColor: "#0ea5e9",
    techStack: ["Meta Lead Ads", "Wati WhatsApp", "HubSpot", "Make"],
    year: "2023 - 2025",
  },

  // 6. Lead Generation - Project 6: Sobha Heritage Villas
  {
    id: 6,
    slug: "sobha-heritage-villas",
    client: "Sobha Heritage Villas",
    tagline: "Ultra-Luxury Real Estate HNI Inbound Concierge",
    category: "Lead Generation Services",
    serviceId: "lead-generation",
    heroStat: "38 HNI BUYERS · 72% SQL",
    liveUrl: "/demos/sobha-heritage-villas",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    desc: "Ultra-luxury gated enclave of 48 bespoke Portuguese-Goan architectural villas priced from ₹4.5Cr upwards.",
    mushkil:
      "Generic property portal leads were plagued by brokers and unqualified aspirational inquiries. Sales directors were wasting hours fielding calls from buyers without verified liquidity.",
    jugaad:
      "Deployed geo-targeted Meta & Google search campaigns targeting Tier-1 tech founders, CXOs, and NRI business owners in Dubai and London. Built an exclusive gated 'Private Dossier & Drone Virtual Tour' access flow requiring OTP verification and net-worth self-attestation.",
    nateeja:
      "Captured 38 high-net-worth individual (HNI) verified site visits, closing 6 private villas representing over ₹28Cr in gross real estate sales within 120 days.",
    stats: [
      { label: "Verified HNI Site Visits", val: "38" },
      { label: "Gross Property Sold", val: "₹28Cr+" },
      { label: "Sales Qualified Rate", val: "72%" },
      { label: "CAC / Villa Sold", val: "0.4%" },
    ],
    deliverables: [
      "Gated Luxury Real Estate Dossier Funnel",
      "Private VIP Concierge WhatsApp Routing",
      "High-Net-Worth Precision Geo-Targeting",
      "Interactive 3D Masterplan Viewer Landing Page",
    ],
    testimonial: {
      quote:
        "Desi Muchads delivered the cleanest real estate pipeline we have seen in 15 years of luxury property development.",
      author: "Raghavendra Rao",
      role: "Sales Director, Heritage Villas",
    },
    accentColor: "#eab308",
    techStack: ["Google Search", "Meta Ads", "Zoho CRM", "Next.js"],
    year: "2024 - 2025",
  },

  // 7. Social Media - Project 7: ChaiChaska Premium CTC
  {
    id: 7,
    slug: "chaichaska-ctc",
    client: "ChaiChaska Premium Tea",
    tagline: "Viral Cultural Storytelling & Community Evangelism",
    category: "Social Media Services",
    serviceId: "social-media",
    heroStat: "+477% VIRAL ORGANIC REACH",
    liveUrl: "/demos/chaichaska-ctc",
    thumbnail: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    desc: "Artisanal Assam estate whole leaf tea and spiced tapri-style masala chai blends packaged for modern chai aficionados.",
    mushkil:
      "Brand account had flatlined with under 500 views per post, relying on boring stock photos of tea cups with generic 'Good Morning' captions that generated zero engagement.",
    jugaad:
      "We instituted our 'Desi Chai Tapri' video content engine: produced 16 high-hook reels per month focusing on the philosophy of cutting chai, office chai breaks, street tea masters, and ASMR pouring sounds with kinetic captions and dry humor.",
    nateeja:
      "Organic reach surged by +477%, generating over 14 Million organic reel views in 90 days. Community grew by 42,000 passionate tea lovers, driving a 3.4x spike in organic D2C website orders without spending a single Rupee on paid boosts.",
    stats: [
      { label: "Organic Reach Growth", val: "+477%" },
      { label: "Total Reel Views", val: "14M+" },
      { label: "New Brand Evangelists", val: "42,000" },
      { label: "Organic Order Lift", val: "3.4x" },
    ],
    deliverables: [
      "16 High-Hook Cinematic Cultural Reels per month",
      "Meme Marketing & Trend Jacking Strategy",
      "Community Comment-to-Conversion Seeding",
      "Micro-Influencer Gifting & Content Whitelisting",
    ],
    testimonial: {
      quote:
        "They turned our humble tea brand into an Internet obsession. People don't just buy our chai now; they share memes about it every morning.",
      author: "Pooja Deshmukh",
      role: "Chief Brand Officer, ChaiChaska",
    },
    accentColor: "#f97316",
    techStack: ["Instagram Reels", "YouTube Shorts", "CapCut Pro", "Shopify"],
    year: "2024 - 2025",
  },

  // 8. Social Media - Project 8: StreeThreads Handloom
  {
    id: 8,
    slug: "streethreads-handloom",
    client: "StreeThreads Handloom",
    tagline: "Weaver Heritage Documentaries & Creator Whitelisting",
    category: "Social Media Services",
    serviceId: "social-media",
    heroStat: "18.4% ENGAGEMENT · 3.8X ROAS",
    liveUrl: "/demos/streethreads-handloom",
    thumbnail: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    desc: "Fair-trade handloom saree and contemporary ethnic wear cooperative supporting traditional weavers in Varanasi and Maheshwar.",
    mushkil:
      "Fast-fashion copycats were flooding the market with cheap synthetic sarees, drowning out StreeThreads' authentic craftsmanship. Their social posts looked like an outdated catalog.",
    jugaad:
      "We sent our mobile docu-crew directly to Varanasi to film the rhythmic loom shuttles, master weavers, and the raw 40-day journey of weaving a single silk saree. We partnered with 25 classical Indian dance and textile creators for organic styling reels.",
    nateeja:
      "Achieved an astronomical 18.4% organic engagement rate (vs. 1.2% industry average). Micro-creator whitelisted ads generated 3.8x attribution ROAS, completely selling out three consecutive festival collections.",
    stats: [
      { label: "Organic Engagement", val: "18.4%" },
      { label: "Influencer Attribution ROAS", val: "3.8x" },
      { label: "Collections Sold Out", val: "3" },
      { label: "Weaver Families Supported", val: "140+" },
    ],
    deliverables: [
      "Heritage Weaver Documentary Content Series",
      "Micro-Creator Whitelisting Campaign",
      "Instagram Broadcast Channel Community Engine",
      "Live Festive Unboxing & Styling Showcases",
    ],
    testimonial: {
      quote:
        "Desi Muchads gave a voice to our handloom weavers. Their storytelling showed our customers why true craftsmanship is worth every single Rupee.",
      author: "Meenakshi Sundaram",
      role: "Managing Trustee, StreeThreads",
    },
    accentColor: "#ec4899",
    techStack: ["Instagram", "Premiere Pro", "Meta Ads", "Shopify"],
    year: "2023 - 2025",
  },

  // 9. E-Commerce - Project 9: LionelP Restaurant & Patisserie
  {
    id: 9,
    slug: "lionelp-restaurant",
    client: "LionelP Restaurant",
    tagline: "Artisanal French Patisserie & Fine Dining Storefront",
    category: "E-Commerce Services",
    serviceId: "ecommerce-services",
    heroStat: "+340% RESERVATION & ORDER LIFT",
    liveUrl: "/demos/lionelp-restaurant",
    thumbnail: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    desc: "High-end culinary patisserie and fine dining storefront in Mumbai serving artisanal viennoiseries, gourmet breads, and private dining bookings.",
    mushkil:
      "Traditional boutique restaurant needing modern online ordering, menu showcase, and high-ticket private dining reservations without losing artisanal French prestige. 3rd-party aggregators were charging 28% commissions.",
    jugaad:
      "Engineered a bespoke direct-ordering digital storefront on Next.js 16 with sub-800ms load speeds, interactive 3D pastry showcases, dynamic chef table booking slots, and automated VIP SMS/WhatsApp order status alerts.",
    nateeja:
      "Direct online gourmet ordering and private dining table reservations increased by +340%, reclaiming ₹32L/year in saved aggregator commissions while building an owned customer database of 18,000+ patrons.",
    stats: [
      { label: "Direct Reservation Lift", val: "+340%" },
      { label: "Aggregator Margin Saved", val: "28%" },
      { label: "Storefront Load Speed", val: "0.7s" },
      { label: "Repeat Order Rate", val: "42%" },
    ],
    deliverables: [
      "Custom Direct-to-Consumer Bakery Ordering Web App",
      "Private Dining Interactive Table Booking Flow",
      "Sub-800ms Core Web Vitals Optimization",
      "Direct WhatsApp Order Confirmations",
    ],
    testimonial: {
      quote:
        "The digital storefront created by Desi Muchads restored our margins and gave our patrons a dining reservation experience as refined as our pastries.",
      author: "Chef Lionel P.",
      role: "Executive Pastry Chef & Owner",
    },
    accentColor: "#ffffff",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    year: "2024 - 2025",
  },

  // 10. E-Commerce - Project 10: Pet-First Multi-Species
  {
    id: 10,
    slug: "pet-first-wellness",
    client: "Pet-First Multi-Species",
    tagline: "Veterinary Wellness Pharmacy & Subscription Calorie Planner",
    category: "E-Commerce Services",
    serviceId: "ecommerce-services",
    heroStat: "5.8X BLENDED ROAS · -32% CHURN",
    liveUrl: "/demos/pet-first-wellness",
    thumbnail: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80",
    desc: "Specialty veterinary nutrition, prescription dietary supplements, and recurring breed-specific wellness subscription boxes.",
    mushkil:
      "High subscription churn rate (48% dropping off after month 2) due to complicated pet dosage calculations, rigid subscription portals, and impersonal email reminder notifications.",
    jugaad:
      "We redesigned their customer portal with an interactive 'Pet Calorie & Dosage Calculator'. Implemented 1-click WhatsApp subscription modifications ('Pause, Swap, or Delay'), automated re-order reminders based on pet weight, and bundled veterinary telemedicine check-ins.",
    nateeja:
      "Active recurring subscriber churn plummeted by -32%. Blended ROAS scaled to 5.8x with customer lifetime value (LTV) surging by +85% over 12 months.",
    stats: [
      { label: "Blended ROAS", val: "5.8x" },
      { label: "Subscription Churn", val: "-32%" },
      { label: "LTV Expansion", val: "+85%" },
      { label: "Monthly Active Subs", val: "8,400+" },
    ],
    deliverables: [
      "Interactive Pet Nutrition & Dosage Calculator",
      "1-Click WhatsApp Subscription Management Portal",
      "Shopify Plus Subscriptions Integration",
      "Automated Veterinary Prescription Verification",
    ],
    testimonial: {
      quote:
        "Allowing pet parents to manage subscriptions through WhatsApp instead of a clunky login portal reduced our churn overnight.",
      author: "Dr. Siddharth Nair",
      role: "Founder, Pet-First Multi-Species",
    },
    accentColor: "#14b8a6",
    techStack: ["Shopify Plus", "Recharge Subscriptions", "Wati WhatsApp", "GA4"],
    year: "2023 - 2025",
  },

  // 11. Quick Commerce - Project 11: MithaiMagic Artisanal Sweets
  {
    id: 11,
    slug: "mithaimagic-sweets",
    client: "MithaiMagic Artisanal Sweets",
    tagline: "10-Minute Dark Store Domination Across Blinkit, Zepto & Instamart",
    category: "Quick Commerce Services",
    serviceId: "quick-commerce",
    heroStat: "8.4X FLASH ROAS · 10-MIN FULFILLMENT",
    liveUrl: "/demos/mithaimagic-sweets",
    thumbnail: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80",
    desc: "Artisanal dry fruit sweets, Kaju Katli, and festive mithai gift boxes packaged in vacuum-sealed luxury gift tins.",
    mushkil:
      "MithaiMagic missed festival revenue spikes because their stock was constantly out-of-stock in high-demand dark stores across Mumbai and Bangalore, causing algorithmic demotion on Zepto and Blinkit.",
    jugaad:
      "We mapped 85 high-density urban dark stores and instituted an automated stock-velocity replenishment system. Concurrently, we booked prime morning breakfast & festive gifting sponsored banners and targeted hyper-local pin codes with 8x flash bids during Rakhi and Diwali.",
    nateeja:
      "Zero stockout demotions across 85 micro dark-stores. Achieved an 8.4x Flash ROAS during festive quarters, generating over ₹1.8Cr in 10-minute quick commerce sales in under 60 days.",
    stats: [
      { label: "Festive Flash ROAS", val: "8.4x" },
      { label: "Dark Stores Active", val: "85+" },
      { label: "Stockout Incidents", val: "0" },
      { label: "Festive Q-Com Sales", val: "₹1.8Cr" },
    ],
    deliverables: [
      "Zepto, Blinkit & Swiggy Instamart Ingestion",
      "Algorithmic Dark Store Stock Forecasting Radar",
      "In-App Sponsored Search & Category Banners",
      "Hyper-Local Pin Code Flash Bidding Engine",
    ],
    testimonial: {
      quote:
        "Desi Muchads made sure our Kaju Katli was available in every South Bombay and Indiranagar dark store in under 10 minutes when families ordered.",
      author: "Aditya Agarwal",
      role: "Director, MithaiMagic",
    },
    accentColor: "#f59e0b",
    techStack: ["Zepto Portal", "Blinkit Brand Hub", "Swiggy Ad Central"],
    year: "2024 - 2025",
  },

  // 12. Quick Commerce - Project 12: PureGlow Organic Kombucha
  {
    id: 12,
    slug: "pureglow-kombucha",
    client: "PureGlow Organic Kombucha",
    tagline: "Cold-Chain Beverage Velocity & Checkout Impulse Carousels",
    category: "Quick Commerce Services",
    serviceId: "quick-commerce",
    heroStat: "4.2X VELOCITY · 18 MICRO-HUBS",
    liveUrl: "/demos/pureglow-kombucha",
    thumbnail: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
    desc: "Naturally fermented probiotic sparkling iced kombucha in ginger lemon, wild berry, and kokum flavors.",
    mushkil:
      "Cold-chain beverages face severe shelf life constraints. Initial inventory sent to quick commerce dark stores was languishing unnoticed on lower catalog pages, risking product expiration.",
    jugaad:
      "Negotiated featured placements in Blinkit's 'Chilled Drinks' and Zepto's 'Party Essentials' carousels. Optimized catalog imagery with bold macro moisture droplets and secured sponsored keyword search bids for 'healthy soda' and 'gut health drink'.",
    nateeja:
      "Daily per-store sell-through velocity accelerated by 4.2x across 18 metro micro-hubs. Achieved an 11-day average shelf clearance cycle with 0 expired inventory write-offs.",
    stats: [
      { label: "Sell-Through Velocity", val: "4.2x" },
      { label: "Shelf Clearance Cycle", val: "11 Days" },
      { label: "Inventory Write-Offs", val: "0%" },
      { label: "Dark Store Placement", val: "#1 Chilled" },
    ],
    deliverables: [
      "Cold-Chain Ingestion Compliance Setup",
      "In-App Checkout Impulse Placement Negotiation",
      "Sponsored Health Keyword Bidding Strategy",
      "Hyper-Local Pin-Code Inventory Rebalancing",
    ],
    testimonial: {
      quote:
        "They solved our cold-chain shelf life nightmare by putting our cans directly into consumer shopping baskets within 10 minutes of ordering.",
      author: "Kabir Mehra",
      role: "Co-Founder, PureGlow Kombucha",
    },
    accentColor: "#06b6d4",
    techStack: ["Blinkit Brand Hub", "Zepto Partner", "Swiggy Ads"],
    year: "2024 - 2025",
  },

  // 13. Web Development - Project 13: Darbar Fine Watches
  {
    id: 13,
    slug: "darbar-fine-watches",
    client: "Darbar Fine Watches",
    tagline: "Bespoke 3D Three.js Interactive Horology Flagship",
    category: "Web Development Services",
    serviceId: "web-development",
    heroStat: "<0.6S TTFB · 99 PAGESPEED",
    liveUrl: "/demos/darbar-fine-watches",
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    desc: "Luxury Indian independent horological studio creating bespoke mechanical timepieces with damascened steel and gold dials.",
    mushkil:
      "Their previous WordPress / WooCommerce site took 6.2 seconds to load high-resolution watch dials on mobile phones. Discerning collectors buying ₹1.8L+ timepieces were abandoning before seeing the movement mechanics.",
    jugaad:
      "Engineered a ground-up headless digital flagship on Next.js 16, TypeScript, and Three.js WebGL. Integrated an interactive 360-degree watch dial configurator with physical light refraction, sub-600ms TTFB on Indian 5G, and 1-click VIP Razorpay concierge checkout.",
    nateeja:
      "Scored a flawless 99/100 Google Mobile Core Web Vitals score. Time-to-First-Byte dropped to 580ms, boosting average session duration by +210% and driving 84 custom commission timepiece deposits within 60 days.",
    stats: [
      { label: "Time-To-First-Byte", val: "580ms" },
      { label: "Mobile PageSpeed", val: "99/100" },
      { label: "Session Duration Lift", val: "+210%" },
      { label: "Custom Deposits", val: "84 Orders" },
    ],
    deliverables: [
      "Bespoke Next.js 16 + React 19 Web Architecture",
      "Interactive Three.js 3D Watch Dial Configurator",
      "Sub-800ms Server-Side Partial Prerendering",
      "1-Click High-Ticket Razorpay Concierge Gateway",
    ],
    testimonial: {
      quote:
        "Our digital flagship now feels as meticulously handcrafted as our mechanical tourbillons. The speed and 3D interaction left our collectors stunned.",
      author: "Vikramaditya Roy",
      role: "Master Watchmaker & Founder",
    },
    accentColor: "#f59e0b",
    techStack: ["Next.js 16", "Three.js", "TypeScript", "Tailwind CSS", "Vercel"],
    year: "2024 - 2025",
  },

  // 14. Web Development - Project 14: KisaanDirect AgriTech
  {
    id: 14,
    slug: "kisaandirect-agri",
    client: "KisaanDirect AgriTech",
    tagline: "Vernacular Progressive Web App with 1-Click UPI Intent",
    category: "Web Development Services",
    serviceId: "web-development",
    heroStat: "4.8% CVR LIFT · 0.5S SPEED",
    liveUrl: "/demos/kisaandirect-agri",
    thumbnail: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80",
    desc: "Direct-from-farm organic staples, heritage grains, and unadulterated cold-pressed oils platform connecting rural cooperatives with urban households.",
    mushkil:
      "A large segment of their target audience accessed the site on low-end budget Android smartphones over unstable rural 3G/4G networks. Complex cart checkouts caused a 76% cart abandonment rate.",
    jugaad:
      "Built an ultra-lean Progressive Web App (PWA) with multi-lingual Hindi & English support, offline caching, and frictionless direct-to-UPI intent flows that bypass password entry or lengthy address typing.",
    nateeja:
      "E-commerce conversion rate surged from 1.6% to 4.8% (+200% lift). Zero checkout crashes reported across 120,000 monthly active users on low-spec mobile devices.",
    stats: [
      { label: "Conversion Rate", val: "4.8%" },
      { label: "Mobile Load Speed", val: "520ms" },
      { label: "Monthly Active Users", val: "120,000" },
      { label: "Checkout Drop-off", val: "-54%" },
    ],
    deliverables: [
      "Progressive Web App with Multi-Lingual Hindi/English",
      "Direct 1-Click UPI Deep-Link Intent Checkout",
      "Edge-Cached Sub-Second Asset Delivery",
      "Offline Cart Synchronization",
    ],
    testimonial: {
      quote:
        "Desi Muchads built an app that loads instantly even in the interior villages of MP. Our farmers and customers love the sheer simplicity.",
      author: "Harish Patel",
      role: "CEO, KisaanDirect",
    },
    accentColor: "#84cc16",
    techStack: ["Next.js", "PWA Service Workers", "Cashfree UPI", "Tailwind CSS"],
    year: "2023 - 2025",
  },

  // 15. Packaging & Label - Project 15: Royal Rajwada Spices
  {
    id: 15,
    slug: "royal-rajwada-spices",
    client: "Royal Rajwada Spices",
    tagline: "Heritage Gold Foil-Stamped Boxes & Amber Glass Jars",
    category: "Packaging & Label Designing Services",
    serviceId: "packaging-label",
    heroStat: "+480% SHELF IMPACT · NATIONAL RETAIL",
    liveUrl: "/demos/royal-rajwada-spices",
    thumbnail: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    desc: "Single-origin GI-tagged spice blends including Lakadong turmeric, Kashmiri saffron, and Malabar black pepper in luxury gift boxes.",
    mushkil:
      "Despite award-winning spice quality, their previous generic plastic pouch packaging looked cheap on retail supermarket shelves and failed to justify their premium ₹499 price point.",
    jugaad:
      "Created an iconic packaging architecture: bespoke octagonal tins with Rajputana filigree embossing, hot-stamped gold foil accents, and heavy amber UV-protective glass jars with hand-lettered botanical typography and full FSSAI legal compliance.",
    nateeja:
      "Secured immediate national retail distribution across Nature's Basket, Foodhall, and Le Marche. Online direct-to-consumer orders surged by +480%, while ad creative CTR jumped by +52% using 3D renders of the new packaging.",
    stats: [
      { label: "Direct Order Surge", val: "+480%" },
      { label: "Ad Creative CTR", val: "+52%" },
      { label: "National Retailers", val: "240+ Stores" },
      { label: "Packaging Awards", val: "2 National Wins" },
    ],
    deliverables: [
      "Structural Dieline & Octagonal Tin Box Design",
      "Hot-Stamped Gold Foil & Embossed Filigree Specs",
      "Amber Glass Jar Label Architecture with FSSAI Compliance",
      "3D Photorealistic Digital Renders for Ads & E-Com",
    ],
    testimonial: {
      quote:
        "The packaging designed by Desi Muchads transformed us from a local commodity spice into India's most coveted luxury culinary gift box.",
      author: "Mahaveer Rathore",
      role: "Founder, Royal Rajwada Spices",
    },
    accentColor: "#f59e0b",
    techStack: ["Adobe Illustrator", "Photoshop", "Blender 3D", "CAD Dielines"],
    year: "2023 - 2025",
  },

  // 16. Packaging & Label - Project 16: KamaKesh Ayurvedic Hair Elixir
  {
    id: 16,
    slug: "kamakesh-hair-elixir",
    client: "KamaKesh Ayurvedic Elixir",
    tagline: "Luxury Matte Soft-Touch Bottle & Embossed Gold Carton",
    category: "Packaging & Label Designing Services",
    serviceId: "packaging-label",
    heroStat: "+62% UNBOXING CVR · HIGH-TICKET PRESTIGE",
    liveUrl: "/demos/kamakesh-hair-elixir",
    thumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    desc: "High-ticket Ayurvedic scalp rejuvenation oil infused with 21 rare Himalayan herbs, priced at ₹2,400 per bottle.",
    mushkil:
      "Consumers hesitated to spend ₹2,400 online because the existing bottle looked like a standard ₹150 chemist hair oil. High unboxing returns were damaging brand equity.",
    jugaad:
      "Engineered an unforgettable sensory unboxing: custom frosted emerald-green glass dropper bottle with weighted brushed gold cap, housed inside a magnetic rigid box with soft-touch matte lamination, debossed Ayurvedic verse calligraphy, and scented inner parchment.",
    nateeja:
      "Unboxing video shares increased by +620% organically on Instagram. Conversion rate on high-ticket ad traffic increased by +62% and return rates dropped by 45%.",
    stats: [
      { label: "Ad Conversion Rate", val: "+62%" },
      { label: "Organic Unboxing Shares", val: "+620%" },
      { label: "Customer Return Rate", val: "-45%" },
      { label: "Average Order Value", val: "₹4,800" },
    ],
    deliverables: [
      "Custom Frosted Glass Bottle & Dropper Specifications",
      "Magnetic Rigid Luxury Unboxing Box with Soft-Touch",
      "Authentic Sanskrit Calligraphy & Gold Embossing",
      "Print-Ready CMYK + Pantone Spot Color Production Files",
    ],
    testimonial: {
      quote:
        "Holding our bottle now feels like holding a royal heirloom. Our customers constantly message us praising the weight and tactile luxury of the unboxing.",
      author: "Devratna Joshi",
      role: "Founder & Formulator, KamaKesh",
    },
    accentColor: "#10b981",
    techStack: ["Blender 3D", "Illustrator", "InDesign", "Pantone Formula Guide"],
    year: "2024 - 2025",
  },
];
