import { LegalPolicyPage } from "@/components/legal-policy-page";
import { legalPolicies } from "@/content/legal";
import { createPageMetadata } from "@/lib/metadata";

const policy = legalPolicies.cookies;
export const metadata = createPageMetadata({
  title: `${policy.title} | Innflow`,
  description: policy.description,
  path: policy.path,
});

export default function CookiePolicyPage() {
  return (
    <LegalPolicyPage
      title={policy.title}
      policyId={policy.policyId}
      source={policy.source}
    />
  );
}
