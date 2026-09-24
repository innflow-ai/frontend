import { industryHref, industryPages } from "@/content/industries";

export const footerNavigation = [
  {
    heading: "Product",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Agent OS", href: "/products/agent-os" },
      { label: "Agent Studio", href: "/products/agent-studio" },
      { label: "AI Agents", href: "/products/ai-agents" },
      { label: "Copilot", href: "/products/agent-os" },
      {
        label: "Agentic Workflows",
        href: "/products/agentic-workflows",
      },
      { label: "Agent Skills", href: "/skills" },
      { label: "AI Website Builder", href: "/features/website" },
      { label: "Databases", href: "/products/databases" },
      { label: "Templates", href: "/skills" },
    ],
  },
  {
    heading: "Industries",
    links: industryPages
      .filter((page) => page.group === "industry")
      .map((page) => ({ label: page.name, href: industryHref(page.slug) })),
  },
  {
    heading: "Teams & use cases",
    links: industryPages
      .filter((page) => page.group === "solution")
      .map((page) => ({ label: page.name, href: industryHref(page.slug) })),
  },
  {
    heading: "Comparisons",
    links: [
      { label: "Innflow vs Zapier", href: "/blog/innflow-vs-zapier" },
      { label: "Innflow vs n8n", href: "/blog/innflow-vs-n8n" },
      { label: "Innflow vs Make", href: "/blog/innflow-vs-make" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact us", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "Become an Affiliate", href: "/demo" },
      { label: "Customer Stories", href: "/blog" },
      { label: "Asset Library", href: "/blog" },
    ],
  },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Service", href: "/legal/terms-of-service" },
  { label: "Cookie Policy", href: "/legal/cookie-policy" },
  {
    label: "Acceptable Use Policy",
    href: "/legal/acceptable-use-policy",
  },
  { label: "EULA", href: "/legal/eula" },
  { label: "Privacy Request", href: "/legal/dsar" },
] as const;
