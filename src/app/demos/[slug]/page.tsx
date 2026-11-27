import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DEMO_PROJECTS_DATABASE } from "@/data/demoProductsData";
import { DemoStorefrontClient } from "@/components/demos/DemoStorefrontClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(DEMO_PROJECTS_DATABASE).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = DEMO_PROJECTS_DATABASE[slug];
  if (!config) {
    return { title: "Demo Product Not Found" };
  }

  const pageUrl = `https://desimuchads.in/demos/${slug}`;
  const pageTitle = config.brandName.length <= 31 ? `${config.brandName} · Storefront` : config.brandName;
  const rawDesc = `${config.brandTagline}. ${config.hero.title} — Interactive D2C experience by Desi Muchads.`;
  const description =
    rawDesc.length <= 155 ? rawDesc : `${config.brandTagline}. Storefront by Desi Muchads.`.slice(0, 155);
  const rawImg = config.hero.heroImage || config.products[0]?.image || "/og-banner.png";
  const storeImage = rawImg.startsWith("http") ? rawImg : `https://desimuchads.in${rawImg}`;

  return {
    title: pageTitle,
    description,
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
      title: `${pageTitle} | DESI MUCHADS`,
      description,
      url: pageUrl,
      siteName: "DESI MUCHADS",
      images: [
        {
          url: storeImage,
          width: 1200,
          height: 630,
          alt: `${config.brandName} Flagship Experience`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | DESI MUCHADS`,
      description,
      images: [storeImage],
      creator: "@desimuchads",
    },
  };
}

export default function DemoProductPage({ params }: PageProps) {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-zinc-400 font-mono text-xs uppercase tracking-widest">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-white/80" />
            <span>Loading Storefront...</span>
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

  const rawStoreImg = config.hero.heroImage || config.products[0]?.image || "/og-banner.png";
  const storeSchemaImage = rawStoreImg.startsWith("http")
    ? rawStoreImg
    : `https://desimuchads.in${rawStoreImg}`;

  // Structured Data: Store & AggregateOffer Schema
  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: config.brandName,
    url: `https://desimuchads.in/demos/${slug}`,
    description: config.brandTagline,
    image: storeSchemaImage,
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
        name: "Home",
        item: "https://desimuchads.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio Work",
        item: "https://desimuchads.in/work",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: config.brandName,
        item: `https://desimuchads.in/demos/${slug}`,
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

