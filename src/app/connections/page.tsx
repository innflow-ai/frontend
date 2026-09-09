import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { BaselaneHomepage } from "@/components/baselane-homepage";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Connections | innflow",
  alternates: { canonical: "/connections" },
};

const groups = [
  {
    heading: "Get started",
    links: [
      {
        href: "/",
        label: "BL Home",
      },
      {
        href: "/pricing",
        label: "Plans and pricing",
      },
      {
        href: "/demo",
        label: "Book a demo",
      },
      {
        href: "/our-customers",
        label: "Who we help",
      },
    ],
  },
  {
    heading: "Property operations",
    links: [
      {
        href: "/landlord-banking",
        label: "Property operations",
      },
      {
        href: "/landlord-accounting",
        label: "Connected property records",
      },
      {
        href: "/rent-collection",
        label: "Recurring rental workflows",
      },
      {
        href: "/rent-collection-2",
        label: "Rental workflows overview",
      },
      {
        href: "/security-deposit-account",
        label: "Deposit workflows",
      },
      {
        href: "/tenant-screening-service",
        label: "Screening workflows",
      },
      {
        href: "/lease-agreement",
        label: "Lease document workflows",
      },
      {
        href: "/landlord-insurance",
        label: "Property review preparation",
      },
      {
        href: "/tax-preparation",
        label: "Property document preparation",
      },
      {
        href: "/landlord-banking-apy",
        label: "Property reserve planning",
      },
      {
        href: "/rental-property-loans",
        label: "Financing preparation",
      },
    ],
  },
  {
    heading: "Property teams",
    links: [
      {
        href: "/multi-property-investors",
        label: "Multi-property operations",
      },
      {
        href: "/long-term-rentals",
        label: "Long-term rental operations",
      },
      {
        href: "/mid-term-rentals",
        label: "Mid-term rental operations",
      },
      {
        href: "/short-term-rentals",
        label: "Short-term rental operations",
      },
      {
        href: "/renters",
        label: "Connected resident experiences",
      },
    ],
  },
  {
    heading: "Resources",
    links: [
      {
        href: "/resources",
        label: "Resource library",
      },
      {
        href: "/free-rental-forms-and-templates-for-landlords",
        label: "Document preparation worksheets",
      },
      {
        href: "/how-much-should-i-charge-for-rent",
        label: "Rent comparison calculator",
      },
      {
        href: "/real-estate-investing",
        label: "Real estate investing resources",
      },
      {
        href: "/webinars",
        label: "Workflow learning",
      },
      {
        href: "/product-updates",
        label: "Product highlights",
      },
      {
        href: "/help-center",
        label: "innflow help center",
      },
    ],
  },
  {
    heading: "Company and partnerships",
    links: [
      {
        href: "/about",
        label: "About innflow",
      },
      {
        href: "/careers",
        label: "Careers at innflow",
      },
      {
        href: "/in-the-news",
        label: "Industry coverage",
      },
      {
        href: "/partner-with-us",
        label: "Partner with innflow",
      },
      {
        href: "/advisor-partner-program",
        label: "Advisor partnerships",
      },
      {
        href: "/landlord-referral",
        label: "Share innflow",
      },
    ],
  },
  {
    heading: "Security and legal",
    links: [
      {
        href: "/security",
        label: "Security and governance",
      },
      {
        href: "/legal-agreements",
        label: "Legal agreements",
      },
      {
        href: "/legal/privacy-policy",
        label: "Privacy Policy",
      },
      {
        href: "/legal/terms-of-service",
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
