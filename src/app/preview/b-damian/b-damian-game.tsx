"use client";

import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import styles from "./b-damian-game.module.css";
import {
  fallSpeedForScore,
  type Rect,
  rectsOverlap,
  spawnIntervalMs,
} from "./game-math";

/** Logical canvas size — CSS scales it; game math stays resolution-stable. */
const W = 900;
const H = 520;
const PLAYER_W = 54;
const PLAYER_H = 72;
const HIGH_SCORE_KEY = "b-damian-high-score";
const START_LIVES = 3;

type Phase = "ready" | "playing" | "paused" | "over";

type FallingKind = "b" | "hazard";

type Falling = {
  id: number;
  kind: FallingKind;
  x: number;
  y: number;
  w: number;
  h: number;
  vy: number;
  spin: number;
  spinRate: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
};

type Flash = {
  text: string;
  life: number;
  x: number;
  y: number;
  color: string;
};

/**
 * B. Damian — collect letter B tokens, dodge coral hazards.
 * Canvas owns the sim loop; React only mirrors HUD / overlay state.
 */
export function BDamianGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phaseRef = useRef<Phase>("ready");
  const scoreRef = useRef(0);
  const livesRef = useRef(START_LIVES);
  const highRef = useRef(0);
  const playerXRef = useRef(W / 2 - PLAYER_W / 2);
  const keysRef = useRef({ left: false, right: false });
  const itemsRef = useRef<Falling[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const flashesRef = useRef<Flash[]>([]);
  const nextIdRef = useRef(1);
  const spawnAtRef = useRef(0);
  const invulnUntilRef = useRef(0);
  const shakeRef = useRef(0);
  const bobRef = useRef(0);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);

  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(START_LIVES);
  const [highScore, setHighScore] = useState(0);

  /** Mirror sim → React without tearing the rAF loop into setState thrash. */
  const syncHud = useEffectEvent(() => {
    setPhase(phaseRef.current);
    setScore(scoreRef.current);
    setLives(livesRef.current);
    setHighScore(highRef.current);
  });

  const resetRound = useCallback(() => {
    scoreRef.current = 0;
    livesRef.current = START_LIVES;
    playerXRef.current = W / 2 - PLAYER_W / 2;
    itemsRef.current = [];
    particlesRef.current = [];
    flashesRef.current = [];
    spawnAtRef.current = 0;
    invulnUntilRef.current = 0;
    shakeRef.current = 0;
    bobRef.current = 0;
    lastTsRef.current = 0;
    syncHud();
  }, []);

  const beginPlay = useCallback(() => {
    resetRound();
    phaseRef.current = "playing";
    syncHud();
  }, [resetRound]);

  const togglePause = useCallback(() => {
    if (phaseRef.current === "playing") {
      phaseRef.current = "paused";
      syncHud();
      return;
    }
    if (phaseRef.current === "paused") {
      phaseRef.current = "playing";
      lastTsRef.current = 0;
      syncHud();
    }
  }, []);

  const burst = useCallback(
    (x: number, y: number, color: string, count = 14) => {
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const speed = 1.4 + Math.random() * 3.2;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          life: 0.45 + Math.random() * 0.35,
          color,
        });
      }
    },
    [],
  );

  const spawnItem = useCallback((scoreNow: number) => {
    // Bias toward B's early; hazards climb as Damian gets cocky.
    const hazardChance = Math.min(0.48, 0.18 + scoreNow * 0.012);
    const kind: FallingKind = Math.random() < hazardChance ? "hazard" : "b";
    const size = kind === "b" ? 34 : 30;
    const x = 24 + Math.random() * (W - size - 48);
    itemsRef.current.push({
      id: nextIdRef.current++,
      kind,
      x,
      y: -size - 8,
      w: size,
      h: size,
      vy: fallSpeedForScore(scoreNow, kind === "b" ? 2.1 : 2.6),
      spin: Math.random() * Math.PI * 2,
      spinRate: (Math.random() * 0.04 + 0.01) * (Math.random() < 0.5 ? -1 : 1),
    });
  }, []);

  const drawDamian = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      bob: number,
      flashing: boolean,
    ) => {
      ctx.save();
      ctx.translate(x + PLAYER_W / 2, y + PLAYER_H / 2 + bob);
      if (flashing) {
        ctx.globalAlpha =
          0.45 + 0.55 * Math.abs(Math.sin(performance.now() / 60));
      }

      // Boots / torso — keep silhouette readable at phone scale.
      ctx.fillStyle = "#c8f542";
      ctx.fillRect(-18, -8, 36, 34);
      ctx.fillStyle = "#0d1c18";
      ctx.fillRect(-14, -2, 28, 8);

      // Head
      ctx.fillStyle = "#f0d7b4";
      ctx.beginPath();
      ctx.arc(0, -26, 16, 0, Math.PI * 2);
      ctx.fill();

      // Hair swoop
      ctx.fillStyle = "#1a1210";
      ctx.beginPath();
      ctx.ellipse(-2, -36, 15, 9, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // Eyes — Damian always looks slightly amused.
      ctx.fillStyle = "#071210";
      ctx.fillRect(-7, -28, 3, 3);
      ctx.fillRect(4, -28, 3, 3);
      ctx.fillStyle = "#ff5a36";
      ctx.fillRect(-4, -20, 8, 2);

      // "B" badge on chest
      ctx.fillStyle = "#071210";
      ctx.font = "700 16px Syne, Georgia, serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("B", 0, 8);

      // Legs with tiny stride from bob
      ctx.fillStyle = "#12261f";
      ctx.fillRect(-14, 26, 10, 14 + bob * 0.3);
      ctx.fillRect(4, 26, 10, 14 - bob * 0.3);

      ctx.restore();
    },
    [],
  );

  const drawItem = useCallback(
    (ctx: CanvasRenderingContext2D, item: Falling) => {
      ctx.save();
      ctx.translate(item.x + item.w / 2, item.y + item.h / 2);
      ctx.rotate(item.spin);

      if (item.kind === "b") {
        ctx.fillStyle = "#c8f542";
        ctx.beginPath();
        ctx.roundRect(-item.w / 2, -item.h / 2, item.w, item.h, 8);
        ctx.fill();
        ctx.fillStyle = "#071210";
        ctx.font = `700 ${Math.floor(item.w * 0.72)}px Syne, Georgia, serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("B", 0, 1);
      } else {
        ctx.fillStyle = "#ff5a36";
        ctx.beginPath();
        ctx.moveTo(0, -item.h / 2);
        ctx.lineTo(item.w / 2, item.h / 2);
        ctx.lineTo(-item.w / 2, item.h / 2);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#071210";
        ctx.font = `700 ${Math.floor(item.w * 0.55)}px IBM Plex Mono, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("!", 0, 4);
      }

      ctx.restore();
    },
    [],
  );

  const paint = useCallback(
    (ctx: CanvasRenderingContext2D, now: number) => {
      const shake = shakeRef.current;
      const ox = shake > 0 ? (Math.random() - 0.5) * shake : 0;
      const oy = shake > 0 ? (Math.random() - 0.5) * shake : 0;

      ctx.save();
      ctx.translate(ox, oy);

      // Field
      const gradient = ctx.createLinearGradient(0, 0, 0, H);
      gradient.addColorStop(0, "#14352c");
      gradient.addColorStop(1, "#0d1c18");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);

      // Ground stripe
      ctx.fillStyle = "#c8f542";
      ctx.globalAlpha = 0.18;
      ctx.fillRect(0, H - 58, W, 58);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#1f4035";
      ctx.fillRect(0, H - 52, W, 52);

      // Soft parallax dashes for motion presence
      ctx.strokeStyle = "rgba(200, 245, 66, 0.12)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i += 1) {
        const y = ((now / 18 + i * 70) % (H + 40)) - 20;
        ctx.beginPath();
        ctx.moveTo(40 + i * 110, y);
        ctx.lineTo(90 + i * 110, y + 24);
        ctx.stroke();
      }

      const playerY = H - 52 - PLAYER_H;
      const flashing = now < invulnUntilRef.current;
      drawDamian(ctx, playerXRef.current, playerY, bobRef.current, flashing);

      for (const item of itemsRef.current) {
        drawItem(ctx, item);
      }

      for (const p of particlesRef.current) {
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 4, 4);
      }
      ctx.globalAlpha = 1;

      for (const flash of flashesRef.current) {
        ctx.globalAlpha = Math.max(0, flash.life);
        ctx.fillStyle = flash.color;
        ctx.font = "700 22px Syne, Georgia, serif";
        ctx.textAlign = "center";
        ctx.fillText(flash.text, flash.x, flash.y);
      }
      ctx.globalAlpha = 1;

      ctx.restore();
    },
    [drawDamian, drawItem],
  );

  const step = useCallback(
    (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const prev = lastTsRef.current || now;
      const dt = Math.min(32, now - prev) / 16.6667;
      lastTsRef.current = now;

      if (phaseRef.current === "playing") {
        bobRef.current = Math.sin(now / 180) * 3;
        shakeRef.current = Math.max(0, shakeRef.current - 0.55 * dt);

        // Horizontal move — keyboard and mobile hold flags share this path.
        const speed = 7.2;
        if (keysRef.current.left) playerXRef.current -= speed * dt;
        if (keysRef.current.right) playerXRef.current += speed * dt;
        playerXRef.current = Math.max(
          8,
          Math.min(W - PLAYER_W - 8, playerXRef.current),
        );

        if (now >= spawnAtRef.current) {
          spawnItem(scoreRef.current);
          spawnAtRef.current = now + spawnIntervalMs(scoreRef.current);
        }

        const playerRect: Rect = {
          x: playerXRef.current + 8,
          y: H - 52 - PLAYER_H + 10,
          w: PLAYER_W - 16,
          h: PLAYER_H - 14,
        };

        const kept: Falling[] = [];
        for (const item of itemsRef.current) {
          item.y += item.vy * dt;
          item.spin += item.spinRate * dt;

          const hit = rectsOverlap(playerRect, {
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
          });

          if (hit) {
            if (item.kind === "b") {
              scoreRef.current += 1;
              if (scoreRef.current > highRef.current) {
                highRef.current = scoreRef.current;
                try {
                  localStorage.setItem(HIGH_SCORE_KEY, String(highRef.current));
                } catch {
                  // Private mode / blocked storage — keep in-memory high score only.
                }
              }
              burst(item.x + item.w / 2, item.y + item.h / 2, "#c8f542");
              flashesRef.current.push({
                text: "+1",
                life: 0.8,
                x: item.x + item.w / 2,
                y: item.y,
                color: "#e7ff9a",
              });
              syncHud();
            } else if (now >= invulnUntilRef.current) {
              livesRef.current -= 1;
              invulnUntilRef.current = now + 1200;
              shakeRef.current = 10;
              burst(item.x + item.w / 2, item.y + item.h / 2, "#ff5a36", 18);
              flashesRef.current.push({
                text: "Ouch",
                life: 0.9,
                x: item.x + item.w / 2,
                y: item.y,
                color: "#ff5a36",
              });
              syncHud();
              if (livesRef.current <= 0) {
                phaseRef.current = "over";
                syncHud();
              }
            }
            continue;
          }

          // Missed B's sting a little so movement stays intentional.
          if (item.y > H + 40) {
            if (item.kind === "b" && phaseRef.current === "playing") {
              // Soft penalty: only lose a life when Damian is not already recovering.
              if (now >= invulnUntilRef.current && scoreRef.current > 0) {
                // No life loss on miss — just a taunt flash so the loop stays fair.
                flashesRef.current.push({
                  text: "Miss",
                  life: 0.55,
                  x: item.x + item.w / 2,
                  y: H - 70,
                  color: "#7fa894",
                });
              }
            }
            continue;
          }

          kept.push(item);
        }
        itemsRef.current = kept;

        particlesRef.current = particlesRef.current
          .map((p) => ({
            ...p,
            x: p.x + p.vx * dt,
            y: p.y + p.vy * dt,
            vy: p.vy + 0.12 * dt,
            life: p.life - 0.025 * dt,
          }))
          .filter((p) => p.life > 0);

        flashesRef.current = flashesRef.current
          .map((f) => ({
            ...f,
            y: f.y - 0.6 * dt,
            life: f.life - 0.02 * dt,
          }))
          .filter((f) => f.life > 0);
      }

      paint(ctx, now);
      rafRef.current = requestAnimationFrame(step);
    },
    [burst, paint, spawnItem],
  );

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(HIGH_SCORE_KEY) || "0");
      if (Number.isFinite(saved) && saved > 0) {
        highRef.current = saved;
        setHighScore(saved);
      }
    } catch {
      // Ignore storage failures on first paint.
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    // Backing store matches CSS box for crisp sprites on retina.
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [step]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
        keysRef.current.left = true;
        event.preventDefault();
      }
      if (
        event.key === "ArrowRight" ||
        event.key === "d" ||
        event.key === "D"
      ) {
        keysRef.current.right = true;
        event.preventDefault();
      }
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        if (phaseRef.current === "ready" || phaseRef.current === "over") {
          beginPlay();
        } else if (
          phaseRef.current === "playing" ||
          phaseRef.current === "paused"
        ) {
          togglePause();
        }
      }
      if (event.key === "p" || event.key === "P") {
        togglePause();
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
        keysRef.current.left = false;
      }
      if (
        event.key === "ArrowRight" ||
        event.key === "d" ||
        event.key === "D"
      ) {
        keysRef.current.right = false;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [beginPlay, togglePause]);

  const setHold = (side: "left" | "right", down: boolean) => {
    keysRef.current[side] = down;
  };

  const onPointerSteer = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (phaseRef.current !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = W / rect.width;
    const x = (event.clientX - rect.left) * ratio;
    playerXRef.current = Math.max(
      8,
      Math.min(W - PLAYER_W - 8, x - PLAYER_W / 2),
    );
  };

  return (
    <div className={styles.shell}>
      <div className={styles.brandRow}>
        <div>
          <h1 className={styles.brand}>B. Damian</h1>
          <p className={styles.tagline}>
            Catch the B&apos;s. Dodge the drama. Become legend.
          </p>
        </div>
      </div>

      <div className={styles.hud} aria-live="polite">
        <div className={styles.hudStat}>
          <span className={styles.hudLabel}>Score</span>
          <span className={styles.hudValue}>{score}</span>
        </div>
        <div className={styles.hudStat}>
          <span className={styles.hudLabel}>Lives</span>
          <span className={styles.hudValue}>{lives}</span>
        </div>
        <div className={styles.hudStat}>
          <span className={styles.hudLabel}>Best</span>
          <span className={styles.hudValue}>{highScore}</span>
        </div>
      </div>

      <div className={styles.stageWrap}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width={W}
          height={H}
          role="img"
          aria-label="B. Damian game stage"
          onPointerDown={onPointerSteer}
          onPointerMove={(event) => {
            if (event.buttons > 0) onPointerSteer(event);
          }}
        />

        {phase !== "playing" ? (
          <div className={styles.overlay}>
            <div>
              <h2 className={styles.overlayTitle}>
                {phase === "ready"
                  ? "Ready, Damian?"
                  : phase === "paused"
                    ? "Paused"
                    : "Game over"}
              </h2>
              <p className={styles.overlayCopy}>
                {phase === "ready"
                  ? "Move with ← → or A/D. On phones, drag the stage or use the buttons. Collect lime B tiles. Avoid coral hazards."
                  : phase === "paused"
                    ? "Press Space or P to resume the chaos."
                    : `You banked ${score} B's. High score ${highScore}. Hit play for round two.`}
              </p>
              <div className={styles.ctaRow}>
                {phase === "paused" ? (
                  <button
                    type="button"
                    className={styles.button}
                    onClick={togglePause}
                  >
                    Resume
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.button}
                    onClick={beginPlay}
                  >
                    {phase === "over" ? "Play again" : "Play"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.controls}>
        <span>Desktop: ← → / A D · Space start/pause · P pause</span>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonGhost}`}
          onClick={togglePause}
          disabled={phase === "ready" || phase === "over"}
        >
          {phase === "paused" ? "Resume" : "Pause"}
        </button>
      </div>

      <div className={styles.mobileControls}>
        <button
          type="button"
          className={styles.mobileBtn}
          onPointerDown={() => setHold("left", true)}
          onPointerUp={() => setHold("left", false)}
          onPointerLeave={() => setHold("left", false)}
          onPointerCancel={() => setHold("left", false)}
        >
          Left
        </button>
        <button
          type="button"
          className={styles.mobileBtn}
          onPointerDown={() => setHold("right", true)}
          onPointerUp={() => setHold("right", false)}
          onPointerLeave={() => setHold("right", false)}
          onPointerCancel={() => setHold("right", false)}
        >
          Right
        </button>
      </div>
    </div>
  );
}
