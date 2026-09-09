"use client";

import Image from "next/image";
import { useState } from "react";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { siteConfig } from "@/config/site";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-partners.module.css";

const audience = [
  [
    "agents",
    "Agents and brokers",
    "Help your network connect the work that happens before and after a property changes hands.",
    "A person using a phone beside a front door",
  ],
  [
    "creators",
    "Educators and creators",
    "Show your audience practical ways to organize information, coordinate tasks, and build repeatable workflows.",
    "A woman working on a laptop at home",
  ],
  [
    "operators",
    "Investors and property teams",
    "Share the tools and working practices that help your team move from a request to a completed task.",
    "People greeting each other at a front door",
  ],
];
const topics = [
  [
    "01",
    "Introductions",
    "Connect us with teams whose work could benefit from innflow.",
  ],
  [
    "02",
    "Collaboration",
    "Discuss the scope and terms of a potential partnership together.",
  ],
  [
    "03",
    "Education",
    "Explore workflow examples that fit the questions your audience asks.",
  ],
  [
    "04",
    "Content",
    "Bring a practical use case and shape an explanation around it.",
  ],
  [
    "05",
    "Support",
    "Use our contact channel to ask about your proposed collaboration.",
  ],
  [
    "06",
    "Product",
    "Explore the current product and identify where it fits your community.",
  ],
];
const referralSteps = [
  [
    "Copy the page link",
    "Use the share control to copy innflow's public homepage URL. You can also select and copy the address shown below it.",
  ],
  [
    "Add a personal introduction",
    "Tell your colleague which part of your workflow made you think of them. Share the link through your preferred channel.",
  ],
  [
    "Explore together",
    "They can browse the product, review pricing, and open a demo page before deciding whether to create an account.",
  ],
  [
    "Start a conversation",
    "Have a larger team or a collaboration in mind? Visit our partner page to contact innflow. This public share link does not track referrals or offer a cash reward.",
  ],
];
const partnerSteps = [
  [
    "Introduce your work",
    "Tell us about your organization, the audience you serve, and the idea you would like to explore.",
  ],
  [
    "Find a useful fit",
    "Describe a workflow or recurring challenge. Include the outcome you want and the channels where you would work together.",
  ],
  [
    "Agree on the details",
    "Any partnership, compensation, or deliverables would need to be agreed separately. Sending an inquiry does not enroll you in an affiliate program.",
  ],
];

