import { remainingPlatformDetails } from "./platform-remaining";

export type PlatformCapability = {
  id: string;
  label: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  points: string[];
};

export type PlatformDetail = {
  slug: string;
  title: string;
  headline: string;
  description: string;
  intro: string;
  hero: string;
  heroAlt?: string;
  capabilities: PlatformCapability[];
};

const automationAsset = (name: string) =>
  `/brand/platform/agentic-automation/${name}.jpg`;
const learningAsset = (name: string) =>
  `/brand/platform/self-learning/${name === "hub" ? "hub-innflow" : name}.png`;

export const platformDetails: Record<string, PlatformDetail> = {
  ...remainingPlatformDetails,
  "agentic-automation": {
    slug: "agentic-automation",
    title: "Agentic Automation",
    headline: "Give recurring work a clear path forward.",
    description:
      "Bring AI reasoning, connected tools, and human decisions into the same workflow. Explore a more adaptable way to coordinate the work behind every property.",
    intro: "From the first request to the final handoff.",
    hero: "/brand/platform/agentic-automation/hero.png",
    capabilities: [
      {
        id: "reasoning",
        label: "Workflow logic",
        title: "Plan the steps. Make room for judgment.",
        body: "A maintenance request might need a simple status update or a closer look at an unusual repair. Design clear routes for routine work and review points for the decisions that need context.",
        image: automationAsset("reasoning"),
        alt: "Illustration contrasting rule-based steps with agent reasoning",
        points: [
          "Define the expected path",
          "Route exceptions deliberately",
          "Keep the next action visible",
        ],
      },
      {
        id: "variety",
        label: "Different inputs",
        title: "Start with the way information arrives.",
        body: "Resident emails, vendor documents, and team notes rarely follow one format. Map the information your operation needs, then decide how incomplete or ambiguous inputs should reach the right person.",
        image: automationAsset("variety"),
        alt: "Illustration of varied email and document inputs",
        points: [
          "Identify required information",
          "Account for missing context",
          "Review unfamiliar cases",
        ],
      },
      {
        id: "integrations",
        label: "Connected systems",
        title: "Connect the tools involved in the task.",
        body: "Plan each handoff around your property system, inbox, and shared records. Confirm the available connections and account permissions before deciding which actions belong in the workflow.",
        image: automationAsset("integrations"),
        alt: "Connected business application icons",
        points: [
          "Map the systems involved",
          "Scope account access",
          "Choose the system of record",
        ],
      },
      {
        id: "learning",
        label: "Feedback and learning",
        title: "Use experience to refine the process.",
        body: "Capture what a reviewer changed and why. Use recurring corrections to improve instructions for the next maintenance request, invoice, or leasing inquiry.",
        image: automationAsset("learning"),
        alt: "Prompt refinement and testing interface illustration",
        points: [
          "Record useful corrections",
          "Look for recurring issues",
          "Test revised instructions",
        ],
      },
      {
        id: "evaluations",
        label: "Evaluations",
        title: "Define a successful outcome.",
        body: "A completed task is only useful when its result is right. Set expectations for required fields, routing decisions, and the final handoff so your team can assess the whole operation.",
        image: automationAsset("evaluations"),
        alt: "Workflow nodes and evaluation results illustration",
        points: [
          "Check output quality",
          "Review each handoff",
          "Compare against expected results",
        ],
      },
      {
        id: "oversight",
        label: "Human oversight",
        title: "Put people at the right decision points.",
        body: "Give a property manager the context to review a repair estimate or sensitive response. Decide where approval belongs and who takes ownership when a request needs attention.",
        image: automationAsset("oversight"),
        alt: "Human review and approval workflow illustration",
        points: [
          "Set approval responsibilities",
          "Prepare context for reviewers",
          "Keep exceptions accountable",
        ],
      },
      {
        id: "orchestration",
        label: "Agent coordination",
        title: "Make every handoff intentional.",
        body: "Break a larger process into focused responsibilities. A request can move from intake to review to follow-up, with clear expectations for what each step receives and passes on.",
        image: automationAsset("orchestration"),
        alt: "Specialized agents arranged by operational responsibility",
        points: [
          "Separate responsibilities",
          "Define shared context",
          "Assign an owner for exceptions",
        ],
      },
      {
        id: "operations",
        label: "Operational readiness",
        title: "Prepare for everyday use.",
        body: "Before introducing a workflow to your team, work through access, support, and recovery. Agree on who monitors the process and how people step in when circumstances change.",
        image: automationAsset("reasoning"),
        alt: "Structured workflow and agent execution illustration",
        points: [
          "Review access requirements",
          "Plan recovery steps",
          "Establish operational ownership",
        ],
      },
    ],
  },
  "self-learning": {
    slug: "self-learning",
    title: "Self Learning",
    headline: "Turn everyday feedback into better workflows.",
    description:
      "Build a repeatable cycle of review, correction, and validation. Bring your team's property expertise into the way agents handle the next task.",
    intro: "A clearer path from feedback to improvement.",
    hero: "/brand/platform/self-learning/hero.png",
    capabilities: [
      {
        id: "hub",
        label: "Learning workspace",
        title: "Know where to focus next.",
        body: "Bring review findings together so the next improvement starts with a specific problem. Compare the work that needs frequent intervention with the tasks your team already trusts.",
        image: learningAsset("hub"),
        alt: "Learning workspace with tool performance and improvement actions",
        points: [
          "Collect review findings",
          "Prioritize recurring issues",
          "Give improvements an owner",
        ],
      },
      {
        id: "process",
        label: "Learning cycle",
        title: "Follow a correction through to a better result.",
        body: "Keep the original request, the output, and the reviewer's correction together. Use that context to refine the instructions, then rerun representative examples before adopting the change.",
        image: learningAsset("process"),
        alt: "Testing progress beside a prompt optimization panel",
        points: [
          "Preserve the original context",
          "Refine a specific instruction",
          "Compare the revised result",
        ],
      },
      {
        id: "domain",
        label: "Property expertise",
        title: "Bring your team's working knowledge into the process.",
        body: "A property team knows the difference between a routine request and an urgent exception. Document those distinctions with examples that reflect your portfolio, vendors, and responsibilities.",
        image: learningAsset("domain"),
        alt: "Domain knowledge illustration showing connected concepts",
        points: [
          "Explain portfolio conventions",
          "Document escalation rules",
          "Use realistic examples",
        ],
      },
      {
        id: "correction",
        label: "Review and correction",
        title: "Revisit assumptions when results change.",
        body: "Policies, team responsibilities, and vendor arrangements evolve. Review patterns that no longer fit the operation and update the examples your workflow relies on.",
        image: learningAsset("correction"),
        alt: "Feedback scores and task review interface illustration",
        points: [
          "Review unexpected outcomes",
          "Update outdated examples",
          "Keep changes reviewable",
        ],
      },
      {
        id: "feedback",
        label: "Team feedback",
        title: "Make a useful correction easy to capture.",
        body: "A reviewer can explain a missed detail, show a better response, or flag the wrong routing decision. Keep feedback close to the task so its meaning survives the handoff.",
        image: learningAsset("feedback"),
        alt: "Feedback form for explaining an incorrect result",
        points: [
          "Flag an issue in context",
          "Provide the expected output",
          "Record why it matters",
        ],
      },
      {
        id: "validation",
        label: "Validation",
        title: "Check the change before relying on it.",
        body: "A better answer to one request should still work for the rest of your operation. Compare revised behavior against familiar cases, unusual inputs, and the approval paths your team expects.",
        image: learningAsset("validation"),
        alt: "Test Changes and Publish controls in a workflow illustration",
        points: [
          "Retest the original issue",
          "Check previously working cases",
          "Review before rollout",
        ],
      },
      {
        id: "tracking",
        label: "Improvement tracking",
        title: "Look for progress across real work.",
        body: "Track the outcomes that matter to your team: fewer repeated corrections, clearer handoffs, and less time spent revisiting a task. Review trends alongside the examples behind them.",
        image: learningAsset("tracking"),
        alt: "Weekly, monthly, and quarterly accuracy trend controls",
        points: [
          "Choose meaningful measures",
          "Review trends over time",
          "Inspect the underlying examples",
        ],
      },
      {
        id: "team",
        label: "Shared learning",
        title: "Build a review habit your team can sustain.",
        body: "Start with one recurring operation and a regular review cadence. Share the changes with the people who handle the work, and carry useful lessons into the next workflow.",
        image: learningAsset("team"),
        alt: "Illustrative learning curve for agent workflows",
        points: [
          "Start with a focused process",
          "Schedule regular reviews",
          "Share useful lessons",
        ],
      },
    ],
  },
};

export function getPlatformDetail(slug: string) {
  return Object.hasOwn(platformDetails, slug)
    ? platformDetails[slug]
    : undefined;
}
