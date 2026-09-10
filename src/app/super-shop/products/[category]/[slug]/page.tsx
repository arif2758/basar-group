import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import { formatPrice } from "@/lib/priceUtils";
import { notFound } from "next/navigation";
import { ProductImageGallery } from "@/components/super-shop/product/ProductImageGallery";
import { ProductActions } from "@/components/super-shop/product/ProductActions";
import { Star, Package, Info, ListChecks, ScrollText, Truck, RefreshCcw } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/super-shop/products/ProductCard";
import { cn } from "@/lib/utils";

import type { IProduct, IProductSpecification } from "@/types/product";
import type { ICategory } from "@/types/category";
import { Metadata } from "next";
import { Types } from "mongoose";

export const revalidate = 3600;
export const dynamicParams = true;

type ProductWithCategorySlug = {
  slug: string;
  category: {
    _id: Types.ObjectId;
    slug: string;
  };
};

export async function generateStaticParams() {
  try {
    await dbConnect();
    const products = await Product.find({ status: "published" })
      .select("slug category")
      .populate("category", "slug")
      .lean<ProductWithCategorySlug[]>();

    return products
      .filter((p) => p.category?.slug && p.slug)
      .map((p) => ({
        category: p.category.slug,
        slug: p.slug,
      }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const product = await Product.findOne({ slug }).lean<IProduct>();
  if (!product) return { title: "পণ্য পাওয়া যায়নি | বাসার সুপার শপ" };

  return {
    title: `${product.seoTitle || product.title} | বাসার সুপার শপ`,
    description: product.seoDesc || product.shortDesc,
    openGraph: {
      title: product.seoTitle || product.title,
      description: product.seoDesc || product.shortDesc,
      images: [
        {
          url: product.thumbnail,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
      type: "website",
    },
  };
}

type PopulatedProduct = Omit<IProduct, "category"> & {
  category: ICategory;
};

async function getProductData(slug: string) {
  await dbConnect();

  const productDoc = await Product.findOne({ slug, status: "published" })
    .populate("category", "name slug")
    .lean();

  if (!productDoc) return null;

  const categoryId =
    typeof productDoc.category === "object" &&
    productDoc.category !== null &&
    "_id" in productDoc.category
      ? (productDoc.category as { _id: unknown })._id
      : productDoc.category;

  const relatedProductsDocs = await Product.find({
    category: categoryId,
    _id: { $ne: productDoc._id },
    status: "published",
  })
    .populate("category", "name slug")
    .limit(4)
    .lean();

  return {
    product: JSON.parse(JSON.stringify(productDoc)) as IProduct,
    relatedProducts: JSON.parse(JSON.stringify(relatedProductsDocs)) as IProduct[],
  };
}

export default async function ProductDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const params = await paramsPromise;
  const data = await getProductData(params.slug);

  if (!data) notFound();

  const { product, relatedProducts } = data;
  const displayPrice = product.salePrice || product.regularPrice;
  const hasFeatures = product.features && product.features.length > 0;
  const hasSpecs = product.specifications && product.specifications.length > 0;
  const categoryObj =
    typeof product.category === "object" &&
    product.category !== null &&
    "slug" in product.category
      ? (product.category as ICategory)
      : null;

  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground overflow-x-auto whitespace-nowrap py-1">
          <Link href="/super-shop" className="hover:text-primary shrink-0">
            হোম
          </Link>
          <span>/</span>
          <Link href="/super-shop/products" className="hover:text-primary shrink-0">
            পণ্যসমূহ
          </Link>
          <span>/</span>
          {categoryObj && (
            <>
              <Link
                href={`/super-shop/products/${categoryObj.slug}`}
                className="hover:text-primary shrink-0"
              >
                {categoryObj.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground font-bold truncate">
            {product.title}
          </span>
        </nav>

        {/* Main Section */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 md:items-start">
          {/* Gallery + Trust Badges */}
          <div className="min-w-0 space-y-4">
            <ProductImageGallery images={product.images || [{ url: product.thumbnail, alt: product.title }]} />

            <div className="hidden md:flex gap-3">
              <div className="flex flex-1 items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-[#fafafa] dark:bg-[#1a1a1a]">
                <Truck className="size-4 text-[#1677ff] dark:text-[#3c89e8] shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">ডেলিভারি</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">২৪–৪৮ ঘণ্টা</p>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-[#fafafa] dark:bg-[#1a1a1a]">
                <RefreshCcw className="size-4 text-[#1677ff] dark:text-[#3c89e8] shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">রিটার্ন</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">৭ দিন</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-5 min-w-0">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#e6f4ff] text-[#1677ff] border border-[#91caff] dark:bg-[#111a2c] dark:text-[#3c89e8] dark:border-[#15325b] text-[11px] font-bold rounded">
                  অরিজিনাল পণ্য
                </span>
                {product.ratings?.count ? (
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="size-3.5 fill-[#faad14] text-[#faad14]" />
                    <span className="font-bold text-slate-900 dark:text-white">{product.ratings.average || 5}</span>
                    <span className="text-slate-500 dark:text-slate-400">({product.ratings.count})</span>
                  </div>
                ) : null}
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight break-words text-slate-900 dark:text-white">
                {product.title}
              </h1>

              {product.shortDesc && (
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {product.shortDesc}
                </p>
              )}
            </div>

            {/* Pricing */}
            <div className="flex flex-wrap items-baseline gap-3">
              <span className={cn(
                "text-2xl sm:text-3xl font-black",
                product.salePrice && product.regularPrice > product.salePrice
                  ? "text-[#cf1322] dark:text-[#ff7875]"
                  : "text-slate-900 dark:text-white"
              )}>
                {formatPrice(displayPrice)}
              </span>

              {product.salePrice && product.regularPrice > product.salePrice && (
                <>
                  <span className="text-slate-400 dark:text-slate-500 text-sm line-through">
                    {formatPrice(product.regularPrice)}
                  </span>
                  <span className="text-xs font-bold text-[#389e0d] dark:text-[#49aa19] bg-[#f6ffed] dark:bg-[#162312] border border-[#b7eb8f] dark:border-[#274916] px-2 py-0.5 rounded">
                    বাঁচবে {formatPrice(product.regularPrice - product.salePrice)}
                  </span>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-200 dark:border-[#303030]">
              <ProductActions
                productId={String(product._id)}
                productTitle={product.title}
                stock={product.stockQuantity}
                product={product}
              />
            </div>
          </div>
        </div>

        {/* Features & Description */}
        <div className="pt-8 border-t border-slate-200 dark:border-[#303030] space-y-8">
          {hasFeatures && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <ListChecks className="size-5 text-[#1677ff] dark:text-[#3c89e8]" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">মূল বৈশিষ্ট্যসমূহ</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features?.map((feature: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-sm text-slate-800 dark:text-slate-200"
                  >
                    <span className="size-5 rounded-full bg-[#f6ffed] text-[#389e0d] border border-[#b7eb8f] dark:bg-[#162312] dark:text-[#49aa19] dark:border-[#274916] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Description */}
          {product.description && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <ScrollText className="size-5 text-[#1677ff] dark:text-[#3c89e8]" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">বিস্তারিত বিবরণ</h2>
              </div>
              <div
                className="rounded-2xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] p-6 prose prose-sm max-w-none text-slate-600 dark:text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </section>
          )}

          {/* Specifications */}
          {hasSpecs && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Info className="size-5 text-[#1677ff] dark:text-[#3c89e8]" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">স্পেসিফিকেশন</h2>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {product.specifications?.map((spec: IProductSpecification, idx: number) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#fafafa] dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030]">
                    <span className="text-[10px] font-semibold uppercase text-slate-500 dark:text-slate-400 block">
                      {spec.key}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4 pt-10 border-t border-border/40">
            <h2 className="text-xl font-black">সম্পর্কিত অন্যান্য পণ্য</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p: IProduct) => (
                <ProductCard key={String(p._id)} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
