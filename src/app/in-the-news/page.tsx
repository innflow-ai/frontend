import type { Metadata } from "next";
import { BaselaneNews } from "@/components/baselane-news";
export const metadata: Metadata = {
  title: "Industry coverage | innflow",
  alternates: { canonical: "/in-the-news" },
};
export default function Page() {
  return <BaselaneNews />;
}
