
"use client";

import Image from "next/image";
import { FaqItem } from "@/components/ui/FaqItem";
import { useAccordion } from "@/hooks/useAccordion";
import { FAQ, SHARED_IMAGES } from "@/config/shared/shared";

const formatNumber = (index) =>
  String(index + 1).padStart(2, "0");

export function FaqSection() {
  const { title, items, defaultOpenId } = FAQ;
  const { isOpen, toggle } = useAccordion(defaultOpenId);

  return (
    <section className="bg-transparent px-4 py-12 lg:px-8 lg:py-16">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-3xl px-6 py-14 lg:px-14 lg:py-20">
        <Image
          src={SHARED_IMAGES.faq.background}
          alt=""
          fill
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="-z-10 object-cover"
        />

        <h2 className="text-center text-4xl uppercase leading-[1.1] text-foreground lg:text-[80px]">
          <span className="block font-light">
            {title.light}
          </span>
          <span className="block font-semibold">
            {title.bold}
          </span>
        </h2>

        <ul className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 lg:mt-14">
          {items.map((item, index) => (
            <FaqItem
              key={item.id}
              {...item}
              number={formatNumber(index)}
              isOpen={isOpen(item.id)}
              onToggle={toggle}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
