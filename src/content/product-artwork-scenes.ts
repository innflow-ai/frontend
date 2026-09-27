/** Authored, illustrative UI compositions. These labels are demo data, not claims. */
export type SceneKind =
  | "branch"
  | "flow"
  | "hub"
  | "editor"
  | "review"
  | "compare"
  | "library"
  | "search"
  | "table"
  | "settings"
  | "templates"
  | "dashboard"
  | "trace"
  | "architecture"
  | "regions"
  | "website"
  | "permissions"
  | "report";
export type SceneItem = { label: string; value: string };
export type ArtworkScene = {
  kind: SceneKind;
  title: string;
  context: string;
  items: SceneItem[];
  result: string;
};
function scene(
  kind: SceneKind,
  title: string,
  context: string,
  items: string[],
  result: string,
): ArtworkScene {
  return {
    kind,
    title,
    context,
    items: items.map((item) => {
      const [label, ...value] = item.split("|");
      return { label, value: value.join("|") };
    }),
    result,
  };
}

export const productArtworkScenes: Record<string, ArtworkScene> = {
  A002: scene(
    "flow",
    "From request to action",
    "Customer follow-up",
    [
      "Receive request|Inbox",
      "Prepare next step|AI Agent",
      "Review action|Laura Kim",
    ],
    "Ready for review",
  ),
  A003: scene(
    "compare",
    "Learn from feedback",
    "Reviewed workflow change",
    [
      "Original|Missing context",
      "Correction|Attach source",
      "Validation|Review next run",
    ],
    "Proposed revision",
  ),
  A004: scene(
    "compare",
    "Review the result",
    "Expected and actual",
    [
      "Expected|Source attached",
      "Actual|Source attached",
      "Checklist|Ready to review",
    ],
    "Evidence in view",
  ),
  A005: scene(
    "trace",
    "Every step in view",
    "Workflow trace",
    [
      "Request received|Complete",
      "Find context|Complete",
      "Review response|Waiting",
    ],
    "Open the handoff",
  ),
  A006: scene(
    "hub",
    "Your tools, connected",
    "Scoped connections",
    [
      "Gmail|Read inbox",
      "Drive|Find context",
      "Slack|Notify team",
      "Sheets|Update record",
    ],
    "One connected workflow",
  ),
  A007: scene(
    "architecture",
    "Choose an environment",
    "Deployment options",
    [
      "Hosted|Managed setup",
      "Private|Dedicated boundary",
      "On-premise|Your infrastructure",
    ],
    "Review requirements",
  ),
  A008: scene(
    "permissions",
    "Defined access",
    "Security review",
    ["Agent|Scoped tools", "Reviewer|Approve actions", "Admin|Manage policies"],
    "Actions leave a record",
  ),
  A010: scene(
    "branch",
    "A clear next step",
    "New request",
    [
      "Set condition|Priority is Urgent",
      "Assign to user|Laura Kim",
      "Assign to agent|AI Agent",
    ],
    "Both paths connected",
  ),
  A011: scene(
    "flow",
    "Agents working together",
    "Shared task context",
    [
      "Research agent|Find evidence",
      "Drafting agent|Prepare answer",
      "Reviewer|Check the result",
    ],
    "Context stays connected",
  ),
  A012: scene(
    "review",
    "A useful next action",
    "Customer question",
    [
      "Request|Prepare a reply",
      "Evidence|Team handbook",
      "Proposed action|Send draft for review",
    ],
    "Review before sending",
  ),
  A013: scene(
    "editor",
    "Build it your way",
    "Workflow editor",
    ["Trigger|New message", "Action|Prepare draft", "Review|Assign to user"],
    "Configure each step",
  ),
  A015: scene(
    "architecture",
    "Your connected workspace",
    "Shared context",
    ["Agents|Team roles", "Tools|Scoped actions", "Knowledge|Working sources"],
    "One place to coordinate",
  ),
  A017: scene(
    "branch",
    "Workflow Builder",
    "When a request arrives",
    [
      "Set condition|Priority is Urgent",
      "Assign to user|Laura Kim",
      "Assign to agent|AI Agent",
    ],
    "Map the next step",
  ),
  A018: scene(
    "editor",
    "From request to reviewed result",
    "Workflow overview",
    [
      "Trigger|Request received",
      "Condition|Needs review",
      "Action|Prepare response",
      "Review|Laura Kim",
    ],
    "Keep every handoff visible",
  ),
  A019: scene(
    "flow",
    "Repeatable steps",
    "Reusable operation",
    [
      "Collect|Request details",
      "Prepare|Proposed action",
      "Review|Confirm outcome",
    ],
    "Use this sequence again",
  ),
  A020: scene(
    "flow",
    "A shared understanding",
    "Customer onboarding",
    ["Intake|Laura Kim", "Prepare|AI Agent", "Handoff|Alex Morgan"],
    "Owner and context included",
  ),
  A021: scene(
    "review",
    "A useful follow-up",
    "Workflow completed",
    [
      "Result|Draft is ready",
      "Next action|Review response",
      "Assigned to|Laura Kim",
    ],
    "A clear next owner",
  ),
  A022: scene(
    "branch",
    "Triggers and conditions",
    "Message received",
    [
      "Set condition|Category is Support",
      "Review request|Laura Kim",
      "Prepare response|AI Agent",
    ],
    "The rule determines the path",
  ),
  A023: scene(
    "dashboard",
    "Workflow activity",
    "Recent runs",
    [
      "Draft response|Completed",
      "Review request|Needs review",
      "Update record|Running",
    ],
    "One exception to review",
  ),
  A024: scene(
    "trace",
    "Workflow history",
    "Run #1042",
    [
      "Request received|09:41",
      "Context retrieved|09:42",
      "Draft prepared|09:42",
      "Review assigned|09:43",
    ],
    "Follow the steps behind the status",
  ),
  A026: scene(
    "branch",
    "Graph-based execution",
    "Start with a request",
    [
      "Choose a path|Context is Complete",
      "Review output|Laura Kim",
      "Gather context|AI Agent",
    ],
    "One route highlighted",
  ),
  A027: scene(
    "editor",
    "Reusable building blocks",
    "Compose an operation",
    ["Trigger|Inbox event", "Skill|Extract details", "Tool|Update record"],
    "Save as a reusable workflow",
  ),
  A028: scene(
    "flow",
    "Multi-agent orchestration",
    "Shared request",
    [
      "Research agent|Attach sources",
      "Planning agent|Set next steps",
      "Writing agent|Prepare draft",
    ],
    "One task, clear roles",
  ),
  A029: scene(
    "compare",
    "Review and iterate",
    "Revise a workflow step",
    [
      "Before|Draft without source",
      "Correction|Include reference",
      "Next run|Source attached",
    ],
    "Review the proposed change",
  ),
  A030: scene(
    "compare",
    "Define a good result",
    "Evaluation checklist",
    [
      "Expected|Required fields present",
      "Actual|One field missing",
      "Review|Check source record",
    ],
    "Incomplete result flagged",
  ),
  A031: scene(
    "review",
    "Keep people in the loop",
    "Proposed customer reply",
    [
      "Context|Request and account",
      "Draft|Ready for review",
      "Reviewer|Laura Kim",
    ],
    "Approve or request a revision",
  ),
  A032: scene(
    "settings",
    "Choose the model for the task",
    "Model routing",
    [
      "Drafting|Writing model",
      "Reasoning|Planning model",
      "Extraction|Document model",
    ],
    "Review each assignment",
  ),
  A033: scene(
    "search",
    "Keep useful context close",
    "Current task context",
    [
      "Team handbook|Working instructions",
      "Prior decision|Reviewed by Laura",
      "Account record|Updated source",
    ],
    "Sources stay attached",
  ),
  A035: scene(
    "search",
    "A clearer answer",
    "What should happen next?",
    [
      "Customer request|Original question",
      "Team handbook|Relevant guidance",
      "Draft answer|Ready for review",
    ],
    "Review the evidence behind the answer",
  ),
  A036: scene(
    "flow",
    "Turn a request into a plan",
    "Prepare a customer follow-up",
    [
      "Gather context|Request and records",
      "Prepare response|Depends on context",
      "Human review|Before sending",
    ],
    "An ordered plan",
  ),
  A037: scene(
    "hub",
    "Tools in the flow",
    "Agent workspace",
    [
      "Gmail|Read request",
      "Drive|Find document",
      "Slack|Ask reviewer",
      "Sheets|Update record",
    ],
    "Access stays scoped",
  ),
  A038: scene(
    "flow",
    "Move work forward",
    "Run a reviewed task",
    [
      "Tool action|Retrieve record",
      "Prepare update|Draft change",
      "Confirm outcome|Review complete",
    ],
    "A visible execution path",
  ),
  A039: scene(
    "settings",
    "Define the agent's role",
    "Customer support agent",
    [
      "Role|Prepare helpful replies",
      "Instructions|Use approved sources",
      "Boundary|Ask before sending",
    ],
    "Draft follows the instructions",
  ),
  A040: scene(
    "templates",
    "Start with a useful example",
    "Agent templates",
    [
      "Support reply|Draft and review",
      "Research brief|Sources attached",
      "Team follow-up|Clear next steps",
    ],
    "Customize the selected example",
  ),
  A041: scene(
    "compare",
    "Learn from a correction",
    "A reviewed improvement",
    [
      "Original|Incomplete answer",
      "Feedback|Add source context",
      "Proposed update|Retest instruction",
    ],
    "Validate before accepting",
  ),
  A042: scene(
    "review",
    "Review the proposal",
    "Action awaiting approval",
    [
      "Proposed action|Update account record",
      "Evidence|Original request",
      "Reviewer|Laura Kim",
    ],
    "A person makes the decision",
  ),
  A044: scene(
    "templates",
    "Three ways to start",
    "Create a workflow",
    [
      "Use a template|A ready starting point",
      "Describe the task|Start from a prompt",
      "Blank canvas|Build step by step",
    ],
    "Choose your starting point",
  ),
  A045: scene(
    "hub",
    "Your tools, connected",
    "Connector settings",
    [
      "Gmail|Read messages",
      "Drive|Read files",
      "Slack|Post updates",
      "Sheets|Edit selected sheet",
    ],
    "Review permissions for each tool",
  ),
  A046: scene(
    "editor",
    "Make the logic visible",
    "Selected step: Prepare draft",
    ["Trigger|New request", "Action|Prepare draft", "Review|Assign to Laura"],
    "Configure the selected node",
  ),
  A047: scene(
    "templates",
    "Start with a reusable skill",
    "Skill library",
    [
      "Summarize a thread|Collect context",
      "Extract action items|Assign owners",
      "Prepare a response|Review before sending",
    ],
    "Edit the operation to fit your team",
  ),
  A048: scene(
    "compare",
    "Test before going live",
    "Sample workflow run",
    [
      "Input|Customer question",
      "Expected|Draft with source",
      "Actual|Draft with source",
    ],
    "Review the test result",
  ),
  A049: scene(
    "trace",
    "Find the step that needs attention",
    "Debug a test run",
    [
      "Read request|Complete",
      "Find account|Missing field",
      "Prepare response|Waiting",
      "Review result|Not started",
    ],
    "Inspect input and output",
  ),
  A050: scene(
    "compare",
    "Improve with reviewed feedback",
    "Review note attached",
    [
      "Feedback|Include the reference",
      "Revision|Attach source to draft",
      "Comparison|Retest both versions",
    ],
    "Accept after validation",
  ),
  A051: scene(
    "flow",
    "Publish a tested workflow",
    "Version 1.2",
    [
      "Run tests|Reviewed",
      "Release checklist|Ready",
      "Publish version|Previous version kept",
    ],
    "Rollback remains available",
  ),
  A052: scene(
    "library",
    "Bring files into view",
    "Upload documents",
    [
      "Project brief.pdf|Ready",
      "Team handbook.docx|Processing",
      "Contacts.csv|New upload",
    ],
    "Files enter the shared library",
  ),
  A053: scene(
    "library",
    "Files with a place in the work",
    "Search the workspace",
    [
      "Project brief.pdf|Project Atlas",
      "Meeting notes.docx|Laura Kim",
      "Task records.csv|Updated today",
    ],
    "Open a file to see its context",
  ),
  A054: scene(
    "library",
    "Organized records",
    "Project folders",
    [
      "Project Atlas|Brief and notes",
      "Team resources|Handbook",
      "Customer requests|Working records",
    ],
    "A place for every document",
  ),
  A055: scene(
    "search",
    "Focused lookup",
    "Search: onboarding",
    [
      "Onboarding brief|Project Atlas",
      "Checklist|Team resources",
      "Welcome notes|Customer records",
    ],
    "Filter by project and file type",
  ),
  A056: scene(
    "search",
    "Useful context",
    "Connected document",
    [
      "Project brief.pdf|Source document",
      "Follow-up task|Linked workflow",
      "Laura Kim|Document owner",
    ],
    "Keep the document with the task",
  ),
  A057: scene(
    "library",
    "Narrow the file list",
    "Owner: Laura · Type: PDF",
    [
      "Project brief.pdf|Project Atlas",
      "Meeting summary.pdf|Team review",
      "Customer note.pdf|Follow-up",
    ],
    "Active filters stay visible",
  ),
  A058: scene(
    "search",
    "Find a starting point",
    "Search: project next steps",
    [
      "Project brief|Objectives and owners",
      "Meeting notes|Decisions and actions",
      "Task list|Current progress",
    ],
    "Relevant excerpts in one view",
  ),
  A059: scene(
    "library",
    "Details stay with the document",
    "Project brief.pdf",
    [
      "Owner|Laura Kim",
      "Tags|Project Atlas",
      "Source|Shared files",
      "Linked workflow|Customer follow-up",
    ],
    "Preview and context side by side",
  ),
  A060: scene(
    "website",
    "Shape your website",
    "Property website editor",
    [
      "Page sections|Welcome, listings, contact",
      "Selected section|Available properties",
      "Content source|Property records",
    ],
    "Preview your changes",
  ),
  A061: scene(
    "website",
    "A clear first impression",
    "Desktop and mobile preview",
    [
      "Welcome|Your next place",
      "Properties|Available homes",
      "Contact|Book a conversation",
    ],
    "One design across screen sizes",
  ),
  A062: scene(
    "website",
    "Connected property content",
    "Listing record",
    [
      "Property|Garden apartment",
      "Availability|Available",
      "Website card|Linked record",
    ],
    "Content stays connected",
  ),
  A063: scene(
    "website",
    "A familiar place to sign in",
    "Resident access",
    [
      "Website|Resident portal",
      "Account|Sign in",
      "Dashboard|Documents and requests",
    ],
    "A clear path to the account",
  ),
  A064: scene(
    "website",
    "Build a connected website",
    "Editor and responsive preview",
    [
      "Page layout|Property overview",
      "Mobile preview|Same content",
      "Content controls|Listings and access",
    ],
    "A website built around the work",
  ),
  A065: scene(
    "templates",
    "Choose a website foundation",
    "Website templates",
    [
      "Editorial|Focused on the story",
      "Portfolio|A listing-led layout",
      "Community|Shared information",
    ],
    "Preview desktop and mobile",
  ),
  A066: scene(
    "website",
    "Resident access",
    "Account entry point",
    [
      "Email|resident@example.com",
      "Sign in|Access your account",
      "Account|Documents and requests",
    ],
    "Keep resident access close by",
  ),
  A067: scene(
    "website",
    "Available properties",
    "Property listing view",
    [
      "Garden apartment|Available",
      "Parkside studio|Available",
      "Courtyard home|Coming soon",
    ],
    "Filter and open a listing",
  ),
  A068: scene(
    "search",
    "Answers grounded in context",
    "What does the policy say?",
    [
      "Team handbook|Relevant passage",
      "Reviewed procedure|Supporting source",
      "Draft answer|References attached",
    ],
    "Keep the source with the answer",
  ),
  A069: scene(
    "search",
    "Retrieve the relevant passage",
    "Search: approval process",
    [
      "Approval guide|Best match",
      "Workflow notes|Related context",
      "Reviewed answer|Open source",
    ],
    "Ranked results with references",
  ),
  A070: scene(
    "library",
    "Working files, together",
    "Knowledge library",
    [
      "Handbook.pdf|Document",
      "Records.csv|Spreadsheet",
      "Brief.docx|Working file",
    ],
    "Format and processing state in view",
  ),
  A071: scene(
    "search",
    "Context for the current task",
    "Agent context drawer",
    [
      "Current request|Active task",
      "Project brief|Attached source",
      "Account record|Latest revision",
    ],
    "Relevant knowledge stays current",
  ),
  A072: scene(
    "table",
    "Shared information, connected",
    "Customer follow-up records",
    ["Atlas|Laura · Review", "Northstar|Alex · Draft", "Cedar|Team · Ready"],
    "Selected record feeds the workflow",
  ),
  A074: scene(
    "branch",
    "Make room for judgment",
    "Request received",
    [
      "Choose route|Routine or exception",
      "Review exception|Laura Kim",
      "Continue workflow|AI Agent",
    ],
    "Clear routes and review points",
  ),
  A075: scene(
    "flow",
    "Different inputs, one request",
    "Normalize incoming context",
    [
      "Email + document|Original sources",
      "Extract details|Common fields",
      "Request record|Ready for review",
    ],
    "Keep the original evidence",
  ),
  A076: scene(
    "hub",
    "Connect the systems involved",
    "Workflow handoffs",
    [
      "Gmail|Receive request",
      "Drive|Read context",
      "Sheets|System of record",
      "Slack|Review update",
    ],
    "Choose the action and access scope",
  ),
  A077: scene(
    "compare",
    "Refine the process",
    "Reviewed correction",
    [
      "Run result|Missing reference",
      "Review note|Attach source",
      "Revised process|Ready to retest",
    ],
    "Learn from reviewed work",
  ),
  A078: scene(
    "compare",
    "Define a successful outcome",
    "Outcome rubric",
    [
      "Required fields|Name and request",
      "Expected action|Draft for review",
      "Review state|Check completeness",
    ],
    "An explicit outcome to evaluate",
  ),
  A079: scene(
    "review",
    "People at the decision point",
    "Approval gate",
    [
      "Proposed action|Send customer reply",
      "Supporting context|Source and draft",
      "Decision owner|Laura Kim",
    ],
    "Wait for a person's decision",
  ),
  A080: scene(
    "flow",
    "Intentional handoffs",
    "Agent coordination",
    [
      "Research|Source context",
      "Planning|Proposed next action",
      "Review|Owner receives both",
    ],
    "Pass the context with the task",
  ),
  A081: scene(
    "dashboard",
    "Ready for everyday work",
    "Operations workspace",
    [
      "Run queue|Active workflows",
      "Exception|Needs review",
      "Reviewer|Laura Kim",
    ],
    "Keep unresolved work visible",
  ),
  A082: scene(
    "dashboard",
    "Where to improve next",
    "Review opportunities",
    [
      "Response workflow|Missing context",
      "Record update|Needs review",
      "Follow-up|Ready to validate",
    ],
    "Group feedback by workflow",
  ),
  A083: scene(
    "flow",
    "A correction becomes a change",
    "Improvement process",
    [
      "Capture correction|Review note",
      "Propose revision|Updated instruction",
      "Validate|Compare results",
    ],
    "Accept the reviewed revision",
  ),
  A084: scene(
    "library",
    "Your team's working knowledge",
    "Domain knowledge",
    [
      "Team handbook|Instructions",
      "Reviewed examples|Reference answers",
      "Operating guide|Working rules",
    ],
    "Connect knowledge to the agent",
  ),
  A085: scene(
    "compare",
    "Correct the field, revisit the rule",
    "Extracted account name",
    [
      "Original|Atlas Services",
      "Corrected|Atlas Studio",
      "Instruction|Use the signed source",
    ],
    "Proposed correction for review",
  ),
  A086: scene(
    "review",
    "Capture useful feedback",
    "Review an agent output",
    [
      "Output|Customer response",
      "Correction|Include the source",
      "Example|Reviewed reply attached",
    ],
    "Save feedback with the result",
  ),
  A087: scene(
    "compare",
    "Validate the change",
    "Same input, two versions",
    [
      "Before|Incomplete reference",
      "After|Source included",
      "Expected|Reference attached",
    ],
    "Review before relying on it",
  ),
  A088: scene(
    "dashboard",
    "Track reviewed progress",
    "Workflow versions",
    [
      "Version 1|Baseline review",
      "Version 2|Source correction",
      "Version 3|Validation pending",
    ],
    "Compare outcomes across versions",
  ),
  A089: scene(
    "review",
    "A shared review habit",
    "Team improvement queue",
    [
      "Owner|Laura Kim",
      "Discussion|Clarify the next step",
      "Next action|Review proposed change",
    ],
    "Keep the improvement moving",
  ),
  A090: scene(
    "trace",
    "Find the level that needs attention",
    "Evaluation drill-down",
    [
      "Task|Response prepared",
      "Step|Extract account",
      "Field|Account name flagged",
    ],
    "Open the original source",
  ),
  A091: scene(
    "compare",
    "A human-reviewed baseline",
    "Reference comparison",
    [
      "Reference answer|Source included",
      "Agent answer|Missing reference",
      "Review note|Attach the evidence",
    ],
    "Same input and expectations",
  ),
  A092: scene(
    "branch",
    "A clear recovery path",
    "Step could not complete",
    [
      "Retry condition|Attempts below limit",
      "Escalate|Laura Kim",
      "Retry step|AI Agent",
    ],
    "Limits and escalation are explicit",
  ),
  A093: scene(
    "settings",
    "Define a correct answer",
    "Evaluation rubric",
    [
      "Required field|Account name",
      "Required source|Original request",
      "Business rule|Review before action",
    ],
    "Compare against the rubric",
  ),
  A094: scene(
    "library",
    "Test the work you expect",
    "Evaluation dataset",
    [
      "Typical request|Expected draft",
      "Missing context|Ask for details",
      "Unusual input|Send for review",
    ],
    "Include the edge cases",
  ),
  A095: scene(
    "review",
    "Connect review to improvement",
    "Flagged evaluation",
    [
      "Issue|Source not attached",
      "Feedback|Include the reference",
      "Next change|Update and retest",
    ],
    "Review the proposed improvement",
  ),
  A096: scene(
    "dashboard",
    "Look beyond completed tasks",
    "Evaluation overview",
    [
      "Quality review|Sample results",
      "Unresolved issues|Missing context",
      "Outcome|Awaiting validation",
    ],
    "Keep the evidence in view",
  ),
  A097: scene(
    "report",
    "Evidence behind progress",
    "Evaluation report",
    [
      "Reviewed outcomes|Reference comparison",
      "Example result|Source attached",
      "Next improvement|Retest correction",
    ],
    "Share the supporting evidence",
  ),
  A098: scene(
    "dashboard",
    "See the operation moving",
    "Workflow performance",
    [
      "Run volume|Recent activity",
      "Duration|Step timing",
      "Exception queue|Needs review",
    ],
    "Open the runs that need attention",
  ),
  A099: scene(
    "trace",
    "Find the source of a wrong result",
    "Result investigation",
    [
      "Result|Account update",
      "Field|Account name flagged",
      "Source|Original request",
    ],
    "Trace the field to its source",
  ),
  A100: scene(
    "trace",
    "Follow the full sequence",
    "Execution trace",
    [
      "Agent|Read request",
      "Tool|Find record",
      "Agent|Prepare response",
      "Reviewer|Confirm handoff",
    ],
    "Input and output stay connected",
  ),
  A101: scene(
    "trace",
    "Technical signals in context",
    "Search: run #1042",
    [
      "09:41:02|Request received",
      "09:41:03|Tool call complete",
      "09:41:04|Review event created",
    ],
    "Logs belong to the selected run",
  ),
  A102: scene(
    "dashboard",
    "Resources behind the work",
    "Usage breakdown",
    [
      "Drafting model|Response workflow",
      "Extraction model|Document workflow",
      "Tool usage|Record lookup",
    ],
    "Group resources by workflow",
  ),
  A103: scene(
    "compare",
    "Measure the correction",
    "Version comparison",
    [
      "Before|Missing source",
      "After|Source attached",
      "Review|Compare real outcomes",
    ],
    "A change with reviewable evidence",
  ),
  A104: scene(
    "dashboard",
    "Review the agent fleet",
    "Agent overview",
    [
      "Research agent|Finding context",
      "Writing agent|Draft ready",
      "Review agent|Needs attention",
    ],
    "Roles, status and active work",
  ),
  A105: scene(
    "report",
    "Operational data in your reports",
    "Choose report metrics",
    [
      "Workflow volume|Activity",
      "Review queue|Unresolved work",
      "Resource use|Model and tool usage",
    ],
    "Share a useful operational view",
  ),
  A106: scene(
    "architecture",
    "Hosted deployment",
    "Managed environment",
    [
      "Team access|Authenticated users",
      "Application|Innflow workspace",
      "Services|Managed infrastructure",
    ],
    "Review operational requirements",
  ),
  A107: scene(
    "architecture",
    "A dedicated setup",
    "Private environment boundary",
    [
      "Access boundary|Your team",
      "Application|Dedicated workload",
      "Data services|Defined isolation",
    ],
    "Agree on the environment boundary",
  ),
  A108: scene(
    "architecture",
    "Within your infrastructure",
    "On-premise responsibilities",
    [
      "Infrastructure|Your operations team",
      "Application|Defined workload",
      "Support|Agreed responsibilities",
    ],
    "Map ownership before rollout",
  ),
  A109: scene(
    "settings",
    "Choose model access deliberately",
    "Environment model access",
    [
      "Writing provider|Approved access",
      "Reasoning provider|Scoped credentials",
      "Document provider|Review data path",
    ],
    "Connect the approved providers",
  ),
  A110: scene(
    "regions",
    "Define where data stays",
    "Regional deployment",
    [
      "Selected region|Primary location",
      "Storage boundary|Defined scope",
      "Transfer policy|Review access",
    ],
    "Confirm the location requirements",
  ),
  A111: scene(
    "flow",
    "Move between environments",
    "Migration plan",
    [
      "Source|Current environment",
      "Validation|Check data and workflows",
      "Destination|Reviewed configuration",
    ],
    "A staged change of environment",
  ),
  A112: scene(
    "permissions",
    "Controls for the environment",
    "Deployment governance",
    [
      "Operator|Manage runs",
      "Reviewer|Review changes",
      "Admin|Configure boundaries",
    ],
    "Access follows responsibility",
  ),
  A113: scene(
    "review",
    "The right people in the rollout",
    "Deployment checklist",
    [
      "Infrastructure|Confirm environment",
      "Security|Review access",
      "Operations|Assign support owner",
    ],
    "Bring the owners into the plan",
  ),
  A114: scene(
    "library",
    "Evidence for your review",
    "Security evidence library",
    [
      "Policies|Review documents",
      "Access assessment|Assigned reviewer",
      "Infrastructure notes|Supporting evidence",
    ],
    "Documentation for assessment",
  ),
  A115: scene(
    "flow",
    "Where information travels",
    "Data-flow boundaries",
    [
      "Collection|Incoming request",
      "Processing|Scoped workload",
      "Storage|Defined destination",
    ],
    "Review sharing at each boundary",
  ),
  A116: scene(
    "settings",
    "Make data handling explicit",
    "Data controls",
    [
      "Retention|Set a policy",
      "Deletion|Review the process",
      "Storage|Choose the scope",
    ],
    "Document the handling rules",
  ),
  A117: scene(
    "permissions",
    "Match access to responsibility",
    "Role permissions",
    [
      "Reader|View records",
      "Reviewer|Approve actions",
      "Admin|Manage policies",
    ],
    "Review a scoped access request",
  ),
  A118: scene(
    "trace",
    "Keep actions explainable",
    "Audit record",
    [
      "09:41 · AI Agent|Prepared response",
      "09:43 · Laura Kim|Reviewed draft",
      "09:44 · Workflow|Updated record",
    ],
    "Actor, action and affected record",
  ),
  A119: scene(
    "architecture",
    "Protection along the data path",
    "Transport and storage review",
    [
      "In transit|Connection controls",
      "Processing|Workload boundary",
      "At rest|Storage controls",
    ],
    "Review the complete path",
  ),
  A120: scene(
    "permissions",
    "Boundaries for an agent",
    "Allowed inputs and actions",
    [
      "Input|Approved sources",
      "Tools|Scoped actions",
      "Restricted|Requires review",
    ],
    "Make the agent's limits explicit",
  ),
  A121: scene(
    "architecture",
    "Infrastructure in the review",
    "Deployment security",
    [
      "Network|Defined boundary",
      "Workload|Scoped services",
      "Administration|Controlled access",
    ],
    "Review each infrastructure layer",
  ),
};
