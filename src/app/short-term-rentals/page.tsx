import { BaselaneMultiProperty } from "@/components/baselane-multi-property";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Short-Term Rental Operations | Innflow",
  description:
    "Coordinate short-term rental work with connected property details, recurring tasks, and team handoffs, so the next step stays clear.",
  path: "/short-term-rentals",
});
export default function Page() {
  return <BaselaneMultiProperty audience="short-term" />;
}
