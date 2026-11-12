import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DESI MUCHADS ✦ High-ROAS Performance & Creative Agency",
    short_name: "Desi Muchads",
    description:
      "Unapologetic Desi Roots. Ruthless Global ROI. High-converting marketing architectures, viral reels, and full-stack web platforms.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
