import { PricingPlans } from "@/components/shared/PricingPlans";
import { PRICING } from "@/config/home/home";

export function HomePricingSection() {
  return (
    <PricingPlans
      pricing={PRICING}
      sectionClassName="lg:min-h-[180vh]"
      gridClassName="max-w-[840px]"
    />
  );
}