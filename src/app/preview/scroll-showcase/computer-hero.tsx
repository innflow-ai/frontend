"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "./computer-hero.module.css";
import { type HeroTimeline, useHeroLoop } from "./use-hero-loop";

const assets = "/preview/scroll-showcase/computer-desktop";
const agents = [
  { name: "Innflow", icon: "innflow.png", pointer: "innflow-pointer.svg" },
  { name: "Claude Code", icon: "claude.svg", pointer: "claude-pointer.svg" },
  { name: "Codex", icon: "codex.svg", pointer: "codex-pointer.svg" },
];

const files = ["plan-switch.tsx", "price-card.tsx", "pricing-page.tsx"];
const output = [
  "⏺ Update(plan-switch.tsx)",
  "  ⎿ annual first, above the price",
  "⏺ Update(price-card.tsx)",
  "  ⎿ $108 → $96 · save $24 a year",
  "✓ phone 390 px · cards stacked",
];

function drawDesktop(
  scene: HTMLElement,
  _viewport: HTMLElement,
  { animate, at, duration }: HeroTimeline,
) {
  // Positions are relative to each cursor's resting point in the reference frame.
  const paths = [
    [
      [0, 0, 0],
      [900, 0, 0],
      [2000, -12, -20],
      [5300, -12, -20],
      [7300, 0, 0],
    ],
    [
      [0, 4, 4],
      [1050, 0, -4],
      [2600, 0, -4],
      [3400, 0, -2],
      [4650, 0, -2],
      [5500, 0, 0],
    ],
    [
      [0, 4, 6],
      [1800, 0, 2],
      [4100, 0, 2],
      [5200, 0, 0],
    ],
  ];
  scene.querySelectorAll("[data-cursor]").forEach((cursor, index) => {
    animate(
      cursor,
      paths[index]
        .map(([ms, x, y]) => at(ms, { transform: `translate(${x}em, ${y}em)` }))
        .concat(at(duration, { transform: "translate(0,0)" })),
    );
  });
  scene.querySelectorAll("[data-file]").forEach((row, i) => {
    const start = [1050, 3400, 5500][i];
    const end = [3400, 5500, duration][i];
    const selected = { backgroundColor: "#208fff", color: "#fff" };
    const idle = {
      backgroundColor: i === 1 ? "#e3ebf6" : "transparent",
      color: "#1d1d1f",
    };
    animate(row, [
      at(0, idle),
      at(start - 100, idle),
      at(start, selected),
      at(end - 100, selected),
      at(end, i === 2 ? selected : idle),
    ]);
  });
  scene.querySelectorAll("[data-line]").forEach((line, i) => {
    const start = [1300, 2050, 3550, 4300, 6100][i];
    animate(line, [
      at(0, { opacity: 0 }),
      at(start, { opacity: 0 }),
      at(start + 200, { opacity: 1 }),
      at(duration, { opacity: 1 }),
    ]);
  });
}

function Lights() {
  return (
    <span className={styles.lights}>
      <i />
      <i />
      <i />
    </span>
  );
}

export function ComputerHero({ play }: { play: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useHeroLoop(ref, play, 8800, drawDesktop);
  return (
    <div className={styles.viewport}>
      <div className={styles.desktop} ref={ref} aria-hidden="true">
        <div className={styles.menu}>
          <span>Finder　File　Edit　View　Go　Window</span>
          <span>3 agents using this Mac</span>
        </div>
        <div className={styles.finder}>
          <Lights />
          <strong>pricing</strong>
          <small>~/web/src/pages/pricing</small>
          {files.map((file, i) => (
            <div data-file="" className={styles.file} key={file}>
              <span>📄　{file}</span>
              <span>{[4, 6, 9][i]} KB</span>
            </div>
          ))}
        </div>
        <div className={styles.terminal}>
          <Lights />
          {output.map((line) => (
            <div data-line="" key={line}>
              {line}
            </div>
          ))}
        </div>
        <div className={styles.connections}>
          <Lights />
          <div className={styles.agents}>
            {agents.map((agent) => (
              <div key={agent.name}>
                <Image
                  src={`${assets}/${agent.icon}`}
                  alt=""
                  width={9}
                  height={9}
                  unoptimized
                />
                {agent.name}
                <i />
              </div>
            ))}
          </div>
          <div className={styles.details}>
            <b>Claude Code</b>
            <span>Connected</span>
            <small>
              Working on this Mac
              <br />
              Iris’s Mac
            </small>
          </div>
        </div>
        <div className={styles.dock}>
          {[
            "finder.png",
            "innflow-macos.png",
            "innflow-dock.png",
            "claude-dock.png",
            "codex-dock.png",
            "settings.png",
          ].map((icon) => (
            <Image
              key={icon}
              alt=""
              src={`${assets}/${icon}`}
              width={20}
              height={20}
              unoptimized
            />
          ))}
        </div>
        <div className={styles.light} />
        {agents.map((agent) => (
          <div
            key={agent.name}
            data-cursor={agent.name}
            className={styles.cursor}
          >
            <Image
              alt=""
              src={`${assets}/${agent.pointer}`}
              width={14}
              height={17}
              unoptimized
            />
            <span>{agent.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
