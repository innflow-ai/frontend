import { appSignup, type StorySection } from "@/content/feature-story";

export const connectorsPage = {
  path: "/platform/integrations",
  title: "AI agent integrations and connectors | Innflow",
  description:
    "Connect Innflow agents to the tools your team already uses, with approved access, supported actions, and a visible record of what ran.",
  sections: [
    {
      id: "connectors-hero",
      type: "hero",
      eyebrow: "Connectors",
      title: "Connect agents to the tools",
      emphasis: "your work already lives in.",
      lines: [
        {
          role: "You",
          text: "Get the brief current, open a pull request, and message the owners.",
        },
        {
          role: "Launch Agent",
          text: "Notify account owners still needs approval.",
        },
      ],
      chips: ["Brief", "Pull request", "Approval"],
      subtitle:
        "Grant agents the context and actions they are allowed to use. A connected app is not a blank credential, and it is not unlimited authority.",
      primary: { label: "Get started", href: appSignup },
      secondary: { label: "Explore connectors", href: "#connector-catalog" },
    },
    {
      id: "walkthrough",
      type: "steps",
      title: "See one request turn into work inside your tools.",
      subtitle:
        "Start with a request in the workspace. The agent runs only the operations it is allowed to use, then hands the result back.",
      steps: [
        {
          title: "Ask in plain language.",
          body: "Describe the result the team needs. You do not have to chain together commands for each app.",
        },
        {
          title: "Stay inside supported actions.",
          body: "Every connector publishes a clear, limited set of operations the agent can run.",
        },
        {
          title: "Keep the proof with the work.",
          body: "Results, files, and important decisions remain attached to the same record.",
        },
      ],
    },
    {
      id: "work-record",
      type: "features",
      title: "Every connected step stays on one work record.",
      subtitle:
        "The background, the coordination, and the approval that released the work remain in one place. They should not be split across a set of separate app automations.",
      items: [
        {
          title: "Gather context across tools.",
          body: "Agents may use project, customer, document, and conversation context only when you have approved that access.",
        },
        {
          title: "Run the work as one workflow.",
          body: "Connected actions appear as stages in a handoff you can see, rather than as one-off automations inside each app.",
        },
        {
          title: "Leave the hard calls with the team.",
          body: "Approvals, proof, and the finished result stay on the same Innflow record.",
        },
      ],
    },
    {
      id: "connector-catalog",
      type: "catalog",
      anchor: "connector-catalog",
      eyebrow: "Catalog",
      title: "Browse the connector catalog",
      subtitle:
        "Search the tools your team already uses. What appears in a workspace depends on how that workspace is configured.",
      footnote:
        "A connector appears in a workspace when its authorization is configured and enabled. Individual read, write, and trigger actions are exposed separately.",
    },
    {
      id: "connectors-faq",
      type: "faq",
      title: "Questions about connectors",
      subtitle:
        "How connections work, what an agent may do, and where access ends.",
      questions: [
        {
          question: "What are AI agent integrations?",
          answer:
            "They connect an agent to business tools you have approved. The agent can read the relevant context and take only the actions you explicitly allow, instead of working in a chat window with no link to those tools.",
        },
        {
          question: "What is an MCP connector?",
          answer:
            "MCP, or Model Context Protocol, is a way for an AI system to reach tools and context. Innflow uses it as a connection method. Using MCP does not, on its own, allow every action a provider might expose.",
        },
        {
          question: "What can an Innflow agent do in a connected app?",
          answer:
            "Only the actions that connector supports, and only the access you have granted. Those actions are a limited set with bounded inputs, and the workspace keeps the resulting work in view.",
        },
        {
          question: "How is connector access controlled?",
          answer:
            "Access covers the authorized account and the actions that connector supports. Revoking the connection stops future use. Steps with real consequences can still require someone to review them first.",
        },
        {
          question: "Does a listed integration give an agent unlimited access?",
          answer:
            "No. A listing in the catalog is not permission to act. The agent may use only the actions and credentials allowed by Innflow and by the connected account.",
        },
      ],
    },
    {
      id: "connectors-close",
      type: "close",
      title: "Useful access for agents. Full control for your team.",
      links: [{ label: "Get started", href: appSignup }],
    },
  ] satisfies StorySection[],
};
