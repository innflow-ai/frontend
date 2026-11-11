import { siteConfig } from "@/config/site";

/**
 * Structure follows the live Flow page at offloop.org/features/flow:
 * hero, four feature rows, a status list, four steps, two cards, close.
 * Sentences are Innflow's, from existing product copy. Not theirs.
 */
export const workflowsPage = {
  path: "/products/agentic-workflows",
  title: "Workflows | Innflow",
  description:
    "A visual, reviewable path for a recurring handoff: trigger, steps, a person where you mark a review, and a record of the run.",
  hero: {
    title: "Every handoff.",
    emphasis: "One path you can inspect.",
    subtitle:
      "Turn a recurring request into a workflow with a trigger, an owner, and a review your team can see.",
    primary: { label: "Book a demo", href: siteConfig.demoUrl },
    secondary: { label: "See an example", href: "#example" },
  },
  example: {
    unverified: true,
    hidden: false,
    label: "Example",
    name: "Maintenance intake",
    progress: "2 of 4",
    steps: [
      { name: "Capture the request", owner: "Workflow" },
      { name: "Prepare the next step", owner: "Agent" },
      { name: "Review before it goes out", owner: "Person" },
      { name: "Follow up", owner: "Workflow" },
    ],
  },
  plan: {
    title: "A plan the team can read.",
    subtitle:
      "The workflow keeps the sequence visible. An agent can work inside a step. A person still owns the review you mark.",
    rows: [
      {
        unverified: true,
        hidden: false,
        title: "Show who owns the step",
        body: "Each step names an agent or a person, so the next move is not left in a side conversation.",
      },
      {
        title: "Pause where a person decides",
        body: "The workflow waits at the review you set. The person sees the request and the context attached to it.",
      },
      {
        unverified: true,
        hidden: false,
        title: "Keep the exception on the path",
        body: "Plan the retry and the unfinished work in the same workflow, with an owner, instead of starting a new thread.",
      },
      {
        title: "Open the run",
        body: "Drafts and deployed runs stay in one list. Open a run when you need the record of what happened.",
      },
    ],
  },
  attention: {
    unverified: true,
    hidden: false,
    title: "See what is waiting.",
    subtitle:
      "Open the workflow instead of asking for a status. The next step and its owner are on it.",
    rows: [
      { name: "Request recorded", state: "Draft" },
      { name: "Next step prepared", state: "Needs review" },
      { name: "Follow-up held", state: "Waiting on a person" },
    ],
  },
  loop: {
    title: "From the first trigger to the follow-up.",
    subtitle:
      "The workflow holds the handoffs. It does not replace the system of record.",
    steps: [
      {
        title: "Name the outcome",
        body: "Start with the result, and with the step where a person has to decide.",
      },
      {
        unverified: true,
        hidden: false,
        title: "Assign the steps",
        body: "Give a step to an agent or a teammate. Attach only the tools and records that step needs.",
      },
      {
        title: "Run it",
        body: "A trigger starts the path. Connected actions follow the steps you set.",
      },
      {
        unverified: true,
        hidden: false,
        title: "Review and continue",
        body: "The reviewer decides. The same workflow picks up from that step.",
      },
    ],
  },
  angles: {
    title: "Two ways in.",
    cards: [
      {
        title: "Start with one intake",
        body: "Collect a maintenance request, classify it, and route it to the owner who already handles that work.",
        href: "#example",
        label: "See the example",
      },
      {
        title: "A closer article",
        body: "TODO: Julian to confirm a published Innflow article for this card.",
        href: null,
        label: null,
      },
    ],
  },
  close: {
    title: "Hand off the step.",
    emphasis: "Keep the record.",
    subtitle: "Bring one recurring handoff your team already understands.",
    cta: { label: "Book a demo", href: siteConfig.demoUrl },
  },
};

/** Unverified sections stay visible. Set `hidden: true` on one section to remove it. */
export function showWorkflowSection(section: { hidden?: boolean }) {
  return section.hidden !== true;
}
