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
  return usesShowcaseDesign(usePathname()) ? preview : children;
}
