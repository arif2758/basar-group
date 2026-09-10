"use client";

import { useCart } from "@/hooks/useCart";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  PackageX,
  Truck,
  ShieldCheck,
  Headphones,
  Sparkles,
  Flame,
  Tag,
  RotateCcw,
} from "lucide-react";
import { formatPrice } from "@/lib/priceUtils";
import QuantitySelector from "@/components/super-shop/products/QuantitySelector";
import { IPopulatedCartItem } from "@/types/cart";
import { cn } from "@/lib/utils";

export default function CartPageClient() {
  const {
    cart,
    cartCount,
    updateQty,
    removeItem,
    isLoadingCart,
    isFetchingCart,
    isAdding,
  } = useCart();

  const getCategorySlug = (product: IPopulatedCartItem["product"]): string => {
    return product.category?.slug || "uncategorized";
  };

  const isPendingCartDetails =
    isLoadingCart ||
    isAdding ||
    (cartCount > 0 && (!cart.items || cart.items.length === 0)) ||
    (isFetchingCart && (!cart.items || cart.items.length === 0));

  if (isPendingCartDetails) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="size-20 rounded-full border-4 border-[#1677ff]/20 border-t-[#1677ff] animate-spin mb-6" />
          <p className="text-slate-600 dark:text-slate-300 font-medium text-sm">
            কার্টের তথ্য লোড হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {/* Main Empty Cart Card */}
          <div className="bg-white dark:bg-[#141414] rounded-3xl border border-slate-200 dark:border-[#303030] p-8 sm:p-12 text-center shadow-sm transition-colors relative overflow-hidden">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f4ff] dark:bg-[#111a2c] border border-[#91caff] dark:border-[#153450] text-[#1677ff] dark:text-[#1668dc] text-xs font-semibold mb-6">
              <Sparkles className="size-3.5" />
              <span>কার্ট সম্পূর্ণ খালি</span>
            </div>

            {/* Glowing Illustration / Icon Box */}
            <div className="relative size-28 sm:size-32 mx-auto mb-6 flex items-center justify-center">
              {/* Outer Gradient Ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#e6f4ff] to-[#d6e4ff]/40 dark:from-[#111a2c] dark:to-[#16233b]/60 border border-[#91caff]/60 dark:border-[#153450] shadow-inner" />
              
              {/* Floating Decorative Tags */}
              <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fff2f0] dark:bg-[#2a1215] text-[#ff4d4f] border border-[#ffa39e] dark:border-[#58181c] shadow-sm flex items-center gap-1">
                <Flame className="size-3 text-[#ff4d4f]" />
                <span>অফার</span>
              </div>

              {/* Center Icon */}
              <div className="relative z-10 size-16 rounded-2xl bg-[#1677ff] text-white flex items-center justify-center shadow-lg shadow-[#1677ff]/30">
                <ShoppingBag className="size-8 stroke-[2.2]" />
              </div>
            </div>

            {/* Text Content */}
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              আপনার শপিং কার্ট বর্তমানে খালি!
            </h1>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed mb-8">
              এখনো কোনো পণ্য যোগ করা হয়নি। এখনই আপনার পছন্দের ট্রেন্ডিং পণ্যগুলো খুঁজে নিতে আমাদের স্টোরে ঘুরে আসুন!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/super-shop/products"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full sm:w-auto h-12 px-8 rounded-xl bg-[#1677ff] hover:bg-[#4096ff] active:bg-[#0958d9] text-white font-bold text-sm tracking-wide shadow-sm hover:shadow-md transition-all gap-2"
                )}
              >
                <ShoppingBag className="size-4" />
                কেনাকাটা শুরু করুন
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/super-shop/products?sale=true"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto h-12 px-6 rounded-xl border-slate-300 dark:border-[#424242] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1f1f1f] font-bold text-sm transition-all gap-2"
                )}
              >
                <Tag className="size-4 text-[#ff4d4f]" />
                আজকের অফারসমূহ
              </Link>
            </div>

            {/* Quick Explore Categories */}
            <div className="mt-10 pt-6 border-t border-slate-100 dark:border-[#262626]">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                জনপ্রিয় ক্যাটাগরিগুলো এক্সপ্লোর করুন
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { label: "সকল প্রোডাক্ট", href: "/super-shop/products" },
                  { label: "ডিসকাউন্ট ডিল", href: "/super-shop/products?sale=true" },
                  { label: "নতুন কালেকশন", href: "/super-shop/products?sort=newest" },
                  { label: "অর্ডার ট্র্যাক", href: "/super-shop/track-order" },
                ].map((chip) => (
                  <Link
                    key={chip.label}
                    href={chip.href}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-300 hover:bg-[#e6f4ff] hover:text-[#1677ff] dark:hover:bg-[#111a2c] dark:hover:text-[#1668dc] border border-slate-200 dark:border-[#303030] transition-colors"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Value Badges (3-column) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#141414] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-sm flex items-start gap-3.5 transition-colors">
              <div className="size-10 rounded-xl bg-[#e6f4ff] dark:bg-[#111a2c] text-[#1677ff] dark:text-[#1668dc] flex items-center justify-center shrink-0">
                <Truck className="size-5" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-xs font-bold text-slate-900 dark:text-white">দ্রুততম ডেলিভারি</h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  সারা বাংলাদেশে হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#141414] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-sm flex items-start gap-3.5 transition-colors">
              <div className="size-10 rounded-xl bg-[#f6ffed] dark:bg-[#162312] text-[#52c41a] flex items-center justify-center shrink-0">
                <ShieldCheck className="size-5" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-xs font-bold text-slate-900 dark:text-white">১০০% আসল পণ্য</h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  অফিসিয়াল ও বাছাইকৃত সর্বোচ্চ গুণমানের গ্যাজেট
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#141414] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-sm flex items-start gap-3.5 transition-colors">
              <div className="size-10 rounded-xl bg-[#fff7e6] dark:bg-[#2b2111] text-[#faad14] flex items-center justify-center shrink-0">
                <RotateCcw className="size-5" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-xs font-bold text-slate-900 dark:text-white">সহজ রিপ্লেসমেন্ট</h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  কোনো সমস্যায় দ্রুত রিটার্ন ও রিপ্লেসমেন্ট সুবিধা
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-32 lg:pb-12">
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left: Cart Items */}
        <section className="lg:col-span-2 space-y-6" aria-label="কার্ট আইটেম">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight flex items-baseline gap-3">
              আপনার কার্ট
              <span className="text-lg font-medium text-muted-foreground">
                ({cart.items.length}টি পণ্য)
              </span>
            </h1>
          </div>

          <div className="space-y-4">
            {cart.items.map((item: IPopulatedCartItem) => {
              const product = item.product;
              const itemKey = `${product._id}-${item.color || ""}-${item.size || ""}`;

              return (
                <article
                  key={itemKey}
                  className="rounded-2xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] p-4 sm:p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors hover:border-blue-400 dark:hover:border-blue-500"
                >
                  <div className="flex gap-4 sm:gap-6 items-start">
                    {/* Image */}
                    <div className="relative size-20 sm:size-28 shrink-0 overflow-hidden rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414]">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 80px, 112px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            href={`/super-shop/products/${getCategorySlug(product)}/${product.slug}`}
                            className="font-bold text-base sm:text-lg text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
                          >
                            {product.title}
                          </Link>

                          {/* Delete Button */}
                          <button
                            onClick={() =>
                              removeItem({
                                productId: String(product._id),
                                color: item.color,
                                size: item.size,
                              })
                            }
                            className="text-slate-400 hover:text-[#ff4d4f] hover:bg-[#fff2f0] dark:hover:bg-[#2c1618] p-1.5 rounded-lg transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="size-4 sm:size-5" />
                          </button>
                        </div>

                        {/* Variants */}
                        {(item.color || item.size) && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.color && (
                              <Badge
                                variant="outline"
                                className="text-xs font-normal border-slate-200 dark:border-[#303030] bg-[#fafafa] dark:bg-[#262626] text-slate-700 dark:text-slate-300"
                              >
                                কালার: {item.color}
                              </Badge>
                            )}
                            {item.size && (
                              <Badge
                                variant="outline"
                                className="text-xs font-normal border-slate-200 dark:border-[#303030] bg-[#fafafa] dark:bg-[#262626] text-slate-700 dark:text-slate-300 uppercase"
                              >
                                সাইজ: {item.size}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Quantity & Subtotal */}
                      <div className="flex items-end justify-between gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-[#303030]">
                        <QuantitySelector
                          quantity={item.itemQuantity}
                          setQuantity={(newQty) =>
                            updateQty({
                              productId: String(product._id),
                              quantity: newQty,
                              color: item.color,
                              size: item.size,
                            })
                          }
                          min={1}
                          max={product.stockQuantity}
                          variant="compact"
                        />

                        <div className="text-right">
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {formatPrice(
                              product.salePrice || product.regularPrice
                            )}{" "}
                            × {item.itemQuantity}
                          </p>
                          <p className="text-lg sm:text-xl font-bold text-[#cf1322] dark:text-[#ff7875]">
                            {formatPrice(item.subtotal)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Right: Order Summary Sidebar */}
        <aside className="space-y-6">
          <div className="sticky top-24 rounded-2xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">অর্ডার সামারি</h2>

            <div className="space-y-3 divide-y divide-slate-100 dark:divide-[#303030] text-sm">
              <div className="flex justify-between py-2">
                <span className="text-slate-500 dark:text-slate-400">মোট আইটেম</span>
                <span className="font-semibold text-slate-900 dark:text-white">{cart.items.length} টি</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500 dark:text-slate-400">সাবটোটাল</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(cart.total)}</span>
              </div>
              <div className="flex justify-between py-2 text-base font-bold text-slate-900 dark:text-white">
                <span>সর্বমোট</span>
                <span className="text-xl text-[#cf1322] dark:text-[#ff7875] font-black">
                  {formatPrice(cart.total)}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] p-3 rounded-xl flex items-center gap-2">
              <Truck className="size-4 text-[#1677ff] dark:text-[#3c89e8] shrink-0" />
              ডেলিভারি চার্জ পরবর্তী পেজে যোগ হবে
            </p>

            <Link
              href="/super-shop/checkout"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full h-12 rounded-xl text-base font-bold shadow-[0_2px_0_rgba(5,145,255,0.15)] inline-flex items-center justify-center gap-2 group bg-[#1677ff] hover:bg-[#4096ff] active:bg-[#0958d9] text-white dark:bg-[#1668dc] dark:hover:bg-[#3c89e8]"
              )}
            >
              চেকআউটে যান
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-100 dark:border-[#303030] grid grid-cols-2 gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#52c41a] shrink-0" />
                <span>নিরাপদ অর্ডার</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="size-4 text-[#1677ff] shrink-0" />
                <span>দ্রুত কাস্টমার সাপোর্ট</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Fixed Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white dark:bg-[#1f1f1f] border-t border-slate-200 dark:border-[#303030] p-4 shadow-xl flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">
            সর্বমোট
          </p>
          <p className="text-xl font-black text-[#cf1322] dark:text-[#ff7875]">
            {formatPrice(cart.total)}
          </p>
        </div>
        <Link
          href="/super-shop/checkout"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-12 rounded-xl px-6 font-bold flex-1 flex items-center justify-center gap-2 bg-[#1677ff] hover:bg-[#4096ff] text-white dark:bg-[#1668dc] dark:hover:bg-[#3c89e8] shadow-[0_2px_0_rgba(5,145,255,0.15)]"
          )}
        >
          চেকআউট
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
