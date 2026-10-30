"use client";

import { useState } from "react";
import styles from "./hotel.module.css";

type Workspace = {
  title: string;
  metric: string;
  value: string;
  label: string;
  columns: string[];
  rows: string[][];
  note: string;
};
const workspaces: Record<string, Workspace> = {
  "front-desk": {
    title: "Front desk",
    metric: "Arrivals today",
    value: "24",
    label: "Rooms ready",
    columns: ["Guest", "Room", "Arrival"],
    rows: [
      ["Alex Morgan", "204 · King", "Ready"],
      ["Sam Rivera", "312 · Suite", "In progress"],
      ["Jordan Lee", "108 · Twin", "Ready"],
    ],
    note: "Suite 312 is being inspected. Reception has the latest room status.",
  },
  "guest-experience": {
    title: "Guest inbox",
    metric: "Open requests",
    value: "8",
    label: "Assigned to team",
    columns: ["Guest", "Request", "Status"],
    rows: [
      ["Alex Morgan", "Early arrival", "Ready"],
      ["Sam Rivera", "Extra pillows", "In progress"],
      ["Jordan Lee", "Airport transfer", "Ready"],
    ],
    note: "Early-arrival reply drafted with reservation context. Team review required.",
  },
  housekeeping: {
    title: "Room readiness",
    metric: "Ready rooms",
    value: "42",
    label: "Inspection queue",
    columns: ["Room", "Assigned to", "Status"],
    rows: [
      ["204 · King", "Taylor", "Ready"],
      ["312 · Suite", "Casey", "In progress"],
      ["108 · Twin", "Jamie", "Ready"],
    ],
    note: "Room 312 has an early arrival. Inspection is the next handoff.",
  },
  accounting: {
    title: "Invoice review",
    metric: "To review",
    value: "6",
    label: "Matched invoices",
    columns: ["Supplier", "Amount", "Status"],
    rows: [
      ["Linen & Co.", "$480.00", "Matched"],
      ["Fresh Market", "$326.40", "Needs review"],
      ["City Utilities", "$712.00", "Matched"],
    ],
    note: "Fresh Market invoice differs from the purchase order. Review before approval.",
  },
  procurement: {
    title: "Order guide",
    metric: "Order estimate",
    value: "$806",
    label: "Suppliers compared",
    columns: ["Item", "Quantity", "Status"],
    rows: [
      ["Bath towels", "24 cases", "In stock"],
      ["Guest amenities", "12 cases", "Alternative"],
      ["Coffee service", "8 cases", "In stock"],
    ],
    note: "An amenity alternative is available. Compare delivery and price before ordering.",
  },
  labor: {
    title: "Today’s coverage",
    metric: "Planned hours",
    value: "128",
    label: "Shifts covered",
    columns: ["Department", "Hours", "Status"],
    rows: [
      ["Front desk", "32 h", "Covered"],
      ["Housekeeping", "64 h", "Needs review"],
      ["Food & beverage", "32 h", "Covered"],
    ],
    note: "Housekeeping demand increased with today’s departures. Review coverage.",
  },
  revenue: {
    title: "Revenue outlook",
    metric: "Occupancy",
    value: "82%",
    label: "Rates reviewed",
    columns: ["Room type", "Daily rate", "Status"],
    rows: [
      ["Classic King", "$189", "Reviewed"],
      ["Corner Suite", "$279", "Needs review"],
      ["Courtyard Twin", "$169", "Reviewed"],
    ],
    note: "Weekend demand has changed. Review the suite rate with market context.",
  },
  payments: {
    title: "Guest folios",
    metric: "Departures",
    value: "18",
    label: "Folios prepared",
    columns: ["Guest", "Balance", "Status"],
    rows: [
      ["Alex Morgan", "$0.00", "Settled"],
      ["Sam Rivera", "$86.00", "Needs review"],
      ["Jordan Lee", "$0.00", "Settled"],
    ],
    note: "A restaurant charge is awaiting review on the suite folio.",
  },
  portfolio: {
    title: "Portfolio overview",
    metric: "Occupancy",
    value: "82%",
    label: "Reports ready",
    columns: ["Property", "Occupancy", "Status"],
    rows: [
      ["The Alder", "86%", "On plan"],
      ["Harbor House", "78%", "Needs review"],
      ["Park Lodge", "82%", "On plan"],
    ],
    note: "Harbor House labor is above plan. Open the department view to investigate.",
  },
};

export function HotelWorkspace({
  kind = "front-desk",
  compact = false,
}: {
  kind?: string;
  compact?: boolean;
}) {
  const data = workspaces[kind] ?? workspaces["front-desk"];
  const [attentionOnly, setAttentionOnly] = useState(false);
  const rows = attentionOnly ? data.rows.slice(1, 2) : data.rows;
  return (
    <div className={styles.workspace} data-compact={compact}>
      <div className={styles.workspaceTop}>
        <span className={styles.workspaceMark}>i</span>
        <span>The Alder Hotel</span>
        <span className={styles.sample}>Illustrative data</span>
      </div>
      <div className={styles.workspaceBody}>
        <div className={styles.workspaceHeading}>
          <div>
            <span className={styles.micro}>TODAY AT A GLANCE</span>
            <h3>{data.title}</h3>
          </div>
          <span className={styles.liveDot} aria-hidden="true" />
        </div>
        <div className={styles.metrics}>
          <div>
            <span>{data.metric}</span>
            <strong>{data.value}</strong>
          </div>
          <div>
            <span>{data.label}</span>
            <strong>
              {kind === "procurement" ? "3" : "12"}
              <small> / {kind === "procurement" ? "3" : "16"}</small>
            </strong>
          </div>
        </div>
        <fieldset
          className={styles.workspaceFilters}
          aria-label={`${data.title} filter`}
        >
          <button
            type="button"
            aria-pressed={!attentionOnly}
            onClick={() => setAttentionOnly(false)}
          >
            Overview
          </button>
          <button
            type="button"
            aria-pressed={attentionOnly}
            onClick={() => setAttentionOnly(true)}
          >
            Needs attention <span>1</span>
          </button>
        </fieldset>
        <div className={styles.tableWrap}>
          <table>
            <caption className={styles.srOnly}>
              {data.title}, sample records
            </caption>
            <thead>
              <tr>
                {data.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={cell}>
                      {index === 2 ? (
                        <span
                          className={styles.status}
                          data-attention={row === data.rows[1]}
                        >
                          {cell}
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.workspaceNote}>
          <span aria-hidden="true">✦</span>
          <p>{data.note}</p>
        </div>
      </div>
    </div>
  );
}
