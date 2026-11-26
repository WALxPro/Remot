import { BlogForm } from "@/components/admins/blogs/BlogForm";
import { PageHeader } from "@/components/admins/ui/PageHeader";


export const metadata = {
  title: "Create Blog | Studio Remot",
};

export default function CreateBlogPage() {
  return (
    <section className="space-y-8">
      <PageHeader title="Create Blog" description="Create a new article for your website." backHref="/admin/blogs" />
      <BlogForm />
    </section>
  );
}
