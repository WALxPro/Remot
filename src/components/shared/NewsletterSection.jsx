import Image from "next/image";

export function NewsletterSection() {
  return (
    <section className="bg-transparent px-4 py-10 sm:px-6 lg:px-10 lg:py-32">
      <div className="relative isolate mx-auto flex w-full max-w-7xl items-center justify-center overflow-hidden rounded-[33px] lg:rounded-[48px]">
        <div className="pointer-events-none absolute -inset-[5px] -z-10">
          <Image
            src="/images/newsletter.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Content */}
        <div className="flex w-full flex-col items-center px-5 py-[60px] text-center sm:px-10 sm:py-[80px] lg:py-[100px]">
          <h2 className="font-sans text-[28px] font-medium uppercase leading-[1.1] text-white sm:text-[42px] lg:text-[60px]">
            JOIN OUR NEWSLETTER TO
            <span className="block">STAY UP TO DATE!</span>
          </h2>

          {/* Subscribe UI */}
          <div className="mt-8 flex w-full max-w-[950px] items-center rounded-full bg-white p-[5px] sm:mt-12 sm:p-[8px]">
            <input
              type="email"
              placeholder="Enter Your Email"
              aria-label="Email address"
              className="h-[48px] min-w-0 flex-1 rounded-full bg-transparent px-4 text-sm text-black outline-none placeholder:text-gray-400 sm:h-[70px] sm:px-8 sm:text-lg"
            />

            <button
              type="button"
              className="flex min-h-[48px] min-w-[115px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#FF03CF] px-4 text-sm font-medium text-white sm:min-h-[70px] sm:min-w-[260px] sm:text-lg"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
