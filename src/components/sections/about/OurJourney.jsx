
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";
import { OUR_JOURNEY } from "@/config/about/about";

export default function OurJourney() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16 lg:px-0">

        {/* LEFT SIDE */}
        <div className="flex flex-col items-start">
          <h2 className="font-display text-[36px] font-normal leading-[1.2] uppercase text-brand-primary md:text-[44px] lg:text-[80px]">
            {OUR_JOURNEY.title}
          </h2>

          <div className="mt-7 max-w-[600px] space-y-5">
            {OUR_JOURNEY.description.map((text, index) => (
              <Paragraph key={index}>
                {text}
              </Paragraph>
            ))}
          </div>

          <Button href={OUR_JOURNEY.cta.href} variant="outline">
            {OUR_JOURNEY.cta.label}
          </Button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-9">

          {/* TEAM IMAGE */}
          <div className="relative aspect-[2.35/1] w-full overflow-hidden rounded-[4px]">
            <Image
              src={OUR_JOURNEY.image.src}
              alt={OUR_JOURNEY.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* STATISTICS */}
          <div className="grid grid-cols-2 gap-x-7 gap-y-8">
            {OUR_JOURNEY.stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <div
                  className="
                    inline-block
                    font-display
                    text-[clamp(44px,5vw,85px)]
                    font-normal
                    leading-[1.05]
                    tracking-[-0.04em]
                    bg-gradient-to-b
                    from-white/40
                    via-white/15
                    to-white/5
                    bg-clip-text
                    text-transparent
                    [-webkit-text-stroke:1px_rgba(255,255,255,0.18)]
                  "
                >
                  {stat.value}
                </div>

                <p className="mt-2 font-sans text-[13px] text-white md:text-[16px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
