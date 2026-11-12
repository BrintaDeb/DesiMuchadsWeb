import React from "react";
import { notFound } from "next/navigation";
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

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const config = DEMO_PROJECTS_DATABASE[slug];
  if (!config) {
    return { title: "Demo Product Not Found" };
  }

  return {
    title: `${config.brandName} · Live Client Experience | Desi Muchads Demo`,
    description: `${config.hero.title} · ${config.hero.subtitle}`,
  };
}

export default async function DemoProductPage({ params }: PageProps) {
  const { slug } = await params;
  const config = DEMO_PROJECTS_DATABASE[slug];

  if (!config) {
    notFound();
  }

  return <DemoStorefrontClient config={config} />;
}

