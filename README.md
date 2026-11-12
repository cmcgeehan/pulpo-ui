# @pulpo/ui

The heypulpo.com "Raven" look for Pulpo's internal tools: one set of `--p-*` tokens
(dark default, light via `data-theme="light"`), `.p-*` component classes, and typed
React fronts. Open `showcase.html` in a browser to see every piece in both themes.

## Use it

```bash
npm i github:cmcgeehan/pulpo-ui#v0.2.0
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
import "@pulpo/ui/console.css"; // apps with a nav rail (shell, palette, steps, …)
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

## Console pieces (v0.2)

For internal tools with a nav rail. Import `@pulpo/ui/console.css` after `components.css`. Classes, plain HTML, no JS:

| Need | Class |
|---|---|
| App frame | `.p-shell` > `.p-rail` (`.p-rail-section`, `.p-rail-link.is-active`, `.p-rail-foot`) + `.p-app-header` + `.p-app-main` |
| Page title row | `.p-page-head` (eyebrow, `h1`, `.p-page-sub`) + `.p-page-head-actions`; `.p-block-head` (h3 + meta) for sub-sections, `.p-block-meta` for small mono metadata |
| Filters above a list | `.p-toolbar` + `.p-toolbar-spacer`; `.p-tabs.is-sm` with `.p-count` (or `<Tabs size="sm">`, items take `count`) |
| Steps | `.p-steps` (vertical) or `.p-steps.is-row` (strip) > `.p-step.is-done/.is-now(.is-link)` > `.p-step-mark` + `.p-step-text` (`.p-step-label`, `.p-step-meta`) |
| ⌘K palette | `.p-cmd-scrim` > `.p-cmd` > `.p-cmd-input`, `.p-cmd-list` (`.p-cmd-group`, `.p-cmd-row.is-on`), `.p-cmd-foot` |
| Form modal | `.p-modal.is-flush` (+ `.is-lg` 720 / `.is-xl` 880) > `.p-modal-body` + `.p-modal-foot` |
| Recessed panel | `.p-well` |
| Clickable card | `.p-card.is-link` |
| Inputs | `.p-drop(.is-full)` file drop, `.p-range(.is-lg)`, `.p-choice(.is-on)` radio-card |
| Small marks | `.p-kbd` / `<Kbd>`, `.p-dot` (`is-lume/gold/pos/warn/neg`, `is-pulse`), `.p-spin`, `.p-icon-btn(.is-sm)` |
| Tones | `.p-badge.is-gold/.is-pos/.is-neg/.is-solid`, `.p-avatar.is-sm/.is-lume`, `.p-alert.is-quiet`, `.p-stat-num.is-sm`, `.p-seam.is-inline`, `.p-table.is-clickable/.is-dense`, `.p-tab:disabled`, `.p-drop.is-over` (drag-over) |
| Toasts | `.p-toaster` > `.p-toast` |

## Rules of the look

- Gold is for action (primary button, the one primary card). Teal lume is for signal (live, active tab, eyebrow).
- Pills for actions and tabs, 12px panels, 8px fields, hairline rules instead of borders.
- Geist everywhere; the accent moment is `.p-serif` (Geist, synthesized italic like the site, in gold), one per heading.
- Text on a gold/teal/red fill uses `--p-on-gold` / `--p-on-lume` / `--p-on-neg`, never `#fff`.
- `--p-fg-4` is decorative only (dividers, disabled). Body text stops at `--p-fg-3`.

## Release

Bump `version`, commit, `git tag vX.Y.Z && git push --tags`. Apps upgrade by changing the tag.
