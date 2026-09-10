import { Suspense } from "react";
import Product from "@/models/Product";
import Category from "@/models/Category";
import HeroSection from "@/components/super-shop/home/HeroSection";
import HomeProductGrid from "@/components/super-shop/home/HomeProductGrid";
import { IProduct } from "@/types/product";
import { dbConnect } from "@/lib/db";

export const revalidate = 60; // ISR

async function getHomepageData() {
  try {
    await dbConnect();

    const [featured, trending, categories] = await Promise.all([
      Product.find({ featured: true, status: "published" })
        .populate("category", "slug name")
        .sort({ createdAt: -1 })
        .limit(8)
        .lean(),
      Product.find({ trending: true, status: "published" })
        .populate("category", "slug name")
        .sort({ createdAt: -1 })
        .limit(8)
        .lean(),
      Category.find({ parent: { $exists: false } }).limit(6).lean(),
    ]);

    const categoryGrids = (
      await Promise.all(
        categories.map(async (cat) => {
          const catProducts = await Product.find({
            category: cat._id,
            status: "published",
          })
            .populate("category", "slug name")
            .sort({ createdAt: -1 })
            .limit(4)
            .lean();

          if (catProducts.length === 0) return null;

          return {
            category: JSON.parse(JSON.stringify(cat)),
            products: JSON.parse(JSON.stringify(catProducts)),
          };
        })
      )
    ).filter((grid): grid is NonNullable<typeof grid> => grid !== null);

    // Fallback: If DB is empty of featured/trending, query any published products
    let fallbackProducts: unknown[] = [];
    if (featured.length === 0 && trending.length === 0) {
      fallbackProducts = await Product.find({ status: "published" })
        .populate("category", "slug name")
        .sort({ createdAt: -1 })
        .limit(8)
        .lean();
    }

    const featuredList = featured.length > 0 ? featured : fallbackProducts;
    const trendingList = trending.length > 0 ? trending : fallbackProducts;

    return {
      featuredProducts: JSON.parse(JSON.stringify(featuredList)) as IProduct[],
      trendingProducts: JSON.parse(JSON.stringify(trendingList)) as IProduct[],
      categoryGrids,
    };
  } catch (error) {
    console.error("Error fetching super-shop homepage data:", error);
    return {
      featuredProducts: [],
      trendingProducts: [],
      categoryGrids: [],
    };
  }
}

export default async function SuperShopPage() {
  const { featuredProducts, trendingProducts, categoryGrids } =
    await getHomepageData();

  return (
    <div className="min-h-screen pb-20">
      <Suspense
        fallback={
          <div className="h-[40vh] animate-pulse bg-muted/50 rounded-xl m-4" />
        }
      >
        {featuredProducts.length > 0 ? (
          <HeroSection featuredProducts={featuredProducts} />
        ) : (
          <div className="container mx-auto px-4 py-12 text-center">
            <div className="max-w-md mx-auto p-8 rounded-2xl bg-card border border-border shadow-xs">
              <span className="text-4xl mb-4 block">🛒</span>
              <h2 className="text-xl font-bold mb-2">বাসার সুপার শপে স্বাগতম</h2>
              <p className="text-sm text-muted-foreground">
                নতুন পণ্য শীঘ্রই যোগ করা হচ্ছে। আমাদের সাথেই থাকুন!
              </p>
            </div>
          </div>
        )}
      </Suspense>

      {/* Trending Grid */}
      {trendingProducts.length > 0 && (
        <HomeProductGrid
          title="ট্রেন্ডিং কালেকশন"
          icon="🔥"
          products={trendingProducts}
          viewMoreLink="/super-shop/products?sort=trending"
        />
      )}

      {/* Dynamic Category Grids */}
      {categoryGrids.map((grid) => (
        <HomeProductGrid
          key={grid.category._id}
          title={grid.category.name}
          products={grid.products}
          viewMoreLink={`/super-shop/products/${grid.category.slug}`}
        />
      ))}
    </div>
  );
}
