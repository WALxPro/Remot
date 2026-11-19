
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

export function CarouselArrowButton({
  direction,
  onClick,
  disabled = false,
  className = "",
}) {
  const isPrev = direction === "prev";
  const Icon = isPrev ? HiArrowLeft : HiArrowRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? "Previous project" : "Next project"}
      className={`glass-effect flex h-[54px] w-[54px] cursor-pointer items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <Icon size={20} aria-hidden="true" />
    </button>
  );
}
