import { HowWeWork } from "@/components/sections/service/HowWeWork";
import { OurServices } from "@/components/sections/service/OurServices";
import { ServiceHero } from "@/components/sections/service/ServiceHero";
import { ServicesShowcase } from "@/components/sections/service/ServicesShowcase";
import { ContactSection } from "@/components/shared/ContactSection";
import { FaqSection } from "@/components/shared/FaqSection";
import { HeroWithForm } from "@/components/shared/HeroWithForm";
import { NewsletterSection } from "@/components/shared/NewsletterSection";
import { StudioBanner } from "@/components/shared/StudioBanner";

export default function ServicesPage() {
  return (
    <div className="service-background">
      {/* <ServiceHero/> */}
      <HeroWithForm/>
      <ServicesShowcase/>
      <OurServices/>
      <HowWeWork/>
      <StudioBanner />
      <FaqSection />
      <ContactSection />
      <NewsletterSection />
    </div>
  );
}


