import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "LUXE — Premium Store",
  description: "Shop the finest products across all categories",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toast />
        </ReduxProvider>
      </body>
    </html>
  );
}
