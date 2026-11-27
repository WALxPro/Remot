import { redirect } from "next/navigation";
import { requireAdmin } from "@/server/modules/auth/auth.guard";

export default async function AdminPage() {
  await requireAdmin();

  redirect("/admin/blogs");
}