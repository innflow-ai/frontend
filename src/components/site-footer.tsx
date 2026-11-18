import Image from "next/image";
import { siteConfig } from "@/config/site";
import { CustomerSupportHours } from "./customer-support-hours";
import { FooterLegalLinks } from "./footer-legal-links";
import { FooterNewsletter } from "./footer-newsletter";
import { GoogleCtaContent } from "./google-cta-content";
import styles from "./site-footer.module.css";

const footerMenus = [
  {
    label: "Why innflow",
    links: [
      ["About innflow", "/about"],
      ["Careers", "/careers"],
      ["Industry coverage", "/in-the-news"],
      ["Who we help", "/our-customers"],
      ["Security", "/security"],
      ["Share innflow", "/landlord-referral"],
      ["Partnerships", "/partner-with-us"],
      ["Advisor partnerships", "/advisor-partner-program"],
      ["Workflows", "/features/workflows"],
      ["AI assistant", "/products/ai-agents"],
      ["Knowledge", "/platform"],
      ["Approvals", "/platform/security-and-compliance"],
    ],
  },
  {
    label: "Solutions",
    links: [
      ["Overview", "/"],
      ["Multi-property investors", "/multi-property-investors"],
      ["Landlord operations", "/landlord-banking"],
      ["Rental workflows", "/rent-collection"],
      ["Rental workflows overview", "/rent-collection-2"],
      ["Connected property records", "/landlord-accounting"],
      ["Property review preparation", "/landlord-insurance"],
      ["Document preparation", "/tax-preparation"],
      ["Deposit workflows", "/security-deposit-account"],
      ["Screening workflows", "/tenant-screening-service"],
      ["Reserve planning", "/landlord-banking-apy"],
      ["Financing preparation", "/rental-property-loans"],
      ["Property management", "/property-management"],
      ["Connected operations", "/platform"],
      ["Integrations", "/integrations"],
    ],
  },
  {
    label: "Resources",
    links: [
      ["Resource library", "/resources"],
      ["Document checklists", "/free-rental-forms-and-templates-for-landlords"],
      ["Rent comparison", "/how-much-should-i-charge-for-rent"],
      ["Lease workflows", "/lease-agreement"],
      ["Workflow learning", "/webinars"],
      ["Investor resources", "/real-estate-investing"],
      ["Product updates", "/product-updates"],
      ["Blog", "/blog"],
      ["Help center", "/help-center"],
      ["Legal agreements", "/legal-agreements"],
      ["FAQ", "/faq"],
      ["Contact", "/contact"],
    ],
  },
];
const productFooterMenus = [
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
      ["AI assistant", "/products/ai-agents"],
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
    ["Log in", siteConfig.signupUrl],
  ],
};

const propertyTeams = {
  label: "Property teams",
  links: [
    ["Long-term rentals", "/long-term-rentals"],
    ["Mid-term rentals", "/mid-term-rentals"],
    ["Short-term rentals", "/short-term-rentals"],
    ["Resident experiences", "/renters"],
  ],
};

const homeColumns = [
  [footerMenus[0]],
  [footerMenus[1], propertyTeams],
  [footerMenus[2], getStarted],
];

const productColumns = [
  [productFooterMenus[0]],
  [productFooterMenus[1]],
  [productFooterMenus[2], getStarted],
];

export function SiteFooter({ home = true }: { home?: boolean }) {
  const columns = home ? homeColumns : productColumns;

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
                Your AI agent workspace.
                <br />
                Connected in one place.
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
