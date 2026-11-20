import { BaselineClosing } from "@/app/preview/scroll-showcase/baseline-closing";
import { ArrowDown as MageArrowDown } from "@/components/icons/mage";
import { IntegrationDirectory } from "@/components/integration-directory";
import styles from "@/components/integrations.module.css";
import { MixedHeadingText } from "@/components/mixed-heading-text";
import { ShowcaseTheme } from "@/components/showcase-theme";
import { getIntegrations } from "@/lib/integrations";
import { createPageMetadata } from "@/lib/metadata";
export const revalidate = 60;
export const metadata = createPageMetadata({
  title: "Integrations & Roadmap | Innflow",
  description:
    "Connect your CRM, support desk, and file tools. Agents gather details, take configured actions, and send results back to your team.",
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
            <h1 data-mixed-heading>
              <MixedHeadingText>
                Put AI agents to work
                <br />
                <span>in the tools you already use.</span>
              </MixedHeadingText>
            </h1>
            <p>
              Connect your CRM, support desk, and file tools. Agents can gather
              the details, take the actions you configure, and send the results
              back to your team.
            </p>
            <a className={styles.browseLink} href="#integration-directory">
              Explore integrations{" "}
              <span aria-hidden="true">
                <MageArrowDown size="1em" />
              </span>
            </a>
          </div>
        </header>
        <IntegrationDirectory items={items} />
        <BaselineClosing />
      </main>
    </ShowcaseTheme>
  );
}
