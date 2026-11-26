import { BlogArticles } from "@/components/sections/blog/BlogArticles";
import { BlogHero } from "@/components/sections/blog/BlogHero";
import { getPublishedBlogs } from "@/server/modules/blog/blog.service";

export const metadata = { title: "Blog | Studio Remot", description: "Ideas, insights and inspiration from Studio Remot." };

export default async function BlogPage() {
  const posts = await getPublishedBlogs();
  return (
    <div className="pricing-background">
      <BlogHero />
      <BlogArticles posts={posts} />
    </div>
  );
}
