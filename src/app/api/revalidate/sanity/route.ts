import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

type SanityWebhookPayload = {
  _type?: string;
  slug?: string | { current?: string };
};

function payloadSlug(payload: SanityWebhookPayload | null) {
  if (!payload?.slug) return null;
  return typeof payload.slug === "string"
    ? payload.slug
    : (payload.slug.current ?? null);
}

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

    if (body?._type === "post") {
      revalidatePath("/blog");
      revalidatePath("/blog/[slug]", "page");

      return Response.json({ revalidated: true });
    }

    if (body?._type === "productPage") {
      const slug = payloadSlug(body);
      if (slug) revalidatePath(`/products/${slug}`);
      revalidatePath("/products/[slug]", "page");
      revalidatePath("/sitemap.xml");

      return Response.json({ revalidated: true });
    }
    return Response.json(
      { message: "Unsupported document type." },
      { status: 400 },
    );
  } catch (error) {
    console.error("Sanity webhook revalidation failed", error);
    return Response.json(
      { message: "Webhook revalidation failed." },
      { status: 500 },
    );
  }
}
