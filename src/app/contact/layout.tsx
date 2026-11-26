import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Strategy Session",
  description:
    "Schedule your strategic Growth Session with Desi Muchads leadership. Select your live date and time slot, configure your custom performance marketing quotation, and dispatch directly to WhatsApp +91 9180252831.",
  alternates: {
    canonical: "https://desimuchads.in/contact",
  },
  openGraph: {
    title: "Schedule A Strategy Session & Custom Quotation | Desi Muchads",
    description:
      "Reserve real-time appointment slots with Rahul Datta (CEO), Brinta Deb (CTO), and Omkar Dutta (CFO). Direct WhatsApp dispatch to +91 9180252831.",
    url: "https://desimuchads.in/contact",
    siteName: "Desi Muchads Performance Marketing Agency",
    images: [
      {
        url: "/og-banner.png",
        width: 1200,
        height: 630,
        alt: "Desi Muchads Executive Boardroom & Studio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Strategy Session | Desi Muchads",
    description: "Reserve strategy sessions and performance marketing audits with Desi Muchads.",
    images: ["/og-banner.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
