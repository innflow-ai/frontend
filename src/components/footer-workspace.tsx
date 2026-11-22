"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./site-footer.module.css";

const Backdrop = dynamic(() => import("./footer-workspace-backdrop"), { ssr: false });

export function FooterWorkspace() {
  const frame = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    const element = frame.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const preference = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const sync = () => setMotion(preference.matches && !document.hidden);
    sync();
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const trail = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const scene = frame.current;
    const canvas = trail.current;
    if (!visible || !motion || !scene || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lifetime = 260;
    let points: { x: number; y: number; time: number }[] = [];
    let request = 0;

    function draw(now: number) {
      if (!canvas || !ctx) return;
      points = points.filter(point => now - point.time < lifetime);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = "round";
      for (let i = 1; i < points.length; i++) {
        const point = points[i];
        const strength = 1 - (now - point.time) / lifetime;
        ctx.strokeStyle = `rgba(255, 255, 255, ${strength * 0.9})`;
        ctx.lineWidth = 0.5 + strength * 1.8;
        ctx.beginPath();
        ctx.moveTo(points[i - 1].x, points[i - 1].y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
      request = points.length ? requestAnimationFrame(draw) : 0;
    }

    function follow(event: PointerEvent) {
      if (!scene || !canvas || !ctx || event.pointerType === "touch") return;
      const box = scene.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(box.width * ratio);
      const height = Math.round(box.height * ratio);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        points = [];
      }
      const x = event.clientX - box.left;
      const y = event.clientY - box.top;
      scene.style.setProperty("--workspace-pan-x", `${(0.5 - x / box.width) * 8}%`);
      scene.style.setProperty("--workspace-pan-y", `${(0.5 - y / box.height) * 8}%`);
      points.push({ x, y, time: performance.now() });
      if (!request) request = requestAnimationFrame(draw);
    }

    function reset() {
      scene?.style.removeProperty("--workspace-pan-x");
      scene?.style.removeProperty("--workspace-pan-y");
    }
    const enter = () => { points = []; };
    scene.addEventListener("pointerenter", enter);
    scene.addEventListener("pointermove", follow);
    scene.addEventListener("pointerleave", reset);
    return () => {
      scene.removeEventListener("pointerenter", enter);
      scene.removeEventListener("pointermove", follow);
      scene.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(request);
      reset();
    };
  }, [visible, motion]);

  return (
    <div id="footer-workspace" className={styles.workspace}>
      <div ref={frame} className={styles.workspaceScene}>
        {visible && motion && <>
          <div className={styles.workspaceLandscape}><Backdrop /></div>
          <canvas ref={trail} className={styles.workspaceTrail} aria-hidden="true" />
        </>}
        <Image className={styles.workspaceWindow} src="/brand/footer-workspace-window.webp"
          alt="An Innflow workspace showing a creator outreach workflow, its owner, and the team conversation."
          width={1920} height={1174} sizes="(max-width: 1280px) 85vw, 1088px" />
      </div>
    </div>
  );
}
