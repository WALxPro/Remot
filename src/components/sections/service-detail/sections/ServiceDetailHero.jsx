
import { Hero as SharedHero } from "@/components/shared/Hero";
import { SHARED_IMAGES } from "@/config/shared/shared";

export function ServiceDetailHero({ hero }) {
  const {
    titleLines,
    description,
    primaryCta,
    secondaryCta,
  } = hero;

  return (
    <SharedHero
      background={SHARED_IMAGES.hero}
      className="relative sm:h-[1000px]"

    >
      <SharedHero.Title className="text-[24px] leading-tight md:text-[98px] md:leading-[97px]" lines={titleLines} />

      <SharedHero.Description>
        {description}
      </SharedHero.Description>

      <SharedHero.Actions>
        <SharedHero.Button href={primaryCta.href}>
          {primaryCta.label}
        </SharedHero.Button>

        <SharedHero.Button
          href={secondaryCta.href}
          variant="outline"
        >
          {secondaryCta.label}
        </SharedHero.Button>
      </SharedHero.Actions>
    </SharedHero>
  );
}
