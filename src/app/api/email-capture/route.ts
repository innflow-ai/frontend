import { deliverEmailCapture } from "@/lib/email-capture-adapter";

const unavailable = () =>
  Response.json(
    { error: "Signup is temporarily unavailable. Please try again later." },
    { status: 503 },
  );

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return Response.json({ error: "Invalid request." }, { status: 403 });
  }

  let body: { email?: unknown; website?: unknown };
  try {
    const text = await request.text();
    if (text.length > 2048) {
      return Response.json({ error: "Request too large." }, { status: 413 });
    }
    body = JSON.parse(text);
    if (!body || typeof body !== "object") throw new Error("Invalid body");
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.website) return Response.json({ success: true, stored: false });
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }
  try {
    const result = await deliverEmailCapture({ email });
    return Response.json({ success: true, stored: result.stored });
  } catch {
    return unavailable();
  }
}
