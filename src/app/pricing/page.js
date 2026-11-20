import { RoutePlaceholder } from "@/components/layout/RoutePlaceholder";
import {PricingHero} from "@/components/sections/pricing/PricingHero";
import { PricingSection } from "@/components/sections/pricing/PricingSection";
import { SpecificServices } from "@/components/sections/pricing/SpecificServices";
import { ContactSection } from "@/components/shared/ContactSection";
import { FaqSection } from "@/components/shared/FaqSection";
import { NewsletterSection } from "@/components/shared/NewsletterSection";
import { StudioBanner } from "@/components/shared/StudioBanner";

export default function PricingPage() {
  return (
    <div className="pricing-background">
      <PricingHero />
      <PricingSection/>
      <SpecificServices />
      <StudioBanner />
      <FaqSection />
      <ContactSection />
      <NewsletterSection />
    </div>
  );
}
