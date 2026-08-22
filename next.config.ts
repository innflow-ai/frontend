import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/contact", destination: "/demo", permanent: true },
      {
        source: "/solution/property-management",
        destination: "/property-management",
        permanent: true,
      },
      {
        source: "/product/agentic-workflows",
        destination: "/features/workflows",
        permanent: true,
      },
      {
        source: "/product/ai-agents",
        destination: "/features/assistant",
        permanent: true,
      },
      {
        source: "/product/agent-os",
        destination: "/features/assistant",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/legal/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/legal/terms-of-service",
        permanent: true,
      },
      {
        source: "/cookies",
        destination: "/legal/cookie-policy",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/legal/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/legal/terms-of-service",
        permanent: true,
      },
      {
        source: "/cookie-policy",
        destination: "/legal/cookie-policy",
        permanent: true,
      },
      {
        source: "/acceptable-use-policy",
        destination: "/legal/acceptable-use-policy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
