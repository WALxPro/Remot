
import Image from "next/image";
import { CLIENTS } from "@/config/home/home";

const HEADING_ID = "clients-heading";

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

function ClientLogoGroup({ logos, hidden = false }) {
  return (
    <div
      className="flex shrink-0 gap-3 sm:gap-10"
      aria-hidden={hidden}
    >
      {logos.map((client) => (
        <ClientLogo
          key={client.id}
          {...client}
        />
      ))}
    </div>
  );
}

function ClientMarquee({ logos, reverse = false }) {
  const directionClass = reverse
    ? "client-marquee-reverse"
    : "";

  return (
    <div
      className="w-full overflow-hidden"
      aria-hidden={reverse}
    >
      <div
        className={`client-marquee flex w-max gap-3 sm:gap-10 motion-reduce:animate-none ${directionClass}`}
      >
        <ClientLogoGroup logos={logos} />

        <ClientLogoGroup
          logos={logos}
          hidden
        />
      </div>
    </div>
  );
}

export function ClientsSection() {
  const { title, logos } = CLIENTS;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className="overflow-hidden bg-foreground py-6 sm:py-16 lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-4">
        <h2
          id={HEADING_ID}
          className="mb-5 text-center font-sans text-xl font-medium uppercase text-brand-primary sm:mb-10 sm:text-[50px]"
        >
          {title}
        </h2>
      </div>


        <ClientMarquee logos={logos} />

        <ClientMarquee
          logos={[...logos].reverse()}
          reverse
        />

    </section>
  );
}
