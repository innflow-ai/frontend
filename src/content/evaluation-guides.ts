type Guide = {
  slug: string;
  title: string;
  question: string;
  headings?: [string, string, string];
  trial: string;
  check: string;
  tradeoff: string;
  next: { label: string; href: string };
};

export const evaluationGuides: Guide[] = [
  {
    slug: "ai-agents",
    title: "Choosing an AI agent",
    question:
      "Can the agent finish a bounded assignment and show you the evidence?",
    trial:
      "Give it a resolved customer request, the source documents and permission to draft a response. Withhold the approved answer. Include one missing detail that a person needs to supply.",
    check:
      "Compare the draft with the approved resolution. Look for accurate citations, a clear request for the missing detail and a visible stop before sending.",
    tradeoff:
      "An agent that asks early may take another turn. Measure how much correction the reviewer needs before accepting the result.",
    next: { label: "Explore bot mode", href: "/products/ai-agents" },
  },
  {
    slug: "ai-assistants",
    title: "Choosing an AI assistant",
    question: "How much editing does a teammate need before using the answer?",
    trial:
      "Give each assistant the same meeting notes and ask for a short client recap. Include a proposal that was discussed and then declined.",
    check:
      "Check names, dates and decisions against the notes. The declined proposal should stay out of the list of commitments.",
    tradeoff:
      "A polished summary can still misstate a decision. Track factual corrections separately from changes to tone.",
    next: { label: "Browse model workflow guides", href: "/models" },
  },
  {
    slug: "slack-alternatives",
    title: "Evaluating alternatives to Slack",
    question:
      "Which parts of your current channel workflow would a replacement need to carry?",
    trial:
      "Choose a completed escalation. Recreate the opening message, its thread, the decision and the link to the resolution. Ask a colleague who missed it to recover the full story.",
    check:
      "Record whether the colleague finds the decision and its owner. Separately inventory any Slack apps, external channels and retention settings that the pilot did not exercise.",
    tradeoff:
      "A successful pilot can justify moving one workflow while the team keeps established conversations in Slack.",
    next: {
      label: "Compare Innflow and Slack",
      href: "/compare/innflow-vs-slack",
    },
  },
  {
    slug: "microsoft-teams-alternatives",
    title: "Evaluating alternatives to Microsoft Teams",
    question:
      "Can your team move a conversation while retaining access to the files and meetings it depends on?",
    trial:
      "Pick one recurring project meeting. Use a test channel to share its agenda, capture the decision and hand off a document with its existing sharing permissions.",
    check:
      "Have the meeting organizer, a teammate and an intended guest open the links using their own accounts. Record where someone must request access or resend an invitation.",
    tradeoff:
      "A chat migration and a file migration have different costs. Decide which one the pilot actually needs before estimating rollout work.",
    next: {
      label: "Review channel handoffs",
      href: "/features/communications",
    },
  },
  {
    slug: "small-business-agents",
    title: "Choosing an agent for a small business",
    question: "Can the person who does the work also maintain the setup?",
    trial:
      "Use a week of sample inquiries. Ask one operator to set up a first-response draft, correct a mistake and change the routing rule without handing it to an engineer.",
    check:
      "Count setup time, exceptions needing manual handling and minutes saved per accepted draft. Repeat with the person who covers the operator on days off.",
    tradeoff:
      "Time saved on routine requests matters only if the team can afford the weekly review and upkeep.",
    next: {
      label: "Try a sales follow-up draft",
      href: "/tools/sales-follow-up-email-templates",
    },
  },
  {
    slug: "business-agents",
    title: "Evaluating agents across departments",
    question: "Who owns the task when it crosses a department boundary?",
    trial:
      "Trace a sales promise through delivery and support. Give each team its usual records and ask it to pass forward just the information the next owner needs.",
    check:
      "Verify that each handoff names a recipient, preserves the customer commitment and limits access to the intended people.",
    tradeoff:
      "A shared workflow reduces duplicate entry but needs a designated owner when two departments disagree.",
    next: { label: "Explore agent teammates", href: "/features/teammates" },
  },
  {
    slug: "business-ai-tools",
    title: "Selecting an AI tool for business work",
    question: "Which recurring task has a result you can measure?",
    trial:
      "Choose one task with a known baseline, such as preparing a weekly account report. Run the trial on the same records the team used last week.",
    check:
      "Compare preparation time, reviewer time, missing records and the number of corrections. Include time spent moving information between tools.",
    tradeoff:
      "A faster first draft can add review work. Compare the time to an accepted deliverable.",
    next: { label: "Browse workflow templates", href: "/templates" },
  },
  {
    slug: "team-chat-apps",
    title: "Choosing a team chat app",
    question: "Can someone joining a conversation late still act on it?",
    trial:
      "Run a small project in a channel. Share a file, revise a decision in a thread and hand the next action to someone outside the original conversation.",
    check:
      "Ask the new owner to identify the current file, the decision and the deadline. Note how many messages they need to request those details.",
    tradeoff:
      "Fast messaging helps an active group. Search, permissions and durable decisions determine how well the conversation survives a handoff.",
    next: { label: "Explore channels", href: "/features/communications" },
  },
  {
    slug: "remote-team-chat",
    title: "Choosing chat for a remote team",
    question:
      "Does work continue when the next owner wakes up several hours later?",
    trial:
      "End one shift with a decision, an unresolved question and a deadline in a named time zone. Ask the next shift to continue without a live call.",
    check:
      "Look for accurate timestamps, a clear owner and a way to separate urgent messages from updates that can wait.",
    tradeoff:
      "More notifications can shorten the first response while interrupting focused work. Ask each shift which alerts it actually needed.",
    next: {
      label: "Use a handoff template",
      href: "/templates/agent-teams/operations-sop",
    },
  },
  {
    slug: "marketing-ai-tools",
    title: "Evaluating AI tools for marketing",
    question:
      "Can the tool preserve approved claims across several campaign assets?",
    trial:
      "Give it one approved brief, a product fact sheet and three target formats. Include a claim the reviewer rejected in an earlier draft.",
    check:
      "Compare each output with the fact sheet. Record unsupported claims, changes to the offer and the number of review rounds before approval.",
    tradeoff:
      "Extra variants have little value when the same factual error appears in every asset.",
    next: {
      label: "Use a campaign brief",
      href: "/templates/agent-teams/influencer-campaign-brief",
    },
  },
  {
    slug: "ai-team-chat",
    title: "Evaluating chat with AI teammates",
    question:
      "Can people tell what an agent saw, what it did and who approved the next action?",
    trial:
      "Ask an agent to draft an update using a file in a shared channel. Add a correction in a thread and require a teammate to review the final wording.",
    check:
      "Check that the draft reflects the correction, the reviewer can find its sources and everyone can identify the approved version.",
    tradeoff:
      "Shared context can save repeated explanations. Decide which participants and files belong in each conversation.",
    next: { label: "See how channels work", href: "/features/communications" },
  },
  {
    slug: "agent-platforms",
    title: "Evaluating platforms for agent teams",
    question:
      "How does the platform handle an interrupted task with several owners?",
    trial:
      "Assign research, drafting and review to separate roles. Remove one required input during the trial, restore it and observe who can resume the work.",
    check:
      "Inspect the task history, permission boundaries and retry behavior. Confirm that repeating a step cannot silently duplicate the final action.",
    tradeoff:
      "Flexible orchestration can support more complex work, but someone must understand how to diagnose a stalled run.",
    next: {
      label: "Explore multi-model workflows",
      href: "/features/multi-model-agents",
    },
  },
  {
    slug: "workflow-automation-tools",
    title: "Choosing a workflow automation tool",
    question: "What happens to the workflow when one step fails?",
    trial:
      "Build a request-to-approval flow with sample data. Submit a duplicate request, omit a required field and make an approver unavailable.",
    check:
      "Look for one record per request, a visible recovery path and an owner for the approval queue. Re-run a corrected request and inspect the final records.",
    tradeoff:
      "A quick first setup is valuable. Test changes and recovery too, because real processes keep evolving after launch.",
    next: { label: "Browse flow templates", href: "/templates/flows" },
  },
  {
    slug: "deepseek-usage-limits",
    title: "Sizing a workflow for DeepSeek’s API limits",
    question:
      "How many requests can your team run at once before a queue starts to grow?",
    trial:
      "Record the peak number of requests in flight during a representative batch. DeepSeek counts a connection until its response finishes and shares the concurrency allowance across keys in the same account. Include other jobs that use that account when sizing your batch.",
    check:
      "Use a simulated HTTP 429 response to exercise your queue. Confirm the item waits, retries a bounded number of times and produces one result. Track the oldest waiting item so a stalled queue is visible.",
    tradeoff:
      "Shorter queues help time-sensitive requests. For overnight work, a lower concurrency setting may still meet the deadline and leave room for interactive jobs.",
    next: {
      label: "Check DeepSeek’s current concurrency limits",
      href: "https://api-docs.deepseek.com/quick_start/rate_limit/",
    },
  },
  {
    slug: "deepseek-app-api",
    title: "Taking a DeepSeek task from chat to an API",
    question:
      "What changes when a task you run in chat needs to run unattended?",
    trial:
      "Choose a repeatable task such as extracting a customer’s requested delivery date. Save examples with a date, an ambiguous date and no date. Run them through the API with a server-side key and the same instructions each time.",
    check:
      "Request JSON output, include a sample object in the prompt and validate the returned fields. Treat an empty response or an impossible date as an exception before updating a customer record.",
    tradeoff:
      "A chat lets a teammate clarify an ambiguous request immediately. For unattended runs, decide who reviews exceptions and how a corrected record returns to the workflow.",
    next: {
      label: "Read DeepSeek’s JSON output guide",
      href: "https://api-docs.deepseek.com/guides/json_mode/",
    },
  },
  {
    slug: "deepseek-for-coding",
    title: "Trying DeepSeek on a coding task",
    question:
      "Can a coding assistant make a small change your team can verify?",
    trial:
      "Choose a bug with a short reproduction, such as a formatter that drops leading zeroes from a reference number. Give your coding assistant the failing example and the expected output. DeepSeek’s API guide lists compatible coding tools and their setup instructions.",
    check:
      "Run the proposed change against the failing example and an ordinary input. Inspect the diff for changes outside the formatter. Record the model, prompt and reviewer edits so another teammate can repeat the trial.",
    tradeoff:
      "Compare the time spent reviewing and correcting the patch with the time it takes to write it. A passing example is only the first check before merging.",
    next: {
      label: "Find DeepSeek’s coding tool integrations",
      href: "https://api-docs.deepseek.com/",
    },
  },
  {
    slug: "discord-for-teams",
    title: "Would Discord work for your team?",
    question:
      "Try one support handoff that starts in text and needs a quick screen share.",
    trial:
      "Set up an invite-only test server with a text channel for questions and a voice channel for office hours. Ask a colleague to post a sample issue, join you in voice to demonstrate it, then write the resolution back in the text channel.",
    check:
      "Invite a third teammate after the call. Can they find the resolution, identify who owns the follow-up and tell which channel to use next time? Check what a guest can see with a separate guest account.",
    tradeoff:
      "Drop-in voice works well for live troubleshooting. If decisions disappear after calls, agree on who writes them down before moving another team into the server.",
    next: {
      label: "Read Discord’s guide to servers and channels",
      href: "https://support.discord.com/hc/en-us/articles/360045138571-Beginner-s-Guide-to-Discord",
    },
  },
  {
    slug: "discord-nitro",
    title: "When is Discord Nitro worth it?",
    question:
      "Would a paid perk remove a recurring obstacle for the person using it?",
    trial:
      "Choose a real screen share or file handoff that was difficult last week. Repeat it on your current plan. Note the attachment size or the smallest text the viewer must be able to read, then compare that requirement with Discord’s current plan table.",
    check:
      "For a screen share, ask the viewer to read a label from the actual demo at their normal window size. For an upload, check the recipient can open the original file. Record how often a link or a smaller export already solves the problem.",
    tradeoff:
      "A recurring need for larger uploads can justify paying for the teammate who sends them. If the only benefit you want is profile customization, evaluate it as a personal preference.",
    next: {
      label: "Compare Discord’s Nitro plans",
      href: "https://discord.com/nitro",
    },
  },
  {
    slug: "deepseek-harness-plugins",
    title: "Choosing a DeepSeek Harness plugin",
    question: "Does the plugin add a capability your workflow actually needs?",
    trial:
      "Pick a specific job, such as turning a sample report into a table. In a test profile, run the task once with your current setup. Check the candidate plugin’s publisher, release and documentation before enabling it and repeating the same task.",
    check:
      "Compare the tables row by row. Record any new permissions or dependencies and confirm you can disable the plugin and repeat the original run. The Discover and Installed views answer different questions about what is available and what is on your system.",
    tradeoff:
      "Keep the plugin if the improvement justifies maintaining another dependency. Record the tested version and an example output so the next maintainer can check an upgrade.",
    next: {
      label: "Read the DeepSeek Harness plugin market guide",
      href: "https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/plugin-market.md",
    },
  },
  {
    slug: "deepseek-harness-creator-mode",
    title: "Trying Creator mode in DeepSeek Harness",
    question: "Can another teammate reproduce the customization you made?",
    trial:
      "Use a separate test profile. Ask Creator mode for one small change, such as a reusable report formatter. Specify the input, expected columns and an example with one missing value. Review what the proposed plugin will install before accepting changes.",
    check:
      "Run the formatter on both examples, reopen the profile and repeat the test. List which changes persist and which were specific to the conversation. Confirm you can return the profile to its earlier setup.",
    tradeoff:
      "A one-off formatting request is quick to handle in chat. A persistent plugin earns its upkeep when the same format recurs and someone owns its tests.",
    next: {
      label: "Inspect the Harness plugin manager documentation",
      href: "https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/boot/plugin-manager/README.md",
    },
  },
  {
    slug: "gpt-6-2-sol-vs-astra",
    title: "Compare GPT-6.2 Sol and Astra on a customer handoff",
    question: "Which draft could the next shift use with fewer corrections?",
    trial:
      "Give both models the same handoff notes. At 9 a.m. a customer requested a Friday installation. At noon the installer offered Monday. At 3 p.m. the customer asked whether Friday was still possible. Ask for a status update, an owner and a next action. Keep tool access and response length the same.",
    check:
      "A usable handoff says Monday was offered and the installation date is unconfirmed. It assigns someone to check Friday availability. Hide the model names and have the next shift score each draft on those three points.",
    tradeoff:
      "Repeat with resolved and canceled requests from your own queue. Compare reviewer time and cost per accepted handoff alongside response time.",
    next: {
      label: "Try the Astra launch-plan exercise",
      href: "/models/gpt-6-2-astra",
    },
  },
  {
    slug: "qwen4-max-preview-comparison",
    title: "Compare Qwen4-Max with a saved preview run",
    question:
      "Would changing versions alter an action your team had already approved?",
    trial:
      "Start with a saved preview prompt and its original response. For an order-routing test, include one order exactly at the approval threshold, one below it and one without a total. Run the same prompt with the current model and record the model identifiers and settings.",
    check:
      "Score both outputs against the written policy. If approval starts at 500, an order for 500 goes to review, an order for 499 follows the ordinary path and an unknown total needs clarification. Check the assigned action separately from the explanation.",
    tradeoff:
      "If the original response or settings are missing, use this run as the first baseline. A historical comparison needs enough evidence to reproduce both sides.",
    next: {
      label: "Open the Qwen4-Max workflow guide",
      href: "/models/qwen4-max",
    },
  },
  {
    slug: "seedream-5-5-vs-gpt-image-2-6",
    title: "Compare Seedream 5.5 and GPT Image 2.6 on a product edit",
    question:
      "Which image can your designer approve after two rounds of changes?",
    trial:
      "Start both tools with the same product packshot and request a warm gray background. For the second edit, ask each to move the shadow to the right. Use the same crop and output size where available, and save the original plus both rounds.",
    check:
      "Compare all versions at full size. Look at the smallest line of label text, the outline of the cap and a fixed point on the bottle. Then inspect at the size of your product card. Record any changed lettering, shifted geometry or stray edge visible at either size.",
    tradeoff:
      "Count the time a designer spends fixing each candidate, including redoing the second edit. A quick first draft can still be expensive to finish.",
    next: {
      label: "Open the Seedream product-photo exercise",
      href: "/models/seedream-5-5",
    },
  },
  {
    slug: "gemini-4-hydrogen-test",
    title: "Evaluate Gemini 4 Hydrogen on a reporting task",
    question: "Can the report distinguish a missing value from a genuine zero?",
    trial:
      "In a workspace with the named model available, supply three rows of sample weekly sales. Set Monday to 120, Tuesday to zero and Wednesday to blank. Ask for total recorded sales, the average across reported days and a sentence explaining the missing day. Save the exact model identifier with the answer.",
    check:
      "The reported total is 120 and the average is 60 across two days. Wednesday is unknown. An answer that averages across three days or describes Wednesday as a day without sales would mislead the reader.",
    tradeoff:
      "Repeat with one of your real reporting conventions, such as returns recorded as negative sales. Keep both cases in your review set before using the model to draft a recurring report.",
    next: { label: "Browse model workflow guides", href: "/models" },
  },
  {
    slug: "claim-your-business-in-chatgpt",
    title: "How to claim your business in ChatGPT",
    question:
      "Claiming the listing lets an authorized representative manage the details customers see. Start with the account that will manage the business.",
    headings: [
      "Find the correct listing",
      "Verify your authority",
      "Review what customers will see",
    ],
    trial:
      "In ChatGPT, open Business Hub and search for your business. Match its name and location before starting the claim. If the listing calls for a tenant administrator, have your organization’s ChatGPT administrator start the request.",
    check:
      "Choose a verification method offered on the listing. Depending on the business, this can include business email, phone or a website DNS record. Check the profile for the separate Persona identity-verification step. Use the legal name on the business registration.",
    tradeoff:
      "Review the address, website and policies before submitting a new profile. OpenAI says approval of a new profile created through Persona publishes it automatically. Once approved, use Business Hub to manage updates. Setting up a customer-facing agent is a separate choice with its own eligibility requirements.",
    next: {
      label: "Check OpenAI’s current setup and eligibility instructions",
      href: "https://help.openai.com/en/articles/20001635-setting-up-your-business-on-chatgpt",
    },
  },
  {
    slug: "deepseek-super-agent-design",
    title: "How DeepSeek SuperAgent separates routing from execution",
    question:
      "When a teammate changes the brief halfway through a task, how does the right worker get the update?",
    headings: [
      "Follow one request",
      "Trace the follow-up",
      "Decide when to interrupt",
    ],
    trial:
      "DeepSeek’s prototype separates the session that talks to people from the workers that carry out assignments. Use a small repository task as an example. Ask for a correction to a README link, then follow the ticket from the original request through assignment to the worker’s report.",
    check:
      "While the ticket is open, clarify which release branch the README belongs to. Check that the clarification reaches the worker assigned to that ticket. A reviewer should be able to recover the original instruction, the correction and the resulting change in order.",
    tradeoff:
      "Routine progress can stay with the ticket. A question that blocks the worker needs to reach the person who can answer it. Decide which events merit an interruption before you add more workers.",
    next: {
      label: "Explore DeepSeek’s SuperAgent architecture",
      href: "https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/007-architecture.md",
    },
  },
  {
    slug: "testing-deepseek-super-agent",
    title: "Test DeepSeek SuperAgent with two tasks in flight",
    question:
      "Can a worker ask for missing information while another task moves forward?",
    headings: [
      "Give the workers independent assignments",
      "Inspect both tickets",
      "Measure the coordination cost",
    ],
    trial:
      "In a test repository, ask for two small documentation updates. Give the first a complete brief. Leave a release date out of the second and instruct the worker to ask for it. Keep the tickets separate so you can tell which request owns each question.",
    check:
      "Answer the date question in its original conversation. Verify that only the matching ticket uses the answer, the first change still completes, and both results link back to the correct request. Record any manual correction needed to untangle the work.",
    tradeoff:
      "Compare the parallel run with doing the same tasks one at a time. Count interruptions, time waiting for answers and review time. Two workers finishing sooner helps only if the reviewer can still tell which change belongs to whom.",
    next: {
      label: "Read the prototype’s execution and ticket model",
      href: "https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/003-execution.md",
    },
  },
  {
    slug: "build-a-personal-agent",
    title: "Design a personal agent around one recurring decision",
    question: "What should be on your desk before Monday’s account review?",
    trial:
      "Take last Monday’s finished briefing and give the agent only the notes available the evening before. Ask it to identify accounts with overdue promises and cite the message that establishes each due date.",
    check:
      "Include a promise that was subsequently renegotiated. Check whether the briefing uses the new date, leaves genuinely uncertain dates open and gives you a way to inspect the source.",
    tradeoff:
      "Save the corrected brief and the instructions that produced it. Try the next week’s notes before adding a second responsibility.",
    next: { label: "Explore Bot mode", href: "/products/ai-agents" },
  },
  {
    slug: "evaluate-an-ai-product",
    title: "Design an AI feature around a decision you can test",
    question:
      "Can the team agree on a useful answer before it chooses a model?",
    trial:
      "Take a support escalation and write down the decision the operator needs to make. Build three examples: one ready to escalate, one missing evidence and one already resolved. Have the operator write the expected action for each.",
    check:
      "Give the same cases to each prototype. Mark a failure when the action changes, evidence is invented or a resolved issue is reopened. Record wording preferences separately.",
    tradeoff:
      "When a prototype fails, change one thing at a time: the source material, the instructions or the model. Re-run the same cases to see which change mattered.",
    next: { label: "Compare model workflow guides", href: "/models" },
  },
  {
    slug: "agent-ownership",
    title: "Give recurring agent work a team owner",
    question: "Who notices when a weekly job stops producing a usable result?",
    trial:
      "Choose a recurring review with a real deadline. Name the person who owns the final decision, the source records the agent may read and a backup owner. Write down where an incomplete run should appear.",
    check:
      "Try a run with the source file missing. Ask the backup owner to find the exception, restore the input and tell which result is safe to use.",
    tradeoff:
      "Expand the assignment only after both owners can recover it using the written handoff. Count the time spent maintaining the job when estimating its value.",
    next: { label: "Explore agent teammates", href: "/features/teammates" },
  },
  {
    slug: "shared-agent-workspace",
    title: "Move an agent from personal use into a shared workspace",
    question:
      "What context does a second operator need to finish someone else’s task?",
    trial:
      "Have one teammate start a draft using a shared brief, then hand the work to another teammate halfway through. Give the second operator the task record, approved sources and current draft.",
    check:
      "Ask the second operator to identify the latest customer instruction and the next permitted action. Check whether the workflow depends on private files or a personal connection that the new owner cannot use.",
    tradeoff:
      "Move shared inputs into an appropriate team location and document who maintains each connection. Repeat the handoff before inviting the rest of the team.",
    next: { label: "Explore team channels", href: "/features/communications" },
  },
  {
    slug: "recurring-operations-flow",
    title: "Turn a recurring operating review into a flow",
    question:
      "Which parts of your weekly review follow a rule someone else can repeat?",
    trial:
      "Walk through one completed campaign review. Write down what started it, where the figures came from, who approved the recommendation and what was recorded afterward. Use that sequence to sketch a flow.",
    check:
      "Replay a week with missing figures and another where approval arrived late. Check that the missing input reaches its owner and that the delayed approval applies to the right version.",
    tradeoff:
      "Start with preparation and routing. Add later actions when the owner can identify a duplicate run and recover from an interrupted handoff.",
    next: { label: "Explore flows", href: "/features/workflows" },
  },
  {
    slug: "measure-automation-capacity",
    title: "Measure what an automated team can deliver",
    question:
      "Did the workflow increase accepted output or just produce more drafts?",
    trial:
      "Choose one recurring queue and compare two periods with similar demand. Record incoming cases, completed cases accepted by the reviewer, reopened cases and total staff hours including oversight.",
    check:
      "Calculate accepted cases per staff hour and examine the oldest unresolved case. Check a sample of finished work from each period for the same quality criteria.",
    tradeoff:
      "If throughput rises while rework or waiting time grows, investigate where the work moved. Use these measures to assess operating capacity. Company valuation requires other evidence.",
    next: {
      label: "Explore business evaluation guides",
      href: "/resources/guides/business-agents",
    },
  },
  {
    slug: "agent-launch-handoff",
    title: "Compare three agents on the same product launch",
    question:
      "Can a reviewer reconstruct what happened between a launch brief and a publish decision?",
    trial:
      "Give Claude, Codex and Manus the same sample brief, review deadline and asset checklist where you have access. Include a late change to the release date. Ask each for a launch handoff and keep the outputs as drafts.",
    check:
      "Remove the tool names and compare the final date, open blockers, owner assignments and supporting references. A polished announcement that still carries the old date needs correction.",
    tradeoff:
      "Repeat the exercise with a teammate taking over halfway through. Record recovery and review time alongside time to first draft before choosing a tool.",
    next: {
      label: "Open the launch readiness template",
      href: "/templates/flows/product-launch-automation",
    },
  },
];
