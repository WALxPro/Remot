
import { Hero as SharedHero } from "@/components/shared/Hero";
import { PORTFOLIO_HERO } from "@/config/portfolio/portfolio";
import { SHARED_IMAGES } from "@/config/shared/shared";

export function PortfolioHero() {
  const { titleLines, primaryCta, secondaryCta } = PORTFOLIO_HERO;

  return (
    <SharedHero
      background={SHARED_IMAGES.hero}
      priority
      className="min-h-[550px] sm:min-h-[650px]"
      contentClassName="md:pt-32"
    >
      <SharedHero.Title
        lines={titleLines}
        className="text-[40px] sm:text-[55px] lg:text-[70px] lg:leading-[1.1]"
      />

      <SharedHero.Actions>
        <SharedHero.Button
          href={primaryCta.href}
          variant="outline"
          className="min-h-[66px] min-w-[240px] mt-0 sm:mt-14"
        >
          {primaryCta.label}
        </SharedHero.Button>

    
      </SharedHero.Actions>
    </SharedHero>
  );
}
