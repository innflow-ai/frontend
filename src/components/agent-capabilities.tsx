import styles from "./homepage-agent-showcase.module.css";
import { TrackedLink } from "./tracked-link";

const capabilities = [
  ["app-triggers", "App triggers"],
  ["recurring-tasks", "Recurring tasks"],
  ["connectors", "400+ Connectors"],
  ["skills", "Skills"],
  ["artifact-building", "Artifact building"],
  ["image-generation", "Image generation"],
  ["self-improvement", "Self-improvement"],
] as const;

export function AgentCapabilities() {
  return (
    <div className={styles.capabilityDetails}>
      <p data-home-copy className={styles.description}>
        <strong>Understanding a task</strong> is the only prerequisite to
        automating it. Let your team who already understand the problem
        build the necessary agents. No learning curve involved.
      </p>
      <div className={styles.actions}>
        <TrackedLink
          data-site-cta="primary"
          destination="/integrations"
          eventLabel="homepage_integrations_directory"
          className={styles.primaryButton}
        >
          View all integrations
        </TrackedLink>
        <TrackedLink
          data-site-cta="secondary"
          destination="https://docs.innflow.ai"
          eventLabel="homepage_agent_showcase_docs"
          className={styles.secondaryButton}
        >
          Read docs
        </TrackedLink>
      </div>
      <ul className={styles.capabilities} aria-label="Agent capabilities">
        {capabilities.map(([icon, label]) => (
          <li key={icon}>
            {/* biome-ignore lint/performance/noImgElement: Tiny local SVG preserves the reference's intrinsic dimensions. */}
            <img
              src={`/components/agent-showcase/section-icons/${icon}.svg`}
              alt=""
              width={16}
              height={16}
            />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
