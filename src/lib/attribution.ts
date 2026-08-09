import { attributionKeys } from "@/config/site";

export function appendAttribution(
  destination: string,
  source: URLSearchParams,
): string {
  const isRelative = destination.startsWith("/");
  const url = new URL(destination, "https://innflow.ai");

  for (const key of attributionKeys) {
    const value = source.get(key);
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }

  if (isRelative) return `${url.pathname}${url.search}${url.hash}`;

  return url.protocol === "https:" || url.protocol === "http:"
    ? url.toString()
    : `${url.protocol}${url.pathname}${url.search}${url.hash}`;
}

const storagePrefix = "innflow-attribution:";

export function collectAttribution(
  source: URLSearchParams,
  landingPage: string,
  referrer: string,
  storage?: Pick<Storage, "getItem" | "setItem">,
) {
  const collected = new URLSearchParams(source);

  if (!collected.has("landing_page")) {
    collected.set(
      "landing_page",
      storage?.getItem(`${storagePrefix}landing_page`) ?? landingPage,
    );
  }

  const savedReferrer = storage?.getItem(`${storagePrefix}referrer`);
  if (!collected.has("referrer") && (savedReferrer || referrer)) {
    collected.set("referrer", savedReferrer ?? referrer);
  }

  for (const key of attributionKeys) {
    const stored = storage?.getItem(`${storagePrefix}${key}`);
    if (!collected.has(key) && stored) collected.set(key, stored);
    const value = collected.get(key);
    if (value) storage?.setItem(`${storagePrefix}${key}`, value);
  }

  return collected;
}
