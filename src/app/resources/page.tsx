import type { Metadata } from "next";
import { BaselaneLibrary } from "@/components/baselane-library";
export const metadata: Metadata = {
  title: "Resource library | innflow",
  alternates: { canonical: "/resources" },
};
export default function Page() {
  return <BaselaneLibrary kind="articles" />;
}
