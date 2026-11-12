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
import "@pulpo/ui/forms.css";
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

## Files

| Import | What |
|---|---|
| `tokens.css` | Colours, type, space, radius, motion (dark default, light via `data-theme="light"`) |
| `components.css` | Type, buttons, pills, badges, cards, wells, tables, tabs, modals, toasts, alerts, small marks |
| `forms.css` | Fields, inputs, select, check, radio, switch, search, choice cards, range, drop zone |
| `console.css` | Internal-tool layout: app shell, rail, page head, toolbar, steps, ⌘K palette. Desktop only (≥ 900px) |

All three class files sit in `@layer base, components`, so app CSS and Tailwind utilities win.

## Console pieces (v0.2)

| Need | Class |
|---|---|
| App frame | `.p-shell` > `.p-rail` (`.p-rail-section`, `.p-rail-link[aria-current="page"]` with `.p-rail-ico` + `.p-count`, `.p-rail-foot`) + `.p-app-header` + `.p-app-main` |
| Page title row | `.p-page-head` (eyebrow, `h1`, `.p-page-sub`) + `.p-page-head-actions`; `.p-block-head` (h3 + `.p-block-meta`) for sub-sections |
| Filters above a list | `.p-toolbar` + `.p-toolbar-spacer`; `<Tabs size="sm">` (items take `count`) or `.p-tabs.is-sm` > `.p-tab` + `.p-count` |
| Steps | `.p-steps` (vertical) or `.p-steps.is-row` (strip) > `.p-step.is-done/.is-now` > `.p-step-mark` + `.p-step-text` (`.p-step-label`, `.p-step-meta`). Clickable step: `<li><button class="p-step is-link">` |
| ⌘K palette | `.p-modal-scrim.is-top` > `.p-modal.is-flush.p-cmd[role=dialog][aria-modal=true]` > `.p-cmd-input` (combobox), `.p-cmd-list` (listbox: `.p-cmd-group`, `.p-cmd-row.is-on[aria-selected=true]`), `.p-cmd-foot` |
| Form modal | `.p-modal.is-flush` (+ `.is-lg` 720 / `.is-xl` 880) > `.p-modal-head` + `.p-modal-body` (scrolls) + `.p-modal-foot` |
| Section label | `<Divider>` / `.p-divider` > `.p-divider-mark` + text |
| Recessed panel | `.p-well` |
| Clickable card | `<a class="p-card is-link">` or `<button class="p-card is-link">`, never a bare div |
| Inputs | `.p-drop(.is-full/.is-over)` file drop (a `<label>` around the input), `.p-range(.is-lg)`, `.p-choice(.is-on/.is-sm)` radio-card (in a `role="radiogroup"`, each `role="radio"` with `aria-checked`) |
| Small marks | `.p-kbd` / `<Kbd>`, `.p-dot` (`is-lume/gold/pos/neg`, `is-pulse`), `.p-spin` (pair with text or `role="status"`), `.p-icon-btn(.is-sm)` (needs `aria-label`) |
| Tones | `<Badge tone>` / `.p-badge.is-gold/.is-pos/.is-neg/.is-quiet/.is-solid`, `<Avatar tone size>` / `.p-avatar.is-sm/.is-lume`, `.p-alert.is-quiet`, `.p-stat-num.is-sm`, `.p-table.is-clickable/.is-dense`, `.p-tab:disabled` |
| Toasts | `.p-toaster[role=status]` > `.p-toast` |

## Rules of the look

- Gold is for action (primary button, the one primary card, a picked choice, the highlighted palette row). Teal lume is for signal and state (live, active tab, current rail link, step progress, busy).
- Pills for actions and tabs, 12px panels, 8px fields, hairline rules instead of borders.
- Geist everywhere; the accent moment is `.p-serif` (Geist, synthesized italic like the site, in gold), one per heading.
- Text on a gold/teal/red fill uses `--p-on-gold` / `--p-on-lume` / `--p-on-neg`, never `#fff`.
- `--p-fg-4` is decorative only (dividers, disabled). Body text stops at `--p-fg-3`.

## Upgrading from 0.1

v0.2 moved the form classes (`.p-field`, `.p-label`, `.p-input`, `.p-select`, `.p-check`, `.p-radio`, `.p-switch`, `.p-search`) out of `components.css` into `forms.css`. Add `import "@pulpo/ui/forms.css";` after `components.css` when you bump the tag, or forms render unstyled. `.p-seam.is-inline` was never released; use `.p-divider`.

## Release

Bump `version`, commit, `git tag vX.Y.Z && git push --tags`. Apps upgrade by changing the tag.
