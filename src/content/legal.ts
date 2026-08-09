export type PolicyKey = "privacy" | "terms" | "cookies" | "eula";

export const legalPolicies: Record<
  PolicyKey,
  { title: string; description: string; path: string; source: string }
> = {
  privacy: {
    title: "Privacy Policy",
    description:
      "Innflow privacy policy supplied through the currently approved Termly policy source.",
    path: "/privacy",
    source:
      "https://app.termly.io/policy-viewer/policy.html?policyUUID=d253192a-6c11-4338-9883-67b3307aea2f",
  },
  terms: {
    title: "Terms of Service",
    description:
      "Innflow terms of service supplied through the currently approved Termly policy source.",
    path: "/terms",
    source:
      "https://app.termly.io/policy-viewer/policy.html?policyUUID=e3ecfb1f-491b-44ed-bad2-1cb1a4465e16",
  },
  cookies: {
    title: "Cookie Policy",
    description:
      "Innflow cookie policy supplied through the currently approved Termly policy source.",
    path: "/cookies",
    source:
      "https://app.termly.io/policy-viewer/policy.html?policyUUID=87795459-3581-453a-abf0-fd364c31e440",
  },
  eula: {
    title: "End User License Agreement",
    description:
      "Innflow end user license agreement supplied through the currently approved Termly policy source.",
    path: "/legal/eula",
    source:
      "https://app.termly.io/policy-viewer/policy.html?policyUUID=a8270e95-5abb-4d3a-a919-3c917dd2f482",
  },
};
