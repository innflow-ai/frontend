import { useEffect, useRef, useState } from "react";
import { Check, CheckCircle, UserCheck } from "@/components/icons/mage";
import motion from "./flow-card-motion.module.css";
import styles from "./flow-scene.module.css";

// Each row references a group in the original Figma artwork, in paint order.
const cardLayers = {
  schedule: [
    "top",
    "input",
    "signal",
    "arrow",
    "surface",
    "mark",
    "copy",
    "result",
  ],
  trigger: [
    "top",
    "input",
    "signal",
    "arrow",
    "surface",
    "mark",
    "copy",
    "result",
  ],
  automation: [
    "top",
    "input",
    "arrow",
    "surface",
    "mark",
    "step1",
    "arrow1",
    "step2",
    "step3",
    "arrow3",
    "step4",
  ],
} as const;

type Card = keyof typeof cardLayers;

function SourceCard({ scene }: { scene: Card }) {
  const [frame, setFrame] = useState(0);
  const sprite = `/brand/homepage/flows/cards/${scene}.svg`;
  const next = (frame + 1) % 3;
  const surface = useRef<SVGGElement>(null);
  useEffect(() => {
    const layer = surface.current;
    if (!layer) return;
    const advance = () => setFrame((previous) => (previous + 1) % 3);
    layer.addEventListener("animationiteration", advance);
    return () => layer.removeEventListener("animationiteration", advance);
  }, []);
  return (
    <svg
      className={styles.figmaCard}
      viewBox="0 0 264 270"
      fill="none"
      data-frame={frame}
      aria-hidden="true"
    >
      {cardLayers[scene].map((layer) => (
        <g
          key={layer}
          data-card-layer={layer}
          className={motion[scene + layer[0].toUpperCase() + layer.slice(1)]}
          ref={layer === "surface" ? surface : undefined}
        >
          {layer !== "signal" ? (
            <use
              href={`${sprite}#frame-${frame}-${layer}`}
            />
          ) : scene === "schedule" ? (
            <rect x="28" y="100" width="23" height="2" rx="1" fill="#c5adf9" />
          ) : (
            <circle cx="136" cy="102" r="2.5" fill="#ecd4a6" />
          )}
        </g>
      ))}
      {scene !== "automation" && (
        <g className={motion.loadingLines} fill="#f7f7f9" fillOpacity=".24">
          <rect x="24.5" y="176" width="164" height="5" rx="2" />
          <rect x="24.5" y="190" width="102" height="5" rx="2" />
        </g>
      )}
      <g className={motion.upcoming} data-next-frame={next}>
        <use href={`${sprite}#frame-${next}-top`} />
        <use className={motion.upcomingInput} href={`${sprite}#frame-${next}-input`} />
      </g>
    </svg>
  );
}

function Approval() {
  return (
    <>
      <div className={styles.sheet}>
        <div className={styles.handle} />
        <div className={styles.heading}>
          <UserCheck /> Review the export
        </div>
        <div className={styles.row}>
          <span>File</span>
          <b>Pipeline recap.csv</b>
        </div>
        <div className={styles.row}>
          <span>Reviewer</span>
          <b>Maya Chen</b>
        </div>
        <div className={styles.action}>
          <span>Approve export</span>
          <strong className={styles.approved}>
            <Check /> Approved
          </strong>
        </div>
      </div>
      <div className={`${styles.receipt} ${styles.result}`}>
        <CheckCircle /> Delivered to Sales
      </div>
    </>
  );
}

export function FlowScene({
  scene,
  playing,
}: {
  scene: string;
  playing: boolean;
}) {
  return (
    <div
      className={styles.stage}
      data-flow-scene={scene}
      data-playing={playing}
    >
      {scene === "approval" ? (
        <div className={styles.composition}>
          <Approval />
        </div>
      ) : Object.hasOwn(cardLayers, scene) ? (
        <SourceCard key={scene} scene={scene as Card} />
      ) : null}
    </div>
  );
}
