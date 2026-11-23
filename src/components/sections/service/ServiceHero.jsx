import { Hero as SharedHero } from "@/components/shared/Hero";
import { SERVICE_HERO } from "@/config/service/service";
import { SHARED_IMAGES } from "@/config/shared/shared";

export const ServiceHero = () => {
  return (
    <SharedHero
    background={SHARED_IMAGES.hero}
      className="min-h-[550px] sm:min-h-[650px] "
      contentClassName="md:pt-32"
    >
      <SharedHero.Title lines={SERVICE_HERO.titleLines} />
    </SharedHero>
  );
};
