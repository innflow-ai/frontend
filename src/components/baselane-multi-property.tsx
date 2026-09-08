import {
  ArrowRight,
  Buildings,
  Files,
  FlowArrow,
  ShieldCheck,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-multi-property.module.css";
import { type RentalAudience, rentalContent } from "./baselane-rental-content";

const asset = "/brand/baselane-inspired/multi-property/";
function Photo({
  name,
  root = asset,
  responsive = false,
  priority = false,
}: {
  name: string;
  root?: string;
  responsive?: boolean;
  priority?: boolean;
}) {
  return (
    <picture className={styles.photo}>
      {responsive && (
        <source
          media="(max-width:700px)"
          srcSet={`${root}${name}-mobile.webp`}
        />
      )}
      <Image
        src={`${root}${name}${responsive ? "-desktop" : ""}.webp`}
        alt=""
        fill
        sizes="(max-width:700px) 100vw, 90vw"
        preload={priority}
      />
    </picture>
  );
}
const defaultTools = [
  {
    image: "workflows",
    Icon: FlowArrow,
    label: "Connected workflows",
    title: "Give recurring work a clear path.",
    description:
      "Bring requests, property context, and approval steps together so your team can focus on the decisions that matter.",
    preview: "Maintenance request",
    rows: [
      "Request received",
      "Property context attached",
      "Awaiting team approval",
    ],
  },
  {
    image: "properties",
    Icon: Buildings,
    label: "Property-specific context",
    title: "Keep every property in perspective.",
    description:
      "Organize the records, people, and next steps behind each property. Move between details without losing sight of the wider portfolio.",
    preview: "Your property workspace",
    rows: ["142 Oak Street", "88 Riverside Drive", "24 Maple Avenue"],
  },
  {
    image: "knowledge",
    Icon: Files,
    label: "Connected knowledge",
    title: "Put useful answers within reach.",
    description:
      "Keep procedures and supporting documents close to everyday work, giving your team a shared place to find the context they need.",
    preview: "Knowledge library",
    rows: ["Property handbook", "Vendor directory", "Move-in checklist"],
  },
];
export function BaselaneMultiProperty({
  audience,
}: {
  audience?: RentalAudience;
} = {}) {
  const content = audience ? rentalContent[audience] : null;
  const assetRoot = audience ? `/brand/baselane-inspired/${audience}/` : asset;
  const tools = content
    ? content.cards.map((card, i) => ({
        ...card,
        Icon: [FlowArrow, Buildings, Files][i],
      }))
    : defaultTools;
  return (
    <BaselaneHomepage>
      <section className={styles.hero}>
        <Photo root={assetRoot} name="hero" responsive priority />
        <div className={styles.heroCopy}>
          <h1>
            {content?.title ?? (
              <>
                Property clarity that
                <br />
                grows with your portfolio.
              </>
            )}
          </h1>
          <p>
            {content?.description ??
              "Connected workflows and knowledge for multi-property teams who want more control and room to grow."}
          </p>
          <div className={styles.actions}>
            <a
              className={styles.googleButton}
              href={`${siteConfig.appOrigin}/login`}
            >
              <Image src="/brand/google-g.svg" alt="" width={18} height={18} />
              Continue with Google
            </a>
            <a className={styles.outline} href="/demo">
              See demo <ArrowRight size={18} />
            </a>
          </div>
          <small>
            One workspace for your team, your properties, and the work ahead.
          </small>
        </div>
      </section>
      {(audience === "mid-term" || audience === "short-term") && (
        <div className={styles.connectionBar}>
          <span>Keep the work connected</span>
          <strong>Property context</strong>
          <strong>Resident workflows</strong>
          <strong>Human approvals</strong>
        </div>
      )}
      <section className={styles.section}>
        <div className={styles.intro}>
          <h2>{content?.intro ?? "Make room for the bigger picture."}</h2>
          <p>
            {content?.introText ??
              "Bring the work behind every property together, so your next move is easier to see."}
          </p>
        </div>
        <div className={styles.portfolio}>
          <Photo root={assetRoot} name="portfolio" responsive />
          <div className={styles.glass}>
            <span>CONNECTED PROPERTY OPERATIONS</span>
            <h3>
              {content?.panoramaTitle ?? (
                <>
                  A portfolio view.
                  <br />A property-level understanding.
                </>
              )}
            </h3>
            <p>
              {content?.panoramaText ??
                "Keep the details connected as your operation grows. Give every request a home, every handoff an owner, and every decision the context it needs."}
            </p>
            <a href="/BL/BL-landlord-banking">
              Explore property operations <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.intro}>
          <h2>
            {content?.toolsTitle ?? (
              <>
                Tools that work together.
                <br />
                For properties that run together.
              </>
            )}
          </h2>
        </div>
        <div className={styles.tools}>
          {tools.map(
            ({ image, Icon, label, title, description, preview, rows }) => (
              <article className={styles.tool} key={image}>
                <div className={styles.toolPhoto}>
                  <Photo root={assetRoot} name={image} />
                  <span className={styles.pill}>
                    <Icon size={14} />
                    {label}
                  </span>
                </div>
                <div className={styles.toolCopy}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <div className={styles.preview}>
                  <small>ILLUSTRATIVE WORKSPACE</small>
                  <h4>{preview}</h4>
                  {rows.map((row, i) => (
                    <div key={row}>
                      <span className={styles.dot} />
                      <span>{row}</span>
                      <span>{i === 2 ? "Review" : "Ready"}</span>
                    </div>
                  ))}
                </div>
              </article>
            ),
          )}
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.intro}>
          <h2>Confidence in the details.</h2>
        </div>
        <div className={styles.controls}>
          {[
            [
              ShieldCheck,
              "Human approvals",
              "Keep your team involved in consequential workflow decisions.",
            ],
            [
              FlowArrow,
              "Visible progress",
              "Follow each step from the first request through the final handoff.",
            ],
            [
              Users,
              "Shared context",
              "Give your team a consistent view of the work and the information behind it.",
            ],
          ].map(([Icon, title, text]) => {
            const Mark = Icon as typeof ShieldCheck;
            return (
              <article key={String(title)}>
                <h3>
                  <Mark size={23} />
                  {String(title)}
                </h3>
                <p>{String(text)}</p>
              </article>
            );
          })}
        </div>
      </section>
      {audience === "short-term" && (
        <section className={styles.oceanBanner}>
          <Image
            src="/brand/baselane-inspired/hero.webp"
            alt=""
            fill
            sizes="100vw"
          />
          <div>
            <h2>
              More headspace.
              <br />
              For the work and life ahead.
            </h2>
            <p>
              Bring your properties, your team, and your next steps into one
              flow.
            </p>
            <a className={styles.button} href="/demo">
              Explore Innflow <ArrowRight size={18} />
            </a>
          </div>
        </section>
      )}
      <section className={styles.section}>
        <div className={styles.intro}>
          <h2>Support for your next chapter.</h2>
        </div>
        <div className={styles.resources}>
          <article className={styles.featured}>
            <Photo root={assetRoot} name="resources" responsive />
            <span className={styles.featureLabel}>
              FEATURED
              <br />
              PRODUCT DEMO
            </span>
            <div>
              <h3>
                {content?.resourceTitle ??
                  "See a more connected property operation."}
              </h3>
              <p>
                {content?.resourceText ??
                  "Explore the workflows, knowledge, and approvals behind Innflow."}
              </p>
              <a className={styles.button} href="/demo">
                Book a demo <ArrowRight size={18} />
              </a>
            </div>
          </article>
          <div className={styles.resourceLinks}>
            {[
              [
                "PRODUCT TOUR",
                "Find the right starting point for your team.",
                "/demo",
              ],
              [
                "ARTICLES",
                "Ideas and perspectives for the work ahead.",
                "/blog",
              ],
              [
                "PLATFORM",
                "Explore a workspace built around connected operations.",
                "/platform",
              ],
            ].map(([label, title, href]) => (
              <a href={href} key={label}>
                <span>
                  <small>{label}</small>
                  <h3>{title}</h3>
                </span>
                <ArrowRight size={22} />
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.intro}>
          <h2>{content?.storyTitle ?? "One portfolio. Many moving parts."}</h2>
          <p>A clearer way to connect the work behind every property.</p>
        </div>
        <div className={styles.stories}>
          {[
            ["Maintenance", "From request to resolution.", "workflows"],
            [
              "Onboarding",
              "Give every new property a strong start.",
              "properties",
            ],
            ["Team knowledge", "Keep the answers close.", "knowledge"],
            [
              "Coordination",
              "Make the next handoff clear.",
              "resources-desktop",
            ],
          ].map(([title, text, photo], i) => (
            <a href="/products/agentic-workflows" key={title}>
              <Photo root={assetRoot} name={photo} />
              <small>{title}</small>
              <h3>{content?.stories[i] ?? text}</h3>
              <span>
                Explore workflows <ArrowRight size={18} />
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className={styles.closing}>
        <Photo root={assetRoot} name="closing" responsive />
        <div>
          <h2>
            More room for life.
            <br />
            More clarity for your properties.
          </h2>
          <p>Bring your team and your next steps into one flow.</p>
          <div className={styles.actions}>
            <a
              className={styles.googleButton}
              href={`${siteConfig.appOrigin}/login`}
            >
              <Image src="/brand/google-g.svg" alt="" width={18} height={18} />
              Continue with Google
            </a>
            <a className={styles.outline} href="/demo">
              See demo <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </BaselaneHomepage>
  );
}
