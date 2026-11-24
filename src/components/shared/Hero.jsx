
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";

function HeroRoot({
  children,
  background,
  priority = false,
  className = "",
  contentClassName = "",
}) {
  return (
    <section
      className={twMerge(
        "relative isolate grid min-h-svh w-full place-items-center overflow-hidden text-center",
        className
      )}
    >
      {background && (
        <Image
          src={background}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
      )}

      <div
        className={twMerge(
          "relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-16 md:pt-32",
          contentClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

function HeroTitle({
  lines,
  children,
  className = "",
}) {
  return (
    <h1
      className={twMerge(
        "text-4xl uppercase leading-tight md:text-[98px] md:leading-[97px]",
        className
      )}
    >
      {lines
        ? lines.map(({ light, bold }, index) => (
            <span key={index} className="block">
              <span className="font-light">
                {light}{" "}
              </span>
              <span className="font-semibold">
                {bold}
              </span>
            </span>
          ))
        : children}
    </h1>
  );
}

function HeroDescription({
  children,
  className = "",
}) {
  return (
    <Paragraph
      className={twMerge(
        "mx-auto mt-6 max-w-4xl text-center text-base sm:text-[25px]",
        className
      )}
    >
      {children}
    </Paragraph>
  );
}

function HeroActions({
  children,
  className = "",
}) {
  return (
    <div
      className={twMerge(
        "mt-10 flex flex-wrap justify-center gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export const Hero = Object.assign(HeroRoot, {
  Title: HeroTitle,
  Description: HeroDescription,
  Actions: HeroActions,
  Button,
});
