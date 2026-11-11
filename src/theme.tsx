"use client";

// Theme — `data-theme` on <html>, dark by default, light on request.
// `themeScript` (theme-script.ts) sets the attribute before first paint (no flash);
// ThemeProvider reads it back after mount and keeps it in sync. While the user hasn't
// picked a theme we follow the OS preference live; once they toggle, localStorage wins.

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type * as React from "react";
import { Icon } from "./icon";
import { THEME_STORAGE_KEY as STORAGE_KEY } from "./theme-script";

export type Theme = "dark" | "light";

type ThemeCtx = { theme: Theme; setTheme: (next: Theme) => void; toggleTheme: () => void };

const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Starts "dark" on server and client alike so hydration matches; the effect below reads the
  // real attribute. Anything visual keys off [data-theme] in CSS, so nothing flashes meanwhile.
  const [theme, setThemeState] = useState<Theme>("dark");

  const apply = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    setThemeState(next);
  }, []);

  const setTheme = useCallback(
    (next: Theme) => {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Private mode / quota: apply anyway, it just won't persist.
      }
      apply(next);
    },
    [apply],
  );

  const toggleTheme = useCallback(() => setTheme(theme === "dark" ? "light" : "dark"), [theme, setTheme]);

  useEffect(() => {
    setThemeState(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        // ignore
      }
      apply(e.matches ? "light" : "dark");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [apply]);

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

/** Both glyphs render; CSS shows the one for the current data-theme, so server HTML is always right. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "light"}
      aria-label="Light theme"
      onClick={toggleTheme}
      className="p-theme-toggle"
    >
      <Icon name="sun" size={14} className="is-dark" />
      <Icon name="moon" size={14} className="is-light" />
    </button>
  );
}
