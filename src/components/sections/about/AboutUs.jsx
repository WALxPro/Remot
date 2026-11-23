
import Image from "next/image";
import { ABOUT_US } from "@/config/about/about";

function AboutImage({ src, alt, width, height, className = "" }) {
  return (
    <span className="mx-2 inline-flex align-middle">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`inline-block w-auto object-contain ${className}`}
      />
    </span>
  );
}

function AboutSegment({ segment }) {
  if (segment.type === "image") {
    return <AboutImage {...segment} />;
  }

  return segment.content;
}

function AboutContent({ segments }) {
  return (
    <p className="font-display text-[clamp(24px,3.5vw,54px)] font-normal leading-[1.55] tracking-[-0.035em] uppercase">
      {segments.map((segment, index) => (
        <span key={segment.id}>
          <AboutSegment segment={segment} />
          {index < segments.length - 1 && " "}
        </span>
      ))}
    </p>
  );
}

export default function AboutUs() {
  return (
    <section
      aria-label="About Studio Remot"
      className="w-full px-4 py-16 text-foreground md:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <AboutContent segments={ABOUT_US.segments} />
      </div>
    </section>
  );
}
