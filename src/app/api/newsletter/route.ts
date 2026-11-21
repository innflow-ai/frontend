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

  // Honeypot submissions never reach Resend.
  if (body.website) return Response.json({ success: true });
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
  if (!apiKey || !segmentId) return unavailable();

  const resend = (path: string, method = "GET", data?: object) =>
    fetch(`https://api.resend.com${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      ...(data ? { body: JSON.stringify(data) } : {}),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

  try {
    const contactPath = `/contacts/${encodeURIComponent(email)}`;
    const existing = await resend(contactPath);
    if (existing.ok) {
      const contact = await existing.json();
      // Do not reset an existing contact's global unsubscribe preference.
      if (contact.unsubscribed) {
        return Response.json(
          {
            error:
              "We couldn’t complete this signup. Please contact support@innflow.ai.",
          },
          { status: 409 },
        );
      }
      const added = await resend(
        `${contactPath}/segments/${encodeURIComponent(segmentId)}`,
        "POST",
      );
      if (!added.ok) return unavailable();
    } else if (existing.status === 404) {
      const created = await resend("/contacts", "POST", {
        email,
        unsubscribed: false,
        segments: [{ id: segmentId }],
      });
      if (!created.ok) return unavailable();
    } else {
      return unavailable();
    }
    return Response.json({ success: true });
  } catch {
    return unavailable();
  }
}
