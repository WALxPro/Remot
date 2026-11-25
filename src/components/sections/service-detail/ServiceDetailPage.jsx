import { StudioBanner } from "@/components/shared/StudioBanner";
import { FaqSection } from "@/components/shared/FaqSection";
import { ContactSection } from "@/components/shared/ContactSection";
import { NewsletterSection } from "@/components/shared/NewsletterSection";
import { ServiceDetailHero } from "./sections/ServiceDetailHero";
import { ServiceOverview } from "./sections/ServiceOverview";
import { ServiceDevelopment } from "./sections/ServiceDevelopment";
import { ServiceCTA } from "./sections/ServiceCTA";
import { ServiceProcess } from "./sections/ServiceProcess";
import { ServiceLaunch } from "./sections/ServiceLaunch";

export function ServiceDetailPage({ service }) {
  return (
    <div className="service-inner-background ">
      {service.hero && <ServiceDetailHero hero={service.hero} />}

      {service.overview && <ServiceOverview {...service.overview} />}

      {service.developmentServices && (
        <ServiceDevelopment {...service.developmentServices} />
      )}

      {service.serviceCta && <ServiceCTA {...service.serviceCta} />}

      {service.process && <ServiceProcess {...service.process} />}

      {service.launch && <ServiceLaunch {...service.launch} />}

      <StudioBanner />
      <FaqSection />
      <ContactSection />
      <NewsletterSection />
    </div>
  );
}
