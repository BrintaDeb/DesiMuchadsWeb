import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DEMO_PROJECTS_DATABASE } from "@/data/demoProductsData";
import { AGENCY_PROJECTS } from "@/data/projectsData";
import { DemoStorefrontClient } from "@/components/demos/DemoStorefrontClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AGENCY_PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = DEMO_PROJECTS_DATABASE[slug];
  if (!config) {
    return { title: "Demo Product Not Found" };
  }

  const pageUrl = `https://desimuchads.agency/demos/${slug}`;

  return {
    title: `${config.brandName} · Live Client Storefront | Engineered by Desi Muchads`,
    description: `${config.brandTagline}. ${config.hero.title} · ${config.hero.subtitle}. Fully interactive production D2C experience with real-time checkout & analytics.`,
    keywords: [
      config.brandName,
      `${config.brandName} Official Store`,
      `${config.brandName} Live Demo`,
      config.categoryBadge,
      "Desi Muchads Client Experience",
      "High ROAS Storefront",
      "Next.js E-Commerce Showcase",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${config.brandName} · Live Storefront | Desi Muchads`,
      description: config.brandTagline,
      url: pageUrl,
      siteName: "DESI MUCHADS",
      images: [
        {
          url: config.products[0]?.image || "/brand-logo-white.jpg",
          width: 1200,
          height: 630,
          alt: `${config.brandName} Flagship Experience`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.brandName} · Live Storefront`,
      description: config.brandTagline,
      images: [config.products[0]?.image || "/brand-logo-white.jpg"],
      creator: "@desimuchads",
    },
  };
}

export default function DemoProductPage({ params }: PageProps) {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-zinc-400 font-mono text-sm">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span>Loading Desi Muchads Demo Storefront...</span>
          </div>
        </div>
      }
    >
      <DemoProductContent params={params} />
    </React.Suspense>
  );
}

async function DemoProductContent({ params }: PageProps) {
  const { slug } = await params;
  const config = DEMO_PROJECTS_DATABASE[slug];

  if (!config) {
    notFound();
  }

  // Structured Data: Store & AggregateOffer Schema
  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: config.brandName,
    url: `https://desimuchads.agency/demos/${slug}`,
    description: config.brandTagline,
    image: config.products[0]?.image,
    priceRange: "₹₹",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: config.customerReviews.length > 0 ? `${config.customerReviews.length * 15}` : "48",
      bestRating: "5",
    },
  };

  // Structured Data: BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Darbar Home",
        item: "https://desimuchads.agency",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Live Demos",
        item: "https://desimuchads.agency/#karname",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: config.brandName,
        item: `https://desimuchads.agency/demos/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <DemoStorefrontClient config={config} />
    </>
  );
}

