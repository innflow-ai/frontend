import styles from "./workflow-illustration.module.css";

/** A schematic, not a screenshot of live customer data. */
export function WorkflowIllustration({
  label,
  steps = [
    "Bring in the context",
    "Prepare the next step",
    "Review and continue",
  ],
  compact = false,
}: {
  label: string;
  steps?: string[];
  compact?: boolean;
}) {
  return (
    <div
      className={`${styles.canvas} ${compact ? styles.compact : ""}`}
      role="img"
      aria-label={`Illustrative workflow: ${label}`}
    >
      <div className={styles.top}>
        <span>innflow</span>
        <small>Illustrative workflow</small>
      </div>
      <div className={styles.steps}>
        {steps.slice(0, 3).map((step, index) => (
          <div className={styles.step} key={step}>
            <span className={styles.number}>{index + 1}</span>
            <span>{step}</span>
            <span className={styles.check} aria-hidden="true">
              ✓
            </span>
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <span className={styles.dot} /> Context stays connected
      </div>
    </div>
  );
}
