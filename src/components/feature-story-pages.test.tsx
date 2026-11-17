import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { FeatureStoryPage } from "@/components/feature-story-page";
import { agentMemoryPage } from "@/content/agent-memory-page";
import { agentsPage } from "@/content/agents-page";
import { channelsPage } from "@/content/channels-page";
import { connectorsPage } from "@/content/connectors-page";
import { teammatesPage } from "@/content/teammates-page";
import { connectorGroups } from "@/content/wired-connectors";

it("lists wired connectors and hides a coming-soon label", () => {
  render(<FeatureStoryPage sections={connectorsPage.sections} />);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /Connect agents to the tools/,
    }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Gmail" })).toHaveAttribute(
    "href",
    "/integrations/gmail",
  );
  expect(screen.getByText("Salesforce")).toBeInTheDocument();
  expect(screen.getByText("Twilio").closest("li")).toHaveAttribute(
    "data-unbuilt",
    "true",
  );
  expect(screen.getByText("Browser Agent")).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "Browser Agent" })).toBeNull();
  expect(screen.queryByText(/Coming soon|Northwind/i)).toBeNull();
  expect(
    connectorGroups.flatMap((group) => group.items).length,
  ).toBeGreaterThan(16);
});

it("keeps agent, channel, memory, and teammate claims inside the copy", () => {
  render(<FeatureStoryPage sections={agentsPage.sections} />);
  expect(
    screen.getByRole("heading", { name: "Questions about agents" }),
  ).toBeInTheDocument();
  render(<FeatureStoryPage sections={channelsPage.sections} />);
  expect(screen.getByText("Receiving on Slack")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Read the field note" })).toHaveAttribute(
    "href",
    "/blog",
  );
  expect(screen.queryByRole("heading", { name: "Not in market yet" })).toBeNull();
  render(<FeatureStoryPage sections={agentMemoryPage.sections} />);
  expect(
    screen.queryByText(/trains on my data|remember everything forever/i),
  ).toBeNull();
  render(<FeatureStoryPage sections={teammatesPage.sections} />);
  expect(
    screen.getByRole("heading", {
      name: /Make every AI win/,
    }),
  ).toBeInTheDocument();
  expect(screen.queryByText(/Northwind|Coming soon/i)).toBeNull();
});
