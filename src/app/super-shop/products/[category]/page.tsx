import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { IProduct } from "@/types/product";
import { ICategory } from "@/types/category";
import { notFound } from "next/navigation";
import ProductCard from "@/components/super-shop/products/ProductCard";
import Link from "next/link";
import { Metadata } from "next";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  await dbConnect();
  const category = await Category.findOne({ slug }).lean<ICategory>();

  if (!category) return { title: "ক্যাটাগরি পাওয়া যায়নি | বাসার সুপার শপ" };

  return {
    title: `${category.name} | বাসার সুপার শপ`,
    description:
      category.seoDesc ||
      category.description ||
      `${category.name} কিনুন সেরা দামে বাসার সুপার শপ থেকে।`,
  };
}

export async function generateStaticParams() {
  try {
    await dbConnect();
    const categories = await Category.find().select("slug").lean();
    return categories.map((cat) => ({
      category: cat.slug,
    }));
  } catch {
    return [];
  }
}




async function getCategoryData(slug: string) {
  await dbConnect();

  const category = await Category.findOne({ slug }).lean();
  if (!category) return null;

  const products = await Product.find({
    category: category._id,
    status: "published",
  })
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .limit(30)
    .lean();

  return {
    category: JSON.parse(JSON.stringify(category)) as ICategory,
    products: JSON.parse(JSON.stringify(products)) as IProduct[],
  };
}

export default async function CategoryListingPage({
  params: paramsPromise,
}: {
  params: Promise<{ category: string }>;
}) {
  const params = await paramsPromise;
  const data = await getCategoryData(params.category);

  if (!data) notFound();

  const { category, products } = data;

  return (
    <section className="container mx-auto px-4 pt-3 pb-12">
      {/* Header — same style as HomeProductGrid */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
          {category.name}
        </h1>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] px-3 py-1 rounded-full shrink-0">
          {products.length} টি পণ্য
        </span>
      </div>

      {category.description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 -mt-3 mb-5">
          {category.description}
        </p>
      )}

      {/* Products Grid — same layout as HomeProductGrid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 animate-in fade-in duration-500">
          {products.map((product, idx) => (
            <ProductCard
              key={product._id.toString()}
              product={product}
              priority={idx < 4}
            />
          ))}
        </div>
      ) : (
        /* Premium empty state */
        <div className="flex flex-col items-center justify-center pt-4 pb-16 px-4 animate-in fade-in zoom-in-95 duration-500">
          <div className="relative mb-5">
            <div className="absolute inset-0 rounded-full bg-[#1677ff]/5 dark:bg-[#1668dc]/10 scale-[2.2] blur-2xl" />
            <div className="relative size-24 rounded-full bg-gradient-to-br from-[#e6f4ff] to-[#bae0ff] dark:from-[#111a2c] dark:to-[#0d2a4e] border border-[#91caff] dark:border-[#15325b] flex items-center justify-center shadow-[0_8px_32px_rgba(22,119,255,0.15)]">
              <div className="size-12 rounded-full bg-gradient-to-br from-[#1677ff] to-[#4096ff] dark:from-[#1668dc] dark:to-[#3c89e8] flex items-center justify-center shadow-[0_4px_16px_rgba(22,119,255,0.4)]">
                <span className="text-xl select-none">📦</span>
              </div>
            </div>
          </div>
          <div className="text-center max-w-sm space-y-2.5">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              এই ক্যাটাগরিতে কোনো পণ্য নেই
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              শীঘ্রই নতুন পণ্য আসবে। আমাদের সঙ্গেই থাকুন!
            </p>
            <Link
              href="/super-shop/products"
              className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full bg-[#1677ff] dark:bg-[#1668dc] text-white text-sm font-semibold hover:bg-[#4096ff] dark:hover:bg-[#3c89e8] transition-all shadow-[0_2px_8px_rgba(22,119,255,0.3)] hover:shadow-[0_4px_16px_rgba(22,119,255,0.4)] active:scale-95"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
