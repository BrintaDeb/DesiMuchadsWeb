import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Growth & Creative Services",
    template: "%s | DESI MUCHADS Digital Agency",
  },
  description:
    "Explore Desi Muchads capabilities across Paid Media (Meta & Google ROAS), SEO, Quick Commerce scaling, high-converting Next.js platforms, and cultural viral content.",
  alternates: {
    canonical: "https://desimuchads.in/services",
  },
  openGraph: {
    title: "Services & Capabilities | Desi Muchads",
    description:
      "Nine performance-engineered growth disciplines built to compound Net Contribution Margin across India and global markets.",
    url: "https://desimuchads.in/services",
    images: [{ url: "/og-banner.png", width: 1200, height: 630, alt: "Desi Muchads Growth Services" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Capabilities | Desi Muchads",
    description: "Performance marketing, SEO, Quick Commerce, and Next.js full-stack engineering.",
    images: ["/og-banner.png"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
