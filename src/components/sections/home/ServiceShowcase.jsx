
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";
import { SERVICE_SHOWCASE } from "@/config/home/home";

function ServiceShowcaseCard({ label, image }) {
  return (
    <article className="relative h-[160px] w-[220px] shrink-0 overflow-hidden rounded-2xl border border-white/40 sm:h-[220px] sm:w-[300px] lg:h-[240px] lg:w-[335px] lg:rounded-3xl">
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 639px) 220px, (max-width: 1023px) 300px, 335px"
        className="object-cover"
      />

      <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 backdrop-blur-[3px]">
        <h3 className="px-3 text-center font-sans text-xl font-normal uppercase text-foreground sm:text-[26px] lg:text-[30px]">
          {label}
        </h3>
      </div>
    </article>
  );
}

export function ServiceShowcase() {
  const { eyebrow, title, description, cta, cards } =
    SERVICE_SHOWCASE;

  return (
<section className="overflow-hidden bg-transparent py-5 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-12">

        <div className="flex flex-col items-center px-5 text-center sm:px-8 lg:items-start lg:pl-16 lg:pr-0 lg:text-left">
          <h2 className="text-[42px] font-medium uppercase leading-[1] text-brand-primary sm:text-[65px] lg:text-[100px]">
            {title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <Button href={cta.href} className="mt-6">
            {cta.label}
          </Button>
        </div>

        <div className="min-w-0">

          {/* Eyebrow */}
          <p className="px-5 text-center font-sans text-lg font-medium uppercase sm:px-8 sm:text-2xl lg:pr-16 lg:text-right lg:text-[30px]">
            {eyebrow}
          </p>

          <div
            className="mt-6 w-full overflow-hidden"
            role="region"
            aria-label="Our creative services"
          >
            <div className="service-slider flex w-max gap-3">
              {cards.map((card) => (
                <ServiceShowcaseCard
                  key={card.id}
                  {...card}
                />
              ))}

              <div className="contents" aria-hidden="true">
                {cards.map((card) => (
                  <ServiceShowcaseCard
                    key={`duplicate-${card.id}`}
                    {...card}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-8 lg:pl-0 lg:pr-16">
            <Paragraph className="mx-auto mt-8 max-w-lg text-center lg:ml-auto lg:mr-0 lg:text-right">
              {description}
            </Paragraph>
          </div>
        </div>
      </div>
    </section>
  );
}
