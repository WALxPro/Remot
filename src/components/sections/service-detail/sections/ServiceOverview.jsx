import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";

function OverviewImage({ image, className = "", sizes }) {
  if (!image?.src) return null;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[5px] ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt ?? ""}
        fill
        quality={75}
        decoding="async"
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

function OverviewHeading({ title, image }) {
  return (
    <div className="flex min-w-0 flex-col gap-6 md:gap-8">
      <h2 className="font-sans text-[clamp(28px,3vw,48px)] font-normal uppercase leading-[1.12] tracking-tight text-foreground lg:text-[60px]">
        {title}
      </h2>

      <OverviewImage
        image={image}
        className="aspect-[1.14/1] max-w-[500px]"
        sizes="(max-width: 767px) 100vw, 500px"
      />
    </div>
  );
}

function OverviewContent({ image, description, cta }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-6 md:gap-8">
      <OverviewImage
        image={image}
        className="aspect-[1.75/1]"
        sizes="(max-width: 767px) 100vw, 600px"
      />

      <div className="flex w-full flex-col items-center gap-6 md:items-end">
        {description && (
          <Paragraph className="text-right leading-relaxed">
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
  );
}

export function ServiceOverview({
  title,
  description,
  images,
  cta,
}) {
  if (!title) return null;

  return (
    <section className="w-full bg-transparent px-5 py-12 md:px-8 md:py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-12 lg:gap-0">
        <OverviewHeading title={title} image={images?.primary} />

        <OverviewContent
          image={images?.secondary}
          description={description}
          cta={cta}
        />
      </div>
    </section>
  );
}