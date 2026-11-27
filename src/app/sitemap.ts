import { MetadataRoute } from "next";
import { AGENCY_SERVICES } from "@/data/servicesData";
import { AGENCY_PROJECTS } from "@/data/projectsData";
import { DEMO_PROJECTS_DATABASE } from "@/data/demoProductsData";

const SERVICE_HERO_IMAGES: Record<string, string> = {
  "meta-google-ads": "/projects/snacknation-hero.jpg",
  "social-media": "/projects/streetthreads-handloom-hero.jpg",
  "web-development": "/projects/you-and-me-hero.webp",
  branding: "/projects/saffron-sage-hero.webp",
  "ecommerce-services": "/projects/urbandrift-ev-hero.jpg",
  "quick-commerce": "/projects/chaichaska-tea-hero.jpg",
  "packaging-label": "/projects/currycraft-hero.png",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://desimuchads.in";
  const lastModified = "2026-11-27T04:20:00.000Z";

  const toAbsolute = (path: string) =>
    path.startsWith("http") ? path : `${baseUrl}${path}`;

  // 1. Core Landing & Main Routes (with key brand visuals for Google Image indexing)
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
      images: [
        `${baseUrl}/og-banner.png`,
        `${baseUrl}/art/desi-dev-guru.png`,
        `${baseUrl}/desi-muchads-square-logo.png`,
        `${baseUrl}/desi-muchads-cropped-logo@2x.png`,
      ],
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      images: [
        `${baseUrl}/team/rahul-datta.png`,
        `${baseUrl}/team/brinta-deb.webp`,
        `${baseUrl}/team/omkar-dutta.webp`,
        `${baseUrl}/art/indian-art-bg-royal.jpg`,
      ],
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      images: Object.values(SERVICE_HERO_IMAGES).map(toAbsolute),
    },
    {
      url: `${baseUrl}/work`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      images: Array.from(
        new Set(
          AGENCY_PROJECTS.map((p) => p.thumbnail)
            .filter((img): img is string => Boolean(img && img.startsWith("/")))
            .map(toAbsolute)
        )
      ),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      images: [`${baseUrl}/og-banner.png`],
    },
  ];

  // 2. Dedicated Service Capability Pages
  AGENCY_SERVICES.forEach((service) => {
    const heroImg = SERVICE_HERO_IMAGES[service.slug] || "/og-banner.png";
    routes.push({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [toAbsolute(heroImg)],
    });
  });

  // 3. Strategic Case Studies
  AGENCY_PROJECTS.forEach((project) => {
    const localImages = [project.thumbnail, project.fullImage]
      .filter((img): img is string => Boolean(img && img.startsWith("/")))
      .map(toAbsolute);

    routes.push({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
      ...(localImages.length > 0 ? { images: Array.from(new Set(localImages)) } : {}),
    });
  });

  // 4. Live Interactive Production Demo Storefronts
  Object.entries(DEMO_PROJECTS_DATABASE).forEach(([demoSlug, config]) => {
    const localImages = config.products
      .map((prod) => prod.image)
      .filter((img): img is string => Boolean(img && img.startsWith("/")))
      .map(toAbsolute);

    routes.push({
      url: `${baseUrl}/demos/${demoSlug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      ...(localImages.length > 0 ? { images: Array.from(new Set(localImages)) } : {}),
    });
  });

  return routes;
}
