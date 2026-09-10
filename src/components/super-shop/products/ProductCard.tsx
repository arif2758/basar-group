// src/components/products/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Loader2, Heart, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatPrice, calculateDiscount } from "@/lib/priceUtils";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "sonner";
import QuantitySelector from "@/components/super-shop/products/QuantitySelector";

// Type Imports
import type { IProduct } from "@/types/product";
import type { ICartItem, IPopulatedCartItem } from "@/types/cart";
import { ICategory } from "@/types/category";
import { useState } from "react";

export default function ProductCard({ product, priority = false }: { product: IProduct; priority?: boolean }) {
  const {
    cart,
    addToCart,
    updateQty,
    removeItem,
    isAdding, 
    isUpdating,
    isRemoving,
  } = useCart();

  const { wishlistIds, toggleWishlist } = useWishlist();

  // Price calculations
  const discountPercentage = calculateDiscount(
    product.regularPrice,
    product.salePrice,
  );
  const displayPrice = product?.salePrice || product?.regularPrice;

  // Type Guards for slug routing
  const getCategorySlug = (): string => {
    const cat = product.category;

    // চেক করছি cat একটি অবজেক্ট কিনা এবং তার মধ্যে 'slug' প্রপার্টি আছে কিনা
    if (typeof cat === "object" && cat !== null && "slug" in cat) {
      // এখানে আমরা Next.js/TypeScript কে বলছি, "হ্যাঁ, আমি শিওর এটা ICategory"
      return (cat as ICategory).slug;
    }

    return "uncategorized";
  };

  const productHref = `/super-shop/products/${getCategorySlug()}/${product.slug}`;

  // Cart Matcher Logic
  const cartItem = cart?.items?.find((item: ICartItem | IPopulatedCartItem) => {
    const itemProductId =
      typeof item.product === "object" &&
      item.product !== null &&
      "_id" in item.product
        ? String(item.product._id)
        : String(item.product);
    return itemProductId === String(product._id);
  });

  const isInCart = !!cartItem;
  const currentQty = cartItem?.itemQuantity || 0;
  const isActionPending = isAdding || isUpdating || isRemoving;
  const [showSuccess, setShowSuccess] = useState(false);

  // Handlers
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stockQuantity === 0) return toast.error("স্টক নেই!");

    // ইনস্ট্যান্ট ফিডব্যাক দেওয়ার জন্য
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);

    addToCart(
      { productId: String(product._id), quantity: 1 },
      {
        onSuccess: (data: { success?: boolean }) => {
          if (data?.success) {
            toast.success(`${product.title} কার্টে যোগ করা হয়েছে!`, {
              icon: <ShoppingCart className="size-4" />,
              duration: 1500,
            });
          }
        },
      },
    );
  };

  const handleIncrease = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (currentQty < product.stockQuantity) {
      updateQty({
        productId: String(product._id),
        quantity: currentQty + 1,
      });
    } else {
      toast.error(`সর্বোচ্চ স্টক লিমিট ${product.stockQuantity} টি`);
    }
  };

  const handleDecrease = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (currentQty > 1) {
      updateQty({
        productId: String(product._id),
        quantity: currentQty - 1,
      });
    } else {
      removeItem(
        { productId: String(product._id) },
        {
          onSuccess: () => toast.info("কার্ট থেকে রিমুভ করা হয়েছে"),
        },
      );
    }
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:border-[#91caff] dark:hover:border-[#15325b] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] dark:hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.4)] transition-all duration-200">
      {/* 1. Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-t-xl bg-slate-50 dark:bg-[#141414]">
        <Link href={productHref} className="absolute inset-0 z-0 block">
          <Image
            src={product.thumbnail}
            alt={`${product.title} price in Bangladesh`}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute left-3 top-3 z-10 px-2 py-0.5 rounded bg-[#fff2f0] dark:bg-[#2c1618] text-[#cf1322] dark:text-[#ff7875] border border-[#ffccc7] dark:border-[#5b2123] text-[11px] font-bold tracking-tight shadow-xs">
            -{discountPercentage}%
          </div>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist({ productId: String(product._id) });
          }}
          className={cn(
            "absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-white/95 dark:bg-[#1f1f1f]/95 border border-slate-200 dark:border-[#303030] transition-all duration-200 shadow-xs active:scale-90 hover:border-[#ff4d4f] dark:hover:border-[#ff4d4f] cursor-pointer",
            wishlistIds.includes(String(product._id))
              ? "text-[#ff4d4f] border-[#ffccc7] dark:border-[#5b2123] bg-[#fff2f0] dark:bg-[#2c1618]"
              : "text-slate-600 dark:text-slate-300 hover:text-[#ff4d4f]",
          )}
          aria-label="Wishlist"
        >
          <Heart
            className={cn(
              "size-4 transition-all duration-200",
              wishlistIds.includes(String(product._id)) && "fill-[#ff4d4f]",
            )}
          />
        </button>

        {/* Out of Stock Overlay */}
        {product.stockQuantity === 0 && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 dark:bg-[#141414]/80">
            <span className="px-3 py-1 text-xs font-bold rounded bg-[#fff2f0] dark:bg-[#2c1618] text-[#cf1322] dark:text-[#ff7875] border border-[#ffccc7] dark:border-[#5b2123] shadow-sm">
              স্টক শেষ
            </span>
          </div>
        )}
      </div>

      {/* 2. Content Container */}
      <div className="flex flex-1 flex-col p-4 sm:p-4.5">
        <div className="mb-3 flex flex-1 flex-col">
          <div className="mb-1.5 flex items-start justify-between gap-2">
            <Link href={productHref} className="flex-1">
              <h3 className="line-clamp-2 text-sm sm:text-[15px] font-semibold leading-snug text-slate-900 dark:text-white transition-colors group-hover:text-[#1677ff] dark:group-hover:text-[#3c89e8]">
                {product.title}
              </h3>
            </Link>

            {/* Rating right beside title */}
            <div className="mt-0.5 flex shrink-0 items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              <Star className="size-3.5 fill-[#faad14] text-[#faad14]" />
              <span>{product.ratings?.average || "0.0"}</span>
            </div>
          </div>

          <p className="line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            {product.shortDesc}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="mt-auto flex items-end justify-between gap-2 pt-2 border-t border-slate-100 dark:border-[#303030]">
          {/* Price Stack */}
          <div className="flex flex-col">
            {/* Sale Price */}
            <span className={cn(
              "text-lg sm:text-xl font-bold leading-none",
              discountPercentage > 0 ? "text-[#cf1322] dark:text-[#ff7875]" : "text-slate-900 dark:text-white"
            )}>
              {formatPrice(displayPrice)}
            </span>

            {/* Regular Price & Savings */}
            {discountPercentage > 0 && (
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-slate-400 dark:text-slate-500 line-through text-xs">
                  {formatPrice(product.regularPrice)}
                </span>
                <span className="text-[10px] font-semibold text-[#389e0d] dark:text-[#49aa19] bg-[#f6ffed] dark:bg-[#162312] border border-[#b7eb8f] dark:border-[#274916] px-1.5 py-0.2 rounded">
                  বাঁচবে {formatPrice(product.regularPrice - (product.salePrice || 0))}
                </span>
              </div>
            )}
          </div>

          {/* Dynamic Action Area */}
          <div className="relative z-10 flex min-w-26 shrink-0 justify-end">
            {!isInCart ? (
              <button
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0 || isActionPending}
                className={cn(
                  "flex h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-all active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs",
                  showSuccess
                    ? "bg-[#52c41a] text-white"
                    : "bg-[#1677ff] hover:bg-[#4096ff] active:bg-[#0958d9] text-white dark:bg-[#1668dc] dark:hover:bg-[#3c89e8] shadow-[0_2px_0_rgba(5,145,255,0.1)]",
                )}
              >
                {showSuccess ? (
                  <Check className="size-3.5 shrink-0" />
                ) : isActionPending ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <ShoppingCart className="size-3.5 shrink-0" />
                )}
                <span>{showSuccess ? "যোগ হয়েছে" : "কার্টে যোগ"}</span>
              </button>
            ) : (
              /* State 2: Quantity Selector */
              <QuantitySelector
                quantity={currentQty}
                setQuantity={(val: number) => {
                  if (val > currentQty) handleIncrease();
                  else handleDecrease();
                }}
                min={1}
                max={product.stockQuantity}
                variant="compact"
                className="w-26"
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
