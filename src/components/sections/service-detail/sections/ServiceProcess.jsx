
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";

function ProcessCard({ step }) {
  return (
    <article className="flex h-[300px] w-full max-w-[300px] flex-col items-center justify-center rounded-md bg-foreground px-5 py-5 text-center text-black shadow-lg">
      {step.icon && (
        <div className="relative mb-3 h-[94px] w-[94px] shrink-0">
          <Image
            src={step.icon}
            alt=""
            fill
            sizes="94px"
            className="object-contain"
          />
        </div>
      )}

      <h3 className="font-sans text-[clamp(22px,2vw,32px)] font-medium uppercase leading-tight">
        {step.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-black sm:text-base">
        {step.description}
      </p>
    </article>
  );
}

function ProcessStep({ step, index }) {
  const isTop = index % 2 === 1;

  return (
    <li className="relative flex min-w-0 flex-col pl-10 lg:grid lg:grid-rows-[300px_32px_300px] lg:justify-items-center lg:pl-0">
      {/* Timeline Dot */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-8 z-10 h-4 w-4 rounded-full border-2 border-white lg:static lg:row-start-2 lg:self-center lg:justify-self-center ${
          index < 2 ? "bg-brand-primary" : "bg-foreground"
        }`}
      />

      {/* Card */}
      <div
        className={`w-full max-w-[300px] ${
          isTop
            ? "lg:row-start-1 lg:self-end"
            : "lg:row-start-3 lg:self-start"
        }`}
      >
        <ProcessCard step={step} />
      </div>
    </li>
  );
}

function ProcessTimeline({ steps }) {
  if (!steps?.length) return null;

  return (
    <div className="relative mx-auto mt-14 max-w-7xl">
      {/* Mobile vertical line */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-[7px] top-8 w-[2px] bg-brand-primary lg:hidden"
      />

      {/* Desktop line from first dot to last dot */}
      <div
        aria-hidden="true"
        className="absolute left-[10%] right-[10%] top-[315px] hidden h-[2px] bg-gradient-to-r from-brand-primary via-brand-primary to-white lg:block"
      />

      <ol
        className="relative flex flex-col gap-6 lg:grid lg:gap-0"
        style={{
          gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
        }}
      >
        {steps.map((step, index) => (
          <ProcessStep
            key={step.id}
            step={step}
            index={index}
          />
        ))}
      </ol>
    </div>
  );
}

export function ServiceProcess({
  heading,
  description,
  cta,
  steps = [],
}) {
  if (!steps.length) return null;

  return (
    <section
      aria-labelledby="service-process-heading"
      className="w-full px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading and description */}
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <h2
            id="service-process-heading"
            className="max-w-[600px] font-sans text-[clamp(30px,4vw,64px)] font-normal uppercase leading-[1.1] tracking-tight text-brand-primary"
          >
            {heading}
          </h2>

          <div className="flex flex-col items-start gap-6 lg:items-end">
            {description && (
              <Paragraph className="max-w-[420px] text-left lg:text-right">
                {description}
              </Paragraph>
            )}

            {cta?.href && cta?.label && (
              <Button href={cta.href} >
                {cta.label}
              </Button>
            )}
          </div>
        </div>

        <ProcessTimeline steps={steps} />
      </div>
    </section>
  );
}
