import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";
import { ServicesGrid } from "@/components/ui/ServicesGrid";

export function ServiceDevelopment({
  heading,
  description,
  subtitle,
  services = [],
  cta,
}) {
  if (!services.length) return null;

  return (
    <section
      aria-labelledby="service-development-heading"
      className="w-full bg-transparent px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-[1050px] text-center sm:mb-12">
          <h2
            id="service-development-heading"
            className="font-sans text-[clamp(30px,5vw,64px)] lg:text-[90px] font-normal uppercase leading-[1.1] tracking-[-0.04em] text-foreground"
          >
            {heading}
          </h2>

          {description && (
            <Paragraph className="mx-auto mt-6 max-w-[720px] text-center">
              {description}
            </Paragraph>
          )}

          {subtitle && (
            <Paragraph className="mx-auto mt-4 text-center">
              {subtitle}
            </Paragraph>
          )}
        </div>

        <ServicesGrid services={services} />

        {cta?.href && cta?.label && (
          <div className="mt-12 flex justify-center">
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        )}
      </div>
    </section>
  );
}