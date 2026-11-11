export const appSignup = "https://app.innflow.ai";

export type StoryLink = {
  label: string;
  href: string;
};

export type FlowNode = {
  label: string;
  owner?: string;
  agent?: boolean;
  status?: "done" | "running" | "waiting" | "decision";
};

export type StoryCard = {
  title: string;
  body: string;
  links?: StoryLink[];
  unbuilt?: boolean;
};

export type StorySection = {
  id: string;
  unbuilt?: boolean;
  type:
    | "hero"
    | "split"
    | "features"
    | "status"
    | "steps"
    | "cards"
    | "faq"
    | "close"
    | "columns"
    | "comparison"
    | "chips"
    | "catalog"
    | "beats";
  title: string;
  subtitle?: string;
  body?: string;
  primary?: StoryLink;
  secondary?: StoryLink;
  anchor?: string;
  nodes?: FlowNode[];
  actions?: string[];
  rows?: { label: string; state: string }[];
  steps?: { title: string; body: string }[];
  cards?: StoryCard[];
  items?: {
    title: string;
    body?: string;
    unbuilt?: boolean;
    nodes?: FlowNode[];
    actions?: string[];
  }[];
  questions?: { question: string; answer: string; unbuilt?: boolean }[];
  columns?: { title: string; items: string[] }[];
  sides?: { title: string; items: string[] }[];
  groups?: { title: string; items: string[] }[];
  built?: string[];
  unbuiltItems?: string[];
  beats?: string[];
  links?: StoryLink[];
};
