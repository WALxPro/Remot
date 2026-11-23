
import Image from "next/image";
import { CLIENTS } from "@/config/home/home";

function ClientLogo({ name, image }) {
  return (
    <div className="flex h-[55px] w-[120px] shrink-0 items-center justify-center sm:h-[100px] sm:w-[220px] lg:h-[130px] lg:w-[250px]">
      <Image
        src={image}
        alt={name}
        width={200}
        height={100}
        sizes="(max-width: 639px) 110px, (max-width: 1023px) 220px, 200px"
        className="h-auto max-h-full w-auto max-w-full object-contain"
      />
    </div>
  );
}

function ClientMarquee({ logos, reverse = false }) {
  return (
    <div className="w-full overflow-hidden">
      <div
        className={`client-marquee flex w-max gap-3 sm:gap-10 ${
          reverse ? "client-marquee-reverse" : ""
        }`}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 gap-3 sm:gap-10"
            aria-hidden={copy === 1}
          >
            {logos.map((client) => (
              <ClientLogo key={`${copy}-${client.id}`} {...client} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientsSection() {
  return (
    <section className="overflow-hidden bg-foreground py-6 sm:py-16 lg:py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-5 text-center font-sans text-xl font-medium uppercase text-brand-primary sm:mb-10 sm:text-[50px]">
          {CLIENTS.title}
        </h2>
      </div>

      <div className="space-y-2 sm:space-y-2">
        <ClientMarquee logos={CLIENTS.logos} />
        <ClientMarquee logos={[...CLIENTS.logos].reverse()} reverse />
      </div>
    </section>
  );
}
