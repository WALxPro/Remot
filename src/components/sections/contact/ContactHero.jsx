import { Hero as SharedHero } from "@/components/shared/Hero";
import { CONTACT_HERO } from "@/config/contact/contact";

import { SHARED_IMAGES } from "@/config/shared/shared";

export default function ContactHero() {
  return (
    <SharedHero
      background={SHARED_IMAGES.hero}
      className="min-h-[550px] sm:min-h-[650px] "
      contentClassName="md:pt-32"
    >
      <SharedHero.Title lines={CONTACT_HERO.titleLines} />
      <SharedHero.Actions>
        <SharedHero.Button
          href={CONTACT_HERO.cta.href}
          variant="outline"
          className="min-h-[60px] min-w-[220px]"
        >
          {CONTACT_HERO.cta.label}
        </SharedHero.Button>
      </SharedHero.Actions>
    </SharedHero>
  );
}
