export function JsonLd({ value }: { value: object }) {
  const serialized = JSON.stringify(value).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
