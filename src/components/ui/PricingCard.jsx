
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { IMAGES } from "@/config/home/home";

const VARIANTS = {
  basic: {
    card: "bg-foreground text-background",
    button: "bg-background text-foreground hover:bg-brand-purple",
  },
  premium: {
    card: "bg-brand-purple text-foreground",
    button: "bg-foreground text-background hover:bg-gray-100",
  },
};

const PricingCardRoot = ({
  variant = "basic",
  className = "",
  children,
}) => {
  const styles = VARIANTS[variant] ?? VARIANTS.basic;

  return (
    <article
      className={twMerge(
        "relative isolate flex min-h-[390px] w-full flex-col overflow-hidden rounded-[8px] p-6 sm:min-h-[430px] sm:p-8 lg:min-h-[450px]",
        styles.card,
        className
      )}
    >
      {variant === "premium" && (
        <Image
          src={IMAGES.pricing.premiumBackground}
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 640px) 400px, 100vw"
          className="pointer-events-none -z-10 scale-[1.03] object-cover object-center"
        />
      )}
      {children}
    </article>
  );
};

const PricingCardHeader = ({ name }) => (
  <h3 className="text-center font-display text-lg font-semibold uppercase sm:text-2xl">
    {name}
  </h3>
);

const PricingCardPrice = ({ price, currency, period }) => (
  <p className="mt-3 flex items-baseline justify-center">
    <span className="self-start text-xl font-medium">
      {currency}
    </span>
    <span className="text-[54px] font-semibold leading-none sm:text-[64px]">
      {price}
    </span>
    <span className="ml-1 text-sm">{period}</span>
  </p>
);

const PricingCardFeatures = ({ features }) => (
  <ul className="mt-8 flex-1 space-y-3 text-sm sm:text-base">
    {features.map((feature, index) => (
      <li key={`${feature}-${index}`} className="flex items-start gap-2">
        <span aria-hidden="true">•</span>
        <span>{feature}</span>
      </li>
    ))}
  </ul>
);

const PricingCardAction = ({ cta, variant = "basic" }) => {
  const styles = VARIANTS[variant] ?? VARIANTS.basic;

  return (
    <Link
      href={cta.href}
      className={twMerge(
        "mt-8 flex min-h-[48px] w-full items-center justify-center rounded-[8px] px-4 text-center text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-base",
        styles.button
      )}
    >
      {cta.label}
    </Link>
  );
};

export const PricingCard = Object.assign(PricingCardRoot, {
  Header: PricingCardHeader,
  Price: PricingCardPrice,
  Features: PricingCardFeatures,
  Action: PricingCardAction,
});
