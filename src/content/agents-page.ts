import { appSignup, type StorySection } from "@/content/feature-story";

export const agentsPage = {
  path: "/products/ai-agents",
  title: "Autonomous AI agents | Innflow",
  description:
    "Hand an outcome to an Innflow agent, follow visible progress, and step in when judgment or approval is needed.",
  sections: [
    {
      id: "agents-hero",
      type: "hero",
      eyebrow: "Agents",
      title: "Hand an outcome",
      emphasis: "to an agent that can keep going.",
      lines: [
        {
          role: "You",
          text: "Tell the agent what done looks like, and where it must stop.",
        },
        {
          role: "Agent",
          text: "Watch the run, and review the result in the same workspace.",
        },
      ],
      chips: ["Brief", "Evidence", "Approval"],
      subtitle:
        "Tell the agent what done looks like, and where it must stop. Watch the run, step in when a judgment is needed, and review the result in the same workspace.",
      primary: { label: "Get started", href: appSignup },
      secondary: { label: "How agents work", href: "#how-agents-work" },
    },
    {
      id: "follow-through",
      type: "features",
      title: "Stop prompting at every step. Watch the follow-through instead.",
      subtitle:
        "The agent keeps authorized work moving inside the limits you set. It does not come back to you after every small step.",
      items: [
        {
          title: "Delegate the finished state, not every click",
          body: "Describe what must be true when the work is complete. Inside those limits, the agent can keep going without a new prompt after each action.",
        },
        {
          title: "Watch the work as it happens",
          body: "The workspace shows progress as it unfolds. The team can inspect the current state instead of waiting for a final answer with no trail.",
        },
        {
          title: "Send the exception to the right person",
          body: "If the agent lacks authority or needs a judgment, it asks the right person. The request arrives with the supporting evidence beside it.",
          actions: ["Approve", "Send back"],
        },
        {
          title: "Come back with a result you can review",
          body: "The agent tells you what changed, what is still open, and which files or decisions back the outcome.",
        },
      ],
    },
    {
      id: "agent-thread",
      type: "dark",
      eyebrow: "A run",
      title: "Each run follows the same shape,",
      emphasis: "so you can tell where any piece of work stands.",
      lines: [
        {
          role: "You",
          text: "Prepare the agreement for signature, and escalate anything outside the approved terms.",
        },
        {
          role: "Agent",
          text: "The draft stays inside policy, and one clause needs a human call.",
        },
        {
          role: "Reviewer",
          text: "Approve the agreement, or request changes.",
        },
        {
          role: "Agent",
          text: "After approval, the agreement goes out for signature with the final document and a term comparison.",
        },
      ],
    },
    {
      id: "continue-or-escalate",
      type: "columns",
      title: "Let the agent keep going. Keep the high-stakes decisions.",
      columns: [
        {
          title: "Agent can continue",
          items: [
            "Research",
            "Drafting",
            "Analysis",
            "Authorized follow-through",
          ],
        },
        {
          title: "Agent must escalate",
          items: [
            "Missing authority",
            "Protected action",
            "Material exception",
            "Judgment call",
          ],
        },
      ],
    },
    {
      id: "how-agents-work",
      type: "steps",
      anchor: "how-agents-work",
      title: "How autonomous execution stays legible",
      subtitle:
        "Each run follows the same shape, so you can tell where any piece of work stands.",
      steps: [
        {
          title: "Brief.",
          body: "You set the outcome and the limits. The rest of the run stays inside that brief.",
        },
        {
          title: "Run.",
          body: "The agent does the work. You check in when you choose to, not because the agent stalled.",
        },
        {
          title: "Escalate.",
          body: "When something needs you, it arrives as a decision, not as a broken run you have to debug.",
        },
        {
          title: "Report.",
          body: "Hold the finished work up to the brief you set at the start.",
        },
      ],
    },
    {
      id: "agents-faq",
      type: "faq",
      title: "Questions about agents",
      questions: [
        {
          question: "What is an Innflow agent?",
          answer:
            "It is an agent built for work you can hand off. You describe the finished state you want. The agent works toward that state and returns when the work is done, or when it needs you.",
        },
        {
          question: "How is an Innflow agent different from a chatbot?",
          answer:
            "A chatbot mostly answers one turn at a time. An Innflow agent can take authorized work through several steps, then bring back progress, questions, evidence, and a finished result.",
        },
        {
          question: "Can I review or stop an agent?",
          answer:
            "Yes. You can open the workspace in the middle of a run, see where things stand and what supports that state, answer a decision the agent has asked, and stop the work if you need to.",
        },
        {
          question: "Does an agent get unlimited access?",
          answer:
            "No. Each agent is held to the tools it may use, the permissions and grants it has, the approvals it must seek, and the bounds of its task.",
        },
        {
          question: "When should an agent ask for help?",
          answer:
            "Escalate when the agent does not have authority, when an action is protected, when a serious exception appears, or when a real judgment call is needed before the work can safely continue.",
        },
      ],
    },
    {
      id: "agents-close",
      type: "close",
      title: "Hand off the outcome. Go back to your own work.",
      links: [{ label: "Get started", href: appSignup }],
    },
  ] satisfies StorySection[],
};
