import { useState } from "react";

// TODO: apni API / email service yahan connect karein
async function sendContactRequest(data) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Request failed");
}

export function useContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    try {
      await sendContactRequest(data);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return { status, handleSubmit };
}