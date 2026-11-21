import Image from "next/image";
import type { BlogAuthor } from "@/lib/sanity";
import { urlForImage } from "@/lib/sanity";
import styles from "./article.module.css";

export function BlogAuthorBio({ author }: { author: BlogAuthor }) {
  const photo = author.image
    ? urlForImage(author.image)
        .width(160)
        .height(160)
        // biome-ignore lint/suspicious/noFocusedTests: `fit` is the image-url crop API, not a test
        .fit("crop")
        .url()
    : null;

  return (
    <section className={styles.authorBio} id="author-bio" aria-label="Author">
      {photo ? (
        <Image
          src={photo}
          alt={author.image?.alt ?? author.name}
          width={80}
          height={80}
        />
      ) : (
        <div className={styles.authorFallback} aria-hidden="true">
          {author.name.slice(0, 1)}
        </div>
      )}
      <div>
        <h2>{author.name}</h2>
        {author.role ? (
          <p className={styles.authorRole}>{author.role}</p>
        ) : null}
        {author.bio ? <p className={styles.authorCopy}>{author.bio}</p> : null}
      </div>
    </section>
  );
}
