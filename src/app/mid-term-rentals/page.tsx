import { BaselaneMultiProperty } from "@/components/baselane-multi-property";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Mid-Term Rental Operations | Innflow",
  description:
    "Keep mid-term rental operations connected, from property information to recurring tasks and team handoffs, with a clearer view of what comes next.",
  path: "/mid-term-rentals",
});
export default function Page() {
  return <BaselaneMultiProperty audience="mid-term" />;
}
