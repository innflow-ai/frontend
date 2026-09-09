import Image from "next/image";
import { siteConfig } from "@/config/site";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-support.module.css";

const root = "/brand/baselane-inspired/demo/";
function Photo({
  name,
  priority = false,
}: {
  name: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source
        media="(max-width: 700px)"
        srcSet={`${root}${name}-mobile.webp`}
      />
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
export function BaselaneDemo() {
  return (
    <BaselaneHomepage>
      <div className={styles.demo}>
        <section className={styles.hero}>
          <Photo name="hero" priority />
          <div className={styles.heroCopy}>
            <span>PROPERTY OPERATIONS, CONNECTED</span>
            <h1>
              See how
              <br />
              innflow works.
            </h1>
            <p>
              Explore how your team can bring recurring work, property context,
              and human approvals into one flow.
            </p>
            <a className={styles.button} href={siteConfig.demoUrl}>
              Book a demo ↗
            </a>
          </div>
        </section>
        <section className={styles.intro}>
          <h2>A clearer workflow is a click away.</h2>
          <p>
            Start with your team’s day-to-day work. See where connected context
            and a clear next step can make a difference.
          </p>
        </section>
        <section
          className={styles.demoCards}
          aria-label="Ways to explore innflow"
        >
          <article className={styles.salesCard}>
            <Photo name="book" />
            <span className={styles.eyebrow}>PERSONALIZED DEMO</span>
            <div className={styles.workflow}>
              <small>EXAMPLE · MAINTENANCE REQUEST</small>
              <strong>New request received</strong>
              <span>↓</span>
              <strong>Property context attached</strong>
              <span>↓</span>
              <strong>
                Ready for team review <b>✓</b>
              </strong>
            </div>
            <div className={styles.cardCopy}>
              <h2>Managing a growing portfolio?</h2>
              <p>
                Bring a recurring workflow. We’ll start with the handoffs that
                matter to your team.
              </p>
              <a className={styles.button} href={siteConfig.demoUrl}>
                Book a demo ↗
              </a>
            </div>
          </article>
          <article className={styles.webinarCard}>
            <Photo name="webinar" />
            <span className={styles.eyebrow}>EXPLORE INNFLOW</span>
            <div className={styles.cardCopy}>
              <h2>Get a closer look.</h2>
              <p>
                Explore self-guided topics on recurring tasks, property records,
                and the handoffs your team handles every day.
              </p>
              <a className={styles.button} href="/BL/BL-webinars">
                Explore workflow topics →
              </a>
            </div>
          </article>
        </section>
        <section className={styles.statement}>
          <span>MAKE THE CONVERSATION YOURS</span>
          <h2>
            Start with the work
            <br />
            you want to simplify.
          </h2>
          <p>
            A maintenance handoff. A document request. A recurring review. Bring
            a real example, and we can discuss the context, people, and
            approvals it needs.
          </p>
          <a href="/BL/BL-multi-property-investors">
            Explore property operations →
          </a>
        </section>
        <section className={styles.ocean}>
          <Image
            src="/brand/baselane-inspired/hero.webp"
            alt="Ocean beside a coastal property"
            fill
            sizes="100vw"
          />
          <div>
            <h2>
              Less chasing.
              <br />
              More moving forward.
            </h2>
            <p>Give every recurring request a clear next step.</p>
            <a className={styles.button} href={siteConfig.contactUrl}>
              Talk to the team ↗
            </a>
          </div>
        </section>
      </div>
    </BaselaneHomepage>
  );
}
