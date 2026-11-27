import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Quote & Book Strategy Session",
  description:
    "Request a custom quote or book a 1-on-1 Strategy Session across Meta & Google Ads, Social Media Management, Website Development & Branding.",
  alternates: {
    canonical: "https://desimuchads.in/contact",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
