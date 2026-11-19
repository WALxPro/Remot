import { ChevronDown } from "lucide-react";

export function FaqItem({ id, number, question, answer, isOpen, onToggle }) {
  const buttonId = `faq-button-${id}`;
  const panelId = `faq-panel-${id}`;

  return (
    <li
      className={`overflow-hidden rounded-[22px] transition-colors duration-300 ${
        isOpen ? "bg-white text-background" : "bg-brand-primary text-foreground"
      }`}
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(id)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-sm tracking-wide lg:text-[20px]"
        >
          <span>
            {number}. {question}
          </span>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-xs leading-5 lg:text-sm">{answer}</p>
        </div>
      </div>
    </li>
  );
}