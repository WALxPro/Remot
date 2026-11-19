
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CarouselArrowButton } from "@/components/ui/CarouselArrowButton";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { IMAGES, PORTFOLIO } from "@/config/home/home";
import { getCircularOffset, useCarousel } from "@/hooks/useCarousel";

export function PortfolioShowcase() {
  const { title, cta, items } = PORTFOLIO;
  const { active, next, prev, goTo } = useCarousel(items.length);

  return (
    <section className="overflow-hidden bg-transparent px-3 py-8 sm:px-4 sm:py-10 lg:px-8 lg:py-16">
      <div className="relative isolate overflow-hidden rounded-2xl bg-transparent sm:rounded-3xl">
        {/* Background */}
        <Image
          src={IMAGES.portfolio.background}
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="-z-10 object-cover lg:object-contain"
        />

        <div className="mx-auto flex min-h-[540px] w-full max-w-7xl flex-col px-3 py-8 sm:min-h-[650px] sm:px-8 lg:min-h-[800px] lg:px-12 lg:py-12">
          {/* Heading and CTA */}
          <div className="relative z-40 flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="order-2 sm:order-1">
              <Button href={cta.href} variant="outline">
                {cta.label}
              </Button>
            </div>

            <h2 className="order-1 text-center text-[32px] font-normal uppercase leading-[1.1] text-foreground sm:order-2 sm:text-right sm:text-5xl lg:text-[64px]">
              {title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          {/* Portfolio Carousel */}
          <div
            className="relative my-auto w-full min-w-0 pt-12 pb-6 sm:py-10"
            role="region"
            aria-label="Portfolio carousel"
          >
            <ul className="relative mx-auto h-[190px] w-full sm:h-[280px] md:h-[360px] lg:h-[420px]">
              {items.map((item, index) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  offset={getCircularOffset(
                    index,
                    active,
                    items.length
                  )}
                  onSelect={() => goTo(index)}
                />
              ))}
            </ul>

            {/* Carousel Controls */}
            <div className="relative z-40 mt-10 flex items-center justify-center gap-4 sm:mt-8 sm:gap-3">
              <CarouselArrowButton
                direction="prev"
                onClick={prev}
              />

              <CarouselArrowButton
                direction="next"
                onClick={next}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
