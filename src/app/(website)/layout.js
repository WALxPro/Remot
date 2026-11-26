import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactPopupProvider } from "@/components/providers/ContactPopupProvider";

export default function WebsiteLayout({ children }) {
  return (
    <ContactPopupProvider>
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </ContactPopupProvider>
  );
}