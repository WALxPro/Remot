import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CalendarDays } from "lucide-react";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function BlogDetailHero({ post }) {
  const {
    title,
    category,
    description,
    featuredImage,
    publishedAt,
  } = post;

  const canOptimizeImage = featuredImage?.startsWith(
    "https://res.cloudinary.com/"
  );

  return (
    <section
      aria-labelledby="blog-detail-heading"
      className="w-full px-5 pb-12 pt-32 sm:pt-40 lg:pt-48"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* BREADCRUMB */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-foreground/50"
        >
          <Link
            href="/"
            className="transition-colors hover:text-brand-primary"
          >
            Home
          </Link>

          <ChevronRight size={14} aria-hidden="true" />

          <Link
            href="/blog"
            className="transition-colors hover:text-brand-primary"
          >
            Blog
          </Link>

          <ChevronRight size={14} aria-hidden="true" />

          <span
            aria-current="page"
            className="text-brand-primary"
          >
            {title}
          </span>
        </nav>

        {/* ARTICLE HEADER */}
        <header className="mx-auto max-w-4xl space-y-6 py-12 text-center sm:py-16">
          <span className="text-sm font-medium uppercase tracking-widest text-brand-primary">
            {category}
          </span>

          <h1
            id="blog-detail-heading"
            className="font-display text-[clamp(32px,5vw,64px)] font-bold leading-tight text-foreground"
          >
            {title}
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            {description}
          </p>

          {publishedAt && (
            <div className="flex items-center justify-center gap-2 text-sm text-foreground/50">
              <CalendarDays size={16} aria-hidden="true" />

              <time dateTime={new Date(publishedAt).toISOString()}>
                {dateFormatter.format(new Date(publishedAt))}
              </time>
            </div>
          )}
        </header>

        {/* FEATURED IMAGE */}
        {canOptimizeImage && (
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-foreground/5">
            <Image
              src={featuredImage}
              alt={title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}