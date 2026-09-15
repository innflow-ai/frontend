"use client";
import styles from "@/components/integrations.module.css";
export default function IntegrationsError({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className={`shell ${styles.detail}`}>
      <div className={styles.empty}>
        <h1>We couldn’t load the integrations</h1>
        <p>Please try again in a moment.</p>
        <button type="button" onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}
