import { HomeAbout } from "@/components/sections/home/HomeAbout";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeServices } from "@/components/sections/home/HomeServices";
import { ServiceShowcase } from "@/components/sections/home/ServiceShowcase";
import { WhyWorkWithUs } from "@/components/sections/home/WhyWorkWithUs";
import { PortfolioShowcase } from "@/components/sections/home/PortfolioShowcase";
import { FaqSection } from "@/components/shared/FaqSection";
import { ContactSection } from "@/components/shared/ContactSection";
import { ClientsSection } from "@/components/sections/home/ClientsSection";
import { StudioBanner } from "@/components/shared/StudioBanner";
import { CreativeSection } from "@/components/sections/home/CreativeSection";
import { HomePricingSection } from "@/components/sections/home/HomePricingSection";

export default function Home() {
  return (
    <div className="home-background">
      <HomeHero />
      <HomeServices />
      <HomeAbout />
      <WhyWorkWithUs />
      <ServiceShowcase />
      <StudioBanner />
      <PortfolioShowcase />
      <CreativeSection />
      <ClientsSection />
      <HomePricingSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}
