import { Geist } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ChevronRight } from "@/components/chevron-right";
import {
  Plus as MagePlus,
  StarsA as MageStarsA,
} from "@/components/icons/mage";
import { siteConfig } from "@/config/site";
import {
  getProductDesign,
  productDesignRoutes,
} from "@/content/product-design-rotation";
import styles from "./calendly-product-page.module.css";
import { JsonLd } from "./json-ld";
import {
  type ArtworkPlacement,
  artworkAssets,
  artworkPages,
  placementAttributes,
} from "./product-artwork/inventory";
import { ProductArtwork } from "./product-artwork/product-artwork";
import { TrackedLink } from "./tracked-link";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export type CalendlyFeature = {
  id: string;
  label?: string;
  title: string;
  body: string;
  points?: string[];
  image?: { src: string; alt: string };
  artwork?: ReactNode;
  href?: string;
};
export type CalendlyPageContent = {
  path: string;
  name: string;
  title: string;
  description: string;
  intro?: { eyebrow?: string; title: string; body?: string }[];
  features?: CalendlyFeature[];
  cards?: CalendlyFeature[];
  heroArtwork?: ReactNode;
  faqs?: { question: string; answer: string }[];
  faqHeading?: string;
  faqDescription?: string;
  signupNotice?: boolean;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  closing?: {
    title: string;
    body: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
  }[];
};

function Artwork({
  item,
  placement,
  compact = false,
}: {
  item: CalendlyFeature;
  placement?: ArtworkPlacement | null;
  compact?: boolean;
}) {
  return (
    <div className={styles.artwork} {...placementAttributes(placement)}>
      {placement ? (
        <ProductArtwork
          assetId={placement.assetId}
          density={compact ? "compact" : "full"}
        />
      ) : (
        (item.artwork ??
        (item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={1160}
            height={1160}
            sizes="(max-width: 800px) 92vw, 580px"
          />
        ) : (
          <div className={styles.contextCard}>
            <span className={styles.cardMark} aria-hidden="true">
              <MageStarsA size="1em" />
            </span>
            <strong>{item.title}</strong>
            {item.points?.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        )))
      )}
    </div>
  );
}

