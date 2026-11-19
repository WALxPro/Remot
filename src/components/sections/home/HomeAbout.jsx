import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { GradientOutlineText } from "@/components/ui/GradientOutlineText";
import { Paragraph } from "@/components/ui/Paragraph";
import { ABOUT } from "@/config/home/home";


const SIDES = {
  left: {
    wrapper: "left-0 bottom-[-20%]",
    background: "left-0 top-1/2 -translate-y-1/2",
    image: "left-0 top-1/2 -translate-y-1/2",
  },
  right: {
    wrapper: "right-0 top-[-15%]",
    background: "right-0 top-1/2 -translate-y-1/2",
    image: "right-0 top-1/2 -translate-y-1/2",
  },
};



function AboutImage({ side, src, background, alt }) {
  const styles = SIDES[side] || SIDES.left;

  return (
    <div
      className={`pointer-events-none absolute hidden h-[450px] w-[400px] lg:block xl:h-[600px] xl:w-[550px] ${styles.wrapper}`}
    >
      <Image
        src={background}
        alt=""
        aria-hidden="true"
        width={530}
        height={942}
        loading="lazy"
        sizes="(min-width: 1280px) 530px, 400px"
        className={`absolute h-full w-auto max-w-none object-contain ${
          side === "left"
            ? "scale-[0.6] origin-left"
            : "scale-[0.65] origin-right"
        } ${styles.background}`}
      />

      <div className={`absolute z-10 ${styles.image}`}>
        <Image
          src={src}
          alt={alt}
          width={200}
          height={200}
          loading="lazy"
          sizes="(min-width: 1024px) 200px, 150px"
          className="h-[150px] w-[150px] object-cover lg:h-[200px] lg:w-[200px]"
        />
      </div>
    </div>
  );
}

export function HomeAbout() {
  return (
    <div className="relative lg:h-[80vh]">
      <section className="relative isolate flex h-full flex-col justify-center overflow-hidden bg-transparent px-6">
        {ABOUT.images.map((image) => (
          <AboutImage key={image.side} {...image} />
        ))}

        <div className="relative z-20 mx-auto max-w-3xl text-center">
          <h2 className="font-sans text-[30px] font-medium uppercase tracking-wide">
            <GradientOutlineText strokeColor="#F730BF">
              {ABOUT.eyebrow}
            </GradientOutlineText>
          </h2>

          <Paragraph className="mt-8 text-[22px] leading-[30px] sm:text-[25px] sm:leading-[34px] lg:text-[28px]">
            <span className="font-semibold text-brand-primary">
              {ABOUT.highlight}
            </span>{" "}
            <GradientOutlineText strokeColor="#F730BF">
              {ABOUT.text}
            </GradientOutlineText>
          </Paragraph>

          <Button href={ABOUT.cta.href} variant="outline" className="mt-12">
            {ABOUT.cta.label}
          </Button>
        </div>

        <div className="mx-auto mt-10 grid max-w-sm grid-cols-2 gap-4 lg:hidden">
          {ABOUT.images.map(({ src, alt }) => (
            <Image
              key={src}
              src={src}
              alt={alt}
              width={530}
              height={530}
              className="h-auto w-full object-cover"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
