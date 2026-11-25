"use client";

import { useState } from "react";
import { departments, features, resources } from "@/config/menu-links";
import { modelProviders, modelSlug } from "@/content/model-directory";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { CustomerSupportHours } from "./customer-support-hours";
import { FooterWorkspace } from "./footer-workspace";
import { FooterLegalLinks } from "./footer-legal-links";
import googleButtonStyles from "./google-cta.module.css";
import { GoogleCtaContent } from "./google-cta-content";
import styles from "./site-footer.module.css";

const columns = [
  { label: "Product", links: features },
  {
    label: "Models",
    links: modelProviders.map(({ models: [name] }) => ({ name, href: `/models/${modelSlug(name)}` })),
  },
  { label: "Solutions", links: [...departments.flat(), { name: "View all solutions", href: "/solutions" }] },
  { label: "Resources", links: resources.flatMap(({ items }) => items) },
];

function GroupHeading({ groupLabel, open, onToggle }: { groupLabel: string; open: boolean; onToggle: () => void }) {
  return (
<div className={styles.groupHeading}>
                    <h3 id={`footer-heading-${groupLabel}`}>{groupLabel}</h3>
                    <button
                      className={styles.groupToggle}
                      type="button"
                      aria-labelledby={`footer-heading-${groupLabel}`}
                      aria-controls={`footer-links-${groupLabel}`}
                      aria-expanded={open}
                      onClick={() => onToggle()}
                    />
                  </div>
  );
}

export function SiteFooter({ home: _home = true }: { home?: boolean }) {
  // `home` kept for callers; chrome is the same sitewide so we don't niche the homepage.
  void _home;
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  function toggleGroup(label: string) {
    setOpenGroup(current => current === label ? null : label);
  }

  return (
    <div className={styles.shell}>
      <footer className={styles.footer}>
        <FooterWorkspace />
        <div className={styles.body}>
          <div className={styles.upper}>
            <div className={styles.brand}>
              <a href="/" aria-label="Innflow home">
                <Image
                  src="/brand/innflow-nav-wordmark.svg"
                  width={299}
                  height={80}
                  alt="Innflow"
                />
              </a>
              <p>
                A shared workspace for your team and AI agents.
              </p>
            </div>
            <nav className={styles.columns} aria-label="Footer navigation">
              {columns.map(({ label, links }) => (
                <div className={styles.group} data-open={openGroup === label} key={label}>
                    <GroupHeading groupLabel={label} open={openGroup === label} onToggle={() => toggleGroup(label)} />
                  <ul id={`footer-links-${label}`}>
                    {links.map(({ name, href }) => (
                      <li key={href}><a href={href}>{name === "Botmode" ? "Bot mode" : name}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          <div className={styles.legal}>
            <div className={styles.policy} data-open={openGroup === "Policy"}>
              <GroupHeading groupLabel="Policy" open={openGroup === "Policy"} onToggle={() => toggleGroup("Policy")} />
              <nav id="footer-links-Policy" aria-label="Legal"><FooterLegalLinks /></nav>
            </div>
            <span className={styles.copyright}>
              © {new Date().getFullYear()} Innflow, Flow State Inc. All rights reserved.{" "}
              <span className={styles.privacyNote}>
                See Policy above to manage consent or submit a privacy request.
              </span>
            </span>
          </div>
          <div className={styles.contact}>
            <div>
              <a href={`mailto:${siteConfig.supportEmail}`}>
                {siteConfig.supportEmail}
              </a>
              <CustomerSupportHours />
            </div>
            <div className={styles.accountLinks}>
              <a href={siteConfig.demoUrl}>Book a demo</a>
              <a href="/pricing">Pricing</a>
              <a href={siteConfig.loginUrl}>Log in</a>
            </div>
            <a
              className={`${googleButtonStyles.button} ${googleButtonStyles.raisedSignIn}`}
              data-cta-tone="white"
              data-site-cta="primary"
              href={siteConfig.signupUrl}
            >
              <GoogleCtaContent />
            </a>
          </div>

        </div>
      </footer>
    </div>
  );
}
