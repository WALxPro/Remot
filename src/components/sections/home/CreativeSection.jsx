
import { CREATIVE_IMAGES } from "@/config/home/home.constant";
import Image from "next/image";


const HEADING_ID = "creative-section-heading";


function CreativeHeading({ firstLine, secondLine, align = "left" }) {
  const isRight = align === "right";

  return (
    <div
      className={
        isRight
          ? "relative z-10 text-center lg:-ml-[2vw] lg:text-right"
          : "relative z-10 text-center lg:-translate-y-[30vh] lg:text-left"
      }
    >
      <div
        className={
          isRight
            ? "font-sans text-[36px] font-light uppercase leading-[0.95] tracking-tight text-foreground sm:text-[46px] lg:text-[6.5vw]"
            : "font-sans text-[36px] font-light uppercase leading-[0.95] tracking-tight text-foreground sm:text-[46px] lg:text-[8vw]"
        }
      >
        <span
          className={`block whitespace-nowrap ${
            isRight ? "lg:text-[6vw]" : "lg:text-[6.5vw]"
          }`}
        >
          {firstLine}
        </span>

        <span
          className={`block whitespace-nowrap ${
            isRight ? "font-bold" : "font-semibold"
          }`}
        >
          {secondLine}
        </span>
      </div>
    </div>
  );
}

function CreativeArtwork({ images }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-20 mx-auto h-[220px] w-[220px] sm:h-[260px] sm:w-[260px] lg:h-[380px] lg:w-[380px] lg:-translate-y-[10vh]"
    >
      {images.map(({ src, zIndex, scale, x, y }) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{
            zIndex,
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 260px, 220px"
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export function CreativeSection() {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="relative h-[500px] lg:h-[120vh]"
    >
      <h2 id={HEADING_ID} className="sr-only">
        Not Just Creative, Creatively Different
      </h2>

      <div className="relative flex h-full w-full items-center overflow-hidden bg-transparent px-2 sm:px-3 lg:px-[1.5vw]">
        <div className="mx-auto grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_380px_minmax(0,1fr)] lg:gap-0">
          <CreativeHeading
            firstLine="NOT JUST"
            secondLine="CREATIVE"
          />

          <CreativeArtwork images={CREATIVE_IMAGES} />

          <CreativeHeading
            firstLine="CREATIVELY"
            secondLine="DIFFERENT!"
            align="right"
          />
        </div>
      </div>
    </section>
  );
}
