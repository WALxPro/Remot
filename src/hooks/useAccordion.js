
import { useCallback, useState } from "react";

export function useAccordion(defaultOpen = null, multiple = false) {
  const [openIds, setOpenIds] = useState(
    multiple ? (Array.isArray(defaultOpen) ? defaultOpen : []) : defaultOpen
  );

  const toggle = useCallback(
    (id) => {
      setOpenIds((current) => {
        if (multiple) {
          return current.includes(id)
            ? current.filter((item) => item !== id)
            : [...current, id];
        }

        return current === id ? null : id;
      });
    },
    [multiple]
  );

  const isOpen = (id) =>
    multiple ? openIds.includes(id) : openIds === id;

  return { openIds, isOpen, toggle };
}
