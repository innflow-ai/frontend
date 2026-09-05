import type { ProductDetailSection, ProductPage } from "@/lib/product-pages";

const asset = (file: string, alt: string) => ({
  url: `/brand/agent-studio/${file}.png`,
  alt,
});

const capabilities = [
  {
    anchor: "creation-paths",
    label: "Three ways to create",
    title: "Start with a template, a prompt, or a blank canvas",
    body: "Choose the starting point that fits the work. Adapt a reusable skill, describe a workflow to Copilot, or build each step yourself.",
    points: [
      "Reuse a skill for a familiar task",
      "Describe the workflow in plain language",
      "Define custom steps and review points",
    ],
    image: "creation-paths",
  },
  {
    anchor: "visual-builder",
    label: "Visual flow builder",
    title: "Make the logic visible",
    body: "Bring triggers, tools, decisions, and approvals into one workflow. See how a request moves from its first input to the next action, with people involved where judgment matters.",
    points: [
      "Connect reusable workflow steps",
      "Keep conditions and handoffs explicit",
      "Place human review before consequential actions",
    ],
    image: "visual-builder",
  },
  {
    anchor: "connectors",
    label: "Connected tools",
    title: "Build around the tools your team uses",
    body: "Give each workflow the context and connected tools it needs. Keep access scoped to the connected account, and confirm connector availability for your workspace before designing around it.",
    points: [
      "Connect the accounts involved in the task",
      "Respect provider scopes and workspace permissions",
      "Keep your existing system of record",
    ],
    image: "connectors",
  },
  {
    anchor: "templates",
    label: "Template library",
    title: "Start with a repeatable operation",
    body: "Use a reusable skill as the foundation for your next workflow. Tailor the instructions, knowledge, and approval steps to the way your property team actually works.",
    points: [
      "Explore reusable skills",
      "Adapt instructions to your process",
      "Review connections before the first run",
    ],
    image: "templates",
  },
  {
    anchor: "testing",
    label: "Test environment",
    title: "Check the workflow before it goes live",
    body: "Work through representative inputs and review the output at each step. Test the expected path and the exceptions so your team can see what needs attention before relying on the workflow.",
    points: [
      "Use representative, permissioned inputs",
      "Inspect the context and resulting output",
      "Check exceptions and approval paths",
    ],
    image: "testing",
  },
  {
    anchor: "debugging",
    label: "Debug tools",
    title: "Understand what happened, step by step",
    body: "Follow the execution record to the step that needs attention. Review inputs, tool responses, and handoffs together, then adjust the workflow with a clear view of the problem.",
    points: [
      "Trace the execution path",
      "Review inputs and tool responses",
      "Check the change with another test",
    ],
    image: "debugging",
  },
  {
    anchor: "learning",
    label: "Review and improve",
    title: "Turn feedback into a better next run",
    body: "Use reviewed results to refine instructions, knowledge, and workflow logic. Improvements stay deliberate: inspect what changed and validate it before extending the workflow to more work.",
    points: [
      "Review results with your team",
      "Refine instructions and context",
      "Validate changes before expanding usage",
    ],
    image: "learning",
  },
  {
    anchor: "publish",
    label: "Publish and monitor",
    title: "Move from a tested workflow to everyday work",
    body: "Bring the reviewed workflow into your operations with the right triggers, permissions, and approval points. Keep a visible record as work runs, and revisit the workflow as your process changes.",
    points: [
      "Confirm the trigger and connected accounts",
      "Keep review points in the live workflow",
      "Monitor results and exceptions",
    ],
    image: "publish",
  },
];

const cards = [
  [0, "Three paths to your first workflow", "creation-paths"],
  [2, "Your tools, connected", "connectors-tall"],
  [1, "Build workflows visually", "visual-builder-tall"],
  [3, "Start from reusable skills", "templates"],
  [4, "Test before you go live", "testing"],
  [5, "Find the step that needs attention", "debugging"],
  [6, "Improve with reviewed feedback", "learning"],
  [7, "Publish with confidence", "publish"],
] as const;

const detailSections: ProductDetailSection[] = capabilities.map((item) => ({
  _key: `studio-${item.anchor}`,
  _type: "productDetailSection",
  anchor: item.anchor,
  tocLabel: item.label,
  title: item.title,
  body: item.body,
  points: item.points,
  image: asset(item.image, `${item.label} — supplied interface illustration`),
  theme: "light",
  mediaPosition: "right",
}));

export const agentStudioPage: ProductPage = {
  _id: "local-agent-studio",
  _updatedAt: "2026-09-05T00:00:00.000Z",
  title: "Agent Studio",
  slug: "agent-studio",
  category: "Platform",
  seo: {
    title: "Agent Studio — Build, test, and manage AI workflows | innflow",
    description:
      "Explore Agent Studio: a visual workspace for building, testing, and refining AI workflows for property operations.",
    noIndex: false,
  },
  hero: {
    title: "Build, test, and ship AI agents in one workspace",
    body: "Turn everyday property operations into connected workflows. Start with a reusable skill, describe what you need, or build visually. Review each step, test the handoffs, and keep your team in control as work moves forward.",
    image: asset(
      "studio-hero",
      "Modular blue building blocks for Agent Studio",
    ),
    primaryCta: { label: "Explore Agent Studio", destination: "demo" },
  },
  sections: [
    {
      _key: "studio-intro",
      _type: "productIntroSection",
      heading: "From the first idea to a workflow your team can use",
      body: "One connected place to build, test, review, and improve the way work gets done.",
    },
    ...(["five-feature", "supporting-grid"] as const).map(
      (presentation, group) => ({
        _key: `studio-capabilities-${group}`,
        _type: "productCapabilitiesSection" as const,
        presentation,
        cards: cards
          .slice(group === 0 ? 0 : 5, group === 0 ? 5 : 8)
          .map(([index, title, file]) => ({
            _key: `studio-card-${index}`,
            anchor: capabilities[index].anchor,
            title,
            body: capabilities[index].body,
            image: asset(
              file,
              `${capabilities[index].label} — supplied interface illustration`,
            ),
          })),
      }),
    ),
    ...detailSections,
    {
      _key: "studio-final-cta",
      _type: "productFinalCtaSection",
      eyebrow: "Agent Studio",
      heading: "Build your next workflow with innflow",
      body: "Bring one process. Explore how agents, connected tools, and human review can work together for your team.",
      primaryCta: { label: "Book a demo", destination: "contact" },
      secondaryCta: { label: "Get started", destination: "signup" },
    },
  ],
};
