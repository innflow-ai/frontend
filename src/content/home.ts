export type ProductStatus = "Available" | "Preview" | "Validate";

export type FeatureStory = {
  eyebrow: string;
  title: string;
  problem: string;
  workflow: string;
  outcome: string;
  status: ProductStatus;
  media: "communications" | "workflow" | "assistant" | "context" | "website";
};

export const platformSteps = [
  {
    number: "01",
    title: "Capture the request",
    body: "Bring an incoming request or recurring task into one operational flow.",
  },
  {
    number: "02",
    title: "Attach the right context",
    body: "Reference connected systems, operational knowledge, files, and table records.",
  },
  {
    number: "03",
    title: "Route the work",
    body: "Use workflow logic to classify, assign, pause for review, and continue execution.",
  },
  {
    number: "04",
    title: "Keep a visible record",
    body: "Review approvals and execution history without losing the source context.",
  },
] as const;

export const featureStories: FeatureStory[] = [
  {
    eyebrow: "Communications",
    title: "Bring operational conversations into the workflow.",
    problem:
      "Resident, owner, and vendor requests often arrive without the context needed to act.",
    workflow:
      "A preview flow classifies the message, connects relevant records, and routes the next step for review.",
    outcome:
      "Give the team a clearer handoff while keeping a person in control of outbound communication.",
    status: "Preview",
    media: "communications",
  },
  {
    eyebrow: "Workflows",
    title: "Turn recurring handoffs into a governed process.",
    problem:
      "Follow-up breaks when the next step lives in a spreadsheet, inbox, or one person’s memory.",
    workflow:
      "Model triggers, conditions, connected actions, and review points in a visual workflow.",
    outcome:
      "Run the same operational process consistently and inspect its execution history.",
    status: "Available",
    media: "workflow",
  },
  {
    eyebrow: "Assistant",
    title: "Answer with the operation’s own context.",
    problem:
      "Operators lose time finding the right procedure, file, or record before they can respond.",
    workflow:
      "Use the Assistant with connected knowledge and explicit workflow actions rather than an open-ended promise of autonomy.",
    outcome:
      "Move from question to a reviewable next step with the supporting context attached.",
    status: "Available",
    media: "assistant",
  },
  {
    eyebrow: "Files · Tables · Knowledge · Approvals",
    title: "Keep context and control beside the work.",
    problem:
      "A workflow is hard to trust when its evidence, records, and decisions are scattered.",
    workflow:
      "Attach working data, reference material, files, and approval requests to the process that uses them.",
    outcome:
      "Give operators a clearer place to inspect inputs, decisions, and execution status.",
    status: "Available",
    media: "context",
  },
  {
    eyebrow: "Website",
    title: "Connect a customer-facing experience to the operation.",
    problem:
      "Public information and request capture can drift away from the process behind them.",
    workflow:
      "The Website concept connects structured pages and request paths to governed operational workflows.",
    outcome:
      "Create a clearer bridge from the customer experience to the team responsible for fulfillment.",
    status: "Preview",
    media: "website",
  },
];

export const integrations = [
  {
    name: "Gmail",
    asset: "/integrations/gmail.svg",
    status: "Product connector",
  },
  {
    name: "Outlook",
    asset: "/integrations/outlook.svg",
    status: "Product connector",
  },
  {
    name: "Slack",
    asset: "/integrations/slack.svg",
    status: "Product connector",
  },
  {
    name: "Microsoft Teams",
    asset: "/integrations/teams.svg",
    status: "Product connector",
  },
  {
    name: "Notion",
    asset: "/integrations/notion.svg",
    status: "Product connector",
  },
  {
    name: "Google Sheets",
    asset: "/integrations/google-sheets.svg",
    status: "Product connector",
  },
  {
    name: "Google Drive",
    asset: "/integrations/google-drive.svg",
    status: "Product connector",
  },
  {
    name: "SharePoint",
    asset: "/integrations/sharepoint.svg",
    status: "Product connector",
  },
] as const;

export const portfolioFits = [
  {
    title: "Management companies",
    body: "Teams coordinating repeatable work across properties, owners, vendors, and internal roles.",
    status: "Initial ICP",
  },
  {
    title: "Multifamily operations",
    body: "Operators handling high-frequency resident communication and recurring portfolio processes.",
    status: "Validate fit",
  },
  {
    title: "Residential portfolios",
    body: "Teams that need shared process visibility across a growing set of units and stakeholders.",
    status: "Validate fit",
  },
] as const;

export const faqs = [
  {
    question: "Does Innflow replace my property-management software?",
    answer:
      "No. This homepage positions Innflow as the operational coordination layer around your existing systems of record. Any claim of replacing accounting, leasing, screening, or maintenance software requires separate product validation.",
  },
  {
    question: "What can I automate first?",
    answer:
      "Start with one frequent, bounded handoff: an incoming request, a recurring report, a document review, or an approval path. The demo is used to confirm the systems, data, exceptions, and human review needed before a workflow is proposed.",
  },
  {
    question: "Who sets up and maintains workflows?",
    answer:
      "The ownership model is finalized during discovery. Innflow supports visual workflow configuration, but this phase does not promise a specific implementation service or maintenance package.",
  },
  {
    question: "How are approvals and permissions handled?",
    answer:
      "The product includes approval requests and execution views. Exact role, permission, and escalation behavior should be confirmed for the proposed workflow before purchase.",
  },
  {
    question: "Which integrations are available?",
    answer:
      "The product repository includes the connector paths shown above and an API surface. Production readiness, account prerequisites, scopes, and depth should be verified for each buyer’s specific stack.",
  },
  {
    question: "How long does a realistic first workflow take?",
    answer:
      "There is no public setup-time promise in this phase. Timing depends on scope, access to systems and data, exception handling, and the required review process.",
  },
  {
    question: "What happens when a workflow fails?",
    answer:
      "Innflow exposes execution history for review. Retry, alerting, and recovery behavior should be designed and tested for the specific workflow rather than assumed from a generic guarantee.",
  },
  {
    question: "How is usage priced?",
    answer:
      "The application currently uses credit-based plan configuration. Public packaging, plan names, and property-management implementation scope still need approval, so this homepage keeps the buying motion demo-led.",
  },
] as const;
