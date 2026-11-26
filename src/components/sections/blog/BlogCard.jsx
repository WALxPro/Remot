import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function BlogCard({ post }) {
  const { title, category, description, featuredImage, slug } = post;
  const canOptimizeImage = featuredImage?.startsWith("https://res.cloudinary.com/");

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/5
        transition-colors
        duration-300
        hover:border-brand-primary/50
      "
    >
      <div className="relative aspect-video overflow-hidden bg-foreground/5">
        {canOptimizeImage ? <Image
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
        /> : <div className="flex size-full items-center justify-center text-sm text-foreground/40">Studio Remot</div>}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <span className="text-sm font-medium uppercase text-brand-primary">
          {category}
        </span>

        <h3 className="text-xl font-medium leading-snug text-foreground"><Link href={`/blog/${slug}`} className="transition-colors hover:text-brand-primary">{title}</Link></h3>

        <p className="text-sm leading-relaxed text-foreground/70">
          {description}
        </p>

        <Link href={`/blog/${slug}`}
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
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
