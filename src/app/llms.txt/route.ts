import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# Innflow

Innflow is presented as an operations platform for property-management teams coordinating recurring workflows around existing systems of record.

## Primary pages
- ${siteConfig.marketingOrigin}/property-management
- ${siteConfig.marketingOrigin}/features/workflows
- ${siteConfig.marketingOrigin}/features/assistant
- ${siteConfig.marketingOrigin}/integrations
- ${siteConfig.marketingOrigin}/pricing
- ${siteConfig.marketingOrigin}/demo

## Product status boundaries
- Workflows: available product category
- Assistant: available product category with bounded claims
- Communications: preview only
- Website: preview only
- Chat: not represented as live

## Legal
- ${siteConfig.marketingOrigin}/privacy
- ${siteConfig.marketingOrigin}/terms
- ${siteConfig.marketingOrigin}/cookies
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
