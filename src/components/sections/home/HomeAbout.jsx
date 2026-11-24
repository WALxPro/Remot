
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { GradientOutlineText } from "@/components/ui/GradientOutlineText";
import { Paragraph } from "@/components/ui/Paragraph";
import { ABOUT } from "@/config/home/home";
import { IMAGE_POSITIONS } from "@/config/home/home.constant";

const HEADING_ID = "home-about-heading";
const STROKE_COLOR = "#F730BF";



function AboutImage({ side, src, background }) {
  const position = IMAGE_POSITIONS[side] ?? IMAGE_POSITIONS.left;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute hidden h-[450px] w-[400px] lg:block xl:h-[600px] xl:w-[550px] ${position.wrapper}`}
    >
      <Image
        src={background}
        alt=""
        width={530}
        height={942}
        sizes="(min-width: 1280px) 530px, 400px"
        className={`absolute h-full w-auto max-w-none object-contain ${position.background}`}
      />

      <div className={`absolute z-10 ${position.image}`}>
        <Image
          src={src}
          alt=""
          width={200}
          height={200}
          sizes="(min-width: 1024px) 200px, 150px"
          className="h-[150px] w-[150px] object-cover lg:h-[200px] lg:w-[200px]"
        />
      </div>
    </div>
  );
}

function AboutContent({ eyebrow, highlight, text, cta }) {
  return (
    <div className="relative z-20 mx-auto max-w-3xl text-center">
      <h2
        id={HEADING_ID}
        className="font-sans text-[30px] font-medium uppercase tracking-wide"
      >
        <GradientOutlineText strokeColor={STROKE_COLOR}>
          {eyebrow}
        </GradientOutlineText>
      </h2>

      <Paragraph className="mt-8 text-[22px] leading-[30px] sm:text-[25px] sm:leading-[34px] lg:text-[28px]">
        <span className="font-semibold text-brand-primary">
          {highlight}
        </span>{" "}
        <GradientOutlineText strokeColor={STROKE_COLOR}>
          {text}
        </GradientOutlineText>
      </Paragraph>

      <Button
        href={cta.href}
        variant="outline"
        className="mt-12"
      >
        {cta.label}
      </Button>
    </div>
  );
}

function MobileAboutImages({ images }) {
  return (
    <div className="mx-auto mt-10 grid max-w-sm grid-cols-2 gap-4 lg:hidden">
      {images.map(({ src, alt }) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          width={530}
          height={530}
          sizes="(max-width: 640px) 45vw, 190px"
          className="h-auto w-full object-cover"
        />
      ))}
    </div>
  );
}

export function HomeAbout() {
  const { eyebrow, highlight, text, cta, images } = ABOUT;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className="relative isolate flex min-h-[80vh] w-full flex-col justify-center overflow-hidden bg-transparent px-6 py-12 lg:h-[80vh] lg:py-0"
    >
      {images.map(({ side, src, background }) => (
        <AboutImage
          key={side}
          side={side}
          src={src}
          background={background}
        />
      ))}

      <AboutContent
        eyebrow={eyebrow}
        highlight={highlight}
        text={text}
        cta={cta}
      />

      <MobileAboutImages images={images} />
    </section>
  );
}
