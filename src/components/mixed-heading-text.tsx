import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import styles from "./section-heading.module.css";

type InlineProps = { children?: ReactNode; "aria-hidden"?: boolean | "true" };

function headingText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(headingText).join("");
  if (!isValidElement<InlineProps>(node)) return "";
  if (node.props["aria-hidden"]) return "";
  if (node.type === "br") return "\n";
  return headingText(node.props.children);
}

/** Prefer an authored line break, then a phrase boundary near the midpoint. */
export function headingSplitIndex(text: string): number {
  const lineBreak = text.indexOf("\n");
  if (lineBreak > 0 && text.slice(lineBreak).trim()) return lineBreak;
  const boundaries = [...text.matchAll(/\s+(?=\S)/g)].filter(
    (match) => match.index > 0,
  );
  if (!boundaries.length) return text.length;
  const midpoint = text.length / 2;
  const phrases = boundaries.filter((match) => {
    const index = match.index;
    return (
      index >= text.length * 0.25 &&
      index <= text.length * 0.75 &&
      (/[.!?:,]$/.test(text.slice(0, index)) ||
        /^(with|for|from|into|across|through|to|in|on|and|your)\b/i.test(
          text.slice(index).trimStart(),
        ))
    );
  });
  return (phrases.length ? phrases : boundaries).reduce((best, match) =>
    Math.abs(match.index - midpoint) < Math.abs(best.index - midpoint)
      ? match
      : best,
  ).index;
}

/** Styles dynamic titles without rewriting copy, links, or authored line breaks. */
export function MixedHeadingText({ children }: { children: ReactNode }) {
  const split = headingSplitIndex(headingText(children));
  let offset = 0;
  // Whitespace between font runs must remain a text node so accessible names
  // and copy/paste preserve the same word boundaries as the original title.
  function run(text: string, className: string) {
    const content = text.trim();
    if (!content) return text;
    const start = text.indexOf(content);
    return (
      <>
        {text.slice(0, start)}
        <span className={className}>{content}</span>
        {text.slice(start + content.length)}
      </>
    );
  }
  function styleRuns(nodes: ReactNode): ReactNode {
    return Children.map(nodes, (node) => {
      if (typeof node === "string" || typeof node === "number") {
        const text = String(node);
        const cut = Math.max(0, Math.min(text.length, split - offset));
        offset += text.length;
        return (
          <>
            {cut > 0 ? run(text.slice(0, cut), styles.mixedLead) : null}
            {cut < text.length ? run(text.slice(cut), styles.mixedTail) : null}
          </>
        );
      }
      if (!isValidElement<InlineProps>(node) || node.props["aria-hidden"])
        return node;
      if (node.type === "br") {
        offset += 1;
        return node;
      }
      return node.props.children === undefined
        ? node
        : cloneElement(node, undefined, styleRuns(node.props.children));
    });
  }
  return <span className={styles.mixedText}>{styleRuns(children)}</span>;
}
