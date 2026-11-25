import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";

export function ServiceCTA({
  title,
  description,
  background,
  cta,
}) {
  if (!title) return null;

  return (
    <section
      aria-label={title}
      className="w-full px-5 py-12 [content-visibility:auto] [contain-intrinsic-size:auto_420px] sm:px-8 lg:px-12 lg:py-20 lg:[contain-intrinsic-size:auto_480px]"
    >
      <div className="relative isolate mx-auto w-full max-w-7xl overflow-hidden rounded-[24px] bg-background">
        {background && (
          <Image
            src={background}
            alt=""
            fill
            quality={65}
            decoding="async"
            sizes="(max-width: 767px) 100vw, 1280px"
            className="-z-10 object-cover"
          />
        )}

        <div className="grid min-h-[280px] grid-cols-1 items-center gap-8 px-6 py-10 sm:px-10 md:grid-cols-[1.4fr_1fr] md:gap-12 lg:min-h-[320px] lg:px-12">
          <h2 className="max-w-[650px] font-sans text-[clamp(28px,3.5vw,48px)] font-normal uppercase leading-[1.15] tracking-tight text-foreground">
            {title}
          </h2>

          <div className="flex flex-col items-start gap-7 md:items-end">
            {description && (
              <Paragraph className="max-w-[360px] text-left md:text-right">
                {description}
              </Paragraph>
            )}

            {cta?.href && cta?.label && (
              <Button href={cta.href} variant="outline">
                {cta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}