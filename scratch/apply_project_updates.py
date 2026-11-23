with open("src/data/projectsData.ts", "r", encoding="utf-8") as f:
    text = f.read()

changes = [
    ('id: 31,\n    slug: "ganesha-cyber-mandala",\n    client: "Lord Ganesha Cyber-Mandala",\n    tagline: "Modern Cyber-Spiritual Sacred Geometry Vector Art & Filigree",\n    category: "Illustrations & Art Sketches",\n    serviceId: "illustrations-art",\n    heroStat: "MASTER ARTWORK · 300 DPI VECTOR",\n    liveUrl: "/art/ganesha-cyber-mandala.jpg",',
     'id: 31,\n    slug: "ganesha-cyber-mandala",\n    client: "Lord Ganesha Cyber-Mandala",\n    tagline: "Modern Cyber-Spiritual Sacred Geometry Vector Art & Filigree",\n    category: "Illustrations & Art Sketches",\n    serviceId: "illustrations-art",\n    heroStat: "MASTER ARTWORK · 300 DPI VECTOR",\n    liveUrl: "/demos/ganesha-cyber-mandala",'),

    ('id: 32,\n    slug: "samurai-ronin-ink-sketch",\n    client: "Samurai Ronin Ink Wash",\n    tagline: "Dynamic Sumi-e Splatter & High-Velocity Anime Brush Sketch",\n    category: "Illustrations & Art Sketches",\n    serviceId: "illustrations-art",\n    heroStat: "RAW INK SKETCH · SUMI-E MASTER",\n    liveUrl: "/art/samurai-ronin-ink-sketch.jpg",',
     'id: 32,\n    slug: "samurai-ronin-ink-sketch",\n    client: "Samurai Ronin Ink Wash",\n    tagline: "Dynamic Sumi-e Splatter & High-Velocity Anime Brush Sketch",\n    category: "Illustrations & Art Sketches",\n    serviceId: "illustrations-art",\n    heroStat: "RAW INK SKETCH · SUMI-E MASTER",\n    liveUrl: "/demos/samurai-ronin-ink-sketch",'),

    ('id: 33,\n    slug: "neotokyo-street-food-hawker",\n    client: "Neo-Tokyo Midnight Hawker",\n    tagline: "Atmospheric Isometric Anime Digital Painting & Concept Art",\n    category: "Illustrations & Art Sketches",\n    serviceId: "illustrations-art",\n    heroStat: "CONCEPT ART · 240+ DETAIL ASSETS",\n    liveUrl: "/art/neotokyo-street-food-hawker.jpg",',
     'id: 33,\n    slug: "neotokyo-street-food-hawker",\n    client: "Neo-Tokyo Midnight Hawker",\n    tagline: "Atmospheric Isometric Anime Digital Painting & Concept Art",\n    category: "Illustrations & Art Sketches",\n    serviceId: "illustrations-art",\n    heroStat: "CONCEPT ART · 240+ DETAIL ASSETS",\n    liveUrl: "/demos/neotokyo-street-food-hawker",'),

    ('id: 34,\n    slug: "varanasi-ghats-heritage-matte",\n    client: "Varanasi Dawn Ghats Heritage",\n    tagline: "Serene Cinematic Digital Matte Painting & Concept Architecture",\n    category: "Illustrations & Art Sketches",\n    serviceId: "illustrations-art",\n    heroStat: "MATTE PAINTING · CINEMATIC KEYFRAME",\n    liveUrl: "/art/varanasi-ghats-heritage-matte.jpg",',
     'id: 34,\n    slug: "varanasi-ghats-heritage-matte",\n    client: "Varanasi Dawn Ghats Heritage",\n    tagline: "Serene Cinematic Digital Matte Painting & Concept Architecture",\n    category: "Illustrations & Art Sketches",\n    serviceId: "illustrations-art",\n    heroStat: "MATTE PAINTING · CINEMATIC KEYFRAME",\n    liveUrl: "/demos/varanasi-ghats-heritage-matte",'),

    # SnackNation
    ('slug: "snacknation-makhanas",\n    client: "SnackNation Makhanas",\n    tagline: "High-Velocity D2C Superfood Scaling & Volume Bundling",\n    category: "Performance Marketing Services",\n    serviceId: "performance-marketing",\n    heroStat: "5.8X BLENDED ROAS · ₹1.2CR 90-DAY",\n    liveUrl: "/demos/snacknation-makhanas",\n    thumbnail: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80",',
     'slug: "snacknation-makhanas",\n    client: "SnackNation Makhanas",\n    tagline: "High-Velocity D2C Superfood Scaling & Volume Bundling",\n    category: "Performance Marketing Services",\n    serviceId: "performance-marketing",\n    heroStat: "5.8X BLENDED ROAS · ₹1.2CR 90-DAY",\n    liveUrl: "/demos/snacknation-makhanas",\n    thumbnail: "/projects/snacknation-hero.jpg",'),

    # Bharat Bio-Health
    ('slug: "bharat-bio-health",\n    client: "Bharat Bio-Health",\n    tagline: "B2B Medical Diagnostics & Clinic Franchise Qualification",\n    category: "Lead Generation Services",\n    serviceId: "lead-generation",\n    heroStat: "₹3.2CR+ PIPELINE · ₹180 CPL",\n    liveUrl: "/demos/bharat-bio-health",\n    thumbnail: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",',
     'slug: "bharat-bio-health",\n    client: "Bharat Bio-Health",\n    tagline: "B2B Medical Diagnostics & Clinic Franchise Qualification",\n    category: "Lead Generation Services",\n    serviceId: "lead-generation",\n    heroStat: "₹3.2CR+ PIPELINE · ₹180 CPL",\n    liveUrl: "/demos/bharat-bio-health",\n    thumbnail: "/projects/bharat-biohealth-hero.jpg",'),

    # Sobha Heritage Villas
    ('slug: "sobha-heritage-villas",\n    client: "Sobha Heritage Villas",\n    tagline: "Ultra-Luxury Real Estate HNI Inbound Concierge",\n    category: "Lead Generation Services",\n    serviceId: "lead-generation",\n    heroStat: "38 HNI BUYERS · 72% SQL",\n    liveUrl: "/demos/sobha-heritage-villas",\n    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",',
     'slug: "sobha-heritage-villas",\n    client: "Sobha Heritage Villas",\n    tagline: "Ultra-Luxury Real Estate HNI Inbound Concierge",\n    category: "Lead Generation Services",\n    serviceId: "lead-generation",\n    heroStat: "38 HNI BUYERS · 72% SQL",\n    liveUrl: "/demos/sobha-heritage-villas",\n    thumbnail: "/projects/sobha-heritage-villas-hero.jpg",'),

    # ChaiChaska CTC
    ('slug: "chaichaska-ctc",\n    client: "ChaiChaska Premium Tea",\n    tagline: "Viral Cultural Storytelling & Community Evangelism",\n    category: "Social Media Services",\n    serviceId: "social-media",\n    heroStat: "+477% VIRAL ORGANIC REACH",\n    liveUrl: "/demos/chaichaska-ctc",\n    thumbnail: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",',
     'slug: "chaichaska-ctc",\n    client: "ChaiChaska Premium Tea",\n    tagline: "Viral Cultural Storytelling & Community Evangelism",\n    category: "Social Media Services",\n    serviceId: "social-media",\n    heroStat: "+477% VIRAL ORGANIC REACH",\n    liveUrl: "/demos/chaichaska-ctc",\n    thumbnail: "/projects/chaichaska-tea-hero.jpg",'),

    # StreeThreads Handloom
    ('slug: "streethreads-handloom",\n    client: "StreeThreads Handloom",\n    tagline: "Weaver Heritage Documentaries & Creator Whitelisting",\n    category: "Social Media Services",\n    serviceId: "social-media",\n    heroStat: "18.4% ENGAGEMENT · 3.8X ROAS",\n    liveUrl: "/demos/streethreads-handloom",\n    thumbnail: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",',
     'slug: "streethreads-handloom",\n    client: "StreeThreads Handloom",\n    tagline: "Weaver Heritage Documentaries & Creator Whitelisting",\n    category: "Social Media Services",\n    serviceId: "social-media",\n    heroStat: "18.4% ENGAGEMENT · 3.8X ROAS",\n    liveUrl: "/demos/streethreads-handloom",\n    thumbnail: "/projects/streetthreads-handloom-hero.jpg",'),

    # LionelP Restaurant
    ('slug: "lionelp-restaurant",\n    client: "LionelP Restaurant",\n    tagline: "Artisanal French Patisserie & Fine Dining Storefront",\n    category: "E-Commerce Services",\n    serviceId: "ecommerce-development",\n    heroStat: "+340% RESERVATION & ORDER LIFT",\n    liveUrl: "/demos/lionelp-restaurant",\n    thumbnail: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",',
     'slug: "lionelp-restaurant",\n    client: "LionelP Restaurant",\n    tagline: "Artisanal French Patisserie & Fine Dining Storefront",\n    category: "E-Commerce Services",\n    serviceId: "ecommerce-development",\n    heroStat: "+340% RESERVATION & ORDER LIFT",\n    liveUrl: "/demos/lionelp-restaurant",\n    thumbnail: "/projects/lionelp-restaurant-hero.jpg",'),

    # VedaRoots Ayurveda
    ('slug: "vedaroots-ayurveda",\n    client: "VedaRoots Ayurveda",\n    tagline: "High-Intent Google Search & Organic Topical Authority Dominance",\n    category: "SEO & SEM Services",\n    serviceId: "seo-sem",\n    heroStat: "+420% ORGANIC TRAFFIC LIFT",\n    liveUrl: "/demos/vedaroots-ayurveda",\n    thumbnail: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",',
     'slug: "vedaroots-ayurveda",\n    client: "VedaRoots Ayurveda",\n    tagline: "High-Intent Google Search & Organic Topical Authority Dominance",\n    category: "SEO & SEM Services",\n    serviceId: "seo-sem",\n    heroStat: "+420% ORGANIC TRAFFIC LIFT",\n    liveUrl: "/demos/vedaroots-ayurveda",\n    thumbnail: "/projects/vedaroots-ayurveda-hero.jpg",'),

    # UrbanDrift EV
    ('slug: "urbandrift-ev",\n    client: "UrbanDrift EV Mobility",\n    tagline: "High-Ticket Commercial B2B Fleet Search Acquisition",\n    category: "SEO & SEM Services",\n    serviceId: "seo-sem",\n    heroStat: "₹2.4CR PIPELINE · -48% CPA",\n    liveUrl: "/demos/urbandrift-ev",\n    thumbnail: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",',
     'slug: "urbandrift-ev",\n    client: "UrbanDrift EV Mobility",\n    tagline: "High-Ticket Commercial B2B Fleet Search Acquisition",\n    category: "SEO & SEM Services",\n    serviceId: "seo-sem",\n    heroStat: "₹2.4CR PIPELINE · -48% CPA",\n    liveUrl: "/demos/urbandrift-ev",\n    thumbnail: "/projects/urbandrift-ev-hero.jpg",')
]

for old, new in changes:
    if old in text:
        text = text.replace(old, new)
        print("Replaced successfully!")
    else:
        print("FAILED to find block!")

with open("src/data/projectsData.ts", "w", encoding="utf-8") as f:
    f.write(text)

print("Finished updating projectsData.ts!")
