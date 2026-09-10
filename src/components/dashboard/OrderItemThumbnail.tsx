"use client";

import React, { useState } from "react";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderItemThumbnailProps {
  src?: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function OrderItemThumbnail({
  src,
  alt,
  className,
  size = "md",
}: OrderItemThumbnailProps) {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: "size-10",
    md: "size-12",
    lg: "size-14",
  };

  if (!src || hasError) {
    return (
      <div
        className={cn(
          "rounded-xl bg-slate-100 dark:bg-[#262626] border border-slate-200 dark:border-[#303030] flex items-center justify-center text-slate-400 shrink-0",
          sizeClasses[size],
          className
        )}
      >
        <Package className="size-5" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl bg-slate-100 dark:bg-[#262626] border border-slate-200 dark:border-[#303030] overflow-hidden shrink-0 flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
