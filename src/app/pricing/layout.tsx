import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4-Tier Service Pricing | Graphics, SEO, Social, Web & Branding",
  description:
    "Accessible 4-tier pricing separately structured for Graphics Designing, SEO Management, Social Media Management, Website Development & Branding.",
  alternates: {
    canonical: "https://desimuchads.in/pricing",
  },
  openGraph: {
    title: "Service Pricing & 4-Tier Plans | Desi Muchads",
    description:
      "Clear starter-to-flagship tiers across Graphics Designing, SEO Management, Social Media Management, Website Development & Branding.",
    url: "https://desimuchads.in/pricing",
    images: [{ url: "/og-banner.png", width: 1200, height: 630, alt: "Desi Muchads Service Pricing" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Pricing & 4-Tier Plans | Desi Muchads",
    description: "Clear 4-tier pricing for Graphics, SEO, Social Media, Web Development & Branding.",
    images: ["/og-banner.png"],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
