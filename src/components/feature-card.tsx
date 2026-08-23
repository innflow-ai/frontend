import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./feature-card.module.css";

function classNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function FeatureCardGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={classNames(styles.grid, className)}>{children}</div>;
}

export function FeatureCard({
  image,
  imageAlt,
  title,
  body,
  eyebrow,
  className,
}: {
  image: string;
  imageAlt: string;
  title: string;
  body: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <article className={classNames(styles.card, className)}>
      <div className={styles.media}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 720px) calc(100vw - 48px), (max-width: 980px) 50vw, 33vw"
        />
      </div>
      <div className={styles.copy}>
        {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </article>
  );
}
