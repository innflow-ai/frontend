"use client";

import { useEffect, useRef } from "react";

export function HomepageEntrances() {
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const main = marker.current?.closest("main");
    if (!main || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-home-entered", "");
        observer.unobserve(entry.target);
      }
    });
    const targets = main.querySelectorAll("[data-home-reveal]");
    targets.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      targets.forEach((node) => node.removeAttribute("data-home-entered"));
    };
  }, []);
  return <span ref={marker} hidden />;
}
