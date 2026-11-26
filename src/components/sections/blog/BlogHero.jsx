import { Hero as SharedHero } from "@/components/shared/Hero";
import { BLOG_HERO } from "@/config/blog/blog";
import { SHARED_IMAGES } from "@/config/shared/shared";

export function BlogHero() {
  const { titleLines, description } = BLOG_HERO;

  return (
    <SharedHero
      background={SHARED_IMAGES.hero}
      priority
      className="min-h-[450px] sm:min-h-[550px]"
      contentClassName="md:pt-32"
    >
      <SharedHero.Title
        lines={titleLines}
        className="text-[32px] sm:text-[55px] lg:text-[70px] lg:leading-[1.1]"
      />

      <SharedHero.Description className="max-w-2xl">
        {description}
      </SharedHero.Description>
    </SharedHero>
  );
}