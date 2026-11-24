
import Image from "next/image";

const SLOTS = {
  0: { x: 0, scale: 1, opacity: 1, blur: 0, z: 30 },
  1: { x: 75, scale: 0.88, opacity: 1, blur: 5, z: 20 },
  2: { x: 115, scale: 0.76, opacity: 1, blur: 8, z: 10 },
};

const HIDDEN = {
  x: 115,
  scale: 0.6,
  opacity: 0,
  blur: 8,
  z: 0,
};

export function PortfolioCard({ item, offset, onSelect }) {
  const distance = Math.abs(offset);
  const isActive = offset === 0;
  const isVisible = distance <= 2;

  const slot = SLOTS[distance] ?? HIDDEN;
  const direction = Math.sign(offset);

  const desktopTransform = `translateX(calc(-50% + ${
    direction * slot.x
  }%)) scale(${slot.scale})`;

  return (
    <li
      aria-roledescription="slide"
      aria-label={item.label}
      aria-hidden={!isVisible}
      inert={!isVisible}
      className={`
        absolute left-1/2 top-0
        w-[min(80vw,280px)]
        transition-[transform,opacity,filter] duration-500 ease-out
        motion-reduce:transition-none
        sm:w-[240px] md:w-[320px] lg:w-[400px]
        max-sm:[transform:translateX(-50%)]
        max-sm:[filter:none]
        sm:[transform:var(--desktop-transform)]
        sm:[opacity:var(--desktop-opacity)]
        sm:[filter:blur(var(--desktop-blur))]
        ${
          isActive
            ? "max-sm:z-30 max-sm:opacity-100"
            : "max-sm:pointer-events-none max-sm:z-0 max-sm:opacity-0"
        }
      `}
      style={{
        "--desktop-transform": desktopTransform,
        "--desktop-opacity": slot.opacity,
        "--desktop-blur": `${slot.blur}px`,
        zIndex: slot.z,
      }}
    >
      <button
        type="button"
        onClick={onSelect}
        disabled={!isVisible}
        tabIndex={isVisible ? 0 : -1}
        aria-pressed={isActive}
        aria-label={`Show ${item.label}`}
        className="block w-full cursor-pointer text-left disabled:cursor-default focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
      >
        <div className="relative aspect-[486/456] w-full overflow-hidden rounded-xl sm:rounded-2xl">
          <Image
            src={item.image}
            alt={item.label}
            fill
            sizes="(max-width: 639px) 280px, (max-width: 767px) 240px, (max-width: 1023px) 320px, 400px"
            className="object-cover"
          />
        </div>

        <p
          className={`mt-3 text-center font-sans text-xs uppercase tracking-wide text-foreground transition-opacity duration-500 sm:text-2xl ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        >
          {item.label}
        </p>
      </button>
    </li>
  );
}
