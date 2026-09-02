import {
  ArrowRight,
  Database,
  FlowArrow,
  Headset,
  Quotes,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { AuthenticatedHomeRedirect } from "@/components/authenticated-home-redirect";
import {
  BlogCarousel,
  type BlogCarouselPost,
} from "@/components/blog-carousel";
import { FeatureCard, FeatureCardGrid } from "@/components/feature-card";
import { JsonLd } from "@/components/json-ld";
import { Float, HeroIntro, HeroItem, Reveal } from "@/components/motion";
import { PortfolioCarousel } from "@/components/portfolio-carousel";
import { Tag } from "@/components/tag";
import { TrackedLink } from "@/components/tracked-link";
import { VerifiedCheck } from "@/components/verified-check";
import { siteConfig } from "@/config/site";
import { faqs } from "@/content/home";
import {
  coverImageUrl,
  formatPostDate,
  getLatestBlogPosts,
  humanizeCategory,
} from "@/lib/sanity";
import styles from "./page.module.css";

const avatarRow = [
  "/aeline/avatars/user-1.avif",
  "/aeline/avatars/user-2.avif",
  "/aeline/avatars/user-3.avif",
  "/aeline/avatars/user-4.avif",
  "/aeline/avatars/hero-1.webp",
] as const;

const logoSet = [
  {
    name: "Renogy",
    src: "/brand/customer-logos/renogy-gray.png",
    width: 132,
    height: 33,
  },
  {
    name: "E2B",
    src: "/brand/customer-logos/e2b.png",
    width: 109,
    height: 33,
  },
  {
    name: "Slack",
    src: "/brand/customer-logos/slack.png",
    width: 116,
    height: 33,
  },
  {
    name: "Global Industrial",
    src: "/brand/customer-logos/global-industrial.png",
    width: 109,
    height: 33,
  },
  {
    name: "Harbor Freight",
    src: "/brand/customer-logos/harbor-freight.png",
    width: 111,
    height: 33,
  },
  {
    name: "Intuit",
    src: "/brand/customer-logos/intuit.png",
    width: 112,
    height: 33,
  },
  {
    name: "Jasper",
    src: "/brand/customer-logos/jasper.png",
    width: 111,
    height: 33,
  },
] as const;

const features = [
  {
    image: "/aeline/cards/card.webp",
    title: "Close faster. Report with confidence.",
    body: "Connect operational records to reviewable reporting workflows without claiming to replace your accounting system.",
  },
  {
    image: "/aeline/cards/card-1.webp",
    title: "Lease smarter. Keep residents informed.",
    body: "Bring applications, resident requests, communication, and supporting context into one governed handoff.",
  },
  {
    image: "/aeline/cards/card-2.webp",
    title: "Streamline operations. Automate the busywork.",
    body: "Coordinate maintenance, inspections, vendor handoffs, and bounded assistant actions with clear review points.",
  },
  {
    image: "/aeline/cards/card-3.webp",
    title: "Handoffs become governed processes.",
    body: "Model triggers, conditions, connected actions, and review points in a visual workflow your team can inspect.",
  },
  {
    image: "/aeline/cards/card-4.webp",
    title: "Answers with your operation's context.",
    body: "The Assistant works from connected knowledge and explicit workflow actions, not an open-ended promise of autonomy.",
  },
  {
    image: "/aeline/cards/card-5.webp",
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
    name: "Ethan Brooks",
    role: "Head of Operations",
    image: "/aeline/testimonials/person-1.avif",
    logo: "/aeline/testimonials/logo-1.svg",
  },
  {
    quote:
      "The forecasts are the first ones our finance team actually trusts. The confidence ranges make all the difference.",
    name: "Elena Rossi",
    role: "Finance Lead",
    image: "/aeline/testimonials/person-2.avif",
    logo: "/aeline/testimonials/logo-2.svg",
  },
  {
    quote:
      "Setup took an afternoon. By the end of the week it had already flagged a billing issue we'd missed for months.",
    name: "Omar Haddad",
    role: "Operations Manager",
    image: "/aeline/testimonials/person-3.avif",
    logo: "/aeline/testimonials/logo-3.svg",
  },
  {
    quote:
      "It feels like having an analyst on call around the clock. Our standups start from Innflow's insights now.",
    name: "Katie Xu",
    role: "Product Director",
    image: "/aeline/testimonials/person-4.avif",
    logo: "/aeline/testimonials/logo-1.svg",
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

type SectionActionsProps = {
  eventPrefix: string;
  learnHref: string;
  learnLabel?: string;
  className?: string;
};

function SectionActions({
  eventPrefix,
  learnHref,
  learnLabel = "Learn more",
  className,
}: SectionActionsProps) {
  return (
    <Reveal
      className={`${styles.sectionActions}${className ? ` ${className}` : ""}`}
    >
      <TrackedLink
        className={styles.buttonSecondary}
        destination={learnHref}
        eventLabel={`${eventPrefix}_learn_more`}
      >
        {learnLabel} <ArrowRight size={15} />
      </TrackedLink>
      <TrackedLink
        className={styles.buttonPrimary}
        destination={siteConfig.signupUrl}
        eventLabel={`${eventPrefix}_get_started`}
      >
        Get started <ArrowRight size={15} />
      </TrackedLink>
    </Reveal>
  );
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Innflow",
  url: siteConfig.marketingOrigin,
  logo: `${siteConfig.marketingOrigin}/icon.png`,
  email: siteConfig.supportEmail,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Innflow",
  url: siteConfig.marketingOrigin,
  description:
    "Property operations software for connected workflows, approvals, context, and execution history.",
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

export default async function HomePage() {
  const latestPosts = await getLatestBlogPosts();
  const carouselPosts: BlogCarouselPost[] = latestPosts.map((post) => ({
    category: humanizeCategory(post.category),
    coverImageAlt: post.coverImage?.alt ?? post.title,
    coverImageUrl: post.coverImage
      ? coverImageUrl(post.coverImage, 800, 450)
      : null,
    date: formatPostDate(post.publishedAt),
    excerpt: post.excerpt,
    readTime: post.readTime,
    slug: post.slug,
    title: post.title,
  }));

  return (
    <div className={styles.page}>
      <AuthenticatedHomeRedirect
        appOrigin={siteConfig.appOrigin}
        marketingOrigin={siteConfig.marketingOrigin}
      />
      <main id="main-content">
        <section className={styles.hero} id="home-hero">
          <Image
            src="/brand/grassy-city-overlook.webp"
            alt=""
            fill
            priority
            quality={100}
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
                <h1>Property operations, reimagined.</h1>
              </HeroItem>
              <HeroItem>
                <p className={styles.lede}>
                  Everything property teams need to operate, communicate, and
                  grow—in one platform.
                </p>
              </HeroItem>
              <HeroItem>
                <div className={styles.heroActions}>
                  <TrackedLink
                    className={styles.buttonGhost}
                    destination={`${siteConfig.appOrigin}/login`}
                    eventLabel="hero_get_started_today"
                  >
                    Get started today!
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
                  <div className={styles.proofCopy}>
                    <div
                      className={styles.ratingLine}
                      aria-label="Rated 4.6 out of 5 stars"
                      role="img"
                    >
                      <strong>4.6/5</strong>
                      <span className={styles.stars} aria-hidden="true">
                        <span className={styles.star}>★</span>
                        <span className={styles.star}>★</span>
                        <span className={styles.star}>★</span>
                        <span className={styles.star}>★</span>
                        <span
                          className={`${styles.star} ${styles.partialStar}`}
                        >
                          ★
                        </span>
                      </span>
                    </div>
                    <p>
                      Trusted by <strong>2,400+</strong> property management
                      teams
                    </p>
                  </div>
                </div>
              </HeroItem>
            </HeroIntro>
          </div>
          <Image
            src="/brand/grassy-city-foreground.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroForeground}
            unoptimized
          />
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
                  {[0, 1].map((round) =>
                    logoSet.map((logo) => (
                      <Image
                        key={`${copy}-${round}-${logo.name}`}
                        src={logo.src}
                        alt=""
                        width={logo.width}
                        height={logo.height}
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
            <Tag>One platform · every operation</Tag>
            <h2 className={styles.sectionTitle}>
              Everything you need to run modern property operations.
            </h2>
          </Reveal>
          <div className={styles.shell}>
            <FeatureCardGrid>
              {features.map((feature, index) => (
                <Reveal key={feature.title} delay={(index % 3) * 0.08}>
                  <FeatureCard
                    image={feature.image}
                    imageAlt=""
                    title={feature.title}
                    body={feature.body}
                  />
                </Reveal>
              ))}
            </FeatureCardGrid>
            <SectionActions
              eventPrefix="features"
              learnHref="/features/workflows"
              learnLabel="Explore the product"
            />
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
                <SectionActions
                  className={styles.serviceActions}
                  eventPrefix={`service_${index + 1}`}
                  learnHref={
                    index === 0
                      ? "/features/workflows"
                      : index === 1
                        ? "/features/assistant"
                        : "/property-management"
                  }
                />
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
            <SectionActions
              eventPrefix="testimonials"
              learnHref="/property-management"
            />
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
            <PortfolioCarousel />
            <SectionActions
              eventPrefix="portfolios"
              learnHref="/property-management"
              learnLabel="Explore property management"
            />
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
            <SectionActions
              eventPrefix="partner"
              learnHref={siteConfig.demoUrl}
              learnLabel="Book a demo"
            />
          </div>
        </section>

        {carouselPosts.length > 0 ? (
          <section className={styles.blog} id="latest-posts">
            <Reveal className={styles.shell}>
              <Tag>Latest from innflow</Tag>
              <div className={styles.blogHeading}>
                <h2 className={styles.sectionTitle}>
                  Practical ideas for better property operations.
                </h2>
                <TrackedLink
                  className={styles.blogAll}
                  destination="/blog"
                  eventLabel="homepage_view_all_blog_posts"
                >
                  View all posts <ArrowRight aria-hidden="true" size={15} />
                </TrackedLink>
              </div>
            </Reveal>
            <div className={styles.shell}>
              <BlogCarousel posts={carouselPosts} />
            </div>
          </section>
        ) : null}

        <section className={styles.cta} id="cta">
          <Image
            src="/aeline/cta-bg-upscaled.webp"
            alt=""
            fill
            sizes="100vw"
            quality={90}
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

        <section className={styles.faq} id="faq">
          <Reveal className={styles.faqIntro}>
            <Tag>FAQ</Tag>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqStill}>
              <h3>Still have a question?</h3>
              <p>
                <a href={siteConfig.contactUrl}>Contact us!</a> We’ll be happy
                to help you.
              </p>
            </div>
            <div className={styles.faqPolicies}>
              <h4>Policies</h4>
              <div className={styles.faqPolicyLinks}>
                <Link href="/legal/privacy-policy">Privacy</Link>
                <Link href="/legal/terms-of-service">Terms</Link>
                <Link href="/legal/cookie-policy">Cookies</Link>
                <Link href="/legal/eula">EULA</Link>
                <Link href="/legal/dsar">DSAR</Link>
              </div>
            </div>
          </Reveal>
          <div className={styles.faqList}>
            {faqs.map((item, index) => (
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
      </main>
      <JsonLd value={organizationSchema} />
      <JsonLd value={websiteSchema} />
      <JsonLd value={faqSchema} />
    </div>
  );
}
