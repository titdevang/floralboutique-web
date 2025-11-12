import type { Metadata } from "next";
import { Josefin_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { HeaderMenuItemProvider } from "./context/HeaderMenuItemContext";
import { AppProvider } from "./context/AppContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({
  subsets: ["latin"],
  // variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-josefin-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Floral Boutique",
  description: "Floral Boutique",
  icons: {
    icon: "/favicon.ico",
  },
  robots: "noindex",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} ${josefinSans.variable} antialiased`}
      >
        <AuthProvider>
          <AppProvider>
            <CartProvider>
              <HeaderMenuItemProvider>
                <MainLayout>{children}</MainLayout>
                <SpeedInsights />
              </HeaderMenuItemProvider>
            </CartProvider>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
