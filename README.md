# @pulpo/ui

The heypulpo.com "Raven" look for Pulpo's internal tools: one set of `--p-*` tokens
(dark default, light via `data-theme="light"`), `.p-*` component classes, and typed
React fronts. Open `showcase.html` in a browser to see every piece in both themes.

## Use it

```bash
npm i github:cmcgeehan/pulpo-ui#v0.1.2
```

```ts
// next.config.ts
transpilePackages: ["@pulpo/ui"],
```

```tsx
// app/layout.tsx — after the stylesheet that does @import "tailwindcss" (Tailwind apps).
import "./globals.css";
import "@pulpo/ui/tokens.css";
import "@pulpo/ui/components.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider, themeScript } from "@pulpo/ui";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

<html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
  <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
  <body><ThemeProvider>{children}</ThemeProvider></body>
</html>
```

Then either the classes (`<button class="p-btn p-btn-primary">`) or the components:

```tsx
import { Button, Card, Pill, Badge, Field, Tabs, Eyebrow, Icon, ThemeToggle } from "@pulpo/ui";

<Button href="/jobs/new">New job</Button>
<Field label="Email" error={err}>{(p) => <input {...p} type="email" />}</Field>
<Tabs label="View" items={[{ value: "pipeline", label: "Pipeline" }]} value={v} onChange={setV} />
```

`transpilePackages` is required: the package ships TypeScript source, no build step.
The repo must stay public: npm records the dependency as `git+ssh` but installs it from
GitHub's public HTTPS tarball, which is what lets Vercel build without a key.

Cascade: `components.css` lives in `@layer base` / `@layer components`, so your own unlayered
CSS and Tailwind utilities (`p-btn mt-4`) override it. That includes unlayered element rules:
a global `a { color: … }` recolours `<a class="p-btn">`, so put app element defaults in
`@layer base`. Override with care: a page-level `.p-btn { … }` replaces the shared look.

Tailwind apps: use the tokens directly (`bg-[var(--p-surface)]`), or alias your theme
colors to them in `@theme inline`.

## Rules of the look

- Gold is for action (primary button, the one primary card). Teal lume is for signal (live, active tab, eyebrow).
- Pills for actions and tabs, 12px panels, 8px fields, hairline rules instead of borders.
- Geist everywhere; the accent moment is `.p-serif` (Geist, synthesized italic like the site, in gold), one per heading.
- Text on a gold/teal/red fill uses `--p-on-gold` / `--p-on-lume` / `--p-on-neg`, never `#fff`.
- `--p-fg-4` is decorative only (dividers, disabled). Body text stops at `--p-fg-3`.

## Release

Bump `version`, commit, `git tag vX.Y.Z && git push --tags`. Apps upgrade by changing the tag.