export function CalendlyProductPage({
  content,
  children,
  testimonials,
}: {
  content: CalendlyPageContent;
  children?: ReactNode;
  testimonials?: ReactNode;
}) {
  const variant = getProductDesign(content.path);
  if (!variant)
    throw new Error(`No Product navigation design assigned: ${content.path}`);
  const inventory = artworkPages[content.path];
  const features = content.features ?? [];
  const cards = content.cards ?? [];
  const primary = content.primaryCta ?? {
    label: "Get started",
    href: siteConfig.signupUrl,
  };
  const secondary = content.secondaryCta ?? {
    label: "Get a demo",
    href: siteConfig.demoUrl,
  };
  const related = productDesignRoutes
    .filter((route) => route.path !== content.path)
    .slice(0, 5);
  const featureStart = features.slice(0, Math.min(4, features.length));
  const spotlight = content.heroArtwork ? (
    <section
      className={styles.spotlight}
      aria-label={`${content.name} overview`}
    >
      <div className={styles.centerHeading}>
        <span className={styles.eyebrow}>{content.name} in focus</span>
        <h2>{content.intro?.[0]?.title ?? content.title}</h2>
      </div>
      <div
        className={styles.spotlightMedia}
        {...placementAttributes(inventory?.overview)}
      >
        {inventory?.overview &&
        artworkAssets[inventory.overview.assetId].action !== "Reuse" ? (
          <div className={styles.spotlightArtwork}>
            <ProductArtwork
              assetId={inventory.overview.assetId}
              density="wide"
            />
          </div>
        ) : (
          content.heroArtwork
        )}
      </div>
    </section>
  ) : null;
  return (
    <main
      id="main-content"
      className={`${styles.page} ${geist.variable}`}
      data-product-design={variant}
      data-product-path={content.path}
      style={
        {
          "--calendly-hero": `url(/brand/calendly/${variant}-hero.svg)`,
        } as CSSProperties
      }
    >
      <header className={styles.hero}>
        <div
          className={styles.heroSurface}
          {...placementAttributes(inventory?.hero)}
        >
          <div className={styles.productTag}>
            <span className={styles.productIcon} aria-hidden="true">
              <MageStarsA size="1em" />
            </span>
            <span>{content.name}</span>
          </div>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
          <div className={styles.actions}>
            <TrackedLink
              className={styles.primary}
              destination={primary.href}
              eventLabel={`${content.path}_primary`}
            >
              {primary.label}
            </TrackedLink>
            <TrackedLink
              className={styles.secondary}
              destination={secondary.href}
              eventLabel={`${content.path}_secondary`}
            >
              {secondary.label}
            </TrackedLink>
          </div>
          {content.signupNotice && (
            <small className={styles.signupNotice}>
              By continuing, you agree to our{" "}
              <Link href="/legal/terms-of-service">Terms of Service</Link> and
              acknowledge our{" "}
              <Link href="/legal/privacy-policy">Privacy Policy</Link>.
            </small>
          )}
        </div>
      </header>

      {features.length > 0 && (
        <section
          className={styles.capabilities}
          aria-label={`${content.name} capabilities`}
        >
          <div className={styles.capabilityCopy}>
            <span className={styles.eyebrow}>
              {content.intro?.[0]?.eyebrow ?? `${content.name} capabilities`}
            </span>
            <h2>{content.intro?.[0]?.title ?? features[0].title}</h2>
            {content.intro?.[0]?.body && <p>{content.intro[0].body}</p>}
            <div className={styles.capabilityRows}>
              {featureStart.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  <h3>
                    {item.label ?? item.title}
                    <span aria-hidden="true">
                      <ChevronRight />
                    </span>
                  </h3>
                  <p>{item.body}</p>
                </a>
              ))}
            </div>
          </div>
          <Artwork item={features[0]} placement={inventory?.capability} />
        </section>
      )}

      {(features.length ? content.intro?.slice(1) : content.intro)?.map(
        (intro) => (
          <section className={styles.statement} key={intro.title}>
            {intro.eyebrow && (
              <span className={styles.eyebrow}>{intro.eyebrow}</span>
            )}
            <h2>{intro.title}</h2>
            {intro.body && <p>{intro.body}</p>}
          </section>
        ),
      )}

      {variant === "notetaker" && spotlight}
      {cards.length > 0 && (
        <section
          className={styles.walkthrough}
          aria-label={`${content.name} features`}
        >
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>
              {variant === "payments"
                ? "Your options"
                : "Made for your workflow"}
            </span>
            <h2>
              More ways to move
              <br />
              your work forward.
            </h2>
          </div>
          <section
            className={styles.cardRail}
            // The horizontal feature rail must be keyboard-scrollable.
            // biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard access to overflow content
            tabIndex={0}
            aria-label="Explore product capabilities"
          >
            {cards.map((item, index) => (
              <article className={styles.stepCard} key={item.id}>
                <Artwork
                  item={item}
                  placement={inventory?.cards[index]}
                  compact
                />
                <h3>
                  {item.href ? (
                    <Link href={item.href}>
                      {item.title} <ChevronRight />
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                <p>{item.body}</p>
                {item.points?.length ? (
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </section>
        </section>
      )}
      {variant !== "notetaker" && spotlight}
      {children && <div className={styles.directory}>{children}</div>}

      {features.map((item, index) => (
        <section
          className={styles.detail}
          data-reverse={index % 2 === 0}
          id={item.id}
          key={item.id}
        >
          <Artwork item={item} placement={inventory?.details[item.id]} />
          <div className={styles.detailCopy}>
            <span className={styles.eyebrow}>{item.label ?? content.name}</span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            {item.points?.length ? (
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}
            <a className={styles.textLink} href={item.href ?? primary.href}>
              {item.href ? "Explore" : "Get started"}{" "}
              <span aria-hidden="true">
                <ChevronRight />
              </span>
            </a>
          </div>
        </section>
      ))}

      {testimonials && <div className={styles.evidence}>{testimonials}</div>}
      {Boolean(content.faqs?.length) && (
        <section className={styles.faq} id="faq">
          <h2>{content.faqHeading || "Frequently asked questions"}</h2>
          {content.faqDescription && (
            <p className={styles.faqDescription}>{content.faqDescription}</p>
          )}
          <div>
            {content.faqs?.map((faq) => (
              <details key={faq.question}>
                <summary>
                  <span aria-hidden="true">
                    <MagePlus size="1em" />
                  </span>
                  {faq.question}
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          <JsonLd
            value={{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: content.faqs?.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            }}
          />
        </section>
      )}

      <section className={styles.related}>
        <div className={styles.centerHeading}>
          <span className={styles.eyebrow}>The Innflow platform</span>
          <h2>
            Keep your tools, context,
            <br />
            and next steps connected.
          </h2>
        </div>
        <div className={styles.relatedRail}>
          {related.map((route) => (
            <Link key={route.path} href={route.path}>
              <div
                {...placementAttributes(inventory?.related[route.title])}
                className={styles.relatedImage}
                style={{
                  backgroundImage: `url(/brand/calendly/${getProductDesign(route.path)}-hero.svg)`,
                }}
              >
                {inventory?.related[route.title] ? (
                  <ProductArtwork
                    assetId={inventory.related[route.title].assetId}
                    density="compact"
                  />
                ) : (
                  <span aria-hidden="true">
                    <MageStarsA size="1em" />
                  </span>
                )}
              </div>
              <h3>
                {route.title}{" "}
                <span aria-hidden="true">
                  <ChevronRight />
                </span>
              </h3>
            </Link>
          ))}
        </div>
      </section>
      {(content.closing?.length
        ? content.closing
        : [
            {
              title: "Make space for what matters.",
              body: "Bring your team, context, and next steps together.",
              primaryCta: primary,
              secondaryCta: secondary,
            },
          ]
      ).map((closing) => (
        <section className={styles.closing} key={closing.title}>
          <h2>{closing.title}</h2>
          <p>{closing.body}</p>
          <div className={styles.actions}>
            <TrackedLink
              className={styles.primary}
              destination={closing.primaryCta.href}
              eventLabel={`${content.path}_closing`}
            >
              {closing.primaryCta.label}
            </TrackedLink>
            {closing.secondaryCta && (
              <TrackedLink
                className={styles.secondary}
                destination={closing.secondaryCta.href}
                eventLabel={`${content.path}_closing_secondary`}
              >
                {closing.secondaryCta.label}
              </TrackedLink>
            )}
          </div>
        </section>
      ))}
    </main>
  );
}
