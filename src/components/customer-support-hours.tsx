import styles from "./customer-support-hours.module.css";

export function CustomerSupportHours() {
  return (
    <section className={styles.hours} aria-label="Customer support hours">
      <strong>Customer Support Hours</strong>
      <dl>
        <div>
          <dt>Mon–Fri</dt>
          <dd>9am–6pm ET</dd>
        </div>
        <div>
          <dt>Sat–Sun</dt>
          <dd>10am–5pm ET</dd>
        </div>
      </dl>
    </section>
  );
}
