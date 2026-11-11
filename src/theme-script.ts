// No "use client": server layouts import this string, so it must stay a plain module export.
export const THEME_STORAGE_KEY = "pulpo-theme";

/** Inline in <head>: `<script dangerouslySetInnerHTML={{ __html: themeScript }} />`. Sets data-theme before first paint. */
export const themeScript = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var t=(s==='light'||s==='dark')?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(_){document.documentElement.setAttribute('data-theme','dark');}})();`;
