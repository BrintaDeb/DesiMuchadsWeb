import { MetadataRoute } from "next";
import { AGENCY_SERVICES } from "@/data/servicesData";
import { AGENCY_PROJECTS } from "@/data/projectsData";
import { DEMO_PROJECTS_DATABASE } from "@/data/demoProductsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://desimuchads.agency";
  const currentDate = new Date();

  // 1. Core Landing & Main Anchor Routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // 2. 8 Dedicated Service Capability Pages
  AGENCY_SERVICES.forEach((service) => {
    routes.push({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  // 3. 46 Human-Grade Strategic Case Studies
  AGENCY_PROJECTS.forEach((project) => {
    routes.push({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  });

  // 4. Live Interactive Production Demo Storefronts
  Object.keys(DEMO_PROJECTS_DATABASE).forEach((demoSlug) => {
    routes.push({
      url: `${baseUrl}/demos/${demoSlug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  return routes;
}

