# Innflow current brand kit

Verified 2026-10-29 from Figma `TI7hq816ZzDMvvTd3HjyIS`, frame `328:5`.

- `BRAND-GUIDELINES.md`: roles, typography, components, motion, identity and homepage exception.
- `tokens.json`: portable CSS values with per-token source IDs.
- `tokens.css`: opt-in custom properties. Apply `data-innflow-brand` to a wrapper and `data-innflow-theme="dark"` to that same wrapper for dark mode. Keep portal roots in the intended theme scope.
- `figma-source-2026-10-29.json`: actual variable values, aliases and specimen properties, preserved separately from implementation conventions.

Load Inter, Instrument Serif and JetBrains Mono through the destination's font loader. Homepage headings use Instrument Sans. No font binaries or automatic network font requests are included. Assign custom properties to component CSS deliberately; importing this file does not restyle an app automatically.

Light is the default. This package does not infer system-theme switching, a universal shadow, or a universal gradient recipe. Preserve alpha and validate contrast on the actual background. The October 11 export remains a historical artwork library, not the current foundation palette.
