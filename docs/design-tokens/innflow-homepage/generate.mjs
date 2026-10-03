// Regenerate the portable CSS exports from tokens.json. Uses Node built-ins only.
import { readFileSync, writeFileSync } from "node:fs";

const read = (name) => readFileSync(new URL(name, import.meta.url), "utf8");
const write = (name, value) => writeFileSync(new URL(name, import.meta.url), value);
const tokens = JSON.parse(read("tokens.json"));
const families = {
  "Host Grotesk": ['--font-host-grotesk', 'Arial, sans-serif'],
  Geist: ['--font-geist', 'Arial, sans-serif'],
  Manrope: ['--font-manrope', 'Arial, sans-serif'],
  "Source Serif 4": ['--font-source-serif-4', 'Georgia, serif'],
};
const fontRoles = Object.fromEntries(
  Object.entries(tokens.font).map(([name, token]) => [token.$value, name]),
);
const cssName = (name) => name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
const css = [
  "/* Generated from tokens.json. Run node generate.mjs after edits. See DESIGN.md. */",
  ":root, [data-innflow-tokens] {",
];
let count = 0;
for (const [group, entries] of Object.entries(tokens)) {
  if (group.startsWith("$")) continue;
  css.push(`  /* ${group} */`);
  for (const [name, token] of Object.entries(entries)) {
    if (!token.$type || token.$value === undefined || !token.$description) {
      throw new Error(`Incomplete token: ${group}.${name}`);
    }
    count += 1;
    const prefix = `--innflow-${group}-${name}`;
    if (group === "typography") {
      for (const [property, value] of Object.entries(token.$value)) {
        const resolved = property === "fontFamily"
          ? `var(--innflow-font-${fontRoles[value]})`
          : value;
        if (String(resolved).includes("undefined")) throw new Error(`Unknown font: ${value}`);
        css.push(`  ${prefix}-${cssName(property)}: ${resolved};`);
      }
    } else {
      let value = token.$value;
      if (group === "font") {
        const [variable, fallback] = families[value];
        value = `var(${variable}, "${value}"), ${fallback}`;
      }
      if (group === "asset") value = `url("${value}")`;
      css.push(`  ${prefix}: ${value};`);
    }
  }
}
css.push("}");
write("variables.css", `${css.join("\n")}\n`);

const theme = [
  "/* Generated Tailwind v4 adapter. Import variables.css first. */",
  "@theme inline {",
];
for (const group of ["color", "font", "spacing", "radius", "shadow"]) {
  for (const name of Object.keys(tokens[group])) {
    // Slash-separated elliptical radii do not fit Tailwind corner utilities.
    // The hero shadow is a drop-shadow filter, not a box-shadow utility.
    if ((group === "radius" && name === "storyboard") || (group === "shadow" && name === "hero")) continue;
    theme.push(`  --${group}-innflow-${name}: var(--innflow-${group}-${name});`);
  }
}
for (const name of Object.keys(tokens.surface)) {
  theme.push(`  --color-innflow-surface-${name}: var(--innflow-surface-${name});`);
}
for (const name of Object.keys(tokens.typography)) {
  theme.push(`  --text-innflow-${name}: var(--innflow-typography-${name}-font-size);`);
  for (const property of ["line-height", "letter-spacing", "font-weight"]) {
    theme.push(`  --text-innflow-${name}--${property}: var(--innflow-typography-${name}-${property});`);
  }
}
theme.push("}");
write("theme.css", `${theme.join("\n")}\n`);
console.log(`Generated CSS exports for ${count} Innflow tokens.`);
