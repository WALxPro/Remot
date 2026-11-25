
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactPopupProvider } from "@/components/providers/ContactPopupProvider";
import "./globals.css";

const sansation = localFont({
  src: [
    { path: "./fonts/sansation-regular.woff2", weight: "400" },
    { path: "./fonts/sansation-bold.woff2", weight: "700" },
  ],
  variable: "--font-sansation",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "./fonts/poppins-regular.woff2", weight: "400" },
    { path: "./fonts/poppins-medium.woff2", weight: "500" },
    { path: "./fonts/poppins-semibold.woff2", weight: "600" },
    { path: "./fonts/poppins-bold.woff2", weight: "700" },
  ],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Studio Remot",
  description: "Creativity Has No Borders",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sansation.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
         <ContactPopupProvider>
    
  
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
        </ContactPopupProvider>
      </body>
    </html>
  );
}