function Photo({
  name,
  alt,
  hero = false,
}: {
  name: string;
  alt: string;
  hero?: boolean;
}) {
  return (
    <Image
      className={styles.photo}
      src={`/brand/baselane-inspired/partners/${name}.webp`}
      alt={alt}
      width={1164}
      height={840}
      priority={hero}
    />
  );
}
function Workflow() {
  return (
    <div
      className={styles.workflow}
      role="img"
      aria-label="Illustrative innflow workflow: a new request is reviewed, assigned, approved, and shared with the team."
    >
      <div className={styles.workflowTop}>
        <span>innflow</span>
        <span>WORKSPACE EXAMPLE</span>
      </div>
      <div className={styles.workflowBody}>
        <span className={styles.eyebrow}>PROPERTY OPERATIONS</span>
        <h3>
          A clear next step.
          <br />
          For everyone.
        </h3>
        <div className={styles.nodes}>
          {[
            "New request received",
            "Review context and assign",
            "Approve the next action",
            "Keep the team informed",
          ].map((text, index) => (
            <div key={text}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {text}
              <span aria-hidden="true">↗</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export function BaselanePartners({ referral = false }: { referral?: boolean }) {
  const [shareStatus, setShareStatus] = useState("");
  const shareUrl = `${siteConfig.marketingOrigin.replace(/\/$/, "")}/`;
  const inquiry = `mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent("Partner with innflow")}`;
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus("Link copied. Ready to share.");
    } catch {
      setShareStatus("Copy the address below to share innflow.");
    }
  }
  const action = referral ? (
    <button className={styles.button} type="button" onClick={copyLink}>
      Copy link to share
    </button>
  ) : (
    <a className={styles.button} href="#partner-inquiry">
      Explore a partnership
    </a>
  );
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1>
              {referral
                ? "Good work is worth sharing."
                : "Partner and build something useful."}
            </h1>
            <p>
              {referral
                ? "Know someone juggling property tasks, information, and follow-ups? Introduce them to a more connected way to work with innflow."
                : "Bring your experience, your community, and an idea. Let's explore how innflow can help the people you work with."}
            </p>
            {action}
            {referral ? (
              <div className={styles.share}>
                <label htmlFor="share-address">Public page link</label>
                <input
                  id="share-address"
                  readOnly
                  value={shareUrl}
                  onFocus={(event) => event.currentTarget.select()}
                />
                <span role="status">
                  {shareStatus || "Share directly with someone you know."}
                </span>
              </div>
            ) : (
              <p className={styles.note}>
                For educators, operators, and people who connect them.
              </p>
            )}
          </div>
          <Photo
            name={referral ? "referral-hero" : "partner-hero"}
            alt={
              referral
                ? "A man looking through a window"
                : "Two people greeting each other at home"
            }
            hero
          />
        </section>
        {!referral && (
          <>
            <section className={styles.section}>
              <h2>Who can we work with?</h2>
              <div className={styles.cards}>
                {audience.map(([name, title, text, alt]) => (
                  <article key={name}>
                    <Photo name={name} alt={alt} />
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className={styles.section}>
              <h2>What we can explore</h2>
              <div className={styles.topics}>
                {topics.map(([number, title, text]) => (
                  <article key={title}>
                    <h3>
                      <span>{number}</span>
                      {title}
                    </h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className={styles.section}>
              <h2>Start with the work people do.</h2>
              <p className={styles.centerCopy}>
                A useful introduction starts with a real problem. Explore how
                requests, context, and approvals can come together in one
                workflow.
              </p>
              <a className={styles.textLink} href={siteConfig.demoUrl}>
                Explore innflow →
              </a>
              <div className={styles.demo}>
                <Workflow />
                <a className={styles.demoLink} href={siteConfig.demoUrl}>
                  Open the demo page <span aria-hidden="true">↗</span>
                </a>
              </div>
            </section>
          </>
        )}
        <section
          className={`${styles.steps} ${referral ? styles.referralSteps : ""}`}
          id={referral ? "how-it-works" : "partner-inquiry"}
        >
          <div className={styles.stepsCopy}>
            <h2>{referral ? "How it works" : "Let's start a conversation."}</h2>
            <p>
              {referral
                ? "A simple introduction can be the start of a better workflow. Copy the link, add a little context, and let your colleague explore."
                : "Tell us what you do and what you have in mind. A specific idea makes it easier to understand where we could work together."}
            </p>
            <div className={styles.accordion}>
              {(referral ? referralSteps : partnerSteps).map(
                ([title, text], index) => (
                  <details key={title} open={index === 0}>
                    <summary>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {title}
                      <span className={styles.plus} aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p>{text}</p>
                  </details>
                ),
              )}
            </div>
            {!referral && (
              <a className={styles.button} href={inquiry}>
                Email a partnership inquiry
              </a>
            )}
          </div>
          {referral ? (
            <Workflow />
          ) : (
            <Photo name="join" alt="A man smiling while looking at his phone" />
          )}
        </section>
        <section
          className={`${styles.closing} ${referral ? "" : styles.photoClosing}`}
        >
          {!referral && (
            <picture>
              <source
                media="(max-width:700px)"
                srcSet="/brand/baselane-inspired/partners/closing-mobile.webp"
              />
              <Image
                src="/brand/baselane-inspired/partners/closing-desktop.webp"
                alt=""
                fill
                sizes="100vw"
              />
            </picture>
          )}
          <div>
            <h2>
              {referral
                ? "Know someone who could use innflow?"
                : "Bring your next idea to innflow."}
            </h2>
            <p>
              {referral
                ? "Share a starting point for clearer, more connected work."
                : "Introduce yourself and the collaboration you have in mind."}
            </p>
            {referral ? (
              <a className={styles.button} href={siteConfig.googleAuthUrl}>
                <GoogleCtaContent />
              </a>
            ) : (
              <a className={styles.button} href={inquiry}>
                Contact innflow
              </a>
            )}
            {referral && (
              <a className={styles.textLink} href="/partner-with-us">
                Explore partnerships →
              </a>
            )}
          </div>
        </section>
      </div>
    </BaselaneHomepage>
  );
}
