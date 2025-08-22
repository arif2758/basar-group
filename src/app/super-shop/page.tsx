import CategoriesGrid from "./shopComponents/CategoriesGrid";
import CommunityImpact from "./shopComponents/CommunityImpact";
import FeaturedProducts from "./shopComponents/FeaturedProducts";
import FlashSale from "./shopComponents/FlashSale";

import HeroShop from "./shopComponents/HeroShop";

export default function SuperShopPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroShop />
      <CategoriesGrid />
      <FeaturedProducts />
      <FlashSale />
      <CommunityImpact />
    </main>
  );
}
