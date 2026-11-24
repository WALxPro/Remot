
"use client";

import { useId } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { CarouselArrowButton } from "@/components/ui/CarouselArrowButton";
import { PortfolioCard } from "@/components/ui/PortfolioCard";

import { IMAGES, PORTFOLIO } from "@/config/home/home";
import { getCircularOffset, useCarousel } from "@/hooks/useCarousel";

function PortfolioHeader({ title, cta, headingId }) {
  return (
    <header className="relative z-40 flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-between">
      <Button href={cta.href} variant="outline" className="order-2 sm:order-1">
        {cta.label}
      </Button>

      <h2
        id={headingId}
        className="order-1 text-center text-[32px] font-normal uppercase leading-[1.1] text-foreground sm:order-2 sm:text-right sm:text-5xl lg:text-[64px]"
      >
        {title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
    </header>
  );
}

function PortfolioSlides({ items, active, goTo }) {
  return (
    <ul className="relative mx-auto h-[290px] w-full sm:h-[280px] md:h-[360px] lg:h-[420px]">
      {items.map((item, index) => (
        <PortfolioCard
          key={item.id}
          item={item}
          offset={getCircularOffset(index, active, items.length)}
          onSelect={() => goTo(index)}
        />
      ))}
    </ul>
  );
}

function PortfolioControls({ prev, next, disabled }) {
  return (
    <div className="relative z-40 mt-8 flex items-center justify-center gap-4 sm:mt-10 sm:gap-3">
      <CarouselArrowButton
        direction="prev"
        onClick={prev}
        disabled={disabled}
      />

      <CarouselArrowButton
        direction="next"
        onClick={next}
        disabled={disabled}
      />
    </div>
  );
}

export function PortfolioShowcase() {
  const { title, cta, items } = PORTFOLIO;

  const headingId = useId();
  const { active, next, prev, goTo } = useCarousel(items.length);
  const disabled = items.length <= 1;

  function handleKeyDown(event) {
    if (disabled) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  }

  return (
    <section
      aria-labelledby={headingId}
      className="overflow-hidden bg-transparent px-3 py-8 sm:px-4 sm:py-10 lg:px-8 lg:py-16"
    >
      <div className="relative isolate overflow-hidden rounded-2xl bg-transparent sm:rounded-3xl">
        <Image
          src={IMAGES.portfolio.background}
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none -z-10 object-cover lg:object-contain"
        />

        <div className="mx-auto flex min-h-[540px] w-full max-w-7xl flex-col px-3 py-8 sm:min-h-[650px] sm:px-8 lg:min-h-[800px] lg:px-12 lg:py-12">
          <PortfolioHeader
            title={title}
            cta={cta}
            headingId={headingId}
          />

          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured portfolio projects"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="relative my-auto w-full min-w-0 pt-10 pb-6 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary sm:py-10"
          >
            <PortfolioSlides
              items={items}
              active={active}
              goTo={goTo}
            />

            <PortfolioControls
              prev={prev}
              next={next}
              disabled={disabled}
            />

            <p
              className="sr-only"
              aria-live="polite"
              aria-atomic="true"
            >
              {items.length > 0
                ? `Project ${active + 1} of ${items.length}: ${items[active]?.label}`
                : "No projects available"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
