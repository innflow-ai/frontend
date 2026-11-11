import { appSignup, type StorySection } from "@/content/feature-story";

export const channelsPage = {
  path: "/features/communications",
  title: "Communication channels for people and agents | Innflow",
  description:
    "Let Innflow agents receive and send work in the channels your team already uses, with context, approvals, and a record that lasts after the conversation ends.",
  sections: [
    {
      id: "channels-hero",
      type: "hero",
      title: "Channels: where people and agents already talk",
      subtitle:
        "Work can arrive and continue in a channel, instead of living only in a disposable chat log. Your team can pick it up later without rebuilding the context.",
      primary: { label: "Get started", href: appSignup },
      secondary: { label: "How Channels work", href: "#how-channels-work" },
    },
    {
      id: "channels-position",
      type: "split",
      title: "Agents should meet people in the channels they already use.",
      body: "A channel is the lasting boundary around ongoing work: who is involved, what is happening, and what the team already decided. Innflow agents can receive work on Telegram, the Innflow mailbox, in-app chat, and webhooks. They can send on Slack, Teams, Gmail, Outlook, Resend email, Discord, and WhatsApp templates.",
    },
    {
      id: "share-a-room",
      type: "chips",
      title: "People and agents share the same room.",
      body: "A channel has real participants. Invite teammates and agents into the same conversation, mention the person or agent who should go next, and keep each contribution visible to the group.",
      built: [
        "Receive on Telegram",
        "Receive on the Innflow mailbox",
        "Receive in in-app chat",
        "Receive on webhooks",
        "Send on Slack",
        "Send on Teams",
        "Send on Gmail",
        "Send on Outlook",
        "Send on Resend email",
        "Send on Discord",
        "Send on WhatsApp templates",
      ],
      unbuiltItems: [
        "Receiving on Slack",
        "Receiving on Gmail",
        "Receiving on Outlook",
        "Receiving on WhatsApp",
        "SMS and Twilio",
        "Voice",
        "iMessage",
        "Messenger",
        "Instagram DMs",
        "Signal",
        "Website chat widget",
      ],
    },
    {
      id: "context-survives",
      type: "split",
      title: "The context outlasts the conversation.",
      body: "Goals, files, proof, ownership, approvals, and outcomes stay tied to the work. They do not vanish when the chat goes quiet.",
    },
    {
      id: "work-can-branch",
      type: "split",
      title: "Let the work branch without losing the thread.",
      body: "Keep a focused exchange in a thread, in in-app chat or in the Innflow mailbox. When a branch needs its own ongoing space, with its own participants and handoff, start a dedicated conversation. First-class child workspaces are not in market yet.",
      unbuilt: false,
    },
    {
      id: "judgment",
      type: "split",
      title: "Keep the decision next to the evidence.",
      body: "When a review is needed, the agent raises it in the same place the work already lives. The person who decides can read the rationale and approve without switching tools.",
    },
    {
      id: "persistence",
      type: "status",
      title: "The chat can end. The channel continues.",
      subtitle:
        "You can return the next day, the next week, or after a new agent joins. The brief, the side thread, the approval, and the outcome will still be sitting with the work.",
      rows: [
        { label: "You confirmed the brief and the owners.", state: "Recorded" },
        {
          label: "Research Agent moved research into its own thread.",
          state: "In thread",
        },
        {
          label: "A budget exception was approved by the reviewer.",
          state: "Approved",
        },
        {
          label: "Outreach Agent resumed with that decision.",
          state: "Continued",
        },
      ],
    },
    {
      id: "how-channels-work",
      type: "steps",
      anchor: "how-channels-work",
      title: "How ongoing work moves through a Channel",
      subtitle:
        "Three stages keep collaboration easy to follow, without turning every agent action into noise.",
      steps: [
        {
          title: "Gather.",
          body: "Open a channel around the goal and invite the teammates and agents who will work on it. Connect Telegram, the Innflow mailbox, in-app chat, or a webhook when work should arrive there.",
        },
        {
          title: "Collaborate.",
          body: "Contribute, keep focused work in a thread, and request decisions in context. Send updates to Slack, Teams, email, Discord, or WhatsApp when the team needs them there.",
        },
        {
          title: "Continue.",
          body: "When you return later, that same record should already show the outcome and what happens next.",
        },
      ],
    },
    {
      id: "where-channels-fit",
      type: "cards",
      title: "Where Channels fit",
      cards: [
        {
          title: "Launch work that spans a team",
          body: "Hold research, positioning, outreach, approvals, files, and the final launch decision in one connected place.",
          links: [
            {
              label: "See teammates and agents work in one channel",
              href: "/features/teammates",
            },
          ],
        },
        {
          title: "Orchestrate the work with Workflows",
          body: "Channels hold the shared record. Workflows handle the stages, the owners, the review gates, and the handoffs behind that record.",
          links: [
            {
              label: "Explore AI workflow orchestration",
              href: "/features/workflows",
            },
          ],
        },
      ],
    },
    {
      id: "channels-faq",
      type: "faq",
      title: "Questions about Channels",
      subtitle:
        "What lasts, how work branches, and where people stay in control.",
      questions: [
        {
          question: "What is an Innflow channel?",
          answer:
            "It is a place people and agents can share goals, files, decisions, and visible progress. That place can be in-app chat, the Innflow mailbox, Telegram, or a webhook that brings work in. Agents can also send updates out through Slack, Teams, Gmail, Outlook, Resend, Discord, and WhatsApp templates.",
        },
        {
          question: "How do people and AI agents share context?",
          answer:
            "Both write into the same conversation. The agent answers in the place the question appeared, and any files or review requests sit next to the work that produced them.",
        },
        {
          question: "What stays in an Innflow channel?",
          answer:
            "The channel keeps milestones, risks, handoffs, review requests, acceptance notes, and links to tasks, files, and reports that should last. Detailed run logs remain with the execution that produced them.",
        },
        {
          question: "How are threads different from new conversations?",
          answer:
            "A thread keeps a focused discussion attached to one message. A new conversation is for work that needs its own ongoing space. First-class child workspaces are not available yet.",
          unbuilt: true,
        },
        {
          question: "Is Innflow a replacement for Slack?",
          answer:
            "No. Innflow is a workspace for AI agents and workflow automation. Communication channels sit around that work. Agents can send into Slack today. An agent receiving a Slack message and picking up work from it is not built yet.",
          unbuilt: true,
        },
      ],
    },
    {
      id: "channels-close",
      type: "close",
      title: "Give ongoing work a home.",
      links: [{ label: "Get started", href: appSignup }],
    },
  ] satisfies StorySection[],
};
