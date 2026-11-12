import { MetadataRoute } from "next";
import { AGENCY_SERVICES } from "@/data/servicesData";
import { AGENCY_PROJECTS } from "@/data/projectsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://desimuchads.agency";
  const currentDate = new Date("2025-01-01");

  // 1. Core Pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // 2. 8 Dedicated Service Capability Pages
  AGENCY_SERVICES.forEach((service) => {
    routes.push({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  });

  // 3. 16 Human-Grade Strategic Case Studies
  AGENCY_PROJECTS.forEach((project) => {
    routes.push({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  // 4. 16 Original Live Interactive Demo Products
  AGENCY_PROJECTS.forEach((project) => {
    routes.push({
      url: `${baseUrl}/demos/${project.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return routes;
}
