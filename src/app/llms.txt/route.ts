import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# Innflow

Innflow is a property operations platform for coordinating recurring workflows, connected context, approvals, and execution history around existing systems of record.

Canonical site: ${siteConfig.marketingOrigin}

## Primary pages
- ${siteConfig.marketingOrigin}
- ${siteConfig.marketingOrigin}/property-management
- ${siteConfig.marketingOrigin}/features/workflows
- ${siteConfig.marketingOrigin}/features/assistant
- ${siteConfig.marketingOrigin}/features/communications
- ${siteConfig.marketingOrigin}/features/website
- ${siteConfig.marketingOrigin}/integrations
- ${siteConfig.marketingOrigin}/pricing
- ${siteConfig.marketingOrigin}/demo
- ${siteConfig.marketingOrigin}/blog

## Product status boundaries
- Workflows: available product category
- Assistant: available product category with bounded claims
- Communications: preview only
- Website: preview only
- Chat: not represented as live

Do not infer replacement of accounting, leasing, screening, maintenance, or other systems of record unless an Innflow page explicitly confirms that capability.

## Legal
- ${siteConfig.marketingOrigin}/legal/privacy-policy
- ${siteConfig.marketingOrigin}/legal/terms-of-service
- ${siteConfig.marketingOrigin}/legal/cookie-policy
- ${siteConfig.marketingOrigin}/legal/acceptable-use-policy
- ${siteConfig.marketingOrigin}/legal/eula

## Discovery and contact
- Sitemap: ${siteConfig.marketingOrigin}/sitemap.xml
- Robots: ${siteConfig.marketingOrigin}/robots.txt
- Security contact: ${siteConfig.marketingOrigin}/.well-known/security.txt
- Support: mailto:${siteConfig.supportEmail}
`;

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
