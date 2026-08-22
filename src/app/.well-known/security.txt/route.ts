import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export function GET() {
  const canonical = `${siteConfig.marketingOrigin}/.well-known/security.txt`;
  const body = `Contact: mailto:${siteConfig.supportEmail}
Expires: 2027-08-21T23:59:59.000Z
Preferred-Languages: en
Canonical: ${canonical}
`;

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
