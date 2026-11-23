
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";
import { GlassTextFilter } from "@/components/ui/GlassTextFilter";
import { OUR_JOURNEY } from "@/config/about/about";

const HEADING_ID = "our-journey-heading";
const FILTER_ID = "our-journey-glass-filter";

function JourneyContent({ title, description, cta }) {
  return (
    <div className="flex flex-col items-start">
      <h2
        id={HEADING_ID}
        className="font-display text-[36px] font-normal leading-[1.2] uppercase text-brand-primary md:text-[44px] lg:text-[80px]"
      >
        {title}
      </h2>

      <div className="mt-7 max-w-[600px] space-y-5">
        {description.map((text, index) => (
          <Paragraph key={index}>{text}</Paragraph>
        ))}
      </div>

      <Button
        href={cta.href}
        variant="outline"
        className="mt-10"
      >
        {cta.label}
      </Button>
    </div>
  );
}

function JourneyImage({ src, alt }) {
  return (
    <div className="relative aspect-[2.35/1] w-full overflow-hidden rounded-[4px]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-center"
      />
    </div>
  );
}


function JourneyStat({ value, label }) {
  return (
    <div className="min-w-0">
      <dt
        className="inline-block font-sans font-medium text-[clamp(44px,7vw,150px)] leading-[1.05] tracking-normal text-white/[0.12]"
        style={{ filter: `url(#${FILTER_ID})` }}
      >
        {value}
      </dt>

      <dd className="mt-2 font-sans text-[13px] text-foreground md:text-[16px]">
        {label}
      </dd>
    </div>
  );
}


function JourneyStats({ stats }) {
  return (
    <>
      <GlassTextFilter
        id={FILTER_ID}
        blur={2.2}
        depth={5}
        strength={1.1}
        opacity={1}
        bounce={0.35}
      />

      <dl
        aria-label="Our journey in numbers"
        className="grid grid-cols-2 gap-x-7 gap-y-8"
      >
        {stats.map(({ value, label }) => (
          <JourneyStat
            key={label}
            value={value}
            label={label}
          />
        ))}
      </dl>
    </>
  );
}

export default function OurJourney() {
  const { title, description, cta, image, stats } =
    OUR_JOURNEY;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className="w-full py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16 lg:px-0">
        <JourneyContent
          title={title}
          description={description}
          cta={cta}
        />

        <div className="flex flex-col gap-9">
          <JourneyImage
            src={image.src}
            alt={image.alt}
          />

          <JourneyStats stats={stats} />
        </div>
      </div>
    </section>
  );
}
