import { CartProvider } from "./contexts/CartContext";
import FooterShop from "./shopComponents/FooterShop";


function GranthagarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <CartProvider>
     
        {children}
      </CartProvider>
      <FooterShop />
    </section>
  );
}

export default GranthagarLayout;
