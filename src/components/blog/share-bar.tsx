"use client";

import {
  Export,
  FacebookLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react";
import styles from "./article.module.css";

export function BlogShareBar({ url, title }: { url: string; title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className={styles.share}>
      <p className={styles.metaLabel}>Share</p>
      <div className={styles.shareRow}>
        <button
          type="button"
          className={styles.shareButton}
          aria-label="Share this post"
          onClick={() => {
            if (navigator.share) {
              void navigator.share({ title, url }).catch(() => {});
              return;
            }
            void navigator.clipboard?.writeText(url);
          }}
        >
          <Export size={18} weight="bold" aria-hidden="true" />
        </button>
        <a
          className={styles.shareButton}
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Share on Facebook"
        >
          <FacebookLogo size={18} weight="fill" aria-hidden="true" />
        </a>
        <a
          className={styles.shareButton}
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Share on X"
        >
          <XLogo size={18} weight="bold" aria-hidden="true" />
        </a>
        <a
          className={styles.shareButton}
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Share on LinkedIn"
        >
          <LinkedinLogo size={18} weight="fill" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
