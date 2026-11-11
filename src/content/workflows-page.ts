import { appSignup, type StorySection } from "@/content/feature-story";

export const workflowsPage = {
  path: "/features/workflows",
  title: "Workflows for multi-agent work | Innflow",
  description:
    "Build visual workflows your agents can run and your team can follow, with clear owners, review gates, and a live record of every step.",
  sections: [
    {
      id: "hero",
      type: "hero",
      eyebrow: "Workflows",
      title: "Give every outcome",
      emphasis: "a path your team can see.",
      subtitle:
        "Build a workflow for the result you want. The owners, the review gates, the progress, and the proof all live in one view.",
      lines: [
        {
          role: "You",
          text: "Build a workflow for the result you want.",
        },
        {
          role: "Launch owner",
          text: "When a review is required, the gate shows who has to decide.",
        },
      ],
      chips: ["Files", "History", "Proof"],
      primary: { label: "Start for free", href: appSignup },
      secondary: { label: "See a launch workflow", href: "#launch-workflow" },
    },
    {
      id: "launch-workflow",
      type: "features",
      anchor: "launch-workflow",
      title: "Product launch",
      items: [
        {
          title: "Product launch",
          nodes: [
            {
              label: "Research",
              owner: "Research Agent",
              agent: true,
              status: "done",
            },
            {
              label: "Positioning",
              owner: "Research Agent",
              agent: true,
              status: "done",
            },
            {
              label: "Build campaign",
              owner: "Launch Agent",
              agent: true,
              status: "running",
            },
            {
              label: "Enablement",
              owner: "Enablement Agent",
              agent: true,
              status: "running",
            },
            {
              label: "Approve launch",
              owner: "Launch owner",
              status: "decision",
            },
            {
              label: "Publish",
              owner: "Launch Agent",
              agent: true,
              status: "waiting",
            },
          ],
        },
      ],
    },
    {
      id: "positioning",
      type: "split",
      eyebrow: "The plan",
      title: "Agents can execute the plan.",
      emphasis: "People can always see the state.",
      body: "The workflow holds one outcome as it moves through agents, tools, waiting time, and decisions. Work inside a stage can adapt. Who hands off, and who has authority, stays written down.",
    },
    {
      id: "ownership",
      type: "features",
      title: "Make it clear who owns each step.",
      items: [
        {
          title: "Make it clear who owns each step.",
          body: "Each step that can run has a named owner, either an agent or a person. When a review is required, the gate shows who has to decide. Work does not disappear into a crowded thread.",
          nodes: [
            {
              label: "Positioning",
              owner: "Research Agent",
              agent: true,
              status: "done",
            },
            {
              label: "Build campaign",
              owner: "Launch Agent",
              agent: true,
              status: "running",
            },
            {
              label: "Enablement",
              owner: "Enablement Agent",
              agent: true,
              status: "running",
            },
            {
              label: "Approve launch",
              owner: "Launch owner",
              status: "waiting",
            },
          ],
        },
        {
          title: "Pause for a decision, not for a status meeting.",
          body: "Agents keep going until they hit a real authority line. The gate brings back the choice, the surrounding context, and the proof together. After that, the same workflow starts again from that point.",
          nodes: [
            { label: "Build campaign", owner: "Complete", status: "done" },
            {
              label: "Approve launch",
              owner: "Waiting on Launch owner",
              status: "decision",
            },
            {
              label: "Publish",
              owner: "Ready after approval",
              status: "waiting",
            },
          ],
          actions: ["Approve", "Send back"],
        },
        {
          title: "Let the workflow wait, then pick back up.",
          body: "The plan already expects pauses, retries, and limited correction. A person, a scheduled time, or an outside event can hold a step. When the wait ends, the workflow continues from the same place. Nobody has to rebuild the context or write a new prompt.",
          nodes: [
            { label: "Build campaign", status: "done" },
            { label: "QA review", owner: "Waiting", status: "waiting" },
            {
              label: "Revise and continue",
              owner: "Resumes in the same workflow",
              status: "running",
            },
          ],
        },
        {
          title: "Open any step and see the work behind it.",
          body: "The graph shows who owns the step and where it stands. Open the run when you need the files, the history, and the proof behind the result.",
          nodes: [
            {
              label: "Approve launch",
              owner: "Launch owner",
              status: "decision",
            },
          ],
        },
      ],
    },
    {
      id: "status",
      type: "status",
      title: "See what needs you, without opening every run.",
      subtitle:
        "Skip the status ask. The workflow already shows the front of the work, who owns it, and why something is blocked.",
      rows: [
        { label: "Launch evidence synthesized", state: "Completed" },
        { label: "Campaign and enablement", state: "In progress" },
        { label: "Launch approval", state: "Waiting on owner" },
      ],
    },
    {
      id: "how-it-works",
      type: "steps",
      title: "From the outcome you want to a loop you can close",
      subtitle:
        "The workflow structures handoffs between agents. It does not script every action they take while the work is underway.",
      steps: [
        {
          title: "Define the outcome.",
          body: "Begin with the finished state you want, the limits around it, and who may decide. Leave the loose task list for later.",
        },
        {
          title: "Assign the team.",
          body: "Put specialist agents on the steps that can run. Put each decision gate with the person or agent who has the authority to close it.",
        },
        {
          title: "Run and recover.",
          body: "Work that is ready moves forward, and its outputs travel with it. You can see when a step is blocked, waiting, failed, or retrying.",
        },
        {
          title: "Review and continue.",
          body: "Read the proof, make the calls that belong to you, and let this same workflow keep going until the outcome is confirmed.",
        },
      ],
    },
    {
      id: "angles",
      type: "cards",
      title: "See Workflows from every angle",
      cards: [
        {
          title: "Run a product launch as a single workflow",
          body: "Keep research, positioning, production, approval, publishing, and later learning in one connected process, without turning yourself into the project manager for every agent.",
          links: [{ label: "See a launch workflow", href: "#launch-workflow" }],
        },
        {
          title: "A launch needs more than a checklist",
          body: "A closer look at ownership, parallel work, human gates, recovery after failure, and what happens after launch day.",
          links: [{ label: "Read the field note", href: "/blog" }],
        },
      ],
    },
    {
      id: "close",
      type: "close",
      title: "Hand off the work. Keep the outcome in view.",
      subtitle:
        "Start with the recurring work your team already carries. Innflow helps turn it into a workflow people and agents can both follow.",
      links: [{ label: "Start for free", href: appSignup }],
    },
  ] satisfies StorySection[],
};
