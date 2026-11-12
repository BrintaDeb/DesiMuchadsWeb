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
    default: "DESI MUCHADS ✦ High-ROAS Performance & Neo-Desi Creative Agency",
    template: "%s | DESI MUCHADS Digital Agency",
  },
  description:
    "Unapologetic Desi Roots. Ruthless Global ROI. High-converting marketing architectures, viral reels, sub-second web platforms, and e-commerce scaling for ambitious brands.",
  keywords: [
    "Desi Muchads",
    "Performance Marketing India",
    "Much Ads",
    "Desi Advertising Agency",
    "High ROAS Marketing",
    "Quick Commerce Marketing Zepto Blinkit",
    "Full-Stack Web Development Next.js",
    "Creative Agency Mumbai Delhi Bangalore",
    "Brand Identity & Packaging",
  ],
  authors: [{ name: "Desi Muchads Digital LLP", url: "https://desimuchads.agency" }],
  creator: "Desi Muchads Digital LLP",
  publisher: "Desi Muchads Digital LLP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DESI MUCHADS ✦ High-ROAS Performance & Neo-Desi Creative Agency",
    description:
      "Unapologetic Desi Roots. Ruthless Global ROI. High-converting marketing architectures, viral reels, and full-stack web platforms.",
    url: "https://desimuchads.agency",
    siteName: "DESI MUCHADS",
    images: [
      {
        url: "/brand-logo-white.jpg",
        width: 1200,
        height: 630,
        alt: "DESI MUCHADS Brand Crest and Identity",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DESI MUCHADS ✦ High-ROAS Performance & Neo-Desi Creative Agency",
    description:
      "Unapologetic Desi Roots. Ruthless Global ROI. High-converting marketing architectures, viral reels, and full-stack web platforms.",
    images: ["/brand-logo-white.jpg"],
    creator: "@desimuchads",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Desi Muchads Digital Agency",
    legalName: "Desi Muchads Digital LLP",
    url: "https://desimuchads.agency",
    logo: "https://desimuchads.agency/brand-logo-white.jpg",
    description:
      "High-ROAS performance marketing, viral social storytelling, full-stack web development, and luxury packaging architecture for ambitious Indian and global brands.",
    priceRange: "₹₹₹",
    telephone: "+91-9999999999",
    areaServed: ["India", "United States", "United Kingdom", "United Arab Emirates"],
    sameAs: [
      "https://instagram.com/desimuchads",
      "https://linkedin.com/company/desi-muchads",
      "https://twitter.com/desimuchads",
    ],
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${cinzel.variable} ${syne.variable} ${spaceGrotesk.variable} dark antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
