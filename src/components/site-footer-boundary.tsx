"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isShowcaseHome, usesShowcaseDesign } from "@/lib/showcase-routes";

export function SiteFooterBoundary({
  children,
  preview,
  homepage,
}: {
  children: ReactNode;
  preview: ReactNode;
  homepage?: ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === "/help") return null;
  if (isShowcaseHome(pathname)) return homepage ?? preview;
  return usesShowcaseDesign(pathname) ? preview : children;
}
