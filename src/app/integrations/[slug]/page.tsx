import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  IntegrationCard,
  IntegrationLogo,
} from "@/components/integration-card";
import styles from "@/components/integrations.module.css";
import { MarketingPage } from "@/components/page-primitives";
import { integrationStatus } from "@/lib/integration-model";
import { getIntegration, getIntegrations } from "@/lib/integrations";
import { createPageMetadata } from "@/lib/metadata";
export const revalidate = 60;
type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  return (await getIntegrations()).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const item = await getIntegration((await params).slug);
  if (!item) return { title: "Integration not found | Innflow" };
  return createPageMetadata({
    title: item.seoTitle || `${item.name} Integration | Innflow`,
    description:
      item.seoDescription ||
      `${integrationStatus(item.status).label}: ${item.shortDescription}`,
    path: `/integrations/${item.slug}`,
  });
}
export default async function IntegrationPage({ params }: Props) {
  const item = await getIntegration((await params).slug);
  if (!item) notFound();
  const status = integrationStatus(item.status);
  const related = (await getIntegrations())
    .filter((i) => i.slug !== item.slug)
    .sort(
      (a, b) =>
        Number(b.category?.slug === item.category?.slug) -
        Number(a.category?.slug === item.category?.slug),
    )
    .slice(0, 3);
  return (
    <MarketingPage>
      <div className={`shell ${styles.detail}`}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Integrations", href: "/integrations" },
            { label: item.name },
          ]}
        />
        <div className={styles.detailGrid}>
          <aside className={styles.detailSidebar}>
            <IntegrationLogo item={item} />
            <h2>{item.name}</h2>
            <span className={styles.badge} data-status={item.status}>
              {status.label}
            </span>
            <dl>
              <dt>Category</dt>
              <dd>{item.category?.title ?? "Other"}</dd>
              <dt>Connects with</dt>
              <dd>Innflow</dd>
            </dl>
            <Link
              className="button button-primary"
              href={`/contact?integration=${encodeURIComponent(item.name)}`}
            >
              {status.cta} ↗
            </Link>
            {item.websiteUrl && (
              <a
                className={styles.vendor}
                href={item.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {item.name} ↗
              </a>
            )}
          </aside>
          <article className={styles.detailBody}>
            <span className={styles.eyebrow}>Innflow integrations</span>
            <h1>{item.name}</h1>
            <p className={styles.lead}>{item.shortDescription}</p>
            <div className={styles.statusNote}>
              <strong>{status.label}</strong>
              <p>{status.description}</p>
              {item.statusNote && <p>{item.statusNote}</p>}
            </div>
            {item.overview && (
              <section>
                <h2>About this connection</h2>
                <p>{item.overview}</p>
              </section>
            )}
            {Boolean(item.useCases?.length) && (
              <section>
                <h2>
                  {item.status === "available"
                    ? "What you can do"
                    : "Planned use cases"}
                </h2>
                {item.useCases?.map((useCase) => (
                  <div className={styles.useCase} key={useCase._key}>
                    <h3>{useCase.title}</h3>
                    <p>{useCase.description}</p>
                  </div>
                ))}
              </section>
            )}
            <section className={styles.nextStep}>
              <h2>Bring your workflow into the conversation.</h2>
              <p>
                Tell us what you want to connect, which accounts you use, and
                where your team needs the next step to happen.
              </p>
              <Link
                href={`/contact?integration=${encodeURIComponent(item.name)}`}
              >
                {status.cta} ↗
              </Link>
            </section>
          </article>
        </div>
        {related.length > 0 && (
          <section className={styles.related}>
            <div className={styles.relatedHeading}>
              <h2>Explore more connections</h2>
              <Link href="/integrations">View all integrations ↗</Link>
            </div>
            <div className={styles.grid}>
              {related.map((i) => (
                <IntegrationCard key={i._id} item={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </MarketingPage>
  );
}
