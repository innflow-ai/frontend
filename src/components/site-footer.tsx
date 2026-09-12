import Image from "next/image";
import { siteConfig } from "@/config/site";
import { CustomerSupportHours } from "./customer-support-hours";
import { FooterLegalLinks } from "./footer-legal-links";
import { GoogleCtaContent } from "./google-cta-content";
import styles from "./site-shell.module.css";

const footerMenus = [
  {
    label: "Why innflow",
    links: [
      ["About innflow", "/BL/BL-about"],
      ["Careers", "/BL/BL-careers"],
      ["Industry coverage", "/BL/BL-in-the-news"],
      ["Who we help", "/BL/BL-our-customers"],
      ["Security", "/BL/BL-security"],
      ["Share innflow", "/BL/BL-landlord-referral"],
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
      ["Screening workflows", "/BL/BL-tenant-screening-service"],
      ["Reserve planning", "/BL/BL-landlord-banking-apy"],
      ["Financing preparation", "/BL/BL-rental-property-loans"],
      ["Property management", "/property-management"],
      ["Connected operations", "/platform"],
      ["Integrations", "/integrations"],
    ],
  },
  {
    label: "Resources",
    links: [
      ["Resource library", "/BL/BL-resources"],
      [
        "Document checklists",
        "/BL/BL-free-rental-forms-and-templates-for-landlords",
      ],
      ["Rent comparison", "/BL/BL-how-much-should-i-charge-for-rent"],
      ["Lease workflows", "/BL/BL-lease-agreement"],
      ["Workflow learning", "/BL/BL-webinars"],
      ["Investor resources", "/BL/BL-real-estate-investing"],
      ["Product updates", "/BL/BL-product-updates"],
      ["Blog", "/blog"],
      ["Help center", "/BL/BL-help-center"],
      ["Legal agreements", "/BL/BL-legal-agreements"],
      ["FAQ", "/faq"],
      ["Contact", "/contact"],
    ],
  },
];
export function SiteFooter() {
  return (
    <div className={styles.page}>
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <a
              href="/BL/BL-home"
              aria-label="innflow home"
              className={styles.footerLogo}
            >
              <Image
                src="/brand/innflow-wordmark.svg"
                width={105}
                height={30}
                alt="innflow"
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
            <CustomerSupportHours />
          </div>
          {footerMenus.map((group) => (
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
            <a href={siteConfig.demoUrl}>Book a demo</a>
            <a href="/BL/BL-pricing">Pricing</a>
            <a href={`${siteConfig.appOrigin}/login`}>Log in</a>
            <a href={siteConfig.googleAuthUrl}>
              <GoogleCtaContent />
            </a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>
            © {new Date().getFullYear()} Innflow. All rights reserved.
          </span>
          <nav className={styles.legalLinks} aria-label="Legal">
            <FooterLegalLinks />
          </nav>
        </div>
      </footer>
    </div>
  );
}
