import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Growth, Creative & Web Services",
    template: "%s | DESI MUCHADS",
  },
  description:
    "Explore Desi Muchads capabilities across Meta & Google Ads, Social Media Management, Website Development, Branding, Quick Commerce & E-Commerce.",
  alternates: {
    canonical: "https://desimuchads.in/services",
  },
  openGraph: {
    title: "Services & Capabilities | DESI MUCHADS",
    description:
      "Execution disciplines across Meta & Google Ads, Social Media Management, Website Development, Branding & Quick Commerce built to compound Net Contribution Margin.",
    url: "https://desimuchads.in/services",
    images: [{ url: "https://desimuchads.in/og-banner.png", width: 1200, height: 630, alt: "Desi Muchads Growth Services" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Capabilities | DESI MUCHADS",
    description: "Meta & Google Ads, Social Media, Website Development, Branding & Quick Commerce engineering.",
    images: ["https://desimuchads.in/og-banner.png"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
