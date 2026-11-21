import { BaselaneSecurity } from "@/components/baselane-security";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Security and Governance | Innflow",
  description:
    "Explore access controls, data handling, and operational governance with Innflow. Discuss the security requirements for your workflows and team.",
  path: "/security",
});
export default function Page() {
  return <BaselaneSecurity />;
}
