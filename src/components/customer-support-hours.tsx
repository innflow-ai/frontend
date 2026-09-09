import styles from "./customer-support-hours.module.css";

export function CustomerSupportHours() {
  return (
    <section className={styles.hours} aria-label="Hours of operation">
      <strong>Hours of Operation</strong>
      <dl>
        <div>
          <dt>Monday–Friday</dt>
          <dd>9:00 AM–6:00 PM ET</dd>
        </div>
        <div>
          <dt>Saturday–Sunday</dt>
          <dd>10:00 AM–5:00 PM ET</dd>
        </div>
      </dl>
    </section>
  );
}
