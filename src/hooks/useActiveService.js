
"use client";

import { useRef, useState } from "react";
import {
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

export const useActiveService = (
  services,
  initialService
) => {
  const containerRef = useRef(null);

  const initialIndex = Math.max(
    0,
    services.indexOf(initialService)
  );

  const [activeIndex, setActiveIndex] =
    useState(initialIndex);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!services.length) return;

    const index = Math.min(
      services.length - 1,
      Math.max(
        0,
        Math.floor(progress * services.length)
      )
    );

    setActiveIndex((previous) =>
      previous === index ? previous : index
    );
  });

  return {
    containerRef,
    activeIndex,
  };
};
