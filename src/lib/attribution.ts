import { attributionKeys } from "@/config/site";

export function appendAttribution(
  destination: string,
  source: URLSearchParams,
): string {
  const url = new URL(destination, "https://innflow.ai");

  for (const key of attributionKeys) {
    const value = source.get(key);
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }

  if (!url.searchParams.has("landing_page")) {
    const landingPage = source.get("landing_page");
    if (landingPage) url.searchParams.set("landing_page", landingPage);
  }

  return url.protocol === "https:" || url.protocol === "http:"
    ? url.toString()
    : `${url.protocol}${url.pathname}${url.search}${url.hash}`;
}
