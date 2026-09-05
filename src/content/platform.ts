export const platformPages = [
  {
    slug: "agentic-automation",
    title: "Agentic Automation",
    description:
      "Explore how agents can coordinate tasks, decisions, and human approvals across property operations.",
  },
  {
    slug: "self-learning",
    title: "Self Learning",
    description:
      "Explore how feedback and operational experience can inform improvements to agent workflows.",
  },
  {
    slug: "evaluations",
    title: "Evaluations",
    description:
      "Define what good looks like and evaluate agent behavior against the outcomes your team expects.",
  },
  {
    slug: "analytics-and-observability",
    title: "Analytics and Observability",
    description:
      "Understand workflow outcomes, follow execution, and identify where operations need attention.",
  },
  {
    slug: "integrations",
    title: "Integrations",
    description:
      "Explore the connections between your property systems, team tools, and agent workflows.",
  },
  {
    slug: "deployment-options",
    title: "Deployment Options",
    description:
      "Discuss deployment requirements for your team, from environment and access to operational ownership.",
  },
  {
    slug: "security-and-compliance",
    title: "Security and Compliance",
    description:
      "Explore the access, data handling, and governance requirements behind your property operations.",
  },
] as const;

export function getPlatformPage(slug: string) {
  return platformPages.find((page) => page.slug === slug);
}
