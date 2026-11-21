import Image from "next/image";
import { siteConfig } from "@/config/site";
import { CustomerSupportHours } from "./customer-support-hours";
import { FooterLegalLinks } from "./footer-legal-links";
import { FooterNewsletter } from "./footer-newsletter";
import { GoogleCtaContent } from "./google-cta-content";
import styles from "./site-footer.module.css";

/** Shared sitewide footer — cross-industry agent platform, not PM-niche. */
const footerMenus = [
  {
    label: "Why innflow",
    links: [
      ["About innflow", "/about"],
      ["Careers", "/careers"],
      ["Industry coverage", "/in-the-news"],
      ["Who we help", "/our-customers"],
      ["Security", "/security"],
      ["Partnerships", "/partner-with-us"],
      ["Advisor partnerships", "/advisor-partner-program"],
      ["Workflows", "/features/workflows"],
      ["AI agents", "/products/ai-agents"],
      ["Knowledge", "/platform"],
      ["Approvals", "/platform/security-and-compliance"],
    ],
  },
  {
    label: "Product",
    links: [
      ["Platform", "/platform"],
      ["Agent OS", "/products/agent-os"],
      ["Agent Studio", "/products/agent-studio"],
      ["AI Agents", "/products/ai-agents"],
      ["Agentic Workflows", "/features/workflows"],
      ["Databases", "/products/databases"],
      ["AI Website Builder", "/features/website"],
      ["Integrations", "/integrations"],
      ["Agent Skills", "/skills"],
    ],
  },
  {
    label: "Resources",
    links: [
      ["Resource library", "/resources"],
      ["Workflow learning", "/webinars"],
      ["Product updates", "/product-updates"],
      ["Blog", "/blog"],
      ["Help center", "/help-center"],
      ["Legal agreements", "/legal-agreements"],
      ["FAQ", "/faq"],
      ["Contact", "/contact"],
    ],
  },
];

const getStarted = {
  label: "Get started",
  links: [
    ["Book a demo", siteConfig.demoUrl],
    ["Pricing", "/pricing"],
    ["Log in", siteConfig.loginUrl],
  ],
};

/** Industries as one vertical among many — not a property-only site niche. */
const industries = {
  label: "Industries",
  links: [
    ["Financial services", "/industries/financial-services-banking"],
    ["Healthcare", "/industries/healthcare"],
    ["Property & real estate", "/industries/property-real-estate"],
    ["Technology & software", "/industries/technology-software"],
    ["Customer service", "/industries/customer-service"],
    ["Browse all industries", "/solutions"],
  ],
};

const columns = [
  [footerMenus[0]],
  [footerMenus[1], industries],
  [footerMenus[2], getStarted],
];

export function SiteFooter({ home: _home = true }: { home?: boolean }) {
  // `home` kept for callers; chrome is the same sitewide so we don't niche the homepage.
  void _home;

  return (
    <div className={styles.shell}>
      <footer className={styles.footer}>
        <div className={styles.newsletterPanel}>
          <FooterNewsletter />
        </div>
        <div className={styles.body}>
          <div className={styles.upper}>
            <div className={styles.brand}>
              <a href="/" aria-label="Innflow home">
                <Image
                  src="/brand/innflow-wordmark.svg"
                  width={132}
                  height={38}
                  alt="Innflow"
                />
              </a>
              <p>
                The AI agent platform for
                <br />
                agentic process automation.
              </p>
            </div>
            <nav className={styles.columns} aria-label="Footer navigation">
              {columns.map((column) => (
                <div key={column[0].label}>
                  {column.map((group) => (
                    <div className={styles.group} key={group.label}>
                      <h3>{group.label}</h3>
                      <ul>
                        {group.links.map(([label, href]) => (
                          <li key={label}>
                            <a href={href}>{label}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </nav>
          </div>
          <div className={styles.contact}>
            <div>
              <a href={`mailto:${siteConfig.supportEmail}`}>
                {siteConfig.supportEmail}
              </a>
              <CustomerSupportHours />
            </div>
            <a
              className={styles.googleCta}
              data-site-cta="primary"
              href={siteConfig.signupUrl}
            >
              <GoogleCtaContent />
            </a>
          </div>
          <div className={styles.legal}>
            <nav aria-label="Legal">
              <FooterLegalLinks />
            </nav>
            <span>
              © {new Date().getFullYear()} Innflow. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
