import Image from "next/image";
import styles from "./google-cta.module.css";

export function GoogleCtaContent() {
  return (
    <span className={styles.content}>
      <Image
        src="/brand/google-g.svg"
        alt=""
        aria-hidden="true"
        width={18}
        height={18}
        style={{ flexShrink: 0 }}
      />
      Continue with Google
    </span>
  );
}
