export const templateCollections = [
  {
    slug: "agent-teams",
    name: "Agent teams",
    description:
      "Give each participant a brief, a deliverable and a review decision.",
  },
  {
    slug: "flows",
    name: "Flows",
    description:
      "Carry one piece of work from its trigger through a verifiable handoff.",
  },
] as const;

type Template = {
  collection: (typeof templateCollections)[number]["slug"];
  slug: string;
  title: string;
  inputs: string;
  brief: string;
  checkpoint: string;
};

export const workflowTemplates: Template[] = [
  {
    collection: "agent-teams",
    slug: "real-estate",
    title: "Property inquiry handoff",
    inputs: "The inquiry, current listing and leasing contact.",
    brief:
      "Prepare a response to the prospect using the supplied listing. Separate confirmed details from questions the leasing team needs to answer. Assign an owner to the next follow-up.",
    checkpoint:
      "The leasing lead checks availability, price and any scheduling commitment before sending.",
  },
  {
    collection: "agent-teams",
    slug: "influencer-outreach",
    title: "Creator outreach shortlist",
    inputs:
      "The campaign audience, selection criteria and approved contact list.",
    brief:
      "Build a shortlist from the supplied creators. Cite the evidence for each match, flag missing contact information and draft a personal opening line.",
    checkpoint:
      "The partnerships owner approves the shortlist and message before outreach.",
  },
  {
    collection: "agent-teams",
    slug: "influencer-campaign-brief",
    title: "Creator campaign brief",
    inputs: "The launch date, approved claims, deliverables and usage terms.",
    brief:
      "Draft a brief that a creator can work from. Include the audience, mandatory disclosures, deliverables, review dates and a contact for questions.",
    checkpoint:
      "The campaign owner signs off on claims and terms before the creator receives the brief.",
  },
  {
    collection: "agent-teams",
    slug: "influencer-campaign-tracker",
    title: "Creator campaign tracker",
    inputs: "The roster, contracts, asset links and latest delivery updates.",
    brief:
      "Build one row per deliverable. Include the creator, deadline, latest asset, approval status and next action. Flag overdue work and conflicting dates.",
    checkpoint:
      "The coordinator checks flagged dates against the signed brief and names the follow-up owner.",
  },
  {
    collection: "agent-teams",
    slug: "engineering-code-review-checklist",
    title: "Code review checklist",
    inputs: "A proposed change, its acceptance criteria and relevant tests.",
    brief:
      "Map the change to the acceptance criteria. Identify the most important behavior to exercise, missing coverage and questions for the author.",
    checkpoint:
      "A maintainer verifies the checks and decides whether the change is ready to merge.",
  },
  {
    collection: "agent-teams",
    slug: "engineering-incident-postmortem",
    title: "Incident review",
    inputs: "Timestamped observations, incident notes and recovery actions.",
    brief:
      "Draft the timeline with evidence for each event. Separate confirmed causes from open questions and suggest follow-up tasks with owners.",
    checkpoint:
      "The incident lead confirms the impact window and assigns the follow-ups.",
  },
  {
    collection: "agent-teams",
    slug: "engineering-software-release-checklist",
    title: "Release readiness checklist",
    inputs:
      "The change list, test results, rollout plan and rollback criteria.",
    brief:
      "Summarize which release checks have evidence, which are pending and who owns each blocker. Include a rollback contact.",
    checkpoint:
      "The release owner makes the go or hold decision and records the reason.",
  },
  {
    collection: "agent-teams",
    slug: "operations-sop",
    title: "Operating procedure draft",
    inputs: "A worked example, operator notes and the completion criteria.",
    brief:
      "Turn the example into a repeatable procedure. Include prerequisites, steps, exception handling and the evidence an operator should save.",
    checkpoint:
      "A second operator tries the procedure and flags any step that depends on undocumented knowledge.",
  },
  {
    collection: "agent-teams",
    slug: "customer-support-escalation",
    title: "Support escalation brief",
    inputs:
      "The customer thread, affected account, reproduction notes and support policy.",
    brief:
      "Summarize the customer impact, steps already attempted and the next decision needed. Preserve the original thread and name the escalation owner.",
    checkpoint:
      "The support lead checks the evidence and approves the proposed customer update.",
  },
  {
    collection: "flows",
    slug: "product-launch-automation",
    title: "Launch readiness flow",
    inputs: "The approved launch brief, asset list, dates and owners.",
    brief:
      "When the launch review starts, collect status by deliverable. Route missing approvals to their owners, then prepare a readiness summary with the unresolved blockers.",
    checkpoint:
      "The launch owner confirms readiness before any announcement is released.",
  },
  {
    collection: "flows",
    slug: "sales-meeting-to-signed-agreement",
    title: "Sales meeting to agreement",
    inputs: "Approved meeting notes, proposal terms and the account owner.",
    brief:
      "Extract buyer commitments, prepare a follow-up and list the terms still under discussion. After the owner confirms them, prepare the agreement handoff.",
    checkpoint:
      "The account owner reviews pricing and terms before anything is sent for signature.",
  },
  {
    collection: "flows",
    slug: "support-ticket-to-verified-fix",
    title: "Support ticket to verified fix",
    inputs: "A support ticket, expected behavior and a repeatable example.",
    brief:
      "Route a reproduction brief to engineering. Collect the proposed fix and test results, then draft a customer update that describes what was verified.",
    checkpoint:
      "Support repeats the customer's scenario before closing the ticket.",
  },
  {
    collection: "flows",
    slug: "returns-management",
    title: "Route a return request",
    inputs:
      "The order lines, delivery date, customer’s request, item condition and return policy in effect on the purchase date.",
    brief:
      "Match the requested item to an order line and check its return window. Draft the next step for each item. If one item is eligible and another needs inspection, keep them separate. Include the policy clause and identify any missing evidence.",
    checkpoint:
      "A support owner confirms the item, amount and disposition before issuing a label or refund. Check whether the order already has an open return.",
  },
  {
    collection: "flows",
    slug: "content-audit",
    title: "Decide which pages need an update",
    inputs:
      "Canonical URLs, page owners, the audience for each page, recent traffic and conversions, and a list of product changes.",
    brief:
      "Group pages by the question they answer. For each group, recommend keeping, updating, merging or retiring each page. Cite the outdated passage or overlapping URL. Mark missing analytics as unknown so a tracking gap does not look like zero demand.",
    checkpoint:
      "The editor checks the evidence and assigns an owner. For a proposed merge, confirm the destination answers the original question and map inbound links before changing either URL.",
  },
  {
    collection: "flows",
    slug: "inventory-replenishment",
    title: "Prepare a replenishment review",
    inputs:
      "On-hand units, reserved stock, confirmed receipts with arrival dates, expected daily demand, supplier lead time and safety stock for each SKU.",
    brief:
      "Project available stock day by day through the next supplier delivery. Deduct reservations and demand, and add each confirmed receipt only when it is due. List the first day each SKU falls below its safety stock and flag late or unconfirmed receipts.",
    checkpoint:
      "The buyer checks open purchase orders, lead times and minimum order quantities before placing a new order. Keep a late delivery visible even when it eventually covers the shortage.",
  },
  {
    collection: "flows",
    slug: "content-repurposing",
    title: "Turn one approved article into channel drafts",
    inputs:
      "The approved article, its canonical URL, audience notes, channel requirements and any quotes cleared for reuse.",
    brief:
      "Prepare a short email introduction, a LinkedIn post and a slide outline. Use the same underlying claim in each, choose one example for its audience and attach the source passage for editorial review. Preserve qualifications on numbers and quotes.",
    checkpoint:
      "The editor reads each draft on its own, checks links and confirms that shortened copy still makes a claim the source supports.",
  },
  {
    collection: "flows",
    slug: "creator-gifting",
    title: "Track a creator gift from invitation to delivery",
    inputs:
      "The approved creator shortlist, gift budget, available items, opt-in responses and fulfillment contact.",
    brief:
      "Prepare one invitation per creator. After an opt-in, confirm the preferred item and pass only the details needed for shipment to fulfillment. Track acceptance, shipment and delivery separately. Leave any expected coverage blank unless it was agreed.",
    checkpoint:
      "The partnership owner checks consent and stock before shipping. Give address access only to the fulfillment team and use the campaign tracker for delivery status.",
  },
];
