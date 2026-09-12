import { createHmac, timingSafeEqual } from "node:crypto";
import {
  EXPERIENCE_KEY,
  type ExperienceVariant,
  isVariant,
  MAX_AGE,
} from "./marketing-experience";

export type Assignment = {
  key: typeof EXPERIENCE_KEY;
  variant: ExperienceVariant;
  issuedAt: number;
  qa: boolean;
};
export type Attribution = Assignment & {
  distinctId: string;
  exposedAt: number;
};

export function signExperience(
  value: Assignment | Attribution,
  secret: string,
) {
  const body = Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${body}.${createHmac("sha256", secret).update(body).digest("base64url")}`;
}

export function readExperience(
  value: string | undefined,
  secret: string,
  now = Date.now(),
): Assignment | null {
  if (!value || secret.length < 32 || value.length > 2048) return null;
  try {
    const [body, signature, extra] = value.split(".");
    if (!body || !signature || extra) return null;
    const expected = createHmac("sha256", secret).update(body).digest();
    const actual = Buffer.from(signature, "base64url");
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected))
      return null;
    const data = JSON.parse(Buffer.from(body, "base64url").toString());
    if (
      data.key !== EXPERIENCE_KEY ||
      !isVariant(data.variant) ||
      typeof data.qa !== "boolean" ||
      !Number.isFinite(data.issuedAt) ||
      data.issuedAt > now ||
      now - data.issuedAt > MAX_AGE * 1000
    )
      return null;
    return data;
  } catch {
    return null;
  }
}

export function readAttribution(
  value: string | undefined,
  secret: string,
  now = Date.now(),
): Attribution | null {
  const data = readExperience(value, secret, now) as Attribution | null;
  if (
    !data ||
    data.qa ||
    typeof data.distinctId !== "string" ||
    !/^[a-zA-Z0-9_-]{1,200}$/.test(data.distinctId) ||
    !Number.isFinite(data.exposedAt) ||
    data.exposedAt > now ||
    data.exposedAt < data.issuedAt
  )
    return null;
  return data;
}
