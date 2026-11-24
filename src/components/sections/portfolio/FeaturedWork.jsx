
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";
import { FEATURED_WORK } from "@/config/portfolio/portfolio";

const HEADING_ID = "featured-work-heading";

const IMAGE_POSITIONS = [
  "left-[2%] top-[14%] z-10 -rotate-[8deg]",
  "left-[19%] top-[5%] z-20 -rotate-[4deg]",
  "left-[36%] top-0 z-30",
  "left-[53%] top-[5%] z-20 rotate-[4deg]",
  "left-[70%] top-[14%] z-10 rotate-[8deg]",
];

function FeaturedArtwork({ image, position }) {
  return (
    <div
      className={`absolute aspect-square w-[34%] ${position}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 260px, 140px"
        className="object-contain"
      />
    </div>
  );
}

function FeaturedGallery({ images }) {
  return (
    <div className="relative mx-auto mt-8 aspect-[2.4/1] w-full max-w-[1100px] sm:mt-10">
      {images.slice(0, IMAGE_POSITIONS.length).map((image, index) => (
        <FeaturedArtwork
          key={image.id}
          image={image}
          position={IMAGE_POSITIONS[index]}
        />
      ))}
    </div>
  );
}

function FeaturedContent({ title, description }) {
  return (
    <header className="relative z-40 mx-auto max-w-4xl">
      <h2
        id={HEADING_ID}
        className="font-sans text-[36px] font-normal uppercase leading-[1.1] text-foreground sm:text-[55px] lg:text-[96px]"
      >
        {title}
      </h2>

      <Paragraph className="mx-auto mt-4 max-w-xl text-center ">
        {description}
      </Paragraph>
    </header>
  );
}

export function FeaturedWork() {
  const { title, description, cta, images } = FEATURED_WORK;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className="relative  w-full h-[80vh] sm:min-h-[140vh] overflow-hidden flex items-center justify-center px-4  text-center sm:px-6 "
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <FeaturedContent
          title={title}
          description={description}
        />

        <FeaturedGallery images={images} />

        <div className="relative z-40 mt-6 sm:mt-8">
          <Button
            href={cta.href}
            variant="outline"
            className="min-h-[50px] min-w-[190px] text-sm sm:min-h-[66px] sm:min-w-[240px] sm:text-base"
          >
            {cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
