// Navigation imports only identities, not full industry workflow content.
export const industryIdentities = {
  "financial-services-banking": {
    slug: "financial-services-banking",
    name: "Financial Services & Banking",
  },
  finance: { slug: "finance", name: "Finance" },
  banking: { slug: "banking", name: "Banking" },
  insurance: { slug: "insurance", name: "Insurance" },
  healthcare: { slug: "healthcare", name: "Healthcare" },
  "retail-ecommerce": { slug: "retail-ecommerce", name: "Retail & eCommerce" },
  "property-real-estate": {
    slug: "property-real-estate",
    name: "Property & Real Estate",
  },
  "property-management": {
    slug: "property-management",
    name: "Property Management",
  },
  manufacturing: { slug: "manufacturing", name: "Manufacturing" },
  telecommunications: {
    slug: "telecommunications",
    name: "Telecommunications",
  },
  "professional-services": {
    slug: "professional-services",
    name: "Professional Services",
  },
  "business-process-outsourcing": {
    slug: "business-process-outsourcing",
    name: "Business Process Outsourcing",
  },
  "public-sector": { slug: "public-sector", name: "Public Sector" },
  "energy-utilities": { slug: "energy-utilities", name: "Energy & Utilities" },
  construction: { slug: "construction", name: "Construction" },
  "supply-chain-logistics": {
    slug: "supply-chain-logistics",
    name: "Supply Chain & Logistics",
  },
  "hospitality-travel": {
    slug: "hospitality-travel",
    name: "Hospitality & Travel",
  },
  pharmaceutical: { slug: "pharmaceutical", name: "Pharmaceutical" },
  "technology-software": {
    slug: "technology-software",
    name: "Technology & Software",
  },
  "private-equity": { slug: "private-equity", name: "Private Equity" },
  "cross-industry": { slug: "cross-industry", name: "Cross-industry" },
  "hr-recruitment": { slug: "hr-recruitment", name: "HR & Recruitment" },
  "customer-service": { slug: "customer-service", name: "Customer Service" },
  "debt-collection": { slug: "debt-collection", name: "Debt Collection" },
  "talent-acquisition": {
    slug: "talent-acquisition",
    name: "Talent Acquisition",
  },
  "custom-ai-solutions": {
    slug: "custom-ai-solutions",
    name: "Custom AI Solutions",
  },
} as const;

export const industryNavigation = Object.values(industryIdentities);
export const industryHref = (slug: string) => `/industries/${slug}`;
