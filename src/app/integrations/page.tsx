import { Breadcrumbs } from "@/components/breadcrumbs";
import { IntegrationDirectory } from "@/components/integration-directory";
import styles from "@/components/integrations.module.css";
import { MarketingPage } from "@/components/page-primitives";
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
    <MarketingPage>
      <header className={styles.hero}>
        <div className="shell">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Integrations" }]}
          />
          <span className={styles.eyebrow}>The integration directory</span>
          <h1>
            Your tools.
            <br />
            <span>One connected workflow.</span>
          </h1>
          <p>
            Explore connections for the tools your team already uses, and the
            ones we’re planning next.
          </p>
          <div className={styles.heroNote}>
            <span aria-hidden="true">◎</span> Every integration includes its
            current availability.
          </div>
        </div>
      </header>
      <IntegrationDirectory items={items} />
    </MarketingPage>
  );
}
