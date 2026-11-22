import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import directory from "../../connections/page.module.css";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "Innflow vs Slack for team handoffs | Innflow",
  description:
    "Compare channels, workflows and agent handoffs in Innflow and Slack using a customer escalation as a worked example.",
  path: "/compare/innflow-vs-slack",
});

const rows = [
  [
    "Keep a discussion together",
    "A channel gives teammates and agents a shared brief, files and decisions. Use a thread to work through one question.",
    "Start a thread from a message to collect replies. Share a reply back to the channel when the wider group needs it.",
  ],
  [
    "Repeat a process",
    "A flow assigns steps to people and agents, with a named owner at each review point.",
    "Workflow Builder combines a trigger with steps. The steps and connectors available depend on the workspace configuration.",
  ],
  [
    "Share the outcome",
    "An agent can prepare a result for review and send an update to a connected Slack destination.",
    "The team can discuss the update in its channel and keep follow-up questions attached to the message.",
  ],
];

export default function ComparisonPage() {
  return (
    <main id="main-content" className={directory.directory}>
      <header className={directory.intro}>
        <Link href="/compare">Product comparisons</Link>
        <h1>Innflow vs Slack</h1>
        <p>
          Consider a customer escalation. Someone needs to collect the evidence,
          someone needs to decide on a response, and the support team needs to
          hear the outcome. Here’s how those handoffs fit into each workspace.
        </p>
      </header>
      <section className={styles.section}>
        <h2>Follow the handoff</h2>
        <table>
          <caption className={styles.caption}>
            Conversation and workflow options in each product
          </caption>
          <thead>
            <tr>
              <th scope="col">Task</th>
              <th scope="col">Innflow</th>
              <th scope="col">Slack</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([task, innflow, slack]) => (
              <tr key={task}>
                <th scope="row">{task}</th>
                <td>{innflow}</td>
                <td>{slack}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className={styles.section}>
        <h2>Try it with a resolved support ticket</h2>
        <ol>
          <li>
            Give the team the original request and supporting notes. Hold back
            the final response so you can compare the result.
          </li>
          <li>
            In Innflow, assign an agent to prepare the escalation brief and a
            person to approve the customer update. In Slack, try the same
            handoff in a thread or a workflow your team already uses.
          </li>
          <li>
            Ask a colleague who missed the discussion to find the evidence, the
            decision and its owner. Record where they had to ask for help.
          </li>
        </ol>
        <Link href="/templates/agent-teams/customer-support-escalation">
          Use the escalation brief template
        </Link>
      </section>
      <section className={styles.section}>
        <h2>Using Innflow alongside Slack</h2>
        <p>
          When the team already follows a Slack channel, use it as the
          destination for a reviewed update. Start the agent’s task in Innflow
          and keep the decision with the work. Check the connector’s supported
          actions before designing a workflow that starts from Slack.
        </p>
        <Link href="/integrations/slack">See the Slack integration</Link>
      </section>
      <section className={styles.section}>
        <h2>Product documentation</h2>
        <ul>
          <li>
            <Link href="/features/communications">Innflow Channels</Link>
          </li>
          <li>
            <Link href="/features/workflows">Innflow Flows</Link>
          </li>
          <li>
            <a href="https://slack.com/help/articles/115000769927-Use-threads-to-organize-discussions">
              Slack’s guide to threads
            </a>
          </li>
          <li>
            <a href="https://slack.com/help/articles/360035692513-Guide-to-Workflow-Builder">
              Slack’s guide to Workflow Builder
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
