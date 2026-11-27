"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./site-footer.module.css";

export function FooterWorkspace() {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = frame.current;
    if (!scene || typeof IntersectionObserver === "undefined") return;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let request = 0;

    function update() {
      request = 0;
      if (!scene) return;
      const { top, height } = scene.getBoundingClientRect();
      const travel = Math.min(height, window.innerHeight * 0.75);
      const progress = Math.max(0, Math.min(1, (window.innerHeight - top) / Math.max(1, travel)));
      scene.style.setProperty("--workspace-angle", `${40 * (1 - progress)}deg`);
    }
    function queueUpdate() {
      if (!request) request = requestAnimationFrame(update);
    }
    function stop() {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      cancelAnimationFrame(request);
      request = 0;
    }

    const observer = new IntersectionObserver(([entry]) => {
      stop();
      if (!motion.matches) return;
      update();
      if (entry.isIntersecting) {
        window.addEventListener("scroll", queueUpdate, { passive: true });
        window.addEventListener("resize", queueUpdate);
      }
    }, { rootMargin: "32px 0px" });

    function sync() {
      stop();
      observer.disconnect();
      if (motion.matches && scene) {
        update();
        observer.observe(scene);
      } else {
        scene?.style.removeProperty("--workspace-angle");
      }
    }
    sync();
    motion.addEventListener("change", sync);
    return () => {
      stop();
      observer.disconnect();
      motion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div id="footer-workspace" className={styles.workspace}>
      <div ref={frame} className={styles.workspaceScene}>
        <Image className={styles.workspaceWindow} src="/brand/footer-workspace-channel-agents.webp"
          alt="An Innflow workspace showing a creator outreach workflow, its owner, and the team conversation."
          width={5036} height={3136} sizes="(max-width: 1280px) 85vw, 1088px" />
      </div>
    </div>
  );
}
