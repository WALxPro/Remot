
import Image from "next/image";

const content = {
  mission: {
    number: "01",
    title: "OUR MISSION",
    description:
      "To make professional creative services more accessible and easier to manage by bringing talented remote specialists together under one studio.",
  },
  approach: {
    number: "02",
    title: "OUR APPROACH",
    description:
      "Our approach is straightforward: listen carefully, communicate clearly, and create work that feels right for the people it is made for.",
  },
  vision: {
    number: "03",
    title: "OUR VISION",
    description:
      "To build a trusted creative team that helps ideas travel beyond borders — giving clients the support of multiple disciplines without the complexity of building an in-house team.",
  },
};

function ContentBlock({ number, title, description }) {
  return (
    <div className="flex h-full min-w-0 flex-col items-start justify-center px-2 py-5 md:px-4 lg:px-5">
      <span
        className="
          font-display
          text-[40px]
          leading-none
          font-normal
          text-transparent
          [-webkit-text-stroke:1px_rgba(220,190,240,0.45)]
          md:text-[46px]
          lg:text-[52px]
        "
      >
        {number}
      </span>

      <h3 className="mt-5 font-display text-[25px] font-normal leading-[1.15] text-foreground md:text-[29px] lg:text-[34px]">
        {title}
      </h3>

      <p className="mt-5 max-w-[340px] font-sans text-[14px] leading-[1.4] text-foreground/90 md:text-[15px] lg:text-[16px]">
        {description}
      </p>
    </div>
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

export default function MissionVision() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-0">

        {/* DESKTOP: 3 COLUMNS / 2 ROWS */}
        <div className="hidden grid-cols-3 gap-0 md:grid">

          {/* ROW 1 */}
          <ImageBlock
            src="/images/approch-1.webp"
            alt="Be heard and be seen creative artwork"
          />

          <ContentBlock {...content.approach} />

          <ImageBlock
            src="/images/approch-2.webp"
            alt="Studio Remot creative logo artwork"
          />

          {/* ROW 2 */}
          <ContentBlock {...content.mission} />

          <ImageBlock
            src="/images/approch-3.webp"
            alt="Create typography artwork"
          />

          <ContentBlock {...content.vision} />

        </div>

        {/* MOBILE: VERTICAL LAYOUT */}
        <div className="grid grid-cols-1 gap-6 md:hidden">

          <ImageBlock
            src="/images/approch-1.webp"
            alt="Be heard and be seen creative artwork"
          />

          <ContentBlock {...content.approach} />

          <ImageBlock
            src="/images/approch-2.webp"
            alt="Studio Remot creative logo artwork"
          />

          <ContentBlock {...content.mission} />

          <ImageBlock
            src="/images/approch-3.webp"
            alt="Create typography artwork"
          />

          <ContentBlock {...content.vision} />

        </div>
      </div>
    </section>
  );
}
