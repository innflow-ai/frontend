"use client";

import { useEffect } from "react";

/** Nav and footer wordmarks use #202020 on the six feature pages. */
export function FeaturePageInk() {
  useEffect(() => {
    document.documentElement.dataset.logoInk = "feature";
    return () => {
      delete document.documentElement.dataset.logoInk;
    };
  }, []);
  return null;
}
