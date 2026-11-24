
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";


function LaunchArtwork({ image }) {
  if (!image?.src) return null;

  return (
    <div className="relative z-10 mx-auto mt-8 w-[75%] max-w-[320px] sm:w-[65%] sm:max-w-[400px] lg:absolute lg:right-[2%] lg:bottom-0 lg:mt-0 lg:w-[38%] lg:max-w-[520px]">
      <Image
        src={image.src}
        alt={image.alt ?? ""}
        width={1086}
        height={1947}
        sizes="(max-width: 639px) 75vw, (max-width: 1023px) 400px, 520px"
        className="h-auto w-full object-contain"
      />
    </div>
  );
}


export function ServiceLaunch({
  title,
  description = [],
  background,
  image,
  cta,
}) {
  if (!title) return null;

  const paragraphs = Array.isArray(description)
    ? description
    : [description];

  return (
    <section className="w-full px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="relative mx-auto w-full max-w-7xl py-8 lg:py-16">
        <div className="relative isolate rounded-[24px] bg-background">
          {background && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]">
              <Image
                src={background}
                alt=""
                fill
                sizes="(max-width: 1023px) 100vw, 1280px"
                className="object-cover"
              />
            </div>
          )}

          <div className="relative z-20 px-6 py-10 sm:px-10 lg:min-h-[450px] lg:w-[68%] lg:px-14 lg:py-14">
            <h2 className="max-w-[650px] font-sans text-[clamp(28px,3.5vw,48px)] font-normal uppercase leading-[1.12] tracking-tight text-foreground">
              {title}
            </h2>

            <div className="mt-5 max-w-[650px] space-y-4">
              {paragraphs.filter(Boolean).map((text, index) => (
                <Paragraph key={index}>
                  {text}
                </Paragraph>
              ))}
            </div>

            {cta?.href && cta?.label && (
              <div className="mt-7">
                <Button
                  href={cta.href}
                  variant="outline"
                >
                  {cta.label}
                </Button>
              </div>
            )}
          </div>

          <LaunchArtwork image={image} />
        </div>
      </div>
    </section>
  );
}
