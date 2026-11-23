
import Image from "next/image";

import { PricingPackageForm } from "@/components/ui/PricingPackageForm";
import { SPECIFIC_SERVICES } from "@/config/pricing/pricing";

export function SpecificServices() {
  const { title, image } = SPECIFIC_SERVICES;

  return (
    <section
      aria-labelledby="specific-services-heading"
      className="bg-transparent px-4 py-12 sm:px-6 lg:px-10 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl rounded-[20px] bg-foreground p-6 text-black sm:p-10 lg:p-12">
        <h2
          id="specific-services-heading"
          className="mb-8 font-sans text-[30px] font-bold uppercase leading-tight sm:text-[40px] lg:text-[57px]"
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="relative min-h-[260px] overflow-hidden rounded-lg sm:min-h-[350px] lg:min-h-[420px]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover grayscale"
            />
          </div>

          <PricingPackageForm />
        </div>
      </div>
    </section>
  );
}
