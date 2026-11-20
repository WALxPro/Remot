import ContactHero from "@/components/sections/contact/ContactHero";
import { ContactSection } from "@/components/shared/ContactSection";
import { FaqSection } from "@/components/shared/FaqSection";
import { NewsletterSection } from "@/components/shared/NewsletterSection";
import { StudioBanner } from "@/components/shared/StudioBanner";

export default function ContactPage() {
  return (
    <div className="contact-background">
      <ContactHero />
      <ContactSection />
      <StudioBanner/>
      <FaqSection />   
      <NewsletterSection/>  
    </div>
  );
}
