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
      "innflow is an agentic AI platform designed to improve operating efficiency in housing, helping operators respond instantly to leads and residents around the clock.",
  },
  {
    question: "How does innflow work?",
    answer:
      "innflow uses agentic conversational AI to handle messages, calls, and tasks automatically — integrating with your existing systems to deliver fast, personalized responses 24/7 while steering complicated workflows.",
  },
  {
    question: "Who uses innflow?",
    answer:
      "innflow is built for multifamily operators, owners, property managers, fee managers, and owner/operators looking to streamline communication, increase efficiency, and improve the bottom line.",
  },
  {
    question: "What problems does innflow solve?",
    answer:
      "innflow eliminates missed leads, reduces manual workload, improves resident experiences, and allows teams to focus on higher-value work instead of repetitive communication tasks.",
  },
  {
    question: "Is innflow a chatbot?",
    answer:
      "innflow is more than just another chatbot. It is an agentic AI platform that can schedule tours, answer complex questions, follow up with prospects, and handle maintenance or scheduling requests automatically.",
  },
  {
    question: "How does innflow measure performance?",
    answer:
      "innflow provides detailed analytics on response times, conversion rates, and customer satisfaction so teams can measure impact.",
  },
  {
    question: "Can innflow handle both calls and texts?",
    answer:
      "Yes. innflow is omnichannel, supporting voice, SMS, email, and web chat to create a unified communication experience.",
  },
  {
    question: "Is innflow customizable for different properties or portfolios?",
    answer:
      "Absolutely. innflow can be tailored for specific properties, communities, and brands — maintaining consistent voice, tone, and messaging across your portfolio.",
  },
  {
    question: "How does innflow improve lead-to-lease conversion?",
    answer:
      "By responding instantly to inquiries and nurturing leads 24/7, innflow increases tour bookings and shortens leasing cycles.",
  },
  {
    question: "Does innflow support maintenance requests?",
    answer:
      "Yes. innflow can collect and categorize maintenance requests automatically, ensuring they are routed to the correct team without manual intervention.",
  },
  {
    question: "Can innflow integrate with property management software (PMS)?",
    answer:
      "Yes. innflow integrates with your existing property management software so leasing, maintenance, and resident records stay in sync — without replacing the system your team already uses.",
  },
  {
    question: "How does innflow help property management teams?",
    answer:
      "innflow automates leasing communication, schedules tours, follows up with leads, and answers resident questions instantly — reducing response times and improving conversion.",
  },
  {
    question: "Where can I read innflow’s policies?",
    answer:
      "Use the Privacy, Terms, Cookies, EULA, and DSAR links below. Short URLs /privacy, /terms, /cookies, /eula, and /dsar also redirect to those same policy pages.",
  },
] as const;
