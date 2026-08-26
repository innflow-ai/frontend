import {
  ArrowRight,
  EnvelopeSimple,
  Path,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { HeroIntro, HeroItem, Reveal } from "@/components/motion";
import { Tag } from "@/components/tag";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./contact.module.css";

export const metadata = createPageMetadata({
  title: "Contact innflow | Sales, Support & Partnerships",
  description:
    "Contact innflow about property operations, product support, partnerships, press, careers, or another inquiry.",
  path: "/contact",
});

const routingSteps = [
  {
    number: "01",
    title: "Share the context",
    body: "Tell us what you’re working on, where the process is getting stuck, or what you need from our team.",
  },
  {
    number: "02",
    title: "We route the inquiry",
    body: "Your topic helps the right person review the request without sending you through unnecessary handoffs.",
  },
  {
    number: "03",
    title: "Continue with a person",
    body: "A member of the innflow team can follow up with the next useful step and any context they need.",
  },
] as const;

export default function ContactPage() {
  return (
    <main className={styles.page} id="main-content">
      <section className={styles.hero}>
        <Image
          alt=""
          className={styles.heroImage}
          fill
          priority
          quality={100}
          sizes="100vw"
          src="/brand/grassy-city-overlook.webp"
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroInner}>
          <HeroIntro>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <HeroItem>
                  <Tag className={styles.heroTag} variant="outline">
                    Contact
                  </Tag>
                </HeroItem>
                <HeroItem>
                  <h1>Let’s talk about the work.</h1>
                </HeroItem>
                <HeroItem>
                  <p className={styles.lede}>
                    Questions about innflow, product support, or a process your
                    team wants to improve? Send the context and we’ll get it to
                    the right person.
                  </p>
                </HeroItem>
                <HeroItem>
                  <a
                    className={styles.emailLink}
                    href={`mailto:${siteConfig.supportEmail}`}
                  >
                    <span className={styles.emailIcon}>
                      <EnvelopeSimple aria-hidden="true" size={20} />
                    </span>
                    <span>
                      <small>Email us directly</small>
                      {siteConfig.supportEmail}
                    </span>
                    <ArrowRight aria-hidden="true" size={17} />
                  </a>
                </HeroItem>
              </div>
              <HeroItem>
                <div className={styles.formCard}>
                  <ContactForm />
                </div>
              </HeroItem>
            </div>
          </HeroIntro>
        </div>
      </section>

      <section className={styles.routing} aria-labelledby="routing-heading">
        <div className={styles.routingInner}>
          <Reveal className={styles.routingHeading}>
            <span className={styles.eyebrow}>
              <Path aria-hidden="true" size={17} />
              Clear routing
            </span>
            <h2 id="routing-heading">One message. A clear next step.</h2>
            <p>
              A little structure gives each inquiry enough context to reach the
              right person without unnecessary back-and-forth.
            </p>
          </Reveal>
          <div className={styles.steps}>
            {routingSteps.map((step, index) => (
              <Reveal
                className={styles.step}
                delay={index * 0.08}
                key={step.number}
              >
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
