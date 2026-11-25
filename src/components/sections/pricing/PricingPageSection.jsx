import { PricingPlans } from "@/components/shared/PricingPlans";
import { PRICING } from "@/config/pricing/pricing";

export function PricingPageSection() {
  return (
    <PricingPlans
      pricing={PRICING}
      gridClassName="max-w-[1200px] lg:grid-cols-3"
    />
  );
}