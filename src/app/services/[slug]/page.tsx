import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  CheckCircle2,
  Crown,
  Sparkles,
  ChevronRight,
  Rocket,
  Share2,
  ShoppingBag,
  Zap,
  Code2,
  Package,
  Wrench,
} from "lucide-react";
import { AGENCY_SERVICES, ServiceItem } from "@/data/servicesData";
import { MoustacheSVG, FiligreeCorner } from "@/components/common/Icons";
import { ReadingProgressBar } from "@/components/common/ReadingProgressBar";
import {
  DetailHeaderStrategyCta,
  ServiceHeroAuditActions,
  ServiceBottomAuditActions,
} from "@/components/cta/DetailPageAuditActions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AGENCY_SERVICES.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = AGENCY_SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  const pageUrl = `https://desimuchads.in/services/${slug}`;
  const pageTitle = service.title.length <= 30 ? `${service.title} Agency India` : service.title;
  const description = `${service.title}: ${service.specs.deliverables.slice(0, 2).join(" · ")}.`;

  return {
    title: pageTitle,
    description,
    keywords: [
      service.title,
      `${service.title} Agency India`,
      "Desi Muchads",
      ...service.specs.deliverables,
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
          url: "https://desimuchads.in/og-banner.png",
          width: 1200,
          height: 630,
          alt: `${service.title} - Desi Muchads`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | DESI MUCHADS`,
      description,
      images: ["https://desimuchads.in/og-banner.png"],
      creator: "@desimuchads",
    },
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-transparent flex items-center justify-center text-zinc-300 font-mono text-sm">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span>Loading Service Sheet...</span>
          </div>
        </div>
      }
    >
      <ServiceDetailContent params={params} />
    </React.Suspense>
  );
}

async function ServiceDetailContent({ params }: PageProps) {
  const { slug } = await params;
  const service = AGENCY_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    provider: {
      "@type": "Organization",
      name: "DESI MUCHADS",
      url: "https://desimuchads.in",
    },
    areaServed: ["India", "United States", "United Kingdom", "United Arab Emirates"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Scope`,
      itemListElement: service.specs.deliverables.map((deliv: string) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: deliv,
        },
      })),
    },
  };

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
        name: "Services",
        item: "https://desimuchads.in/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `https://desimuchads.in/services/${service.slug}`,
      },
    ],
  };

  const getServiceIcon = (name: ServiceItem["iconName"]) => {
    const iconClass = "w-7 h-7 text-white";
    switch (name) {
      case "Crown":
        return <Crown className={iconClass} />;
      case "Rocket":
        return <Rocket className={iconClass} />;
      case "Share2":
        return <Share2 className={iconClass} />;
      case "ShoppingBag":
        return <ShoppingBag className={iconClass} />;
      case "Zap":
        return <Zap className={iconClass} />;
      case "Code2":
        return <Code2 className={iconClass} />;
      case "Package":
        return <Package className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  const executionItems = [
    ...service.specs.deliverables,
    ...service.framework.map((s) => s.title),
  ];

  return (
    <div className="relative min-h-screen bg-transparent text-white selection:bg-white selection:text-black font-display overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Sticky Header Bar */}
      <header className="sticky top-0 z-50 px-4 sm:px-8 py-4 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <div className="w-7 h-5 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <MoustacheSVG className="w-full h-full fill-current" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-royal text-sm font-bold tracking-widest text-white uppercase">
                DESI MUCHADS
              </span>
              <span className="font-mono text-[9px] text-zinc-300 tracking-wider">
                BACK TO HOME
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/#services"
              className="text-xs font-mono font-medium text-zinc-300 hover:text-white transition-colors hidden sm:inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Services</span>
            </Link>
            <Link
              href="/#request-quote"
              className="text-xs font-mono font-medium text-zinc-300 hover:text-white transition-colors hidden sm:inline"
            >
              Request Quote
            </Link>
            <DetailHeaderStrategyCta label="Free Audit" defaultService={service.title} />
          </div>
        </div>
        <ReadingProgressBar />
      </header>

      {/* Focused Service Sheet: Only Service Name + What We Do */}
      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-16">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          <Link href="/services" className="hover:text-white transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          <span className="text-white font-bold">{service.title}</span>
        </div>

        {/* Service Hero Card */}
        <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 bg-[#121215] border border-white/15 border-t-white/30 shadow-2xl overflow-hidden">
          <div className="absolute top-4 left-4 opacity-30 pointer-events-none">
            <FiligreeCorner className="w-6 h-6 text-white" position="top-left" />
          </div>
          <div className="absolute top-4 right-4 opacity-30 pointer-events-none">
            <FiligreeCorner className="w-6 h-6 text-white" position="top-right" />
          </div>

          <div className="max-w-4xl">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner mb-6">
              {getServiceIcon(service.iconName)}
            </div>

            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#F3E5AB] font-bold block mb-2">
              SERVICE SHEET · WHAT WE DO
            </span>

            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-none">
              {service.title}
            </h1>

            <ServiceHeroAuditActions serviceTitle={service.title} />
          </div>
        </div>

        {/* Strict "What We Do" Action Scope Grid (Zero Verbose Explanations) */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/12 pb-4">
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              What We Do
            </h2>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold uppercase text-zinc-300 mr-1">
                <Wrench className="w-3.5 h-3.5 text-[#F3E5AB]" />
                <span>TOOLS:</span>
              </span>
              {service.specs.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/12 font-mono text-[11px] text-zinc-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {executionItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-5 bg-[#111115] border border-white/12 hover:border-white/30 transition-all flex items-start gap-3"
              >
                <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-zinc-200 shrink-0 mt-0.5 tabular-nums">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="flex items-start gap-2.5 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-[#F3E5AB] shrink-0 mt-0.5" />
                  <span className="font-sans text-sm font-semibold text-white leading-snug">
                    {item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Direct Action Card */}
        <div className="rounded-3xl p-8 sm:p-10 bg-white text-black text-center max-w-4xl mx-auto space-y-6 shadow-[0_0_50px_rgba(255,255,255,0.15)]">
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase leading-tight">
            Launch {service.title}
          </h2>
          <ServiceBottomAuditActions serviceTitle={service.title} />
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Link
              href="/#request-quote"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-black hover:bg-zinc-800 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
            >
              Request Custom Quote
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all"
            >
              All Services
            </Link>
          </div>
        </div>
      </main>

      <FooterMinimalBar />
    </div>
  );
}

function FooterMinimalBar() {
  return (
    <footer className="mt-16 border-t border-white/10 py-10 px-4 text-center text-xs font-mono text-zinc-300">
      <p>UNIT OF DESI MUCHADS DIGITAL LLP</p>
      <p className="mt-2">© 2026 DESI MUCHADS. ALL RIGHTS RESERVED.</p>
    </footer>
  );
}
