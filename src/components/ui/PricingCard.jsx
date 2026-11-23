
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { IMAGES } from "@/config/home/home";

const VARIANTS = {
  basic: {
    card: "bg-white text-background",
    button: "bg-background text-foreground hover:bg-brand-purple",
  },
  premium: {
    card: "bg-brand-purple text-foreground",
    button: "bg-white text-background hover:bg-gray-100",
  },
};

export function PricingCard({
  name,
  price,
  currency,
  period,
  features,
  cta,
  variant = "basic",
  className = "",
}) {
  const styles = VARIANTS[variant] || VARIANTS.basic;
  const isPremium = variant === "premium";

  return (
    <article
      className={twMerge(
        "relative isolate flex min-h-[390px] w-full flex-col overflow-hidden rounded-[8px] p-6 sm:min-h-[430px] sm:p-8 lg:min-h-[450px]",
        styles.card,
        className
      )}
    >
      {isPremium && (
        <Image
          src={IMAGES.pricing.premiumBackground}
          alt=""
          fill
          sizes="(min-width: 640px) 400px, 100vw"
          className="-z-10 object-cover"
        />
      )}

      <div className="text-center">
        <h3 className="font-sans text-lg font-semibold uppercase sm:text-xl">
          {name}
        </h3>

        <div className="mt-3 flex items-baseline justify-center">
          <span className="self-start text-xl font-medium">
            {currency}
          </span>

          <span className="text-[54px] font-semibold leading-none sm:text-[64px]">
            {price}
          </span>

          <span className="ml-1 text-sm">
            {period}
          </span>
        </div>
      </div>

      <ul className="mt-8 flex-1 space-y-3 text-sm sm:text-base">
        {features.map((feature, index) => (
          <li key={`${index}-${feature}`} className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={cta.href}
        className={twMerge(
          "mt-8 flex min-h-[48px] w-full items-center justify-center rounded-[8px] px-4 text-center text-sm font-medium transition-colors sm:text-base",
          styles.button
        )}
      >
        {cta.label}
      </Link>
    </article>
  );
}
