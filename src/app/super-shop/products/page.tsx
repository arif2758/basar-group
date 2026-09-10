import { Suspense } from "react";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { ProductsPageContent } from "@/components/super-shop/products/ProductsPageContent";
import type { IProduct } from "@/types/product";
import type { ICategory } from "@/types/category";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "সকল পণ্য | বাসার সুপার শপ",
  description: "বাসার সুপার শপের সকল কালেকশন দেখুন এবং পছন্দের পণ্য কিনুন।",
};

export const revalidate = 3600;

async function getInitialData() {
  try {
    await dbConnect();

    const productsDocs = await Product.find({ status: "published" })
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    const categoriesDocs = await Category.find().lean<ICategory[]>();

    const products = JSON.parse(JSON.stringify(productsDocs)) as IProduct[];
    const categories = JSON.parse(JSON.stringify(categoriesDocs)) as ICategory[];

    return { products, categories };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], categories: [] };
  }
}

export default async function ProductsPage() {
  const { products, categories } = await getInitialData();

  return (
    <section className="container mx-auto px-4 pt-3 pb-8">
      <Suspense fallback={<div className="h-96 animate-pulse bg-muted/40 rounded-2xl" />}>
        <ProductsPageContent
          initialProducts={products}
          initialCategories={categories}
        />
      </Suspense>
    </section>
  );
}
