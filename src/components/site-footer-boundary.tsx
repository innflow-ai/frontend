"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { usesShowcaseDesign } from "@/lib/showcase-routes";

export function SiteFooterBoundary({
  children,
  preview,
  hotel,
}: {
  children: ReactNode;
  preview: ReactNode;
  hotel: ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === "/help") return null;
  if (
    pathname === "/" ||
    pathname === "/index" ||
    pathname === "/hotel-pms" ||
    pathname?.startsWith("/hotel-pms/")
  )
    return hotel;
  return usesShowcaseDesign(pathname) ? preview : children;
}
