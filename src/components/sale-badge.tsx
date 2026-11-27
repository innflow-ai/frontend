import styles from "./promo-badge.module.css";

export function SaleBadge({ label }: { label: string }) {
  return (
    <span className={styles.blackFriday}>
      <span className={styles.tagIcon} aria-hidden="true" />
      <span>{label}</span>{" "}
      <strong>SALE</strong>
    </span>
  );
}
