import type { CSSProperties } from "react";

const paths = {
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  arrowUp: <><path d="M7 17 17 7M7 7h10v10" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  tasks: <><path d="m3 6 2 2 3-4M11 6h10M3 13h3M11 13h10M3 20h3M11 20h10" /></>,
  habits: <><path d="M20 7a8 8 0 0 0-14-2L3 8M3 3v5h5M4 17a8 8 0 0 0 14 2l3-3M21 21v-5h-5" /></>,
  goals: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  focus: <><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2M9 2h6M18 5l2-2" /></>,
  studies: <><path d="M12 5v15M12 5C9 2 4 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-2-1-7-2-10 1Z" /></>,
  finances: <><rect x="3" y="5" width="18" height="15" rx="3" /><path d="M3 9h18M17 14h4M6 5V3h12" /></>,
  health: <><path d="M20 13c4-7-4-12-8-6-4-6-12-1-8 6l8 8 8-8Z" /><path d="M4 12h4l2-3 3 6 2-3h5" /></>,
  sparkle: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" /><path d="M20 2v4M18 4h4" /></>,
  shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>,
  cloud: <><path d="M6 18a5 5 0 1 1 .5-10A6 6 0 0 1 18 8a5 5 0 1 1 0 10" /><path d="M12 13v9m-3-3 3 3 3-3" /></>,
  offline: <><path d="M3 3l18 18M2 8a17 17 0 0 1 3-2M9 5a17 17 0 0 1 13 3M5 12a12 12 0 0 1 4-2M13 10a12 12 0 0 1 6 2M8 16a6 6 0 0 1 5-1" /><circle cx="12" cy="20" r="1" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  play: <path d="m7 4 13 8-13 8V4Z" />,
  leaf: <><path d="M20 3C8 2 1 10 7 17S22 14 20 3Z" /><path d="m5 21 10-10" /></>,
  bell: <><path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5l-2 3ZM10 21h4" /></>,
} as const;
export type IconName = keyof typeof paths;
export function Icon({ name, size = 20, className, style }: { name: IconName; size?: number; className?: string; style?: CSSProperties }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} style={style}>{paths[name]}</svg>;
}
