"use client";

import { usePathname } from "next/navigation";
import { SiteCta } from "./site-cta";
import { ProductFooter, SiteFooter } from "./site-footer";

/**
 * Shared marketing footer. Help keeps its own shell: a fixed sidebar, chat
 * button, and mobile bar cover this footer and block its links.
 */
export function SiteCloseAndFooter() {
  const pathname = usePathname();
  if (pathname === "/help") return null;
  return (
    <>
      <SiteCta />
      {pathname === "/" ? <SiteFooter /> : <ProductFooter />}
    </>
  );
}
