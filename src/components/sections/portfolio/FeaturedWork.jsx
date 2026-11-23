
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";
import { FEATURED_WORK } from "@/config/portfolio/portfolio";

const IMAGE_POSITIONS = [
  "left-[3%] top-[14%] z-10",
  "left-[20%] top-[5%] z-20",
  "left-[37%] top-0 z-30",
  "left-[54%] top-[5%] z-20",
  "left-[71%] top-[14%] z-10",
];

function FeaturedArtwork({ image, index }) {
  return (
    <div
      className={`absolute aspect-square w-[34%] ${IMAGE_POSITIONS[index]}`}
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

export function FeaturedWork() {
  const { title, description, cta, images } = FEATURED_WORK;

  return (
    <div className="relative py-[32]">
      <section className="flex h-full w-full flex-col items-center justify-center overflow-hidden bg-transparent px-4 py-16 text-center sm:px-6 lg:py-0">

        {/* Heading */}
        <div className="relative z-40 mx-auto max-w-4xl">
          <h2 className="font-sans text-[36px] font-normal uppercase leading-[1.1] text-foreground sm:text-[55px] lg:text-[70px]">
            {title}
          </h2>

          <Paragraph className="mx-auto mt-4 max-w-xl text-center text-sm sm:text-lg lg:text-xl">
            {description}
          </Paragraph>
        </div>

        {/* Artwork Stack */}
        <div className="relative mx-auto mt-8 aspect-[2.4/1] w-full max-w-[1100px] sm:mt-10">
          {images.map((image, index) => (
            <FeaturedArtwork
              key={image.id}
              image={image}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="relative z-40 mt-6 sm:mt-8">
          <Button
            href={cta.href}
            variant="outline"
            className="min-h-[50px] min-w-[190px] text-sm sm:min-h-[66px] sm:min-w-[240px] sm:text-base"
          >
            {cta.label}
          </Button>
        </div>

      </section>
    </div>
  );
}
