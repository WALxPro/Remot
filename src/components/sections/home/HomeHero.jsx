import { Hero as SharedHero } from "@/components/shared/Hero";
import { HERO, IMAGES } from "@/config/home/home";

export function HomeHero() {
  return (
    <SharedHero background={IMAGES.hero} className="relative sm:h-[1000px]">
      <SharedHero.Title lines={HERO.titleLines} />

      <SharedHero.Description>{HERO.description}</SharedHero.Description>

      <SharedHero.Actions>
        <SharedHero.Button
          href={HERO.primaryCta.href}
          className="min-h-[66px] min-w-[240px]"
        >
          {HERO.primaryCta.label}
        </SharedHero.Button>

        <SharedHero.Button
          href={HERO.secondaryCta.href}
          variant="outline"
          className="min-h-[66px] min-w-[240px]"
        >
          {HERO.secondaryCta.label}
        </SharedHero.Button>
      </SharedHero.Actions>
    </SharedHero>
  );
}
