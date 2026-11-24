
import { OUR_SERVICES } from "@/config/service/service";

import { GlassTextFilter } from "@/components/ui/GlassTextFilter";
import { ServicesGrid } from "@/components/ui/ServicesGrid";

const FILTER_ID = "main-services-glass";

export function OurServices() {
  const { heading, services } = OUR_SERVICES;

  return (
    <section
      aria-labelledby="our-services-heading"
      className="w-full py-14 sm:py-20 lg:pt-24 lg:pb-36 xl:pb-[200px]"
    >
      <GlassTextFilter
        id={FILTER_ID}
        blur={1.4}
        depth={3.5}
        strength={1.1}
        opacity={1}
        bounce={0.35}
      />

      <div className="mx-auto w-full px-5 sm:px-8 lg:px-12">
        <h2
          id="our-services-heading"
          className="mx-auto mb-10 max-w-[1100px] text-center font-sans text-[clamp(28px,5.5vw,80px)] font-normal leading-[1.15] tracking-[-0.04em] text-foreground sm:mb-12 lg:mb-16"
        >
          {heading}
        </h2>

        <ServicesGrid
          services={services}
          filterId={FILTER_ID}
        />
      </div>
    </section>
  );
}
