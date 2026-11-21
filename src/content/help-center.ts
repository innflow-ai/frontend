export const helpArticles = [
  {
    title: "Connect your tools to Innflow",
    description:
      "Bring your existing apps into your workspace with connected accounts and integrations.",
    category: "Integrations",
    href: "/integrations",
    answer:
      "Explore the integrations directory to find the tools your team uses. A connection needs the right account permissions and access scopes. Confirm the connection and test a workflow before relying on it for live work.",
    keywords: "connect connection not connecting google outlook calendar slack",
  },
  {
    title: "Build your first workflow",
    description:
      "Turn a recurring task into a clear sequence of triggers, actions, and review points.",
    category: "Workflows",
    href: "/features/workflows",
    answer:
      "Start with one recurring task. Identify what starts the work, which information it needs, and the actions that follow. Add a review point before consequential actions, then test the flow with a representative example.",
    keywords: "getting started create automation trigger",
  },
  {
    title: "Set up an AI agent",
    description:
      "Give an agent a clear role, relevant knowledge, and the tools it needs.",
    category: "AI agents",
    href: "/products/agent-studio",
    answer:
      "Define the job the agent should perform and the boundaries it should follow. Connect the relevant knowledge and tools, set review requirements, and evaluate its work on a small task before expanding its responsibilities.",
    keywords: "agent studio assistant setup",
  },
  {
    title: "Add files and knowledge",
    description:
      "Keep the context behind your work available to your team and agents.",
    category: "Knowledge",
    href: "/files-and-documents",
    answer:
      "Use relevant files and documents as shared context for your work. Keep source material current, confirm access permissions, and check that the information an agent uses is appropriate for its task.",
    keywords: "upload document files knowledge data",
  },
  {
    title: "Keep people in the loop",
    description: "Add human review where decisions need a closer look.",
    category: "Workflows",
    href: "/features/workflows",
    answer:
      "Place a review point before consequential handoffs. An agent can prepare an action with supporting context so a person can review, edit, or reject it. Set the review boundary for each workflow.",
    keywords: "approval review human permissions",
  },
  {
    title: "Understand workspace security",
    description:
      "Learn about access boundaries, connected-account permissions, and review controls.",
    category: "Account",
    href: "/platform/security-and-compliance",
    answer:
      "Access depends on workspace permissions, connected-account scopes, and the controls configured for a workflow. Contact the Innflow team to confirm security and deployment requirements for your implementation.",
    keywords: "security privacy compliance settings admin",
  },
  {
    title: "Explore plans and pricing",
    description: "Find the right starting point for your team and workflows.",
    category: "Account",
    href: "/pricing",
    answer:
      "Visit the pricing page for the current plan information. For questions about a plan, billing, or your team's requirements, contact the Innflow team.",
    keywords: "billing subscription payment account plans pricing",
  },
  {
    title: "Follow workflow activity",
    description:
      "Understand execution, review outcomes, and find steps that need attention.",
    category: "Analytics",
    href: "/platform/analytics-and-observability",
    answer:
      "Use execution visibility to review what happened during a workflow and where work needs attention. Inspect the context and outcome of a step before changing or retrying it.",
    keywords: "analytics reporting logs troubleshoot failed run",
  },
  {
    title: "Connect custom tools",
    description:
      "Explore integration options for the systems your team already uses.",
    category: "Integrations",
    href: "/platform/integrations",
    answer:
      "Start by identifying the operation and the system it touches. Review the available connector path, required permissions, and data contract. Talk with the team about custom requirements before using the connection in production.",
    keywords: "api developer custom webhook integrations",
  },
  {
    title: "Bring your team together",
    description:
      "Keep conversations, context, and the next step connected in a shared workspace.",
    category: "Workspace",
    href: "/platform",
    answer:
      "Choose one shared process as your starting point. Bring together the people, tools, and information it depends on, and agree on who owns each step and approval.",
    keywords: "team users workspace admin invite collaboration",
  },
  {
    title: "Learn at your own pace",
    description:
      "Explore articles and resources for getting more from Innflow.",
    category: "Learning",
    href: "/resources",
    answer:
      "Browse the resource library for workflow ideas and product information. If you want help applying a workflow to your team, book a conversation with Innflow.",
    keywords: "learn guide tutorial getting started",
  },
  {
    title: "Discuss deployment options",
    description:
      "Plan a workspace and deployment approach around your requirements.",
    category: "Account",
    href: "/platform/deployment-options",
    answer:
      "Start with the operation you want to support and the systems it touches. Custom deployment requirements are scoped with the Innflow team so the setup fits your security and operational needs.",
    keywords: "deployment hosting enterprise setup",
  },
] as const;

export const helpCategories = [
  { title: "Account", articles: [6, 5, 11] },
  { title: "Integrations", articles: [0, 8] },
  { title: "Workflows", articles: [1, 4, 7] },
  { title: "AI agents", articles: [2, 4] },
  { title: "Admins", articles: [9, 5] },
  { title: "Knowledge", articles: [3] },
  { title: "Workspace", articles: [9, 3] },
  { title: "Analytics", articles: [7] },
  { title: "Getting started", articles: [10, 1, 2] },
];
