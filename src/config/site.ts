const appOrigin = (
  process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.innflow.ai"
).replace(/\/$/, "");

export const siteConfig = {
  name: "Innflow",
  marketingOrigin:
    process.env.NEXT_PUBLIC_MARKETING_ORIGIN ?? "https://innflow.ai",
  appOrigin,
  signupUrl: process.env.NEXT_PUBLIC_SIGNUP_URL ?? `${appOrigin}/signup`,
  demoUrl: process.env.NEXT_PUBLIC_DEMO_URL ?? appOrigin,
  contactUrl:
    process.env.NEXT_PUBLIC_CONTACT_URL ??
    "mailto:support@innflow.ai?subject=Property%20operations%20demo",
  supportEmail: "support@innflow.ai",
  analytics: {
    termlyResourceBlockerId:
      process.env.NEXT_PUBLIC_TERMLY_RESOURCE_BLOCKER_ID ??
      "414cd1e3-288d-41cd-9efe-871f9f35e9d1",
    googleTagManagerId:
      process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID ?? "GTM-KBDVHJKF",
    googleAnalyticsId:
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "G-V8ZV0QLZB7",
    apolloAppId:
      process.env.NEXT_PUBLIC_APOLLO_APP_ID ?? "699a291a98d0eb001150d5f3",
    posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    posthogHost:
      process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
  },
  primaryCta: "Book an operations demo",
  secondaryCta: "Watch the workflow",
} as const;

export const navigation = [
  { label: "Product", href: "/products/platform" },
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
