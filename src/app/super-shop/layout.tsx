import { CartProvider } from "./contexts/CartContext";
import FooterShop from "./shopComponents/FooterShop";


function GranthagarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex-grow flex flex-col">
      <CartProvider>
        <div className="flex-grow flex flex-col">
          {children}
        </div>
      </CartProvider>
      <FooterShop />
    </section>
  );
}

export default GranthagarLayout;
