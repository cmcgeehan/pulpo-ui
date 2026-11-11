"use client";
// Typed fronts for the .p-* classes in css/components.css. The classes are the real API
// (any app can use them from plain HTML); these exist so React callers get props, not strings.

import { useId } from "react";
import type * as React from "react";

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

type ButtonOwnProps = { variant?: "primary" | "secondary" | "ghost" | "danger"; size?: "sm" | "md" | "lg" };
export type ButtonProps =
  | (ButtonOwnProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (ButtonOwnProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

/** Pill button. Pass `href` to render a link that looks like a button. */
export function Button({ variant = "primary", size = "md", className, ...rest }: ButtonProps) {
  const cls = cx("p-btn", `p-btn-${variant}`, size !== "md" && `p-btn-${size}`, className);
  if (rest.href !== undefined) return <a {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} className={cls} />;
  const { type = "button", ...b } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return <button type={type} {...b} className={cls} />;
}

export type CardProps = React.HTMLAttributes<HTMLDivElement> & { primary?: boolean; compact?: boolean };

export const Card = ({ primary, compact, className, ...rest }: CardProps) => (
  <div {...rest} className={cx("p-card", primary && "p-card-primary", compact && "p-card-compact", className)} />
);

export type Tone = "gold" | "lume" | "pos" | "neg" | "quiet";

/** Status pill with a dot. Gold by default. */
export const Pill = ({ tone, className, ...rest }: React.HTMLAttributes<HTMLSpanElement> & { tone?: Exclude<Tone, "gold"> }) => (
  <span {...rest} className={cx("p-pill", tone && `is-${tone}`, className)} />
);

/** Small non-interactive mono label. Teal by default; `quiet` for metadata. */
export const Badge = ({ quiet, className, ...rest }: React.HTMLAttributes<HTMLSpanElement> & { quiet?: boolean }) => (
  <span {...rest} className={cx("p-badge", quiet && "is-quiet", className)} />
);

export type FieldProps = {
  label: React.ReactNode;
  help?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  /** Receives the generated id and aria props; spread them onto the control. */
  children: (control: {
    id: string;
    className: string;
    required?: boolean;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
  }) => React.ReactNode;
  /** Which control the child renders; picks its class. */
  input?: "input" | "textarea" | "select";
};

/** Label + control + help/error, wired for screen readers. */
export function Field({ label, help, error, required, children, input = "input" }: FieldProps) {
  const id = useId();
  const noteId = `${id}-note`;
  const hasError = Boolean(error);
  const note = hasError ? error : help;
  return (
    <div className="p-field">
      <label className="p-label" htmlFor={id}>
        {label}
        {required && <span className="p-required" aria-hidden>*</span>}
      </label>
      {children({
        id,
        className: cx(`p-${input}`, hasError && "is-error"),
        required: required || undefined,
        "aria-describedby": note ? noteId : undefined,
        "aria-invalid": hasError || undefined,
      })}
      {note && (
        <span id={noteId} className={hasError ? "p-error" : "p-help"} aria-live="polite">
          {note}
        </span>
      )}
    </div>
  );
}

export type TabItem<T extends string> = { value: T; label: React.ReactNode };

/** Pill toggle. Arrow keys move between tabs (WAI-ARIA tabs pattern). */
export function Tabs<T extends string>({
  items,
  value,
  onChange,
  label,
}: {
  items: TabItem<T>[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.altKey || e.metaKey || e.ctrlKey) return;
    const i = items.findIndex((t) => t.value === value);
    const n = items.length;
    const to = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    const next = items[to];
    onChange(next.value);
    (e.currentTarget.querySelector(`[data-value="${CSS.escape(next.value)}"]`) as HTMLElement | null)?.focus();
  };
  return (
    <div className="p-tabs" role="tablist" aria-label={label} onKeyDown={onKeyDown}>
      {items.map((t) => (
        <button
          key={t.value}
          type="button"
          role="tab"
          data-value={t.value}
          aria-selected={t.value === value}
          tabIndex={t.value === value ? 0 : -1}
          className={cx("p-tab", t.value === value && "is-active")}
          onClick={() => onChange(t.value)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/** Mono uppercase label in teal with a lume dot. `pulse` makes the dot breathe; `quiet` drops it. */
export const Eyebrow = ({ children, pulse, quiet }: { children?: React.ReactNode; pulse?: boolean; quiet?: boolean }) => (
  <div className={cx("p-eyebrow", pulse && "is-pulse", quiet && "is-quiet")}>{children}</div>
);

/** Section divider with the § medallion. */
export const Seam = ({ caption }: { caption?: React.ReactNode }) => (
  <div className="p-seam">
    {caption && <span className="p-seam-cap">{caption}</span>}
    <span className="p-seam-mark" />
  </div>
);

export const Avatar = ({ initials, gold }: { initials: string; gold?: boolean }) => (
  <span className={cx("p-avatar", gold && "is-gold")} aria-hidden>
    {initials}
  </span>
);
