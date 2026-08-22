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
        source: "/legal/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/legal/terms-of-service",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/legal/cookie-policy",
        destination: "/cookies",
        permanent: true,
      },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-of-service", destination: "/terms", permanent: true },
      { source: "/cookie-policy", destination: "/cookies", permanent: true },
    ];
  },
};

export default nextConfig;
