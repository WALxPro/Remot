import { AdminHeader } from "@/components/admins/layout/AdminHeader";
import { AdminSidebar } from "@/components/admins/layout/AdminSidebar";

import { requireAdmin } from "@/server/modules/auth/auth.guard";

export const metadata = {
  title: "Admin Panel | Studio Remot",
  description: "Studio Remot blog management panel",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen flex-1 bg-background text-foreground">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}