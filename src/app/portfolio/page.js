import { PortfolioHero } from "@/components/sections/portfolio/PortfolioHero";
import { ContactSection } from "@/components/shared/ContactSection";
import { FaqSection } from "@/components/shared/FaqSection";
import { NewsletterSection } from "@/components/shared/NewsletterSection";
import { StudioBanner } from "@/components/shared/StudioBanner";
import { FeaturedWork } from "@/components/sections/portfolio/FeaturedWork";
export default function PortfolioPage() {
  return (
    <div className="portfolio-background">
      <PortfolioHero />
      <FeaturedWork />
      <StudioBanner />
      <FaqSection />
      <ContactSection />
      <NewsletterSection />
    </div>
  );
}
