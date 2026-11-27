import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Cinzel, Space_Grotesk, Syne, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { AgencyProposalProvider } from "@/context/AgencyProposalContext";
import { IndianArtBackgroundOverlay } from "@/components/common/IndianArtBackgroundOverlay";
import { PwaRegistration } from "@/components/common/PwaRegistration";
import { ApkInstallPopup } from "@/components/common/ApkInstallPopup";
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

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
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
  metadataBase: new URL("https://desimuchads.in"),
  title: {
    default: "Desi Muchads | Performance Marketing & Web Agency India",
    template: "%s | DESI MUCHADS",
  },
  description:
    "Desi Muchads (desimuchads.in) is India's high-ROAS performance marketing, Quick Commerce & Next.js web agency for D2C brands.",
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
    "Meta & Google Ads Performance Marketing",
    "Branding & Visual Identity India",
    "Senior Human-Crafted Agency",
    "Desi Advertising Agency",
  ],
  authors: [{ name: "Desi Muchads Digital LLP", url: "https://desimuchads.in" }],
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
    canonical: "https://desimuchads.in",
  },
  openGraph: {
    title: "Desi Muchads | Performance Marketing & Web Agency India",
    description:
      "Unapologetic Desi Roots. Ruthless Global ROI. High-converting performance marketing, viral reels, sub-second Next.js platforms, and D2C / Quick Commerce scaling.",
    url: "https://desimuchads.in",
    siteName: "DESI MUCHADS",
    images: [
      {
        url: "https://desimuchads.in/og-banner.png",
        width: 1200,
        height: 630,
        alt: "DESI MUCHADS — Performance Marketing & Web Engineering Agency",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desi Muchads | Performance Marketing & Web Agency India",
    description:
      "High-ROAS performance marketing, viral reels, sub-second Next.js web platforms, and Quick Commerce growth engineering.",
    images: ["https://desimuchads.in/og-banner.png"],
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
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.NEXT_PUBLIC_BING_VERIFICATION
    ? {
        verification: {
          ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
            ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
            : {}),
          ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
            ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } }
            : {}),
        },
      }
    : {}),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Desi Muchads",
  },
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
    "@id": "https://desimuchads.in/#organization",
    name: "DESI MUCHADS",
    alternateName: [
      "Desi Muchads Agency",
      "Much Ads",
      "DesiMuchads",
      "Desi Muchhad",
      "Desi Muchads Digital LLP",
    ],
    legalName: "Desi Muchads Digital LLP",
    url: "https://desimuchads.in",
    logo: {
      "@type": "ImageObject",
      url: "https://desimuchads.in/desi-muchads-square-logo.png",
      width: 512,
      height: 512,
    },
    image: "https://desimuchads.in/og-banner.png",
    description:
      "India's premier high-ROAS performance marketing, Quick Commerce growth, full-stack Next.js web engineering, and viral social storytelling agency.",
    slogan: "Unapologetic Desi Roots. Ruthless Global ROI.",
    foundingDate: "2024",
    taxID: "07AAECD5582M1ZX",
    vatID: "IN07AAECD5582M1ZX",
    iso6523Code: "0199:07AAECD5582M1ZX",
    priceRange: "₹₹₹",
    telephone: "+91-9180252831",
    email: "thedesimuchads@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hosapalaya",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560068",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9002701,
      longitude: 77.6454546,
    },
    founder: [
      {
        "@type": "Person",
        name: "Rahul Datta",
        jobTitle: "Chief Executive Officer",
      },
      {
        "@type": "Person",
        name: "Brinta Deb",
        jobTitle: "Chief Technology Officer",
      },
      {
        "@type": "Person",
        name: "Omkar Dutta",
        jobTitle: "Chief Financial Officer",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "20:00",
      },
    ],
    knowsAbout: [
      "Meta & Google Ads (Performance Marketing)",
      "Social Media Management & Viral Content",
      "Website Development (Next.js & Shopify)",
      "Branding & Visual Identity Systems",
      "Quick Commerce Growth (Blinkit, Zepto, Instamart)",
      "Packaging & Label Production",
    ],
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
      "https://www.instagram.com/the_desi_muchads/",
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
            name: "Meta & Google Ads Performance Scaling",
            url: "https://desimuchads.in/services/meta-google-ads",
            description: "High-velocity paid ad architectures delivering compounding ROAS across Meta Advantage+, Google Search, and PMax.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Branding & Visual Identity Architecture",
            url: "https://desimuchads.in/services/branding",
            description: "Custom logo marks, typography systems, Brand Guidelines books, and distinctive visual worlds.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Viral Social Media & Reel Storytelling",
            url: "https://desimuchads.in/services/social-media",
            description: "Organic short-form video hooks, cultural relevance, and high-retention reel production.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "D2C E-Commerce & Shopify Plus CRO",
            url: "https://desimuchads.in/services/ecommerce-services",
            description: "Conversion rate optimization, headless Shopify engineering, and checkout velocity.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Quick Commerce Growth (Zepto, Blinkit, Instamart)",
            url: "https://desimuchads.in/services/quick-commerce",
            description: "Dark store inventory placement, precision ad bidding, and 10-minute delivery scaling.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sub-Second Full-Stack Website Development",
            url: "https://desimuchads.in/services/web-development",
            description: "Next.js 16 Turbopack web apps with sub-second hydration, 99 PageSpeed, and custom animations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Packaging & Label Production",
            url: "https://desimuchads.in/services/packaging-label",
            description: "Tactile structural packaging, luxury finishes, and photorealistic 3D mockups.",
          },
        },
      ],
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9180252831",
      contactType: "customer service",
      email: "thedesimuchads@gmail.com",
      areaServed: ["IN", "US", "AE", "GB"],
      availableLanguage: ["English", "Hindi"],
    },
  };

  // Google WebSite Knowledge Graph Schema
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://desimuchads.in/#website",
    url: "https://desimuchads.in",
    name: "DESI MUCHADS",
    alternateName: ["Desi Muchads Agency", "desimuchads.in", "Much Ads"],
    inLanguage: "en-IN",
    publisher: {
      "@id": "https://desimuchads.in/#organization",
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
        name: "Verified Client Work (50+ Case Studies)",
        description: "Live production platforms, e-commerce storefronts, and verified ROAS case studies.",
        url: "https://desimuchads.in/work",
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Capabilities & Services",
        description: "Meta & Google Ads, Social Media Management, Website Development, Branding, and Quick Commerce scaling.",
        url: "https://desimuchads.in/services",
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "About Desi Muchads",
        description: "Leadership team, creative thesis, and engineering principles.",
        url: "https://desimuchads.in/about",
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Request Custom Quote & Book Strategy Session",
        description: "Configure your service scope and schedule a 1-on-1 strategy session with our founders.",
        url: "https://desimuchads.in/contact",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${cinzel.variable} ${syne.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} dark antialiased scroll-smooth`}
    >
      <head>
        <meta name="color-scheme" content="dark light" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="https://desimuchads.in/sitemap.xml" />
        <link rel="ard" href="https://desimuchads.in/.well-known/ard.json" />
        {/* Geo Targeting Meta Tags for Local & Regional Search Dominance */}
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bengaluru" />
        <meta name="geo.position" content="12.9002701;77.6454546" />
        <meta name="ICBM" content="12.9002701, 77.6454546" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />

        {/* iOS & Android Standalone Web App Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Desi Muchads" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Desi Muchads" />

        {/* Capture native PWA beforeinstallprompt early before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__dmDeferredPrompt=e;window.dispatchEvent(new Event('dm_pwa_prompt_ready'));});`,
          }}
        />
        {/* Structured Data: Organization, WebSite Sitelinks SearchBox, & SiteNavigation */}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }}
        />
      </head>
      <body className="bg-[#080807] text-white selection:bg-white selection:text-black min-h-screen overflow-x-hidden font-sans">
        <ThemeProvider>
          <AgencyProposalProvider>
            {/* Automatic PWA Service Worker Registration & Push Controller */}
            <PwaRegistration />
            {/* Universal App Installer & Downloader for iOS & Android */}
            <ApkInstallPopup />
            {/* Authentic Cultural Indian Art Background across ALL pages & sections */}
            <IndianArtBackgroundOverlay />
            <div className="relative z-10 w-full min-h-screen">
              {children}
            </div>
          </AgencyProposalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
