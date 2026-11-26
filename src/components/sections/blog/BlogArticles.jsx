import { BlogCard } from "@/components/sections/blog/BlogCard";
import { BLOG_POSTS } from "@/config/blog/blog";

export function BlogArticles() {
  return (
    <section
      aria-labelledby="blog-articles-heading"
      className="w-full px-5 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2
          id="blog-articles-heading"
          className="
            text-center
            font-sans
            text-[clamp(32px,5vw,64px)]
            font-medium
            uppercase
            leading-tight
            text-foreground
          "
        >
          Latest Articles
        </h2>

        <div
          className="
            mt-12
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-8
          "
        >
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}