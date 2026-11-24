
import { Hero as SharedHero } from "@/components/shared/Hero";
import { PORTFOLIO_HERO } from "@/config/portfolio/portfolio";
import { SHARED_IMAGES } from "@/config/shared/shared";

export function PortfolioHero() {
  const { titleLines, primaryCta } = PORTFOLIO_HERO;

  return (
    <SharedHero
      background={SHARED_IMAGES.hero}
      priority
      className="min-h-[550px] sm:min-h-[550px]"
      contentClassName="md:pt-32"
    >
      <SharedHero.Title
        lines={titleLines}
        className="text-[24px] sm:text-[55px] lg:text-[70px] lg:leading-[1.1]"
      />

      <SharedHero.Actions>
        <SharedHero.Button
          href={primaryCta.href}
          variant="outline"
          className="min-h-[66px] min-w-[240px] "
        >
          {primaryCta.label}
        </SharedHero.Button>

    
      </SharedHero.Actions>
    </SharedHero>
  );
}
