import { Instrument_Sans, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ScrollShowcase } from "@/app/preview/scroll-showcase/scroll-showcase";
import { ScrollStory } from "@/components/scroll-story";
import { siteConfig } from "@/config/site";
import {
  type HotelModule,
  hotelGroups,
  hotelHref,
  hotelModules,
} from "@/content/hotel-pms";
import styles from "./hotel.module.css";
import { HotelWorkspace } from "./hotel-workspace";

const heading = Instrument_Sans({
  subsets: ["latin"],
  variable: "--hotel-heading",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--hotel-body",
  display: "swap",
});
const pageClass = `${styles.page} ${heading.variable} ${body.variable}`;

export function HotelCta() {
  return (
    <section className={styles.closing}>
      <span className={styles.eyebrow}>BUILT AROUND YOUR HOTEL</span>
      <h2>
        Let’s connect
        <br />
        the work behind the stay.
      </h2>
      <p>
        Start with your team, your systems, and the workflow you want to
        improve.
      </p>
      <a className={styles.button} href={siteConfig.demoUrl}>
        Plan your hotel workflow <span aria-hidden="true">↗</span>
      </a>
      <small>
        Hotel platform in development. Scope and availability confirmed
        together.
      </small>
    </section>
  );
}

export function HotelModuleGrid() {
  return (
    <section className={styles.section} id="platform">
      <header className={styles.sectionHeading}>
        <span className={styles.eyebrow}>ONE CONNECTED OPERATING PICTURE</span>
        <h2>
          From the first booking
          <br />
          to the final balance.
        </h2>
        <p>
          A hotel runs on hundreds of small handoffs. Bring them closer
          together.
        </p>
      </header>
      <div className={styles.moduleGroups}>
        {hotelGroups.map((group) => (
          <div key={group}>
            <h3 className={styles.groupTitle}>{group}</h3>
            <div className={styles.moduleList}>
              {hotelModules
                .filter((module) => module.group === group)
                .map((module) => (
                  <Link
                    className={styles.moduleCard}
                    key={module.slug}
                    href={hotelHref(module.slug)}
                  >
                    <span className={styles.moduleIcon} aria-hidden="true">
                      {group === "Guest operations"
                        ? "◇"
                        : group === "Hotel operations"
                          ? "⊞"
                          : "↗"}
                    </span>
                    <h4>
                      {module.name}
                      <span aria-hidden="true">↗</span>
                    </h4>
                    <p>{module.description}</p>
                    <span className={styles.explore}>Explore workflow</span>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HotelHomepage() {
  return (
    <main id="main-content" className={pageClass}>
      <ScrollShowcase hotel />
      <section className={styles.section} id="workspace-overview">
        <div className={styles.introduction}>
          <span className={styles.eyebrow}>HOSPITALITY, CONNECTED</span>
          <h2>
            Your guests see a great stay.
            <br />
            <span>You see how it all comes together.</span>
          </h2>
          <p>
            Front desk. Housekeeping. Finance. Purchasing. A shared workspace
            for the people and decisions behind every stay.
          </p>
        </div>
        <div className={styles.pillarGrid}>
          {[
            {
              name: "Welcome every guest",
              text: "Connect reservations, guest context, and room readiness.",
              slug: "front-desk",
            },
            {
              name: "Keep the hotel moving",
              text: "Coordinate teams, supplies, and the next handoff.",
              slug: "housekeeping",
            },
            {
              name: "Understand the business",
              text: "Bring costs, revenue, and portfolio performance into view.",
              slug: "portfolio",
            },
          ].map((pillar) => (
            <Link key={pillar.slug} href={hotelHref(pillar.slug)}>
              <span className={styles.pillarIcon} aria-hidden="true">
                ↗
              </span>
              <h3>{pillar.name}</h3>
              <p>{pillar.text}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className={styles.editorial}>
        <div className={styles.editorialPhoto}>
          <Image
            src="/hotel-pms/lobby.jpg"
            alt="A warm hotel lobby with welcoming seating and natural finishes"
            fill
            sizes="(max-width: 800px) 100vw, 55vw"
          />
        </div>
        <div className={styles.editorialCopy}>
          <span className={styles.eyebrow}>LESS CHASING. MORE HOSTING.</span>
          <h2>The best service starts behind the scenes.</h2>
          <p>
            A room becomes ready. An arrival changes. A supplier runs short.
            Give each team the context to act, without starting the conversation
            over.
          </p>
          <Link
            className={styles.textLink}
            href={hotelHref("guest-experience")}
          >
            Explore the guest journey <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <HotelModuleGrid />
      <section className={styles.workflowSection}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>A WORKDAY, CONNECTED</span>
          <h2>
            Small handoffs.
            <br />A better-running hotel.
          </h2>
        </div>
        <ScrollStory
          layout="stacked"
          steps={[
            {
              id: "arrival",
              label: "Prepare the arrival",
              content: (
                <WorkflowPanel
                  kind="front-desk"
                  eyebrow="FRONT DESK + HOUSEKEEPING"
                  title="The room and the reservation, in step."
                  text="An early arrival belongs in the room-turn plan. Link guest context to cleaning and inspection so reception knows what comes next."
                  href="housekeeping"
                />
              ),
            },
            {
              id: "purchase",
              label: "Restock with context",
              content: (
                <WorkflowPanel
                  kind="procurement"
                  eyebrow="OPERATIONS + PURCHASING"
                  title="A purchase with the full picture."
                  text="Compare suppliers, check the budget, and get approval before the order. Keep receiving connected when the delivery arrives."
                  href="procurement"
                />
              ),
            },
            {
              id: "close",
              label: "Review the business",
              content: (
                <WorkflowPanel
                  kind="accounting"
                  eyebrow="FINANCE + PORTFOLIO"
                  title="From an invoice to an informed decision."
                  text="Keep the source document, coding, approval, and property context together. Give finance a clearer path from daily work to the monthly close."
                  href="accounting"
                />
              ),
            },
          ]}
        />
      </section>
      <HotelCta />
    </main>
  );
}

function WorkflowPanel({
  kind,
  eyebrow,
  title,
  text,
  href,
}: {
  kind: string;
  eyebrow: string;
  title: string;
  text: string;
  href: string;
}) {
  return (
    <article className={styles.workflowPanel}>
      <div className={styles.panelArt}>
        <HotelWorkspace kind={kind} />
      </div>
      <div className={styles.panelCopy}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h3>{title}</h3>
        <p>{text}</p>
        <Link href={hotelHref(href)} className={styles.textLink}>
          Explore the workflow <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

export function HotelPlatformPage() {
  return (
    <main id="main-content" className={pageClass}>
      <header className={styles.platformHero}>
        <span className={styles.eyebrow}>
          THE INNFLOW HOTEL PLATFORM · PREVIEW
        </span>
        <h1>
          One hotel.
          <br />
          One connected picture.
        </h1>
        <p>
          Guest operations, hotel operations, and financial performance. Explore
          the workflows we’re bringing together.
        </p>
        <a className={styles.button} href={siteConfig.demoUrl}>
          Plan your hotel workflow <span aria-hidden="true">↗</span>
        </a>
      </header>
      <HotelModuleGrid />
      <section className={styles.section} id="hotel-teams">
        <div className={styles.sectionHeading}>
          <h2>Built around the way you operate.</h2>
        </div>
        <div className={styles.pillarGrid}>
          {[
            {
              title: "Independent hotels",
              text: "Start with the daily handoffs that take time away from your guests.",
            },
            {
              title: "Hotel groups",
              text: "Connect property detail to a consistent portfolio view.",
            },
            {
              title: "Extended stays",
              text: "Bring longer reservations, recurring billing, and service schedules together.",
            },
          ].map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <HotelCta />
    </main>
  );
}

export function HotelFeaturePage({ module }: { module: HotelModule }) {
  return (
    <main id="main-content" className={pageClass}>
      <header className={styles.featureHero}>
        <div className={styles.featureHeroCopy}>
          <Link className={styles.breadcrumb} href="/hotel-pms">
            Hotel platform <span aria-hidden="true">/</span> {module.name}
          </Link>
          <span className={styles.eyebrow}>
            {module.group.toUpperCase()} · PLATFORM PREVIEW
          </span>
          <h1>{module.headline}</h1>
          <p>{module.description}</p>
          <a className={styles.button} href={siteConfig.demoUrl}>
            Explore your workflow <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className={styles.featureHeroArt}>
          <Image
            src="/hotel-pms/lobby.jpg"
            alt="Hotel lobby with warm wood and comfortable seating"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 55vw"
          />
          <div className={styles.heroWorkspace}>
            <HotelWorkspace kind={module.slug} />
          </div>
        </div>
      </header>
      <section className={styles.workflowSection}>
        <header className={styles.sectionHeading}>
          <span className={styles.eyebrow}>{module.name.toUpperCase()}</span>
          <h2>Keep the next step in view.</h2>
        </header>
        <ScrollStory
          layout="stacked"
          steps={module.steps.map((step, index) => ({
            id: `${module.slug}-${index + 1}`,
            label: step.title,
            content: (
              <article className={styles.detailPanel}>
                <div className={styles.detailCopy}>
                  <span className={styles.eyebrow}>
                    {module.name.toUpperCase()}
                  </span>
                  <h2>{step.title}</h2>
                  <p>{step.body}</p>
                </div>
                <div className={styles.detailArt}>
                  <span className={styles.micro}>CONNECTED WORKFLOW</span>
                  <ul>
                    {step.detail.map((detail) => (
                      <li key={detail}>
                        <span aria-hidden="true">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.flowLine}>
                    <span>Context</span>
                    <span aria-hidden="true">→</span>
                    <span>Team review</span>
                    <span aria-hidden="true">→</span>
                    <span>Next step</span>
                  </div>
                </div>
              </article>
            ),
          }))}
        />
      </section>
      <section className={styles.supporting}>
        <h2>Designed for the details.</h2>
        <div>
          {module.highlights.map((highlight) => (
            <p key={highlight}>
              <span aria-hidden="true">↗</span>
              {highlight}
            </p>
          ))}
        </div>
      </section>
      <section className={styles.faq}>
        <header>
          <span className={styles.eyebrow}>GOOD TO KNOW</span>
          <h2>A few practical questions.</h2>
        </header>
        <div>
          <details>
            <summary>{module.question}</summary>
            <p>{module.answer}</p>
          </details>
          <details>
            <summary>Is this available today?</summary>
            <p>
              This is a preview of Innflow’s hotel platform direction. We’ll
              confirm available capabilities, integrations, and rollout timing
              with your team before making a commitment.
            </p>
          </details>
          <details>
            <summary>Where should our team start?</summary>
            <p>
              Start with one workflow, the people responsible for it, and the
              systems they use. We’ll map the handoffs together and agree on a
              focused starting point.
            </p>
          </details>
        </div>
      </section>
      <section className={styles.related}>
        <h2>Keep the work connected.</h2>
        <div>
          {hotelModules
            .filter(
              (item) =>
                item.group === module.group && item.slug !== module.slug,
            )
            .map((item) => (
              <Link key={item.slug} href={hotelHref(item.slug)}>
                {item.name}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
        </div>
      </section>
      <HotelCta />
    </main>
  );
}

export function HotelFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div>
          <Link href="/" aria-label="Innflow home">
            <Image
              src="/hotel-pms/innflow-white.svg"
              alt="Innflow"
              width={158}
              height={33}
            />
          </Link>
          <p>
            The work behind
            <br />a remarkable stay.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          {hotelGroups.map((group) => (
            <div key={group}>
              <h2>{group}</h2>
              {hotelModules
                .filter((module) => module.group === group)
                .map((module) => (
                  <Link key={module.slug} href={hotelHref(module.slug)}>
                    {module.name}
                  </Link>
                ))}
            </div>
          ))}
        </nav>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} Innflow</span>
        <Link href="/legal/privacy-policy">Privacy</Link>
        <Link href="/legal/terms-of-service">Terms</Link>
        <a href={siteConfig.demoUrl}>Talk to us ↗</a>
      </div>
    </footer>
  );
}
