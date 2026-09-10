"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { Loader2 } from "lucide-react";
import type { IProduct } from "@/types/product";
import type { ICategory } from "@/types/category";

interface ProductsPageContentProps {
  initialProducts: IProduct[];
  initialCategories: ICategory[];
}

/* ── Premium Empty State ─────────────────────────────────────── */
function EmptyState({ isSearch, query }: { isSearch: boolean; query?: string }) {
  return (
    <div className="flex flex-col items-center justify-center pt-4 pb-16 px-4 animate-in fade-in zoom-in-95 duration-500">
      {/* Decorative rings */}
      <div className="relative mb-5">
        <div className="absolute inset-0 rounded-full bg-[#1677ff]/5 dark:bg-[#1668dc]/10 scale-[2.2] blur-2xl" />
        <div className="relative size-24 rounded-full bg-gradient-to-br from-[#e6f4ff] to-[#bae0ff] dark:from-[#111a2c] dark:to-[#0d2a4e] border border-[#91caff] dark:border-[#15325b] flex items-center justify-center shadow-[0_8px_32px_rgba(22,119,255,0.15)]">
          <div className="size-12 rounded-full bg-gradient-to-br from-[#1677ff] to-[#4096ff] dark:from-[#1668dc] dark:to-[#3c89e8] flex items-center justify-center shadow-[0_4px_16px_rgba(22,119,255,0.4)]">
            <span className="text-xl select-none">{isSearch ? "🔍" : "📦"}</span>
          </div>
        </div>
      </div>

      <div className="text-center max-w-sm space-y-2.5">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {isSearch ? "কোনো পণ্য পাওয়া যায়নি" : "স্টক খালি"}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          {isSearch
            ? `${query ? query + " " : ""}এর জন্য কোনো পণ্য খুঁজে পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।`
            : "এই ক্যাটাগরিতে এই মুহূর্তে কোনো পণ্য নেই। শীঘ্রই নতুন পণ্য আসবে।"}
        </p>
        <Link
          href="/super-shop/products"
          className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full bg-[#1677ff] dark:bg-[#1668dc] text-white text-sm font-semibold hover:bg-[#4096ff] dark:hover:bg-[#3c89e8] transition-all shadow-[0_2px_8px_rgba(22,119,255,0.3)] hover:shadow-[0_4px_16px_rgba(22,119,255,0.4)] active:scale-95"
        >
          সব পণ্য দেখুন
        </Link>
      </div>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────── */
export function ProductsPageContent({
  initialProducts,
  initialCategories,
}: ProductsPageContentProps) {
  const searchParams = useSearchParams();

  const hasFilters = Array.from(searchParams.entries()).length > 0;
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sort = searchParams.get("sort");

  const { data, isLoading } = useQuery({
    queryKey: ["products", { category, search, minPrice, maxPrice, sort }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (search) params.append("search", search);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (sort) params.append("sort", sort);

      const res = await fetch(`/api/super-shop/products?${params.toString()}`);
      return res.json();
    },
    enabled: hasFilters,
    initialData: hasFilters ? undefined : initialProducts,
  });

  const products: IProduct[] = data || initialProducts;
  const currentCategory =
    category && initialCategories.find((c) => c.slug === category);

  /* Loading */
  if (isLoading && hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="size-9 animate-spin text-[#1677ff] dark:text-[#3c89e8]" />
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium animate-pulse">
          পণ্য খোঁজা হচ্ছে...
        </p>
      </div>
    );
  }

  /* Section label */
  const sectionTitle = search
    ? `${search} এর রেজাল্ট`
    : currentCategory
      ? currentCategory.name
      : "সকল পণ্য";

  return (
    <>
      {/* Section header — Center Aligned */}
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <div className="inline-flex items-center justify-center gap-2.5 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {sectionTitle}
          </h1>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] px-3 py-1 rounded-full shrink-0">
            {products.length} টি পণ্য
          </span>
        </div>
      </div>

      {/* Product grid — same layout as HomeProductGrid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 animate-in fade-in duration-700">
          {products.map((product, idx) => (
            <ProductCard
              key={String(product._id)}
              product={product}
              priority={idx < 4}
            />
          ))}
        </div>
      ) : (
        <EmptyState isSearch={!!search} query={search ?? undefined} />
      )}
    </>
  );
}