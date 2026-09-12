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
      { source: "/BL/BL-about", destination: "/about", permanent: true },
      {
        source: "/BL/BL-advisor-partner-program",
        destination: "/advisor-partner-program",
        permanent: true,
      },
      { source: "/BL/BL-careers", destination: "/careers", permanent: true },
      {
        source: "/BL/BL-connections",
        destination: "/connections",
        permanent: true,
      },
      { source: "/BL/BL-demo", destination: "/demo", permanent: true },
      {
        source: "/BL/BL-free-rental-forms-and-templates-for-landlords",
        destination: "/free-rental-forms-and-templates-for-landlords",
        permanent: true,
      },
      {
        source: "/BL/BL-help-center",
        destination: "/help-center",
        permanent: true,
      },
      { source: "/BL/BL-home", destination: "/", permanent: true },
      {
        source: "/BL/BL-how-much-should-i-charge-for-rent",
        destination: "/how-much-should-i-charge-for-rent",
        permanent: true,
      },
      {
        source: "/BL/BL-in-the-news",
        destination: "/in-the-news",
        permanent: true,
      },
      {
        source: "/BL/BL-landlord-accounting",
        destination: "/landlord-accounting",
        permanent: true,
      },
      {
        source: "/BL/BL-landlord-banking",
        destination: "/landlord-banking",
        permanent: true,
      },
      {
        source: "/BL/BL-landlord-banking-apy",
        destination: "/landlord-banking-apy",
        permanent: true,
      },
      {
        source: "/BL/BL-landlord-insurance",
        destination: "/landlord-insurance",
        permanent: true,
      },
      {
        source: "/BL/BL-landlord-referral",
        destination: "/landlord-referral",
        permanent: true,
      },
      {
        source: "/BL/BL-lease-agreement",
        destination: "/lease-agreement",
        permanent: true,
      },
      {
        source: "/BL/BL-legal-agreements",
        destination: "/legal-agreements",
        permanent: true,
      },
      {
        source: "/BL/BL-long-term-rentals",
        destination: "/long-term-rentals",
        permanent: true,
      },
      {
        source: "/BL/BL-mid-term-rentals",
        destination: "/mid-term-rentals",
        permanent: true,
      },
      {
        source: "/BL/BL-multi-property-investors",
        destination: "/multi-property-investors",
        permanent: true,
      },
      {
        source: "/BL/BL-our-customers",
        destination: "/our-customers",
        permanent: true,
      },
      {
        source: "/BL/BL-partner-with-us",
        destination: "/partner-with-us",
        permanent: true,
      },
      { source: "/BL/BL-pricing", destination: "/pricing", permanent: true },
      {
        source: "/BL/BL-privacy-policy",
        destination: "/legal/privacy-policy",
        permanent: true,
      },
      {
        source: "/BL/BL-product-updates",
        destination: "/product-updates",
        permanent: true,
      },
      {
        source: "/BL/BL-real-estate-investing",
        destination: "/real-estate-investing",
        permanent: true,
      },
      {
        source: "/BL/BL-rent-collection",
        destination: "/rent-collection",
        permanent: true,
      },
      {
        source: "/BL/BL-rent-collection-2",
        destination: "/rent-collection-2",
        permanent: true,
      },
      {
        source: "/BL/BL-rental-property-loans",
        destination: "/rental-property-loans",
        permanent: true,
      },
      { source: "/BL/BL-renters", destination: "/renters", permanent: true },
      {
        source: "/BL/BL-resources",
        destination: "/resources",
        permanent: true,
      },
      { source: "/BL/BL-security", destination: "/security", permanent: true },
      {
        source: "/BL/BL-security-deposit-account",
        destination: "/security-deposit-account",
        permanent: true,
      },
      {
        source: "/BL/BL-short-term-rentals",
        destination: "/short-term-rentals",
        permanent: true,
      },
      {
        source: "/BL/BL-tax-preparation",
        destination: "/tax-preparation",
        permanent: true,
      },
      {
        source: "/BL/BL-tenant-screening-service",
        destination: "/tenant-screening-service",
        permanent: true,
      },
      {
        source: "/BL/BL-terms-of-use",
        destination: "/legal/terms-of-service",
        permanent: true,
      },
      { source: "/BL/BL-webinars", destination: "/webinars", permanent: true },
      { source: "/BL", destination: "/", permanent: true },
      { source: "/homepage-baselane", destination: "/", permanent: true },

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
