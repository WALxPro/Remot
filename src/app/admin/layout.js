import { AdminQueryProvider } from "@/components/providers/AdminQueryProvider";

export default function AdminRootLayout({ children }) {
  return (
    <AdminQueryProvider>
      {children}
    </AdminQueryProvider>
  );
}