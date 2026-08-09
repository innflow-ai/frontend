export const siteConfig = {
  name: "Innflow",
  marketingOrigin:
    process.env.NEXT_PUBLIC_MARKETING_ORIGIN ?? "https://innflow.ai",
  appOrigin: process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.innflow.ai",
  signupUrl:
    process.env.NEXT_PUBLIC_SIGNUP_URL ?? "https://app.innflow.ai/signup",
  demoUrl: process.env.NEXT_PUBLIC_DEMO_URL ?? "/demo",
  contactUrl:
    process.env.NEXT_PUBLIC_CONTACT_URL ??
    "mailto:support@innflow.ai?subject=Property%20operations%20demo",
  supportEmail: "support@innflow.ai",
  analytics: {
    posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    posthogHost:
      process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
  },
  primaryCta: "Book an operations demo",
  secondaryCta: "Watch the workflow",
} as const;

export const navigation = [
  { label: "Product", href: "/features/workflows" },
  { label: "Property management", href: "/property-management" },
  { label: "Integrations", href: "/integrations" },
  { label: "Pricing", href: "/pricing" },
] as const;

export const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
  "landing_page",
  "referrer",
] as const;
