import type { Metadata } from "next";
import { Syne, Rozha_One, Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { AgencyProposalProvider } from "@/context/AgencyProposalContext";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const rozhaOne = Rozha_One({
  variable: "--font-rozha",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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
      className={`${syne.variable} ${rozhaOne.variable} ${spaceGrotesk.variable} ${plusJakartaSans.variable} dark antialiased scroll-smooth`}
    >
      <body className="bg-[#0D0C12] text-[#F7F1E5] selection:bg-[#D4AF37] selection:text-[#0D0C12] min-h-screen overflow-x-hidden font-sans">
        <ThemeProvider>
          <AgencyProposalProvider>{children}</AgencyProposalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
