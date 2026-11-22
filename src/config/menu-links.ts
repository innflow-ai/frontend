export const features = [
  {
    name: "Flows",
    slug: "flow",
    body: "Plan multi-agent work with visible ownership, gates, and progress.",
    href: "/features/workflows",
  },
  {
    name: "Botmode",
    slug: "botmode",
    href: "/products/ai-agents",
    body: "Delegate outcomes while keeping execution visible and reviewable.",
  },
  {
    name: "Channels",
    slug: "channels",
    href: "/features/communications",
    body: "Keep people, agents, files, and decisions in one shared workspace.",
  },
  {
    name: "Connectors",
    slug: "connectors",
    body: "Give agents scoped access to the tools and data your team uses.",
    href: "/platform/integrations",
  },
  {
    name: "Agent Memory",
    slug: "agent-memory",
    body: "Carry relevant goals, decisions, and context across ongoing work.",
    href: "/features/agent-memory",
  },
  {
    name: "Teammates",
    slug: "teammates",
    body: "Agents that work in your Channels like colleagues.",
    href: "/features/teammates",
  },
  {
    name: "Computer",
    slug: "computer",
    href: "/features/computer",
    body: "Mention Codex or Claude Code in a channel and run tasks on your Mac.",
  },
];

export type Item = { name: string; href?: string };

export const resources = [
  {
    name: "Learn",
    more: "/resources",
    items: [
      { name: "Docs", href: "https://docs.innflow.ai" },
      { name: "Blog", href: "/blog" },
      { name: "Resource Library", href: "/resources" },
      { name: "Templates", href: "/templates" },
    ],
  },
  {
    name: "Explore",
    more: "/resources",
    items: [
      { name: "Customer Stories", href: "/our-customers" },
      { name: "Product Updates", href: "/product-updates" },
      { name: "Webinars", href: "/webinars" },
    ],
  },
  {
    name: "Get help",
    more: "/help",
    items: [
      { name: "Help Center", href: "/help" },
      { name: "Contact", href: "/contact" },
      { name: "Partnerships", href: "/partner-with-us" },
    ],
  },
];

export const departments = [
  [
    { name: "Marketing", href: "/solutions/marketing" },
    { name: "IT & Engineering", href: "/solutions/it-engineering" },
    { name: "Customer Service", href: "/industries/customer-service" },
  ],
  [
    { name: "Sales", href: "/solutions/sales" },
    { name: "Operations", href: "/operations" },
    { name: "Finance", href: "/industries/finance" },
  ],
  [
    { name: "HR & Recruitment", href: "/industries/hr-recruitment" },
    { name: "Productivity", href: "/solutions/productivity" },
  ],
];

export const integrations = [
  { name: "Salesforce", href: "/integrations/salesforce" },
  { name: "HubSpot", href: "/integrations/hubspot" },
  { name: "Slack", href: "/integrations/slack" },
  { name: "Google Calendar", href: "/integrations/google-calendar" },
  { name: "OpenAI", href: "/integrations/openai" },
];

