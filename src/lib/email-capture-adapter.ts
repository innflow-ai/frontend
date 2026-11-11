export type EmailCaptureLead = {
  email: string;
  variant: "newsletter" | "upsell";
};

/**
 * TODO: Destination is undecided. A Resend audience is the likely pick.
 * The footer form already calls Resend from `src/app/api/newsletter/route.ts`
 * with `RESEND_API_KEY` and `RESEND_NEWSLETTER_SEGMENT_ID`. This adapter does
 * not. It stores nothing and sends no email to the visitor.
 */
export async function deliverEmailCapture(_lead: EmailCaptureLead) {
  return { stored: false as const };
}
