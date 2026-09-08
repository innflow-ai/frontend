"use client";

import {
  ArrowRight,
  CaretDown,
  CheckCircle,
  Database,
  FlowArrow,
  List,
  ShieldCheck,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import styles from "./baselane-homepage.module.css";
import previewStyles from "./runey-landing.module.css";
import { RuneyWorkspace } from "./runey-workspace";
import { TrackedLink } from "./tracked-link";

const menus = [
  {
    label: "Why Innflow",
    links: [
      ["About Innflow", "/BL/BL-about"],
      ["Careers", "/BL/BL-careers"],
      ["Industry coverage", "/BL/BL-in-the-news"],
      ["Investor stories", "/BL/BL-our-customers"],
      ["Security", "/BL/BL-security"],
      ["Share Innflow", "/BL/BL-landlord-referral"],
      ["Partnerships", "/BL/BL-partner-with-us"],
      ["Advisor partnerships", "/BL/BL-advisor-partner-program"],
      ["Workflows", "/products/agentic-workflows"],
      ["AI assistant", "/products/ai-agents"],
      ["Knowledge", "/platform"],
      ["Approvals", "/platform/security-and-compliance"],
    ],
  },
  {
    label: "Solutions",
    links: [
      ["Overview", "/BL/BL-home"],
      ["Multi-property investors", "/BL/BL-multi-property-investors"],
      ["Landlord operations", "/BL/BL-landlord-banking"],
      ["Rental workflows", "/BL/BL-rent-collection"],
      ["Rental workflows overview", "/BL/BL-rent-collection-2"],
      ["Connected property records", "/BL/BL-landlord-accounting"],
      ["Property review preparation", "/BL/BL-landlord-insurance"],
      ["Document preparation", "/BL/BL-tax-preparation"],
      ["Deposit workflows", "/BL/BL-security-deposit-account"],
      ["Screening resources", "/BL/BL-tenant-screening-service"],
      ["Savings resources", "/BL/BL-landlord-banking-apy"],
      ["Financing resources", "/BL/BL-rental-property-loans"],
      ["Property management", "/property-management"],
      ["Connected operations", "/platform"],
      ["Integrations", "/integrations"],
    ],
  },
  {
    label: "Resources",
    links: [
      ["Resource library", "/BL/BL-resources"],
      ["Rental forms", "/BL/BL-free-rental-forms-and-templates-for-landlords"],
      ["Rent comparison", "/BL/BL-how-much-should-i-charge-for-rent"],
      ["Lease workflows", "/BL/BL-lease-agreement"],
      ["Masterclasses", "/BL/BL-webinars"],
      ["Investing guides", "/BL/BL-real-estate-investing"],
      ["Product updates", "/BL/BL-product-updates"],
      ["Blog", "/blog"],
      ["Help center", "/BL/BL-help-center"],
      ["Legal agreements", "/BL/BL-legal-agreements"],
      ["FAQ", "/faq"],
      ["Contact", "/contact"],
    ],
  },
];
const capabilities = [
  {
    icon: Database,
    title: "Connected context",
    text: "Keep property records, files, and procedures beside the work they support.",
  },
  {
    icon: FlowArrow,
    title: "Workflow automation",
    text: "Give recurring requests a clear path, from the first trigger to the next action.",
  },
  {
    icon: ShieldCheck,
    title: "Human approvals",
    text: "Review the details before consequential work moves forward.",
  },
  {
    icon: CheckCircle,
    title: "Visible execution",
    text: "Follow each step, inspect the context, and see where a handoff needs attention.",
  },
];

export function BaselaneHomepage({ children }: { children?: ReactNode }) {
  const [menu, setMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) {
        setMenu(null);
        setMobile(false);
      }
    };
    document.addEventListener("pointerdown", close);
    const handleEscape = (event: KeyboardEvent) => {
      if (
        event.key !== "Escape" ||
        !header.current?.contains(event.target as Node)
      )
        return;
      const trigger = header.current.querySelector<HTMLButtonElement>(
        'button[aria-expanded="true"]',
      );
      if (toggle.current?.getAttribute("aria-expanded") === "true")
        toggle.current.focus();
      else trigger?.focus();
      setMenu(null);
      setMobile(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  const closeMenus = () => {
    setMenu(null);
    setMobile(false);
  };
  return (
    <div className={styles.page}>
      <header ref={header} className={styles.header}>
        <a href="/BL/BL-home" className={styles.logo} aria-label="Innflow home">
          <Image
            src="/brand/innflow-wordmark.svg"
            alt="Innflow"
            width={95}
            height={28}
            preload
          />
        </a>
        <nav
          id="baselane-preview-nav"
          aria-label="Primary navigation"
          className={`${styles.nav} ${mobile ? styles.open : ""}`}
        >
          {menus.map((group) => (
            <div className={styles.menuGroup} key={group.label}>
              <button
                type="button"
                aria-expanded={menu === group.label}
                aria-controls={`baselane-${group.label.replaceAll(" ", "-")}`}
                onClick={() =>
                  setMenu(menu === group.label ? null : group.label)
                }
              >
                {group.label}
                <CaretDown size={13} />
              </button>
              {menu === group.label && (
                <div
                  id={`baselane-${group.label.replaceAll(" ", "-")}`}
                  className={styles.dropdown}
                >
                  {group.links.map(([label, href]) => (
                    <a key={label} href={href} onClick={closeMenus}>
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href="/BL/BL-pricing">Pricing</a>
          <a href="/BL/BL-demo">Demo</a>
          <a
            className={styles.mobileLogin}
            href={`${siteConfig.appOrigin}/login`}
          >
            Log in
          </a>
        </nav>
        <div className={styles.headerActions}>
          <a className={styles.login} href={`${siteConfig.appOrigin}/login`}>
            Log in
          </a>
          <TrackedLink
            className={styles.darkButton}
            destination={siteConfig.signupUrl}
            eventLabel="baselane_header_signup"
          >
            Sign up
          </TrackedLink>
          <button
            ref={toggle}
            type="button"
            className={styles.menuToggle}
            aria-label={mobile ? "Close navigation" : "Open navigation"}
            aria-expanded={mobile}
            aria-controls="baselane-preview-nav"
            onClick={() => {
              setMobile(!mobile);
              setMenu(null);
            }}
          >
            {mobile ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </header>
      <main id="main-content">
        {children ?? (
          <>
            <section className={styles.hero}>
              <Image
                src="/brand/baselane-inspired/hero.webp"
                alt=""
                fill
                sizes="100vw"
                preload
                className={styles.heroPhoto}
              />
              <div className={styles.heroCopy}>
                <span className={styles.eyebrow}>
                  PROPERTY OPERATIONS, CONNECTED
                </span>
                <h1>
                  Operations that give
                  <br className={styles.desktopBreak} /> you your day back.
                </h1>
                <p>
                  Bring your workflows, knowledge, and approvals together.
                  <br className={styles.desktopBreak} /> Keep your property
                  operations moving with Innflow.
                </p>
              </div>
              <div className={styles.heroBottom}>
                <div className={styles.actions}>
                  <TrackedLink
                    destination={siteConfig.signupUrl}
                    eventLabel="baselane_hero_signup"
                    className={styles.blueButton}
                  >
                    Get started
                  </TrackedLink>
                  <a className={styles.darkButton} href="/BL/BL-demo">
                    See demo <ArrowRight size={19} />
                  </a>
                </div>
                <p>One place for your team, context, and next steps.</p>
              </div>
            </section>
            <div className={styles.trustBar}>
              <span>Built around your property work</span>
              <span>Connected workflows. Clearer handoffs.</span>
            </div>
            <section
              className={`${styles.shell} ${styles.intro}`}
              aria-label="Connected property operations"
            >
              <p>Make room for the work that matters.</p>
              <div className={styles.pillars}>
                <div>
                  <strong>Connect</strong>
                  <span>
                    your systems
                    <br />
                    and context
                  </span>
                </div>
                <div>
                  <strong>Coordinate</strong>
                  <span>
                    your recurring
                    <br />
                    operations
                  </span>
                </div>
                <div>
                  <strong>Review</strong>
                  <span>
                    the moments
                    <br />
                    that matter
                  </span>
                </div>
              </div>
            </section>
            <section className={`${styles.shell} ${styles.products}`}>
              <h2>Operations organized. Mind clear.</h2>
              <nav
                aria-label="Explore product stories"
                className={styles.storyNav}
              >
                <a href="#baselane-workflows">Workflows</a>
                <a href="#baselane-knowledge">Knowledge</a>
              </nav>
              {[
                {
                  id: "workflows",
                  tag: "WORKFLOWS",
                  title: "Give every handoff a clear next step.",
                  copy: "Bring triggers, connected actions, and review points into a workflow your team can follow.",
                  href: "/products/agentic-workflows",
                  view: "Workflows" as const,
                  note: "From the first request to the final review, keep the right context attached to every step.",
                  foot: "Your team stays in control.",
                },
                {
                  id: "knowledge",
                  tag: "KNOWLEDGE & AI",
                  title: "Answers with your operation’s context.",
                  copy: "Keep procedures, files, and working records together. Give your assistant the context to help prepare the next step.",
                  href: "/products/ai-agents",
                  view: "Assistant" as const,
                  note: "A clearer answer starts with shared knowledge. Bring supporting records alongside the work.",
                  foot: "Context beside the conversation.",
                },
              ].map((story) => (
                <article
                  key={story.id}
                  id={`baselane-${story.id}`}
                  className={`${styles.story} ${story.id === "knowledge" ? styles.knowledgeStory : ""}`}
                >
                  <div className={styles.storyCopy}>
                    <span className={styles.storyTag}>{story.tag}</span>
                    <h3>{story.title}</h3>
                    <p>{story.copy}</p>
                    <a className={styles.lightButton} href={story.href}>
                      Explore {story.id} <ArrowRight size={16} />
                    </a>
                  </div>
                  <div
                    className={`${styles.productPreview} ${previewStyles.blueHome}`}
                  >
                    <RuneyWorkspace initialView={story.view} />
                  </div>
                  <aside className={styles.storyNote}>
                    <p>{story.note}</p>
                    <span>{story.foot}</span>
                  </aside>
                </article>
              ))}
            </section>
            <section className={`${styles.shell} ${styles.capabilities}`}>
              <h2>Clarity where it counts.</h2>
              <div className={styles.capabilityGrid}>
                {capabilities.map(({ icon: Icon, title, text }) => (
                  <div key={title}>
                    <h3>
                      <Icon size={21} />
                      {title}
                    </h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className={`${styles.shell} ${styles.support}`}>
              <h2>
                Built around
                <br />
                your team.
              </h2>
              <div>
                {[
                  [
                    "A shared starting point",
                    "Bring procedures and operational records together so your team can work from the same context.",
                  ],
                  [
                    "People in control",
                    "Keep review points visible before consequential actions move forward.",
                  ],
                  [
                    "A clearer next step",
                    "Start with one recurring operation. Inspect the process and expand from there.",
                  ],
                ].map(([title, copy]) => (
                  <div className={styles.supportRow} key={title}>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className={styles.closing}>
              <h2>
                A clearer day starts
                <br className={styles.mobileBreak} /> with a connected flow.
              </h2>
              <p>Bring your team, context, and next steps together.</p>
              <div className={styles.actions}>
                <a className={styles.outlineButton} href="/BL/BL-demo">
                  See demo <ArrowRight size={18} />
                </a>
                <TrackedLink
                  className={styles.darkButton}
                  destination={siteConfig.signupUrl}
                  eventLabel="baselane_closing_signup"
                >
                  Get started
                </TrackedLink>
              </div>
            </section>
          </>
        )}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <a
              href="/BL/BL-home"
              aria-label="Innflow home"
              className={styles.footerLogo}
            >
              <Image
                src="/brand/innflow-wordmark.svg"
                width={105}
                height={30}
                alt="Innflow"
              />
            </a>
            <p>
              Property operations.
              <br />
              Connected in one place.
            </p>
            <a href={`mailto:${siteConfig.supportEmail}`}>
              {siteConfig.supportEmail}
            </a>
          </div>
          {menus.map((group) => (
            <div key={group.label}>
              <h3>{group.label}</h3>
              {group.links.map(([label, href]) => (
                <a href={href} key={label}>
                  {label}
                </a>
              ))}
            </div>
          ))}
          <div>
            <h3>Property teams</h3>
            <a href="/BL/BL-long-term-rentals">Long-term rentals</a>
            <a href="/BL/BL-mid-term-rentals">Mid-term rentals</a>
            <a href="/BL/BL-short-term-rentals">Short-term rentals</a>
            <a href="/BL/BL-renters">Resident experiences</a>
            <h3 className={styles.footerSubheading}>Get started</h3>
            <a href="/BL/BL-demo">Book a demo</a>
            <a href="/BL/BL-pricing">Pricing</a>
            <a href={`${siteConfig.appOrigin}/login`}>Log in</a>
            <a href={siteConfig.signupUrl}>Sign up</a>
          </div>
        </div>
        <details className={styles.referenceLinks}>
          <summary>
            Baselane reference links <span aria-hidden="true">+</span>
          </summary>
          <p>
            Original publisher destinations for the resources featured in this
            collection.
          </p>
          <div className={styles.referenceGrid}>
            <div>
              <h3>Baselane apps</h3>
              <a href="https://apps.apple.com/us/app/baselane/id6755168931">
                Apple App Store ↗
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.baselane.landlord">
                Google Play ↗
              </a>
            </div>
            <div>
              <h3>Baselane social channels</h3>
              <a href="https://www.facebook.com/baselanehq">Facebook ↗</a>
              <a href="https://www.instagram.com/baselanehq/">Instagram ↗</a>
              <a href="https://www.linkedin.com/company/baselane">LinkedIn ↗</a>
              <a href="https://www.youtube.com/@baselane">YouTube ↗</a>
            </div>
            <div>
              <h3>Thread Bank disclosures</h3>
              <p>Banking disclosures referenced by Baselane.</p>
              <a href="https://thread.bank/program-banks/">Program banks ↗</a>
              <a href="https://thread.bank/sweep-disclosure/">
                Sweep disclosure ↗
              </a>
            </div>
          </div>
        </details>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Innflow</span>
          <div>
            <a href="/BL/BL-privacy-policy">Privacy Policy</a>
            <a href="/BL/BL-terms-of-use">Terms of Service</a>
            <a href="/legal/cookie-policy">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
