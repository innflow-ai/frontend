import { type NextRequest, NextResponse } from "next/server";
import {
  ATTRIBUTION_COOKIE,
  CONSENT_COOKIE,
  cookieDomain,
  EXPERIENCE_COOKIE,
  experienceMode,
} from "@/lib/marketing-experience";
import {
  readAttribution,
  readExperience,
  signExperience,
} from "@/lib/marketing-experience-signing";

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin)
    return new NextResponse(null, { status: 403 });
  const response = NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } },
  );
  const options = {
    httpOnly: true,
    secure: request.nextUrl.protocol === "https:",
    sameSite: "lax" as const,
    path: "/",
    domain: cookieDomain(request.nextUrl.hostname),
  };
  if (request.cookies.get(CONSENT_COOKIE)?.value !== "granted") {
    response.cookies.set(ATTRIBUTION_COOKIE, "", { ...options, maxAge: 0 });
    return response;
  }
  const secret = process.env.MARKETING_EXPERIENCE_SECRET ?? "";
  const assignment = readExperience(
    request.cookies.get(EXPERIENCE_COOKIE)?.value,
    secret,
  );
  if (
    experienceMode(process.env.MARKETING_EXPERIENCE_MODE) !== "experiment" ||
    !assignment ||
    assignment.qa ||
    request.cookies.get("innflow-experiment-exclude")?.value === "1"
  )
    return new NextResponse(null, { status: 204 });
  if (Number(request.headers.get("content-length")) > 1024)
    return new NextResponse(null, { status: 413 });
  const body = await request.json().catch(() => null);
  if (
    typeof body?.distinctId !== "string" ||
    !/^[a-zA-Z0-9_-]{1,200}$/.test(body.distinctId)
  )
    return new NextResponse(null, { status: 400 });
  const existing = readAttribution(
    request.cookies.get(ATTRIBUTION_COOKIE)?.value,
    secret,
  );
  // Keep the original exposure window; later page views must not extend it.
  const exposedAt =
    existing &&
    existing.distinctId === body.distinctId &&
    existing.variant === assignment.variant &&
    existing.issuedAt === assignment.issuedAt
      ? existing.exposedAt
      : Date.now();
  const remaining = Math.floor((exposedAt + 7 * 86400000 - Date.now()) / 1000);
  if (remaining <= 0) return new NextResponse(null, { status: 204 });
  response.cookies.set(
    ATTRIBUTION_COOKIE,
    signExperience(
      { ...assignment, distinctId: body.distinctId, exposedAt },
      secret,
    ),
    { ...options, maxAge: remaining },
  );
  return response;
}
