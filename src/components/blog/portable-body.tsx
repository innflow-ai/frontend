import {
  PortableText,
  type PortableTextComponents,
  type PortableTextTypeComponentProps,
} from "@portabletext/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import {
  blockPlainText,
  collectFootnotes,
  isReferencesHeading,
  italicizeOpeningSentence,
  type LoosePortableBlock,
} from "@/lib/blog";
import { urlForImage } from "@/lib/sanity";
import styles from "./article.module.css";

type BodyImageValue = {
  alt?: string;
  presentation?: "default" | "diagram" | "assetCta";
  ctaTitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
  asset?: { _ref?: string };
};

function isBookingHref(href: string) {
  if (href === siteConfig.demoUrl) return true;
  try {
    const url = new URL(href, siteConfig.marketingOrigin);
    const host = url.hostname.toLowerCase();
    return (
      host === "cal.com" ||
      host.endsWith(".cal.com") ||
      host === "calendly.com" ||
      host.endsWith(".calendly.com")
    );
  } catch {
    return /cal\.com|calendly\.com/i.test(href);
  }
}

function BodyImage({ value }: PortableTextTypeComponentProps<BodyImageValue>) {
  if (!value?.asset?._ref) return null;
  const isAssetCta =
    value.presentation === "assetCta" ||
    Boolean(value.ctaTitle && value.ctaHref);
  // In-body CTA callouts stay in the document but do not render.
  if (isAssetCta) return null;

  const src = urlForImage(value).width(1200).auto("format").url();
  const isDiagram = value.presentation === "diagram";

  return (
    <figure className={isDiagram ? styles.diagramCard : styles.bodyImage}>
      <Image
        src={src}
        alt={value.alt ?? ""}
        width={1200}
        height={675}
        sizes="(max-width: 760px) 92vw, 680px"
      />
    </figure>
  );
}

function CtaButton() {
  return null;
}

function FootnoteMark({
  children,
  value,
  footnotes,
}: {
  children?: ReactNode;
  value?: { _key?: string; text?: string };
  footnotes: ReturnType<typeof collectFootnotes>;
}) {
  const footnote = footnotes.find((item) => item.id === value?._key);
  if (!footnote) return <>{children}</>;
  return (
    <>
      {children}
      <a className={styles.footnoteRef} href={`#footnote-${footnote.id}`}>
        {footnote.number}
      </a>
    </>
  );
}

export function BlogPortableBody({ blocks }: { blocks: LoosePortableBlock[] }) {
  const decorated = italicizeOpeningSentence(blocks);
  const footnotes = collectFootnotes(decorated);
  let inReferences = false;

  const components: PortableTextComponents = {
    types: {
      image: BodyImage,
      ctaButton: CtaButton,
    },
    block: {
      h2: ({ children, value }) => {
        const text = blockPlainText(value as LoosePortableBlock);
        inReferences = isReferencesHeading(text);
        return (
          <h2
            id={`section-${value._key}`}
            className={inReferences ? styles.referencesHeading : undefined}
          >
            {children}
          </h2>
        );
      },
      h3: ({ children }) => <h3>{children}</h3>,
      blockquote: ({ children }) => <blockquote>{children}</blockquote>,
      featured: ({ children }) => <p className={styles.featured}>{children}</p>,
      pullQuote: ({ children }) => (
        <p className={styles.pullQuote}>{children}</p>
      ),
      normal: ({ children }) =>
        inReferences ? (
          <p className={styles.referenceLine}>{children}</p>
        ) : (
          <p>{children}</p>
        ),
    },
    list: {
      bullet: ({ children }: { children?: ReactNode }) => (
        <ul className={styles.bullets}>{children}</ul>
      ),
      number: ({ children }: { children?: ReactNode }) => (
        <ol className={styles.numbers}>{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: { children?: ReactNode }) => <li>{children}</li>,
      number: ({ children }: { children?: ReactNode }) => <li>{children}</li>,
    },
    marks: {
      code: ({ children }: { children?: ReactNode }) => <code>{children}</code>,
      em: ({ children }: { children?: ReactNode }) => <em>{children}</em>,
      link: ({
        children,
        value,
      }: {
        children?: ReactNode;
        value?: { href?: string };
      }) => {
        const href = value?.href ?? "#";
        if (isBookingHref(href)) return null;
        const isExternal = /^https?:\/\//.test(href);
        return (
          <a
            className={inReferences ? styles.referenceLink : styles.bodyLink}
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer noopener" : undefined}
          >
            {children}
          </a>
        );
      },
      footnote: (props) => <FootnoteMark {...props} footnotes={footnotes} />,
    },
  };

  return (
    <>
      <PortableText value={decorated as never} components={components} />
      {footnotes.length > 0 ? (
        <ol className={styles.endnotes} aria-label="Endnotes">
          {footnotes.map((note) => (
            <li key={note.id} id={`footnote-${note.id}`}>
              {note.text}
            </li>
          ))}
        </ol>
      ) : null}
    </>
  );
}
