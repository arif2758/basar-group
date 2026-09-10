import Link from "next/link";
import ProductCard from "@/components/super-shop/products/ProductCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IProduct } from "@/types/product";

interface HomeProductGridProps {
  title: string;
  products: IProduct[];
  viewMoreLink?: string;
  icon?: string;
}

export default function HomeProductGrid({
  title,
  products,
  viewMoreLink,
  icon,
}: HomeProductGridProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 mt-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg sm:text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
          <span>{title}</span>
          {icon && <span className="text-xl">{icon}</span>}
        </h2>
        {viewMoreLink && ( 
          <Link
            href={viewMoreLink}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all group"
          >
            <span>সব দেখুন</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
        {products.map((product, index) => (
          <ProductCard key={product.slug} product={product} priority={index < 4} />
        ))}
      </div>
    </section>
  );
}
 