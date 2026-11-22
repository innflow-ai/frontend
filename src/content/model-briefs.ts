// Editorial exercises for comparing outputs against the team's own records.
export const modelBriefs: Record<
  string,
  [task: string, brief: string, check: string]
> = {
  "GPT-6.2 Astra": [
    "Reconcile a launch plan",
    "Compare the launch brief with the latest owner updates. Mark changed dates and attach the source for each change.",
    "Each revised date should point to a decision an owner actually made.",
  ],
  "GPT-6.2 Sol": [
    "Prepare a shift handoff",
    "Summarize the open requests in these shift notes. For each one, identify the last action and the next person to contact.",
    "A teammate should be able to pick up every open request from the handoff.",
  ],
  "GPT-6 Astra": [
    "Review a rollout proposal",
    "Compare this rollout plan with our acceptance checklist. Flag missing checks and propose a way to verify each one.",
    "Trace every proposed check to a specific requirement.",
  ],
  "GPT-6.1 Sol": [
    "Organize support feedback",
    "Group these support notes by issue. Include one representative quote and the number of reports per group.",
    "Recount the source records and check the quotes in context.",
  ],
  "GPT-6 Sol": [
    "Draft a project update",
    "Turn these notes into a short update with decisions, blockers and open questions.",
    "Every decision should be distinguishable from a suggestion.",
  ],
  "Gemini 4 Neon": [
    "Review a campaign brief",
    "Compare the campaign brief with these review notes. List the assets that need an edit and the requested change.",
    "Verify that each requested edit appears in the original feedback.",
  ],
  "Gemini Omni 1.2 Flash": [
    "Build a meeting recap",
    "Use this meeting transcript to list the actions, owners and dates participants agreed to.",
    "Leave dates open when the transcript gives no deadline.",
  ],
  "Gemini 4 Carbon": [
    "Check a reporting draft",
    "Compare this monthly narrative with the supplied figures. Flag discrepancies and cite the relevant row.",
    "Recompute any total mentioned in the draft.",
  ],
  "Gemini 4 Argon": [
    "Classify incoming requests",
    "Assign each request to one of these queue categories. Put ambiguous requests in a review list.",
    "Review borderline cases against the supplied category definitions.",
  ],
  "Grok 4.7": [
    "Trace a customer concern",
    "Read these account notes chronologically. Summarize when the concern first appeared and what has happened since.",
    "The timeline should identify the original notes for each event.",
  ],
  "Grok 4.6": [
    "Prepare interview themes",
    "Group the supplied interview excerpts by recurring theme. Keep the original wording beside each theme.",
    "Check whether each theme is supported by multiple independent interviews.",
  ],
  "Claude Fable 5.2": [
    "Edit an onboarding guide",
    "Revise the guide for a new teammate using the style sheet. Preserve the order of the setup steps.",
    "Walk through the revised steps and compare all field names with the source.",
  ],
  "Claude Opus 5.5": [
    "Review a decision memo",
    "Compare the options in this memo against the decision criteria. Identify assumptions that still need evidence.",
    "Each recommendation should cite a criterion and acknowledge missing evidence.",
  ],
  "Claude Sonnet 5.5": [
    "Prepare release notes",
    "Use these approved changes to draft release notes grouped by the user task they affect.",
    "Check that every described change appears in the approved release.",
  ],
  "Claude Haiku 5.5": [
    "Route help requests",
    "Classify these short requests using our routing guide and write one sentence explaining each choice.",
    "Confirm that requests missing key context are flagged for a person.",
  ],
  "Kimi K3.1 Pro": [
    "Index a project archive",
    "Build an index of the supplied project documents, including owner, last decision and source filename.",
    "Spot-check each filename and any decision that has since been revised.",
  ],
  "DeepSeek V4.1 Flash 1017": [
    "Sort quality reports",
    "Group the supplied quality reports by symptom and preserve the report ID beside each entry.",
    "Every input ID should appear exactly once.",
  ],
  "DeepSeek V4 Pro 0813": [
    "Inspect a data handoff",
    "Compare these two field definitions and propose a mapping, listing the fields that need clarification.",
    "Verify type, units and missing-value behavior for each mapped field.",
  ],
  "GLM-5.3": [
    "Draft a procedure",
    "Turn these approved operator notes into a procedure with prerequisites, steps and completion checks.",
    "An operator should be able to trace each step back to an approved note.",
  ],
  "GLM-5.3-Flash": [
    "Tag an inbox sample",
    "Apply our intake tags to these messages. List the phrase that explains each tag.",
    "Review multi-topic messages and ensure that urgent items were identified.",
  ],
  "GLM-5.3-FlashX": [
    "Check a catalog export",
    "Find missing required fields in this sample export and return the affected IDs with the field names.",
    "Compare the returned IDs with a manual check of the sample.",
  ],
  "Hunyuan 4": [
    "Prepare a supplier handoff",
    "Extract open questions from this supplier exchange and group them by owner.",
    "Verify that each question is still unanswered in the most recent message.",
  ],
  "Qwen4-Max": [
    "Review order exceptions",
    "Compare these order records with the exception rules. List the affected orders and the rule behind each flag.",
    "Check each flagged order against the original quantity, date and exception threshold.",
  ],
  "Claude Opus 4.8": [
    "Trace a duplicate invoice reminder",
    "Read the reminder job, the retry policy and the supplied log extract. Find the earliest point where one invoice could produce two reminders. Cite the relevant lines and suggest a test.",
    "Reproduce the duplicate with sample data before accepting the explanation. Check whether the proposed test fails on the original code.",
  ],
  "Claude Fable 5": [
    "Reconcile a project estimate",
    "Compare the signed scope with the milestone estimates. Identify work that appears twice, work that has no estimate and assumptions that need an owner.",
    "Trace each discrepancy to a named deliverable. Recalculate the total after removing any confirmed duplicates.",
  ],
  "Claude Sonnet 5": [
    "Draft release notes from a change list",
    "Write a release note for customers using these merged changes and rollout notes. Separate features available today from changes awaiting rollout.",
    "Check each availability statement against the rollout notes. Internal refactors should appear only when they affect a customer's work.",
  ],
  "GLM-5.2": [
    "Map a support request to a queue",
    "Use the supplied routing rules to assign sample requests to owners. Cite the rule behind each assignment and flag requests that match two rules.",
    "Compare the results with the support lead’s reviewed assignments. Inspect overlapping rules before changing a route.",
  ],
  "Grok 4.5": [
    "Explain a report that lost a row",
    "Trace one sample row through the supplied import, filter and export code. Identify the first operation that drops it and give a minimal input that demonstrates why.",
    "Run the sample through the named operation. Check that keeping the missing row would still exclude rows that genuinely fail the filter.",
  ],
  "Seedream 5.5": [
    "Review a product photo edit",
    "Using the supplied product photo, replace the background with warm gray and preserve the label, cap and bottle proportions. Then request a second edit that changes only the shadow.",
    "Compare both edits with the original at full size. Read the label letter by letter and inspect the cap edge, bottle shape and shadow direction.",
  ],
};
