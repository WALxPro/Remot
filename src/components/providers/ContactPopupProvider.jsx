"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

import { ContactPopup } from "@/components/ui/ContactPopup";

const ContactPopupContext = createContext(null);

export function ContactPopupProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <ContactPopupContext.Provider
      value={{ openPopup, closePopup }}
    >
      {children}

      <ContactPopup
        isOpen={isOpen}
        onClose={closePopup}
      />
    </ContactPopupContext.Provider>
  );
}

export function useContactPopup() {
  const context = useContext(ContactPopupContext);

  if (!context) {
    throw new Error(
      "useContactPopup must be used within ContactPopupProvider"
    );
  }

  return context;
}