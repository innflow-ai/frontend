import type { ProductStatus } from "@/content/home";

export type FeaturePageContent = {
  slug: "workflows" | "assistant" | "communications" | "website";
  eyebrow: string;
  title: string;
  description: string;
  status: ProductStatus;
  media: "workflow" | "assistant" | "communications" | "website";
  problem: string;
  operatingModel: string[];
  controls: { title: string; body: string }[];
  evidence: string[];
  faq: { question: string; answer: string }[];
};

export const featurePages: Record<
  FeaturePageContent["slug"],
  FeaturePageContent
> = {
  workflows: {
    slug: "workflows",
    eyebrow: "Visual workflows",
    title: "Make recurring property handoffs visible and repeatable.",
    description:
      "Model triggers, conditions, connected actions, approvals, and execution steps without positioning Innflow as the property system of record.",
    status: "Available",
    media: "workflow",
    problem:
      "Recurring work breaks when the request, decision, and follow-up live across separate inboxes, spreadsheets, and individual memory.",
    operatingModel: [
      "Capture a request or scheduled trigger.",
      "Attach records, files, and operational knowledge.",
      "Route the next action through explicit workflow logic.",
      "Pause consequential work for human approval.",
      "Inspect execution history and design recovery behavior.",
    ],
    controls: [
      {
        title: "Defined steps",
        body: "Each action belongs to an explicit workflow rather than an unlimited-autonomy promise.",
      },
      {
        title: "Human review",
        body: "Approval requests can be placed before consequential handoffs.",
      },
      {
        title: "Visible runs",
        body: "Execution history gives operators a place to inspect what happened.",
      },
    ],
    evidence: [
      "Workflow list and editor routes",
      "Approval request surfaces",
      "Execution history surfaces",
    ],
    faq: [
      {
        question: "Does this replace our property-management system?",
        answer:
          "No. Workflows coordinate operational work around existing systems of record.",
      },
      {
        question: "What should we automate first?",
        answer:
          "Begin with one frequent, bounded handoff whose inputs, exceptions, and approval owner are understood.",
      },
      {
        question: "Are retries and recovery automatic?",
        answer:
          "Recovery behavior must be designed and validated for each workflow; this page does not promise a universal retry policy.",
      },
    ],
  },
  assistant: {
    slug: "assistant",
    eyebrow: "Assistant",
    title: "Move from an operational question to a reviewable next step.",
    description:
      "Use connected knowledge and explicit workflow actions while keeping scope, source context, and human control visible.",
    status: "Available",
    media: "assistant",
    problem:
      "Operators lose time locating the right procedure, file, or record before they can decide what should happen next.",
    operatingModel: [
      "Ask a question inside the operational workspace.",
      "Retrieve only the connected context available to the task.",
      "Prepare an answer or bounded workflow action.",
      "Review the supporting context before continuing.",
    ],
    controls: [
      {
        title: "Scoped context",
        body: "The relevant source set should be defined for the task.",
      },
      {
        title: "Reviewable output",
        body: "Generated output should be checked before consequential use.",
      },
      {
        title: "Workflow boundary",
        body: "Actions belong in governed workflows with explicit permissions and review points.",
      },
    ],
    evidence: [
      "Assistant product route",
      "Knowledge Base surface",
      "Approved assistant product artwork",
    ],
    faq: [
      {
        question: "Does the Assistant learn autonomously?",
        answer:
          "No autonomous-learning claim is made. The public story is limited to connected context and governed actions.",
      },
      {
        question: "Can it act without review?",
        answer:
          "The required approval boundary depends on the workflow and should be confirmed before implementation.",
      },
      {
        question: "Is every answer guaranteed accurate?",
        answer:
          "No. AI output requires review, and accuracy depends on source quality, configuration, and task design.",
      },
    ],
  },
  communications: {
    slug: "communications",
    eyebrow: "Communications",
    title: "Connect an operational conversation to the work behind it.",
    description:
      "A preview concept for classifying stakeholder messages, attaching context, and routing the next step for review.",
    status: "Preview",
    media: "communications",
    problem:
      "Resident, owner, and vendor messages often arrive without the records, procedure, or ownership needed to act consistently.",
    operatingModel: [
      "Receive a message through an approved intake path.",
      "Classify the operational request.",
      "Attach relevant property context.",
      "Route a proposed next step to a person for review.",
    ],
    controls: [
      {
        title: "Preview boundary",
        body: "This capability is not presented as generally available.",
      },
      {
        title: "Outbound review",
        body: "The concept keeps a person in control of consequential communication.",
      },
      {
        title: "Channel validation",
        body: "Every channel, permission, and delivery contract requires implementation-specific validation.",
      },
    ],
    evidence: [
      "User-approved preview boundary",
      "Illustrative communication workflow",
      "No claim that Chat is live",
    ],
    faq: [
      {
        question: "Is Communications generally available?",
        answer:
          "No. It is explicitly presented as a preview concept in this release.",
      },
      {
        question: "Which communication channels are supported?",
        answer:
          "No public channel-availability claim is made until product and engineering approve the exact contracts.",
      },
      {
        question: "Can it send messages automatically?",
        answer:
          "The preview story places human review before outbound action; exact behavior remains subject to validation.",
      },
    ],
  },
  website: {
    slug: "website",
    eyebrow: "Website",
    title: "Bridge a customer-facing page to a governed operation.",
    description:
      "A preview concept for structured web experiences and request paths connected to the team responsible for fulfillment.",
    status: "Preview",
    media: "website",
    problem:
      "Public information and request capture can drift away from the operational process that must fulfill the request.",
    operatingModel: [
      "Define structured pages and approved information.",
      "Connect an intake path to a bounded workflow.",
      "Attach context and ownership behind the request.",
      "Review the operational handoff before publishing the experience.",
    ],
    controls: [
      {
        title: "Preview boundary",
        body: "Website is not presented as generally available.",
      },
      {
        title: "Publishing control",
        body: "No site should publish or replace an existing domain without explicit approval.",
      },
      {
        title: "Content ownership",
        body: "Approved copy, claims, legal text, and operational destinations remain required inputs.",
      },
    ],
    evidence: [
      "User-approved preview boundary",
      "Approved concept artwork",
      "Controlled publishing requirement",
    ],
    faq: [
      {
        question: "Is Website available today?",
        answer: "No. This release presents Website as a preview concept only.",
      },
      {
        question: "Will it replace our property-management system?",
        answer:
          "No. The concept connects a public experience to operational workflows around existing systems.",
      },
      {
        question: "Can Innflow publish to our production domain automatically?",
        answer:
          "No production publishing, DNS change, or replacement is implied. Those actions require separate approval and validation.",
      },
    ],
  },
};

export const allFeatureSlugs = Object.keys(
  featurePages,
) as FeaturePageContent["slug"][];
