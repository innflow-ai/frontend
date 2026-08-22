import Image from "next/image";
import type { ReactNode } from "react";
import { type BreadcrumbItem, Breadcrumbs } from "@/components/breadcrumbs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";

export function MarketingPage({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  status,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  status?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: ReactNode;
}) {
  return (
    <section className="subpage-hero">
      <div className="shell subpage-hero-grid">
        <div>
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
          <div className="eyebrow-row">
            <span className="section-label">{eyebrow}</span>
            {status ? (
              <span className={`status-label status-${status.toLowerCase()}`}>
                {status}
              </span>
            ) : null}
          </div>
          <h1>{title}</h1>
        </div>
        <div className="subpage-hero-copy">
          <p>{description}</p>
          <div className="cta-row">
            <TrackedLink
              className="button button-primary"
              destination={siteConfig.demoUrl}
              eventLabel={`${eyebrow.toLowerCase().replaceAll(" ", "_")}_demo`}
            >
              {siteConfig.primaryCta}
              <span aria-hidden="true">↗</span>
            </TrackedLink>
            <a className="button button-secondary" href="/property-management">
              See the property workflow
            </a>
          </div>
        </div>
      </div>
      {children ? (
        <div className="shell subpage-hero-media">{children}</div>
      ) : null}
    </section>
  );
}

export function EvidenceBlock({
  title = "Grounded in product evidence",
  items,
}: {
  title?: string;
  items: readonly string[];
}) {
  return (
    <section className="evidence-block" aria-label={title}>
      <div className="shell evidence-grid">
        <p>{title}</p>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function OperatingSteps({
  title,
  intro,
  steps,
}: {
  title: string;
  intro: string;
  steps: readonly string[];
}) {
  return (
    <section className="section">
      <div className="shell editorial-grid">
        <div className="editorial-intro">
          <span className="section-label">Operating model</span>
          <h2>{title}</h2>
          <p>{intro}</p>
        </div>
        <ol className="numbered-list">
          {steps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ControlsGrid({
  eyebrow = "Operational controls",
  title,
  items,
}: {
  eyebrow?: string;
  title: string;
  items: readonly { title: string; body: string }[];
}) {
  return (
    <section className="section quiet-section">
      <div className="shell">
        <div className="section-intro compact-intro">
          <span className="section-label">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <div className="control-card-grid">
          {items.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqList({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details key={item.question} open={index === 0}>
          <summary>
            <span>{item.question}</span>
            <i aria-hidden="true">+</i>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function FinalCta({
  title = "Start with one operation worth making repeatable.",
  body = "Bring one workflow and the systems it touches. We’ll separate what is available, what requires configuration, and what remains a preview.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="final-cta-section">
      <div className="shell final-cta">
        <span className="section-label label-dark">One clear next step</span>
        <h2>{title}</h2>
        <p>{body}</p>
        <TrackedLink
          className="button button-light"
          destination={siteConfig.demoUrl}
          eventLabel="supporting_page_final_demo"
        >
          {siteConfig.primaryCta}
          <span aria-hidden="true">↗</span>
        </TrackedLink>
      </div>
    </section>
  );
}

export type MediaSource =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | {
      kind: "video";
      src: string;
      poster: string;
      captions: string;
      label: string;
    };

export function ProductDemoFrame({
  label,
  status,
  media,
}: {
  label: string;
  status?: string;
  media: MediaSource;
}) {
  return (
    <figure className="product-frame image-frame reusable-media-frame">
      <figcaption className="frame-header">
        <span aria-hidden="true">•••</span>
        <span>{label}</span>
        <strong>{status ?? "Product evidence"}</strong>
      </figcaption>
      {media.kind === "image" ? (
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          sizes="(max-width: 760px) 92vw, 960px"
        />
      ) : (
        <video controls preload="metadata" poster={media.poster}>
          <source src={media.src} />
          <track
            kind="captions"
            src={media.captions}
            srcLang="en"
            label="English"
            default
          />
          {media.label}
        </video>
      )}
    </figure>
  );
}
