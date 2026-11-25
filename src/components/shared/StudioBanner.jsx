"use client";

import { useEffect, useRef, useState } from "react";

const TEXT =
  "STUDIO REMOT BRINGS THOSE SKILLS TOGETHER IN ONE REMOTE CREATIVE STUDIO";

export function StudioBanner() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-transparent"
    >
      <div className="relative flex h-[100px] items-center overflow-hidden bg-transparent px-0 py-10 sm:min-h-[300px] sm:py-[150px]">
        <div className="w-full -rotate-[4deg] will-change-transform">
          <div
            className="studio-banner-scroll flex w-max items-center"
            style={{ "--marquee-play-state": visible ? "running" : "paused" }}
            aria-hidden="true"
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {[0, 1].map((index) => (
                  <span
                    key={index}
                    className="shrink-0 whitespace-nowrap px-6 font-sans text-[30px] font-medium uppercase text-foreground sm:text-[54px]"
                  >
                    {TEXT}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}