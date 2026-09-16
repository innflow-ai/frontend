import Image from "next/image";
import { FooterLegalLinks } from "@/components/footer-legal-links";
import { footerNavigation } from "@/config/footer-navigation";
import { siteConfig } from "@/config/site";
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
        { label: "Contact sales", href: siteConfig.demoUrl },
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

export function TemplateFooter() {
  return (
    <div className={styles.shell}>
      <footer className={styles.footer} data-source-node="350:11986">
        <div className={styles.upper}>
          <div className={styles.brand}>
            <h2>
              Build support
              <br />
              your own way.
            </h2>
            <a href="/" aria-label="Innflow home">
              <Image
                src="/brand/innflow-wordmark.svg"
                alt="Innflow"
                width={132}
                height={38}
              />
            </a>
          </div>
          <nav className={styles.columns} aria-label="Footer navigation">
            {groups.map((column) => (
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
          </div>
          <a href={siteConfig.demoUrl}>
            Book an Innflow demo <span aria-hidden="true">↗</span>
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
