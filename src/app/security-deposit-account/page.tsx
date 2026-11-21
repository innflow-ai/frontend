import { BaselaneDeposits } from "@/components/baselane-deposits";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Deposit Workflows | Innflow",
  description:
    "Organize deposit-related records, requirements, and next steps. Keep property owners, residents, and your team working from connected context.",
  path: "/security-deposit-account",
});
export default function Page() {
  return <BaselaneDeposits />;
}
