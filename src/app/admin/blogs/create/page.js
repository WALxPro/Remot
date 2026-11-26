import { BlogForm } from "@/components/admins/blogs/BlogForm";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";


export const metadata = {
  title: "Create Blog | Studio Remot",
};

export default function CreateBlogPage() {
  return (
    <section className="space-y-8">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Create Blog
          </h1>

          <p className="mt-2 text-sm text-foreground/60">
            Create a new article for your website.
          </p>
        </div>

        <Link
          href="/admin/blogs"
          className="
            inline-flex items-center gap-2
            self-start rounded-lg border
            border-foreground/10 px-4 py-2.5
            text-sm text-foreground/60
            transition-colors
            hover:border-brand-primary/30
            hover:text-brand-primary
          "
        >
          <HiOutlineArrowLeft className="text-lg" />
          All Blogs
        </Link>
      </div>

      {/* BLOG FORM */}
      <BlogForm />
    </section>
  );
}