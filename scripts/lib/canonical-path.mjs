// Local audits serve production canonicals from a different origin. Compare
// paths while allowing a trailing slash, but do not hide invalid URL syntax.
export function canonicalPathIssue(canonical, route, origin) {
  try {
    const url = new URL(canonical, origin);
    if (!['http:', 'https:'].includes(url.protocol)) return 'invalid canonical protocol';
    const normalize = (path) => path.replace(/\/$/, '') || '/';
    if (normalize(url.pathname) !== normalize(route)) {
      return `canonical path ${url.pathname} does not match ${route}`;
    }
    if (url.hash || url.search) return 'canonical contains a query or fragment';
    return null;
  } catch {
    return 'invalid canonical URL';
  }
}
