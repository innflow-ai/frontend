import {
  ArrowRight,
  Bank,
  Buildings,
  ChartLineUp,
  ChatCircleDots,
  CheckCircle,
  Database,
  FlowArrow,
  Headset,
  HouseLine,
  Key,
  Robot,
  ShieldCheck,
  Sparkle,
  UsersThree,
  Warehouse,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import type { ReactNode } from "react";
import { EditorialFooter } from "@/components/editorial-footer";
import { EditorialHeader } from "@/components/editorial-header";
import { JsonLd } from "@/components/json-ld";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import { faqs, integrations } from "@/content/home";
import styles from "./page.module.css";

const evidence = [
  [ShieldCheck, "Purpose-built", "Designed around recurring property work."],
  [FlowArrow, "Connected workflows", "Requests, context, review, and records."],
  [CheckCircle, "Secure foundations", "Human approval remains visible."],
  [Headset, "Guided onboarding", "Start with one bounded operation."],
] as const;

const featureBands = [
  {
    kicker: "Accounting · reporting",
    title: "Close faster. Report with confidence.",
    body: "Connect operational records to reviewable reporting workflows without claiming to replace your accounting system.",
    href: "/features/workflows",
    action: "Explore accounting workflows",
    icon: Bank,
    panel: "accounting",
  },
  {
    kicker: "Leasing · resident experience",
    title: "Lease smarter. Keep residents informed.",
    body: "Bring applications, resident requests, communication, and supporting context into one governed handoff.",
    href: "/features/communications",
    action: "Explore resident workflows",
    icon: ChatCircleDots,
    panel: "leasing",
  },
  {
    kicker: "Operations · AI automation",
    title: "Streamline operations. Automate the busywork.",
    body: "Coordinate maintenance, inspections, vendor handoffs, and bounded assistant actions with clear review points.",
    href: "/features/assistant",
    action: "Explore operations",
    icon: Wrench,
    panel: "operations",
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

function EditorialLabel({ children }: { children: ReactNode }) {
  return <span className={styles.label}>{children}</span>;
}

function HeroProduct() {
  return (
    <section
      className={styles.heroProduct}
      aria-label="Illustrative operations dashboard"
    >
      <div className={styles.productRail}>
        <strong>Innflow</strong>
        <span className={styles.railActive}>Overview</span>
        <span>Accounting</span>
        <span>Leasing</span>
        <span>Operations</span>
        <span>Residents</span>
      </div>
      <div className={styles.productMain}>
        <div className={styles.productTopline}>
          <span>Portfolio overview</span>
          <small>Illustrative walkthrough</small>
        </div>
        <div className={styles.metricGrid}>
          <article className={styles.chartCard}>
            <span>Operating income</span>
            <strong>Portfolio view</strong>
            <div className={styles.chartBars} aria-hidden="true">
              {[34, 52, 44, 68, 58, 79, 72, 91].map((height) => (
                <i key={height} style={{ height: `${height}%` }} />
              ))}
            </div>
          </article>
          <article>
            <span>Open maintenance</span>
            <strong>128</strong>
            <small>Needs triage</small>
          </article>
          <article>
            <span>Leasing pipeline</span>
            <strong>23</strong>
            <small>Active leads</small>
          </article>
        </div>
      </div>
      <aside className={styles.assistantCard}>
        <span className={styles.assistantBadge}>
          <Sparkle size={14} weight="fill" /> Assistant
        </span>
        <p>Good morning. Here’s what needs attention across your portfolio.</p>
        <div>
          <span>Work order requires review</span>
          <strong>Kitchen faucet leak</strong>
          <small>Unit 206 · medium priority</small>
        </div>
        <button type="button">Review work order</button>
      </aside>
    </section>
  );
}

function FeaturePanel({ type }: { type: string }) {
  if (type === "accounting") {
    return (
      <div className={styles.featureUi}>
        <aside>
          <strong>Accounting</strong>
          <span>General ledger</span>
          <span>Banking</span>
          <span>Accounts payable</span>
          <span>Reconciliation</span>
          <span>Reports</span>
        </aside>
        <article className={styles.reportPanel}>
          <span>Cash position</span>
          <strong>Across all portfolios</strong>
          <div className={styles.reportBars} aria-hidden="true">
            {[48, 78, 59, 88, 70, 96].map((height) => (
              <i key={height} style={{ height: `${height}%` }} />
            ))}
          </div>
        </article>
        <aside>
          <strong>Financial reports</strong>
          <span>Balance sheet</span>
          <span>Income statement</span>
          <span>Cash flow</span>
          <span>Budget vs actual</span>
        </aside>
      </div>
    );
  }

  if (type === "leasing") {
    return (
      <div className={styles.featureUi}>
        <aside>
          <strong>Leasing</strong>
          <span>Pipeline</span>
          <span>Applications</span>
          <span>Leases</span>
          <span>Renewals</span>
        </aside>
        <article className={styles.pipelinePanel}>
          <span>Pipeline overview</span>
          <div>
            <strong>12</strong>
            <small>Tour</small>
            <strong>7</strong>
            <small>Apply</small>
            <strong>5</strong>
            <small>Approved</small>
            <strong>4</strong>
            <small>Lease</small>
          </div>
          <p>
            <span>Jamie R.</span>
            <small>Screening</small>
          </p>
          <p>
            <span>Taylor M.</span>
            <small>Approved</small>
          </p>
          <p>
            <span>Jordan S.</span>
            <small>New</small>
          </p>
        </article>
        <aside>
          <strong>Resident center</strong>
          <span>Pay rent</span>
          <span>Submit request</span>
          <span>Messages</span>
          <span>Documents</span>
        </aside>
      </div>
    );
  }

  return (
    <div className={styles.featureUi}>
      <aside>
        <strong>Operations</strong>
        <span>Work orders</span>
        <span>Inspections</span>
        <span>Preventive care</span>
        <span>Vendors</span>
      </aside>
      <article className={styles.workOrderPanel}>
        <span>Work orders</span>
        <p>
          <small>New</small>
          <strong>18</strong>
        </p>
        <p>
          <small>In progress</small>
          <strong>42</strong>
        </p>
        <p>
          <small>Awaiting parts</small>
          <strong>14</strong>
        </p>
        <p>
          <small>Completed</small>
          <strong>96</strong>
        </p>
      </article>
      <aside>
        <strong>AI assistant</strong>
        <span>Classify requests</span>
        <span>Draft responses</span>
        <span>Summarize work orders</span>
        <span>Pause for review</span>
      </aside>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="editorial-home">
      <EditorialHeader />
      <main id="main-content" className={styles.page}>
        <section className={`${styles.surface} ${styles.dark} ${styles.hero}`}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <EditorialLabel>AI property operations</EditorialLabel>
            <h1>
              Run property operations.{" "}
              <span className="gradient-text">Elevate every portfolio.</span>
            </h1>
            <p>
              Innflow connects recurring workflows, operating context,
              approvals, and resident-facing handoffs in one coordinated
              platform.
            </p>
            <div className={styles.actions}>
              <TrackedLink
                className="editorial-button editorial-button-light"
                destination={siteConfig.demoUrl}
                eventLabel="hero_demo"
              >
                Book a demo <ArrowRight size={15} />
              </TrackedLink>
              <a
                className="editorial-button editorial-button-ghost"
                href="#features"
              >
                See how it works
              </a>
            </div>
          </div>
          <HeroProduct />
        </section>

        <section
          className={`${styles.surface} ${styles.dark} ${styles.evidence}`}
          aria-label="Product evidence"
        >
          {evidence.map(([Icon, title, body]) => (
            <article key={title}>
              <Icon size={24} />
              <div>
                <strong>{title}</strong>
                <span>{body}</span>
              </div>
            </article>
          ))}
        </section>

        <section
          className={`${styles.surface} ${styles.integrations}`}
          id="integrations"
        >
          <div>
            <EditorialLabel>Connected ecosystem</EditorialLabel>
            <h2>Connect the tools you already use.</h2>
            <p>
              These marks correspond to connector paths in the current product
              repository, not customer endorsements.
            </p>
            <a href="/integrations">
              View all integrations <ArrowRight size={14} />
            </a>
          </div>
          <div className={styles.integrationGrid}>
            {integrations.map((integration) => (
              <span key={integration.name}>
                <Image src={integration.asset} alt="" width={28} height={28} />
                <strong>{integration.name}</strong>
              </span>
            ))}
          </div>
        </section>

        <section
          className={`${styles.surface} ${styles.dark} ${styles.setup}`}
          id="why-innflow"
        >
          <div className={styles.setupIntro}>
            <EditorialLabel>A smooth start</EditorialLabel>
            <h2>From setup to success in three steps.</h2>
          </div>
          <ol>
            <li>
              <span className="gradient-text">01</span>
              <Database size={26} />
              <div>
                <strong>Connect your portfolio</strong>
                <p>
                  Confirm the systems, records, and context the workflow needs.
                </p>
              </div>
            </li>
            <li>
              <span className="gradient-text">02</span>
              <Robot size={26} />
              <div>
                <strong>Configure your workflows</strong>
                <p>
                  Define actions, exceptions, approvals, and visible ownership.
                </p>
              </div>
            </li>
            <li>
              <span className="gradient-text">03</span>
              <ChartLineUp size={26} />
              <div>
                <strong>Operate with confidence</strong>
                <p>
                  Review execution and expand only when the process is ready.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section
          className={`${styles.surface} ${styles.features}`}
          id="features"
        >
          <div className={styles.centerIntro}>
            <EditorialLabel>One platform · every workflow</EditorialLabel>
            <h2>Everything you need to run modern property operations.</h2>
            <p>
              Start with a real handoff, keep the controls visible, and expand
              only after the workflow is validated.
            </p>
          </div>
          <div className={styles.featureBands}>
            {featureBands.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article
                  className={`${styles.featureBand} ${
                    index % 2 === 1 ? styles.featureBandReverse : ""
                  }`}
                  key={feature.title}
                >
                  {" "}
                  <div className={styles.featureCopy}>
                    <span className={styles.bandKicker}>
                      <Icon size={15} /> {feature.kicker}
                    </span>
                    <h3>{feature.title}</h3>
                    <p>{feature.body}</p>
                    <a href={feature.href}>
                      {feature.action} <ArrowRight size={14} />
                    </a>
                  </div>
                  <FeaturePanel type={feature.panel} />
                </article>
              );
            })}
          </div>
        </section>

        <section
          className={`${styles.surface} ${styles.portfolios}`}
          id="portfolios"
        >
          <div className={styles.centerIntro}>
            <EditorialLabel>Built for every portfolio</EditorialLabel>
            <h2>One platform for every property type you manage.</h2>
            <p>
              Portfolio-specific product depth is confirmed during discovery.
            </p>
          </div>
          <div className={styles.portfolioGrid}>
            {portfolioTypes.map((portfolio) => {
              const Icon = portfolio.icon;
              return (
                <article key={portfolio.title}>
                  <Image
                    src={portfolio.image}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 90vw, 30vw"
                  />
                  <div>
                    <Icon size={20} />
                    <strong>{portfolio.title}</strong>
                    <span>{portfolio.body}</span>
                    <small>{portfolio.credit}</small>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={`${styles.surface} ${styles.partner}`}>
          <div>
            <EditorialLabel>Always by your side</EditorialLabel>
            <h2>A partner in your success.</h2>
          </div>
          <div className={styles.partnerGrid}>
            <article>
              <FlowArrow size={25} />
              <strong>Seamless onboarding</strong>
              <p>
                A dedicated path guides your team from scope to a validated
                workflow.
              </p>
            </article>
            <article>
              <Database size={25} />
              <strong>Data migration</strong>
              <p>
                Move only the context your approved operation needs, securely
                and accurately.
              </p>
            </article>
            <article>
              <Headset size={25} />
              <strong>Ongoing support</strong>
              <p>
                Keep ownership, review points, and recovery paths visible as the
                process evolves.
              </p>
            </article>
          </div>
        </section>

        <section className={`${styles.surface} ${styles.faq}`} id="faq">
          <div>
            <EditorialLabel>Questions? We’ve got answers.</EditorialLabel>
            <h2>Common questions. Clear boundaries.</h2>
          </div>
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

        <section
          className={`${styles.surface} ${styles.dark} ${styles.finalCta}`}
        >
          <div className={styles.ctaGlow} aria-hidden="true" />
          <div>
            <EditorialLabel>One operation · one clear next step</EditorialLabel>
            <h2>
              See Innflow <span className="gradient-text">in action.</span>{" "}
              Built for your portfolio.
            </h2>
          </div>
          <div>
            <TrackedLink
              className="editorial-button editorial-button-light"
              destination={siteConfig.demoUrl}
              eventLabel="final_demo"
            >
              Book a demo <ArrowRight size={15} />
            </TrackedLink>
            <small>No pressure. No obligation.</small>
          </div>
        </section>
      </main>
      <EditorialFooter />
      <JsonLd value={organizationSchema} />
      <JsonLd value={faqSchema} />
    </div>
  );
}
