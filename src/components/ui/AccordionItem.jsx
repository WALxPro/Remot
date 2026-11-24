export function AccordionItem({ index, id, title, description, isOpen, onToggle }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="border-t border-transparent accordion-gradient-border last:border-b">
      <h3 className="text-[24px] font-sans font-normal uppercase">
        <button
          id={`accordion-button-${id}`}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`panel-${id}`}
          className="flex w-full items-center justify-between py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          <span>
            <span className="mr-3">{number}</span>
            {title}
          </span>

          <svg
            aria-hidden
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </h3>

      <div
        id={`panel-${id}`}
        role="region"
        aria-labelledby={`accordion-button-${id}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`grid transition-[grid-template-rows] duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-4xl font-display pb-6 pl-8 text-base leading-6 text-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}