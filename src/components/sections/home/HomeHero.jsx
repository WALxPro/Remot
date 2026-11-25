import { Hero as SharedHero } from "@/components/shared/Hero";
import { ContactPopupButton } from "@/components/ui/ContactPopupButton";
import { HERO } from "@/config/home/home";
import { SHARED_IMAGES } from "@/config/shared/shared";

export function HomeHero() {
  return (
    <SharedHero
      background={SHARED_IMAGES.hero}
      className="relative sm:h-[1000px]"
    >
      <SharedHero.Title
        className="text-[24px] leading-tight md:text-[98px] md:leading-[97px]"
        lines={HERO.titleLines}
      />

      <SharedHero.Description>
        {HERO.description}
      </SharedHero.Description>

      <SharedHero.Actions>
        {/* PRIMARY BUTTON */}
        <SharedHero.Button
          href={HERO.primaryCta.href}
          className="min-h-[66px] min-w-[240px]"
        >
          {HERO.primaryCta.label}
        </SharedHero.Button>

        {/* SECONDARY BUTTON — OPEN POPUP */}
        <ContactPopupButton
          variant="outline"
          className="min-h-[66px] min-w-[240px]"
        >
          {HERO.secondaryCta.label}
        </ContactPopupButton>
      </SharedHero.Actions>
    </SharedHero>
  );
}