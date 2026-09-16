"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function SiteFooterBoundary({
  children,
  preview,
}: {
  children: ReactNode;
  preview: ReactNode;
}) {
  return usePathname() === "/preview/scroll-showcase" ? preview : children;
}
