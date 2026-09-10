"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number; 
  setQuantity: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  className?: string;
  variant?: "default" | "compact" | "premium";
}
 
export default function QuantitySelector({
  quantity,
  setQuantity, 
  min,
  max, 
  step = 1,
  className,
  variant = "premium",
}: QuantitySelectorProps) {
  const handleDecrease = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (quantity > min) {
      const nextValue = Math.max(min, quantity - step);
      setQuantity(nextValue);
    }
  };

  const handleIncrease = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (quantity < max) {
      const nextValue = Math.min(max, quantity + step);
      setQuantity(nextValue);
    }
  };

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-between rounded-lg border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] p-0.5 shadow-xs transition-colors",
          className
        )}
      >
        <button
          type="button"
          className="size-7 flex items-center justify-center rounded-md text-slate-600 dark:text-slate-300 hover:text-[#1677ff] hover:bg-[#e6f4ff] dark:hover:text-[#3c89e8] dark:hover:bg-[#111a2c] active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          onClick={handleDecrease}
          disabled={quantity <= min}
          aria-label="Decrease quantity"
        >
          <Minus className="size-3 stroke-[2.5]" />
        </button>
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 min-w-[2.5ch] text-center tabular-nums select-none px-1">
          {quantity}
        </span>
        <button
          type="button"
          className="size-7 flex items-center justify-center rounded-md text-slate-600 dark:text-slate-300 hover:text-[#1677ff] hover:bg-[#e6f4ff] dark:hover:text-[#3c89e8] dark:hover:bg-[#111a2c] active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          onClick={handleIncrease}
          disabled={quantity >= max}
          aria-label="Increase quantity"
        >
          <Plus className="size-3 stroke-[2.5]" />
        </button>
      </div>
    );
  }
 
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] p-1 shadow-xs transition-colors",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 p-0 hover:bg-[#e6f4ff] hover:text-[#1677ff] dark:hover:bg-[#111a2c] dark:hover:text-[#3c89e8] text-slate-700 dark:text-slate-200 active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit transition-all rounded-full cursor-pointer"
        onClick={handleDecrease}
        disabled={quantity <= min}
        aria-label="কমান"
      >
        <Minus className="h-4 w-4" />
      </Button>

      <div className="flex flex-col items-center justify-center min-w-[4ch]">
        <span className="text-sm font-bold text-slate-900 dark:text-white tabular-nums select-none px-1 tracking-tight">
          {quantity}
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 p-0 hover:bg-[#e6f4ff] hover:text-[#1677ff] dark:hover:bg-[#111a2c] dark:hover:text-[#3c89e8] text-slate-700 dark:text-slate-200 active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit transition-all rounded-full cursor-pointer"
        onClick={handleIncrease}
        disabled={quantity >= max}
        aria-label="বাড়ান"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
