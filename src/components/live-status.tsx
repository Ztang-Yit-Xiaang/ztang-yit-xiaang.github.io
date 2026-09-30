"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";

export function LiveStatus() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Chicago",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now);
        setTimeString(formatted);
      } catch {
        setTimeString("");
      }
    };

    const initial = setTimeout(updateTime, 0);
    const interval = setInterval(updateTime, 1000);
    return () => { clearTimeout(initial); clearInterval(interval); };
  }, []);

  return (
    <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-zinc-100/90 dark:bg-slate-900/90 border border-zinc-200/80 dark:border-slate-800 px-3.5 py-1 text-xs text-zinc-600 dark:text-slate-300 shadow-xs">
      <span className="flex items-center gap-1.5 font-medium">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-zinc-800 dark:text-slate-200 font-semibold">Available for Research & Collaboration</span>
      </span>

      <span className="text-zinc-300 dark:text-slate-700 hidden sm:inline">•</span>

      <span className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-slate-400">
        <MapPin className="h-3 w-3 text-cinnabar" />
        <span>Minneapolis, MN</span>
      </span>

      <span className="text-zinc-300 dark:text-slate-700 hidden sm:inline">•</span>

      <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-500 dark:text-slate-400 min-w-[76px]">
        <Clock className="h-3 w-3 text-indigo-500" />
        <span>{timeString || "Central Time"}</span>
      </span>
    </div>
  );
}
