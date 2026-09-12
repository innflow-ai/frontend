import { ArrowRight, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { HeroIntro, HeroItem, Reveal } from "@/components/motion";
import shellStyles from "@/components/site-shell.module.css";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./contact.module.css";

export const metadata = createPageMetadata({
  title: "Contact innflow | Sales, Support & Partnerships",
  description:
    "Contact innflow about property operations, product support, partnerships, press, careers, or another inquiry.",
  path: "/contact",
});

const contactAudiences = [
  {
    image: "/brand/contact/new-to-innflow.png",
    alt: "A woman working on a laptop at home",
    title: "New to innflow",
    body: "Tell us about your properties, your team, and the work you want to simplify. We’ll help you explore where innflow fits and how to get started.",
  },
  {
    image: "/brand/contact/existing-customers.png",
    alt: "A man holding a tablet in a bright office",
    title: "Already using innflow",
    body: "Have a product question or need a hand with your workspace? Share what you’re working on so our team can help you take the next step.",
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
          preload
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
                <div className={styles.formCard} id="contact-form">
                  <ContactForm />
                </div>
              </HeroItem>
            </div>
          </HeroIntro>
        </div>
      </section>

      <section
        className={`${shellStyles.page} ${styles.support}`}
        aria-labelledby="support-heading"
      >
        <div className={styles.supportInner}>
          <Reveal className={styles.supportHeading}>
            <h2 id="support-heading">A conversation for every stage.</h2>
            <p>
              From your first question to your next step, we’re here to help.
            </p>
          </Reveal>
          <div className={styles.audiences}>
            {contactAudiences.map((audience, index) => (
              <Reveal delay={index * 0.08} key={audience.title}>
                <article className={styles.audience}>
                  <Image
                    src={audience.image}
                    alt={audience.alt}
                    width={470}
                    height={324}
                    sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 1100px) calc((100vw - 90px) / 2), 470px"
                  />
                  <h3>{audience.title}</h3>
                  <p>{audience.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <a className={shellStyles.darkButton} href="#contact-form">
            Start a conversation
            <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}
