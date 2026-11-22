"use client";

import { useRef, useState } from "react";
import Markdown from "react-markdown";
import styles from "./tools.module.css";

const example =
  "# Weekly handoff\n\n## Decisions\n\n- Publish the approved release notes.\n- Review the open support requests on Friday.";

export function MarkdownDocument() {
  const [source, setSource] = useState(example);
  const preview = useRef<HTMLElement>(null);
  const printFrame = useRef<HTMLIFrameElement>(null);

  function printDocument() {
    const frame = printFrame.current;
    const document = frame?.contentDocument;
    if (!document || !frame?.contentWindow || !preview.current) return;
    const paper = document.createElement("style");
    paper.textContent =
      "@page { margin: 20mm } body { font: 11pt/1.55 system-ui,sans-serif; color:#17252c } h1,h2,h3 { break-after:avoid } pre { white-space:pre-wrap } article { overflow-wrap:anywhere }";
    document.head.replaceChildren(paper);
    document.title =
      preview.current.querySelector("h1")?.textContent || "Innflow document";
    document.body.replaceChildren(preview.current.cloneNode(true));
    frame.contentWindow.focus();
    frame.contentWindow.print();
  }

  return (
    <div className={styles.panel}>
      <div className={styles.fields}>
        <label>
          Markdown source
          <textarea
            rows={15}
            value={source}
            onChange={(event) => setSource(event.target.value)}
          />
        </label>
        <p>Review the preview, then choose Save as PDF in your print dialog.</p>
        <button
          type="button"
          data-site-cta="primary"
          onClick={printDocument}
          disabled={!source.trim()}
        >
          Print or save PDF
        </button>
      </div>
      <div className={styles.result}>
        <h2>Document preview</h2>
        <article ref={preview} className={styles.paper}>
          <Markdown
            skipHtml
            components={{ img: ({ alt }) => <span>{alt}</span> }}
          >
            {source}
          </Markdown>
        </article>
      </div>
      <iframe
        title="Printable document"
        ref={printFrame}
        tabIndex={-1}
        aria-hidden="true"
        className={styles.printFrame}
      />
    </div>
  );
}
