import { GetStartedForm } from "../ui/GetStartedForm";
import { Hero } from "./Hero";

export function HeroWithForm() {
  return (
    <Hero
      background="/images/hero.webp"
      priority
      className="min-h-svh text-left"
      contentClassName="
        grid grid-cols-1
        items-center
        gap-12
        px-6 py-24
        md:px-10
        lg:grid-cols-[1.1fr_0.9fr]
        lg:gap-16
        lg:pt-32 lg:pb-16
      "
    >
      {/* LEFT CONTENT */}
      <div className="flex w-full flex-col items-start">
        <Hero.Title
          className="
            font-sans
            text-[clamp(36px,5vw,80px)]
            font-normal
            leading-[1.1]
            tracking-[-0.03em]
            text-white
          "
        >
          <span className="block">HAVE AN IDEA?</span>
          <span className="block">WE ARE ALL</span>
          <span className="block">EARS!</span>
        </Hero.Title>

        <Hero.Actions className="mt-8 justify-start gap-4">
          <Hero.Button
            href="/services"
            variant="primary"
          >
            Explore Our Services
          </Hero.Button>

          <Hero.Button
            href="/contact"
            variant="outline"
          >
            Build Your Now
          </Hero.Button>
        </Hero.Actions>
      </div>

      {/* RIGHT FORM */}
      <div className="flex w-full justify-center lg:justify-end">
        <GetStartedForm />
      </div>
    </Hero>
  );
}