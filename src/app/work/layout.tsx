import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Featured Client Work & Case Studies",
    template: "%s | DESI MUCHADS Digital Agency",
  },
  description:
    "Inspect live production platforms, D2C storefronts, interactive previews, and audited ROAS case studies engineered by Desi Muchads.",
  alternates: {
    canonical: "https://desimuchads.in/work",
  },
  openGraph: {
    title: "Featured Work & Case Studies | DESI MUCHADS Digital Agency",
    description:
      "50+ delivered client engagements spanning D2C Ayurveda, Q-Commerce, Fine Horology, SaaS, and Hospitality.",
    url: "https://desimuchads.in/work",
    images: [{ url: "/og-banner.png", width: 1200, height: 630, alt: "Desi Muchads Client Portfolio" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Featured Work & Case Studies | DESI MUCHADS Digital Agency",
    description: "Inspect 50+ live production storefronts, platforms, and audited ROAS case studies.",
    images: ["/og-banner.png"],
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
