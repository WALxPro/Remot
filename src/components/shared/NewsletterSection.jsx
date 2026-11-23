import Image from "next/image";

import { NEWSLETTER, SHARED_IMAGES } from "@/config/shared/shared";

const NewsletterHeading = ({ title }) => (
  <h2
    id="newsletter-heading"
    className="
      font-sans
      text-[28px]
      font-medium
      uppercase
      leading-[1.1]
      text-foreground
      sm:text-[42px]
      lg:text-[60px]
    "
  >
    {title.map((line) => (
      <span key={line} className="block">
        {line}
      </span>
    ))}
  </h2>
);

const NewsletterForm = ({ form }) => (
  <form
    className="
      mt-8
      flex w-full max-w-[950px]
      items-center
      rounded-full
      bg-foreground
      p-[5px]
      sm:mt-12
      sm:p-[8px]
    "
  >
    <label htmlFor="newsletter-email" className="sr-only">
      Email address
    </label>

    <input
      id="newsletter-email"
      name="email"
      type="email"
      required
      autoComplete="email"
      placeholder={form.placeholder}
      className="
        h-[40px]
        min-w-0 flex-1
        rounded-full
        bg-transparent
        px-4
        text-xs
        text-black
        outline-none
        placeholder:text-gray-400
        sm:h-[70px]
        sm:px-8
        sm:text-lg
      "
    />

    <button
      type="submit"
      className="
        flex
        min-h-[40px]
        min-w-[100px]
        shrink-0
        cursor-pointer
        items-center
        justify-center
        rounded-full
        bg-brand-primary
        px-4
        text-[10px]
        font-medium
        text-foreground
        transition-opacity
        hover:opacity-90
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-brand-primary
        sm:min-h-[70px]
        sm:min-w-[260px]
        sm:text-lg
      "
    >
      {form.buttonText}
    </button>
  </form>
);

export function NewsletterSection() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="
        bg-transparent
        px-4 py-10
        sm:px-6
        lg:px-10 lg:py-32
      "
    >
      <div
        className="
          relative isolate
          mx-auto flex
          w-full max-w-7xl
          items-center justify-center
          overflow-hidden
          rounded-[33px]
          lg:rounded-[48px]
        "
      >
        <Image
          src={SHARED_IMAGES.newsletter}
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="
          -z-10
          object-cover
          object-center
          scale-[1.02]"
        />

        <div
          className="
            relative z-10
            flex w-full
            flex-col items-center
            px-5 py-[60px]
            text-center
            sm:px-10 sm:py-[80px]
            lg:py-[100px]
          "
        >
          <NewsletterHeading title={NEWSLETTER.title} />

          <NewsletterForm form={NEWSLETTER.form} />
        </div>
      </div>
    </section>
  );
}
