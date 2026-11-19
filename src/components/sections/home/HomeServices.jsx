
import Image from "next/image";
import { SERVICES } from "@/config/home/home";

function ServiceCard({ label, icon }) {
  return (
    <div className="group flex w-full flex-col items-center gap-3 cursor-pointer">
      <div className="flex h-[100px] w-full max-w-[170px] items-center justify-center rounded-[20px] border border-white bg-transparent transition hover:scale-105 hover:bg-white sm:h-[120px] sm:rounded-[25px] lg:h-[130px] lg:rounded-[30px]">
        <Image
          src={icon}
          alt={label}
          width={96}
          height={96}
          loading="lazy"
          sizes="(max-width: 639px) 65px, (max-width: 1023px) 80px, 96px"
          className="h-[65px] w-[65px] object-contain sm:h-[80px] sm:w-[80px] lg:h-[96px] lg:w-[96px]"
        />
      </div>

      <span className="text-center font-sans text-xs font-bold uppercase tracking-wide text-foreground sm:text-sm lg:text-lg">
        {label}
      </span>
    </div>
  );
}

export function HomeServices() {
  return (
    <section className="bg-transparent px-4 py-12 sm:px-6 sm:py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-2 items-start justify-items-center gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-8 lg:grid-cols-6 lg:gap-6">
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            label={service.label}
            icon={service.icon}
          />
        ))}
      </div>
    </section>
  );
}
