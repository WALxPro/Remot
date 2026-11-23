
import Image from "next/image";

import { GlassTextFilter } from "@/components/ui/GlassTextFilter";
import { Paragraph } from "@/components/ui/Paragraph";
import { MISSION_VISION_BLOCKS } from "@/config/about/about";

const GLASS_FILTER_ID = "mission-vision-glass";

function ContentBlock({ number, title, description }) {
  return (
    <article className="flex h-full min-w-0 flex-col items-start justify-center px-2 py-5 md:px-4 lg:px-5">
      <span
        aria-hidden="true"
        className="inline-block font-display text-[40px] font-semibold leading-none text-white/[0.16] [filter:url(#mission-vision-glass)] md:text-[46px] lg:text-[85px]"
      >
        {number}
      </span>

      <h3 className="mt-5 font-display text-[25px] font-normal leading-[1.15] text-foreground md:text-[29px] lg:text-[54px]">
        {title}
      </h3>

      <Paragraph className="mt-5">
        {description}
      </Paragraph>
    </article>
  );
}

function ImageBlock({ src, alt }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[3px]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}

function MissionVisionBlock({ block }) {
  if (block.type === "image") {
    return <ImageBlock {...block.data} />;
  }

  return <ContentBlock {...block.data} />;
}

export default function MissionVision() {
  return (
    <section
      aria-label="Our mission, approach, and vision"
      className="w-full py-12 md:py-16 lg:py-20"
    >
      <GlassTextFilter
        id={GLASS_FILTER_ID}
        blur={1.4}
        depth={3.5}
        strength={1.1}
        opacity={1}
        bounce={0.35}
      />

      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-0">
          {MISSION_VISION_BLOCKS.map((block) => (
            <MissionVisionBlock
              key={block.id}
              block={block}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
