import { useCallback, useState } from "react";

export function useCarousel(length) {
  const [active, setActive] = useState(Math.floor(length / 2));

  const next = useCallback(() => setActive((i) => (i + 1) % length), [length]);
  const prev = useCallback(
    () => setActive((i) => (i - 1 + length) % length),
    [length]
  );

  return { active, next, prev, goTo: setActive };
}

/** Active card se circular distance: -2, -1, 0, 1, 2 ... */
export function getCircularOffset(index, active, length) {
  let diff = index - active;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}