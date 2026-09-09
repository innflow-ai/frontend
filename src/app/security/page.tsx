import type { Metadata } from "next";
import { BaselaneSecurity } from "@/components/baselane-security";
export const metadata: Metadata = {
  title: "Security and governance | innflow",
  alternates: { canonical: "/security" },
};
export default function Page() {
  return <BaselaneSecurity />;
}
