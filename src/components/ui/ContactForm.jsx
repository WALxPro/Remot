
"use client";

import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { useContactForm } from "@/hooks/useContactForm";

export function ContactForm({
  fields,
  submitLabel,
  successMessage,
}) {
  const { status, handleSubmit } = useContactForm();
  const isSending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-5 bg-transparent sm:grid-cols-2"
    >
      {fields.map((field) => (
        <div
          key={field.name}
          className={field.fullWidth ? "sm:col-span-2" : ""}
        >
          <FormField {...field} />
        </div>
      ))}

      <div className="flex items-center justify-between gap-4 sm:col-span-2">
        <p role="status" className="text-xs text-foreground">
          {status === "success" && successMessage}
          {status === "error" &&
            "Something went wrong. Please try again."}
        </p>

        
        <Button
          type="submit"
          variant="white"
          disabled={isSending}
        >
          {isSending ? "Sending..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
