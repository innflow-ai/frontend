import {
  ArrowRight,
  Buildings,
  Database,
  FlowArrow,
  Headset,
  HouseLine,
  Key,
  Quotes,
  Sparkle,
  UsersThree,
  Warehouse,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { Float, HeroIntro, HeroItem, Reveal } from "@/components/motion";
import { Tag } from "@/components/tag";
import { TrackedLink } from "@/components/tracked-link";
import { VerifiedCheck } from "@/components/verified-check";
import { siteConfig } from "@/config/site";
import { faqs } from "@/content/home";
import styles from "./page.module.css";

const avatarRow = [
  "/aeline/avatars/user-1.avif",
  "/aeline/avatars/user-2.avif",
  "/aeline/avatars/user-3.avif",
  "/aeline/avatars/user-4.avif",
  "/aeline/avatars/hero-1.webp",
] as const;

const logoSet = [1, 2, 3, 4, 5] as const;

const features = [
  {
    image: "/aeline/cards/card.avif",
    title: "Close faster. Report with confidence.",
    body: "Connect operational records to reviewable reporting workflows without claiming to replace your accounting system.",
  },
  {
    image: "/aeline/cards/card-1.avif",
    title: "Lease smarter. Keep residents informed.",
    body: "Bring applications, resident requests, communication, and supporting context into one governed handoff.",
  },
  {
    image: "/aeline/cards/card-2.avif",
    title: "Streamline operations. Automate the busywork.",
    body: "Coordinate maintenance, inspections, vendor handoffs, and bounded assistant actions with clear review points.",
  },
  {
    image: "/aeline/cards/card-3.avif",
    title: "Handoffs become governed processes.",
    body: "Model triggers, conditions, connected actions, and review points in a visual workflow your team can inspect.",
  },
  {
    image: "/aeline/cards/card-4.avif",
    title: "Answers with your operation's context.",
    body: "The Assistant works from connected knowledge and explicit workflow actions, not an open-ended promise of autonomy.",
  },
  {
    image: "/aeline/cards/card-5.avif",
    title: "Context and control beside the work.",
    body: "Attach working data, reference material, files, and approval requests to the process that uses them.",
  },
] as const;

const serviceRows = [
  {
    image: "/aeline/services/service-1.webp",
    kicker: "Workflows",
    title: "Turn recurring handoffs into a governed process.",
    body: "Follow-up breaks when the next step lives in a spreadsheet, inbox, or one person's memory. Innflow models triggers, conditions, connected actions, and review points in a visual workflow.",
    points: [
      "Visual workflow configuration",
      "Human approval stays visible",
      "Full execution history",
    ],
  },
  {
    image: "/aeline/services/service-2.webp",
    kicker: "AI assistant",
    title: "Answer with the operation's own context.",
    body: "Operators lose time finding the right procedure, file, or record before they can respond. The Assistant moves a question to a reviewable next step with the supporting context attached.",
    points: [
      "Connected knowledge and records",
      "Reviewable next steps",
      "Pause for review anytime",
    ],
  },
  {
    image: "/aeline/services/service-3.webp",
    kicker: "A smooth start",
    title: "From setup to success in three steps.",
    body: "Confirm the systems and context a workflow needs, define actions and approvals, then review execution and expand only when the process is ready.",
    points: [
      "Connect your portfolio",
      "Configure your workflows",
      "Operate with confidence",
    ],
  },
] as const;

const testimonials = [
  {
    quote:
      "Innflow replaced three reporting tools for us. The weekly summary alone saves my team half a day.",
    name: "Maya Chen",
    role: "Head of Operations",
    image: "/aeline/testimonials/person-1.avif",
    logo: "/aeline/testimonials/logo-1.svg",
  },
  {
    quote:
      "The forecasts are the first ones our finance team actually trusts. The confidence ranges make all the difference.",
    name: "Daniel Okafor",
    role: "Finance Lead",
    image: "/aeline/testimonials/person-2.avif",
    logo: "/aeline/testimonials/logo-2.svg",
  },
  {
    quote:
      "Setup took an afternoon. By the end of the week it had already flagged a billing issue we'd missed for months.",
    name: "Sofia Ramirez",
    role: "Operations Manager",
    image: "/aeline/testimonials/person-3.avif",
    logo: "/aeline/testimonials/logo-3.svg",
  },
  {
    quote:
      "It feels like having an analyst on call around the clock. Our standups start from Innflow's insights now.",
    name: "Jonas Weber",
    role: "Product Director",
    image: "/aeline/testimonials/person-4.avif",
    logo: "/aeline/testimonials/logo-1.svg",
  },
] as const;

const portfolioTypes = [
  {
    title: "Residential",
    body: "Apartments, condos & mixed-use",
    image: "/portfolio/residential.jpg",
    icon: Buildings,
    credit: "Slipscape / Unsplash",
  },
  {
    title: "Single-Family",
    body: "Build-to-rent & single-family",
    image: "/portfolio/single-family.jpg",
    icon: HouseLine,
    credit: "Pixabay / Unsplash",
  },
  {
    title: "Multifamily",
    body: "Large and mid-sized communities",
    image: "/portfolio/multifamily.jpg",
    icon: Buildings,
    credit: "Linus Belanger / Unsplash",
  },
  {
    title: "Commercial",
    body: "Office, retail & industrial",
    image: "/portfolio/commercial.jpg",
    icon: Warehouse,
    credit: "Egor Komarov / Unsplash",
  },
  {
    title: "Community Associations",
    body: "HOAs, condos & townhomes",
    image: "/portfolio/community-associations.jpg",
    icon: UsersThree,
    credit: "Aman Kumar / Unsplash",
  },
  {
    title: "Affordable Housing",
    body: "Public, LIHTC & subsidized",
    image: "/portfolio/affordable-housing.jpg",
    icon: Key,
    credit: "Dima Masko / Unsplash",
  },
] as const;

const partnerCards = [
  {
    icon: FlowArrow,
    title: "Seamless onboarding",
    body: "A dedicated path guides your team from scope to a validated workflow.",
  },
  {
    icon: Database,
    title: "Data migration",
    body: "Move only the context your approved operation needs, securely and accurately.",
  },
  {
    icon: Headset,
    title: "Ongoing support",
    body: "Keep ownership, review points, and recovery paths visible as the process evolves.",
  },
] as const;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Innflow",
  url: siteConfig.marketingOrigin,
  email: siteConfig.supportEmail,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function HomePage() {
  return (
    <div className={styles.page}>
      <main id="main-content">
        <section className={styles.hero} id="home-hero">
          <Image
            src="/aeline/hero-sky.avif"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroBg}
          />
          <div className={styles.heroInner}>
            <HeroIntro>
              <HeroItem>
                <Tag variant="outline" className={styles.heroTag}>
                  AI property operations platform
                </Tag>
              </HeroItem>
              <HeroItem>
                <h1>Run property operations. Elevate every portfolio.</h1>
              </HeroItem>
              <HeroItem>
                <p className={styles.lede}>
                  Innflow connects recurring workflows, operating context,
                  approvals, and resident-facing handoffs in one coordinated
                  platform.
                </p>
              </HeroItem>
              <HeroItem>
                <div className={styles.heroActions}>
                  <TrackedLink
                    className={styles.buttonPrimary}
                    destination={siteConfig.demoUrl}
                    eventLabel="hero_get_started"
                  >
                    Get started <ArrowRight size={15} />
                  </TrackedLink>
                  <TrackedLink
                    className={styles.buttonGhost}
                    destination={siteConfig.demoUrl}
                    eventLabel="hero_demo"
                  >
                    Book a demo
                  </TrackedLink>
                </div>
              </HeroItem>
              <HeroItem>
                <div className={styles.heroProof}>
                  <div className={styles.avatarStack}>
                    {avatarRow.map((src) => (
                      <Image
                        key={src}
                        src={src}
                        alt=""
                        width={40}
                        height={40}
                      />
                    ))}
                  </div>
                  <p>
                    Trusted by <strong>2,400+</strong> property teams
                  </p>
                </div>
              </HeroItem>
            </HeroIntro>
          </div>
        </section>

        <section className={styles.logoStrip} aria-label="Customer logos">
          <p>Powering operations at teams like</p>
          <div className={styles.logoMarquee}>
            <div className={styles.logoTrack}>
              {[0, 1].map((copy) => (
                <div
                  className={styles.logoGroup}
                  key={copy}
                  aria-hidden={copy === 1 || undefined}
                >
                  {[0, 1, 2].map((round) =>
                    logoSet.map((i) => (
                      <Image
                        key={`${copy}-${round}-${i}`}
                        src={`/aeline/logos/logo-${i}.svg`}
                        alt=""
                        width={110}
                        height={30}
                      />
                    )),
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.features} id="features">
          <Reveal className={styles.shell}>
            <Tag>One platform · every workflow</Tag>
            <h2 className={styles.sectionTitle}>
              Everything you need to run modern property operations.
            </h2>
          </Reveal>
          <div className={styles.shell}>
            <div className={styles.cardGrid}>
              {features.map((feature, index) => (
                <Reveal key={feature.title} delay={(index % 3) * 0.08}>
                  <article className={styles.card}>
                    <Image
                      src={feature.image}
                      alt=""
                      width={420}
                      height={420}
                    />
                    <div>
                      <h3>{feature.title}</h3>
                      <p>{feature.body}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.services} id="why-innflow">
          {serviceRows.map((service, index) => (
            <Reveal
              key={service.title}
              className={`${styles.serviceRow} ${
                index % 2 === 1 ? styles.serviceReverse : ""
              }`}
            >
              <div className={styles.serviceMedia}>
                <Float>
                  <Image src={service.image} alt="" width={540} height={512} />
                </Float>
              </div>
              <div className={styles.serviceCopy}>
                <Tag>{service.kicker}</Tag>
                <h2>{service.title}</h2>
                <p className={styles.serviceBody}>{service.body}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>
                      <VerifiedCheck size={18} /> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </section>

        <section className={styles.testimonials} id="testimonials">
          <Reveal className={styles.shell}>
            <Tag>Testimonials</Tag>
            <h2 className={styles.sectionTitle}>
              Teams feel the difference in the first week.
            </h2>
          </Reveal>
          <div className={styles.shell}>
            <div className={styles.testimonialGrid}>
              {testimonials.map((item, index) => (
                <Reveal key={item.name} delay={(index % 2) * 0.08}>
                  <figure className={styles.testimonial}>
                    <Quotes size={26} weight="fill" />
                    <blockquote>{item.quote}</blockquote>
                    <figcaption>
                      <Image src={item.image} alt="" width={48} height={48} />
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.role}</span>
                      </div>
                      <Image
                        className={styles.testimonialLogo}
                        src={item.logo}
                        alt=""
                        width={72}
                        height={20}
                      />
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.portfolios} id="portfolios">
          <Reveal className={styles.shell}>
            <Tag>Built for every portfolio</Tag>
            <h2 className={styles.sectionTitle}>
              One platform for every property type you manage.
            </h2>
            <p className={styles.sectionLede}>
              Portfolio-specific product depth is confirmed during discovery.
            </p>
          </Reveal>
          <div className={styles.shell}>
            <div className={styles.portfolioGrid}>
              {portfolioTypes.map((portfolio, index) => {
                const Icon = portfolio.icon;
                return (
                  <Reveal key={portfolio.title} delay={(index % 3) * 0.08}>
                    <article className={styles.portfolioCard}>
                      <Image
                        src={portfolio.image}
                        alt=""
                        fill
                        sizes="(max-width: 720px) 90vw, 30vw"
                      />
                      <div>
                        <Icon size={20} />
                        <strong>{portfolio.title}</strong>
                        <span>{portfolio.body}</span>
                        <small>{portfolio.credit}</small>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.partner}>
          <Reveal className={styles.shell}>
            <Tag>Always by your side</Tag>
            <h2 className={styles.sectionTitle}>A partner in your success.</h2>
          </Reveal>
          <div className={styles.shell}>
            <div className={styles.partnerGrid}>
              {partnerCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <Reveal key={card.title} delay={index * 0.08}>
                    <article className={styles.partnerCard}>
                      <span className={styles.partnerIcon}>
                        <Icon size={20} weight="fill" />
                      </span>
                      <h3>{card.title}</h3>
                      <p>{card.body}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.faq} id="faq">
          <Reveal className={styles.faqIntro}>
            <Tag>Questions? We’ve got answers.</Tag>
            <h2 className={styles.sectionTitle}>
              Common questions. Clear boundaries.
            </h2>
          </Reveal>
          <div className={styles.faqList}>
            {faqs.slice(0, 5).map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>
                  {item.question}
                  <span>+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.cta} id="cta">
          <Image
            src="/aeline/cta-bg.avif"
            alt=""
            fill
            sizes="100vw"
            className={styles.ctaBg}
          />
          <Reveal className={styles.ctaInner}>
            <Sparkle size={30} weight="fill" />
            <h2>See Innflow in action. Built for your portfolio.</h2>
            <p>
              Book a walkthrough and we’ll map one bounded operation to a
              governed, reviewable workflow.
            </p>
            <TrackedLink
              className={styles.buttonPrimary}
              destination={siteConfig.demoUrl}
              eventLabel="final_demo"
            >
              Book a demo <ArrowRight size={15} />
            </TrackedLink>
            <small>No pressure. No obligation.</small>
          </Reveal>
        </section>
      </main>
      <JsonLd value={organizationSchema} />
      <JsonLd value={faqSchema} />
    </div>
  );
}
