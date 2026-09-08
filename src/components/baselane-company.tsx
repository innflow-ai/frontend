import Image from "next/image";
import { siteConfig } from "@/config/site";
import styles from "./baselane-company.module.css";
import { BaselaneHomepage } from "./baselane-homepage";

const values = [
  [
    "Start with real work",
    "Build around the requests, records, and handoffs property teams manage every day. Useful automation starts with understanding the work.",
  ],
  [
    "Keep the context close",
    "Bring the relevant property details and procedures beside the task, so the next person can make an informed decision.",
  ],
  [
    "Make the next step clear",
    "Turn recurring work into a visible sequence. Show what happened, what is waiting, and who needs to act.",
  ],
  [
    "Keep people in control",
    "Use explicit permissions and review points for consequential actions. Automation should make judgment easier to exercise.",
  ],
];
function Workspace() {
  return (
    <div className={styles.workspace}>
      <div className={styles.workspaceBar}>
        <strong>innflow</strong>
        <span>Example workspace</span>
      </div>
      <div className={styles.workspaceBody}>
        <span className={styles.label}>PROPERTY OPERATIONS</span>
        <h3>
          One request.
          <br />A clear path forward.
        </h3>
        <div className={styles.request}>
          <span>01</span>
          <div>
            <strong>Maintenance request</strong>
            <p>Property and resident context attached</p>
          </div>
          <b>Received</b>
        </div>
        <div className={styles.connector}>↓</div>
        <div className={styles.request}>
          <span>02</span>
          <div>
            <strong>Review the next action</strong>
            <p>Scope, owner, and approval in one place</p>
          </div>
          <b>Review</b>
        </div>
        <div className={styles.connector}>↓</div>
        <div className={styles.request}>
          <span>03</span>
          <div>
            <strong>Keep the team informed</strong>
            <p>A visible history of the handoff</p>
          </div>
          <b>Next</b>
        </div>
      </div>
    </div>
  );
}
export function BaselaneCompany({ careers = false }: { careers?: boolean }) {
  const variant = careers ? "careers" : "about";
  const careerUrl = `mailto:${siteConfig.supportEmail}?subject=Careers%20at%20Innflow`;
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <section
          className={`${styles.hero} ${careers ? styles.careerHero : ""}`}
        >
          <picture>
            <source
              media="(max-width:700px)"
              srcSet={`/brand/baselane-inspired/company/${variant}-mobile.webp`}
            />
            <Image
              src={`/brand/baselane-inspired/company/${variant}-desktop.webp`}
              alt=""
              fill
              preload
              sizes="100vw"
            />
          </picture>
          <div>
            <h1>
              {careers
                ? "Build what comes next for property operations."
                : "Property operations, connected by Innflow."}
            </h1>
            <p>
              {careers
                ? "Bring your curiosity to the work behind every property."
                : "Connect everyday requests, property context, and team handoffs. Innflow brings recurring work into a clearer flow, with people in control of the next step."}
            </p>
            <div className={styles.actions}>
              <a
                className={styles.button}
                href={
                  careers ? "#career-inquiries" : "https://app.innflow.ai/login"
                }
              >
                {careers ? "Explore working together" : "Continue with Google"}{" "}
                ↗
              </a>
              {!careers && (
                <a className={styles.outline} href="/BL/BL-demo">
                  See demo →
                </a>
              )}
            </div>
          </div>
        </section>
        {!careers && (
          <section
            className={styles.facts}
            aria-label="The foundations of Innflow"
          >
            {[
              ["Context", "Records close to the work"],
              ["Workflows", "Clear steps and handoffs"],
              ["Approvals", "Human review points"],
              ["History", "Visible execution"],
            ].map(([title, text]) => (
              <div key={title}>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            ))}
          </section>
        )}
        <section className={styles.split}>
          <div className={styles.statement}>
            <span className={styles.label}>
              {careers ? "THE PROBLEM WORTH SOLVING" : "WHY WE BUILD"}
            </span>
            <h2>
              {careers
                ? "Behind every property is a team keeping things moving."
                : "The work between your tools deserves a clearer home."}
            </h2>
            <p>
              {careers
                ? "The next request rarely arrives with every detail in place. We’re interested in the practical work of connecting context, decisions, and follow-through."
                : "A request starts in one place. Its context lives in another. Innflow brings those pieces together so your team can focus on the decision and the next action."}
            </p>
            <a href="/BL/BL-demo">Explore the product →</a>
          </div>
          <Workspace />
        </section>
        {careers ? (
          <section className={styles.careerIntro}>
            <h2>
              Build around the people
              <br />
              doing the work.
            </h2>
            <p>Explore the product and the problems we’re working on.</p>
            <div className={styles.panorama}>
              <Image
                src="/brand/baselane-inspired/company/about-desktop.webp"
                alt="White roofs against a blue sky"
                fill
                sizes="100vw"
              />
            </div>
            <div className={styles.questions}>
              {[
                [
                  "What is Innflow?",
                  "A platform for connecting recurring work, property context, and human review.",
                ],
                [
                  "What kind of problems?",
                  "Requests that cross tools and teams, records that need context, and handoffs that need a clear owner.",
                ],
                [
                  "How can I get involved?",
                  "Send a short introduction about your experience and the kind of work you want to do. Ask the team about current opportunities.",
                ],
              ].map(([title, text]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
        <section className={styles.split}>
          <div className={styles.property}>
            <Image
              src="/brand/baselane-inspired/company/property.webp"
              alt="Yellow property beneath a blue sky"
              fill
              sizes="50vw"
            />
            <div className={styles.context}>
              <span className={styles.label}>EXAMPLE PROPERTY CONTEXT</span>
              <h3>Everything for the next step.</h3>
              <p>
                Property details <b>✓</b>
              </p>
              <p>
                Operating procedure <b>✓</b>
              </p>
              <p>
                Review owner <b>✓</b>
              </p>
            </div>
          </div>
          <div className={styles.values}>
            <h2>
              {careers
                ? "Principles worth building around."
                : "Designed around everyday operations."}
            </h2>
            <p>
              {careers
                ? "Practical product principles that connect the work to the people it serves."
                : "Bring context, clarity, and human judgment into the same workflow."}
            </p>
            {values.map(([title, text], index) => (
              <details key={title} open={index === 0}>
                <summary>{title}</summary>
                <p>{text}</p>
              </details>
            ))}
            {careers && (
              <details>
                <summary>Stay curious about the domain</summary>
                <p>
                  Understand the details of a real request before designing the
                  workflow around it. Ask questions, test assumptions, and
                  follow the handoff through.
                </p>
              </details>
            )}
          </div>
        </section>
        {!careers && (
          <section className={styles.pillars}>
            <h2>Explore what connects the work.</h2>
            <div>
              {[
                [
                  "01",
                  "Workflows",
                  "Give recurring requests a repeatable path.",
                  "/products/agentic-workflows",
                ],
                [
                  "02",
                  "Knowledge",
                  "Keep useful context available to your team.",
                  "/platform",
                ],
                [
                  "03",
                  "Approvals",
                  "Bring human review into consequential steps.",
                  "/platform/security-and-compliance",
                ],
              ].map(([number, title, text, href]) => (
                <a href={href} key={title}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <b>Explore →</b>
                </a>
              ))}
            </div>
            <a className={styles.button} href="/BL/BL-careers">
              Explore working with us ↗
            </a>
          </section>
        )}
        <section className={styles.linkBand}>
          <h2>Get to know Innflow.</h2>
          <div>
            <a href="/BL/BL-about">Our approach</a>
            <a href="/BL/BL-resources">Resources</a>
            <a href="/BL/BL-help-center">Help center</a>
            <a href="/BL/BL-legal-agreements">Policies</a>
          </div>
        </section>
        <section
          className={styles.closing}
          id={careers ? "career-inquiries" : undefined}
        >
          <Image
            src="/brand/baselane-inspired/renters/closing-desktop.webp"
            alt=""
            fill
            sizes="100vw"
          />
          <div>
            <h2>
              {careers
                ? "Let’s talk about what we could build."
                : "Own more of your time."}
            </h2>
            <p>
              {careers
                ? "Share your experience and interests with the team. Contact us to ask about current opportunities."
                : "Give everyday work a clearer path forward."}
            </p>
            <a
              className={styles.button}
              href={careers ? careerUrl : "/BL/BL-demo"}
            >
              {careers ? "Introduce yourself" : "See a demo"} ↗
            </a>
          </div>
        </section>
      </div>
    </BaselaneHomepage>
  );
}
