"use client";

import { useState } from "react";
import styles from "./tools.module.css";

function NumericField({
  label,
  value,
  update,
  whole = false,
}: {
  label: string;
  value: string;
  update: (value: string) => void;
  whole?: boolean;
}) {
  return (
    <label>
      {label}
      <input
        type="number"
        min="0"
        step={whole ? 1 : "any"}
        value={value}
        onChange={(event) => update(event.target.value)}
      />
    </label>
  );
}
function numeric(value: string) {
  return value.trim() && Number(value) >= 0 ? Number(value) : NaN;
}
const units = new Intl.NumberFormat("en-US");
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ReorderCalculator() {
  const [rate, setRate] = useState("15");
  const [days, setDays] = useState("7");
  const [reserve, setReserve] = useState("25");
  const demand = numeric(rate) * numeric(days);
  const threshold = demand + numeric(reserve);
  const valid = Number.isFinite(threshold) && numeric(days) > 0;
  return (
    <div className={styles.panel}>
      <div className={styles.fields}>
        <NumericField
          label="Average daily demand (units)"
          value={rate}
          update={setRate}
        />
        <NumericField label="Lead time (days)" value={days} update={setDays} />
        <NumericField
          label="Safety stock (units)"
          value={reserve}
          update={setReserve}
        />
      </div>
      <div className={styles.result}>
        <h2>Reorder threshold</h2>
        <output aria-live="polite">
          {valid
            ? `${units.format(Math.ceil(Number(threshold.toPrecision(15))))} units`
            : "Enter nonnegative quantities and a lead time greater than zero."}
        </output>
        <p>
          Multiply average daily demand by lead time, add safety stock and round
          up to whole units. Review replenishment when inventory reaches this
          level.
        </p>
      </div>
    </div>
  );
}

export function CampaignCalculator() {
  const [mode, setMode] = useState("CPM");
  const [spend, setSpend] = useState("600");
  const [views, setViews] = useState("75000");
  const [rate, setRate] = useState("8");
  const cost = numeric(spend),
    impressions = numeric(views),
    cpm = numeric(rate);
  const estimate =
    mode === "CPM"
      ? (cost / impressions) * 1000
      : mode === "Spend"
        ? (cpm * impressions) / 1000
        : (cost / cpm) * 1000;
  const valid =
    Number.isFinite(estimate) &&
    (mode === "Impressions" || Number.isInteger(impressions));
  return (
    <div className={styles.panel}>
      <div className={styles.fields}>
        <label>
          Calculate
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            {["CPM", "Spend", "Impressions"].map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        {mode !== "Spend" && (
          <NumericField
            label="Ad spend (USD)"
            value={spend}
            update={setSpend}
          />
        )}
        {mode !== "Impressions" && (
          <NumericField
            label="Impressions"
            whole
            value={views}
            update={setViews}
          />
        )}
        {mode !== "CPM" && (
          <NumericField
            label="Cost per thousand impressions (USD)"
            value={rate}
            update={setRate}
          />
        )}
      </div>
      <div className={styles.result}>
        <h2>
          {mode === "CPM"
            ? "Cost per thousand impressions"
            : mode === "Spend"
              ? "Estimated spend"
              : "Estimated impressions"}
        </h2>
        <output aria-live="polite">
          {valid
            ? mode === "Impressions"
              ? units.format(Math.round(estimate))
              : usd.format(estimate)
            : "Check the inputs. Use whole impressions and a positive divisor."}
        </output>
        <p>
          {mode === "CPM"
            ? "Divide spend by impressions, then multiply by 1,000."
            : mode === "Spend"
              ? "Multiply CPM by impressions and divide by 1,000."
              : "Divide spend by CPM and multiply by 1,000. The result is rounded to whole impressions."}
        </p>
      </div>
    </div>
  );
}
const followUps = {
  Discovery:
    "Thanks for walking me through your priorities. My main takeaway was",
  Demo: "Thanks for taking the time to see the demo. The part we agreed to explore further was",
  Proposal:
    "Thanks for reviewing the proposal. The open point we discussed was",
};
export function FollowUpDraft() {
  const [stage, setStage] = useState<keyof typeof followUps>("Discovery");
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [action, setAction] = useState("");
  const draft = `Hi ${name.trim() || "[first name]"},\n\n${followUps[stage]} ${topic.trim() || "[topic]"}.\n\nAs a next step, ${action.trim() || "[agreed action and owner]"}. Does that match your understanding?\n\nThanks,\n[Your name]`;
  return (
    <div className={styles.panel}>
      <div className={styles.fields}>
        <label>
          Conversation
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value as keyof typeof followUps)}
          >
            {Object.keys(followUps).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          Recipient’s first name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Discussion topic
          <input value={topic} onChange={(e) => setTopic(e.target.value)} />
        </label>
        <label>
          Agreed next step
          <input value={action} onChange={(e) => setAction(e.target.value)} />
        </label>
      </div>
      <div className={styles.result}>
        <h2>Your follow-up draft</h2>
        <textarea
          aria-label="Follow-up draft"
          value={draft}
          readOnly
          rows={11}
          onFocus={(e) => e.target.select()}
        />
      </div>
    </div>
  );
}
