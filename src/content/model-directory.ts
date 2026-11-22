export const modelProviders = [
  {
    name: "OpenAI",
    models: [
      "GPT-6.2 Astra",
      "GPT-6.2 Sol",
      "GPT-6 Astra",
      "GPT-6.1 Sol",
      "GPT-6 Sol",
    ],
  },
  {
    name: "Google",
    models: [
      "Gemini 4 Neon",
      "Gemini Omni 1.2 Flash",
      "Gemini 4 Carbon",
      "Gemini 4 Argon",
    ],
  },
  { name: "xAI", models: ["Grok 4.7", "Grok 4.6"] },
  {
    name: "Anthropic",
    models: [
      "Claude Fable 5.2",
      "Claude Opus 5.5",
      "Claude Sonnet 5.5",
      "Claude Haiku 5.5",
    ],
  },
  { name: "Moonshot AI", models: ["Kimi K3.1 Pro"] },
  {
    name: "DeepSeek",
    models: ["DeepSeek V4.1 Flash 1017", "DeepSeek V4 Pro 0813"],
  },
  { name: "Z.ai", models: ["GLM-5.3", "GLM-5.3-Flash", "GLM-5.3-FlashX"] },
  { name: "Tencent", models: ["Hunyuan 4"] },
  { name: "Alibaba Cloud", models: ["Qwen4-Max"] },
];

export function modelSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

// The menu highlights selected models. The directory also carries reference
// guides for teams evaluating other versions.
const additionalGuides: Record<string, string[]> = {
  Anthropic: ["Claude Opus 4.8", "Claude Fable 5", "Claude Sonnet 5"],
  "Z.ai": ["GLM-5.2"],
  xAI: ["Grok 4.5"],
};

export const directoryProviders = [
  ...modelProviders.map(({ name, models }) => ({
    name,
    models: [...models, ...(additionalGuides[name] ?? [])],
  })),
  { name: "ByteDance", models: ["Seedream 5.5"] },
];

export const modelDirectory = directoryProviders.flatMap(
  ({ name: provider, models }) =>
    models.map((name) => ({ name, provider, slug: modelSlug(name) })),
);
