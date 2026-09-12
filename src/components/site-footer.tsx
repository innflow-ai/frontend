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
      ["About innflow", "/about"],
      ["Careers", "/careers"],
      ["Industry coverage", "/in-the-news"],
      ["Who we help", "/our-customers"],
      ["Security", "/security"],
      ["Share innflow", "/landlord-referral"],
      ["Partnerships", "/partner-with-us"],
      ["Advisor partnerships", "/advisor-partner-program"],
      ["Workflows", "/products/agentic-workflows"],
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
export function SiteFooter() {
  return (
    <div className={styles.page}>
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <a href="/" aria-label="innflow home" className={styles.footerLogo}>
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
            <a href="/long-term-rentals">Long-term rentals</a>
            <a href="/mid-term-rentals">Mid-term rentals</a>
            <a href="/short-term-rentals">Short-term rentals</a>
            <a href="/renters">Resident experiences</a>
            <h3 className={styles.footerSubheading}>Get started</h3>
            <a href={siteConfig.demoUrl}>Book a demo</a>
            <a href="/pricing">Pricing</a>
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
