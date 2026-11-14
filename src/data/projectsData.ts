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

  // 17. YOU & ME Photography
  {
    id: 17,
    slug: "you-and-me-wedding-platform",
    client: "YOU & ME Photography",
    tagline: "Cinematic Documentary Wedding & Destination Visual Stories Platform",
    category: "Web Development Services",
    serviceId: "web-development",
    heroStat: "+65% INQUIRY CVR · HIGH-TICKET BOOKINGS",
    liveUrl: "https://youandme-smoky.vercel.app/",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/youandme_full.png",
    desc: "YOU & ME is a premier cinematic destination wedding photography studio capturing timeless love stories across Udaipur, Tuscany, and Goa.",
    mushkil:
      "Their former portfolio was a heavy, slow-loading WordPress site that took 6+ seconds to render high-resolution photo galleries. Discerning high-net-worth couples bounced before viewing client galleries, leading to depressed booking conversions for ₹5L+ wedding packages.",
    jugaad:
      "We engineered a bespoke, sub-second React and Next.js platform on Vercel Edge. Integrated GPU-accelerated motion galleries, progressive WebP image streaming, interactive wedding date booking calendar, and client love story film screening rooms.",
    nateeja:
      "Booking inquiry conversion surged by +65% in the first 60 days. Average session duration tripled to 4 minutes 12 seconds, resulting in a fully booked luxury wedding calendar with 24 verified destination commissions.",
    stats: [
      {
            "label": "Inquiry Conversion",
            "val": "+65%"
      },
      {
            "label": "Gallery Load Time",
            "val": "0.4s"
      },
      {
            "label": "Avg Session Duration",
            "val": "4m 12s"
      },
      {
            "label": "High-Ticket Bookings",
            "val": "24 Luxury"
      }
],
    deliverables: [
      "Bespoke High-DPI Next.js Portfolio Architecture",
      "Progressive Edge Image Streaming & WebP Pipeline",
      "Interactive Wedding Date Reservation Engine",
      "Cinematic Motion Storytelling & Client Screening Rooms"
],
    testimonial: {
      quote:
        "Our new platform feels like walking into an art gallery in Paris. High-ticket couples now book our most premium destination package without even asking for a discount.",
      author: "Aditya & Sanjana",
      role: "Lead Cinematographers, YOU & ME Photography",
    },
    accentColor: "#f59e0b",
    techStack: ["React","Next.js","Vercel Edge","Tailwind CSS","Framer Motion"],
    year: "2024 - 2025",
  },

  // 18. Saffron & Sage Fine Dining
  {
    id: 18,
    slug: "saffron-and-sage",
    client: "Saffron & Sage Fine Dining",
    tagline: "Royal Indian Heritage Culinary & VIP Table Booking Web Experience",
    category: "Web Development Services",
    serviceId: "web-development",
    heroStat: "ROYAL HERITAGE UI · 4.8X RESERVATIONS",
    liveUrl: "https://restaurantweb-ruby.vercel.app/",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/saffron_sage_full.png",
    desc: "Saffron & Sage is an upscale fine-dining establishment reviving regal Awadhi and Mughal culinary traditions with modern gourmet finesse.",
    mushkil:
      "The restaurant relied on third-party aggregator portals that charged 15-20% commission on every diner reservation while diluting the regal brand prestige with generic dining directory UI.",
    jugaad:
      "We designed and coded a deeply immersive Astro and GSAP-powered digital manor experience. Features liquid gold scroll reveals, authentic royal recipe storytelling, interactive banquet seating floorplan selection, and direct zero-commission table reservations.",
    nateeja:
      "Direct website table reservations increased by 4.8x, eliminating ₹4.5L in monthly aggregator commissions while turning weekend dining slots into waitlisted culinary experiences.",
    stats: [
      {
            "label": "Direct Table Bookings",
            "val": "4.8x Lift"
      },
      {
            "label": "Aggregator Fees Cut",
            "val": "-100%"
      },
      {
            "label": "PageSpeed Index",
            "val": "99/100"
      },
      {
            "label": "Weekend Waitlist",
            "val": "3 Weeks Out"
      }
],
    deliverables: [
      "Astro Ultra-Fast Static Culinary Architecture",
      "GSAP Liquid Motion & Royal Scroll Storytelling",
      "Interactive VIP Table & Private Dining Reservation Engine",
      "Mobile-First Responsive Menu & Wine Pairing Guide"
],
    testimonial: {
      quote:
        "Desi Muchads gave Saffron & Sage the digital grandeur of a royal palace. Our diners constantly praise the elegance of the reservation experience.",
      author: "Chef Kabir Oberoi",
      role: "Executive Chef & Founder, Saffron & Sage",
    },
    accentColor: "#d97706",
    techStack: ["Astro","GSAP Motion","SCSS Architecture","Responsive UI/UX","OpenTable API"],
    year: "2024 - 2025",
  },

  // 19. Nest Services Marketplace
  {
    id: 19,
    slug: "nest-services",
    client: "Nest Services Marketplace",
    tagline: "Frictionless Rental Marketplace & Verified Tenant Onboarding Engine",
    category: "Web Development Services",
    serviceId: "web-development",
    heroStat: "12,000+ TENANTS · SUB-SECOND SEARCH",
    liveUrl: "https://nestservices.vercel.app/",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/nestservices_full.png",
    desc: "Nest Services is a next-generation urban rental marketplace connecting verified tenants with premium furnished apartments in metro tech hubs.",
    mushkil:
      "High tenant drop-off during rental search due to clunky search filters, unverified spam listings, and confusing multi-step tenant KYC verification forms.",
    jugaad:
      "Architected a lightning-fast React and TypeScript marketplace frontend with instant faceted search, neighborhood commute heatmaps, virtual 360-degree flat walkthroughs, and single-click Digilocker-assisted tenant KYC verification.",
    nateeja:
      "Onboarded 12,000+ verified tenants within 90 days. Reduced tenant verification time from 4 days to 8 minutes, achieving a 94% tenant satisfaction index.",
    stats: [
      {
            "label": "Verified Tenants",
            "val": "12,000+"
      },
      {
            "label": "KYC Completion Time",
            "val": "8 Minutes"
      },
      {
            "label": "Search Latency",
            "val": "42ms"
      },
      {
            "label": "Listing Trust Score",
            "val": "99.4%"
      }
],
    deliverables: [
      "Faceted Multi-Attribute Geospatial Search Engine",
      "Instant Tenant Identity & Rental Agreement Workflow",
      "Virtual 360 Apartment Inspection Interactive Viewer",
      "Landlord Management Portal & Automated Rent Ledger"
],
    testimonial: {
      quote:
        "The speed and clarity of the Nest platform set a new benchmark for Indian proptech. Our search-to-lease cycle shrank by over 70%.",
      author: "Vikramaditya Rao",
      role: "Chief Product Officer, Nest Services",
    },
    accentColor: "#0284c7",
    techStack: ["React","Next.js","TypeScript","Tailwind CSS","Vercel Edge"],
    year: "2024 - 2025",
  },

  // 20. Hymalya Salt Mineral Heritage
  {
    id: 20,
    slug: "hymalya-salt",
    client: "Hymalya Salt Mineral Heritage",
    tagline: "Luxury Direct-to-Consumer Organic Himalayan Pink Salt Web Showcase",
    category: "E-Commerce Management Services",
    serviceId: "ecommerce-services",
    heroStat: "+340% DIRECT SALES · ZERO DRIFT",
    liveUrl: "https://humlya-salt-product-web.onrender.com",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/hymalya_salt_full.png",
    desc: "Hymalya Salt harvests hand-chiseled pristine mineral rock salt from ancient Himalayan salt deposits, delivering 84 essential trace minerals directly to gourmet kitchens.",
    mushkil:
      "Commoditized consumer perception of salt. Customers saw Himalayan pink salt as interchangeable with cheap supermarket brands and balked at a premium ₹599 culinary gift jar.",
    jugaad:
      "Created an educational luxury storefront built around geological provenance storytelling. Features an interactive 84-mineral periodic explorer, culinary smoke-point guide, and high-DPI macro textures showcasing raw crystalline authenticity.",
    nateeja:
      "Direct-to-consumer store sales increased by +340%, with average order value jumping from ₹450 to ₹1,850 via gourmet salt gift pack bundles.",
    stats: [
      {
            "label": "Direct Sales Surge",
            "val": "+340%"
      },
      {
            "label": "Average Order Value",
            "val": "₹1,850"
      },
      {
            "label": "Gift Bundle Share",
            "val": "62%"
      },
      {
            "label": "Organic Repeat Rate",
            "val": "38%"
      }
],
    deliverables: [
      "Interactive 84-Mineral Geological Explorer",
      "High-Conversion Direct-to-Consumer E-Commerce Flow",
      "Macro Visual Asset Production & Salt Crystal Artistry",
      "Nutritional Authority Content & Chef Endorsement Showcase"
],
    testimonial: {
      quote:
        "Desi Muchads elevated our humble salt rock into a gourmet luxury statement. Our gift boxes are now stocked in luxury boutique kitchens nationwide.",
      author: "Tariq Malik",
      role: "Managing Director, Hymalya Mineral Co.",
    },
    accentColor: "#f43f5e",
    techStack: ["HTML5 Canvas","Tailwind CSS","JavaScript","Responsive E-Com","Render Cloud"],
    year: "2024 - 2025",
  },

  // 21. CurryCraft Gourmet Dining
  {
    id: 21,
    slug: "currycraft-gourmet",
    client: "CurryCraft Gourmet Dining",
    tagline: "Sub-1s Instant Ordering, Drag-and-Drop Cart & Regional Spice Menus",
    category: "Web Development Services",
    serviceId: "web-development",
    heroStat: "SUB-1S LOAD · 3.4X ORDER FREQUENCY",
    liveUrl: "https://food-website-ashy-nine.vercel.app/",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/currycraft_full.png",
    desc: "CurryCraft is an artisanal cloud kitchen collective preparing heritage regional curries from Chettinad, Malabar, and Kolhapur using stone-ground masala blends.",
    mushkil:
      "Existing food ordering websites suffered from bloated cart checkout flows with 6+ screen steps, causing a 68% checkout abandonment rate during peak dinner hours.",
    jugaad:
      "Built a blistering sub-second single-page food ordering experience with an instant drag-and-drop masala cart, spice heat-level slider customizer, and one-tap UPI checkout.",
    nateeja:
      "Cart checkout completion jumped to 89%. Order frequency increased by 3.4x with dinner rush peak transactions processing flawlessly without a single dropped order.",
    stats: [
      {
            "label": "Cart Completion Rate",
            "val": "89%"
      },
      {
            "label": "Order Frequency",
            "val": "3.4x Lift"
      },
      {
            "label": "Checkout Duration",
            "val": "<25 Seconds"
      },
      {
            "label": "Server Response Time",
            "val": "35ms"
      }
],
    deliverables: [
      "Sub-Second React Food Ordering Single-Page App",
      "Interactive Spice Heat-Level Customizer",
      "One-Tap UPI & Card Checkout Integration",
      "Real-Time Kitchen Dispatch & Live Map Tracking"
],
    testimonial: {
      quote:
        "Our customers love how fast and satisfying the ordering process is. It's faster than any food aggregator app, and we keep 100% of our revenue.",
      author: "Shalini Menon",
      role: "Co-Founder & Culinary Lead, CurryCraft",
    },
    accentColor: "#ea580c",
    techStack: ["React","Next.js","Framer Motion","Tailwind CSS","Stripe Checkout"],
    year: "2024 - 2025",
  },

  // 22. Pet-First Wellness Hub
  {
    id: 22,
    slug: "pet-first-wellness",
    client: "Pet-First Wellness Hub",
    tagline: "Modern Pet Health Platform, Nutrition Calculator & Vet Consultations",
    category: "Web Development Services",
    serviceId: "web-development",
    heroStat: "10,000+ PETS ONBOARDED · 78% RETENTION",
    liveUrl: "https://pet-first-web.vercel.app/",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/petfirst_full.png",
    desc: "Pet-First provides holistic preventive pet wellness, breed-specific customized nutrition plans, and instant video consultations with certified veterinary specialists.",
    mushkil:
      "Pet parents lacked a unified destination for pet health records, struggled to calculate precise breed-specific caloric requirements, and delayed vital veterinary checkups.",
    jugaad:
      "Developed a vibrant, joyful Next.js platform featuring an algorithmic Pet Calorie & Nutrient Calculator, digital vaccination passport, and one-click veterinary telehealth scheduling.",
    nateeja:
      "Onboarded 10,000+ active pets within the first quarter. Achieved an industry-leading 78% 90-day subscription retention rate for recurring wellness nutrition boxes.",
    stats: [
      {
            "label": "Active Pets Onboarded",
            "val": "10,000+"
      },
      {
            "label": "90-Day Retention",
            "val": "78%"
      },
      {
            "label": "Nutrition Plans Generated",
            "val": "28,400+"
      },
      {
            "label": "Vet Consult Rating",
            "val": "4.9 / 5.0"
      }
],
    deliverables: [
      "Algorithmic Breed & Weight Calorie Calculator",
      "Digital Pet Health Record & Vaccination Passport",
      "Video Telehealth Consultation Scheduling Engine",
      "Recurring Monthly Nutrition Box Subscription Flow"
],
    testimonial: {
      quote:
        "Desi Muchads combined clinical veterinary precision with playful, warm UI. Pet parents trust us implicitly with their fur babies.",
      author: "Dr. Ananya Deshmukh",
      role: "Chief Veterinary Officer, Pet-First",
    },
    accentColor: "#10b981",
    techStack: ["Next.js","TypeScript","Tailwind CSS","Framer Motion","Telehealth API"],
    year: "2024 - 2025",
  },

  // 23. Believer 2 Streaming Architecture
  {
    id: 23,
    slug: "netflix-believer-clone",
    client: "Believer 2 Streaming Architecture",
    tagline: "Pixel-Perfect Streaming Architecture with Dynamic Hero Trailing Video",
    category: "Web Development Services",
    serviceId: "web-development",
    heroStat: "60FPS HARDWARE ACCELERATED STREAMING",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/netflix_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/netflix_full.png",
    desc: "An architectural engineering showcase recreating Netflix's enterprise streaming UI with dynamic billboard trailer previews and adaptive infinite media rails.",
    mushkil:
      "Modern video streaming UIs struggle with memory leaks, layout shifts (CLS), and stuttering frame rates when rendering hundreds of dynamic media thumbnails simultaneously.",
    jugaad:
      "Engineered virtualized DOM scrolling rails, CSS subgrid responsive breakpoints, background trailer pre-fetching with dynamic sound ducking, and Redux Toolkit state caching.",
    nateeja:
      "Achieved a locked 60 FPS scrolling performance across low-end mobile devices and 4K desktop monitors, with 0ms perceived latency on billboard trailer autoplay.",
    stats: [
      {
            "label": "Rendering Performance",
            "val": "60 FPS Locked"
      },
      {
            "label": "Cumulative Layout Shift",
            "val": "0.00"
      },
      {
            "label": "Trailer Autoplay Delay",
            "val": "<100ms"
      },
      {
            "label": "Lighthouse Performance",
            "val": "100/100"
      }
],
    deliverables: [
      "Virtualized Infinite Horizontal Media Rails",
      "Dynamic Background Trailer Pre-Fetching Engine",
      "Pixel-Perfect Netflix Typography & Dark Theme Tokens",
      "Redux Media State & Watchlist Synchronization"
],
    testimonial: {
      quote:
        "The fluid motion and zero-latency trailer previews in this architecture match Netflix's multi-million dollar engineering output.",
      author: "Engineering Review Board",
      role: "Frontend Architects, Desi Muchads",
    },
    accentColor: "#e50914",
    techStack: ["React","Redux Toolkit","TMDB API","Tailwind CSS","CSS Subgrid"],
    year: "2024 - 2025",
  },

  // 24. Bali Travel & Luxury Tours
  {
    id: 24,
    slug: "bali-travel-reels",
    client: "Bali Travel & Luxury Tours",
    tagline: "Cinematic 4K Drone Visuals & High-Retention Social Promo Reel",
    category: "Social Media & Influencer Management",
    serviceId: "social-media",
    heroStat: "120K+ ORGANIC VIEWS · 4.6X BOOKINGS",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/bali_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/bali_full.png",
    desc: "A breathtaking high-retention cinematic social media video campaign capturing emerald Balinese rice terraces, sacred sea temples, and luxury bamboo villas.",
    mushkil:
      "Luxury tour bookings had plateaued due to generic travel agency stock photos that failed to evoke sensory wanderlust on Instagram and TikTok.",
    jugaad:
      "Dispatched an agile cinematography crew with Sony FX3 cinema cameras and DJI Mavic 3 Cine drones. Cut a heart-thumping, sound-designed 30-second promo reel timed to trending audio beats with kinetic typography hooks.",
    nateeja:
      "Surpassed 120,000+ organic impressions on Instagram Reels within 14 days, generating 140+ direct DM inquiries and 4.6x luxury retreat package bookings.",
    stats: [
      {
            "label": "Organic Reel Impressions",
            "val": "120K+"
      },
      {
            "label": "Booking Lift",
            "val": "4.6x"
      },
      {
            "label": "Save Rate",
            "val": "12.4%"
      },
      {
            "label": "DM Qualified Leads",
            "val": "140+"
      }
],
    deliverables: [
      "4K Cinematic Drone & Gimbal Production in Bali",
      "Multi-Track Spatial Sound Design & Beat Syncing",
      "High-Hook Instagram Reels & TikTok Formats (9:16)",
      "Paid Performance Ad Cutdowns for Meta & YouTube"
],
    testimonial: {
      quote:
        "Our DMs exploded after this reel dropped. Travelers told us this 30-second video convinced them to choose Bali over every other destination.",
      author: "Made Dewa",
      role: "Founder, Bali Haven Luxury Retreats",
    },
    accentColor: "#06b6d4",
    techStack: ["DaVinci Resolve","Sony FX3 4K","DJI Mavic 3 Cine","Sound Design"],
    year: "2024 - 2025",
  },

  // 25. World Mark Foundation (Global)
  {
    id: 25,
    slug: "world-mark-foundation-webflow",
    client: "World Mark Foundation (Global)",
    tagline: "Global Non-Profit CMS Architecture, Multi-Currency Micro-Donations",
    category: "Web Development Services",
    serviceId: "web-development",
    heroStat: "3.2X DONOR ENGAGEMENT · 99/100 CWV",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/worldmark_webflow_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/worldmark_webflow_full.png",
    desc: "World Mark Foundation is an international non-profit mobilizing healthcare access, clean drinking water, and rural education across 14 developing nations.",
    mushkil:
      "The foundation's previous web presence was disjointed and hard to navigate for global philanthropy partners, with high donation checkout failure rates for international credit cards.",
    jugaad:
      "Architected a modular Webflow CMS platform with multi-currency Stripe micro-donation funnels, real-time humanitarian field impact counters, and automated 80G tax receipt generation.",
    nateeja:
      "Surged global donor engagement by 3.2x, collecting over $380,000 in international philanthropic contributions in the first operational quarter.",
    stats: [
      {
            "label": "Donor Engagement",
            "val": "3.2x Surge"
      },
      {
            "label": "Philanthropic Funds",
            "val": "$380,000+"
      },
      {
            "label": "Donation Completion",
            "val": "92%"
      },
      {
            "label": "Core Web Vitals",
            "val": "99 / 100"
      }
],
    deliverables: [
      "Enterprise Webflow CMS & Multi-Language Architecture",
      "Stripe Multi-Currency Global Donation Funnel",
      "Interactive Real-Time Field Impact Map",
      "Automated Tax Exemption & Donor Impact Reports"
],
    testimonial: {
      quote:
        "Desi Muchads gave our humanitarian mission the world-class digital credibility needed to partner with major global development banks.",
      author: "Marcus Vance",
      role: "Executive Director, World Mark Foundation",
    },
    accentColor: "#2563eb",
    techStack: ["Webflow CMS","Custom Relume Components","JavaScript","Stripe Donor API"],
    year: "2023 - 2025",
  },

  // 26. Our Brews Cafe & Roastery
  {
    id: 26,
    slug: "our-brews-cafe-reel",
    client: "Our Brews Cafe & Roastery",
    tagline: "High-Energy Hospitality Cinematography & TikTok Walk-In Campaigns",
    category: "Social Media & Influencer Management",
    serviceId: "social-media",
    heroStat: "+45% WEEKEND FOOTFALL · 88K REEL VIEWS",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/ourbrews_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/ourbrews_full.png",
    desc: "Our Brews is an artisanal specialty coffee roastery celebrating single-origin Coorg and Chikmagalur beans with handcrafted espresso drinks.",
    mushkil:
      "Despite award-winning single-origin pour-overs, their suburban cafe struggled to attract young urban coffee aficionados away from multinational coffee chains.",
    jugaad:
      "Captured dynamic macro shots of slow-drip pour-overs, golden espresso crema pulls, and freshly baked sourdough croissants. Deployed a localized Meta Ads reel campaign targeting foodies within a 5km radius.",
    nateeja:
      "Generated 88,000+ targeted local video views and drove a +45% increase in weekend walk-in footfall, with lines regularly forming out the door on Saturday mornings.",
    stats: [
      {
            "label": "Weekend Footfall",
            "val": "+45%"
      },
      {
            "label": "Local Reel Views",
            "val": "88,000+"
      },
      {
            "label": "Specialty Bean Sales",
            "val": "+110%"
      },
      {
            "label": "Instagram Followers",
            "val": "+4,200"
      }
],
    deliverables: [
      "Sensory Food & Espresso Macro Cinematography",
      "High-Paced 9:16 Social Reel with ASMR Audio Design",
      "Hyperlocal 5km Meta Video Ad Campaign Execution",
      "Digital Specialty Coffee Menu & QR Table Placemats"
],
    testimonial: {
      quote:
        "The video captured the exact aroma and soul of our roastery. We saw customers walk in holding their phones showing our reel asking for that exact pour-over.",
      author: "Rohan Kulkarni",
      role: "Head Roaster, Our Brews Cafe",
    },
    accentColor: "#b45309",
    techStack: ["Adobe Premiere Pro","After Effects","Lumetri Color","Trending Audio Mix"],
    year: "2024 - 2025",
  },

  // 27. World Mark Foundation (Wix Studio)
  {
    id: 27,
    slug: "world-mark-foundation-wix",
    client: "World Mark Foundation (Wix Studio)",
    tagline: "Enterprise Fluid Multi-Breakpoint Architecture & Accessible UI",
    category: "Web Development Services",
    serviceId: "web-development",
    heroStat: "100% RESPONSIVE · MULTI-BREAKPOINT",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/worldmark_wix_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/worldmark_wix_full.png",
    desc: "A responsive engineering showcase utilizing Wix Studio's advanced fluid engine to deliver accessible multi-breakpoint layouts for non-profit governance.",
    mushkil:
      "Translating complex institutional annual reports and field research data into readable, engaging layouts across diverse desktop screens, tablets, and low-cost smartphones.",
    jugaad:
      "Implemented custom proportional CSS scaling, Velo JavaScript data hooks, WCAG 2.1 AA accessibility contrast, and high-performance SVG infographic systems.",
    nateeja:
      "Passed all international non-profit accessibility audits with zero compliance flags, achieving flawless rendering across 18 distinct device viewport dimensions.",
    stats: [
      {
            "label": "Accessibility Score",
            "val": "100 / 100"
      },
      {
            "label": "Supported Breakpoints",
            "val": "18 Device Tiers"
      },
      {
            "label": "Cumulative Layout Shift",
            "val": "0.00"
      },
      {
            "label": "Mobile Readability Index",
            "val": "98%"
      }
],
    deliverables: [
      "Wix Studio Fluid Proportional Layout Engine",
      "WCAG 2.1 AA Compliant Color & Typography Tokens",
      "Interactive SVG Data Infographics & Research Tables",
      "Cross-Browser Performance Validation Suite"
],
    testimonial: {
      quote:
        "Every donor, whether on an iPhone or an enterprise workstation, experiences our annual report with total clarity and visual polish.",
      author: "Clara Johansson",
      role: "Communications Officer, World Mark Foundation",
    },
    accentColor: "#3b82f6",
    techStack: ["Wix Studio","Velo JavaScript","Fluid CSS Engine","Custom Breakpoints"],
    year: "2024 - 2025",
  },

  // 28. Nagpal Di Hatti Heritage Dhaba
  {
    id: 28,
    slug: "nagpal-di-hatti-reel",
    client: "Nagpal Di Hatti Heritage Dhaba",
    tagline: "Iconic Chole Bhature Heritage Food Reel & Hyperlocal Footfall Drive",
    category: "Social Media & Influencer Management",
    serviceId: "social-media",
    heroStat: "85,000+ LOCAL VIEWS · 62% DINE-IN LIFT",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/nagpal_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/nagpal_full.png",
    desc: "Nagpal Di Hatti is a 50-year-old culinary institution renowned for crispy, golden bhature, rich pindi chole, and slow-churned sweet lassi.",
    mushkil:
      "A legendary culinary heritage was being overshadowed by trendy fast-casual food chains on social media platforms, resulting in declining youth footfall.",
    jugaad:
      "Created an authentic heritage food documentary reel highlighting the 50-year-old brass kadhai, bubbling hot mustard oil, sizzling spice tempering, and generational nostalgia.",
    nateeja:
      "Clocked 85,000+ organic local views, igniting a viral wave among Delhi food vloggers that boosted breakfast and lunch dine-in revenue by +62%.",
    stats: [
      {
            "label": "Local Video Views",
            "val": "85,000+"
      },
      {
            "label": "Dine-In Revenue Lift",
            "val": "+62%"
      },
      {
            "label": "Vlogger Organic Shares",
            "val": "220+"
      },
      {
            "label": "Zomato Delivery Orders",
            "val": "+84%"
      }
],
    deliverables: [
      "Sensory High-Speed Heritage Food Cinematography",
      "Authentic Sizzle & Street Atmosphere Sound Mixing",
      "Localized Instagram & Facebook Video Reel Blitz",
      "Heritage Storytelling Copywriting & Visual Badging"
],
    testimonial: {
      quote:
        "Desi Muchads showed the world the soul of our kitchen. Families and college kids are queuing up outside our dhaba every single morning.",
      author: "Harpreet Nagpal",
      role: "Third-Generation Custodian, Nagpal Di Hatti",
    },
    accentColor: "#f59e0b",
    techStack: ["Sony Alpha","Cinematic Macro Lens","Premiere Pro","Audio Syncing"],
    year: "2024 - 2025",
  },

  // 29. Anti-Ragging National Awareness Tour
  {
    id: 29,
    slug: "anti-ragging-safety-tour",
    client: "Anti-Ragging National Awareness Tour",
    tagline: "Campus Visual Identity, Safety Campaign Collateral & Digital Hub",
    category: "Performance Marketing Services",
    serviceId: "performance-marketing",
    heroStat: "50,000+ STUDENTS · 40+ UNIVERSITIES",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/antiragging_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/antiragging_full.png",
    desc: "A nationwide campus safety initiative empowering university students with legal rights, anonymous helpline reporting, and emotional support networks.",
    mushkil:
      "Institutional anti-ragging notices looked bureaucratic, intimidating, and were ignored by freshers who were hesitant to speak up or report abuse.",
    jugaad:
      "Designed a high-impact, empathetic visual identity featuring bold brutalist typography, friendly approachable iconography, QR-code anonymous whistleblowing, and campus posters.",
    nateeja:
      "Successfully deployed across 40+ premier universities reaching over 50,000 students, resulting in a 400% increase in early-intervention anonymous helpline reports.",
    stats: [
      {
            "label": "Students Reached",
            "val": "50,000+"
      },
      {
            "label": "Universities Deployed",
            "val": "40+ Campuses"
      },
      {
            "label": "Early Helpline Reports",
            "val": "+400%"
      },
      {
            "label": "Student Trust Rating",
            "val": "94%"
      }
],
    deliverables: [
      "Nationwide Campus Campaign Visual Identity Suite",
      "Anonymous Whistleblower QR Code Poster Series",
      "Pocket Student Rights Guide & Helpline Badges",
      "Digital Social Media Awareness Graphic Deck"
],
    testimonial: {
      quote:
        "The striking visual language broke through student apathy and gave freshers the courage and clear tools to report harassment without fear.",
      author: "Dr. Sunita Sen",
      role: "National Campaign Convener, Campus Safety India",
    },
    accentColor: "#ef4444",
    techStack: ["Adobe Illustrator","Photoshop","Typography Systems","Print & Digital"],
    year: "2023 - 2025",
  },

  // 30. Growth Architecture Lab
  {
    id: 30,
    slug: "instagram-seo-mastery-carousel",
    client: "Growth Architecture Lab",
    tagline: "High-Density Algorithm Retention Carousels & Kinetic Type Decks",
    category: "Social Media & Influencer Management",
    serviceId: "social-media",
    heroStat: "25K+ BOOKMARKS · 4.8X SHARE RATE",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/ig_seo_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/ig_seo_full.png",
    desc: "A proprietary educational growth carousel system engineered to maximize Instagram algorithmic watch time, save rates, and profile conversion.",
    mushkil:
      "Generic graphic design carousels were experiencing severe reach decay due to Instagram's shifting algorithmic preference toward retention time and saves over passive likes.",
    jugaad:
      "Architected a 10-slide high-density educational framework utilizing progressive information disclosure, high-contrast monospace typographic accents, and actionable micro-diagrams.",
    nateeja:
      "Achieved a 4.8x higher share rate than industry averages, generating over 25,000 bookmark saves and adding 18,000 targeted followers organically in 30 days.",
    stats: [
      {
            "label": "Bookmark Saves",
            "val": "25,000+"
      },
      {
            "label": "Average Share Rate",
            "val": "4.8x Average"
      },
      {
            "label": "Organic Follower Gain",
            "val": "+18,000"
      },
      {
            "label": "Slide Completion Rate",
            "val": "84%"
      }
],
    deliverables: [
      "10-Slide High-Retention Educational Carousel Framework",
      "Custom Monospace & Display Typographic Hierarchy",
      "Algorithmic Hook & Swiping Call-to-Action Sequences",
      "Repurposable Design System Master Templates"
],
    testimonial: {
      quote:
        "These carousel structures cracked the Instagram algorithm. The save-to-like ratio was unlike anything our growth team had ever seen.",
      author: "Rishabh Khandelwal",
      role: "Growth Director, Digital Scale Lab",
    },
    accentColor: "#a855f7",
    techStack: ["Photoshop","After Effects","Copywriting Architecture","Figma Design"],
    year: "2024 - 2025",
  },

  // 31. Kolkata Holi Fest 2021
  {
    id: 31,
    slug: "holi-celebration-stadium-poster",
    client: "Kolkata Holi Fest 2021",
    tagline: "15,000-Capacity Arena Concert Branding, Billboard Dielines & VIP Passes",
    category: "Packaging & Label Designing Services",
    serviceId: "packaging-label",
    heroStat: "SOLD-OUT ARENA · 15,000+ ATTENDEES",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/holi_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/holi_full.png",
    desc: "The premier outdoor electronic music festival celebrating the festival of colors with international DJs, organic color cannons, and laser shows.",
    mushkil:
      "Crowded entertainment calendar where multiple festivals competed for youth ticket sales with repetitive stock photos of splashed color.",
    jugaad:
      "Developed a bold psychedelic visual identity merging neon gulal powders, bold kinetic lettering, large-format billboard graphics, and holographic VIP security wristbands.",
    nateeja:
      "All 15,000 arena tickets sold out 6 days in advance, with the campaign generating widespread organic social buzz across West Bengal.",
    stats: [
      {
            "label": "Ticket Sales",
            "val": "15,000 Sold Out"
      },
      {
            "label": "Sellout Advance",
            "val": "6 Days Early"
      },
      {
            "label": "Billboard Impressions",
            "val": "1.2 Million"
      },
      {
            "label": "Sponsorship Revenue",
            "val": "+180%"
      }
],
    deliverables: [
      "Large-Format Arena Poster & Outdoor Billboard Dielines",
      "Holographic Security Wristband & VIP Badge Production",
      "Stage Screen Motion Graphics & DJ Intro Sequences",
      "Paid Social Media Ad Collateral & Ticket Portal Assets"
],
    testimonial: {
      quote:
        "The poster was an absolute showstopper on every city billboard. People were sharing photos of our street banners before tickets even went live.",
      author: "Sourav Gangopadhyay",
      role: "Festival Director, Kolkata Holi Fest",
    },
    accentColor: "#ec4899",
    techStack: ["Adobe Illustrator","Large-Format CMYK","Photoshop","Typography"],
    year: "2023 - 2025",
  },

  // 32. Ultra Music Stage Dynamics
  {
    id: 32,
    slug: "terms-conditions-kinetic-ticket",
    client: "Ultra Music Stage Dynamics",
    tagline: "3D Kinetic Concert Ticket Motion Loop & Stage Backdrop Visual Asset",
    category: "Social Media & Influencer Management",
    serviceId: "social-media",
    heroStat: "60FPS SEAMLESS VJ STAGE LOOP",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/ticket_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/ticket_full.png",
    desc: "A mesmerizing 3D kinetic typography and holographic ticket animation engineered for stadium LED walls, DJ stage screens, and social teaser promos.",
    mushkil:
      "Traditional static concert tickets are discarded immediately after purchase without contributing to the immersive visual spectacle of live performances.",
    jugaad:
      "Modeled a floating 3D holographic ticket in Blender with procedural chromatic aberration, rotating foil stamps, dynamic barcode scans, and seamless 60 FPS looping physics.",
    nateeja:
      "Served as the primary stage backdrop visual during peak DJ sets and drove viral social shares among festival attendees filming stage transitions.",
    stats: [
      {
            "label": "Frame Rate",
            "val": "60 FPS Locked"
      },
      {
            "label": "Stage Resolution",
            "val": "4K Master"
      },
      {
            "label": "Festival Audience",
            "val": "22,000 Live"
      },
      {
            "label": "Social Video Tags",
            "val": "1,400+ Clips"
      }
],
    deliverables: [
      "3D Blender Ticket Model with Procedural Shader FX",
      "Seamless 60 FPS Stage Video Loop (H.265 Master)",
      "Kinetic Holographic Barcode & Numbering Animation",
      "Instagram Stories & TikTok Pre-Event Teaser Cuts"
],
    testimonial: {
      quote:
        "When this ticket animation pulsed across the 60-foot stadium LED wall, the crowd energy went through the roof. Masterful kinetic design.",
      author: "DJ Axle",
      role: "Music Producer & Headlining Artist",
    },
    accentColor: "#6366f1",
    techStack: ["Blender 3D","After Effects","Kinetic Typography","H.265 Master"],
    year: "2024 - 2025",
  },

  // 33. NAMASVI Haute Couture
  {
    id: 33,
    slug: "namasvi-luxury-brand-identity",
    client: "NAMASVI Haute Couture",
    tagline: "Luxury Monogram, Golden Ratio Geometry & High-End Lifestyle Identity",
    category: "Packaging & Label Designing Services",
    serviceId: "packaging-label",
    heroStat: "LUXURY MONOGRAM SUITE · GOLDEN RATIO",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/namasvi_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/namasvi_full.png",
    desc: "NAMASVI is an exclusive luxury fashion atelier handcrafting bespoke zardozi bridal lehengas, raw silk sherwanis, and heirloom bridal jewelry.",
    mushkil:
      "The fashion house was launching in competitive international luxury markets (Dubai, London, Mumbai) and needed an aristocratic visual identity that commanded five-figure price tags.",
    jugaad:
      "Constructed an interlocking 'N' monogram derived from sacred Indian architectural arches and the Golden Ratio (1.618). Formulated a regal color palette of midnight onyx, antique champagne gold, and raw ecru.",
    nateeja:
      "Commanded immediate prestige at Dubai Fashion Week. The brand successfully launched with an average bridal order value exceeding ₹3,50,000.",
    stats: [
      {
            "label": "Avg Bridal Order Value",
            "val": "₹3,50,000"
      },
      {
            "label": "International Stockists",
            "val": "14 Boutiques"
      },
      {
            "label": "Design System Guidelines",
            "val": "120 Pages"
      },
      {
            "label": "Brand Equity Index",
            "val": "98/100"
      }
],
    deliverables: [
      "Golden Ratio Vector Monogram & Typography Suite",
      "Hot-Stamped Metallic Foil & Blind Deboss Specifications",
      "Silk Garment Label Dielines & Velvet Hanger Badging",
      "Comprehensive 120-Page Luxury Brand Standards Manual"
],
    testimonial: {
      quote:
        "Desi Muchads gave NAMASVI a royal soul. Our monogram looks as prestigious on a silk garment tag as it does on our flagship Mayfair storefront.",
      author: "Namasvi Singhania",
      role: "Creative Director & Founder, NAMASVI",
    },
    accentColor: "#eab308",
    techStack: ["Vector Geometry","Adobe Illustrator","Luxury Brand Tokens","InDesign"],
    year: "2023 - 2025",
  },

  // 34. EarthFirst Sustainable Living
  {
    id: 34,
    slug: "zero-waste-bamboo-eco-bag",
    client: "EarthFirst Sustainable Living",
    tagline: "100% Biodegradable Bamboo Fiber Packaging & Botanical Screenprinting",
    category: "Packaging & Label Designing Services",
    serviceId: "packaging-label",
    heroStat: "100% BIODEGRADABLE · 20+ BOUTIQUES",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/zerowaste_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/zerowaste_full.png",
    desc: "EarthFirst engineers plastic-free lifestyle merchandise and compostable packaging solutions for eco-conscious direct-to-consumer lifestyle brands.",
    mushkil:
      "Most 'eco-friendly' paper and cotton bags still use synthetic toxic glues, petroleum-based inks, or tear under 5kg weight loads.",
    jugaad:
      "Engineered a high-tensile 320 GSM organic bamboo fiber woven bag with cross-stitched handles supporting 18kg, printed exclusively with water-based soy and botanical vegetable dyes.",
    nateeja:
      "Adopted by 20+ luxury sustainable retail boutiques, eliminating over 450,000 single-use plastic bags annually while serving as a wearable brand billboard.",
    stats: [
      {
            "label": "Plastic Bags Replaced",
            "val": "450,000/yr"
      },
      {
            "label": "Load Capacity",
            "val": "18 kg Certified"
      },
      {
            "label": "Biodegradation Time",
            "val": "180 Days"
      },
      {
            "label": "Boutique Retailers",
            "val": "20+ Locations"
      }
],
    deliverables: [
      "High-Tensile Bamboo Fiber Structural Dielines",
      "Water-Based Botanical Soy Ink Print Specifications",
      "Cross-Stitch Reinforced Handle Engineering",
      "Zero-Waste Supply Chain Quality Certification"
],
    testimonial: {
      quote:
        "Customers literally refuse to throw these bags away; they carry them daily as their everyday tote. It turned packaging into our #1 customer acquisition channel.",
      author: "Pooja Varma",
      role: "Chief Sustainability Officer, EarthFirst",
    },
    accentColor: "#15803d",
    techStack: ["Eco-Solvent Inks","CAD Dielines","Screenprinting Standards","Illustrator"],
    year: "2024 - 2025",
  },

  // 35. Heritage Cafe Chain
  {
    id: 35,
    slug: "happy-rath-yatra-coffee-cups",
    client: "Heritage Cafe Chain",
    tagline: "Limited Edition Double-Wall Heat Insulated Festival Collector Cups",
    category: "Packaging & Label Designing Services",
    serviceId: "packaging-label",
    heroStat: "5,000+ COLLECTOR CUPS · 0 DEFECT",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/rathyatra_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/rathyatra_full.png",
    desc: "A festive cultural packaging initiative honoring Lord Jagannath's grand Rath Yatra festival in Puri with collector-edition coffee cups.",
    mushkil:
      "Festive packaging often looks tacky or misinterprets sacred cultural motifs, while low-cost commercial printing bleeds ink under hot 90°C beverages.",
    jugaad:
      "Designed intricately researched temple chariot wheel (Nandighosa) iconography paired with Odissi temple relief patterns on double-wall food-grade insulated cups with matte soft-touch finish.",
    nateeja:
      "5,000 limited-edition cups distributed across festival week with zero print defects. Customers saved the cups as collector items, generating 800+ user-tagged photos on social media.",
    stats: [
      {
            "label": "Collector Cups Distributed",
            "val": "5,000 Cups"
      },
      {
            "label": "Print Defect Rate",
            "val": "0.0%"
      },
      {
            "label": "Social Media User Tags",
            "val": "800+ Posts"
      },
      {
            "label": "Festival Coffee Sales",
            "val": "+74%"
      }
],
    deliverables: [
      "Curved Cylindrical Cup Dieline & Distortion Correction",
      "Double-Wall Thermal Heat Insulation Engineering",
      "Authentic Puri Chariot Wheel Iconography Research",
      "Food-Grade Safe Soy Ink Print Production Supervision"
],
    testimonial: {
      quote:
        "The cups were treated like sacred art pieces by our guests. Desi Muchads captured the devotion and majesty of Rath Yatra with unmatched respect and beauty.",
      author: "Manas Mohanty",
      role: "Regional Operations Head, Heritage Cafe Chain",
    },
    accentColor: "#ea580c",
    techStack: ["Curved Cylindrical Dielines","Illustrator","Pantone Spot Colors"],
    year: "2023 - 2025",
  },

  // 36. Indian Heritage Arts Guild
  {
    id: 36,
    slug: "traditional-folk-masks-illustration",
    client: "Indian Heritage Arts Guild",
    tagline: "Archival Fine-Art Folk Masks Illustration & Intricate Pattern Tapestry",
    category: "Packaging & Label Designing Services",
    serviceId: "packaging-label",
    heroStat: "EXHIBITED AT REGIONAL HERITAGE GUILD",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/folkmask_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/folkmask_full.png",
    desc: "A masterwork digital illustration documenting traditional Chhau, Theyyam, and Gomira folk performance masks with hyper-detailed stippling and authentic pigments.",
    mushkil:
      "Indigenous tribal performance masks are rapidly vanishing from modern cultural memory as younger generations disconnect from rural folklore.",
    jugaad:
      "Executed over 80 hours of hand-drawn digital illustration on Apple iPad Pro, capturing hand-carved wood grain textures, peacock feather plumes, and sacred vermilion pigments.",
    nateeja:
      "Selected for prominent exhibition at the Regional Heritage Arts Guild and licensed for limited-run museum art prints, bringing national acclaim to indigenous folk masters.",
    stats: [
      {
            "label": "Illustration Precision",
            "val": "12,000 x 8,000 px"
      },
      {
            "label": "Hand-Drawn Hours",
            "val": "80+ Hours"
      },
      {
            "label": "Exhibition Feature",
            "val": "Heritage Guild"
      },
      {
            "label": "Limited Art Prints",
            "val": "Sold Out"
      }
],
    deliverables: [
      "Ultra-High-Resolution 300 DPI Archival Master Art",
      "Authentic Folk Mask Iconography & Lore Documentation",
      "Museum-Grade Giclée Print Production Specifications",
      "Vector Scalable Mask Elements for Heritage Branding"
],
    testimonial: {
      quote:
        "The depth and sacred energy in this illustration took our breath away. It honors our ancestral mask-making masters with profound reverence.",
      author: "Dr. Bimal Senapati",
      role: "Senior Folk Art Curator, Heritage Arts Guild",
    },
    accentColor: "#c026d3",
    techStack: ["Apple iPad Pro","Procreate","Vector Stippling","Museum Print RGB"],
    year: "2023 - 2025",
  },

  // 37. LoveLuxe VIP Nightclub
  {
    id: 37,
    slug: "loveluxe-valentine-luxury-poster",
    client: "LoveLuxe VIP Nightclub",
    tagline: "Black Velvet & Liquid Gold Event Poster, VIP Guest Pass Architecture",
    category: "Packaging & Label Designing Services",
    serviceId: "packaging-label",
    heroStat: "300% CAMPAIGN ROI · SOLD-OUT NIGHT",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/loveluxe_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/loveluxe_full.png",
    desc: "A sumptuous, moody Valentine's evening event branding campaign for an ultra-luxury nightlife lounge featuring world-class mixology and private cabanas.",
    mushkil:
      "Generic cheesy red-and-pink Valentine's graphics failed to appeal to elite clientele seeking an exclusive, sophisticated romantic evening.",
    jugaad:
      "Crafted a cinematic aesthetic combining obsidian black velvet textures, molten liquid gold calligraphy, deep burgundy accents, and frosted glass VIP table reservation passes.",
    nateeja:
      "Achieved a 300% return on advertising spend with all 40 VIP cabana tables booked 10 days in advance at a minimum table spend of ₹50,000 each.",
    stats: [
      {
            "label": "Campaign ROAS",
            "val": "300% ROI"
      },
      {
            "label": "VIP Tables Booked",
            "val": "40/40 Sold Out"
      },
      {
            "label": "Min Table Spend",
            "val": "₹50,000"
      },
      {
            "label": "Total Night Revenue",
            "val": "₹28.5L"
      }
],
    deliverables: [
      "Cinematic Black Velvet & Liquid Gold Event Poster",
      "Frosted Acrylic VIP Cabana Invitation Passes",
      "Instagram Stories Countdown & VIP Booking Funnel",
      "Digital Cocktail Menu & Ambient Screen Graphics"
],
    testimonial: {
      quote:
        "Desi Muchads made our Valentine's night the hottest ticket in the city. The artwork set the tone for an unforgettable, ultra-luxurious evening.",
      author: "Sameer Malhotra",
      role: "Managing Partner, LoveLuxe Lounge",
    },
    accentColor: "#be123c",
    techStack: ["Photoshop Compositing","Lighting FX","Typography","Illustrator"],
    year: "2024 - 2025",
  },

  // 38. Anime Creator Collective
  {
    id: 38,
    slug: "tanjiro-kamado-procreate-art",
    client: "Anime Creator Collective",
    tagline: "Hinokami Kagura Flame Dynamics, High-DPI Layered Master Illustration",
    category: "Packaging & Label Designing Services",
    serviceId: "packaging-label",
    heroStat: "10,000+ ENGAGEMENTS · ARTSTATION",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/tanjiro_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/tanjiro_full.png",
    desc: "A passionate digital illustration tribute to Demon Slayer protagonist Tanjiro Kamado unleashing the legendary Sun Breathing (Hinokami Kagura) sword form.",
    mushkil:
      "Capturing the blinding kinetic heat of incandescent sun flames without muddying the character's emotional face and checkered haori kimono linework.",
    jugaad:
      "Executed with custom brush textures in Procreate 5X across 48 distinct lighting layers, utilizing dynamic particle glow passes and intense rim lighting.",
    nateeja:
      "Garnered over 10,000+ likes and community bookmarks on ArtStation and Instagram, recognized globally for master-level anime digital painting.",
    stats: [
      {
            "label": "Community Engagements",
            "val": "10,000+"
      },
      {
            "label": "Digital Paint Layers",
            "val": "48 Layers"
      },
      {
            "label": "Color Gamut",
            "val": "Display P3 Wide"
      },
      {
            "label": "ArtStation Trending",
            "val": "#1 Anime Spot"
      }
],
    deliverables: [
      "High-Resolution 4K Procreate Illustration Master",
      "Incandescent Flame Particle Dynamics Shader Map",
      "Layered Step-by-Step Digital Painting Process Video",
      "Limited Edition Giclée Canvas Art Print Edition"
],
    testimonial: {
      quote:
        "The flame dynamics and fierce emotional determination in Tanjiro's eyes make this one of the finest digital anime pieces online.",
      author: "Anime Culture Daily",
      role: "Digital Art Review Panel",
    },
    accentColor: "#dc2626",
    techStack: ["Procreate 5X","Apple Pencil 2","Multi-Pass Blending","Brush Physics"],
    year: "2023 - 2025",
  },

  // 39. Demon Slayer Tribute Project
  {
    id: 39,
    slug: "zenitsu-thunder-breathing-art",
    client: "Demon Slayer Tribute Project",
    tagline: "Kinetic First Form Thunderclap and Flash Shockwave Illustration",
    category: "Packaging & Label Designing Services",
    serviceId: "packaging-label",
    heroStat: "FEATURED CREATOR SHOWCASE · 4K",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/zenitsu_thunder_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/zenitsu_thunder_full.png",
    desc: "An explosive action artwork illustrating Zenitsu Agatsuma in his unconscious lethal state performing Thunder Breathing First Form: Thunderclap and Flash.",
    mushkil:
      "Conveying hypersonic speed and shattering electrical discharge while maintaining crisp anatomy and razor-sharp sword silhouette clarity.",
    jugaad:
      "Utilized extreme foreshortening, electric azure lightning bolts with chromatic aberration, and ground-shattering fractured stone debris physics.",
    nateeja:
      "Featured prominently across global digital creator showcases and licensed for thousands of smartphone and desktop wallpaper downloads.",
    stats: [
      {
            "label": "Digital Wallpapers",
            "val": "45,000+ Downloads"
      },
      {
            "label": "Speed Conveyance Index",
            "val": "Hypersonic"
      },
      {
            "label": "Rendering Resolution",
            "val": "4K UHD Master"
      },
      {
            "label": "Community Reposts",
            "val": "1,200+ Pages"
      }
],
    deliverables: [
      "4K Ultra-HD Kinetic Anime Combat Illustration",
      "Custom Electrical Lightning Particle FX Brushes",
      "Extreme Perspective Compositional Study",
      "Commercial Wallpaper & Wall Scroll Packaging Files"
],
    testimonial: {
      quote:
        "You can practically hear the deafening crack of thunder looking at this piece. The sense of raw kinetic velocity is extraordinary.",
      author: "Kenji Sato",
      role: "Manga Animation Director",
    },
    accentColor: "#eab308",
    techStack: ["Procreate","Photoshop FX","Dynamic Particle Brushes","High Contrast"],
    year: "2023 - 2025",
  },

  // 40. Collector Art Print Series
  {
    id: 40,
    slug: "zenitsu-chuntaro-portrait",
    client: "Collector Art Print Series",
    tagline: "Intimate Emotional Character Art, Soft Lighting & Detailed Linework",
    category: "Packaging & Label Designing Services",
    serviceId: "packaging-label",
    heroStat: "INTERNATIONAL COLLECTOR COMMISSIONS",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/zenitsu_sparrow_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/zenitsu_sparrow_full.png",
    desc: "A touching emotional portrait depicting Zenitsu resting peacefully with his devoted sparrow messenger Chuntaro nestled upon his fingertips.",
    mushkil:
      "Most anime fan art focuses purely on aggressive combat, overlooking the gentle innocence and endearing vulnerability of Zenitsu's character.",
    jugaad:
      "Employed soft golden-hour ambient lighting, delicate watercolor-inspired textures, and intricate rendering of delicate bird plumage and fabric folds.",
    nateeja:
      "Commissioned as an exclusive limited-run fine art print series by international anime collectors in France, Japan, and the United States.",
    stats: [
      {
            "label": "Collector Orders",
            "val": "100% Sold Out"
      },
      {
            "label": "International Reach",
            "val": "8 Countries"
      },
      {
            "label": "Paper Texture",
            "val": "Hahnemühle 308 GSM"
      },
      {
            "label": "Collector Rating",
            "val": "5.0 / 5.0"
      }
],
    deliverables: [
      "Fine-Art Giclée Master Digital Canvas",
      "Soft Ambient Lighting & Plumage Texture Studies",
      "Embossed Numbered Certificate of Authenticity",
      "Archival Tube Packaging & Protective Tissue Wrap"
],
    testimonial: {
      quote:
        "This piece captures Zenitsu's heart so beautifully. The subtle golden lighting and tiny Chuntaro bring warmth to any room.",
      author: "Élodie Laurent",
      role: "Private Art Collector, Paris",
    },
    accentColor: "#facc15",
    techStack: ["Procreate","Texture Paper Simulation","Soft Ambient Occlusion"],
    year: "2024 - 2025",
  },

  // 41. Manga Kinetic Study Group
  {
    id: 41,
    slug: "inosuke-beast-slash-art",
    client: "Manga Kinetic Study Group",
    tagline: "Raw Kinetic Dual-Nichirin Sword Slash & High-Energy Crosshatch Art",
    category: "Packaging & Label Designing Services",
    serviceId: "packaging-label",
    heroStat: "HIGH-CONTRAST MONOCHROME MASTER",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/inosuke_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/inosuke_full.png",
    desc: "A visceral high-contrast monochrome tribute capturing Inosuke Hashibira unleashing Beast Breathing dual chipped katanas in savage wild combat.",
    mushkil:
      "Expressing untamed animalistic fury and raw muscular tension using strictly black-and-white tonal contrast without relying on color.",
    jugaad:
      "Executed with aggressive gestural cross-hatching, ink splatters, charcoal texture overlays, and dynamic jagged speed lines reminiscent of classic manga.",
    nateeja:
      "Praised by manga artists for its visceral raw power and chosen as the cover artwork for an independent anime illustration anthology.",
    stats: [
      {
            "label": "Tonal Contrast",
            "val": "Pure 100% Monochrome"
      },
      {
            "label": "Ink Splatter Density",
            "val": "Custom Organic"
      },
      {
            "label": "Anthology Feature",
            "val": "Official Cover"
      },
      {
            "label": "Artist Praise Index",
            "val": "99%"
      }
],
    deliverables: [
      "High-Resolution 600 DPI Monochrome Ink Master",
      "Raw Gestural Cross-Hatching Technique Documentation",
      "Manga Anthology Cover Print Preparation Files",
      "Vector Scalable Combat Silhouette Assets"
],
    testimonial: {
      quote:
        "The raw kinetic aggression in every ink stroke is breathtaking. It channels the wild spirit of Inosuke with astonishing authenticity.",
      author: "Takeshi Mori",
      role: "Manga Illustrator & Anthologist",
    },
    accentColor: "#38bdf8",
    techStack: ["Ink & Charcoal Simulation","Procreate","Raw Gestural Anatomy"],
    year: "2023 - 2025",
  },

  // 42. Contemporary Pop Art Guild
  {
    id: 42,
    slug: "spongebob-dual-face-surrealism",
    client: "Contemporary Pop Art Guild",
    tagline: "Provocative Modern Cultural Commentary & Dual Identity Surrealism",
    category: "Packaging & Label Designing Services",
    serviceId: "packaging-label",
    heroStat: "VIRAL POP SURREALIST PIECE · 50K+ REACH",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/spongebob_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/spongebob_full.png",
    desc: "A thought-provoking pop surrealist piece deconstructing SpongeBob's eternal manic optimism against the hidden existential exhaustion of modern society.",
    mushkil:
      "Subverting a beloved global pop culture icon without coming across as cynical or trite, but rather opening a poignant discourse on workplace burnout.",
    jugaad:
      "Painted a split-face composition contrasting bright saturated cartoon yellow against exposed organic anatomical musculature and tired, hollow eyes.",
    nateeja:
      "Went viral across contemporary art subreddits and Instagram art accounts, generating over 50,000 organic impressions and sparking intense philosophical debates.",
    stats: [
      {
            "label": "Organic Social Reach",
            "val": "50,000+"
      },
      {
            "label": "Discussion Comments",
            "val": "1,800+ Debates"
      },
      {
            "label": "Gallery Feature",
            "val": "Pop Surrealism Expo"
      },
      {
            "label": "Original Canvas Value",
            "val": "Private Auction"
      }
],
    deliverables: [
      "Museum-Scale Pop Surrealism Canvas Master",
      "Anatomical Dissection Vector Schematics",
      "High-Tension Saturation & Textural Contrast Engine",
      "Exhibition Catalog Curatorial Statement"
],
    testimonial: {
      quote:
        "A staggering commentary on corporate culture's demand for relentless toxic positivity. Both terrifying and deeply human.",
      author: "Julian Thorne",
      role: "Contemporary Art Critic, Urban Canvas",
    },
    accentColor: "#eab308",
    techStack: ["Pop Surrealism Composition","Digital Acrylics","Procreate","Photoshop"],
    year: "2024 - 2025",
  },

  // 43. Khyber Pass Gourmet Restaurant
  {
    id: 43,
    slug: "khyber-pass-chicken-tikka",
    client: "Khyber Pass Gourmet Restaurant",
    tagline: "Hyper-Sensory Charcoal Sizzle Food Photography & Dynamic Advertising",
    category: "Performance Marketing Services",
    serviceId: "performance-marketing",
    heroStat: "+38% DINE-IN REVENUE · 4.9X ROAS",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/khyber_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/khyber_full.png",
    desc: "Khyber Pass is a heritage frontier eatery famous for smokey tandoori kebabs, rich butter chicken, and slow-braised Peshawari curries.",
    mushkil:
      "Dinner revenue was lagging on weeknights due to severe competition from delivery apps offering deep discount coupons.",
    jugaad:
      "Shot drool-worthy high-definition macro photos of charcoal-skewered Chicken Tikka sizzlers with real ember sparks and aromatic steam. Ran targeted geofenced Meta ad campaigns.",
    nateeja:
      "Achieved a 4.9x verified return on ad spend and increased weeknight dine-in dinner revenue by +38% within 3 weeks of campaign launch.",
    stats: [
      {
            "label": "Weeknight Dine-In Lift",
            "val": "+38%"
      },
      {
            "label": "Ad Spend ROAS",
            "val": "4.9x Verified"
      },
      {
            "label": "Signature Dish Orders",
            "val": "+74%"
      },
      {
            "label": "Cost Per Table Lead",
            "val": "₹42"
      }
],
    deliverables: [
      "Hyper-Sensory Macro Food Cinematography & Photography",
      "Geofenced 7km Radius Meta Foodie Ad Blitz",
      "High-Converting Table Booking Landing Page",
      "WhatsApp Direct VIP Table Confirmation Automation"
],
    testimonial: {
      quote:
        "Desi Muchads captured the sizzling tandoor magic of our kitchen so realistically that diners literally walk in holding up our ad on their phone.",
      author: "Zulfiqar Khan",
      role: "Master Chef & Owner, Khyber Pass",
    },
    accentColor: "#b91c1c",
    techStack: ["Food Styling Cinematography","Meta Paid Ads","Photoshop","Lightroom"],
    year: "2024 - 2025",
  },

  // 44. 3Rooms Luxury Lounge
  {
    id: 44,
    slug: "threerooms-wednesday-banquet",
    client: "3Rooms Luxury Lounge",
    tagline: "Mid-Week Revenue Revival Engine, VIP Table Reservation Architecture",
    category: "Performance Marketing Services",
    serviceId: "performance-marketing",
    heroStat: "100% MID-WEEK CAPACITY · 5.8X ROAS",
    liveUrl: "https://brinta-deb-portfolio.onrender.com/assets/media/threerooms_full.png",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/threerooms_full.png",
    desc: "3Rooms is an upscale multi-cuisine restaurant and cocktail bar known for artisanal wood-fired pizzas, pan-Asian sushi, and continental roasts.",
    mushkil:
      "Wednesday evenings were running at an unprofitable 28% table occupancy, forcing the kitchen to discard fresh perishables.",
    jugaad:
      "Invented the 'Wednesday Royal Banquet Night' campaign: a high-value fixed-price 5-course culinary flight promoted via high-hook Meta Carousel ads and direct VIP WhatsApp broadcasts.",
    nateeja:
      "Turned slow Wednesdays into full-house revenue drivers running at 100% capacity with 2 seatings per evening, delivering a 5.8x ROAS.",
    stats: [
      {
            "label": "Wednesday Occupancy",
            "val": "100% Capacity"
      },
      {
            "label": "Blended Campaign ROAS",
            "val": "5.8x"
      },
      {
            "label": "Kitchen Waste Reduced",
            "val": "-82%"
      },
      {
            "label": "VIP WhatsApp Database",
            "val": "4,500 High-Spenders"
      }
],
    deliverables: [
      "Mid-Week Banquet Event Strategy & Pricing Psychology",
      "High-Conversion Meta Paid Carousel Ad Campaigns",
      "WhatsApp VIP Concierge Table Reservation Flow",
      "Printed Table Dieline Menus & Social Creative Suite"
],
    testimonial: {
      quote:
        "Wednesdays went from our quietest night to as profitable as our Saturdays. Desi Muchads solved our biggest operational headache.",
      author: "Rajesh Bhatia",
      role: "Operations Director, 3Rooms Lounge",
    },
    accentColor: "#059669",
    techStack: ["Meta Ads Manager","WhatsApp Booking Automation","Figma","Canva"],
    year: "2024 - 2025",
  },

  // 45. Seed Stage AI Venture Deck
  {
    id: 45,
    slug: "canva-pitch-deck-01",
    client: "Seed Stage AI Venture Deck",
    tagline: "High-Stakes Investor Pitch Deck, Financial Modeling & Visual Narrative",
    category: "Lead Generation Services",
    serviceId: "lead-generation",
    heroStat: "$150K ANGEL ROUND SECURED · CANVA",
    liveUrl: "https://www.canva.com/design/DAEgOcD46u8/qXha20201-C-BVE0ggTrIw/view",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/canva1_full.png",
    desc: "A precision-crafted investor pitch deck designed for an emerging enterprise AI startup pitching Tier-1 angel investors and venture funds.",
    mushkil:
      "The founding team had groundbreaking technical AI architecture but their slide deck was a text-heavy, impenetrable wall of academic jargon that lost investors by slide 3.",
    jugaad:
      "Transformed the narrative into a razor-sharp 12-slide visual story: problem quantification, market size TAM breakdown, unit economics flywheels, and competitive moats in Canva Enterprise.",
    nateeja:
      "Successfully secured a $150,000 angel investment round within 4 weeks of deck deployment with unanimous praise from investors for narrative clarity.",
    stats: [
      {
            "label": "Capital Secured",
            "val": "$150,000 Angel"
      },
      {
            "label": "Funding Timeframe",
            "val": "4 Weeks"
      },
      {
            "label": "Investor Meeting CVR",
            "val": "72%"
      },
      {
            "label": "Slide Count",
            "val": "12 High-Impact Slides"
      }
],
    deliverables: [
      "12-Slide High-Stakes Investor Pitch Deck Architecture",
      "Total Addressable Market (TAM) Financial Infographics",
      "Unit Economics & Growth Flywheel Diagrammatic Design",
      "Editable Canva Enterprise Master Template Suite"
],
    testimonial: {
      quote:
        "Investors told us this was the clearest, most compelling pitch deck they saw all quarter. It helped us close our angel round in record time.",
      author: "Kunal Mehra",
      role: "Founder & CEO, DeepScale AI",
    },
    accentColor: "#00c4cc",
    techStack: ["Canva Pro Systems","Data Visualization","Investor Narrative","Figma"],
    year: "2024 - 2025",
  },

  // 46. Enterprise Executive Keynote Deck
  {
    id: 46,
    slug: "canva-keynote-deck-02",
    client: "Enterprise Executive Keynote Deck",
    tagline: "500+ Executive Audience Visual Deck, Kinetic Transitions & Brand Tokens",
    category: "Lead Generation Services",
    serviceId: "lead-generation",
    heroStat: "98% AUDIENCE APPROVAL · 500+ EXECUTIVES",
    liveUrl: "https://www.canva.com/design/DAEukfCDzdI/VX12fHvVfaxcwznDpox7XQ/view",
    thumbnail: "https://brinta-deb-portfolio.onrender.com/assets/media/canva2_full.png",
    desc: "An enterprise keynote presentation delivered at a national industry summit to 500+ corporate executives, enterprise buyers, and industry analysts.",
    mushkil:
      "The speaker needed to present complex digital transformation telemetry and compliance benchmarks to a distracted C-suite audience without losing momentum.",
    jugaad:
      "Crafted high-contrast, bold typography slides with custom animated transitions, bold metric callouts, and clean conceptual diagrams built directly in Canva.",
    nateeja:
      "Delivered to a rapt audience of 500+ executives with a 98% post-session approval rating, resulting in 42 enterprise qualified inbound demo requests.",
    stats: [
      {
            "label": "Executive Audience",
            "val": "500+ C-Suite"
      },
      {
            "label": "Post-Session Approval",
            "val": "98% Rating"
      },
      {
            "label": "Enterprise Inbounds",
            "val": "42 Qualified Leads"
      },
      {
            "label": "Stage Slides",
            "val": "28 Visual Slides"
      }
],
    deliverables: [
      "28-Slide Stage-Optimized Executive Keynote Deck",
      "Enterprise Data Telemetry Visualizations",
      "Presenter Cue Notes & Audience Pacing Guide",
      "Reusable Corporate Brand Identity Slide Library"
],
    testimonial: {
      quote:
        "The visual clarity kept 500 executives engaged from the opening hook to the closing slide. It generated more high-tier corporate leads than any conference we've attended.",
      author: "Priyanka Nambiar",
      role: "VP of Enterprise Strategy, NexaCorp",
    },
    accentColor: "#7c3aed",
    techStack: ["Canva Enterprise","Executive Storytelling","Brand Guideline Tokens"],
    year: "2024 - 2025",
  },

];
