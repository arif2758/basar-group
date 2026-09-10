import { Providers } from "@/components/super-shop/providers/Providers";
import { CartProvider } from "./contexts/CartContext";
import Header from "@/components/super-shop/layout/Header";
import Footer from "@/components/super-shop/layout/Footer";

export default function SuperShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#f5f5f5] dark:bg-[#141414] text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-blue-600 selection:text-white">
          <Header />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Providers>
  );
}
