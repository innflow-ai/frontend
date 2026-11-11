import { appSignup, type StorySection } from "@/content/feature-story";

export const teammatesPage = {
  path: "/features/teammates",
  title: "A shared workspace for your whole team | Innflow",
  description:
    "Make every AI win useful to the whole team. Innflow keeps teammates, agents, context, decisions, and results together in one shared workspace.",
  sections: [
    {
      id: "teammates-hero",
      type: "hero",
      title: "Make every AI win useful to the whole team.",
      subtitle:
        "Teammates and AI agents work in shared channels. When a result is useful, it arrives with the context, the decisions already made, and the next step the rest of the team needs.",
      primary: { label: "Start for free", href: appSignup },
      secondary: { label: "Create your workspace", href: appSignup },
    },
    {
      id: "teammates-intro",
      type: "beats",
      title: "A useful agent result should be ready for the next teammate.",
      subtitle:
        "Request, context, human decisions, and the result are kept in one place the team shares. People and agents can pick up from that place, rather than starting from scratch.",
      body: "Call an agent in the channel that already shows the goal and the owners.",
      beats: [
        "Start with the team",
        "Keep context attached",
        "Bring in judgment",
        "Share the win",
        "Carry it forward",
      ],
    },
    {
      id: "team-value",
      type: "split",
      title: "What turns an AI result into something the whole team can use.",
      body: "A result gets more valuable when context, ownership, access, decisions, and artifacts stay connected. Innflow gives each of those a real place to live.",
    },
    {
      id: "next-owner",
      type: "split",
      title: "Name the next owner on the work.",
      body: "Name the person or agent who should take the next step. If they are not already in the channel, mentioning them adds them.",
    },
    {
      id: "shared-room",
      type: "split",
      title: "Keep the result in the team's room.",
      body: "People and agents share one channel, so a result becomes team context instead of a private reply in one person's window.",
    },
    {
      id: "next-stage",
      type: "split",
      title: "Move the result into the next stage.",
      body: "Each stage of a workflow shows its owner. The owner might be an agent, a person, or agents working side by side, so finished work can pass to whoever is next.",
    },
    {
      id: "judgment-gate",
      type: "split",
      title: "Add a human decision without stalling the work.",
      body: "Approve the work, or send it back with a reason. The same workflow continues from that point.",
    },
    {
      id: "shared-access",
      type: "split",
      title: "Grant access without sharing secrets.",
      body: "An agent uses only the connector access your team has approved in the workspace. A teammate connects the account in Innflow. The secret itself is never posted in the channel.",
    },
    {
      id: "return-result",
      type: "split",
      title: "Bring the result back to everyone.",
      body: "The answer lands in the channel. The follow-up stays in its thread. Mentions reach the teammate who needs them.",
    },
    {
      id: "reuse-agent",
      type: "split",
      title: "Reuse the agent, not only the last answer.",
      body: "Earlier work by an agent remains on the team's record. The next teammate can call that same agent in a single line, rather than rebuilding a private setup.",
    },
    {
      id: "reuse-vs-control",
      type: "columns",
      title:
        "Let the whole team reuse what worked, and keep control of what matters.",
      subtitle:
        "Agents, context, tools, and proven workflows become shared infrastructure for the team. People still decide who gets access, which calls need judgment, and who owns the work.",
      columns: [
        {
          title: "What the team can reuse",
          items: [
            "Agents that already understand the job",
            "Context and files from earlier work",
            "Workflows that carry a proven process forward",
          ],
        },
        {
          title: "What people still control",
          items: [
            "Who may access each account or device",
            "Which results still need a person's approval",
            "When the owner, the direction, or the scope should change",
          ],
        },
      ],
    },
    {
      id: "teammates-close",
      type: "close",
      title: "Your next AI win should move the whole team, not just one inbox.",
      links: [
        { label: "Start for free", href: appSignup },
        { label: "Create your workspace", href: appSignup },
      ],
    },
  ] satisfies StorySection[],
};
