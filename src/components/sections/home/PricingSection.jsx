
import { PricingCard } from "@/components/ui/PricingCard";
import { PRICING } from "@/config/home/home";

export function PricingSection() {
  const { title, plans } = PRICING;

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="
        relative
        flex
        min-h-screen
        w-full
        items-center
        justify-center
        bg-transparent
        px-5
        py-16
        sm:py-20
        lg:min-h-[180vh]
        lg:py-24
      "
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2
          id="pricing-heading"
          className="
            text-center
            font-sans
            text-[clamp(40px,5vw,64px)]
            font-medium
            uppercase
            leading-tight
            text-foreground
          "
        >
          {title}
        </h2>

        <div
          className="
            mx-auto
            mt-12
            grid
            w-full
            max-w-[840px]
            grid-cols-1
            items-stretch
            gap-6
            sm:mt-16
            sm:grid-cols-2
            lg:gap-8
          "
        >
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              variant={plan.variant}
            >
              <PricingCard.Header name={plan.name} />

              <PricingCard.Price
                price={plan.price}
                currency={plan.currency}
                period={plan.period}
              />

              <PricingCard.Features features={plan.features} />

              <PricingCard.Action
                cta={plan.cta}
                variant={plan.variant}
              />
            </PricingCard>
          ))}
        </div>
      </div>
    </section>
  );
}
