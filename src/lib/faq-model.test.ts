import { describe, expect, it } from "vitest";
import { resolveFaqSelection } from "./faq-model";

const a = { _id: "a", question: "First?", answer: "First answer" };
const b = { _id: "b", question: "Second?", answer: "Second answer" };
const c = { _id: "c", question: "Third?", answer: "Third answer" };
describe("FAQ set composition", () => {
  it("preserves set and question ordering and keeps shared questions at their first occurrence", () => {
    const first = { faqs: [b, a] };
    const second = { faqs: [a, c] };
    expect(
      resolveFaqSelection({ faqSets: [first, second] }).items.map(
        (x) => x.question,
      ),
    ).toEqual(["Second?", "First?", "Third?"]);
    expect(
      resolveFaqSelection({ faqSets: [second, first] }).items.map(
        (x) => x.question,
      ),
    ).toEqual(["First?", "Third?", "Second?"]);
  });
  it("keeps existing FAQs only when there is no placement", () => {
    expect(resolveFaqSelection(null, [a]).items).toEqual([a]);
    expect(resolveFaqSelection({ faqSets: [] }, [a]).items).toEqual([]);
  });
  it("skips unresolved or incomplete entries and preserves distinct FAQ identities", () => {
    expect(
      resolveFaqSelection({
        heading: "  Answers  ",
        faqSets: [
          null,
          {
            faqs: [
              null,
              { _id: "bad", question: "Incomplete?" },
              a,
              { ...a, _id: "other" },
            ],
          },
        ],
      }),
    ).toEqual({
      heading: "Answers",
      items: [
        { id: "a", question: a.question, answer: a.answer },
        { id: "other", question: a.question, answer: a.answer },
      ],
    });
  });
});
