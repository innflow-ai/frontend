import Image from "next/image";
import type { BlogAuthor } from "@/lib/sanity";
import { urlForImage } from "@/lib/sanity";
import styles from "./author-card.module.css";

type BlogAuthorCardProps = {
  author: BlogAuthor;
  className?: string;
  href?: string;
};

export function BlogAuthorCard({
  author,
  className,
  href = "#author-bio",
}: BlogAuthorCardProps) {
  const photo = author.image
    ? urlForImage(author.image)
        .width(300)
        .height(300)
        .quality(100)
        // biome-ignore lint/suspicious/noFocusedTests: `fit` is the image-url crop API, not a test
        .fit("crop")
        .url()
    : null;
  const initials = author.name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <a
      className={`${styles.card}${className ? ` ${className}` : ""}`}
      href={href}
      aria-label={`About ${author.name}`}
    >
      <span className={styles.identity}>
        {photo ? (
          <Image
            className={styles.portrait}
            src={photo}
            alt=""
            width={50}
            height={50}
            sizes="50px"
            quality={100}
          />
        ) : (
          <span className={styles.initials} aria-hidden="true">
            {initials}
          </span>
        )}
        <span className={styles.name}>{author.name}</span>
      </span>
      {author.role ? <span className={styles.role}>{author.role}</span> : null}
    </a>
  );
}
