/* Heroicons-outline style: stroke 1.5, no fill. Unknown names render nothing. */

import type * as React from "react";

export type IconProps = {
  name: string;
  size?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
  className?: string;
};

export const Icon = ({ name, size = 16, strokeWidth = 1.5, style, className }: IconProps) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
    strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, style, className };
  switch (name) {
    case "search":return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
    case "chev-right":return <svg {...p}><path d="m9 6 6 6-6 6" /></svg>;
    case "chev-down":return <svg {...p}><path d="m6 9 6 6 6-6" /></svg>;
    case "chev-up-down":return <svg {...p}><path d="M7 9l5-5 5 5M7 15l5 5 5-5" /></svg>;
    case "arrow-right":return <svg {...p}><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
    case "arrow-left":return <svg {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>;
    case "plus":return <svg {...p}><path d="M12 5v14M5 12h14" /></svg>;
    case "close":return <svg {...p}><path d="M6 6l12 12M18 6l-12 12" /></svg>;
    case "check":return <svg {...p} strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg>;
    case "more":return <svg {...p}><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>;
    case "briefcase":return <svg {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></svg>;
    case "users":return <svg {...p}><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0" /><circle cx="17" cy="9" r="3" /><path d="M22 19a5 5 0 0 0-8.5-3.6" /></svg>;
    case "sliders":return <svg {...p}><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h10M18 18h2" /><circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="16" cy="18" r="2" /></svg>;
    case "spark":return <svg {...p}><path d="M12 3l1.6 4.6L18 9.2l-4.4 1.6L12 15.4l-1.6-4.6L6 9.2l4.4-1.6z" /><path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" /></svg>;
    case "wa":return <svg {...p}><path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3.5 21l1.6-5A8.4 8.4 0 1 1 21 11.5z" /><path d="M8.6 9.2c0 3 2.2 5.2 5.2 5.2M8.6 9.2h1.3l.8 1.6-1 .8M13.8 14.4v-1.3l1.6-.8.8 1" /></svg>;
    case "mail":return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
    case "calendar":return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>;
    case "upload":return <svg {...p}><path d="M12 16V4M6 10l6-6 6 6M4 20h16" /></svg>;
    case "download":return <svg {...p}><path d="M12 4v12M6 12l6 6 6-6M4 20h16" /></svg>;
    case "file":return <svg {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg>;
    case "trash":return <svg {...p}><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" /></svg>;
    case "undo":return <svg {...p}><path d="M9 14L4 9l5-5" /><path d="M4 9h9a7 7 0 0 1 0 14H8" /></svg>;
    case "archive":return <svg {...p}><rect x="3" y="4" width="18" height="4" rx="1" /><path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" /><path d="M10 13h4" /></svg>;
    case "target":return <svg {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></svg>;
    case "mappin":return <svg {...p}><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></svg>;
    case "money":return <svg {...p}><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M6 9.5h.01M18 14.5h.01" /></svg>;
    case "clock":return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case "bell":return <svg {...p}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 7H3s3 0 3-7Z" /><path d="M10 21a2 2 0 0 0 4 0" /></svg>;
    case "settings":return <svg {...p}><circle cx="12" cy="12" r="3" /><path d="M19.1 14.2a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V20a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H4a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V4a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H20a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1.1z" /></svg>;
    case "thumb-up":return <svg {...p}><path d="M7 21V10l4.5-7a2 2 0 0 1 2 2.8L12 10h5.5a2.5 2.5 0 0 1 2.4 3.1l-1.5 6A2.5 2.5 0 0 1 16 21z" /><path d="M7 10H4v11h3" /></svg>;
    case "sun":return <svg {...p}><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" /></svg>;
    case "moon":return <svg {...p}><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" /></svg>;
    case "globe":return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M3.5 9h17M3.5 15h17M12 3c-2.5 3-2.5 15 0 18M12 3c2.5 3 2.5 15 0 18" /></svg>;
    case "copy":return <svg {...p}><rect x="9" y="3" width="12" height="14" rx="2" /><path d="M15 21H5a2 2 0 0 1-2-2V7" /></svg>;
    default:return null;
  }
};
