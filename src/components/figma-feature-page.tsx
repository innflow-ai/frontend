import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { siteConfig } from "@/config/site";
import type {
  FeatureArtwork,
  FeaturePageContent,
} from "@/content/feature-pages";
import { BaselaneHomepage } from "./baselane-homepage";
import base from "./baselane-product-page.module.css";
import styles from "./figma-feature-page.module.css";
import googleStyles from "./google-cta.module.css";
import { GoogleCtaContent } from "./google-cta-content";
import { PageTestimonials } from "./page-testimonials";
import { ScrollStory } from "./scroll-story";

function Artwork({
  items,
  hero = false,
}: {
  items: FeatureArtwork[];
  hero?: boolean;
}) {
  return items.map((item) => (
    <Image
      key={item.id}
      src={item.src}
      alt=""
      width={Math.round(item.width)}
      height={Math.round(item.height)}
      unoptimized
      className={hero ? styles.heroArtwork : styles.panelArtwork}
      style={
        hero
          ? {
              left: `${(item.x / 2017.333) * 100}%`,
              top: `${(item.y / 650) * 100}%`,
              width: `${(item.width / 2017.333) * 100}%`,
              height: `${(item.height / 650) * 100}%`,
            }
          : ({ "--art-ratio": item.width / item.height } as CSSProperties)
      }
    />
  ));
}

export function FigmaFeaturePage({
  page,
  testimonials,
}: {
  page: FeaturePageContent;
  testimonials?: ReactNode;
}) {
  const features = (
    <div id="additional-features" className={base.features}>
      {page.features.map(([title, text]) => (
        <article key={title}>
          <h3>
            <CheckCircle size={20} weight="thin" />
            {title}
          </h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
  const panel = (
    item: FeaturePageContent["panels"][number],
    includeId: boolean,
  ) => (
    <section
      key={item.id}
      id={includeId ? item.id : undefined}
      className={`${base.panel} ${styles.panel}`}
    >
      <div className={base.scene}>
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(max-width: 850px) 100vw, 75vw"
          className={styles.panelImage}
          style={
            {
              "--panel-focus": `${item.imageFocus}% center`,
              objectPosition: "var(--responsive-panel-focus, 50% center)",
            } as CSSProperties
          }
        />
      </div>
      <span className={base.label}>{item.label}</span>
      <Artwork items={item.artwork} />
      <div className={`${base.panelCopy} ${styles.panelCopy}`}>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </section>
  );
  const footerLink = (
    <a href="#additional-features">
      Supporting features <ArrowRight size={16} />
    </a>
  );
  const fallback = (
    <div className={`${base.solutionLayout} ${styles.solutionLayout}`}>
      <nav
        aria-label="On this page"
        className={`${base.sectionNav} ${styles.mobileNav}`}
      >
        {page.panels.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
            <ArrowRight size={16} />
          </a>
        ))}
        {footerLink}
      </nav>
      <div className={base.panels}>
        {page.panels.map((item) => panel(item, true))}
        {features}
      </div>
    </div>
  );
  return (
    <BaselaneHomepage>
      <div
        className={`${base.rentCollection} ${styles.page} ${page.key === "accounting" ? styles.accounting : ""}`}
      >
        <section className={`${base.hero} ${styles.hero}`}>
          <div
            className={styles.heroVisual}
            style={{ "--hero-focus": `${page.heroFocus}%` } as CSSProperties}
          >
            <div className={styles.heroCanvas}>
              <Image
                src={page.hero}
                alt=""
                fill
                sizes="100vw"
                preload
                className={styles.heroPhoto}
              />
              <Artwork items={page.heroArtwork} hero />
              {page.key === "accounting" && (
                <Image
                  src="/brand/feature-pages/accounting/foreground.png"
                  alt=""
                  width={622}
                  height={558}
                  className={styles.foreground}
                />
              )}
            </div>
          </div>
          <div className={base.heroCopy}>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
            <a
              className={`${base.heroGoogle} ${googleStyles.cream}`}
              href={siteConfig.googleAuthUrl}
            >
              <GoogleCtaContent />
            </a>
            <small className={base.heroDisclaimer}>
              By continuing, you agree to our{" "}
              <a href="/legal/terms-of-service">Terms of Service</a> and
              acknowledge our <a href="/legal/privacy-policy">Privacy Policy</a>
              .
            </small>
          </div>
        </section>
        <section className={base.solutions}>
          <h2>{page.intro}</h2>
          <ScrollStory
            layout="stacked"
            steps={page.panels.map((item) => ({
              id: item.id,
              label: item.label,
              content: panel(item, false),
            }))}
            navClassName={`${base.sectionNav} ${base.progressNav}`}
            fallback={fallback}
            after={features}
            navFooter={footerLink}
          />
        </section>
        {testimonials ?? <PageTestimonials pagePath={page.path} />}
        <section className={base.faq}>
          <h2>FAQs</h2>
          <div>
            {page.faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span>+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </BaselaneHomepage>
  );
}
