import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BlogCard({ post }) {
  const {
    title,
    category,
    description,
    featuredImage,
    slug,
  } = post;

  const canOptimizeImage = featuredImage?.startsWith(
    "https://res.cloudinary.com/"
  );

  return (
    <article className="h-full">
      <Link
        href={`/blog/${slug}`}
        className="
          group
          flex
          h-full
          cursor-pointer
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/5
          transition-colors
          duration-300
          hover:border-brand-primary/50
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-brand-primary
        "
      >
        <div className="relative aspect-video overflow-hidden bg-foreground/5">
          {canOptimizeImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              className="
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
                motion-reduce:transform-none
              "
            />
          ) : (
            <div className="flex size-full items-center justify-center text-sm text-foreground/40">
              Studio Remot
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <span className="text-sm font-medium uppercase text-brand-primary">
            {category}
          </span>

          <h3
            className="
              text-xl
              font-medium
              leading-snug
              text-foreground
              transition-colors
              duration-300
              group-hover:text-brand-primary
            "
          >
            {title}
          </h3>

          <p className="text-sm leading-relaxed text-foreground/70">
            {description}
          </p>

          <span
            className="
              mt-auto
              inline-flex
              items-center
              gap-2
              pt-2
              text-sm
              font-medium
              text-brand-primary
            "
          >
            Read More

            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
                motion-reduce:transform-none
              "
            />
          </span>
        </div>
      </Link>
    </article>
  );
}