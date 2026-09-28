"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { usesShowcaseDesign } from "@/lib/showcase-routes";

export function SiteFooterBoundary({
  children,
  preview,
}: {
  children: ReactNode;
  preview: ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === "/help") return null;
  return usesShowcaseDesign(pathname) ? preview : children;
}
