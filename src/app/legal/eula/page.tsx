import { LegalPolicyPage } from "@/components/legal-policy-page";
import { legalPolicies } from "@/content/legal";
import { createPageMetadata } from "@/lib/metadata";

const policy = legalPolicies.eula;
export const metadata = createPageMetadata({
  title: `${policy.title} | Innflow`,
  description: policy.description,
  path: policy.path,
});

export default function EulaPage() {
  return <LegalPolicyPage title={policy.title} source={policy.source} />;
}
