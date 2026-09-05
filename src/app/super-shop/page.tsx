import CategoriesGrid from "./shopComponents/CategoriesGrid";
import CommunityImpact from "./shopComponents/CommunityImpact";
import FeaturedProducts from "./shopComponents/FeaturedProducts";
import FlashSale from "./shopComponents/FlashSale";
import HeroShop from "./shopComponents/HeroShop";

export default function SuperShopPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors duration-200">
      <HeroShop />
      <CategoriesGrid />
      <FeaturedProducts />
      <FlashSale />
      <CommunityImpact />
    </main>
  );
}
