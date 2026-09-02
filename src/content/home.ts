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
    question: "What is innflow?",
    answer:
      "innflow is property operations software with AI agents and visual workflows. It helps housing teams capture a request, attach the right context, route the next step, and keep a visible record — around the systems they already use.",
  },
  {
    question: "How does innflow work?",
    answer:
      "You model a recurring operation as a workflow: trigger, conditions, connected actions, and review points. Agents can use tools and knowledge inside that flow. Communications and Website remain preview concepts until they are approved as generally available.",
  },
  {
    question: "Who uses innflow?",
    answer:
      "innflow is built for multifamily operators, owners, property managers, fee managers, and owner-operators who need shared process visibility across units, residents, and vendors.",
  },
  {
    question: "Does innflow replace our property-management system?",
    answer:
      "No. innflow coordinates operational work around the existing system of record. Leases, units, and accounting stay in your PMS.",
  },
  {
    question: "Can innflow integrate with property management software (PMS)?",
    answer:
      "Connector paths exist in the product. Presence in the directory does not, by itself, prove production readiness, scopes, or account-specific compatibility. Each implementation still needs permissions, data contracts, and review.",
  },
  {
    question: "Does innflow handle leasing and maintenance work?",
    answer:
      "Workflows can collect, classify, and route leasing follow-up or maintenance intake so the right owner sees the next step. Outbound messages and any live chat or voice path stay behind human review unless you explicitly configure otherwise — Communications is a preview, not a general-availability channel list.",
  },
  {
    question: "Is innflow a chatbot?",
    answer:
      "No. innflow is an agent platform with visual workflows. Agents use tools, follow explicit steps, and can pause for approval. Chat is not listed as a live homepage capability.",
  },
  {
    question: "How do humans stay in the loop?",
    answer:
      "Place an approval before consequential handoffs. Agents prepare the action and attach context; a person reviews, edits, or rejects it. Exact review boundaries are set per workflow.",
  },
  {
    question: "How do agents use memory and context?",
    answer:
      "Agents retrieve the files, tables, knowledge, and records you attach to the task. Accuracy depends on that governed context — not on agents quietly rewriting themselves after every run.",
  },
  {
    question: "How is innflow deployed?",
    answer:
      "Start in the innflow workspace with one operation and the systems it touches. Custom or private deployment is scoped with the innflow team. This site does not promise setup time, VPC, or on-prem by default.",
  },
  {
    question: "How does innflow handle security?",
    answer:
      "Access follows workspace permissions, connected-account scopes, and workflow approvals. Certification, encryption, and residency claims are confirmed per implementation rather than published as blanket coverage.",
  },
  {
    question: "Where can I read innflow’s policies?",
    answer:
      "Use the Privacy, Terms, Cookies, EULA, and DSAR links below. Short URLs /privacy, /terms, /cookies, /eula, and /dsar also redirect to those same policy pages.",
  },
] as const;
