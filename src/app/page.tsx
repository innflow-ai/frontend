import Image from "next/image";
import { FeatureSection } from "@/components/feature-section";
import { HeroWorkflowFrame } from "@/components/product-media";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import {
  faqs,
  featureStories,
  integrations,
  platformSteps,
  portfolioFits,
} from "@/content/home";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Innflow",
  url: siteConfig.marketingOrigin,
  email: siteConfig.supportEmail,
};

const applicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Innflow",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "A workflow automation platform for connected operational processes.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

function serializeJsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero-section" id="top">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <span className="section-label">
                For property-management operations
              </span>
              <h1>Run property operations from one connected workspace.</h1>
              <p className="hero-lede">
                Coordinate recurring workflows, operational knowledge, files,
                tables, approvals, and stakeholder handoffs without asking one
                more disconnected tool to become your system of record.
              </p>
              <div className="cta-row">
                <TrackedLink
                  className="button button-primary"
                  destination={siteConfig.demoUrl}
                  eventLabel="hero_demo"
                >
                  {siteConfig.primaryCta}
                  <span aria-hidden="true">↗</span>
                </TrackedLink>
                <a className="button button-secondary" href="#walkthrough">
                  <span className="play-icon" aria-hidden="true">
                    ▶
                  </span>
                  {siteConfig.secondaryCta}
                </a>
              </div>
              <p className="cta-note">
                We’ll map one recurring operation, confirm the systems and
                review points involved, and show the relevant product path. No
                setup-time promise is implied.
              </p>
            </div>
            <div className="hero-media">
              <HeroWorkflowFrame />
              <div className="hero-aside">
                <span>Product walkthrough</span>
                <p>
                  Illustrative property scenario built from verified product
                  surfaces.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Verified product evidence">
          <div className="shell proof-inner">
            <p>Grounded in current product surfaces</p>
            <div className="proof-items">
              <span>Visual workflows</span>
              <span>Approval requests</span>
              <span>Execution history</span>
              <span>Files + tables</span>
              <span>Knowledge base</span>
              <span>Connector paths</span>
            </div>
          </div>
        </section>

        <section className="section platform-section" id="platform">
          <div className="shell">
            <div className="section-intro intro-split">
              <div>
                <span className="section-label">
                  One platform, recurring operations
                </span>
                <h2>Connect the request, context, decision, and record.</h2>
              </div>
              <p>
                Innflow is positioned here as the coordination layer around the
                property systems you already use—not as a replacement for
                accounting, leasing, screening, or maintenance systems.
              </p>
            </div>
            <ol className="platform-flow">
              {platformSteps.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section capabilities-section" id="capabilities">
          <div className="shell">
            <div
              className="section-intro compact-intro"
              id="property-management"
            >
              <span className="section-label">Operational feature stories</span>
              <h2>
                Start with a real handoff, then keep the controls visible.
              </h2>
              <p>
                Each story separates the operational problem, the workflow, and
                the intended outcome. Preview surfaces are labeled as previews.
              </p>
            </div>
            <div className="feature-list">
              {featureStories.map((story, index) => (
                <FeatureSection
                  key={story.eyebrow}
                  story={story}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="controls-section">
          <div className="shell controls-grid">
            <div className="controls-copy">
              <span className="section-label label-dark">
                AI with operational controls
              </span>
              <h2>Bound the work before you automate it.</h2>
              <p>
                A useful assistant needs a defined scope, traceable inputs, and
                a clear point where a person reviews or stops the work.
              </p>
              <ul className="control-list">
                <li>
                  <span>01</span>
                  <div>
                    <strong>Read defined context</strong>
                    <p>Connect only the sources the workflow needs.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <strong>Take bounded actions</strong>
                    <p>
                      Use explicit workflow steps instead of an unlimited
                      autonomy claim.
                    </p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <strong>Pause for approval</strong>
                    <p>Put human review before consequential actions.</p>
                  </div>
                </li>
                <li>
                  <span>04</span>
                  <div>
                    <strong>Inspect execution</strong>
                    <p>
                      Review run history and design failure handling for the
                      process.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <section
              className="controls-console"
              aria-label="Illustrative execution trace"
            >
              <div className="console-top">
                <span>Execution #PM-1042</span>
                <strong>Waiting for review</strong>
              </div>
              <div className="console-log">
                <div className="log-complete">
                  <span>✓</span>
                  <p>
                    <strong>Request captured</strong>
                    <small>Source: operational intake</small>
                  </p>
                  <time>09:42:01</time>
                </div>
                <div className="log-complete">
                  <span>✓</span>
                  <p>
                    <strong>Context retrieved</strong>
                    <small>Property record · procedure · file</small>
                  </p>
                  <time>09:42:02</time>
                </div>
                <div className="log-complete">
                  <span>✓</span>
                  <p>
                    <strong>Next step prepared</strong>
                    <small>Urgency classification: needs review</small>
                  </p>
                  <time>09:42:03</time>
                </div>
                <div className="log-waiting">
                  <span>…</span>
                  <p>
                    <strong>Manager approval</strong>
                    <small>Outbound action is paused</small>
                  </p>
                  <time>Pending</time>
                </div>
              </div>
              <div className="console-actions">
                <button type="button">Edit step</button>
                <button type="button">Stop run</button>
                <button type="button" className="approve-button">
                  Review approval
                </button>
              </div>
              <p className="console-note">
                Illustrative walkthrough · exact permissions require
                workflow-level validation
              </p>
            </section>
          </div>
        </section>

        <section className="section walkthrough-section" id="walkthrough">
          <div className="shell walkthrough-grid">
            <div className="walkthrough-title">
              <span className="section-label">Product walkthrough</span>
              <h2>One request, from intake to a visible next step.</h2>
              <p>
                This is a proposed property-management scenario, not an
                attributable customer result.
              </p>
            </div>
            <ol className="walkthrough-steps">
              <li>
                <span>1</span>
                <div>
                  <h3>A request arrives</h3>
                  <p>
                    An operator or resident submits a maintenance message
                    through an approved intake path.
                  </p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <h3>Context is attached</h3>
                  <p>
                    The workflow references the relevant property record,
                    procedure, and supporting file.
                  </p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <h3>The work is classified</h3>
                  <p>
                    Workflow logic prepares a route and flags the item for human
                    review.
                  </p>
                </div>
              </li>
              <li>
                <span>4</span>
                <div>
                  <h3>Approval controls the handoff</h3>
                  <p>
                    A manager can inspect the context before an outbound action
                    continues.
                  </p>
                </div>
              </li>
              <li>
                <span>5</span>
                <div>
                  <h3>The run remains visible</h3>
                  <p>
                    The execution view preserves the operational trail for
                    follow-up and recovery design.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="section why-section">
          <div className="shell">
            <div className="section-intro compact-intro">
              <span className="section-label">Why Innflow</span>
              <h2>
                Build around the operation, not another isolated point tool.
              </h2>
            </div>
            <div className="reason-grid">
              <article>
                <span>Connected context</span>
                <h3>Keep working data near the decision.</h3>
                <p>
                  Bring knowledge, files, tables, and connector inputs into the
                  flow that uses them.
                </p>
              </article>
              <article>
                <span>Configurable process</span>
                <h3>Model the handoff your team actually runs.</h3>
                <p>
                  Use triggers, conditions, actions, and review points instead
                  of forcing every process into one template.
                </p>
              </article>
              <article>
                <span>Human control</span>
                <h3>Make review a designed step.</h3>
                <p>
                  Use approval and execution surfaces to keep consequential work
                  visible.
                </p>
              </article>
              <article>
                <span>Expandable workspace</span>
                <h3>Start with one operation.</h3>
                <p>
                  Validate one repeatable workflow before extending the system
                  to adjacent use cases.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section fit-section" id="fit">
          <div className="shell fit-layout">
            <div className="fit-intro">
              <span className="section-label">Fit by operating model</span>
              <h2>
                Designed first for teams coordinating recurring property work.
              </h2>
              <p>
                Portfolio-specific claims remain hypotheses until customer and
                implementation evidence is approved.
              </p>
              <div className="not-for">
                <strong>Not positioned as:</strong>
                <p>
                  A replacement for your property-management system or a promise
                  of fully autonomous property operations.
                </p>
              </div>
            </div>
            <div className="fit-list">
              {portfolioFits.map((fit) => (
                <article key={fit.title}>
                  <span>{fit.status}</span>
                  <h3>{fit.title}</h3>
                  <p>{fit.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section integrations-section" id="integrations">
          <div className="shell integrations-layout">
            <div className="integrations-copy">
              <span className="section-label">Connected systems</span>
              <h2>Work around the tools your operation already uses.</h2>
              <p>
                These marks correspond to connector paths in the product
                repository. Production readiness, scopes, and integration depth
                require account-specific validation.
              </p>
              <span className="verification-note">
                Status: product connector · not a customer endorsement
              </span>
            </div>
            <div className="integration-grid">
              {integrations.map((integration) => (
                <div className="integration-card" key={integration.name}>
                  <Image
                    src={integration.asset}
                    alt=""
                    width={32}
                    height={32}
                  />
                  <strong>{integration.name}</strong>
                  <small>{integration.status}</small>
                </div>
              ))}
              <div className="integration-card api-card">
                <span className="api-mark">API</span>
                <strong>Custom path</strong>
                <small>Scope and implementation required</small>
              </div>
            </div>
          </div>
        </section>

        <section className="section buying-section">
          <div className="shell buying-card">
            <div>
              <span className="section-label label-dark">
                Provisional buying motion
              </span>
              <h2>Start with one operation worth making repeatable.</h2>
            </div>
            <div className="buying-copy">
              <p>
                The current application has credit-based plans, but
                property-management packaging and implementation scope still
                need approval. This homepage therefore uses one demo-led path
                without publishing provisional prices.
              </p>
              <TrackedLink
                className="button button-light"
                destination={siteConfig.demoUrl}
                eventLabel="buying_demo"
              >
                {siteConfig.primaryCta}
                <span aria-hidden="true">↗</span>
              </TrackedLink>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="shell faq-layout">
            <div className="faq-intro">
              <span className="section-label">Questions before the demo</span>
              <h2>Clear boundaries make better workflows.</h2>
              <p>
                Answers reflect what is verified in this phase and name what
                still requires approval.
              </p>
            </div>
            <div className="faq-list">
              {faqs.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary>
                    <span>{item.question}</span>
                    <i aria-hidden="true">+</i>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta-section">
          <div className="shell final-cta">
            <span className="section-label label-dark">
              One operation. One clear next step.
            </span>
            <h2>
              See how Innflow could coordinate your recurring property work.
            </h2>
            <p>
              Bring one workflow and the systems it touches. We’ll separate what
              is available now, what needs configuration, and what remains a
              preview.
            </p>
            <TrackedLink
              className="button button-light"
              destination={siteConfig.demoUrl}
              eventLabel="final_demo"
            >
              {siteConfig.primaryCta}
              <span aria-hidden="true">↗</span>
            </TrackedLink>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(applicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />
    </>
  );
}
