
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

  return (
    <li
      className="absolute left-1/2 top-0 w-[160px] transition-all duration-500 ease-out sm:w-[240px] md:w-[320px] lg:w-[400px]"
      style={{
        transform: `translateX(calc(-50% + ${direction * slot.x}%)) scale(${slot.scale})`,
        opacity: slot.opacity,
        filter: `blur(${slot.blur}px)`,
        zIndex: slot.z,
        pointerEvents: isVisible && !isActive ? "auto" : "none",
      }}
    >
      <button
        type="button"
        onClick={onSelect}
        disabled={isActive || !isVisible}
        tabIndex={isVisible && !isActive ? 0 : -1}
        aria-label={`Show ${item.label}`}
        className="block w-full cursor-pointer text-left disabled:cursor-default"
      >
        <div className="relative aspect-[486/456] w-full overflow-hidden rounded-xl sm:rounded-2xl">
          <Image
            src={item.image}
            alt={item.label}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 320px, (min-width: 640px) 240px, 160px"
            className="object-cover"
          />
        </div>

        <p
          className={`font-sans mt-3 text-center text-xs uppercase tracking-wide text-foreground transition-opacity duration-500 sm:text-2xl ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        >
          {item.label}
        </p>
      </button>
    </li>
  );
}
