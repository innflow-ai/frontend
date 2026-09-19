export type StatePair = {
  source: string;
  before: readonly string[];
  after: readonly string[];
};
export type FeatureState = {
  title: string;
  body: string;
  artwork: string;
  source: string;
  pair?: StatePair;
};
export type FeatureSection = {
  id: string;
  label: string;
  title: string;
  source: string;
  href: string;
  accent: string;
  imageFirst?: boolean;
  states: readonly FeatureState[];
};
export const assetRoot = "/preview/homepage";

// Section copy: 350:10858; Innflow adaptations: 416:9895 and themed boards.
// The CSV is a URL inventory, not a section/content schema.
export const features: readonly FeatureSection[] = [
  {
    id: "channels",
    label: "Channels & platform",
    title: "Consolidate support.\nKeep the context.",
    source: "350:11199",
    href: "/platform",
    accent: "#6bb0ff",
    states: [
      {
        title: "All your channels, connected",
        body: "Bring conversations and the context behind each request into one connected workspace.",
        artwork: "channels-1",
        source: "405:9891",
      },
      {
        title: "An assistant for your team",
        body: "Give your team the context to research requests, prepare a response, and review the next step.",
        artwork: "channels-2",
        source: "405:9892",
      },
      {
        title: "AI agents, working together",
        body: "Give every handoff a clear owner. Let an agent prepare the work while your team stays close to the decisions.",
        artwork: "channels-3",
        source: "405:9893",
      },
      {
        title: "Workflows that take action",
        body: "Bring request details into the next step. Connect the tools and people involved without losing context.",
        artwork: "channels-4",
        source: "405:9894",
      },
      {
        title: "Insights from every interaction",
        body: "Bring related feedback into one view. Explore recurring themes and decide what deserves a closer look.",
        artwork: "channels-5",
        source: "405:9895",
      },
      {
        title: "Flexible building blocks",
        body: "Shape the workflow around your team, relevant context, and selected connections.",
        artwork: "channels-6",
        source: "405:9896",
      },
    ],
  },
  {
    id: "agents",
    label: "AI agents",
    title: "Your agents.\nOne workspace.",
    source: "350:11344",
    href: "/platform/agentic-automation",
    accent: "#daf098",
    imageFirst: true,
    states: [
      {
        title: "Bring your agents together",
        body: "Choose the right agent for each task. Keep its instructions, context and results together in Innflow.",
        artwork: "agents-hero",
        source: "439:10270",
        pair: {
          source: "417:10140",
          before: [
            "Customer request",
            "Review this request and route it to the right person.",
            "Assign an owner",
            "Attach the context",
            "Choose the next step",
          ],
          after: [
            "Handoff prepared",
            "The agent gathers the context. A teammate reviews the next step.",
            "Context attached",
            "Owner: Operations",
            "Ready for human review",
          ],
        },
      },
      {
        title: "Delegate a task. Review the result.",
        body: "Hand off a focused task, such as summarizing requests or drafting a follow-up. Review the result before taking the next step.",
        artwork: "agents-assistant",
        source: "439:10309",
        pair: {
          source: "417:10141",
          before: [
            "New task",
            "Summarize the latest requests and draft a follow-up.",
            "Source: Team inbox",
            "Output: Reviewable draft",
            "Delegate task",
          ],
          after: [
            "Draft ready",
            "Review the summary and suggested follow-up before sending.",
            "Summary prepared",
            "Follow-up drafted",
            "Open for review",
          ],
        },
      },
      {
        title: "Build your own agents",
        body: "Set the instructions, add relevant context and choose the tools an agent can use. Define the output and where a teammate should review it.",
        artwork: "agents-build",
        source: "439:10324",
        pair: {
          source: "417:10142",
          before: [
            "Agent setup",
            "Set the context and boundaries for this task.",
            "Context: Not added",
            "Instructions: Not added",
            "Tools: Not selected",
          ],
          after: [
            "Agent configured",
            "Give the agent a clear brief for the work ahead.",
            "Context: Help center",
            "Instructions: Draft, then review",
            "Tools: Selected connections",
          ],
        },
      },
    ],
  },
  {
    id: "workflows",
    label: "Workflows",
    title: "Automate the work\nbetween conversations.",
    source: "350:11402",
    href: "/products/agentic-workflows",
    accent: "#ba9dff",
    states: [
      {
        title: "Connect external systems",
        body: "Bring request details into the next step. Connect the tools and people involved without losing the context that makes work move.",
        artwork: "workflows-connect",
        source: "439:10212",
        pair: {
          source: "417:9969",
          before: [
            "Connected actions",
            "Request received",
            "Task details copied by hand",
            "Team notification pending",
            "Waiting for the next handoff",
          ],
          after: [
            "Connected actions",
            "Request context attached",
            "Next action prepared",
            "Team update ready for review",
            "One connected workflow",
          ],
        },
      },
      {
        title: "Route by context",
        body: "Use what a customer is asking to suggest the right owner. Pass along the original context so the next person can pick up the work.",
        artwork: "workflows-ai",
        source: "439:10231",
        pair: {
          source: "417:9986",
          before: [
            "Route by context",
            "New request",
            "I cannot access my account.",
            "Destination not assigned",
            "Review request",
          ],
          after: [
            "Route by context",
            "Intent · Account access",
            "Request context included",
            "Suggested owner · Support",
            "Review suggested route",
          ],
        },
      },
      {
        title: "Auto-triage requests",
        body: "Organize incoming requests with a category, priority and short summary, ready for your team to review.",
        artwork: "workflows-triage",
        source: "439:10242",
        pair: {
          source: "417:10004",
          before: [
            "Triage every request",
            "New conversation",
            "Category · Unassigned",
            "Priority · Not reviewed",
            "Summary awaiting review",
          ],
          after: [
            "Triage every request",
            "Category · Account access",
            "Priority · Needs attention",
            "Summary · Login issue",
            "Ready for team review",
          ],
        },
      },
      {
        title: "Keep thread summaries current",
        body: "Keep a clear record of what changed, what was decided and what is still open as a conversation develops.",
        artwork: "workflows-hero",
        source: "397:10554",
      },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    title: "Learn from your\ncustomers.",
    source: "350:11485",
    href: "/platform/analytics-and-observability",
    accent: "#5aded7",
    imageFirst: true,
    states: [
      {
        title: "Detect trends",
        body: "Bring related customer feedback into one view. Explore recurring themes and decide what deserves a closer look.",
        artwork: "insights-trends",
        source: "439:10457",
        pair: {
          source: "417:10139",
          before: [
            "Feedback arrives separately",
            "Setup questions in separate threads",
            "Each message has its own context",
            "The team reviews feedback one conversation at a time.",
          ],
          after: [
            "A recurring theme emerges",
            "Getting started",
            "Related setup questions grouped",
            "Review the shared theme alongside the original customer conversations.",
          ],
        },
      },
      {
        title: "Catch up instantly",
        body: "Get the important decisions, open questions and next steps in one brief, without rereading the entire thread.",
        artwork: "insights-context",
        source: "439:10480",
        pair: {
          source: "417:10256",
          before: [
            "A teammate joins the thread",
            "Customer onboarding discussion",
            "The next owner needs the background.",
            "What was agreed, and what is still open?",
          ],
          after: [
            "The handoff has context",
            "Customer onboarding · brief",
            "The customer confirmed their goals. The team is waiting for a preferred start date.",
            "Confirm the date and share the setup guide.",
          ],
        },
      },
      {
        title: "Daily summaries",
        body: "Start with a digest of recent activity and open work. See what moved forward, what is waiting and where to focus today.",
        artwork: "insights-digest",
        source: "439:10495",
        pair: {
          source: "417:10272",
          before: [
            "The day starts in fragments",
            "Updates across open conversations",
            "Priorities are not yet collected",
            "A customer question · Team handoff · An approval request",
          ],
          after: [
            "A clearer daily view",
            "Today’s team digest",
            "Open work and recent decisions",
            "Confirm a start date · Review a draft · Respond to a customer question",
          ],
        },
      },
      {
        title: "Product insights",
        body: "Connect feature requests and recurring friction to the conversations behind them. Give product teams the context to decide what to improve.",
        artwork: "insights-product",
        source: "439:10516",
      },
    ],
  },
];

export const agentSteps = [
  {
    label: "Request",
    source: "391:9888",
    title: "A request arrives",
    detail: "Find a time for the team to connect next week.",
  },
  {
    label: "Suggested times",
    source: "391:9896",
    title: "Options prepared",
    detail: "Tuesday, 10:00 AM · Wednesday, 2:00 PM",
  },
  {
    label: "Conflict check",
    source: "391:9908",
    title: "Check the context",
    detail: "Review availability and confirm the right people are included.",
  },
  {
    label: "Confirmed",
    source: "391:9918",
    title: "Ready for the next step",
    detail: "The team reviews the proposed time before confirming.",
  },
  {
    label: "Routine assistance",
    source: "391:9926",
    title: "Keep the work moving",
    detail: "Prepare the meeting context and a follow-up for review.",
  },
] as const;

export const integrationNames = [
  "Zoom",
  "Google Calendar",
  "Gmail",
  "Google Meet",
  "Salesforce",
  "Slack",
  "Microsoft Teams",
  "Outlook",
  "Chrome",
  "OpenAI",
  "Claude",
  "HubSpot",
  "Greenhouse",
  "LinkedIn",
  "Stripe",
  "PayPal",
  "Zapier",
] as const;

export const integrationIcons: Record<
  (typeof integrationNames)[number],
  string
> = {
  Zoom: "/preview/homepage/integrations/zoom.svg",
  "Google Calendar": "/preview/homepage/integrations/google-calendar.svg",
  Gmail: "/preview/homepage/integrations/gmail.svg",
  "Google Meet": "/preview/homepage/integrations/google-meet.svg",
  Salesforce: "/preview/homepage/integrations/salesforce.svg",
  Slack: "/preview/homepage/integrations/slack.svg",
  "Microsoft Teams": "/preview/homepage/integrations/microsoft-teams.svg",
  Outlook: "/preview/homepage/integrations/microsoft-outlook.svg",
  Chrome: "/preview/homepage/integrations/chrome.svg",
  OpenAI: "/preview/homepage/integrations/openai.svg",
  Claude: "/preview/homepage/integrations/claude-ai-icon.svg",
  HubSpot: "/preview/homepage/integrations/hubspot.svg",
  Greenhouse: "/preview/homepage/integrations/greenhouse.svg",
  LinkedIn: "/preview/homepage/integrations/linkedin.svg",
  Stripe: "/preview/homepage/integrations/stripe.svg",
  PayPal: "/preview/homepage/integrations/paypal.svg",
  Zapier: "/preview/homepage/integrations/zapier.svg",
};

export const infrastructureCards = [
  {
    label: "Channels",
    title: "Consolidate support",
    body: "Bring conversations and the context behind each request into one connected workspace.",
    href: "/integrations",
    source: "441:10149",
  },
  {
    label: "Assistant",
    title: "Supercharge your team",
    body: "Give your team the context to research a request and prepare the next step for review.",
    href: "/platform",
    source: "441:10182",
  },
  {
    label: "Agents",
    title: "Keep people and agents in sync",
    body: "Give every handoff a clear owner while your team stays close to the decisions.",
    href: "/platform/agentic-automation",
    source: "441:10211",
  },
  {
    label: "Workflows",
    title: "Turn context into action",
    body: "Connect the tools and people involved without losing the context that makes work move.",
    href: "/products/agentic-workflows",
    source: "441:10245",
  },
  {
    label: "Insights",
    title: "Learn from support",
    body: "Explore recurring themes and decide what deserves a closer look.",
    href: "/platform/analytics-and-observability",
    source: "441:10276",
  },
  {
    label: "Platform",
    title: "Build your next workflow",
    body: "Shape the work around your instructions, relevant context, and selected connections.",
    href: "/platform",
    source: "441:10303",
  },
] as const;
