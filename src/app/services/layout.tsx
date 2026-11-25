import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Growth & Creative Services",
    template: "%s | DESI MUCHADS Digital Agency",
  },
  description:
    "Explore Desi Muchads capabilities across Paid Media (Meta & Google ROAS), SEO, Quick Commerce scaling, high-converting Next.js platforms, and cultural viral content.",
  alternates: {
    canonical: "https://desimuchads.agency/services",
  },
  openGraph: {
    title: "Services & Capabilities | Desi Muchads",
    description:
      "Eight performance-engineered growth disciplines built to compound Net Contribution Margin across India and global markets.",
    url: "https://desimuchads.agency/services",
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
