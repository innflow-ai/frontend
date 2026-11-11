import { appSignup, type StorySection } from "@/content/feature-story";

export const agentMemoryPage = {
  path: "/features/agent-memory",
  title: "Persistent agent memory for ongoing work | Innflow",
  description:
    "Help Innflow agents carry relevant goals, decisions, evidence, and project history across tasks so ongoing work can continue.",
  sections: [
    {
      id: "memory-hero",
      type: "hero",
      eyebrow: "Agent memory",
      title: "Agents that remember",
      emphasis: "the work itself",
      lines: [
        {
          role: "You",
          text: "Draft the announcement from the locked brief.",
        },
        {
          role: "Launch Agent",
          text: "The next task starts from the decision the team already made.",
        },
      ],
      chips: ["Goal", "Decision", "Evidence"],
      subtitle:
        "Work continues from what the team already settled, instead of restarting at an empty prompt.",
      primary: { label: "Get started", href: appSignup },
      secondary: { label: "How memory works", href: "#how-memory-works" },
    },
    {
      id: "memory-units",
      type: "columns",
      title: "Pick the work up without rebuilding it.",
      subtitle:
        "Useful memory is not a full transcript of every token an agent has seen. It is the slice of the work a teammate would still recognize, and that the agent is allowed to use.",
      columns: [
        {
          title: "What a later task can use",
          items: [
            "Goal. The outcome the team is aiming for.",
            "Decisions. Approvals, changes, and things the team ruled out.",
            "Evidence. Supporting files and results.",
            "History. A record of finished work, and of work that is still open.",
          ],
        },
      ],
    },
    {
      id: "memory-comparison",
      type: "comparison",
      tone: "inverse",
      eyebrow: "The next run",
      title: "The next run begins",
      emphasis: "with the last decision already attached.",
      subtitle:
        "Pick up from the current project state. You should not have to paste an old conversation into a fresh window.",
      links: [
        {
          label: "See how teammates continue the same work",
          href: "/features/teammates",
        },
      ],
      sides: [
        {
          title: "Without agent memory",
          items: [
            "You open a new chat and recap last week's direction, the choice the team made, and the open constraints.",
            "The agent has to ask which brief is current, and whether the last approval still stands.",
          ],
        },
        {
          title: "With agent memory",
          items: [
            "Earlier, the team locked a direction and recorded it in the brief, including the open step that remained.",
            "Later, you ask the agent to draft the announcement. The agent reads the locked brief and writes inside the decision the team already made.",
          ],
        },
      ],
    },
    {
      id: "how-memory-works",
      type: "steps",
      anchor: "how-memory-works",
      title:
        "These three steps decide if the next task starts with context or starts blank.",
      subtitle:
        "Each step leaves something a person can open, so what an agent carries forward can be checked, instead of only implied.",
      steps: [
        {
          title: "Capture.",
          body: "At the end of a run, the outcome is written back to the channel that requested the work.",
        },
        {
          title: "Retrieve.",
          body: "The next task may load only the records the requester is allowed to see.",
        },
        {
          title: "Continue.",
          body: "The team can see the prior outcome and the next step as work resumes.",
        },
      ],
    },
    {
      id: "guardrails",
      type: "columns",
      title: "Memory is not a complete recall of everything.",
      columns: [
        {
          title: "What memory covers",
          items: [
            "Scoped. Memory belongs only to the work, and to the workspace, that produced it.",
            "Relevant. The agent is given what helps the current task. It is not given every earlier message by default.",
          ],
        },
        {
          title: "What memory answers to",
          items: [
            "Permission-aware. If someone loses access to the source, that loss must not grant new authority through memory.",
            "Inspectable. The people responsible for the record can still see it.",
          ],
        },
      ],
    },
    {
      id: "memory-faq",
      type: "faq",
      title: "Questions about agent memory",
      subtitle: "What memory is, what it keeps, and what it does not mean.",
      questions: [
        {
          question: "What is AI agent memory?",
          answer:
            "It is Innflow's kept record of the work. An agent that starts a task in a channel can read what is already there, so the team does not have to retell the story.",
        },
        {
          question: "How is agent memory different from a long context window?",
          answer:
            "A context window is only the information a model can see during one inference. Agent memory lasts beyond that run. A later task, even in a new session or on a different model, can retrieve the same record.",
        },
        {
          question: "What can an Innflow agent remember?",
          answer:
            "Memory is limited to the work already stored in the channel the agent is using. People in that channel can see the same material. The agent cannot jump into work it never touched, and it cannot enter a channel the requester cannot open.",
        },
      ],
    },
    {
      id: "memory-close",
      type: "close",
      title: "Begin the next task from the point the last one reached.",
      links: [{ label: "Get started", href: appSignup }],
    },
  ] satisfies StorySection[],
};
