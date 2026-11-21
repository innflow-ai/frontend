import { BaselaneMultiProperty } from "@/components/baselane-multi-property";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Long-Term Rental Operations | Innflow",
  description:
    "Connect recurring work, property context, and team handoffs across long-term rentals. Keep useful answers and the next steps within reach.",
  path: "/long-term-rentals",
});
export default function Page() {
  return <BaselaneMultiProperty audience="long-term" />;
}
