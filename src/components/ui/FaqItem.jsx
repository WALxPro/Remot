
import { ChevronDown } from "lucide-react";

export function FaqItem({
  id,
  number,
  question,
  answer,
  isOpen,
  onToggle,
}) {
  const buttonId = `faq-button-${id}`;
  const panelId = `faq-panel-${id}`;

  return (
    <li
      className={`
        overflow-hidden
        rounded-[22px]
        transition-colors
        duration-300
        ${
          isOpen
            ? "bg-foreground text-background"
            : "bg-brand-primary text-foreground"
        }
      `}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(id)}
          className="
            flex w-full cursor-pointer
            items-center justify-between gap-4
            px-4 py-4
            text-left
            text-[14px] font-medium
            leading-[1.5]
            tracking-wide
            transition-colors duration-300
            focus-visible:outline-2
            focus-visible:outline-offset-[-4px]
            focus-visible:outline-brand-purple
            sm:px-6 sm:py-5
            lg:text-[20px]
          "
        >
          <span>
            {number}. {question}
          </span>

          <ChevronDown
            size={20}
            strokeWidth={1.8}
            aria-hidden="true"
            className={`
              shrink-0
              transition-transform
              duration-300
              ${isOpen ? "rotate-180" : ""}
            `}
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`
          grid
          transition-[grid-template-rows]
          duration-300
          ease-in-out
          motion-reduce:transition-none
          ${
            isOpen
              ? "grid-rows-[1fr]"
              : "grid-rows-[0fr]"
          }
        `}
      >
        <div className="min-h-0 overflow-hidden">
          <p
            className="
              px-4 pb-5
              text-[13px]
              font-normal
              leading-[1.6]
              sm:px-6
              sm:text-[14px]
              lg:text-[16px]
            "
          >
            {answer}
          </p>
        </div>
      </div>
    </li>
  );
}
