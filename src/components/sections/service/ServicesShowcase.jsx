
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  SERVICES_SHOWCASE,
  IMAGES,
} from "@/config/service/service";

import {
  IMAGE_POSITIONS,
  IMAGE_TRANSITION,
  SERVICE_TRANSITION,
} from "@/config/service/service.constants";

import { Paragraph } from "@/components/ui/Paragraph";
import { useActiveService } from "@/hooks/useActiveService";

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


const ServiceItem = ({ title, isActive }) => {
  return (
    <motion.div
      className="
        relative
        flex
        w-full
        items-center
        justify-center
        px-3
        py-1
        text-center
        font-display
        text-[clamp(17px,5vw,80px)]
        font-normal
        leading-[1.2]
        tracking-[-0.04em]
      "
      initial={false}
      animate={{
        backgroundColor: isActive
          ? "var(--brand-primary)"
          : "rgba(0,0,0,0)",
        color: isActive
          ? "#ffffff"
          : "rgba(255,255,255,0.4)",
      }}
      transition={SERVICE_TRANSITION}
    >
      {title}
    </motion.div>
  );
};


const ServiceList = ({ services, activeIndex }) => {
  return (
    <div className="relative z-10 flex flex-col items-center">
      {services.map((service, index) => (
        <ServiceItem
          key={service}
          title={service}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  );
};


const FloatingImage = ({
  src,
  alt,
  position,
  className = "",
}) => {
  return (
    <motion.div
      className={`
        pointer-events-none
        absolute
        z-20
        hidden
        h-[280px]
        w-[300px]
        md:block
        ${className}
      `}
      initial={false}
      animate={{
        x: position.x,
        y: position.y,
        rotate: position.rotate,
        opacity: 1,
      }}
      transition={IMAGE_TRANSITION}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="300px"
        className="object-contain"
      />
    </motion.div>
  );
};


const FloatingImages = ({ images, activeIndex }) => {
  if (!IMAGE_POSITIONS.length) return null;

  const position =
    IMAGE_POSITIONS[
      activeIndex % IMAGE_POSITIONS.length
    ];

  return (
    <>
      <FloatingImage
        src={images.left}
        alt="Creative studio project"
        position={position.left}
        className="left-0 top-[18%]"
      />

      <FloatingImage
        src={images.right}
        alt="Featured creative project"
        position={position.right}
        className="right-[5%] top-[-8%]"
      />
    </>
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
    useActiveService(services, activeService);

  return (
    <section
      ref={containerRef}
      className="
        relative
        w-full
        overflow-hidden
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

        <div className="relative mt-16 lg:mt-32 lg:mb-[200px]">

          <FloatingImages
            images={IMAGES.servicesShowcase}
            activeIndex={activeIndex}
          />

          <ServiceList
            services={services}
            activeIndex={activeIndex}
          />

        </div>
      </div>
    </section>
  );
};
