import { describe, expect, it } from "vitest";
import {
  blockPlainText,
  collectFootnotes,
  industriesForPost,
  injectInArticleCtas,
  isReferencesHeading,
  italicizeOpeningSentence,
  type LoosePortableBlock,
  matchesBlogQuery,
  portableTextToPlain,
} from "./blog";

function paragraph(key: string, text: string): LoosePortableBlock {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    children: [{ _type: "span", text }],
  };
}

describe("italicizeOpeningSentence", () => {
  it("splits the opening sentence across marked spans without losing links or changing source content", () => {
    const blocks: LoosePortableBlock[] = [
      {
        ...paragraph("intro", ""),
        markDefs: [{ _key: "link", _type: "link", href: "/demo" }],
        children: [
          { _key: "a", _type: "span", text: "Connect ", marks: ["strong"] },
          {
            _key: "b",
            _type: "span",
            text: "your team. Keep moving.",
            marks: ["link"],
          },
        ],
      },
      paragraph("second", "Another paragraph."),
    ];
    const original = structuredClone(blocks);
    const result = italicizeOpeningSentence(blocks);
    expect(result[0].children).toEqual([
      { _key: "a", _type: "span", text: "Connect ", marks: ["strong", "em"] },
      { _key: "b", _type: "span", text: "your team.", marks: ["link", "em"] },
      {
        _key: "b-after-intro",
        _type: "span",
        text: " Keep moving.",
        marks: ["link"],
      },
    ]);
    expect(result[0].markDefs).toEqual(blocks[0].markDefs);
    expect(result[1]).toBe(blocks[1]);
    expect(blocks).toEqual(original);
    expect(portableTextToPlain(result)).toBe(portableTextToPlain(blocks));
  });

  it("skips headings, lists and empty paragraphs, and handles an unpunctuated introduction", () => {
    const blocks = [
      { ...paragraph("heading", "Title"), style: "h2" },
      { ...paragraph("list", "List item"), listItem: "bullet" },
      paragraph("empty", ""),
      paragraph("intro", "A clear next step"),
    ];
    const result = italicizeOpeningSentence(blocks);
    expect(result.slice(0, 3)).toEqual(blocks.slice(0, 3));
    expect(result[3].children?.[0].marks).toEqual(["em"]);
    expect(italicizeOpeningSentence([])).toEqual([]);
  });
});

describe("injectInArticleCtas", () => {
  it("inserts a CTA after every third paragraph and features the next one", () => {
    const blocks = [
      paragraph("a", "One"),
      paragraph("b", "Two"),
      paragraph("c", "Three"),
      paragraph("d", "Four"),
    ];

    const result = injectInArticleCtas(blocks, {
      label: "Book a demo",
      href: "/demo",
    });

    expect(result.map((block) => block._type)).toEqual([
      "block",
      "block",
      "block",
      "ctaButton",
      "block",
    ]);
    expect(result[3]).toMatchObject({
      _type: "ctaButton",
      label: "Book a demo",
      href: "/demo",
    });
    expect(result[4]?.style).toBe("featured");
  });

  it("returns an empty list for missing body content", () => {
    expect(injectInArticleCtas(null)).toEqual([]);
  });
});

describe("portableTextToPlain", () => {
  it("joins block text for the listen player", () => {
    expect(
      portableTextToPlain([
        paragraph("a", "Hello"),
        { _type: "image", _key: "img" },
        paragraph("b", "World"),
      ]),
    ).toBe("Hello\n\nWorld");
  });
});

describe("collectFootnotes", () => {
  it("numbers unique footnote marks in document order", () => {
    const footnotes = collectFootnotes([
      {
        _type: "block",
        markDefs: [
          { _type: "footnote", _key: "f1", text: "First source" },
          { _type: "link", _key: "l1", href: "https://innflow.ai" },
        ],
      },
      {
        _type: "block",
        markDefs: [{ _type: "footnote", _key: "f1", text: "First source" }],
      },
      {
        _type: "block",
        markDefs: [{ _type: "footnote", _key: "f2", text: "Second source" }],
      },
    ]);

    expect(footnotes).toEqual([
      { id: "f1", number: 1, text: "First source" },
      { id: "f2", number: 2, text: "Second source" },
    ]);
  });
});

describe("blog helpers", () => {
  it("detects reference headings", () => {
    expect(isReferencesHeading("References")).toBe(true);
    expect(isReferencesHeading("Footnotes")).toBe(true);
    expect(isReferencesHeading("Human skills")).toBe(false);
  });

  it("falls back industries to General", () => {
    expect(industriesForPost(null)).toEqual(["General"]);
    expect(industriesForPost(["Property"])).toEqual(["Property"]);
  });

  it("filters search haystacks", () => {
    expect(matchesBlogQuery(["Lease automation"], "lease")).toBe(true);
    expect(matchesBlogQuery(["Lease automation"], "payroll")).toBe(false);
    expect(matchesBlogQuery(["Lease"], "  ")).toBe(true);
  });

  it("reads plain text from a block", () => {
    expect(blockPlainText(paragraph("a", "Hello world"))).toBe("Hello world");
  });
});
