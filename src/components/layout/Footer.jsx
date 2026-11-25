import Image from "next/image";
import { FooterColumn } from "@/components/ui/FooterColumn";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { FOOTER } from "@/config/navigation";

export function Footer() {
  const { brand, columns, contact, social, watermark, copyright } = FOOTER;

  return (
    <footer className="relative overflow-hidden bg-footer-image pt-24 lg:pt-36">
      {" "}
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_auto_auto_auto] lg:gap-16 lg:px-0">
        <div>
          <Image
            src="/images/logo-remot.png"
            alt="Studio Remot"
            width={419}
            height={135}
            className="h-auto w-[419px]"
          />

          <p className="ml-0 sm:ml-[20px] mt-2 text-[30px] font-light text-foreground">
            {brand.tagline}
          </p>
        </div>

        {columns.map(({ title, links }) => (
          <FooterColumn key={title} title={title} items={links} />
        ))}

        <div className="flex flex-col gap-8">
          <FooterColumn title={contact.title} items={contact.items} />
          <SocialLinks title={social.title} links={social.links} />
        </div>
      </div>

<div
  className="relative mx-auto mt-16 h-[6vw] max-w-7xl overflow-hidden"
  aria-hidden="true"
>
  <span className="footer-watermark pointer-events-none block select-none whitespace-nowrap text-center font-display text-[11vw] font-medium uppercase leading-none">
    {watermark}
  </span>
</div>

      <p className="absolute bottom-3 right-6 text-base text-foreground/80 lg:right-16">
        &copy; {new Date().getFullYear()} {copyright}
      </p>
    </footer>
  );
}
