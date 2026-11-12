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

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** Teal (lume) by default; `quiet` for metadata, `solid` for a gold fill. */
  tone?: Exclude<Tone, "lume"> | "solid";
  /** @deprecated use tone="quiet" */
  quiet?: boolean;
};

/** Small non-interactive mono label. */
export const Badge = ({ tone, quiet, className, ...rest }: BadgeProps) => {
  const t = tone ?? (quiet ? "quiet" : undefined);
  return <span {...rest} className={cx("p-badge", t && `is-${t}`, className)} />;
};

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

/** Mono uppercase label in teal, like the site's section eyebrows. `pulse` adds a breathing dot for something live. */
export const Eyebrow = ({ children, pulse }: {
  children?: React.ReactNode;
  pulse?: boolean;
  /** @deprecated eyebrows have no dot unless `pulse`; this does nothing */
  quiet?: boolean;
}) => <div className={cx("p-eyebrow", pulse && "is-pulse")}>{children}</div>;

/** Section divider with the § medallion. */
export const Seam = ({ caption }: { caption?: React.ReactNode }) => (
  <div className="p-seam">
    {caption && <span className="p-seam-cap">{caption}</span>}
    <span className="p-seam-mark" />
  </div>
);

/** A section label on a hairline, for dense app pages. */
export const Divider = ({ children }: { children?: React.ReactNode }) => (
  <div className="p-divider">
    <span className="p-divider-mark" aria-hidden />
    {children}
  </div>
);

export type AvatarProps = {
  initials: string;
  tone?: "gold" | "lume";
  /** @deprecated use tone="gold" */
  gold?: boolean;
  size?: "sm";
};

export const Avatar = ({ initials, tone, gold, size }: AvatarProps) => {
  const t = tone ?? (gold ? "gold" : undefined);
  return (
    <span className={cx("p-avatar", t && `is-${t}`, size && `is-${size}`)} aria-hidden>
      {initials}
    </span>
  );
};

/** Keyboard hint, e.g. <Kbd>⌘K</Kbd>. */
export const Kbd = ({ className, ...rest }: React.HTMLAttributes<HTMLElement>) => <kbd {...rest} className={cx("p-kbd", className)} />;
