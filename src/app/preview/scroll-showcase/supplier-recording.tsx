import { useEffect, useId, useRef, useState } from "react";
import styles from "./workspace-overview.module.css";

// Newest first, as in the Figma recording history.
const events = [
  ["Filled supplier form", "2:07", 22, 28],
  ["Downloaded annual return", "1:43", 30, 16],
  ["Opened filings tab", "1:19", 26, 18],
  ["Clicked on company", "0:55", 20, 28],
  ["Typed into search input", "0:31", 28, 20],
  ["Visited vendor-onboarding", "0:07", 25, 18],
] as const;

export function SupplierRecording({ expanded }: { expanded: boolean }) {
  const host = useRef<SVGSVGElement>(null);
  const id = useId();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!host.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={host}
      className={styles.supplierRecording}
      viewBox="0 0 407 272"
      role="img"
      aria-label="Supplier paperwork recording. The agent finds the company, downloads its annual return, and fills the supplier form."
      data-expanded={expanded}
      data-visible={visible}
      data-source-node="39:3785"
    >
      <defs>
        <linearGradient id={id} x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0.34" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0.12" />
        </linearGradient>
        <mask
          id={id + "-mask"}
          maskUnits="userSpaceOnUse"
          x="0"
          y="64"
          width="407"
          height="208"
        >
          <rect x="0" y="64" width="407" height="208" fill={`url(#${id})`} />
        </mask>
      </defs>
      <rect width="407" height="272" rx="14" fill="white" />
      <circle cx="32" cy="32" r="12" fill="white" stroke="#e2e2e8" />
      <circle
        className={styles.recordingLight}
        cx="32"
        cy="32"
        r="4"
        fill="#ea2630"
      />
      <text x="54" y="37" fill="#777780" fontSize="14">
        Recording..
      </text>
      <image
        href="/preview/homepage/workspace-overview/recording-connector.svg"
        y="44"
        width="407.109"
        height="20"
      />
      <path d="M46 64v208" stroke="#ebebf1" />
      <g mask={`url(#${id}-mask)`}>
        <g className={styles.recordingRows}>
          {events.map(([label, time, first, second], index) => (
            <g key={time} transform={`translate(0 ${64 + index * 40})`}>
              <circle cx="46" cy="20" r="2" fill="#81818a" />
              <rect x="64" y="5" width="48" height="6" rx="1" fill="#d5d5da" />
              <path
                d={`M70 16h${first} M70 22h${second} M70 28h18`}
                stroke="#e7e7eb"
                strokeWidth="2"
              />
              <text x="124" y="25" fill="#202024" fontSize="14">
                {label}
              </text>
              <text
                x="387"
                y="24"
                textAnchor="end"
                fill="#777780"
                fontSize="12"
              >
                {time}
              </text>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
