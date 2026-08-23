import {
  PortableText,
  type PortableTextComponents,
  type PortableTextTypeComponentProps,
} from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { MarketingPage } from "@/components/page-primitives";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import { urlForImage } from "@/lib/sanity";
import { getSkillBySlug, getSkillSlugs, skillColorValue } from "@/lib/skills";
import styles from "./page.module.css";

export const revalidate = 60;

type RouteParams = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getSkillSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);

  if (!skill) {
    return createPageMetadata({
      title: "Skill not found | Innflow",
      description: "The requested agent skill could not be found.",
      path: `/skills/${slug}`,
      noIndex: true,
    });
  }

  const description =
    skill.shortDescription?.trim() ||
    `${skill.name} — a ready-made agent skill in the Innflow skills library.`;

  return createPageMetadata({
    title: `${skill.name} | Innflow Agent Skills`,
    description,
    path: `/skills/${skill.slug}`,
  });
}

type BodyImageValue = {
  alt?: string;
  asset?: { _ref?: string };
};

function BodyImage({ value }: PortableTextTypeComponentProps<BodyImageValue>) {
  if (!value?.asset?._ref) return null;
  const src = urlForImage(value).width(1200).auto("format").url();
  return (
    <figure className={styles.bodyImage}>
      <Image
        src={src}
        alt={value.alt ?? ""}
        width={1200}
        height={675}
        sizes="(max-width: 760px) 92vw, 760px"
      />
      {value.alt ? <figcaption>{value.alt}</figcaption> : null}
    </figure>
  );
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: BodyImage,
  },
  block: {
    h2: ({ children }: { children?: ReactNode }) => <h2>{children}</h2>,
    h3: ({ children }: { children?: ReactNode }) => <h3>{children}</h3>,
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote>{children}</blockquote>
    ),
  },
  marks: {
    code: ({ children }: { children?: ReactNode }) => <code>{children}</code>,
    link: ({
      children,
      value,
    }: {
      children?: ReactNode;
      value?: { href?: string };
    }) => {
      const href = value?.href ?? "#";
      const isExternal = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer noopener" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export default async function SkillDetailPage({ params }: RouteParams) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  if (!skill) notFound();

  const accent = skillColorValue(skill.color, skill.cardColor);
  const canonical = new URL(
    `/skills/${skill.slug}`,
    siteConfig.marketingOrigin,
  ).toString();
  const iconUrl = skill.icon
    ? urlForImage(skill.icon)
        .width(96)
        .height(96)
        // biome-ignore lint/suspicious/noFocusedTests: `fit` is the image-url crop API, not a test
        .fit("crop")
        .auto("format")
        .url()
    : null;

  return (
    <MarketingPage>
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
              name: "Skills",
              item: new URL("/skills", siteConfig.marketingOrigin).toString(),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: skill.name,
              item: canonical,
            },
          ],
        }}
      />
      <section className={styles.hero}>
        <div className={`shell ${styles.article}`}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Skills", href: "/skills" },
              { label: skill.name },
            ]}
          />
          <div className={styles.heroMeta}>
            <span
              className={styles.dot}
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />
            {skill.category ? (
              <span className={styles.chip}>{skill.category.title}</span>
            ) : null}
          </div>
          <h1>{skill.name}</h1>
          {skill.shortDescription ? (
            <p className={styles.lede}>{skill.shortDescription}</p>
          ) : null}
          <div className={styles.facts}>
            {iconUrl ? (
              <Image
                src={iconUrl}
                alt={skill.icon?.alt ?? skill.name}
                width={48}
                height={48}
                className={styles.icon}
              />
            ) : null}
            {skill.builtBy ? (
              <p className={styles.builtBy}>Built by {skill.builtBy}</p>
            ) : null}
          </div>
        </div>
      </section>
      {skill.longDescription ? (
        <div className={`shell ${styles.body}`}>
          <PortableText
            value={skill.longDescription}
            components={portableTextComponents}
          />
        </div>
      ) : null}
      <section className={styles.cta}>
        <div className={`shell ${styles.article}`}>
          <h2>Put this skill to work.</h2>
          <p>
            See how Innflow agents run skills like this one against your real
            systems and workflows.
          </p>
          <div className="cta-row">
            <a className="button button-primary" href="/demo">
              Book a demo
            </a>
            <a className="button button-secondary" href="/pricing">
              See pricing
            </a>
          </div>
        </div>
      </section>
      <div className={`shell ${styles.footerNav}`}>
        <a className={styles.backLink} href="/skills">
          <span aria-hidden="true">←</span> Back to skills
        </a>
      </div>
    </MarketingPage>
  );
}
