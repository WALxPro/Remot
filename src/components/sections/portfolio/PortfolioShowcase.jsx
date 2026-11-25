import Image from "next/image";

import { PORTFOLIO_SHOWCASE } from "@/config/portfolio/portfolio";

import styles from "./PortfolioShowcase.module.css";

function PortfolioCard({ image, index, total }) {
  const angle = (360 / total) * index;

  return (
    <div
      className={styles.cardPosition}
      style={{
        "--angle": `${angle}deg`,
      }}
    >
      <div className={styles.card}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 120px, (max-width: 1024px) 180px, 240px"
          className="rounded-[10px] object-cover"
        />
      </div>
    </div>
  );
}

export function PortfolioShowcase() {
  const { heading, background, images } = PORTFOLIO_SHOWCASE;

  const orbitImages = Array.from(
    { length: images.length ? 14 : 0 },
    (_, index) => ({
      ...images[index % images.length],
      orbitId: index,
    }),
  );
  return (
    <section
      className={`
        relative isolate w-full
        overflow-hidden bg-white
        ${styles.section}
      `}
    >
      {/* BACKGROUND VECTOR */}
      <div
        className="
          pointer-events-none
          absolute inset-x-0 top-[4%]
          -z-10 h-[40%] w-full
        "
      >
        <Image
          src={background}
          alt=""
          fill
          sizes="100vw"
          className="object-contain"
        />
      </div>

      {/* ROTATING PORTFOLIO RING */}
      <div className={styles.orbitContainer}>
        <div className={styles.orbit}>
          {orbitImages.map((image, index) => (
            <PortfolioCard
              key={image.orbitId}
              image={image}
              index={index}
              total={orbitImages.length}
            />
          ))}
        </div>
      </div>

      {/* FIXED CENTER HEADING */}
      <div
        className={`
          pointer-events-none
          absolute inset-x-0 z-20
          flex flex-col items-center
          px-5 text-center
          ${styles.heading}
        `}
      >
        <h2
          className="
            font-sans
            text-[clamp(24px,4.2vw,64px)]
            font-bold
            uppercase
            leading-[1.05]
            tracking-[-0.05em]
            text-black
          "
        >
          {heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
