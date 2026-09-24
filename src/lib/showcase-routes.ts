export function isShowcaseHome(pathname: string | null) {
  // Vercel's regenerated root response uses /index in its server pathname.
  // Match the public / route so server and browser render identical chrome.
  return (
    pathname === "/" ||
    pathname === "/index" ||
    pathname === "/preview/scroll-showcase"
  );
}

export function usesShowcaseDesign(pathname: string | null) {
  return (
    isShowcaseHome(pathname) ||
    pathname === "/solutions" ||
    pathname === "/industries" ||
    Boolean(pathname?.startsWith("/industries/"))
  );
}
