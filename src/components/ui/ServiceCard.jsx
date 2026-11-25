import Link from "next/link";

import { Paragraph } from "@/components/ui/Paragraph";

export function ServiceCard({
  number,
  title,
  description,
  linkText,
  href,
}) {
  return (
    <article className="flex h-full flex-col justify-between gap-6 rounded-lg border border-white/15 bg-foreground/10 p-5 sm:p-6 lg:min-h-[380px] xl:min-h-[440px] xl:p-7">
      <div className="flex flex-col gap-4 lg:gap-6">
        <span
          aria-hidden="true"
          className="w-fit font-display text-[clamp(48px,5vw,64px)] font-medium leading-none text-transparent"
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.35)",
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            textShadow: "2px 2px 4px rgba(0,0,0,0.25)",
          }}
        >
          {number}
        </span>

        <h3 className="font-sans text-[clamp(22px,2.2vw,35px)] font-medium leading-[1.15] tracking-[-0.03em] text-foreground wrap-break-word">
          {title}
        </h3>

        <Paragraph>{description}</Paragraph>
      </div>

      {linkText && (
        <div className="mt-auto pt-4">
          {href ? (
            <Link
              href={href}
              className="inline-flex w-fit items-center gap-2 text-[16px] font-medium text-foreground transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary sm:text-[18px] xl:text-[20px]"
            >
              {linkText}
              <span aria-hidden="true">↗</span>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 text-[16px] text-foreground/80 sm:text-[18px] xl:text-[20px]">
              {linkText}
              <span aria-hidden="true">↗</span>
            </span>
          )}
        </div>
      )}
    </article>
  );
}