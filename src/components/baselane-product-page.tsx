import {
  ArrowRight,
  CheckCircle,
  Files,
  FlowArrow,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { siteConfig } from "@/config/site";
import { BaselaneHomepage } from "./baselane-homepage";
import {
  type ProductPageKind,
  productContent,
} from "./baselane-product-content";
import styles from "./baselane-product-page.module.css";

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
      <a href="/demo" className={styles.demo}>
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
  return (
    <BaselaneHomepage>
      <section className={styles.hero}>
        <Scene root={root} name="hero" priority />
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>CONNECTED PROPERTY OPERATIONS</span>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <Actions />
        </div>
      </section>
      {data.band && showBand && (
        <div className={styles.band}>
          <a href="/BL/BL-short-term-rentals">
            Explore short-term rental workflows <ArrowRight size={16} />
          </a>
          <span>Property context</span>
          <span>Clear handoffs</span>
          <span>Human approvals</span>
        </div>
      )}
      <section className={styles.solutions}>
        <h2>{data.intro}</h2>
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
            {data.panels.map((p, i) => {
              const Icon = icons[i];
              return (
                <section id={p.id} key={p.id} className={styles.panel}>
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
            })}
            <div id="additional-features" className={styles.features}>
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
          </div>
        </div>
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
      <section className={styles.useCases}>
        <h2>See the work in a new light.</h2>
        <p>Explore the everyday processes behind a connected property team.</p>
        <div className={styles.useCaseGrid}>
          {[
            [
              "Recurring work",
              "Give the next step a clear path.",
              "Connect repeatable requests with the people and information they need.",
              data.panels[0].image,
            ],
            [
              "Property context",
              "Keep your properties in perspective.",
              "Bring the relevant records and team decisions into one place.",
              data.panels[1].image,
            ],
            [
              "Team knowledge",
              "Keep useful answers within reach.",
              "Connect supporting documents to the work your team is doing.",
              data.panels[2].image,
            ],
            [
              "Human approvals",
              "Move forward with your team.",
              "Make review points part of a clear and repeatable workflow.",
              data.panels[0].image,
            ],
          ].map(([label, title, text, img]) => (
            <details key={label} className={styles.useCase}>
              <summary>
                <Scene root={root} name={`solutions-${img}-bg`} />
                <small>{label}</small>
                <h3>{title}</h3>
                <span className={styles.expand}>
                  Read more <ArrowRight size={16} />
                </span>
              </summary>
              <div className={styles.caseDetail}>
                <p>{text}</p>
                <a href="/products/agentic-workflows">
                  Explore workflows <ArrowRight size={16} />
                </a>
              </div>
            </details>
          ))}
        </div>
      </section>
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
      <section className={styles.closing}>
        <Scene root="/brand/baselane-inspired/renters/" name="closing" />
        <div>
          <h2>More room for what comes next.</h2>
          <p>Bring your property operations into one flow.</p>
          <Actions />
        </div>
      </section>
    </BaselaneHomepage>
  );
}
