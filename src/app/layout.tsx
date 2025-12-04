import type { Metadata } from "next";
import { Josefin_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { HeaderMenuItemProvider } from "./context/HeaderMenuItemContext";
import { AppProvider } from "./context/AppContext";
import { CartProvider } from "./context/CartContext";
import MainLayout from "./components/layout/MainLayout";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LocationProvider } from "./context/LocationContext";
import { CategoryListCacheProvider } from "./context/CategoryListCacheContext";
import AuthProviderWrapper from "./context/AuthProviderWrapper";
import LoginModal from "./components/ui/modal/LoginModal";
import { LocationHierarchyProvider } from "./context/LocationHierarchyContext";
import {Analytics} from "@vercel/analytics/vue";

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
      <LocationProvider>
        <AuthProviderWrapper>
          <AppProvider>
            <CartProvider>
              <HeaderMenuItemProvider>
                <CategoryListCacheProvider>
                  <MainLayout>
                    <LoginModal />
                    {children}
                    <Analytics />
                    <SpeedInsights />
                  </MainLayout>
                </CategoryListCacheProvider>
              </HeaderMenuItemProvider>
            </CartProvider>
          </AppProvider>
        </AuthProviderWrapper>
      </LocationProvider>
      </body>
    </html>
  );
}
