export const departmentSolutions = [
  {
    slug: "marketing",
    name: "Marketing",
    title: "Bring the launch brief together.",
    description:
      "Collect the latest copy, open questions and sign-offs in one place so the campaign owner can see what still needs a decision.",
    request: "What still needs approval before Friday’s launch?",
    reply:
      "The landing page copy is ready. The email offer still needs a decision from the campaign owner.",
    workflow: "Prepare a launch review",
    steps: [
      {
        title: "Gather the current drafts",
        body: "Give the agent the launch brief and links to the assets your team wants reviewed.",
      },
      {
        title: "Find the gaps",
        body: "Ask for missing owners, conflicting dates and copy that still needs approval. Keep a link to each source.",
      },
      {
        title: "Hand off the decision",
        body: "Share the review in the campaign channel so the owner can resolve the open questions before publication.",
      },
    ],
  },
  {
    slug: "it-engineering",
    name: "IT & Engineering",
    title: "Give each issue a clear handoff.",
    description:
      "Turn a scattered issue report into a brief an engineer can act on, with evidence, an owner and a clear next question.",
    request: "Can you pull together the details for the sign-in issue?",
    reply:
      "I found the original report and the affected browser. The ticket still needs reproduction steps.",
    workflow: "Triage an incoming issue",
    steps: [
      {
        title: "Collect the report",
        body: "Start with the support thread, ticket and links the reporter shared. Identify the affected environment.",
      },
      {
        title: "Separate observations from guesses",
        body: "Summarize the symptoms and list the evidence still needed to reproduce them.",
      },
      {
        title: "Route the brief",
        body: "Send the summary to the engineer on triage with the source thread attached for follow-up.",
      },
    ],
  },
  {
    slug: "sales",
    name: "Sales",
    title: "Follow up while the next step is clear.",
    description:
      "Bring meeting notes, account context and customer questions together in a follow-up your account owner can review.",
    request: "What did we promise to send after the demo?",
    reply:
      "The buyer asked for an integration overview. I drafted a follow-up and flagged the pricing question for you.",
    workflow: "Turn a sales call into a follow-up",
    steps: [
      {
        title: "Start with the conversation",
        body: "Share the call notes and account record with the agent. Ask it to identify commitments on both sides.",
      },
      {
        title: "Draft the response",
        body: "Match each customer question to an approved resource and flag anything that still needs an answer.",
      },
      {
        title: "Review before sending",
        body: "Give the account owner a draft with the promised materials and a proposed next meeting.",
      },
    ],
  },
  {
    slug: "productivity",
    name: "Productivity",
    title: "Pick up where the meeting ended.",
    description:
      "Turn decisions buried in notes into a short list of tasks that people can check, claim and finish.",
    request: "Which actions from our planning meeting still need owners?",
    reply:
      "Two actions have owners. The onboarding checklist still needs someone to take the first draft.",
    workflow: "Make meeting notes actionable",
    steps: [
      {
        title: "Capture decisions",
        body: "Share the notes in a channel and ask the agent to distinguish agreed actions from ideas still under discussion.",
      },
      {
        title: "Confirm ownership",
        body: "Review suggested owners and dates. Leave unassigned work visible for the team to claim.",
      },
      {
        title: "Prepare the next check-in",
        body: "Use the action list to draft an update showing what was completed and where someone needs help.",
      },
    ],
  },
];
