import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Strategy Session | Desi Muchads Agency",
  description:
    "Schedule your strategic Growth Session with Desi Muchads leadership. Select your live date and time slot, configure your custom performance marketing quotation, and dispatch directly to WhatsApp +91 9180252831.",
  alternates: {
    canonical: "https://desimuchads.agency/contact",
  },
  openGraph: {
    title: "Schedule A Strategy Session & Custom Quotation | Desi Muchads",
    description:
      "Reserve real-time appointment slots with Rahul Datt (CEO), Brinta Deb (CTO), and Omkar Dutta (CFO). Direct WhatsApp dispatch to +91 9180252831.",
    url: "https://desimuchads.agency/contact",
    siteName: "Desi Muchads Performance Marketing Agency",
    images: [
      {
        url: "/brand-logo-white.jpg",
        width: 1200,
        height: 630,
        alt: "Desi Muchads Executive Boardroom & Studio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
