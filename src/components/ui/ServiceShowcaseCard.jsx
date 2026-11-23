import Image from "next/image";

export function ServiceShowcaseCard({ label, image }) {
  return (
    <article className="relative h-[240px] w-[335px] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/40">
      <Image
        src={image}
        alt=""
        fill
        sizes="155px"
        className="object-cover"
      />

      <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 backdrop-blur-[3px]">
        <h3 className="px-2 text-center text-[30px] font-sans font-normal uppercase text-foreground">
          {label}
        </h3>
      </div>
    </article>
  );
}