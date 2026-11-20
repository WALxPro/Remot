import { Hero as SharedHero } from "@/components/shared/Hero";
import { ABOUT_HERO } from "@/config/about/about";

import { SHARED_IMAGES } from "@/config/shared/shared";

export default function AboutHero() {
  return (
    <SharedHero
      background={SHARED_IMAGES.hero}
      className="min-h-[550px] sm:min-h-[650px] "
      contentClassName="md:pt-32"
    >
      <SharedHero.Title lines={ABOUT_HERO.titleLines} />
      <SharedHero.Actions>
        <SharedHero.Button
          href={ABOUT_HERO.primaryCta.href}
          className="min-h-[66px] min-w-[240px]"
        >
          {ABOUT_HERO.primaryCta.label}
        </SharedHero.Button>

        <SharedHero.Button
          href={ABOUT_HERO.secondaryCta.href}
          variant="outline"
          className="min-h-[66px] min-w-[240px]"
        >
          {ABOUT_HERO.secondaryCta.label}
        </SharedHero.Button>
      </SharedHero.Actions>
    </SharedHero>
  );
}
