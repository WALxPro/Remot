import {PricingHero} from "@/components/sections/pricing/PricingHero";
import { PricingPageSection } from "@/components/sections/pricing/PricingPageSection";
import { SpecificServices } from "@/components/sections/pricing/SpecificServices";
import { ContactSection } from "@/components/shared/ContactSection";
import { FaqSection } from "@/components/shared/FaqSection";
import { NewsletterSection } from "@/components/shared/NewsletterSection";
import { StudioBanner } from "@/components/shared/StudioBanner";

export default function PricingPage() {
  return (
    <div className="pricing-background">
      <PricingHero />
      <PricingPageSection/>
      <SpecificServices />
      <StudioBanner />
      <FaqSection />
      <ContactSection />
      <NewsletterSection />
    </div>
  );
}
