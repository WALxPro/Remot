import AboutHero from "@/components/sections/about/AboutHero";
import AboutUs from "@/components/sections/about/AboutUs";
import MissionVision from "@/components/sections/about/MissionVision";
import OurJourney from "@/components/sections/about/OurJourney";
import { ContactSection } from "@/components/shared/ContactSection";
import { FaqSection } from "@/components/shared/FaqSection";
import { NewsletterSection } from "@/components/shared/NewsletterSection";
import { StudioBanner } from "@/components/shared/StudioBanner";

export default function AboutPage() {
  return (
    <div className="about-background">
      <AboutHero />
      <AboutUs />
      <OurJourney/>
      <MissionVision/>
      <StudioBanner />
      <FaqSection />
      <ContactSection />
      <NewsletterSection />
    </div>
  );
}
