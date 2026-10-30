import Image from "next/image";
import { CustomerSupportHours } from "@/components/customer-support-hours";
import { FooterLegalLinks } from "@/components/footer-legal-links";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { LaunchDirectoryMarquee } from "@/components/launch-directory-marquee";
import { footerNavigation } from "@/config/footer-navigation";
import { siteConfig } from "@/config/site";
import { hotelGroups, hotelHref, hotelModules } from "@/content/hotel-pms";
import styles from "./template-footer.module.css";

const groups = [
  [
    footerNavigation[0],
    {
      heading: "Features",
      links: [
        { label: "Security", href: "/security" },
        { label: "Custom workflows", href: "/products/agentic-workflows" },
        { label: "AI agents", href: "/products/ai-agents" },
        { label: "Integrations", href: "/integrations" },
      ],
    },
  ],
  [footerNavigation[1], footerNavigation[2]],
  [
    footerNavigation[4],
    {
      heading: "Support",
      links: [
        { label: "Help center", href: "/help-center" },
        { label: "Contact support", href: "/contact" },
        { label: "Contact sales", href: siteConfig.contactUrl },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Become a partner", href: "/partner-with-us" },
        { label: "Blog", href: "/blog" },
      ],
    },
  ],
];

export function TemplateFooter({ hotel = false }: { hotel?: boolean }) {
  const displayedGroups = hotel
    ? hotelGroups.map((heading, index) => [
        {
          heading,
          links: hotelModules
            .filter((module) => module.group === heading)
            .map((module) => ({
              label: module.name,
              href: hotelHref(module.slug),
            })),
        },
        ...(index === 0
          ? [
              {
                heading: "Platform & agents",
                links: [
                  { label: "Platform", href: "/platform" },
                  {
                    label: "Agentic workflows",
                    href: "/products/agentic-workflows",
                  },
                  { label: "AI agents", href: "/products/ai-agents" },
                  { label: "Integrations", href: "/integrations" },
                ],
              },
            ]
          : []),
      ])
    : groups;
  return (
    <div className={styles.shell}>
      <LaunchDirectoryMarquee />
      <footer className={styles.footer} data-source-node="350:11986">
        <div className={styles.upper}>
          <div className={styles.brand}>
            <a href="/" aria-label="Innflow home">
              <Image
                src={
                  hotel
                    ? "/hotel-pms/innflow-black.svg"
                    : "/brand/innflow-wordmark.svg"
                }
                alt="Innflow"
                width={132}
                height={hotel ? 27 : 38}
                style={hotel ? { height: "auto" } : undefined}
              />
            </a>
            <p>
              {hotel
                ? "Bring the work behind the stay together."
                : "Bring your work together."}
            </p>
          </div>
          <nav className={styles.columns} aria-label="Footer navigation">
            {displayedGroups.map((column) => (
              <div key={column[0].heading}>
                {column.map((group) => (
                  <div className={styles.group} key={group.heading}>
                    <h3>{group.heading}</h3>
                    <ul>
                      {group.links.map((link) => (
                        <li key={`${link.label}-${link.href}`}>
                          <a href={link.href}>{link.label}</a>
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
            <p>Let’s build together</p>
            <a href={`mailto:${siteConfig.supportEmail}`}>
              {siteConfig.supportEmail}
            </a>
            <CustomerSupportHours />
          </div>
          <a
            className={styles.googleCta}
            href={hotel ? siteConfig.demoUrl : siteConfig.googleAuthUrl}
          >
            {hotel ? "Plan your hotel workflow" : <GoogleCtaContent />}
          </a>
        </div>
        <div className={styles.legal}>
          <span>English</span>
          <div>
            <FooterLegalLinks />
          </div>
          <span>© {new Date().getFullYear()} Innflow</span>
        </div>
      </footer>
    </div>
  );
}
