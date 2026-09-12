export const EXPERIENCE_KEY = "marketing-experience-v1";
export const EXPERIENCE_COOKIE = "innflow-experience";
export const ATTRIBUTION_COOKIE = "innflow-experiment-attribution";
export const CONSENT_COOKIE = "innflow-analytics-consent";
export const EXPERIENCE_HEADER = "x-innflow-experience";
export const MEASURE_HEADER = "x-innflow-experience-measure";
export const MAX_AGE = 90 * 24 * 60 * 60;
export type ExperienceVariant = "control" | "new";
export type ExperienceMode = "off" | "experiment" | ExperienceVariant;

export function isVariant(value: unknown): value is ExperienceVariant {
  return value === "control" || value === "new";
}

export function experienceMode(value: unknown): ExperienceMode {
  return value === "experiment" || isVariant(value) ? value : "off";
}

// Routes without a counterpart keep their content inside the assigned shell.
export const experienceRoutes = [
  { publicPath: "/", alias: "/BL/BL-home" },
  { publicPath: "/pricing", alias: "/BL/BL-pricing" },
  { publicPath: "/demo", alias: "/BL/BL-demo" },
  { publicPath: "/legal/privacy-policy", alias: "/BL/BL-privacy-policy" },
  { publicPath: "/legal/terms-of-service", alias: "/BL/BL-terms-of-use" },
] as const;

export function publicExperiencePath(path: string) {
  const normalized = path.length > 1 ? path.replace(/\/$/, "") : path;
  if (normalized === "/BL" || normalized === "/homepage-baselane") return "/";
  return (
    experienceRoutes.find((route) => route.alias === normalized)?.publicPath ??
    normalized
  );
}

export function experienceProperties(variant: ExperienceVariant) {
  return {
    [`$feature/${EXPERIENCE_KEY}`]: variant,
    experiment_version: EXPERIENCE_KEY,
  };
}

export function cookieDomain(hostname: string) {
  return hostname === "innflow.ai" || hostname.endsWith(".innflow.ai")
    ? ".innflow.ai"
    : undefined;
}
