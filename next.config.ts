import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  cacheComponents: true,
  partialPrefetching: true,
  outputFileTracingIncludes: {
    "/api/download-apk": ["./public/downloads/**/*"],
  },
  outputFileTracingExcludes: {
    "/api/*": [
      "./public/projects/**/*",
      "./public/art/**/*",
      "./public/team/**/*",
      "./scratch/**/*",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "brinta-deb-portfolio.onrender.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: ".*\\.vercel\\.app",
          },
        ],
        destination: "https://desimuchads.in/:path*",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/services/seo-sem",
        destination: "/services/meta-google-ads",
        permanent: true,
      },
      {
        source: "/services/performance-marketing",
        destination: "/services/meta-google-ads",
        permanent: true,
      },
      {
        source: "/services/lead-generation",
        destination: "/services/meta-google-ads",
        permanent: true,
      },
      {
        source: "/services/unit-economics",
        destination: "/services/ecommerce-services",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: ".*\\.vercel\\.app",
          },
        ],
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Link",
            value: '<https://desimuchads.in/.well-known/ard.json>; rel="ard"',
          },
        ],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
