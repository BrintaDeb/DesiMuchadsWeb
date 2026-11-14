import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DESI MUCHADS ✦ High-ROAS Performance & Neo-Desi Creative Agency",
    short_name: "Desi Muchads",
    description:
      "Unapologetic Desi Roots. Ruthless Global ROI. High-converting marketing architectures, viral reels, and full-stack web platforms.",
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#09090b",
    theme_color: "#09090b",
    categories: ["business", "marketing", "productivity", "utilities"],
    icons: [
      {
        src: "/brand-logo-white.jpg",
        sizes: "192x192",
        type: "image/jpeg",
        purpose: "maskable",
      },
      {
        src: "/brand-logo-white.jpg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

