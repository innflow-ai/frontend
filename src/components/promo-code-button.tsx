"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check } from "./icons/mage/Check";
import styles from "./website-announcement.module.css";

export function PromoCodeButton({ code }: { code: string }) {
  const [status, setStatus] = useState("");
  const reset = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const copied = status === "Copied";
  useEffect(() => () => clearTimeout(reset.current), []);
  return (
    <button
      type="button"
      className={styles.codeButton}
      data-copied={copied}
      aria-label={`Copy code ${code}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          clearTimeout(reset.current);
          setStatus("Copied");
          reset.current = setTimeout(() => setStatus(""), 2000);
        } catch {
          clearTimeout(reset.current);
          setStatus("Copy manually");
        }
      }}
      onBlur={() => { if (!copied) setStatus(""); }}
    >
      <span className={styles.codeLabel}>{code}</span>
      {copied ? <Check size={14} /> : <Image src="/brand/announcement/friday-copy.svg" width={14} height={14} alt="" />}
      <span role="status" className={copied ? styles.copyAnnouncement : undefined}>{status}</span>
    </button>
  );
}
