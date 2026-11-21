"use client";

import { FacebookLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react";
import { useState } from "react";
import { Share as Export } from "@/components/icons/mage";
import styles from "./article.module.css";

export function BlogShareBar({ url, title }: { url: string; title: string }) {
  const [status, setStatus] = useState("");
  const [manualCopy, setManualCopy] = useState(false);
  const share = async () => {
    setStatus("");
    setManualCopy(false);
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (
          error !== null &&
          typeof error === "object" &&
          "name" in error &&
          error.name === "AbortError"
        )
          return;
      }
    }
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(url);
      setStatus("Link copied.");
    } catch {
      setStatus("Select and copy the link below to share this post.");
      setManualCopy(true);
    }
  };
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
          onClick={share}
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
      {status ? <p role="status">{status}</p> : null}
      {manualCopy ? (
        <input
          aria-label="Post link"
          readOnly
          value={url}
          onFocus={(event) => event.currentTarget.select()}
          style={{ width: "100%", minWidth: 0 }}
        />
      ) : null}
    </div>
  );
}
