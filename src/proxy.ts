import { randomInt } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import {
  EXPERIENCE_COOKIE,
  EXPERIENCE_HEADER,
  EXPERIENCE_KEY,
  experienceMode,
  isVariant,
  MAX_AGE,
  MEASURE_HEADER,
  publicExperiencePath,
} from "@/lib/marketing-experience";
import {
  type Assignment,
  readExperience,
  signExperience,
} from "@/lib/marketing-experience-signing";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete(EXPERIENCE_HEADER);
  requestHeaders.delete(MEASURE_HEADER);
  const mode = experienceMode(process.env.MARKETING_EXPERIENCE_MODE);
  const secret = process.env.MARKETING_EXPERIENCE_SECRET ?? "";
  const previewAllowed =
    process.env.NODE_ENV === "development" ||
    process.env.VERCEL_ENV === "preview";
  const preview = previewAllowed
    ? request.nextUrl.searchParams.get("experience")
    : null;
  const excluded =
    /bot|crawler|spider|headless|lighthouse|facebookexternalhit/i.test(
      request.headers.get("user-agent") ?? "",
    ) || request.cookies.get("innflow-experiment-exclude")?.value === "1";
  const prefetch =
    request.headers.has("next-router-prefetch") ||
    /prefetch/.test(request.headers.get("purpose") ?? "");
  const active = mode !== "off" || isVariant(preview);
  let assignment: Assignment | null = null;
  let minted = false;

  if (active) {
    assignment = readExperience(
      request.cookies.get(EXPERIENCE_COOKIE)?.value,
      secret,
    );
    if (assignment?.qa && !previewAllowed) assignment = null;
    if (isVariant(preview)) {
      assignment = {
        key: EXPERIENCE_KEY,
        variant: preview,
        issuedAt: Date.now(),
        qa: true,
      };
      minted = true;
    } else if (assignment?.qa && previewAllowed && mode === "experiment") {
      // Keep a deliberately selected preview across all navigation, including automated QA.
    } else if (isVariant(mode) || excluded) {
      assignment = {
        key: EXPERIENCE_KEY,
        variant: excluded ? "control" : (mode as "control" | "new"),
        issuedAt: Date.now(),
        qa: false,
      };
    } else if (!assignment && !prefetch && secret.length >= 32) {
      assignment = {
        key: EXPERIENCE_KEY,
        variant: randomInt(2) === 0 ? "control" : "new",
        issuedAt: Date.now(),
        qa: false,
      };
      minted = true;
    }
    requestHeaders.set(EXPERIENCE_HEADER, assignment?.variant ?? "control");
    requestHeaders.set(
      MEASURE_HEADER,
      mode === "experiment" &&
        assignment &&
        !assignment.qa &&
        !excluded &&
        !prefetch
        ? "1"
        : "0",
    );
  }

  const publicPath = publicExperiencePath(request.nextUrl.pathname);
  const url = request.nextUrl.clone();
  url.pathname = publicPath;
  const response =
    active && publicPath !== request.nextUrl.pathname
      ? NextResponse.redirect(url, 307)
      : NextResponse.next({ request: { headers: requestHeaders } });
  if (active) {
    response.headers.set("Cache-Control", "private, no-store, max-age=0");
    response.headers.set("CDN-Cache-Control", "no-store");
    response.headers.set("Vercel-CDN-Cache-Control", "no-store");
  }
  if (minted && assignment && secret.length >= 32) {
    response.cookies.set(
      EXPERIENCE_COOKIE,
      signExperience(assignment, secret),
      {
        httpOnly: true,
        secure: request.nextUrl.protocol === "https:",
        sameSite: "lax",
        path: "/",
        maxAge: MAX_AGE,
      },
    );
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|component-lab|.*\\..*).*)"],
};
