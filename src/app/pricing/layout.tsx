import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4-Tier Service Pricing | Graphics, SEO, Social, Web & Branding",
  description:
    "Accessible 4-tier pricing separately structured for Graphics Designing, SEO Management, Social Media Management, Website Development & Branding.",
  alternates: {
    canonical: "https://desimuchads.agency/pricing",
  },
  openGraph: {
    title: "Service Pricing & 4-Tier Plans | Desi Muchads",
    description:
      "Clear starter-to-flagship tiers across Graphics Designing, SEO Management, Social Media Management, Website Development & Branding.",
    url: "https://desimuchads.agency/pricing",
    type: "website",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
