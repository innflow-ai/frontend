import Image from "next/image";
import { GoogleSignInButton } from "@/components/google-sign-in";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import styles from "./editorial-footer.module.css";

const footerNavigation = [
  {
    heading: "Product",
    links: [
      { label: "Platform", href: "/products/platform" },
      { label: "Agent OS", href: "/products/agent-os" },
      { label: "AI Agents", href: "/products/ai-agents" },
      { label: "Copilot", href: "/products/agent-os" },
      {
        label: "Agentic Workflows",
        href: "/products/agentic-workflows",
      },
      { label: "Agent Skills", href: "/skills" },
      { label: "AI Website Builder", href: "/features/website" },
      { label: "Databases", href: "/products/databases" },
      { label: "Templates", href: "/skills" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Listings", href: "/products/agent-os" },
      { label: "Advertising", href: "/products/agent-os" },
      { label: "Application & eSign", href: "/products/agent-os" },
      { label: "CRM", href: "/products/databases" },
      { label: "Conventional", href: "/property-management" },
      { label: "Student Housing", href: "/property-management" },
      { label: "Centralized Operations", href: "/property-management" },
      {
        label: "Owner Operators and Fee Managers",
        href: "/property-management",
      },
      { label: "Owners", href: "/property-management" },
      { label: "Move-In", href: "/property-management" },
      { label: "Renewals", href: "/property-management" },
      { label: "Delinquency", href: "/property-management" },
      {
        label: "Maintenance & Mobile App",
        href: "/property-management",
      },
      { label: "Owner Portal", href: "/property-management" },
    ],
  },
  {
    heading: "Portfolios",
    links: [
      { label: "Residential", href: "/#portfolios" },
      { label: "Multifamily", href: "/#portfolios" },
      { label: "Commercial", href: "/#portfolios" },
      { label: "Community Associations", href: "/#portfolios" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact us", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "Become an Affiliate", href: "/demo" },
      { label: "Customer Stories", href: "/blog" },
      { label: "Asset Library", href: "/blog" },
    ],
  },
] as const;

const legalLinks = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Service", href: "/legal/terms-of-service" },
  { label: "Cookie Policy", href: "/legal/cookie-policy" },
  {
    label: "Acceptable Use Policy",
    href: "/legal/acceptable-use-policy",
  },
  { label: "EULA", href: "/legal/eula" },
  { label: "Privacy Request", href: "/legal/dsar" },
] as const;

export function EditorialFooter() {
  return (
    <>
      <section
        className={styles.signupSection}
        aria-labelledby="footer-signup-heading"
      >
        <div className={`${styles.shell} ${styles.signupPanel}`}>
          <Image
            src="/brand/property-operations-one-flow.webp"
            alt=""
            fill
            quality={100}
            sizes="(max-width: 720px) calc(100vw - 32px), min(calc(100vw - 48px), 1200px)"
            className={styles.signupImage}
          />
          <div className={styles.signupOverlay} aria-hidden="true" />
          <div className={styles.signupContent}>
            <p className={styles.signupEyebrow}>One suite. Every operation.</p>
            <h2 id="footer-signup-heading">
              Bring your property operations into one flow.
            </h2>
            <p className={styles.signupCopy}>
              Start with your work email and create an Innflow account for your
              team.
            </p>
            <form
              className={styles.signupForm}
              action={siteConfig.signupUrl}
              method="get"
            >
              <label
                className={styles.visuallyHidden}
                htmlFor="footer-signup-email"
              >
                Work email
              </label>
              <input
                id="footer-signup-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Work email address"
                required
              />
              <button type="submit">Get started</button>
            </form>
            <p className={styles.signupNote}>No credit card required.</p>
          </div>
        </div>
      </section>
      <footer className={styles.footer} id="resources">
        <div className={`${styles.shell} ${styles.grid}`}>
          <div className={styles.brand}>
            <Image
              src="/brand/innflow_white_logo_set_bold.svg"
              alt="Innflow"
              width={135}
              height={28}
            />
            <p>
              The all-in-one property operations layer for connected workflows,
              visible decisions, and human control.
            </p>
            <div className={styles.brandLinks}>
              <TrackedLink
                destination={siteConfig.demoUrl}
                eventLabel="footer_demo"
              >
                Book a demo
              </TrackedLink>
              <GoogleSignInButton eventLabel="footer_login" label="Log in" />
            </div>
          </div>
          {footerNavigation.map((column) => (
            <div key={column.heading}>
              <strong>{column.heading}</strong>
              {column.links.map((link) => (
                <a key={`${link.label}-${link.href}`} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className={`${styles.shell} ${styles.bottom}`}>
          <span>
            © {new Date().getFullYear()} Innflow. All rights reserved.
          </span>
          <nav className={styles.legalLinks} aria-label="Legal">
            {legalLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            {/* biome-ignore lint/a11y/useValidAnchor: Termly requires href="#" for its preferences trigger. */}
            <a href="#" className="termly-display-preferences">
              Consent Preferences
            </a>
            <a href="https://app.termly.io/notify/d253192a-6c11-4338-9883-67b3307aea2f">
              Do Not Sell or Share My Personal Information
            </a>
            <a href="https://app.termly.io/notify/d253192a-6c11-4338-9883-67b3307aea2f">
              Limit the Use of My Sensitive Personal Information
            </a>
          </nav>
          <span className={styles.tagline}>
            Property operations, connected.
          </span>
        </div>
      </footer>
    </>
  );
}
