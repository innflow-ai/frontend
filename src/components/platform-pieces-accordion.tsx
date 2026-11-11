"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./platform-product-page.module.css";

export type PlatformPiece = {
  title: string;
  body: string;
};

/**
 * One open row at a time, matching the approved pieces accordion.
 * The first row starts open because that is the state in the frame.
 */
export function PlatformPiecesAccordion({ items }: { items: PlatformPiece[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const open = index === openIndex;
        return (
          <div className={styles.accordionItem} key={item.title}>
            <button
              type="button"
              className={styles.accordionButton}
              aria-expanded={open}
              onClick={() => setOpenIndex(index)}
            >
              <span>{item.title}</span>
              <Image
                alt=""
                className={open ? styles.chevronOpen : styles.chevron}
                height={14}
                src="/products/platform/icons/chevron.svg"
                unoptimized
                width={14}
              />
            </button>
            {open ? <p>{item.body}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
