import type { Track } from "@/types/content";

export const trackLabels: Record<Track, string> = {
  technical: "Technical",
  functional: "Functional",
};

export const trackColors: Record<Track, string> = {
  technical: "bg-sky-500/10 text-sky-400 border-sky-500/25",
  functional: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
};

export const trackGradients: Record<Track, string> = {
  technical: "from-sky-950/80 via-slate-900/60 to-transparent",
  functional: "from-emerald-950/80 via-slate-900/60 to-transparent",
};

export const trackCardAccent: Record<Track, string> = {
  technical: "hover:border-sky-500/40",
  functional: "hover:border-emerald-500/40",
};

export const trackIconBg: Record<Track, string> = {
  technical: "bg-sky-500/15 text-sky-400",
  functional: "bg-emerald-500/15 text-emerald-400",
};
