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
      eyebrow: "Teammates",
      title: "Make every AI win",
      emphasis: "useful to the whole team.",
      lines: [
        {
          role: "You",
          text: "Set the week's review and ask the Account Agent to rank what needs attention.",
        },
        { role: "Teammate", text: "I will take the pricing calls." },
        {
          role: "Account Agent",
          text: "The ranked list is back, with the accounts that need action before the review.",
        },
      ],
      chips: ["Review", "Shared channel"],
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
      lines: [
        { role: "You", text: "Outreach Agent, the renewal email is yours." },
      ],
    },
    {
      id: "shared-room",
      type: "split",
      title: "Keep the result in the team's room.",
      body: "People and agents share one channel, so a result becomes team context instead of a private reply in one person's window.",
      lines: [
        {
          role: "Account Agent",
          text: "The accounts that need attention are posted in the shared channel.",
        },
        { role: "Teammate", text: "I will take the next conversation." },
      ],
    },
    {
      id: "next-stage",
      type: "split",
      title: "Move the result into the next stage.",
      body: "Each stage of a workflow shows its owner. The owner might be an agent, a person, or agents working side by side, so finished work can pass to whoever is next.",
      lines: [
        {
          role: "Launch Agent",
          text: "This stage is ready for the launch owner.",
        },
        {
          role: "Launch owner",
          text: "The next stage stays on the same workflow.",
        },
      ],
    },
    {
      id: "judgment-gate",
      type: "split",
      title: "Add a human decision without stalling the work.",
      body: "Approve the work, or send it back with a reason. The same workflow continues from that point.",
      lines: [
        {
          role: "Outreach Agent",
          text: "The draft stays inside the approved terms.",
        },
      ],
      chips: ["Approve", "Send back"],
    },
    {
      id: "shared-access",
      type: "split",
      title: "Grant access without sharing secrets.",
      body: "An agent uses only the connector access your team has approved in the workspace. A teammate connects the account in Innflow. The secret itself is never posted in the channel.",
      lines: [
        {
          role: "Account Agent",
          text: "I need the approved workspace connection, not a secret in the channel.",
        },
        { role: "Teammate", text: "The existing connection is granted." },
      ],
    },
    {
      id: "return-result",
      type: "split",
      title: "Bring the result back to everyone.",
      body: "The answer lands in the channel. The follow-up stays in its thread. Mentions reach the teammate who needs them.",
      lines: [
        { role: "Teammate", text: "Where did this term come from?" },
        {
          role: "Agent",
          text: "It points back to the earlier approval in the same thread.",
        },
      ],
    },
    {
      id: "reuse-agent",
      type: "split",
      title: "Reuse the agent, not only the last answer.",
      body: "Earlier work by an agent remains on the team's record. The next teammate can call that same agent in a single line, rather than rebuilding a private setup.",
      lines: [
        { role: "You", text: "Save this check for the channel." },
        { role: "Teammate", text: "Run that same check on today's signals." },
        {
          role: "Account Agent",
          text: "The same checks return the updated result.",
        },
      ],
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
