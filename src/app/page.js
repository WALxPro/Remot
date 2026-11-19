
import { HomeAbout } from "@/components/sections/home/HomeAbout";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeServices } from "@/components/sections/home/HomeServices";
import { ServiceShowcase } from "@/components/sections/home/ServiceShowcase";
import { WhyWorkWithUs } from "@/components/sections/home/WhyWorkWithUs";
import { PortfolioShowcase } from "@/components/sections/home/PortfolioShowcase";
import { FaqSection } from "@/components/sections/home/FaqSection";
import { ContactSection } from "@/components/sections/home/ContactSection";
import { ClientsSection } from "@/components/sections/home/ClientsSection";
import { PricingSection } from "@/components/sections/home/PricingSection";
import { StudioBanner } from "@/components/sections/home/StudioBanner";
import { CreativeSection } from "@/components/sections/home/CreativeSection";

export default function Home() {
  return (
    <div className="home-background">
      <HomeHero />
       <HomeServices />
      <HomeAbout />
     <WhyWorkWithUs />
      <ServiceShowcase />
      <StudioBanner/>
       <PortfolioShowcase />
      <CreativeSection/>
      <ClientsSection />
      <PricingSection />
      <FaqSection />
      <ContactSection /> 
    </div>
  );
}
