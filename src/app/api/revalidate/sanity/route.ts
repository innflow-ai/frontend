import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

type SanityWebhookPayload = {
  _type?: string;
};

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return Response.json(
      { message: "Webhook revalidation is not configured." },
      { status: 500 },
    );
  }

  try {
    const { body, isValidSignature } = await parseBody<SanityWebhookPayload>(
      request,
      secret,
      false,
    );

    if (!isValidSignature) {
      return Response.json({ message: "Invalid signature." }, { status: 401 });
    }

    if (body?._type !== "post") {
      return Response.json(
        { message: "Unsupported document type." },
        { status: 400 },
      );
    }

    revalidatePath("/blog");
    revalidatePath("/blog/[slug]", "page");

    return Response.json({ revalidated: true });
  } catch (error) {
    console.error("Sanity webhook revalidation failed", error);
    return Response.json(
      { message: "Webhook revalidation failed." },
      { status: 500 },
    );
  }
}
