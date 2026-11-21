"use client";

import { type ReactNode, useEffect } from "react";

export function BlogArticleShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.blogArticle = "true";
    return () => {
      delete root.dataset.blogArticle;
    };
  }, []);

  return children;
}
