import { notFound } from "next/navigation";

import { BlogDetailHero } from "@/components/sections/blog/BlogDetailHero";
import { BlogContent } from "@/components/sections/blog/BlogContent";

import { getPublishedBlogBySlug } from "@/server/modules/blog/blog.service";

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  const post = await getPublishedBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background">
      <article>
        <BlogDetailHero post={post} />

        <BlogContent content={post.content} />
      </article>
    </div>
  );
}