export type PolicyKey =
  | "privacy"
  | "terms"
  | "cookies"
  | "eula"
  | "acceptableUse";

export const legalPolicies: Record<
  PolicyKey,
  {
    title: string;
    description: string;
    path: string;
    policyId: string;
    source: string;
  }
> = {
  privacy: {
    title: "Privacy Policy",
    description:
      "Learn how Innflow collects, uses, and protects personal data.",
    path: "/legal/privacy-policy",
    policyId: "d253192a-6c11-4338-9883-67b3307aea2f",
    source:
      "https://app.termly.io/policy-viewer/policy.html?policyUUID=d253192a-6c11-4338-9883-67b3307aea2f",
  },
  terms: {
    title: "Terms of Service",
    description: "Review the terms that govern access to and use of Innflow.",
    path: "/legal/terms-of-service",
    policyId: "e3ecfb1f-491b-44ed-bad2-1cb1a4465e16",
    source:
      "https://app.termly.io/policy-viewer/policy.html?policyUUID=e3ecfb1f-491b-44ed-bad2-1cb1a4465e16",
  },
  cookies: {
    title: "Cookie Policy",
    description: "Learn how Innflow uses cookies and similar technologies.",
    path: "/legal/cookie-policy",
    policyId: "87795459-3581-453a-abf0-fd364c31e440",
    source:
      "https://app.termly.io/policy-viewer/policy.html?policyUUID=87795459-3581-453a-abf0-fd364c31e440",
  },
  eula: {
    title: "End User License Agreement",
    description: "Review the license terms that apply to Innflow software.",
    path: "/legal/eula",
    policyId: "a8270e95-5abb-4d3a-a919-3c917dd2f482",
    source:
      "https://app.termly.io/policy-viewer/policy.html?policyUUID=a8270e95-5abb-4d3a-a919-3c917dd2f482",
  },
  acceptableUse: {
    title: "Acceptable Use Policy",
    description:
      "Review the rules that govern acceptable use of Innflow services.",
    path: "/legal/acceptable-use-policy",
    policyId: "d742cdf1-9c7c-43a6-8c83-dabbfddb96d0",
    source:
      "https://app.termly.io/policy-viewer/policy.html?policyUUID=d742cdf1-9c7c-43a6-8c83-dabbfddb96d0",
  },
};
