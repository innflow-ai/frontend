/** The seven product stories in the Product menu. Numbered artwork comes from
 * the shared Rive manifest. Named artwork comes from the feature Lottie set. */
export type ProductMotion = number | string | { brief: string };
type Scene = {
  title: string;
  body: string;
  motion: ProductMotion;
  id?: string;
};
type Comparison = {
  title: string;
  columns: { title: string; items: string[] }[];
};
type ProductLayout = {
  hero: ProductMotion;
  spotlight: Scene;
  showcase: Scene;
  grid: { title: string; body: string; id?: string; cards: Scene[] };
  comparison: Comparison;
  comparisonId?: string;
  supporting: string[];
};

export const productLayouts = {
  bot: {
    hero: 3,
    spotlight: {
      title: "Set the outcome once.",
      body: "Give the agent the brief, the deadline, and the evidence you want back. It can carry the task forward inside those limits.",
      motion: "describe-the-result-you-need",
    },
    showcase: {
      title: "Watch a run take shape.",
      body: "Follow the sources an agent checks as it works toward a finished report.",
      motion: "follow-the-work-in-progress",
      id: "agent-thread",
    },
    grid: {
      id: "follow-through",
      title: "From the first brief to the final review.",
      body: "Define what the agent can use, see where it needs judgment, and inspect what it brings back.",
      cards: [
        {
          title: "Choose the tools",
          body: "Point the agent to the records and tools it may use for this task.",
          motion: "choose-what-it-can-use",
        },
        {
          title: "Update the brief",
          body: "Add a correction in the conversation. The agent can use the latest instructions as it continues.",
          motion: "keep-the-brief-in-view",
        },
        {
          title: "Step in at a decision",
          body: "Review the evidence beside an approval request before the agent takes the next action.",
          motion: "step-in-at-a-decision",
        },
        {
          title: "Review the result",
          body: "Open the draft and its sources together, then approve it or send back edits.",
          motion: "review-the-finished-work",
        },
      ],
    },
    comparisonId: "continue-or-escalate",
    comparison: {
      title: "Give the agent room to work. Keep the final call.",
      columns: [
        {
          title: "The agent carries forward",
          items: [
            "Research and drafting",
            "Authorized actions",
            "Evidence for review",
          ],
        },
        {
          title: "Your team decides",
          items: [
            "Which tools are available",
            "When a task needs approval",
            "Whether the result meets the brief",
          ],
        },
      ],
    },
    supporting: ["how-agents-work", "agents-faq"],
  },
  flows: {
    hero: "map-the-route-from-start-to-finish",
    spotlight: {
      id: "positioning",
      title: "Give each step an owner.",
      body: "Lay out the path from request to result. Agents can work in parallel while the person approving the launch stays visible.",
      motion: "assign-the-next-step",
    },
    showcase: {
      title: "Follow a product launch.",
      body: "Research feeds positioning, production branches into parallel work, and publishing waits for the launch owner.",
      motion: {
        brief:
          "Trace Research → Positioning, split into Campaign and Enablement, then pause both paths at launch approval.",
      },
    },
    grid: {
      id: "ownership",
      title: "See what moves a workflow forward.",
      body: "The graph keeps the path, its decisions, and its supporting records together.",
      cards: [
        {
          title: "Branch on the result",
          body: "Send work down the appropriate path when a response changes the next step.",
          motion: "branch-when-the-answer-changes",
        },
        {
          title: "Resume after approval",
          body: "The reviewer receives the draft and evidence. Approval resumes the same run.",
          motion: "resume-after-approval",
        },
        {
          title: "Inspect a step",
          body: "Open a stage to find its owner, run history, and proof of completion.",
          motion: {
            brief:
              "Select the launch approval node, open its run drawer, and reveal the owner, approval time, and attached evidence.",
          },
        },
      ],
    },
    comparison: {
      title: "Know who moves next.",
      columns: [
        {
          title: "Agents execute",
          items: [
            "Run assigned stages",
            "Pass along outputs",
            "Wait at a decision gate",
          ],
        },
        {
          title: "People direct",
          items: [
            "Own approval gates",
            "Inspect blocked stages",
            "Confirm the outcome",
          ],
        },
      ],
    },
    supporting: ["launch-workflow", "status", "how-it-works", "angles"],
  },
  channels: {
    hero: "give-a-project-its-own-channel",
    spotlight: {
      id: "channels-position",
      title: "Work where the conversation starts.",
      body: "A teammate can mention an agent in a shared channel. The brief and the reply stay visible to the people doing the work.",
      motion: "bring-an-agent-into-the-thread",
    },
    showcase: {
      id: "persistence",
      title: "Come back to the same conversation.",
      body: "A teammate returning to an account can pick up earlier messages and see what still needs attention.",
      motion: 1,
    },
    grid: {
      title: "Keep the work attached to the conversation.",
      body: "Follow a discussion, its evidence, and the decision that lets work continue.",
      cards: [
        {
          id: "work-can-branch",
          title: "Keep a focused thread",
          body: "Move a side discussion into a thread so the main channel stays easy to follow.",
          motion: "keep-side-conversations-connected",
        },
        {
          id: "context-survives",
          title: "Find an earlier decision",
          body: "Return to the record of what the team agreed and why.",
          motion: "find-the-decision-later",
        },
        {
          id: "judgment",
          title: "Ask in context",
          body: "Bring a reviewer into the discussion with the draft and its supporting facts.",
          motion: "step-in-at-a-decision",
        },
      ],
    },
    comparison: {
      title: "One place to talk. One record to return to.",
      columns: [
        {
          title: "In the conversation",
          items: [
            "Teammates and agents",
            "Focused replies",
            "Approval requests",
          ],
        },
        {
          title: "On the record",
          items: ["Source files", "Decisions and rationale", "Next owners"],
        },
      ],
    },
    supporting: [
      "share-a-room",
      "how-channels-work",
      "where-channels-fit",
      "channels-faq",
    ],
  },
  connections: {
    hero: 4,
    spotlight: {
      id: "walkthrough",
      title: "Start with the result you need.",
      body: "Ask an agent to update a brief or contact an owner. The agent works through the connected tools it has permission to use.",
      motion: 7,
    },
    showcase: {
      title: "See where a connected action went.",
      body: "Keep each tool response with the request that started it so a teammate can trace what changed.",
      motion: {
        brief:
          "Start with a project request, collect a document, post the approved update, and attach each tool receipt to the same work record.",
      },
    },
    grid: {
      id: "work-record",
      title: "Connect the right parts of your tools.",
      body: "Give an agent a specific source and action, then review the work it produces.",
      cards: [
        {
          title: "Choose an approved source",
          body: "Select the tools and records an agent may consult for this task.",
          motion: "choose-what-it-can-use",
        },
        {
          title: "Use a supported action",
          body: "Check the connector's available operations before the agent acts.",
          motion: {
            brief:
              "Open a connector, select its allowed create-record action, and show an unavailable delete action disabled.",
          },
        },
        {
          title: "Check the record",
          body: "Review the returned values alongside the source that supplied them.",
          motion: "check-what-came-back",
        },
      ],
    },
    comparison: {
      title: "Give agents useful access.",
      columns: [
        {
          title: "Agents can use",
          items: [
            "Connected accounts",
            "Supported actions",
            "Approved records",
          ],
        },
        {
          title: "People control",
          items: [
            "Which account is connected",
            "The scope of access",
            "Sensitive approvals",
          ],
        },
      ],
    },
    supporting: ["connector-catalog", "connectors-faq"],
  },
  memory: {
    hero: {
      brief:
        "Lock a launch brief in one conversation. Start a later task and show the agent retrieving that exact approved decision with its source.",
    },
    spotlight: {
      title: "Pick up the thread a week later.",
      body: "An agent can use the earlier conversation to recover the goal and identify what the team left open.",
      motion: 1,
    },
    showcase: {
      title: "Carry a decision into the next draft.",
      body: "A later request can build on the approved direction. The team can inspect the source before accepting the draft.",
      motion: {
        brief:
          "Show Monday’s approved positioning beside Friday’s draft. Highlight the sentence that uses the saved decision and open its source.",
      },
    },
    grid: {
      id: "how-memory-works",
      title: "How a project carries its context forward.",
      body: "Capture the outcome, retrieve the relevant record, and continue from the last decision.",
      cards: [
        {
          title: "Capture the outcome",
          body: "Write the finished result back to the channel that requested it.",
          motion: {
            brief:
              "Complete a run and pin its outcome, evidence, and open next step to the original channel.",
          },
        },
        {
          title: "Retrieve within permissions",
          body: "A later request can use only records its requester may access.",
          motion: {
            brief:
              "Start a new task with two matching records. Retrieve the permitted brief and exclude the restricted one.",
          },
        },
        {
          title: "Continue with context",
          body: "Use the earlier result to prepare a response that the team can review.",
          motion: 5,
        },
      ],
    },
    comparisonId: "guardrails",
    comparison: {
      title: "Keep useful context within reach.",
      columns: [
        {
          title: "What carries forward",
          items: [
            "Project goals",
            "Recorded decisions",
            "Evidence and open work",
          ],
        },
        {
          title: "What governs access",
          items: [
            "Workspace boundaries",
            "Source permissions",
            "Inspectable records",
          ],
        },
      ],
    },
    supporting: ["memory-units", "memory-comparison", "memory-faq"],
  },
  teammates: {
    hero: "bring-an-agent-into-the-thread",
    spotlight: {
      id: "teammates-intro",
      title: "An AI win should be ready for the next teammate.",
      body: "The request, evidence, human decisions, and result live in one shared place. The next teammate can pick up where the first left off.",
      motion: "give-a-project-its-own-channel",
    },
    showcase: {
      title: "Hand off the next move.",
      body: "Assign a named owner in the workspace. The request and the context travel together.",
      motion: 3,
    },
    grid: {
      id: "team-value",
      title: "What makes an AI win work for the whole team.",
      body: "Keep ownership, access, decisions, and the finished result connected.",
      cards: [
        {
          id: "next-owner",
          title: "Name the next owner",
          body: "Give the next step to a named person or agent.",
          motion: "assign-the-next-step",
        },
        {
          id: "shared-room",
          title: "Keep the result in the team's room",
          body: "Share the result in its channel so the whole team can return to it.",
          motion: "give-a-project-its-own-channel",
        },
        {
          id: "next-stage",
          title: "Move to the next stage",
          body: "Hand the output to the person or agent who owns the following stage.",
          motion: "map-the-route-from-start-to-finish",
        },
        {
          id: "judgment-gate",
          title: "Bring in human judgment",
          body: "Approve a draft or send it back with a reason, then continue the same workflow.",
          motion: "resume-after-approval",
        },
        {
          id: "shared-access",
          title: "Grant access to the right tools",
          body: "Authorize the account in Innflow and keep credentials out of the conversation.",
          motion: "choose-what-it-can-use",
        },
        {
          id: "return-result",
          title: "Bring the result back",
          body: "Open the finished work and supporting sources with your teammates.",
          motion: "review-the-finished-work",
        },
        {
          id: "reuse-agent",
          title: "Call on the same agent again",
          body: "A teammate can ask the same agent to repeat a proven check with today's inputs.",
          motion: {
            brief:
              "A teammate opens last week’s check, mentions its agent, and gets today’s result in a new reply linked to the earlier run.",
          },
        },
      ],
    },
    comparisonId: "reuse-vs-control",
    comparison: {
      title: "Let the team reuse the win and keep control.",
      columns: [
        {
          title: "What the team can reuse",
          items: [
            "Agents familiar with the job",
            "Shared context and files",
            "Proven workflows",
          ],
        },
        {
          title: "What people still control",
          items: [
            "Account and device access",
            "Decisions that need review",
            "Scope and ownership",
          ],
        },
      ],
    },
    supporting: [],
  },
  computer: {
    hero: "show-it-a-browser-task",
    spotlight: {
      title: "Hand off the browser work.",
      body: "Tell the agent which site to open and what to find. It can check the record and bring the result back for review.",
      motion: "check-what-came-back",
    },
    showcase: {
      title: "See the form before it goes out.",
      body: "The agent can enter the supplied values and pause so a person can check the prepared form.",
      motion: "prepare-a-form-for-review",
    },
    grid: {
      id: "browser-task",
      title: "Give a browser task clear boundaries.",
      body: "Name the result, set a stopping point, and decide where the finished record belongs.",
      cards: [
        {
          title: "Identify the record",
          body: "Give the agent a site and a specific record to look up.",
          motion: "show-it-a-browser-task",
        },
        {
          title: "Stop at the boundary",
          body: "Ask the agent to pause if a required value is missing or a submission needs review.",
          motion: {
            brief:
              "Open the support ticket, find the missing invoice date, and stop with the Submit button untouched while the agent asks for the date.",
          },
        },
        {
          title: "Send the result to its record",
          body: "Keep the checked values together and send them to the intended record.",
          motion: "send-it-to-the-right-record",
        },
      ],
    },
    comparison: {
      title: "Let the agent prepare. Decide when to submit.",
      columns: [
        {
          title: "The agent handles",
          items: [
            "Authorized site navigation",
            "Record lookup",
            "Preparing fields",
          ],
        },
        {
          title: "You decide",
          items: [
            "Which site it can visit",
            "What to do with missing data",
            "Whether to submit",
          ],
        },
      ],
    },
    supporting: [],
  },
} satisfies Record<string, ProductLayout>;

export type ProductLayoutKey = keyof typeof productLayouts;
export function getProductLayout(key: ProductLayoutKey): ProductLayout {
  return productLayouts[key];
}
