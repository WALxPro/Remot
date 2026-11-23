
import Image from "next/image";

export default function AboutUs() {
  return (
    <section
      aria-label="About Studio Remot"
      className="w-full  px-4 py-16 text-foreground md:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <p
          className="
            font-display text-[clamp(24px,3.5vw,54px)]
            leading-[1.55] font-normal tracking-[-0.035em]
            uppercase
          "
        >
          WE&apos;RE A REMOTE CREATIVE STUDIO{" "}
          <span className="inline-flex align-middle">
            <Image
              src="/images/bookmark.webp"
              alt=""
              width={95}
              height={95}
              className="mx-2 inline-block h-[1.5em] w-auto object-contain"
            />
          </span>{" "}
          BRINGING{" "}
          <span className="inline-flex align-middle">
            <Image
              src="/images/artist.webp"
              alt="Artist typography"
              width={190}
              height={75}
              className="mx-2 inline-block h-[1.15em] w-auto object-contain"
            />
          </span>{" "}
          DESIGNERS, ANIMATORS, DEVELOPERS AND STRATEGISTS TOGETHER{" "}
          <span className="inline-flex align-middle">
            <Image
              src="/images/chess.webp"
              alt=""
              width={240}
              height={100}
              className="mx-2 inline-block h-[1.35em] w-auto object-cover"
            />
          </span>{" "}
          TO MAKE GREAT THINGS HAPPEN.
        </p>
      </div>
    </section>
  );
}
