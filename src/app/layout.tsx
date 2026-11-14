import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Cinzel, Space_Grotesk, Syne } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { AgencyProposalProvider } from "@/context/AgencyProposalContext";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://desimuchads.agency"),
  title: {
    default: "DESI MUCHADS ✦ High-ROAS Performance Marketing & Neo-Desi Creative Agency",
    template: "%s | DESI MUCHADS Digital Agency",
  },
  description:
    "Desi Muchads is India's premier high-ROAS performance marketing and neo-desi creative agency. We engineer viral social storytelling, sub-second Next.js web platforms, and hyper-growth Quick Commerce (Zepto/Blinkit) architectures for ambitious global brands.",
  keywords: [
    "Desi Muchads",
    "Desi Muchads Agency",
    "Much Ads",
    "Desi Muchhad",
    "Desi Muchads Performance Marketing",
    "Performance Marketing Agency India",
    "Best Performance Marketing Agency Delhi NCR",
    "High ROAS Marketing Agency Mumbai",
    "D2C Growth Agency Bangalore",
    "Quick Commerce Marketing Zepto Blinkit Instamart",
    "Full-Stack Web Development Next.js 16",
    "Creative Advertising Agency India",
    "Shopify Plus CRO Agency India",
    "Viral Reels Production Agency",
    "Luxury Packaging & Visual Identity",
    "B2B Lead Generation Cold Pipeline",
    "High-Ticket Client Acquisition",
    "Anti-AI Human Engineered Agency",
    "Desi Advertising Agency",
  ],
  authors: [{ name: "Desi Muchads Digital LLP", url: "https://desimuchads.agency" }],
  creator: "Desi Muchads Digital LLP",
  publisher: "Desi Muchads Digital LLP",
  category: "Digital Marketing & Software Engineering Agency",
  classification: "Performance Marketing, Quick Commerce Growth, Creative Direction, Next.js Development",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://desimuchads.agency",
    languages: {
      "en-IN": "https://desimuchads.agency",
      "en-US": "https://desimuchads.agency",
      "en-GB": "https://desimuchads.agency",
      "en-AE": "https://desimuchads.agency",
    },
  },
  openGraph: {
    title: "DESI MUCHADS ✦ High-ROAS Performance Marketing & Neo-Desi Creative Agency",
    description:
      "Unapologetic Desi Roots. Ruthless Global ROI. High-converting performance marketing architectures, viral reels, sub-second web platforms, and e-commerce scaling.",
    url: "https://desimuchads.agency",
    siteName: "DESI MUCHADS Digital Agency",
    images: [
      {
        url: "/brand-logo-white.jpg",
        width: 1200,
        height: 630,
        alt: "DESI MUCHADS Official Brand Crest & Growth Agency Identity",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DESI MUCHADS ✦ High-ROAS Performance Marketing & Neo-Desi Creative Agency",
    description:
      "Unapologetic Desi Roots. Ruthless Global ROI. High-converting marketing architectures, viral reels, sub-second web platforms, and e-commerce scaling.",
    images: ["/brand-logo-white.jpg"],
    creator: "@desimuchads",
    site: "@desimuchads",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-desi-muchads-official-verified",
    yandex: "yandex-verification-desi-muchads",
    other: {
      "msvalidate.01": "msvalidate-desi-muchads-webmaster",
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/brand-logo-white.jpg",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Comprehensive Google Knowledge Graph & Local Business Schema
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": ["MarketingAgency", "ProfessionalService", "LocalBusiness"],
    "@id": "https://desimuchads.agency/#organization",
    name: "DESI MUCHADS",
    alternateName: [
      "Desi Muchads Agency",
      "Much Ads",
      "DesiMuchads",
      "Desi Muchhad",
      "Desi Muchads Digital LLP",
    ],
    legalName: "Desi Muchads Digital LLP",
    url: "https://desimuchads.agency",
    logo: {
      "@type": "ImageObject",
      url: "https://desimuchads.agency/brand-logo-white.jpg",
      width: 1200,
      height: 630,
    },
    image: "https://desimuchads.agency/brand-logo-white.jpg",
    description:
      "India's premier high-ROAS performance marketing, Quick Commerce growth, full-stack Next.js web engineering, and viral social storytelling agency.",
    slogan: "Unapologetic Desi Roots. Ruthless Global ROI.",
    foundingDate: "2024",
    taxID: "07AAECD5582M1ZX",
    vatID: "IN07AAECD5582M1ZX",
    iso6523Code: "0199:07AAECD5582M1ZX",
    priceRange: "₹₹₹",
    telephone: "+91-98112-34567",
    email: "contact@desimuchads.agency",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Connaught Place, Barakhamba Road",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6315,
      longitude: 77.2167,
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "City", name: "New Delhi" },
      { "@type": "City", name: "Mumbai" },
      { "@type": "City", name: "Bengaluru" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://instagram.com/desimuchads",
      "https://linkedin.com/company/desi-muchads",
      "https://twitter.com/desimuchads",
      "https://github.com/BrintaDeb/DesiMuchadsWeb",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Desi Muchads Full-Stack Growth Capabilities",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "High-Intent SEO & Organic Search Domination",
            url: "https://desimuchads.agency/services/seo-sem",
            description: "Data-driven SEO architectures, semantic entities, and technical sub-second indexing.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Performance Marketing & Meta/Google ROAS Scaling",
            url: "https://desimuchads.agency/services/performance-marketing",
            description: "High-velocity paid ad architectures delivering 4.8x+ ROAS across Meta, Google, and YouTube.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "High-Ticket B2B Lead Generation",
            url: "https://desimuchads.agency/services/lead-generation",
            description: "LinkedIn ABM campaigns and cold outreach pipelines for enterprise contract closures.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Viral Social Media & Reel Storytelling",
            url: "https://desimuchads.agency/services/social-media",
            description: "Organic short-form video hooks, cultural relevance, and high-retention reel production.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "D2C E-Commerce & Shopify Plus CRO",
            url: "https://desimuchads.agency/services/ecommerce-services",
            description: "Conversion rate optimization, headless Shopify engineering, and checkout velocity.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Quick Commerce Growth (Zepto, Blinkit, Instamart)",
            url: "https://desimuchads.agency/services/quick-commerce",
            description: "Dark store inventory placement, algorithmic ad bidding, and 10-minute delivery scaling.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sub-Second Full-Stack Web Development",
            url: "https://desimuchads.agency/services/web-development",
            description: "Next.js 16 Turbopack web apps with sub-second hydration, 99 PageSpeed, and custom animations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Packaging, Unboxing & Visual Identity Architecture",
            url: "https://desimuchads.agency/services/packaging-label",
            description: "Tactile structural packaging, luxury finishes, and memorable brand unboxing rituals.",
          },
        },
      ],
    },
  };

  // Google SERP Sitelinks SearchBox Schema
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://desimuchads.agency/#website",
    url: "https://desimuchads.agency",
    name: "DESI MUCHADS",
    alternateName: ["Desi Muchads Agency", "Much Ads"],
    publisher: {
      "@id": "https://desimuchads.agency/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://desimuchads.agency/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Google SERP Primary Navigation Sitelinks Schema
  const siteNavigationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Desi Muchads Primary Navigation Sitelinks",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Verified Client Work (46 Case Studies)",
        description: "Live production platforms, e-commerce storefronts, and verified ROAS case studies.",
        url: "https://desimuchads.agency/#karname",
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Capabilities & Services",
        description: "Full-funnel Meta & Google ads, Next.js web platforms, and Quick Commerce scaling.",
        url: "https://desimuchads.agency/#services",
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Hisab-Kitab Simulator",
        description: "Simulate monthly ad spend, contribution margin, and projected ROAS in real time.",
        url: "https://desimuchads.agency/#calculator",
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Retainers & Pricing",
        description: "Transparent growth retainers and modular marketing thali packages.",
        url: "https://desimuchads.agency/#pricing",
      },
      {
        "@type": "SiteNavigationElement",
        position: 5,
        name: "Why Desi Muchads",
        description: "Anti-AI performance growth architecture, unit economics audit, and zero-ghosting SLA.",
        url: "https://desimuchads.agency/#why-us",
      },
    ],
  };

  // Google SERP Rich FAQ Schema
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What makes Desi Muchads different from typical digital marketing agencies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Desi Muchads eliminates generic AI templates and junior account handoffs. We combine deep cultural Indian storytelling with ruthless Silicon Valley mathematical optimization, operating on contribution margins and verified ROAS rather than vanity impressions.",
        },
      },
      {
        "@type": "Question",
        name: "What ROAS does Desi Muchads deliver for D2C e-commerce brands?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Across our portfolio of over ₹140Cr+ tracked GMV, our clients maintain blended contribution margins of 38-46% and first-order ROAS benchmarks ranging from 3.8x to 7.2x across Meta, Google Ads, and Quick Commerce channels.",
        },
      },
      {
        "@type": "Question",
        name: "Does Desi Muchads handle Quick Commerce channels like Blinkit and Zepto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we engineer full-funnel Quick Commerce growth across Zepto, Blinkit, and Swiggy Instamart, optimizing dark store micro-fulfillment radius biddings, organic brand share-of-voice, and in-app sponsored product ROAS.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Desi Muchads located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Desi Muchads is headquartered in Connaught Place, New Delhi, with regional production and growth squads in Mumbai, Bengaluru, and international client cohorts across the UAE, US, and UK.",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${cinzel.variable} ${syne.variable} ${spaceGrotesk.variable} dark antialiased scroll-smooth`}
    >
      <head>
        {/* Geo Targeting Meta Tags for Local & Regional Search Dominance */}
        <meta name="geo.region" content="IN-DL" />
        <meta name="geo.placename" content="New Delhi" />
        <meta name="geo.position" content="28.6315;77.2167" />
        <meta name="ICBM" content="28.6315, 77.2167" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />

        {/* Structured Data: Organization, WebSite Sitelinks SearchBox, & FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }}
        />
      </head>
      <body className="bg-[#09090b] text-white selection:bg-white selection:text-black min-h-screen overflow-x-hidden font-sans">
        <ThemeProvider>
          <AgencyProposalProvider>{children}</AgencyProposalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
