// Typed fronts for the .p-* classes in css/components.css. The classes are the real API
// (any app can use them from plain HTML); these exist so React callers get props, not strings.

import { useId } from "react";
import type * as React from "react";

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

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

/** Small non-interactive mono label. Teal by default; `quiet` for metadata, `solid` for a gold fill. */
export const Badge = ({ tone, quiet, className, ...rest }: React.HTMLAttributes<HTMLSpanElement> & { tone?: Exclude<Tone, "lume"> | "solid"; quiet?: boolean }) => (
  <span {...rest} className={cx("p-badge", quiet ? "is-quiet" : tone && `is-${tone}`, className)} />
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
        <span id={noteId} className={hasError ? "p-error" : "p-help"} aria-live={hasError ? "polite" : undefined}>
          {note}
        </span>
      )}
    </div>
  );
}

/** Mono uppercase label in teal with a lume dot. `pulse` makes the dot breathe; `quiet` drops it. */
export const Eyebrow = ({ children, pulse, quiet }: { children?: React.ReactNode; pulse?: boolean; quiet?: boolean }) => (
  <div className={cx("p-eyebrow", pulse && "is-pulse", quiet && "is-quiet")}>{children}</div>
);

/** Section divider with the § medallion. `inline` puts the caption on the hairline, for dense app pages. */
export const Seam = ({ caption, inline }: { caption?: React.ReactNode; inline?: boolean }) => (
  <div className={cx("p-seam", inline && "is-inline")}>
    {caption && <span className="p-seam-cap">{caption}</span>}
    <span className="p-seam-mark" />
  </div>
);

export const Avatar = ({ initials, gold, tone, size }: { initials: string; gold?: boolean; tone?: "gold" | "lume"; size?: "sm" }) => (
  <span className={cx("p-avatar", (gold || tone === "gold") && "is-gold", tone === "lume" && "is-lume", size && `is-${size}`)} aria-hidden>
    {initials}
  </span>
);

/** Keyboard hint, e.g. <Kbd>⌘K</Kbd>. */
export const Kbd = ({ className, ...rest }: React.HTMLAttributes<HTMLElement>) => <kbd {...rest} className={cx("p-kbd", className)} />;
