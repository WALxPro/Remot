import { BlogForm } from "@/components/admins/blogs/BlogForm";
import { PageHeader } from "@/components/admins/ui/PageHeader";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/server/modules/blog/blog.service";


export const metadata = {
  title: "Edit Blog | Studio Remot",
};

export default async function EditBlogPage({ params }) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <section className="space-y-8">
      <PageHeader title="Edit Blog" description="Update your existing blog content and settings." backHref="/admin/blogs" />
      <BlogForm
        key={blog.id}
        initialData={blog}
      />
    </section>
  );
}
