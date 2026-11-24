
"use client";

import Image from "next/image";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { Button } from "@/components/ui/Button";
import { useAccordion } from "@/hooks/useAccordion";
import { WHY_US } from "@/config/home/home";

export function WhyWorkWithUs() {
  const { isOpen, toggle } = useAccordion(
    WHY_US.items.slice(0, 2).map((item) => item.id),
    true
  );

  return (
    <div className="relative lg:h-[80vh]">
      <section
        aria-labelledby="why-work-heading"
        className="flex h-full flex-col justify-center bg-transparent px-6 py-10 sm:py-0 "
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-15 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-10">
          <div className="min-w-0">
            <h2
              id="why-work-heading"
              className="mb-10 text-3xl font-medium uppercase leading-tight sm:text-4xl lg:text-[54px] lg:leading-[78px]"
            >
              {WHY_US.title}
            </h2>

            <div>
              {WHY_US.items.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  index={index}
                  {...item}
                  isOpen={isOpen(item.id)}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </div>
          </div>

          <div className="min-w-0 w-full lg:ml-auto">
            <div className="relative aspect-[603/598] w-full overflow-hidden rounded-[16px]">
              <Image
                src={WHY_US.image.src}
                alt={WHY_US.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-5 flex justify-center sm:justify-end">
              <Button href={WHY_US.cta.href}>
                {WHY_US.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
