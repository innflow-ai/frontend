import { JsonLd } from "@/components/json-ld";
import { RuneyLanding } from "@/components/runey-landing";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Property Management Workflow Automation | Innflow",
  description:
    "Connect recurring property management workflows, approvals, files, and operational context around the systems your team already uses with Innflow.",
  path: "/property-management",
});

export default function PropertyManagementPage() {
  return (
    <>
      <RuneyLanding property />
      <JsonLd
        value={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: siteConfig.marketingOrigin,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Property management",
              item: `${siteConfig.marketingOrigin}/property-management`,
            },
          ],
        }}
      />
    </>
  );
}
