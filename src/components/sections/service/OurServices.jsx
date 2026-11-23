
import Link from "next/link";

import { OUR_SERVICES } from "@/config/service/service";
import { Paragraph } from "@/components/ui/Paragraph";
import { GlassTextFilter } from "@/components/ui/GlassTextFilter";

/* =========================
   SERVICE CARD
========================= */

const ServiceCard = ({ service }) => {
  const { number, title, description, linkText, href } = service;

  return (
    <article
      className="
        flex h-full flex-col justify-between
        gap-6
        rounded-lg
        border border-white/15
        bg-white/10
        p-5
        sm:p-6
        lg:min-h-[380px]
        xl:min-h-[440px]
        xl:p-7
      "
    >
      {/* Card Content */}
      <div className="flex flex-col gap-4 lg:gap-6">
        {/* Glass Number */}
        <span
          className="
            w-fit
            font-display
            text-[clamp(48px,5vw,64px)]
            font-medium
            leading-none
            text-white/10
            [filter:url(#glass-text-sm)]
          "
        >
          {number}
        </span>

        {/* Service Title */}
        <h3
          className="
            font-sans
            text-[clamp(22px,2.2vw,35px)]
            font-medium
            leading-[1.15]
            tracking-[-0.03em]
            text-foreground
            wrap-break-word
          "
        >
          {title}
        </h3>

        {/* Paragraph handles its own styling */}
        <Paragraph>{description}</Paragraph>
      </div>

      {/* Card Link */}
      <div className="mt-auto pt-4">
        {href ? (
          <Link
            href={href}
            className="
              inline-flex w-fit items-center gap-2
              text-[16px] font-medium
              text-foreground
              transition-opacity duration-200
              hover:opacity-70
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-brand-primary
              sm:text-[18px]
              xl:text-[20px]
            "
          >
            {linkText}
            <span aria-hidden="true">↗</span>
          </Link>
        ) : (
          <span className="inline-flex items-center gap-2 text-[16px] text-white/80 sm:text-[18px] xl:text-[20px]">
            {linkText}
            <span aria-hidden="true">↗</span>
          </span>
        )}
      </div>
    </article>
  );
};

/* =========================
   SERVICES GRID
========================= */

const ServicesGrid = ({ services }) => {
  return (
    <div
      className="
        grid grid-cols-1
        items-stretch
        gap-4
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        xl:gap-5
      "
    >
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

/* =========================
   OUR SERVICES
========================= */

export const OurServices = () => {
  const { heading, services } = OUR_SERVICES;

  return (
    <section
      className="
        w-full
        py-14
        sm:py-20
        lg:pt-24
        lg:pb-36
        xl:pb-[200px]
      "
      aria-labelledby="our-services-heading"
    >
      <GlassTextFilter
        id="glass-text-sm"
        blur={1.4}
        depth={3.5}
        strength={1.1}
        opacity={1}
        bounce={0.35}
      />

      <div className="mx-auto w-full px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <h2
          id="our-services-heading"
          className="
            mx-auto
            mb-10
            max-w-[1100px]
            text-center
            font-sans
            text-[clamp(28px,5.5vw,80px)]
            font-normal
            leading-[1.15]
            tracking-[-0.04em]
            text-foreground
            sm:mb-12
            lg:mb-16
          "
        >
          {heading}
        </h2>

        {/* Services Grid */}
        <ServicesGrid services={services} />
      </div>
    </section>
  );
};
