import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { BaselaneHomepage } from "@/components/baselane-homepage";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Connections | innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-connections" },
};

const groups = [
  {
    heading: "Get started",
    links: [
      {
        href: "/BL/BL-home",
        label: "BL Home",
      },
      {
        href: "/BL/BL-pricing",
        label: "Plans and pricing",
      },
      {
        href: "/BL/BL-demo",
        label: "Book a demo",
      },
      {
        href: "/BL/BL-our-customers",
        label: "Who we help",
      },
    ],
  },
  {
    heading: "Property operations",
    links: [
      {
        href: "/BL/BL-landlord-banking",
        label: "Property operations",
      },
      {
        href: "/BL/BL-landlord-accounting",
        label: "Connected property records",
      },
      {
        href: "/BL/BL-rent-collection",
        label: "Recurring rental workflows",
      },
      {
        href: "/BL/BL-rent-collection-2",
        label: "Rental workflows overview",
      },
      {
        href: "/BL/BL-security-deposit-account",
        label: "Deposit workflows",
      },
      {
        href: "/BL/BL-tenant-screening-service",
        label: "Screening workflows",
      },
      {
        href: "/BL/BL-lease-agreement",
        label: "Lease document workflows",
      },
      {
        href: "/BL/BL-landlord-insurance",
        label: "Property review preparation",
      },
      {
        href: "/BL/BL-tax-preparation",
        label: "Property document preparation",
      },
      {
        href: "/BL/BL-landlord-banking-apy",
        label: "Property reserve planning",
      },
      {
        href: "/BL/BL-rental-property-loans",
        label: "Financing preparation",
      },
    ],
  },
  {
    heading: "Property teams",
    links: [
      {
        href: "/BL/BL-multi-property-investors",
        label: "Multi-property operations",
      },
      {
        href: "/BL/BL-long-term-rentals",
        label: "Long-term rental operations",
      },
      {
        href: "/BL/BL-mid-term-rentals",
        label: "Mid-term rental operations",
      },
      {
        href: "/BL/BL-short-term-rentals",
        label: "Short-term rental operations",
      },
      {
        href: "/BL/BL-renters",
        label: "Connected resident experiences",
      },
    ],
  },
  {
    heading: "Resources",
    links: [
      {
        href: "/BL/BL-resources",
        label: "Resource library",
      },
      {
        href: "/BL/BL-free-rental-forms-and-templates-for-landlords",
        label: "Document preparation worksheets",
      },
      {
        href: "/BL/BL-how-much-should-i-charge-for-rent",
        label: "Rent comparison calculator",
      },
      {
        href: "/BL/BL-real-estate-investing",
        label: "Real estate investing resources",
      },
      {
        href: "/BL/BL-webinars",
        label: "Workflow learning",
      },
      {
        href: "/BL/BL-product-updates",
        label: "Product highlights",
      },
      {
        href: "/BL/BL-help-center",
        label: "innflow help center",
      },
    ],
  },
  {
    heading: "Company and partnerships",
    links: [
      {
        href: "/BL/BL-about",
        label: "About innflow",
      },
      {
        href: "/BL/BL-careers",
        label: "Careers at innflow",
      },
      {
        href: "/BL/BL-in-the-news",
        label: "Industry coverage",
      },
      {
        href: "/BL/BL-partner-with-us",
        label: "Partner with innflow",
      },
      {
        href: "/BL/BL-advisor-partner-program",
        label: "Advisor partnerships",
      },
      {
        href: "/BL/BL-landlord-referral",
        label: "Share innflow",
      },
    ],
  },
  {
    heading: "Security and legal",
    links: [
      {
        href: "/BL/BL-security",
        label: "Security and governance",
      },
      {
        href: "/BL/BL-legal-agreements",
        label: "Legal agreements",
      },
      {
        href: "/BL/BL-privacy-policy",
        label: "Privacy Policy",
      },
      {
        href: "/BL/BL-terms-of-use",
        label: "Terms of Service",
      },
    ],
  },
];

export default function ConnectionsPage() {
  return (
    <BaselaneHomepage>
      <div className={styles.directory}>
        <header className={styles.intro}>
          <h1>Connections</h1>
          <p>
            Every BL page, together in one place. Find the tools, resources, and
            information you need.
          </p>
        </header>
        <nav className={styles.groups} aria-label="BL page directory">
          {groups.map((group) => (
            <section key={group.heading} className={styles.group}>
              <h2>{group.heading}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      {link.label}
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </div>
    </BaselaneHomepage>
  );
}
