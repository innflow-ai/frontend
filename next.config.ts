import type { NextConfig } from "next";

const appOrigin = (
  process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.innflow.ai"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
    ],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/login",
        destination: `${appOrigin}/login`,
        permanent: false,
      },
      {
        source: "/solution/property-management",
        destination: "/property-management",
        permanent: true,
      },
      {
        source: "/product/agentic-workflows",
        destination: "/products/agentic-workflows",
        permanent: true,
      },
      {
        source: "/product/ai-agents",
        destination: "/products/ai-agents",
        permanent: true,
      },
      {
        source: "/product/agent-os",
        destination: "/products/agent-os",
        permanent: true,
      },
      {
        source: "/product/platform",
        destination: "/products/platform",
        permanent: true,
      },
      {
        source: "/product/databases",
        destination: "/products/databases",
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
      {
        source: "/eula",
        destination: "/legal/eula",
        permanent: true,
      },
      {
        source: "/dsar",
        destination: "/legal/dsar",
        permanent: true,
      },
      {
        source: "/blog-2-cms",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog-2-cms/:slug*",
        destination: "/blog/:slug*",
        permanent: true,
      },
      {
        source: "/blog-to-cms",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog-to-cms/:slug*",
        destination: "/blog/:slug*",
        permanent: true,
      },
      {
        source: "/blog_deprecated",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog_deprecated/:slug*",
        destination: "/blog/:slug*",
        permanent: true,
      },
      {
        source: "/agent-skills",
        destination: "/skills",
        permanent: true,
      },
      {
        source: "/agent-skills/:slug*",
        destination: "/skills/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
