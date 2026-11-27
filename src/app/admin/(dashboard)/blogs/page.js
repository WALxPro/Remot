import { BlogList } from "@/components/admins/blogs/BlogList";
import { requireAdmin } from "@/server/modules/auth/auth.guard";

export const metadata = {
  title: "Manage Blogs | Studio Remot",
};

export default async function AdminBlogsPage() {
  await requireAdmin();

  return <BlogList />;
}