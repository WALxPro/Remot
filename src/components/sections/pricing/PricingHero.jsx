import { Hero as SharedHero } from "@/components/shared/Hero";

import { SHARED_IMAGES } from "@/config/shared/shared";
import { PRICING_HERO } from "@/config/pricing/pricing";
export const PricingHero = () => {
  return (
    <SharedHero
      background={SHARED_IMAGES.hero}
      className="min-h-[300px] sm:min-h-[650px] "
      contentClassName=" md:pt-32"
    >
      <SharedHero.Title className="text-[24px] md:text-[98px]" lines={PRICING_HERO.titleLines} />
    </SharedHero>
  );
};


