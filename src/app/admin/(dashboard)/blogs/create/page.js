import { BlogForm } from "@/components/admins/blogs/BlogForm";
import { PageHeader } from "@/components/admins/ui/PageHeader";
import { requireAdmin } from "@/server/modules/auth/auth.guard";

export const metadata = {
  title: "Create Blog | Studio Remot",
};

export default async function CreateBlogPage() {
  await requireAdmin();

  return (
    <section className="space-y-8">
      <PageHeader
        title="Create Blog"
        description="Create a new article for your website."
        backHref="/admin/blogs"
      />

      <BlogForm />
    </section>
  );
}