
import Image from "next/image";
import { ContactForm } from "@/components/ui/ContactForm";
import { Paragraph } from "@/components/ui/Paragraph";
import { CONTACT } from "@/config/shared/shared";


export function ContactSection() {
  const {
    title,
    description,
    image,
    fields,
    submitLabel,
    successMessage,
  } = CONTACT;

  return (
    <section className="bg-transparent px-6 py-16 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-x-[70px] gap-y-10 lg:grid-cols-[1.4fr_1fr]">
        <h2 className="whitespace-pre-line text-[35px] font-medium uppercase leading-[1] sm:text-[65px] text-center sm:text-left">
          {title}
        </h2>

        <Paragraph className="ml-auto w-full md:max-w-[250px] text-center md:text-right">
          {description}
        </Paragraph>

        <ContactForm
          fields={fields}
          submitLabel={submitLabel}
          successMessage={successMessage}
        />

        <div className="relative min-h-[240px] overflow-hidden rounded-[8px]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
