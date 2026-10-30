import { TemplateFooter } from "@/app/preview/scroll-showcase/template-footer";
import { CalendlyProductPage } from "@/components/calendly-product-page";
import productStyles from "@/components/calendly-product-page.module.css";
import { ShowcaseHomepage } from "@/components/showcase-homepage";
import { WorkflowIllustration } from "@/components/workflow-illustration";
import { siteConfig } from "@/config/site";
import { type HotelModule, hotelHref, hotelModules } from "@/content/hotel-pms";
import styles from "./hotel.module.css";
import { HotelWorkspace } from "./hotel-workspace";

const primaryCta = {
  label: "Plan your hotel workflow",
  href: siteConfig.demoUrl,
};
const secondaryCta = {
  label: "Explore the hotel platform",
  href: "/hotel-pms",
};
const availability = {
  question: "Is this available today?",
  answer:
    "This is a preview of Innflow’s hotel platform direction. We’ll confirm available capabilities, integrations, and rollout timing with your team before making a commitment.",
};

export function HotelHomepage() {
  return <ShowcaseHomepage hotel />;
}

function WorkflowArtwork({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className={productStyles.nativeIllustration}>
      <WorkflowIllustration label={title} steps={points} />
    </div>
  );
}

export function HotelPlatformPage() {
  return (
    <CalendlyProductPage
      content={{
        path: "/hotel-pms",
        name: "Hotel platform · Preview",
        title: "One hotel. One connected picture.",
        description:
          "Bring guest operations, hotel teams, and financial performance together, supported by the same connected platform and agent layer.",
        primaryCta,
        secondaryCta: {
          label: "Explore the agent platform",
          href: "/platform",
        },
        intro: [
          {
            title: "The work behind a great stay.",
            body: "A hotel runs on hundreds of small handoffs. Give teams and agents the context to move them forward.",
          },
        ],
        heroArtwork: (
          <div className={styles.spotlightWorkspace}>
            <HotelWorkspace kind="front-desk" />
          </div>
        ),
        cards: hotelModules.map((module) => ({
          id: module.slug,
          title: module.name,
          body: module.description,
          href: hotelHref(module.slug),
          artwork: (
            <WorkflowArtwork
              title={module.name}
              points={module.steps[0].detail}
            />
          ),
        })),
        features: [
          {
            id: "hotel-teams",
            label: "Your hotel",
            title: "Start with how your hotel works.",
            body: "Connect the daily handoffs behind an independent hotel, a growing group, or an extended-stay operation.",
            points: ["Independent hotels", "Hotel groups", "Extended stays"],
            artwork: (
              <WorkflowArtwork
                title="Your operating model"
                points={[
                  "Understand the property",
                  "Map the daily handoffs",
                  "Choose a focused starting point",
                ]}
              />
            ),
          },
          {
            id: "hotel-agent-layer",
            label: "Platform & agents",
            title: "Give your agents the context behind the stay.",
            body: "Keep the hotel workflows connected to your tools, knowledge, and human review. Build on the same Innflow platform as the work expands.",
            points: [
              "Connected tools and shared context",
              "Focused agents and workflows",
              "Human review and clear responsibilities",
            ],
            href: "/products/agentic-workflows",
            artwork: (
              <WorkflowArtwork
                title="The agent layer"
                points={[
                  "Connect hotel context",
                  "Prepare the next step",
                  "Review with your team",
                ]}
              />
            ),
          },
        ],
        faqs: [availability],
        closing: [
          {
            title: "Make space for great hospitality.",
            body: "Start with your team, your systems, and the workflow you want to improve. Scope and availability confirmed together.",
            primaryCta,
          },
        ],
      }}
    />
  );
}

export function HotelFeaturePage({ module }: { module: HotelModule }) {
  return (
    <CalendlyProductPage
      content={{
        path: hotelHref(module.slug),
        name: `${module.name} · Preview`,
        title: module.headline,
        description: module.description,
        primaryCta,
        secondaryCta,
        intro: [
          {
            eyebrow: module.group,
            title: "Keep the next step in view.",
            body: "Connect the context, the people, and the decisions behind your hotel’s daily work.",
          },
        ],
        features: module.steps.map((step, index) => ({
          id: `${module.slug}-${index + 1}`,
          label: step.title,
          title: step.title,
          body: step.body,
          points: step.detail,
          artwork:
            index === 0 ? (
              <div className={styles.featureWorkspace}>
                <HotelWorkspace kind={module.slug} />
              </div>
            ) : (
              <WorkflowArtwork title={step.title} points={step.detail} />
            ),
        })),
        cards: module.highlights.map((highlight, index) => ({
          id: `${module.slug}-highlight-${index}`,
          title: highlight,
          body: module.steps[index].body,
          artwork: (
            <WorkflowArtwork
              title={highlight}
              points={module.steps[index].detail}
            />
          ),
        })),
        faqs: [
          { question: module.question, answer: module.answer },
          availability,
          {
            question: "Where should our team start?",
            answer:
              "Start with one workflow, the people responsible for it, and the systems they use. We’ll map the handoffs together and agree on a focused starting point.",
          },
        ],
        closing: [
          {
            title: "Connect the work behind the stay.",
            body: "Plan a focused starting point for your hotel, with scope and availability confirmed together.",
            primaryCta,
            secondaryCta,
          },
        ],
      }}
    />
  );
}

export function HotelFooter() {
  return <TemplateFooter hotel />;
}
