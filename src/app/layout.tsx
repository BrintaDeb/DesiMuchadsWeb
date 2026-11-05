import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins, Syne, Space_Grotesk, Roboto } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { AgencyProposalProvider } from "@/context/AgencyProposalContext";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
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
  weight: ["500", "700"],
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
      className={`${roboto.variable} ${cormorant.variable} ${poppins.variable} ${syne.variable} ${spaceGrotesk.variable} dark antialiased scroll-smooth`}
    >
      <body className="bg-[#0D0C12] text-[#F7F1E5] selection:bg-[#D4AF37] selection:text-[#0D0C12] min-h-screen overflow-x-hidden font-sans">
        <ThemeProvider>
          <AgencyProposalProvider>{children}</AgencyProposalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
