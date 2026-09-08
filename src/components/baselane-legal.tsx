import { legalPolicies } from "@/content/legal";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-legal.module.css";
import { TermlyPolicyEmbed } from "./termly-policy-embed";

const privacyRoute = "/BL/BL-privacy-policy";
const termsRoute = "/BL/BL-terms-of-use";
const sections = [
  {
    title: "General agreements",
    links: [
      ["Terms of Service", termsRoute],
      ["Privacy Policy", privacyRoute],
      ["Cookie Policy", legalPolicies.cookies.path],
    ],
  },
  {
    title: "Using Innflow",
    links: [
      ["End User License Agreement", legalPolicies.eula.path],
      ["Acceptable Use Policy", legalPolicies.acceptableUse.path],
    ],
  },
  {
    title: "Privacy requests",
    links: [
      ["Submit a data subject request", "/legal/dsar"],
      ["Contact our team", "/contact"],
    ],
  },
];
export function BaselaneLegalDirectory() {
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <header className={styles.heading}>
          <h1>Legal agreements</h1>
        </header>
        <div className={styles.directory}>
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <ul>
                {section.links.map(([title, href]) => (
                  <li key={href}>
                    <a href={href}>
                      {title}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </BaselaneHomepage>
  );
}
export function BaselaneLegalPolicy({ type }: { type: "privacy" | "terms" }) {
  const policy = legalPolicies[type];
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <header className={styles.heading}>
          <h1>{policy.title}</h1>
        </header>
        <article className={styles.document}>
          <nav aria-label="Legal navigation" className={styles.documentNav}>
            <a href="/BL/BL-legal-agreements">← All agreements</a>
            <a href={type === "privacy" ? termsRoute : privacyRoute}>
              {type === "privacy" ? "Terms of Service" : "Privacy Policy"} →
            </a>
          </nav>
          <div className={styles.policyIntro}>
            <p>{policy.description}</p>
            <a href={policy.source} target="_blank" rel="noreferrer">
              Open the complete policy in a new tab ↗
            </a>
          </div>
          <section
            className={styles.embed}
            aria-label={`${policy.title} document`}
          >
            <TermlyPolicyEmbed policyId={policy.policyId} />
          </section>
          <div className={styles.documentEnd}>
            <a href="/BL/BL-legal-agreements">View all legal agreements →</a>
            <a href="/legal/dsar">Privacy requests →</a>
          </div>
        </article>
      </div>
    </BaselaneHomepage>
  );
}
