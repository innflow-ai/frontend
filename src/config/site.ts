export const siteConfig = {
  name: "Innflow",
  marketingOrigin:
    process.env.NEXT_PUBLIC_MARKETING_ORIGIN ?? "https://innflow.ai",
  appOrigin: process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.innflow.ai",
  signupUrl:
    process.env.NEXT_PUBLIC_SIGNUP_URL ?? "https://app.innflow.ai/signup",
  demoUrl:
    process.env.NEXT_PUBLIC_DEMO_URL ??
    "mailto:support@innflow.ai?subject=Property%20operations%20demo",
  supportEmail: "support@innflow.ai",
  primaryCta: "Book an operations demo",
  secondaryCta: "Watch the workflow",
} as const;

export const navigation = [
  { label: "Platform", href: "#platform" },
  { label: "Property management", href: "#property-management" },
  { label: "Integrations", href: "#integrations" },
  { label: "How it works", href: "#walkthrough" },
] as const;

export const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "msclkid",
] as const;
