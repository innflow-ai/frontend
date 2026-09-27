/** Product directory order, read column by column. Repeat the five Paper designs. */
export const calendlyStyles = [
  "assistant",
  "scheduling",
  "notetaker",
  "contacts",
  "payments",
] as const;
export type CalendlyStyle = (typeof calendlyStyles)[number];

export const productDesignRoutes = [
  { path: "/platform", title: "Platform" },
  { path: "/integrations", title: "Integrations" },
  { path: "/products/agentic-workflows", title: "Agentic Workflows" },
  { path: "/products/agent-os", title: "Agent OS" },
  { path: "/products/ai-agents", title: "AI Agents" },
  { path: "/products/agent-studio", title: "Agent Studio" },
  { path: "/skills", title: "Agent Skills" },
  { path: "/files-and-documents", title: "Files & Documents" },
  { path: "/features/website", title: "AI Website Builder" },
  { path: "/products/databases", title: "Databases" },
  { path: "/platform/agentic-automation", title: "Agentic Automation" },
  { path: "/platform/self-learning", title: "Self Learning" },
  { path: "/platform/evaluations", title: "Evaluations" },
  {
    path: "/platform/analytics-and-observability",
    title: "Analytics and Observability",
  },
  { path: "/platform/deployment-options", title: "Deployment Options" },
  {
    path: "/platform/security-and-compliance",
    title: "Security and Compliance",
  },
] as const;

export function getProductDesign(path: string | null) {
  const index = productDesignRoutes.findIndex((route) => route.path === path);
  return index < 0 ? undefined : calendlyStyles[index % calendlyStyles.length];
}
