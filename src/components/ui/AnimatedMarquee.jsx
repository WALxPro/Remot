"use client";

import { useState } from "react";

export function AnimatedMarquee({
  children,
  label,
  className = "",
  controlClassName = "right-2 top-2",
  controlPlacement = "overlay",
}) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      style={{
        "--marquee-play-state": isPaused ? "paused" : "running",
      }}
    >
      {children}

      <button
        type="button"
        aria-label={`${isPaused ? "Resume" : "Pause"} ${label}`}
        onClick={() => setIsPaused((paused) => !paused)}
        className={`${controlPlacement === "overlay" ? "absolute" : "relative self-end"} z-20 rounded-full border border-white/40 bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur transition hover:bg-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:hidden ${controlClassName}`}
      >
        {isPaused ? "Resume" : "Pause"}
      </button>
    </div>
  );
}
