import {
  ArrowRight,
  CheckCircle,
  Files,
  FlowArrow,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import googleCtaStyles from "@/components/google-cta.module.css";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { siteConfig } from "@/config/site";
import { BaselaneHomepage } from "./baselane-homepage";
import {
  type ProductPageKind,
  productContent,
} from "./baselane-product-content";
import styles from "./baselane-product-page.module.css";
import { PageTestimonials } from "./page-testimonials";
import { ScrollStory } from "./scroll-story";

function Scene({
  root,
  name,
  priority = false,
}: {
  root: string;
  name: string;
  priority?: boolean;
}) {
  return (
    <picture className={styles.scene}>
      <source media="(max-width:700px)" srcSet={`${root}${name}-mobile.webp`} />
      <Image
        src={`${root}${name}-desktop.webp`}
        alt=""
        fill
        sizes="100vw"
        preload={priority}
      />
    </picture>
  );
}
function Actions() {
  return (
    <div className={styles.actions}>
      <a href={siteConfig.googleAuthUrl} className={styles.google}>
        <GoogleCtaContent />
      </a>
      <a href={siteConfig.demoUrl} className={styles.demo}>
        See demo <ArrowRight size={18} />
      </a>
    </div>
  );
}
export function BaselaneProductPage({
  kind,
  showBand = true,
}: {
  kind: ProductPageKind;
  showBand?: boolean;
}) {
  const data = productContent[kind];
  const root = `/brand/baselane-inspired/${kind}/`;
  const icons = [FlowArrow, CheckCircle, Files, ShieldCheck];
  const renderPanel = (
    p: (typeof data.panels)[number],
    i: number,
    includeId = true,
  ) => {
    const Icon = icons[i];
    return (
      <section
        id={includeId ? p.id : undefined}
        key={p.id}
        className={styles.panel}
      >
        <Scene root={root} name={`solutions-${p.image}-bg`} />
        <span className={styles.label}>
          <Icon size={15} />
          {p.label}
        </span>
        <div className={styles.panelCopy}>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
        </div>
        <div className={styles.product}>
          <small>ILLUSTRATIVE WORKSPACE</small>
          <h4>{p.preview}</h4>
          {p.rows.map((row, j) => (
            <div className={styles.productRow} key={row}>
              <span>{j + 1}</span>
              <p>{row}</p>
              <CheckCircle size={18} />
            </div>
          ))}
          <div className={styles.productFoot}>
            <span>Connected to your team</span>
            <FlowArrow size={17} />
          </div>
        </div>
      </section>
    );
  };
  const additionalFeatures = (
    <div
      id="additional-features"
      key="additional-features"
      className={styles.features}
    >
      {data.features.map(([title, text], i) => {
        const Icon = icons[i % icons.length];
        return (
          <article key={title}>
            <h3>
              <Icon size={21} />
              {title}
            </h3>
            <p>{text}</p>
          </article>
        );
      })}
    </div>
  );
  const staticSolutions = (
    <div className={styles.solutionLayout}>
      <nav aria-label="On this page" className={styles.sectionNav}>
        {data.panels.map((p) => (
          <a key={p.id} href={`#${p.id}`}>
            {p.label}
            <ArrowRight size={16} />
          </a>
        ))}
        <a href="#additional-features">
          Additional features
          <ArrowRight size={16} />
        </a>
      </nav>
      <div className={styles.panels}>
        {data.panels.map((p, i) => renderPanel(p, i))}
        {additionalFeatures}
      </div>
    </div>
  );
  return (
    <BaselaneHomepage>
      <div
        className={
          kind === "rent-collection" ? styles.rentCollection : undefined
        }
      >
        <section className={styles.hero}>
          <Scene root={root} name="hero" priority />
          <div className={styles.heroCopy}>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            {kind === "rent-collection" ? (
              <>
                <a
                  className={`${styles.heroGoogle} ${googleCtaStyles.cream}`}
                  href={siteConfig.googleAuthUrl}
                >
                  <GoogleCtaContent />
                </a>
                <small className={styles.heroDisclaimer}>
                  By continuing, you agree to our{" "}
                  <a href="/legal/terms-of-service">Terms of Service</a> and
                  acknowledge our{" "}
                  <a href="/legal/privacy-policy">Privacy Policy</a>.
                </small>
              </>
            ) : (
              <Actions />
            )}
          </div>
        </section>
        {data.band && showBand && (
          <div className={styles.band}>
            <a href="/short-term-rentals">
              Explore short-term rental workflows <ArrowRight size={16} />
            </a>
            <span>Property context</span>
            <span>Clear handoffs</span>
            <span>Human approvals</span>
          </div>
        )}
        <section className={styles.solutions}>
          <h2>{data.intro}</h2>
          {kind === "rent-collection" ? (
            <ScrollStory
              layout="stacked"
              navClassName={`${styles.sectionNav} ${styles.progressNav}`}
              steps={data.panels.map((p, i) => ({
                id: p.id,
                label: p.label,
                content: renderPanel(p, i, false),
              }))}
              fallback={staticSolutions}
              after={additionalFeatures}
              navFooter={
                <a key="additional-features-link" href="#additional-features">
                  Additional features <ArrowRight size={16} />
                </a>
              }
            />
          ) : (
            staticSolutions
          )}
        </section>
        <section className={styles.ocean}>
          <Image
            src="/brand/baselane-inspired/hero.webp"
            alt=""
            fill
            sizes="100vw"
          />
          <div>
            <span className={styles.eyebrow}>A LITTLE MORE HEADSPACE</span>
            <h2>
              Make room for the life
              <br />
              around your properties.
            </h2>
            <p>
              Bring your team, your information, and your next steps into one
              flow.
            </p>
            <Actions />
          </div>
        </section>
        <PageTestimonials
          pagePath={kind === "accounting" ? "/landlord-accounting" : `/${kind}`}
        />
        <section className={styles.faq}>
          <h2>FAQs</h2>
          <div>
            {data.faqs.map(([question, answer]) => (
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
