with open("src/data/demoProductsData.ts", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update interactiveType and InteractiveDataConfig
old_type_def = """  interactiveType:
  | "calculator_ev"
  | "calorie_pet"
  | "bundle_snacks"
  | "estate_concierge"
  | "watch_customizer"
  | "darkstore_timer"
  | "herb_explorer"
  | "mandi_rates"
  | "baking_slot"
  | "diagnostic_quote"
  | "seo_serp_cluster"
  | "product_benchmarks";"""

new_type_def = """  interactiveType:
  | "calculator_ev"
  | "calorie_pet"
  | "bundle_snacks"
  | "estate_concierge"
  | "watch_customizer"
  | "darkstore_timer"
  | "herb_explorer"
  | "mandi_rates"
  | "baking_slot"
  | "diagnostic_quote"
  | "seo_serp_cluster"
  | "product_benchmarks"
  | "art_curator_studio";"""

old_interact_cfg = """  benchmarks?: ProductBenchmarkMetric[];
  edgeLocations?: { region: string; latencyMs: number; status: string }[];
}"""

new_interact_cfg = """  benchmarks?: ProductBenchmarkMetric[];
  edgeLocations?: { region: string; latencyMs: number; status: string }[];
  artLayers?: { id: string; name: string; tag: string; desc: string }[];
  artPresets?: { id: string; name: string; filter: string; glow: string }[];
  artAudioAmbience?: string;
  artworkMasterImage?: string;
  artVectorSpecs?: { format: string; resolution: string; layersCount: number; colorSpace: string };
}"""

if old_type_def in code:
    code = code.replace(old_type_def, new_type_def)
    print("Updated interactiveType!")
else:
    print("Could not find old_type_def")

if old_interact_cfg in code:
    code = code.replace(old_interact_cfg, new_interact_cfg)
    print("Updated InteractiveDataConfig!")
else:
    print("Could not find old_interact_cfg")

# 2. Append the 4 Art Storefront configurations before the closing "};"
art_configs = """
  // 19. Lord Ganesha Cyber-Mandala (Illustrations & Art Sketches)
  "ganesha-cyber-mandala": {
    slug: "ganesha-cyber-mandala",
    brandName: "Lord Ganesha Cyber-Mandala",
    brandTagline: "300 DPI Fine Art Vector Filigree & Sacred Golden Ratio Geometry",
    serviceCriteria: {
      serviceId: "illustrations-art",
      serviceTitle: "Illustrations & Art Sketches",
      primaryObjective: "Sacred Cultural Semiotics & High-Resolution Vector Craft",
      targetKpi: "Lossless Scalability to 8K · 300 DPI Museum Print Fidelity",
      techArchitecture: [
        "Adobe Illustrator CC Master Vectors",
        "P3 Wide-Color Gamut Engine",
        "Wacom Cintiq Pro 32 Calibration",
        "Scalable SVG & EPS Output"
      ],
      deliverablesDeployed: [
        "Master Cyber-Mandala Vector Linework",
        "24K Liquid Gold Filigree Shading",
        "Obsidian Glass Volumetric Lighting",
        "Limited Archival Collector Editions"
      ],
      verifiedImpact: "Benchmark Feature across International Design & Digital Art Forums"
    },
    categoryBadge: "Master Artwork · 300 DPI Vector Edition",
    domainUrl: "art.desimuchads.agency/ganesha",
    theme: {
      primaryBg: "bg-[#07070a]",
      accentColor: "text-amber-400",
      accentBorder: "border-amber-500/40",
      pillBg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      heroGlow: "from-amber-600/30 via-yellow-500/10 to-transparent",
    },
    hero: {
      eyebrow: "SACRED GEOMETRIC CYBER-SPIRITUAL VECTOR ARCHITECTURE",
      title: "Lord Ganesha Cyber-Mandala",
      subtitle:
        "Synthesizing ancient Vedic iconographic proportions with cyberpunk sacred geometry, liquid 24K gold filigree, and volumetric obsidian depth.",
      primaryCta: "Inspect Vector Canvas",
      secondaryCta: "Order Archival Print",
      stats: [
        { label: "Vector Layers", val: "42 Master" },
        { label: "Export Fidelity", val: "300 DPI / 8K" },
        { label: "Edition Run", val: "Limited 50" },
        { label: "Collector Rating", val: "5.0 / 5" },
      ],
    },
    interactiveType: "art_curator_studio",
    interactiveData: {
      title: "Interactive Vector Studio & Layer Inspection",
      artworkMasterImage: "/art/ganesha-cyber-mandala.jpg",
      artAudioAmbience: "Cosmic Om Drone & Sacred Tibetan Singing Bowls",
      artVectorSpecs: {
        format: "Lossless Scalable SVG / AI / 8K TIFF",
        resolution: "300 DPI High-Density Print",
        layersCount: 42,
        colorSpace: "Display P3 Wide Gamut",
      },
      artLayers: [
        { id: "linework", name: "Sacred Geometry Linework", tag: "Vector Lines", desc: "Mathematical golden-ratio concentric circles and symmetrical deity silhouette." },
        { id: "filigree", name: "24K Burnished Gold Filigree", tag: "Foil Shading", desc: "Intricate crown, ear ornaments, and tusk adornments in metallic gold." },
        { id: "circuitry", name: "Cyber-Spiritual Ambient Circuitry", tag: "Neon Tracing", desc: "Bioluminescent orange-amber energy traces pulsing along spiritual meridian pathways." },
        { id: "obsidian", name: "Obsidian Deep Glass Void", tag: "Backdrop Grade", desc: "High-contrast velvet black depth enhancing dimensional luminescence." },
      ],
      artPresets: [
        { id: "gold", name: "24K Sacred Gold", filter: "contrast(115%) brightness(105%) saturate(120%)", glow: "#f59e0b" },
        { id: "cyber", name: "Cyberpunk Platinum", filter: "contrast(130%) hue-rotate(180deg) saturate(140%)", glow: "#06b6d4" },
        { id: "noir", name: "Obsidian Monochrome", filter: "grayscale(100%) contrast(140%) brightness(95%)", glow: "#ffffff" },
        { id: "solar", name: "Solar Flare Aura", filter: "sepia(70%) saturate(200%) brightness(110%)", glow: "#ea580c" },
      ],
    },
    products: [
      {
        id: "gcm-01",
        name: "Archival Fine Art Canvas Print (24\" × 24\" Hand-Stretched Teak Wood Frame)",
        category: "Museum Wall Art",
        price: 6499,
        originalPrice: 8999,
        badge: "Limited Edition",
        rating: 5.0,
        reviewCount: 38,
        description: "Printed with 12-color archival pigment inks on 400gsm Hahnemühle cotton canvas. Individually numbered with stamped Certificate of Authenticity.",
        specs: ["400gsm Cotton Canvas", "Handmade Teak Frame", "UV-Resistant 100yr Coating", "Numbered Certificate"],
        image: "/art/ganesha-cyber-mandala.jpg",
      },
      {
        id: "gcm-02",
        name: "Full Commercial Vector Architecture License (Scalable SVG, AI, EPS, 8K TIFF)",
        category: "Commercial Digital License",
        price: 14999,
        originalPrice: 19999,
        badge: "Enterprise Commercial",
        rating: 5.0,
        reviewCount: 19,
        description: "Full unrestricted global commercial license for brand apparel, packaging, stage backdrops, and digital media production with clean vector source paths.",
        specs: ["Infinite Scalability", "Clean Node Grouping", "Commercial Production Rights", "Instant Multi-Format ZIP"],
        image: "/art/ganesha-cyber-mandala.jpg",
      },
      {
        id: "gcm-03",
        name: "Ultra-HD 4K Dynamic Motion Wallpaper & Collector Certificate",
        category: "Digital Collector Assets",
        price: 1999,
        originalPrice: 2999,
        badge: "Digital Exclusive",
        rating: 4.9,
        reviewCount: 64,
        description: "Seamless 60fps looping 4K motion wallpaper with subtle glowing gold particle animations, optimized for desktop and mobile displays.",
        specs: ["3840×2160 UHD Looping MP4", "Mobile 9:16 Portrait Cut", "Lossless Audio Ambience", "Personal Display Rights"],
        image: "/art/ganesha-cyber-mandala.jpg",
      },
    ],
    trustBadges: [
      { title: "300 DPI Lossless Precision", desc: "Every curve and filigree node mathematically calculated for infinite crisp reproduction." },
      { title: "Museum-Grade Pigment Fidelity", desc: "Guaranteed 100+ year archival colorfastness under standard ambient gallery lighting." },
      { title: "Authenticated Creator Provenance", desc: "Direct from Desi Muchads Lead Art Atelier with cryptographically verifiable certificate." },
      { title: "Worldwide Express Protective Tube Dispatch", desc: "Ships internationally in heavy-duty moisture-sealed architectural grade shipping tubes." },
    ],
    customerReviews: [
      {
        author: "Devendra Singhania",
        location: "Gurugram, Haryana",
        rating: 5,
        title: "The centerpiece of my modern workspace",
        comment: "The precision of the vector filigree is awe-inspiring. In person with the teak frame, the gold tones catch the light with subtle cyber luminescence. Absolute masterpiece.",
        verified: true,
      },
      {
        author: "Aarav Chen",
        location: "Singapore",
        rating: 5,
        title: "Incredible blend of spiritual sacred art and cyberpunk aesthetics",
        comment: "Purchased the commercial vector license for an experiential hospitality project. Cleanest AI file paths I've ever opened from an agency studio.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "What printing technology is utilized for the physical canvas edition?",
        a: "We print using 12-channel UltraChrome Pro archival pigment inks on 400gsm acid-free Hahnemühle canvas, sealed with a museum matte lacquer for lifelong UV protection.",
      },
      {
        q: "Can the vector source files be edited and color-customized in Adobe Illustrator?",
        a: "Yes. All layers, paths, color swatches, and strokes are organized cleanly into named groups, allowing seamless adjustment of dimensions, colors, and line weights.",
      },
    ],
  },

  // 20. Samurai Ronin Ink Wash (Illustrations & Art Sketches)
  "samurai-ronin-ink-sketch": {
    slug: "samurai-ronin-ink-sketch",
    brandName: "Samurai Ronin Ink Wash",
    brandTagline: "Dynamic Sumi-e Splatter & High-Velocity Anime Brush Sketch",
    serviceCriteria: {
      serviceId: "illustrations-art",
      serviceTitle: "Illustrations & Art Sketches",
      primaryObjective: "Raw Organic Brushwork & Expressive Action Gesture",
      targetKpi: "Organic Ink Bleed Textures · High-Velocity Manga Aesthetic",
      techArchitecture: [
        "Handmade Bamboo Brush Textures",
        "Custom Procreate Sumi-e Splatter Suite",
        "Wacom Pressure-Sensitive Inking",
        "High-Contrast Monochrome Dynamic Balancing"
      ],
      deliverablesDeployed: [
        "Dynamic Wandering Ronin Master Composition",
        "Crimson Katana Accent Color Layer",
        "Organic Washi Paper Texture Mapping",
        "Archival Fine Art Hahnemühle Prints"
      ],
      verifiedImpact: "Viral Visual Asset in Anime Culture & Streetwear Licensing"
    },
    categoryBadge: "Raw Sumi-e Master · Action Manga",
    domainUrl: "art.desimuchads.agency/samurai",
    theme: {
      primaryBg: "bg-[#09090b]",
      accentColor: "text-red-500",
      accentBorder: "border-red-500/40",
      pillBg: "bg-red-500/15 text-red-300 border-red-500/30",
      heroGlow: "from-red-600/30 via-red-900/10 to-transparent",
    },
    hero: {
      eyebrow: "TRADITIONAL SUMI-E MEETS MODERN VELOCITY MANGA",
      title: "Samurai Ronin Ink Wash",
      subtitle:
        "Capturing the raw visceral soul of a solitary wandering swordsman battling fierce mountain winds, rendered with expressive bamboo-brush splatter and a striking crimson katana accent.",
      primaryCta: "Inspect Ink Details",
      secondaryCta: "Acquire Limited Print",
      stats: [
        { label: "Ink Splatters", val: "Hand-Crafted" },
        { label: "Fidelity", val: "8K Ultra-Clean" },
        { label: "Edition Run", val: "Limited 50" },
        { label: "Collector Rating", val: "4.96 / 5" },
      ],
    },
    interactiveType: "art_curator_studio",
    interactiveData: {
      title: "Interactive Sumi-e Studio & Splatter Inspection",
      artworkMasterImage: "/art/samurai-ronin-ink-sketch.jpg",
      artAudioAmbience: "Bamboo Forest Wind & Blade Sheathe Echo",
      artVectorSpecs: {
        format: "High-Resolution Lossless TIFF / Scalable Asset Pack",
        resolution: "600 DPI Master Scan Fidelity",
        layersCount: 28,
        colorSpace: "Monochrome K100 with Crimson Accent",
      },
      artLayers: [
        { id: "gestures", name: "High-Velocity Gesture Brushwork", tag: "Dynamic Flow", desc: "Swift dry-brush strokes forming the bamboo hat, flowing haori cloak, and stormy winds." },
        { id: "splatters", name: "Organic Sumi-e Ink Splatters", tag: "Natural Bleed", desc: "Authentic droplet micro-splatters captured from natural Japanese bamboo brushes." },
        { id: "katana", name: "Crimson Blood Katana Accent", tag: "Focal Accent", desc: "Vibrant single-point color accent drawing focus to the unsheathed steel edge." },
        { id: "washi", name: "Handmade Washi Paper Texture", tag: "Organic Grain", desc: "Subtle fibrous texture background reminiscent of traditional Echizen washi." },
      ],
      artPresets: [
        { id: "classic", name: "Classic Sumi-e & Crimson", filter: "contrast(125%) brightness(100%)", glow: "#ef4444" },
        { id: "noir", name: "Pure Monochrome Noir", filter: "grayscale(100%) contrast(145%)", glow: "#71717a" },
        { id: "sepia", name: "Feudal Parchment", filter: "sepia(60%) contrast(110%) brightness(95%)", glow: "#d97706" },
        { id: "inversion", name: "Shadow Realm Inversion", filter: "invert(100%) contrast(130%)", glow: "#3b82f6" },
      ],
    },
    products: [
      {
        id: "sri-01",
        name: "Japanese Rice Paper Limited Print (A2 - 16.5\" × 23.4\" with Ebony Frame)",
        category: "Fine Art Prints",
        price: 5999,
        originalPrice: 7999,
        badge: "Limited Edition",
        rating: 5.0,
        reviewCount: 42,
        description: "Giclée printed on 210gsm Awagami bamboo washi paper with deep archival carbon black ink and custom matte black aluminum frame.",
        specs: ["Awagami Japanese Washi", "Carbon Archival Ink", "Ebony Studio Frame", "Artist Stamped & Numbered"],
        image: "/art/samurai-ronin-ink-sketch.jpg",
      },
      {
        id: "sri-02",
        name: "Full Commercial Streetwear & Apparel Graphic Asset Pack",
        category: "Commercial Apparel License",
        price: 11999,
        originalPrice: 15999,
        badge: "Apparel Industry",
        rating: 4.9,
        reviewCount: 27,
        description: "Separated screen-print ready CMYK/Spot color vector halftones and ultra-high resolution alpha PNGs ready for silk screen and DTG production.",
        specs: ["Separated Halftone Files", "Alpha PNG 8000px+", "DTG & Silk Screen Ready", "Uncapped Apparel Run"],
        image: "/art/samurai-ronin-ink-sketch.jpg",
      },
    ],
    trustBadges: [
      { title: "Pure Carbon Black Inks", desc: "Deepest possible optical density Dmax 2.4 for profound ink contrast." },
      { title: "Authentic Awagami Paper", desc: "Printed on historic heritage Japanese bamboo washi paper." },
      { title: "Ready-to-Hang Gallery Mount", desc: "Arrives pre-mounted in shatterproof UV acrylic and solid frame." },
      { title: "Worldwide Protective Packaging", desc: "Flat-packed with archival glassine interleaving to ensure pristine condition." },
    ],
    customerReviews: [
      {
        author: "Kenji Takahashi",
        location: "Kyoto, Japan",
        rating: 5,
        title: "Tremendous kinetic energy in the brushstrokes",
        comment: "Captures the elusive spirit of sumi-e while packing the explosive punch of contemporary action manga. Hung in my dojo gallery.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "What paper is used for this specific print?",
        a: "We print exclusively on Awagami Bamboo Washi (70% bamboo, 30% recycled washi), renowned for its organic texture and deep ink absorption.",
      },
    ],
  },

  // 21. Neo-Tokyo Midnight Hawker (Illustrations & Art Sketches)
  "neotokyo-street-food-hawker": {
    slug: "neotokyo-street-food-hawker",
    brandName: "Neo-Tokyo Midnight Hawker",
    brandTagline: "Atmospheric Isometric Anime Digital Painting & Concept Art",
    serviceCriteria: {
      serviceId: "illustrations-art",
      serviceTitle: "Illustrations & Art Sketches",
      primaryObjective: "Dense Atmospheric World-Building & Isometric Environmental Storytelling",
      targetKpi: "240+ Hand-Rendered Micro-Assets · Studio Ghibli Meets Akira Palette",
      techArchitecture: [
        "True Isometric 30-Degree Grid Construction",
        "Photoshop CC Multi-Pass Volumetric Lighting",
        "Custom Atmospheric Steam & Rain Particle Shaders",
        "High-Gamut Cyber Neon Grading"
      ],
      deliverablesDeployed: [
        "Isometric Midnight Food Cart Master Painting",
        "240+ Individual Micro-Asset Concept Layer Suite",
        "Cyberpunk Neon Color Grading Palettes",
        "Ultra-Panoramic Collector Canvas Prints"
      ],
      verifiedImpact: "Acclaimed Architectural & Concept Art Portfolio Showcase Piece"
    },
    categoryBadge: "Concept Art · 240+ Detail Assets",
    domainUrl: "art.desimuchads.agency/neotokyo",
    theme: {
      primaryBg: "bg-[#060814]",
      accentColor: "text-cyan-400",
      accentBorder: "border-cyan-500/40",
      pillBg: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
      heroGlow: "from-cyan-600/30 via-fuchsia-600/10 to-transparent",
    },
    hero: {
      eyebrow: "ATMOSPHERIC ISOMETRIC CYBERPUNK CONCEPT ARCHITECTURE",
      title: "Neo-Tokyo Midnight Hawker",
      subtitle:
        "A cozy midnight ramen stall nestled into a rainy cyberpunk alleyway, illuminated by paper lanterns, glowing neon kanji, and warm broth steam in a dense Ghibli-meets-Akira aesthetic.",
      primaryCta: "Explore Isometric Alley",
      secondaryCta: "Acquire Art Print",
      stats: [
        { label: "Detail Assets", val: "240+ Hand-Drawn" },
        { label: "Perspective", val: "True 30° Isometric" },
        { label: "Resolution", val: "8K Master" },
        { label: "Collector Rating", val: "4.98 / 5" },
      ],
    },
    interactiveType: "art_curator_studio",
    interactiveData: {
      title: "Interactive Isometric Explorer & Micro-Asset Inspection",
      artworkMasterImage: "/art/neotokyo-street-food-hawker.jpg",
      artAudioAmbience: "Midnight Rain on Wet Asphalt & Distant Lo-Fi Tokyo Alley",
      artVectorSpecs: {
        format: "Layered PSD Concept Suite / 8K Uncompressed TIFF",
        resolution: "300 DPI Architectural Concept Master",
        layersCount: 64,
        colorSpace: "Adobe RGB (1998) Wide Color Gamut",
      },
      artLayers: [
        { id: "linework", name: "Isometric Alley Architecture Grid", tag: "30° Grid", desc: "Detailed structural linework of fire escapes, corrugated rooftops, and wiring." },
        { id: "neon", name: "Bioluminescent Neon Kanji Signage", tag: "Volumetric Glow", desc: "Glowing pink, cyan, and amber signs casting neon reflections on rain puddles." },
        { id: "steam", name: "Volumetric Broth Steam & Mist", tag: "Atmospheric FX", desc: "Soft atmospheric vapor rising from copper ramen pots into the midnight rain." },
        { id: "interior", name: "Cozy Hawker Cart Interior Details", tag: "Micro-Assets", desc: "Ceramic bowls, bamboo steamers, condiment jars, and steaming gyoza." },
      ],
      artPresets: [
        { id: "cyber", name: "Cyber Neon Night (Original)", filter: "contrast(115%) saturate(125%)", glow: "#06b6d4" },
        { id: "synth", name: "Synthwave 1984 Purple Glow", filter: "hue-rotate(280deg) saturate(140%) contrast(120%)", glow: "#d946ef" },
        { id: "rain", name: "Monsoon Blue Hour Mood", filter: "hue-rotate(190deg) contrast(110%) brightness(95%)", glow: "#3b82f6" },
        { id: "vintage", name: "Vintage Showa Era Warmth", filter: "sepia(40%) contrast(105%) brightness(105%)", glow: "#f59e0b" },
      ],
    },
    products: [
      {
        id: "ntm-01",
        name: "Panoramic Metallic Acrylic Fine Art Print (36\" × 24\" Luminescent Mount)",
        category: "Fine Art Acrylic",
        price: 7999,
        originalPrice: 10999,
        badge: "Bestseller",
        rating: 5.0,
        reviewCount: 56,
        description: "Metallic Fuji crystal pearl paper face-mounted to 4mm optical acrylic glass. The neon colors exhibit an astonishing three-dimensional depth and luminous glow.",
        specs: ["Optical Acrylic Face-Mount", "Fuji Metallic Pearl Paper", "Sub-Surface Floating Mount", "Signed Edition Label"],
        image: "/art/neotokyo-street-food-hawker.jpg",
      },
      {
        id: "ntm-02",
        name: "Game Development & Concept Art Environmental Asset Kit",
        category: "Digital Game Assets",
        price: 12999,
        originalPrice: 17999,
        badge: "Developer Bundle",
        rating: 4.9,
        reviewCount: 31,
        description: "Complete layered PSD environment file with 240+ isolated isometric building blocks, neon props, vehicles, and decals ready for 2D/2.5D game production.",
        specs: ["Layered Master PSD", "240+ Isolated PNG Props", "Tileable Isometric Grid", "Commercial Game Dev Rights"],
        image: "/art/neotokyo-street-food-hawker.jpg",
      },
    ],
    trustBadges: [
      { title: "Optical Acrylic Brilliance", desc: "Refraction-free acrylic glass that magnifies micro-details and neon vibrancy." },
      { title: "Pixel-Perfect Detail Guarantee", desc: "Zoom into any square inch of the 8K canvas to discover hidden hand-drawn easter eggs." },
      { title: "Floating Frameless Display", desc: "Includes back aluminum subframe that floats the print 1 inch away from your wall." },
      { title: "Insured Global Courier Delivery", desc: "Ships reinforced in custom foam-lined wooden crating." },
    ],
    customerReviews: [
      {
        author: "Marcus Vance",
        location: "Seattle, WA, USA",
        rating: 5,
        title: "I find something new every time I look at it",
        comment: "The acrylic print is mind-bending. The steam, neon reflections, and tiny posters in the background make this the most complimented piece in my studio.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "What makes the acrylic face-mount print different from standard paper?",
        a: "The metallic pearl paper is bonded directly behind diamond-polished optical acrylic, creating an internal refraction effect where colors and lights seem to radiate from within.",
      },
    ],
  },

  // 22. Varanasi Dawn Ghats Heritage (Illustrations & Art Sketches)
  "varanasi-ghats-heritage-matte": {
    slug: "varanasi-ghats-heritage-matte",
    brandName: "Varanasi Dawn Ghats Heritage",
    brandTagline: "Serene Cinematic Digital Matte Painting & Concept Architecture",
    serviceCriteria: {
      serviceId: "illustrations-art",
      serviceTitle: "Illustrations & Art Sketches",
      primaryObjective: "Ethereal Spiritual Atmosphere & Ancient Heritage Architecture",
      targetKpi: "28 Fog/Mist Atmospheric Layers · Cinematic Golden Dawn Keyframe",
      techArchitecture: [
        "Digital Matte Painting Pipeline",
        "Layered Volumetric Depth Map",
        "Heritage Architectural Photogrammetry Reference",
        "Lossless Cinema 8K Keyframe Render"
      ],
      deliverablesDeployed: [
        "Varanasi Dawn Heritage Master Keyframe",
        "28 Atmospheric Morning Mist Layers",
        "Sacred Ganges Reflection & Floating Diya Palette",
        "Museum-Scale Textured Canvas Reproductions"
      ],
      verifiedImpact: "Curated in International Digital Concept Art & Matte Painting Archives"
    },
    categoryBadge: "Matte Painting · 28 Atmospheric Layers",
    domainUrl: "art.desimuchads.agency/varanasi",
    theme: {
      primaryBg: "bg-[#0d0906]",
      accentColor: "text-amber-300",
      accentBorder: "border-amber-500/40",
      pillBg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      heroGlow: "from-amber-600/30 via-orange-600/10 to-transparent",
    },
    hero: {
      eyebrow: "CINEMATIC SACRED HERITAGE DIGITAL MATTE PAINTING",
      title: "Varanasi Dawn Ghats Heritage",
      subtitle:
        "The sacred riverfront steps at sunrise enveloped in golden morning mist, temple silhouettes, floating diyas, and wooden boats drifting on the holy river in an ethereal meditation on eternity.",
      primaryCta: "Inspect Matte Painting",
      secondaryCta: "Acquire Gallery Canvas",
      stats: [
        { label: "Mist Layers", val: "28 Volumetric" },
        { label: "Fidelity", val: "Cinematic 8K" },
        { label: "Edition Run", val: "Limited 50" },
        { label: "Collector Rating", val: "5.0 / 5" },
      ],
    },
    interactiveType: "art_curator_studio",
    interactiveData: {
      title: "Interactive Matte Painting Explorer & Atmosphere Control",
      artworkMasterImage: "/art/varanasi-ghats-heritage-matte.jpg",
      artAudioAmbience: "Morning Sacred River Lapping & Distant Temple Morning Chimes",
      artVectorSpecs: {
        format: "Cinematic EXR / 16-Bit TIFF / Canvas Master",
        resolution: "300 DPI Museum Scale Render",
        layersCount: 52,
        colorSpace: "ACEScg Cinematic Wide Gamut",
      },
      artLayers: [
        { id: "temples", name: "Ancient Ghat Temple Architecture", tag: "Stone Carvings", desc: "Detailed stone pavilions, stupas, and ancient stone staircases descending into the holy water." },
        { id: "mist", name: "28 Atmospheric Morning Mist Layers", tag: "Volumetric Depth", desc: "Multi-depth morning mist filtering golden sunrise light across the distant riverbanks." },
        { id: "boats", name: "Traditional Wooden Country Boats", tag: "Silhouettes", desc: "Weathered wooden rowboats floating peacefully on the reflective mirror surface of the water." },
        { id: "diyas", name: "Sacred Floating Flower Diyas", tag: "Spiritual Light", desc: "Golden marigolds and tiny flickering clay lamps drifting down the sacred current." },
      ],
      artPresets: [
        { id: "golden", name: "Sacred Golden Dawn (Original)", filter: "contrast(110%) brightness(105%) saturate(115%)", glow: "#f59e0b" },
        { id: "ethereal", name: "Ethereal Morning Fog", filter: "brightness(115%) contrast(90%) saturate(90%)", glow: "#fde68a" },
        { id: "dusk", name: "Twilight Aarti Ambient", filter: "hue-rotate(240deg) saturate(120%) contrast(115%)", glow: "#8b5cf6" },
        { id: "sepia", name: "Heritage Monochrome Sepia", filter: "sepia(80%) contrast(120%) brightness(95%)", glow: "#b45309" },
      ],
    },
    products: [
      {
        id: "vdg-01",
        name: "Grand Museum Archival Canvas (48\" × 24\" Hand-Crafted Solid Sheesham Frame)",
        category: "Museum Canvas",
        price: 8999,
        originalPrice: 12999,
        badge: "Flagship Edition",
        rating: 5.0,
        reviewCount: 48,
        description: "Museum-scale archival canvas reproduction stretched over solid aged Sheesham wood frame with hand-applied satin protective varnish.",
        specs: ["420gsm Heavy Linen Canvas", "Solid Sheesham Frame", "Hand-Varnished Finish", "Individually Signed Certificate"],
        image: "/art/varanasi-ghats-heritage-matte.jpg",
      },
      {
        id: "vdg-02",
        name: "Film & VFX Matte Painting Environment Production Master License",
        category: "Cinematic Matte License",
        price: 18999,
        originalPrice: 24999,
        badge: "Cinema Keyframe",
        rating: 5.0,
        reviewCount: 14,
        description: "16-bit uncompressed ACES EXR sequence with separated atmospheric depth layers, ideal for cinematic projection mapping and documentary productions.",
        specs: ["16-Bit Half-Float EXR", "Z-Depth Channel Included", "ACEScg Gamut Certified", "Worldwide Cinematic Rights"],
        image: "/art/varanasi-ghats-heritage-matte.jpg",
      },
    ],
    trustBadges: [
      { title: "Grand Scale Museum Canvas", desc: "Crafted to hold breathtaking spatial depth across expansive 48-inch gallery wall spans." },
      { title: "Solid Sheesham Wood Framing", desc: "Hand-finished by master Indian woodcrafters for generational longevity." },
      { title: "Hand-Varnished Protection", desc: "Two protective coats of museum satin varnish defend against moisture and humidity." },
      { title: "Numbered Certificate of Authenticity", desc: "Numbered and wax-sealed with Desi Muchads atelier provenance." },
    ],
    customerReviews: [
      {
        author: "Raghavendra Shastri",
        location: "Varanasi, Uttar Pradesh",
        rating: 5,
        title: "Brings the sacred silence of the ghats into my home",
        comment: "I was born near Dashashwamedh Ghat. This painting captures the exact spiritual hush of 5:30 AM before the city wakes up. Truly sublime work.",
        verified: true,
      },
    ],
    faq: [
      {
        q: "How is the painting framed and shipped safely?",
        a: "The large 48\" canvas is mounted onto a custom solid Sheesham frame and shipped in a custom reinforced wooden shipping crate with impact-absorbing foam.",
      },
    ],
  },
"""

# Insert art_configs before the closing "};"
last_brace_idx = code.rfind("};")
if last_brace_idx != -1:
    code = code[:last_brace_idx] + art_configs + code[last_brace_idx:]
    print("Inserted art_configs before the final closing brace!")
else:
    print("Could not find final '};'")

with open("src/data/demoProductsData.ts", "w", encoding="utf-8") as f:
    f.write(code)

print("Saved updated src/data/demoProductsData.ts!")
