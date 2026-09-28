
import { ArrowDown as MageArrowDown } from '@/components/icons/mage';
import { BaselineClosing } from "@/app/preview/scroll-showcase/baseline-lower-sections";
import { IntegrationDirectory } from "@/components/integration-directory";
import styles from "@/components/integrations.module.css";
import { ShowcaseTheme } from "@/components/showcase-theme";
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
    <ShowcaseTheme>
      <main id="main-content" className={styles.page}>
        <header className={styles.hero}>
          <div className="shell">
            <span className={styles.eyebrow}>Apps & integrations</span>
            <h1>
              Your tools.
              <br />
              <span>One connected workflow.</span>
            </h1>
            <p>
              Explore connections for the tools your team already uses. Find an
              integration, see what it does, and check its availability.
            </p>
            <a className={styles.browseLink} href="#integration-directory">
              Explore integrations <span aria-hidden="true"><MageArrowDown size="1em" /></span>
            </a>
          </div>
        </header>
        <IntegrationDirectory items={items} />
        <BaselineClosing />
      </main>
    </ShowcaseTheme>
  );
}
