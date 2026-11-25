import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About & Leadership Philosophy",
  description:
    "Meet the founding team behind Desi Muchads Digital Agency — Rahul Datta (CEO), Brinta Deb (CTO), and Omkar Dutta (CFO). Unapologetic creative storytelling fused with ruthless performance unit economics.",
  alternates: {
    canonical: "https://desimuchads.agency/about",
  },
  openGraph: {
    title: "About Desi Muchads | Founding Squad & Thesis",
    description:
      "Anti-template engineering, cultural storytelling, and Net Contribution Margin accountability.",
    url: "https://desimuchads.agency/about",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
