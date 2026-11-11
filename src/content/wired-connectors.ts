export type WiredConnector = {
  name: string;
  href?: string;
  note?: string;
  unbuilt?: boolean;
};

export type ConnectorGroup = {
  name: string;
  items: WiredConnector[];
};

const page = (slug: string) => `/integrations/${slug}`;

export const connectorGroups: ConnectorGroup[] = [
  {
    name: "Google Workspace",
    items: [
      { name: "Gmail", href: page("gmail") },
      { name: "Google Calendar", href: page("google-calendar") },
      { name: "Docs", href: page("google-docs") },
      { name: "Drive", href: page("google-drive") },
      { name: "Forms", href: page("google-forms") },
      { name: "Groups", href: page("google-groups") },
      { name: "Sheets", href: page("google-sheets") },
      { name: "Slides", href: page("google-slides") },
    ],
  },
  {
    name: "Microsoft 365",
    items: [
      { name: "Outlook", href: page("outlook") },
      { name: "Teams", href: page("microsoft-teams") },
      { name: "OneDrive", href: page("onedrive") },
      { name: "Excel", href: page("microsoft-excel") },
      { name: "SharePoint", href: page("sharepoint") },
      { name: "Planner", href: page("microsoft-planner") },
      { name: "Word", href: page("microsoft-word") },
    ],
  },
  {
    name: "Communication and social",
    items: [
      { name: "Slack", href: page("slack") },
      { name: "LinkedIn", href: page("linkedin") },
      { name: "Facebook" },
      { name: "Instagram", href: page("instagram") },
      { name: "X", href: page("x-twitter") },
      { name: "Reddit", href: page("reddit") },
      { name: "Bluesky" },
      { name: "Threads" },
      { name: "Pinterest" },
      { name: "Telegram", href: page("telegram") },
      { name: "WhatsApp", href: page("whatsapp") },
      { name: "Discord", href: page("discord"), note: "Send only" },
    ],
  },
  {
    name: "CRM, tasks, and commerce",
    items: [
      { name: "Airtable", href: page("airtable") },
      { name: "Attio", href: page("attio") },
      { name: "HubSpot", href: page("hubspot") },
      { name: "Notion", href: page("notion") },
      { name: "ClickUp", href: page("clickup") },
      { name: "Trello", href: page("trello") },
      { name: "GitHub", href: page("github") },
      { name: "Shopify", href: page("shopify") },
      { name: "Dropbox", href: page("dropbox") },
      { name: "Cal.com", href: page("cal-com") },
      { name: "Dub", href: page("dub") },
      { name: "QuickBooks", href: page("quickbooks"), note: "Beta" },
    ],
  },
  {
    name: "API key apps",
    items: [
      { name: "Resend", href: page("resend") },
      { name: "Typeform", href: page("typeform") },
      { name: "Calendly", href: page("calendly") },
      { name: "Ahrefs", href: page("ahrefs") },
      { name: "Apollo", href: page("apollo") },
      { name: "PostHog", href: page("posthog") },
      { name: "Polymarket", href: page("polymarket") },
      { name: "ElevenLabs", href: page("elevenlabs") },
      { name: "Exa", href: page("exa") },
      { name: "Tavily", href: page("tavily") },
      { name: "Perplexity", href: page("perplexity") },
      { name: "Firecrawl", href: page("firecrawl") },
    ],
  },
  {
    name: "AI models",
    items: [
      { name: "OpenAI", href: page("openai") },
      { name: "Anthropic", href: page("anthropic") },
      { name: "Gemini", href: page("gemini") },
      { name: "DeepSeek", href: page("deepseek") },
      { name: "Grok", href: page("grok") },
      { name: "Kimi", href: page("kimi") },
      { name: "Qwen", href: page("qwen") },
      { name: "OpenRouter", href: page("openrouter") },
    ],
  },
  {
    name: "Protocols and payments",
    items: [
      { name: "Browser Agent" },
      { name: "MCP", href: page("mcp") },
      { name: "A2A", href: page("a2a") },
      {
        name: "Stripe",
        href: page("stripe"),
        note: "Payment event trigger only",
      },
    ],
  },
  {
    name: "Not in market yet",
    items: [
      { name: "Asana", unbuilt: true },
      { name: "Jira", unbuilt: true },
      { name: "Salesforce", unbuilt: true },
      { name: "Zoom", unbuilt: true },
      { name: "Mailchimp", unbuilt: true },
      { name: "Linear", unbuilt: true },
      { name: "Monday", unbuilt: true },
      { name: "Zapier", unbuilt: true },
    ],
  },
];
