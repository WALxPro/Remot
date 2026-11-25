"use client";

import Image from "next/image";
import { motion, LayoutGroup } from "framer-motion";
import Link from "next/link";
import { SERVICES_SHOWCASE } from "@/config/service/service";
import { Paragraph } from "@/components/ui/Paragraph";
import { useActiveService } from "@/hooks/useActiveService";

const SERVICE_TITLES = SERVICES_SHOWCASE.services.map(
  (service) => service.title
);

const BAR_TRANSITION = {
  type: "spring",
  stiffness: 180,
  damping: 28,
  mass: 0.8,
};

const ShowcaseHeader = ({ heading, description }) => {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
      <h2
        className="
          font-sans
          text-[clamp(28px,7vw,98px)]
          font-normal
          leading-[1.1]
          tracking-[-0.04em]
          text-foreground
        "
      >
        {heading.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>

      <Paragraph className="max-w-[350px]">
        {description}
      </Paragraph>
    </div>
  );
};

const ServiceImage = ({ src, alt, side }) => {
  if (!src) return null;

  return (
    <div
      className={`
        pointer-events-none
        absolute
        top-1/2
        z-20
        hidden
        h-[180px]
        w-[200px]
        -translate-y-1/2
        xl:block
        ${
          side === "left"
            ? "left-0 -rotate-6"
            : "right-0 rotate-6"
        }
      `}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="200px"
        className="object-contain"
      />
    </div>
  );
};

const ServiceItem = ({
  title,
  href,
  isActive,
  images,
}) => {
  return (
    <Link
      href={href}
      prefetch={false}
      className={`
        group
        relative
        flex
        w-full
        cursor-pointer
        items-center
        justify-center
        px-3 py-1
        text-center
        font-display
        text-[clamp(17px,5vw,80px)]
        font-normal
        leading-[1.2]
        tracking-[-0.04em]
        ${isActive ? "z-20" : "z-0"}
      `}
    >
      {isActive && (
        <>
          <motion.div
            layoutId="active-service-bar"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-brand-primary
            "
            transition={BAR_TRANSITION}
          />

          <motion.div
            layoutId="active-service-images"
            className="
              pointer-events-none
              absolute
              inset-0
              z-20
            "
            transition={BAR_TRANSITION}
          >
            <ServiceImage
              src={images?.left}
              alt={`${title} creative project`}
              side="left"
            />

            <ServiceImage
              src={images?.right}
              alt={`${title} featured project`}
              side="right"
            />
          </motion.div>
        </>
      )}

      <span
        className={`
          relative
          z-10
          transition-colors
          duration-300
          ${
            isActive
              ? "text-white"
              : "text-white/40 group-hover:text-white"
          }
        `}
      >
        {title}
      </span>
    </Link>
  );
};

const ServiceList = ({ services, activeIndex }) => {
  return (
    <LayoutGroup id="services-showcase">
      <div className="relative z-10 flex flex-col items-center">
        {services.map((service, index) => (
          <ServiceItem
            key={service.title}
            title={service.title}
            href={service.href}
            images={service.images}
            isActive={index === activeIndex}
          />
        ))}
      </div>
    </LayoutGroup>
  );
};


export const ServicesShowcase = () => {
  const {
    heading,
    description,
    sideLabel,
    services,
    activeService,
  } = SERVICES_SHOWCASE;

  const { containerRef, activeIndex } =
    useActiveService(SERVICE_TITLES, activeService);

  return (
    <section
      ref={containerRef}
      className="
        relative
        w-full
        py-12
        sm:py-16
        lg:py-20
      "
    >
      <div className="relative mx-auto w-full px-5 sm:px-8 lg:px-12">

        <ShowcaseHeader
          heading={heading}
          description={description}
        />

        {/* SIDE LABEL */}
        <span
          className="
            absolute
            right-3
            top-0
            hidden
            text-[10px]
            tracking-widest
            text-foreground/70
            [writing-mode:vertical-rl]
            lg:block
          "
        >
          {sideLabel}
        </span>

        {/* SERVICES */}
        <div className="relative mt-16 lg:mt-32 lg:mb-[200px]">
          <ServiceList
            services={services}
            activeIndex={activeIndex}
          />
        </div>
      </div>
    </section>
  );
};