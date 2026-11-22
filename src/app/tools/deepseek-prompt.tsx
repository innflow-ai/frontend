"use client";

import { useRef, useState } from "react";
import { appSignup } from "@/content/feature-story";
import styles from "./tools.module.css";

const examples = [
  {
    name: "Meeting agenda",
    prompt:
      "Use the notes below to draft a 30-minute agenda. Give each item an owner, a time limit and the decision we need before leaving. Flag any decision that needs more information.",
  },
  {
    name: "Launch review",
    prompt:
      "Review the launch updates below. List each deliverable, owner and due date. Identify missing approvals and changes that put the launch date at risk. Quote the update behind each flag.",
  },
  {
    name: "Sales follow-up",
    prompt:
      "Turn these meeting notes into a short follow-up email. Separate the buyer’s commitments from proposals still under discussion. Include a next step and leave unknown dates open.",
  },
  { name: "Custom prompt", prompt: "" },
];

export function DeepSeekPrompt() {
  const [selected, setSelected] = useState(0);
  const [drafts, setDrafts] = useState(
    examples.map((example) => example.prompt),
  );
  const [status, setStatus] = useState("");
  const editor = useRef<HTMLTextAreaElement>(null);
  const draft = drafts[selected];

  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setStatus("Prompt copied.");
    } catch {
      editor.current?.focus();
      editor.current?.select();
      setStatus("Your prompt is selected. Use your device’s Copy command.");
    }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.fields}>
        <label>
          Starting point
          <select
            value={selected}
            onChange={(event) => {
              setSelected(Number(event.target.value));
              setStatus("");
            }}
          >
            {examples.map((example, index) => (
              <option key={example.name} value={index}>
                {example.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Your prompt
          <textarea
            ref={editor}
            rows={8}
            value={draft}
            onChange={(event) => {
              const value = event.target.value;
              setDrafts((current) =>
                current.map((previous, index) =>
                  index === selected ? value : previous,
                ),
              );
              setStatus("");
            }}
          />
        </label>
        <button type="button" disabled={!draft.trim()} onClick={copy}>
          Copy prompt
        </button>
        <span role="status">{status}</span>
      </div>
      <section className={styles.result}>
        <h2>Try it with your own material</h2>
        <p>
          Copy the prompt into your workspace, select an available model and add
          the notes you want it to use. Check each name, date and commitment
          against those notes before sharing the answer.
        </p>
        <a data-site-cta="primary" href={appSignup}>
          Open Innflow
        </a>
      </section>
    </div>
  );
}
