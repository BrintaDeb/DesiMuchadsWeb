import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Featured Client Work & Case Studies",
    template: "%s | DESI MUCHADS Digital Agency",
  },
  description:
    "Inspect live production platforms, D2C storefronts, interactive previews, and audited ROAS case studies engineered by Desi Muchads.",
  alternates: {
    canonical: "https://desimuchads.agency/work",
  },
  openGraph: {
    title: "Featured Work & Case Studies | DESI MUCHADS Digital Agency",
    description:
      "50+ delivered client engagements spanning D2C Ayurveda, Q-Commerce, Fine Horology, SaaS, and Hospitality.",
    url: "https://desimuchads.agency/work",
    type: "website",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
