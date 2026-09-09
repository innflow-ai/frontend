import type { Metadata } from "next";
import { BaselaneDeposits } from "@/components/baselane-deposits";
export const metadata: Metadata = {
  title: "Deposit workflows | innflow",
  alternates: { canonical: "/security-deposit-account" },
};
export default function Page() {
  return <BaselaneDeposits />;
}
