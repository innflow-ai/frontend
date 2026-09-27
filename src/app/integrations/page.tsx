import { CalendlyProductPage } from "@/components/calendly-product-page";
import { IntegrationDirectory } from "@/components/integration-directory";
import { getIntegrations } from "@/lib/integrations";
import { createPageMetadata } from "@/lib/metadata";
export const revalidate = 60;
export const metadata = createPageMetadata({
  title: "Integrations & Roadmap | Innflow",
  description:
    "Explore Innflow integrations and planned connections. Find the tools your team uses and see what’s available or on the roadmap.",
  path: "/integrations",
});
export default async function IntegrationsPage() {
  const items = await getIntegrations();
  return (
    <CalendlyProductPage
      content={{
        path: "/integrations",
        name: "Integrations",
        title: "Your tools. One connected workflow.",
        description:
          "Explore connections for the tools your team already uses, and the ones we’re planning next.",
        intro: [
          {
            eyebrow: "The integration directory",
            title: "Every integration includes its current availability.",
          },
        ],
      }}
    >
      <IntegrationDirectory items={items} />
    </CalendlyProductPage>
  );
}
