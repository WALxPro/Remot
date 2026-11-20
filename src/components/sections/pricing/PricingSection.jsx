import { PricingCard } from "@/components/ui/PricingCard";
import { PRICING } from "@/config/pricing/pricing";

export function PricingSection() {
  return (
    <div className="relative lg:h-[100vh] py-5 sm:py-0 px-5">
      <section
        id="pricing"
        className="flex h-full w-full items-center justify-center bg-transparent"
      >
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-center font-sans text-[40px] font-medium uppercase leading-tight text-foreground sm:text-[50px] lg:text-[64px]">
            {PRICING.title}
          </h2>

          <div className="mx-auto mt-12 grid max-w-[1200px] grid-cols-1 items-stretch gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {PRICING.plans.map((plan) => (
              <PricingCard key={plan.id} {...plan} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
