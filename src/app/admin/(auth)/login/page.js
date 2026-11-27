import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admins/auth/AdminLoginForm";
import { getCurrentAdmin } from "@/server/modules/auth/auth.guard";

export const metadata = {
  title: "Admin Login | Studio Remot",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin();

  if (admin) {
    redirect("/admin");
  }

  return <AdminLoginForm />;
}