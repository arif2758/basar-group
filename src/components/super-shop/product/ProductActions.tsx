// src\components\product\ProductActions.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import QuantitySelector from "@/components/super-shop/products/QuantitySelector";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap, Truck, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ICartItem, IPopulatedCartItem } from "@/types/cart";

import { WhatsAppOrderButton } from "./WhatsAppOrderButton"; 
import { IProduct } from "@/types/product"; 

interface ProductActionsProps {
  productId: string;
  productTitle: string;
  stock: number;
  product: IProduct;
}

export function ProductActions({
  productId,
  productTitle,
  stock,
  product
}: ProductActionsProps) {
  const {
    addToCart,
    isAdding,
    cart,
    updateQty,
    isUpdating,
    removeItem,
    isRemoving,
    isLoadingCart,
  } = useCart();
  const router = useRouter();

  // Selected Options (Default to first available option as requested)
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0] : ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ""
  );

  // কার্টে আছে কিনা চেক করো (productId + color + size)
  const cartItem = cart?.items?.find((item: ICartItem | IPopulatedCartItem) => {
    const itemProductId =
      typeof item.product === "object" &&
      item.product !== null &&
      "_id" in item.product
        ? String(item.product._id)
        : String(item.product);

    const matchesColor = (item.color || "") === (selectedColor || "");
    const matchesSize = (item.size || "") === (selectedSize || "");

    return itemProductId === productId && matchesColor && matchesSize;
  });

  const isInCart = !!cartItem;
  const currentQtyInCart = cartItem?.itemQuantity || 0;

  // লোকাল স্টেট শুধুমাত্র তখন ব্যবহার হবে যখন প্রোডাক্ট কার্টে নেই
  const [localQty, setLocalQty] = useState(1);
  const displayQty = isInCart ? currentQtyInCart : localQty;

  const isActionPending = isAdding || isUpdating || isRemoving || isLoadingCart;
  const isDisabled = isActionPending || stock <= 0;

  const handleQtyChange = (newQty: number) => {
    if (isInCart) {
      if (newQty > currentQtyInCart) {
        updateQty({ productId, quantity: newQty, color: selectedColor, size: selectedSize });
      } else if (newQty < currentQtyInCart) {
        if (newQty === 0) {
          removeItem({ productId, color: selectedColor, size: selectedSize });
        } else {
          updateQty({ productId, quantity: newQty, color: selectedColor, size: selectedSize });
        }
      }
    } else {
      setLocalQty(newQty);
    }
  };

  const handleAddToCart = () => {
    if (isInCart) {
      toast.info("ইতিমধ্যে এই ভ্যারিয়েন্টটি কার্টে যোগ করা হয়েছে।", {
        icon: <ShoppingCart className="size-4" />,
        duration: 1500,
      });
      return;
    }

    addToCart(
      { productId, quantity: localQty, color: selectedColor, size: selectedSize },
      {
        onSuccess: (data: { success?: boolean }) => {
          if (data?.success) {
            toast.success(`${productTitle} কার্টে যোগ করা হয়েছে!`, {
              icon: <ShoppingCart className="size-4" />,
              duration: 1500,
              action: {
                label: "চেকআউট",
                onClick: () => router.push("/super-shop/cart"),
              },
            });
          }
        },
      },
    );
  };

  const handleBuyNow = () => {
    if (isInCart) {
      router.push("/super-shop/checkout");
      return;
    }

    addToCart(
      { productId, quantity: localQty, color: selectedColor, size: selectedSize },
      {
        onSuccess: (data: { success?: boolean }) => {
          if (data?.success) {
            router.push("/super-shop/checkout");
          }
        },
      },
    );
  };

  // Formatted Weight for UI
  const formattedWeight = product.weight
    ? product.weight < 1000
      ? `${product.weight} গ্রাম`
      : `${(product.weight / 1000).toFixed(2)} কেজি`
    : null;

  return (
    <div className="space-y-5">
      {/* Color Selection - Pill Radio Buttons */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              কালার: <span className="text-slate-900 dark:text-white font-bold font-sans capitalize">{selectedColor}</span>
            </p>
            {formattedWeight && (
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-[#262626] border border-slate-200 dark:border-[#303030] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                ⚖️ {formattedWeight}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => {
              const isSelected = selectedColor === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer",
                    isSelected
                      ? "bg-[#e6f4ff] text-[#1677ff] border-[#1677ff] dark:bg-[#111a2c] dark:text-[#3c89e8] dark:border-[#1668dc] shadow-xs scale-105"
                      : "bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#303030] hover:border-[#91caff] dark:hover:border-[#15325b] hover:text-[#1677ff] dark:hover:text-[#3c89e8]"
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selection - Pill Radio Buttons */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            সাইজ: <span className="text-slate-900 dark:text-white font-bold font-sans uppercase">{selectedSize}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => {
              const isSelected = selectedSize === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer",
                    isSelected
                      ? "bg-[#e6f4ff] text-[#1677ff] border-[#1677ff] dark:bg-[#111a2c] dark:text-[#3c89e8] dark:border-[#1668dc] shadow-xs scale-105"
                      : "bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#303030] hover:border-[#91caff] dark:hover:border-[#15325b] hover:text-[#1677ff] dark:hover:text-[#3c89e8]"
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Fallback Weight Badge if no colors */}
      {(!product.colors || product.colors.length === 0) && formattedWeight && (
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#1a1a1a] p-2.5 rounded-xl border border-slate-200 dark:border-[#303030]">
          <span>ওজন:</span>
          <span className="text-slate-900 dark:text-white flex items-center gap-1 font-bold">⚖️ {formattedWeight}</span>
        </div>
      )}

      {/* Quantity - Centralized */}
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          পরিমাণ{" "}
          {isInCart && (
            <span className="text-[#1677ff] dark:text-[#3c89e8] ml-2 lowercase font-medium">
              (কার্টে আছে)
            </span>
          )}
        </p>
        <div className="flex items-center justify-between gap-4">
          <QuantitySelector
            quantity={displayQty}
            setQuantity={handleQtyChange}
            min={isInCart ? 0 : 1}
            max={stock}
            className="h-11"
          />
          <p className="text-xs">
            {stock > 0 ? (
              <span className="text-[#389e0d] dark:text-[#49aa19] bg-[#f6ffed] dark:bg-[#162312] border border-[#b7eb8f] dark:border-[#274916] font-semibold px-2.5 py-1 rounded-full">
                {stock} স্টক আছে
              </span>
            ) : (
              <span className="text-[#cf1322] dark:text-[#ff7875] bg-[#fff2f0] dark:bg-[#2c1618] border border-[#ffccc7] dark:border-[#5b2123] font-semibold px-2.5 py-1 rounded-full">
                স্টক নেই
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Action Buttons — 2 columns */}
      <div className="grid grid-cols-2 gap-3 w-full">
        <Button
          onClick={handleAddToCart}
          disabled={isDisabled}
          className={cn(
            "w-full h-12 rounded-xl text-sm font-bold tracking-tight gap-2 border transition-all active:scale-[0.98] cursor-pointer",
            isInCart
              ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed dark:bg-[#262626] dark:text-slate-500 dark:border-[#303030]"
              : "bg-white dark:bg-[#1f1f1f] text-[#1677ff] dark:text-[#3c89e8] border-[#91caff] dark:border-[#15325b] hover:border-[#1677ff] dark:hover:border-[#3c89e8] hover:bg-[#e6f4ff]/40 dark:hover:bg-[#111a2c]/40 shadow-xs",
          )}
        >
          <ShoppingCart className="size-4 shrink-0" />
          {isInCart ? "যোগ করা হয়েছে" : "যোগ করুন"}
        </Button>

        <Button
          onClick={handleBuyNow}
          disabled={isDisabled}
          className="w-full h-12 rounded-xl text-sm font-bold tracking-tight gap-2 bg-[#1677ff] hover:bg-[#4096ff] active:bg-[#0958d9] text-white dark:bg-[#1668dc] dark:hover:bg-[#3c89e8] shadow-[0_2px_0_rgba(5,145,255,0.15)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Zap className="size-4 text-yellow-300 fill-yellow-300 shrink-0" />
          {isInCart ? "চেকআউট" : "কিনুন"}
        </Button>
      </div>

      {/* WhatsApp — full-width row, both desktop & mobile */}
      <WhatsAppOrderButton
        product={product}
        quantity={displayQty}
        color={selectedColor}
        size={selectedSize}
      />

      {/* Separator + Trust Badges — mobile only; desktop shown in image column */}
      <div className="md:hidden">
        <div className="flex items-center gap-4 py-2">
          <div className="h-px flex-1 bg-slate-200 dark:bg-[#303030]"></div>
          <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            সার্ভিস ইনফো
          </span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-[#303030]"></div>
        </div>

        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-[#303030] overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 bg-[#fafafa] dark:bg-[#1a1a1a]">
            <Truck className="size-4 text-[#1677ff] dark:text-[#3c89e8] shrink-0" />
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">ডেলিভারি</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white">২৪–৪৮ ঘণ্টা</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-[#fafafa] dark:bg-[#1a1a1a] border-t border-slate-200 dark:border-[#303030]">
            <RefreshCcw className="size-4 text-[#1677ff] dark:text-[#3c89e8] shrink-0" />
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">রিটার্ন</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white">৭ দিন</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
