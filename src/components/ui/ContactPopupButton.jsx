"use client";

import { Button } from "@/components/ui/Button";
import { useContactPopup } from "@/components/providers/ContactPopupProvider";

export function ContactPopupButton({
  children,
  ...props
}) {
  const { openPopup } = useContactPopup();

  return (
    <Button
      {...props}
      type="button"
      onClick={openPopup}
    >
      {children}
    </Button>
  );
}