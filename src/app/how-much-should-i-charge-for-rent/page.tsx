import { BaselaneRentCalculator } from "@/components/baselane-rent-calculator";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Rent Comparison Calculator | Innflow",
  description:
    "Compare the rental figures you provide and organize the context for your next pricing review, including property details, expenses, and local requirements.",
  path: "/how-much-should-i-charge-for-rent",
});
export default function Page() {
  return <BaselaneRentCalculator />;
}
