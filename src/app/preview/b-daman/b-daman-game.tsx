"use client";

import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import styles from "./b-daman-game.module.css";
import {
  aimVelocity,
  circlesOverlap,
  clampAim,
  reflect,
  shotSpeedFromCharge,
  waveCoreHp,
  waveTargetCount,
} from "./game-math";

/** Logical canvas size — CSS scales it; sim math stays resolution-stable. */
const W = 900;
const H = 540;
const LAUNCHER_Y = H - 48;
const MARBLE_R = 10;
const HIGH_SCORE_KEY = "b-daman-high-score";
const START_MARBLES = 12;
const RELOAD_MS = 280;

type Phase = "ready" | "playing" | "paused" | "over" | "cleared";

type TargetKind = "pin" | "core" | "bumper";

type Target = {
  id: number;
  kind: TargetKind;
  x: number;
  y: number;
  r: number;
  hp: number;
  maxHp: number;
  points: number;
  wobble: number;
};

type Marble = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  trail: Array<{ x: number; y: number }>;
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
  x: number;
  y: number;
  life: number;
  color: string;
};

/**
 * B-Daman — aim the launcher, charge a shot, blast targets with marbles.
 * Canvas owns the sim loop; React only mirrors HUD / overlay state.
 */
export function BDamanGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phaseRef = useRef<Phase>("ready");
  const scoreRef = useRef(0);
  const highRef = useRef(0);
  const waveRef = useRef(1);
  const marblesLeftRef = useRef(START_MARBLES);
  const aimRef = useRef(0);
  const chargeRef = useRef(0);
  const chargingRef = useRef(false);
  const nextFireAtRef = useRef(0);
  const keysRef = useRef({ left: false, right: false, fire: false });
  const targetsRef = useRef<Target[]>([]);
  const shotsRef = useRef<Marble[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const flashesRef = useRef<Flash[]>([]);
  const nextIdRef = useRef(1);
  const shakeRef = useRef(0);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);

  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [marblesLeft, setMarblesLeft] = useState(START_MARBLES);

  /** Mirror sim → React without flooding setState every frame. */
  const syncHud = useEffectEvent(() => {
    setPhase(phaseRef.current);
    setScore(scoreRef.current);
    setHighScore(highRef.current);
    setWave(waveRef.current);
    setMarblesLeft(marblesLeftRef.current);
  });

  const persistHigh = useCallback((value: number) => {
    if (value <= highRef.current) return;
    highRef.current = value;
    try {
      localStorage.setItem(HIGH_SCORE_KEY, String(value));
    } catch {
      // Private mode — keep the in-memory best only.
    }
  }, []);

  const burst = useCallback(
    (x: number, y: number, color: string, count = 16) => {
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.35;
        const speed = 1.2 + Math.random() * 3.4;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          life: 0.4 + Math.random() * 0.4,
          color,
        });
      }
    },
    [],
  );

  const spawnWave = useCallback((waveNum: number) => {
    const targets: Target[] = [];
    const count = waveTargetCount(waveNum);
    const coreHp = waveCoreHp(waveNum);

    for (let i = 0; i < count; i += 1) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = W * 0.22 + col * (W * 0.28) + (row % 2 === 1 ? 40 : 0);
      const y = 88 + row * 78;
      const roll = Math.random();
      let kind: TargetKind = "pin";
      if (roll > 0.72) kind = "core";
      else if (roll > 0.55) kind = "bumper";

      const hp = kind === "core" ? coreHp : 1;
      targets.push({
        id: nextIdRef.current++,
        kind,
        x,
        y,
        r: kind === "core" ? 28 : kind === "bumper" ? 22 : 18,
        hp,
        maxHp: hp,
        points: kind === "core" ? 250 : kind === "bumper" ? 40 : 100,
        wobble: Math.random() * Math.PI * 2,
      });
    }

    // Side bumpers give the arena a pinball personality.
    targets.push(
      {
        id: nextIdRef.current++,
        kind: "bumper",
        x: 70,
        y: H * 0.45,
        r: 26,
        hp: 99,
        maxHp: 99,
        points: 20,
        wobble: 0,
      },
      {
        id: nextIdRef.current++,
        kind: "bumper",
        x: W - 70,
        y: H * 0.45,
        r: 26,
        hp: 99,
        maxHp: 99,
        points: 20,
        wobble: 1,
      },
    );

    targetsRef.current = targets;
  }, []);

  const resetRound = useCallback(() => {
    scoreRef.current = 0;
    waveRef.current = 1;
    marblesLeftRef.current = START_MARBLES;
    aimRef.current = 0;
    chargeRef.current = 0;
    chargingRef.current = false;
    nextFireAtRef.current = 0;
    shotsRef.current = [];
    particlesRef.current = [];
    flashesRef.current = [];
    shakeRef.current = 0;
    lastTsRef.current = 0;
    spawnWave(1);
    syncHud();
  }, [spawnWave]);

  const beginPlay = useCallback(() => {
    resetRound();
    phaseRef.current = "playing";
    syncHud();
  }, [resetRound]);

  const togglePause = useCallback(() => {
    if (phaseRef.current === "playing") {
      phaseRef.current = "paused";
      chargingRef.current = false;
      chargeRef.current = 0;
      syncHud();
      return;
    }
    if (phaseRef.current === "paused") {
      phaseRef.current = "playing";
      lastTsRef.current = 0;
      syncHud();
    }
  }, []);

  const fireMarble = useCallback(
    (now: number) => {
      if (phaseRef.current !== "playing") return;
      if (now < nextFireAtRef.current) return;
      if (marblesLeftRef.current <= 0) return;

      const charge = Math.max(0.18, chargeRef.current);
      const speed = shotSpeedFromCharge(charge);
      const vel = aimVelocity(aimRef.current, speed);
      const muzzleX = W / 2 + Math.sin(aimRef.current) * 46;
      const muzzleY = LAUNCHER_Y - Math.cos(aimRef.current) * 46;

      shotsRef.current.push({
        id: nextIdRef.current++,
        x: muzzleX,
        y: muzzleY,
        vx: vel.x,
        vy: vel.y,
        life: 4.8,
        trail: [],
      });

      marblesLeftRef.current -= 1;
      chargeRef.current = 0;
      chargingRef.current = false;
      nextFireAtRef.current = now + RELOAD_MS;
      burst(muzzleX, muzzleY, "#ffd27a", 8);
      syncHud();
    },
    [burst],
  );

  const drawLauncher = useCallback(
    (ctx: CanvasRenderingContext2D, aim: number, charge: number) => {
      const cx = W / 2;
      const cy = LAUNCHER_Y;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(aim);

      // Base stand
      ctx.fillStyle = "#1a2d40";
      ctx.fillRect(-34, 8, 68, 22);
      ctx.fillStyle = "#ffb020";
      ctx.fillRect(-28, 12, 56, 6);

      // Barrel body — the B-Daman silhouette
      ctx.fillStyle = "#7ec8ff";
      ctx.beginPath();
      ctx.roundRect(-18, -52, 36, 62, 10);
      ctx.fill();
      ctx.fillStyle = "#0d1a28";
      ctx.fillRect(-8, -58, 16, 18);

      // Charge glow in the magazine window
      if (charge > 0.05) {
        ctx.fillStyle = `rgba(255, 176, 32, ${0.25 + charge * 0.75})`;
        ctx.beginPath();
        ctx.arc(0, -18, 8 + charge * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Sight line
      ctx.strokeStyle = "rgba(255, 210, 122, 0.35)";
      ctx.setLineDash([6, 8]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -58);
      ctx.lineTo(0, -210 - charge * 40);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();

      // Feet outside rotation so the launcher stays planted
      ctx.fillStyle = "#132536";
      ctx.fillRect(cx - 48, cy + 24, 28, 12);
      ctx.fillRect(cx + 20, cy + 24, 28, 12);
    },
    [],
  );

  const drawTarget = useCallback(
    (ctx: CanvasRenderingContext2D, t: Target, now: number) => {
      const bob =
        Math.sin(now / 320 + t.wobble) * (t.kind === "bumper" ? 1.5 : 3);
      ctx.save();
      ctx.translate(t.x, t.y + bob);

      if (t.kind === "bumper") {
        ctx.fillStyle = "#2b4d6b";
        ctx.beginPath();
        ctx.arc(0, 0, t.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#7ec8ff";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = "#e7f2ff";
        ctx.font = "700 14px IBM Plex Mono, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("◎", 0, 1);
      } else if (t.kind === "core") {
        ctx.fillStyle = "#ff5d4a";
        ctx.beginPath();
        ctx.arc(0, 0, t.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffd27a";
        ctx.beginPath();
        ctx.arc(0, 0, t.r * 0.55, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#071018";
        ctx.font = "700 13px IBM Plex Mono, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${t.hp}`, 0, 1);
      } else {
        ctx.fillStyle = "#ffb020";
        ctx.beginPath();
        ctx.arc(0, 0, t.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#071018";
        ctx.font = "700 16px Syne, Georgia, serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("B", 0, 1);
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

      const gradient = ctx.createLinearGradient(0, 0, 0, H);
      gradient.addColorStop(0, "#163044");
      gradient.addColorStop(1, "#0d1a28");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);

      // Arena rails
      ctx.fillStyle = "#1f364c";
      ctx.fillRect(0, 0, 18, H);
      ctx.fillRect(W - 18, 0, 18, H);
      ctx.fillStyle = "#ffb020";
      ctx.globalAlpha = 0.35;
      ctx.fillRect(0, 0, W, 8);
      ctx.globalAlpha = 1;

      // Floor plate under the B-Daman
      ctx.fillStyle = "#132536";
      ctx.fillRect(0, H - 36, W, 36);
      ctx.fillStyle = "rgba(255, 176, 32, 0.18)";
      ctx.fillRect(W / 2 - 70, H - 36, 140, 8);

      for (const t of targetsRef.current) {
        drawTarget(ctx, t, now);
      }

      for (const shot of shotsRef.current) {
        // Motion trail so fast marbles stay readable
        for (let i = 0; i < shot.trail.length; i += 1) {
          const p = shot.trail[i];
          ctx.globalAlpha = ((i + 1) / shot.trail.length) * 0.35;
          ctx.fillStyle = "#ffd27a";
          ctx.beginPath();
          ctx.arc(p.x, p.y, MARBLE_R * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#ffb020";
        ctx.beginPath();
        ctx.arc(shot.x, shot.y, MARBLE_R, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff3cc";
        ctx.beginPath();
        ctx.arc(shot.x - 3, shot.y - 3, 3, 0, Math.PI * 2);
        ctx.fill();
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
        ctx.font = "700 20px Syne, Georgia, serif";
        ctx.textAlign = "center";
        ctx.fillText(flash.text, flash.x, flash.y);
      }
      ctx.globalAlpha = 1;

      drawLauncher(ctx, aimRef.current, chargeRef.current);

      // Charge meter beside the launcher
      if (chargeRef.current > 0.02) {
        const meterW = 120;
        const meterX = W / 2 - meterW / 2;
        const meterY = H - 22;
        ctx.fillStyle = "#071018";
        ctx.fillRect(meterX, meterY, meterW, 8);
        ctx.fillStyle = "#ffb020";
        ctx.fillRect(meterX, meterY, meterW * chargeRef.current, 8);
      }

      ctx.restore();
    },
    [drawLauncher, drawTarget],
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
        shakeRef.current = Math.max(0, shakeRef.current - 0.55 * dt);

        // Aim with keyboard / hold buttons
        const aimSpeed = 0.045;
        if (keysRef.current.left)
          aimRef.current = clampAim(aimRef.current - aimSpeed * dt);
        if (keysRef.current.right)
          aimRef.current = clampAim(aimRef.current + aimSpeed * dt);

        // Charge while fire is held; release fires.
        const wantsFire = keysRef.current.fire;
        if (wantsFire && !chargingRef.current && now >= nextFireAtRef.current) {
          chargingRef.current = true;
        }
        if (chargingRef.current && wantsFire) {
          // Charge meter is painted on-canvas from chargeRef each frame.
          chargeRef.current = Math.min(1, chargeRef.current + 0.028 * dt);
        }
        if (chargingRef.current && !wantsFire) {
          fireMarble(now);
        }

        // Advance marbles
        const nextShots: Marble[] = [];
        for (const shot of shotsRef.current) {
          shot.vy += 0.085 * dt; // light gravity so arcs feel toy-like
          shot.x += shot.vx * dt;
          shot.y += shot.vy * dt;
          shot.life -= 0.016 * dt;
          shot.trail.push({ x: shot.x, y: shot.y });
          if (shot.trail.length > 8) shot.trail.shift();

          // Wall bounce off side rails
          if (shot.x - MARBLE_R < 18) {
            shot.x = 18 + MARBLE_R;
            shot.vx = Math.abs(shot.vx) * 0.86;
          } else if (shot.x + MARBLE_R > W - 18) {
            shot.x = W - 18 - MARBLE_R;
            shot.vx = -Math.abs(shot.vx) * 0.86;
          }
          if (shot.y - MARBLE_R < 8) {
            shot.y = 8 + MARBLE_R;
            shot.vy = Math.abs(shot.vy) * 0.8;
          }

          let consumed = false;
          for (const target of targetsRef.current) {
            if (
              !circlesOverlap(
                { x: shot.x, y: shot.y, r: MARBLE_R },
                { x: target.x, y: target.y, r: target.r },
              )
            ) {
              continue;
            }

            if (target.kind === "bumper") {
              const dx = shot.x - target.x;
              const dy = shot.y - target.y;
              const len = Math.max(0.001, Math.hypot(dx, dy));
              const nx = dx / len;
              const ny = dy / len;
              const bounced = reflect({ x: shot.vx, y: shot.vy }, nx, ny);
              shot.vx = bounced.x * 0.95;
              shot.vy = bounced.y * 0.95;
              shot.x = target.x + nx * (target.r + MARBLE_R + 1);
              shot.y = target.y + ny * (target.r + MARBLE_R + 1);
              scoreRef.current += target.points;
              persistHigh(scoreRef.current);
              burst(shot.x, shot.y, "#7ec8ff", 10);
              flashesRef.current.push({
                text: `+${target.points}`,
                x: target.x,
                y: target.y - target.r,
                life: 0.7,
                color: "#7ec8ff",
              });
              syncHud();
              break;
            }

            target.hp -= 1;
            burst(
              shot.x,
              shot.y,
              target.kind === "core" ? "#ff5d4a" : "#ffb020",
              target.kind === "core" ? 20 : 14,
            );
            if (target.hp <= 0) {
              scoreRef.current += target.points;
              persistHigh(scoreRef.current);
              flashesRef.current.push({
                text: `+${target.points}`,
                x: target.x,
                y: target.y,
                life: 0.85,
                color: "#ffd27a",
              });
              shakeRef.current = target.kind === "core" ? 8 : 4;
              targetsRef.current = targetsRef.current.filter(
                (entry) => entry.id !== target.id,
              );
            } else {
              flashesRef.current.push({
                text: "HIT",
                x: target.x,
                y: target.y - target.r,
                life: 0.55,
                color: "#ff5d4a",
              });
            }
            consumed = true;
            syncHud();
            break;
          }

          if (!consumed && shot.life > 0 && shot.y < H + 40) {
            nextShots.push(shot);
          }
        }
        shotsRef.current = nextShots;

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
            y: f.y - 0.55 * dt,
            life: f.life - 0.02 * dt,
          }))
          .filter((f) => f.life > 0);

        // Clear destructible targets → next wave (side bumpers always remain).
        const remaining = targetsRef.current.filter((t) => t.kind !== "bumper");
        if (remaining.length === 0 && shotsRef.current.length === 0) {
          waveRef.current += 1;
          marblesLeftRef.current += 4;
          flashesRef.current.push({
            text: `WAVE ${waveRef.current}`,
            x: W / 2,
            y: H / 2,
            life: 1.2,
            color: "#ffb020",
          });
          spawnWave(waveRef.current);
          syncHud();
        }

        // Out of marbles with no live shots → battle over.
        if (
          marblesLeftRef.current <= 0 &&
          shotsRef.current.length === 0 &&
          !chargingRef.current
        ) {
          phaseRef.current = "over";
          syncHud();
        }
      }

      paint(ctx, now);
      rafRef.current = requestAnimationFrame(step);
    },
    [burst, fireMarble, paint, persistHigh, spawnWave],
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
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Paint an idle arena before the first Play press.
    spawnWave(1);
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [spawnWave, step]);

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
          return;
        }
        if (phaseRef.current === "playing") {
          keysRef.current.fire = true;
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
      if (event.key === " " || event.key === "Enter") {
        keysRef.current.fire = false;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [beginPlay, togglePause]);

  const aimFromPointer = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ratioX = W / rect.width;
    const ratioY = H / rect.height;
    const x = (event.clientX - rect.left) * ratioX;
    const y = (event.clientY - rect.top) * ratioY;
    const dx = x - W / 2;
    const dy = LAUNCHER_Y - y;
    aimRef.current = clampAim(Math.atan2(dx, dy));
  };

  const setHold = (side: "left" | "right" | "fire", down: boolean) => {
    keysRef.current[side] = down;
  };

  const overlayTitle = (() => {
    switch (phase) {
      case "ready":
        return "Load B-Daman";
      case "paused":
        return "Paused";
      case "over":
        return "Marbles out";
      case "cleared":
        return "Arena cleared";
      case "playing":
        return "";
      default: {
        const _exhaustive: never = phase;
        return _exhaustive;
      }
    }
  })();

  return (
    <div className={styles.shell}>
      <div className={styles.brandRow}>
        <div>
          <h1 className={styles.brand}>B-Daman</h1>
          <p className={styles.tagline}>
            Aim. Charge. Blast. Clear the arena one marble at a time.
          </p>
        </div>
      </div>

      <div className={styles.hud} aria-live="polite">
        <div className={styles.hudStat}>
          <span className={styles.hudLabel}>Score</span>
          <span className={styles.hudValue}>{score}</span>
        </div>
        <div className={styles.hudStat}>
          <span className={styles.hudLabel}>Wave</span>
          <span className={styles.hudValue}>{wave}</span>
        </div>
        <div className={styles.hudStat}>
          <span className={styles.hudLabel}>Marbles</span>
          <span className={styles.hudValue}>{marblesLeft}</span>
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
          aria-label="B-Daman arena"
          onPointerDown={(event) => {
            if (phaseRef.current !== "playing") return;
            aimFromPointer(event);
            keysRef.current.fire = true;
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (phaseRef.current !== "playing") return;
            if (event.buttons > 0 || keysRef.current.fire)
              aimFromPointer(event);
          }}
          onPointerUp={() => {
            keysRef.current.fire = false;
          }}
          onPointerCancel={() => {
            keysRef.current.fire = false;
          }}
        />

        {phase !== "playing" ? (
          <div className={styles.overlay}>
            <div>
              <h2 className={styles.overlayTitle}>{overlayTitle}</h2>
              <p className={styles.overlayCopy}>
                {phase === "ready"
                  ? "Hold Space / click to charge, release to fire. Aim with ← → or drag. Smash amber pins and red cores. Blue bumpers bounce your marble."
                  : phase === "paused"
                    ? "Press P or resume to keep blasting."
                    : `Score ${score}. Best ${highScore}. Reload and try another wave.`}
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
        <span>
          Aim ← → / A D · Hold Space to charge · Release to fire · P pause
        </span>
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
          Aim L
        </button>
        <button
          type="button"
          className={`${styles.mobileBtn} ${styles.fireBtn}`}
          onPointerDown={() => setHold("fire", true)}
          onPointerUp={() => setHold("fire", false)}
          onPointerLeave={() => setHold("fire", false)}
          onPointerCancel={() => setHold("fire", false)}
        >
          Charge / Fire
        </button>
        <button
          type="button"
          className={styles.mobileBtn}
          onPointerDown={() => setHold("right", true)}
          onPointerUp={() => setHold("right", false)}
          onPointerLeave={() => setHold("right", false)}
          onPointerCancel={() => setHold("right", false)}
        >
          Aim R
        </button>
      </div>
    </div>
  );
}
