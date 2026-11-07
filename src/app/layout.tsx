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
  title: "DESI MUCHADS ✦ High-ROAS Performance & Neo-Desi Creative Agency",
  description:
    "Unapologetic Desi Roots. Ruthless Global ROI. Much Ads, razor-sharp branding, viral reels, and high-converting marketing architectures for ambitious brands.",
  keywords: [
    "Desi Muchads",
    "Performance Marketing India",
    "Much Ads",
    "Desi Advertising Agency",
    "High ROAS Marketing",
    "Creative Agency Mumbai Delhi",
    "Brand Identity & Packaging",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${cinzel.variable} ${syne.variable} ${spaceGrotesk.variable} dark antialiased scroll-smooth`}
    >
      <body className="bg-[#09090b] text-white selection:bg-white selection:text-black min-h-screen overflow-x-hidden font-sans">
        <ThemeProvider>
          <AgencyProposalProvider>{children}</AgencyProposalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
