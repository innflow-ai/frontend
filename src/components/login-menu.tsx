"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import styles from "./login-menu.module.css";

export function LoginMenu({
  href,
  open,
  onOpenChange,
  onSelect,
  mobile = false,
}: {
  href: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: () => void;
  mobile?: boolean;
}) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const hoverClose = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelHoverClose = () => {
    if (hoverClose.current) clearTimeout(hoverClose.current);
    hoverClose.current = null;
  };
  useEffect(
    () => () => {
      if (hoverClose.current) clearTimeout(hoverClose.current);
    },
    [],
  );
  return (
    // biome-ignore lint/a11y/useSemanticElements: This groups navigation disclosures, not form fields.
    <div
      role="group"
      aria-label="Login options"
      className={`${styles.root}${mobile ? ` ${styles.mobile}` : ""}`}
      onPointerEnter={(event) => {
        if (
          mobile ||
          event.pointerType !== "mouse" ||
          !window.matchMedia("(hover: hover)").matches
        )
          return;
        cancelHoverClose();
        onOpenChange(true);
      }}
      onPointerLeave={(event) => {
        if (mobile || event.pointerType !== "mouse") return;
        cancelHoverClose();
        hoverClose.current = setTimeout(() => onOpenChange(false), 180);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          cancelHoverClose();
          onOpenChange(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          cancelHoverClose();
          onOpenChange(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          cancelHoverClose();
          onOpenChange(!open);
        }}
      >
        Log in
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m6 9 6 6 6-6"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div id={id} className={styles.panel}>
          {(["Landlord", "Tenant"] as const).map((role) => (
            <a
              key={role}
              href={href}
              aria-label={`${role} login${role === "Tenant" ? " Beta" : ""}`}
              onClick={onSelect}
              className={styles.item}
            >
              <Image
                src={`/brand/mage/login-${role.toLowerCase()}.svg`}
                alt=""
                width={24}
                height={24}
                unoptimized
              />
              <span>{role} login</span>
              {role === "Tenant" && <small className={styles.beta}>Beta</small>}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
