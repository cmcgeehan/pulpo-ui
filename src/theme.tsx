"use client";

// Theme — `data-theme` on <html>, dark by default, light on request.
// `themeScript` goes in <head> so the attribute is set before first paint (no flash);
// ThemeProvider reads it back and keeps it in sync. While the user hasn't picked a
// theme we follow the OS preference live; once they toggle, localStorage wins.

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type * as React from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "pulpo-theme";

/** Inline in <head>: `<script dangerouslySetInnerHTML={{ __html: themeScript }} />`. */
export const themeScript = `(function(){try{var s=localStorage.getItem('${STORAGE_KEY}');var t=(s==='light'||s==='dark')?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(_){document.documentElement.setAttribute('data-theme','dark');}})();`;

type ThemeCtx = { theme: Theme; setTheme: (next: Theme) => void; toggleTheme: () => void };

const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark",
  );

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

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label="Light theme"
      title={isLight ? "Switch to dark" : "Switch to light"}
      onClick={toggleTheme}
      className="p-theme-toggle"
    >
      {isLight ? (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M13.5 9.5a5.5 5.5 0 1 1-7-7 4.5 4.5 0 0 0 7 7Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.25" />
          <path
            d="M8 1.5v1.5M8 13v1.5M14.5 8H13M3 8H1.5M12.6 3.4l-1.05 1.05M4.45 11.55 3.4 12.6M12.6 12.6l-1.05-1.05M4.45 4.45 3.4 3.4"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
