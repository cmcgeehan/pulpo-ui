"use client";

import type * as React from "react";
import { cx } from "./components";

export type TabItem<T extends string> = { value: T; label: React.ReactNode; count?: number | null };

/** Pill toggle. Arrow keys move between tabs (WAI-ARIA tabs pattern). */
export function Tabs<T extends string>({
  items,
  value,
  onChange,
  label,
  size,
}: {
  items: TabItem<T>[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  size?: "sm";
}) {
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Modified arrows belong to the app (e.g. Talent's ⇧← / ⇧→ decisions), not the tabs.
    if (e.altKey || e.metaKey || e.ctrlKey || e.shiftKey) return;
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
    <div className={cx("p-tabs", size && `is-${size}`)} role="tablist" aria-label={label} onKeyDown={onKeyDown}>
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
          {t.count != null && <span className="p-count">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}
