import {
  ArrowRight,
  CheckCircle,
  Files,
  HouseLine,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-renters.module.css";

const root = "/brand/baselane-inspired/renters/";
function Photo({
  name,
  responsive = false,
  priority = false,
}: {
  name: string;
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
        sizes="(max-width:700px) 100vw, 60vw"
        preload={priority}
      />
    </picture>
  );
}
const features = [
  {
    image: "portal",
    label: "Resident requests",
    title: "Keep the conversation connected.",
    text: "Bring requests and property context together so your team can understand what residents need and coordinate a clear next step.",
  },
  {
    image: "tasks",
    label: "Repeatable processes",
    title: "Give everyday work a reliable path.",
    text: "Connect recurring tasks with the people, instructions, and review steps they need, from move-in preparation to maintenance coordination.",
  },
  {
    image: "details",
    label: "Useful context",
    title: "Keep the details within reach.",
    text: "Make supporting information easier for your team to find, with property records and procedures connected to the work they support.",
  },
];
export function BaselaneRenters() {
  return (
    <BaselaneHomepage>
      <section className={styles.hero}>
        <Photo name="hero" responsive priority />
        <div>
          <h1>
            More clarity.
            <br />
            Less back and forth.
          </h1>
          <p>
            Help your team create a more connected resident experience, with
            requests, property knowledge, and next steps in one flow.
          </p>
          <a className={styles.darkButton} href="/demo">
            Explore resident workflows <ArrowRight size={18} />
          </a>
        </div>
      </section>
      <div className={styles.band}>
        <span>Built around property work</span>
        <strong>Resident context</strong>
        <strong>Connected teams</strong>
        <strong>Clear handoffs</strong>
      </div>
      <section className={styles.section}>
        <div className={styles.statement}>
          <div className={styles.statementPhoto}>
            <Photo name="panorama" />
          </div>
          <div>
            <h2>
              Behind a better resident experience is a team with the right
              context.
            </h2>
            <p>
              Innflow connects the work that helps your property team move
              forward.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.intro}>
          <h2>Built for better everyday experiences.</h2>
          <p>Keep your team, your properties, and the work ahead connected.</p>
        </div>
        <div className={styles.features}>
          {features.map((feature) => (
            <article key={feature.image}>
              <div className={styles.featurePhoto}>
                <Photo name={feature.image} />
              </div>
              <div className={styles.featureCopy}>
                <small>{feature.label}</small>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.intro}>
          <h2>The details, together.</h2>
        </div>
        <div className={styles.cards}>
          {[
            {
              image: "history",
              Icon: CheckCircle,
              title: "Visible progress",
              text: "Keep a clear view of requests, ownership, and the next action.",
              rows: [
                "Request received",
                "Assigned to your team",
                "Ready for review",
              ],
            },
            {
              image: "knowledge",
              Icon: Files,
              title: "Shared knowledge",
              text: "Keep procedures and property information beside the work.",
              rows: [
                "Property handbook",
                "Arrival instructions",
                "Vendor directory",
              ],
            },
            {
              image: "property",
              Icon: HouseLine,
              title: "Property context",
              text: "Organize the information behind every resident experience.",
              rows: ["Oak Street", "Riverside Drive", "Maple Avenue"],
            },
          ].map(({ image, Icon, title, text, rows }) => (
            <article key={title}>
              <div className={styles.cardPhoto}>
                <Photo name={image} />
                <div className={styles.preview}>
                  <small>ILLUSTRATIVE WORKSPACE</small>
                  {rows.map((row) => (
                    <div key={row}>
                      <Icon size={16} />
                      {row}
                    </div>
                  ))}
                </div>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.intro}>
          <h2>A clearer path from request to resolution.</h2>
        </div>
        <ol className={styles.steps}>
          {[
            ["Gather context", "Start with the property and the request."],
            ["Assign ownership", "Give the next step a clear owner."],
            ["Review the details", "Keep people involved in key decisions."],
            ["Move forward", "Follow progress through the handoff."],
          ].map(([title, text], i) => (
            <li key={title}>
              <span>{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className={styles.closing}>
        <Photo name="closing" responsive />
        <div>
          <h2>More room for what matters.</h2>
          <a className={styles.darkButton} href="/demo">
            See Innflow in action <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </BaselaneHomepage>
  );
}
